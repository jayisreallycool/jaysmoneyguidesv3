// Renders the in-article explainer graphics.
//
//   node scripts/article-images/render.mjs [slug ...]
//
// Reads content/article-images/<slug>.json, lays each graphic out as HTML with
// the site's own Manrope font in headless Chromium, screenshots it and saves a
// WebP to public/images/guides/<slug>/. Also writes
// lib/article-images.generated.json (src -> width/height) so the article page
// can reserve the right space and avoid layout shift.
//
// Needs Playwright (not a site dependency). Point PLAYWRIGHT_DIR at a folder
// whose node_modules has it, and CHROMIUM_PATH at a Chromium binary if
// Playwright's own isn't installed.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const req = createRequire(process.env.PLAYWRIGHT_DIR ? join(process.env.PLAYWRIGHT_DIR, 'x.js') : import.meta.url);
const { chromium } = req('playwright');

const SPECS = join(root, 'content', 'article-images');
const OUT = join(root, 'public', 'images', 'guides');
const MANIFEST = join(root, 'lib', 'article-images.generated.json');
const WIDTH = 540; // CSS px; text sizes below are chosen so it stays readable when scaled to a phone column
const SCALE = 2; // output pixels per CSS px (1080px wide files: sharp on phones, light enough to load fast)

const font = readFileSync(join(root, 'app', 'fonts', 'manrope-latin-var.woff2')).toString('base64');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const fileSlug = (s) => s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-$/, '');

const KICKER = {
  steps: 'Step by step', checklist: 'Checklist', compare: 'Side by side', cards: 'At a glance',
  flow: 'How it flows', decision: 'Quick decision', table: 'Quick reference',
};

const ICON = {
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cross: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  dot: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/></svg>',
  down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  loop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
const toneIcon = (t) => (t === 'good' ? ICON.check : t === 'bad' ? ICON.cross : ICON.dot);

function body(im) {
  const d = im.data;
  switch (im.type) {
    case 'steps':
      return `<ol class="steps">${d.items.map((it, i) => `
        <li><span class="num">${i + 1}</span><div><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></div></li>`).join('')}</ol>`;
    case 'checklist':
      return `<ul class="check">${d.items.map((t) => `<li><span class="box">${ICON.check}</span><p>${esc(t)}</p></li>`).join('')}</ul>`;
    case 'compare':
      return `<div class="compare">${d.columns.map((c) => `
        <section class="col tone-${esc(c.tone || 'neutral')}"><h3>${esc(c.label)}</h3>
          <ul>${c.points.map((p) => `<li><span class="ic">${toneIcon(c.tone)}</span><p>${esc(p)}</p></li>`).join('')}</ul>
        </section>`).join('')}</div>`;
    case 'cards': {
      const two = d.items.length % 2 === 0;
      return `<div class="cards ${two ? 'two' : 'one'}">${d.items.map((it, i) => `
        <section class="card"><span class="idx">${String(i + 1).padStart(2, '0')}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></section>`).join('')}</div>`;
    }
    case 'flow':
      return `<div class="flow">${d.items.map((it, i) => `
        ${i ? `<div class="arrow">${ICON.down}</div>` : ''}
        <section class="stage" style="--w:${100 - i * (d.loop ? 0 : 5)}%"><h3>${esc(it.label)}</h3><p>${esc(it.text)}</p></section>`).join('')}
        ${d.loop ? `<div class="loop">${ICON.loop}<span>Then repeat the cycle</span></div>` : ''}</div>`;
    case 'decision':
      return `<div class="decision"><div class="q"><span class="qmark">?</span><p>${esc(d.question)}</p></div>
        <ul>${d.branches.map((b) => `<li class="tone-${esc(b.tone || 'neutral')}"><span class="ans">${esc(b.answer)}</span><p>${esc(b.result)}</p></li>`).join('')}</ul></div>`;
    case 'table':
      return `<table><thead><tr>${d.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${d.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    default:
      throw new Error(`unknown type ${im.type}`);
  }
}

const CSS = `
@font-face { font-family: Manrope; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 200 800; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #020617; }
body { font-family: Manrope, sans-serif; -webkit-font-smoothing: antialiased; width: ${WIDTH}px; }
#card { width: ${WIDTH}px; padding: 34px 30px 22px; color: #e2e8f0; position: relative; overflow: hidden;
  background: radial-gradient(120% 70% at 100% 0%, rgba(16,185,129,.16), transparent 60%), linear-gradient(180deg, #0f172a, #0b1222); }
#card::before { content: ''; position: absolute; inset: 0 0 auto 0; height: 5px; background: linear-gradient(90deg, #10b981, #34d399 60%, #0ea5e9); }
.kicker { display: inline-block; font-size: 15px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #34d399;
  background: rgba(16,185,129,.12); border: 1px solid rgba(52,211,153,.35); border-radius: 999px; padding: 5px 13px; }
h2 { font-size: 30px; line-height: 1.18; font-weight: 800; color: #fff; margin: 14px 0 24px; letter-spacing: -.01em; text-wrap: balance; }
h3 { font-size: 22px; line-height: 1.25; font-weight: 800; color: #fff; }
p { font-size: 20px; line-height: 1.38; color: #cbd5e1; font-weight: 500; }
svg { width: 100%; height: 100%; display: block; }
ul, ol { list-style: none; }

.steps li { display: grid; grid-template-columns: 40px 1fr; gap: 16px; position: relative; padding-bottom: 20px; }
.steps li:not(:last-child)::before { content: ''; position: absolute; left: 19px; top: 44px; bottom: 4px; width: 2px; background: rgba(52,211,153,.35); }
.steps .num { width: 40px; height: 40px; border-radius: 50%; background: #10b981; color: #022c22; font-weight: 800; font-size: 21px;
  display: grid; place-items: center; }
.steps h3 { margin: 6px 0 4px; }

.check li { display: grid; grid-template-columns: 30px 1fr; gap: 14px; align-items: start; padding: 13px 0; border-top: 1px solid rgba(148,163,184,.16); }
.check li:first-child { border-top: 0; padding-top: 0; }
.check .box { width: 30px; height: 30px; border-radius: 8px; background: rgba(16,185,129,.16); border: 2px solid #10b981; color: #34d399; padding: 3px; margin-top: 1px; }
.check p { color: #e2e8f0; font-size: 21px; }

.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.col { background: rgba(30,41,59,.65); border: 1px solid rgba(148,163,184,.18); border-radius: 14px; padding: 16px 14px; border-top: 4px solid #38bdf8; }
.col.tone-good { border-top-color: #10b981; } .col.tone-bad { border-top-color: #f43f5e; }
.col h3 { font-size: 21px; margin-bottom: 12px; }
.col li { display: grid; grid-template-columns: 20px 1fr; gap: 8px; margin-top: 11px; }
.col .ic { width: 20px; height: 20px; margin-top: 3px; color: #38bdf8; }
.tone-good .ic { color: #34d399; } .tone-bad .ic { color: #fb7185; }
.col p { font-size: 19px; line-height: 1.33; }

.cards { display: grid; gap: 12px; } .cards.two { grid-template-columns: 1fr 1fr; }
.card { background: rgba(30,41,59,.65); border: 1px solid rgba(148,163,184,.18); border-radius: 14px; padding: 16px; }
.card .idx { display: block; font-size: 15px; font-weight: 800; color: #34d399; letter-spacing: .06em; margin-bottom: 6px; }
.card h3 { margin-bottom: 6px; } .cards.two p { font-size: 19px; line-height: 1.33; }

.flow { display: flex; flex-direction: column; align-items: center; }
.stage { width: var(--w); background: rgba(30,41,59,.7); border: 1px solid rgba(52,211,153,.35); border-radius: 14px; padding: 14px 18px; text-align: center; }
.stage h3 { margin-bottom: 4px; color: #6ee7b7; }
.arrow { width: 28px; height: 28px; color: #34d399; margin: 6px 0; }
.loop { display: flex; align-items: center; gap: 10px; margin-top: 14px; color: #34d399; font-size: 18px; font-weight: 700; }
.loop svg { width: 24px; height: 24px; }

.decision .q { display: grid; grid-template-columns: 40px 1fr; gap: 14px; align-items: center; background: rgba(245,158,11,.1);
  border: 1px solid rgba(251,191,36,.45); border-radius: 14px; padding: 16px; }
.decision .qmark { width: 40px; height: 40px; border-radius: 50%; background: #f59e0b; color: #1c1002; font-weight: 800; font-size: 24px; display: grid; place-items: center; }
.decision .q p { color: #fff; font-weight: 700; font-size: 21px; }
.decision ul { margin: 0 0 0 19px; border-left: 2px solid rgba(148,163,184,.3); padding: 6px 0 0 0; }
.decision li { position: relative; margin-top: 14px; padding-left: 26px; }
.decision li::before { content: ''; position: absolute; left: 0; top: 18px; width: 18px; height: 2px; background: rgba(148,163,184,.3); }
.decision .ans { display: inline-block; font-size: 17px; font-weight: 800; border-radius: 8px; padding: 4px 11px; margin-bottom: 6px;
  background: rgba(56,189,248,.14); color: #7dd3fc; border: 1px solid rgba(56,189,248,.4); }
.decision .tone-good .ans { background: rgba(16,185,129,.14); color: #6ee7b7; border-color: rgba(52,211,153,.45); }
.decision .tone-bad .ans { background: rgba(244,63,94,.12); color: #fda4af; border-color: rgba(251,113,133,.45); }

table { width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid rgba(148,163,184,.2); border-radius: 14px; overflow: hidden; }
th { text-align: left; font-size: 17px; font-weight: 800; color: #34d399; text-transform: uppercase; letter-spacing: .05em; background: rgba(16,185,129,.1); padding: 12px; }
td { font-size: 19px; line-height: 1.33; color: #cbd5e1; padding: 12px; border-top: 1px solid rgba(148,163,184,.14); vertical-align: top; font-weight: 500; }
td:first-child { color: #fff; font-weight: 700; }
tbody tr:nth-child(even) td { background: rgba(30,41,59,.45); }

.note { margin-top: 18px; font-size: 17px; color: #94a3b8; font-style: italic; }
footer { margin-top: 22px; padding-top: 14px; border-top: 1px solid rgba(148,163,184,.16); display: flex; justify-content: space-between; align-items: center; }
footer span { font-size: 15px; font-weight: 700; color: #64748b; letter-spacing: .02em; }
footer b { color: #34d399; font-weight: 800; }
`;

const page = (im) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div id="card"><span class="kicker">${KICKER[im.type]}</span><h2>${esc(im.title)}</h2>${body(im)}
${im.note ? `<p class="note">${esc(im.note)}</p>` : ''}
<footer><span><b>Jays</b>MoneyGuides</span><span>jaysmoneyguides.com</span></footer></div></body></html>`;

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(SPECS).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 800 }, deviceScaleFactor: SCALE });
const tab = await ctx.newPage();
const problems = [];

for (const slug of slugs) {
  const spec = JSON.parse(readFileSync(join(SPECS, `${slug}.json`), 'utf8'));
  const dir = join(OUT, slug);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const key of Object.keys(manifest)) if (key.startsWith(`/images/guides/${slug}/`)) delete manifest[key];

  for (const [i, im] of spec.images.entries()) {
    await tab.setContent(page(im), { waitUntil: 'load' });
    await tab.evaluate(() => document.fonts.ready);
    // Anything wider than its box would be cut off in the image: report it.
    const over = await tab.evaluate(() => [...document.querySelectorAll('#card *')]
      .filter((el) => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== 'visible' || el.getBoundingClientRect().right > document.querySelector('#card').getBoundingClientRect().right - 10)
      .map((el) => el.className || el.tagName));
    if (over.length) problems.push(`${slug} #${i + 1}: ${over.join(', ')}`);
    const card = await tab.$('#card');
    const box = await card.boundingBox();
    const png = await card.screenshot({ type: 'png' });
    const name = `${i + 1}-${fileSlug(im.title)}.webp`;
    await sharp(png).webp({ quality: 76, smartSubsample: true, effort: 6 }).toFile(join(dir, name));
    manifest[`/images/guides/${slug}/${name}`] = { width: Math.round(box.width), height: Math.round(box.height) };
  }
  process.stdout.write('.');
}
await browser.close();

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
console.log(`\n${slugs.length} guides rendered`);
if (problems.length) { console.log('Overflow:\n' + problems.join('\n')); process.exitCode = 1; }

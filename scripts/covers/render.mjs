// Renders a branded cover for every guide.
//
//   node scripts/covers/render.mjs [slug ...]
//
// Reads content/covers.json ({ slug: { title, category, icon } }; icon is a
// lucide icon name), lays each cover out at 1200x630 with the site's Manrope
// font in headless Chromium, and writes:
//   public/images/covers/<slug>.webp  - shown on the site (cards, article hero)
//   public/images/covers/<slug>.jpg   - used for social sharing (Open Graph)
//   public/images/covers/<slug>-card.webp - text-free 800x450 artwork for
//     article cards, where the card already prints the title and labels
//
// If a guide's title changes, update content/covers.json and re-run.
// Needs Playwright (not a site dependency): set PLAYWRIGHT_DIR to a folder
// whose node_modules has it, and CHROMIUM_PATH if its browser isn't installed.

import { readFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { icons } from 'lucide-react';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const req = createRequire(process.env.PLAYWRIGHT_DIR ? join(process.env.PLAYWRIGHT_DIR, 'x.js') : import.meta.url);
const { chromium } = req('playwright');

const OUT = join(root, 'public', 'images', 'covers');
const covers = JSON.parse(readFileSync(join(root, 'content', 'covers.json'), 'utf8'));
const font = readFileSync(join(root, 'app', 'fonts', 'manrope-latin-var.woff2')).toString('base64');

// Same hues as the category pills on the site.
const ACCENT = {
  'Affiliate Marketing': ['#34d399', '#10b981'],
  SEO: ['#38bdf8', '#0ea5e9'],
  Blogging: ['#a78bfa', '#8b5cf6'],
  Entrepreneurship: ['#fbbf24', '#f59e0b'],
  Tech: ['#22d3ee', '#06b6d4'],
  'SoFi Bank': ['#60a5fa', '#3b82f6'],
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pascal = (n) => n.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join('');

function html({ title, category, icon }) {
  const [light, base] = ACCENT[category] ?? ACCENT['Affiliate Marketing'];
  const Icon = icons[pascal(icon)];
  if (!Icon) throw new Error(`unknown icon ${icon}`);
  const svg = renderToStaticMarkup(createElement(Icon, { size: 168, strokeWidth: 1.5, color: light, absoluteStrokeWidth: false }));
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Manrope; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 200 800; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; font-family: Manrope, sans-serif; -webkit-font-smoothing: antialiased; }
#cover { position: relative; width: 1200px; height: 630px; overflow: hidden; color: #fff;
  background:
    radial-gradient(520px 420px at 82% 50%, ${base}38, transparent 70%),
    radial-gradient(700px 500px at 0% 100%, ${base}14, transparent 70%),
    linear-gradient(160deg, #0b1324 0%, #060b16 100%); }
#cover::before { content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(rgba(148,163,184,.16) 1.4px, transparent 1.6px); background-size: 28px 28px;
  -webkit-mask-image: linear-gradient(90deg, transparent 30%, #000 75%); }
#cover::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 8px; background: linear-gradient(90deg, ${base}, ${light} 55%, transparent); }
.rings { position: absolute; left: 954px; top: 315px; }
.rings i { position: absolute; border-radius: 50%; border: 1.5px solid ${light}; transform: translate(-50%, -50%); }
.rings i:nth-child(1) { width: 470px; height: 470px; opacity: .16; }
.rings i:nth-child(2) { width: 640px; height: 640px; opacity: .08; }
.tile { position: absolute; left: 954px; top: 315px; width: 300px; height: 300px; transform: translate(-50%, -50%);
  border-radius: 72px; display: grid; place-items: center;
  background: linear-gradient(145deg, ${base}40, #0b1324 70%); border: 2px solid ${light}80;
  box-shadow: 0 0 90px ${base}55, inset 0 1px 0 rgba(255,255,255,.12); }
.left { position: absolute; left: 96px; top: 0; bottom: 0; width: 640px; display: flex; flex-direction: column; justify-content: center; padding: 120px 0 96px; }
.cat { display: flex; align-items: center; gap: 14px; font-size: 22px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: ${light}; margin-bottom: 22px; }
.cat b { width: 40px; height: 4px; border-radius: 4px; background: ${light}; }
h1 { font-size: 66px; line-height: 1.07; font-weight: 800; letter-spacing: -.02em; text-wrap: balance; }
.brand { position: absolute; left: 96px; bottom: 48px; font-size: 24px; font-weight: 800; color: #94a3b8; letter-spacing: .01em; }
.brand span { color: #34d399; }
</style></head><body><div id="cover">
<div class="rings"><i></i><i></i></div><div class="tile">${svg}</div>
<div class="left"><div class="cat"><b></b>${esc(category)}</div><h1>${esc(title)}</h1></div>
<div class="brand"><span>Jays</span>MoneyGuides</div>
</div></body></html>`;
}

function cardHtml({ category, icon }) {
  const [light, base] = ACCENT[category] ?? ACCENT['Affiliate Marketing'];
  const Icon = icons[pascal(icon)];
  const svg = renderToStaticMarkup(createElement(Icon, { size: 120, strokeWidth: 1.5, color: light }));
  return `<!doctype html><html><head><meta charset="utf-8"><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
#card { position: relative; width: 800px; height: 450px; overflow: hidden;
  background: radial-gradient(380px 300px at 50% 52%, ${base}40, transparent 72%), linear-gradient(160deg, #0b1324, #060b16); }
#card::before { content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(rgba(148,163,184,.16) 1.4px, transparent 1.6px); background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(closest-side, #000 30%, transparent); }
.rings i { position: absolute; left: 400px; top: 225px; border-radius: 50%; border: 1.5px solid ${light}; transform: translate(-50%, -50%); }
.rings i:nth-child(1) { width: 330px; height: 330px; opacity: .18; }
.rings i:nth-child(2) { width: 470px; height: 470px; opacity: .09; }
.rings i:nth-child(3) { width: 620px; height: 620px; opacity: .05; }
.tile { position: absolute; left: 400px; top: 225px; width: 210px; height: 210px; transform: translate(-50%, -50%);
  border-radius: 52px; display: grid; place-items: center;
  background: linear-gradient(145deg, ${base}40, #0b1324 70%); border: 2px solid ${light}80;
  box-shadow: 0 0 70px ${base}55, inset 0 1px 0 rgba(255,255,255,.12); }
</style></head><body><div id="card"><div class="rings"><i></i><i></i><i></i></div><div class="tile">${svg}</div></div></body></html>`;
}

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(covers);
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
const long = [];

for (const slug of slugs) {
  await page.setContent(html(covers[slug]), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // Keep the title to three lines: step the size down until it fits.
  const lines = await page.evaluate(() => {
    const h = document.querySelector('h1');
    for (const size of [66, 60, 56, 52]) {
      h.style.fontSize = `${size}px`;
      const n = Math.round(h.getBoundingClientRect().height / (size * 1.07));
      if (n <= 3) return n;
    }
    return 4;
  });
  if (lines > 3) long.push(slug);
  const png = await page.locator('#cover').screenshot({ type: 'png' });
  await sharp(png).webp({ quality: 82, smartSubsample: true, effort: 6 }).toFile(join(OUT, `${slug}.webp`));
  await sharp(png).flatten({ background: '#060b16' }).jpeg({ quality: 84, mozjpeg: true }).toFile(join(OUT, `${slug}.jpg`));
  await page.setViewportSize({ width: 800, height: 450 });
  await page.setContent(cardHtml(covers[slug]), { waitUntil: 'load' });
  const cardPng = await page.locator('#card').screenshot({ type: 'png' });
  await sharp(cardPng).webp({ quality: 80, smartSubsample: true, effort: 6 }).toFile(join(OUT, `${slug}-card.webp`));
  await page.setViewportSize({ width: 1200, height: 630 });
  process.stdout.write('.');
}
await browser.close();
console.log(`\n${slugs.length} covers rendered`);
if (long.length) { console.log('Title longer than 3 lines:', long.join(', ')); process.exitCode = 1; }

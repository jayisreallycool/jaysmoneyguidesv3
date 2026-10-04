import 'server-only';

/**
 * Minimal, dependency-free markdown → HTML renderer that runs on the SERVER
 * (React Server Component), so article bodies ship as HTML with zero client JS.
 *
 * Supports: h1–h4 (with id anchors), bold, italic, inline code, links
 * (paid/referral links → rel="sponsored nofollow"), plain images, clickable-image banners
 * [![alt](img)](href), blockquotes, bulleted and numbered lists, code fences,
 * horizontal rules, tables, and paragraphs.
 */

export interface TocItem { level: number; text: string; id: string; }

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Extract h2/h3 headings for table of contents. */
export function extractToc(md: string): TocItem[] {
  const toc: TocItem[] = [];
  const seen: Record<string, number> = {};
  for (const line of md.split('\n')) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const text = m[2].replace(/\*\*?([^*]+)\*\*?/g, '$1').replace(/`([^`]+)`/g, '$1');
    let id = slugify(text);
    seen[id] = (seen[id] ?? 0) + 1;
    if (seen[id] > 1) id = `${id}-${seen[id]}`;
    toc.push({ level: m[1].length, text, id });
  }
  return toc;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape for use inside an HTML attribute value (href, src, alt). */
function escAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Return the URL only if it's a safe scheme; otherwise return fallback. */
function safeUrl(url: string, fallback = '#'): string {
  const trimmed = url.trim();
  if (
    /^https?:\/\//i.test(trimmed) ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  ) {
    return trimmed;
  }
  return fallback;
}

const SITE = 'https://www.jaysmoneyguides.com';

/**
 * Link attributes. Only links that can pay the site are marked "sponsored"
 * (and nofollow) — referral/invite links and the /go/ redirects. Ordinary
 * outbound links to sources (FTC, studentaid.gov, a program's own terms) are
 * normal citations and are left followable.
 */
const PAID_LINK = /sofi\.com\/(invite|referral)|[?&](ref|aff|affiliate|via|tag|irclickid|utm_medium=affiliate)=|\/go\//i;
function linkAttrs(url: string): string {
  const external = /^https?:\/\//i.test(url) && !url.startsWith(SITE);
  if (PAID_LINK.test(url)) return ' target="_blank" rel="sponsored nofollow noopener noreferrer"';
  return external ? ' target="_blank" rel="noopener noreferrer"' : '';
}

function inline(text: string): string {
  // NOTE: We process on the RAW text for markdown patterns first, then escape
  // individual parts. This avoids double-escaping while keeping XSS safety.

  // inline images first (so links don't mangle them)
  // Pattern captures before HTML escaping so we can properly escape each part.
  let t = text.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt, src) => {
    const safeSrc = safeUrl(src, '');
    if (!safeSrc) return '';
    return `<img src="${escAttr(safeSrc)}" alt="${escAttr(alt)}" loading="lazy" class="inline-img" />`;
  });

  // links — capture raw, escape each attribute part individually
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, url) => {
    const safe = safeUrl(url);
    const attrs = linkAttrs(url);
    // label may contain markdown (bold/italic/code) — escape it then process
    return `<a href="${escAttr(safe)}"${attrs}>${esc(label)}</a>`;
  });

  // Now escape remaining text (non-link, non-image portions)
  // We need to escape only the literal text parts, not the HTML we injected.
  // Split on injected tags and escape the non-tag parts.
  t = t.replace(/(<[^>]+>)|([^<]+)/g, (_m, tag, txt) => {
    if (tag) return tag; // already valid HTML
    return esc(txt ?? '');
  });

  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  t = t.replace(/`([^`]+)`/g, (_m, code) => `<code>${esc(code)}</code>`);
  return t;
}

export function markdownToHtml(md: string): string {
  const blocks = md.split(/\r?\n\r?\n/);
  const out: string[] = [];

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    // code fence
    if (block.startsWith('```')) {
      const body = block.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '');
      out.push(`<pre><code>${esc(body)}</code></pre>`);
      continue;
    }

    // clickable image / banner: [![alt](img)](href)
    const click = block.match(/^\[!\[([^\]]*)\]\(([^)\s]+)\)\]\(([^)\s]+)\)/);
    if (click) {
      const [, alt, img, href] = click;
      const safeSrc = safeUrl(img, '');
      const safeHref = safeUrl(href);
      const attrs = linkAttrs(href);
      if (safeSrc) {
        out.push(
          `<a href="${escAttr(safeHref)}"${attrs} class="banner-link">` +
            `<img src="${escAttr(safeSrc)}" alt="${escAttr(alt)}" loading="lazy" class="banner-img" />` +
          `</a>`
        );
        continue;
      }
    }

    // plain image -> figure with a caption (alt text shown below the image)
    const img = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
    if (img) {
      const [, alt, src] = img;
      const safe = safeUrl(src, '');
      if (safe) {
        const caption = alt
          ? `<figcaption class="img-caption">${esc(alt)}</figcaption>`
          : '';
        out.push(`<figure class="content-figure"><img src="${escAttr(safe)}" alt="${escAttr(alt)}" loading="lazy" class="content-img" />${caption}</figure>`);
        continue;
      }
    }

    // headings (with anchor ids for TOC)
    const h = block.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2];
      // The page template already prints the article title as the one <h1>.
      if (level === 1) continue;
      // slugify strips all non-alphanumeric chars so id is always safe
      const id = slugify(text.replace(/\*\*?([^*]+)\*\*?/g, '$1').replace(/`([^`]+)`/g, '$1'));
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      continue;
    }

    // horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(block)) {
      out.push('<hr />');
      continue;
    }

    // table (pipe-delimited)
    if (block.includes('|') && block.split('\n').length >= 2) {
      const rows = block.split('\n').filter(Boolean);
      const isTable = rows[0].includes('|') && rows.length >= 2 && /^\|?[\s:-]+\|/.test(rows[1]);
      if (isTable) {
        const headerCells = rows[0].split('|').map(c => c.trim()).filter(Boolean);
        const bodyRows = rows.slice(2);
        const header = `<thead><tr>${headerCells.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead>`;
        const body = bodyRows.map(r => {
          const cells = r.split('|').map(c => c.trim()).filter(Boolean);
          return `<tr>${cells.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`;
        }).join('');
        out.push(`<div class="table-wrap"><table>${header}<tbody>${body}</tbody></table></div>`);
        continue;
      }
    }

    // blockquote
    if (block.startsWith('>')) {
      const inner = block.split('\n').map((l) => l.replace(/^>\s?/, '')).join(' ');
      out.push(`<blockquote>${inline(inner)}</blockquote>`);
      continue;
    }

    // unordered list
    if (/^[*-]\s+/.test(block)) {
      const items = block.split('\n').filter((l) => /^[*-]\s+/.test(l))
        .map((l) => `<li>${inline(l.replace(/^[*-]\s+/, ''))}</li>`).join('');
      out.push(`<ul>${items}</ul>`);
      continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(block)) {
      const items = block.split('\n').filter((l) => /^\d+\.\s+/.test(l))
        .map((l) => `<li>${inline(l.replace(/^\d+\.\s+/, ''))}</li>`).join('');
      out.push(`<ol>${items}</ol>`);
      continue;
    }

    // paragraph
    out.push(`<p>${inline(block)}</p>`);
  }

  return out.join('\n');
}

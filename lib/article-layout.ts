/**
 * Where ads and the referral banner go inside an article.
 *
 * Mobile-first rules (they hold on desktop too):
 *  - only at a section break (before an H2), never inside a paragraph, list or table
 *  - never in the first ~150 or last ~150 words
 *  - at least ~250 words of article between any two inserts, so an ad is
 *    never stacked on the referral banner or on another ad
 *  - the number of ads follows the article's length: one in a short guide,
 *    two in a medium one, three in a long one — spread top, middle, bottom
 */
export type Piece = { kind: 'md'; md: string } | { kind: 'ad' } | { kind: 'banner' };

const MIN_EDGE = 150;
const MIN_GAP = 250;

export function layoutArticle(markdown: string, withBanner: boolean): Piece[] {
  const blocks = markdown.split(/\r?\n\r?\n/);
  const words: number[] = [];
  let total = 0;
  for (const b of blocks) { words.push(total); total += b.split(/\s+/).filter(Boolean).length; }

  const candidates = blocks
    .map((b, i) => (i > 0 && /^##\s/.test(b.trim()) ? i : -1))
    .filter((i) => i > 0 && words[i] >= MIN_EDGE && total - words[i] >= MIN_EDGE);

  const chosen: { at: number; kind: 'ad' | 'banner' }[] = [];
  const free = (gap: number) => (i: number) => chosen.every((c) => c.at !== i && Math.abs(words[c.at] - words[i]) >= gap);
  const place = (fraction: number, kind: 'ad' | 'banner', gap = MIN_GAP) => {
    const target = total * fraction;
    const best = candidates.filter(free(gap)).sort((a, b) => Math.abs(words[a] - target) - Math.abs(words[b] - target))[0];
    if (best !== undefined) chosen.push({ at: best, kind });
  };

  if (withBanner) place(0.45, 'banner');
  const fractions = total < 900 ? [0.5] : total < 1400 ? [0.28, 0.72] : [0.22, 0.6, 0.85];
  for (const f of fractions) place(f, 'ad');
  // Short guide where the banner took the only good break: still give it one
  // ad, as long as there is a separate section break ~150 words away.
  if (!chosen.some((c) => c.kind === 'ad')) place(0.7, 'ad', MIN_EDGE);

  const pieces: Piece[] = [];
  let from = 0;
  for (const c of chosen.sort((a, b) => a.at - b.at)) {
    pieces.push({ kind: 'md', md: blocks.slice(from, c.at).join('\n\n') }, { kind: c.kind });
    from = c.at;
  }
  pieces.push({ kind: 'md', md: blocks.slice(from).join('\n\n') });
  // No section break was suitable for the banner: put it after the article.
  if (withBanner && !chosen.some((c) => c.kind === 'banner')) pieces.push({ kind: 'banner' });
  return pieces;
}

/**
 * Guide covers come in two versions (see scripts/covers/render.mjs):
 *  - /images/covers/<slug>.webp       title + artwork: article page and sharing
 *  - /images/covers/<slug>-card.webp  artwork only: cards, which print the title
 *    and labels themselves (text inside the image would clash with them)
 */
const BRANDED = /^\/images\/covers\/([\w-]+)\.webp$/;

export function cardCover(src: string | undefined | null, fallback = '/jay-affiliate-marketing-guides-hero-800.webp'): string {
  if (!src) return fallback;
  const m = src.match(BRANDED);
  return m && !m[1].endsWith('-card') ? `/images/covers/${m[1]}-card.webp` : src;
}

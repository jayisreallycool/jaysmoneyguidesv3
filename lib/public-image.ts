import publicFiles from './public-files.generated.json';

/**
 * Guards against referencing local images that aren't deployed.
 * The manifest is regenerated before every dev/build run
 * (scripts/gen-public-manifest.mjs), so adding the real file to /public is
 * all it takes for it to be used again.
 */
const PUBLIC_FILES = new Set<string>(publicFiles as string[]);

/** Always-present brand image used when a cover is missing. */
export const FALLBACK_COVER = '/jay-affiliate-marketing-guides-hero-800.webp';
export const FALLBACK_OG_IMAGE = '/jay-affiliate-marketing-guides-hero-1200.webp';

/** True for remote URLs and for local paths that exist in /public. */
export function imageExists(src?: string | null): boolean {
  if (!src) return false;
  if (!src.startsWith('/')) return true; // remote (Firebase, Unsplash, …)
  return PUBLIC_FILES.has(decodeURI(src.split(/[?#]/)[0]));
}

export function safeCover(src?: string | null): string {
  return imageExists(src) ? (src as string) : FALLBACK_COVER;
}

/**
 * Remove markdown images whose local file is missing.
 *  - `[![alt](missing)](href)` becomes a plain text link, so CTAs keep working
 *  - `![alt](missing)` is dropped
 */
export function stripMissingImages(markdown: string): string {
  if (!markdown) return markdown;
  return markdown
    .replace(/\[!\[([^\]]*)\]\(([^)\s]+)[^)]*\)\]\(([^)]+)\)/g, (m, alt: string, src: string, href: string) =>
      imageExists(src) ? m : `**[${alt} →](${href})**`
    )
    .replace(/^[ \t]*!\[[^\]]*\]\(([^)\s]+)[^)]*\)[ \t]*\n?/gm, (m, src: string) => (imageExists(src) ? m : ''))
    .replace(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g, (m, src: string) => (imageExists(src) ? m : ''));
}

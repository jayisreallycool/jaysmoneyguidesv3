import 'server-only';
import { INITIAL_POSTS } from './posts-data/initialPosts';
import { PRODUCTS } from './products';
import type { BlogPost, Product } from './types';

/**
 * Topic clusters. Each category has one "start here" guide (the pillar) that
 * the rest of the category's guides support. The pillar links down to every
 * guide in the topic, and every guide links back up to it, so no guide is
 * left without a way in.
 */
const PILLARS: Record<string, string> = {
  'Affiliate Marketing': 'affiliate-marketing-viable-solution-2026',
  SEO: '2026-practical-seo-checklist',
  Blogging: 'how-to-start-a-profitable-blog-2026',
  Tech: 'solopreneur-tech-stack-2026',
  Entrepreneurship: 'validate-digital-business-idea-48-hours',
  'SoFi Bank': 'sofi-referral-bonus-guide',
};

/** Which ebook fits a category's readers (falls back to the free one). */
const EBOOK_FOR: Record<string, string> = {
  'Affiliate Marketing': 'affiliate-marketing-beginners',
  SEO: 'seo-mastery-guide',
  Blogging: 'how-to-start-a-successful-blog',
  Entrepreneurship: 'seo-digital-empire-blueprint',
  Tech: 'how-to-start-a-successful-blog',
};

const published = () => INITIAL_POSTS.filter((p) => !(p as { isDraft?: boolean }).isDraft);

export function getPillar(category: string): BlogPost | undefined {
  const slug = PILLARS[category];
  return slug ? published().find((p) => p.slug === slug) : undefined;
}

export function isPillar(post: BlogPost): boolean {
  return PILLARS[post.category] === post.slug;
}

/** Every other guide in the pillar's topic, for the "all guides in this topic" list. */
export function getClusterPosts(post: BlogPost): BlogPost[] {
  return published().filter((p) => p.category === post.category && p.slug !== post.slug);
}

export function getEbookFor(post: BlogPost): Product | undefined {
  const slug = EBOOK_FOR[post.category];
  return PRODUCTS.find((p) => p.slug === slug) ?? PRODUCTS.find((p) => p.isFree) ?? PRODUCTS[0];
}

const STOP = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'your', 'you', 'how', 'what', 'why', 'when', 'from', 'into', 'are', 'can', 'guide', 'guides', 'best', 'without', 'actually', 'realistic', 'practical', 'building', 'build']);
const words = (s: string) => new Set(s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(' ').filter((w) => w.length > 2 && !STOP.has(w)));
const linkedFrom = (p: BlogPost) => new Set([...p.content.matchAll(/\]\(\/guide\/([^)#\s]+)/g)].map((m) => m[1]));

/**
 * Related guides chosen by relevance, not by position in the list:
 * the same topic counts most, then shared tags and title/keyword words;
 * guides the article already links to in its text are marked down so the
 * reader is offered something new. Deterministic, so pages stay cacheable.
 */
export function getRelatedByRelevance(post: BlogPost, limit = 3): BlogPost[] {
  const mine = words([post.title, ...(post.tags ?? []), ...(post.seoKeywords ?? [])].join(' '));
  const myTags = new Set((post.tags ?? []).map((t) => t.toLowerCase()));
  const already = linkedFrom(post);

  // How many guides link to each guide — used to favour ones nobody links to yet.
  const inbound: Record<string, number> = {};
  for (const p of published()) for (const s of linkedFrom(p)) inbound[s] = (inbound[s] ?? 0) + 1;

  return published()
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const theirs = words([p.title, ...(p.tags ?? []), ...(p.seoKeywords ?? [])].join(' '));
      let score = 0;
      for (const w of theirs) if (mine.has(w)) score += 2;
      for (const t of p.tags ?? []) if (myTags.has(t.toLowerCase())) score += 3;
      if (p.category === post.category) score += 8;
      if (already.has(p.slug)) score -= 3; // already offered in the text — prefer something new
      if (!inbound[p.slug]) score += 2;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || a.p.slug.localeCompare(b.p.slug))
    .slice(0, limit)
    .map((x) => x.p);
}

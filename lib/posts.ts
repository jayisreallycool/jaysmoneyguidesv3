import 'server-only';
import { INITIAL_POSTS } from './posts-data/initialPosts';
import type { BlogPost, BlogPostSummary } from './types';

export type { BlogPost, BlogPostSummary };

/** All published posts (server-side; no client bundle cost). */
export async function getAllPosts(): Promise<BlogPost[]> {
  return INITIAL_POSTS.filter((p) => !(p as { isDraft?: boolean }).isDraft);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return INITIAL_POSTS.find((p) => p.slug === slug);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return INITIAL_POSTS.filter((p) => p.category === category);
}

export async function getAllCategories(): Promise<string[]> {
  return Array.from(new Set(INITIAL_POSTS.map((p) => p.category)));
}

export async function getPostSummaries(): Promise<BlogPostSummary[]> {
  return (await getAllPosts()).map(({ content: _content, ...summary }) => summary);
}

import { BlogPost } from '../types';
import { AFFILIATE_POSTS } from './affiliatePosts';
import { SEO_POSTS } from './seoPosts';
import { BLOGGING_POSTS } from './bloggingPosts';
import { TECH_POSTS } from './techPosts';
import { ENTREPRENEURSHIP_POSTS } from './entrepreneurshipPosts';
import { SOFI_POSTS } from './sofiPosts';
import { safeCover, stripMissingImages } from '../public-image';

const ALL_RAW_POSTS: BlogPost[] = [
  ...AFFILIATE_POSTS,
  ...SEO_POSTS,
  ...ENTREPRENEURSHIP_POSTS,
  ...BLOGGING_POSTS,
  ...TECH_POSTS,
  ...SOFI_POSTS
];

// Reset all mock data viewed, liked, rating, and votes to 0 baseline
export const INITIAL_POSTS: BlogPost[] = ALL_RAW_POSTS.map(post => ({
  ...post,
  // Never point at a local image that isn't deployed (see lib/public-image.ts)
  coverImage: safeCover(post.coverImage),
  content: stripMissingImages(post.content),
  views: 0,
  likes: 0,
  rating: 0,
  ratingCount: 0,
}));

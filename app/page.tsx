import { getPostSummaries } from '@/lib/posts';
import { PRODUCTS } from '@/lib/products';
import { HomeClient } from '@/components/client/HomeClient';
import { JsonLd } from '@/components/server/JsonLd';
import {
  ebookItemListSchema,
  blogItemListSchema,
  personSchema,
} from '@/lib/seo';

export default async function HomePage() {
  // All summaries are static in-memory data — no DB call, no network cost.
  // Pass all of them to the client so it never needs to fetch /api/posts.
  const posts = await getPostSummaries();

  return (
    <>
      {/* Structured data — injected server-side, zero JS cost */}
      <JsonLd data={personSchema()} />
      <JsonLd data={ebookItemListSchema(PRODUCTS)} />
      <JsonLd data={blogItemListSchema(posts.slice(0, 20))} />
      {/*
        Pass all posts: the client starts with 6 visible but has the full list
        pre-loaded — no client-side fetch to /api/posts ever needed.
        initialPostsLoaded=true signals HomeClient to skip the lazy fetch.
      */}
      <HomeClient posts={posts} products={PRODUCTS} />
    </>
  );
}

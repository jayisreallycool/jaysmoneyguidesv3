import { getAllPosts } from '@/lib/posts';
import { SITE, SITE_NAME } from '@/lib/seo';

// ─── RSS 2.0 feed (/feed.xml) ────────────────────────────────────────────────
// Built from the same posts data as the sitemap, so feed readers and
// aggregators pick up new guides automatically. Discovered sitewide via the
// <link rel="alternate" type="application/rss+xml"> tag in app/layout.tsx.

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(): Promise<Response> {
  const posts = [...(await getAllPosts())].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const items = posts
    .map((post) => {
      const url = `${SITE}/guide/${post.slug}`;
      const description =
        (post as { metaDescription?: string }).metaDescription ?? post.excerpt;
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(description)}</description>`,
        `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
        `      <category>${escapeXml(post.category)}</category>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${SITE_NAME} — Guides &amp; Blueprints</title>`,
    `    <link>${SITE}</link>`,
    `    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
    '    <description>Actionable guides on affiliate marketing, SEO, blogging, e-commerce, and building profitable online businesses. By Jay Lopez.</description>',
    '    <language>en-us</language>',
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

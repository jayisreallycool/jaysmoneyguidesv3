import { notFound } from 'next/navigation';
import { getPillar } from '@/lib/topics';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllCategories, getPostsByCategory, getPostSummaries } from '@/lib/posts';
import { PostCard } from '@/components/server/PostCard';
import { JsonLd } from '@/components/server/JsonLd';
import { SITE, SITE_NAME, categoryPageSchema, categoryItemListSchema, personSchema } from '@/lib/seo';
import { BookOpen, ArrowRight, Home, ChevronRight, Clock, Star } from 'lucide-react';

export const dynamicParams = false;

export async function generateStaticParams() {
  const cats = await getAllCategories();
  // Return the raw name — Next encodes it for the URL itself. Pre-encoding here
  // double-encoded names with spaces, so /category/Affiliate%20Marketing and
  // /category/SoFi%20Bank returned 404 (dynamicParams is false).
  return cats.map((c) => ({ category: c }));
}

// ── Per-category SEO copy ──────────────────────────────────────────────────────
const CATEGORY_META: Record<string, { description: string; blurb: string; emoji: string }> = {
  'Affiliate Marketing': {
    emoji: '💰',
    description:
      'Free affiliate marketing guides by Jay Lopez — high-ticket programs, commission structures, conversion strategies, and actionable blueprints for building recurring income.',
    blurb:
      'Step-by-step affiliate marketing blueprints. From choosing the right programs to building content that converts.',
  },
  'SEO': {
    emoji: '🔍',
    description:
      'Free SEO guides by Jay Lopez — keyword research, on-page optimization, link building, and content strategies that drive organic traffic to your online business.',
    blurb:
      'Rank higher, get found faster. Practical SEO strategies built for independent content creators and online business owners.',
  },
  'Blogging': {
    emoji: '✍️',
    description:
      'Free blogging guides by Jay Lopez — monetization strategies, content systems, niche selection, and audience-building blueprints for profitable blogs.',
    blurb:
      'Turn your blog into a real income source. Content strategy, monetization, and audience growth — no fluff.',
  },
  'Entrepreneurship': {
    emoji: '🚀',
    description:
      'Free entrepreneurship guides by Jay Lopez — online business models, side-income strategies, tools, and frameworks for building and scaling independent businesses.',
    blurb:
      'Build something that earns. Business models, growth frameworks, and real strategies from an independent operator.',
  },
  'Tech': {
    emoji: '⚙️',
    description:
      'Free tech guides by Jay Lopez — no-code automation, AI tools, developer resources, and analytics platforms for building and scaling online businesses without a tech team.',
    blurb:
      'The tech stack that runs modern online businesses. No-code tools, AI workflows, and analytics — built for solopreneurs.',
  },
  'SoFi Bank': {
    emoji: '🏦',
    description:
      'Free SoFi Bank guides by Jay Lopez — high-yield savings, refinancing, personal loans, and smart money moves that help online business owners manage and grow their income.',
    blurb:
      'Make your money work harder. SoFi banking, savings, and loan strategies for independent business owners.',
  },
};

function getCategoryMeta(name: string) {
  return (
    CATEGORY_META[name] ?? {
      emoji: '📖',
      description: `Free ${name} guides and blueprints by Jay Lopez on ${SITE_NAME}. Practical strategies for building profitable online businesses.`,
      blurb: `In-depth ${name} guides — practical, actionable, and completely free.`,
    }
  );
}

// ── generateMetadata ───────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const { description, emoji } = getCategoryMeta(name);

  const title = `${emoji} ${name} Guides & Blueprints — ${SITE_NAME}`;
  const ogImage = `${SITE}/jay-affiliate-marketing-guides-hero.webp`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/category/${category}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/category/${category}`,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: ogImage, width: 1536, height: 1024, alt: `${name} guides on ${SITE_NAME}` }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@jaysmoneyguides',
      creator: '@jaysmoneyguides',
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const posts = await getPostsByCategory(name);

  if (posts.length === 0) notFound();

  // Featured post: explicitly marked, else most recent
  // The topic's "start here" guide leads the page; the rest support it.
  const featuredPost = getPillar(name) ?? posts.find((p) => p.featured) ?? posts[0];
  const remainingPosts = posts.filter((p) => p.id !== featuredPost.id);

  const { description, blurb, emoji } = getCategoryMeta(name);

  // Structured data — all server-rendered, zero JS cost
  const schemaData = categoryPageSchema(name, posts);
  const listData = categoryItemListSchema(name, posts);
  const personData = personSchema();

  return (
    <>
      {/* Structured data */}
      <JsonLd data={schemaData} />
      <JsonLd data={listData} />
      <JsonLd data={personData} />

      <div className="min-h-screen bg-slate-950">

        {/* ── Breadcrumb nav ── */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-6xl px-4 pt-6 pb-2"
        >
          <ol className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
              >
                <Home className="w-3 h-3" aria-hidden="true" />
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3 h-3 text-slate-600" />
            </li>
            <li>
              <Link
                href="/#guides"
                className="hover:text-emerald-400 transition-colors"
              >
                Guides
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3 h-3 text-slate-600" />
            </li>
            <li className="text-slate-200 font-medium" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>

        {/* ── Category hero header ── */}
        <header className="mx-auto max-w-6xl px-4 pt-6 pb-10">
          <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 px-6 py-8 sm:px-10 sm:py-10 overflow-hidden">
            {/* Background accent */}
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.08),_transparent_60%)] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Category label */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-2xl"
                    role="img"
                    aria-label={name}
                  >
                    {emoji}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    Category
                  </span>
                </div>

                {/* H1 */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                  {name} Guides
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {blurb}
                </p>
              </div>

              {/* Post count badge */}
              <div className="flex-shrink-0 self-start">
                <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3">
                  <BookOpen className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <div>
                    <p className="text-xl font-black text-white leading-none">{posts.length}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {posts.length === 1 ? 'Guide' : 'Free Guides'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full description (slightly muted, for SEO and context) */}
            <p className="relative mt-5 text-xs text-slate-500 leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>
        </header>

        {/* ── Post grid ── */}
        <main
          id="category-posts"
          className="mx-auto max-w-6xl px-4 pb-16"
          aria-label={`${name} guides`}
        >
          {posts.length > 0 ? (
            <>
            {/* Featured post hero */}
            <Link
              href={`/guide/${featuredPost.slug}`}
              className="group mb-8 flex flex-col sm:flex-row gap-0 rounded-2xl border border-slate-800 hover:border-slate-600 bg-slate-900 overflow-hidden transition-all hover:shadow-lg hover:shadow-emerald-500/5"
              aria-label={`Featured guide: ${featuredPost.title}`}
            >
              {/* Cover image */}
              {featuredPost.coverImage && (
                <div className="relative w-full sm:w-72 lg:w-80 h-48 sm:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/30 sm:block hidden" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                    <Star className="w-2.5 h-2.5" aria-hidden="true" />
                    Featured
                  </span>
                </div>
              )}
              {/* Content */}
              <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8 flex-1 min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 mb-2">{name}</span>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white group-hover:text-emerald-300 leading-snug transition-colors mb-3 line-clamp-3">
                  {featuredPost.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {featuredPost.readTimeMinutes} min read
                  </span>
                  {featuredPost.difficulty && (
                    <span className="border border-slate-700 rounded-full px-2 py-0.5">{featuredPost.difficulty}</span>
                  )}
                  <span className="ml-auto flex items-center gap-1 font-semibold text-emerald-500 group-hover:text-emerald-400 transition-colors">
                    Read guide <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Remaining guides grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((p, i) => (
                <PostCard key={p.id} post={p} priority={i < 3} />
              ))}
            </div>
            </>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-semibold">No guides yet in this category.</p>
              <p className="text-sm mt-1">Check back soon — new blueprints drop regularly.</p>
              <Link
                href="/#guides"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 text-slate-950 font-bold px-6 py-2.5 text-sm hover:bg-emerald-400 transition-colors"
              >
                Browse all guides
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          )}

          {/* ── Back to all guides CTA ── */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#guides"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 text-slate-200 font-semibold px-6 py-2.5 text-sm hover:border-emerald-500/50 hover:text-white transition-colors"
            >
              ← All Guides
            </Link>
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-slate-950 font-bold px-6 py-2.5 text-sm hover:bg-emerald-400 transition-colors"
            >
              Browse Free eBooks
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

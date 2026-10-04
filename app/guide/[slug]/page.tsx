import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { getClusterPosts, getEbookFor, getPillar, getRelatedByRelevance, isPillar } from '@/lib/topics';
import { bannerFor, splitForBanner } from '@/lib/affiliate-banners';
import { AffiliateBanner } from '@/components/server/AffiliateBanner';
import { PostBody } from '@/components/server/PostBody';
import { AffiliateClickTracker } from '@/components/client/AffiliateClickTracker';
import { ViewTracker } from '@/components/client/ViewTracker';
import { TableOfContents } from '@/components/server/TableOfContents';
import { extractToc } from '@/lib/markdown';
import { JsonLd } from '@/components/server/JsonLd';
import { articleSchema, breadcrumbSchema, SITE } from '@/lib/seo';
import {
  Clock, BookOpen, ChevronRight, Home, ArrowLeft,
  CheckCircle2, TrendingUp, ArrowRight, Gift,
} from 'lucide-react';
import { AdUnit } from '@/components/client/AdUnit';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE}/guide/${post.slug}`;
  const description = (post as { metaDescription?: string }).metaDescription ?? post.excerpt;
  return {
    // Long titles go out as-is: adding " | JaysMoneyGuides" would push them past
    // what search results show (about 60 characters) and cut the real title.
    title: post.title.length > 42 ? { absolute: post.title } : post.title,
    description,
    keywords: (post as { seoKeywords?: string[] }).seoKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author?.name ?? 'Jay Lopez'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.coverImage],
    },
  };
}

const CATEGORY_COLORS: Record<string, { pill: string; dot: string; bg: string }> = {
  'Affiliate Marketing': { pill: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-400', bg: 'from-emerald-950/40' },
  'SEO':                 { pill: 'text-sky-400 bg-sky-500/10 border-sky-500/25',             dot: 'bg-sky-400',     bg: 'from-sky-950/40' },
  'Blogging':            { pill: 'text-violet-400 bg-violet-500/10 border-violet-500/25',    dot: 'bg-violet-400',  bg: 'from-violet-950/40' },
  'Entrepreneurship':    { pill: 'text-amber-400 bg-amber-500/10 border-amber-500/25',       dot: 'bg-amber-400',   bg: 'from-amber-950/40' },
  'Tech':                { pill: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',          dot: 'bg-cyan-400',    bg: 'from-cyan-950/40' },
  'SoFi Bank':           { pill: 'text-blue-400 bg-blue-500/10 border-blue-500/25',          dot: 'bg-blue-400',    bg: 'from-blue-950/40' },
};
const fallbackColor = { pill: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-400', bg: 'from-emerald-950/40' };

const DIFFICULTY: Record<string, { label: string; color: string }> = {
  Beginner:     { label: 'Beginner',     color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  Intermediate: { label: 'Intermediate', color: 'text-amber-400   bg-amber-500/10   border-amber-500/20' },
  Advanced:     { label: 'Advanced',     color: 'text-red-400     bg-red-500/10     border-red-500/20' },
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

export default async function GuidePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedByRelevance(post, 3);
  const pillar = getPillar(post.category);
  const cluster = isPillar(post) ? getClusterPosts(post) : [];
  const banner = bannerFor(post);
  const [bodyTop, bodyRest] = banner ? splitForBanner(post.content) : [post.content, ''];

  const catColor = CATEGORY_COLORS[post.category] ?? fallbackColor;
  const diff = DIFFICULTY[post.difficulty] ?? DIFFICULTY.Beginner;
  const keyTakeaways = post.keyTakeaways ?? [];
  const toc = extractToc(post.content);

  // The ebook that matches this guide's topic (falls back to the free one)
  const sidebarEbook = getEbookFor(post);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(post)} />

      <div className="bg-slate-950 min-h-screen">

        {/* ── Hero cover ── */}
        <div className={`relative w-full h-52 sm:h-72 lg:h-80 overflow-hidden bg-gradient-to-b ${catColor.bg} to-slate-950`}>
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-20 mix-blend-luminosity"
            />
          )}
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

          {/* Breadcrumb inside hero */}
          <nav aria-label="Breadcrumb" className="absolute top-5 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                  <Home className="w-3 h-3" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li aria-hidden><ChevronRight className="w-3 h-3 text-slate-600" /></li>
              <li>
                <Link
                  href={`/category/${encodeURIComponent(post.category)}`}
                  className="hover:text-white transition-colors"
                >
                  {post.category}
                </Link>
              </li>
              <li aria-hidden><ChevronRight className="w-3 h-3 text-slate-600" /></li>
              <li className="text-slate-300 line-clamp-1 max-w-[180px] sm:max-w-xs">{post.title}</li>
            </ol>
          </nav>
        </div>

        {/* ── Article container ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
          <div className="flex gap-8 xl:gap-12 items-start">

          {/* ── Main content column ── */}
          <div className="min-w-0 flex-1 max-w-3xl">

          {/* ── Header card ── */}
          <header className="mb-8">
            {/* Category + difficulty pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-1 text-xs font-bold ${catColor.pill}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${catColor.dot}`} aria-hidden="true" />
                {post.category}
              </span>
              <span className={`inline-flex items-center border rounded-full px-2.5 py-1 text-xs font-bold ${diff.color}`}>
                {diff.label}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-5">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 pb-6 border-b border-slate-800/70">
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-700 shrink-0">
                  <Image
                    src="/jay-character-small.webp"
                    alt={post.author?.name ?? 'Jay Lopez'}
                    width={24}
                    height={24}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
                <span className="text-slate-300 font-medium">{post.author?.name ?? 'Jay Lopez'}</span>
              </span>
              <time dateTime={post.publishedAt} className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                {formatDate(post.publishedAt)}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <time dateTime={post.updatedAt} className="text-slate-400">Updated {formatDate(post.updatedAt)}</time>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                {post.readTimeMinutes} min read
              </span>
            </div>
          </header>

          {/* ── Ad: Leaderboard below article header (high viewability) ── */}
          <AdUnit slot="GUIDE_TOP_LEADERBOARD" format="leaderboard" className="mb-8" />

          {/* ── Table of contents ── */}
          <TableOfContents items={toc} />

          {/* ── Key takeaways ── */}
          {keyTakeaways.length > 0 && (
            <aside
              aria-label="Key takeaways"
              className="mb-8 bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-5 sm:p-6"
            >
              <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-4">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm sm:text-base text-slate-300 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* ── Article body ── */}
          <article>
            <PostBody markdown={bodyTop} />
            {banner && <AffiliateBanner offer={banner} />}
            {bodyRest && <PostBody markdown={bodyRest} />}
            {/* Tracks affiliate link clicks → GA4 event: affiliate_link_click */}
            <AffiliateClickTracker />
            {/* Tracks article views → Firestore article_views collection */}
            <ViewTracker slug={post.slug} type="article" />
          </article>

          {/* ── Topic hub: up to the pillar, or down to every guide in the topic ── */}
          {cluster.length > 0 ? (
            <nav aria-label={`All ${post.category} guides`} className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-white">All {post.category} guides</h2>
              <p className="mt-1 text-sm text-slate-400">This is the starting point for the topic. Each guide below goes deeper on one part of it.</p>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {cluster.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/guide/${c.slug}`} className="text-sm leading-snug text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 hover:text-emerald-300">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : pillar ? (
            <nav aria-label="Start of this topic" className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Part of the {post.category} series</p>
              <p className="mt-2 text-sm text-slate-300">
                New to this topic? Start with{' '}
                <Link href={`/guide/${pillar.slug}`} className="font-semibold text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 hover:text-emerald-300">
                  {pillar.title}
                </Link>
                , or browse{' '}
                <Link href={`/category/${encodeURIComponent(post.category)}`} className="font-semibold text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 hover:text-emerald-300">
                  every {post.category} guide
                </Link>.
              </p>
            </nav>
          ) : null}

          {/* ── Ad: Rectangle after article body (high RPM placement) ── */}
          <AdUnit slot="GUIDE_MID_RECTANGLE" format="rectangle" className="my-10 mx-auto" />

          {/* ── Author byline footer ── */}
          <div className="mt-12 pt-8 border-t border-slate-800/70 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0">
              <Image
                src="/jay-character-small.webp"
                alt={post.author?.name ?? 'Jay Lopez'}
                width={48}
                height={48}
                className="object-cover object-top w-full h-full"
              />
            </div>
            <div>
              <p className="font-bold text-white text-sm">{post.author?.name ?? 'Jay Lopez'}</p>
              <p className="text-sm text-slate-400 leading-relaxed mt-0.5">
                {post.author?.role ?? 'Affiliate marketer, SEO strategist, and founder of JaysMoneyGuides.'}{' '}
                <Link href="/about" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">
                  About Jay →
                </Link>
              </p>
            </div>
          </div>

          {/* ── Ad: Leaderboard above related guides (natural scroll pause point) ── */}
          {related.length > 0 && (
            <AdUnit slot="GUIDE_BOTTOM_LEADERBOARD" format="leaderboard" className="mb-8" />
          )}

          {/* ── Related guides ── */}
          {related.length > 0 && (
            <aside aria-label="Related guides" className="mt-12 mb-10">
              <h2 className="text-xl font-extrabold text-white mb-5">
                Read next
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => {
                  const rc = CATEGORY_COLORS[r.category] ?? fallbackColor;
                  return (
                    <Link
                      key={r.id}
                      href={`/guide/${r.slug}`}
                      className="group block bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-all hover:-translate-y-0.5"
                    >
                      <span className={`inline-flex items-center gap-1 border rounded-full px-2 py-0.5 text-[10px] font-bold mb-2 ${rc.pill}`}>
                        <span className={`w-1 h-1 rounded-full ${rc.dot}`} aria-hidden="true" />
                        {r.category}
                      </span>
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-white leading-snug line-clamp-2 transition-colors mb-2">
                        {r.title}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-emerald-400 transition-colors font-medium">
                        Read guide
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href={`/category/${encodeURIComponent(post.category)}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-xl px-4 py-2.5 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  All {post.category} guides
                </Link>
              </div>
            </aside>
          )}
          </div>{/* end main content column */}

          {/* ── Sidebar ── */}
          <aside
            aria-label="Guide sidebar"
            className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28 self-start space-y-5 pb-10"
          >
            {/* Related guides */}
            {related.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                  More in {post.category}
                </h2>
                <ul className="space-y-3">
                  {related.map((r) => {
                    const rc = CATEGORY_COLORS[r.category] ?? fallbackColor;
                    return (
                      <li key={r.id}>
                        <Link
                          href={`/guide/${r.slug}`}
                          className="group flex items-start gap-2.5"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${rc.dot} mt-1.5 shrink-0`} aria-hidden="true" />
                          <span className="text-sm text-slate-300 group-hover:text-emerald-400 leading-snug transition-colors line-clamp-2">
                            {r.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={`/category/${encodeURIComponent(post.category)}`}
                  className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  All {post.category} guides
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* Free ebook promo */}
            {sidebarEbook && (
              <Link
                href={`/ebooks/${sidebarEbook.slug}`}
                className="group block bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/25 hover:border-emerald-500/50 rounded-2xl p-5 transition-all"
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <Gift className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                    {sidebarEbook.isFree ? 'Free Download' : 'eBook'}
                  </span>
                </div>
                <p className="text-sm font-bold text-white group-hover:text-emerald-300 leading-snug transition-colors mb-1">
                  {sidebarEbook.title}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {sidebarEbook.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:gap-2 transition-all">
                  {sidebarEbook.isFree ? 'Download free →' : 'Get the eBook →'}
                </span>
              </Link>
            )}

            {/* Ad slot */}
            <AdUnit slot="GUIDE_SIDEBAR_RECTANGLE" format="rectangle" className="w-full" />
          </aside>

          </div>{/* end flex row */}
        </div>
      </div>
    </>
  );
}

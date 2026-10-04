import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, BookOpen, TrendingUp, Zap, ShoppingBag,
  Globe, FileText, Mail, ChevronRight, Home, CheckCircle2,
} from 'lucide-react';
import { JsonLd } from '@/components/server/JsonLd';
import { SITE, SITE_NAME, personSchema } from '@/lib/seo';
import { getAllPosts, getAllCategories } from '@/lib/posts';

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `About Jay Lopez — Founder of ${SITE_NAME}`,
  description:
    'Jay Lopez is the founder of JaysMoneyGuides — an online business strategist, affiliate marketer, and content creator sharing practical blueprints for building profitable online businesses.',
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    type: 'profile',
    siteName: SITE_NAME,
    url: `${SITE}/about`,
    title: `About Jay Lopez — Online Business Strategist | ${SITE_NAME}`,
    description:
      'Meet the founder behind JaysMoneyGuides. Jay Lopez covers affiliate marketing, SEO, blogging, e-commerce, and online business — from real experience, not theory.',
    images: [
      {
        url: `${SITE}/jay-character-banner.webp`,
        width: 1200,
        height: 630,
        alt: 'Jay Lopez — Founder of JaysMoneyGuides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jaysmoneyguides',
    creator: '@jaysmoneyguides',
    title: `About Jay Lopez — Founder of ${SITE_NAME}`,
    description: 'Practical blueprints for profitable online businesses by Jay Lopez.',
    images: [`${SITE}/jay-character-banner.webp`],
  },
  robots: { index: true, follow: true },
};

// ── What I cover ──────────────────────────────────────────────────────────────

const TOPICS = [
  {
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    label: 'Affiliate Marketing',
    description: 'High-ticket programs, conversion strategy, and building commission income that scales.',
  },
  {
    icon: Globe,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    label: 'SEO',
    description: 'Organic search that brings the right readers without paying for every click.',
  },
  {
    icon: FileText,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    label: 'Blogging',
    description: 'Content systems, niche selection, and monetization paths that actually work.',
  },
  {
    icon: ShoppingBag,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    label: 'E-Commerce',
    description: 'Shopify, headless storefronts, dropshipping, and product-based income.',
  },
  {
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    label: 'Entrepreneurship',
    description: 'Business models, tools, and the systems behind independent online businesses.',
  },
  {
    icon: BookOpen,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
    label: 'Digital Products',
    description: 'Ebooks, SaaS ideas, and turning knowledge into scalable income.',
  },
];

const PRINCIPLES = [
  'Write from experience, not guesswork',
  'No fake income screenshots or vague promises',
  'Full affiliate disclosure on every monetized page',
  'Only recommend products worth a reader\'s time',
  'Show the work — not just the result',
  'Update guides when strategies change',
];

// ── Structured data ───────────────────────────────────────────────────────────

function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About Jay Lopez — Founder of ${SITE_NAME}`,
    description:
      'Jay Lopez is the founder of JaysMoneyGuides, an online business strategist and affiliate marketer sharing practical blueprints for building profitable online businesses.',
    url: `${SITE}/about`,
    mainEntity: {
      '@type': 'Person',
      name: 'Jay Lopez',
      url: `${SITE}/about`,
      image: `${SITE}/jay-character-small.webp`,
      jobTitle: 'Online Business Strategist & Affiliate Marketing Expert',
      description:
        'Jay Lopez is the founder of JaysMoneyGuides — an independent publication covering affiliate marketing, SEO, blogging, e-commerce, and online business building.',
      sameAs: [
        'https://www.tiktok.com/@jaysmoneyguides',
        `${SITE}`,
      ],
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE,
      },
      knowsAbout: [
        'Affiliate Marketing',
        'Search Engine Optimization',
        'Blogging',
        'E-Commerce',
        'Dropshipping',
        'Headless Shopify',
        'Online Business',
        'Digital Products',
      ],
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE}/about` },
      ],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  const [allPosts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);
  const postCount = allPosts.length;
  const categoryCount = categories.length;

  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <JsonLd data={personSchema()} />

      <div className="min-h-screen bg-slate-950 text-white">

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-[98px] z-20"
        >
          <ol className="mx-auto max-w-5xl px-4 py-2.5 flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
            <li>
              <Link href="/" className="hover:text-slate-300 transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" aria-hidden="true" />
                Home
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3 h-3 text-slate-700" /></li>
            <li className="text-slate-200 font-medium" aria-current="page">About</li>
          </ol>
        </nav>

        {/* ── Hero / Author card ── */}
        <header className="relative border-b border-slate-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.08),_transparent_55%)] pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,rgba(15,23,42,0.95))] pointer-events-none" aria-hidden="true" />

          <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row items-start gap-7 sm:gap-10">

              {/* Avatar */}
              <div className="shrink-0">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/10">
                  <Image
                    src="/jay-character-small.webp"
                    alt="Jay Lopez — Founder of JaysMoneyGuides"
                    fill
                    priority
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
                  Founder & Author
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                  Jay Lopez
                </h1>
                <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-2xl mb-5">
                  Online business strategist, affiliate marketer, and the person behind JaysMoneyGuides.
                  I build and document income-generating systems — affiliate marketing, SEO-driven blogs,
                  headless Shopify stores, and digital products — and share the actual playbooks here, for free.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { num: postCount.toString(), label: 'Free Guides' },
                    { num: String(categoryCount), label: 'Topics Covered' },
                    { num: '$100k+', label: 'Affiliate Sales' },
                    { num: '100%', label: 'Free to Read' },
                  ].map(({ num, label }) => (
                    <div key={label} className="text-center min-w-[60px]">
                      <p className="text-lg sm:text-xl font-black text-emerald-400 leading-none">{num}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Social / CTA row */}
                <div className="flex flex-wrap gap-2.5 mt-6">
                  <a
                    href="https://www.tiktok.com/@jaysmoneyguides"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 text-slate-200 font-semibold px-4 py-2 text-xs hover:border-slate-600 hover:text-white transition-colors"
                    aria-label="Follow @jaysmoneyguides on TikTok"
                  >
                    {/* TikTok wordmark — inline SVG, no external img */}
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.78a4.85 4.85 0 01-1.03-.09z"/>
                    </svg>
                    TikTok @jaysmoneyguides
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-slate-950 font-bold px-4 py-2 text-xs hover:bg-emerald-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12 space-y-14">

          {/* Story */}
          <section aria-labelledby="story-heading">
            <h2 id="story-heading" className="text-lg sm:text-xl font-black text-white mb-5">
              The story behind JaysMoneyGuides
            </h2>
            <div className="prose-custom space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base max-w-3xl">
              <p>
                I started JaysMoneyGuides because I kept running into the same problem: most online business
                content is either surface-level inspiration or course upsells in disguise. I wanted something
                different — a place where the actual playbook is the product, not the teaser for a $997 program.
              </p>
              <p>
                The guides here come from building real things: affiliate sites that generate commissions,
                headless Shopify storefronts, SEO content that ranks, and digital products people actually pay
                for. The $100k+ in affiliate sales figure on this page isn&apos;t a headline — it&apos;s the
                output of the same strategies I document in the guides.
              </p>
              <p>
                Everything published here is free to read. The site runs on affiliate referral relationships
                (fully disclosed), ebook sales, and the occasional sponsored placement. I only promote products
                I&apos;ve used or would genuinely recommend to a friend — and the guides explain the honest
                tradeoffs, not just the upsides.
              </p>
              <p>
                On TikTok I go by <strong className="text-white">@jaysmoneyguides</strong> — same brand,
                shorter format, same no-fluff approach.
              </p>
            </div>
          </section>

          {/* What I cover */}
          <section aria-labelledby="topics-heading">
            <h2 id="topics-heading" className="text-lg sm:text-xl font-black text-white mb-2">
              What I cover
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Five core topics, all aimed at building sustainable online income.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOPICS.map(({ icon: Icon, color, bg, label, description }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-700 transition-colors"
                >
                  <div className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${bg} ${color} mb-3`}>
                    <Icon className="w-3 h-3" aria-hidden="true" />
                    {label}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Editorial principles */}
          <section aria-labelledby="principles-heading">
            <h2 id="principles-heading" className="text-lg sm:text-xl font-black text-white mb-5">
              How I approach this
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
              {PRINCIPLES.map((principle) => (
                <div key={principle} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                  {principle}
                </div>
              ))}
            </div>
          </section>

          {/* What's on the site */}
          <section aria-labelledby="site-heading">
            <h2 id="site-heading" className="text-lg sm:text-xl font-black text-white mb-5">
              What&apos;s on JaysMoneyGuides
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Guides */}
              <Link
                href="/#guides"
                className="group rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/30 hover:bg-slate-900/70 p-5 transition-all duration-200 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-black text-white text-sm mb-1">
                    {postCount} Free Guides
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    In-depth blueprints across affiliate marketing, SEO, blogging, and more. No paywall.
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:gap-2 transition-all">
                  Browse guides <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>

              {/* Ebooks */}
              <Link
                href="/ebooks"
                className="group rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-amber-500/30 hover:bg-slate-900/70 p-5 transition-all duration-200 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-amber-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-black text-white text-sm mb-1">eBook Store</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Downloadable guides that go deeper than the blog posts — including a free beginner ebook.
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:gap-2 transition-all">
                  Browse ebooks <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>

              {/* Tools */}
              <Link
                href="/tools"
                className="group rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-sky-500/30 hover:bg-slate-900/70 p-5 transition-all duration-200 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-sky-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-black text-white text-sm mb-1">Tools & Programs</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    25 affiliate programs and tools covered, with how each one pays and who it suits.
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:gap-2 transition-all">
                  See tools <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h2 className="font-black text-white text-base sm:text-lg mb-1.5">
                  Questions, partnerships, or feedback?
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  I read every message. Whether it&apos;s a question about a guide, a collaboration idea,
                  or feedback on the site — reach out and I&apos;ll get back to you.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-slate-950 font-bold px-5 py-2.5 text-sm hover:bg-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Contact me
                </Link>
                <Link
                  href="/disclaimer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 font-semibold px-5 py-2.5 text-sm hover:text-white hover:border-slate-600 transition-colors text-xs"
                >
                  FTC Disclosure
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

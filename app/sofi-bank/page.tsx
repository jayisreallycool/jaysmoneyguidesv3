import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, ChevronRight, Home, ExternalLink, BookOpen, Info } from 'lucide-react';
import { JsonLd } from '@/components/server/JsonLd';
import { SITE, SITE_NAME } from '@/lib/seo';
import { getPostsByCategory } from '@/lib/posts';
import { PostCard } from '@/components/server/PostCard';

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `SoFi Bank Products — Personal Loans, Student Loans & More | ${SITE_NAME}`,
  description:
    'Explore SoFi personal loans, student loan refinancing, private student loans, and medical student loan refinancing. Honest guides and affiliate referral links by Jay Lopez.',
  alternates: { canonical: `${SITE}/sofi-bank` },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: `${SITE}/sofi-bank`,
    title: `SoFi Bank Products — Loans & Refinancing Guides | ${SITE_NAME}`,
    description:
      'Honest SoFi loan guides by Jay Lopez. Personal loans, student refi, private student loans, and SoFi Money. Affiliate links included — full disclosure provided.',
    images: [{ url: `${SITE}/jay-affiliate-marketing-guides-hero.webp`, width: 1536, height: 1024 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jaysmoneyguides',
    creator: '@jaysmoneyguides',
    title: `SoFi Bank Products — Loans & Refinancing | ${SITE_NAME}`,
    description: 'Honest SoFi loan guides with affiliate referral links. Full FTC disclosure.',
    images: [`${SITE}/jay-affiliate-marketing-guides-hero.webp`],
  },
  robots: { index: true, follow: true },
};

// ── Affiliate link config ─────────────────────────────────────────────────────

const SOFI_LINKS = {
  personal:  '/go/sofi-personal',
  student:   '/go/sofi-student',
  medical:   '/go/sofi-medical',
  private:   '/go/sofi-private',
  money:     '/go/sofi-money',
  rules:     'https://www.sofi.com/referral-program/?hidenav=once#official-rules',
};

// ── Product card data ─────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    key: 'personal',
    href: SOFI_LINKS.personal,
    badge: 'Most Popular',
    badgeColor: 'bg-emerald-500 text-slate-950',
    icon: '💳',
    title: 'Personal Loans',
    tagline: 'Consolidate debt or fund a major expense',
    description:
      'A fixed-rate installment loan you can use to consolidate higher-interest debt, cover a major expense, or simplify multiple payments into one. Fixed terms mean you know exactly when you\'ll be done.',
    bullets: [
      'Fixed rate — no surprise payment changes',
      'Common use: consolidating higher-interest credit card debt',
      'One monthly payment, one payoff date',
      'No prepayment penalty (verify current terms on SoFi\'s site)',
    ],
    cta: 'Check your rate →',
    note: 'Rates and terms set by SoFi — confirm current details before applying.',
  },
  {
    key: 'student',
    href: SOFI_LINKS.student,
    badge: 'Refinancing',
    badgeColor: 'bg-sky-500 text-white',
    icon: '🎓',
    title: 'Student Loan Refinancing',
    tagline: 'Simplify existing student debt',
    description:
      'Already have student loans and want to explore refinancing? SoFi student loan refi lets you consolidate federal and/or private loans into a single loan with new terms. This is for borrowers who have graduated and are actively repaying.',
    bullets: [
      'Combine multiple student loans into one payment',
      'May lower monthly payment or total cost — run your own math',
      'Refinancing federal loans converts them to private (you lose federal protections)',
      'Best suited for borrowers with stable income and strong credit',
    ],
    cta: 'Explore student refi →',
    note: 'Refinancing federal loans means losing income-driven repayment options. Weigh this carefully.',
  },
  {
    key: 'private',
    href: SOFI_LINKS.private,
    badge: 'In-School',
    badgeColor: 'bg-violet-500 text-white',
    icon: '📚',
    title: 'Private Student Loans',
    tagline: 'Funding for current students',
    description:
      'For students currently enrolled who need additional funding beyond federal aid. Private student loans fill gaps when federal loans, grants, and scholarships don\'t fully cover your school costs. Always exhaust federal options first.',
    bullets: [
      'For currently enrolled students (not repayment)',
      'Use only after maxing out federal aid and scholarships',
      'Terms and rates depend on your credit (or a co-signer\'s)',
      'Check SoFi\'s current eligibility requirements before applying',
    ],
    cta: 'See private loan options →',
    note: 'Exhaust all federal aid, grants, and scholarships before taking private loans.',
  },
  {
    key: 'medical',
    href: SOFI_LINKS.medical,
    badge: 'Specialty Refi',
    badgeColor: 'bg-teal-500 text-white',
    icon: '🏥',
    title: 'Medical Student Loan Refinancing',
    tagline: 'For healthcare professionals',
    description:
      'Refinancing designed specifically for medical school borrowers. If you\'ve completed medical school and are in residency, fellowship, or active practice, this product is worth exploring as an alternative to standard student loan refi.',
    bullets: [
      'Designed for MD, DO, DDS, DMD, and other health professionals',
      'May include options for residents and fellows still in training',
      'Separate from standard student loan refi — different terms may apply',
      'Confirm current eligibility and terms on SoFi\'s official page',
    ],
    cta: 'Explore medical refi →',
    note: 'Available for qualifying healthcare professionals. Verify current terms at SoFi.',
  },
  {
    key: 'money',
    href: SOFI_LINKS.money,
    badge: 'Banking',
    badgeColor: 'bg-amber-500 text-slate-950',
    icon: '🏦',
    title: 'SoFi Money (Banking)',
    tagline: 'Checking + savings in one account',
    description:
      'SoFi Money is a bank account that combines checking and savings features. It comes with a debit card, direct deposit support, and FDIC insurance through their banking partner. A referral link may include a welcome bonus — check current offer details.',
    bullets: [
      'Combines checking and savings in one account',
      'FDIC insured through SoFi\'s banking partner',
      'Debit card + direct deposit supported',
      'Referral bonus may be available — see current terms at SoFi',
    ],
    cta: 'Open a SoFi account →',
    note: 'A welcome bonus may be available via referral link. Verify current offer before opening.',
  },
];

// ── Structured data ───────────────────────────────────────────────────────────

function sofiLandingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SoFi Bank Products — Personal Loans, Student Loans & More',
    description:
      'Honest SoFi loan guides by Jay Lopez on JaysMoneyGuides. Personal loans, student loan refinancing, and SoFi Money — with full affiliate disclosure.',
    url: `${SITE}/sofi-bank`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE,
    },
    author: {
      '@type': 'Person',
      name: 'Jay Lopez',
      url: SITE,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'SoFi Bank', item: `${SITE}/sofi-bank` },
      ],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function SofiBankPage() {
  // Load SoFi category posts for the guides section at the bottom
  const sofiPosts = await getPostsByCategory('SoFi Bank');

  return (
    <>
      <JsonLd data={sofiLandingSchema()} />

      <div className="min-h-screen bg-slate-950 text-white">

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-[98px] z-20"
        >
          <ol className="mx-auto max-w-6xl px-4 py-2.5 flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
            <li>
              <Link href="/" className="hover:text-slate-300 transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" aria-hidden="true" />
                Home
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3 h-3 text-slate-700" /></li>
            <li className="text-slate-200 font-medium" aria-current="page">SoFi Bank</li>
          </ol>
        </nav>

        {/* ── FTC Disclosure banner ── */}
        <div className="bg-blue-950/60 border-b border-blue-800/40">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-start gap-2.5 text-xs text-blue-200/80">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong className="text-blue-300 font-semibold">Advertising disclosure:</strong>{' '}
              This page contains SoFi referral links. If you open an eligible SoFi product through one of them,
              I may receive a referral bonus at no extra cost to you — and in some cases you may receive a welcome
              bonus too. I&apos;m not a financial advisor and nothing here is financial advice. Rates, fees, and
              terms are set by SoFi and change over time — always confirm current details on{' '}
              <a
                href="https://www.sofi.com"
                rel="nofollow sponsored noopener noreferrer"
                target="_blank"
                className="underline hover:text-blue-100 transition-colors"
              >
                SoFi&apos;s official site
              </a>
              {' '}before applying.{' '}
              <a
                href={SOFI_LINKS.rules}
                rel="nofollow sponsored noopener noreferrer"
                target="_blank"
                className="underline hover:text-blue-100 transition-colors"
              >
                See official referral program rules
              </a>.
            </p>
          </div>
        </div>

        {/* ── Hero ── */}
        <header className="relative border-b border-slate-800/60 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.07),_transparent_60%)] pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(59,130,246,0.06),_transparent_60%)] pointer-events-none" aria-hidden="true" />

          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
            {/* Category pill */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-400 mb-5">
              🏦 SoFi Bank Products
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                SoFi Loans & Banking —{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  What to Know Before You Apply
                </span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Honest overviews of SoFi personal loans, student loan refinancing, private student loans,
                medical refi, and SoFi Money — with the affiliate links clearly marked and the fine print
                explained plainly.
              </p>

              {/* Trust signals */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  Full FTC disclosure
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                  {sofiPosts.length} in-depth guides
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Info className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  Not financial advice
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Product cards ── */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12" aria-labelledby="products-heading">
          <h2 id="products-heading" className="text-lg sm:text-xl font-black text-white mb-2">
            SoFi Products
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Select a product to read the full guide, or use the referral link to check your eligibility directly on SoFi&apos;s site.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <article
                key={product.key}
                className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-200 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/40 via-emerald-500/40 to-teal-500/40" />

                <div className="flex flex-col flex-1 p-5 gap-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl" role="img" aria-label={product.title}>{product.icon}</span>
                      <div>
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${product.badgeColor}`}>
                          {product.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title + tagline */}
                  <div>
                    <h3 className="text-base font-black text-white leading-tight mb-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-emerald-400 font-semibold">{product.tagline}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-1.5">
                    {product.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Fine print */}
                  <p className="text-[11px] text-slate-600 italic border-t border-slate-800 pt-3">
                    {product.note}
                  </p>

                  {/* CTA */}
                  <a
                    href={product.href}
                    rel="nofollow sponsored noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl px-4 py-3 text-sm transition-colors duration-150 touch-manipulation min-h-[48px] sm:min-h-[44px]"
                  >
                    {product.cta}
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── "How these links work" explainer ── */}
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
            <h2 className="text-sm font-black text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              How the affiliate links on this page work
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-400 leading-relaxed">
              <div>
                <p className="font-semibold text-slate-200 mb-1.5">What happens when you click</p>
                <p>
                  The buttons go through a redirect (/go/sofi-*) that routes to my personal SoFi referral link.
                  SoFi tracks that you came from my referral so they can credit both of us per their program rules.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-200 mb-1.5">What I earn</p>
                <p>
                  If you open an eligible product, SoFi may pay me a referral bonus. The specific amount, eligibility,
                  and rules are set by SoFi and change over time — see the{' '}
                  <a
                    href={SOFI_LINKS.rules}
                    rel="nofollow sponsored noopener noreferrer"
                    target="_blank"
                    className="text-blue-400 underline hover:text-blue-300 transition-colors"
                  >
                    official program rules
                  </a>.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-200 mb-1.5">What this doesn&apos;t change</p>
                <p>
                  The affiliate relationship doesn&apos;t change what I write. I include the same caveats and
                  the same warnings I&apos;d give a friend. The referral links cost you nothing extra and in
                  some cases include a welcome bonus for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── In-depth guides ── */}
        {sofiPosts.length > 0 && (
          <section
            className="mx-auto max-w-6xl px-4 pb-14"
            aria-labelledby="guides-heading"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 id="guides-heading" className="text-lg sm:text-xl font-black text-white">
                  In-Depth SoFi Guides
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Full articles that dig deeper into each product
                </p>
              </div>
              <Link
                href="/category/SoFi%20Bank"
                className="shrink-0 inline-flex items-center gap-1.5 min-h-[44px] px-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                All guides
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sofiPosts.slice(0, 6).map((post, i) => (
                <PostCard key={post.id} post={post} priority={i < 2} />
              ))}
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="border-t border-slate-800/60 bg-slate-900/30">
          <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-black text-white text-base">Looking for other money guides?</p>
              <p className="text-slate-400 text-sm mt-0.5">
                Affiliate marketing, blogging income, SEO, and online business — all free.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 text-slate-200 font-semibold px-5 py-2.5 text-sm hover:border-emerald-500/50 hover:text-white transition-colors"
              >
                ← All Guides
              </Link>
              <Link
                href="/ebooks"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-slate-950 font-bold px-5 py-2.5 text-sm hover:bg-emerald-400 transition-colors"
              >
                Browse Free eBooks
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

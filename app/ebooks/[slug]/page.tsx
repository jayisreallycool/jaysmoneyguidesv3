import { notFound } from 'next/navigation';
import { EbookReviews } from '@/components/client/EbookReviews';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, getProductBySlug, formatPrice } from '@/lib/products';
import { CheckoutButton } from '@/components/client/CheckoutButton';
import { EbookCover } from '@/components/ui/EbookCover';
import { EbookLookInside } from '@/components/ui/EbookLookInside';
import { ViewTracker } from '@/components/client/ViewTracker';
import { JsonLd } from '@/components/server/JsonLd';
import { SITE, ebookProductSchema, ebookBreadcrumbSchema, personSchema } from '@/lib/seo';
import {
  CheckCircle2, BookOpen, Download, ShieldCheck, Star,
  ChevronRight, Home, Clock, FileText, ArrowRight, Lock,
} from 'lucide-react';

export const dynamicParams = false;

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  const url = `${SITE}/ebooks/${p.slug}`;
  const price = p.isFree ? 'Free' : formatPrice(p.priceCents);
  return {
    title: `${p.title} — ${price} | JaysMoneyGuides`,
    description: p.description ?? p.subtitle,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: p.title,
      description: p.subtitle,
      images: [{ url: p.coverImage, width: 1200, height: 630, alt: `${p.title} — ebook cover by Jay Lopez` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.subtitle,
      images: [p.coverImage],
    },
  };
}

const TRUST_BADGES = [
  { icon: Download,     label: 'Instant PDF download'    },
  { icon: Lock,         label: 'Secure Stripe checkout'  },
  { icon: ShieldCheck,  label: '100% satisfaction'       },
  { icon: FileText,     label: 'No DRM — keep forever'   },
];


function StarRow({ count, filled }: { count: number; filled: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < filled ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
        />
      ))}
    </div>
  );
}

export default async function EbookPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const related = PRODUCTS.filter((x) => x.id !== p.id && !x.isFree).slice(0, 3);
  const priceLabel = p.isFree ? 'Free' : formatPrice(p.priceCents);

  return (
    <>
      <JsonLd data={ebookProductSchema(p)} />
      <JsonLd data={ebookBreadcrumbSchema(p)} />
      <JsonLd data={personSchema()} />
      {/* Track ebook page views → Firestore ebook_opens collection */}
      <ViewTracker slug={p.id} type="ebook" />

      <div className="min-h-screen bg-slate-950">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-5 pb-2">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                <Home className="w-3 h-3" aria-hidden="true" /> Home
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3 h-3 text-slate-700" /></li>
            <li>
              <Link href="/ebooks" className="hover:text-emerald-400 transition-colors">eBook Store</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3 h-3 text-slate-700" /></li>
            <li className="text-slate-300 font-medium line-clamp-1 max-w-[160px] sm:max-w-xs" aria-current="page">{p.title}</li>
          </ol>
        </nav>

        {/* ── Main product layout ── */}
        <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start">

            {/* ── LEFT: cover + details ── */}
            {/* min-w-0: lets the swipeable Look Inside strip scroll inside the column instead of widening the page */}
            <div className="min-w-0">
              {/* Mobile: cover + buy stacked */}
              <div className="flex flex-col sm:flex-row gap-6 mb-8">

                {/* Cover */}
                <div className="relative mx-auto sm:mx-0 w-48 sm:w-52 shrink-0">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/60 bg-slate-950">
                    <EbookCover src={p.coverImage} title={p.title} subtitle={p.subtitle} isFree={p.isFree} alt={`${p.title} — ${p.subtitle}`} priority className="absolute inset-0 w-full h-full" />
                  </div>
                  {/* Free badge */}
                  {p.isFree && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                      FREE
                    </div>
                  )}
                </div>

                {/* Header info (mobile-first) */}
                <div className="flex-1 text-center sm:text-left">
                  {/* Category + format pill */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      eBook
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-full">
                      PDF · {p.pageCount ?? '—'} pages
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                    {p.title}
                  </h1>
                  <p className="text-slate-400 leading-relaxed mb-3">{p.subtitle}</p>

                  <p className="text-sm text-slate-500 mb-4">
                    By <span className="text-emerald-400 font-semibold">{p.author ?? 'Jay Lopez'}</span>
                    {' · '}
                    <span className="text-slate-400">JaysMoneyGuides</span>
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="text-3xl font-black text-emerald-400">{priceLabel}</span>
                  </div>
                </div>
              </div>

              {/* ── Description ── */}
              <section className="mb-8">
                <h2 className="text-lg font-extrabold text-white mb-3">About This Guide</h2>
                <p className="text-slate-300 leading-relaxed text-[15px]">{p.description}</p>
              </section>

              {/* ── What's inside ── */}
              {p.previewChapters && p.previewChapters.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                    What&apos;s Inside
                  </h2>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    {p.previewChapters.map((ch, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm text-slate-300 leading-snug">{ch}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Look inside: cover, contents, sample pages and diagrams ── */}
              <EbookLookInside product={p} />

              {/* ── Who this is for ── */}
              <section className="mb-8">
                <h2 className="text-lg font-extrabold text-white mb-4">Who This Is For</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Complete beginners starting from zero',
                    'Bloggers looking to monetize their content',
                    'Side-hustlers building online income',
                    'Anyone who wants step-by-step systems',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Reader reviews: real, approved reviews of this ebook only ── */}
              <EbookReviews title={p.title} />

              {/* ── About the author ── */}
              <section className="mb-8">
                <h2 className="text-lg font-extrabold text-white mb-4">About the Author</h2>
                <div className="flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    <Image
                      src="/jay-character-small.webp"
                      alt="Jay Lopez"
                      width={56}
                      height={56}
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Jay Lopez</p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Affiliate marketer, SEO strategist, and founder of JaysMoneyGuides. Jay has built
                      multiple income streams through content and affiliate marketing and shares everything
                      he&apos;s learned in his guides and ebooks.
                    </p>
                    <Link href="/about" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors mt-2 inline-flex items-center gap-1">
                      Learn more about Jay <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* ── RIGHT: sticky buy box (desktop) ── */}
            <aside className="lg:sticky lg:top-28">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-black/40">

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-emerald-400">{priceLabel}</span>
                </div>
                {!p.isFree && (
                  <p className="text-xs text-slate-400 font-semibold mb-4">One-time payment — instant PDF access</p>
                )}
                {p.isFree && (
                  <p className="text-xs text-emerald-400 font-semibold mb-4">No payment needed — instant download</p>
                )}

                {/* CTA button */}
                <CheckoutButton
                  productId={p.id}
                  isFree={!!p.isFree}
                  className="w-full px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-base transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 touch-manipulation"
                />

                {/* Trust badges */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {TRUST_BADGES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 my-5" />

                {/* Quick facts */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Format</span>
                    <span className="text-slate-200 font-medium">PDF (Digital)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Pages</span>
                    <span className="text-slate-200 font-medium">{p.pageCount ?? '—'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Level</span>
                    <span className="text-slate-200 font-medium">Beginner–Intermediate</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Author</span>
                    <span className="text-emerald-400 font-medium">{p.author ?? 'Jay Lopez'}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 my-5" />

                {/* Guarantee */}
                <div className="flex items-start gap-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">Satisfaction guaranteed</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      If you&apos;re not happy with this guide, reach out — we&apos;ll make it right.
                    </p>
                  </div>
                </div>
              </div>

              {/* Free guide promo (below buy box — only on paid) */}
              {!p.isFree && (
                <div className="mt-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                  <p className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">Also available free</p>
                  <Link
                    href="/ebooks/affiliate-marketing-beginners"
                    className="flex items-center gap-3 group"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span className="text-sm text-slate-300 group-hover:text-emerald-300 transition-colors leading-snug">
                      Affiliate Marketing for Beginners — Free Guide
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </aside>
          </div>

          {/* ── Mobile buy bar (fixed bottom) ── */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur border-t border-slate-800 px-4 py-3 flex items-center gap-3 safe-area-inset-bottom">
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">{p.title}</p>
              <p className="text-emerald-400 font-black text-base">{priceLabel}</p>
            </div>
            <div className="shrink-0 w-40">
              <CheckoutButton
                productId={p.id}
                isFree={!!p.isFree}
                className="w-full px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all touch-manipulation flex items-center justify-center gap-1.5"
              />
            </div>
          </div>
          {/* Spacer for fixed bar on mobile */}
          <div className="lg:hidden h-20" aria-hidden="true" />

          {/* ── Related ebooks ── */}
          {related.length > 0 && (
            <section className="mt-12 pt-10 border-t border-slate-800/70">
              <h2 className="text-xl font-extrabold text-white mb-6">More Guides from JaysMoneyGuides</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/ebooks/${r.slug}`}
                    className="group bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[3/2] bg-slate-950 overflow-hidden">
                      <EbookCover src={r.coverImage} title={r.title} isFree={r.isFree} alt={r.title} compact className="absolute inset-0 w-full h-full group-hover:scale-[1.03] transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-bold text-slate-200 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-1">
                        {r.title}
                      </p>
                      <p className="text-sm font-bold text-emerald-400">{r.isFree ? 'Free' : formatPrice(r.priceCents)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/ebooks"
                  className="inline-flex items-center gap-2 text-sm border border-slate-700 hover:border-emerald-500/40 text-slate-400 hover:text-white px-5 py-2.5 rounded-xl transition-colors"
                >
                  Browse all eBooks <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

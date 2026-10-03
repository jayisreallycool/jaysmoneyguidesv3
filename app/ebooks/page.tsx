import type { Metadata } from 'next';
import Link from 'next/link';
import { EbookCover } from '@/components/ui/EbookCover';
import { PRODUCTS, formatPrice } from '@/lib/products';
import { SITE, ebookItemListSchema, personSchema } from '@/lib/seo';
import { JsonLd } from '@/components/server/JsonLd';

export const metadata: Metadata = {
  title: 'Ebooks & Digital Guides — Affiliate Marketing, SEO & Blogging',
  description:
    'Downloadable ebooks on affiliate marketing, SEO, blogging, and building digital income by Jay Lopez. One free guide included.',
  alternates: { canonical: `${SITE}/ebooks` },
  openGraph: {
    type: 'website',
    url: `${SITE}/ebooks`,
    title: 'JaysMoneyGuides eBook Store — Affiliate Marketing, SEO & Blogging Guides',
    description: 'Practical, downloadable ebooks you can start using today. One free guide — no email required.',
    images: [{ url: `${SITE}/jay-affiliate-marketing-guides-hero.webp`, width: 1536, height: 1024, alt: 'JaysMoneyGuides eBook Store' }],
  },
};

export default function EbooksPage() {
  return (
    <>
      <JsonLd data={ebookItemListSchema(PRODUCTS)} />
      <JsonLd data={personSchema()} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2 text-white">Ebooks &amp; Digital Guides</h1>
        <p className="text-slate-400 mb-8">
          Practical, downloadable guides you can start using today — by Jay Lopez.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.id}
              href={`/ebooks/${p.slug}`}
              className="group block rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 transition-colors"
              aria-label={`${p.title} — ${p.isFree ? 'Free' : formatPrice(p.priceCents)}`}
            >
              <div className="relative aspect-[3/4] bg-slate-950">
                <EbookCover src={p.coverImage} title={p.title} subtitle={p.subtitle} isFree={p.isFree} alt={`${p.title} ebook cover — by Jay Lopez`} className="absolute inset-0 w-full h-full" />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{p.title}</h2>
                <p className="mt-1 text-sm text-slate-400 line-clamp-2">{p.subtitle}</p>
                <p className={`mt-2 font-bold ${p.isFree ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {p.isFree ? 'Free' : formatPrice(p.priceCents)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

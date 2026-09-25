import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PRODUCTS, getProductBySlug, formatPrice } from '@/lib/products';
import { CheckoutButton } from '@/components/client/CheckoutButton';
import { JsonLd } from '@/components/server/JsonLd';
import { SITE, ebookProductSchema, ebookBreadcrumbSchema, personSchema } from '@/lib/seo';

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

export default async function EbookPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  return (
    <>
      {/* Book + Product + BreadcrumbList + Person schemas */}
      <JsonLd data={ebookProductSchema(p)} />
      <JsonLd data={ebookBreadcrumbSchema(p)} />
      <JsonLd data={personSchema()} />

      <div className="mx-auto max-w-4xl px-4 py-10 grid md:grid-cols-2 gap-8">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <Image
            src={p.coverImage}
            alt={`${p.title} — ${p.subtitle} ebook by Jay Lopez`}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
        <div>
          {/* Breadcrumb nav — visible + crawlable */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="/ebooks" className="hover:text-emerald-400 transition-colors">eBook Store</a></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-300 font-medium" aria-current="page">{p.title}</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold text-white">{p.title}</h1>
          <p className="mt-2 text-slate-400">{p.subtitle}</p>
          <p className="mt-3 text-xs text-slate-500">
            By <span className="text-emerald-400 font-semibold">{p.author ?? 'Jay Lopez'}</span>
            {p.pageCount ? ` · ${p.pageCount} pages` : ''}
            {' · '}
            <span className="text-slate-400">Digital Download (PDF)</span>
          </p>
          <p className="mt-4 text-2xl font-bold text-emerald-400">
            {p.isFree ? 'Free' : formatPrice(p.priceCents)}
          </p>
          <p className="mt-4 text-slate-300 leading-relaxed">{p.description}</p>

          {p.previewChapters && p.previewChapters.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">What&apos;s Inside</p>
              <ul className="space-y-1">
                {p.previewChapters.map((ch, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                    {ch}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <CheckoutButton
              productId={p.id}
              isFree={!!p.isFree}
              className="px-6 py-3 rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
            />
          </div>
        </div>
      </div>
    </>
  );
}

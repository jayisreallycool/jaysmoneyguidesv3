import { BookOpen, Lock, Lightbulb } from 'lucide-react';
import type { Product } from '@/lib/types';
import { getEbookContent, type EbookPage } from '@/lib/ebookContent';
import { EbookCover } from '@/components/ui/EbookCover';

/**
 * "Look inside" strip for an ebook product page: the cover, a contents page,
 * sample pages and diagrams, laid out as swipeable book pages.
 *
 * Everything shown is built from the book's own preview content
 * (lib/ebookContent.ts) and chapter list (lib/products.ts) — lists from the
 * book are drawn as step / branch diagrams. No numbers or charts are invented.
 * These are typeset samples, not scans of the PDF, and are labelled as such.
 */

const PAPER =
  'relative shrink-0 snap-start w-[246px] sm:w-[264px] aspect-[3/4] rounded-lg overflow-hidden bg-[#f6f4ee] text-slate-800 shadow-xl shadow-black/50 ring-1 ring-black/10';

function PageShell({
  n,
  running,
  children,
}: {
  n: number;
  running: string;
  children: React.ReactNode;
}) {
  return (
    <li className={PAPER}>
      <div className="absolute inset-0 flex flex-col px-5 pt-4 pb-3">
        <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-700/80 truncate">{running}</p>
        <div className="mt-2.5 h-px bg-slate-300" aria-hidden="true" />
        <div className="flex-1 min-h-0 overflow-hidden pt-3">{children}</div>
        <p className="text-center text-[9px] text-slate-400 tabular-nums">{n}</p>
      </div>
    </li>
  );
}

/** A list from the book drawn as a numbered step path. */
function StepDiagram({ title, items }: { title?: string; items: string[] }) {
  return (
    <figure className="mt-3">
      {title && (
        <figcaption className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          {title.replace(/:$/, '')}
        </figcaption>
      )}
      <ol className="relative space-y-1">
        <span className="absolute left-[9px] top-2 bottom-2 w-px bg-emerald-600/40" aria-hidden="true" />
        {items.slice(0, 5).map((item, i) => (
          <li key={item} className="relative flex items-center gap-2.5">
            <span className="relative z-10 grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full bg-emerald-700 text-[9px] font-black text-white">
              {i + 1}
            </span>
            <span className="flex-1 rounded-md border border-emerald-700/25 bg-white px-2 py-[3px] text-[10.5px] font-semibold leading-tight text-slate-700">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** An unordered list from the book drawn as a branch diagram: one topic, its parts. */
function BranchDiagram({ title, items }: { title?: string; items: string[] }) {
  return (
    <figure className="mt-2.5">
      <figcaption className="inline-block rounded-md bg-emerald-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
        {title?.replace(/:$/, '') || 'Overview'}
      </figcaption>
      <ul className="ml-3 border-l border-emerald-600/50 pt-1.5 space-y-1">
        {items.slice(0, 6).map((item) => (
          <li key={item} className="flex items-center">
            <span className="h-px w-3.5 shrink-0 bg-emerald-600/50" aria-hidden="true" />
            <span className="flex-1 rounded-md border border-emerald-700/25 bg-white px-2 py-[3px] text-[10.5px] font-semibold leading-tight text-slate-700">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function ContentPage({ page }: { page: EbookPage }) {
  const heading = page.sectionTitle || page.chapterTitle;
  const paras = page.paragraphs ?? (page.content ? [page.content] : page.text ? [page.text] : []);
  const [kicker, title] = heading?.includes(':') ? heading.split(/:\s*/, 2) : ['', heading ?? ''];
  // "Steps" read as a sequence; other lists are an unordered set → branches
  const ordered = /step/i.test(page.bulletPoints?.title ?? '');
  const note = page.callout?.message || page.callout?.text;

  return (
    <>
      {kicker && <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">{kicker}</p>}
      <h4 className="font-serif text-[17px] font-bold leading-tight text-slate-900">{title}</h4>
      {paras.slice(0, page.bulletPoints ? 1 : 3).map((t) => (
        <p key={t} className="mt-2 font-serif text-[11.5px] leading-[1.55] text-slate-700">{t}</p>
      ))}
      {page.bulletPoints &&
        (ordered ? (
          <StepDiagram title={page.bulletPoints.title} items={page.bulletPoints.items} />
        ) : (
          <BranchDiagram title={page.bulletPoints.title} items={page.bulletPoints.items} />
        ))}
      {note && (
        <div className="mt-3 flex gap-2 rounded-md border border-amber-500/40 bg-amber-50 p-2">
          <Lightbulb className="h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-[10.5px] leading-snug text-slate-700">
            {page.callout?.title && <strong className="text-slate-900">{page.callout.title}: </strong>}
            {note}
          </p>
        </div>
      )}
    </>
  );
}

export function EbookLookInside({ product }: { product: Product }) {
  const data = getEbookContent(product.id);
  const chapters = product.previewChapters ?? [];
  const pages = (data?.pages ?? []).filter((pg) => pg.type !== 'cover' && pg.type !== 'backCover');
  if (chapters.length === 0 && pages.length === 0) return null;

  const running = product.title;
  let n = 1;

  return (
    <section className="mb-8" aria-labelledby="look-inside-heading">
      <div className="flex items-end justify-between gap-3 mb-4">
        <h2 id="look-inside-heading" className="text-lg font-extrabold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          Look Inside
        </h2>
        <p className="text-[11px] text-slate-500">Swipe to flip through →</p>
      </div>

      <div className="relative -mx-4 sm:mx-0">
        <ul
          className="flex gap-4 overflow-x-auto scrollbar-none touch-pan-x snap-x snap-proximity scroll-px-4 px-4 sm:px-1 py-2"
          aria-label={`Sample pages from ${product.title}`}
        >
          {/* Cover */}
          <li className={`${PAPER} !bg-slate-950`}>
            <EbookCover
              src={product.coverImage}
              title={product.title}
              subtitle={product.subtitle}
              isFree={product.isFree}
              className="absolute inset-0 w-full h-full"
            />
          </li>

          {/* Contents, drawn as a chapter path */}
          {chapters.length > 0 && (
            <PageShell n={n++} running={running}>
              <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Contents</p>
              <h4 className="font-serif text-[17px] font-bold leading-tight text-slate-900">What you&apos;ll work through</h4>
              <StepDiagram items={chapters.map((c) => c.replace(/^Chapter\s*\d+:\s*/i, ''))} />
              {product.pageCount ? (
                <p className="mt-3 text-[10px] text-slate-500">PDF · {product.pageCount} pages</p>
              ) : null}
            </PageShell>
          )}

          {/* Sample pages */}
          {pages.map((pg) => (
            <PageShell key={pg.pageNumber} n={n++} running={running}>
              <ContentPage page={pg} />
            </PageShell>
          ))}

          {/* End card */}
          <li className={`${PAPER} !bg-slate-900 !text-slate-100 ring-emerald-500/30`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-500/15 border border-emerald-500/30">
                {product.isFree ? (
                  <BookOpen className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Lock className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                )}
              </span>
              <p className="text-sm font-bold text-white leading-snug">
                {product.isFree ? 'Read the whole guide free' : 'The rest is in the full guide'}
              </p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                {product.isFree
                  ? 'No sign-up needed — tap “Read free guide” on this page.'
                  : `${product.pageCount ? `${product.pageCount} pages. ` : ''}Instant PDF access after checkout.`}
              </p>
            </div>
          </li>
        </ul>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-950 to-transparent sm:hidden" aria-hidden="true" />
      </div>

      <p className="mt-2 text-[11px] text-slate-500">
        Sample pages are typeset from the guide&apos;s content for this preview; layout in the PDF differs.
      </p>
    </section>
  );
}

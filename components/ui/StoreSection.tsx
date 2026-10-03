'use client';
import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import {
  ShoppingBag, BookOpen, Sparkles, Lock, Eye, Loader2,
  ChevronLeft, ChevronRight, X, CheckCircle2, Star,
  FileText, ShieldCheck, Zap, ArrowRight,
} from 'lucide-react';
import { useAutoScroll } from '@/components/client/useAutoScroll';
import { EbookCover } from '@/components/ui/EbookCover';
import { Product } from '@/lib/types';

// ── Types ──────────────────────────────────────────────────────────────────
interface StoreSectionProps {
  products: Product[];
  purchasedIds: string[];
  onPreview: (product: Product) => void;
  onOpenFree: (product: Product) => void;
  onBuy: (product: Product) => void;
  checkingOutId: string | null;
  onOpenNewsletter?: () => void;
  onRestorePurchases?: () => void;
}

const EBOOK_TABS = ['All', 'Free', 'Paid', 'Featured'] as const;
type EbookTab = (typeof EBOOK_TABS)[number];

// ── Drag-to-scroll hook ────────────────────────────────────────────────────
function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const state = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Only handle mouse (not touch — touch-pan-x CSS handles touch natively)
    if (e.pointerType === 'touch') return;
    const el = ref.current;
    if (!el) return;
    state.current = { down: true, moved: false, startX: e.clientX, scrollLeft: el.scrollLeft };
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
    el.style.scrollSnapType = 'none'; // snapping fights a mouse drag
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const el = ref.current;
    if (!el || !state.current.down) return;
    const dx = e.clientX - state.current.startX;
    if (Math.abs(dx) > 4) state.current.moved = true;
    el.scrollLeft = state.current.scrollLeft - dx;
  }, []);

  const end = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const el = ref.current;
    if (!el || !state.current.down) return;
    state.current.down = false;
    el.style.cursor = '';
    el.style.userSelect = '';
    el.style.scrollSnapType = '';
  }, []);

  const scrollBy = useCallback((amount: number) => {
    ref.current?.scrollBy({ left: amount, behavior: 'smooth' });
  }, []);

  return {
    ref,
    handlers: { onPointerDown, onPointerMove, onPointerUp: end, onPointerLeave: end, onPointerCancel: end },
    didDrag: () => state.current.moved,
    scrollBy,
  };
}

// ── Netflix-style Poster Card (mobile) ────────────────────────────────────
const PosterCard: React.FC<{
  product: Product;
  isPurchased: boolean;
  onSelect: (p: Product) => void;
  isCheckingOut: boolean;
  /** Duplicate card in an auto-scrolling loop: tappable, but skipped by keyboard/screen readers */
  inert?: boolean;
}> = ({ product, isPurchased, onSelect, isCheckingOut, inert }) => {
  const priceLabel = product.isFree ? 'Free' : `$${(product.priceCents / 100).toFixed(2)}`;

  return (
    <button
      onClick={() => onSelect(product)}
      tabIndex={inert ? -1 : undefined}
      className="group relative flex-shrink-0 w-[148px] sm:w-[168px] rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/60 transition-all duration-200 bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 text-left"
      aria-label={`View details: ${product.title}`}
    >
      {/* Poster image — portrait ratio */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <EbookCover src={product.coverImage} title={product.title} isFree={product.isFree} alt={`${product.title} ebook cover`} compact className="w-full h-full transition-transform duration-300 group-hover:scale-[1.04]" />

        {/* Gradient overlay — bottom fade for title */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Badge */}
        <div className="absolute top-2 left-2 z-10">
          {product.isFree ? (
            <span className="inline-flex items-center gap-0.5 bg-emerald-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
              <Sparkles className="w-2.5 h-2.5" aria-hidden="true" /> Free
            </span>
          ) : isPurchased ? (
            <span className="inline-flex items-center gap-0.5 bg-sky-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
              <CheckCircle2 className="w-2.5 h-2.5" aria-hidden="true" /> Owned
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
              {priceLabel}
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <span className="inline-flex items-center gap-1 bg-emerald-400 text-slate-950 text-[11px] font-black px-2.5 py-1.5 rounded-full shadow-lg">
            <Eye className="w-3 h-3" aria-hidden="true" />
            {isCheckingOut ? 'Loading...' : 'Details'}
          </span>
        </div>

        {/* Title on bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
          <p className="text-[11px] font-bold text-white leading-tight line-clamp-2">{product.title}</p>
        </div>
      </div>
    </button>
  );
};

// ── Desktop grid card ──────────────────────────────────────────────────────
const ProductCard: React.FC<{
  product: Product;
  isPurchased: boolean;
  onPreview: (p: Product) => void;
  onOpenFree: (p: Product) => void;
  onBuy: (p: Product) => void;
  isCheckingOut: boolean;
}> = ({ product, isPurchased, onPreview, onOpenFree, onBuy, isCheckingOut }) => {
  const priceLabel = product.isFree ? 'Free' : `$${(product.priceCents / 100).toFixed(2)}`;

  return (
    <div
      className={`group relative bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        product.featured
          ? 'border-amber-500/40 hover:border-amber-400/70 shadow-md shadow-amber-500/5'
          : 'border-slate-800 hover:border-slate-700'
      }`}
      onClick={() => onPreview(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onPreview(product)}
      aria-label={`View details for ${product.title}`}
    >
      {/* Cover */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-950">
        <EbookCover src={product.coverImage} title={product.title} isFree={product.isFree} alt={`${product.title} — ${product.subtitle} ebook cover`} compact className="w-full h-full group-hover:scale-[1.03] transition-transform duration-500" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" aria-hidden="true" />

        {/* Badge */}
        <div className="absolute top-2.5 left-2.5">
          {product.isFree ? (
            <span className="inline-flex items-center gap-1 bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
              <Sparkles className="w-2.5 h-2.5" aria-hidden="true" /> Free
            </span>
          ) : isPurchased ? (
            <span className="inline-flex items-center gap-1 bg-sky-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
              <CheckCircle2 className="w-2.5 h-2.5" aria-hidden="true" /> Owned
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
              {priceLabel}
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1.5 bg-emerald-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
            {isPurchased ? <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> : <Eye className="w-3.5 h-3.5" aria-hidden="true" />}
            {isPurchased ? 'Open Ebook' : 'View Details'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="text-[11px] text-emerald-400/80 font-medium line-clamp-1 mt-0.5">{product.subtitle}</p>
          )}
        </div>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">{product.description}</p>

        <div
          className="flex items-center justify-between pt-3 border-t border-slate-800 mt-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <span className="text-lg font-black text-white">{priceLabel}</span>
            {!product.isFree && !isPurchased && (
              <span className="text-[10px] text-slate-500 block">Instant download</span>
            )}
          </div>
          {product.isFree ? (
            <button
              onClick={() => onOpenFree(product)}
              className="inline-flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all cursor-pointer touch-manipulation"
              aria-label={`Read ${product.title} for free`}
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> Read Free
            </button>
          ) : isPurchased ? (
            <button
              onClick={() => onOpenFree(product)}
              className="inline-flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all cursor-pointer touch-manipulation"
              aria-label={`Open ${product.title}`}
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> Open
            </button>
          ) : (
            <button
              onClick={() => onBuy(product)}
              disabled={isCheckingOut}
              className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all cursor-pointer disabled:opacity-60 touch-manipulation"
              aria-label={`Buy ${product.title} for ${priceLabel}`}
            >
              {isCheckingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> : <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />}
              {isCheckingOut ? 'Loading…' : 'Buy'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Ebook Detail Modal ─────────────────────────────────────────────────────
const EbookModal: React.FC<{
  product: Product;
  isPurchased: boolean;
  isCheckingOut: boolean;
  onClose: () => void;
  onOpenFree: (p: Product) => void;
  onBuy: (p: Product) => void;
}> = ({ product, isPurchased, isCheckingOut, onClose, onOpenFree, onBuy }) => {
  const priceLabel = product.isFree ? 'Free' : `$${(product.priceCents / 100).toFixed(2)}`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] bg-slate-950/85 backdrop-blur-sm flex justify-center p-0 sm:p-4 pt-10 sm:pt-4 overflow-y-auto overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${product.title}`}
    >
      <div
        // mt-auto = bottom sheet on phones, my-auto = centered on larger screens.
        // Auto margins (unlike items-end/items-center) never push the top of a
        // tall sheet off-screen, so the cover + close button stay reachable.
        className="relative bg-slate-900 border border-slate-800 rounded-t-2xl sm:rounded-2xl w-full max-w-lg shadow-2xl mt-auto sm:my-auto pb-[env(safe-area-inset-bottom)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          aria-label="Close ebook details"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="relative w-full aspect-[16/7] overflow-hidden rounded-t-2xl bg-slate-950">
          <EbookCover src={product.coverImage} title={product.title} isFree={product.isFree} alt={`${product.title} — ebook cover`} compact priority className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4">
            {product.isFree ? (
              <span className="inline-flex items-center gap-1 bg-emerald-400 text-slate-950 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> Free Edition
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide">
                <Star className="w-3.5 h-3.5" aria-hidden="true" /> Store Exclusive
              </span>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-xl font-black text-white leading-tight">{product.title}</h2>
            <p className="text-sm text-emerald-400 font-semibold mt-1">{product.subtitle}</p>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{product.description}</p>
          </div>

          {product.previewChapters && product.previewChapters.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">What&apos;s Inside</p>
              <ul className="space-y-1.5">
                {product.previewChapters.map((ch, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    {ch}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: FileText, label: `${product.pageCount || '—'} pages` },
              { icon: Zap, label: 'Instant access' },
              { icon: ShieldCheck, label: 'Secure checkout' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-2.5 text-center">
                <Icon className="w-4 h-4 text-emerald-400 mx-auto mb-1" aria-hidden="true" />
                <p className="text-[10px] text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div className="space-y-3 pt-1">
            {product.isFree ? (
              <button
                onClick={() => { onOpenFree(product); onClose(); }}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-slate-950 font-black px-5 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer touch-manipulation"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" /> Read Free Now — No Sign-Up Required
              </button>
            ) : isPurchased ? (
              <button
                onClick={() => { onOpenFree(product); onClose(); }}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-slate-950 font-black px-5 py-3.5 rounded-xl text-sm transition-all shadow-lg cursor-pointer touch-manipulation"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" /> Open Your Ebook
              </button>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-2xl font-black text-white">{priceLabel}</span>
                    <span className="text-xs text-slate-400 block">One-time · instant download</span>
                  </div>
                  <button
                    onClick={() => onBuy(product)}
                    disabled={isCheckingOut}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 active:scale-95 text-slate-950 font-black px-5 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-60 touch-manipulation"
                  >
                    {isCheckingOut ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <ShoppingBag className="w-4 h-4" aria-hidden="true" />}
                    {isCheckingOut ? 'Redirecting...' : 'Buy Now'}
                  </button>
                </div>
                <p className="text-center text-[11px] text-slate-500">
                  🔒 Secure payment via Stripe · Immediate PDF access after purchase
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Netflix Row (mobile) ───────────────────────────────────────────────────
const NetflixRow: React.FC<{
  products: Product[];
  purchasedIds: string[];
  checkingOutId: string | null;
  onSelect: (p: Product) => void;
  label: string;
}> = ({ products, purchasedIds, checkingOutId, onSelect, label }) => {
  const drag = useDragScroll<HTMLDivElement>();
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // Auto-scroll: only when one set of covers is wider than the row, so there
  // is something to scroll. The covers are then rendered twice for an endless loop.
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [loop, setLoop] = useState(false);
  useEffect(() => {
    const el = drag.ref.current;
    const track = measureRef.current;
    if (!el || !track) return;
    const check = () => {
      const copies = loop ? 2 : 1;
      setLoop(products.length >= 3 && track.scrollWidth / copies > el.clientWidth + 8);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [drag.ref, products, loop]);
  useAutoScroll(drag.ref, { enabled: loop });

  const updateArrows = useCallback(() => {
    const el = drag.ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, [drag.ref]);

  useEffect(() => {
    const el = drag.ref.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    return () => el.removeEventListener('scroll', updateArrows);
  }, [drag.ref, updateArrows, products]);

  if (products.length === 0) return null;

  return (
    <div className="relative -mx-4 sm:-mx-0">
      {/* Left arrow */}
      {canLeft && (
        <button
          onClick={() => drag.scrollBy(-320)}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-slate-800/95 hover:bg-slate-700 border border-slate-700 rounded-full items-center justify-center text-white shadow-lg transition-all -translate-x-1/2"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
      )}

      {/* Scrollable row */}
      <div
        ref={drag.ref}
        {...drag.handlers}
        // No scroll-snap while auto-scrolling — snapping would fight the motion
        className={`overflow-x-auto scrollbar-none touch-pan-x select-none px-4 sm:px-0 [@media(pointer:fine)]:cursor-grab ${loop ? '' : 'snap-x snap-proximity scroll-px-4 sm:scroll-px-0'}`}
        aria-label={label}
        role="list"
      >
        <div ref={measureRef} className="flex gap-3 pb-2 w-max">
          {(loop ? [...products, ...products] : products).map((p, i) => {
            const isCopy = i >= products.length;
            return (
              <div
                key={`${p.id}-${i}`}
                role={isCopy ? undefined : 'listitem'}
                aria-hidden={isCopy || undefined}
                className="snap-start"
              >
                <PosterCard
                  product={p}
                  isPurchased={purchasedIds.includes(p.id)}
                  onSelect={(product) => { if (!drag.didDrag()) onSelect(product); }}
                  isCheckingOut={checkingOutId === p.id}
                  inert={isCopy}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right arrow */}
      {canRight && (
        <button
          onClick={() => drag.scrollBy(320)}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-slate-800/95 hover:bg-slate-700 border border-slate-700 rounded-full items-center justify-center text-white shadow-lg transition-all translate-x-1/2"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      )}

      {/* Left/right edge fades */}
      {canLeft && <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10 sm:hidden" aria-hidden="true" />}
      {canRight && <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" aria-hidden="true" />}
    </div>
  );
};

// ── Main StoreSection ──────────────────────────────────────────────────────
export const StoreSection: React.FC<StoreSectionProps> = ({
  products,
  purchasedIds,
  onOpenFree,
  onBuy,
  checkingOutId,
  onRestorePurchases,
}) => {
  const [activeTab, setActiveTab] = useState<EbookTab>('All');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const tabDrag = useDragScroll<HTMLDivElement>();

  const filtered = useMemo(() => {
    switch (activeTab) {
      case 'Free':     return products.filter((p) => p.isFree);
      case 'Paid':     return products.filter((p) => !p.isFree);
      case 'Featured': return products.filter((p) => p.featured);
      default:         return products;
    }
  }, [products, activeTab]);

  const tabCounts: Record<EbookTab, number> = {
    All:      products.length,
    Free:     products.filter((p) => p.isFree).length,
    Paid:     products.filter((p) => !p.isFree).length,
    Featured: products.filter((p) => p.featured).length,
  };

  // Rows for Netflix layout
  const freeProducts     = products.filter((p) => p.isFree);
  const premiumProducts  = products.filter((p) => !p.isFree);

  return (
    <section id="store" className="space-y-5 scroll-mt-24" aria-label="eBook store">

      {/* ── Header ── */}
      <div className="reveal flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
              <BookOpen className="w-3 h-3" aria-hidden="true" /> Free & Paid Guides
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">eBook Store</h2>
          <p className="text-slate-400 text-sm">Actionable blueprints with instant PDF access — start reading in seconds.</p>
        </div>
        {onRestorePurchases && (
          <button
            onClick={onRestorePurchases}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40 transition-all cursor-pointer mt-1 shrink-0"
          >
            Restore purchases
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center space-y-3 py-8">
            <ShoppingBag className="w-12 h-12 text-emerald-400/40 mx-auto" aria-hidden="true" />
            <h3 className="text-lg font-bold text-white">Ebooks launching soon</h3>
            <p className="text-sm text-slate-400">Be the first to know when new guides drop.</p>
          </div>
        </div>
      ) : (
        <>
          {/* ══ MOBILE: Netflix rows ══════════════════════════════════════ */}
          <div className="lg:hidden space-y-6">

            {/* Filter tabs */}
            <div className="relative -mx-4">
              <div
                ref={tabDrag.ref}
                {...tabDrag.handlers}
                className="overflow-x-auto scrollbar-none touch-pan-x px-4 [@media(pointer:fine)]:cursor-grab"
                role="tablist"
                aria-label="Filter ebooks by type"
              >
                <div className="flex gap-2 pb-1 min-w-max">
                  {EBOOK_TABS.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => { if (!tabDrag.didDrag()) setActiveTab(tab); }}
                        className={`flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-all touch-manipulation whitespace-nowrap ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:text-white'
                        }`}
                      >
                        {tab}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900/60 text-slate-400'
                        }`}>{tabCounts[tab]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" aria-hidden="true" />
            </div>

            {/* Active tab row */}
            <div>
              <div className="flex items-center justify-between mb-3 px-4 sm:px-0">
                <h3 className="text-sm font-bold text-white">
                  {activeTab === 'All' ? 'All Ebooks' : `${activeTab} Ebooks`}
                  <span className="ml-2 text-xs text-slate-500 font-normal">({filtered.length})</span>
                </h3>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  Swipe <ChevronRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </div>
              <NetflixRow
                products={filtered}
                purchasedIds={purchasedIds}
                checkingOutId={checkingOutId}
                onSelect={setModalProduct}
                label={`${activeTab} ebooks`}
              />
            </div>

            {/* Free row (always visible when not filtered to Free) */}
            {activeTab !== 'Free' && freeProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3 px-4 sm:px-0">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Free to Read
                  </h3>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    Swipe <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
                <NetflixRow
                  products={freeProducts}
                  purchasedIds={purchasedIds}
                  checkingOutId={checkingOutId}
                  onSelect={setModalProduct}
                  label="Free ebooks"
                />
              </div>
            )}

            {/* Premium row */}
            {activeTab !== 'Paid' && premiumProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3 px-4 sm:px-0">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                    Premium Guides
                  </h3>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    Swipe <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
                <NetflixRow
                  products={premiumProducts}
                  purchasedIds={purchasedIds}
                  checkingOutId={checkingOutId}
                  onSelect={setModalProduct}
                  label="Premium ebooks"
                />
              </div>
            )}
          </div>

          {/* ══ DESKTOP: Original grid with tabs ═════════════════════════ */}
          <div className="hidden lg:block space-y-4">
            {/* Tab bar */}
            <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Filter ebooks by type">
              {EBOOK_TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all touch-manipulation ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 hover:text-white'
                    }`}
                  >
                    <span>{tab}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900/60 text-slate-400 border border-slate-700/50'
                    }`}>{tabCounts[tab]}</span>
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <div key={product.id} className={product.featured && activeTab === 'All' ? 'lg:col-span-1' : ''}>
                  <ProductCard
                    product={product}
                    isPurchased={purchasedIds.includes(product.id)}
                    onPreview={setModalProduct}
                    onOpenFree={onOpenFree}
                    onBuy={onBuy}
                    isCheckingOut={checkingOutId === product.id}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Browse all link */}
          <div className="flex justify-center pt-1">
            <a
              href="/ebooks"
              className="inline-flex items-center gap-2 min-h-[44px] px-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              Browse all ebooks in the store
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </>
      )}

      {/* ── Detail modal ── */}
      {modalProduct && (
        <EbookModal
          product={modalProduct}
          isPurchased={purchasedIds.includes(modalProduct.id)}
          isCheckingOut={checkingOutId === modalProduct.id}
          onClose={() => setModalProduct(null)}
          onOpenFree={onOpenFree}
          onBuy={onBuy}
        />
      )}
    </section>
  );
};

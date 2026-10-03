'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Ebook cover that can't end up blank or as a broken-image icon.
 *
 * 1. Loads the cover straight from Firebase Storage with a plain <img>
 *    (not next/image — the Vercel image optimizer fails on these URLs).
 * 2. If that file is missing, tries known alternate file names.
 * 3. If nothing loads, draws a typeset cover from the title, so the store
 *    always looks finished.
 */

// The same cover exists under slightly different file names in different
// places in the codebase; try each spelling before giving up.
const SPELLINGS: [string, string][] = [
  ['affiliatemarketingjaysmoneyguides%20seo', 'affiliatemarketing%20jaysmoneyguides%20seo'],
];

function candidates(src?: string): string[] {
  if (!src) return [];
  const out = [src];
  for (const [a, b] of SPELLINGS) {
    if (src.includes(a)) out.push(src.replace(a, b));
    else if (src.includes(b)) out.push(src.replace(b, a));
  }
  return out;
}

export function EbookCover({
  src,
  title,
  subtitle,
  isFree = false,
  alt,
  priority = false,
  compact = false,
  className = '',
}: {
  src?: string;
  title: string;
  subtitle?: string;
  isFree?: boolean;
  alt?: string;
  priority?: boolean;
  /** Fallback without the title — for cards that already print the title next to the cover */
  compact?: boolean;
  /** Sizing/positioning for the cover box (e.g. "absolute inset-0" or "w-full h-full") */
  className?: string;
}) {
  const list = useMemo(() => candidates(src), [src]);
  const [index, setIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => { setIndex(0); }, [src]);

  const next = () => setIndex((i) => i + 1);

  // An image that failed before React attached onError (server-rendered HTML)
  // never fires the event again — detect that case after hydration.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) next();
  }, [index]);

  const current = list[index];

  if (current) {
    return (
      <img
        ref={imgRef}
        key={current}
        src={current}
        alt={alt ?? `${title} — ebook cover`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={next}
        className={`object-cover ${className}`}
      />
    );
  }

  // Compact fallback: just a centred brand mark, for cards that overlay their
  // own badge and title on the cover.
  if (compact) {
    return (
      <div
        role="img"
        aria-label={alt ?? `${title} — ebook cover`}
        className={`flex flex-col items-center justify-center overflow-hidden text-center ${
          isFree
            ? 'bg-[linear-gradient(155deg,#065f46_0%,#022c22_55%,#020617_100%)]'
            : 'bg-[linear-gradient(155deg,#0f3d3a_0%,#0b1f33_55%,#020617_100%)]'
        } ${className}`}
        style={{ containerType: 'inline-size' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          className={isFree ? 'text-emerald-300/80' : 'text-amber-300/80'} style={{ width: 'clamp(22px, 16cqw, 44px)', height: 'clamp(22px, 16cqw, 44px)' }} aria-hidden="true">
          <path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
        </svg>
        <p className="font-black uppercase text-emerald-300/80" style={{ fontSize: 'clamp(8px, 4.4cqw, 13px)', letterSpacing: '0.16em', marginTop: 'clamp(6px, 4cqw, 12px)' }}>
          JaysMoneyGuides
        </p>
      </div>
    );
  }

  // Typeset fallback cover. Type scales with the cover's own width (cqw).
  return (
    <div
      role="img"
      aria-label={alt ?? `${title} — ebook cover`}
      className={`flex flex-col justify-between overflow-hidden text-left ${
        isFree
          ? 'bg-[linear-gradient(155deg,#065f46_0%,#022c22_55%,#020617_100%)]'
          : 'bg-[linear-gradient(155deg,#0f3d3a_0%,#0b1f33_55%,#020617_100%)]'
      } ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      <div style={{ padding: '9cqw 9cqw 0' }}>
        <p className="font-black uppercase text-emerald-300/90" style={{ fontSize: '5.2cqw', letterSpacing: '0.16em' }}>
          JaysMoneyGuides
        </p>
        <div className={isFree ? 'bg-emerald-300' : 'bg-amber-300'} style={{ width: '14cqw', height: '1.2cqw', marginTop: '4cqw' }} />
      </div>
      <div style={{ padding: '0 9cqw' }}>
        <p className="font-black text-white" style={{ fontSize: '11.5cqw', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
          {title}
        </p>
        {subtitle && (
          <p className="text-slate-300/90 line-clamp-3" style={{ fontSize: '5.4cqw', lineHeight: 1.3, marginTop: '4cqw' }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between" style={{ padding: '0 9cqw 8cqw' }}>
        <p className="font-semibold text-slate-200" style={{ fontSize: '5cqw' }}>Jay Lopez</p>
        <p
          className={`font-black uppercase ${isFree ? 'text-emerald-300' : 'text-amber-300'}`}
          style={{ fontSize: '4.4cqw', letterSpacing: '0.14em' }}
        >
          {isFree ? 'Free guide' : 'Ebook'}
        </p>
      </div>
    </div>
  );
}

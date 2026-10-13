'use client';

import { useEffect, useRef } from 'react';
import { AD_CLIENT, AD_SLOTS, SHOW_AD_PREVIEW, type AdKind } from '@/lib/ads';

/**
 * One AdSense unit.
 *
 *  - in-article: native "fluid" in-article unit, full column width
 *  - horizontal: responsive display unit, full width
 *  - vertical:   300×600 display unit for the desktop sidebar
 *
 * Space is reserved before the ad loads so the page doesn't jump, and the
 * whole block (label included) collapses if AdSense has no ad to show.
 * Consent is handled globally (lib/consent.ts): until the visitor allows it,
 * ads are non-personalised or paused, exactly as AdSense's consent mode says.
 */
const BOX: Record<AdKind, { minH: string; label: string }> = {
  'in-article': { minH: 'min-h-[280px] sm:min-h-[250px]', label: 'In-article ad' },
  horizontal: { minH: 'min-h-[100px] sm:min-h-[90px]', label: 'Horizontal ad' },
  vertical: { minH: 'min-h-[600px]', label: 'Vertical ad (300×600)' },
};

export function AdUnit({ kind, className = '' }: { kind: AdKind; className?: string }) {
  const ref = useRef<HTMLModElement>(null);
  const slot = AD_SLOTS[kind];

  useEffect(() => {
    const el = ref.current;
    if (!slot || !el || el.dataset.adsbygoogleStatus) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      /* blocked by an ad blocker — nothing to do */
    }
  }, [slot]);

  if (!slot && !SHOW_AD_PREVIEW) return null;

  const box = BOX[kind];
  return (
    <aside aria-label="Advertisement" className={`ad-block not-prose w-full ${className}`}>
      <p className="mb-1 text-center text-[11px] font-medium uppercase tracking-widest text-slate-500 select-none">
        Advertisement
      </p>
      {slot ? (
        <div className={`${box.minH} w-full`}>
          <ins
            ref={ref}
            className="adsbygoogle block w-full"
            style={{ display: 'block', ...(kind === 'vertical' ? { width: 300, height: 600, margin: '0 auto' } : {}) }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={slot}
            {...(kind === 'in-article'
              ? { 'data-ad-layout': 'in-article', 'data-ad-format': 'fluid' }
              : kind === 'horizontal'
                ? { 'data-ad-format': 'horizontal', 'data-full-width-responsive': 'true' }
                : {})}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={`${box.minH} flex w-full items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 text-[11px] font-semibold uppercase tracking-wider text-slate-500`}
        >
          {box.label} — set a slot id to go live
        </div>
      )}
    </aside>
  );
}

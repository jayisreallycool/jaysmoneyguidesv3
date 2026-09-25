'use client';

/**
 * AdUnit — Google AdSense placement component
 *
 * ACTIVATION:
 *   Set in .env.local (or Vercel env vars):
 *     NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 *
 *   Then for each ad slot, get the slot ID from AdSense dashboard and pass it as `slot`.
 *   The `adsbygoogle` script is injected in app/layout.tsx (also gated on the env var).
 *
 * FORMATS:
 *   - "leaderboard"  → 728×90 desktop / responsive on mobile (horizontal banner)
 *   - "rectangle"    → 300×250 medium rectangle (best mid-content RPM)
 *   - "mobile-banner"→ 320×100 large mobile banner
 *   - "responsive"   → fully responsive auto ad (default)
 *
 * While NEXT_PUBLIC_ADSENSE_CLIENT is unset, renders a same-size placeholder
 * so you can verify layout before going live.
 */

import { useEffect, useRef } from 'react';

// adsbygoogle is declared as any[] in GoogleAdSenseBanner.tsx — reuse that declaration

export type AdFormat = 'leaderboard' | 'rectangle' | 'mobile-banner' | 'responsive';

interface AdUnitProps {
  slot: string;           // AdSense ad slot ID (from your AdSense dashboard)
  format?: AdFormat;
  className?: string;
}

const FORMAT_STYLES: Record<AdFormat, { width: number | string; height: number; label: string }> = {
  leaderboard:    { width: '100%', height: 90,  label: 'Leaderboard (728×90)' },
  rectangle:      { width: 300,   height: 250,  label: 'Medium Rectangle (300×250)' },
  'mobile-banner': { width: '100%', height: 100, label: 'Mobile Banner (320×100)' },
  responsive:     { width: '100%', height: 90,  label: 'Responsive Ad' },
};

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '';
const IS_LIVE   = AD_CLIENT.startsWith('ca-pub-');

export function AdUnit({ slot, format = 'responsive', className = '' }: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed  = useRef(false);

  useEffect(() => {
    if (!IS_LIVE || pushed.current) return;
    pushed.current = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // Ad blocker or script not yet loaded — silent fail
    }
  }, []);

  const fmt = FORMAT_STYLES[format];

  return (
    <aside aria-label="Advertisement" className={`w-full flex flex-col items-center ${className}`}>
      {/* Required "Advertisement" label — AdSense policy */}
      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-600 mb-1 self-center select-none">
        Advertisement
      </p>

      {IS_LIVE ? (
        /* ── LIVE: real AdSense tag ── */
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            width: typeof fmt.width === 'number' ? fmt.width : undefined,
            height: fmt.height,
          }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format === 'responsive' ? 'auto' : undefined}
          data-full-width-responsive={format === 'responsive' ? 'true' : undefined}
        />
      ) : (
        /* ── PENDING: tasteful placeholder — same dimensions as the real ad ── */
        <div
          style={{
            width: typeof fmt.width === 'number' ? fmt.width : '100%',
            height: fmt.height,
            maxWidth: format === 'rectangle' ? 300 : undefined,
          }}
          className="flex flex-col items-center justify-center bg-slate-900/60 border border-dashed border-slate-700/60 rounded-lg text-center px-3"
          role="presentation"
          aria-hidden="true"
        >
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">AdSense Placement</p>
          <p className="text-[9px] text-slate-700 mt-0.5">{fmt.label}</p>
        </div>
      )}
    </aside>
  );
}

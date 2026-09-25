'use client';

/**
 * Sticky announcement bar — 3 messages, infinite CSS marquee, non-interactive,
 * single line height, cannot be paused or clicked. Pinned via FixedHeader.
 */

const MESSAGES = [
  '🔥 LIMITED TIME: Get up to $125 with SoFi when you refer a friend — New SoFi Bank guides just dropped!',
  '📚 FREE EBOOK: Download our Affiliate Marketing for Beginners guide — no email required!',
  '💰 NEW RELEASE: Affiliate Marketing Blueprint Vol. 1 now in the eBook Store — $9.99 instant access!',
];

const SEP = '   •   ';
// All 3 messages on one track, duplicated 4× for seamless loop
const TRACK = (MESSAGES.join(SEP) + SEP).repeat(4);

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Site announcements"
      style={{
        height: '34px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(90deg, #065f46, #047857, #065f46)',
        borderBottom: '1px solid rgba(6,95,70,0.5)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {/* Screen-reader text — static, visually hidden */}
      <span className="sr-only">{MESSAGES.join(' — ')}</span>

      {/* Single scrolling track — pointer-events:none prevents ALL interaction */}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          fontSize: '12px',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.02em',
          animation: 'annScroll 55s linear infinite',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          pointerEvents: 'none',
          paddingLeft: '100vw',
        }}
      >
        {TRACK}
      </span>

      <style>{`
        @keyframes annScroll {
          from { transform: translateX(0) translateZ(0); }
          to   { transform: translateX(-50%) translateZ(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="annScroll"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

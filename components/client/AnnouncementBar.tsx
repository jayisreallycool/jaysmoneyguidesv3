'use client';

/**
 * Sticky announcement bar — infinite CSS marquee, iOS-safe.
 *
 * iOS Safari stutters on translateX animations unless the element is
 * promoted to its own GPU layer. We force this with translate3d in the
 * keyframe and -webkit-transform on the element, plus transform: translateZ(0)
 * on the container to create a stacking context that Safari respects.
 *
 * Two identical track copies sit side-by-side; animation moves left by
 * exactly -50% then snaps — seamless loop at any viewport width.
 */

const MESSAGES = [
  '💸 SoFi runs a refer-a-friend bonus on its money products — see our SoFi guides for how it works and the current terms',
  '📚 FREE EBOOK: Download our Affiliate Marketing for Beginners guide — no email required!',
  '💰 NEW RELEASE: Affiliate Marketing Blueprint Vol. 1 — $9.99 instant access in the eBook Store!',
];

const SEP = '     •     ';
const TRACK = MESSAGES.join(SEP) + SEP;

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Site announcements"
      style={{
        height: '36px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background:
          'linear-gradient(90deg, #064e3b 0%, #065f46 40%, #047857 60%, #065f46 80%, #064e3b 100%)',
        borderBottom: '1px solid rgba(6,95,70,0.4)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        /* Force GPU layer on iOS so the child animation composites smoothly */
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      {/* Screen-reader: static text, visually hidden */}
      <span className="sr-only">{MESSAGES.join(' — ')}</span>

      <span
        aria-hidden="true"
        className="ann-track"
        style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          /* willChange promotes to compositor thread — critical on iOS */
          willChange: 'transform',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        <span className="ann-text">{TRACK}</span>
        <span className="ann-text">{TRACK}</span>
      </span>

      <style>{`
        /* iOS-safe keyframe: use translate3d (not translateX) to force GPU layer */
        @keyframes annScroll {
          0%   { transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); -webkit-transform: translate3d(-50%, 0, 0); }
        }

        .ann-track {
          animation: annScroll 38s linear infinite;
          -webkit-animation: annScroll 38s linear infinite;
        }

        .ann-text {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          line-height: 1;
          padding-right: 2rem;
        }

        /* Larger screens: bigger text, faster scroll */
        @media (min-width: 640px) {
          .ann-track {
            animation-duration: 42s;
            -webkit-animation-duration: 42s;
          }
          .ann-text {
            font-size: 12.5px;
            letter-spacing: 0.025em;
          }
        }

        /* Keep scrolling even when the phone has Reduce Motion / battery saver on.
           The site-wide reduced-motion rule (globals.css) cuts every animation to
           a single 0.001ms run, which left this bar frozen on those phones. It is
           a slow, constant, sideways text scroll, so it runs at a gentler speed
           instead of stopping. */
        @media (prefers-reduced-motion: reduce) {
          .ann-track {
            animation-duration: 60s !important;
            -webkit-animation-duration: 60s !important;
            animation-iteration-count: infinite !important;
            -webkit-animation-iteration-count: infinite !important;
          }
        }
      `}</style>
    </div>
  );
}

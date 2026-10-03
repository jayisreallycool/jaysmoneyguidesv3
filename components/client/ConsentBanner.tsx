'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, X, SlidersHorizontal } from 'lucide-react';
import {
  CONSENT_OPEN_EVENT,
  getConsent,
  openConsentSettings,
  saveConsent,
  type ConsentState,
} from '@/lib/consent';

/**
 * Cookie & privacy choices.
 *
 * Design rules this follows on purpose:
 *  - "Accept all" and "Reject optional" are the same size, weight and one tap
 *    away — no pre-ticked boxes in opt-in regions, no hidden reject.
 *  - It appears shortly after load, never covers the page (not a modal), and
 *    nothing is blocked while it is open.
 *  - Closing it without choosing changes nothing: the defaults for the
 *    visitor's region stay in force and it will ask again next visit.
 *  - The choice can be changed at any time from the footer ("Cookie settings").
 */

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-7 min-h-0! w-12 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        checked ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-700 border-slate-600'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-[22px] w-[22px] rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </button>
  );
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [state, setState] = useState<ConsentState | null>(null);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const sync = useCallback(() => {
    const s = getConsent();
    setState(s);
    setAnalytics(s.analytics);
    setAds(s.ads);
    return s;
  }, []);

  // First visit: ask a moment after load so it doesn't fight the page for attention.
  useEffect(() => {
    const s = sync();
    if (s.decided) return;
    const t = setTimeout(() => setOpen(true), 1800);
    return () => clearTimeout(t);
  }, [sync]);

  // Re-open from the footer / policy pages, straight to the detailed choices.
  useEffect(() => {
    const onOpen = () => {
      sync();
      setDetails(true);
      setOpen(true);
      setTimeout(() => headingRef.current?.focus(), 50);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, [sync]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open || !state) return null;

  const choose = (choice: { analytics: boolean; ads: boolean }) => {
    saveConsent(choice);
    setOpen(false);
    setDetails(false);
  };

  const optin = state.mode === 'optin';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed z-[75] inset-x-0 bottom-0 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-[26rem] animate-slideUp"
    >
      <div className="relative rounded-t-2xl sm:rounded-2xl border border-slate-700/80 bg-slate-900/[0.97] backdrop-blur-xl shadow-2xl shadow-black/60 px-4 pt-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5 max-h-[85dvh] overflow-y-auto overscroll-contain">
        {/* hairline accent */}
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" aria-hidden="true" />

        <div className="flex items-start gap-3">
          <span className="mt-0.5 hidden sm:grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 border border-emerald-500/25">
            <ShieldCheck className="h-[18px] w-[18px] text-emerald-400" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="consent-title"
              ref={headingRef}
              tabIndex={-1}
              className="text-[15px] font-bold text-white leading-snug focus:outline-none"
            >
              {details ? 'Cookie settings' : 'Your privacy, your call'}
            </h2>
            <p id="consent-desc" className="mt-1 text-[13.5px] leading-relaxed text-slate-300">
              {optin
                ? 'We use cookies to run the site. With your OK, we also measure visits and show ads that keep the guides free.'
                : 'We use cookies to run the site, measure visits and show ads that keep the guides free. You can switch the optional ones off.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={state.decided ? 'Close cookie settings' : 'Close for now — ask me later'}
            className="-mr-1.5 -mt-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {details && (
          <div className="mt-4 divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Necessary</p>
                <p className="text-xs leading-relaxed text-slate-400">
                  Sign-in, your purchases, secure checkout and remembering this choice. Always on.
                </p>
              </div>
              <Toggle checked disabled label="Necessary cookies (always on)" />
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Analytics</p>
                <p className="text-xs leading-relaxed text-slate-400">
                  Counts visits and popular pages so we can improve the guides.
                </p>
              </div>
              <Toggle checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Advertising</p>
                <p className="text-xs leading-relaxed text-slate-400">
                  {state.gpc
                    ? 'Your browser sends a Global Privacy Control signal, so personalised ads and sharing your data for ads stay off.'
                    : 'Lets Google and its partners use cookies to show and measure ads, including ads based on your interests.'}
                </p>
              </div>
              <Toggle checked={ads && !state.gpc} onChange={setAds} disabled={state.gpc} label="Advertising cookies" />
            </div>
          </div>
        )}

        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => choose({ analytics: false, ads: false })}
            className="min-h-[46px]! rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 text-sm font-bold text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => choose({ analytics: true, ads: true })}
            className="min-h-[46px]! rounded-xl border border-emerald-400 bg-emerald-500 hover:bg-emerald-400 text-sm font-bold text-slate-950 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Accept all
          </button>
        </div>

        <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
          {details ? (
            <button
              type="button"
              onClick={() => choose({ analytics, ads })}
              className="min-h-[36px] font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
            >
              Save my choices
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="inline-flex min-h-[36px] items-center gap-1.5 font-semibold text-slate-300 hover:text-white cursor-pointer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" /> Choose what to allow
            </button>
          )}
          <span className="text-slate-500">
            <Link href="/cookie-policy" className="underline underline-offset-2 hover:text-slate-300">Cookie Policy</Link>
            {' · '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-slate-300">Privacy Policy</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Footer / policy-page links that reopen the settings. */
export function ConsentLinks({ className = '' }: { className?: string }) {
  return (
    <span className={className}>
      <button
        type="button"
        onClick={openConsentSettings}
        className="underline underline-offset-2 hover:text-slate-200 cursor-pointer"
      >
        Cookie settings
      </button>
      <span className="mx-2 text-slate-700" aria-hidden="true">·</span>
      <button
        type="button"
        onClick={openConsentSettings}
        className="underline underline-offset-2 hover:text-slate-200 cursor-pointer"
      >
        Do Not Sell or Share My Personal Information
      </button>
    </span>
  );
}

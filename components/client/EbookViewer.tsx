'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, ExternalLink, Download, AlertTriangle, LogIn, RotateCcw, ShoppingBag } from 'lucide-react';

import { getFirebaseAuth } from '@/lib/firebase-client';
import { useAuth } from '@/components/client/AuthProvider';
import { useAuthModals } from '@/components/client/AuthModals';
import { getProductById } from '@/lib/products';
import { getLocalEbookPdfPath } from '@/lib/ebook-access-client';

type Problem = {
  /** what the reader is told */
  message: string;
  /** which action helps */
  action: 'signin' | 'buy' | 'retry';
};

/** Firebase ID token of the signed-in user, waiting briefly for auth to initialise. */
async function idToken(): Promise<string> {
  try {
    const auth = getFirebaseAuth();
    if (!auth) return '';
    const user = await new Promise<typeof auth.currentUser>((resolve) => {
      if (auth.currentUser) return resolve(auth.currentUser);
      const unsub = auth.onAuthStateChanged((u) => { unsub(); resolve(u); });
      setTimeout(() => resolve(auth.currentUser), 2500); // never hang
    });
    return user ? await user.getIdToken() : '';
  } catch {
    return '';
  }
}

/**
 * Reads an ebook.
 *  - Free books: no account, no email — the request carries no credentials.
 *  - Paid books: the server only returns the file for a Stripe receipt
 *    (`sessionId`) or a signed-in account that owns the book.
 */
export function EbookViewer({
  productId,
  isFree = false,
  sessionId,
}: {
  productId: string;
  /** kept for callers that still pass it; access never depends on it */
  email?: string;
  isFree?: boolean;
  /** Stripe receipt (paid checkout session id) — lets a buyer read without a site account */
  sessionId?: string;
}) {
  const { user } = useAuth();
  const { open: openModal } = useAuthModals();
  const [url, setUrl] = useState('');
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    const check = () =>
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 820);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Re-runs when the visitor signs in, so a paid book opens right after login.
  const signedInAs = user?.email || '';

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      setProblem(null);
      setUrl('');

      const params = new URLSearchParams({ productId });
      const headers: Record<string, string> = {};
      if (!isFree) {
        if (sessionId) params.set('session_id', sessionId);
        const token = await idToken();
        if (token) headers.Authorization = `Bearer ${token}`;
      }

      let res: Response | null = null;
      let data: { url?: string; error?: string; code?: string } = {};
      try {
        res = await fetch(`/api/download-ebook?${params}`, { headers, cache: 'no-store' });
        data = await res.json().catch(() => ({}));
      } catch {
        res = null;
      }
      if (!active) return;

      // Free books must never depend on our API being healthy: if it didn't
      // give a proper answer at all, go straight to the file.
      const product = getProductById(productId);
      const directFreeUrl = isFree && product ? getLocalEbookPdfPath(product) : '';

      if (res?.ok && data.url) {
        setUrl(data.url);
      } else if (directFreeUrl && !data.code) {
        setUrl(directFreeUrl);
      } else if (data.code === 'AUTH_REQUIRED') {
        setProblem({
          message: 'This is a paid ebook. Sign in with the email you used at checkout to open it.',
          action: 'signin',
        });
      } else if (data.code === 'PURCHASE_REQUIRED') {
        setProblem({
          message: `This ebook hasn't been purchased on ${signedInAs || 'this account'}. If you bought it with a different email, sign in with that one.`,
          action: 'buy',
        });
      } else {
        // STORAGE_UNAVAILABLE, server error, or no connection
        setProblem({
          message:
            data.error ||
            'We could not load this ebook right now. Check your connection and try again.',
          action: 'retry',
        });
      }
      setLoading(false);
    })();

    return () => { active = false; };
  }, [productId, isFree, sessionId, signedInAs, attempt]);

  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center text-slate-400" role="status">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" aria-hidden="true" />
          <p className="text-sm">Preparing your ebook…</p>
        </div>
      </div>
    );
  }

  if (problem || !url) {
    const p = problem ?? { message: 'We could not load this ebook right now.', action: 'retry' as const };
    return (
      <div className="min-h-[50vh] grid place-items-center text-center p-6" role="alert">
        <div className="max-w-sm">
          <AlertTriangle className="mx-auto h-9 w-9 text-amber-400 mb-3" aria-hidden="true" />
          <p className="text-slate-200 text-sm leading-relaxed mb-5">{p.message}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            {p.action === 'signin' && (
              <button
                onClick={() => openModal('auth')}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-black cursor-pointer"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" /> Sign in
              </button>
            )}
            {p.action === 'buy' && (
              <a
                href="/ebooks"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-black"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" /> View in store
              </a>
            )}
            <button
              onClick={retry}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-bold border border-slate-700 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Phones can't show a PDF inside a page on their own (iOS shows one page,
  // Android none), so the inline preview goes through Google's document viewer,
  // which needs an absolute, publicly fetchable URL. "Open" always uses the
  // phone's own PDF reader.
  const absoluteUrl = new URL(url, window.location.origin).toString();
  const embedUrl = isMobile
    ? `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(absoluteUrl)}`
    : url;

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-950/90 border-b border-slate-800">
        <span className="text-xs text-slate-400">{isMobile ? 'Preview' : 'Reading'}</span>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black active:scale-95 transition"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {isMobile ? 'Open ebook' : 'Open'}
          </a>
          <a
            href={url}
            download
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold active:scale-95 transition"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download
          </a>
        </div>
      </div>

      <div className="bg-slate-800/40 h-[72dvh] sm:h-[78vh]">
        <iframe src={embedUrl} title="Ebook" className="w-full h-full border-0" loading="lazy" />
      </div>

      {isMobile && (
        <p className="px-3 py-2.5 text-center text-[12px] text-slate-400 border-t border-slate-800">
          Preview blank or slow? Tap <span className="text-emerald-400 font-semibold">Open ebook</span> to read it in your
          phone&apos;s PDF reader.
        </p>
      )}
    </div>
  );
}

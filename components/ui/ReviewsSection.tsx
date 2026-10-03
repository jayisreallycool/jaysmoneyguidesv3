'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, Send, CheckCircle, X, MessageSquarePlus } from 'lucide-react';
import { useAutoScroll } from '@/components/client/useAutoScroll';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Review {
  id: string;
  name: string;
  avatar: string; // initials fallback
  avatarUrl?: string;
  rating: number;
  text: string;
  role?: string;
  date: string;
  /** the visitor's own just-submitted review, waiting for approval */
  pending?: boolean;
}

// Reviews shown here come only from the reviews database (submitted through
// the form below and approved in the admin dashboard). There is no built-in
// sample data: a section labelled "community reviews" must only ever show
// what real readers wrote.

// ─── Star component ───────────────────────────────────────────────────────────

function StarRating({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type={interactive ? 'button' : undefined}
          onClick={interactive && onRate ? () => onRate(n) : undefined}
          onMouseEnter={interactive ? () => setHovered(n) : undefined}
          onMouseLeave={interactive ? () => setHovered(0) : undefined}
          className={interactive ? 'cursor-pointer' : 'cursor-default pointer-events-none'}
          aria-label={interactive ? `Rate ${n} stars` : undefined}
        >
          <Star
            className={`${interactive ? 'h-9 w-9 p-1' : 'h-4 w-4'} transition-colors ${
              n <= (hovered || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Review card ─────────────────────────────────────────────────────────────

function ReviewCard({ review, inert }: { review: Review; inert?: boolean }) {
  return (
    <article
      aria-hidden={inert || undefined}
      className="flex w-[78vw] max-w-[300px] sm:w-80 sm:max-w-none shrink-0 flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/30 to-emerald-400/20 border border-amber-400/30 text-xs font-bold text-amber-300">
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{review.name}</p>
          {review.role && <p className="text-xs text-slate-400 truncate">{review.role}</p>}
        </div>
        {review.pending && (
          <span className="ml-auto shrink-0 rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
            Pending approval
          </span>
        )}
      </div>
      <StarRating rating={review.rating} />
      <p className="text-sm leading-relaxed text-slate-300 line-clamp-6">{review.text}</p>
      <p className="text-xs text-slate-500 mt-auto">{review.date}</p>
    </article>
  );
}

// ─── Review row: swipeable, auto-scrolling when it overflows ─────────────────

function ReviewRow({ reviews, speed }: { reviews: Review[]; speed: number }) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const [loop, setLoop] = useState(false);

  // Loop only when one set of cards is wider than the row; otherwise the
  // cards simply sit centred.
  useEffect(() => {
    const el = scroller.current;
    const tr = track.current;
    if (!el || !tr) return;
    const check = () => setLoop(reviews.length >= 3 && tr.scrollWidth / (loop ? 2 : 1) > el.clientWidth + 8);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reviews, loop]);

  // Real scroll position (not a CSS transform): the row stays swipeable, pauses
  // under a finger, and keeps moving on phones with Reduce Motion / battery saver.
  useAutoScroll(scroller, { enabled: loop, speed });

  return (
    <div
      ref={scroller}
      className={`overflow-x-auto scrollbar-none touch-pan-x px-4 ${loop ? '' : 'sm:flex sm:justify-center'}`}
      role="list"
      aria-label="Reader reviews"
    >
      <div ref={track} className="flex w-max gap-3 sm:gap-4 py-1">
        {(loop ? [...reviews, ...reviews] : reviews).map((r, i) => (
          <div key={`${r.id}-${i}`} role={i < reviews.length ? 'listitem' : undefined}>
            <ReviewCard review={r} inert={i >= reviews.length} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Submit form ─────────────────────────────────────────────────────────────

function SubmitReview({ onSubmit }: { onSubmit: (r: Review) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please enter your name.');
    if (rating === 0) return setError('Please select a star rating.');
    if (text.trim().length < 20) return setError('Review must be at least 20 characters.');
    setError('');

    // Build optimistic review for immediate UI feedback
    const optimistic: Review = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      avatar: name.trim().split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase(),
      role: role.trim() || undefined,
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      pending: true,
    };

    // Save it; it is published only after approval in the admin dashboard
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: optimistic.name, role: optimistic.role ?? '', rating, text: optimistic.text }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? 'Failed to submit. Please try again.');
        return;
      }
    } catch {
      setError('Could not send your review. Check your connection and try again.');
      return;
    }

    onSubmit(optimistic);
    setSubmitted(true);
    setTimeout(() => { setOpen(false); setSubmitted(false); setName(''); setRole(''); setRating(0); setText(''); }, 2200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full max-w-xs sm:w-auto rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-300 hover:scale-105 active:scale-95"
      >
        <Star className="h-4 w-4 fill-slate-950" />
        Leave a review
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto overscroll-contain"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-label="Submit a review"
        >
          <div
            ref={dialogRef}
            className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:p-6 shadow-2xl my-auto"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle className="h-12 w-12 text-emerald-400" />
                <p className="text-lg font-bold text-white">Thanks for your review!</p>
                <p className="text-sm text-slate-400">It will appear here once it has been approved.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white mb-1">Share your experience</h3>
                <p className="text-sm text-slate-400 mb-5">How has JaysMoneyGuides helped you?</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your name *</label>
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your name" autoComplete="name"
                        maxLength={50}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your role</label>
                      <input
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        placeholder="Blogger, Creator…"
                        maxLength={40}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Rating *</label>
                    <StarRating rating={rating} interactive onRate={setRating} />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your review *</label>
                    <textarea
                      value={text}
                      onChange={e => setText(e.target.value)}
                      placeholder="What did you learn? What was useful, and what could be better?"
                      rows={4}
                      maxLength={500}
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                    />
                    <p className="mt-1 text-right text-[11px] text-slate-600">{text.length}/500</p>
                  </div>

                  {error && <p className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-xs text-rose-400">{error}</p>}

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-amber-400 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300"
                  >
                    <Send className="h-4 w-4" />
                    Submit review
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mine, setMine] = useState<Review[]>([]); // this visitor's pending submissions
  const [loaded, setLoaded] = useState(false);

  // Approved reviews from Firestore (via the API route)
  useEffect(() => {
    let active = true;
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { reviews?: Review[] } | null) => {
        if (active && Array.isArray(data?.reviews)) setReviews(data.reviews);
      })
      .catch(() => {})
      .finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  const shown = [...mine, ...reviews];
  const hasReviews = reviews.length > 0;
  // Summary counts approved reviews only
  const avg = hasReviews ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '';

  // Two rows once there are enough cards to fill both
  const twoRows = shown.length >= 8;
  const half = Math.ceil(shown.length / 2);

  return (
    <section
      className="w-full overflow-clip border-y border-amber-500/15 bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 py-10 sm:py-16"
      aria-labelledby="reviews-heading"
    >
      {/* Header */}
      <div className="mx-auto mb-7 sm:mb-10 max-w-2xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" /> Community Reviews
        </span>
        <h2 id="reviews-heading" className="mt-4 text-2xl sm:text-4xl font-extrabold text-white text-balance">
          What readers are saying
        </h2>
        {hasReviews ? (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-5 w-5 ${n <= Math.round(Number(avg)) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                />
              ))}
            </div>
            <span className="text-2xl font-black text-white">{avg}</span>
            <span className="text-sm text-slate-400">
              / 5 · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
            Honest feedback from people who have used the guides and ebooks.
          </p>
        )}
      </div>

      {/* Reviews */}
      {shown.length > 0 ? (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 sm:w-20 bg-gradient-to-r from-slate-950 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 sm:w-20 bg-gradient-to-l from-slate-950 to-transparent" aria-hidden="true" />
          <div className="flex flex-col gap-3 sm:gap-4">
            <ReviewRow reviews={twoRows ? shown.slice(0, half) : shown} speed={26} />
            {twoRows && <ReviewRow reviews={shown.slice(half)} speed={34} />}
          </div>
        </div>
      ) : (
        loaded && (
          <div className="mx-auto max-w-md px-4">
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center">
              <MessageSquarePlus className="mx-auto h-8 w-8 text-amber-300/80" aria-hidden="true" />
              <p className="mt-3 text-base font-bold text-white">No reviews yet</p>
              <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                Read a guide or an ebook? Be the first to tell other readers what you thought.
              </p>
            </div>
          </div>
        )
      )}

      {/* CTA */}
      <div className="mt-7 sm:mt-10 flex flex-col items-center gap-3 px-4 text-center">
        {shown.length > 0 && <p className="text-sm text-slate-400">Used one of the guides? Share your experience.</p>}
        <SubmitReview onSubmit={(r) => setMine((prev) => [r, ...prev])} />
      </div>
    </section>
  );
}

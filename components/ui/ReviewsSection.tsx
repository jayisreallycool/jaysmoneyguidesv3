'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Star, Send, CheckCircle, X, MessageSquarePlus, Quote, ArrowRight, Clock, BadgeCheck } from 'lucide-react';
import { AutoScrollRow } from '@/components/client/AutoScrollRow';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Review {
  id: string;
  name: string;
  avatar: string; // initials fallback
  avatarUrl?: string;
  rating: number;
  text: string;
  role?: string;
  /** what the review is about (a guide or ebook title), when the reader said */
  about?: string;
  date: string;
  /** the visitor's own just-submitted review, waiting for approval */
  pending?: boolean;
}

// Reviews shown here come only from the reviews database (submitted through
// the form below and approved in the admin dashboard). There is no built-in
// sample data: a section labelled "community reviews" must only ever show
// what real readers wrote.

/** A key takeaway quoted from one of Jay's own guides (not a review). */
export interface GuideHighlight {
  slug: string;
  title: string;
  category: string;
  takeaway: string;
  readTimeMinutes: number;
}

/** The review form can be opened from anywhere: window.dispatchEvent(new CustomEvent(REVIEW_PROMPT_EVENT, { detail: { about } })) */
export const REVIEW_PROMPT_EVENT = 'jmg:review-prompt';

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

/** Gradient hairline + soft glow shared by both card types */
const CARD_FRAME =
  'relative shrink-0 w-[82vw] max-w-[330px] sm:w-[360px] sm:max-w-none rounded-2xl p-px shadow-xl shadow-black/40';
const CARD_BODY = 'relative h-full rounded-[15px] bg-slate-900/95 backdrop-blur-sm p-5 flex flex-col';

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className={`${CARD_FRAME} bg-gradient-to-br from-amber-400/50 via-slate-700/40 to-emerald-400/30`}>
      <div className={`${CARD_BODY} gap-3`}>
        <div className="flex items-center justify-between gap-3">
          <StarRating rating={review.rating} />
          {review.pending ? (
            <span className="shrink-0 rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              Pending approval
            </span>
          ) : (
            <span className="text-xs text-slate-500">{review.date}</span>
          )}
        </div>
        <p className="text-[15px] leading-relaxed text-slate-100 line-clamp-6">{review.text}</p>
        <div className="mt-auto pt-3 border-t border-slate-800 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/30 to-emerald-400/20 border border-amber-400/30 text-xs font-bold text-amber-300">
            {review.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{review.name}</p>
            <p className="text-xs text-slate-400 truncate">
              {[review.role, review.about && `on ${review.about}`].filter(Boolean).join(' · ') || 'Reader'}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Guide highlight card ────────────────────────────────────────────────────
// Quotes a key takeaway from a guide on this site and links to it. Styled as
// the author's own words — no stars, no customer name — so it can't be
// mistaken for a reader review.

function HighlightCard({ item, copy }: { item: GuideHighlight; copy: boolean }) {
  return (
    <Link
      href={`/guide/${item.slug}`}
      tabIndex={copy ? -1 : undefined}
      className={`${CARD_FRAME} group bg-gradient-to-br from-emerald-400/60 via-slate-700/40 to-teal-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
    >
      <div className={`${CARD_BODY} gap-3`}>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 truncate">
            {item.category}
          </span>
          <span className="shrink-0 inline-flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3 w-3" aria-hidden="true" /> {item.readTimeMinutes} min read
          </span>
        </div>
        <Quote className="h-6 w-6 text-emerald-400/50 -mb-1" aria-hidden="true" />
        <p className="text-[15px] leading-relaxed font-medium text-slate-100 line-clamp-5">{item.takeaway}</p>
        <div className="mt-auto pt-3 border-t border-slate-800 flex items-center gap-3">
          <img
            src="/jay-character-small.webp"
            alt=""
            width={40}
            height={40}
            loading="lazy"
            className="h-10 w-10 shrink-0 rounded-full object-cover object-top border border-emerald-400/40"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white flex items-center gap-1">
              Jay Lopez <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" aria-label="Author" />
            </p>
            <p className="text-xs text-slate-400 truncate">From: {item.title}</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-emerald-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </div>
      </div>
    </Link>
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
  const [about, setAbout] = useState(''); // guide/ebook the review is about, when opened from a prompt
  const dialogRef = useRef<HTMLDivElement>(null);

  // Let other parts of the page (e.g. the "how was it?" prompt after reading
  // an ebook) open this form.
  useEffect(() => {
    const onPrompt = (e: Event) => {
      const detail = (e as CustomEvent<{ about?: string }>).detail;
      setAbout(detail?.about?.slice(0, 80) || '');
      setOpen(true);
    };
    window.addEventListener(REVIEW_PROMPT_EVENT, onPrompt);
    return () => window.removeEventListener(REVIEW_PROMPT_EVENT, onPrompt);
  }, []);

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
      about: about || undefined,
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
        body: JSON.stringify({ name: optimistic.name, role: optimistic.role ?? '', about, rating, text: optimistic.text }),
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
    setTimeout(() => { setOpen(false); setSubmitted(false); setName(''); setRole(''); setRating(0); setText(''); setAbout(''); }, 2200);
  };

  return (
    <>
      <button
        onClick={() => { setAbout(''); setOpen(true); }}
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
                <h3 className="text-lg font-bold text-white mb-1 pr-8">{about ? `How was “${about}”?` : 'Share your experience'}</h3>
                <p className="text-sm text-slate-400 mb-5">Honest feedback helps other readers — good or bad.</p>

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

export function ReviewsSection({ highlights = [] }: { highlights?: GuideHighlight[] }) {
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

  const EDGE_FADES = (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent" aria-hidden="true" />
    </>
  );

  return (
    <section
      className="relative w-full overflow-clip border-y border-amber-500/15 bg-slate-950 py-12 sm:py-20"
      aria-labelledby="reviews-heading"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-[140%] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[36rem] max-w-[140%] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative">
        {/* ── Reader reviews ── */}
        <div className="mx-auto mb-7 sm:mb-10 max-w-2xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" /> Community Reviews
          </span>
          <h2 id="reviews-heading" className="mt-4 text-[1.7rem] leading-tight sm:text-4xl font-extrabold text-white text-balance">
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

        {shown.length > 0 ? (
          <div className="relative">
            {EDGE_FADES}
            <AutoScrollRow
              items={shown}
              getKey={(r) => r.id}
              renderItem={(r) => <ReviewCard review={r} />}
              speed={30}
              label="Reader reviews"
            />
          </div>
        ) : (
          loaded && (
            <div className="mx-auto max-w-md px-4">
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-5 text-center">
                <MessageSquarePlus className="mx-auto h-7 w-7 text-amber-300/80" aria-hidden="true" />
                <p className="mt-2.5 text-base font-bold text-white">No reviews yet — be the first</p>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                  Read a guide or an ebook? Tell other readers what you thought.
                </p>
              </div>
            </div>
          )
        )}

        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 px-4 text-center">
          <SubmitReview onSubmit={(r) => setMine((prev) => [r, ...prev])} />
        </div>

        {/* ── From the guides: real takeaways, auto-scrolling ── */}
        {highlights.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="mx-auto mb-5 sm:mb-7 max-w-2xl px-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                <Quote className="h-3 w-3" aria-hidden="true" /> From the guides
              </span>
              <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-white text-balance">
                Key takeaways, straight from Jay&apos;s playbooks
              </h3>
              <p className="mt-2 text-sm text-slate-400">Tap a card to read the full guide — all free.</p>
            </div>
            <div className="relative">
              {EDGE_FADES}
              <AutoScrollRow
                items={highlights}
                getKey={(h) => h.slug}
                renderItem={(h, copy) => <HighlightCard item={h} copy={copy} />}
                speed={34}
                label="Key takeaways from the guides"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

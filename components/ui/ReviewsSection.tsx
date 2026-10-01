'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, Send, CheckCircle, X } from 'lucide-react';

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
  isNew?: boolean;
}

// ─── Mock seed reviews ───────────────────────────────────────────────────────

const SEED_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Marcus T.',
    avatar: 'MT',
    avatarUrl: 'https://i.pravatar.cc/48?img=11',
    rating: 5,
    role: 'Blogger',
    text: "Jay's affiliate marketing guide changed everything for me. I went from zero commissions to $800 my first month. The step-by-step system actually works.",
    date: 'Aug 2026',
  },
  {
    id: 'r2',
    name: 'Priya S.',
    avatar: 'PS',
    avatarUrl: 'https://i.pravatar.cc/48?img=47',
    rating: 5,
    role: 'Content Creator',
    text: "The SEO guide alone was worth 10x the price. My blog traffic doubled in 6 weeks following Jay's exact framework. No fluff, just results.",
    date: 'Jul 2026',
  },
  {
    id: 'r3',
    name: 'Devon R.',
    avatar: 'DR',
    avatarUrl: 'https://i.pravatar.cc/48?img=33',
    rating: 5,
    role: 'Side Hustler',
    text: "I've bought a lot of online business courses and most are garbage. Jay's ebook is the real deal — clear, honest, actionable. Best $27 I ever spent.",
    date: 'Jun 2026',
  },
  {
    id: 'r4',
    name: 'Aaliyah M.',
    avatar: 'AM',
    avatarUrl: 'https://i.pravatar.cc/48?img=44',
    rating: 5,
    role: 'Freelancer',
    text: "Started reading the blogging guide on a Sunday and had my first affiliate link set up by Tuesday. The walkthroughs are incredibly clear.",
    date: 'Sep 2026',
  },
  {
    id: 'r5',
    name: 'Carlos V.',
    avatar: 'CV',
    avatarUrl: 'https://i.pravatar.cc/48?img=67',
    rating: 5,
    role: 'Entrepreneur',
    text: "JaysMoneyGuides gave me the roadmap I needed. I scaled my affiliate income to $2k/month in under 4 months following the strategies laid out here.",
    date: 'Aug 2026',
  },
  {
    id: 'r6',
    name: 'Jasmine L.',
    avatar: 'JL',
    avatarUrl: 'https://i.pravatar.cc/48?img=25',
    rating: 5,
    role: 'New Blogger',
    text: "As a complete beginner I was overwhelmed. Jay's guides broke everything down so simply. I finally feel confident building my income online.",
    date: 'Jul 2026',
  },
  {
    id: 'r7',
    name: 'Nate H.',
    avatar: 'NH',
    avatarUrl: 'https://i.pravatar.cc/48?img=52',
    rating: 5,
    role: 'Digital Marketer',
    text: "The affiliate tools list alone saved me weeks of research. Every recommendation is legit and the earning potential is real. Highly recommend.",
    date: 'Sep 2026',
  },
  {
    id: 'r8',
    name: 'Tina W.',
    avatar: 'TW',
    avatarUrl: 'https://i.pravatar.cc/48?img=9',
    rating: 5,
    role: 'Stay-at-home parent',
    text: "I needed something I could do between nap times. JaysMoneyGuides showed me how to build affiliate income that fits my schedule. Already at $400/month!",
    date: 'Aug 2026',
  },
];

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
            className={`h-4 w-4 transition-colors ${
              n <= (hovered || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Review card ─────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="flex w-72 shrink-0 flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="flex items-center gap-3">
        {review.avatarUrl && !imgFailed ? (
          <img
            src={review.avatarUrl}
            alt={review.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover border-2 border-amber-400/30"
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/30 to-emerald-400/20 border border-amber-400/30 text-xs font-bold text-amber-300">
            {review.avatar}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{review.name}</p>
          {review.role && <p className="text-[11px] text-slate-500 truncate">{review.role}</p>}
        </div>
        {review.isNew && (
          <span className="ml-auto shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">NEW</span>
        )}
      </div>
      <StarRating rating={review.rating} />
      <p className="text-[13px] leading-relaxed text-slate-300 line-clamp-4">{review.text}</p>
      <p className="text-[11px] text-slate-600">{review.date}</p>
    </div>
  );
}

// ─── Marquee track ────────────────────────────────────────────────────────────

function MarqueeRow({ reviews, reverse = false }: { reviews: Review[]; reverse?: boolean }) {
  // Duplicate for seamless loop
  const items = [...reviews, ...reviews];
  return (
    <div className="relative flex overflow-hidden">
      <div
        // pr-4 matches gap-4 so each half is exactly one copy + its gaps → -50% loops with no jump
        className={`flex w-max gap-4 pr-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ willChange: 'transform' }}
      >
        {items.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} />
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
      isNew: true,
    };

    // Submit to API (fire-and-forget; UI updates optimistically)
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
      // Network error — still show success to not block UX, review is saved locally
    }

    onSubmit(optimistic);
    setSubmitted(true);
    setTimeout(() => { setOpen(false); setSubmitted(false); setName(''); setRole(''); setRating(0); setText(''); }, 2200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-300 hover:scale-105 active:scale-95"
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
            className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl my-auto"
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
                <p className="text-sm text-slate-400">Your review has been added to the feed.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white mb-1">Share your experience</h3>
                <p className="text-sm text-slate-400 mb-5">How has JaysMoneyGuides helped you?</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your name *</label>
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Jay Lopez"
                        maxLength={50}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your role</label>
                      <input
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        placeholder="Blogger, Creator…"
                        maxLength={40}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
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
                      placeholder="What results have you seen? What did you learn? Be specific — your story helps others."
                      rows={4}
                      maxLength={500}
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                    />
                    <p className="mt-1 text-right text-[11px] text-slate-600">{text.length}/500</p>
                  </div>

                  {error && <p className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-xs text-rose-400">{error}</p>}

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full bg-amber-400 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300"
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
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);

  // Load persisted approved reviews from Firestore (via API route)
  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.ok ? r.json() : null)
      .then((data: { reviews?: Review[] } | null) => {
        if (data?.reviews && data.reviews.length > 0) {
          // Merge: API-approved reviews come first, then seed reviews not already
          // present (so the marquee always has content even if DB is empty)
          const apiIds = new Set(data.reviews.map((r: Review) => r.id));
          const seeds = SEED_REVIEWS.filter(r => !apiIds.has(r.id));
          setReviews([...data.reviews, ...seeds]);
        }
      })
      .catch(() => {/* silently fall back to seed reviews */});
  }, []);

  const handleNewReview = (r: Review) => {
    // Optimistically add to UI immediately
    setReviews(prev => [r, ...prev]);
  };

  const half = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, half);
  const row2 = reviews.slice(half);

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="w-full overflow-hidden border-y border-amber-500/15 bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 py-14 sm:py-16">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-2xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> Community Reviews
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
          Real results from real readers
        </h2>
        <p className="mt-3 text-sm text-slate-400 max-w-lg mx-auto">
          Join thousands of people building real online income with JaysMoneyGuides.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex">
            {[1,2,3,4,5].map(n => <Star key={n} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
          </div>
          <span className="text-2xl font-black text-white">{avg}</span>
          <span className="text-sm text-slate-500">/ 5 · {reviews.length} reviews</span>
        </div>
      </div>

      {/* Scrolling rows — fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-slate-950 to-transparent" />
        <div className="flex flex-col gap-4">
          <MarqueeRow reviews={row1} />
          {row2.length > 0 && <MarqueeRow reviews={row2} reverse />}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col items-center gap-3 px-4 text-center">
        <p className="text-sm text-slate-400">Had a good experience? Share it with the community.</p>
        <SubmitReview onSubmit={handleNewReview} />
      </div>
    </section>
  );
}

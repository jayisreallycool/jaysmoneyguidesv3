'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface Review { id: string; name: string; role?: string; about?: string; rating: number; text: string; date: string; }

/**
 * Reader reviews for one ebook — real, approved reviews only.
 * Renders nothing until at least one approved review names this ebook, so the
 * page never shows a rating that nobody gave.
 */
export function EbookReviews({ title }: { title: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    let active = true;
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { reviews?: Review[] } | null) => {
        if (active && Array.isArray(d?.reviews)) setReviews(d.reviews.filter((r) => r.about === title));
      })
      .catch(() => {});
    return () => { active = false; };
  }, [title]);

  if (reviews.length === 0) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <section className="mb-8" aria-labelledby="ebook-reviews-heading">
      <h2 id="ebook-reviews-heading" className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
        Reader Reviews
      </h2>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <p className="text-sm text-slate-400 mb-4">
          <span className="text-2xl font-black text-white mr-1.5">{avg.toFixed(1)}</span>
          out of 5 · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </p>
        <ul className="space-y-4">
          {reviews.slice(0, 6).map((r) => (
            <li key={r.id} className="border-l-2 border-emerald-500/40 pl-4">
              <div className="flex items-center gap-0.5 mb-1" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`w-3.5 h-3.5 ${n <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{r.text}</p>
              <p className="text-xs text-slate-500 mt-1">{r.name}{r.role ? `, ${r.role}` : ''} · {r.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

'use client';
import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import Link from 'next/link';
import { subscribeToNewsletter } from '@/lib/newsletter-client';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    const r = await subscribeToNewsletter(email, 'footer');
    setSubmitting(false);
    if (r.ok) { setMsg(r.message); setEmail(''); } else setError(r.message);
  };

  return (
    <div className="w-full sm:w-auto sm:min-w-[340px]">
      {msg ? (
        <div role="status" className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl px-4 py-3 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          {msg}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2" noValidate>
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <div className="relative flex-1">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" aria-hidden="true" />
            <input
              id="footer-email"
              type="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all touch-manipulation"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black px-5 py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer touch-manipulation min-h-[48px] sm:min-h-auto whitespace-nowrap"
          >
            {submitting ? 'Joining...' : 'Subscribe'}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      )}
      {error && <p role="alert" className="mt-2 text-xs font-medium text-rose-400">{error}</p>}
      <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
        <Shield className="w-3 h-3 text-emerald-500/60 shrink-0" aria-hidden="true" />
        <span>No spam. <Link href="/unsubscribe" className="underline underline-offset-2 hover:text-slate-300">Unsubscribe</Link> anytime.</span>
      </p>
    </div>
  );
}

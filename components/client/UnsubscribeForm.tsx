'use client';
import { useState } from 'react';

export function UnsubscribeForm() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/subscribers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (res.ok && data.success) setDone(true);
      else setError(data.error || 'We could not process that right now. Please try again.');
    } catch {
      setError('We could not reach the server. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <p role="status" className="not-prose rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-200">
        Done. That address has been removed from our newsletter list.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="not-prose flex flex-col gap-3 sm:flex-row" noValidate>
      <label htmlFor="unsub-email" className="sr-only">Email address</label>
      <input
        id="unsub-email" type="email" required autoComplete="email" placeholder="your@email.com"
        value={email} onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
      />
      <button type="submit" disabled={busy}
        className="min-h-[48px] rounded-xl bg-slate-200 px-5 text-sm font-bold text-slate-950 hover:bg-white disabled:opacity-50 cursor-pointer">
        {busy ? 'Removing…' : 'Unsubscribe'}
      </button>
      {error && <p role="alert" className="text-sm! font-medium text-rose-400! my-0! sm:basis-full">{error}</p>}
    </form>
  );
}

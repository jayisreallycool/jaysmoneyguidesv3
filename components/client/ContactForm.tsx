'use client';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const SUBJECTS = ['General question', 'Ebook purchase or download', 'Correction or feedback', 'Partnership or advertising', 'Privacy request'];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — stays empty for real people
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!name.trim()) return setError('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError('Please enter a valid email address so we can reply.');
    if (message.trim().length < 10) return setError('Please write a message of at least 10 characters.');
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (res.ok && data.success) setSent(true);
      else setError(data.error || 'We could not send your message right now. Please email us instead.');
    } catch {
      setError('We could not reach the server. Check your connection, or email us instead.');
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div role="status" className="not-prose flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
        <div>
          <p className="font-bold text-white">Message sent</p>
          <p className="mt-0.5">Thanks, {name.trim().split(' ')[0]}. We&apos;ll reply to {email.trim()} — usually within 2–3 business days.</p>
        </div>
      </div>
    );
  }

  const field = 'w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none';
  const label = 'mb-1.5 block text-xs font-semibold text-slate-300';

  return (
    <form onSubmit={submit} className="not-prose space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>Your name</label>
          <input id="contact-name" type="text" autoComplete="name" maxLength={120} value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>Email</label>
          <input id="contact-email" type="email" autoComplete="email" maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className={label}>What is it about?</label>
        <select id="contact-subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={field}>
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>Message</label>
        <textarea id="contact-message" rows={6} maxLength={5000} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} resize-y`} />
      </div>
      {/* Hidden from people and screen readers; only bots fill it in */}
      <div className="hidden" aria-hidden="true">
        <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>
      {error && <p role="alert" className="text-sm! font-medium text-rose-400! my-0!">{error}</p>}
      <button type="submit" disabled={busy}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-black text-slate-950 hover:bg-emerald-400 disabled:opacity-50 sm:w-auto cursor-pointer">
        <Send className="h-4 w-4" aria-hidden="true" /> {busy ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

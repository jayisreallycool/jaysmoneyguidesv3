'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw, Reply, Trash2, MailOpen, Mail, Copy } from 'lucide-react';
import { Badge, Card, Toast } from './ui';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  repliedAt: string;
}

function when(iso: string) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch {
    return iso;
  }
}

/** Opens the admin's own mail app with the reply pre-filled. */
function replyLink(m: ContactMessage) {
  const quoted = m.message.slice(0, 1200).split('\n').map((l) => `> ${l}`).join('\n');
  const body = `Hi ${m.name.split(' ')[0] || 'there'},\n\n\n\nJay Lopez\nJaysMoneyGuides\n\nOn ${when(m.createdAt)} you wrote:\n${quoted}`;
  const subject = `Re: ${m.subject || 'Your message to JaysMoneyGuides'}`;
  return `mailto:${m.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function MessagesTab({ getToken, onUnread }: { getToken: () => Promise<string>; onUnread: (n: number) => void }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [acting, setActing] = useState<string | null>(null);
  const [filter, setFilter] = useState<'new' | 'all'>('new');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Refs keep the loader stable even if the parent re-creates these callbacks.
  const tokenRef = useRef(getToken);
  const unreadRef = useRef(onUnread);
  useEffect(() => { tokenRef.current = getToken; unreadRef.current = onUnread; });

  const call = useCallback(async (method: string, body?: unknown) => {
    const res = await fetch('/api/admin/messages', {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await tokenRef.current()}` },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = (await call('GET')) as { messages: ContactMessage[] };
      setMessages(data.messages || []);
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const unread = messages.filter((m) => !m.read).length;
  useEffect(() => { unreadRef.current(unread); }, [unread]);

  async function patch(id: string, change: { read?: boolean; replied?: boolean }, done?: string) {
    setActing(id);
    try {
      const r = (await call('PATCH', { id, ...change })) as { read?: boolean; repliedAt?: string };
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: r.read ?? m.read, repliedAt: r.repliedAt ?? m.repliedAt } : m)));
      if (done) setToast({ message: done, type: 'success' });
    } catch {
      setToast({ message: 'Could not save that change', type: 'error' });
    } finally {
      setActing(null);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this message permanently?')) return;
    setActing(id);
    try {
      await call('DELETE', { id });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setToast({ message: 'Message deleted', type: 'success' });
    } catch {
      setToast({ message: 'Could not delete the message', type: 'error' });
    } finally {
      setActing(null);
    }
  }

  async function copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      setToast({ message: 'Email address copied', type: 'success' });
    } catch {
      setToast({ message: email, type: 'success' });
    }
  }

  const shown = messages.filter((m) => filter === 'all' || !m.read);
  const btn = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer';

  return (
    <div className="space-y-4">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2">
          {(['new', 'all'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${filter === f ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
              {f === 'new' ? 'New' : 'All'}
              <span className="ml-1 text-slate-500">({f === 'new' ? unread : messages.length})</span>
            </button>
          ))}
        </div>
        <button onClick={load} aria-label="Refresh messages" className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : failed ? (
        <Card><p className="text-slate-400 text-sm">Messages could not be loaded. Try the refresh button.</p></Card>
      ) : shown.length === 0 ? (
        <Card><p className="text-slate-500 text-sm">{filter === 'new' ? 'No new messages.' : 'No messages yet. Anything sent through the Contact page shows up here.'}</p></Card>
      ) : (
        <ul className="space-y-3">
          {shown.map((m) => (
            <li key={m.id}>
              <Card className={m.read ? '' : 'border-emerald-500/40!'}>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                  <span className="text-sm font-semibold text-white">{m.name}</span>
                  {m.repliedAt ? <Badge color="sky">Replied</Badge> : m.read ? <Badge color="slate">Read</Badge> : <Badge color="emerald">New</Badge>}
                  <span className="ml-auto text-[11px] text-slate-500">{when(m.createdAt)}</span>
                </div>
                <button onClick={() => copyEmail(m.email)} title="Copy email address"
                  className="min-h-0! inline-flex max-w-full items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 cursor-pointer">
                  <span className="truncate">{m.email}</span><Copy size={11} className="shrink-0" aria-hidden="true" />
                </button>
                {m.subject && <p className="mt-2 text-sm font-medium text-slate-200">{m.subject}</p>}
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300 whitespace-pre-wrap break-words">{m.message}</p>
                {m.repliedAt && <p className="mt-2 text-[11px] text-slate-500">Reply started {when(m.repliedAt)}</p>}

                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={replyLink(m)} onClick={() => patch(m.id, { replied: true })}
                    className={`${btn} bg-emerald-500 hover:bg-emerald-400 text-slate-950`}>
                    <Reply size={14} aria-hidden="true" /> Reply by email
                  </a>
                  <button onClick={() => patch(m.id, { read: !m.read }, m.read ? 'Marked as new' : 'Marked as read')} disabled={acting === m.id}
                    className={`${btn} bg-slate-800 hover:bg-slate-700 text-slate-200`}>
                    {m.read ? <Mail size={14} aria-hidden="true" /> : <MailOpen size={14} aria-hidden="true" />}
                    {m.read ? 'Mark as new' : 'Mark as read'}
                  </button>
                  <button onClick={() => remove(m.id)} disabled={acting === m.id}
                    className={`${btn} bg-rose-500/10 hover:bg-rose-500/20 text-rose-400`}>
                    <Trash2 size={14} aria-hidden="true" /> Delete
                  </button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-slate-600">
        “Reply by email” opens your own email app with the reply started, so the answer is sent from your address.
      </p>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

// ── Utility components ────────────────────────────────────────────────────────
export function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-xl ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

export function StatCard({ label, value, sub, icon: Icon, accent = 'emerald' }: {
  label: string; value: string | number; sub?: string; icon: React.ElementType; accent?: 'emerald' | 'amber' | 'sky' | 'violet';
}) {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-400',
    sky: 'bg-sky-500/10 text-sky-400',
    violet: 'bg-violet-500/10 text-violet-400',
  };
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[accent]}`}>
          <Icon size={16} />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-bold text-white text-base">{title}</h2>
      {sub && <p className="text-slate-400 text-xs mt-0.5">{sub}</p>}
    </div>
  );
}

export function Badge({ children, color }: { children: React.ReactNode; color: 'emerald' | 'amber' | 'sky' | 'rose' | 'slate' }) {
  const cls: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    slate: 'bg-slate-800 text-slate-400 border-slate-700',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls[color]}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}

export function formatDate(iso: string) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  catch { return iso; }
}

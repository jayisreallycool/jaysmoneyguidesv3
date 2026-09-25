'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Mail, ShieldCheck, ArrowRight, Loader2, Lock } from 'lucide-react';
import type { Product } from '@/lib/types';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open, trap Escape key
  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, email: trimmed, origin: window.location.origin }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return; // navigation in progress — keep loading state
      }
      setError(data.error || 'Checkout failed. Please try again.');
    } catch {
      setError('Checkout failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const price = product.priceCents > 0
    ? `$${(product.priceCents / 100).toFixed(2)}`
    : null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Checkout: ${product.title}`}
    >
      {/* Panel */}
      <div
        className="relative w-full sm:max-w-md bg-slate-900 border border-slate-700/80 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-slate-800">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-0.5">Secure Checkout</p>
            <h2 className="text-base sm:text-lg font-black text-white leading-snug line-clamp-2">
              {product.title}
            </h2>
            {price && (
              <p className="mt-1 text-2xl font-black text-emerald-400">{price}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-5 pt-5 pb-6 space-y-4" noValidate>
          <div>
            <label htmlFor="checkout-email" className="block text-sm font-semibold text-slate-200 mb-1.5">
              Email address
            </label>
            <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">
              Your download link and receipt will be sent here. Double-check it before continuing.
            </p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" aria-hidden="true" />
              <input
                ref={inputRef}
                id="checkout-email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                disabled={loading}
                className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all disabled:opacity-50 touch-manipulation"
              />
            </div>
            {error && (
              <p className="mt-2 text-xs text-rose-400 font-medium" role="alert">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:opacity-60 text-slate-950 font-black px-5 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer touch-manipulation min-h-[52px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Redirecting to Stripe…
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" aria-hidden="true" />
                Continue to Secure Checkout
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-1">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/60 shrink-0" aria-hidden="true" />
              Stripe-secured payment
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Mail className="w-3.5 h-3.5 text-emerald-500/60 shrink-0" aria-hidden="true" />
              Instant download link
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

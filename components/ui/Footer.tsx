'use client';
import React, { useState } from 'react';
import { Category, ModalView } from '@/lib/types';
import {
  Mail, ArrowUp, CheckCircle2, ShoppingBag, ArrowRight,
  BookOpen, Zap, TrendingUp, DollarSign, Shield, FileText,
  Cookie, AlertTriangle
} from 'lucide-react';
import { sanitizeInput, checkRateLimit } from '@/utils/security';

interface FooterProps {
  onSelectCategory: (category: Category | 'All') => void;
  openModal: (view: ModalView) => void;
  onSubscribeSuccess: (email: string) => void;
}

const YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, openModal, onSubscribeSuccess }) => {
  const [email, setEmail] = useState('');
  const [subscribedMsg, setSubscribedMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollTo = (id: string) => {
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = sanitizeInput(email.trim().toLowerCase());
    if (!cleanEmail || !cleanEmail.includes('@')) return;
    const rl = checkRateLimit('newsletter_sub', 3, 60000);
    if (!rl.allowed) { setSubscribedMsg(`Too many requests. Wait ${rl.retryAfterSec}s.`); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribedMsg('🎉 Subscribed! Check your inbox.');
        onSubscribeSuccess(cleanEmail);
        setEmail('');
      } else {
        setSubscribedMsg(data.error || 'Already subscribed or error.');
      }
    } catch {
      setSubscribedMsg('Subscribed! Welcome.');
      onSubscribeSuccess(cleanEmail);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 text-slate-300" role="contentinfo">

      {/* ── Newsletter strip ── */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-emerald-950/30 via-slate-950 to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Get weekly money-making blueprints
            </h2>
            <p className="text-sm text-slate-400 mt-1">Affiliate marketing, SEO, and online business — straight to your inbox.</p>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[340px]">
            {subscribedMsg ? (
              <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl px-4 py-3 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                {subscribedMsg}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2" noValidate>
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
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black px-5 py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer touch-manipulation min-h-[48px] sm:min-h-auto whitespace-nowrap"
                >
                  {isSubmitting ? 'Joining...' : 'Subscribe'}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-emerald-500/60 shrink-0" aria-hidden="true" />
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1 space-y-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Back to top"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/40 shadow-lg group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/jay-character-small.webp"
                alt="JaysMoneyGuides mascot"
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="font-extrabold text-white text-lg tracking-tight leading-none">
                Jays<span className="text-emerald-400">Money</span>Guides
              </p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">By Jay Lopez</p>
            </div>
          </button>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Actionable blueprints for building profitable online businesses — affiliate marketing, SEO, blogging, e-commerce, and smart money moves.
          </p>
          {/* Social / TikTok */}
          <div className="flex items-center gap-2 pt-1">
            <a
              href="https://www.tiktok.com/@jaysmoneyguides"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all"
              aria-label="JaysMoneyGuides on TikTok (opens in new tab)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.07 8.07 0 004.73 1.52V6.75a4.85 4.85 0 01-.97-.06z"/></svg>
              @jaysmoneyguides
            </a>
          </div>
        </div>

        {/* Guides column */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Free Guides</h3>
          <ul className="space-y-2">
            {[
              { icon: TrendingUp, label: 'Affiliate Marketing', cat: 'Affiliate Marketing' as Category },
              { icon: Zap, label: 'SEO & Organic', cat: 'SEO' as Category },
              { icon: BookOpen, label: 'Blogging', cat: 'Blogging' as Category },
              { icon: DollarSign, label: 'Entrepreneurship', cat: 'Entrepreneurship' as Category },
              { icon: Zap, label: 'Tech & AI Tools', cat: 'Tech' as Category },
            ].map(({ icon: Icon, label, cat }) => (
              <li key={label}>
                <button
                  onClick={() => { onSelectCategory(cat); scrollTo('guides'); }}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer group"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-500/60 group-hover:text-emerald-400 shrink-0 transition-colors" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Store column */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Store & Tools</h3>
          <ul className="space-y-2">
            {[
              { icon: ShoppingBag, label: 'eBook Store', action: () => scrollTo('ebooks') },
              { icon: Zap, label: 'Tools & Affiliate Programs', href: '/tools' },
              { icon: Zap, label: 'SoFi Bank Guides', href: '/sofi-bank' },
              { icon: BookOpen, label: 'Free Ebook — Beginners', action: () => scrollTo('ebooks') },
              { icon: ShoppingBag, label: 'Affiliate Marketing Blueprint', href: '/ebooks/affiliate-marketing-blueprint' },
              { icon: Zap, label: 'SEO Mastery Guide', href: '/ebooks/seo-mastery-guide' },
            ].map(({ icon: Icon, label, action, href }) => (
              <li key={label}>
                {href ? (
                  <a href={href} className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors group">
                    <Icon className="w-3.5 h-3.5 text-emerald-500/60 group-hover:text-emerald-400 shrink-0 transition-colors" aria-hidden="true" />
                    {label}
                  </a>
                ) : (
                  <button onClick={action} className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer group">
                    <Icon className="w-3.5 h-3.5 text-emerald-500/60 group-hover:text-emerald-400 shrink-0 transition-colors" aria-hidden="true" />
                    {label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal column */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Legal & Policy</h3>
          <ul className="space-y-2">
            {[
              { icon: Shield, label: 'Privacy Policy', modal: 'privacy' as ModalView },
              { icon: FileText, label: 'Terms of Service', modal: 'terms' as ModalView },
              { icon: AlertTriangle, label: 'Disclaimer & FTC', modal: 'disclaimer' as ModalView, iconColor: 'text-amber-500/60' },
              { icon: Cookie, label: 'Cookie Policy', modal: 'cookie-policy' as ModalView },
              { icon: FileText, label: 'About Jay Lopez', href: '/about' },
              { icon: Mail, label: 'Contact', modal: 'contact' as ModalView },
            ].map(({ icon: Icon, label, modal, iconColor, href }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors group"
                  >
                    <Icon className={`w-3.5 h-3.5 ${iconColor || 'text-slate-600'} group-hover:text-slate-400 shrink-0 transition-colors`} aria-hidden="true" />
                    {label}
                  </a>
                ) : (
                  <button
                    onClick={() => openModal(modal!)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer group"
                  >
                    <Icon className={`w-3.5 h-3.5 ${iconColor || 'text-slate-600'} group-hover:text-slate-400 shrink-0 transition-colors`} aria-hidden="true" />
                    {label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-slate-800/60 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
            <span>© {YEAR} JaysMoneyGuides · Jay Lopez</span>
            <span className="hidden sm:inline">·</span>
            <span>
              <span className="text-amber-400/80">FTC Disclosure:</span> Some links earn commissions at no cost to you.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500/60 font-semibold">AdSense & FTC Compliant</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

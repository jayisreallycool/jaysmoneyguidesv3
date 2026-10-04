'use client';
import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Mail, DollarSign } from 'lucide-react';
import { subscribeToNewsletter } from '@/lib/newsletter-client';
import { AnimatePresence, motion } from 'motion/react';

interface HeroHeaderProps {
  onSubscribeSuccess: (email: string) => void;
}

const STATS = [
  { num: '$100k+', label: 'Affiliate Sales', green: false },
  { num: '100% Free', label: 'In-Depth Guides', green: true },
  { num: '6 Topics', label: 'All Categories', green: false },
  { num: '57', label: 'Free Guides', green: true },
];

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onSubscribeSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState('');
  const [subscribeError, setSubscribeError] = useState('');
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Parallax fallback. Modern browsers run the hero parallax as a CSS
  // scroll-driven animation (globals.css). Where that isn't supported —
  // notably iPhones before iOS 26 — drive the same effect from scroll
  // position: one passive listener, one style write per frame.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || (typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()'))) return;

    el.classList.add('hero-js');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setStrength = () => el.style.setProperty('--hero-k', reduce.matches ? '0.45' : '1');
    setStrength();
    reduce.addEventListener?.('change', setStrength);

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      const clamp = (n: number) => Math.min(1, Math.max(0, n));
      el.style.setProperty('--hero-p', clamp(y / vh).toFixed(4));
      // content starts lifting at 38% of a screen, done at 95% (not with Reduce Motion)
      el.style.setProperty('--hero-c', reduce.matches ? '0' : clamp((y - vh * 0.38) / (vh * 0.57)).toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduce.removeEventListener?.('change', setStrength);
      if (raf) cancelAnimationFrame(raf);
      el.classList.remove('hero-js');
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubscribeError('');
    setIsSubmitting(true);
    const r = await subscribeToNewsletter(email, 'hero');
    setIsSubmitting(false);
    if (r.ok) {
      setSubscribedMsg(r.message);
      onSubscribeSuccess(email.trim().toLowerCase());
      setEmail('');
    } else {
      setSubscribeError(r.message);
    }
  };

  return (
    <div ref={heroRef} className="relative w-full min-h-[85svh] sm:min-h-[82svh] lg:min-h-[88svh] flex flex-col justify-center items-center text-center text-white py-10 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8 border-b border-emerald-500/25 overflow-hidden bg-slate-950">

      {/* ── Hero background: translucent image with CSS scroll-driven parallax
          (see .hero-bg in globals.css). Loaded eagerly at high priority for LCP. ── */}
      <div className="hero-bg z-0" aria-hidden="true">
        <picture>
          {/* One fixed file per breakpoint. A srcset with width descriptors made
              3x phones download the full 1536px file (381 KB); behind a
              translucent overlay the 800px file (110 KB) looks the same. */}
          <source media="(max-width: 640px)" srcSet="/jay-affiliate-marketing-guides-hero-800.webp" type="image/webp" />
          <source media="(max-width: 1280px)" srcSet="/jay-affiliate-marketing-guides-hero-1200.webp" type="image/webp" />
        <img
          src="/jay-affiliate-marketing-guides-hero.webp"
          alt="JaysMoneyGuides by Jay Lopez — Affiliate Marketing Guides, Headless Shopify Stores, SaaS Solutions, Blogger and WordPress tutorials"
          width={1536}
          height={1024}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        </picture>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/25 to-slate-950 z-[1]" aria-hidden="true" />
      {/* Soft dark pool behind the headline for contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_42%,rgba(2,6,23,0.55),transparent_75%)] z-[1]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_70%)] z-[1]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_90%)] z-[2]" aria-hidden="true" />

      {/* Ambient orbs — hidden on mobile for perf */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[560px] h-[280px] bg-emerald-400/15 rounded-full blur-[100px] animate-hero-glow-emerald z-[2] hidden sm:block" aria-hidden="true" />
      <div className="absolute bottom-10 right-4 w-[400px] h-[400px] bg-teal-400/18 rounded-full blur-[120px] animate-hero-glow-teal z-[2] hidden md:block" aria-hidden="true" />

      {/* Floating icons — desktop only */}
      <div className="absolute top-14 left-[8%] text-emerald-300/35 hidden sm:block animate-hero-float z-[3]" aria-hidden="true">
        <Sparkles className="w-8 h-8 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
      </div>
      <div className="absolute top-1/4 right-[10%] text-emerald-300/30 hidden md:block animate-hero-float z-[3]" style={{ animationDelay: '2s' }} aria-hidden="true">
        <DollarSign className="w-9 h-9 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
      </div>

      {/* Content */}
      <div className="hero-content max-w-5xl mx-auto text-center relative z-10 w-full">

        {/* Founder pill */}
        <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-emerald-400/40 rounded-full px-4 py-1.5 text-xs text-slate-100 mb-6 shadow-xl backdrop-blur-xl animate-fadeIn">
          <span className="font-black text-emerald-400 tracking-wider uppercase text-[11px]">JaysMoneyGuides</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-200 font-medium">By Jay Lopez · Online Business Strategist</span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] max-w-4xl mx-auto drop-shadow-2xl animate-fadeIn">
          Actionable Blueprints for{' '}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(52,211,153,0.5)]">
            Profitable Online Businesses
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-md animate-fadeIn">
          Master high-ticket affiliate marketing, organic search intent, high-ROI blogging strategies, and modern online revenue engines.
        </p>

        {/* Newsletter form */}
        <div className="mt-6 sm:mt-7 w-full max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {subscribedMsg ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 rounded-xl p-4 text-sm font-semibold flex items-center justify-center gap-2.5 backdrop-blur-xl shadow-xl"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>{subscribedMsg}</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubscribe}
                className="flex flex-col gap-3 sm:gap-2.5"
                noValidate
              >
                <div className="relative flex-1">
                  <label htmlFor="hero-email-input" className="sr-only">Email address</label>
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
                  <input
                    id="hero-email-input"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700/90 focus:border-emerald-400 rounded-xl pl-10 pr-4 py-3.5 sm:py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 backdrop-blur-xl shadow-xl transition-all touch-manipulation"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 text-slate-950 font-black px-6 py-3.5 sm:py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-xl shadow-emerald-500/25 disabled:opacity-50 cursor-pointer touch-manipulation min-h-[48px] sm:min-h-auto"
                >
                  {isSubmitting ? 'Joining...' : 'Get Free Guides'}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {subscribeError && (
            <p role="alert" className="mt-2.5 rounded-lg bg-slate-950/70 px-3 py-2 text-sm font-semibold text-rose-300">{subscribeError}</p>
          )}
          <p className="text-[11px] text-slate-300/80 mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>No spam ever. <a href="/unsubscribe" className="underline underline-offset-2 hover:text-white">Unsubscribe</a> anytime.</span>
          </p>

          {/* Secondary CTAs */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <a
              href="#guides"
              className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 min-h-[44px] px-2 underline underline-offset-4 decoration-emerald-500/40"
            >
              Browse guides
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <a
              href="#ebooks"
              className="text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 min-h-[44px] px-2"
            >
              Free eBooks
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-center max-w-4xl mx-auto">
          {STATS.map(({ num, label, green }) => (
            <div key={label} className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-2.5 sm:p-4 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5">
              <p className={`text-lg sm:text-2xl font-black ${green ? 'text-emerald-400' : 'text-white'}`}>{num}</p>
              <p className="text-xs text-slate-300 font-medium mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

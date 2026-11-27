// ─────────────────────────────────────────────────────────────────────────────
// AffiliateRecruitingSection.tsx — "Affiliate Program" homepage section
// ─────────────────────────────────────────────────────────────────────────────
// Recruiting page (full program details + catalog earnings table):
// https://muse.ai/s/gumroad-affiliate-recruiting-if6gxcxcsxgfxcxm/xqdXVbgGCZf0ZKhouQQ6ev6-3UOhXW-GaVapkk9_yHI
// Direct signup (Gumroad's own affiliate request page):
// https://jaysmoneyguides.gumroad.com/affiliates
// If either URL ever moves, update the two constants below and nothing else.
//
// Modelled on GuideVaultSection.tsx / ToolsHomepageSection.tsx: dark
// slate-900 cards on slate-950, emerald accents, lucide-react icons.
// No client state — plain server component, no 'use client' needed.
// Rendered in components/client/HomeClient.tsx right after the Guide
// Vault section.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';
import {
  TrendingUp,
  ChevronRight,
  ArrowRight,
  DollarSign,
  Wallet,
  MousePointerClick,
} from 'lucide-react';

const RECRUITING_URL =
  'https://muse.ai/s/gumroad-affiliate-recruiting-if6gxcxcsxgfxcxm/xqdXVbgGCZf0ZKhouQQ6ev6-3UOhXW-GaVapkk9_yHI';
const SIGNUP_URL = 'https://jaysmoneyguides.gumroad.com/affiliates';

const EARNING_EXAMPLES = [
  { label: '$14.99 guide', earns: '$6.00' },
  { label: '$12.99 playbook', earns: '$5.20' },
  { label: '$9.99 guide', earns: '$4.00' },
  { label: 'Game Promo Pack ($19)', earns: '$5.70' },
];

export function AffiliateRecruitingSection() {
  return (
    <section id="affiliate-program" aria-label="Affiliate program — earn commissions promoting our guides" className="scroll-mt-24">
      {/* Section header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/25 border border-emerald-400/40"
            aria-hidden="true"
          >
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-white tracking-tight">
                Affiliate Program
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Earn 40%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Promote the guides. Keep the commission.</p>
          </div>
        </div>
        <Link
          href={RECRUITING_URL}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          aria-label="See the full affiliate program details"
        >
          See the full program <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Headline + copy */}
      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight max-w-2xl">
        Promote practical guides. Keep 40%.
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mt-3 mb-5">
        Recommend any of the 11 JaysMoneyGuides ebooks on Gumroad and keep{' '}
        <strong className="text-slate-200">40% of every sale</strong> — that is $6.00 to you on each
        $14.99 guide. The 30-Day Game Promo Pack pays{' '}
        <strong className="text-slate-200">30%</strong> ($5.70 per sale). No product to create, no
        inventory, no support to handle: Gumroad tracks every sale through your link and pays you
        directly, every other Friday, once you reach a $10 minimum.
      </p>

      {/* Per-sale earnings strip */}
      <div className="flex flex-wrap gap-2 mb-6">
        {EARNING_EXAMPLES.map((ex) => (
          <span
            key={ex.label}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            {ex.label} → <span className="text-emerald-400">{ex.earns} to you</span>
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
          <Wallet className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          Paid by Gumroad directly
        </span>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Link
          href={SIGNUP_URL}
          className="flex items-center justify-center gap-2 w-full sm:w-auto sm:inline-flex px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 touch-manipulation"
          aria-label="Join the affiliate program free on Gumroad"
        >
          <MousePointerClick className="w-4 h-4" aria-hidden="true" />
          Join free on Gumroad
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <Link
          href={RECRUITING_URL}
          className="flex items-center justify-center gap-2 w-full sm:w-auto sm:inline-flex px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-black text-sm transition-all border border-slate-700 hover:border-emerald-500/40 touch-manipulation"
          aria-label="See the full affiliate program — catalog and earnings"
        >
          See the full program
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
      <p className="text-[11px] text-slate-500 mt-3 text-center sm:text-left">
        Free to join — request access on Gumroad, grab your links, and promote with disclosure.
      </p>
    </section>
  );
}

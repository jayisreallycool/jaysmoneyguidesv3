'use client';
import React, { useState, useMemo } from 'react';
import {
  ExternalLink, Check, DollarSign, TrendingUp, ChevronRight, Zap
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  commission: string;
  payout: string;
  category: string;
  link: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
}

// Same data as ToolsContent — first 4 shown, load more by 5
const TOOLS: Tool[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'All-in-one e-commerce platform for dropshipping and online stores',
    commission: '$200–500+ per signup',
    payout: 'Recurring commission',
    category: 'E-Commerce',
    link: 'https://www.shopify.com/?ref=jaysmoneyguides',
    features: ['Easy setup', 'Dropshipping ready', 'Payment processing', 'Marketing tools'],
    badge: 'HIGH TICKET',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    id: 'semrush',
    name: 'SEMrush',
    description: 'Complete SEO toolkit for keyword research and competitor analysis',
    commission: '$200–400 per signup',
    payout: 'Recurring monthly',
    category: 'SEO Tools',
    link: 'https://www.semrush.com/?ref=jaysmoneyguides',
    features: ['Keyword research', 'Competitor analysis', 'Rank tracking', 'SEO audit'],
    badge: 'HIGH TICKET',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    description: 'Email marketing platform built for creators and writers',
    commission: '$0.30 per day per referral',
    payout: 'Recurring daily',
    category: 'Email Marketing',
    link: 'https://convertkit.com?ref=jaysmoneyguides',
    features: ['Creator-friendly', 'Beautiful templates', 'Automation', 'Subscriber growth'],
    badge: 'RECURRING',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'kinsta',
    name: 'Kinsta',
    description: 'Premium managed WordPress hosting for professional sites',
    commission: '$100–150 per referral',
    payout: 'Recurring annually',
    category: 'Web Hosting',
    link: 'https://kinsta.com/?ref=jaysmoneyguides',
    features: ['Premium performance', 'Enterprise support', 'Staging sites', 'Advanced security'],
    badge: 'PREMIUM',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'bluehost',
    name: 'Bluehost',
    description: 'Beginner-friendly WordPress hosting platform',
    commission: '$65–75 per sale',
    payout: 'First purchase only',
    category: 'Web Hosting',
    link: 'https://www.bluehost.com/wordpress/hosting/?ref=jaysmoneyguides',
    features: ['WordPress optimized', 'SSL included', 'Free domain', '24/7 support'],
    badge: 'POPULAR',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    description: 'Backlink analysis and SEO research tool',
    commission: '$7–12 per $100/month plan',
    payout: 'Recurring monthly',
    category: 'SEO Tools',
    link: 'https://ahrefs.com/?ref=jaysmoneyguides',
    features: ['Backlink analysis', 'Site explorer', 'Keyword planner', 'Content ideas'],
  },
  {
    id: 'siteground',
    name: 'SiteGround',
    description: 'Premium WordPress and cloud hosting with excellent support',
    commission: '$40–80 per signup',
    payout: 'Recurring monthly',
    category: 'Web Hosting',
    link: 'https://www.siteground.com/?ref=jaysmoneyguides',
    features: ['Fast performance', 'Expert support', 'Free SSL', 'Auto backups'],
  },
  {
    id: 'getresponse',
    name: 'GetResponse',
    description: 'All-in-one email marketing and automation platform',
    commission: '$0.30–$1/day per referral',
    payout: 'Recurring daily',
    category: 'Email Marketing',
    link: 'https://www.getresponse.com/?ref=jaysmoneyguides',
    features: ['Email campaigns', 'Webinar hosting', 'Automation', 'CRM integration'],
    badge: 'RECURRING',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'webflow',
    name: 'Webflow',
    description: 'Visual web design platform for professional websites',
    commission: '30% recurring for 12 months',
    payout: 'Recurring monthly',
    category: 'Web Design',
    link: 'https://webflow.com/?ref=jaysmoneyguides',
    features: ['No-code design', 'CMS included', 'Fast hosting', 'SEO tools'],
    badge: 'RECURRING',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
];

const INITIAL = 4;
const STEP = 5;

export function ToolsHomepageSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL);

  const visible = useMemo(() => TOOLS.slice(0, visibleCount), [visibleCount]);
  const hasMore = visibleCount < TOOLS.length;
  const remaining = TOOLS.length - visibleCount;

  return (
    <section id="tools" aria-label="Recommended affiliate programs and tools" className="scroll-mt-24">
      {/* Section header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/25 border border-teal-400/40" aria-hidden="true">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-white tracking-tight">
                Tools & Affiliate Programs
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {TOOLS.length}+ Programs
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Curated programs I personally use and recommend</p>
          </div>
        </div>
        <a
          href="/tools"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          aria-label="View all affiliate programs"
        >
          View all <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map((tool) => (
          <div
            key={tool.id}
            className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/8 flex flex-col gap-3"
          >
            {/* Badge */}
            {tool.badge && (
              <span className={`absolute -top-2.5 -right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${tool.badgeColor}`}>
                {tool.badge}
              </span>
            )}

            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  {tool.name}
                </h3>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tool.description}</p>
            </div>

            {/* Commission info */}
            <div className="flex gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 flex-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-slate-500">Commission</p>
                  <p className="text-xs font-bold text-emerald-400">{tool.commission}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-1">
                <TrendingUp className="w-3.5 h-3.5 text-teal-400 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-slate-500">Payout</p>
                  <p className="text-xs font-bold text-teal-400">{tool.payout}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
              {tool.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all touch-manipulation"
              aria-label={`Get started with ${tool.name} (opens in new tab)`}
            >
              Get Started <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + STEP, TOOLS.length))}
            className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20 cursor-pointer touch-manipulation"
          >
            Load {Math.min(STEP, remaining)} more
          </button>
          <button
            onClick={() => setVisibleCount(TOOLS.length)}
            className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-slate-800 text-slate-100 font-bold text-sm hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer touch-manipulation"
          >
            Load all ({TOOLS.length})
          </button>
        </div>
      )}

      <a
        href="/tools"
        className="sm:hidden mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
        aria-label="View all affiliate programs"
      >
        View all {TOOLS.length}+ programs <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
      </a>
    </section>
  );
}

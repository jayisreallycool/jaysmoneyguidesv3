'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Globe,
  Mail,
  ShoppingCart,
  BarChart3,
  Zap,
  Palette,
  CreditCard,
  Brain,
  Users,
  BookOpen,
  Hammer,
  ExternalLink,
  Check,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Heart,
  RefreshCw,
  Filter,
  Star,
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

const TOOLS_DATA: Tool[] = [
  // Web Hosting & Domains
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'All-in-one e-commerce platform for dropshipping and online stores',
    commission: '$200-500+ per signup',
    payout: 'Recurring commission',
    category: 'Web Hosting & E-Commerce',
    link: 'https://www.shopify.com/',
    features: ['Easy setup', 'Dropshipping ready', 'Payment processing', 'Marketing tools'],
    badge: 'HIGH TICKET',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  {
    id: 'bluehost',
    name: 'Bluehost',
    description: 'Beginner-friendly WordPress hosting platform',
    commission: '$65-75 per sale',
    payout: 'First purchase only',
    category: 'Web Hosting & E-Commerce',
    link: 'https://www.bluehost.com/wordpress/hosting/',
    features: ['WordPress optimized', 'SSL included', 'Free domain', '24/7 support'],
    badge: 'POPULAR',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    id: 'siteground',
    name: 'SiteGround',
    description: 'Premium WordPress and cloud hosting with excellent support',
    commission: '$40-80 per signup',
    payout: 'Recurring monthly',
    category: 'Web Hosting & E-Commerce',
    link: 'https://www.siteground.com/',
    features: ['Fast performance', 'Expert support', 'Free SSL', 'Auto backups'],
  },
  {
    id: 'kinsta',
    name: 'Kinsta',
    description: 'Premium managed WordPress hosting for professional sites',
    commission: '$100-150 per referral',
    payout: 'Recurring annually',
    category: 'Web Hosting & E-Commerce',
    link: 'https://kinsta.com/',
    features: ['Premium performance', 'Enterprise support', 'Staging sites', 'Advanced security'],
  },
  {
    id: 'namecheap',
    name: 'Namecheap',
    description: 'Affordable domain registration and web hosting',
    commission: '$0.95-$1.35 per domain',
    payout: 'Per sale',
    category: 'Web Hosting & E-Commerce',
    link: 'https://www.namecheap.com/',
    features: ['Cheap domains', 'Whois privacy', 'Free email', 'SSL certificates'],
  },

  // Email Marketing
  {
    id: 'convertkit',
    name: 'ConvertKit',
    description: 'Email marketing platform built for creators and writers',
    commission: '$0.30 per day per referral',
    payout: 'Recurring daily',
    category: 'Email Marketing',
    link: 'https://convertkit.com',
    features: ['Creator-friendly', 'Beautiful templates', 'Automation', 'Subscriber growth'],
    badge: 'RECURRING',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'getresponse',
    name: 'GetResponse',
    description: 'All-in-one email marketing and automation platform',
    commission: '$0.30-$1/day per referral',
    payout: 'Recurring daily',
    category: 'Email Marketing',
    link: 'https://www.getresponse.com/',
    features: ['Email campaigns', 'Webinar hosting', 'Automation', 'CRM integration'],
  },
  {
    id: 'activecampaign',
    name: 'ActiveCampaign',
    description: 'Advanced CRM with email marketing and automation',
    commission: '30% commission or flat rate',
    payout: 'Recurring commission',
    category: 'Email Marketing',
    link: 'https://www.activecampaign.com/',
    features: ['CRM + email', 'Advanced automation', 'Sales pipeline', 'Deal tracking'],
  },

  // SEO Tools
  {
    id: 'semrush',
    name: 'SEMrush',
    description: 'Complete SEO toolkit for keyword research and competitor analysis',
    commission: '$200-400 per signup',
    payout: 'Recurring monthly',
    category: 'Analytics & SEO Tools',
    link: 'https://www.semrush.com/',
    features: ['Keyword research', 'Competitor analysis', 'Rank tracking', 'SEO audit'],
    badge: 'HIGH TICKET',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    description: 'Backlink analysis and SEO research tool',
    commission: '$7-12 per $100/month plan',
    payout: 'Recurring monthly',
    category: 'Analytics & SEO Tools',
    link: 'https://ahrefs.com/',
    features: ['Backlink analysis', 'Site explorer', 'Keyword planner', 'Content ideas'],
  },
  {
    id: 'moz',
    name: 'Moz Pro',
    description: 'SEO software for keyword research and rank tracking',
    commission: '$100-200 per signup',
    payout: 'Recurring monthly',
    category: 'Analytics & SEO Tools',
    link: 'https://moz.com/products/pro',
    features: ['Rank tracking', 'Keyword research', 'Site audits', 'Link research'],
  },
  {
    id: 'surferseo',
    name: 'SurferSEO',
    description: 'Content optimization tool for better rankings',
    commission: '$200+ per annual signup',
    payout: 'Recurring annually',
    category: 'Analytics & SEO Tools',
    link: 'https://surferseo.com/',
    features: ['Content editor', 'SERP analysis', 'Rank tracking', 'Audit tool'],
  },

  // E-Commerce Platforms
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    description: 'Open-source e-commerce plugin for WordPress',
    commission: '$100-300 per sale',
    payout: 'One-time commission',
    category: 'Web Hosting & E-Commerce',
    link: 'https://woocommerce.com/',
    features: ['WordPress integration', 'Free + premium', 'Flexible products', 'Payment gateways'],
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    description: 'Enterprise-grade e-commerce platform',
    commission: '$150-250 per signup',
    payout: 'Recurring commission',
    category: 'Web Hosting & E-Commerce',
    link: 'https://www.bigcommerce.com/',
    features: ['Scalable', 'Multi-channel', 'Advanced analytics', 'API access'],
  },

  // AI Tools
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI-powered copywriting tool for content creation',
    commission: '30% lifetime value',
    payout: 'Recurring subscription',
    category: 'AI & Automation Tools',
    link: 'https://www.copy.ai/',
    features: ['AI copywriting', '100+ templates', 'Bulk content', 'SEO optimization'],
    badge: 'AI POWERED',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: 'Advanced AI content writer for long-form and short-form content',
    commission: '30% lifetime value',
    payout: 'Recurring subscription',
    category: 'AI & Automation Tools',
    link: 'https://www.jasper.ai/',
    features: ['AI writing', 'Brand voice', 'Content templates', 'Plagiarism checker'],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automation platform connecting 1000+ apps',
    commission: '30% revenue share',
    payout: 'Recurring commission',
    category: 'AI & Automation Tools',
    link: 'https://zapier.com/',
    features: ['App integration', 'Automation', 'No-code', 'Workflows'],
  },

  // Web Design Tools
  {
    id: 'elementor',
    name: 'Elementor',
    description: 'WordPress page builder for professional websites',
    commission: '$150+ per signup',
    payout: 'Recurring annual',
    category: 'Web Design & No-Code',
    link: 'https://elementor.com/',
    features: ['Drag & drop', 'Responsive', '100+ widgets', 'Template library'],
  },
  {
    id: 'webflow',
    name: 'Webflow',
    description: 'Visual web development platform without code',
    commission: '30% lifetime value',
    payout: 'Recurring subscription',
    category: 'Web Design & No-Code',
    link: 'https://webflow.com/',
    features: ['Visual builder', 'Hosting included', 'CMS', 'E-commerce'],
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Collaborative design tool for UI/UX designers',
    commission: '$25-100 per signup',
    payout: 'Recurring monthly',
    category: 'Web Design & No-Code',
    link: 'https://figma.com/',
    features: ['Design collaboration', 'Prototyping', 'Component library', 'Version history'],
  },

  // Project Management
  {
    id: 'monday',
    name: 'Monday.com',
    description: 'Work OS for project and team management',
    commission: '30% lifetime value',
    payout: 'Recurring subscription',
    category: 'Productivity & Management',
    link: 'https://monday.com/',
    features: ['Project tracking', 'Team collaboration', 'Automation', 'Integrations'],
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Project management tool for teams and organizations',
    commission: '20-30% commission',
    payout: 'Recurring subscription',
    category: 'Productivity & Management',
    link: 'https://asana.com/',
    features: ['Task management', 'Timeline view', 'Portfolio tracking', 'Automation'],
  },

  // Affiliate Networks
  {
    id: 'cjaffiliate',
    name: 'CJ Affiliate',
    description: 'Global affiliate network with 3000+ brands',
    commission: 'Varies by brand',
    payout: 'Monthly',
    category: 'Affiliate Networks',
    link: 'https://www.cj.com/brands',
    features: ['1000s of brands', 'Real-time tracking', 'Competitive commissions', 'Support'],
    badge: 'GATEWAY',
    badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
  },
  {
    id: 'impact',
    name: 'Impact',
    description: 'Performance marketing network for SaaS and tech',
    commission: 'Varies by brand',
    payout: 'Monthly',
    category: 'Affiliate Networks',
    link: 'https://www.impact.com/',
    features: ['500+ SaaS brands', 'High commissions', 'Real-time dashboard', 'Support'],
  },
  {
    id: 'partnerstack',
    name: 'PartnerStack',
    description: 'Modern affiliate platform for SaaS partnerships',
    commission: 'Varies by partner',
    payout: 'Weekly/Monthly',
    category: 'Affiliate Networks',
    link: 'https://www.partnerstack.com/',
    features: ['Curated partners', 'Higher commissions', 'Easy tracking', 'Support'],
  },
];

const CATEGORIES = [
  'All Programs',
  'Web Hosting & E-Commerce',
  'Email Marketing',
  'Analytics & SEO Tools',
  'AI & Automation Tools',
  'Web Design & No-Code',
  'Productivity & Management',
  'Affiliate Networks',
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Web Hosting & E-Commerce': ShoppingCart,
  'Email Marketing': Mail,
  'Analytics & SEO Tools': BarChart3,
  'AI & Automation Tools': Brain,
  'Web Design & No-Code': Palette,
  'Productivity & Management': Hammer,
  'Affiliate Networks': Globe,
};

export function ToolsContent() {
  const [selectedCategory, setSelectedCategory] = useState('All Programs');

  const filteredTools = useMemo(() =>
    selectedCategory === 'All Programs'
      ? TOOLS_DATA
      : TOOLS_DATA.filter((t) => t.category === selectedCategory),
    [selectedCategory]
  );

  const highTicketCount = TOOLS_DATA.filter((t) => t.badge === 'HIGH TICKET').length;
  const recurringCount = TOOLS_DATA.filter((t) => t.badge === 'RECURRING').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Heart className="w-3 h-3" aria-hidden="true" />
            Personally Recommended
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
          Tools &amp; Affiliate Programs
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
          {TOOLS_DATA.length} affiliate programs and tools for online businesses, with how each one pays. Commission rates are set by each program and change — confirm the current terms on the program's own page before you rely on them.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { icon: Star,       label: `${TOOLS_DATA.length} Programs`,     color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
            { icon: TrendingUp, label: `${highTicketCount} High-Ticket`,    color: 'text-amber-400  bg-amber-500/10  border-amber-500/20' },
            { icon: RefreshCw,  label: `${recurringCount} Recurring`,       color: 'text-sky-400    bg-sky-500/10    border-sky-500/20' },
          ].map(({ icon: Icon, label, color }) => (
            <span key={label} className={`inline-flex items-center gap-1.5 text-xs font-bold border rounded-full px-3 py-1 ${color}`}>
              <Icon className="w-3 h-3" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        {/* FTC Disclosure */}
        <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-200/80 flex items-start gap-2">
          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong className="text-amber-300">FTC Disclosure:</strong> Some links are affiliate links — I earn a small commission at no extra cost to you. I only list programs I&apos;d genuinely recommend.
          </span>
        </div>
      </section>

      {/* ── Category filter ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Filter by category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat === 'All Programs' ? Zap : (CATEGORY_ICONS[cat] ?? Globe);
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  active
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                <Icon className="w-3 h-3" aria-hidden="true" />
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Tools grid ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-semibold">No programs in this category yet.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500 mb-5 font-medium">
              {filteredTools.length} program{filteredTools.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All Programs' ? ` in ${selectedCategory}` : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative flex flex-col bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:shadow-emerald-500/5"
                >
                  {/* Badge */}
                  {tool.badge && (
                    <span className={`absolute top-4 right-4 text-[10px] font-black px-2 py-0.5 rounded-full border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-4 pr-16">
                      <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{tool.description}</p>
                    </div>

                    {/* Commission row */}
                    <div className="flex gap-3 mb-4 bg-slate-800/50 rounded-xl p-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Commission</p>
                        <p className="text-xs font-bold text-emerald-400 truncate">{tool.commission}</p>
                      </div>
                      <div className="w-px bg-slate-700 shrink-0" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Payout</p>
                        <p className="text-xs font-bold text-teal-400 truncate">{tool.payout}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-1.5 mb-5 flex-1">
                      {tool.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm py-2.5 rounded-xl transition-colors"
                    >
                      Get Started
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-white mb-1">Want in-depth guides on these tools?</h2>
            <p className="text-sm text-slate-400">I&apos;ve written step-by-step tutorials for the most popular programs above.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/category/Affiliate%20Marketing"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Browse Affiliate Guides
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Free eBooks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

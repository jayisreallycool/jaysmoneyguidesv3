import { ConsentLinks } from '@/components/client/ConsentBanner';
import Link from 'next/link';
import {
  Mail, ArrowUp, TrendingUp, Zap, BookOpen, DollarSign,
  ShoppingBag, Shield, FileText, AlertTriangle, Cookie, User,
  Gift, Star, BookMarked,
} from 'lucide-react';
import { FooterNewsletter } from '@/components/client/FooterNewsletter';

const YEAR = new Date().getFullYear();

const STATS = [
  { value: '57', label: 'Free Guides', icon: BookMarked },
  { value: '5',   label: 'eBooks',      icon: BookOpen },
  { value: '25', label: 'Programs Covered', icon: Star },
  { value: '100%', label: 'Free to Read', icon: Gift },
];

const GUIDE_LINKS = [
  { label: 'Affiliate Marketing', href: '/category/Affiliate%20Marketing', icon: TrendingUp },
  { label: 'SEO & Organic',       href: '/category/SEO',                   icon: Zap },
  { label: 'Blogging',            href: '/category/Blogging',              icon: BookOpen },
  { label: 'Entrepreneurship',    href: '/category/Entrepreneurship',      icon: DollarSign },
  { label: 'Tech & AI Tools',     href: '/category/Tech',                  icon: Zap },
  { label: 'SoFi Bank Guides',    href: '/sofi-bank',                      icon: DollarSign },
];

const STORE_LINKS = [
  { label: 'eBook Store',                       href: '/#ebooks',                                     icon: ShoppingBag },
  { label: 'Tools & Affiliate Programs',         href: '/tools',                                       icon: Zap },
  { label: 'Free Beginner Ebook',               href: '/ebooks/affiliate-marketing-beginners',        icon: BookOpen },
  { label: 'Affiliate Marketing Blueprint',      href: '/ebooks/affiliate-marketing-blueprint',       icon: BookOpen },
  { label: 'SEO Mastery Guide',                  href: '/ebooks/seo-mastery-guide',                   icon: BookOpen },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',      href: '/privacy',       icon: Shield,        iconColor: 'text-blue-500/60' },
  { label: 'Terms of Service',    href: '/terms',         icon: FileText,      iconColor: 'text-slate-500/60' },
  { label: 'Disclaimer & FTC',   href: '/disclaimer',    icon: AlertTriangle, iconColor: 'text-amber-500/60' },
  { label: 'Cookie Policy',       href: '/cookie-policy', icon: Cookie,        iconColor: 'text-violet-500/60' },
  { label: 'About Jay Lopez',     href: '/about',         icon: User,          iconColor: 'text-slate-500/60' },
  { label: 'Contact',             href: '/contact',       icon: Mail,          iconColor: 'text-emerald-500/60' },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 text-slate-300" role="contentinfo">

      {/* ── Stats strip ── */}
      <div className="bg-slate-900/60 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-base font-black text-white leading-none">{value}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Newsletter strip ── */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-emerald-950/30 via-slate-950 to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Get new guides by email
            </h2>
            <p className="text-sm text-slate-400 mt-1">Affiliate marketing, SEO, and online business — straight to your inbox.</p>
          </div>
          <FooterNewsletter />
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

        {/* Brand column */}
        <div className="col-span-2 lg:col-span-1 space-y-4">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/40 shadow-lg group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/jay-character-small.webp"
                alt="JaysMoneyGuides"
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
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Actionable blueprints for building profitable online businesses — affiliate marketing, SEO, blogging, and smart money moves.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="https://www.tiktok.com/@jaysmoneyguides"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all"
              aria-label="JaysMoneyGuides on TikTok (opens in new tab)"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.07 8.07 0 004.73 1.52V6.75a4.85 4.85 0 01-.97-.06z"/>
              </svg>
              TikTok
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Contact
            </a>
          </div>

          {/* Free ebook promo */}
          <Link
            href="/ebooks/affiliate-marketing-beginners"
            className="group flex items-start gap-3 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl p-3 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <Gift className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider leading-none mb-0.5">Free Download</p>
              <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">Affiliate Marketing Beginner&rsquo;s Guide PDF</p>
            </div>
          </Link>
        </div>

        {/* Guides column */}
        <nav aria-label="Guide categories">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-3">Free Guides</h3>
          <ul className="space-y-2">
            {GUIDE_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors group"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-500/50 group-hover:text-emerald-400 shrink-0 transition-colors" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Store column */}
        <nav aria-label="Store and tools">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">Store & Tools</h3>
          <ul className="space-y-2">
            {STORE_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors group"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-500/50 group-hover:text-emerald-400 shrink-0 transition-colors" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal column */}
        <nav aria-label="Legal and policies">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-3">Legal & Policy</h3>
          <ul className="space-y-2">
            {LEGAL_LINKS.map(({ label, href, icon: Icon, iconColor }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors group"
                >
                  <Icon className={`w-3.5 h-3.5 ${iconColor} group-hover:text-slate-400 shrink-0 transition-colors`} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── Privacy choices: always one tap away, on every page ── */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-400 text-center sm:text-left">
          <ConsentLinks />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
            <span>© {YEAR} JaysMoneyGuides · Jay Lopez</span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span>
              <span className="text-amber-400/70">FTC Disclosure:</span>{' '}
              Some links earn commissions at no cost to you.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

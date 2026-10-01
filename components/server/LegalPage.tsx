import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, FileText } from 'lucide-react';

interface LegalPageProps {
  title: string;
  updated?: string;
  icon?: React.ReactNode;
  accentColor?: 'emerald' | 'blue' | 'amber' | 'violet' | 'slate';
  children: React.ReactNode;
}

const ACCENT = {
  emerald: {
    badge: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
    dot:   'bg-emerald-400',
    h2:    'text-emerald-300',
    rule:  'border-emerald-500/15',
    link:  '[&_a]:text-emerald-400 [&_a]:decoration-emerald-400/40 hover:[&_a]:text-emerald-300 hover:[&_a]:decoration-emerald-300',
    marker:'[&_li]:marker:text-emerald-400',
    back:  'text-emerald-400 hover:text-emerald-300',
  },
  blue: {
    badge: 'bg-sky-500/10 border-sky-500/25 text-sky-400',
    dot:   'bg-sky-400',
    h2:    'text-sky-300',
    rule:  'border-sky-500/15',
    link:  '[&_a]:text-sky-400 [&_a]:decoration-sky-400/40 hover:[&_a]:text-sky-300 hover:[&_a]:decoration-sky-300',
    marker:'[&_li]:marker:text-sky-400',
    back:  'text-sky-400 hover:text-sky-300',
  },
  amber: {
    badge: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
    dot:   'bg-amber-400',
    h2:    'text-amber-300',
    rule:  'border-amber-500/15',
    link:  '[&_a]:text-amber-400 [&_a]:decoration-amber-400/40 hover:[&_a]:text-amber-300 hover:[&_a]:decoration-amber-300',
    marker:'[&_li]:marker:text-amber-400',
    back:  'text-amber-400 hover:text-amber-300',
  },
  violet: {
    badge: 'bg-violet-500/10 border-violet-500/25 text-violet-400',
    dot:   'bg-violet-400',
    h2:    'text-violet-300',
    rule:  'border-violet-500/15',
    link:  '[&_a]:text-violet-400 [&_a]:decoration-violet-400/40 hover:[&_a]:text-violet-300 hover:[&_a]:decoration-violet-300',
    marker:'[&_li]:marker:text-violet-400',
    back:  'text-violet-400 hover:text-violet-300',
  },
  slate: {
    badge: 'bg-slate-700/60 border-slate-600/40 text-slate-300',
    dot:   'bg-slate-400',
    h2:    'text-slate-200',
    rule:  'border-slate-700/50',
    link:  '[&_a]:text-slate-300 [&_a]:decoration-slate-400/40 hover:[&_a]:text-white hover:[&_a]:decoration-slate-300',
    marker:'[&_li]:marker:text-slate-400',
    back:  'text-slate-400 hover:text-slate-200',
  },
} as const;

export function LegalPage({
  title,
  updated,
  icon,
  accentColor = 'emerald',
  children,
}: LegalPageProps) {
  const a = ACCENT[accentColor];

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* ── Page background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

        {/* ── Back nav ── */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium transition-colors ${a.back}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Back to JaysMoneyGuides
          </Link>
        </nav>

        {/* ── Article header ── */}
        <header className="mb-10 pb-8 border-b border-slate-800/70">
          {/* Page type badge */}
          <div className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-5 ${a.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} aria-hidden="true" />
            {icon ?? <FileText className="w-3.5 h-3.5" aria-hidden="true" />}
            Legal &amp; Policy
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {title}
          </h1>

          {updated && (
            <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
              Last updated: <time className="text-slate-400 font-medium ml-0.5">{updated}</time>
            </p>
          )}
        </header>

        {/* ── Body ── */}
        <article
          className={`
            prose-legal
            space-y-0
            text-[17px] sm:text-[18px] leading-[1.85] text-slate-300

            [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:${a.h2}
            [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-6
            [&_h2]:border-t [&_h2]:${a.rule}

            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-200 [&_h3]:mt-7 [&_h3]:mb-3

            [&_p]:text-slate-300 [&_p]:mb-5 [&_p]:leading-[1.85]

            [&_ul]:my-5 [&_ul]:pl-6 [&_ul]:space-y-2.5
            [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:space-y-2.5
            [&_li]:text-slate-300 [&_li]:leading-[1.75] ${a.marker}
            [&_ol_li]:marker:text-slate-500

            [&_strong]:text-white [&_strong]:font-semibold
            [&_em]:text-slate-200 [&_em]:italic

            [&_blockquote]:border-l-4 [&_blockquote]:border-slate-600 [&_blockquote]:pl-5
            [&_blockquote]:text-slate-400 [&_blockquote]:italic [&_blockquote]:my-6

            [&_code]:bg-slate-800 [&_code]:text-emerald-300 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[14px] [&_code]:font-mono

            [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors
            ${a.link}

            [&_hr]:border-slate-800 [&_hr]:my-10

            [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:my-6
            [&_th]:text-left [&_th]:text-slate-400 [&_th]:font-semibold [&_th]:pb-2 [&_th]:border-b [&_th]:border-slate-700
            [&_td]:py-2.5 [&_td]:border-b [&_td]:border-slate-800/60 [&_td]:text-slate-300
          `}
        >
          {children}
        </article>

        {/* ── Footer nav ── */}
        <footer className="mt-14 pt-8 border-t border-slate-800/70">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            <span className="text-slate-600 font-semibold uppercase tracking-widest text-xs">Legal Pages</span>
            {[
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Service' },
              { href: '/disclaimer', label: 'Disclaimer & FTC' },
              { href: '/cookie-policy', label: 'Cookie Policy' },
              { href: '/about', label: 'About Jay Lopez' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-slate-400 hover:text-white transition-colors underline underline-offset-2 decoration-slate-700 hover:decoration-slate-400"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-600">
            © {new Date().getFullYear()} JaysMoneyGuides · Jay Lopez. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}

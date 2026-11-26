// ─────────────────────────────────────────────────────────────────────────────
// GuideVaultSection.tsx — "The Guide Vault" homepage section
// ─────────────────────────────────────────────────────────────────────────────
// STORE URL — set: the "Browse the Guide Vault" button points at the live
// store (constant STORE_URL below):
// https://the-guide-vault.vercel.app
// If the store ever moves, update that one line and nothing else.
// ─────────────────────────────────────────────────────────────────────────────
//
// WHERE THIS FILE GOES
//   components/ui/GuideVaultSection.tsx   (new file — same folder as
//   ToolsHomepageSection.tsx, which this section is modelled on)
//
// HOW IT IS WIRED IN
//   See INTEGRATION.md in this same patch folder. In short: import it in
//   components/client/HomeClient.tsx and render it after the Tools section
//   (section 6) and before <ReviewsSection />.
//
// STYLE
//   Matches the existing site: dark slate-900 cards on slate-950, emerald
//   accents, lucide-react icons, same header/badge/card patterns as
//   ToolsHomepageSection.tsx. No client state, so this is a plain (server)
//   component — no 'use client' directive needed.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  Download,
  FileText,
  File,
  ArrowRight,
} from 'lucide-react';

const STORE_URL = 'https://the-guide-vault.vercel.app';

interface FeaturedGuide {
  id: string;
  title: string;
  description: string;
  price: string;
  tag: string;
  cover: string;
  href: string;
}

const FEATURED_GUIDES: FeaturedGuide[] = [
  {
    id: 'faceless-youtube-channel-guide',
    title: 'Faceless YouTube Channel Guide',
    description:
      'Start and grow a faceless channel — niches, scripts, voiceover, thumbnails and monetization, step by step.',
    price: '$14.99',
    tag: 'FEATURED',
    cover: 'https://guide-vault-assets.vercel.app/faceless-youtube-guide.png',
    href: 'https://the-guide-vault.vercel.app/#book-faceless-youtube',
  },
  {
    id: 'indie-game-promo-playbook',
    title: 'Indie Game Promo Playbook',
    description:
      'Get your indie game seen — launch posts, community marketing and a 30-day promo plan that actually ships.',
    price: '$14.99',
    tag: 'NEW',
    cover: 'https://guide-vault-assets.vercel.app/indie-game-promo-playbook.png',
    href: 'https://the-guide-vault.vercel.app/#book-indie-game-promo-playbook',
  },
  {
    id: 'ai-side-hustles-playbook',
    title: 'AI Side Hustles Playbook',
    description:
      'Turn AI tools into income — the hustles that work, the setup for each, and how to get your first paying customer.',
    price: '$12.99',
    tag: 'PLAYBOOK',
    cover: 'https://guide-vault-assets.vercel.app/ai-side-hustles-playbook.png',
    href: 'https://the-guide-vault.vercel.app/#book-ai-side-hustles-playbook',
  },
];

export function GuideVaultSection() {
  return (
    <section id="guide-vault" aria-label="The Guide Vault ebook store" className="scroll-mt-24">
      {/* Section header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/25 border border-emerald-400/40"
            aria-hidden="true"
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-white tracking-tight">
                The Guide Vault
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ebooks
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Playbooks that pay.</p>
          </div>
        </div>
        <Link
          href={STORE_URL}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          aria-label="Browse all guides in the Guide Vault"
        >
          Browse all guides <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Intro copy */}
      <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-5">
        No fluff, no theory — every guide in the Vault is a step-by-step playbook
        you can put to work the same day. Ebooks only, delivered by email
        after checkout — the featured guides come in PDF and DOCX, so you can
        read on any device or edit and adapt the templates as your own.
      </p>

      {/* Instant-download strip */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
          <Download className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          Delivered by email
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
          <FileText className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          PDF included
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
          <File className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          DOCX included
        </span>
      </div>

      {/* Featured guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURED_GUIDES.map((guide) => {
          return (
            <div
              key={guide.id}
              className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/8 flex flex-col gap-3"
            >
              {/* Tag */}
              <span className="absolute -top-2.5 -right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {guide.tag}
              </span>

              {/* Cover thumbnail (real Vault cover) — links to the book's own product page */}
              <Link href={guide.href} className="flex justify-center" aria-label={`View ${guide.title} in the Guide Vault`}>
                <img
                  src={guide.cover}
                  alt={`Cover of ${guide.title} by Jay Lopez`}
                  width={640}
                  height={960}
                  loading="lazy"
                  className="h-44 w-auto rounded-lg border border-slate-700/60 shadow-lg shadow-black/40 group-hover:border-emerald-500/50 transition-all"
                />
              </Link>

              {/* Title + description */}
              <div>
                <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{guide.description}</p>
              </div>

              {/* Price + format */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-auto">
                <span className="text-lg font-black text-emerald-400">{guide.price}</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                  PDF + DOCX
                </span>
              </div>

              {/* CTA */}
              <Link
                href={guide.href}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all touch-manipulation"
                aria-label={`Get the ${guide.title} in the Guide Vault`}
              >
                Get the guide <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Main store CTA */}
      <div className="mt-6">
        <Link
          href={STORE_URL}
          className="flex items-center justify-center gap-2 w-full sm:w-auto sm:inline-flex px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 touch-manipulation"
          aria-label="Browse the Guide Vault ebook store"
        >
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          Browse the Guide Vault
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <p className="text-[11px] text-slate-500 mt-3 text-center sm:text-left">
          Ebooks only — delivered by email after purchase, yours to keep.
        </p>
      </div>

      {/* Mobile "browse all" link (matches ToolsHomepageSection pattern) */}
      <Link
        href={STORE_URL}
        className="sm:hidden mt-3 flex items-center justify-center gap-1.5 min-h-[44px] text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
        aria-label="Browse all guides in the Guide Vault"
      >
        Browse all guides <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
      </Link>
    </section>
  );
}

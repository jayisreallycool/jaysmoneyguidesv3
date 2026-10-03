import { BookOpen, Sparkles, TrendingUp, Download, Zap, ArrowRight, Newspaper, Search, DollarSign, Link2, Star } from 'lucide-react';

/** Slim full-width banner introducing the ebooks section. */
export function EbooksBanner() {
  return (
    <div className="relative w-full overflow-clip border-y border-emerald-500/20 bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(16,185,129,0.08),transparent)]" aria-hidden />
      <div className="reveal relative mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:gap-6 sm:py-5">
        {/* Left: label + heading */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/25">
            <BookOpen className="h-4 w-4 text-emerald-400" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/80">Digital Guides & Ebooks</p>
            <p className="text-sm font-semibold text-white leading-tight">Step-by-step playbooks for building online income</p>
          </div>
        </div>
        {/* Right: pills + CTA */}
        <div className="flex shrink-0 items-center gap-3 flex-wrap justify-center sm:justify-end">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium"><Download className="h-3 w-3 text-emerald-400" />Instant download</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium"><Zap className="h-3 w-3 text-emerald-400" />Actionable systems</span>
          <a href="#ebooks-grid" className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-slate-950 transition-colors hover:bg-emerald-400 whitespace-nowrap">
            Browse ebooks <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Slim full-width banner introducing the blog articles section. */
export function BlogIntro() {
  return (
    <div className="relative w-full overflow-clip border-y border-sky-500/20 bg-gradient-to-r from-slate-950 via-sky-950/30 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(14,165,233,0.06),transparent)]" aria-hidden />
      <div className="reveal relative mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:gap-6 sm:py-5">
        {/* Left: label + heading */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 border border-sky-500/25">
            <Newspaper className="h-4 w-4 text-sky-400" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400/80">The Blog</p>
            <p className="text-sm font-semibold text-white leading-tight">In-depth guides on affiliate marketing, SEO & blogging</p>
          </div>
        </div>
        {/* Right: pills + CTA */}
        <div className="flex shrink-0 items-center gap-3 flex-wrap justify-center sm:justify-end">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium"><Search className="h-3 w-3 text-sky-400" />SEO & Organic</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium"><TrendingUp className="h-3 w-3 text-emerald-400" />Money moves</span>
          <a href="#guides" className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-bold text-slate-950 transition-colors hover:bg-sky-400 whitespace-nowrap">
            Explore guides <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Slim full-width banner introducing the affiliate programs & tools section. */
export function ToolsBanner() {
  return (
    <div className="relative w-full overflow-clip border-y border-amber-500/20 bg-gradient-to-r from-slate-950 via-amber-950/30 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(245,158,11,0.07),transparent)]" aria-hidden />
      <div className="reveal relative mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:gap-6 sm:py-5">
        {/* Left: label + heading */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/25">
            <Link2 className="h-4 w-4 text-amber-400" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400/80">Affiliate Programs & Tools</p>
            <p className="text-sm font-semibold text-white leading-tight">Personally vetted tools that pay you recurring commissions</p>
          </div>
        </div>
        {/* Right: pills + CTA */}
        <div className="flex shrink-0 items-center gap-3 flex-wrap justify-center sm:justify-end">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium"><DollarSign className="h-3 w-3 text-amber-400" />High commissions</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium"><Star className="h-3 w-3 text-amber-400" />Personally vetted</span>
          <a href="#tools" className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-300 whitespace-nowrap">
            Browse tools <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

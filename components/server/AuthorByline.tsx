/**
 * "About the author" block shown under the title of every guide.
 * Driven by the article's author field; the bio is Jay's standing
 * description of himself and his projects (kept factual on purpose).
 */
export function AuthorByline({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <section
      aria-label="About the author"
      className="mb-8 flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
    >
      <div
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-sm font-extrabold text-emerald-300"
      >
        {initials}
      </div>
      <div className="min-w-0">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
          About the author
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300 sm:text-base">
          <span className="font-bold text-white">{name} — Founder of JaysMoneyGuides.</span>{' '}
          Jay writes about affiliate marketing, blogging, SEO and building income online,
          based on his own experience running JaysMoneyGuides, the Guide Vault ebook store
          and RivalArcade. Say hello:{' '}
          <a
            href="mailto:jayisreallycool@gmail.com"
            className="text-emerald-400 underline underline-offset-2 transition-colors hover:text-emerald-300"
          >
            jayisreallycool@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}

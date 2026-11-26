/**
 * Article footer shown at the end of every guide: the standing affiliate
 * disclosure followed by Jay's sign-off. One shared component so the
 * wording stays identical (and updatable) across all articles.
 */
export function ArticleFooter() {
  return (
    <footer className="mt-12 border-t border-slate-800/70 pt-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          Affiliate Disclosure
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Some of the links in this article are affiliate links. If you click and make a
          purchase, I may earn a commission at no extra cost to you. I only recommend tools
          and programs I believe are genuinely useful — commissions help keep
          JaysMoneyGuides free.
        </p>
      </div>
      <div className="mt-8">
        <p className="text-xl font-bold text-white">— Jay Lopez</p>
        <p className="mt-0.5 text-sm text-slate-500">Founder, JaysMoneyGuides</p>
      </div>
    </footer>
  );
}

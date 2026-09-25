import type { TocItem } from '@/lib/markdown';

/** Server-rendered table of contents — zero client JS. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6"
    >
      <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">
        In this guide
      </p>
      <ol className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? '1rem' : undefined }}
          >
            <a
              href={`#${item.id}`}
              className={
                item.level === 2
                  ? 'text-sm text-slate-300 hover:text-emerald-400 transition-colors font-medium leading-snug block'
                  : 'text-[13px] text-slate-500 hover:text-slate-300 transition-colors leading-snug block'
              }
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

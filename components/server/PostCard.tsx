import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost, BlogPostSummary } from '@/lib/types';

const CATEGORY_COLORS: Record<string, string> = {
  'Affiliate Marketing': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'SEO':                 'bg-sky-500/15    text-sky-300    border-sky-500/25',
  'Blogging':            'bg-violet-500/15 text-violet-300 border-violet-500/25',
  'Entrepreneurship':    'bg-amber-500/15  text-amber-300  border-amber-500/25',
  'E-Commerce':          'bg-pink-500/15   text-pink-300   border-pink-500/25',
  'Tech':                'bg-cyan-500/15   text-cyan-300   border-cyan-500/25',
  'SoFi Bank':           'bg-blue-500/15   text-blue-300   border-blue-500/25',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner:     'text-emerald-400',
  Intermediate: 'text-amber-400',
  Advanced:     'text-rose-400',
};

function catColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? 'bg-slate-700/40 text-slate-300 border-slate-600/40';
}

export function PostCard({
  post,
  priority = false,
}: {
  post: BlogPost | BlogPostSummary;
  priority?: boolean;
}) {
  const diffColor = DIFFICULTY_COLORS[post.difficulty] ?? 'text-slate-400';

  return (
    <Link
      href={`/guide/${post.slug}`}
      className="group flex flex-col bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] bg-slate-950 shrink-0 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" aria-hidden="true" />

        {/* Category pill */}
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-sm ${catColor(post.category)}`}>
            {post.category}
          </span>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pt-4 flex items-end justify-between">
          {post.difficulty && (
            <span className={`text-[10px] font-semibold tracking-wide ${diffColor}`}>
              {post.difficulty}
            </span>
          )}
          {post.readTimeMinutes > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-slate-300/80">
              <Clock className="w-3 h-3 text-emerald-400/80" aria-hidden="true" />
              {post.readTimeMinutes} min
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-3 gap-2">
        <h2 className="text-[15px] sm:text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
          {post.title}
        </h2>
        <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Read CTA */}
        <div className="flex items-center justify-end pt-1 mt-auto">
          <span className="flex items-center gap-1 text-[12px] font-semibold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Read guide
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

'use client';
import React from 'react';
import { BlogPostSummary } from '@/lib/types';
import { Clock, Heart, Bookmark, ArrowRight, Star } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface PostCardProps {
  post: BlogPostSummary;
  isBookmarked: boolean;
  onToggleBookmark: (postId: string, e: React.MouseEvent) => void;
  onLikePost: (postId: string, e: React.MouseEvent) => void;
  isLiked: boolean;
}

const CATEGORY_COLORS: Record<string, { pill: string; dot: string }> = {
  'Affiliate Marketing': { pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25', dot: 'bg-emerald-400' },
  'SEO':                 { pill: 'bg-sky-500/15    text-sky-300    border-sky-500/25',    dot: 'bg-sky-400' },
  'Blogging':            { pill: 'bg-violet-500/15 text-violet-300 border-violet-500/25', dot: 'bg-violet-400' },
  'Entrepreneurship':    { pill: 'bg-amber-500/15  text-amber-300  border-amber-500/25',  dot: 'bg-amber-400' },
  'Tech':                { pill: 'bg-cyan-500/15   text-cyan-300   border-cyan-500/25',   dot: 'bg-cyan-400' },
  'SoFi Bank':           { pill: 'bg-blue-500/15   text-blue-300   border-blue-500/25',   dot: 'bg-blue-400' },
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner:     'text-emerald-400',
  Intermediate: 'text-amber-400',
  Advanced:     'text-rose-400',
};

function getCat(cat: string) {
  return CATEGORY_COLORS[cat] ?? { pill: 'bg-slate-700/40 text-slate-300 border-slate-600/40', dot: 'bg-slate-400' };
}

export const PostCard: React.FC<PostCardProps> = React.memo(({
  post,
  isBookmarked,
  onToggleBookmark,
  onLikePost,
  isLiked,
}) => {
  const cat = getCat(post.category);
  const diffColor = DIFFICULTY_COLORS[post.difficulty] ?? 'text-slate-400';

  return (
    <article className="group relative flex flex-col bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5">

      {/* Full-card link */}
      <a
        href={`/guide/${post.slug}`}
        aria-label={`Read: ${post.title}`}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      />

      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-950 shrink-0">
        <SafeImage
          src={post.coverImage || '/images/affiliate-marketing-guide-cover.webp'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" aria-hidden="true" />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-sm ${cat.pill}`}>
            {post.category}
          </span>
          {post.featured && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
              FEATURED
            </span>
          )}
        </div>

        {/* Bookmark button — top right */}
        <button
          onClick={(e) => onToggleBookmark(post.id, e)}
          className={`absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-xl backdrop-blur-sm transition-all ${
            isBookmarked
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900/80 border border-white/10'
          }`}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom meta bar */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pt-4 flex items-end justify-between">
          <span className={`text-[10px] font-semibold tracking-wide ${diffColor}`}>
            {post.difficulty}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-300/80">
            <Clock className="w-3 h-3 text-emerald-400/80" aria-hidden="true" />
            {post.readTimeMinutes} min
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-3 gap-2.5">

        {/* Rating — only if present */}
        {typeof post.rating === 'number' && post.ratingCount !== undefined && post.ratingCount > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="text-[11px] font-bold text-amber-300">{post.rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-500">({post.ratingCount})</span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-[15px] sm:text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Key takeaway */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <p className="text-[11px] text-emerald-400/80 italic line-clamp-1 border-l-2 border-emerald-500/30 pl-2.5">
            {post.keyTakeaways[0]}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-800/80">
          {/* Author */}
          <div className="flex items-center gap-2 min-w-0">
            <SafeImage
              src={post.author.avatar || ''}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover border border-emerald-500/20 shrink-0"
              loading="lazy"
              decoding="async"
              width="24"
              height="24"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-300 truncate">{post.author.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{post.publishedAt}</p>
            </div>
          </div>

          {/* Engagement */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => onLikePost(post.id, e)}
              aria-label={isLiked ? 'Unlike' : 'Like'}
              className={`relative z-20 flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] transition-colors ${
                isLiked
                  ? 'text-rose-400 bg-rose-500/10 font-bold'
                  : 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-400' : ''}`} />
              {post.likes}
            </button>
            <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

PostCard.displayName = 'PostCard';

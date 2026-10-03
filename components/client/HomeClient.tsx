'use client';

import { useAuth } from '@/components/client/AuthProvider';
import { getFirebaseAuth } from '@/lib/firebase-client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { HeroHeader } from '@/components/ui/HeroHeader';
import { PostCard } from '@/components/ui/PostCard';
import { CategoryTabs } from '@/components/ui/CategoryTabs';
import { StoreSection } from '@/components/ui/StoreSection';
import { EbooksBanner, BlogIntro, ToolsBanner } from '@/components/ui/SectionIntro';
import { ReviewsSection } from '@/components/ui/ReviewsSection';
import { ToolsHomepageSection } from '@/components/ui/ToolsHomepageSection';
import { CheckoutModal } from '@/components/client/CheckoutModal';
import { AdUnit } from '@/components/client/AdUnit';
import dynamic from 'next/dynamic';
import { ProductPreviewModal } from '@/components/ui/ProductPreviewModal';
import Link from 'next/link';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';

const EbookViewer = dynamic(
  () => import('@/components/client/EbookViewer').then((m) => m.EbookViewer),
  { ssr: false, loading: () => <div className="h-[60vh] grid place-items-center text-slate-400">Loading viewer…</div> }
);

import type { BlogPostSummary, Product, Category } from '@/lib/types';

const INITIAL_COUNT = 6;
const LOAD_STEP = 5;

function shuffle<T>(arr: T[], seed = 1): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function HomeClient({ posts: allPosts, products }: { posts: BlogPostSummary[]; products: Product[] }) {
  const { user } = useAuth();
  const [posts] = useState<BlogPostSummary[]>(allPosts);
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [checkingOutId, setCheckingOutId] = useState<string | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [viewerProduct, setViewerProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [viewerEmail, setViewerEmail] = useState<string>('');

  const featured = useMemo(() => posts.find((p) => p.featured) ?? posts[0], [posts]);
  const shuffled = useMemo(() => shuffle(posts, 1), [posts]);
  const filtered = useMemo(
    () => (category === 'All' ? shuffled : shuffled.filter((p) => p.category === category)),
    [shuffled, category]
  );
  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  const counts = useMemo(
    () => posts.reduce(
      (acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc; },
      { All: posts.length } as Record<string, number>
    ),
    [posts]
  );

  // Load ebook entitlements
  useEffect(() => {
    let cancelled = false;
    if (!user) { setPurchasedIds([]); return; }
    const firebaseAuth = getFirebaseAuth();
    if (!firebaseAuth?.currentUser) return;
    firebaseAuth.currentUser.getIdToken()
      .then((token) => fetch('/api/ebook-entitlements', { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }))
      .then((res) => res.ok ? res.json() : { productIds: [] })
      .then((data) => { if (!cancelled && Array.isArray(data.productIds)) setPurchasedIds(data.productIds); })
      .catch((err) => console.error('Ebook entitlement load failed:', err));
    return () => { cancelled = true; };
  }, [user]);

  const toggleBookmark = (postId: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setBookmarks((b) => (b.includes(postId) ? b.filter((x) => x !== postId) : [...b, postId]));
  };
  const likePost = (postId: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setLikes((l) => (l.includes(postId) ? l.filter((x) => x !== postId) : [...l, postId]));
  };
  const onSelectCategory = (c: Category | 'All') => { setCategory(c); setVisibleCount(INITIAL_COUNT); };

  const handleBuy = useCallback((product: Product) => {
    setCheckoutProduct(product);
  }, []);

  const handleOpenFree = useCallback((product: Product) => { setViewerEmail(''); setViewerProduct(product); }, []);

  return (
    <>
      {/* 1. Hero */}
      <HeroHeader onSubscribeSuccess={() => {}} />

      {/* 2. Blog section intro banner */}
      <BlogIntro />

      {/* 3. Guides — direct navigation to /guide/[slug] */}
      <section id="guides" className="mx-auto max-w-7xl px-4 pt-12 pb-10" aria-label="Blog guides and articles">
        <div className="mb-8 reveal">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Latest Guides</h2>
          <p className="text-slate-400 text-sm">In-depth tutorials on affiliate marketing, SEO, blogging and more.</p>
        </div>

        {/* Featured guide — prominent conversion card */}
        {featured && (
          <Link
            href={`/guide/${featured.slug}`}
            className="reveal group relative flex flex-col sm:flex-row gap-0 bg-slate-900 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl overflow-hidden mb-8 transition-all hover:shadow-xl hover:shadow-emerald-500/10"
            aria-label={`Featured guide: ${featured.title}`}
          >
            {/* Cover image */}
            <div className="relative w-full sm:w-64 md:w-80 shrink-0 aspect-video sm:aspect-auto sm:min-h-[200px] overflow-hidden bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="eager"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fetchPriority={"high" as any}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/40 sm:block hidden" aria-hidden="true" />
              <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" aria-hidden="true" />
                Featured
              </span>
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center px-5 py-5 sm:px-6 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-2">{featured.category}</p>
              <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-2">
                {featured.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-emerald-400/60" aria-hidden="true" />
                  {featured.readTimeMinutes} min read · {featured.difficulty}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  Read guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        )}
        <CategoryTabs
          selectedCategory={category}
          onSelectCategory={(c) => onSelectCategory(c)}
          postCounts={counts}
        />
        <div className="reveal-children mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isBookmarked={bookmarks.includes(post.id)}
              onToggleBookmark={toggleBookmark}
              onLikePost={likePost}
              isLiked={likes.includes(post.id)}
            />
          ))}
        </div>
        {remaining > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setVisibleCount((c) => c + LOAD_STEP)}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer touch-manipulation"
            >
              Load {Math.min(LOAD_STEP, remaining)} more
            </button>
            <button
              onClick={() => setVisibleCount(filtered.length)}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-800 text-slate-100 font-bold hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer touch-manipulation"
            >
              Load all ({filtered.length})
            </button>
          </div>
        )}
      </section>

      {/* Ad: Leaderboard between guides and ebooks */}
      <div className="max-w-4xl mx-auto px-4 pb-2">
        <AdUnit slot="HOME_MID_LEADERBOARD" format="leaderboard" />
      </div>

      {/* 4. Ebooks */}
      <EbooksBanner />
      <section id="ebooks" className="mx-auto max-w-7xl px-4 py-10" aria-label="eBook store">
        <div id="ebooks-grid">
          <StoreSection
            products={products}
            purchasedIds={purchasedIds}
            onPreview={() => {}}
            onOpenFree={handleOpenFree}
            onBuy={handleBuy}
            checkingOutId={checkingOutId}
          />
        </div>
      </section>

      {/* 5. Tools & Affiliate Programs intro banner */}
      <ToolsBanner />

      {/* 6. Tools & Affiliate Programs */}
      <section id="tools" className="reveal mx-auto max-w-7xl px-4 pb-14" aria-label="Recommended tools and affiliate programs">
        <ToolsHomepageSection />
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* Modals */}
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onOpenFree={(pr) => { setPreviewProduct(null); handleOpenFree(pr); }}
          onBuy={(pr) => { setPreviewProduct(null); handleBuy(pr); }}
          isPurchased={false}
          isCheckingOut={checkingOutId === previewProduct.id}
        />
      )}

      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          onClose={() => { setCheckoutProduct(null); setCheckingOutId(null); }}
        />
      )}

      {viewerProduct && (
        <div
          className="fixed inset-0 z-[80] bg-slate-950/90 backdrop-blur p-4 overflow-y-auto"
          onClick={() => setViewerProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Reading: ${viewerProduct.title}`}
        >
          <div className="mx-auto max-w-4xl mt-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-white">{viewerProduct.title}</h3>
              <button
                onClick={() => setViewerProduct(null)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
                aria-label="Close ebook viewer"
              >
                Close
              </button>
            </div>
            <EbookViewer productId={viewerProduct.id} email={viewerEmail || undefined} isFree={!!viewerProduct.isFree} />
          </div>
        </div>
      )}
    </>
  );
}

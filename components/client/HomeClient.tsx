'use client';

import { useAuth } from '@/components/client/AuthProvider';
import { getFirebaseAuth } from '@/lib/firebase-client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { HeroHeader } from '@/components/ui/HeroHeader';
import { PostCard } from '@/components/ui/PostCard';
import { CategoryTabs } from '@/components/ui/CategoryTabs';
import { StoreSection } from '@/components/ui/StoreSection';
import { EbooksBanner, BlogIntro, ToolsBanner } from '@/components/ui/SectionIntro';
import { ReviewsSection, REVIEW_PROMPT_EVENT, type GuideHighlight } from '@/components/ui/ReviewsSection';
import { ToolsHomepageSection } from '@/components/ui/ToolsHomepageSection';
import { CheckoutModal } from '@/components/client/CheckoutModal';
import { AdUnit } from '@/components/client/AdUnit';
import dynamic from 'next/dynamic';
import { ProductPreviewModal } from '@/components/ui/ProductPreviewModal';
import Link from 'next/link';
import { ArrowRight, Clock, TrendingUp, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { getReceipts, saveReceipt } from '@/lib/checkout-client';

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
  // Stripe receipts saved in this browser: productId -> checkout session id
  const [receipts, setReceipts] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<{ kind: 'pending' | 'success' | 'error' | 'info'; text: string } | null>(null);

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

  useEffect(() => { setReceipts(getReceipts()); }, []);

  // "From the guides" cards: one real key takeaway per guide, mixed across
  // categories so the row doesn't show five cards on the same topic in a row.
  const highlights = useMemo<GuideHighlight[]>(() => {
    const byCategory = new Map<string, GuideHighlight[]>();
    for (const p of posts) {
      const takeaway = (p.keyTakeaways ?? []).find((t) => t.length >= 50 && t.length <= 210);
      if (!takeaway) continue;
      const list = byCategory.get(p.category) ?? [];
      list.push({ slug: p.slug, title: p.title, category: p.category, takeaway, readTimeMinutes: p.readTimeMinutes });
      byCategory.set(p.category, list);
    }
    const out: GuideHighlight[] = [];
    const lists = [...byCategory.values()];
    for (let i = 0; out.length < 12 && lists.some((l) => l[i]); i++) {
      for (const l of lists) if (l[i] && out.length < 12) out.push(l[i]);
    }
    return out;
  }, [posts]);

  // Ask for a real review after someone has actually spent time reading an
  // ebook — once per ebook per browser, and only as a dismissible prompt.
  const viewerOpenedAt = useRef(0);
  const [reviewPrompt, setReviewPrompt] = useState<Product | null>(null);
  useEffect(() => { if (viewerProduct) viewerOpenedAt.current = Date.now(); }, [viewerProduct]);
  const closeViewer = useCallback(() => {
    const product = viewerProduct;
    setViewerProduct(null);
    if (!product || Date.now() - viewerOpenedAt.current < 30_000) return;
    try {
      const KEY = 'jmg_review_prompted_v1';
      const seen = JSON.parse(localStorage.getItem(KEY) || '{}') as Record<string, boolean>;
      if (seen[product.id]) return;
      localStorage.setItem(KEY, JSON.stringify({ ...seen, [product.id]: true }));
    } catch {
      return; // storage blocked — don't risk asking repeatedly
    }
    setReviewPrompt(product);
  }, [viewerProduct]);

  // Owned = entitlements on the signed-in account + purchases made in this browser
  const ownedIds = useMemo(
    () => Array.from(new Set([...purchasedIds, ...Object.keys(receipts)])),
    [purchasedIds, receipts]
  );

  // Return from Stripe (/?purchase=success&session_id=…&product=…), a cancelled
  // checkout, or a "read my ebook" link (/?read=<productId>).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const purchase = q.get('purchase');
    const read = q.get('read');
    if (!purchase && !read) return;

    const product = products.find((p) => p.id === (q.get('product') || read));
    const sessionId = q.get('session_id') || '';
    const cleanUrl = () => window.history.replaceState(null, '', window.location.pathname + window.location.hash);

    if (read) {
      cleanUrl();
      if (product) { setViewerEmail(''); setViewerProduct(product); }
      return;
    }
    if (purchase === 'cancel') {
      cleanUrl();
      setNotice({ kind: 'info', text: 'Checkout cancelled — you have not been charged.' });
      return;
    }
    if (purchase !== 'success' || !product || !sessionId) return;

    let cancelled = false;
    setNotice({ kind: 'pending', text: 'Confirming your payment…' });
    (async () => {
      // Some payment methods confirm a few seconds after the redirect — retry briefly.
      for (let attempt = 0; attempt < 6 && !cancelled; attempt++) {
        try {
          const res = await fetch(
            `/api/verify-purchase?session_id=${encodeURIComponent(sessionId)}&product=${encodeURIComponent(product.id)}`,
            { cache: 'no-store' }
          );
          const data = (await res.json().catch(() => ({}))) as { verified?: boolean; email?: string };
          if (cancelled) return;
          if (res.ok && data.verified) {
            saveReceipt(product.id, sessionId);
            setReceipts(getReceipts());
            cleanUrl();
            setNotice({
              kind: 'success',
              text: `Payment confirmed — "${product.title}" is yours.${data.email ? ` Sign in with ${data.email} to read it on any device.` : ''}`,
            });
            setViewerEmail(data.email || '');
            setViewerProduct(product);
            return;
          }
          if (res.status !== 402 && res.status < 500) break; // definite "no"
        } catch {
          // network blip — retry
        }
        await new Promise((r) => setTimeout(r, 2000));
      }
      if (!cancelled) {
        setNotice({
          kind: 'error',
          text: 'We could not confirm your payment yet. If you were charged, refresh this page in a minute or use the Contact page — your purchase is safe.',
        });
      }
    })();
    return () => { cancelled = true; };
  }, [products]);

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
            purchasedIds={ownedIds}
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
      <ReviewsSection highlights={highlights} />

      {/* Purchase status */}
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed left-3 right-3 sm:left-auto sm:right-5 sm:max-w-sm bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[95] flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-md ${
            notice.kind === 'success' ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-100'
            : notice.kind === 'error' ? 'bg-rose-950/95 border-rose-500/50 text-rose-100'
            : 'bg-slate-900/95 border-slate-700 text-slate-100'
          }`}
        >
          {notice.kind === 'pending' ? <Loader2 className="w-4 h-4 mt-0.5 shrink-0 animate-spin" aria-hidden="true" />
            : notice.kind === 'success' ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
            : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />}
          <p className="flex-1 leading-snug">{notice.text}</p>
          {notice.kind !== 'pending' && (
            <button onClick={() => setNotice(null)} aria-label="Dismiss" className="shrink-0 -m-1.5 p-1.5 rounded-lg hover:bg-white/10 cursor-pointer">
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* Review request — shown after reading, never automatically opens the form */}
      {reviewPrompt && !viewerProduct && (
        <div
          role="dialog"
          aria-label="Leave a review"
          className="fixed left-3 right-3 sm:left-auto sm:right-5 sm:max-w-sm bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[94] rounded-2xl border border-amber-400/40 bg-slate-900/95 backdrop-blur-md p-4 shadow-2xl"
        >
          <p className="text-sm font-bold text-white">How was “{reviewPrompt.title}”?</p>
          <p className="mt-1 text-sm text-slate-400 leading-snug">
            An honest review — good or bad — helps other readers decide.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent(REVIEW_PROMPT_EVENT, { detail: { about: reviewPrompt.title } }));
                setReviewPrompt(null);
              }}
              className="flex-1 min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-black cursor-pointer"
            >
              Leave a review
            </button>
            <button
              onClick={() => setReviewPrompt(null)}
              className="min-h-[44px] px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold border border-slate-700 cursor-pointer"
            >
              Not now
            </button>
          </div>
        </div>
      )}

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
          onClick={closeViewer}
          role="dialog"
          aria-modal="true"
          aria-label={`Reading: ${viewerProduct.title}`}
        >
          <div className="mx-auto max-w-4xl mt-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-white">{viewerProduct.title}</h3>
              <button
                onClick={closeViewer}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
                aria-label="Close ebook viewer"
              >
                Close
              </button>
            </div>
            <EbookViewer
              productId={viewerProduct.id}
              email={viewerEmail || undefined}
              isFree={!!viewerProduct.isFree}
              sessionId={receipts[viewerProduct.id]}
            />
          </div>
        </div>
      )}
    </>
  );
}

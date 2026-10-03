'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFirebaseAuth, signInWithGoogle } from '@/lib/firebase-client';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import {
  LayoutDashboard, ShoppingBag, Users, BookOpen,
  LogOut, RefreshCw, Gift, TrendingUp, Mail, X, CheckCircle, AlertCircle,
  BarChart2, Star, Check, Trash2, Eye, ExternalLink, ChevronUp, ChevronDown,
  FileText, Link2, Activity, MessageSquare, ShieldAlert,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { isAdminEmailClient } from '@/lib/admin-config';
import { Toast, StatCard, SectionHeader, Badge, Card, formatDate } from './ui';
import { TrafficTab, type TrafficDay } from './TrafficTab';
import { MessagesTab } from './MessagesTab';

type Tab = 'overview' | 'traffic' | 'messages' | 'analytics' | 'reviews' | 'orders' | 'subscribers' | 'affiliate' | 'access';

// ── Shared types ──────────────────────────────────────────────────────────────
interface Stats { totalOrders: number; totalSubscribers: number; revenue: string; paidOrders: number; }
interface Order { id: string; email: string; productId: string; purchasedAt: string; isFree: boolean; stripeSessionId: string; }
interface Subscriber { email: string; subscribedAt: string; source: string; }
interface AdminData { stats: Stats; orders: Order[]; subscribers: Subscriber[]; }
interface ArticleStat { slug: string; title: string; category: string; views: number; }
interface EbookStat { id: string; title: string; isFree: boolean; priceCents: number; opens: number; }
interface AnalyticsData { articleStats: ArticleStat[]; ebookStats: EbookStat[]; traffic?: TrafficDay[]; }
interface Review { id: string; name: string; avatar: string; role?: string; rating: number; text: string; date: string; approved: boolean; createdAt: string; ip?: string; }

// ── Affiliate program tracker (local config — edit as needed) ─────────────────
interface AffiliateProgram {
  name: string;
  domain: string;
  network: string;
  commission: string;
  cookieDays: number;
  status: 'active' | 'pending' | 'paused';
  notes: string;
  signupUrl: string;
}

const AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  { name: 'SemRush', domain: 'semrush.com', network: 'Impact', commission: '40% recurring', cookieDays: 120, status: 'active', notes: 'High-converting SEO tool. Priority placement in SEO guides.', signupUrl: 'https://www.semrush.com/partner/affiliate/' },
  { name: 'Ahrefs', domain: 'ahrefs.com', network: 'Direct', commission: '$75/mo recurring', cookieDays: 60, status: 'active', notes: 'Best for advanced SEO users. Mention in keyword research posts.', signupUrl: 'https://ahrefs.com/affiliate' },
  { name: 'ConvertKit', domain: 'convertkit.com', network: 'Impact', commission: '30% recurring', cookieDays: 90, status: 'active', notes: 'Top email tool rec for bloggers and creators.', signupUrl: 'https://partners.convertkit.com/' },
  { name: 'Shopify', domain: 'shopify.com', network: 'Shopify Partners', commission: '$150 per new store', cookieDays: 30, status: 'active', notes: 'Strong e-commerce audience fit. Featured in entrepreneurship posts.', signupUrl: 'https://www.shopify.com/affiliates' },
  { name: 'Bluehost', domain: 'bluehost.com', network: 'Direct', commission: '$65 per signup', cookieDays: 45, status: 'active', notes: 'Blogging starter rec. Feature in "start a blog" guides.', signupUrl: 'https://www.bluehost.com/wordpress/wordpress-affiliate' },
  { name: 'GetResponse', domain: 'getresponse.com', network: 'GetResponse Affiliate', commission: '33% recurring', cookieDays: 120, status: 'active', notes: 'Good for email automation angle in affiliate marketing guides.', signupUrl: 'https://www.getresponse.com/affiliates' },
  { name: 'SurferSEO', domain: 'surferseo.com', network: 'PartnerStack', commission: '25% recurring', cookieDays: 60, status: 'active', notes: 'Content optimization tool. Works well in SEO article sections.', signupUrl: 'https://surferseo.com/affiliate-program/' },
  { name: 'Jasper AI', domain: 'jasper.ai', network: 'Impact', commission: '25% recurring', cookieDays: 45, status: 'active', notes: 'AI writing tool. Feature in tech and content creation posts.', signupUrl: 'https://www.jasper.ai/affiliates' },
  { name: 'SoFi', domain: 'sofi.com', network: 'Impact', commission: 'CPA $100+', cookieDays: 30, status: 'active', notes: 'Dedicated SoFi Bank category on site. High-value financial audience.', signupUrl: 'https://www.sofi.com/affiliates/' },
  { name: 'Kinsta', domain: 'kinsta.com', network: 'Direct', commission: 'Up to $500 + 10% recurring', cookieDays: 60, status: 'pending', notes: 'Premium hosting — mention as high-end option for serious bloggers.', signupUrl: 'https://kinsta.com/affiliates/' },
  { name: 'Zapier', domain: 'zapier.com', network: 'Direct', commission: '15% recurring', cookieDays: 30, status: 'active', notes: 'Featured in automation and no-code guides.', signupUrl: 'https://zapier.com/affiliate' },
  { name: 'Namecheap', domain: 'namecheap.com', network: 'Direct', commission: '35% first purchase', cookieDays: 30, status: 'active', notes: 'Domain + hosting rec for new bloggers.', signupUrl: 'https://www.namecheap.com/affiliates/' },
];

function productName(id: string) {
  return PRODUCTS.find(p => p.id === id)?.title || id;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(n => (
        <Star key={n} size={12} className={n <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'} />
      ))}
    </div>
  );
}

// ── Tab: Overview ─────────────────────────────────────────────────────────────
function OverviewTab({ data, analyticsData }: { data: AdminData | null; analyticsData: AnalyticsData | null }) {
  const topArticles = analyticsData?.articleStats.slice(0, 5) ?? [];
  const topEbooks = analyticsData?.ebookStats.slice(0, 3) ?? [];

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={data ? `$${data.stats.revenue}` : '—'} sub="all time from ebooks" icon={TrendingUp} accent="emerald" />
        <StatCard label="Paid Orders" value={data?.stats.paidOrders ?? '—'} sub="ebook purchases" icon={ShoppingBag} accent="amber" />
        <StatCard label="Free Entitlements" value={data ? data.stats.totalOrders - data.stats.paidOrders : '—'} sub="free access granted" icon={BookOpen} accent="sky" />
        <StatCard label="Subscribers" value={data?.stats.totalSubscribers ?? '—'} sub="newsletter list" icon={Mail} accent="violet" />
      </div>

      {/* Two-column grid: recent orders + top content */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Recent Orders" sub="Latest ebook purchases & access grants" />
          {!data ? <p className="text-slate-500 text-sm">Loading…</p> : data.orders.length === 0 ? (
            <p className="text-slate-500 text-sm">No orders yet</p>
          ) : (
            <div className="space-y-2">
              {data.orders.slice(0, 6).map(order => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0 gap-2">
                  <div className="min-w-0">
                    <div className="text-sm text-white truncate">{order.email}</div>
                    <div className="text-xs text-slate-500 truncate">{productName(order.productId)}</div>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <Badge color={order.isFree ? 'sky' : 'emerald'}>{order.isFree ? 'Free' : 'Paid'}</Badge>
                    <div className="text-[11px] text-slate-600">{formatDate(order.purchasedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <SectionHeader title="Top Content" sub="Most-viewed articles this period" />
          {!analyticsData ? <p className="text-slate-500 text-sm">Loading…</p> : topArticles.length === 0 ? (
            <p className="text-slate-500 text-sm">No view data yet — views are tracked once articles are visited.</p>
          ) : (
            <div className="space-y-2">
              {topArticles.map((a, i) => (
                <div key={a.slug} className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0">
                  <span className="text-slate-600 text-xs font-bold w-4 text-center">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{a.title}</p>
                    <p className="text-[11px] text-slate-500">{a.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-emerald-400">{a.views.toLocaleString()}</span>
                    <p className="text-[11px] text-slate-600">views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Ebook stats quick glance */}
      {topEbooks.length > 0 && (
        <Card>
          <SectionHeader title="Ebook Page Views" sub="Times each ebook landing page was viewed" />
          <div className="grid sm:grid-cols-3 gap-3">
            {topEbooks.map(e => (
              <div key={e.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
                <p className="text-xs text-white font-medium truncate mb-1">{e.title}</p>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-black text-amber-400">{e.opens}</span>
                  <Badge color={e.isFree ? 'sky' : 'amber'}>{e.isFree ? 'Free' : `$${(e.priceCents/100).toFixed(2)}`}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ── Tab: Analytics ────────────────────────────────────────────────────────────
function AnalyticsTab({ analyticsData }: { analyticsData: AnalyticsData | null }) {
  const [articleSort, setArticleSort] = useState<'views' | 'alpha'>('views');

  const sorted = analyticsData ? [...analyticsData.articleStats].sort((a, b) =>
    articleSort === 'views' ? b.views - a.views : a.title.localeCompare(b.title)
  ) : [];

  const totalViews = analyticsData?.articleStats.reduce((s, a) => s + a.views, 0) ?? 0;
  const totalEbookOpens = analyticsData?.ebookStats.reduce((s, e) => s + e.opens, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Article Views" value={totalViews.toLocaleString()} sub="all guides combined" icon={Eye} accent="emerald" />
        <StatCard label="Ebook Page Views" value={totalEbookOpens.toLocaleString()} sub="ebook landing pages" icon={BookOpen} accent="amber" />
        <StatCard label="Articles Published" value={analyticsData?.articleStats.length ?? '—'} sub="live guides" icon={FileText} accent="sky" />
        <StatCard label="Ebooks in Store" value={analyticsData?.ebookStats.length ?? '—'} sub="free + paid" icon={ShoppingBag} accent="violet" />
      </div>

      {/* Article views table */}
      <Card>
        <div className="flex items-center justify-between mb-4 gap-3">
          <SectionHeader title="Article Views" />
          <div className="flex gap-2">
            <button
              onClick={() => setArticleSort('views')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${articleSort === 'views' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
            >
              By Views
            </button>
            <button
              onClick={() => setArticleSort('alpha')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${articleSort === 'alpha' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
            >
              A–Z
            </button>
          </div>
        </div>
        {!analyticsData ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : sorted.length === 0 ? (
          <p className="text-slate-500 text-sm">No view data yet. Views are recorded as readers visit guide pages.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs border-b border-slate-800">
                  <th className="text-left pb-3 pr-4 font-medium">#</th>
                  <th className="text-left pb-3 pr-4 font-medium">Article</th>
                  <th className="text-left pb-3 pr-4 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-right pb-3 font-medium">Views</th>
                  <th className="text-right pb-3 pl-4 hidden sm:table-cell font-medium">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sorted.map((a, i) => {
                  const pct = totalViews > 0 ? ((a.views / totalViews) * 100).toFixed(1) : '0.0';
                  return (
                    <tr key={a.slug} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 pr-4 text-slate-600 text-xs">{i + 1}</td>
                      <td className="py-2.5 pr-4">
                        <a href={`/guide/${a.slug}`} target="_blank" rel="noopener"
                          className="text-white hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                          <span className="truncate max-w-[200px] sm:max-w-[320px]">{a.title}</span>
                          <ExternalLink size={10} className="shrink-0 opacity-0 group-hover:opacity-100" />
                        </a>
                      </td>
                      <td className="py-2.5 pr-4 hidden sm:table-cell">
                        <Badge color="slate">{a.category}</Badge>
                      </td>
                      <td className="py-2.5 text-right">
                        <span className="font-bold text-emerald-400">{a.views.toLocaleString()}</span>
                      </td>
                      <td className="py-2.5 pl-4 hidden sm:table-cell">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500/60 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-slate-500 w-8 text-right">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Ebook page views */}
      <Card>
        <SectionHeader title="Ebook Page Views" sub="How many times each ebook landing page was visited" />
        {!analyticsData ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : (
          <div className="space-y-3">
            {analyticsData.ebookStats.map(e => (
              <div key={e.id} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{e.title}</p>
                  <Badge color={e.isFree ? 'sky' : 'amber'}>{e.isFree ? 'Free' : `$${(e.priceCents/100).toFixed(2)}`}</Badge>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-black text-amber-400">{e.opens}</span>
                  <p className="text-[11px] text-slate-500">views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ── Tab: Reviews ──────────────────────────────────────────────────────────────
function ReviewsTab({ token }: { token: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);
  const [toast, setToast] = useState<{message:string;type:'success'|'error'}|null>(null);
  const [filter, setFilter] = useState<'all'|'pending'|'approved'>('pending');

  const showToast = (message: string, type: 'success'|'error') => setToast({ message, type });

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json() as { reviews: Review[] };
      setReviews(data.reviews || []);
    } catch { showToast('Failed to load reviews', 'error'); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  async function approve(id: string, approved: boolean) {
    setActing(id);
    try {
      await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, approved }),
      });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, approved } : r));
      showToast(approved ? 'Review approved' : 'Review hidden', 'success');
    } catch { showToast('Failed', 'error'); }
    finally { setActing(null); }
  }

  async function deleteReview(id: string) {
    if (!confirm('Delete this review permanently?')) return;
    setActing(id);
    try {
      await fetch('/api/admin/reviews', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      setReviews(prev => prev.filter(r => r.id !== id));
      showToast('Review deleted', 'success');
    } catch { showToast('Failed', 'error'); }
    finally { setActing(null); }
  }

  const filtered = reviews.filter(r => {
    if (filter === 'pending') return !r.approved;
    if (filter === 'approved') return r.approved;
    return true;
  });

  const pendingCount = reviews.filter(r => !r.approved).length;

  return (
    <div className="space-y-4">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2">
          {(['pending','approved','all'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
            >
              {f} {f === 'pending' && pendingCount > 0 && <span className="ml-1 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingCount}</span>}
              {f === 'all' && <span className="ml-1 text-slate-600">({reviews.length})</span>}
            </button>
          ))}
        </div>
        <button onClick={fetchReviews} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <Card><p className="text-slate-500 text-sm">{filter === 'pending' ? '✓ No pending reviews' : 'No reviews found'}</p></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-semibold text-white">{r.name}</span>
                    {r.role && <span className="text-xs text-slate-500">{r.role}</span>}
                    <StarRow rating={r.rating} />
                    <Badge color={r.approved ? 'emerald' : 'amber'}>{r.approved ? 'Live' : 'Pending'}</Badge>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-2">{r.text}</p>
                  <p className="text-[11px] text-slate-600">{r.date} · Submitted {formatDate(r.createdAt)}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!r.approved ? (
                    <button
                      onClick={() => approve(r.id, true)}
                      disabled={acting === r.id}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                      title="Approve"
                    >
                      <Check size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() => approve(r.id, false)}
                      disabled={acting === r.id}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                      title="Unpublish"
                    >
                      <ChevronDown size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(r.id)}
                    disabled={acting === r.id}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tab: Affiliate Programs ───────────────────────────────────────────────────
function AffiliateTab() {
  const [filter, setFilter] = useState<'all'|'active'|'pending'|'paused'>('all');
  const [expanded, setExpanded] = useState<string|null>(null);

  const filtered = AFFILIATE_PROGRAMS.filter(p => filter === 'all' || p.status === filter);
  const activeCount = AFFILIATE_PROGRAMS.filter(p => p.status === 'active').length;
  const pendingCount = AFFILIATE_PROGRAMS.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Active Programs" value={activeCount} sub="generating commissions" icon={Link2} accent="emerald" />
        <StatCard label="Pending Join" value={pendingCount} sub="to apply / set up" icon={ChevronUp} accent="amber" />
        <StatCard label="Total Programs" value={AFFILIATE_PROGRAMS.length} sub="tracked" icon={BarChart2} accent="sky" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all','active','pending','paused'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(p => (
          <Card key={p.domain} className="!p-0 overflow-hidden">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-800/40 transition-colors"
              onClick={() => setExpanded(expanded === p.domain ? null : p.domain)}
            >
              <div className="flex-1 min-w-0 flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-white">{p.name}</span>
                <Badge color={p.status === 'active' ? 'emerald' : p.status === 'pending' ? 'amber' : 'slate'}>
                  {p.status}
                </Badge>
                <span className="text-xs text-emerald-400 font-medium">{p.commission}</span>
                <span className="text-xs text-slate-500 hidden sm:inline">{p.network} · {p.cookieDays}d cookie</span>
              </div>
              {expanded === p.domain ? <ChevronUp size={14} className="text-slate-500 shrink-0" /> : <ChevronDown size={14} className="text-slate-500 shrink-0" />}
            </button>
            {expanded === p.domain && (
              <div className="border-t border-slate-800 px-4 py-3 bg-slate-800/30 space-y-2">
                <p className="text-xs text-slate-400 leading-relaxed">{p.notes}</p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>Network: <strong className="text-slate-300">{p.network}</strong></span>
                  <span>Cookie: <strong className="text-slate-300">{p.cookieDays} days</strong></span>
                  <span>Domain: <strong className="text-slate-300">{p.domain}</strong></span>
                </div>
                <a
                  href={p.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <ExternalLink size={11} />
                  {p.status === 'pending' ? 'Apply for program' : 'Program dashboard'}
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>

      <p className="text-xs text-slate-600 text-center pt-2">
        Programs are configured in <code className="text-slate-500">app/admin/AdminDashboard.tsx</code> → <code className="text-slate-500">AFFILIATE_PROGRAMS</code>
      </p>
    </div>
  );
}

// ── Tab: Orders (full table) ──────────────────────────────────────────────────
function OrdersTab({ data }: { data: AdminData | null }) {
  return (
    <Card>
      <SectionHeader title="All Orders" sub="Ebook purchases and free access grants" />
      {!data ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : data.orders.length === 0 ? (
        <p className="text-slate-500 text-sm">No orders yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs border-b border-slate-800">
                <th className="text-left pb-3 pr-4 font-medium">Email</th>
                <th className="text-left pb-3 pr-4 font-medium hidden sm:table-cell">Product</th>
                <th className="text-left pb-3 pr-4 font-medium hidden md:table-cell">Date</th>
                <th className="text-left pb-3 font-medium">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data.orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-4 text-white text-xs">{order.email}</td>
                  <td className="py-3 pr-4 text-slate-400 text-xs hidden sm:table-cell">{productName(order.productId)}</td>
                  <td className="py-3 pr-4 text-slate-500 text-xs hidden md:table-cell">{formatDate(order.purchasedAt)}</td>
                  <td className="py-3"><Badge color={order.isFree ? 'sky' : 'emerald'}>{order.isFree ? 'Free' : 'Paid'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

// ── Tab: Subscribers ──────────────────────────────────────────────────────────
function SubscribersTab({ data }: { data: AdminData | null }) {
  return (
    <Card>
      <SectionHeader title="Newsletter Subscribers" sub="Everyone who signed up for email updates" />
      {!data ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : data.subscribers.length === 0 ? (
        <p className="text-slate-500 text-sm">No subscribers yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs border-b border-slate-800">
                <th className="text-left pb-3 pr-4 font-medium">Email</th>
                <th className="text-left pb-3 pr-4 font-medium hidden sm:table-cell">Signed up</th>
                <th className="text-left pb-3 font-medium hidden md:table-cell">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data.subscribers.map(sub => (
                <tr key={sub.email} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-4 text-white text-xs">{sub.email}</td>
                  <td className="py-3 pr-4 text-slate-400 text-xs hidden sm:table-cell">{formatDate(sub.subscribedAt)}</td>
                  <td className="py-3 text-slate-500 text-xs hidden md:table-cell">{sub.source || 'website'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

// ── Tab: Grant Access ─────────────────────────────────────────────────────────
function GrantAccessTab({ user }: { user: User }) {
  const [grantEmail, setGrantEmail] = useState('');
  const [grantProduct, setGrantProduct] = useState(PRODUCTS[0]?.id || '');
  const [granting, setGranting] = useState(false);
  const [toast, setToast] = useState<{message:string;type:'success'|'error'}|null>(null);

  async function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    if (!grantEmail || !grantProduct) return;
    setGranting(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/grant-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: grantEmail, productId: grantProduct }),
      });
      if (!res.ok) throw new Error('Failed');
      setToast({ message: `Access granted to ${grantEmail}`, type: 'success' });
      setGrantEmail('');
    } catch {
      setToast({ message: 'Failed to grant access', type: 'error' });
    } finally {
      setGranting(false);
    }
  }

  return (
    <div className="max-w-md space-y-4">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Card>
        <SectionHeader title="Grant Ebook Access" sub="Give a user free access to any ebook without payment" />
        <form onSubmit={handleGrant} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">User Email</label>
            <input
              type="email" value={grantEmail} onChange={e => setGrantEmail(e.target.value)}
              placeholder="user@example.com" required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Ebook</label>
            <select value={grantProduct} onChange={e => setGrantProduct(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors">
              {PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>{p.title} {p.isFree ? '(Free)' : `($${(p.priceCents/100).toFixed(2)})`}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={granting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
            <Gift size={15} />
            {granting ? 'Granting…' : 'Grant Access'}
          </button>
        </form>
      </Card>
    </div>
  );
}

// ── Main AdminDashboard ───────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');
  const [data, setData] = useState<AdminData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [fetching, setFetching] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [idToken, setIdToken] = useState('');
  const [unread, setUnread] = useState(0);
  const [googleBusy, setGoogleBusy] = useState(false);
  const getToken = useCallback(async () => (user ? user.getIdToken() : ''), [user]);

  useEffect(() => {
    const firebaseAuth = getFirebaseAuth();
    if (!firebaseAuth) { setLoading(false); return; }
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
      setIsAdmin(!!u?.email && isAdminEmailClient(u.email));
      setLoading(false);
    });
    return unsub;
  }, []);

  const fetchAll = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    try {
      const token = await user.getIdToken();
      setIdToken(token);
      const [statsRes, analyticsRes, messagesRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/messages', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (statsRes.ok) setData(await statsRes.json() as AdminData);
      if (analyticsRes.ok) setAnalyticsData(await analyticsRes.json() as AnalyticsData);
      else setAnalyticsData({ articleStats: [], ebookStats: [], traffic: [] });
      if (messagesRes.ok) {
        const m = await messagesRes.json() as { messages?: { read: boolean }[] };
        setUnread((m.messages || []).filter(x => !x.read).length);
      }
      if (!statsRes.ok || !analyticsRes.ok) {
        setToast({ message: statsRes.status === 401 ? 'The server did not accept this sign-in' : 'Some data could not be loaded', type: 'error' });
      }
    } catch {
      setToast({ message: 'Failed to load data', type: 'error' });
    } finally {
      setFetching(false);
    }
  }, [user]);

  const verified = !!user?.emailVerified;
  useEffect(() => { if (isAdmin && verified) fetchAll(); }, [isAdmin, verified, fetchAll]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      const firebaseAuth = getFirebaseAuth();
      if (!firebaseAuth) throw new Error('Auth not configured');
      await signInWithEmailAndPassword(firebaseAuth, loginEmail, loginPassword);
    } catch {
      setLoginError('Invalid email or password');
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleGoogle() {
    setGoogleBusy(true);
    setLoginError('');
    const r = await signInWithGoogle();
    if (!r.ok) setLoginError(r.error || 'Google sign-in did not complete');
    setGoogleBusy(false);
  }

  const doSignOut = () => { const a = getFirebaseAuth(); if (a) signOut(a); };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Signed in, but not the owner: say nothing about what is behind this page.
  if (user && !isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <ShieldAlert size={28} className="mx-auto mb-3 text-slate-500" aria-hidden="true" />
          <h1 className="text-lg font-bold text-white">This page isn&apos;t available</h1>
          <p className="text-slate-400 text-sm mt-2">It is not part of your account.</p>
          <div className="mt-6 flex flex-col gap-2">
            <a href="/" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl text-sm">Back to the site</a>
            <button onClick={doSignOut} className="text-slate-400 hover:text-white text-sm py-2 cursor-pointer">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  // The owner, signed in with a password on an address that was never verified.
  // The server only accepts a verified email, so send them to Google sign-in.
  if (user && isAdmin && !verified) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <ShieldAlert size={28} className="mx-auto mb-3 text-amber-400" aria-hidden="true" />
          <h1 className="text-lg font-bold text-white">Confirm it&apos;s you</h1>
          <p className="text-slate-400 text-sm mt-2">For safety, the admin console only opens for a verified email. Sign in with your Google account to continue.</p>
          {loginError && <p className="text-red-400 text-sm mt-3">{loginError}</p>}
          <div className="mt-6 flex flex-col gap-2">
            <button onClick={async () => { doSignOut(); await handleGoogle(); }} disabled={googleBusy}
              className="bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-900 font-semibold py-3 rounded-xl text-sm cursor-pointer">
              {googleBusy ? 'Opening Google…' : 'Continue with Google'}
            </button>
            <button onClick={doSignOut} className="text-slate-400 hover:text-white text-sm py-2 cursor-pointer">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <LayoutDashboard size={24} className="text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-white">Owner sign-in</h1>
            <p className="text-slate-400 text-sm mt-1">JaysMoneyGuides</p>
          </div>
          <button type="button" onClick={handleGoogle} disabled={googleBusy}
            className="w-full bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-900 font-semibold py-3 rounded-xl transition-colors text-sm cursor-pointer">
            {googleBusy ? 'Opening Google…' : 'Continue with Google'}
          </button>
          <div className="my-4 flex items-center gap-3 text-[11px] uppercase tracking-wider text-slate-600">
            <span className="h-px flex-1 bg-slate-800" />or<span className="h-px flex-1 bg-slate-800" />
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
              placeholder="Email" required autoComplete="email" aria-label="Email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" />
            <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
              placeholder="Password" required autoComplete="current-password" aria-label="Password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" />
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button type="submit" disabled={loggingIn}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm cursor-pointer">
              {loggingIn ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'traffic', label: 'Traffic', icon: Activity },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unread },
    { id: 'analytics', label: 'Content', icon: BarChart2 },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'subscribers', label: 'Subscribers', icon: Mail },
    { id: 'affiliate', label: 'Affiliate', icon: Link2 },
    { id: 'access', label: 'Grant Access', icon: Gift },
  ];

  return (
    <div className="min-h-[70vh] bg-slate-950 text-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={17} className="text-emerald-400" />
            <span className="font-bold text-sm">Admin</span>
            <span className="text-slate-600 text-sm hidden sm:inline">· JaysMoneyGuides</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchAll} disabled={fetching}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Refresh data">
              <RefreshCw size={14} className={fetching ? 'animate-spin' : ''} />
            </button>
            <a href="/" target="_blank" rel="noopener"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs">
              <ExternalLink size={12} /> View Site
            </a>
            <span className="text-slate-500 text-xs hidden md:inline truncate max-w-[160px]">{user.email}</span>
            <button onClick={doSignOut}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab bar — scrollable on mobile */}
        <div className="overflow-x-auto mb-6 -mx-4 px-4">
          <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 min-w-max">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors relative ${tab === t.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                <t.icon size={13} />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.label.split(' ')[0]}</span>
                {!!t.badge && <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">{t.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {tab === 'overview' && <OverviewTab data={data} analyticsData={analyticsData} />}
        {tab === 'traffic' && <TrafficTab traffic={analyticsData ? analyticsData.traffic ?? [] : null} />}
        {tab === 'messages' && <MessagesTab getToken={getToken} onUnread={setUnread} />}
        {tab === 'analytics' && <AnalyticsTab analyticsData={analyticsData} />}
        {tab === 'reviews' && <ReviewsTab token={idToken} />}
        {tab === 'orders' && <OrdersTab data={data} />}
        {tab === 'subscribers' && <SubscribersTab data={data} />}
        {tab === 'affiliate' && <AffiliateTab />}
        {tab === 'access' && <GrantAccessTab user={user} />}
      </div>
    </div>
  );
}

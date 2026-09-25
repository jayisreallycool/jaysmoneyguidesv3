'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFirebaseAuth } from '@/lib/firebase-client';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import {
  LayoutDashboard, ShoppingBag, Users, BookOpen,
  LogOut, RefreshCw, Gift, TrendingUp, Mail, X, CheckCircle, AlertCircle
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products';

type Tab = 'overview' | 'orders' | 'subscribers' | 'ebooks';

interface Stats {
  totalOrders: number;
  totalSubscribers: number;
  revenue: string;
  paidOrders: number;
}

interface Order {
  id: string;
  email: string;
  productId: string;
  purchasedAt: string;
  isFree: boolean;
  stripeSessionId: string;
}

interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

interface AdminData {
  stats: Stats;
  orders: Order[];
  subscribers: Subscriber[];
}

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-xl ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon }: { label: string; value: string | number; sub?: string; icon: React.ElementType }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-slate-400 text-sm">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <Icon size={16} className="text-emerald-400" />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}

function formatDate(iso: string) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  catch { return iso; }
}

function productName(id: string) {
  return PRODUCTS.find(p => p.id === id)?.title || id;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');
  const [data, setData] = useState<AdminData | null>(null);
  const [fetching, setFetching] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [grantEmail, setGrantEmail] = useState('');
  const [grantProduct, setGrantProduct] = useState(PRODUCTS[0]?.id || '');
  const [granting, setGranting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  // Client-side admin check (mirrors server list)
  function isAdminClient(email: string) {
    return ['jayisreallycool@gmail.com', 'buddhacmd02@gmail.com'].includes(email.toLowerCase());
  }

  useEffect(() => {
    const firebaseAuth = getFirebaseAuth();
    if (!firebaseAuth) { setLoading(false); return; }
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
      setIsAdmin(!!u?.email && isAdminClient(u.email));
      setLoading(false);
    });
    return unsub;
  }, []);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed');
      setData(await res.json());
    } catch {
      showToast('Failed to load data', 'error');
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => { if (isAdmin) fetchData(); }, [isAdmin, fetchData]);

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

  async function handleGrantAccess(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !grantEmail || !grantProduct) return;
    setGranting(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/grant-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: grantEmail, productId: grantProduct }),
      });
      if (!res.ok) throw new Error('Failed');
      showToast(`Access granted to ${grantEmail}`, 'success');
      setGrantEmail('');
      fetchData();
    } catch {
      showToast('Failed to grant access', 'error');
    } finally {
      setGranting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <LayoutDashboard size={24} className="text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Login</h1>
            <p className="text-slate-400 text-sm mt-1">JaysMoneyGuides</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
              placeholder="Email" required autoComplete="email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
              placeholder="Password" required autoComplete="current-password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button type="submit" disabled={loggingIn}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
              {loggingIn ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'subscribers', label: 'Subscribers', icon: Mail },
    { id: 'ebooks', label: 'Grant Access', icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} className="text-emerald-400" />
            <span className="font-semibold text-sm">Admin</span>
            <span className="text-slate-600 text-sm hidden sm:inline">· JaysMoneyGuides</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchData} disabled={fetching}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <RefreshCw size={15} className={fetching ? 'animate-spin' : ''} />
            </button>
            <span className="text-slate-400 text-xs hidden sm:inline">{user.email}</span>
            <button onClick={() => { const a = getFirebaseAuth(); if (a) signOut(a); }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 mb-6 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-1 justify-center ${tab === t.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}>
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Revenue" value={data ? `$${data.stats.revenue}` : '—'} sub="all time" icon={TrendingUp} />
              <StatCard label="Paid Orders" value={data?.stats.paidOrders ?? '—'} sub="ebook purchases" icon={ShoppingBag} />
              <StatCard label="Entitlements" value={data?.stats.totalOrders ?? '—'} sub="incl. free access" icon={BookOpen} />
              <StatCard label="Subscribers" value={data?.stats.totalSubscribers ?? '—'} sub="newsletter" icon={Users} />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4 text-sm">Recent Orders</h2>
              {!data ? (
                <div className="text-slate-500 text-sm">Loading…</div>
              ) : data.orders.length === 0 ? (
                <div className="text-slate-500 text-sm">No orders yet</div>
              ) : (
                <div className="space-y-2">
                  {data.orders.map(order => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0 gap-2">
                      <div className="min-w-0">
                        <div className="text-sm text-white truncate">{order.email}</div>
                        <div className="text-xs text-slate-500 truncate">{productName(order.productId)}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.isFree ? 'bg-sky-500/10 text-sky-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {order.isFree ? 'Free' : '$9.99'}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{formatDate(order.purchasedAt)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-semibold text-white mb-4 text-sm">All Recent Orders</h2>
            {!data ? (
              <div className="text-slate-500 text-sm">Loading…</div>
            ) : data.orders.length === 0 ? (
              <div className="text-slate-500 text-sm">No orders yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-500 text-xs">
                      <th className="text-left pb-3 pr-4">Email</th>
                      <th className="text-left pb-3 pr-4">Product</th>
                      <th className="text-left pb-3 pr-4">Date</th>
                      <th className="text-left pb-3">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {data.orders.map(order => (
                      <tr key={order.id}>
                        <td className="py-3 pr-4 text-white">{order.email}</td>
                        <td className="py-3 pr-4 text-slate-300 text-xs">{productName(order.productId)}</td>
                        <td className="py-3 pr-4 text-slate-400 text-xs">{formatDate(order.purchasedAt)}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.isFree ? 'bg-sky-500/10 text-sky-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            {order.isFree ? 'Free' : 'Paid'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Subscribers */}
        {tab === 'subscribers' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-semibold text-white mb-4 text-sm">Newsletter Subscribers</h2>
            {!data ? (
              <div className="text-slate-500 text-sm">Loading…</div>
            ) : data.subscribers.length === 0 ? (
              <div className="text-slate-500 text-sm">No subscribers yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-500 text-xs">
                      <th className="text-left pb-3 pr-4">Email</th>
                      <th className="text-left pb-3 pr-4">Date</th>
                      <th className="text-left pb-3">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {data.subscribers.map(sub => (
                      <tr key={sub.email}>
                        <td className="py-3 pr-4 text-white">{sub.email}</td>
                        <td className="py-3 pr-4 text-slate-400 text-xs">{formatDate(sub.subscribedAt)}</td>
                        <td className="py-3 text-slate-400 text-xs">{sub.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Grant Access */}
        {tab === 'ebooks' && (
          <div className="max-w-md">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-1 text-sm">Grant Ebook Access</h2>
              <p className="text-slate-400 text-xs mb-5">Manually give a user access to any ebook without payment.</p>
              <form onSubmit={handleGrantAccess} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">User Email</label>
                  <input
                    type="email" value={grantEmail} onChange={e => setGrantEmail(e.target.value)}
                    placeholder="user@example.com" required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">Ebook</label>
                  <select value={grantProduct} onChange={e => setGrantProduct(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500">
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" disabled={granting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                  <Gift size={15} />
                  {granting ? 'Granting…' : 'Grant Access'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

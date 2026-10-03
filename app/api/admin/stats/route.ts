import { adminDb, verifyAdminRequest } from '@/lib/firebase-admin';
import { PRODUCTS } from '@/lib/products';

export const runtime = 'nodejs';

const verifyAdmin = (req: Request) => verifyAdminRequest(req);

export async function GET(req: Request) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const db = adminDb();
  if (!db) return Response.json({ error: 'Firebase not configured' }, { status: 503 });

  try {
    const [entSnap, subSnap] = await Promise.all([
      db.collection('entitlements').get(),
      db.collection('subscribers').get(),
    ]);

    // Revenue estimate: each paid order at that ebook's current list price
    // (discounts, refunds and Stripe fees are not included — Stripe has the exact figure).
    const priceOf = new Map(PRODUCTS.map(p => [p.id, p.isFree ? 0 : p.priceCents]));
    const paidEntitlements = entSnap.docs.filter(d => !d.data()?.isFree && (priceOf.get(d.data()?.productId) ?? 1) > 0);
    const revenue = paidEntitlements.reduce((sum, d) => sum + (priceOf.get(d.data()?.productId) ?? 0), 0) / 100;

    // Orders, newest first
    const orders = entSnap.docs
      .sort((a, b) => {
        const aTime = a.data()?.purchasedAt || a.data()?.grantedAt || '';
        const bTime = b.data()?.purchasedAt || b.data()?.grantedAt || '';
        return bTime.localeCompare(aTime);
      })
      .slice(0, 2000)
      .map(doc => ({
        id: doc.id,
        email: doc.data()?.email || '',
        productId: doc.data()?.productId || '',
        purchasedAt: doc.data()?.purchasedAt || doc.data()?.grantedAt || '',
        isFree: doc.data()?.isFree || (priceOf.get(doc.data()?.productId) ?? 1) === 0,
        stripeSessionId: doc.data()?.stripeSessionId || '',
      }));

    // Subscribers, newest first
    const subscribers = subSnap.docs
      .sort((a, b) => {
        const aTime = a.data()?.subscribedAt || '';
        const bTime = b.data()?.subscribedAt || '';
        return bTime.localeCompare(aTime);
      })
      .slice(0, 2000)
      .map(doc => ({
        email: doc.data()?.email || doc.id,
        subscribedAt: doc.data()?.subscribedAt || '',
        source: doc.data()?.source || 'website',
      }));

    return Response.json({
      stats: {
        totalOrders: entSnap.size,
        totalSubscribers: subSnap.size,
        revenue: revenue.toFixed(2),
        paidOrders: paidEntitlements.length,
      },
      orders,
      subscribers,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

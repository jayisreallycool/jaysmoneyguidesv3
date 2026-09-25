import { adminAuth, adminDb, isAdminEmail } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

async function verifyAdmin(req: Request): Promise<boolean> {
  const auth = adminAuth();
  if (!auth) return false;
  const authorization = req.headers.get('authorization') || '';
  if (!authorization.startsWith('Bearer ')) return false;
  try {
    const decoded = await auth.verifyIdToken(authorization.slice(7).trim());
    return isAdminEmail(decoded.email);
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const db = adminDb();
  if (!db) return Response.json({ error: 'Firebase not configured' }, { status: 503 });

  try {
    const [entSnap, subSnap] = await Promise.all([
      db.collection('entitlements').get(),
      db.collection('subscribers').get(),
    ]);

    // Revenue: count paid entitlements × $9.99
    const paidEntitlements = entSnap.docs.filter(d => !d.data()?.isFree);
    const revenue = paidEntitlements.length * 9.99;

    // Recent orders (last 10)
    const orders = entSnap.docs
      .sort((a, b) => {
        const aTime = a.data()?.purchasedAt || a.data()?.grantedAt || '';
        const bTime = b.data()?.purchasedAt || b.data()?.grantedAt || '';
        return bTime.localeCompare(aTime);
      })
      .slice(0, 10)
      .map(doc => ({
        id: doc.id,
        email: doc.data()?.email || '',
        productId: doc.data()?.productId || '',
        purchasedAt: doc.data()?.purchasedAt || doc.data()?.grantedAt || '',
        isFree: doc.data()?.isFree || false,
        stripeSessionId: doc.data()?.stripeSessionId || '',
      }));

    // Subscribers list (last 10)
    const subscribers = subSnap.docs
      .sort((a, b) => {
        const aTime = a.data()?.subscribedAt || '';
        const bTime = b.data()?.subscribedAt || '';
        return bTime.localeCompare(aTime);
      })
      .slice(0, 10)
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

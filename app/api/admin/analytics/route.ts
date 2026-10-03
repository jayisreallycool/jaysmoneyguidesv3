import { adminDb, verifyAdminRequest } from '@/lib/firebase-admin';
import { NextRequest } from 'next/server';
import { INITIAL_POSTS } from '@/lib/posts-data/initialPosts';
import { PRODUCTS } from '@/lib/products';

export const runtime = 'nodejs';

interface TrafficDay {
  date: string;
  views: number;
  visits: number;
  pages: Record<string, number>;
  referrers: Record<string, number>;
  devices: Record<string, number>;
  countries: Record<string, number>;
}

const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
function counts(v: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (v && typeof v === 'object') for (const [k, n] of Object.entries(v)) if (num(n) > 0) out[k] = num(n);
  return out;
}

const verifyAdmin = (req: Request) => verifyAdminRequest(req);

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const db = adminDb();
  if (!db) return Response.json({ error: 'DB unavailable' }, { status: 503 });

  try {
    // Fetch article view counts from Firestore (written by /api/analytics/view)
    const [viewsSnap, ebookSnap] = await Promise.all([
      db.collection('article_views').get(),
      db.collection('ebook_opens').get(),
    ]);

    // Map slug → view count
    const viewsBySlug: Record<string, number> = {};
    viewsSnap.docs.forEach(d => {
      viewsBySlug[d.id] = (d.data().count as number) || 0;
    });

    // Map productId → open count
    const opensByProduct: Record<string, number> = {};
    ebookSnap.docs.forEach(d => {
      opensByProduct[d.id] = (d.data().count as number) || 0;
    });

    // Merge with post metadata
    const articleStats = INITIAL_POSTS.map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      views: viewsBySlug[p.slug] ?? 0,
    })).sort((a, b) => b.views - a.views);

    // Merge with product metadata
    const ebookStats = PRODUCTS.map(p => ({
      id: p.id,
      title: p.title,
      isFree: p.isFree,
      priceCents: p.priceCents,
      opens: opensByProduct[p.id] ?? 0,
    })).sort((a, b) => b.opens - a.opens);

    // Site traffic: the last 30 days of daily totals (written by /api/analytics/hit).
    // Kept separate so a problem here never hides the stats above.
    let traffic: TrafficDay[] = [];
    try {
      const days: string[] = [];
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
        days.push(new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i)).toISOString().slice(0, 10));
      }
      const snaps = await db.getAll(...days.map(d => db.collection('traffic_daily').doc(d)));
      traffic = snaps.map((snap, i) => {
        const d = snap.exists ? snap.data() ?? {} : {};
        return {
          date: days[i],
          views: num(d.views),
          visits: num(d.visits),
          pages: counts(d.pages),
          referrers: counts(d.referrers),
          devices: counts(d.devices),
          countries: counts(d.countries),
        };
      });
    } catch (err) {
      console.error('[admin analytics] traffic', err);
    }

    return Response.json({ articleStats, ebookStats, traffic });
  } catch (err) {
    console.error('[admin analytics]', err);
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}

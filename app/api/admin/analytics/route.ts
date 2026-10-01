import { adminAuth, adminDb, isAdminEmail } from '@/lib/firebase-admin';
import { NextRequest } from 'next/server';
import { INITIAL_POSTS } from '@/lib/posts-data/initialPosts';
import { PRODUCTS } from '@/lib/products';

export const runtime = 'nodejs';

async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const auth = adminAuth();
  if (!auth) return false;
  const authorization = req.headers.get('authorization') || '';
  if (!authorization.startsWith('Bearer ')) return false;
  try {
    const decoded = await auth.verifyIdToken(authorization.slice(7).trim());
    return isAdminEmail(decoded.email);
  } catch { return false; }
}

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

    return Response.json({ articleStats, ebookStats });
  } catch (err) {
    console.error('[admin analytics]', err);
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}

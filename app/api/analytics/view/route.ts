/**
 * POST /api/analytics/view
 * Body: { slug: string, type: 'article' | 'ebook' }
 *
 * Increments a Firestore counter for article views or ebook opens.
 * Called client-side on page load — no auth required (public write).
 * Rate-limiting is handled by Firestore security rules (one write per path per second
 * is Firestore's own limit, and counter fields use FieldValue.increment which is atomic).
 */

import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

// Simple in-memory dedup: don't count the same slug twice from same IP in 10 min
const recentHits = new Map<string, number>();
const DEDUP_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { slug?: string; type?: string };
    const slug = typeof body.slug === 'string' ? body.slug.trim().slice(0, 200) : '';
    const type = body.type === 'ebook' ? 'ebook' : 'article';
    if (!slug) return Response.json({ ok: false }, { status: 400 });

    // Dedup by IP+slug
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'x';
    const key = `${ip}:${type}:${slug}`;
    const now = Date.now();
    if (recentHits.has(key) && now - recentHits.get(key)! < DEDUP_MS) {
      return Response.json({ ok: true, deduped: true });
    }
    recentHits.set(key, now);

    // Prune old entries to avoid memory leak
    if (recentHits.size > 5000) {
      for (const [k, t] of recentHits) {
        if (now - t > DEDUP_MS) recentHits.delete(k);
      }
    }

    const db = adminDb();
    if (!db) return Response.json({ ok: false }, { status: 503 });

    const collection = type === 'ebook' ? 'ebook_opens' : 'article_views';
    await db.collection(collection).doc(slug).set(
      { count: FieldValue.increment(1), lastSeen: new Date() },
      { merge: true }
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[analytics/view]', err);
    return Response.json({ ok: false }, { status: 500 });
  }
}

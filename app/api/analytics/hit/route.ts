/**
 * POST /api/analytics/hit
 * Body: { path: string, ref?: string, w?: number, entry?: boolean }
 *
 * First-party, cookieless page-view counter for the admin Traffic tab.
 * It adds 1 to today's totals in Firestore (traffic_daily/<YYYY-MM-DD>) —
 * nothing about the individual visitor is stored: no cookie, no id, no IP,
 * no user-agent. The IP is only held in memory for a few minutes to stop
 * one client from flooding the counter.
 */

import { NextRequest } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase-admin';
import { INITIAL_POSTS } from '@/lib/posts-data/initialPosts';
import { PRODUCTS } from '@/lib/products';

export const runtime = 'nodejs';

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|monitor|curl|wget|python|axios|node-fetch|scrapy|facebookexternalhit|whatsapp/i;

const STATIC_PAGES = new Set([
  '/', '/ebooks', '/tools', '/about', '/contact', '/sofi-bank',
  '/privacy', '/terms', '/disclaimer', '/cookie-policy',
]);
const GUIDE_SLUGS = new Set(INITIAL_POSTS.map((p) => p.slug));
const EBOOK_IDS = new Set(PRODUCTS.map((p) => p.id));

/** Only real pages of this site get their own row; anything else is "(other)". */
function pageKey(raw: string): string | null {
  let path = raw.split('?')[0].split('#')[0].trim();
  if (!path.startsWith('/') || path.length > 200) return null;
  if (path.length > 1) path = path.replace(/\/+$/, '');
  if (path.startsWith('/admin') || path.startsWith('/api')) return null; // never counted
  if (STATIC_PAGES.has(path)) return path;
  const [, section, slug, extra] = path.split('/');
  if (!extra && slug) {
    if (section === 'guide' && GUIDE_SLUGS.has(slug)) return path;
    if (section === 'ebooks' && EBOOK_IDS.has(slug)) return path;
    if (section === 'category') return '/category';
  }
  return '(other)';
}

/** Where the visitor came from: a bare host name, or "direct". */
function referrerKey(raw: unknown, ownHost: string): string | null {
  if (typeof raw !== 'string' || !raw) return 'direct';
  try {
    const host = new URL(raw).hostname.toLowerCase().replace(/^www\./, '');
    if (!/^[a-z0-9.-]{3,80}$/.test(host)) return null;
    if (host === ownHost.replace(/^www\./, '')) return null; // moving around inside the site
    return host;
  } catch {
    return null;
  }
}

// Flood guard: at most 40 counted views per client per 10 minutes.
const WINDOW_MS = 10 * 60_000;
const LIMIT = 40;
const seen = new Map<string, { n: number; at: number }>();

function allowed(ip: string): boolean {
  const now = Date.now();
  const hit = seen.get(ip);
  if (!hit || now - hit.at > WINDOW_MS) {
    seen.set(ip, { n: 1, at: now });
    if (seen.size > 5000) for (const [k, v] of seen) if (now - v.at > WINDOW_MS) seen.delete(k);
    return true;
  }
  hit.n += 1;
  return hit.n <= LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    if (BOT.test(req.headers.get('user-agent') || '')) return Response.json({ ok: true, skipped: true });

    const body = (await req.json()) as { path?: unknown; ref?: unknown; w?: unknown; entry?: unknown };
    const page = typeof body.path === 'string' ? pageKey(body.path) : null;
    if (!page) return Response.json({ ok: true, skipped: true });

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'x';
    if (!allowed(ip)) return Response.json({ ok: true, skipped: true });

    const db = adminDb();
    if (!db) return Response.json({ ok: false }, { status: 503 });

    const inc = FieldValue.increment(1);
    const update: Record<string, unknown> = { views: inc, pages: { [page]: inc } };

    // A "visit" is a page view that arrived from outside the site (or directly).
    if (body.entry === true) {
      update.visits = inc;
      const ref = referrerKey(body.ref, req.headers.get('host')?.split(':')[0]?.toLowerCase() || '');
      if (ref) update.referrers = { [ref]: inc };

      const w = typeof body.w === 'number' ? body.w : 0;
      const device = w > 0 && w < 640 ? 'Phone' : w > 0 && w < 1024 ? 'Tablet' : 'Computer';
      update.devices = { [device]: inc };

      const country = (req.headers.get('x-vercel-ip-country') || '').toUpperCase();
      if (/^[A-Z]{2}$/.test(country)) update.countries = { [country]: inc };
    }

    const day = new Date().toISOString().slice(0, 10); // UTC day
    await db.collection('traffic_daily').doc(day).set(update, { merge: true });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[analytics/hit]', err);
    return Response.json({ ok: false }, { status: 500 });
  }
}

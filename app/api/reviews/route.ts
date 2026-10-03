import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

// Rate-limit: simple in-memory per-IP counter (resets on cold start).
// Good enough for a personal site — no Redis needed.
const SUBMIT_LIMIT = 3; // max submissions per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ipCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= SUBMIT_LIMIT) return false;
  entry.count++;
  return true;
}

// GET — fetch approved reviews (newest first, capped at 50)
export async function GET() {
  try {
    const db = adminDb();
    if (!db) return NextResponse.json({ reviews: [] });

    // Filter only, then sort here. Filtering AND ordering in the query needs a
    // hand-made Firestore index; without it the query fails and the site
    // would silently show no reviews at all.
    const snap = await db.collection('reviews').where('approved', '==', true).limit(300).get();
    const millis = (v: unknown) =>
      typeof (v as { toMillis?: () => number })?.toMillis === 'function' ? (v as { toMillis: () => number }).toMillis() : 0;
    const docs = [...snap.docs].sort((x, y) => millis(y.data().createdAt) - millis(x.data().createdAt)).slice(0, 50);

    const reviews = docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name as string,
        avatar: data.avatar as string,
        role: (data.role as string | null) || undefined,
        about: (data.about as string | null) || undefined,
        rating: data.rating as number,
        text: data.text as string,
        date: data.date as string,
      };
    });

    return NextResponse.json({ reviews }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' },
    });
  } catch (err) {
    console.error('[reviews GET]', err);
    return NextResponse.json({ reviews: [] });
  }
}

// POST — submit a new review (stored as pending approval)
export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many submissions. Try again later.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 50) : '';
  const role = typeof body.role === 'string' ? body.role.trim().slice(0, 40) : '';
  // Which guide/ebook the review is about (set when the form is opened from a reading prompt)
  const about = typeof body.about === 'string' ? body.about.trim().slice(0, 80) : '';
  const rating = typeof body.rating === 'number' ? Math.round(body.rating) : 0;
  const text = typeof body.text === 'string' ? body.text.trim().slice(0, 500) : '';

  if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  if (rating < 1 || rating > 5) return NextResponse.json({ error: 'Rating must be 1–5.' }, { status: 400 });
  if (text.length < 20) return NextResponse.json({ error: 'Review must be at least 20 characters.' }, { status: 400 });

  // Build avatar initials
  const avatar = name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
  const date = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  try {
    const db = adminDb();
    if (!db) throw new Error('DB unavailable');

    await db.collection('reviews').add({
      name,
      avatar,
      role: role || null,
      about: about || null,
      rating,
      text,
      date,
      approved: false, // admin must approve before it appears
      createdAt: new Date(),
      ip,
    });

    return NextResponse.json({ ok: true, date, avatar });
  } catch (err) {
    console.error('[reviews POST]', err);
    return NextResponse.json({ error: 'Failed to save review. Please try again.' }, { status: 500 });
  }
}

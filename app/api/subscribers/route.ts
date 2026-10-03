import { adminDb } from '@/lib/firebase-admin';
import { allow, clientIp } from '@/lib/rate-limit.server';

export const runtime = 'nodejs';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCES = new Set(['hero', 'footer', 'popup', 'website']);

function readEmail(body: unknown): string {
  const raw = (body as { email?: unknown })?.email;
  const email = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
  return email.length <= 254 && EMAIL.test(email) ? email : '';
}

// POST — join the newsletter list
export async function POST(req: Request) {
  try {
    if (!allow(`sub:${clientIp(req)}`, 5, 10 * 60_000)) {
      return Response.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
    }
    const body = await req.json().catch(() => null);
    const email = readEmail(body);
    if (!email) return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });

    // Hidden field real people never fill in — bots do. Pretend it worked.
    if (typeof body?.website === 'string' && body.website) return Response.json({ success: true });

    const rawSource = typeof body?.source === 'string' ? body.source : 'website';
    const source = SOURCES.has(rawSource) ? rawSource : 'website';

    const db = adminDb();
    if (!db) return Response.json({ error: 'Sign-ups are not available right now. Please try again later.' }, { status: 503 });

    // Keep the original sign-up date if this address is already on the list.
    const ref = db.collection('subscribers').doc(email);
    const existing = await ref.get();
    if (existing.exists) return Response.json({ success: true, already: true });

    await ref.set({ email, subscribedAt: new Date().toISOString(), source });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Subscriber API error:', error);
    return Response.json({ error: 'We could not sign you up right now. Please try again.' }, { status: 500 });
  }
}

// DELETE — leave the list (used by the /unsubscribe page)
export async function DELETE(req: Request) {
  try {
    if (!allow(`unsub:${clientIp(req)}`, 5, 10 * 60_000)) {
      return Response.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
    }
    const email = readEmail(await req.json().catch(() => null));
    if (!email) return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });

    const db = adminDb();
    if (!db) return Response.json({ error: 'This is not available right now. Please try again later.' }, { status: 503 });

    // Same answer whether or not the address was on the list.
    await db.collection('subscribers').doc(email).delete();
    return Response.json({ success: true });
  } catch (error) {
    console.error('Unsubscribe API error:', error);
    return Response.json({ error: 'We could not process that right now. Please try again.' }, { status: 500 });
  }
}

import { adminDb } from '@/lib/firebase-admin';
import { allow, clientIp } from '@/lib/rate-limit.server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    if (!allow(`contact:${clientIp(req)}`, 4, 30 * 60_000)) {
      return Response.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
    }
    const body = await req.json();
    // Hidden field real people never fill in — bots do. Pretend it worked.
    if (typeof body?.website === 'string' && body.website) return Response.json({ success: true });
    const name = typeof body?.name === 'string' ? body.name.trim().slice(0, 120) : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const subject = typeof body?.subject === 'string' ? body.subject.trim().slice(0, 200) : '';
    const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 5000) : '';
    if (!name || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) return Response.json({ error: 'Please add your name, a valid email and a message of at least 10 characters.' }, { status: 400 });
    const db = adminDb();
    if (!db) return Response.json({ error: 'Messages can not be sent right now. Please email us instead.' }, { status: 503 });
    await db.collection('contacts').add({ name, email, subject, message, createdAt: new Date().toISOString(), read: false });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return Response.json({ error: 'We could not send your message right now. Please email us instead.' }, { status: 500 });
  }
}

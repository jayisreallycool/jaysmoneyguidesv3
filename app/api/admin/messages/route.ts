import { adminDb, verifyAdminRequest } from '@/lib/firebase-admin';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const unauthorized = () => Response.json({ error: 'Unauthorized' }, { status: 401 });
const noDb = () => Response.json({ error: 'DB unavailable' }, { status: 503 });

// GET — contact-form messages, newest first
export async function GET(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) return unauthorized();
  const db = adminDb();
  if (!db) return noDb();

  try {
    const snap = await db.collection('contacts').orderBy('createdAt', 'desc').limit(200).get();
    const messages = snap.docs.map((d) => {
      const m = d.data();
      return {
        id: d.id,
        name: String(m.name || ''),
        email: String(m.email || ''),
        subject: String(m.subject || ''),
        message: String(m.message || ''),
        createdAt: typeof m.createdAt === 'string' ? m.createdAt : m.createdAt?.toDate?.()?.toISOString() ?? '',
        read: m.read === true,
        repliedAt: typeof m.repliedAt === 'string' ? m.repliedAt : '',
      };
    });
    return Response.json({ messages });
  } catch (err) {
    console.error('[admin messages]', err);
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}

// PATCH — mark read / unread, or record that a reply was sent
export async function PATCH(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) return unauthorized();
  const db = adminDb();
  if (!db) return noDb();

  const { id, read, replied } = (await req.json()) as { id?: string; read?: boolean; replied?: boolean };
  if (!id || typeof id !== 'string') return Response.json({ error: 'Missing id' }, { status: 400 });

  const update: Record<string, unknown> = {};
  if (typeof read === 'boolean') update.read = read;
  if (replied === true) { update.repliedAt = new Date().toISOString(); update.read = true; }
  if (replied === false) update.repliedAt = '';
  if (Object.keys(update).length === 0) return Response.json({ error: 'Nothing to change' }, { status: 400 });

  await db.collection('contacts').doc(id).update(update);
  return Response.json({ ok: true, ...update });
}

// DELETE — remove a message permanently
export async function DELETE(req: NextRequest) {
  if (!(await verifyAdminRequest(req))) return unauthorized();
  const db = adminDb();
  if (!db) return noDb();

  const { id } = (await req.json()) as { id?: string };
  if (!id || typeof id !== 'string') return Response.json({ error: 'Missing id' }, { status: 400 });

  await db.collection('contacts').doc(id).delete();
  return Response.json({ ok: true });
}

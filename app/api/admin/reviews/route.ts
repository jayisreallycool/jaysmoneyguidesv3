import { adminAuth, adminDb, isAdminEmail } from '@/lib/firebase-admin';
import { NextRequest } from 'next/server';

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

// GET — list all pending + approved reviews
export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const db = adminDb();
  if (!db) return Response.json({ error: 'DB unavailable' }, { status: 503 });

  const snap = await db.collection('reviews').orderBy('createdAt', 'desc').limit(100).get();
  const reviews = snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.()?.toISOString() ?? '',
  }));
  return Response.json({ reviews });
}

// PATCH — approve or reject a review
export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const db = adminDb();
  if (!db) return Response.json({ error: 'DB unavailable' }, { status: 503 });

  const { id, approved } = await req.json() as { id: string; approved: boolean };
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });

  await db.collection('reviews').doc(id).update({ approved });
  return Response.json({ ok: true });
}

// DELETE — remove a review permanently
export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const db = adminDb();
  if (!db) return Response.json({ error: 'DB unavailable' }, { status: 503 });

  const { id } = await req.json() as { id: string };
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });

  await db.collection('reviews').doc(id).delete();
  return Response.json({ ok: true });
}

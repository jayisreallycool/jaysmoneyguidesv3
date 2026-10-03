import { adminDb, verifyAdminRequest } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

const verifyAdmin = (req: Request) => verifyAdminRequest(req);

export async function POST(req: Request) {
  if (!(await verifyAdmin(req))) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const db = adminDb();
  if (!db) return Response.json({ error: 'Firebase not configured' }, { status: 503 });

  try {
    const { email, productId } = await req.json();
    if (!email || !productId) return Response.json({ error: 'email and productId required' }, { status: 400 });

    const cleanEmail = email.trim().toLowerCase();
    const docId = `${cleanEmail}__${productId}`; // double underscore — must match verify-purchase and download-ebook

    await db.collection('entitlements').doc(docId).set({
      email: cleanEmail,
      productId,
      grantedAt: new Date().toISOString(),
      isFree: true,
      grantedByAdmin: true,
    }, { merge: true });

    return Response.json({ success: true, docId });
  } catch (error) {
    console.error('Grant access error:', error);
    return Response.json({ error: 'Failed to grant access' }, { status: 500 });
  }
}

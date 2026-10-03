import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase-admin';
import { getProductConfig } from '@/lib/ebook-access.server';
import { grantEntitlements, isPaid, sessionEmails } from '@/lib/purchases.server';

export const runtime = 'nodejs';

/**
 * Called by the browser when Stripe sends the buyer back
 * (/?purchase=success&session_id=…&product=…). Confirms the session is paid
 * for that product and records the entitlement in case the webhook is late
 * or not set up. The buyer is told "verified" whenever the payment is real —
 * a storage hiccup must never show a paying customer an error.
 */
export async function GET(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: 'Not configured' }, { status: 503 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id');
  const productId = url.searchParams.get('product');
  if (!sessionId || !productId) {
    return Response.json({ error: 'Missing session_id or product' }, { status: 400 });
  }
  if (!/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(sessionId)) {
    return Response.json({ error: 'Invalid session' }, { status: 400 });
  }

  const product = getProductConfig(productId);
  if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // The session must have been created for this exact product. This blocks
    // reusing a receipt for product A to unlock product B.
    if (session.metadata?.productId !== productId) {
      console.warn('[verify-purchase] product mismatch', { sessionId, productId });
      return Response.json({ error: 'Product mismatch' }, { status: 403 });
    }

    if (!isPaid(session)) {
      // e.g. bank debit still processing
      return Response.json({ verified: false, pending: session.status === 'complete' }, { status: 402 });
    }

    const emails = sessionEmails(session);
    let saved = false;
    const db = adminDb();
    if (db && emails.length) {
      try {
        await grantEntitlements(db, emails, productId, sessionId);
        saved = true;
      } catch (err) {
        console.error('[verify-purchase] could not record entitlement', sessionId, err);
      }
    } else {
      console.error('[verify-purchase] entitlement not recorded (no db or no email)', sessionId);
    }

    return Response.json(
      { verified: true, productId, email: emails[0] || '', saved },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('[verify-purchase] error', err);
    return Response.json({ error: 'Verification failed' }, { status: 500 });
  }
}

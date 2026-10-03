import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase-admin';
import { getProductConfig } from '@/lib/ebook-access.server';
import { grantEntitlements, isPaid, sessionEmails } from '@/lib/purchases.server';

export const runtime = 'nodejs';

/**
 * Stripe webhook. MUST read the RAW request body for signature verification —
 * App Router gives us that via req.text() (do not parse as JSON first).
 * On a paid checkout, records a permanent entitlement in Firestore so the
 * buyer can re-download anytime from any device after signing in.
 *
 * Stripe dashboard → Developers → Webhooks: endpoint
 *   https://www.jaysmoneyguides.com/api/stripe-webhook
 * events: checkout.session.completed, checkout.session.async_payment_succeeded
 */
export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return Response.json({ error: 'Webhook not configured' }, { status: 503 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers.get('stripe-signature');
  if (!sig) return Response.json({ error: 'Missing signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    const raw = await req.text(); // RAW body — critical for verification
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[webhook] signature verification failed', err);
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;

    // Sessions from other products/sites on the same Stripe account: ignore.
    if (!productId || !getProductConfig(productId)) return Response.json({ received: true });
    // Delayed payment methods complete first and get paid later (second event).
    if (!isPaid(session)) return Response.json({ received: true, pending: true });

    const emails = sessionEmails(session);
    if (emails.length === 0) {
      console.error('[webhook] paid session has no email', session.id);
      return Response.json({ received: true });
    }

    const db = adminDb();
    if (!db) {
      // 500 → Stripe retries for up to 3 days, so the sale isn't lost while
      // FIREBASE_SERVICE_ACCOUNT_KEY is missing or broken.
      console.error('[webhook] Firebase Admin not configured — cannot record purchase', session.id);
      return Response.json({ error: 'Storage unavailable' }, { status: 500 });
    }
    try {
      await grantEntitlements(db, emails, productId, session.id);
    } catch (err) {
      console.error('[webhook] failed to record entitlement', session.id, err);
      return Response.json({ error: 'Failed to record purchase' }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}

import 'server-only';
import type Stripe from 'stripe';
import type { Firestore } from 'firebase-admin/firestore';

/**
 * Shared purchase logic for /api/checkout, /api/stripe-webhook,
 * /api/verify-purchase and /api/download-ebook, so all four agree on who
 * bought what.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanEmail(v: unknown): string {
  const s = typeof v === 'string' ? v.trim().toLowerCase() : '';
  return EMAIL_RE.test(s) && s.length <= 254 ? s : '';
}

/**
 * Every email that should own a purchase:
 *  - accountEmail: the signed-in site account that started checkout
 *  - email:        what the buyer typed in our checkout form
 *  - customer_details.email: what the buyer entered on Stripe's page
 *    (this is where Stripe puts it — `customer_email` is only set when we
 *    pre-fill it, which is why purchases were never being recorded)
 */
export function sessionEmails(session: Stripe.Checkout.Session): string[] {
  const all = [
    session.metadata?.accountEmail,
    session.metadata?.email,
    session.customer_details?.email,
    session.customer_email,
  ].map(cleanEmail).filter(Boolean);
  return Array.from(new Set(all));
}

export function isPaid(session: Stripe.Checkout.Session): boolean {
  return session.payment_status === 'paid' || session.payment_status === 'no_payment_required';
}

/** Permanent entitlement per email+product. Doc id format is shared with admin grant-access. */
export async function grantEntitlements(
  db: Firestore,
  emails: string[],
  productId: string,
  sessionId: string
): Promise<void> {
  const purchasedAt = new Date().toISOString();
  await Promise.all(
    emails.map((email) =>
      db
        .collection('entitlements')
        .doc(`${email}__${productId}`)
        .set({ email, productId, sessionId, purchasedAt }, { merge: true })
    )
  );
}

// Paid sessions never become unpaid, so a positive result is safe to cache
// for the life of the serverless instance (saves a Stripe call per page view).
const paidCache = new Map<string, string>(); // sessionId -> productId

/**
 * True when `sessionId` is a paid Stripe Checkout session for exactly
 * `productId`. The session id is a long unguessable receipt, which lets a
 * buyer who has no site account read their ebook right after paying.
 */
export async function isPaidSessionFor(
  stripe: Stripe,
  sessionId: string,
  productId: string
): Promise<boolean> {
  if (!/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(sessionId)) return false;
  if (paidCache.get(sessionId) === productId) return true;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (isPaid(session) && session.metadata?.productId === productId) {
      paidCache.set(sessionId, productId);
      return true;
    }
  } catch {
    // unknown / expired session id
  }
  return false;
}

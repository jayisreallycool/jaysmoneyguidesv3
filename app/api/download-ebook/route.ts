import 'server-only';
import Stripe from 'stripe';
import { isPaidSessionFor } from '@/lib/purchases.server';
import {
  getProductConfig,
  getSignedDownloadUrl,
  getTokenUrl,
  PRODUCTS_CONFIG,
  type EbookConfig,
} from '@/lib/ebook-access.server';
import { imageExists as publicFileExists } from '@/lib/public-image';

export const runtime = 'nodejs';

/**
 * Ebook file endpoint.
 *  - Free ebooks: anyone. No account, no email, no Firebase Admin needed.
 *  - Paid ebooks: only a paying customer — a Stripe receipt for that product,
 *    or a signed-in account with an entitlement (or an admin).
 *
 * Every answer is JSON with a machine-readable `code`, so the reader can
 * show the visitor what is actually wrong instead of a blank frame.
 *
 * Firebase Admin is loaded lazily and only on the paid path: if it fails to
 * load or is misconfigured, free ebooks keep working.
 */

const NO_STORE = { 'Cache-Control': 'no-store' };
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: NO_STORE });

async function admin() {
  try {
    return await import('@/lib/firebase-admin');
  } catch (err) {
    console.error('[ebook] Firebase Admin failed to load:', err instanceof Error ? err.message : err);
    return null;
  }
}

// ── Is the file host actually serving the file? ──────────────────────────────
// Storage can refuse every download (e.g. HTTP 402 when the Firebase project's
// billing/quota is exhausted). The browser can't see that inside an <iframe>,
// so the server checks with a 1-byte request and reports it.
const probeCache = new Map<string, { status: number; at: number }>();

async function probe(url: string): Promise<number> {
  const hit = probeCache.get(url);
  if (hit && Date.now() - hit.at < (hit.status === 200 ? 5 * 60_000 : 30_000)) return hit.status;
  let status = 0;
  try {
    const res = await fetch(url, {
      headers: { Range: 'bytes=0-0' },
      signal: AbortSignal.timeout(6000),
      cache: 'no-store',
    });
    status = res.ok ? 200 : res.status;
  } catch {
    status = 0; // network error / timeout
  }
  probeCache.set(url, { status, at: Date.now() });
  return status;
}

function storageError(status: number) {
  console.error('[ebook] file host refused the download, HTTP', status);
  return json(
    {
      error:
        'This ebook is temporarily unavailable — our file host is not serving downloads right now. Please try again later.',
      code: 'STORAGE_UNAVAILABLE',
      storageStatus: status,
    },
    503
  );
}

/** A copy shipped with the site at /ebooks/free/<id>.pdf wins over Firebase. */
function localFreeFile(product: EbookConfig): string {
  const path = `/ebooks/free/${product.id}.pdf`;
  return product.isFree && publicFileExists(path) ? path : '';
}

async function authenticatedEmail(req: Request): Promise<string | null> {
  const header = req.headers.get('authorization') || '';
  if (!header.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  if (!token) return null;
  try {
    const auth = (await admin())?.adminAuth();
    if (!auth) return null;
    const decoded = await auth.verifyIdToken(token);
    return decoded.email?.toLowerCase().trim() || null;
  } catch {
    return null;
  }
}

async function hasEntitlement(email: string, productId: string): Promise<boolean> {
  try {
    const db = (await admin())?.adminDb();
    if (!db) return false;
    const doc = await db.collection('entitlements').doc(`${email}__${productId}`).get();
    return doc.exists;
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    // ── Status check: /api/download-ebook?check=1 ──────────────────────────
    // Plain yes/no answers about the setup. Reveals no keys, URLs or tokens.
    if (url.searchParams.get('check') === '1') {
      const free = Object.values(PRODUCTS_CONFIG).find((p) => p.isFree);
      const fb = await admin();
      const local = free ? localFreeFile(free) : '';
      const tokenUrl = free ? getTokenUrl(free.storagePath) : '';
      const storageStatus = tokenUrl ? await probe(tokenUrl) : 0;
      let signed = '';
      try {
        signed = free && fb ? await getSignedDownloadUrl(free.storagePath, fb.adminBucket()) : '';
      } catch {
        signed = '';
      }
      return json({
        freeEbook: local ? 'served from the site' : storageStatus === 200 ? 'ok' : 'unavailable',
        fileStorage:
          storageStatus === 200
            ? 'ok'
            : storageStatus === 402
              ? 'refused: HTTP 402 (Firebase Storage quota/billing — check Usage and billing in the Firebase console)'
              : `refused: HTTP ${storageStatus || 'no response'}`,
        stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
        stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
        firebaseAdmin: Boolean(fb?.adminDb()),
        signedUrls: Boolean(signed),
      });
    }

    const productId = url.searchParams.get('productId')?.trim();
    if (!productId) return json({ error: 'Missing productId', code: 'BAD_REQUEST' }, 400);

    const product = getProductConfig(productId);
    if (!product) return json({ error: 'Product not found', code: 'NOT_FOUND' }, 404);
    const filename = `${product.id}.pdf`;
    const wantsRedirect = url.searchParams.get('redirect') === '1';

    // ── FREE: open to everyone ──────────────────────────────────────────────
    if (product.isFree) {
      const local = localFreeFile(product);
      if (local) {
        if (wantsRedirect) return Response.redirect(new URL(local, url.origin), 302);
        return json({ url: local, filename });
      }
      const tokenUrl = getTokenUrl(product.storagePath);
      if (!tokenUrl) return json({ error: 'File unavailable', code: 'NOT_FOUND' }, 404);
      const status = await probe(tokenUrl);
      if (status !== 200) return storageError(status);
      if (wantsRedirect) return Response.redirect(tokenUrl, 302);
      return json({ url: tokenUrl, filename });
    }

    // ── PAID: paying customers only ─────────────────────────────────────────
    //  1. a Stripe receipt (the paid checkout session id for this product), so
    //     a buyer without a site account can read right after paying;
    //  2. a signed-in account that is an admin or has an entitlement.
    const sessionId = url.searchParams.get('session_id')?.trim();
    let allowed = false;

    if (sessionId && process.env.STRIPE_SECRET_KEY) {
      allowed = await isPaidSessionFor(new Stripe(process.env.STRIPE_SECRET_KEY), sessionId, productId);
    }

    if (!allowed) {
      const email = await authenticatedEmail(req);
      if (!email) {
        return json({ error: 'Please sign in with the email you used at checkout.', code: 'AUTH_REQUIRED' }, 401);
      }
      const fb = await admin();
      allowed = Boolean(fb?.isAdminEmail(email)) || (await hasEntitlement(email, productId));
      if (!allowed) {
        return json({ error: 'This ebook has not been purchased on this account.', code: 'PURCHASE_REQUIRED' }, 403);
      }
    }

    // Preferred: a signed link that expires in 1 hour (already test-fetched).
    const fb = await admin();
    let signedUrl = '';
    try {
      signedUrl = fb ? await getSignedDownloadUrl(product.storagePath, fb.adminBucket()) : '';
    } catch {
      signedUrl = '';
    }
    if (signedUrl) return json({ url: signedUrl, filename });

    // Fallback: the permanent token URL — only handed out if it really works.
    const tokenUrl = getTokenUrl(product.storagePath);
    if (!tokenUrl) return json({ error: 'File unavailable', code: 'NOT_FOUND' }, 404);
    const status = await probe(tokenUrl);
    if (status !== 200) return storageError(status);
    return json({ url: tokenUrl, filename });
  } catch (error) {
    console.error('[ebook] Error:', error);
    return json({ error: 'Something went wrong loading this ebook. Please try again.', code: 'SERVER_ERROR' }, 500);
  }
}

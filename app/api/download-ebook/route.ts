import 'server-only';
import Stripe from 'stripe';
import { isPaidSessionFor } from '@/lib/purchases.server';
import { adminAuth, adminBucket, adminDb, isAdminEmail } from '@/lib/firebase-admin';
import {
  getProductConfig,
  getSignedDownloadUrl,
  getTokenUrl,
  resolveDownloadUrl,
  PRODUCTS_CONFIG,
} from '@/lib/ebook-access.server';

export const runtime = 'nodejs';

/**
 * Simple, robust ebook download endpoint
 * - Free ebooks: anyone, uses tokenized URL
 * - Paid ebooks: must login + have purchase OR be admin
 */

async function isUserAdmin(email: string | null | undefined): Promise<boolean> {
  return isAdminEmail(email);
}

async function getAuthenticatedEmail(req: Request): Promise<string | null> {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.substring(7).trim();
    if (!token) return null;

    try {
      const auth = adminAuth();
      if (auth) {
        const decoded = await auth.verifyIdToken(token);
        return decoded.email?.toLowerCase().trim() || null;
      }
    } catch (err) {
      console.warn('[ebook] Firebase Admin unavailable');
    }
    return null;
  } catch (error) {
    console.error('[ebook] Auth error:', error);
    return null;
  }
}

async function userHasPurchase(email: string, productId: string): Promise<boolean> {
  try {
    const db = adminDb();
    if (!db) return false;

    const doc = await db
      .collection('entitlements')
      .doc(`${email.toLowerCase().trim()}__${productId}`)
      .get();

    return doc.exists;
  } catch (error) {
    console.warn('[ebook] Purchase check failed');
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get('productId')?.trim();

    // Health check: /api/download-ebook?check=1 → { signedUrls: true|false }.
    // Says whether short-lived signed links work with the configured service
    // account. Reveals no URL or secret (it probes the free ebook's file).
    if (url.searchParams.get('check') === '1') {
      const free = Object.values(PRODUCTS_CONFIG).find((p) => p.isFree);
      const signed = free ? await getSignedDownloadUrl(free.storagePath, adminBucket()) : '';
      return Response.json({ signedUrls: Boolean(signed) }, { headers: { 'Cache-Control': 'no-store' } });
    }

    if (!productId) {
      return Response.json({ error: 'Missing productId' }, { status: 400 });
    }

    const product = getProductConfig(productId);
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // FREE EBOOKS
    if (product.isFree) {
      const tokenUrl = getTokenUrl(product.storagePath);
      if (tokenUrl) {
        // ?redirect=1 → go straight to the PDF (used by plain links/buttons)
        if (url.searchParams.get('redirect') === '1') return Response.redirect(tokenUrl, 302);
        return Response.json({ url: tokenUrl, filename: `${product.id}.pdf` });
      }
      return Response.json({ error: 'File unavailable' }, { status: 404 });
    }

    // PAID EBOOKS — access is granted by ANY of:
    //  1. a Stripe receipt (the paid checkout session id for this product), so
    //     a buyer without a site account can read right after paying;
    //  2. a signed-in account that is an admin or has an entitlement.
    const sessionId = url.searchParams.get('session_id')?.trim();
    let allowed = false;

    if (sessionId && process.env.STRIPE_SECRET_KEY) {
      allowed = await isPaidSessionFor(new Stripe(process.env.STRIPE_SECRET_KEY), sessionId, productId);
    }

    if (!allowed) {
      const email = await getAuthenticatedEmail(req);
      if (!email) {
        return Response.json({ error: 'Please sign in', code: 'AUTH_REQUIRED' }, { status: 401 });
      }
      allowed = (await isUserAdmin(email)) || (await userHasPurchase(email, productId));
      if (!allowed) {
        return Response.json({ error: 'Purchase required', code: 'PURCHASE_REQUIRED' }, { status: 403 });
      }
    }

    // Preferred: a signed link that expires in 1 hour, so a shared link stops
    // working instead of unlocking the book forever.
    const signedUrl = await getSignedDownloadUrl(product.storagePath, adminBucket());
    if (signedUrl) {
      return Response.json(
        { url: signedUrl, filename: `${product.id}.pdf` },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Fallback while signed links are unavailable: the permanent token URL.
    const tokenUrl = getTokenUrl(product.storagePath);
    if (tokenUrl) {
      return Response.json({ url: tokenUrl, filename: `${product.id}.pdf` });
    }

    const downloadUrl = await resolveDownloadUrl(product.storagePath, null);
    if (!downloadUrl) {
      return Response.json({ error: 'File unavailable' }, { status: 404 });
    }

    return Response.json({ url: downloadUrl, filename: `${product.id}.pdf` });
  } catch (error) {
    console.error('[ebook] Error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

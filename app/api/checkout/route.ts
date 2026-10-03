import Stripe from 'stripe';
import { adminAuth } from '@/lib/firebase-admin';
import { getProductConfig } from '@/lib/ebook-access.server';
import { cleanEmail } from '@/lib/purchases.server';

export const runtime = 'nodejs';

/** Email of the signed-in site account, if the request carries a valid ID token. */
async function accountEmailFrom(req: Request): Promise<string> {
  const authorization = req.headers.get('authorization') || '';
  if (!authorization.startsWith('Bearer ')) return '';
  try {
    const auth = adminAuth();
    if (!auth) return '';
    const decoded = await auth.verifyIdToken(authorization.slice(7).trim());
    return cleanEmail(decoded.email);
  } catch {
    return ''; // checkout still works signed-out
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: 'Payments are not configured yet.' }, { status: 503 });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = (await req.json().catch(() => ({}))) as {
      productId?: string;
      origin?: string;
      email?: string;
    };
    const productId = body.productId?.trim();

    if (!productId) {
      return Response.json({ error: 'Missing required field: productId' }, { status: 400 });
    }

    const product = getProductConfig(productId);
    if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });
    if (product.isFree) return Response.json({ error: 'This ebook is free.' }, { status: 400 });

    // Who the purchase belongs to. Both are stored on the session so the
    // webhook can grant access to the site account AND the typed email.
    const accountEmail = await accountEmailFrom(req);
    const typedEmail = cleanEmail(body.email);
    const prefill = typedEmail || accountEmail;

    // Reliable base URL: SITE_URL → client origin → request origin.
    // Only http(s) origins are accepted from the client.
    const originHeader = req.headers.get('origin') || req.headers.get('referer') || undefined;
    const safeOrigin = (v?: string) => {
      try {
        const u = new URL(v || '');
        return u.protocol === 'https:' || u.protocol === 'http:' ? u.origin : undefined;
      } catch {
        return undefined;
      }
    };
    const base = (
      process.env.SITE_URL ||
      safeOrigin(body.origin) ||
      safeOrigin(originHeader) ||
      'https://www.jaysmoneyguides.com'
    ).replace(/\/+$/, '');

    const metadata: Record<string, string> = { productId: product.id };
    if (typedEmail) metadata.email = typedEmail;
    if (accountEmail) metadata.accountEmail = accountEmail;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Pre-fill the email the buyer already gave us (they can't mistype it twice)
      ...(prefill ? { customer_email: prefill } : {}),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: product.coverImage ? [product.coverImage] : undefined,
            },
            unit_amount: product.priceCents,
          },
          quantity: 1,
        },
      ],
      // Omitting payment_method_types lets Stripe show every enabled method.
      metadata,
      success_url: `${base}/?purchase=success&session_id={CHECKOUT_SESSION_ID}&product=${encodeURIComponent(product.id)}`,
      cancel_url: `${base}/?purchase=cancel&product=${encodeURIComponent(product.id)}`,
    });

    if (!session.url) return Response.json({ error: 'Checkout failed' }, { status: 502 });
    return Response.json({ url: session.url });
  } catch (err) {
    console.error('[checkout] error', err);
    return Response.json({ error: 'Checkout failed. Please try again.' }, { status: 500 });
  }
}

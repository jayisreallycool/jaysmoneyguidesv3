'use client';
import { getFirebaseAuth } from './firebase-client';

/**
 * Browser-side helpers for buying and re-opening ebooks.
 *
 * "Receipts" are the Stripe checkout session ids of this browser's paid
 * purchases, kept in localStorage. They let a buyer who never made a site
 * account open their ebook again on the same device. (Signing in with the
 * purchase email unlocks it on every device.)
 */
const RECEIPTS_KEY = 'jmg_ebook_receipts_v1';

export function getReceipts(): Record<string, string> {
  try {
    const raw = JSON.parse(localStorage.getItem(RECEIPTS_KEY) || '{}');
    return raw && typeof raw === 'object' ? (raw as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function getReceipt(productId: string): string {
  return getReceipts()[productId] || '';
}

export function saveReceipt(productId: string, sessionId: string): void {
  try {
    localStorage.setItem(RECEIPTS_KEY, JSON.stringify({ ...getReceipts(), [productId]: sessionId }));
  } catch {
    // private mode / storage blocked — the purchase is still tied to the email
  }
}

/** Firebase ID token for the signed-in user, or '' when signed out. */
export async function getIdTokenIfSignedIn(): Promise<string> {
  try {
    const user = getFirebaseAuth()?.currentUser;
    return user ? await user.getIdToken() : '';
  } catch {
    return '';
  }
}

/**
 * Creates a Stripe Checkout session and sends the browser to it.
 * Resolves only on failure (on success the page navigates away).
 */
export async function startCheckout(productId: string, email?: string): Promise<{ error: string }> {
  try {
    const token = await getIdTokenIfSignedIn();
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ productId, email, origin: window.location.origin }),
    });
    const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (res.ok && data.url) {
      window.location.assign(data.url);
      // Keep the caller's spinner up while the browser navigates
      return new Promise(() => {});
    }
    return { error: data.error || 'Checkout failed. Please try again.' };
  } catch {
    return { error: 'Checkout failed. Please check your connection and try again.' };
  }
}

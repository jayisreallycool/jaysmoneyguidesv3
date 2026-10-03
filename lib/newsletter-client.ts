'use client';

export type SubscribeResult = { ok: boolean; message: string };

/**
 * Adds an email to the newsletter list. Reports success only when the server
 * confirms it was saved — a failed request is never shown as "Subscribed".
 */
export async function subscribeToNewsletter(email: string, source: 'hero' | 'footer' | 'popup'): Promise<SubscribeResult> {
  const clean = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }
  try {
    const res = await fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: clean, source }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; already?: boolean; error?: string };
    if (res.ok && data.success) {
      return { ok: true, message: data.already ? "You're already on the list — thanks!" : "You're on the list. New guides will come to your inbox." };
    }
    return { ok: false, message: data.error || 'We could not sign you up right now. Please try again.' };
  } catch {
    return { ok: false, message: 'We could not reach the server. Check your connection and try again.' };
  }
}

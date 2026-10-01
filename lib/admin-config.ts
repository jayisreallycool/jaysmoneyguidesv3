/**
 * Client-safe admin email list.
 *
 * Used ONLY for UI decisions (show admin badge, admin menu items).
 * Never use this for access-control — all real access checks happen
 * server-side via isAdminEmail() in lib/firebase-admin.ts.
 *
 * NOTE: These emails are visible in the client bundle by design —
 * they control cosmetic UI only, not security.
 */
export const ADMIN_EMAILS: readonly string[] = [
  'jayisreallycool@gmail.com',
  'buddhacmd02@gmail.com',
];

/** UI helper — returns true if email belongs to an admin. */
export function isAdminEmailClient(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

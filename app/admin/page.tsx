import { redirect } from 'next/navigation';
import { adminAuth, isAdminEmail } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import AdminDashboard from './AdminDashboard';

export const metadata = { title: 'Admin — JaysMoneyGuides', robots: 'noindex,nofollow' };

/**
 * Server-side admin guard. Firebase ID tokens are short-lived (1 hour) and
 * must be sent as a __session cookie for server-side verification here.
 * The AdminDashboard client component handles the actual auth flow and
 * refreshes the cookie via its existing Firebase session.
 *
 * On first load, if no valid admin session cookie is present we redirect to
 * /login. The client re-verifies on mount anyway — this is defence-in-depth.
 */
async function verifyAdminSession(): Promise<boolean> {
  try {
    const auth = adminAuth();
    if (!auth) return false;

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('__session')?.value;
    if (!sessionToken) return false;

    const decoded = await auth.verifyIdToken(sessionToken);
    return isAdminEmail(decoded.email);
  } catch {
    return false;
  }
}

export default async function AdminPage() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    redirect('/login?from=admin');
  }
  return <AdminDashboard />;
}

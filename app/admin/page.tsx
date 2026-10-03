import AdminDashboard from './AdminDashboard';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

/**
 * The admin console.
 *
 * This page itself holds no data. Everything it shows is fetched from
 * /api/admin/* and every one of those routes checks, on the server, that the
 * request carries a valid Firebase sign-in for the single admin account with a
 * verified email (verifyAdminRequest in lib/firebase-admin.ts). Anyone else
 * sees only the sign-in screen or a "not available" notice.
 */
export default function AdminPage() {
  return <AdminDashboard />;
}

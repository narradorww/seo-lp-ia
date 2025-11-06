/**
 * Admin Blog Dashboard - Placeholder
 *
 * This will be replaced with the full admin interface in Phase 3.
 * For now, it's just to test authentication.
 */

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminBlogPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🎉 Welcome to Blog Admin!</h1>
      <p>You're successfully logged in as: <strong>{session.user?.email}</strong></p>
      <p>Role: <strong>{session.user?.role}</strong></p>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '8px' }}>
        <h2>🚧 Under Construction</h2>
        <p>The full admin interface with blog editor will be available in Phase 3.</p>
        <p>For now, this page confirms that authentication is working correctly!</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a href="/api/auth/signout" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: '600' }}>
          Sign Out →
        </a>
      </div>
    </div>
  );
}

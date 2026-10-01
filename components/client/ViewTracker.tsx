'use client';

import { useEffect } from 'react';

/**
 * Fires a view event for the current page to /api/analytics/view.
 * Mount on article and ebook pages. Fire-and-forget — never blocks rendering.
 */
export function ViewTracker({ slug, type }: { slug: string; type: 'article' | 'ebook' }) {
  useEffect(() => {
    // Small delay so the POST doesn't compete with LCP resources
    const t = setTimeout(() => {
      fetch('/api/analytics/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type }),
      }).catch(() => {/* fire-and-forget */});
    }, 1500);
    return () => clearTimeout(t);
  }, [slug, type]);

  return null;
}

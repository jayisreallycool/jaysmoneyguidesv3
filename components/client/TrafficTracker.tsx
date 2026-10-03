'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Counts page views for the admin Traffic tab.
 *
 * Cookieless on purpose: it stores nothing on the visitor's device and sends
 * no identifier — only the page path, the referring site (first page only)
 * and the screen width bucket. See /api/analytics/hit.
 */
export function TrafficTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;

    const isFirst = first.current;
    first.current = false;

    // The first page of this page-load is an "entry" unless the visitor came
    // from another page of this site (a full reload or a normal link).
    let entry = false;
    let ref = '';
    if (isFirst) {
      ref = document.referrer || '';
      try {
        entry = !ref || new URL(ref).host !== window.location.host;
      } catch {
        entry = true;
      }
    }

    const t = setTimeout(() => {
      const body = JSON.stringify({ path: pathname, ref: entry ? ref : '', w: window.innerWidth, entry });
      fetch('/api/analytics/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => { /* fire-and-forget */ });
    }, 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

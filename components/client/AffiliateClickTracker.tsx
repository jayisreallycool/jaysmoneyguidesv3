'use client';

import { useEffect } from 'react';

/**
 * Listens for clicks on affiliate links inside the .post-body article content
 * and fires a GA4 custom event: affiliate_link_click.
 *
 * Event parameters:
 *   link_url   — the full href of the clicked link
 *   link_text  — the visible anchor text
 *   program    — inferred from the hostname (e.g. "semrush", "convertkit")
 *
 * Works without GA4: if window.gtag is unavailable the click still happens
 * normally, and the event is silently skipped.
 *
 * Mount once per guide page — see app/guide/[slug]/page.tsx.
 */

const AFFILIATE_DOMAINS = [
  'semrush.com',
  'ahrefs.com',
  'surferseo.com',
  'convertkit.com',
  'activecampaign.com',
  'getresponse.com',
  'shopify.com',
  'bluehost.com',
  'kinsta.com',
  'siteground.com',
  'namecheap.com',
  'jasper.ai',
  'copy.ai',
  'zapier.com',
  'monday.com',
  'cj.com',
  'impact.com',
  'partnerstack.com',
  'jvzoo.com',
  'clickbank.com',
  'shareasale.com',
];

function inferProgram(hostname: string): string {
  for (const domain of AFFILIATE_DOMAINS) {
    if (hostname.includes(domain)) {
      // Return the root name, e.g. "semrush" from "www.semrush.com"
      return domain.replace(/\.com$|\.ai$|\.io$/, '').replace(/^www\./, '');
    }
  }
  return hostname.replace(/^www\./, '').split('.')[0];
}

function fireEvent(url: string, text: string): void {
  try {
    const hostname = new URL(url).hostname;
    const program = inferProgram(hostname);

    // GA4 custom event
    const g = (window as unknown as Record<string, unknown>).gtag;
    if (typeof g === 'function') {
      (g as (...args: unknown[]) => void)('event', 'affiliate_link_click', {
        link_url: url,
        link_text: text.trim().slice(0, 100),
        program,
      });
    }

    // Console log in dev for easy verification
    if (process.env.NODE_ENV === 'development') {
      console.log('[AffiliateTracker]', { program, url, text: text.trim().slice(0, 60) });
    }
  } catch {
    // Silently ignore — never break a click
  }
}

export function AffiliateClickTracker() {
  useEffect(() => {
    const postBody = document.querySelector('.post-body');
    if (!postBody) return;

    function handleClick(e: Event) {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Only track external affiliate links
      let url: URL;
      try {
        url = new URL(href);
      } catch {
        return; // relative URL — internal link, skip
      }

      const hostname = url.hostname;
      const isAffiliate =
        AFFILIATE_DOMAINS.some((d) => hostname.includes(d)) ||
        href.includes('ref=jaysmoneyguides');

      if (!isAffiliate) return;

      const linkText = target.textContent ?? '';
      fireEvent(href, linkText);
    }

    postBody.addEventListener('click', handleClick);
    return () => postBody.removeEventListener('click', handleClick);
  }, []);

  return null; // renders nothing
}

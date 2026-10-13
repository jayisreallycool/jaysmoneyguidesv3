import { ADSENSE_CLIENT } from '@/lib/consent';

/**
 * AdSense ad units used on the site.
 *
 * Each placement needs a real numeric "ad slot" id from AdSense
 * (Ads → By ad unit → create the unit → copy data-ad-slot). Set them in Vercel:
 *
 *   NEXT_PUBLIC_AD_SLOT_IN_ARTICLE  — "In-article" unit (between sections)
 *   NEXT_PUBLIC_AD_SLOT_HORIZONTAL  — "Display" unit, responsive (end of article, home)
 *   NEXT_PUBLIC_AD_SLOT_VERTICAL    — "Display" unit, vertical (desktop sidebar)
 *
 * A placement with no slot id renders nothing in production (no empty boxes),
 * and AdSense Auto ads, if switched on in the AdSense dashboard, still work.
 */
export type AdKind = 'in-article' | 'horizontal' | 'vertical';

const slot = (v?: string) => (v && /^\d{6,}$/.test(v.trim()) ? v.trim() : '');

export const AD_CLIENT = ADSENSE_CLIENT;
export const AD_SLOTS: Record<AdKind, string> = {
  'in-article': slot(process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE),
  horizontal: slot(process.env.NEXT_PUBLIC_AD_SLOT_HORIZONTAL),
  vertical: slot(process.env.NEXT_PUBLIC_AD_SLOT_VERTICAL),
};

/** Dev only: show where ads would go when no slot id is set. */
export const SHOW_AD_PREVIEW = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_AD_PREVIEW === '1';

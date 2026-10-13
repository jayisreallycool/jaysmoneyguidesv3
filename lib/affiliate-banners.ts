/**
 * Affiliate banners shown inside guides.
 *
 * Only offers with a REAL referral/affiliate link are shown. To add a tool
 * (Semrush, Kit, Shopify, …): add its link to app/go/[campaign]/route.ts, add
 * an offer here with `href: '/go/<name>'`, add its two banner images under
 * /public/images/banners, and list it for the categories it fits.
 * An offer with an empty `href` is never rendered.
 */
export interface BannerOffer {
  id: string;
  /** Goes through /go/<campaign> so the link can be rotated in one place. */
  href: string;
  /** What a screen reader hears, and what shows if the image fails. */
  alt: string;
  /** Wide image for tablets/desktops (1200×300) and tall one for phones (640×480). */
  wide: string;
  tall: string;
  /** Shown as text under the image — the disclosure must not live only inside a picture. */
  disclosure: string;
}

const SOFI_NOTE = 'Referral link: I earn a bonus if you sign up through it. SoFi sets the offer and it changes — check the current terms on SoFi’s site.';

export const OFFERS: Record<string, BannerOffer> = {
  'sofi-money': {
    id: 'sofi-money',
    href: '/go/sofi-money',
    alt: 'SoFi Checking and Savings — open an account through my referral link. See the current welcome offer on SoFi’s site.',
    wide: '/images/banners/sofi-money-wide.svg',
    tall: '/images/banners/sofi-money-tall.svg',
    disclosure: SOFI_NOTE,
  },
  'sofi-personal': {
    id: 'sofi-personal',
    href: '/go/sofi-personal',
    alt: 'SoFi personal loans — check your rate through my referral link, then compare the APR, fees and total cost.',
    wide: '/images/banners/sofi-personal-wide.svg',
    tall: '/images/banners/sofi-personal-tall.svg',
    disclosure: SOFI_NOTE,
  },
  'sofi-student': {
    id: 'sofi-student',
    href: '/go/sofi-student',
    alt: 'SoFi student loan refinancing — see your options through my referral link. Refinancing federal loans gives up federal protections.',
    wide: '/images/banners/sofi-student-wide.svg',
    tall: '/images/banners/sofi-student-tall.svg',
    disclosure: SOFI_NOTE,
  },
};

/** One banner per guide. A specific guide wins over its category. */
const BY_SLUG: Record<string, string> = {
  'sofi-personal-loans-guide': 'sofi-personal',
  'sofi-student-loan-refinancing-guide': 'sofi-student',
  'sofi-medical-dental-student-loan-refinancing': 'sofi-student',
  'sofi-referral-bonus-guide': 'sofi-money',
  // Already about choosing a loan for school — a bank-account banner would be off-topic.
  'sofi-private-student-loans-guide': '',
};

const BY_CATEGORY: Record<string, string> = {
  'SoFi Bank': 'sofi-money',
  Entrepreneurship: 'sofi-money',
  'Affiliate Marketing': 'sofi-money',
  SEO: 'sofi-money',
  Blogging: 'sofi-money',
  Tech: 'sofi-money',
};

export function bannerFor(post: { slug: string; category: string }): BannerOffer | null {
  const id = post.slug in BY_SLUG ? BY_SLUG[post.slug] : BY_CATEGORY[post.category];
  const offer = id ? OFFERS[id] : undefined;
  return offer && offer.href ? offer : null;
}

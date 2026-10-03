import type { Metadata } from 'next';
import './globals.css';
import { SITE, SITE_NAME, organizationSchema, websiteSchema, personSchema } from '@/lib/seo';
import { FixedHeader } from '@/components/client/FixedHeader';
import { Footer } from '@/components/server/Footer';
import { ConsentBanner } from '@/components/client/ConsentBanner';
import { TrafficTracker } from '@/components/client/TrafficTracker';
import { ADSENSE_CLIENT, ADSENSE_PUBLISHER, CONSENT_BOOTSTRAP } from '@/lib/consent';
import { AuthProvider } from '@/components/client/AuthProvider';
import { AuthModals } from '@/components/client/AuthModals';
import { JsonLd } from '@/components/server/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${SITE_NAME} — Affiliate Marketing, SEO & Blogging Guides`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Actionable guides on affiliate marketing, SEO, blogging, e-commerce, and building profitable online businesses. Free ebooks, tools & affiliate program reviews by Jay Lopez.',
  keywords: [
    'affiliate marketing guides',
    'SEO tips for beginners',
    'blogging income',
    'make money online',
    'Shopify dropshipping',
    'high ticket affiliate programs',
    'WordPress blogging',
    'online business blueprints',
    'JaysMoneyGuides',
    'Jay Lopez',
  ],
  authors: [{ name: 'Jay Lopez', url: SITE }],
  creator: 'Jay Lopez',
  publisher: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE,
    title: `${SITE_NAME} — Affiliate Marketing, SEO & Blogging Guides`,
    description:
      'Step-by-step blueprints for building profitable online businesses. Free ebooks, 30+ affiliate program reviews, and weekly guides by Jay Lopez.',
    images: [
      {
        url: '/jay-affiliate-marketing-guides-hero.webp',
        width: 1536,
        height: 1024,
        alt: 'JaysMoneyGuides — Affiliate Marketing, Blogging Guides, Headless Shopify Stores, SaaS Solutions by Jay Lopez',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jaysmoneyguides',
    creator: '@jaysmoneyguides',
    title: `${SITE_NAME} — Affiliate Marketing, SEO & Blogging Guides`,
    description: 'Step-by-step blueprints for building profitable online businesses.',
    images: ['/jay-affiliate-marketing-guides-hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Add Google Search Console verification token here when available
    // google: 'your-verification-token',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b1220',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* The hero image is not preloaded here: this layout wraps every page, so a
            preload made guide/legal pages download a hero they never show. On the
            home page the <picture> is in the server HTML with fetchPriority="high". */}
        {/* Preload character avatar used in navbar */}
        <link rel="preload" as="image" href="/jay-character-small.webp" type="image/webp" />
        {/* Preconnect Firebase Storage for ebook covers */}
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://identitytoolkit.googleapis.com" />
        {/* dns-prefetch fallback */}
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        {/* AdSense site ownership — lets AdSense verify the site and match ads.txt */}
        <meta name="google-adsense-account" content={ADSENSE_PUBLISHER} />
        {/*
          Consent first. This inline script must stay ABOVE every Google tag: it
          sets Consent Mode v2 defaults from the visitor's stored choice, pauses
          or de-personalises AdSense requests, and only downloads Google
          Analytics once analytics is allowed. See lib/consent.ts.
        */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }} />
        {/*
          AdSense loader. It stays in the static HTML so AdSense can verify the
          site; whether it may request ads, and whether they are personalised,
          is controlled by the consent script above.
        */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Sitewide structured data — server-rendered, zero JS cost */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {/*
          Person schema is also injected per-page (homepage, ebooks, tools, guides)
          for richer entity signals. Injecting here means it's present on every page
          including legal/category pages that don't have their own injection.
        */}
        <JsonLd data={personSchema()} />

        <AuthProvider>
          <AuthModals>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <FixedHeader />
            {/* Spacer: announcement ~34px + nav ~64px = 98px */}
            <main id="main-content" className="min-h-[70vh] pt-[98px]">
              {children}
            </main>
            <Footer />
            <ConsentBanner />
            <TrafficTracker />
          </AuthModals>
        </AuthProvider>
      </body>
    </html>
  );
}

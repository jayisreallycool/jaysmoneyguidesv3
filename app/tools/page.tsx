import { Metadata } from 'next';
import { ToolsContent } from '@/components/client/ToolsContent';
import { JsonLd } from '@/components/server/JsonLd';
import { SITE, personSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Recommended Tools & Affiliate Programs | JaysMoneyGuides',
  description:
    'Affiliate programs and tools for online businesses — Shopify, SEMrush, ConvertKit, Ahrefs, Kinsta and more — with how each one pays and who it suits.',
  alternates: { canonical: `${SITE}/tools` },
  openGraph: {
    type: 'website',
    url: `${SITE}/tools`,
    title: 'Tools & Affiliate Programs — JaysMoneyGuides',
    description: 'Affiliate programs and tools with commission and payout details, curated by Jay Lopez.',
    images: [{ url: `${SITE}/jay-affiliate-marketing-guides-hero.webp`, width: 1536, height: 1024, alt: 'JaysMoneyGuides Tools & Affiliate Programs' }],
  },
};

const toolsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Recommended Tools & Affiliate Programs — JaysMoneyGuides',
  description:
    'A curated list of affiliate programs and tools for online business growth, covering e-commerce, email marketing, SEO, web hosting, and more.',
  url: `${SITE}/tools`,
  author: { '@type': 'Person', name: 'Jay Lopez', url: `${SITE}/about` },
  publisher: { '@type': 'Organization', name: 'JaysMoneyGuides', url: SITE },
  inLanguage: 'en-US',
};

const toolsBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Tools & Affiliate Programs', item: `${SITE}/tools` },
  ],
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={toolsPageSchema} />
      <JsonLd data={toolsBreadcrumb} />
      <JsonLd data={personSchema()} />
      <ToolsContent />
    </>
  );
}

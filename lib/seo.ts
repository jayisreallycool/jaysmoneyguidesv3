import type { BlogPost, Product } from './types';

export const SITE = 'https://www.jaysmoneyguides.com';
export const SITE_NAME = 'JaysMoneyGuides';
const AUTHOR_NAME = 'Jay Lopez';
const AUTHOR_URL = `${SITE}/about`;
const LOGO_URL = `${SITE}/jay-character-small.webp`;

// ─── Article (BlogPost) ───────────────────────────────────────────────────────
export function articleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: (post as { metaDescription?: string }).metaDescription ?? post.excerpt,
    image: post.coverImage
      ? [post.coverImage]
      : [`${SITE}/jay-affiliate-marketing-guides-hero.webp`],
    datePublished: post.publishedAt,
    dateModified: (post as { updatedAt?: string }).updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name ?? AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE,
      logo: { '@type': 'ImageObject', url: LOGO_URL, width: 40, height: 40 },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/guide/${post.slug}`,
    },
    keywords: (post as { seoKeywords?: string[] }).seoKeywords?.join(', ') ?? '',
    articleSection: post.category,
    wordCount: post.readTimeMinutes ? post.readTimeMinutes * 200 : undefined,
    inLanguage: 'en-US',
  };
}

// ─── BreadcrumbList (guide pages) ────────────────────────────────────────────
export function breadcrumbSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.category,
        item: `${SITE}/category/${encodeURIComponent(post.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE}/guide/${post.slug}`,
      },
    ],
  };
}

// ─── BreadcrumbList (ebook pages) ────────────────────────────────────────────
export function ebookBreadcrumbSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'eBook Store', item: `${SITE}/ebooks` },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `${SITE}/ebooks/${product.slug}`,
      },
    ],
  };
}

// ─── Product / Book schema (individual ebook page) ────────────────────────────
export function ebookProductSchema(product: Product) {
  const price = product.isFree ? '0' : (product.priceCents / 100).toFixed(2);
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: product.title,
    description: product.description,
    author: {
      '@type': 'Person',
      name: product.author ?? AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE,
    },
    image: product.coverImage || `${SITE}/jay-affiliate-marketing-guides-hero.webp`,
    numberOfPages: product.pageCount,
    inLanguage: 'en-US',
    url: `${SITE}/ebooks/${product.slug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: SITE_NAME },
      url: `${SITE}/ebooks/${product.slug}`,
    },
    bookFormat: 'https://schema.org/EBook',
    genre: product.category,
  };
}

// ─── ItemList for the ebook store (homepage + /ebooks page) ──────────────────
export function ebookItemListSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} eBook Store`,
    description: 'Downloadable ebooks on affiliate marketing, SEO, blogging, and building digital income.',
    url: `${SITE}/ebooks`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      description: p.description,
      url: `${SITE}/ebooks/${p.slug}`,
      image: p.coverImage || `${SITE}/jay-affiliate-marketing-guides-hero.webp`,
    })),
  };
}

// ─── ItemList for blog posts (homepage) ──────────────────────────────────────
export function blogItemListSchema(posts: Pick<BlogPost, 'title' | 'slug' | 'excerpt' | 'category'>[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} — Free Guides & Blueprints`,
    description: 'In-depth guides on affiliate marketing, SEO, blogging, e-commerce, and online business.',
    url: SITE,
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      description: p.excerpt,
      url: `${SITE}/guide/${p.slug}`,
    })),
  };
}

// ─── FAQ schema (for guide pages with a questions list) ───────────────────────
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

// ─── Person schema (Jay Lopez) ────────────────────────────────────────────────
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    image: `${SITE}/jay-character-small.webp`,
    jobTitle: 'Online Business Strategist & Affiliate Marketing Expert',
    description:
      'Jay Lopez is the founder of JaysMoneyGuides, an online business publication covering affiliate marketing, SEO, blogging, and digital income strategies.',
    sameAs: ['https://www.tiktok.com/@jaysmoneyguides'],
    knowsAbout: [
      'Affiliate Marketing',
      'Search Engine Optimization',
      'Blogging',
      'E-Commerce',
      'Dropshipping',
      'Headless Shopify',
      'SaaS',
      'Online Business',
    ],
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE,
    },
  };
}

// ─── Organization schema ──────────────────────────────────────────────────────
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE,
    logo: { '@type': 'ImageObject', url: LOGO_URL, width: 40, height: 40 },
    image: `${SITE}/jay-affiliate-marketing-guides-hero.webp`,
    description:
      'Actionable guides and ebooks on affiliate marketing, SEO, blogging, e-commerce, and smart money moves. By Jay Lopez.',
    founder: { '@type': 'Person', name: AUTHOR_NAME, url: AUTHOR_URL },
    sameAs: ['https://www.tiktok.com/@jaysmoneyguides'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE}/contact`,
    },
  };
}

// ─── WebSite schema (enables sitelinks search box) ───────────────────────────
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE,
    description: 'Actionable blueprints for building profitable online businesses.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── CategoryPage schema (CollectionPage for /category/[category]) ────────────
export function categoryPageSchema(
  category: string,
  posts: Pick<BlogPost, 'title' | 'slug' | 'excerpt'>[],
) {
  const encodedCat = encodeURIComponent(category);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} Guides — ${SITE_NAME}`,
    description: `Free in-depth ${category} guides and blueprints by Jay Lopez. Practical strategies for building profitable online businesses.`,
    url: `${SITE}/category/${encodedCat}`,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: category, item: `${SITE}/category/${encodedCat}` },
      ],
    },
    hasPart: posts.map((p) => ({
      '@type': 'Article',
      name: p.title,
      description: p.excerpt,
      url: `${SITE}/guide/${p.slug}`,
    })),
  };
}

// ─── ItemList for a category page ─────────────────────────────────────────────
export function categoryItemListSchema(
  category: string,
  posts: Pick<BlogPost, 'title' | 'slug' | 'excerpt'>[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category} Guides`,
    description: `All ${category} guides and blueprints on ${SITE_NAME}.`,
    url: `${SITE}/category/${encodeURIComponent(category)}`,
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      description: p.excerpt,
      url: `${SITE}/guide/${p.slug}`,
    })),
  };
}

import type { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { SITE } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}`,                priority: 1.0, changeFrequency: 'daily'   },
    { url: `${SITE}/ebooks`,         priority: 0.9, changeFrequency: 'weekly'  },
    { url: `${SITE}/sofi-bank`,      priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE}/about`,          priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE}/tools`,          priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE}/contact`,        priority: 0.5, changeFrequency: 'yearly'  },
    { url: `${SITE}/privacy`,        priority: 0.3, changeFrequency: 'yearly'  },
    { url: `${SITE}/terms`,          priority: 0.3, changeFrequency: 'yearly'  },
    { url: `${SITE}/disclaimer`,     priority: 0.3, changeFrequency: 'yearly'  },
    { url: `${SITE}/cookie-policy`,  priority: 0.3, changeFrequency: 'yearly'  },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE}/category/${encodeURIComponent(cat)}`,
    priority: 0.75,
    changeFrequency: 'weekly',
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/guide/${p.slug}`,
    lastModified: (p as { updatedAt?: string }).updatedAt ?? p.publishedAt,
    changeFrequency: 'monthly',
    priority: p.featured ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Remove X-Powered-By header to reduce fingerprinting
  poweredByHeader: false,

  // Compress responses with gzip/brotli
  compress: true,

  images: {
    // Prefer AVIF, fall back to WebP — Next.js Image Optimization picks the best for each browser
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
    remotePatterns: [
      // Firebase Storage — two hostnames Firebase uses
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: '*.firebasestorage.app' },
      // Unsplash cover images
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.unsplash.com' },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // Cache optimized images for 24h on CDN
    minimumCacheTTL: 86400,
    // Responsive image sizes for Next.js <Image> srcset generation
    deviceSizes: [480, 640, 828, 1080, 1200, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  experimental: {
    // Tree-shake icon and animation libraries aggressively
    optimizePackageImports: ['lucide-react', 'motion'],
  },

  async headers() {
    return [
      {
        // Security + performance headers on all routes
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'X-Frame-Options',             value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control',      value: 'on' },
          { key: 'Referrer-Policy',             value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',          value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        // All static HTML/RSC pages — short TTL + fast SWR revalidation.
        // /api is excluded: purchase, entitlement and download responses are
        // per-user and must never be served from a shared CDN cache.
        source: '/((?!api/).*)',
        headers: [{ key: 'Cache-Control', value: 's-maxage=300, stale-while-revalidate=600' }],
      },
      // ── Hero image set — 7 day cache (these rarely change) ──────────────────
      {
        source: '/jay-affiliate-marketing-guides-hero.webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/jay-affiliate-marketing-guides-hero-1200.webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/jay-affiliate-marketing-guides-hero-800.webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/jay-affiliate-marketing-guides-hero-480.webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      // ── Jay character assets ─────────────────────────────────────────────────
      {
        source: '/jay-character-small.webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/jay-character-banner.webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
};
module.exports = nextConfig;

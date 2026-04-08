import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output reduces serverless function bundle sizes
  output: "standalone",

  // Don't let lint/type warnings abort a production build
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Allow images from Vercel Blob (scraped centre logos) and any external domain
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel-storage.com' },
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      // Allow any https image for og:image fallbacks (centre websites)
      { protocol: 'https', hostname: '**' },
    ],
  },

  // Map /sitemap.xml to our explicit route handler (avoids dot-in-dirname issues)
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap-index',
      },
    ]
  },

  // Redirect naked domain to www + fix legacy/bare location URLs
  async redirects() {
    return [
      // Naked domain → www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sobernation.co.uk' }],
        destination: 'https://www.sobernation.co.uk/:path*',
        permanent: true,
      },
      // /salisbury (and other bare city slugs) → /rehab/[city]
      // These can appear from old links or direct navigation
      { source: '/salisbury', destination: '/rehab/salisbury', permanent: true },
      { source: '/london', destination: '/rehab/london', permanent: true },
      { source: '/manchester', destination: '/rehab/manchester', permanent: true },
      { source: '/birmingham', destination: '/rehab/birmingham', permanent: true },
      { source: '/leeds', destination: '/rehab/leeds', permanent: true },
      { source: '/glasgow', destination: '/rehab/glasgow', permanent: true },
      { source: '/liverpool', destination: '/rehab/liverpool', permanent: true },
      { source: '/bristol', destination: '/rehab/bristol', permanent: true },
      { source: '/edinburgh', destination: '/rehab/edinburgh', permanent: true },
      // find-rehab (old slug) → find-my-rehab (new page)
      { source: '/find-rehab', destination: '/find-my-rehab', permanent: false },
    ]
  },
};

export default nextConfig;

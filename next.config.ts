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

  // Redirect naked domain to www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sobernation.co.uk' }],
        destination: 'https://www.sobernation.co.uk/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

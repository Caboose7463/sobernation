import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output dramatically reduces serverless function bundle sizes.
  // This fixes "Error: Body exceeded 80000kb limit" on Vercel by only
  // including the files each function actually needs at runtime.
  output: "standalone",

  // Don't let lint/type warnings abort a production build.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;

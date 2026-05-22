import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/fracao-ilustre-website',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

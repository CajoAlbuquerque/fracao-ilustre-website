import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/**`
      }
    ]
  }
};

export default withNextIntl(nextConfig);

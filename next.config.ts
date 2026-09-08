import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  ...(isProd && {
    output: 'export',
    basePath: '/fracao-ilustre-website',
    images: {
      unoptimized: true,
    },
  })
};

export default withNextIntl(nextConfig);

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export', // برای پنل ادمین پویا غیرفعال شد
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

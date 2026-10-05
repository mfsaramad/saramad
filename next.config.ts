import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',           // ← Static Export برای Cloudflare Pages
  images: {
    unoptimized: true,        // ← برای next/image
  },
  trailingSlash: true,        // ← برای URL ها
};

export default nextConfig;
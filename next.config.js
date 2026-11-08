/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 خروجی استاتیک برای Cloudflare
  images: {
    unoptimized: true, // در حالت استاتیک، تصاویر بهینه‌سازی نمی‌شوند
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
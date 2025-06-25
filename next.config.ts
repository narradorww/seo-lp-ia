import type { NextConfig } from "next";
require('dotenv').config({ path: '.env.local' });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ Ignora erros do ESLint durante o build (na Vercel também)
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rodrigoalexandre.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

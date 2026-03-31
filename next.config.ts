import type { NextConfig } from "next";
require('dotenv').config({ path: '.env.local' });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/tarot-dev',
        destination: 'https://tarot-dev-poker.vercel.app/tarot-dev',
      },
      {
        source: '/tarot-dev/:room*',
        destination: 'https://tarot-dev-poker.vercel.app/tarot-dev/:room*',
      },
    ];
  },
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
  serverExternalPackages: ['@aws-sdk/client-s3'],
};

export default nextConfig;

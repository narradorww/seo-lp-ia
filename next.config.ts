import type { NextConfig } from "next";
require('dotenv').config({ path: '.env.local' });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/games/macunaima", destination: "/games/macunaima/v2", permanent: false }];
  },
  async rewrites() {
    return [
      { source: "/games/macunaima/v1", destination: "/arcade/macunaima/v1/index.html" },
      { source: "/games/macunaima/v2", destination: "/arcade/macunaima/v2/index.html" },
      {
        source: '/assets/:path*',
        destination: 'https://tarot-dev-poker.vercel.app/assets/:path*',
      },
      {
        source: '/vite.svg',
        destination: 'https://tarot-dev-poker.vercel.app/vite.svg',
      },
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

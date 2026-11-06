import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
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

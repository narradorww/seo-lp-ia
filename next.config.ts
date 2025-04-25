import type { NextConfig } from "next";
require('dotenv').config({ path: '.env.local' });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ Ignora erros do ESLint durante o build (na Vercel também)
  },
  images: {
    domains: ['images.unsplash.com'], // ⬅️ Libera imagens externas
  },
};

export default nextConfig;

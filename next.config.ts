import type { NextConfig } from "next";
require('dotenv').config({ path: '.env.local' });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
};

export default nextConfig;

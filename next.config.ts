import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  webpack: (config) => {
    config.resolve.alias['@/public'] = path.join(__dirname, 'src/public');
    return config;
  },
};

export default nextConfig;

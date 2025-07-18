import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allows all domains (use with caution)
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // OR to allow ALL domains easily (not recommended for production but works)
    dangerouslyAllowSVG: true, // optional for SVGs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config) => {
    config.resolve.alias["@/public"] = path.join(__dirname, "src/public");
    return config;
  },
};

export default nextConfig;

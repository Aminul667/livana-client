import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS sources
      },
      {
        protocol: "http",
        hostname: "**", // Allow all HTTP sources (not recommended)
      },
    ],
  },
};

export default nextConfig;

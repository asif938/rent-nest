import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Property photos are plain user-supplied URLs (no upload pipeline),
    // so any https host must be allowed to render, not just a fixed list.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

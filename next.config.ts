import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        hostname: "i.pravatar.cc",
      },
    ],
  },
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;

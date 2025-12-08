import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  compress: true,

  images: {
    formats: ["image/avif", "image/webp"], // enables modern formats
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "75.119.135.164",
      },
      {
        protocol: "https",
        hostname: "xcell.fund",
      },
      {
        protocol: "https",
        hostname: "www.xcell.fund",
      },
      {
        protocol: "https",
        hostname: "xcellfund.com",
      },
      {
        protocol: "https",
        hostname: "www.xcellfund.com",
      }
    ],
  },

  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;

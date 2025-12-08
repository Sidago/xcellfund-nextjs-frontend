import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },
  compress: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "http://75.119.135.164",
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
      },
    ],
  },
};

export default nextConfig;

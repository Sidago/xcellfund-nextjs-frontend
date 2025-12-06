import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,

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
    ],
  },
};

export default nextConfig;

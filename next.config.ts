import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler (React Forget)
  reactCompiler: true,

  // Production optimizations
  compiler: {
    removeConsole: true, // remove all console.* except errors
  },

  compress: true, // gzip + brotli enabled

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80],
    remotePatterns: [
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

  // For safest production builds (Webpack only)
  // Turbopack is dev-only so we disable touching it
  experimental: {
    optimizeCss: true, // safe for production
  },

  // No transpilePackages — not needed in production and slows CI
};

export default nextConfig;

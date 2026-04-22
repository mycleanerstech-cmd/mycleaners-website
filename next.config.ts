import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  compress: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/best-:service([\\w-]+)-in-:city([\\w-]+)",
        destination: "/regional/:service/:city",
      },
    ];
  },
};

export default nextConfig;

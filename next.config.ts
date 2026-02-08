import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com/**",
      },
    ],
  },
  eslint: {
    // ESLint 检查不会导致构建失败
    ignoreDuringBuilds: true,
  },
  // if used turbopack
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;

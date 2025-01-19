import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Configure asset prefix
  assetPrefix: ".",
  // Force trailing slashes
  trailingSlash: true,
  // Disable page directory rewriting
  skipTrailingSlashRedirect: true,
  // Prevent index.html rewrites
  skipMiddlewareUrlNormalize: true,
};

export default nextConfig;

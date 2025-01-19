import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Enable static exports
  basePath: process.env.NODE_ENV === "production" ? "/mdxstaticsiteblog" : "", // Replace <repository-name> with your repo name
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable trailing slashes
  trailingSlash: false,
};

export default nextConfig;

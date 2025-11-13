import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/sandbox' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sandbox' : '',
  trailingSlash: true,
};

export default nextConfig;
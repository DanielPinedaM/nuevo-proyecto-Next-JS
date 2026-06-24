import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: true, // activar optimización automática de re-renders sin necesidad de escribir codigo con memo, useMemo, useCallback
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
};

export default nextConfig;

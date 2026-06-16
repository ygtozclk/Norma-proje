import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    // Tree-shake barrel imports — only ship exports actually used
    optimizePackageImports: [
      "@react-three/drei",
      "@react-three/fiber",
      "@react-three/postprocessing",
    ],
  },
  webpack(config) {
    // Bundle three/drei/postprocessing into one async chunk so the
    // browser fetches it as a single request after idle callback fires.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sc = (config.optimization as any)?.splitChunks;
    if (sc && typeof sc === "object") {
      sc.cacheGroups = {
        ...sc.cacheGroups,
        threeVendor: {
          test: /[\\/]node_modules[\\/](three|@react-three|postprocessing)[\\/]/,
          name: "three-vendor",
          chunks: "async",
          priority: 30,
          enforce: true,
        },
      };
    }
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

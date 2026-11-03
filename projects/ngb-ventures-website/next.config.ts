import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/resources", destination: "/insights", permanent: true },
      { source: "/resources/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/enquire", destination: "/quote", permanent: true },
      { source: "/product-development", destination: "/quote?type=manufacturing", permanent: true },
      { source: "/request-a-quote", destination: "/quote", permanent: true },
      { source: "/gi", destination: "/origin", permanent: true },
    ];
  },
};

export default nextConfig;

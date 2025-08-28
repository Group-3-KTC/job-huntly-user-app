/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  async rewrites() {
    // Chỉ proxy ở DEV
    if (process.env.NODE_ENV !== "development") return [];

    // Target có thể đọc từ env, fallback về IP dev
    const target =
      process.env.NEXT_PUBLIC_API_PROXY_TARGET || "http://18.142.226.139:8080";

    return [
      {
        source: "/api/:path*",
        destination: `${target}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

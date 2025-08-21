/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  images: {
    domains: ["cdn-new.topcv.vn"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

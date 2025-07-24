/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  images: {
    domains: ['cdn-new.topcv.vn'],
  },
};

export default nextConfig;
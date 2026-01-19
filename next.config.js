/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "121rehabcorp.com" },
      { protocol: "https", hostname: "www.121rehabcorp.com" },
    ],
  },
};

module.exports = nextConfig;

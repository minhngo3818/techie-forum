/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["127.0.0.1"],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     port: "8000",
    //     pathname: "/media/avatar/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;

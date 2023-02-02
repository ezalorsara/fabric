/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      fabric: "fabric-pure-browser",
    };

    return config;
  },
};

module.exports = nextConfig;

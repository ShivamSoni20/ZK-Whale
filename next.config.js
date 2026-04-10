/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Required to build cleanly with the WASM and deep node_modules in Midnight JS
    config.experiments = { ...config.experiments, asyncWebAssembly: true, layers: true };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@midnight-ntwrk/midnight-js-wallet': false,
      '@midnight-ntwrk/ledger-v8': false,
      '@midnight-ntwrk/compact-js': false,
    };
    return config;
  },
};

module.exports = nextConfig;

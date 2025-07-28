const fs = require('fs');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Environment variable that specifies the name of the redirects file
const redirectsFileName = process.env.REDIRECTS_FILE_NAME || 'default';
const redirectsFilePath = path.join(__dirname, 'utils', 'redirects', `${redirectsFileName}.js`);

let redirects = [];

// Check if the redirects file exists
if (fs.existsSync(redirectsFilePath)) {
  // If it exists, require the file and use its exports
  redirects = require(redirectsFilePath);
} else {
  // If it does not exist, log a warning or set a default behavior
  console.warn(`Redirects file "${redirectsFileName}.js" not found. Using default redirects configuration.`);
  // Define default redirects or leave it as an empty array
  redirects = [
    // Example of a default redirect (optional)
    // { source: '/default-redirect', destination: '/default-destination', permanent: true },
  ];
}

const nextConfig = {
  reactStrictMode: false,

  // Configure SWC to target modern browsers
  swcMinify: true,
  compiler: {
    // Remove unnecessary transforms for modern browsers
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
    optimizeCss: true,
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Bundle optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate vendor chunks for better caching
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
          },
          // Separate Plasmic chunks
          plasmic: {
            test: /[\\/]node_modules[\\/]@plasmic/,
            name: 'plasmic',
            priority: 20,
            chunks: 'all',
          },
          // Separate heavy libraries
          charts: {
            test: /[\\/]node_modules[\\/](react-chartjs-2|chart\.js)/,
            name: 'charts',
            priority: 15,
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },

  images: {
    domains: ['cms.westmidlandssummerhouses.com'],
    formats: ['image/webp', 'image/avif'],
  },

  async redirects() {
    return redirects;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

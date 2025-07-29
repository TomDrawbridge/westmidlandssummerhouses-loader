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

  // Configure SWC to target modern browsers and reduce polyfills
  compiler: {
    // Remove unnecessary transforms for modern browsers
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
    optimizeCss: true,
    // Enable modern output for reduced bundle size
    esmExternals: true,
    // Optimize CSS delivery
    optimizePackageImports: ['lightgallery'],
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Bundle optimizations with size limits
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        maxSize: 244000, // ~240KB max chunk size
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate vendor chunks for better caching
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
            maxSize: 244000,
          },
          // Separate Plasmic chunks
          plasmic: {
            test: /[\\/]node_modules[\\/]@plasmic/,
            name: 'plasmic',
            priority: 20,
            chunks: 'all',
            maxSize: 244000,
          },
          // Separate heavy libraries like LightGallery
          gallery: {
            test: /[\\/]node_modules[\\/](lightgallery|lg-)/,
            name: 'gallery',
            priority: 15,
            chunks: 'async', // Load LightGallery asynchronously
            maxSize: 244000,
          },
          // Separate CSS files
          styles: {
            test: /\.css$/,
            name: 'styles',
            priority: 5,
            chunks: 'all',
            maxSize: 244000,
            enforce: true,
          },
          // Separate charts
          charts: {
            test: /[\\/]node_modules[\\/](react-chartjs-2|chart\.js)/,
            name: 'charts',
            priority: 15,
            chunks: 'all',
            maxSize: 244000,
          },
        },
      };
      
      // Configure for modern browsers to reduce polyfills
      if (process.env.DISABLE_POLYFILLS === 'true') {
        config.resolve.alias = {
          ...config.resolve.alias,
          // Disable core-js polyfills for modern browsers
          'core-js': false,
        };
      }
    }
    
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.westmidlandssummerhouses.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  async redirects() {
    return redirects;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

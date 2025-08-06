const fs = require('fs');
const path = require('path');

// Add bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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

  // Turbopack configuration (stable)
  turbopack: {
    // Turbopack is now stable in Next.js 15+
  },

  // Styled-jsx configuration for better SSR
  compiler: {
    styledJsx: true,
  },

  // Experimental features for better CSS handling
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    cssChunking: true, // Better CSS chunking
    optimizePackageImports: [
      '@plasmicapp/loader-nextjs',
      'framer-motion',
      'lightgallery',
      '@vercel/analytics',
      '@vercel/speed-insights'
    ], // Optimize package imports for better tree-shaking
  },

  // Webpack configuration for bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Bundle splitting for better caching
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate Plasmic into its own chunk
          plasmic: {
            test: /[\\/]node_modules[\\/]@plasmicapp/,
            name: 'plasmic',
            chunks: 'all',
            priority: 30,
          },
          // Separate animation libraries
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|@popmotion)/,
            name: 'animations',
            chunks: 'all',
            priority: 25,
          },
          // Separate media libraries
          media: {
            test: /[\\/]node_modules[\\/](lightgallery|@splidejs)/,
            name: 'media',
            chunks: 'all',
            priority: 25,
          },
          // Separate analytics
          analytics: {
            test: /[\\/]node_modules[\\/]@vercel[\\/](analytics|speed-insights)/,
            name: 'analytics',
            chunks: 'async', // Load these async
            priority: 20,
          },
        },
      };
    }

    return config;
  },

  images: {
    domains: ['cms.westmidlandssummerhouses.com'],
  },

  async redirects() {
    return redirects;
  },
};

// Export with bundle analyzer wrapper
module.exports = withBundleAnalyzer(nextConfig);
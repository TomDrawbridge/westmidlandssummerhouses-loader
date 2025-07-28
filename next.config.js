const fs = require('fs');
const path = require('path');

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
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']
  },

  images: {
    domains: ['cms.westmidlandssummerhouses.com'],
  },

  async redirects() {
    return redirects;
  },
};

module.exports = nextConfig;

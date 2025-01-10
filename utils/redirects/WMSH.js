// redirects/WMSH.js
module.exports = [
  {
    source: '/garden-buildings',
    destination: '/garden-rooms',
    permanent: true,
  },
  {
    source: '/garden-buildings/:path*',
    destination: '/garden-rooms/:path*',
    permanent: true,
  },
  {
    source: '/phone',
    destination: 'tel:01384424538',
    permanent: true,
  }
];

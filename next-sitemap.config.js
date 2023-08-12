const fetchDynamicPaths = require('./utils/fetchDynamicPaths');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.1hire.co.uk',
  generateRobotsTxt: true,
  
  additionalPaths: async (config) => {
    const dynamicPaths = await fetchDynamicPaths();

    // transform these paths into the expected format
    const result = dynamicPaths.map(path => {
      return {
        loc: path,
        lastmod: new Date().toISOString() // if you wish to set the last modified date
      };
    });

    return result;
  }
};

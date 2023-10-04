const allFetchDynamicPaths = require('./utils/fetchDynamicPaths');

const { DYNAMIC_PATHS_SOURCE = 'default' } = process.env;

const fetchDynamicPaths = allFetchDynamicPaths[`fetchDynamicPaths_${DYNAMIC_PATHS_SOURCE}`] || allFetchDynamicPaths.fetchDynamicPaths;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  
  additionalPaths: async (config) => {
    const dynamicPaths = await fetchDynamicPaths();

console.log('Dynamic Paths:', dynamicPaths); // Debug log here

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

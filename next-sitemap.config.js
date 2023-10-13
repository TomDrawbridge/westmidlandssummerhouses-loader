const allFetchDynamicPaths = require('./utils/fetchDynamicPaths');

const { DYNAMIC_PATHS_SOURCE = 'default' } = process.env;

const fetchDynamicPathsFunc = allFetchDynamicPaths[`fetchDynamicPaths_${DYNAMIC_PATHS_SOURCE}`] || allFetchDynamicPaths.fetchDynamicPaths_default;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  
  additionalPaths: async (config) => {
    let dynamicPaths = [];

    // Check if fetchDynamicPathsFunc is a function before calling it
    if (typeof fetchDynamicPathsFunc === 'function') {
      dynamicPaths = await fetchDynamicPathsFunc();
    }

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

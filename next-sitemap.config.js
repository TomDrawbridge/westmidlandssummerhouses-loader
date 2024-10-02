const path = require('path');
const allFetchDynamicPaths = require('./utils/fetchDynamicPaths');

const { DYNAMIC_PATHS_SOURCE = 'default' } = process.env;

const fetchDynamicPaths = allFetchDynamicPaths[`fetchDynamicPaths_${DYNAMIC_PATHS_SOURCE}`] || allFetchDynamicPaths.fetchDynamicPaths_default;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  
  additionalPaths: async (config) => {
    let dynamicPaths = [];

    if (typeof fetchDynamicPaths === 'function') {
      try {
        dynamicPaths = await fetchDynamicPaths();
      } catch (error) {
        console.error('Error fetching dynamic paths:', error);
      }
    }

    console.log('Dynamic Paths:', dynamicPaths); // Debug log

    return dynamicPaths.map(path => ({
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7
    }));
  },

  transform: async (config, path) => {
    // Custom transformation for default pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL}/server-sitemap.xml`,
    ],
  },
};
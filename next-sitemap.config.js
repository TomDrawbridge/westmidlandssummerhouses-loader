// next-sitemap.config.js

const fetchDynamicPaths = require('./utils/fetchDynamicPaths');

module.exports = async () => {
    const dynamicPaths = await fetchDynamicPaths();

    return {
        siteUrl: process.env.SITE_URL || 'https://www.1hire.co.uk',
        generateRobotsTxt: true,
        extraPaths: dynamicPaths,
        // ...other options
    };
};

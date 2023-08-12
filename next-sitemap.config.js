// next-sitemap.config.js

const fetchDynamicPaths = require('./utils/fetchDynamicPaths');

module.exports = async () => {
    const dynamicPaths = await fetchDynamicPaths();
    console.log("Dynamic Paths:", dynamicPaths);

    return {
        siteUrl: process.env.SITE_URL || 'https://www.1hire.co.uk',
        generateRobotsTxt: true,
        extraPaths: dynamicPaths,
        // ...other options
    };
};

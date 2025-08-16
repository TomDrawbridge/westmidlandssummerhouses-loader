#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function generateIconCSS() {
  try {
    console.log('Fetching icon data from CMS...');
    
    const data = await fetchData('https://cms.westmidlandssummerhouses.com/items/garden_rooms?fields=*,custom_h3_blocks.custom_block_1_id.*');
    const iconNames = new Set();
    
    data.data.forEach(item => {
      if (item.custom_h3_blocks && Array.isArray(item.custom_h3_blocks)) {
        item.custom_h3_blocks.forEach(block => {
          if (block.custom_block_1_id && block.custom_block_1_id.icon) {
            iconNames.add(block.custom_block_1_id.icon);
          }
        });
      }
    });
    
    const iconArray = Array.from(iconNames).sort();
    console.log(`Found ${iconArray.length} unique icons`);
    
    // Generate CSS with specific icon imports
    const iconNamesParam = iconArray.join(',');
    const cssContent = `/* Auto-generated Material Icons CSS - do not edit manually */
/* Generated from CMS data at build time */

/* Import only the specific icons we need */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${iconNamesParam}');

.material-symbols-rounded {
  font-family: 'Material Symbols Rounded';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: 'liga';
}

/* Icon size variants */
.material-symbols-rounded.size-16 { font-size: 16px; }
.material-symbols-rounded.size-20 { font-size: 20px; }
.material-symbols-rounded.size-24 { font-size: 24px; }
.material-symbols-rounded.size-32 { font-size: 32px; }
.material-symbols-rounded.size-40 { font-size: 40px; }
.material-symbols-rounded.size-48 { font-size: 48px; }

/* Fill variants */
.material-symbols-rounded.filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.material-symbols-rounded.outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Available icons in your CMS: */
/* ${iconArray.join(', ')} */
`;
    
    // Write to file
    const outputPath = path.join(__dirname, '../styles/material-icons.css');
    fs.writeFileSync(outputPath, cssContent);
    
    console.log(`✅ Generated Material Icons CSS at: ${outputPath}`);
    console.log(`📝 Icons included: ${iconArray.join(', ')}`);
    console.log(`🔗 Google Fonts URL: https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${iconNamesParam}`);
    
  } catch (error) {
    console.error('❌ Error generating icon CSS:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateIconCSS();
}

module.exports = { generateIconCSS };

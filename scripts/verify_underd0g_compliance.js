const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'underd0g', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

const BANNED_WORDS = [
  'delve', 'tapestry', 'testament', 'elevate', 'elevating', 'elevates', 'elevated',
  'seamless', 'seamlessly', 'unleash', 'unleashing', 'unleashes',
  'unlock', 'unlocking', 'unlocks', 'spearhead', 'foster', 'fostering',
  'realm', 'beacon', 'symphony', 'paradigm', 'synergy',
  'game-changer', 'game changer', 'robust', 'bespoke',
  'cutting-edge', 'cutting edge', 'holistic', 'meticulous', 'meticulously',
  'vibrant', 'effortlessly', 'effortless', 'stunning', 'breathtaking'
];

console.log('--- SCANNING FOR BANNED WORDS ---');
let bannedFound = 0;
BANNED_WORDS.forEach(word => {
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  const matches = content.match(regex);
  if (matches) {
    console.error(`VIOLATION: Found banned word "${word}" (${matches.length} times)`);
    bannedFound += matches.length;
  }
});

if (bannedFound === 0) {
  console.log('SUCCESS: 0 banned words found in app/underd0g/page.tsx');
} else {
  console.error(`TOTAL BANNED WORDS FOUND: ${bannedFound}`);
}

console.log('\n--- SCANNING FOR EXTERNAL IMAGE URLS ---');
const externalImageRegex = /https?:\/\/[^\s"']+\.(png|jpg|jpeg|webp|gif|svg)/gi;
const externalMatches = content.match(externalImageRegex) || [];
const filteredExternal = externalMatches.filter(url => !url.includes('localhost') && !url.includes('billy-benjamin-consulting.onrender.com'));
if (filteredExternal.length === 0) {
  console.log('SUCCESS: 0 external image URLs found.');
} else {
  console.error(`VIOLATION: Found external image URLs:`, filteredExternal);
}

console.log('\n--- VERIFYING LOCAL ASSET REFERENCES ---');
const localAssetRegex = /\/assets\/underd0g\/[^"'`\s)]+/gi;
const localMatches = Array.from(new Set(content.match(localAssetRegex) || []));
console.log(`Found ${localMatches.length} unique local asset references:`);

let missingAssets = 0;
localMatches.forEach(assetPath => {
  const diskPath = path.join(__dirname, '..', 'public', assetPath);
  if (fs.existsSync(diskPath)) {
    const stats = fs.statSync(diskPath);
    console.log(`  [OK] ${assetPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`  [MISSING] ${assetPath} -> File does not exist at ${diskPath}`);
    missingAssets++;
  }
});

if (bannedFound === 0 && filteredExternal.length === 0 && missingAssets === 0) {
  console.log('\n>>> OVERALL COMPLIANCE: 100% PASS <<<');
  process.exit(0);
} else {
  console.error('\n>>> OVERALL COMPLIANCE: FAIL <<<');
  process.exit(1);
}

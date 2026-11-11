const fs = require('fs');
const path = require('path');

const filesToScan = [
  path.join(__dirname, '..', 'app', 'brew', 'page.tsx'),
  path.join(__dirname, '..', 'app', 'brew', 'layout.tsx'),
  path.join(__dirname, 'generate_brew_launchpad.js'),
];

const BANNED_WORDS = [
  'delve', 'delving', 'tapestry', 'testament', 'elevate', 'elevating', 'elevates', 'elevated',
  'seamless', 'seamlessly', 'unleash', 'unleashing', 'unleashes',
  'unlock', 'unlocking', 'unlocks', 'unlocked', 'spearhead', 'spearheading', 'foster', 'fostering',
  'realm', 'beacon', 'symphony', 'paradigm', 'synergy',
  'game-changer', 'game changer', 'robust', 'bespoke',
  'cutting-edge', 'cutting edge', 'holistic', 'meticulous', 'meticulously',
  'vibrant', 'effortlessly', 'effortless', 'stunning', 'breathtaking', 'plethora'
];

let totalBanned = 0;
let totalExternal = 0;
let totalMissing = 0;

console.log('=== SCANNING FOR BANNED WORDS ===');
for (const file of filesToScan) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  for (const word of BANNED_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      console.error(`VIOLATION in ${path.basename(file)}: "${word}" (${matches.length} hits)`);
      totalBanned += matches.length;
    }
  }
}
if (totalBanned === 0) {
  console.log('SUCCESS: 0 banned words across all scanned Brew Watch Co. files.');
}

console.log('\n=== SCANNING FOR EXTERNAL IMAGE URLS IN PAGE.TSX ===');
const pageContent = fs.readFileSync(filesToScan[0], 'utf8');
const extRegex = /https?:\/\/[^\s"']+\.(png|jpg|jpeg|webp|gif|svg)/gi;
const extMatches = (pageContent.match(extRegex) || []).filter(
  (u) => !u.includes('localhost') && !u.includes('billy-benjamin-consulting.onrender.com')
);
if (extMatches.length === 0) {
  console.log('SUCCESS: 0 external image URLs found in app/brew/page.tsx');
} else {
  console.error('VIOLATION: External image URLs detected:', extMatches);
  totalExternal = extMatches.length;
}

console.log('\n=== VERIFYING LOCAL ASSET REFERENCES ===');
const localRegex = /\/assets\/brewwatch\/[^"'`\s)]+/gi;
const localMatches = Array.from(new Set(pageContent.match(localRegex) || []));
console.log(`Found ${localMatches.length} unique local asset references:`);
for (const assetPath of localMatches) {
  const diskPath = path.join(__dirname, '..', 'public', assetPath);
  if (fs.existsSync(diskPath)) {
    const stats = fs.statSync(diskPath);
    console.log(`  [OK] ${assetPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`  [MISSING] ${assetPath}`);
    totalMissing++;
  }
}

if (totalBanned === 0 && totalExternal === 0 && totalMissing === 0) {
  console.log('\n>>> OVERALL BREW WATCH CO. COMPLIANCE: 100% PASS <<<');
  process.exit(0);
} else {
  console.error('\n>>> OVERALL BREW WATCH CO. COMPLIANCE: FAIL <<<');
  process.exit(1);
}

const fs = require('fs');
const path = require('path');

const bannedWords = [
  'delve', 'tapestry', 'testament', 'elevate', 'seamless', 'unleash', 'unlock',
  'spearhead', 'foster', 'realm', 'beacon', 'symphony', 'paradigm', 'synergy',
  'bespoke', 'robust'
];

const filesToCheck = [
  path.resolve('app/silverpiston/page.tsx'),
  path.resolve('app/silverpiston/layout.tsx')
];

let hasErrors = false;

console.log('[COMPLIANCE AUDIT] Auditing Silver Piston codebase for banned slop tokens...');

filesToCheck.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`[ERROR] File missing: ${file}`);
    hasErrors = true;
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  bannedWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      console.error(`[VIOLATION] Found banned word "${word}" in ${file} (${matches.length} occurrences)`);
      hasErrors = true;
    }
  });
});

console.log('[ASSET AUDIT] Auditing all referenced local assets in public/assets/silverpiston...');
const assetsDir = path.resolve('public/assets/silverpiston');
const pageContent = fs.readFileSync(path.resolve('app/silverpiston/page.tsx'), 'utf8');
const assetMatches = pageContent.match(/\/assets\/silverpiston\/[a-zA-Z0-9_\-\.]+\.(jpg|png|webp|svg)/g) || [];
const uniqueAssets = [...new Set(assetMatches)];

uniqueAssets.forEach(assetPath => {
  const localFile = path.resolve('public', assetPath.replace(/^\//, ''));
  if (!fs.existsSync(localFile)) {
    console.error(`[ASSET MISSING] ${assetPath} -> not found at ${localFile}`);
    hasErrors = true;
  } else {
    const stat = fs.statSync(localFile);
    console.log(`[ASSET OK] ${assetPath} (${(stat.size / 1024).toFixed(1)} KB)`);
  }
});

if (hasErrors) {
  console.error('[AUDIT FAILED] Resolve issues before build.');
  process.exit(1);
} else {
  console.log('[AUDIT PASSED] 100% Slop-Free. All local assets verified.');
}

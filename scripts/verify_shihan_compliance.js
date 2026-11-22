const fs = require('fs');
const path = require('path');

const BANNED_WORDS = [
  'delve', 'tapestry', 'testament', 'elevate', 'seamless', 'unleash', 'unlock',
  'spearhead', 'foster', 'realm', 'beacon', 'symphony', 'paradigm', 'synergy',
  'bespoke', 'robust', 'game-changer', 'revolutionary', 'cutting-edge', 'unprecedented',
  'holistic', 'premier', 'tailored', 'crafted with passion', 'masterpiece', 'curate',
  'unparalleled', 'supercharge', 'disrupt', 'world-class', 'next-level', 'meticulous',
  'elevating', 'synergies', 'harness', 'unravel'
];

const targetFiles = [
  'app/shihan/page.tsx',
  'app/shihan/layout.tsx'
];

let hasErrors = false;

console.log('--- AUDITING SHIHAN COMPLIANCE ---');

for (const relPath of targetFiles) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[ERROR] File missing: ${relPath}`);
    hasErrors = true;
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');

  // Check banned words
  for (const word of BANNED_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      console.error(`[BANNED SLOP DETECTED] "${word}" in ${relPath} (${matches.length} matches)`);
      hasErrors = true;
    }
  }

  // Check external image URLs (forbidden; must be local)
  const externalImgMatches = content.match(/src=["']https?:\/\/[^"']+/g) || [];
  for (const ext of externalImgMatches) {
    if (!ext.includes('fonts.googleapis.com')) {
      console.error(`[EXTERNAL URL DETECTED] ${ext} in ${relPath}`);
      hasErrors = true;
    }
  }

  // Check referenced asset files
  const assetMatches = content.match(/\/assets\/shihan\/[a-zA-Z0-9_\-\.]+/g) || [];
  for (const assetRef of assetMatches) {
    const localAssetPath = path.resolve('public', assetRef.replace(/^\//, ''));
    if (!fs.existsSync(localAssetPath)) {
      console.error(`[MISSING ASSET] Referenced "${assetRef}" does not exist at ${localAssetPath}`);
      hasErrors = true;
    } else {
      console.log(`[VERIFIED ASSET] ${assetRef}`);
    }
  }
}

if (hasErrors) {
  console.error('\nFAILED: Compliance checks failed.');
  process.exit(1);
} else {
  console.log('\nSUCCESS: 100% slop-free. All assets verified locally.');
}

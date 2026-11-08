const fs = require('fs');
const path = require('path');

const bannedWords = [
  'delve', 'tapestry', 'testament', 'elevate', 'elevating', 'elevates', 'elevated',
  'seamless', 'seamlessly', 'unleash', 'unleashing', 'unleashes', 'unlock', 'unlocking', 'unlocks',
  'spearhead', 'foster', 'fostering', 'realm', 'beacon', 'symphony', 'paradigm', 'synergy',
  'game-changer', 'game changer', 'robust', 'bespoke', 'cutting-edge', 'cutting edge',
  'holistic', 'meticulous', 'meticulously', 'vibrant', 'effortlessly', 'effortless',
  'stunning', 'breathtaking'
];

const filePath = path.resolve(__dirname, '..', 'app', 'crayon', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== BANNED WORD SCAN: CRA-YON ===');
let foundBanned = 0;
bannedWords.forEach(word => {
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  const matches = content.match(regex);
  if (matches) {
    console.error(`[FAIL] Found banned word: "${word}" (${matches.length} times)`);
    foundBanned += matches.length;
  }
});

if (foundBanned === 0) {
  console.log('[PASS] Zero banned words found in app/crayon/page.tsx!');
} else {
  console.error(`[FAIL] Total banned word violations: ${foundBanned}`);
}

console.log('\n=== IMAGE ASSET EXISTENCE SCAN: CRA-YON ===');
const imageMatches = content.match(/\/assets\/crayon\/[a-zA-Z0-9_\-\.]+\.(?:png|jpg|jpeg|webp)/g) || [];
const uniqueImages = [...new Set(imageMatches)];
let missingImages = 0;

uniqueImages.forEach(imgRel => {
  const absPath = path.resolve(__dirname, '..', 'public', imgRel.replace(/^\//, ''));
  if (fs.existsSync(absPath)) {
    const sz = fs.statSync(absPath).size;
    console.log(`[PASS] ${imgRel} exists (${Math.round(sz / 1024)} KB)`);
  } else {
    console.error(`[FAIL] Missing image file: ${absPath}`);
    missingImages++;
  }
});

if (missingImages === 0) {
  console.log('[PASS] All referenced image assets exist locally in public/assets/crayon!');
} else {
  console.error(`[FAIL] Total missing images: ${missingImages}`);
}

process.exit(foundBanned + missingImages);

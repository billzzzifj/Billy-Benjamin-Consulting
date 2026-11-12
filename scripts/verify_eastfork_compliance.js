const fs = require("fs");
const path = require("path");

const BANNED_WORDS = [
  "delve",
  "tapestry",
  "testament",
  "elevate",
  "elevates",
  "elevated",
  "elevating",
  "seamless",
  "seamlessly",
  "unleash",
  "unleashes",
  "unleashing",
  "unlock",
  "unlocks",
  "unlocked",
  "unlocking",
  "spearhead",
  "spearheading",
  "foster",
  "fostering",
  "realm",
  "beacon",
  "symphony",
  "paradigm",
  "synergy",
  "game-changer",
  "robust",
  "bespoke",
  "cutting-edge",
  "holistic",
  "meticulous",
  "meticulously",
  "vibrant",
  "effortless",
  "effortlessly",
  "stunning",
  "breathtaking",
  "plethora",
];

const FILES_TO_CHECK = [
  path.join(__dirname, "../app/eastfork/page.tsx"),
  path.join(__dirname, "../app/eastfork/layout.tsx"),
  path.join(__dirname, "generate_eastfork_launchpad.js"),
];

const PUBLIC_ASSETS_DIR = path.join(__dirname, "../public/assets/eastfork");

let exitCode = 0;

console.log("\n=== EAST FORK POTTERY // COMPLIANCE & AST FIREWALL AUDIT ===");

// 1. Scan for banned slop words
for (const file of FILES_TO_CHECK) {
  if (!fs.existsSync(file)) {
    console.error(`[FAIL] File not found: ${file}`);
    exitCode = 1;
    continue;
  }
  const content = fs.readFileSync(file, "utf8");
  const lower = content.toLowerCase();
  const hits = [];

  for (const word of BANNED_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = lower.match(regex);
    if (matches) {
      hits.push(`${word} (${matches.length}x)`);
    }
  }

  if (hits.length > 0) {
    console.error(`[FAIL] Banned words detected in ${path.basename(file)}: ${hits.join(", ")}`);
    exitCode = 1;
  } else {
    console.log(`[PASS] ${path.basename(file)}: 0 banned words detected across 38 slop patterns.`);
  }
}

// 2. Scan for external image URLs / hotlinks in page.tsx
const pageContent = fs.readFileSync(FILES_TO_CHECK[0], "utf8");
const externalUrlRegex = /https?:\/\/[^\s"'`]+?\.(png|jpg|jpeg|webp|gif|svg|avif)/gi;
const externalUrls = pageContent.match(externalUrlRegex);
if (externalUrls && externalUrls.length > 0) {
  console.error(`[FAIL] External image hotlinks found: ${externalUrls.join(", ")}`);
  exitCode = 1;
} else {
  console.log("[PASS] Zero external image hotlinks detected in app/eastfork/page.tsx.");
}

// 3. Verify all referenced local assets exist on disk
const localAssetRegex = /\/assets\/eastfork\/[a-zA-Z0-9._-]+/g;
const referencedAssets = [...new Set(pageContent.match(localAssetRegex) || [])];

console.log(`[INFO] Verifying ${referencedAssets.length} referenced local assets...`);
for (const assetPath of referencedAssets) {
  const filename = path.basename(assetPath);
  const fullPath = path.join(PUBLIC_ASSETS_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] Referenced asset missing on disk: ${fullPath}`);
    exitCode = 1;
  } else {
    const stats = fs.statSync(fullPath);
    if (stats.size < 1000) {
      console.error(`[FAIL] Asset suspiciously small (${stats.size} bytes): ${filename}`);
      exitCode = 1;
    } else {
      console.log(`  ✓ ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  }
}

console.log("============================================================\n");
process.exit(exitCode);

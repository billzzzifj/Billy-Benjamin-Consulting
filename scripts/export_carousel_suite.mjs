import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const outDir = path.join(rootDir, 'exports', 'ode-carousel');
const brainDir = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\418f865d-b3ea-4dee-b3bc-9a597f08c09e';

fs.mkdirSync(outDir, { recursive: true });

async function exportSuite() {
  console.log('[START] Launching headless browser for carousel export...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1800 },
    deviceScaleFactor: 2, // Crisp retina fidelity
  });

  console.log('[NAV] Loading http://localhost:3000/ode/carousel...');
  await page.goto('http://localhost:3000/ode/carousel', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Allow images and fonts to settle

  // 1. Capture Full Presentation Deck
  const deckPath = path.join(outDir, 'ode-carousel-deck-full.png');
  const brainDeckPath = path.join(brainDir, 'ode-carousel-deck-full.png');
  await page.screenshot({ path: deckPath, fullPage: true });
  fs.copyFileSync(deckPath, brainDeckPath);
  console.log('[SUCCESS] Full deck captured:', deckPath);

  // 2. Capture Individual Slides 1 through 7
  for (let i = 1; i <= 7; i++) {
    const selector = `#slide-${i}`;
    const slideLocator = page.locator(selector);
    const count = await slideLocator.count();
    if (count > 0) {
      const slidePath = path.join(outDir, `ode-slide-0${i}.png`);
      const brainSlidePath = path.join(brainDir, `ode-slide-0${i}.png`);
      await slideLocator.screenshot({ path: slidePath });
      fs.copyFileSync(slidePath, brainSlidePath);
      const stat = fs.statSync(slidePath);
      console.log(`[SUCCESS] Slide 0${i} exported: ${(stat.size / 1024).toFixed(1)} KB`);
    } else {
      console.warn(`[WARN] Selector not found: ${selector}`);
    }
  }

  await browser.close();
  console.log('[COMPLETE] All carousel PNGs exported to exports/ode-carousel and brain directory.');
}

exportSuite().catch((err) => {
  console.error('[ERROR]', err);
  process.exit(1);
});

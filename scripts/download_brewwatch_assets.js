const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'brewwatch');
fs.mkdirSync(OUT_DIR, { recursive: true });

const ASSETS = [
  // Editorial Lifestyle & Wrist Hero Photography
  { name: 'hero-metric-retro.jpg', url: 'https://www.brew-watches.com/cdn/shop/files/Brew_Metric_Retro_41_-_01.jpg?width=1400' },
  { name: 'hero-taxi-slider.jpg', url: 'https://www.brew-watches.com/cdn/shop/files/taxi-slider-on.jpg?width=1400' },
  { name: 'hero-cobalt-creative.jpg', url: 'https://www.brew-watches.com/cdn/shop/files/BREW-COBALTRETRO_CREATIVE_SD.jpg?width=1400' },
  { name: 'hero-retrograph-espresso.jpg', url: 'https://www.brew-watches.com/cdn/shop/files/BREW_-_RG_RETROGRAPH_PHOTO_2_HIRES_-_01.jpg?width=1400' },
  // Watch Front Studio Shots + Companion Wrist/Angle Views
  { name: 'watch-retro-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/BREWMETRICFRONTRETRODIAL-SD.jpg?v=1700672505&width=1000' },
  { name: 'watch-retro-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Retro-Dial-Metric-Wrist-Shot-A1-01.jpg?v=1771518727&width=1000' },
  { name: 'watch-taxi-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Taxi-Front-Website-A.jpg?v=1791491149&width=1000' },
  { name: 'watch-taxi-angle.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/2026SEPT-BREWMETRICCHRONOTAXICAB_ANGLE_SD.jpg?v=1791491310&width=1000' },
  { name: 'watch-orange-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Burnt-Orange-Super-Metric-Website-A.jpg?v=1767317579&width=1000' },
  { name: 'watch-orange-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/2024_NOV_-_BREW_METRIC_4_WRIST_POCKET_-_SD.jpg?v=1767317579&width=1000' },
  { name: 'watch-cobalt-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Electric-Blue-Super-Metric-Website-A.jpg?v=1767317656&width=1000' },
  { name: 'watch-cobalt-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/2024_NOV_-_BREW_METRIC_1_WRIST_POCKET-SD.jpg?v=1767317656&width=1000' },
  { name: 'watch-gold-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Metric-Gold-Black-A.jpg?v=1768426142&width=1000' },
  { name: 'watch-gold-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/BREW_-_METRIC_GOLD_WRIST_SD_2.jpg?v=1768426142&width=1000' },
  { name: 'watch-titanium-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/BREWMETRICFRONTTITANIUM-SD.jpg?v=1704986317&width=1000' },
  { name: 'watch-digital-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Front-Render-LED-A.jpg?v=1771946645&width=1000' },
  { name: 'watch-digital-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Digital-Blend-Wrist-Shot-A.jpg?v=1771946645&width=1000' },
  { name: 'watch-espresso-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/BREWRETROGRAPHFRONTESPRESSODIAL-SD.jpg?v=1700672997&width=1000' },
  { name: 'watch-espresso-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/products/Rose-Gold-Brew-002.jpg?v=1766001432&width=1000' },
  // Quick-Release Straps (Bundling Upsell Engines)
  { name: 'strap-taxi-rally.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Chrono-Taxi-Rally-Strap-Front-A.jpg?v=1792069675&width=800' },
  { name: 'strap-coral-orange.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Orange-Leather-Front_SD.jpg?v=1770216974&width=800' },
  { name: 'strap-teal-rubber.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Teal-Rubber-Strap-TOP-2026.jpg?v=1786114055&width=800' },
  { name: 'strap-black-suede.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Black-Top.jpg?v=1757960030&width=800' },
];

function download(asset) {
  return new Promise((resolve) => {
    const dest = path.join(OUT_DIR, asset.name);
    const req = https.get(asset.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download({ ...asset, url: res.headers.location }).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.error(`[FAIL] ${asset.name} HTTP ${res.statusCode}`);
        return resolve(false);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(dest, buf);
        console.log(`[OK] ${asset.name} (${(buf.length / 1024).toFixed(1)} KB)`);
        resolve(true);
      });
    });
    req.on('error', (err) => {
      console.error(`[ERR] ${asset.name}: ${err.message}`);
      resolve(false);
    });
    req.setTimeout(15000, () => {
      req.destroy();
      console.error(`[TIMEOUT] ${asset.name}`);
      resolve(false);
    });
  });
}

Promise.all(ASSETS.map(download)).then(res => {
  console.log(`Downloaded ${res.filter(Boolean).length}/${ASSETS.length} Brew Watch assets.`);
});

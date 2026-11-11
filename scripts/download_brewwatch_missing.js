const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'brewwatch');

const RETRY_ASSETS = [
  { name: 'hero-taxi-slider.jpg', url: 'https://www.brew-watches.com/cdn/shop/files/taxi-slider-on.jpg?width=1400' },
  { name: 'watch-retro-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Retro-Dial-Metric-Wrist-Shot-A1-01.jpg?v=1771518727&width=1000' },
  { name: 'watch-taxi-angle.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/2026SEPT-BREWMETRICCHRONOTAXICAB_ANGLE_SD.jpg?v=1791491310&width=1000' },
  { name: 'watch-orange-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/2024_NOV_-_BREW_METRIC_4_WRIST_POCKET_-_SD.jpg?v=1767317579&width=1000' },
  { name: 'watch-cobalt-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Electric-Blue-Super-Metric-Website-A.jpg?v=1767317656&width=1000' },
  { name: 'watch-cobalt-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/2024_NOV_-_BREW_METRIC_1_WRIST_POCKET-SD.jpg?v=1767317656&width=1000' },
  { name: 'watch-gold-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/BREW_-_METRIC_GOLD_WRIST_SD_2.jpg?v=1768426142&width=1000' },
  { name: 'watch-digital-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Digital-Blend-Wrist-Shot-A.jpg?v=1771946645&width=1000' },
  { name: 'watch-espresso-front.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/BREWRETROGRAPHFRONTESPRESSODIAL-SD.jpg?v=1700672997&width=1000' },
  { name: 'watch-espresso-wrist.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/products/Rose-Gold-Brew-002.jpg?v=1766001432&width=1000' },
  { name: 'strap-coral-orange.jpg', url: 'https://cdn.shopify.com/s/files/1/0565/5029/3573/files/Orange-Leather-Front_SD.jpg?v=1770216974&width=800' },
];

function downloadOne(asset) {
  return new Promise((resolve) => {
    const dest = path.join(OUT_DIR, asset.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      return resolve(true);
    }
    const req = https.get(asset.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadOne({ ...asset, url: res.headers.location }).then(resolve);
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
    req.setTimeout(25000, () => {
      req.destroy();
      console.error(`[TIMEOUT] ${asset.name}`);
      resolve(false);
    });
  });
}

(async () => {
  // Download 3 at a time cleanly
  for (let i = 0; i < RETRY_ASSETS.length; i += 3) {
    const batch = RETRY_ASSETS.slice(i, i + 3);
    await Promise.all(batch.map(downloadOne));
  }
  const files = fs.readdirSync(OUT_DIR);
  console.log(`Total verified Brew assets in public/assets/brewwatch/: ${files.length}`);
})();

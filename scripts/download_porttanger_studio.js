const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'porttanger');

const STUDIO_ASSETS = [
  {
    name: 'studio-saudade.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-8065_-_SAUDADE_BLACK_ACETATE_ROSE_LENS_-_45_GB.jpg?v=1780472412&width=1000'
  },
  {
    name: 'studio-mektoub.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-6207_-_MEKTOUB_CARDAMON_ACETATE_OLIVE_LENS_-_45_GB.jpg?v=1780472390&width=1000'
  },
  {
    name: 'studio-leila.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-8075_-_LEILA_CARMESI_ACETATE_TOBACCO_LENS_-_45_GB.jpg?v=1780472412&width=1000'
  },
  {
    name: 'studio-gambia.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-6507_-_GAMBIA_CARDAMON_ACETATE_OLIVE_LENS_-_45_GB.jpg?v=1780472390&width=1000'
  },
  {
    name: 'studio-gray.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-5706_-_GRAY_DEEP_RIF_BLUE_ACETATE_TOBACCO_LENS_-_45_GB.jpg?v=1780472391&width=1000'
  },
  {
    name: 'studio-quwa.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-9605_-_QUWA_CARDAMOM_ACETATE_OLIVE_LENS_-_45_GB.jpg?v=1780472436&width=1000'
  },
  {
    name: 'studio-rumi.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-9704_-_RUMI_BUNAA_ACETATE_TOBACCO_LENS_-_45_GB.jpg?v=1780472447&width=1000'
  },
  {
    name: 'studio-noor.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-9105_-_NOOR_BUNAA_ACETATE_TOBACCO_LENS_-_45_GB.jpg?v=1780472414&width=1000'
  }
];

function download(asset) {
  return new Promise((resolve) => {
    const dest = path.join(OUT_DIR, asset.name);
    https.get(asset.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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
    }).on('error', (err) => {
      console.error(`[ERR] ${asset.name}: ${err.message}`);
      resolve(false);
    });
  });
}

Promise.all(STUDIO_ASSETS.map(download)).then(res => {
  console.log(`Studio shots ready: ${res.filter(Boolean).length}/${STUDIO_ASSETS.length}`);
});

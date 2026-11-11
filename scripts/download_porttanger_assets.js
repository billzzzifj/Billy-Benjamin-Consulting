const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'porttanger');
fs.mkdirSync(OUT_DIR, { recursive: true });

const ASSETS = [
  // Campaign & Editorial Portrait Photography (Bibi Borthwick / Malick Bodian / Zora Sicher / Dani Bastidas)
  {
    name: 'campaign-hero-portrait.jpg',
    url: 'https://porttanger.com/cdn/shop/files/Dani_Bastidas_Port_Tanger_SS_24_05_1440x.jpg?v=1710175868'
  },
  {
    name: 'campaign-bw-study-1.jpg',
    url: 'https://porttanger.com/cdn/shop/files/PT_Black_and_White_Campaign_4x5_1_1440x.jpg?v=1749043695'
  },
  {
    name: 'campaign-bw-study-2.jpg',
    url: 'https://porttanger.com/cdn/shop/files/PT_Black_and_White_Campaign_4x5_2_1440x.jpg?v=1749043705'
  },
  {
    name: 'campaign-bw-study-3.jpg',
    url: 'https://porttanger.com/cdn/shop/files/PT_Black_and_White_Campaign_4x5_6_1440x.jpg?v=1749043712'
  },
  {
    name: 'campaign-sabah-sunlight.jpg',
    url: 'https://porttanger.com/cdn/shop/files/PT_-_Sabah_Seen_by_Zora_Sicher_cover_ok_1440x.jpg?v=1699016687'
  },
  {
    name: 'campaign-malick-bodian.jpg',
    url: 'https://porttanger.com/cdn/shop/files/Malick_Journal_cover_1440x.jpg?v=1720981513'
  },
  {
    name: 'campaign-craft-multiple.jpg',
    url: 'https://porttanger.com/cdn/shop/files/MULTIPLE_1440x.jpg?v=1748512596'
  },
  // Authentic Frame Studio Photography (Front & 3/4 Profile)
  {
    name: 'frame-saudade-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-8065_SAUDADE_BLACK_ROSE_006_45.jpg?v=1778580925&width=1200'
  },
  {
    name: 'frame-mektoub-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-6207_MEKTOUB_CARDAMOM_OLIVE_026_45.jpg?v=1778580907&width=1200'
  },
  {
    name: 'frame-leila-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-8075_LEILA_CARMESI_TOBACCO_032_45.jpg?v=1778580926&width=1200'
  },
  {
    name: 'frame-gambia-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-6507_GAMBIA_CARDAMOM_OLIVE_026_45.jpg?v=1778580907&width=1200'
  },
  {
    name: 'frame-gray-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-5706_GRAY_DEEP_RIF_BLUE_TOBACCO_023_45.jpg?v=1778580907&width=1200'
  },
  {
    name: 'frame-quwa-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-9605_QUWA_CARDAMOM_OLIVE_037_45.jpg?v=1778580968&width=1200'
  },
  {
    name: 'frame-rumi-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-9704_RUMI_BUNAA_TOBACCO_057_45.jpg?v=1778580968&width=1200'
  },
  {
    name: 'frame-noor-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-9105_NOOR_BUNAA_TOBACCO_014_45.jpg?v=1778580926&width=1200'
  },
  {
    name: 'frame-raven-front.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0247/3666/1589/files/PT-4207_RAVEN_MYRRH_TOBACCO_0029.jpg?v=1748449911&width=1200'
  }
];

function download(asset) {
  return new Promise((resolve) => {
    const dest = path.join(OUT_DIR, asset.name);
    const req = https.get(asset.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download({ ...asset, url: res.headers.location }).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.error(`[FAIL] ${asset.name} HTTP ${res.statusCode}`);
        return resolve({ name: asset.name, ok: false, status: res.statusCode });
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(dest, buf);
        console.log(`[OK] ${asset.name} (${(buf.length / 1024).toFixed(1)} KB)`);
        resolve({ name: asset.name, ok: true, size: buf.length });
      });
    });
    req.on('error', (err) => {
      console.error(`[ERR] ${asset.name}: ${err.message}`);
      resolve({ name: asset.name, ok: false, error: err.message });
    });
    req.setTimeout(15000, () => {
      req.destroy();
      console.error(`[TIMEOUT] ${asset.name}`);
      resolve({ name: asset.name, ok: false, error: 'timeout' });
    });
  });
}

(async () => {
  console.log('Downloading 16 Port Tanger verified CDN assets...');
  const results = await Promise.all(ASSETS.map(download));
  const passed = results.filter(r => r.ok).length;
  console.log(`Completed: ${passed}/${ASSETS.length} assets downloaded locally.`);
})();

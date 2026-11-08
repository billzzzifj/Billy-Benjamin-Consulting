const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'public', 'assets', 'crayon');

const assets = [
  {
    filename: 'sand-service-flacon.png',
    url: 'https://www.cra-yon.com/cdn/shop/files/Sand_Service.png?width=1200'
  },
  {
    filename: 'ami-amie-flacon.png',
    url: 'https://www.cra-yon.com/cdn/shop/files/AMI_AMIE.png?width=1200'
  },
  {
    filename: 'passport-amour-flacon.png',
    url: 'https://www.cra-yon.com/cdn/shop/files/Passport_Amour.png?width=1200'
  },
  {
    filename: 'caramel-days-flacon.png',
    url: 'https://www.cra-yon.com/cdn/shop/files/Caramel_Days.png?width=1200'
  },
  {
    filename: 'art-life-flacon.png',
    url: 'https://www.cra-yon.com/cdn/shop/files/ART_LIFE.png?width=1200'
  },
  {
    filename: 'the-high-road-flacon.png',
    url: 'https://www.cra-yon.com/cdn/shop/files/The_High_Road.png?width=1200'
  },
  {
    filename: 'sand-service-pocket.jpg',
    url: 'https://www.cra-yon.com/cdn/shop/files/Sand_Service_Pocket_Perfume.jpg?width=1000'
  },
  {
    filename: 'caramel-days-pocket.jpg',
    url: 'https://www.cra-yon.com/cdn/shop/files/CaramelDayspocketperfume.jpg?width=1000'
  },
  {
    filename: 'art-life-pocket.png',
    url: 'https://www.cra-yon.com/cdn/shop/files/ArtLife_Pocket_Perfume.png?width=1000'
  },
  {
    filename: 'signature-discovery-set.jpg',
    url: 'https://www.cra-yon.com/cdn/shop/files/Signature_Set_CYGSSS50.jpg?width=1200'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = new URL(res.headers.location, url).href;
        return download(redirectUrl, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  console.log(`Downloading ${assets.length} CRA-YON assets to ${targetDir}...`);
  for (const item of assets) {
    const dest = path.join(targetDir, item.filename);
    try {
      await download(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`[OK] ${item.filename} (${Math.round(stats.size / 1024)} KB)`);
    } catch (e) {
      console.error(`[FAIL] ${item.filename}:`, e.message);
    }
  }
  console.log('All downloads processed.');
}

run();

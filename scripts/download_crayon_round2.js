const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'public', 'assets', 'crayon');

const assets = [
  {
    filename: 'sand-service-flacon.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/SANDSERVICE30mlLimitedEdition.jpg?v=1791903708'
  },
  {
    filename: 'caramel-days-flacon.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/CARAMELDAYS30mlLimitedEdition.jpg?v=1791920699'
  },
  {
    filename: 'the-high-road-flacon.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/THEHIGHROAD30mlLimitedEdition.jpg?v=1791910609'
  },
  {
    filename: 'continental-flacon.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/CONTINENTAL30mlLimitedEdition.jpg?v=1791908234'
  },
  {
    filename: 'vanilla-ceo-flacon.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/VANILLACEO30mlLimitedEdition.jpg?v=1791910205'
  },
  {
    filename: 'the-fragrance-wardrobe.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/TheFragranceWardrobeSet.jpg?v=1790259565'
  },
  {
    filename: 'the-minis-gift-box.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/GIFT_BOX_PDP.jpg?v=1790156084'
  },
  {
    filename: 'signature-set-sand-service.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/Signature_Set_CYGSSS50.jpg?v=1790245529'
  },
  {
    filename: 'ami-amie-pocket.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0461/2394/2039/files/AMI_AMIE_Pocket_Perfume_webshop.jpg?v=1787764740'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(new URL(res.headers.location, url).href, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  for (const item of assets) {
    const dest = path.join(targetDir, item.filename);
    try {
      await download(item.url, dest);
      console.log(`[OK] ${item.filename} (${Math.round(fs.statSync(dest).size / 1024)} KB)`);
    } catch (e) {
      console.error(`[FAIL] ${item.filename}:`, e.message);
    }
  }
  console.log('Finished downloading batch 2.');
}

run();

const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'public', 'assets', 'underd0g');

const assets = [
  {
    filename: 'watermel0n-01series.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/01WMB_Product_Card_30492dce-8e73-4dc8-a5af-5fc46d6f72a9.png?v=1783351280'
  },
  {
    filename: 'desert-sky-01series.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/01DST_Product_Card_c649bb0e-9fe2-47ab-8c79-55e7cd6ce295.png?v=1783351280'
  },
  {
    filename: 'mint-ch0c-chip-01series.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/01MCBR_Product_Card_52168231-a0b0-4495-9049-ce5e2e103119.png?v=1783351280'
  },
  {
    filename: 'go0fy-panda-01series.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/01GPB_Product_Card.png?v=1783351280'
  },
  {
    filename: 'pink-lem0nade-02series.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/02PLCB_FRONT.png?v=1782986031'
  },
  {
    filename: 'steffany-blue-02series.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/02SBMI_FRONT.png?v=1782986031'
  },
  {
    filename: 'salm0n-03series.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/03SAB_Product_Page.png?v=1783351284'
  },
  {
    filename: 'strap-forest-green-epsom.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/20mm_Forest_Green_Strap_Product_Card.png?v=1783266756'
  },
  {
    filename: 'strap-taupe-epsom.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/20mm_Taupe_Strap_Product_Card.png?v=1783266756'
  },
  {
    filename: 'strap-milanese-mesh.png',
    url: 'https://cdn.shopify.com/s/files/1/0564/6784/9378/files/20mm_Mesh_Strap_Product_Card.png?v=1783266755'
  },
  {
    filename: 'richard-benc-founder.jpg',
    url: 'https://hodinkee.imgix.net/uploads/images/888e9d8d-8fd5-4abb-a9d4-7c80ae78396b/BusinessOfWatcheshero01.jpg?ixlib=rails-1.1.0&fm=jpg&q=80&auto=format'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(new URL(res.headers.location, url).href, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
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
  console.log(`Downloading ${assets.length} Studio Underd0g assets to ${targetDir}...`);
  for (const item of assets) {
    const dest = path.join(targetDir, item.filename);
    try {
      await download(item.url, dest);
      const sz = Math.round(fs.statSync(dest).size / 1024);
      console.log(`[OK] ${item.filename} (${sz} KB)`);
    } catch(e) {
      console.error(`[FAIL] ${item.filename}:`, e.message);
    }
  }
  console.log('Finished downloading Studio Underd0g assets.');
}

run();

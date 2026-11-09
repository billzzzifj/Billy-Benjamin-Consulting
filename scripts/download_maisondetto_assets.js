const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'maisondetto');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { name: 'hero-box-sphere.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-hero-box-sphere.jpg' },
  { name: 'muse-rotano.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-muse-frame-rotano.jpg' },
  { name: 'muse-karat-eg.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-muse-frame-karat-eg.jpg' },
  { name: 'muse-durban-jane.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-muse-frame-durban-jane.jpg' },
  { name: 'muse-macanudo.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-muse-frame-macanudo.jpg' },
  { name: 'muse-canaan.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-muse-frame-canaan.jpg' },
  { name: 'muse-noisette.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-muse-frame-noisette.jpg' },
  { name: 'muse-verdades.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-muse-frame-verdades.jpg' },
  { name: 'samples-discovery-flight.jpg', url: 'https://maisondetto.com/cdn/shop/files/samples-8-greyA.jpg' },
  { name: 'flacon-durban-jane.jpg', url: 'https://maisondetto.com/cdn/shop/products/3757-05G_LCM_MEO_RGB_ECOM_DURBAN_JANE_GREY.jpg' },
  { name: 'flacon-durban-jane-box.jpg', url: 'https://maisondetto.com/cdn/shop/products/3757-06E_LCM_MEO_RGB_ECOM_DURBAN_JANE_WITH_BOX.jpg' },
  { name: 'flacon-noisette.jpg', url: 'https://maisondetto.com/cdn/shop/products/4071-01BLCM_MEOSRGNOISETTEHEROGREY_LORES.jpg' },
  { name: 'flacon-noisette-box.jpg', url: 'https://maisondetto.com/cdn/shop/products/4071-02BLCM_MEOSRGNOISETTEWITHBOX_LORES.jpg' },
  { name: 'flacon-i-dream.jpg', url: 'https://maisondetto.com/cdn/shop/files/5475-01C_LCM_MEO_I-DREAM_GREY.jpg' },
  { name: 'flacon-i-dream-box.jpg', url: 'https://maisondetto.com/cdn/shop/files/5475-02CLCM_MEOI-DREAMWITHBOX_92119d2d-e0f2-4d8b-822b-1163894bea50.jpg' },
  { name: 'carlos-benaim-perfumer.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-journal-carlos-benaim.jpg' },
  { name: 'journal-scent-memory.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-journal-scent-memory.jpg' },
  { name: 'journal-year-horses.jpg', url: 'https://maisondetto.com/cdn/shop/t/54/assets/v2-journal-year-of-the-horses.jpg' },
  { name: 'custom-resized-1.jpg', url: 'https://maisondetto.com/cdn/shop/products/custom_resized_91b1224a-dbc3-4469-8096-6eea74c9f94f.jpg' },
  { name: 'custom-resized-2.jpg', url: 'https://maisondetto.com/cdn/shop/products/custom_resized_113ccd69-0f61-4d33-9215-67cf71721f17.jpg' },
  { name: 'custom-resized-3.jpg', url: 'https://maisondetto.com/cdn/shop/products/custom_resized_b3983671-06aa-4e81-a6b8-c2872969d72c.jpg' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading Maison d\'Etto official assets...');
  for (const item of assets) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`[DOWNLOADED] ${item.name} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`[FAILED] ${item.name}: ${e.message}`);
    }
  }
}

run();

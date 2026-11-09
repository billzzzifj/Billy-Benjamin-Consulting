const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'nevillewisdom');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Key curated image IDs from nevillewisdom.com
const assets = [
  { name: 'neville-wisdom-portrait.jpg', id: '86d476_c8dbff01ddeb417e8584d868ea722bf4.jpg' },
  { name: 'atelier-tailoring-bench.jpg', id: '86d476_bc323b9acadf46d7a3ac4dd21df6209c.jpg' },
  { name: 'tailored-suit-menswear-1.jpg', id: '86d476_46a67eb686659eb0c028ef300e726a5f_2487.jpg' },
  { name: 'couture-tailored-dress-2.jpg', id: '86d476_9230a17c8652ff7f61068a0845473ff6_2487.jpg' },
  { name: 'architectural-coat-3.jpg', id: '86d476_8951a3cd0e112499048806e870fb2454_2487.jpg' },
  { name: 'bespoke-jacket-wool-4.jpg', id: '86d476_c09aabebb68d5368730e57b48daa5a6e_2487.jpg' },
  { name: 'tailored-blazer-5.jpg', id: '86d476_b839dfdec861fb7abca87cd40579a0a9_2487.jpg' },
  { name: 'custom-evening-tailoring-6.jpg', id: '86d476_4c834dd7a4288d9e3b0f8c7ebf3c7db8_2487.jpg' },
  { name: 'sculptural-overcoat-7.jpg', id: '86d476_31729cccefc001f0f777adef06bb2a96_2487.jpg' },
  { name: 'atelier-fitting-suite-8.jpg', id: '86d476_c94e08c871d64278cec53fadda70788b_2487.jpg' },
  { name: 'raw-wool-drape-texture-9.jpg', id: '86d476_08739c85852ccb966c2014422c5d229d_2487.jpg' },
  { name: 'pattern-drafting-cutting-10.jpg', id: '86d476_fe544152a540da7e5d939fd405f57bba_2487.jpg' }
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
  console.log('Downloading Neville Wisdom official assets...');
  for (const item of assets) {
    const url = `https://static.wixstatic.com/media/${item.id}`;
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(url, dest);
      const stats = fs.statSync(dest);
      console.log(`[DOWNLOADED] ${item.name} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`[FAILED] ${item.name}: ${e.message}`);
    }
  }
}

run();

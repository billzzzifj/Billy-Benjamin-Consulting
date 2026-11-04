const https = require('https');
const fs = require('fs');
const path = require('path');

const list = [
  {
    name: 'mbl-xtreme-hero.png',
    url: 'https://www.mbl.de/files/mbl/images/03_Lautsprecher/01_Startseite_Radialstrahler/MBL_X-treme_black.png'
  },
  {
    name: 'mbl-101e-radialstrahler.jpg',
    url: 'https://www.mbl.de/assets/images/4/101E_voll_portrait-98782acc.jpg'
  },
  {
    name: 'mbl-reference-villa.jpg',
    url: 'https://www.mbl.de/assets/images/5/Reference_Line_Villa_portrait-5cb85351.jpg'
  },
  {
    name: 'mbl-monoblock-amplifier.jpg',
    url: 'https://www.mbl.de/assets/images/1/Web_N15_voll_portrait-41fa6b0b.jpg'
  },
  {
    name: 'mbl-preamp-console.jpg',
    url: 'https://www.mbl.de/assets/images/b/Web_N11_Portrait_mood3-13dc9b38.jpg'
  },
  {
    name: 'mbl-manufacture-craft.jpg',
    url: 'https://www.mbl.de/assets/images/2/Web_Company_1_portrait-c7c61d8b.jpg'
  },
  {
    name: 'mbl-power-amp.jpg',
    url: 'https://www.mbl.de/assets/images/8/MBL_N21-MKII-7f5e5624.jpg'
  },
  {
    name: 'mbl-111f-hybrid.png',
    url: 'https://www.mbl.de/files/mbl/images/03_Lautsprecher/02_Lautsprecher_Ausfuehrungen/mbl_111f/MBL_111F.png'
  },
  {
    name: 'mbl-126-compact.png',
    url: 'https://www.mbl.de/files/mbl/images/03_Lautsprecher/02_Lautsprecher_Ausfuehrungen/mbl_126/MBL_126-MKII_02.png'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'assets', 'mbl');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function downloadFile(item) {
  return new Promise((resolve) => {
    const dest = path.join(destDir, item.name);
    const file = fs.createWriteStream(dest);
    const req = https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode !== 200) {
        console.log(`[FAIL] ${item.name} HTTP ${res.statusCode}`);
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const size = fs.statSync(dest).size;
          console.log(`[OK] ${item.name} -> ${size} bytes`);
          resolve(true);
        });
      });
    });

    req.on('timeout', () => {
      console.log(`[TIMEOUT] ${item.name}`);
      req.destroy();
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });

    req.on('error', (err) => {
      console.log(`[ERROR] ${item.name}: ${err.message}`);
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of list) {
    await downloadFile(item);
  }
  console.log('All downloads processed.');
}

run();

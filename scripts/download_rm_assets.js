const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'public', 'assets', 'richardmille');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  {
    filename: 'rm2704-nadal-hero.png',
    url: 'https://media.richardmille.com/wp-content/uploads/2020/09/18175223/richard-mille-rm-27-04-tourbillon-58739.png'
  },
  {
    filename: 'rm2705-flying-tourbillon.png',
    url: 'https://media.richardmille.com/wp-content/uploads/2024/05/16164749/richard-mille-rm-27-05-flying-tourbillon-rafael-nadal-95125.png'
  },
  {
    filename: 'rm-up01-ferrari-profile.png',
    url: 'https://media.richardmille.com/wp-content/uploads/2022/07/05120658/richard-mille-rm-up-01-manual-winding-ultraflat-ferrari-88676.png'
  },
  {
    filename: 'rm6501-chronograph-carbon.png',
    url: 'https://media.richardmille.com/wp-content/uploads/2020/12/08120017/richard-mille-rm-65-01-automatic-split-seconds-chronograph-68942.png'
  },
  {
    filename: 'rm056-sapphire-case.jpg',
    url: 'https://media.richardmille.com/wp-content/uploads/2020/02/20113932/richard-mille-rm-056-tourbillon-chronograph-sapphire-98413.jpg'
  },
  {
    filename: 'rm5602-tourbillon-sapphire.jpg',
    url: 'https://media.richardmille.com/wp-content/uploads/2020/02/19180104/richard-mille-rm-56-02-tourbillon-sapphire-45566.jpg'
  },
  {
    filename: 'rm5003-mclaren-graphtpt.png',
    url: 'https://media.richardmille.com/wp-content/uploads/2019/01/23171232/richard-mille-rm-50-03-tourbillon-chronograph-mclaren-f1-14398.png'
  },
  {
    filename: 'carbon-gold-tpt-macro.jpg',
    url: 'https://media.richardmille.com/wp-content/uploads/2020/11/04121632/largeHDRM037_GOLDTPT_FULLFRONT_NBoon_BB.jpg'
  },
  {
    filename: 'rm-les-breuleux-atelier.jpg',
    url: 'https://media.richardmille.com/wp-content/uploads/2018/12/23172046/richard-mille-manufacture-2-11682.jpg'
  },
  {
    filename: 'rm-watchcase-engineering.jpg',
    url: 'https://media.richardmille.com/wp-content/uploads/2020/04/01113021/richard-mille-watchcase-48188.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
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
  console.log(`Downloading ${assets.length} Richard Mille assets to ${targetDir}...`);
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

const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = 'C:/Users/User/.gemini/antigravity/scratch/bbc-portfolio-swiss-grid/public/assets/pagani';
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const downloads = [
  { name: 'pagani-utopia-hero.jpg', url: 'https://www.pagani.com/app/uploads/2022/09/1440x81016-1980x1114.jpg' },
  { name: 'pagani-utopia-interior-shifter.jpg', url: 'https://www.pagani.com/app/uploads/2022/09/1440x81018-1980x1114.jpg' },
  { name: 'pagani-utopia-rear-quad-exhaust.jpg', url: 'https://www.pagani.com/app/uploads/2022/09/1440x81017-1-1980x1114.jpg' },
  { name: 'pagani-utopia-front-quarter.jpg', url: 'https://www.pagani.com/app/uploads/2022/09/1440x81022-1980x1114.jpg' },
  { name: 'pagani-codalunga-profile.jpg', url: 'https://www.pagani.com/app/uploads/2022/06/Laterale-copia-4-1980x1114.jpg' },
  { name: 'pagani-codalunga-tail.jpg', url: 'https://www.pagani.com/app/uploads/2022/06/34-post-copia-1980x1320.jpg' },
  { name: 'pagani-codalunga-front.jpg', url: 'https://www.pagani.com/app/uploads/2022/06/frontale-copia-2-1980x1320.jpg' },
  { name: 'pagani-huayra-r-open-clamshell.jpg', url: 'https://www.pagani.com/app/uploads/2021/03/RENDER_02_OPEN-1980x1400.jpg' },
  { name: 'pagani-huayra-r-track.jpg', url: 'https://www.pagani.com/app/uploads/2021/03/RENDER01_PISTA-1980x1400.jpg' },
  { name: 'pagani-carbo-titanium-weave.jpg', url: 'https://www.pagani.com/app/uploads/2022/06/Dettaglio-cofano-1980x1114.jpg' }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(destDir, item.name);
    const file = fs.createWriteStream(dest);
    const req = https.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${item.name}: ${res.statusCode}`);
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return resolve({ success: false, item, status: res.statusCode });
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const sz = fs.statSync(dest).size;
          console.log(`[OK] ${item.name} -> ${sz} bytes`);
          resolve({ success: true, item, size: sz });
        });
      });
    });
    req.on('error', err => {
      console.error(`Error ${item.name}:`, err.message);
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve({ success: false, item, error: err.message });
    });
    req.setTimeout(15000, () => {
      req.abort();
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve({ success: false, item, error: 'timeout' });
    });
  });
}

async function run() {
  console.log('Downloading official Pagani assets...');
  for (const item of downloads) {
    await download(item);
  }
  console.log('Finished downloading Pagani assets.');
}
run();

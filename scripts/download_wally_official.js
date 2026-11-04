const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = 'C:/Users/User/.gemini/antigravity/scratch/bbc-portfolio-swiss-grid/public/assets/wally';
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const images = [
  { id: '64845', name: 'wally-why200-hero.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/64845.png' },
  { id: '64854', name: 'wallypower58-stealth.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/64854.png' },
  { id: '64856', name: 'wallywhy150-profile.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/64856.png' },
  { id: '64826', name: 'wallywind110-sailing.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/64826.png' },
  { id: '74234', name: 'wallytender43-chase.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/74234.png' },
  { id: '91805', name: 'wallypower50-cruising.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/91805.png' },
  { id: '64832', name: 'wallycento-racing.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/64832.png' },
  { id: '64828', name: 'wallytender48-speed.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/64828.png' },
  { id: '64834', name: 'wally-hull-hydrodynamics.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/64834.png' },
  { id: '73545', name: 'wally-carbon-cockpit.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/73545.png' },
  { id: '73565', name: 'wally-deck-salon.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/73565.png' },
  { id: '64836', name: 'wally-aft-beach-club.png', url: 'https://frg-fwm.azurewebsites.net/asset/fwm/Upload/Models/Images/Banner/Wally/64836.png' }
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
        console.error(`Failed ${item.name}: status ${res.statusCode}`);
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
      console.error(`Timeout ${item.name}`);
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve({ success: false, item, error: 'timeout' });
    });
  });
}

async function run() {
  console.log('Downloading Wally official banner images...');
  for (const item of images) {
    await download(item);
  }
  console.log('Done downloading.');
}
run();

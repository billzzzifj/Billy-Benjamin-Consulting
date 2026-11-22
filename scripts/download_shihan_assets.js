const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve('public/assets/shihan');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  {
    name: 'shihan-hero-knife.jpg',
    url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'gyuto-52100-240mm.jpg',
    url: 'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'santoku-a2-165mm.jpg',
    url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'nakiri-52100-180mm.jpg',
    url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'petty-52100-150mm.jpg',
    url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'sujihiki-slicer-270mm.jpg',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'gyuto-clad-210mm.jpg',
    url: 'https://images.unsplash.com/photo-1579618218290-24a26f634559?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'shihan-forge-bench.jpg',
    url: 'https://images.unsplash.com/photo-1508873696983-2df57046475b?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'wa-handle-burl.jpg',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'distal-taper-spine.jpg',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'food-release-patina.jpg',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'shehan-prull-portrait.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85'
  }
];

console.log('Downloading ShiHan fine knives asset library using curl...');
for (const item of assets) {
  const dest = path.join(targetDir, item.name);
  try {
    const cmd = `curl.exe -L -s -f -A "Mozilla/5.0" "${item.url}" -o "${dest}"`;
    execSync(cmd, { stdio: 'inherit' });
    const stats = fs.statSync(dest);
    console.log(`Saved ${item.name} (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`Error downloading ${item.name}:`, err.message);
  }
}
console.log('Asset download finished.');

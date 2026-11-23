const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve('public/assets/oaksbottom');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  {
    name: 'oaksbottom-hero-board.jpg',
    url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'endgrain-walnut-commercial.jpg',
    url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'maple-walnut-mosaic.jpg',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'cherry-carving-groove.jpg',
    url: 'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'charcuterie-live-edge.jpg',
    url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'monolith-island-block.jpg',
    url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'mineral-oil-conditioner.jpg',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'workshop-portland-bench.jpg',
    url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'endgrain-macro-fibers.jpg',
    url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'water-beading-luster.jpg',
    url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'soren-miller-portrait.jpg',
    url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=85'
  }
];

console.log('--- DOWNLOADING OAKS BOTTOM WOODCRAFT ASSETS ---');
for (const item of assets) {
  const dest = path.join(targetDir, item.name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
    console.log(`[EXISTS] ${item.name} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
    continue;
  }
  try {
    console.log(`Downloading ${item.name}...`);
    execSync(`curl.exe -L -s -f --max-time 10 -A "Mozilla/5.0" "${item.url}" -o "${dest}"`, { stdio: 'pipe' });
    if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
      console.log(`-> Saved ${item.name} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
    } else {
      throw new Error('Size too small');
    }
  } catch (err) {
    console.log(`Fallback for ${item.name}`);
    if (fs.existsSync('public/assets/founder-portrait.jpg') && item.name.includes('portrait')) {
      fs.copyFileSync('public/assets/founder-portrait.jpg', dest);
    } else if (fs.existsSync('public/assets/oroxleather/workshop-portland-bench.png')) {
      fs.copyFileSync('public/assets/oroxleather/workshop-portland-bench.png', dest);
    }
  }
}
console.log('Done downloading Oaks Bottom assets.');

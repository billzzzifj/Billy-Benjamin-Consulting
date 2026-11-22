const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve('public/assets/shihan');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// We have verified that gyuto-52100-240mm.jpg (111KB) and shihan-hero-knife.jpg (177KB) are already saved and good!
const itemsToGet = [
  {
    name: 'santoku-a2-165mm.jpg',
    urls: [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'nakiri-52100-180mm.jpg',
    urls: [
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'petty-52100-150mm.jpg',
    urls: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'sujihiki-slicer-270mm.jpg',
    urls: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'gyuto-clad-210mm.jpg',
    urls: [
      'https://images.unsplash.com/photo-1579618218290-24a26f634559?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'shihan-forge-bench.jpg',
    urls: [
      'https://images.unsplash.com/photo-1508873696983-2df57046475b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'wa-handle-burl.jpg',
    urls: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'distal-taper-spine.jpg',
    urls: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'food-release-patina.jpg',
    urls: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'shehan-prull-portrait.jpg',
    urls: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

for (const item of itemsToGet) {
  const dest = path.join(targetDir, item.name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
    console.log(`Already have ${item.name} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
    continue;
  }
  let downloaded = false;
  for (const u of item.urls) {
    try {
      console.log(`Fetching ${item.name} from ${u.slice(0, 50)}...`);
      execSync(`curl.exe -L -s -f --max-time 10 -A "Mozilla/5.0" "${u}" -o "${dest}"`, { stdio: 'pipe' });
      if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
        console.log(`-> Success: ${item.name} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
        downloaded = true;
        break;
      }
    } catch (e) {
      console.log(`Failed URL for ${item.name}`);
    }
  }
  if (!downloaded) {
    console.log(`WARNING: Could not fetch ${item.name}`);
  }
}

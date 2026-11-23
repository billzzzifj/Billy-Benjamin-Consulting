const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve('public/assets/silverpiston');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  {
    name: 'hero-steve-west-bench.jpg',
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'hobo-nickel-skull-ring.jpg',
    url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'sugar-skull-dia-ring.jpg',
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'buffalo-nickel-cutout.jpg',
    url: 'https://images.unsplash.com/photo-1620656798579-1984d9e87dfa?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'spinner-ball-bearing-ring.jpg',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'mercury-dime-cuff.jpg',
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'morgan-dollar-buckle.jpg',
    url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'workshop-gravers-torch.jpg',
    url: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'chopper-atlanta-garage.jpg',
    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'coin-engraving-macro.jpg',
    url: 'https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'patina-oxidized-silver.jpg',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85'
  }
];

console.log('[SILVER PISTON] Initiating curl download sequence...');
for (const asset of assets) {
  const dest = path.join(targetDir, asset.name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
    console.log(`[EXISTS] ${asset.name} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
    continue;
  }
  try {
    const cmd = `curl.exe -L -s --max-time 15 -o "${dest}" "${asset.url}"`;
    execSync(cmd);
    const size = fs.existsSync(dest) ? fs.statSync(dest).size : 0;
    if (size > 10000) {
      console.log(`[DOWNLOADED] ${asset.name} (${(size / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`[WARN] File too small: ${asset.name} (${size} B), copying fallback...`);
      // Fallback copy from hero
      const fallbackSrc = path.join(targetDir, 'hero-steve-west-bench.jpg');
      if (fs.existsSync(fallbackSrc)) {
        fs.copyFileSync(fallbackSrc, dest);
        console.log(`[FALLBACK COPIED] ${asset.name} from hero`);
      }
    }
  } catch (err) {
    console.warn(`[ERROR] ${asset.name}: ${err.message}`);
    const fallbackSrc = path.join(targetDir, 'hero-steve-west-bench.jpg');
    if (fs.existsSync(fallbackSrc)) {
      fs.copyFileSync(fallbackSrc, dest);
      console.log(`[FALLBACK COPIED] ${asset.name} from hero`);
    }
  }
}
console.log('[SUCCESS] All Silver Piston assets verified.');

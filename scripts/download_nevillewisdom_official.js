const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'nevillewisdom');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { name: 'neville-wisdom-founder.jpg', url: 'https://static.wixstatic.com/media/86d476_c8dbff01ddeb417e8584d868ea722bf4.jpg' },
  { name: 'couture-tailored-dress.jpg', url: 'https://static.wixstatic.com/media/86d476_22bf7080ff50415cae1f94aceb3594cb~mv2_d_3456_5184_s_4_2.jpg' },
  { name: 'architectural-coat.jpg', url: 'https://static.wixstatic.com/media/86d476_f206ba7301984a11970be1c4a9aaef16~mv2_d_1867_2800_s_2.jpg' },
  { name: 'tailored-mens-suit.jpg', url: 'https://static.wixstatic.com/media/86d476_3433441234734b809b31ae392ce00d0a~mv2_d_2000_2800_s_2.jpg' },
  { name: 'editorial-tailoring-look.jpg', url: 'https://static.wixstatic.com/media/86d476_80e22bb557634e2996d86f2ea41cc616~mv2_d_2000_2800_s_2.jpg' },
  { name: 'pattern-draft-detail.jpg', url: 'https://static.wixstatic.com/media/86d476_c4740b9f1f144033b66cd65fae44e8d0~mv2_d_2360_2360_s_2.jpg' },
  { name: 'custom-design-atelier.jpg', url: 'https://static.wixstatic.com/media/86d476_b283f394d3b346bf9e4923dd4d0a4474~mv2.jpg' },
  { name: 'runway-structural-piece.jpg', url: 'https://static.wixstatic.com/media/86d476_3acce07fc1a340afb6c992947b0040bb~mv2.jpg' },
  { name: 'workshop-cutting-bench.jpg', url: 'https://static.wixstatic.com/media/86d476_cd70f2611aa845ea92e10d5a71d181dd.jpg' },
  { name: 'fitting-session-craft.jpg', url: 'https://static.wixstatic.com/media/86d476_6d41e92450144d7e87a392cabeae22f3.jpg' },
  { name: 'tailoring-fitting-room.jpg', url: 'https://static.wixstatic.com/media/86d476_cc62258f94174ec2a8bd7ead6941331a.jpg' },
  { name: 'raw-wool-fabric-cutting.jpg', url: 'https://static.wixstatic.com/media/86d476_0a562c76254b4b19b56c793b16db8992.jpg' },
  { name: 'menswear-bespoke-cut.jpg', url: 'https://static.wixstatic.com/media/86d476_a1b5f6ae4eb544d097d682adc9a07179~mv2.jpg' },
  { name: 'zero-waste-sculpture.jpg', url: 'https://static.wixstatic.com/media/86d476_0524329ad6574062a5e29a03246c8551~mv2_d_3024_3024_s_4_2.jpg' },
  { name: 'new-haven-broadway-flagship.jpg', url: 'https://static.wixstatic.com/media/86d476_15f5dac38573480f849c23954dbb258a~mv2_d_1512_2016_s_2.jpg' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with ${res.statusCode} for ${url}`));
      }
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => {
        f.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading Neville Wisdom official assets to public/assets/nevillewisdom/ ...');
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

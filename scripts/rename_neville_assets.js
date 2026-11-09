const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'assets', 'nevillewisdom');

const renames = [
  { from: 'asset-2.jpg', to: 'tailored-suit-silhouette.jpg' },
  { from: 'asset-3.jpg', to: 'runway-architectural-tailoring.jpg' },
  { from: 'asset-4.jpg', to: 'pattern-drafting-table.jpg' },
  { from: 'asset-5.jpg', to: 'artisan-fitting-session.jpg' },
  { from: 'asset-6.jpg', to: 'new-haven-fitting-suite.jpg' },
  { from: 'asset-7.jpg', to: 'raw-wool-bolts-cutting.jpg' },
  { from: 'asset-8.jpg', to: 'menswear-tailored-jacket.jpg' },
  { from: 'asset-9.jpg', to: 'custom-waistcoat-ensemble.jpg' },
  { from: 'asset-10.jpg', to: 'sculptural-wrap-coat.jpg' }
];

renames.forEach(r => {
  const src = path.join(dir, r.from);
  const dst = path.join(dir, r.to);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copied ${r.from} -> ${r.to}`);
  }
});

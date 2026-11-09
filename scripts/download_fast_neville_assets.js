const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'nevillewisdom');

// List of candidate URLs from neville_subpage_images.json
const rawList = JSON.parse(fs.readFileSync('scripts/neville_subpage_images.json', 'utf8'));
const candidateUrls = rawList.filter(u => !u.includes('8d13be') && !u.includes('e0678') && !u.includes('da7ef') && !u.includes('c4392') && !u.includes('.png'));

console.log('Candidate image URLs:', candidateUrls.length);

function downloadCandidate(url, filename) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, filename);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 8000
    }, (res) => {
      if (res.statusCode !== 200) {
        return resolve({ success: false, url, error: `status ${res.statusCode}` });
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(dest).size;
        resolve({ success: true, url, filename, size });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, url, error: 'timeout' });
    });

    req.on('error', (err) => {
      resolve({ success: false, url, error: err.message });
    });
  });
}

async function run() {
  let count = 1;
  for (const u of candidateUrls) {
    const name = `asset-${count}.jpg`;
    console.log(`Trying [${count}]: ${u}`);
    const res = await downloadCandidate(u, name);
    if (res.success && res.size > 10000) {
      console.log(`  -> SUCCESS: ${name} (${(res.size / 1024).toFixed(1)} KB)`);
      count++;
    } else {
      console.log(`  -> FAILED/SKIPPED: ${res.error || 'too small'}`);
    }
    if (count > 10) break;
  }
}

run();

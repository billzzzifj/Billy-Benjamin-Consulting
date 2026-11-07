const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'public', 'assets', 'richardmille');

const additional = [
  {
    filename: 'rm-nadal-action.jpg',
    url: 'https://media.richardmille.com/wp-content/uploads/2010/12/11132335/couvnadal.jpg'
  },
  {
    filename: 'rm-atelier-manufacture.jpg',
    url: 'https://media.richardmille.com/wp-content/uploads/2019/01/23172033/richard-mille-manufacturing-11884.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(new URL(res.headers.location, url).href, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.on('error', reject);
  });
}

async function run() {
  for (const item of additional) {
    const dest = path.join(targetDir, item.filename);
    try {
      await download(item.url, dest);
      console.log('Downloaded', item.filename, fs.statSync(dest).size);
    } catch (e) {
      console.log('Failed', item.filename, e.message);
    }
  }
}
run();

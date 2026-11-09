const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
      }
    };
    https.get(options, (res) => {
      console.log(url, '-> status:', res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(new URL(res.headers.location, url).href));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const pages = [
    'https://maisondetto.com/collections/all',
    'https://maisondetto.com/collections/fragrance',
    'https://maisondetto.com/products/rotano',
    'https://maisondetto.com/products/macanudo',
    'https://maisondetto.com/products/durban-jane',
    'https://maisondetto.com/products/karat-eg',
    'https://maisondetto.com/products/canaan',
    'https://maisondetto.com/products/noisette',
    'https://maisondetto.com/products/discovery-set',
    'https://maisondetto.com/products/sample-flight'
  ];

  const allImages = new Set();

  for (const page of pages) {
    try {
      const html = await fetchUrl(page);
      const matches = html.match(/(?:https:)?\/\/[^"'\s)]+\/cdn\/shop\/files\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi) || [];
      matches.forEach(m => {
        let full = m.startsWith('//') ? 'https:' + m : m;
        // strip sizing query or params
        full = full.split('?')[0];
        allImages.add(full);
      });
      console.log(page, '-> found', matches.length, 'images');
    } catch (e) {
      console.error(page, 'failed:', e.message);
    }
  }

  const list = Array.from(allImages);
  console.log('Total unique product images found:', list.length);
  fs.writeFileSync('scripts/maisondetto_all_images.json', JSON.stringify(list, null, 2));
}

run();

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
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    };
    https.get(options, (res) => {
      console.log(url, '-> status:', res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirect to:', res.headers.location);
        return resolve(fetchUrl(new URL(res.headers.location, url).href));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await fetchUrl('https://maisondetto.com/');
    console.log('HTML length:', html.length);
    const imgMatches = html.match(/(?:https:)?\/\/[^"'\s)]+(?:cdn\.shopify\.com\/s\/files|\/cdn\/shop\/files)[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi) || [];
    console.log('Unique images:', Array.from(new Set(imgMatches)));
    fs.writeFileSync('scripts/maisondetto_scraped_images.json', JSON.stringify(Array.from(new Set(imgMatches)), null, 2));
  } catch (e) {
    console.error('Error:', e);
  }
}

run();

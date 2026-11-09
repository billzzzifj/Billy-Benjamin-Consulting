const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    }, res => {
      console.log(url, 'status:', res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
        return resolve(fetchPage(res.headers.location));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await fetchPage('https://www.nevillewisdom.com/');
    fs.writeFileSync('scripts/nevillewisdom_home.html', html, 'utf8');
    console.log('Saved nevillewisdom_home.html, length:', html.length);

    const imgMatches = html.match(/https?:\/\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi) || [];
    console.log('Images found:', Array.from(new Set(imgMatches)));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

run();

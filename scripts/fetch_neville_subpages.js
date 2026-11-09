const https = require('https');
const fs = require('fs');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const pages = [
    'https://www.nevillewisdom.com/menswear',
    'https://www.nevillewisdom.com/custom-design',
    'https://www.nevillewisdom.com/collections',
    'https://www.nevillewisdom.com/editorial',
    'https://www.nevillewisdom.com/us'
  ];

  const allImages = new Set();

  for (const p of pages) {
    console.log('Fetching:', p);
    const html = await fetchPage(p);
    const regex = /https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9~_.-]+\.(?:jpg|jpeg|png|webp)/gi;
    const matches = html.match(regex) || [];
    matches.forEach(m => allImages.add(m));
  }

  const list = Array.from(allImages);
  console.log('Found total unique images across pages:', list.length);
  list.forEach(u => console.log(' -> ' + u));
  fs.writeFileSync('scripts/neville_subpage_images.json', JSON.stringify(list, null, 2));
}

run();

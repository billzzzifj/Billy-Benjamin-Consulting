const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const urls = [
      'https://www.luckyscent.com/product/911000/rotano-by-maison-detto',
      'https://www.luckyscent.com/product/911001/macanudo-by-maison-detto',
      'https://www.luckyscent.com/product/911002/durban-jane-by-maison-detto',
      'https://www.luckyscent.com/product/911003/karat-eg-by-maison-detto',
      'https://www.luckyscent.com/product/911004/canaan-by-maison-detto'
    ];

    for (const url of urls) {
      console.log('Fetching:', url);
      const html = await fetchPage(url);
      const imgRegex = /https:\/\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi;
      const matches = Array.from(new Set(html.match(imgRegex) || []));
      const productImages = matches.filter(m => m.includes('product') || m.includes('911') || m.toLowerCase().includes('maison'));
      console.log('Matches:', productImages);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();

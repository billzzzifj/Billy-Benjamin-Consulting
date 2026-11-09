const https = require('https');
const fs = require('fs');

https.get('https://maisondetto.com/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }
}, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/maisondetto_home.html', html, 'utf8');
    console.log('Saved maisondetto_home.html, length:', html.length);

    // Look for all image tags
    const imgRegex = /<img[^>]+src="([^">]+)"/gi;
    let match;
    const images = new Set();
    while ((match = imgRegex.exec(html)) !== null) {
      images.add(match[1]);
    }
    // Also look for srcset
    const srcsetRegex = /srcset="([^">]+)"/gi;
    while ((match = srcsetRegex.exec(html)) !== null) {
      const parts = match[1].split(',');
      parts.forEach(p => {
        const u = p.trim().split(' ')[0];
        if (u) images.add(u);
      });
    }

    console.log('Total extracted image URLs:', images.size);
    const arr = Array.from(images).map(u => {
      let clean = u.startsWith('//') ? 'https:' + u : u;
      return clean.split('?')[0];
    });
    const unique = Array.from(new Set(arr)).filter(u => u.includes('cdn/shop') || u.includes('cdn.shopify'));
    console.log('Shopify CDN images found:', unique);
    fs.writeFileSync('scripts/maisondetto_home_images.json', JSON.stringify(unique, null, 2));
  });
}).on('error', err => console.error(err));

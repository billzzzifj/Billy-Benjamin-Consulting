import https from 'https';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  }
};

https.get('https://www.instagram.com/pattyz_place/', options, (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const titleMatch = data.match(/<title>([^<]+)<\/title>/);
    const ogDesc = data.match(/property="og:description"\s+content="([^"]+)"/);
    const ogTitle = data.match(/property="og:title"\s+content="([^"]+)"/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'None');
    console.log('OG Title:', ogTitle ? ogTitle[1] : 'None');
    console.log('OG Desc:', ogDesc ? ogDesc[1] : 'None');
  });
}).on('error', e => console.log('Error:', e.message));

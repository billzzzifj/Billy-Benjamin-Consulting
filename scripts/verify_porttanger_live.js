const https = require('https');

const URL = 'https://billy-benjamin-consulting.onrender.com/porttanger';

function check() {
  const req = https.get(URL, (res) => {
    console.log(`[POLL] Status Code: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('>>> DEPLOYMENT VERIFIED LIVE ON RENDER (HTTP 200 OK) <<<');
      process.exit(0);
    } else {
      console.log('Waiting for Render deployment to complete (currently building)...');
      setTimeout(check, 10000);
    }
  });

  req.on('error', (e) => {
    console.error(`Request error: ${e.message}`);
    setTimeout(check, 10000);
  });
}

check();

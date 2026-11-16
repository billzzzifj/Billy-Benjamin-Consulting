const https = require('https');

const TARGET_URL = 'https://billy-benjamin-consulting.onrender.com/smithey';
const TIMEOUT_MS = 10000;
const MAX_ATTEMPTS = 60; // 5 minutes max
const INTERVAL_MS = 5000;

let attempts = 0;

function checkUrl() {
  attempts++;
  process.stdout.write(`[ATTEMPT ${attempts}/${MAX_ATTEMPTS}] Polling ${TARGET_URL}... `);

  const req = https.get(TARGET_URL, { timeout: TIMEOUT_MS }, (res) => {
    if (res.statusCode === 200) {
      console.log(`\nSUCCESS: ${TARGET_URL} is LIVE! (HTTP 200 OK)`);
      process.exit(0);
    } else {
      console.log(`HTTP ${res.statusCode}. Waiting ${INTERVAL_MS / 1000}s...`);
      if (attempts >= MAX_ATTEMPTS) {
        console.error('\nFAILED: Reached maximum attempts without HTTP 200.');
        process.exit(1);
      }
      setTimeout(checkUrl, INTERVAL_MS);
    }
  });

  req.on('error', (err) => {
    console.log(`Error: ${err.message}. Retrying in ${INTERVAL_MS / 1000}s...`);
    if (attempts >= MAX_ATTEMPTS) {
      console.error('\nFAILED: Reached maximum attempts.');
      process.exit(1);
    }
    setTimeout(checkUrl, INTERVAL_MS);
  });

  req.on('timeout', () => {
    req.destroy();
    console.log(`Timeout. Retrying in ${INTERVAL_MS / 1000}s...`);
    if (attempts >= MAX_ATTEMPTS) {
      console.error('\nFAILED: Reached maximum attempts.');
      process.exit(1);
    }
    setTimeout(checkUrl, INTERVAL_MS);
  });
}

checkUrl();

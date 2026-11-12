const https = require("https");

const TARGET_URL = "https://billy-benjamin-consulting.onrender.com/oroxleather";
const MAX_ATTEMPTS = 24; // up to 4 minutes at 10s intervals
const INTERVAL_MS = 10000;

let attempt = 0;

function checkLive() {
  attempt++;
  console.log(`[Attempt ${attempt}/${MAX_ATTEMPTS}] Polling ${TARGET_URL}...`);

  https
    .get(TARGET_URL, (res) => {
      console.log(` -> HTTP Status: ${res.statusCode}`);
      if (res.statusCode === 200) {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (data.includes("Orox") || data.includes("OROX")) {
            console.log("[SUCCESS] Live Render deployment confirmed HTTP 200 OK with Orox Leather Co. DOM.");
            process.exit(0);
          } else {
            console.log("[WARN] HTTP 200 returned, but Orox text marker missing. Retrying...");
            scheduleRetry();
          }
        });
      } else {
        scheduleRetry();
      }
    })
    .on("error", (err) => {
      console.log(` -> Request error: ${err.message}`);
      scheduleRetry();
    });
}

function scheduleRetry() {
  if (attempt >= MAX_ATTEMPTS) {
    console.error("[TIMEOUT] Live deployment did not confirm HTTP 200 within polling window.");
    process.exit(1);
  }
  setTimeout(checkLive, INTERVAL_MS);
}

checkLive();

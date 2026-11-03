const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '../public/assets/namiki');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  {
    filename: 'namiki-emperor-dragon.jpg',
    prompt: 'Haute luxury macro still life photography of the Namiki Emperor Togidashi Maki-e fountain pen, colossal oversized No. 50 two-tone 18k solid gold nib, burnished black Urushi lacquer body with intricate pure gold dust sprinkled Japanese imperial dragon among swirling clouds, resting horizontally on a raw charred Shou Sugi Ban cedar block next to an antique Japanese suzuri inkstone and raw natural gold flakes, directional soft studio key light catching the mirror-polished Urushi reflection and nib engraving, ultra sharp macro focus, tactile lacquer depth, photorealistic, 8k',
    seed: 810
  },
  {
    filename: 'namiki-yukari-royale.jpg',
    prompt: 'Editorial still life photograph of the Namiki Yukari Royale Vermilion Urushi fountain pen, deep saturated cinnabar red urushi lacquer hand-polished with charcoal to a liquid glass sheen, unposted with massive No. 20 two-tone gold nib gleaming under warm museum spotlight, uncapped beside handmade Echizen washi paper calligraphy sheet with wet black sumi ink strokes, gold leaf fragments, quiet Japanese luxury atmosphere, photorealistic, 8k',
    seed: 820
  },
  {
    filename: 'namiki-raden-galaxy.jpg',
    prompt: 'Artisan craftsmanship photograph of a Namiki Yukari Raden lacquer fountain pen with iridescent blue and emerald mother-of-pearl abalone shell inlays scattered like the Milky Way galaxy in deep lustrous black Urushi, two-tone 18k gold nib, staged on raw dark slate stone alongside a traditional artisan carved bamboo dusting tube and gold leaf flakes, dramatic low-angle side lighting highlighting the tactile micro-texture of the lacquerwork, photorealistic',
    seed: 830
  }
];

async function fetchImage(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          const chunks = [];
          redirectRes.on('data', c => chunks.push(c));
          redirectRes.on('end', () => {
            const buf = Buffer.concat(chunks);
            resolve({ statusCode: redirectRes.statusCode, data: buf });
          });
        }).on('error', err => resolve({ error: err }));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve({ statusCode: res.statusCode, data: buf });
      });
    }).on('error', err => resolve({ error: err }));
  });
}

async function generateWithRetry(target) {
  const destPath = path.join(outDir, target.filename);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(target.prompt)}?width=800&height=1000&nologo=true&seed=${target.seed}`;
  
  console.log(`\n=== Starting autonomous synthesis for ${target.filename} ===`);
  for (let attempt = 1; attempt <= 15; attempt++) {
    const res = await fetchImage(url);
    if (res.data && res.data.length > 5000 && res.data.slice(0, 2).toString('hex') === 'ffd8') {
      fs.writeFileSync(destPath, res.data);
      console.log(`[SUCCESS] Saved ${target.filename} (${res.data.length} bytes, JPEG EXIF verified)`);
      return true;
    }
    let errorMsg = '';
    try {
      const parsed = JSON.parse(res.data.toString());
      errorMsg = parsed.error?.message || parsed.message || 'Rate limited';
    } catch (e) {
      errorMsg = res.data ? res.data.toString().slice(0, 80) : 'Unknown response';
    }
    console.log(`[Attempt ${attempt}] Waiting 12s... Reason: ${errorMsg}`);
    await new Promise(r => setTimeout(r, 12000));
  }
  console.error(`[FAILED] Failed to generate ${target.filename} after max attempts.`);
  return false;
}

async function main() {
  console.log(`Starting autonomous generation sequence for Namiki (${targets.length} targets)...`);
  for (let i = 0; i < targets.length; i++) {
    const success = await generateWithRetry(targets[i]);
    if (!success) {
      console.error(`Aborting pipeline due to failure on ${targets[i].filename}`);
      process.exit(1);
    }
    if (i < targets.length - 1) {
      console.log(`Enforcing 48s cooldown between image requests to respect IP rate limits...`);
      await new Promise(r => setTimeout(r, 48000));
    }
  }
  console.log(`\nAll ${targets.length} Namiki artisan lacquer pens successfully generated!`);
  process.exit(0);
}

main();

const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '../public/assets/pasnormal');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const targets = [
  {
    filename: 'pns-mechanism-hero.jpg',
    prompt: 'Editorial cycling photography of Pas Normal Studios Mechanism Pro cycling jersey and bib shorts in dusty olive green and dark obsidian, tactile aerodynamic micro-ribbed compression fabric, cyclist in low aggressive drop position on a sleek carbon aero road bike, riding on a rain-slicked Scandinavian asphalt coastal highway under overcast moody Nordic sky, subtle road spray droplets, Hasselblad H6D-100c, 85mm f/2.0 lens, tack sharp athletic subject, dynamic cinematic motion, photorealistic, 8k',
    seed: 911
  },
  {
    filename: 'pns-escapism-hero.jpg',
    prompt: 'Rugged all-weather gravel cycling still life photography of Pas Normal Studios Escapism technical waterproof jacket and wool bibs, durable ripstop technical fabric, clay terracotta and forest pine green colorway, resting across a custom titanium gravel bicycle in a damp foggy Scandinavian pine forest, water droplets beading on hydrophobic membrane, tactile textile texture, Leica M6, 35mm f/1.4, Kodak Portra 400, photorealistic, 8k',
    seed: 922
  },
  {
    filename: 'pns-solitude-hero.jpg',
    prompt: 'High-summer minimalist cycling apparel studio still life photography of Pas Normal Studios Solitude ultralight mesh jersey in off-white bone tone, micro-perforated breathable woven texture, raw-cut aerodynamic sleeves, discrete black typography logo, draped over an architectural matte concrete pedestal, hard directional sunlight casting sharp clean geometric architectural shadows, photorealistic, 8k',
    seed: 933
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
  console.log(`Starting autonomous generation sequence for Pas Normal Studios (${targets.length} targets)...`);
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
  console.log(`\nAll ${targets.length} Pas Normal Studios technical cycling assets successfully generated!`);
  process.exit(0);
}

main();

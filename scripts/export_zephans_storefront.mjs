import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outPng = path.join(rootDir, 'exports', 'zephans-storefront', 'zephans-co-flagship.png');
const publicPng = path.join(rootDir, 'public', 'storefront', 'zephans-co-flagship.png');
const brainPng = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\418f865d-b3ea-4dee-b3bc-9a597f08c09e\\zephans-co-flagship.png';

fs.mkdirSync(path.dirname(outPng), { recursive: true });
fs.mkdirSync(path.dirname(publicPng), { recursive: true });

const targetUrl = 'http://localhost:3000/storefront/zephans-co.html';
console.log('[INFO] Rendering via Edge:', targetUrl);
const cmd = `"${edgePath}" --headless=new --disable-gpu --hide-scrollbars --window-size=1360,1350 --screenshot="${outPng}" "${targetUrl}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
} catch (e) {
  console.log('[EDGE FINISHED]');
}

if (fs.existsSync(outPng)) {
  fs.copyFileSync(outPng, publicPng);
  fs.copyFileSync(outPng, brainPng);
  const stats = fs.statSync(outPng);
  console.log(`[SUCCESS] Zephans PNG exported: ${(stats.size / 1024).toFixed(1)} KB`);
} else {
  console.error('[FAIL] File not found:', outPng);
}

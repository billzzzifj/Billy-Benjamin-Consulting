import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlPath = path.join(rootDir, 'mockups', 'ziva-lagos-redesign.html');
const outDir = path.join(rootDir, 'exports', 'mockups-ziva-lagos');
const outPng = path.join(outDir, 'ziva-lagos-swiss-grid-redesign.png');
const publicDir = path.join(rootDir, 'public', 'mockups');
const publicPng = path.join(publicDir, 'ziva-lagos-swiss-grid-redesign.png');

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
console.log('[INFO] Rendering via Edge:', fileUrl);
const cmd = `"${edgePath}" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,1800 --screenshot="${outPng}" "${fileUrl}"`;
try {
  execSync(cmd, { stdio: 'inherit' });
} catch (e) {
  console.log('[EDGE FINISHED]');
}

if (fs.existsSync(outPng)) {
  fs.copyFileSync(outPng, publicPng);
  const stats = fs.statSync(outPng);
  console.log(`[SUCCESS] Exported PNG: ${outPng} (${(stats.size / 1024).toFixed(1)} KB)`);
  console.log(`[SUCCESS] Copied to public: ${publicPng}`);
} else {
  console.error('[FAIL] File not found:', outPng);
}

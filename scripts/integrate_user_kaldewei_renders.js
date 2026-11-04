const fs = require('fs');
const path = require('path');

const uploads = [
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/.user_uploaded/media_1793806989510_41e05306.jpg',
    dest: 'kw-meisterstueck-hero.jpg',
    slot: 'Slot 01 // Meisterstück Centro Duo Oval'
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/.user_uploaded/media_1793806998814_9d67f7d6.jpg',
    dest: 'kw-conoduo-freestanding.jpg',
    slot: 'Slot 02 // Meisterstück Conoduo Cubist Monolith'
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/.user_uploaded/media_1793807007448_f0e07edf.jpg',
    dest: 'kw-superplan-zero.jpg',
    slot: 'Slot 03 // Superplan Zero Flush Shower Surface'
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/.user_uploaded/media_1793807023133_0974f980.jpg',
    dest: 'kw-soundwave-acoustic.jpg',
    slot: 'Slot 04 // Sound Wave Acoustic Transducers'
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/.user_uploaded/media_1793807032030_48ebbbe5.jpg',
    dest: 'kw-drain-detail.jpg',
    slot: 'Slot 06 // Flush Enamel Waste & Overflow Cover'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'assets', 'kaldewei');

uploads.forEach(u => {
  const target = path.join(destDir, u.dest);
  fs.copyFileSync(u.src, target);
  const size = fs.statSync(target).size;
  console.log(`[INTEGRATED] ${u.dest} (${size} bytes) <- ${u.slot}`);
});

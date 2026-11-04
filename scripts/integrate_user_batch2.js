const fs = require('fs');
const path = require('path');

const uploads = [
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/.user_uploaded/media_1793807638381_6491f7a6.jpg',
    dest: 'kw-architectural-bathroom.jpg',
    slot: 'Slot 07 // Penthouse Spa Glass Pavilion Context'
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/.user_uploaded/media_1793807647300_14f2210c.jpg',
    dest: 'kw-washbasin-miena.jpg',
    slot: 'Slot 08 // Miena Ultra-Thin Glazed Steel Basin'
  },
  {
    src: 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/.user_uploaded/media_1793807654560_a78d8373.jpg',
    dest: 'kw-subfloor-installation.jpg',
    slot: 'Slot 09 // Sub-Floor Acoustic Mounting Frame Rig'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'assets', 'kaldewei');

uploads.forEach(u => {
  const target = path.join(destDir, u.dest);
  fs.copyFileSync(u.src, target);
  const size = fs.statSync(target).size;
  console.log(`[INTEGRATED] ${u.dest} (${size} bytes) <- ${u.slot}`);
});

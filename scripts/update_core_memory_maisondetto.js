const fs = require('fs');
const filePath = 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/core_memory_v14.md';
let cm = fs.readFileSync(filePath, 'utf8');

const target25Entry = `
### Target 25 [GOLDILOCKS SPECIMEN]: Brianna Lipovsky (Maison d'Etto — New York / Hudson Valley, NY & Wellington, FL)
- **Sector:** Artisanal Equestrian Gender-Neutral Haute Parfumerie ($275 to $300 USD per 60ml Extrait de Parfum).
- **Flagships:** Rotano, Macanudo, Durban Jane, Karat EG, Canaan, Noisette, Connection to Self Discovery Set.
- **Acquisition Vectors:** Founder Brianna Lipovsky (brianna@maisondetto.com / contact@maisondetto.com), Instagram (@maisondetto ~19.5k followers), Hudson Valley Atelier.
- **Commercial Bottleneck:** High AOV ($275–$300) equestrian-niche perfumery suffers from severe blind-buy hesitation. Digital collectors cannot smell the complex animalic and earthy accords (stallion sweat, sun-warmed paddock hay, bridle leather) through static imagery, creating cart abandonment and slow conversion on full-size flacons.
- **Deployed Sandbox:** https://billy-benjamin-consulting.onrender.com/maisondetto
- **Hyper-Craft Physics:** Live 60 FPS Equestrian Biomechanics Dry-Down Track (4 stride gait phases: 4-beat Walk, 2-beat Trot, 3-beat Canter, high-velocity Gallop mapped to Top, Heart, and Base volatility curves, real-time center-of-mass kinematic wave, ground reaction force vector, and Web Audio turf hoofbeat acoustic harmonics), Artisanal Leather Saddlery Grain Visualizer (Havana oiled hide, French calfskin, and English Sedgwick bridle leather testing perfume oil tensile absorbency up to 72 hours), Slide-Out 5-Piece Olfactive Flight Drawer ($45 USD curation with automatic $45 rebate voucher redeemable against full-size 60ml bottles), and Master Perfumer collaborative dossiers (Carlos Benaïm, Céline Barel, McKenzie Reilly).
`;

if (!cm.includes('Target 25 [GOLDILOCKS SPECIMEN]')) {
  cm += target25Entry;
  fs.writeFileSync(filePath, cm, 'utf8');
  console.log('Appended Target 25 to core_memory_v14.md');
} else {
  console.log('Target 25 already in core_memory_v14.md');
}

const fs = require('fs');

const RECIPIENT_EMAIL = 'brianna@maisondetto.com';
const CC_EMAIL = 'contact@maisondetto.com';
const SUBJECT = 'Maison d\'Etto: Equestrian biomechanics dry-down & saddlery grain sandbox';

const BODY = `Hey Brianna,

Genuinely admiring the olfactive universe you have built with Maison d'Etto out of the Hudson Valley—especially the uncompromising integrity of capturing authentic equine portraits with Carlos Benaïm on Rotano and McKenzie Reilly on Macanudo.

At $275–$300 for 60ml Extrait, blind-buy friction is the single largest hurdle: collectors cannot smell how animalic accords (stallion sweat, sun-warmed paddock hay, cypriol) evolve over time through static product imagery.

I engineered an interactive flagship sandbox demonstrating how to eliminate that friction:
https://billy-benjamin-consulting.onrender.com/maisondetto

Key mechanics integrated:
1. Live 60 FPS Equestrian Biomechanics Dry-Down Track (stride gait phases from 4-beat Walk to high-velocity Gallop mapped to evaporation kinetics, force vector curves, and turf acoustic harmonics).
2. Artisanal Saddlery Grain Visualizer (Havana oiled hide, French calfskin, and English bridle leather grain relief testing perfume oil retention).
3. 5-Piece Olfactive Flight Drawer with built-in $45 discovery rebate credit applied directly towards full-size 60ml Extrait allocations.

If you are open to exploring fresh design firepower for your next collection drop or upgrading the live digital flagship, would love to jam on how we can plug this in.

Best regards,
Billy Benjamin
Founder & Creative Director | Billy Benjamin Consulting
https://billybenjaminconsulting.online
billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
Instagram: https://www.instagram.com/billybranddirector88/`;

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&cc=${encodeURIComponent(CC_EMAIL)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

console.log('--- 1-CLICK DIRECT GMAIL LAUNCHPAD URL ---');
console.log(launchpadUrl);
console.log('------------------------------------------');

fs.writeFileSync('scripts/maisondetto_launchpad_url.txt', launchpadUrl, 'utf8');
console.log('Saved to scripts/maisondetto_launchpad_url.txt');

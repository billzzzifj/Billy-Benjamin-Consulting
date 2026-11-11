const fs = require('fs');
const path = require('path');

const RECIPIENT_EMAIL = 'concierge@porttanger.com';
const CC_EMAIL = 'sales@porttanger.com,kiki@huxley.world';
const SUBJECT = 'Bilal / Port Tanger: Millimetric Cranial Fit & Mediterranean Refraction Sandbox';

const BODY = `Hey Bilal & Port Tanger Team,

Following what you have sculpted with Port Tanger from Amsterdam and London to Sabae—especially the philosophy anchored in the six-point steel emblem and the curved 8mm-10mm cellulose silhouettes like Saudade, Mektoub, and Noor.

At $345 to $395 USD direct-to-collector, digital buyer hesitation typically hits on two engineering points before checkout: shoppers cannot judge whether thick Sabae bridge widths (like Mektoub's 24mm saddle vs Gambia's 12mm keyway) fit their dorsal nasal crest and cranial breadth, and static shots hide how Tobacco, Olive, or Deep Rif Blue nylon lenses filter harsh coastal light.

I built an interactive digital flagship prototype demonstrating how to remove that hesitation on mobile and desktop:
https://billy-benjamin-consulting.onrender.com/porttanger

Key interactive engines inside the build:
1. Live 60 FPS Millimetric Cranial Bridge-Fit Simulator (switching real frame measurements 53-18-140 to 143-8-120 across frontal pupillary centering and top-down 7-barrel temple pressure vectors).
2. Mediterranean Sunset Light-Refraction Lab (interactive split-field Strait of Gibraltar horizon testing Tobacco, Olive, Deep Rif Blue, Rose, and Black Onyx 400nm UV transmission from dawn through golden hour).
3. Direct Optical Boutique Allocation Drawer (Zeiss custom Rx upgrades + private fitting reservations for Hillegomstraat 12 Amsterdam, Tangier, Paris, or $0 duties-included express courier).

If you are open to bringing on fresh digital architecture firepower for upcoming Jadhb or Visited By drops, would love to discuss how we can integrate this directly into your storefront.

Best regards,
Billy Benjamin
Founder & Creative Director | Billy Benjamin Consulting
https://billybenjaminconsulting.online
billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
Instagram: https://www.instagram.com/billybranddirector88/`;

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  RECIPIENT_EMAIL
)}&cc=${encodeURIComponent(CC_EMAIL)}&su=${encodeURIComponent(
  SUBJECT
)}&body=${encodeURIComponent(BODY)}`;

console.log('--- PORT TANGER 1-CLICK GMAIL LAUNCHPAD ---');
console.log(launchpadUrl);

fs.writeFileSync(
  path.join(__dirname, 'porttanger_launchpad_url.txt'),
  launchpadUrl,
  'utf8'
);
console.log('\nSaved to scripts/porttanger_launchpad_url.txt');

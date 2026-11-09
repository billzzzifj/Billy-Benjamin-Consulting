const fs = require('fs');

const RECIPIENT_EMAIL = 'richard@underd0g.com';
const CC_EMAIL = 'hello@underd0g.com';
const SUBJECT = 'Studio Underd0g: ST-1901 chronograph column wheel & wrist caliper fit sandbox';

const BODY = `Hey Richard,

Genuinely admiring the energy you have built around Studio Underd0g out of Maidenhead—especially the audacious chromatic execution on the 01Series Watermel0n and the Horologium assembly partnership.

Limited drops creating 15-minute sellout queues are a dream, but the friction point is always the same: first-time buyers hesitating on whether 38.5mm case / 44.5mm lug-to-lug overhangs on their wrist, plus checkout cart anxiety during high-velocity queue drops.

I engineered an interactive flagship sandbox demonstrating how to eliminate that friction:
https://billy-benjamin-consulting.onrender.com/underd0g

Key mechanics integrated:
1. Live 60 FPS Wrist Caliper Fit Simulator (anatomical wrist flat cross-section from 5.5" to 8.5", zero lug overhang ratio, and skin tone toggles).
2. Seagull ST-1901 Column Wheel Chronograph Engine (interactive 2 o'clock start/stop, 4 o'clock flyback/reset, 3 Hz 6 ticks/sec sweep, and mechanical click acoustics).
3. The Strap Tailor Epsom Calfskin Selector & 10-Minute Cart Reservation Drawer.

If you are open to exploring fresh design firepower for the next batch drop or upgrading the live storefront, would love to jam on how we can plug this in.

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

fs.writeFileSync('scripts/underd0g_launchpad_url.txt', launchpadUrl, 'utf8');
console.log('Saved to scripts/underd0g_launchpad_url.txt');

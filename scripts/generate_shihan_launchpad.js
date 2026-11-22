const fs = require('fs');
const path = require('path');

const recipient = "shehan@shihanfineknives.com";
const subject = "interactive distal taper caliper & food-release geometry for ShiHan";

const body = `Hey Shehan,

Genuinely admire what you've forged with Shi.han in Santa Fe, particularly the distal taper profile on your 52100 Gyutos and the Sanjo influence from your training with Hiroshi Ashi.

Most home chefs and collectors buying online don't understand the physical difference between a flat-stamped factory blank and your hand-hammered distal taper—or they harbor unnecessary anxiety about high-carbon 52100 steel patina vs rust.

I put together an interactive prototype sandbox for ShiHan showing how an interactive flagship experience visualizes this in real time:

Private Preview Sandbox:
https://billy-benjamin-consulting.onrender.com/shihan

Key Mechanics Engineered:
1. Live 60 FPS Distal Taper & Pinch-Grip Balance Caliper: Real-time center-of-mass calculation relative to the chef pinch grip index notch, computing exact balance torque (0.000 N•m neutral pivot) as users adjust spine thickness (4.5mm heel down to 0.7mm tip) and octagonal Wa-handle wood density.
2. 52100 High-Carbon Patina & Convex Food-Release Simulator: Interactive comparison showing how your convex "Hamaguri-ba" grind breaks vegetable vacuum suction (delta P = 0 kPa) vs flat factory grinds that stick like suction cups, paired with a Day 0 to Year 2 patina aging slider (citrus blue -> allium amber -> inert protective magnetite Fe3O4 shield).
3. Santa Fe Forge Allocation Vault Drawer: Streamlined acquisition flow with custom Wa-handle timber selector, poplar saya sheath toggle, and a $150 refundable deposit queue for closed order book drops.

If you're open to bringing on fresh creative firepower to upgrade your digital presence and sharpen the live storefront for your next drop, would love to jam on how we can plug this into your stack.

Direct Touchpoints:
- Email: billybenjamin836@gmail.com
- LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
- Instagram: https://www.instagram.com/billybranddirector88/

Best,
Billy Benjamin
Founder & Principal Design Engineer
Billy Benjamin Consulting (billybenjaminconsulting.online)`;

const encodedTo = encodeURIComponent(recipient);
const encodedSu = encodeURIComponent(subject);
const encodedBody = encodeURIComponent(body);

const gmailLaunchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSu}&body=${encodedBody}`;

fs.writeFileSync(path.resolve('scripts/shihan_launchpad_url.txt'), gmailLaunchpadUrl, 'utf8');

console.log('--- SHIHAN 1-CLICK GMAIL LAUNCHPAD URL GENERATED (SLOP-FREE) ---');
console.log(gmailLaunchpadUrl);

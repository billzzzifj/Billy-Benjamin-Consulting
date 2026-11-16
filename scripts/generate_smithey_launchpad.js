const fs = require('fs');
const path = require('path');

const recipient = 'isaac@smithey.com';
const subject = 'Smithey Ironware // Hand-Machined Satin Performance Flagship Concept (Isaac Morton)';
const body = `Hey Isaac,

Genuinely admire what you've built at Smithey Ironware in Charleston. Rebuilding the lost American art of hand-machining virgin cast iron down to a 14-microinch satin surface is the single most important innovation in cookware since Griswold.

We took your core metallurgical story and engineered an interactive digital flagship experience for Smithey:

1. Live 60 FPS Thermal Conduction & Egg Glide Simulator: Demonstrating live heat gradients across Induction, Gas, and Hearth embers, paired with a real-time friction slider showing an egg gliding friction-free across Smithey satin vs tearing on rough sand-cast iron.
2. Micro-Polish Surface Caliper: An interactive metrology cross-section contrasting Smithey's 14 μin satin plane with modern 280 μin sand-cast iron.
3. Charleston Workshop Allocation Vault: An interactive allocation drawer with live heirloom laser-engraving preview and zero-friction freight mechanics.

Live Flagship Sandbox:
https://billy-benjamin-consulting.onrender.com/smithey

If you're open to bringing on fresh digital creative firepower for your upcoming allocations and upgrading the direct-to-consumer store, I would love to jam on how we can plug this into your stack.

Best,
Billy Benjamin
Founder, Billy Benjamin Consulting
https://billybenjaminconsulting.online
Direct: billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
Instagram: https://www.instagram.com/billybranddirector88/`;

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

console.log('--- 1-CLICK GMAIL LAUNCHPAD URL ---');
console.log(launchpadUrl);
console.log('-----------------------------------');

fs.writeFileSync(path.resolve('scripts/smithey_launchpad_url.txt'), launchpadUrl, 'utf8');

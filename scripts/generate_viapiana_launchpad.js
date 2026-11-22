const fs = require('fs');
const path = require('path');

const recipient = 'info@benviapiana.com';
const subject = 'Viapiana Custom Denim // 1-Man MTM Caliper & Union Special Flagship Concept (Ben Viapiana)';
const body = `Hey Ben,

Genuinely admire what you've built with Viapiana in Toronto. Sewing raw Japanese selvedge single-handedly on vintage 1940s Union Special 43200G and Singer machinery is the highest expression of denim tailoring in North America.

Right now, getting clients to self-measure six jeans dimensions with a tape measure creates heavy drop-off, sizing anxiety, and hours lost in DMs. We engineered an interactive digital flagship concept specifically for your bench:

1. Live 60 FPS Made-to-Measure (MTM) Caliper: An anatomical sizing tool letting clients calibrate true waist, rise, thigh, knee, and leg opening, with a real-time 40°C warm soak simulation showing unsanforized shrink-to-fit cotton contraction (-8% length, -4% waist).
2. Japanese Shuttle Loom & 24-Month Fade Simulator: Directly showcases Kuroki 14oz, Nihon Menpu 18oz, and 21oz heavy armor denim as indigo warp sheds to expose white cotton core.
3. Bench Commission Manifest Drawer: Automatically binds the client's verified caliper numbers into a formatted cutting ticket ready for your cutting table, with hand-peened copper burr and Horween patch customizers.

Live Flagship Sandbox:
https://billy-benjamin-consulting.onrender.com/viapiana

If you're open to bringing on fresh digital creative firepower to automate your custom sizing queue and free you up to spend more time at the machines, I would love to jam on how we can plug this into your stack.

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

fs.writeFileSync(path.resolve('scripts/viapiana_launchpad_url.txt'), launchpadUrl, 'utf8');

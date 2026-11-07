const fs = require('fs');
const path = require('path');

const recipient = 'communications@richardmille.com';
const cc = 'press@richardmille.com';
const subject = 'Private Teardown // Solving the 12,000g Digital Proof Bottleneck for Calibre RM 27-04 & RM UP-01';

const body = `Dear Amanda and Alexandre,

Watching Rafael Nadal win Roland-Garros with a 30-gram RM 27-04 on his wrist proved to the horological world that Richard Mille movements do not merely survive extreme shock—they thrive under it.

However, when private family office principals and ultra-high-net-worth collectors consider six-figure and seven-figure allocations ($150,000 to $2,500,000+) across North America, London, and Dubai, they confront a digital friction bottleneck: static catalogs fail to convey the physical physics of the 0.27mm braided steel cable suspension mesh, the 600-layer Carbon TPT autoclave stratigraphy, and the rapid-winding barrel efficiency.

To solve this conversion barrier, Billy Benjamin Consulting has engineered an interactive, production-grade Hyper-Craft digital sandbox for Richard Mille:

Live Production Sandbox:
https://billy-benjamin-consulting.onrender.com/richardmille

Four Architectural Capabilities Built Live in the Sandbox:
1. Live 60 FPS 12,000g Pendulum Shock Simulator Canvas: An interactive ISO 1413 Charpy pendulum testing rig modeling real-time hammer drops (15° to 90° release), calculating 12,040 g deceleration spikes, 0.42mm cable elastic deflection, and sub-180ms balance amplitude recovery back to 310°.
2. Carbon TPT & Quartz TPT Autoclave Stratigraphy Explorer: Interactive inspection of 600 parallel 30-micron filament plies, 45° alternating cross-ply weaves, and 120°C / 6-bar pressure cure cycles with ASTM E8 comparative yield benchmarks against Grade 5 titanium.
3. Fast-Rotating Mainspring Barrel & W-N-H Selector: Simulating the 6-hour revolution barrel dynamics, 8 o'clock red Quartz TPT rapid-winding pusher (125 depressions to full charge), and the 4 o'clock coaxial crown clutch with synthesized mechanical audio clicks.
4. Jura Manufacture Escrow Allocation Vault: A frictionless $50,000 refundable Swiss escrow allocation drawer with custom Grade 5 titanium bridge engraving previews and digital certificate generation.

The sandbox is fully live and renders in under 0.5s at the edge with zero external dependencies.

Would you be open to a 5-minute review of how this deployment can be integrated directly into your private client reservation pipeline?

Direct channels:
- Email: billybenjamin836@gmail.com
- LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
- Instagram: https://www.instagram.com/billybranddirector88/

Sincerely,

Billy Benjamin
Founder & Principal Revenue Architect
Billy Benjamin Consulting
https://billybenjaminconsulting.online`;

const encodedTo = encodeURIComponent(recipient);
const encodedCc = encodeURIComponent(cc);
const encodedSubject = encodeURIComponent(subject);
const encodedBody = encodeURIComponent(body);

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&cc=${encodedCc}&su=${encodedSubject}&body=${encodedBody}`;

console.log('=== RICHARD MILLE 1-CLICK GMAIL DIRECT LAUNCHPAD ===');
console.log(launchpadUrl);

const outputPath = path.resolve(__dirname, '..', 'richardmille_launchpad_url.txt');
fs.writeFileSync(outputPath, launchpadUrl, 'utf8');
console.log(`\nSaved launchpad URL to: ${outputPath}`);

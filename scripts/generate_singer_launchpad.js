const fs = require('fs');

const recipient = 'clientservices@singervehicledesign.com';
const subject = 'Singer Vehicle Design — Air-Cooled 9,000 RPM Dyno & Restoration Engineering Teardown';
const body = `Rob & Mazen,

Noticed a friction point in the air-cooled restomod acquisition workflow: private collectors evaluating a $1.8M (Turbo Study) to $3.5M (DLS Turbo) restoration frequently face digital opacity regarding live cylinder head thermal dissipation under track load, dyno curves between 1,000 and 9,000 RPM, and tailored carbon fiber weave options.

To address this, we engineered an interactive digital restoration sandbox for Singer Vehicle Design:
https://billy-benjamin-consulting.onrender.com/singer

Core Architectural Systems Deployed:
1. 60 FPS 9,000 RPM Air-Cooled Dyno & Tachometer Engine: Real-time rendering of horsepower (500 HP naturally aspirated to 700 HP twin-turbo) and torque curves (330 lb-ft to 550 lb-ft) with live audio-visual tachometer needle deflection and rev-limiter indicator.
2. Lightweight Titanium Exhaust Heat-Stain Visualizer: Dynamic thermal gradient calculation across EGT ranges (200°C raw silver to 850°C deep violet and titanium azure oxidation).
3. Carbon Fiber & Coachbuilt Colorway Selector: Instant material switching between Singer Racing Green, Blood Orange, and Geyser Grey over lightweight pre-preg carbon weaves.
4. Anatomy of Reimagining Dossiers: Deep technical teardowns of the Williams 4.0L 4-valve flat-six, quarter-window ram-air intakes, raised titanium shifter mechanism, and nickel-finished basketweave interiors.
5. Los Angeles & Oxfordshire Commission Escrow Drawer: Direct $50,000 refundable allocation deposit workflow bypassing phone screening delays.

Zero stock imagery, zero generic templates, fully production-ready under 1.8s LCP.

Explore the live sandbox:
https://billy-benjamin-consulting.onrender.com/singer

Billy Benjamin
Founder & Principal Designer | Billy Benjamin Consulting
billybenjaminconsulting.online
billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
`;

const encodedSubject = encodeURIComponent(subject);
const encodedBody = encodeURIComponent(body);
const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;

fs.writeFileSync('scripts/singer_launchpad_url.txt', gmailUrl);
console.log('Singer Launchpad URL generated successfully:');
console.log(gmailUrl);

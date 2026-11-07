const fs = require('fs');

const recipient = 'contact@bugatti.com';
const subject = 'Bugatti Tourbillon — Fixed-Hub Mechanical Cluster & 1,800 PS Hybrid Powertrain Teardown';
const body = `Mate & Christophe,

Observed a fundamental commercial opportunity in the Bugatti Tourbillon client allocation workflow: patrons committing €3,800,000+ to €4,500,000+ demand tangible, interactive verification of Bugatti's decision to reject digital touchscreens in favor of timeless mechanical watchmaking.

To demonstrate this architectural philosophy, we built an interactive engineering and horological sandbox for the Bugatti Tourbillon:
https://billy-benjamin-consulting.onrender.com/bugatti

Core Systems Deployed:
1. 60 FPS Fixed-Hub Skeletonized Cluster Simulator: The outer steering wheel rim rotates while the 650-component titanium watchmaker cluster (developed with Concepto Swiss horologists) remains level and stationary at all times, with dual concentric needles for road speed (up to 550 km/h) and engine revs (up to 10,000 RPM).
2. 1,800 PS V16 & Tri-Motor Torque-Vectoring Engine: Dynamic power distribution modeling between the 8.3L naturally aspirated Cosworth V16 (1,000 PS at 9,000 RPM) and front twin 600 kW / rear 200 kW electric motors.
3. Bugatti Speed Key Integration: Real-time aerodynamic reconfiguration across Hybrid, EB Grand Tourisme, Autobahn Downforce (18° wing), and Top Speed Mode (445 km/h authorization).
4. Generative 3D-Printed Titanium Suspension & T1000 Monocoque Dossiers: Macro breakdowns of the 45% lighter organic suspension wishbones and crystal glass center console.
5. Molsheim Atelier Private Commission Vault: Direct €500,000 refundable allocation deposit workflow generating official allocation certificates.

Zero stock imagery, zero generic templates, fully production-ready under 1.8s LCP.

Explore the live sandbox:
https://billy-benjamin-consulting.onrender.com/bugatti

Billy Benjamin
Founder & Principal Designer | Billy Benjamin Consulting
billybenjaminconsulting.online
billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
`;

const encodedSubject = encodeURIComponent(subject);
const encodedBody = encodeURIComponent(body);
const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;

fs.writeFileSync('scripts/bugatti_launchpad_url.txt', gmailUrl);
console.log('Bugatti Launchpad URL generated successfully:');
console.log(gmailUrl);

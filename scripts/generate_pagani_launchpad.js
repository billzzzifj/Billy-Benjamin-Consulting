const fs = require('fs');

const recipient = "press@pagani.com";
const subject = "Pagani Automobili: Eliminating Active Aerodynamic Flap Hesitation & Carbo-Titanium Opacity (Live Modena Sandbox)";

const body = `Dear Horacio and Christopher Pagani,

Pagani Automobili has redefined the absolute pinnacle of hypercar art and mechanical integrity for over twenty-five years, proving through the Zonda, Huayra, and Utopia that the union of Arte e Scienza creates machines that transcend mere transportation into timeless sculpture.

As ultra-high-net-worth collectors evaluate a €3,100,000 to €7,000,000+ commission across the Utopia, Huayra Codalunga, and Huayra R allocations, digital inquiries face two technical evaluation bottlenecks:

1. Active Aerodynamic Flap & Balance Hesitation: Connoisseurs and racing drivers struggle to model how Pagani's four independent active aerodynamic flaps articulate dynamically between 100 km/h and 350 km/h, balancing front-to-rear downforce (48%/52% in Strada vs 44%/56% in Corsa) and emergency airbrake retardation.
2. Carbo-Titanium Layup & Mechanical Gated Shifter Opacity: Without an interactive engineering schematic, collectors cannot inspect the Carbo-Titanium HP62-G2 structural weave or the 90 exposed titanium linkages of the 7-speed dogleg manual gearbox before visiting the San Cesario sul Panaro atelier.

Rather than proposing a theoretical discussion, our studio engineered a live, interactive Motor Valley engineering sandbox for Pagani Automobili:
https://billy-benjamin-consulting.onrender.com/pagani#gallery

In this sandbox, prospective patrons and automotive collectors can:
• Run a live 60 FPS wind tunnel smoke simulator with real-time active flap pitch angles (0° to 32°), downforce calculation (up to 780 kg), and dynamic drag coefficients across Strada, Corsa, and Airbrake regimes.
• Interact with dual horological cockpit dials (8,000 RPM V12 tachometer and 400 km/h speedometer) with real-time gear-ratio rev matching and synthetic metallic open-gate shifter haptics.
• Inspect the exploded Carbo-Titanium HP62-G2 stratigraphy, Mercedes-AMG twin-turbo V12 engine subframe, and Brembo carbon-ceramic matrix brakes with micro-engineering dossiers.
• Configure custom coachbuilt liveries (Rinascimento Matte Grigio, Exposed Blue Carbon, Rosso Monza) and reserve private atelier commission sessions at the San Cesario factory or a VIP Pista di Fiorano dynamic shakedown with refundable €100,000 escrow protection.

If this digital architecture matches your San Cesario engineering standards, we can transfer the production codebase directly to your team.

Billy Benjamin
Founder & Principal Designer | Billy Benjamin Consulting
https://billybenjaminconsulting.online
billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
Instagram: https://www.instagram.com/billybranddirector88/`;

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

console.log("=== 1-CLICK GMAIL DIRECT LAUNCHPAD URL ===");
console.log(launchpadUrl);

fs.writeFileSync('C:/Users/User/.gemini/antigravity/scratch/bbc-portfolio-swiss-grid/scripts/pagani_launchpad_url.txt', launchpadUrl, 'utf8');

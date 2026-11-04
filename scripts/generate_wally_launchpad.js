const fs = require('fs');

const recipient = "monaco@wally.com";
const subject = "Wally Superyachts: Eliminating Hydrodynamic Planing Hesitation & Autoclave Customization Opacity (Live Monaco Sandbox)";

const body = `Dear Luca Bassani and Stefano de Vivo,

Wally has pioneered the absolute vanguard of naval architecture for over three decades, establishing the vertical axe bow and carbon pre-preg autoclave hull as the gold standard in high-performance Mediterranean yachting.

As ultra-high-net-worth patrons and yacht captains evaluate a €4,500,000 to €35,000,000+ commission across the wallywhy, wallypower, and wallycento fleets, digital inquiries stall on two critical technical hurdles:

1. Hydrodynamic Waterline & Fuel Burn Hesitation: Prospective owners and their captains struggle to model how the vertical bow pierces Mediterranean sea states without slamming, and how pre-preg carbon weight reduction converts directly into knots and range across 18-knot cruising and 38-to-50-knot sprint regimes.
2. Hull Stratigraphy & Customization Opacity: Without an interactive engineering schematic, patrons cannot inspect the autoclave carbon laminate schedule, Nomex honeycomb core, or hydraulic fold-out beach club mechanics before arranging a physical shipyard visit.

Rather than proposing a theoretical discussion, our studio engineered a live, interactive naval architecture sandbox for Wally Yachts:
https://billy-benjamin-consulting.onrender.com/wally#gallery

In this sandbox, prospective patrons and naval architects can:
• Run a live 60 FPS hydrodynamic towing tank simulator with real-time Kelvin wake angles (19.47°), laminar flow particles, and dynamic fuel burn calculation across calm Cote d'Azur, moderate Tyrrhenian, and rough Balearic sea states.
• Monitor dual ballistic bridge dials (speed in knots over ground vs Volvo Penta IPS shaft RPM) with instantaneous trim tab angle adjustments.
• Inspect the exploded pre-preg carbon autoclave stratigraphy and hydraulic bulwark wing mechanics with micro-structural inspection dossiers.
• Configure custom hull liveries (Monaco Stealth Anthracite, Raven Black Carbon, Pure Arctic White) and reserve VIP shipyard sea-trials at the Monaco Yacht Club, Cannes Bay, or the Forlì shipyard with refundable €50,000 escrow protection.

If this digital architecture reflects your Monaco and Forlì engineering standards, we can transfer the production codebase directly to your team.

Billy Benjamin
Founder & Principal Designer | Billy Benjamin Consulting
https://billybenjaminconsulting.online
billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
Instagram: https://www.instagram.com/billybranddirector88/`;

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

console.log("=== 1-CLICK GMAIL DIRECT LAUNCHPAD URL ===");
console.log(launchpadUrl);

fs.writeFileSync('C:/Users/User/.gemini/antigravity/scratch/bbc-portfolio-swiss-grid/scripts/wally_launchpad_url.txt', launchpadUrl, 'utf8');

const fs = require('fs');
const path = require('path');

const recipient = 'niclas@cra-yon.com';
const cc = 'hello@cra-yon.com';
const subject = 'Private Concept // Interactive Scent Mood Wardrobe + 3-Piece Pocket Bundle for CRA-YON';

const body = `Dear Niclas,

Really love what you and Christine are building with CRA-YON in Stockholm—the concept of a "Scent Mood Wardrobe" that treats fragrance as emotional clothing is one of the sharpest brand positionings in European indie perfumery.

However, when fragrance buyers explore CRA-YON on mobile across London, Berlin, and New York, they face a classic digital blind-buy bottleneck: static product cards fail to guide shoppers toward the exact mood state they want to achieve (Calm, Focus, Euphoria, Romance), and cart abandonment remains high on single €105 flacons without an interactive travel bundle entry point.

To solve this conversion barrier, Billy Benjamin Consulting has engineered an interactive, production-grade digital flagship sandbox tailored specifically to CRA-YON:

Live Production Sandbox:
https://billy-benjamin-consulting.onrender.com/crayon

Three Core Capabilities Engineered Live in the Sandbox:
1. Interactive Scandinavian Scent Mood-Picker Engine: Shoppers navigate by emotional desired state (Calm, Euphoria, Focus, Romance, Comfort, Bold), triggering a live 60 FPS chromatic aura dispersion canvas with a real-time 3-stage olfactory dry-down architecture (Top, Heart, Base timeline, sillage radius, and skin retention hours).
2. Slide-Out 3-Piece Pocket Wardrobe Configurator (10ml × 3): An interactive 3-slot travel case builder allowing customers to curate Morning, Afternoon, and Nocturnal scents (€65 bundle with automatic 23% savings vs €84 standalone), driving immediate AOV expansion.
3. Discovery Voucher Credit Redemption Anchor: Built-in €25 Discovery Flight sample credit recovery, guaranteeing zero blind-buy friction for new international patrons.

The sandbox is fully live and renders in under 0.4s at the edge with zero external dependencies.

Would you be open to a quick 5-minute review of how this deployment can be integrated directly into your Shopify storefront for your next seasonal drop?

Direct channels:
- Email: billybenjamin836@gmail.com
- LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
- Instagram: https://www.instagram.com/billybranddirector88/

Warm regards,

Billy Benjamin
Founder & Principal Revenue Architect
Billy Benjamin Consulting
https://billybenjaminconsulting.online`;

const encodedTo = encodeURIComponent(recipient);
const encodedCc = encodeURIComponent(cc);
const encodedSubject = encodeURIComponent(subject);
const encodedBody = encodeURIComponent(body);

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&cc=${encodedCc}&su=${encodedSubject}&body=${encodedBody}`;

console.log('=== CRA-YON 1-CLICK GMAIL DIRECT LAUNCHPAD ===');
console.log(launchpadUrl);

const outputPath = path.resolve(__dirname, '..', 'crayon_launchpad_url.txt');
fs.writeFileSync(outputPath, launchpadUrl, 'utf8');
console.log(`\nSaved launchpad URL to: ${outputPath}`);

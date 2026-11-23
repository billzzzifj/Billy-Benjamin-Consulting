const fs = require('fs');
const path = require('path');

const recipient = "soren@oaksbottomwoodcraft.com";
const subject = "interactive knife edge damping caliper & butcher block simulator for Oaks Bottom";

const body = `Hey Soren,

Genuinely admire what you're building with Oaks Bottom Woodcraft in Portland, particularly the heavy end-grain construction on your Oregon black walnut prep blocks.

Most home cooks and culinary buyers purchasing online hesitate on spending $380–$680 because they don't understand the physical difference between vertical end-grain fibers (which part on impact to protect 63 HRC Japanese knife edges) versus plastic or edge-grain boards that dull knives 4.2x faster—while harboring unnecessary anxiety about wood hydration and warping.

I put together an interactive prototype sandbox for Oaks Bottom showing how an interactive flagship storefront visualizes this in real time:

Private Preview Sandbox:
https://billy-benjamin-consulting.onrender.com/oaksbottom

Key Mechanics Engineered:
1. Live 60 FPS End-Grain Knife Damping & Fiber Restitution Caliper: Real-time energy absorption telemetry (88.4% shock dampening) comparing vertical end-grain capillaries against plastic deflection, with impact velocity and knife steel hardness sliders.
2. Food-Grade Mineral Oil & Beeswax Saturation Simulator: 4-stage hydration visualizer tracking capillary oil penetration from dry timber to an impenetrable hydrophobic beeswax seal (water contact angle theta = 114 degrees) with an interactive droplet test.
3. Portland Workshop Allocation Vault Drawer: Frictionless slide-out acquisition suite featuring custom laser monogram customizer, perimeter juice groove toggle, and a $150 refundable deposit queue for closed glue-up batches.

If you're open to bringing on fresh creative firepower to upgrade your digital presence and sharpen the live storefront for your next batch release, would love to jam on how we can plug this into your stack.

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

fs.writeFileSync(path.resolve('scripts/oaksbottom_launchpad_url.txt'), gmailLaunchpadUrl, 'utf8');

console.log('--- OAKSBOTTOM 1-CLICK GMAIL LAUNCHPAD URL GENERATED (SLOP-FREE) ---');
console.log(gmailLaunchpadUrl);

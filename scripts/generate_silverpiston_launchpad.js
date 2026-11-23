const fs = require('fs');
const path = require('path');

const recipient = 'steve@silverpiston.com';
const subject = 'interactive coin carving microscope caliper & signet ring sandbox for Silver Piston';
const body = `Hey Steve,

Genuinely admire what you've built with Silver Piston in Atlanta, particularly the pairing of Shane Hunter's hand-carved hobo nickels with heavy solid .925 sterling silver bands.

Most jewelry collectors and motorcycle enthusiasts buying online hesitate on spending $220–$460 because they can't gauge how a 12.5mm heavy signet band clears their knuckle compared to a standard thin ring—leading to sizing anxiety and return friction—while mass-market cast fake coins online make it difficult for buyers to appreciate Shane Hunter's 0.85mm hand-chiseled bas-relief depth without a jeweler's loupe.

I put together an interactive prototype sandbox for Silver Piston showing how an interactive flagship storefront visualizes this in real time:

Private Preview Sandbox:
https://billy-benjamin-consulting.onrender.com/silverpiston

Key Mechanics Engineered:
1. Live 60 FPS Micro-Engraving Carving Caliper & 40x Optical Scope: Real-time carving progression slider morphing an authentic 1936 Buffalo Nickel into Shane Hunter's finished skull bas-relief with 40x magnification, revealing graver chisel striae and benchmarking against mushy cast counterfeit defects.
2. Knuckle Clearance & Heavy Band Sizing Caliper: Anatomical PIP knuckle joint pass-through calculator accounting for 12.5mm wide-band flesh displacement with automatic +0.5 size recommendations and skin tone reflectance options.
3. Sterling Silver & Cupro-Nickel Patina Aging Engine: Interactive 0 to 36-month wear timeline demonstrating how road friction and leather clutch grips burnish high silver points while deepening liver of sulfur recesses.
4. Atlanta Bench Allocation Vault Drawer: Streamlined configuration suite featuring custom US ring sizing, vintage coin year selection (1913–1938), finish options, and inner band hand-stamped inscriptions.

If you're open to bringing on fresh creative firepower to upgrade your digital presence and sharpen the live storefront for your next bench drop, would love to jam on how we can plug this into your stack.

Direct Touchpoints:
- Email: billybenjamin836@gmail.com
- LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
- Instagram: https://www.instagram.com/billybranddirector88/

Best,
Billy Benjamin
Founder & Principal Design Engineer
Billy Benjamin Consulting (billybenjaminconsulting.online)`;

const encodedRecipient = encodeURIComponent(recipient);
const encodedSubject = encodeURIComponent(subject);
const encodedBody = encodeURIComponent(body);

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedRecipient}&su=${encodedSubject}&body=${encodedBody}`;

fs.writeFileSync(path.resolve('scripts/silverpiston_launchpad_url.txt'), launchpadUrl, 'utf8');
console.log('[SUCCESS] Silver Piston 1-Click Launchpad URL generated:');
console.log(launchpadUrl);

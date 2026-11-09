const fs = require('fs');

const RECIPIENT_EMAIL = 'Neville.Wisdom@gmail.com';
const CC_EMAIL = 'info@nevillewisdom.com';
const SUBJECT = 'Neville Wisdom: 3D pattern drafting canvas & raw wool drape sandbox';

const BODY = `Hey Neville,

Genuinely admiring the craft you have anchored in New Haven across 25 years—especially the commitment to zero-waste mathematical pattern cutting and keeping 100% of tailoring production on-site in Connecticut.

At $400 to $1,200 for tailored suits and sculptural coats, client hesitation usually stems from digital abstraction: buyers cannot visualize how flat 2D pattern geometry translates into anatomical fit or how different wool cloth weights drape across the shoulders.

I engineered an interactive digital flagship sandbox demonstrating how to eliminate that hesitation:
https://billy-benjamin-consulting.onrender.com/nevillewisdom

Key mechanics integrated:
1. Live 60 FPS Architectural Pattern Drafting Canvas (anatomical parameters recalculating chalk seam allowances, armhole scye curves, waist suppression, and zero-waste fabric efficiency in real time).
2. Raw Selvedge Wool Drape Simulator (260g tropical plain-weave to 580g heavy cavalry twill elasticity and gravity drape curves).
3. Made-to-Measure Allocation & $150 Appointment Deposit Drawer (fitting room venue selector at 27 Broadway, Whalley Avenue, or Metropolitan Traveling Trunk Shows).

If you are open to exploring fresh design firepower to accelerate your digital commission flow or upgrading the online studio, would love to jam on how we can plug this in.

Best regards,
Billy Benjamin
Founder & Creative Director | Billy Benjamin Consulting
https://billybenjaminconsulting.online
billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
Instagram: https://www.instagram.com/billybranddirector88/`;

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&cc=${encodeURIComponent(CC_EMAIL)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

console.log('--- 1-CLICK DIRECT GMAIL LAUNCHPAD URL ---');
console.log(launchpadUrl);
console.log('------------------------------------------');

fs.writeFileSync('scripts/nevillewisdom_launchpad_url.txt', launchpadUrl, 'utf8');
console.log('Saved to scripts/nevillewisdom_launchpad_url.txt');

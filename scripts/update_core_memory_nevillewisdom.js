const fs = require('fs');
const filePath = 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/core_memory_v14.md';
let cm = fs.readFileSync(filePath, 'utf8');

const target26Entry = `
### Target 26 [GOLDILOCKS SPECIMEN]: Neville Wisdom (Neville Wisdom Fashion — New Haven, CT)
- **Sector:** Independent Sustainable Couture Tailoring & Micro-Atelier ($400 to $1,200 USD).
- **Flagships:** The Architectural Sculptural Wrap Coat, The New Haven Two-Piece Tailored Suit, The Sculptural Couture Column Gown, The Zero-Waste Single-Breasted Blazer.
- **Acquisition Vectors:** Founder & Head Pattern Cutter Neville Wisdom (Neville.Wisdom@gmail.com / info@nevillewisdom.com), Phone ((475) 301-8746), Flagship Boutique (27 Broadway at The Shops at Yale & 903 Whalley Ave Studio).
- **Commercial Bottleneck:** Custom tailoring atelier relies heavily on local walk-in consultations; digital clients hesitate on commissioning $400–$1,200 garments due to sizing abstraction, lack of 2D pattern visualization, and inability to understand how various British and Italian wool cloth weights (260g to 580g) drape in motion.
- **Deployed Sandbox:** https://billy-benjamin-consulting.onrender.com/nevillewisdom
- **Hyper-Craft Physics:** Live 60 FPS Architectural Pattern Drafting Canvas (anatomical adjustments to chest circumference 36"–48", waist suppression, lapel gorge, and shoulder slope recalculating chalk cut lines, seam allowances, and zero-waste nesting percentages in real time), Raw Selvedge Wool Drape Simulator (Vitale Barberis Canonico 260g tropical to Hainsworth 580g heavy cavalry twill gravity drape curves and elasticity indices), Made-to-Measure Allocation & $150 Appointment Deposit Drawer (fitting room venue selector across New Haven flagship, Westville studio, and Traveling Trunk Shows), and on-site Connecticut hand-manufacturing dossiers.
`;

if (!cm.includes('Target 26 [GOLDILOCKS SPECIMEN]')) {
  cm += target26Entry;
  fs.writeFileSync(filePath, cm, 'utf8');
  console.log('Appended Target 26 to core_memory_v14.md');
} else {
  console.log('Target 26 already in core_memory_v14.md');
}

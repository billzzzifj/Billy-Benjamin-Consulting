const fs = require('fs');
const filePath = 'C:/Users/User/.gemini/antigravity/brain/d9252a7b-d19d-449a-bae5-43eb0ab1910f/core_memory_v14.md';
let cm = fs.readFileSync(filePath, 'utf8');

const target24Entry = `
### Target 24 [GOLDILOCKS SPECIMEN]: Richard Benc (Studio Underd0g — London / Maidenhead, UK)
- **Sector:** Independent British Chronograph & Playful Horological Design (£500 to £675 GBP / ~$650 to $850 USD).
- **Flagships:** 01Series Watermel0n, Desert Sky, Mint Ch0c Chip, Go0fy Panda, 02Series Pink Lem0nade, 03Series Salm0n.
- **Acquisition Vectors:** Founder & Designer Richard Benc (richard@underd0g.com / hello@underd0g.com), Instagram (@studio.underd0g ~42.5k followers), Maidenhead HQ ("The D0ghouse").
- **Commercial Bottleneck:** Batch drops sell out in sub-15 minutes, yet first-time buyers constantly hesitate during drops on whether 38.5mm case diameter / 44.5mm lug-to-lug will overhang their wrist, resulting in cart dropouts and high customer service sizing tickets. Furthermore, Shopify standard queues lack transparent countdown reservations.
- **Deployed Sandbox:** https://billy-benjamin-consulting.onrender.com/underd0g
- **Hyper-Craft Physics:** Live 60 FPS Wrist-Circumference Caliper Fit Simulator canvas (anatomical wrist flat cross-section from 5.5" to 8.5", real-time lug-to-wrist ratio calculation, zero-overhang indicator, and 4 skin-tone reflectance toggles), interactive Seagull ST-1901 Column Wheel Chronograph Engine (2 o'clock Start/Stop, 4 o'clock Flyback/Reset, 3 Hz 6 ticks/second smooth mechanical sweep, and Web Audio mechanical click acoustics), The Strap Tailor Epsom Calfskin Selector (Forest Green, Taupe, Milanese Mesh), 10-Minute Cart Reservation Countdown Drawer (09:59 timer), and bespoke caseback laser engraving preview.
`;

if (!cm.includes('Target 24 [GOLDILOCKS SPECIMEN]')) {
  cm += target24Entry;
  fs.writeFileSync(filePath, cm, 'utf8');
  console.log('Appended Target 24 to core_memory_v14.md');
} else {
  console.log('Target 24 already in core_memory_v14.md');
}

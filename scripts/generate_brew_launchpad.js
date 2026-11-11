const fs = require('fs');
const path = require('path');

const RECIPIENT_EMAIL = 'Support@Brew-Watches.com';
const CC_EMAIL = 'press@brew-watches.com';
const SUBJECT = 'Jonathan / Brew Watch Co.: Interactive 25-35s Extraction Dial & Quick-Release Strap Sandbox';

const BODY = `Hey Jonathan & Brew Watch Co. Team,

Following what you have engineered with the Metric Chrono Taxi and Super Metric series in New York—especially grounding industrial 316L brushed steel architecture directly inside the 25 to 35-second espresso extraction chapter ring.

On a $375 to $495 storefront showcase, static gallery thumbnails miss two major revenue opportunities: first-time buyers cannot physically click the 2 o'clock pusher to feel how the 5 Hz VK68 sweep hand interacts with the 25-35s crema window, and quick-release 19.50mm suede or FKM rubber straps sit in separate Shopify menus instead of converting directly alongside watch cases.

I built an interactive digital flagship prototype demonstrating both fixes cleanly on desktop and mobile:
https://billy-benjamin-consulting.onrender.com/brew

Key conversion engines built inside:
1. Live 60 FPS 25-35s Espresso Extraction Chronograph Canvas (functional 2H start/pause & 4H flyback reset pushers, 5 Hz mechanical stepping, live extraction flavor curve, and instant switching across Chrono Taxi, Retro, Burnt Orange, Electric Blue, and Gold dials).
2. Quick-Release Strap & 36mm Cushion Fit Workbench (5.75" to 7.75" wrist proportion bar paired with automatic -15% strap bundling for Taxi Rally, Coral Orange leather, Teal FKM rubber, and Black suede).
3. Slide-Out NYC Collector Vault Drawer (live caseback steel engraving preview up to 16 chars, 2-watch bundle privilege tracker, and $0 shipping transparency).

If you are open to collaborating on high-conversion digital product launches for upcoming Metric or Digital Blend releases, I would love to share the architecture boards and discuss integration.

Best regards,
Billy Benjamin
Founder & Creative Director | Billy Benjamin Consulting
https://billybenjaminconsulting.online
billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
Instagram: https://www.instagram.com/billybranddirector88/`;

const launchpadUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  RECIPIENT_EMAIL
)}&cc=${encodeURIComponent(CC_EMAIL)}&su=${encodeURIComponent(
  SUBJECT
)}&body=${encodeURIComponent(BODY)}`;

fs.writeFileSync(path.join(__dirname, 'brew_launchpad_url.txt'), launchpadUrl, 'utf8');
console.log('--- BREW WATCH CO. 1-CLICK GMAIL LAUNCHPAD ---');
console.log(launchpadUrl);

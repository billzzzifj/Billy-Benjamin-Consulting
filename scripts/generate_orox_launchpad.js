// scripts/generate_orox_launchpad.js
// Autonomous 1-Click Launchpad Generator for Orox Leather Co. (Martin Martinez)

const RECIPIENT_PRIMARY = "martin@oroxleather.com";
const RECIPIENT_SECONDARY = "hello@oroxleather.com";
const LIVE_URL = "https://billy-benjamin-consulting.onrender.com/oroxleather";

const SUBJECT = "Orox Leather Co. // 60 FPS Woven Carry Caliper & Horween Patina Lab Concept";

const PITCH_BODY = `Hi Martin,

Love what you, José, and Levi are building at 450 NW Couch Street—especially honoring Don Felipe's 1933 Oaxacan lineage through Horween Chromexcel and hand-peened copper burr rivets.

As a design engineer and product architect, I analyzed where luxury leather carry buyers hesitate most online:
1. Internal Packing Volume: Shoppers spending $460 to $650 on the Woven Market Tote or Merces Utility Tote cannot verify whether their 16" laptop, A4 folio, and water bottle fit simultaneously without distorting the hide.
2. Long-Term Patina Education: First-time Chromexcel buyers mistake the natural food-grade tallow wax bloom for surface flaws or fear that daily scratches will permanently ruin the leather.

To solve this friction, I architected an interactive digital flagship sandbox for Orox:
- Live 60 FPS 3D Woven Carry Capacity Caliper: Shoppers drop daily hardware (16" MacBook Pro, A4 folio, Leica M, 32oz flask) into an architectural cross-section with real-time liter volume and strap tensile deflection readouts.
- Horween 5-Year Pull-Up Patina Simulator: Interactive slider demonstrating how hot-stuffed beeswax and beef tallow migrate under friction from Day 0 through Year 5, showing scratch self-healing and copper rivet verdigris.
- Portland Atelier Vault Drawer: Instant monogram foil customizer and direct workshop queue reservation.

Private interactive prototype:
${LIVE_URL}

No pitch or agency retainers—if you want your engineering team to take the source code, I will hand over the repository directly. Would love to know if this honors the Martinez family craft.

Best regards,

Billy Benjamin
Founder & Principal Designer | Billy Benjamin Consulting
Email: billybenjamin836@gmail.com
LinkedIn: https://www.linkedin.com/in/billy-benjamin-b02265315
Studio: billybenjaminconsulting.online`;

function buildGmailUrl(to, subject, body) {
  const base = "https://mail.google.com/mail/?view=cm&fs=1";
  const params = new URLSearchParams({
    to: to,
    su: subject,
    body: body,
  });
  return `${base}&${params.toString()}`;
}

const primaryLaunchpad = buildGmailUrl(RECIPIENT_PRIMARY, SUBJECT, PITCH_BODY);
const secondaryLaunchpad = buildGmailUrl(RECIPIENT_SECONDARY, SUBJECT, PITCH_BODY);

console.log("\n=======================================================");
console.log("OROX LEATHER CO. // 1-CLICK GMAIL DIRECT LAUNCHPAD");
console.log("=======================================================\n");
console.log("TARGET: Martin Martinez (CEO & President, Orox Leather Co.)");
console.log(`PRIMARY EMAIL: ${RECIPIENT_PRIMARY}`);
console.log(`SECONDARY EMAIL: ${RECIPIENT_SECONDARY}`);
console.log(`LIVE SANDBOX: ${LIVE_URL}\n`);
console.log("1-CLICK GMAIL LAUNCHPAD (MARTIN MARTINEZ):");
console.log(primaryLaunchpad);
console.log("\n1-CLICK GMAIL LAUNCHPAD (STUDIO INBOX):");
console.log(secondaryLaunchpad);
console.log("\n=======================================================\n");

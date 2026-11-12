// scripts/generate_eastfork_launchpad.js
// Autonomous 1-Click Launchpad Generator for East Fork Pottery (Alex Matisse & Connie Matisse)

const RECIPIENT_PRIMARY = "alex@eastfork.com";
const RECIPIENT_SECONDARY = "care@eastfork.com";
const LIVE_URL = "https://billy-benjamin-consulting.onrender.com/eastfork";

const SUBJECT = "East Fork Pottery // 60 FPS Tabletop Dinner Party Canvas & Cone 10 Kiln Lab Concept";

const PITCH_BODY = `Hi Alex,

Admire what you, Connie, and John have built in Asheville—especially preserving the North Carolina wood-firing lineage through your Cone 10 gas reduction kilns and regional Appalachian clay.

As a design engineer and commercial product architect, I examined where ceramic dinnerware collectors hesitate most before checking out:
1. Tabletop Place-Setting Uncertainty: Customers purchasing $198 to $340 suites (The Potter's 5-Piece or 7-Piece Setting) struggle to visualize how contrasting glazes—like a Panna Cotta Dinner Plate, Amaro Everyday Bowl, and Morel Mug—layer together on 2, 4, or 8-person dining tables, or how stacked rims clear cupboard shelves.
2. Cone 10 Reduction Education: Uninitiated buyers often compare East Fork to mass-produced white ceramic without understanding why starved-oxygen gas firing at 2,345°F pulls natural iron freckles through the feldspar glaze.

To address these barriers, I developed an interactive digital flagship sandbox for East Fork:
- Live 60 FPS Tabletop Dinner Party Canvas: Diners configure 2, 4, or 8-person table spreads, mixing glazes across courses with live top-down dining geometry and a cupboard vertical nesting caliper (showing 4 Everyday Bowls nesting to 4.8" with zero wobble).
- Cone 10 Reduction Kiln Simulator: Interactive pyrometric heat slider (1,828°F to 2,345°F) with an atmosphere draft toggle (Oxidation vs Gas Reduction) showing how starved oxygen pulls iron speckling out of regional clay.
- Asheville Kiln Allocation Vault: Direct place-setting suite customizer with automatic volume tiering and $0 insured ceramic freight.

Private interactive prototype:
${LIVE_URL}

No agency pitch or retainers—if you want your engineering team to take the code, I will transfer the repository directly. Would love to hear if this reflects the East Fork craft.

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
console.log("EAST FORK POTTERY // 1-CLICK GMAIL DIRECT LAUNCHPAD");
console.log("=======================================================\n");
console.log("TARGET: Alex Matisse (Founder & CEO, East Fork Pottery)");
console.log(`PRIMARY EMAIL: ${RECIPIENT_PRIMARY}`);
console.log(`SECONDARY EMAIL: ${RECIPIENT_SECONDARY}`);
console.log(`LIVE SANDBOX: ${LIVE_URL}\n`);
console.log("1-CLICK GMAIL LAUNCHPAD (ALEX MATISSE):");
console.log(primaryLaunchpad);
console.log("\n1-CLICK GMAIL LAUNCHPAD (CARE TEAM):");
console.log(secondaryLaunchpad);
console.log("\n=======================================================\n");

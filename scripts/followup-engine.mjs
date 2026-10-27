#!/usr/bin/env node
/**
 * BILLY BENJAMIN CONSULTING // AUTOMATED LEAD FOLLOW-UP ENGINE
 * Inspects captured leads from data/leads.json and generates personalized
 * 3-stage follow-up sequences formatted for high-conversion outreach.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const leadsFilePath = path.join(__dirname, "..", "data", "leads.json");

function loadLeads() {
  try {
    if (!fs.existsSync(leadsFilePath)) {
      console.log("[INFO] No leads file found at:", leadsFilePath);
      return [];
    }
    const data = fs.readFileSync(leadsFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("[ERROR] Failed to read leads:", err.message);
    return [];
  }
}

function generateFollowUpSequence(lead) {
  const { founderName, email, storeUrl, primaryBottleneck, ticketId, timestamp } = lead;

  const stage1Subject = `[${ticketId}] Forensic Audit Request Registered — Billy Benjamin Consulting`;
  const stage1Body = `
Hello ${founderName},

Your private audit request for ${storeUrl} has been registered under ticket ${ticketId}.

We are currently executing our dual-surface forensic inspection:
1. Surface A (The Store): LCP speed profile, mobile viewport friction, and cart checkout drop-off mechanics.
2. Surface B (Instagram): Bio link continuity, story-to-cart handoff, and offer clarity.

Primary bottleneck flagged: ${primaryBottleneck}.

Your complete teardown will be delivered within 24 hours.

Billy Benjamin
Founder & Principal Revenue Architect
Billy Benjamin Consulting
https://billybenjaminconsulting.online
`;

  const stage2Subject = `[${ticketId}] Forensic Teardown Complete: 3 Leaks on ${storeUrl}`;
  const stage2Body = `
Hello ${founderName},

The forensic teardown for ${storeUrl} is complete. Here is the executive breakdown:

1. THE PRIMARY LEAK:
   Your checkout architecture is experiencing severe mobile abandonment (${primaryBottleneck}).
   Every extra tap and delayed drawer animation past 2.0s degrades your conversion by approximately -1.2%.

2. THE DUAL-SURFACE FRICTION:
   Traffic arriving from social channels hits an unsegmented catalog without clear tri-modal navigation (Explorers bounce, Evaluators lack specs, Skeptics see zero upfront shipping terms).

3. THE IMMEDIATE FIX:
   Replacing the multi-step checkout with a 1-tap slide-out drawer with upfront shipping calculation will recover an estimated 15-28% of abandoned checkouts.

I have scaffolded a private sandbox prototype demonstrating this fix for ${storeUrl}.
Let me know if you want me to send over the live preview link.

Billy Benjamin
Billy Benjamin Consulting
`;

  const stage3Subject = `[${ticketId}] Sandbox prototype ready for ${storeUrl}`;
  const stage3Body = `
Hello ${founderName},

Following up on the audit teardown for ${storeUrl}.

We built the interactive Swiss-Grid prototype addressing the ${primaryBottleneck} leak. It is engineered with:
- Sub-2.5s LCP load time.
- Thumb-zone mobile parity (minimum 48px tap targets).
- 1-tap slide-out Paystack / Apple Pay integration.

Would you like to review the sandboxed demonstration this week?

Billy Benjamin
Founder, Billy Benjamin Consulting
https://billybenjaminconsulting.online
`;

  return {
    lead,
    sequences: [
      { stage: "01_IMMEDIATE_INTAKE (0h)", subject: stage1Subject, body: stage1Body.trim() },
      { stage: "02_FORENSIC_TEARDOWN (24h)", subject: stage2Subject, body: stage2Body.trim() },
      { stage: "03_SANDBOX_OFFER (72h)", subject: stage3Subject, body: stage3Body.trim() },
    ],
  };
}

// CLI Execution
const leads = loadLeads();
console.log(`=======================================================`);
console.log(`BILLY BENJAMIN CONSULTING // LEAD FOLLOW-UP ENGINE`);
console.log(`TOTAL LEADS LOGGED: ${leads.length}`);
console.log(`=======================================================\n`);

if (leads.length === 0) {
  console.log("No leads currently captured. Submit a test lead through the UI or API.");
} else {
  leads.forEach((lead, idx) => {
    console.log(`LEAD #${idx + 1}: ${lead.founderName} (${lead.email})`);
    console.log(`STORE: ${lead.storeUrl} | BOTTLENECK: ${lead.primaryBottleneck}`);
    console.log(`TICKET: ${lead.ticketId} | TIMESTAMP: ${lead.timestamp}\n`);
    
    const seq = generateFollowUpSequence(lead);
    seq.sequences.forEach(s => {
      console.log(`--- [STAGE: ${s.stage}] ---`);
      console.log(`SUBJECT: ${s.subject}`);
      console.log(`BODY:\n${s.body}\n`);
    });
  });
}

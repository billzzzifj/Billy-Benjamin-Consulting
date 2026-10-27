# BILLY BENJAMIN CONSULTING (BBC) // REVENUE ARCHITECTURE & PORTFOLIO
**Aesthetic Signature:** BBC Swiss-Grid Editorial Brutalism  
**Principal:** Billy Benjamin — Founder & Principal Revenue Architect  
**Domain:** [billybenjaminconsulting.online](https://billybenjaminconsulting.online)  
**Coordinates:** Lagos // London // NYC  

---

## 1. ARCHITECTURAL OVERVIEW
This application is the primary commercial portfolio and forensic lead acquisition engine for Billy Benjamin Consulting. Built with Next.js 15, React 19, and Tailwind CSS, it enforces the strict **BBC Swiss-Grid Editorial Brutalism** design standard:

- **Canvas & Palette:** Bone (`#F5F5F3`), Obsidian Ink (`#0A0A0A`), Lime Accent (`#CDE570`).
- **Structural Grid:** Strict continuous `1px solid #0A0A0A` borders (`border-[#0A0A0A]`), zero rounded corners (`rounded-none`), flush touching compartments with zero margin gutters.
- **Typography:** Massive ultra-condensed black display headers (`font-black uppercase tracking-tighter leading-[0.92]`) contrasted with monospaced metadata and data labels (`font-mono uppercase text-xs/sm`).
- **Tactile Materiality:** Physical stone/marble mockups, raw editorial prints, and technical wireframe overlays with high-contrast grayscale filtering.

---

## 2. CORE CONVERSION PHYSICS & UX LAWS
1. **Speed & Payload:** Preloaded LCP hero asset (`/assets/founder-portrait.jpg`). Total visual asset payload: `~564 KB` (< 2.0MB Core Web Vitals threshold).
2. **Mobile Constraint Parity:** 100% of interactive inputs, select menus, and CTA buttons enforce `>= 48px` touch target floors.
3. **Above-the-Fold Proof:** Real-time verified metric badge (`+$44.9K / MO GMV LIFT`) and operating coordinates anchored directly adjacent to the value proposition.
4. **Tri-Modal Engineering:** Designed to convert Explorers (atmosphere & tactile stone photography), Evaluators (quantitative funnel diagrams & drop-off telemetry), and Skeptics (256-bit encryption & 24h SLA guarantees).

---

## 3. SECTIONS & COMMERCIAL CAPABILITIES

- **00 // Global Telemetry Ticker:** Real-time status indicators, operational coordinates, and performance budgets.
- **01 // Section 01: The Hero:** Asymmetrical 2-column split with commercial positioning and flush founder portrait.
- **02 // Section 02: Forensic Diagnosis (The Bleed):** Quantitative audit ledger analyzing cart abandonment (`-64.2%`), mobile bounce metrics (`78.4%`), and the latency tax (`3.8s LCP`).
- **03 // Section 03: The 3-Lever Compound Engine:** 3-column physical compartments mapping PDP retention, 1-tap checkout drawers, and brand equity pricing power.
- **04 // Section 04: The Sandbox & Lead Acquisition:** High-visibility `#CDE570` lime block capturing founder name, work email, brand URL, and primary bottleneck.
- **05 // Footer Telemetry:** Legal sovereignty, copyright, and global corridor anchors.

---

## 4. LEAD CAPTURE & AUTOMATED FOLLOW-UP ENGINE

### API Route: `/api/lead`
- **Method:** `POST`
- **Payload:** `{ founderName, email, storeUrl, primaryBottleneck, whatsapp? }`
- **Features:**
  - Automated ticket ID assignment (`BBC-TX-XXXX`).
  - Thread-safe persistence to `data/leads.json`.
  - Email notification trigger via Resend (configured via `RESEND_API_KEY`).
  - Webhook dispatch to Slack / Zapier / Google Sheets (configured via `LEAD_WEBHOOK_URL`).

### CLI Follow-Up Dispatcher
Generate personalized 3-stage follow-up sequences for captured leads:
```bash
node scripts/followup-engine.mjs
```
- **Stage 01 (0h):** Immediate audit intake confirmation.
- **Stage 02 (24h):** Dual-surface forensic teardown deliverable.
- **Stage 03 (72h):** Interactive sandbox prototype offer.

---

## 5. LOCAL DEVELOPMENT & PRODUCTION COMMANDS

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start -p 3000

# Run follow-up sequence generator
node scripts/followup-engine.mjs
```

---

## 6. ENVIRONMENT VARIABLES (OPTIONAL)
Create `.env.local` to configure live email dispatch and webhooks:
```env
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=billy@billybenjaminconsulting.online
LEAD_WEBHOOK_URL=https://your-webhook-endpoint.com
```

---
© 2026 Billy Benjamin Consulting. All rights reserved.

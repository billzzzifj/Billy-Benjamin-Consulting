import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const carouselDir = path.join(rootDir, "carousel");
const exportsDir = path.join(rootDir, "exports", "carousel-case-08");

if (!fs.existsSync(carouselDir)) fs.mkdirSync(carouselDir, { recursive: true });
if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir, { recursive: true });

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// Common Head Template
const getHead = (title) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1080, height=1350, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@700;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            bone: '#F5F5F3',
            obsidian: '#0A0A0A',
            lime: '#CDE570',
          },
          fontFamily: {
            mono: ['"JetBrains Mono"', 'monospace'],
            display: ['"Space Grotesk"', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    * { box-sizing: border-box; }
    body {
      width: 1080px;
      height: 1350px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #F5F5F3;
      color: #0A0A0A;
      font-family: 'Space Grotesk', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body class="flex flex-col justify-between p-12 border-[2px] border-[#0A0A0A]">
`;

const getFooter = (slideNum) => `
  <!-- GLOBAL FOOTER BAR -->
  <div class="border-t-[2px] border-[#0A0A0A] pt-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#0A0A0A]/70">
    <div class="flex items-center gap-3">
      <span class="w-3 h-3 bg-[#CDE570] border border-[#0A0A0A] inline-block"></span>
      <span class="font-bold text-[#0A0A0A]">BILLY BENJAMIN CONSULTING</span>
      <span>//</span>
      <span>SWISS GRID EDITORIAL BRUTALISM</span>
    </div>
    <div class="font-bold bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1">
      SLIDE ${slideNum} OF 10
    </div>
  </div>
</body>
</html>
`;

// Slide Definitions
const slides = [
  {
    num: "01",
    filename: "slide-01.html",
    render: () => `
${getHead("Slide 01 // The Hook")}
  <!-- TOP HEADER -->
  <div>
    <div class="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-4 mb-8 font-mono text-xs uppercase tracking-widest">
      <div class="bg-[#CDE570] text-[#0A0A0A] px-3 py-1 border border-[#0A0A0A] font-bold">
        CASE 08 // DUAL-SURFACE FORENSIC AUDIT
      </div>
      <div class="text-[#0A0A0A]/60">
        PRIMARY CHECKOUT LEAK INSPECTION
      </div>
    </div>

    <!-- PRIMARY HEADLINE -->
    <h1 class="text-7xl font-black uppercase tracking-tighter leading-[0.92] text-[#0A0A0A] mb-8">
      HOW A $500K LAGOS D2C BRAND LOSES $18,400 EVERY MONTH IN THE CHECKOUT DRAWER.
    </h1>

    <div class="border border-[#0A0A0A] bg-[#0A0A0A] text-[#F5F5F3] p-4 inline-block font-mono text-sm uppercase tracking-wide mb-8">
      (AND WHY BUYING MORE META ADS WILL NEVER FIX IT)
    </div>
  </div>

  <!-- VISUAL COMPARTMENT -->
  <div class="relative border-[2px] border-[#0A0A0A] h-[520px] bg-[#0A0A0A] overflow-hidden flex items-end">
    <img src="../public/assets/founder-portrait.jpg" class="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60">
    <div class="relative z-10 w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent p-8">
      <div class="flex items-center justify-between border-t border-[#F5F5F3]/30 pt-4 font-mono">
        <div>
          <span class="text-xs uppercase text-[#F5F5F3]/60 block">MEASURED METRIC</span>
          <span class="text-4xl font-black text-[#CDE570]">-64.2% DROP-OFF</span>
        </div>
        <div class="text-right">
          <span class="text-xs uppercase text-[#F5F5F3]/60 block">CORE AUDIT ENGINE</span>
          <span class="text-sm font-bold text-[#F5F5F3]">SURFACE A + SURFACE B</span>
        </div>
      </div>
    </div>
  </div>
${getFooter("01")}
`
  },
  {
    num: "02",
    filename: "slide-02.html",
    render: () => `
${getHead("Slide 02 // The Dual-Surface Reality Check")}
  <div>
    <div class="border-b-[2px] border-[#0A0A0A] pb-4 mb-8 font-mono text-xs uppercase tracking-widest bg-[#CDE570] p-3 border border-[#0A0A0A] font-bold">
      02 // THE DUAL-SURFACE REALITY CHECK
    </div>

    <h2 class="text-6xl font-black uppercase tracking-tighter leading-[0.95] text-[#0A0A0A] mb-8">
      YOU DO NOT HAVE A TRAFFIC PROBLEM. YOU HAVE CONVERSION RESISTANCE.
    </h2>
  </div>

  <!-- 2 COLUMN SPLIT -->
  <div class="grid grid-cols-2 gap-6 my-auto">
    <!-- Col 1: Surface B -->
    <div class="border-[2px] border-[#0A0A0A] p-8 bg-white flex flex-col justify-between h-[560px]">
      <div>
        <div class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 font-mono text-xs uppercase font-bold inline-block mb-6">
          SURFACE B // INSTAGRAM
        </div>
        <div class="text-5xl font-black font-mono text-[#0A0A0A] mb-2 tracking-tighter">
          82%
        </div>
        <div class="font-mono text-xs uppercase font-bold text-[#0A0A0A]/60 mb-6">
          TOTAL ACQUISITION VOLUME ON PHONES
        </div>
        <p class="font-mono text-sm uppercase leading-relaxed text-[#0A0A0A]/80">
          High-budget Reels generate rapid buying impulse, but route traffic directly into an unsegmented bio link with zero product continuity.
        </p>
      </div>
      <div class="border-t border-[#0A0A0A] pt-4 font-mono text-xs uppercase text-red-600 font-bold">
        [HARD FAIL B1: ORIENTATION LOST]
      </div>
    </div>

    <!-- Col 2: Surface A -->
    <div class="border-[2px] border-[#0A0A0A] p-8 bg-[#CDE570] flex flex-col justify-between h-[560px]">
      <div>
        <div class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 font-mono text-xs uppercase font-bold inline-block mb-6">
          SURFACE A // THE STORE
        </div>
        <div class="text-5xl font-black font-mono text-[#0A0A0A] mb-2 tracking-tighter">
          3.8S
        </div>
        <div class="font-mono text-xs uppercase font-bold text-[#0A0A0A]/70 mb-6">
          MOBILE LARGEST CONTENTFUL PAINT
        </div>
        <p class="font-mono text-sm uppercase leading-relaxed text-[#0A0A0A]/90 font-medium">
          Desktop-first templates choke on cellular connections. Mobile buyers wait 4 seconds, hit a 4-step account wall, and abandon.
        </p>
      </div>
      <div class="border-t border-[#0A0A0A] pt-4 font-mono text-xs uppercase text-[#0A0A0A] font-bold">
        [HARD FAIL A1: LATENCY TAX]
      </div>
    </div>
  </div>
${getFooter("02")}
`
  },
  {
    num: "03",
    filename: "slide-03.html",
    render: () => `
${getHead("Slide 03 // Leak 01: Speed Physics")}
  <div>
    <div class="border-b-[2px] border-[#0A0A0A] pb-4 mb-8 font-mono text-xs uppercase tracking-widest flex justify-between items-center">
      <span class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 font-bold">LEAK 01 // SPEED PHYSICS</span>
      <span class="text-xs font-mono uppercase text-[#0A0A0A]/60">[BENCHMARK: CORE WEB VITALS]</span>
    </div>

    <h2 class="text-5xl font-black uppercase tracking-tighter leading-tight text-[#0A0A0A] mb-6">
      THE 3.8-SECOND LATENCY TAX: WHY 42% OF YOUR AD TRAFFIC BOUNCES BEFORE PAINT.
    </h2>
  </div>

  <div class="border-[2px] border-[#0A0A0A] bg-white p-8 my-auto space-y-8">
    <div class="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-6">
      <div>
        <span class="font-mono text-xs uppercase text-[#0A0A0A]/60 block">MEASURED LOAD SPEED</span>
        <span class="font-mono text-7xl font-black text-red-600 tracking-tighter">3.80S</span>
      </div>
      <div class="text-right">
        <span class="font-mono text-xs uppercase text-[#0A0A0A]/60 block">CONVERSION DEGRADATION</span>
        <span class="font-mono text-5xl font-black text-[#0A0A0A] tracking-tighter">-1.2% / 100MS</span>
      </div>
    </div>

    <div class="space-y-4 font-mono text-sm uppercase">
      <div class="flex items-start gap-4 p-4 bg-[#F5F5F3] border border-[#0A0A0A]">
        <span class="font-bold text-red-600">01</span>
        <span>14MB uncompressed hero videos paralyze cellular bandwidth in Lagos and London.</span>
      </div>
      <div class="flex items-start gap-4 p-4 bg-[#F5F5F3] border border-[#0A0A0A]">
        <span class="font-bold text-red-600">02</span>
        <span>18 unbundled review and popup apps inject render-blocking JavaScript execution.</span>
      </div>
      <div class="flex items-start gap-4 p-4 bg-[#CDE570] border border-[#0A0A0A] font-bold text-[#0A0A0A]">
        <span>BBC RULE: HERO PAYLOAD &lt; 2MB • LCP &lt; 2.50S MANDATORY</span>
      </div>
    </div>
  </div>
${getFooter("03")}
`
  },
  {
    num: "04",
    filename: "slide-04.html",
    render: () => `
${getHead("Slide 04 // Leak 02: Mobile Constraint Parity")}
  <div>
    <div class="border-b-[2px] border-[#0A0A0A] pb-4 mb-8 font-mono text-xs uppercase tracking-widest flex justify-between items-center">
      <span class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 font-bold">LEAK 02 // MOBILE CONSTRAINT PARITY</span>
      <span class="text-xs font-mono uppercase text-[#0A0A0A]/60">[UX LAW 01: THUMB ERGONOMICS]</span>
    </div>

    <h2 class="text-6xl font-black uppercase tracking-tighter leading-tight text-[#0A0A0A] mb-6">
      DESKTOP THEMES ON MOBILE VIEWPORTS TRIGGER RAGE-TAPS.
    </h2>
  </div>

  <div class="border-[2px] border-[#0A0A0A] bg-white p-8 my-auto">
    <div class="grid grid-cols-2 gap-8 items-center border-b-[2px] border-[#0A0A0A] pb-8 mb-8">
      <div>
        <span class="font-mono text-xs uppercase text-[#0A0A0A]/60 block">STANDARD THEME TOUCH TARGET</span>
        <span class="font-mono text-6xl font-black text-red-600 tracking-tighter">32PX</span>
        <span class="font-mono text-xs uppercase text-red-600 block mt-1 font-bold">FAILS FAT-FINGER THRESHOLD</span>
      </div>
      <div>
        <span class="font-mono text-xs uppercase text-[#0A0A0A]/60 block">BBC PROTOCOL TOUCH TARGET</span>
        <span class="font-mono text-6xl font-black text-[#0A0A0A] tracking-tighter">56PX</span>
        <span class="font-mono text-xs uppercase text-[#0A0A0A] block mt-1 font-bold bg-[#CDE570] px-2 inline-block">100% THUMB ZONE PASS</span>
      </div>
    </div>

    <div class="font-mono text-sm uppercase leading-relaxed text-[#0A0A0A]/80 space-y-4">
      <p>• If a buyer has to zoom in or pinch to select a size, conversion drops by over 30%.</p>
      <p>• Sticky bottom bars that collide with native iOS/Android navigation cause accidental tab closes.</p>
      <p class="font-bold text-[#0A0A0A] pt-2 border-t border-[#0A0A0A]">
        CONVERSION LAW: Every interactive element must enforce a strict &ge; 48px hit target with &ge; 8px separation.
      </p>
    </div>
  </div>
${getFooter("04")}
`
  },
  {
    num: "05",
    filename: "slide-05.html",
    render: () => `
${getHead("Slide 05 // Leak 03: Account Creation Wall")}
  <div>
    <div class="border-b-[2px] border-[#0A0A0A] pb-4 mb-8 font-mono text-xs uppercase tracking-widest flex justify-between items-center">
      <span class="bg-[#CDE570] text-[#0A0A0A] px-3 py-1 font-bold border border-[#0A0A0A]">LEAK 03 // CHECKOUT FRICTION</span>
      <span class="text-xs font-mono uppercase text-[#0A0A0A]/60">[BAYMARD BENCHMARK]</span>
    </div>

    <h2 class="text-5xl font-black uppercase tracking-tighter leading-tight text-[#0A0A0A] mb-8">
      FORCING ACCOUNT CREATION BEFORE PAYMENT IS A COMMERCIAL CRIME.
    </h2>
  </div>

  <div class="border-[2px] border-[#0A0A0A] bg-[#0A0A0A] text-[#F5F5F3] p-8 my-auto space-y-6 font-mono">
    <div class="text-[#CDE570] text-lg font-bold uppercase border-b border-[#F5F5F3]/30 pb-4">
      THE 3-STEP ABANDONMENT ACCELERATOR:
    </div>

    <div class="space-y-4 text-xs uppercase">
      <div class="p-4 border border-[#F5F5F3]/20 bg-[#F5F5F3]/5">
        <span class="text-[#CDE570] font-bold block mb-1">BARRIER 01 // MANDATORY SIGN-UP</span>
        Demanding passwords and birthday fields before letting a client pay burns 23% of impulsive buyers.
      </div>
      <div class="p-4 border border-[#F5F5F3]/20 bg-[#F5F5F3]/5">
        <span class="text-[#CDE570] font-bold block mb-1">BARRIER 02 // HIDDEN SHIPPING SURPRISE</span>
        Revealing $15 delivery fees only on the final step triggers instant cart exit (UX Law 06 violation).
      </div>
      <div class="p-4 border border-[#F5F5F3]/20 bg-[#F5F5F3]/5">
        <span class="text-[#CDE570] font-bold block mb-1">BARRIER 03 // MISSING LOCAL PAYMENT</span>
        Zero Paystack / Apple Pay express buttons forces manual 16-digit card typing on mobile.
      </div>
    </div>
  </div>
${getFooter("05")}
`
  },
  {
    num: "06",
    filename: "slide-06.html",
    render: () => `
${getHead("Slide 06 // Continuity Collapse")}
  <div>
    <div class="border-b-[2px] border-[#0A0A0A] pb-4 mb-8 font-mono text-xs uppercase tracking-widest flex justify-between items-center">
      <span class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 font-bold">SURFACE B TO A // THE HANDOFF</span>
      <span class="text-xs font-mono uppercase text-[#0A0A0A]/60">[CONTINUITY COLLAPSE]</span>
    </div>

    <h2 class="text-5xl font-black uppercase tracking-tighter leading-tight text-[#0A0A0A] mb-8">
      DO NOT FORCE AN IMPULSE BUYER TO BECOME A SEARCH DETECTIVE.
    </h2>
  </div>

  <div class="border-[2px] border-[#0A0A0A] bg-white p-8 my-auto space-y-6">
    <div class="font-mono text-xs uppercase font-bold text-red-600 bg-red-100 p-3 border border-red-300">
      WHAT HAPPENS RIGHT NOW (THE BROKEN FUNNEL):
    </div>

    <div class="flex items-center justify-between font-mono text-xs uppercase border border-[#0A0A0A] p-4 bg-[#F5F5F3]">
      <div class="text-center font-bold">IG REEL (JACKET)</div>
      <div class="text-red-600 font-bold">&rarr;</div>
      <div class="text-center font-bold">BIO LINK</div>
      <div class="text-red-600 font-bold">&rarr;</div>
      <div class="text-center font-bold text-red-600">GENERIC HOME (ALL PRODUCTS)</div>
      <div class="text-red-600 font-bold">&rarr;</div>
      <div class="text-center font-bold text-red-600">BOUNCE IN 6S</div>
    </div>

    <div class="font-mono text-xs uppercase font-bold text-[#0A0A0A] bg-[#CDE570] p-3 border border-[#0A0A0A] mt-6">
      THE BBC FIX (THE DIRECT HANDOFF):
    </div>

    <div class="flex items-center justify-between font-mono text-xs uppercase border border-[#0A0A0A] p-4 bg-white">
      <div class="text-center font-bold">IG REEL</div>
      <div class="text-[#0A0A0A] font-bold">&rarr;</div>
      <div class="text-center font-bold">STORY 1-TAP LINK</div>
      <div class="text-[#0A0A0A] font-bold">&rarr;</div>
      <div class="text-center font-bold bg-[#CDE570] px-2 py-1">PRE-FILTERED PDP DRAWER</div>
      <div class="text-[#0A0A0A] font-bold">&rarr;</div>
      <div class="text-center font-bold">CHECKOUT IN &le; 2 TAPS</div>
    </div>
  </div>
${getFooter("06")}
`
  },
  {
    num: "07",
    filename: "slide-07.html",
    render: () => `
${getHead("Slide 07 // The Turnkey Intervention")}
  <div>
    <div class="border-b-[2px] border-[#0A0A0A] pb-4 mb-8 font-mono text-xs uppercase tracking-widest flex justify-between items-center">
      <span class="bg-[#CDE570] text-[#0A0A0A] px-3 py-1 font-bold border border-[#0A0A0A]">TURNKEY INTERVENTION</span>
      <span class="text-xs font-mono uppercase text-[#0A0A0A]/60">[UX LAW 04: TRI-MODAL JOURNEY]</span>
    </div>

    <h2 class="text-5xl font-black uppercase tracking-tighter leading-tight text-[#0A0A0A] mb-8">
      TRI-MODAL PDP ARCHITECTURE: CONVERTING THREE DISTINCT BUYER PSYCHOLOGIES.
    </h2>
  </div>

  <div class="space-y-4 my-auto font-mono">
    <!-- Compartment 1 -->
    <div class="border-[2px] border-[#0A0A0A] p-6 bg-white flex justify-between items-center">
      <div class="max-w-xl">
        <span class="text-xs uppercase font-bold text-[#0A0A0A] block mb-1">01 // THE EXPLORER (ATMOSPHERE)</span>
        <p class="text-xs uppercase text-[#0A0A0A]/70">Tactile stone mockups, raw physical prints, editorial video pacing. Captures visceral desire in first 50ms.</p>
      </div>
      <div class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 text-xs uppercase font-bold">FEEL</div>
    </div>

    <!-- Compartment 2 -->
    <div class="border-[2px] border-[#0A0A0A] p-6 bg-white flex justify-between items-center">
      <div class="max-w-xl">
        <span class="text-xs uppercase font-bold text-[#0A0A0A] block mb-1">02 // THE EVALUATOR (LOGIC)</span>
        <p class="text-xs uppercase text-[#0A0A0A]/70">GSM fabric weights, millimeter sizing tables, structured bullet specifications. Satisfies logical justification.</p>
      </div>
      <div class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 text-xs uppercase font-bold">SPECS</div>
    </div>

    <!-- Compartment 3 -->
    <div class="border-[2px] border-[#0A0A0A] p-6 bg-[#CDE570] flex justify-between items-center">
      <div class="max-w-xl">
        <span class="text-xs uppercase font-bold text-[#0A0A0A] block mb-1">03 // THE SKEPTIC (SECURITY)</span>
        <p class="text-xs uppercase text-[#0A0A0A]/80 font-medium">Exact delivery date countdown, 14-day exchange guarantee, 256-bit Paystack / Apple Pay badges adjacent to CTA.</p>
      </div>
      <div class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 text-xs uppercase font-bold">TRUST</div>
    </div>
  </div>
${getFooter("07")}
`
  },
  {
    num: "08",
    filename: "slide-08.html",
    render: () => `
${getHead("Slide 08 // The Built Fix: 1-Tap Checkout")}
  <div>
    <div class="border-b-[2px] border-[#0A0A0A] pb-4 mb-6 font-mono text-xs uppercase tracking-widest flex justify-between items-center">
      <span class="bg-[#0A0A0A] text-[#F5F5F3] px-3 py-1 font-bold">LEVER 02 // CHECKOUT ENGINEERING</span>
      <span class="text-xs font-mono uppercase text-[#0A0A0A]/60">[THE BUILT FIX]</span>
    </div>

    <h2 class="text-5xl font-black uppercase tracking-tighter leading-tight text-[#0A0A0A] mb-4">
      1-TAP SLIDE-OUT CHECKOUT WITH UPFRONT PRICING TRANSPARENCY.
    </h2>
  </div>

  <div class="relative border-[2px] border-[#0A0A0A] h-[580px] bg-white overflow-hidden flex items-center justify-center p-6">
    <img src="../public/assets/mobile-mockup-stone.jpg" class="h-full w-auto object-contain grayscale contrast-125">
    
    <!-- TACTICAL LABELS -->
    <div class="absolute top-6 left-6 bg-[#0A0A0A] text-[#F5F5F3] p-3 font-mono text-[10px] uppercase border border-[#F5F5F3]/30">
      &bull; 100% UPFRONT SHIPPING CALCULATION<br>
      &bull; 1-TAP PAYSTACK & APPLE PAY<br>
      &bull; 56PX MINIMUM HIT ZONE
    </div>

    <div class="absolute bottom-6 right-6 bg-[#CDE570] text-[#0A0A0A] p-3 font-mono text-[10px] uppercase font-bold border border-[#0A0A0A]">
      RECOVERS 15% - 28% ABANDONED CARTS
    </div>
  </div>
${getFooter("08")}
`
  },
  {
    num: "09",
    filename: "slide-09.html",
    render: () => `
${getHead("Slide 09 // The Quantified Balance Sheet")}
  <div>
    <div class="border-b-[2px] border-[#0A0A0A] pb-4 mb-8 font-mono text-xs uppercase tracking-widest flex justify-between items-center">
      <span class="bg-[#CDE570] text-[#0A0A0A] px-3 py-1 font-bold border border-[#0A0A0A]">QUANTIFIED BALANCE SHEET</span>
      <span class="text-xs font-mono uppercase text-[#0A0A0A]/60">[MEASURED POST-DEPLOY]</span>
    </div>

    <h2 class="text-5xl font-black uppercase tracking-tighter leading-tight text-[#0A0A0A] mb-8">
      THE REVENUE COMPOUND FORMULA: HOW FIXING ARCHITECTURE ADDS +$220K/YR.
    </h2>
  </div>

  <div class="border-[2px] border-[#0A0A0A] bg-white my-auto font-mono">
    <!-- Table Header -->
    <div class="grid grid-cols-3 bg-[#0A0A0A] text-[#F5F5F3] p-4 text-xs uppercase font-bold tracking-wider">
      <div>METRIC VECTOR</div>
      <div class="text-center">PRE-AUDIT</div>
      <div class="text-right text-[#CDE570]">POST-DEPLOY</div>
    </div>

    <!-- Rows -->
    <div class="grid grid-cols-3 p-4 border-b border-[#0A0A0A] text-xs uppercase items-center">
      <div class="font-bold">MOBILE LCP</div>
      <div class="text-center text-red-600">3.80S</div>
      <div class="text-right font-black text-[#0A0A0A] bg-[#CDE570] px-2 py-1">1.35S (-64%)</div>
    </div>

    <div class="grid grid-cols-3 p-4 border-b border-[#0A0A0A] text-xs uppercase items-center bg-[#F5F5F3]">
      <div class="font-bold">CHECKOUT COMPLETION</div>
      <div class="text-center text-red-600">1.82%</div>
      <div class="text-right font-black text-[#0A0A0A] bg-[#CDE570] px-2 py-1">2.48% (+36%)</div>
    </div>

    <div class="grid grid-cols-3 p-4 border-b border-[#0A0A0A] text-xs uppercase items-center">
      <div class="font-bold">CART ABANDONMENT</div>
      <div class="text-center text-red-600">68.4%</div>
      <div class="text-right font-black text-[#0A0A0A] bg-[#CDE570] px-2 py-1">51.2% (-17%)</div>
    </div>

    <div class="grid grid-cols-3 p-6 bg-[#0A0A0A] text-[#CDE570] text-sm uppercase font-bold items-center">
      <div class="text-[#F5F5F3]">RECOVERED GMV</div>
      <div class="text-center text-[#F5F5F3]/50">$0</div>
      <div class="text-right font-black text-lg">+$18,400 / MO</div>
    </div>
  </div>
${getFooter("09")}
`
  },
  {
    num: "10",
    filename: "slide-10.html",
    render: () => `
${getHead("Slide 10 // The Action Loop")}
  <div class="bg-[#CDE570] p-10 border-[2px] border-[#0A0A0A] h-full flex flex-col justify-between">
    <div>
      <div class="font-mono text-xs uppercase font-bold text-[#0A0A0A] tracking-widest mb-6">
        10 // PRIVATE AUDIT &amp; VALUE BRIDGE
      </div>

      <h2 class="text-6xl font-black uppercase tracking-tighter leading-[0.92] text-[#0A0A0A] mb-8">
        STOP GUESSING WHERE YOUR REVENUE IS LEAKING.
      </h2>

      <div class="space-y-4 font-mono text-sm uppercase text-[#0A0A0A]/90 leading-relaxed mb-8">
        <p>I am conducting 5 private dual-surface forensic audits for scaling D2C brands this week.</p>
        <div class="bg-[#0A0A0A] text-[#F5F5F3] p-6 space-y-2 text-xs">
          <p class="text-[#CDE570] font-bold">YOU WILL RECEIVE:</p>
          <p>1. Complete video teardown of your Surface A (Store) &amp; Surface B (IG).</p>
          <p>2. Quantified speed &amp; thumb-zone friction telemetry.</p>
          <p>3. Pre-built interactive prototype fixing your primary checkout leak.</p>
        </div>
      </div>
    </div>

    <div>
      <div class="border-[2px] border-[#0A0A0A] bg-white p-6 font-mono text-center mb-6">
        <span class="block text-xs uppercase text-[#0A0A0A]/60 mb-1">CLAIM YOUR 24H TEARDOWN</span>
        <span class="block text-xl font-black uppercase text-[#0A0A0A] tracking-tight">
          COMMENT "AUDIT" OR VISIT BILLY-BENJAMIN-CONSULTING.ONRENDER.COM
        </span>
      </div>

      <div class="flex items-center justify-between font-mono text-[11px] uppercase text-[#0A0A0A]/70 pt-2 border-t border-[#0A0A0A]">
        <span>BILLY BENJAMIN CONSULTING</span>
        <span>LAGOS // LONDON // NYC</span>
      </div>
    </div>
  </div>
${getFooter("10")}
`
  }
];

// 1. Write HTML files
console.log("[1/3] Generating slide HTML files...");
slides.forEach(slide => {
  const filePath = path.join(carouselDir, slide.filename);
  fs.writeFileSync(filePath, slide.render().trim(), "utf-8");
  console.log(`  -> Created ${slide.filename}`);
});

// 2. Write master index.html for interactive web preview
console.log("[2/3] Generating interactive master index.html...");
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BBC Forensic Teardown Carousel // Case 08</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=Space+Grotesk:wght@700;900&display=swap" rel="stylesheet">
</head>
<body class="bg-[#0A0A0A] text-[#F5F5F3] font-mono p-8">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-wrap items-center justify-between border-b border-[#F5F5F3]/30 pb-6 mb-8">
      <div>
        <h1 class="text-3xl font-black text-[#CDE570] font-sans">BILLY BENJAMIN CONSULTING // FORENSIC CAROUSEL</h1>
        <p class="text-xs uppercase text-[#F5F5F3]/60 mt-1">CASE 08: LAGOS D2C $18,400/MO CHECKOUT BLEED TEARDOWN (10 SLIDES)</p>
      </div>
      <div class="flex gap-4">
        <span class="px-3 py-1 bg-[#CDE570] text-[#0A0A0A] font-bold text-xs uppercase">1080 x 1350 PX (4:5)</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${slides.map(s => `
        <div class="border border-[#F5F5F3]/30 bg-[#F5F5F3] p-2 flex flex-col">
          <div class="flex items-center justify-between font-mono text-[10px] uppercase text-[#0A0A0A] px-2 py-1 border-b border-[#0A0A0A] mb-2 font-bold">
            <span>SLIDE ${s.num}</span>
            <a href="${s.filename}" target="_blank" class="underline text-blue-600">FULL VIEW &nearr;</a>
          </div>
          <iframe src="${s.filename}" class="w-full aspect-[4/5] border border-[#0A0A0A] pointer-events-none scale-100 origin-top"></iframe>
        </div>
      `).join("\n")}
    </div>
  </div>
</body>
</html>
`;
fs.writeFileSync(path.join(carouselDir, "index.html"), indexHtml, "utf-8");

// 3. Export PNGs via Microsoft Edge headless
console.log("[3/3] Exporting 1080x1350 PNG images using Microsoft Edge headless...");
slides.forEach(slide => {
  const htmlPath = path.join(carouselDir, slide.filename);
  const pngPath = path.join(exportsDir, `slide-${slide.num}.png`);
  console.log(`  -> Rendering slide-${slide.num}.png...`);
  try {
    const cmd = `"${edgePath}" --headless=new --disable-gpu --hide-scrollbars --window-size=1080,1350 --screenshot="${pngPath}" "file:///${htmlPath.replace(/\\\\/g, "/")}"`;
    execSync(cmd, { stdio: "ignore" });
    const stats = fs.statSync(pngPath);
    console.log(`     OK: ${(stats.size / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error(`     FAILED: ${err.message}`);
  }
});

console.log("\n[COMPLETE] All 10 slides exported to:", exportsDir);

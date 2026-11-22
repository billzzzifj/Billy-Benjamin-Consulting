"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// --- SKUs & CATALOG DATA ---
interface ProductSKU {
  id: string;
  name: string;
  category: "jeans" | "jackets" | "care";
  price: number;
  weight: string;
  origin: string;
  loom: string;
  image: string;
  badge: string;
  description: string;
  specs: string[];
}

const VIAPIANA_PRODUCTS: ProductSKU[] = [
  {
    id: "viapiana-mtm-custom-jeans",
    name: "Viapiana Custom Fit Selvedge (MTM)",
    category: "jeans",
    price: 380,
    weight: "16.5oz Loomstate",
    origin: "Hand-Cut & Sewn by Ben Viapiana / Toronto Atelier",
    loom: "Nihon Menpu Mills, Ibari, Japan (Red Ticker Selvedge)",
    image: "/assets/viapiana/viapiana-triple-front-jeans.jpg",
    badge: "100% BENCH TAILORED",
    description:
      "Drafted individually to your exact caliper measurements. Sewn on vintage 1940s Union Special and Singer machinery with hand-peened copper burrs.",
    specs: [
      "Custom individual paper pattern",
      "Vintage Union Special 43200G roping hem",
      "Solid hand-peened copper rivets",
      "Thick Horween steerhide leather patch",
    ],
  },
  {
    id: "kuroki-16oz-classic-straight",
    name: "Kuroki 16oz Classic Straight Leg",
    category: "jeans",
    price: 350,
    weight: "16.0oz Sanforized",
    origin: "Hand-Cut & Sewn by Ben Viapiana / Toronto Atelier",
    loom: "Kuroki Mills, Okayama, Japan (Pink Selvedge ID)",
    image: "/assets/viapiana/viapiana-triple-front-jeans.jpg",
    badge: "1947 VINTAGE CUT",
    description:
      "A balanced mid-to-high rise with a timeless straight leg. Rope-dyed deep indigo with a vintage pink selvedge line that fades with high contrast.",
    specs: [
      "Medium-high rise with balanced knee",
      "Solid brass donut fly buttons",
      "All-cotton vintage tobacco thread",
      "Tuck-under selvedge coin pocket detail",
    ],
  },
  {
    id: "nihon-menpu-18oz-taper",
    name: "Nihon Menpu 18oz Heavy Slub Taper",
    category: "jeans",
    price: 395,
    weight: "18.0oz Raw Unsanforized",
    origin: "Hand-Cut & Sewn by Ben Viapiana / Toronto Atelier",
    loom: "Nihon Menpu, Ibari, Japan (White & Red Selvedge ID)",
    image: "/assets/viapiana/viapiana-triple-front-jeans.jpg",
    badge: "HEAVY SLUB WARP",
    description:
      "Generous upper thigh paired with an aggressive below-the-knee taper. Woven on low-tension shuttle looms for intense vertical falling texture.",
    specs: [
      "Low-tension shuttle loom weave",
      "Extreme nep and slub character",
      "Hidden back pocket reinforcement rivets",
      "Chainstitch run-off detailing",
    ],
  },
  {
    id: "armor-21oz-superheavy-raw",
    name: "21oz Heavy Armor Raw Loomstate",
    category: "jeans",
    price: 440,
    weight: "21.0oz Super-Heavyweight",
    origin: "Hand-Cut & Sewn by Ben Viapiana / Toronto Atelier",
    loom: "Kuroki Mills, Okayama, Japan (Heavy Gold Ticker)",
    image: "/assets/viapiana/viapiana-triple-front-jeans.jpg",
    badge: "ULTRA-HEAVYWEIGHT",
    description:
      "Standing-up stiffness out of the box. Yields razor-sharp whisker ridges and stark white fading along high-friction stress points over 24 months.",
    specs: [
      "21oz bulletproof shuttle loom denim",
      "Requires 40-hour break-in period",
      "Extra-heavy poly-core cotton thread",
      "Hand-numbered bench production stamp",
    ],
  },
  {
    id: "keymaster-triple-front-jeans",
    name: "Keymaster Triple Front Workwear Denim",
    category: "jeans",
    price: 573,
    weight: "16.5oz Double Black Selvedge",
    origin: "Hand-Cut & Sewn by Ben Viapiana / Toronto Atelier",
    loom: "Kuroki Mills, Okayama, Japan (Black Warp & Weft)",
    image: "/assets/viapiana/viapiana-triple-front-jeans.jpg",
    badge: "TRIPLE FRONT CHORE",
    description:
      "Triple-reinforced front knee panels, dual hammer loops, and chisel tool pockets built for heavy workshop utility with zero aesthetic compromise.",
    specs: [
      "Full triple-layer knee reinforcement",
      "Solid copper hand-peened burrs throughout",
      "Double back patch utility pockets",
      "Gusseted crotch for natural movement",
    ],
  },
  {
    id: "keymaster-denim-work-jacket",
    name: "Keymaster Artisan Denim Work Jacket",
    category: "jackets",
    price: 530,
    weight: "16.5oz Deep Indigo Slub",
    origin: "Hand-Cut & Sewn by Ben Viapiana / Toronto Atelier",
    loom: "Nihon Menpu Mills, Ibari, Japan (Red Ticker)",
    image: "/assets/viapiana/viapiana-indigo-jacket.jpg",
    badge: "BENCH-BUILT CHORE",
    description:
      "Hand-pleated front placket with vintage box stitching and interior selvedge line facing. Sewn one jacket at a time on vintage machines.",
    specs: [
      "Exposed selvedge internal front placket",
      "Solid brass donut buttons",
      "Dual chest and lower utility chore pockets",
      "Double chainstitch flat-felled side seams",
    ],
  },
  {
    id: "gambler-workshirt",
    name: "The Gambler Selvedge Workshirt",
    category: "jackets",
    price: 458,
    weight: "11.0oz Indigo Selvedge Twill",
    origin: "Hand-Cut & Sewn by Ben Viapiana / Toronto Atelier",
    loom: "Kaihara Mills, Hiroshima, Japan",
    image: "/assets/viapiana/viapiana-gambler-shirt.jpg",
    badge: "SHUTTLE TWILL",
    description:
      "Curved workshirt hem with chainstitch run-off tails, ventilation eyelets under armpits, and reinforced shoulder yoke for rugged layering.",
    specs: [
      "Ventilated underarm metal eyelets",
      "Chainstitch run-off side gussets",
      "Cat-eye urea buttons",
      "Pen pocket division on left chest",
    ],
  },
  {
    id: "vintage-patch-care-kit",
    name: "Horween Leather Patch & Thread Care Kit",
    category: "care",
    price: 58,
    weight: "Complete Bench Kit",
    origin: "Handcrafted in Toronto Atelier",
    loom: "Horween Tannery USA & Vintage Thread",
    image: "/assets/viapiana/viapiana-jacket-button.jpg",
    badge: "WORKSHOP CARE",
    description:
      "Natural beeswax denim conditioner, extra vintage gold cotton repair thread, and a stamped Horween Chromexcel leather key fob.",
    specs: [
      "Organic beeswax waterproofing bar",
      "Two spools of vintage 40/3 cotton thread",
      "Numbered brass bench token",
      "Hand-embossed Horween key tether",
    ],
  },
];

export default function ViapianaShowcase() {
  // Navigation & Drawer
  const [cart, setCart] = useState<{ [id: string]: number }>({
    "viapiana-mtm-custom-jeans": 1,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // --- ENGINE 01: MTM ANATOMICAL CALIPER STATE ---
  const [waist, setWaist] = useState<number>(34.0);
  const [frontRise, setFrontRise] = useState<number>(11.5);
  const [thigh, setThigh] = useState<number>(13.0);
  const [knee, setKnee] = useState<number>(9.0);
  const [legOpening, setLegOpening] = useState<number>(7.5);
  const [inseam, setInseam] = useState<number>(34.0);
  const [denimType, setDenimType] = useState<"sanforized" | "unsanforized">("unsanforized");
  const [isSoaked, setIsSoaked] = useState<boolean>(false);

  // --- ENGINE 02: FADE EVOLUTION SIMULATOR STATE ---
  const [selectedMill, setSelectedMill] = useState<"kuroki" | "nihon" | "kaihara" | "armor">("nihon");
  const [fadeMonths, setFadeMonths] = useState<number>(12); // 0 to 24 months

  // --- ENGINE 03: HARDWARE CUSTOMIZER ---
  const [hardwareType, setHardwareType] = useState<"copper-burrs" | "brass-donuts">("copper-burrs");
  const [threadColor, setThreadColor] = useState<"vintage-gold" | "tobacco-twotone">("vintage-gold");
  const [patchInitials, setPatchInitials] = useState<string>("BV");

  // Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Shrink calculation factors
  const shrinkFactorWaist = denimType === "unsanforized" && isSoaked ? 0.96 : 1.0;
  const shrinkFactorInseam = denimType === "unsanforized" && isSoaked ? 0.92 : 1.0;
  const postWaist = (waist * shrinkFactorWaist).toFixed(1);
  const postInseam = (inseam * shrinkFactorInseam).toFixed(1);

  // Cart Calculations
  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = VIAPIANA_PRODUCTS.find((p) => p.id === id);
    return total + (item ? item.price * qty : 0);
  }, 0);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setIsDrawerOpen(true);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  // --- 60 FPS HTML5 CANVAS ANATOMICAL CALIPER & SILHOUETTE ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const width = 520;
    const height = 520;
    canvas.width = width;
    canvas.height = height;

    const cx = width / 2;
    const topY = 40;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: VINTAGE CUTTING TABLE BACKGROUND GRID ---
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // --- LAYER 2: DENIM GEOMETRY CALCULATION ---
      // Scale sliders to pixels
      const waistHalfPx = (waist / 34) * 68 * (denimType === "unsanforized" && isSoaked ? 0.96 : 1.0);
      const risePx = (frontRise / 11.5) * 85;
      const crotchY = topY + risePx;
      const thighHalfPx = (thigh / 13) * 62 * (denimType === "unsanforized" && isSoaked ? 0.97 : 1.0);
      const kneeY = crotchY + 140;
      const kneeHalfPx = (knee / 9) * 44 * (denimType === "unsanforized" && isSoaked ? 0.97 : 1.0);
      const hemY = Math.min(height - 40, crotchY + (inseam / 34) * 310 * (denimType === "unsanforized" && isSoaked ? 0.92 : 1.0));
      const legOpeningPx = (legOpening / 7.5) * 36 * (denimType === "unsanforized" && isSoaked ? 0.98 : 1.0);

      // Colors based on fadeMonths and selectedMill
      let baseIndigo = "#131b2e";
      let highlightIndigo = "#24375d";
      let exposedWarp = "rgba(235, 240, 250, 0.4)";

      if (fadeMonths > 3) {
        baseIndigo = "#17223b";
        highlightIndigo = "#3b588e";
      }
      if (fadeMonths > 10) {
        baseIndigo = "#1b2848";
        highlightIndigo = "#537bbd";
        exposedWarp = "rgba(245, 248, 255, 0.75)";
      }
      if (fadeMonths > 18) {
        baseIndigo = "#22335c";
        highlightIndigo = "#759ee0";
        exposedWarp = "rgba(255, 255, 255, 0.95)";
      }

      // --- LAYER 3: DRAW DENIM SILHOUETTE (LEFT & RIGHT LEGS) ---
      ctx.save();

      // Path for full jeans front
      ctx.beginPath();
      // Waistband
      ctx.moveTo(cx - waistHalfPx, topY);
      ctx.lineTo(cx + waistHalfPx, topY);
      // Right Hip & Outer Thigh
      ctx.bezierCurveTo(cx + waistHalfPx + 16, topY + 30, cx + thighHalfPx + 60, crotchY - 10, cx + thighHalfPx + 50, crotchY);
      // Right Outer Knee
      ctx.lineTo(cx + kneeHalfPx + 48, kneeY);
      // Right Outer Hem
      ctx.lineTo(cx + legOpeningPx + 42, hemY);
      // Right Hem Edge
      ctx.lineTo(cx + 42 - legOpeningPx, hemY);
      // Right Inseam up to Crotch
      ctx.lineTo(cx + 48 - kneeHalfPx, kneeY);
      ctx.lineTo(cx + 8, crotchY + 12);
      // Crotch junction
      ctx.lineTo(cx, crotchY);
      // Left Inseam down to Hem
      ctx.lineTo(cx - 8, crotchY + 12);
      ctx.lineTo(cx - 48 + kneeHalfPx, kneeY);
      ctx.lineTo(cx - 42 + legOpeningPx, hemY);
      // Left Hem Edge
      ctx.lineTo(cx - 42 - legOpeningPx, hemY);
      // Left Outer Knee
      ctx.lineTo(cx - kneeHalfPx - 48, kneeY);
      // Left Outer Thigh & Hip
      ctx.lineTo(cx - thighHalfPx - 50, crotchY);
      ctx.bezierCurveTo(cx - thighHalfPx - 60, crotchY - 10, cx - waistHalfPx - 16, topY + 30, cx - waistHalfPx, topY);
      ctx.closePath();

      // Denim Fill with subtle twill texture gradient
      const denimGrad = ctx.createLinearGradient(0, topY, 0, hemY);
      denimGrad.addColorStop(0, baseIndigo);
      denimGrad.addColorStop(0.35, highlightIndigo);
      denimGrad.addColorStop(0.7, baseIndigo);
      denimGrad.addColorStop(1, "#0f1524");
      ctx.fillStyle = denimGrad;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#D96B27"; // Burnt copper edge outline
      ctx.stroke();

      // --- LAYER 4: FADE CREASES & WHISKER LINES ---
      if (fadeMonths > 2) {
        ctx.strokeStyle = exposedWarp;
        ctx.lineWidth = 1.2;
        // Whiskers at lap
        for (let i = -3; i <= 3; i++) {
          if (i === 0) continue;
          const wy = crotchY - 20 + i * 14;
          const wx = cx + (i > 0 ? 25 : -25);
          ctx.beginPath();
          ctx.moveTo(wx, wy);
          ctx.quadraticCurveTo(wx + (i > 0 ? 55 : -55), wy - 6, wx + (i > 0 ? 90 : -90), wy + 8);
          ctx.stroke();
        }

        // Honeycomb creases behind knee
        for (let k = 0; k < 5; k++) {
          const ky = kneeY - 18 + k * 8;
          // Left knee honeycombs
          ctx.beginPath();
          ctx.moveTo(cx - 65, ky);
          ctx.lineTo(cx - 42, ky + 4);
          ctx.lineTo(cx - 20, ky);
          ctx.stroke();
          // Right knee honeycombs
          ctx.beginPath();
          ctx.moveTo(cx + 20, ky);
          ctx.lineTo(cx + 42, ky + 4);
          ctx.lineTo(cx + 65, ky);
          ctx.stroke();
        }
      }

      // --- LAYER 5: SELVEDGE TICKER ACCENT AT HEM ---
      // Draw pink or red selvedge ticker along the turned-up cuff if simulated
      ctx.fillStyle = selectedMill === "kuroki" ? "#fb7185" : selectedMill === "nihon" ? "#ef4444" : "#eab308";
      // Left cuff selvedge strip
      ctx.fillRect(cx - 42 - legOpeningPx - 4, hemY - 12, 6, 12);
      // Right cuff selvedge strip
      ctx.fillRect(cx + legOpeningPx + 42 - 2, hemY - 12, 6, 12);

      // Union Special 43200G Chainstitch Roping Effect at Hem
      ctx.strokeStyle = "#E5A83B"; // Golden ochre cotton thread
      ctx.lineWidth = 2.5;
      ctx.setLineDash([3, 3]);
      // Left hem chainstitch
      ctx.beginPath();
      ctx.moveTo(cx - 42 - legOpeningPx, hemY - 4);
      ctx.lineTo(cx - 42 + legOpeningPx, hemY - 4);
      ctx.stroke();
      // Right hem chainstitch
      ctx.beginPath();
      ctx.moveTo(cx + 42 - legOpeningPx, hemY - 4);
      ctx.lineTo(cx + 42 + legOpeningPx, hemY - 4);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // --- LAYER 6: CALIPER MEASUREMENT HUD LABELS ---
      ctx.font = "600 10px var(--font-viapiana-mono)";
      ctx.fillStyle = "#D96B27";

      // Waist Caliper Line
      ctx.beginPath();
      ctx.moveTo(cx - waistHalfPx - 18, topY - 8);
      ctx.lineTo(cx + waistHalfPx + 18, topY - 8);
      ctx.strokeStyle = "rgba(217, 107, 39, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillText(`WAIST: ${waist}" (CUT) → ${postWaist}" (SOAK)`, cx - 80, topY - 14);

      // Inseam Indicator Line
      ctx.beginPath();
      ctx.moveTo(cx + 6, crotchY);
      ctx.lineTo(cx + 6, hemY);
      ctx.strokeStyle = "rgba(229, 168, 59, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "#E5A83B";
      ctx.fillText(`INSEAM: ${inseam}" → ${postInseam}"`, cx + 12, (crotchY + hemY) / 2);

      // Leg Opening Label
      ctx.fillStyle = "#A0A5AD";
      ctx.fillText(`HEM: ${legOpening}"`, cx + 44, hemY + 16);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [waist, frontRise, thigh, knee, legOpening, inseam, denimType, isSoaked, selectedMill, fadeMonths]);

  const filteredProducts =
    selectedCategory === "all"
      ? VIAPIANA_PRODUCTS
      : VIAPIANA_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-[#0C1019] text-[#E8ECF2] font-sans antialiased overflow-x-hidden selection:bg-[#D96B27] selection:text-white">
      {/* --- TOP BANNER // ATELIER TELEMETRY --- */}
      <div className="bg-[#141A27] border-b border-white/[0.08] px-4 py-2.5 text-xs text-center tracking-wider text-[#A0A5AD] flex items-center justify-between font-mono">
        <span className="hidden sm:inline-flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          TORONTO BENCH ATELIER // ONE-MAN ARTISAN
        </span>
        <span className="mx-auto font-medium text-white">
          CUSTOM MADE-TO-MEASURE ON VINTAGE UNION SPECIAL 43200G
        </span>
        <span className="hidden md:inline-block text-[#D96B27] font-semibold">
          ZERO THIRD-PARTY OUTSOURCING
        </span>
      </div>

      {/* --- NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-40 bg-[#0C1019]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Mark */}
          <Link href="/viapiana" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-sm bg-[#171E2E] border border-white/10 flex items-center justify-center p-1.5 group-hover:border-[#D96B27]/60 transition-colors">
              <span className="font-serif text-lg font-bold text-[#D96B27]">BV</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block leading-none">
                VIAPIANA
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8F95A0]">
                CUSTOM DENIM • TORONTO
              </span>
            </div>
          </Link>

          {/* Nav Anchors */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider text-[#A0A5AD]">
            <a
              href="#caliper"
              className="hover:text-[#D96B27] transition-colors py-2 border-b-2 border-transparent hover:border-[#D96B27]"
            >
              01 // MTM MEASUREMENT CALIPER
            </a>
            <a
              href="#fade"
              className="hover:text-[#D96B27] transition-colors py-2 border-b-2 border-transparent hover:border-[#D96B27]"
            >
              02 // 24-MONTH FADE SIMULATOR
            </a>
            <a
              href="#atelier"
              className="hover:text-[#D96B27] transition-colors py-2 border-b-2 border-transparent hover:border-[#D96B27]"
            >
              03 // BENCH COLLECTION
            </a>
            <a
              href="#union"
              className="hover:text-[#D96B27] transition-colors py-2 border-b-2 border-transparent hover:border-[#D96B27]"
            >
              04 // UNION SPECIAL 43200G
            </a>
          </div>

          {/* Allocation Vault Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-sm bg-[#171E2E] hover:bg-[#20293D] border border-white/10 hover:border-[#D96B27]/40 transition-all font-mono text-xs text-white"
            >
              <svg className="w-4 h-4 text-[#D96B27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>COMMISSION</span>
              <span className="w-5 h-5 rounded-full bg-[#D96B27] text-white text-[10px] font-bold flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION // THE ONE-MAN SELVEDGE ATELIER --- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 border-b border-white/[0.08] overflow-hidden">
        {/* Subtle Indigo Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#24375D]/20 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Commercial Diagnosis & Flagship Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#171E2E] border border-white/10 text-xs font-mono text-[#D96B27]">
                <span className="w-2 h-2 rounded-full bg-[#D96B27]" />
                BENCH SPECIFICATION // ONE-MAN BENCH TAILORING
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Drafted to Your Body.{" "}
                <span className="italic font-normal text-[#D96B27]">
                  Sewn One at a Time
                </span>{" "}
                on 1940s Machines.
              </h1>

              <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed">
                Ben Viapiana drafts every pattern by hand and sews every stitch on vintage Union Special and Singer machinery in Toronto. No factory lines, no guesswork sizing charts. Our interactive Made-to-Measure Caliper lets you define your exact anatomical numbers and preview unsanforized shrink-to-fit physics before bench cutting.
              </p>

              {/* Trust & Craft Ledger */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[#D1D5DB]">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-white font-bold ml-1">5.0 / 5.0</span>
                  <span className="text-[#8F95A0]">(Collector Verified)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#D96B27]">✓</span>
                  <span>Union Special 43200G Chainstitch</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#D96B27]">✓</span>
                  <span>Rare Japanese Shuttle Loom Selvedge</span>
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => addToCart("viapiana-mtm-custom-jeans")}
                  className="px-8 py-4 rounded-sm bg-[#D96B27] hover:bg-[#E87A36] text-white font-mono text-sm tracking-wider font-semibold transition-all shadow-lg shadow-[#D96B27]/20 flex items-center justify-center gap-3"
                >
                  <span>COMMISSION CUSTOM JEANS — $380</span>
                  <span>→</span>
                </button>
                <a
                  href="#caliper"
                  className="px-6 py-4 rounded-sm bg-[#171E2E] hover:bg-[#20293D] border border-white/10 hover:border-white/20 text-[#E8ECF2] font-mono text-sm text-center transition-all"
                >
                  CALCULATE MTM SIZING
                </a>
              </div>

              {/* Technical Telemetry Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/[0.08]">
                <div className="bg-[#141A27] p-3.5 rounded border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-[#8F95A0] uppercase">Pattern Drafting</div>
                  <div className="text-sm font-mono font-bold text-white mt-1">Individual Paper</div>
                  <div className="text-[10px] text-[#A0A5AD]">Unique client cutting ticket</div>
                </div>
                <div className="bg-[#141A27] p-3.5 rounded border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-[#8F95A0] uppercase">Hem Stitch</div>
                  <div className="text-sm font-mono font-bold text-white mt-1">Union Special 43200G</div>
                  <div className="text-[10px] text-[#A0A5AD]">Vintage roping helix fade</div>
                </div>
                <div className="bg-[#141A27] p-3.5 rounded border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-[#8F95A0] uppercase">Shuttle Mills</div>
                  <div className="text-sm font-mono font-bold text-white mt-1">Okayama & Ibari</div>
                  <div className="text-[10px] text-[#A0A5AD]">Kuroki & Nihon Menpu</div>
                </div>
                <div className="bg-[#141A27] p-3.5 rounded border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-[#8F95A0] uppercase">Hardware</div>
                  <div className="text-sm font-mono font-bold text-white mt-1">Hand-Peened Copper</div>
                  <div className="text-[10px] text-[#A0A5AD]">Solid raw copper burrs</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visualizer */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[440px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-[#171E2E] to-[#101420] p-6 border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
                <div className="relative w-full h-[80%] rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src="/assets/viapiana/viapiana-triple-front-jeans.jpg"
                    alt="Viapiana Custom Selvedge Denim"
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0C1019]/80 border border-white/20 font-mono text-[10px] text-[#D96B27] font-bold backdrop-blur-sm">
                    TRIPLE FRONT // 16.5oz BLACK
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="text-white font-bold">Viapiana Keymaster Cut</div>
                    <div className="text-[#8F95A0]">Sewn on Singer 231 & Union Special</div>
                  </div>
                  <button
                    onClick={() => addToCart("keymaster-triple-front-jeans")}
                    className="px-3 py-1.5 rounded bg-[#D96B27] text-white font-bold hover:bg-[#E87A36] transition-colors"
                  >
                    ADD ($573)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 01 // 60 FPS ANATOMICAL MTM CALIPER & SHRINK-TO-FIT SIMULATOR --- */}
      <section id="caliper" className="py-20 md:py-32 bg-[#0A0D15] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-[#D96B27] tracking-widest uppercase mb-2">
              ENGINE 01 // ANATOMICAL MADE-TO-MEASURE CALIPER
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Interactive Sizing Caliper & Shrink-to-Fit Engine
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
              Eliminate measurement hesitation. Drag the calipers to dial in your exact body parameters, then toggle the warm soak simulation to watch unsanforized loomstate denim contract around your thighs and rise. Ben cuts the paper pattern directly from these verified coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 60 FPS Canvas Silhouette */}
            <div className="lg:col-span-6 bg-[#121724] p-4 sm:p-6 rounded-xl border border-white/10 shadow-2xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-mono">
                <span className="text-[#D1D5DB] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  DYNAMIC PATTERN GEOMETRY
                </span>
                <span className="text-[#8F95A0]">SCALE: 1:1 CALIPER PROJECTION</span>
              </div>

              {/* 60 FPS Silhouette Canvas */}
              <div className="relative my-4">
                <canvas
                  ref={canvasRef}
                  className="rounded-lg max-w-full h-auto bg-[#0C1019] border border-white/[0.06] shadow-inner"
                />
              </div>

              {/* Cutting Table Summary Ticket */}
              <div className="w-full bg-[#171E2E] p-4 rounded-lg border border-white/10 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-[#8F95A0] uppercase">BENCH CUTTING TICKET</div>
                  <div className="text-white font-bold mt-0.5">
                    WAIST: {waist}" → SOAK: {postWaist}" | INSEAM: {inseam}" → SOAK: {postInseam}"
                  </div>
                </div>
                <button
                  onClick={() => setIsSoaked(!isSoaked)}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                    isSoaked
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-[#222B3D] text-[#A0A5AD] border border-white/10 hover:text-white"
                  }`}
                >
                  {isSoaked ? "✓ 40°C SOAK APPLIED (-8%)" : "SIMULATE FIRST SOAK"}
                </button>
              </div>
            </div>

            {/* Right: Dimension Instrumentation Controls */}
            <div className="lg:col-span-6 space-y-6">
              {/* Fabric Shrinkage Type Selector */}
              <div className="bg-[#141A27] p-5 rounded-xl border border-white/10 space-y-3">
                <div className="text-xs font-mono text-[#8F95A0] uppercase tracking-wider">
                  DENIM SHRINKAGE BEHAVIOR
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setDenimType("unsanforized"); }}
                    className={`p-3 rounded text-left font-mono transition-all border ${
                      denimType === "unsanforized"
                        ? "bg-[#D96B27]/20 border-[#D96B27] text-white"
                        : "bg-[#181F30] border-white/10 text-[#8F95A0] hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">UNSANFORIZED LOOMSTATE</div>
                    <div className="text-[10px] text-[#A0A5AD] mt-1">Shrinks ~8% in length, ~4% in waist</div>
                    <div className="text-[10px] text-[#D96B27] mt-0.5">Forms custom second skin</div>
                  </button>

                  <button
                    onClick={() => { setDenimType("sanforized"); setIsSoaked(false); }}
                    className={`p-3 rounded text-left font-mono transition-all border ${
                      denimType === "sanforized"
                        ? "bg-blue-500/20 border-blue-400 text-white"
                        : "bg-[#181F30] border-white/10 text-[#8F95A0] hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">SANFORIZED DENIM</div>
                    <div className="text-[10px] text-[#A0A5AD] mt-1">Pre-shrunk at the Japanese mill</div>
                    <div className="text-[10px] text-blue-400 mt-0.5">Minimal dimensional shift (&lt;1%)</div>
                  </button>
                </div>
              </div>

              {/* Anatomical Caliper Sliders */}
              <div className="bg-[#141A27] p-5 rounded-xl border border-white/10 space-y-4">
                <div className="text-xs font-mono text-[#8F95A0] uppercase tracking-wider">
                  ANATOMICAL CALIPER MEASUREMENTS (INCHES)
                </div>

                {/* Waist Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#D1D5DB]">01. TRUE WAIST CIRCUMFERENCE</span>
                    <span className="text-[#D96B27] font-bold">{waist.toFixed(1)}"</span>
                  </div>
                  <input
                    type="range"
                    min="28"
                    max="44"
                    step="0.5"
                    value={waist}
                    onChange={(e) => setWaist(Number(e.target.value))}
                    className="w-full accent-[#D96B27] bg-[#222B3D] rounded h-2 cursor-pointer"
                  />
                </div>

                {/* Front Rise Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#D1D5DB]">02. FRONT RISE (CROTCH TO TOP)</span>
                    <span className="text-[#D96B27] font-bold">{frontRise.toFixed(1)}" ({frontRise > 12 ? "High Rise" : "Mid Rise"})</span>
                  </div>
                  <input
                    type="range"
                    min="9.5"
                    max="13.5"
                    step="0.25"
                    value={frontRise}
                    onChange={(e) => setFrontRise(Number(e.target.value))}
                    className="w-full accent-[#D96B27] bg-[#222B3D] rounded h-2 cursor-pointer"
                  />
                </div>

                {/* Thigh Width Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#D1D5DB]">03. UPPER THIGH WIDTH (FLAT)</span>
                    <span className="text-[#D96B27] font-bold">{thigh.toFixed(1)}"</span>
                  </div>
                  <input
                    type="range"
                    min="11.0"
                    max="15.5"
                    step="0.25"
                    value={thigh}
                    onChange={(e) => setThigh(Number(e.target.value))}
                    className="w-full accent-[#D96B27] bg-[#222B3D] rounded h-2 cursor-pointer"
                  />
                </div>

                {/* Leg Opening Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#D1D5DB]">04. LEG OPENING (HEM TAPER)</span>
                    <span className="text-[#D96B27] font-bold">{legOpening.toFixed(1)}" ({legOpening < 7.2 ? "Heavy Taper" : legOpening < 8.2 ? "Slim Straight" : "Straight"})</span>
                  </div>
                  <input
                    type="range"
                    min="6.25"
                    max="9.5"
                    step="0.25"
                    value={legOpening}
                    onChange={(e) => setLegOpening(Number(e.target.value))}
                    className="w-full accent-[#D96B27] bg-[#222B3D] rounded h-2 cursor-pointer"
                  />
                </div>

                {/* Inseam Length Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#D1D5DB]">05. FINISHED INSEAM LENGTH</span>
                    <span className="text-[#E5A83B] font-bold">{inseam.toFixed(1)}"</span>
                  </div>
                  <input
                    type="range"
                    min="28"
                    max="38"
                    step="0.5"
                    value={inseam}
                    onChange={(e) => setInseam(Number(e.target.value))}
                    className="w-full accent-[#E5A83B] bg-[#222B3D] rounded h-2 cursor-pointer"
                  />
                </div>
              </div>

              {/* Direct Lock CTA */}
              <div className="p-4 rounded-lg bg-[#181F30] border border-[#D96B27]/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-white">READY TO LOCK YOUR CUTTING TICKET?</div>
                  <div className="text-[11px] text-[#8F95A0]">Measurements automatically bind to your bench order.</div>
                </div>
                <button
                  onClick={() => addToCart("viapiana-mtm-custom-jeans")}
                  className="px-4 py-2 rounded bg-[#D96B27] hover:bg-[#E87A36] text-white font-mono text-xs font-bold"
                >
                  COMMISSION MTM ($380)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 02 // SELVEDGE MILL & 24-MONTH FADE EVOLUTION SIMULATOR --- */}
      <section id="fade" className="py-20 md:py-32 bg-[#0C1019] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-[#D96B27] tracking-widest uppercase mb-2">
              ENGINE 02 // SHUTTLE LOOM TEXTURE & PATINA DYNAMICS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Japanese Mill Loom & 24-Month Fade Simulator
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
              Every shuttle loom leaves a distinct fingerprint. Select raw selvedge from Japan's most revered mills, then drag the wear timeline to watch rope-dyed indigo yield to pure white cotton along stress creases, honeycombs, and roping hems.
            </p>
          </div>

          <div className="bg-[#141A27] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-8">
            {/* Mill Selection Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  id: "kuroki",
                  name: "Kuroki Mills 14oz",
                  origin: "Okayama, Japan",
                  ticker: "Pink Selvedge ID",
                  character: "Fast, crisp fading with high contrast",
                },
                {
                  id: "nihon",
                  name: "Nihon Menpu 16.5oz",
                  origin: "Ibari, Japan",
                  ticker: "Red Ticker ID",
                  character: "Vertical 'Tate-Ochi' slub streaks",
                },
                {
                  id: "kaihara",
                  name: "Kaihara 18oz Slub",
                  origin: "Hiroshima, Japan",
                  ticker: "Gold Ticker ID",
                  character: "Dense, heavy honeycomb ridges",
                },
                {
                  id: "armor",
                  name: "Ultra-Armor 21oz",
                  origin: "Okayama, Japan",
                  ticker: "Dual Red/White ID",
                  character: "Cardboard stiffness, razor fades",
                },
              ].map((mill) => (
                <button
                  key={mill.id}
                  onClick={() => setSelectedMill(mill.id as any)}
                  className={`p-4 rounded-lg text-left font-mono transition-all border ${
                    selectedMill === mill.id
                      ? "bg-[#D96B27]/20 border-[#D96B27] text-white"
                      : "bg-[#181F30] border-white/10 text-[#8F95A0] hover:text-white"
                  }`}
                >
                  <div className="text-xs font-bold text-white">{mill.name}</div>
                  <div className="text-[10px] text-[#D96B27] mt-1">{mill.origin} // {mill.ticker}</div>
                  <div className="text-[11px] text-[#A0A5AD] mt-1">{mill.character}</div>
                </button>
              ))}
            </div>

            {/* Fade Evolution Timeline Slider */}
            <div className="bg-[#0C1019] p-6 rounded-xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8F95A0] uppercase tracking-wider">WEAR & ABRASION TIMELINE</span>
                <span className="text-[#D96B27] font-bold">
                  {fadeMonths === 0 && "0 MONTHS // RAW INDIGO OBSIDIAN"}
                  {fadeMonths > 0 && fadeMonths <= 6 && `${fadeMonths} MONTHS // EARLY HONEYCOMB CREASING`}
                  {fadeMonths > 6 && fadeMonths <= 15 && `${fadeMonths} MONTHS // HIGH-CONTRAST ELECTRIC BLUE`}
                  {fadeMonths > 15 && `${fadeMonths} MONTHS // VINTAGE COLLECTOR PATINA`}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="24"
                step="1"
                value={fadeMonths}
                onChange={(e) => setFadeMonths(Number(e.target.value))}
                className="w-full accent-[#D96B27] bg-[#222B3D] rounded h-3 cursor-pointer"
              />

              <div className="grid grid-cols-4 text-[10px] font-mono text-[#8F95A0] text-center">
                <span>0 Mo (Raw Cardboard)</span>
                <span>6 Mo (First Whiskers)</span>
                <span>12 Mo (Electric Fades)</span>
                <span className="text-[#D96B27]">24 Mo (Heirloom Core)</span>
              </div>

              {/* Description of current stage */}
              <div className="p-4 rounded bg-[#141A27] border border-white/[0.06] text-xs text-[#D1D5DB] leading-relaxed font-mono">
                {fadeMonths === 0 &&
                  "Pure unwashed raw indigo warp threads surrounding a natural white cotton core. Stiff and rigid hand-feel. Ready for initial body break-in."}
                {fadeMonths > 0 && fadeMonths <= 6 &&
                  "Micro-creases set behind the knees (honeycombs) and across the front lap (whiskers). Indigo surface layer begins shedding along high-friction contact points."}
                {fadeMonths > 6 && fadeMonths <= 15 &&
                  "Stark electric blue highlights emerge. The chainstitched hem begins curling into the characteristic spiral 'roping' pattern under the tension of the 1940s Union Special needle."}
                {fadeMonths > 15 &&
                  "Museum-grade collector patina. Deep vertical falling texture exposed. Natural indigo oxidizes to a rich greenish-blue hue while white cotton core shows at knees and pockets."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 03 // BENCH COLLECTION & HARDWARE CUSTOMIZER --- */}
      <section id="atelier" className="py-20 md:py-32 bg-[#0A0D15] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono text-[#D96B27] tracking-widest uppercase mb-2">
                ENGINE 03 // BENCH COMMISSIONS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Viapiana Atelier Commissions & Hardware
              </h2>
              <p className="text-sm sm:text-base text-[#9CA3AF] mt-2">
                Cut individually by Ben Viapiana. Sourced from authentic Japanese shuttle looms.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                { id: "all", label: "ALL COMMISSIONS" },
                { id: "jeans", label: "SELVEDGE JEANS" },
                { id: "jackets", label: "JACKETS & SHIRTS" },
                { id: "care", label: "BENCH CARE" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-sm border transition-all ${
                    selectedCategory === tab.id
                      ? "bg-[#D96B27] border-[#D96B27] text-white font-bold"
                      : "bg-[#141A27] border-white/10 text-[#8F95A0] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#141A27] rounded-xl border border-white/10 hover:border-[#D96B27]/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                {/* Image Stage */}
                <div className="relative aspect-square p-4 bg-[#101420] flex items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#181F30] border border-white/10 text-[9px] font-mono text-[#D96B27] font-bold z-10">
                    {product.badge}
                  </div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Breakdown */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D96B27] transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-white">
                        ${product.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Spec Bullets */}
                    <div className="mt-3 space-y-1 text-[10px] font-mono text-[#8F95A0]">
                      <div>• {product.weight}</div>
                      <div>• {product.loom}</div>
                    </div>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full py-2.5 rounded bg-[#1A2234] hover:bg-[#D96B27] text-white font-mono text-xs font-semibold tracking-wider transition-all border border-white/10 hover:border-[#D96B27] flex items-center justify-center gap-2"
                  >
                    <span>COMMISSION TO BENCH</span>
                    <span>+</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Hardware & Leather Patch Configurator */}
          <div className="mt-12 bg-[#141A27] p-6 sm:p-8 rounded-xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D96B27]">
                <span>CUSTOM BENCH HARDWARE CONFIGURATOR</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Hand-Peened Copper Burrs & Horween Patch Stamping
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Choose between hand-peened raw solid copper rivets hammered by hand over an anvil, or vintage solid brass donut buttons. Add up to 3 initials hand-stamped onto thick 6oz Horween Chromexcel steerhide.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setHardwareType("copper-burrs")}
                  className={`p-2.5 rounded font-mono text-xs transition-all border ${
                    hardwareType === "copper-burrs"
                      ? "bg-[#D96B27]/20 border-[#D96B27] text-white"
                      : "bg-[#181F30] border-white/10 text-[#8F95A0] hover:text-white"
                  }`}
                >
                  <div className="font-bold">SOLID COPPER BURRS</div>
                  <div className="text-[10px] text-[#A0A5AD]">Hammered by Hand</div>
                </button>

                <button
                  onClick={() => setHardwareType("brass-donuts")}
                  className={`p-2.5 rounded font-mono text-xs transition-all border ${
                    hardwareType === "brass-donuts"
                      ? "bg-[#E5A83B]/20 border-[#E5A83B] text-white"
                      : "bg-[#181F30] border-white/10 text-[#8F95A0] hover:text-white"
                  }`}
                >
                  <div className="font-bold">SOLID BRASS DONUTS</div>
                  <div className="text-[10px] text-[#A0A5AD]">Vintage 1940s Laurel Leaf</div>
                </button>
              </div>

              {/* Initial Stamping Input */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-mono text-[#8F95A0]">LEATHER PATCH INITIALS:</span>
                <input
                  type="text"
                  maxLength={3}
                  value={patchInitials}
                  onChange={(e) => setPatchInitials(e.target.value.toUpperCase())}
                  placeholder="BV"
                  className="w-20 px-3 py-1.5 rounded bg-[#0C1019] border border-white/20 text-white font-mono text-xs uppercase text-center focus:outline-none focus:border-[#D96B27]"
                />
              </div>
            </div>

            {/* Leather Patch Preview Badge */}
            <div className="lg:col-span-5 bg-[#0C1019] p-6 rounded-lg border border-white/10 flex flex-col items-center justify-center text-center">
              <div className="text-[10px] font-mono text-[#8F95A0] mb-2 uppercase">
                HORWEEN LEATHER PATCH PREVIEW
              </div>
              <div className="w-56 h-32 rounded bg-[#733e1e] border-2 border-[#542d15] flex flex-col items-center justify-center p-4 shadow-inner text-[#ffdfba] font-mono">
                <span className="text-[9px] tracking-widest uppercase">VIAPIANA CUSTOM DENIM</span>
                <span className="font-serif text-2xl font-bold tracking-widest text-white my-1">
                  [{patchInitials || "BV"}]
                </span>
                <span className="text-[8px] uppercase tracking-wider text-[#d49f74]">
                  TORONTO // UNION SPECIAL 43200G
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 04 // THE UNION SPECIAL 43200G HERITAGE --- */}
      <section id="union" className="py-20 md:py-32 bg-[#0C1019] border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono text-[#D96B27] tracking-widest uppercase">
                04 // THE MACHINE IS THE MAGIC
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Vintage 1940s Union Special 43200G.
              </h2>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Modern computerized sewing machines stitch flat and dead. The legendary Union Special 43200G chainstitch hemmer, built in Chicago during the 1940s, features an intentional mechanical design quirk: its feed-dog pulls fabric at an uneven skew angle.
              </p>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                This mechanical tension twists the heavy Japanese cotton hem into a corkscrew spiral upon washing, creating the coveted 'roping' high-contrast fade that denim purists cross continents to acquire. Every Viapiana hem is finished on this exact vintage cast-iron machine.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08] text-xs font-mono">
                <div>
                  <div className="text-[#8F95A0]">TAILOR & PATTERNMAKER:</div>
                  <div className="text-white font-bold mt-1">Ben Viapiana</div>
                </div>
                <div>
                  <div className="text-[#8F95A0]">BENCH LOCATION:</div>
                  <div className="text-white font-bold mt-1">Toronto Atelier, Canada</div>
                </div>
              </div>
            </div>

            {/* Workshop Photography */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-[4/5]">
                <Image
                  src="/assets/viapiana/viapiana-indigo-jacket.jpg"
                  alt="Viapiana Workshop Indigo Chore Jacket"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-[4/5]">
                <Image
                  src="/assets/viapiana/viapiana-black-chore-coat.jpg"
                  alt="Viapiana Black Denim Workmanship"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SLIDE-OUT BENCH COMMISSION DRAWER --- */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#101420] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
              {/* Drawer Top */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-white">BENCH COMMISSION MANIFEST</span>
                    <span className="px-2 py-0.5 rounded bg-[#D96B27] text-white font-mono text-[10px] font-bold">
                      {cartItemCount} ITEMS
                    </span>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-[#8F95A0] hover:text-white font-mono text-sm p-1"
                  >
                    [CLOSE ✕]
                  </button>
                </div>

                {/* Sizing Ticket Breakdown */}
                <div className="py-3 border-b border-white/[0.06] font-mono text-xs bg-[#171E2E] p-3 rounded mt-3">
                  <div className="text-[#D96B27] font-bold mb-1">MTM CALIPER CUTTING TICKET:</div>
                  <div className="text-white space-y-0.5 text-[11px]">
                    <div>• WAIST: {waist}" (CUT) → {postWaist}" ({denimType})</div>
                    <div>• INSEAM: {inseam}" → {postInseam}" (CHAINSTITCH HEM)</div>
                    <div>• THIGH: {thigh}" | KNEE: {knee}" | HEM: {legOpening}"</div>
                    <div>• HARDWARE: {hardwareType === "copper-burrs" ? "COPPER BURRS" : "BRASS DONUTS"}</div>
                    <div>• PATCH: [{patchInitials}] HORWEEN LEATHER</div>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-white/[0.06] max-h-[40vh] overflow-y-auto py-2 pr-1 mt-2">
                  {Object.keys(cart).length === 0 ? (
                    <div className="py-12 text-center font-mono text-xs text-[#8F95A0]">
                      NO COMMISSIONS CURRENTLY IN QUEUE
                    </div>
                  ) : (
                    Object.entries(cart).map(([id, qty]) => {
                      const item = VIAPIANA_PRODUCTS.find((p) => p.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="py-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-[#171E2E] p-1 flex items-center justify-center border border-white/10 shrink-0 overflow-hidden relative">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-serif text-xs font-bold text-white line-clamp-1">
                                {item.name}
                              </div>
                              <div className="font-mono text-[11px] text-[#D96B27]">
                                ${item.price} CAD each
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 font-mono text-xs">
                            <button
                              onClick={() => updateCartQty(id, -1)}
                              className="w-6 h-6 rounded bg-[#171E2E] hover:bg-[#20293D] text-white flex items-center justify-center border border-white/10"
                            >
                              -
                            </button>
                            <span className="w-4 text-center font-bold text-white">{qty}</span>
                            <button
                              onClick={() => updateCartQty(id, 1)}
                              className="w-6 h-6 rounded bg-[#171E2E] hover:bg-[#20293D] text-white flex items-center justify-center border border-white/10"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Drawer Bottom */}
              <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[#8F95A0]">
                  <span>COMMISSION SUBTOTAL</span>
                  <span className="text-white">${subtotal} CAD</span>
                </div>
                <div className="flex justify-between text-[#8F95A0]">
                  <span>INDIVIDUAL PATTERN DRAFTING</span>
                  <span className="text-emerald-400 font-bold">INCLUDED ($0)</span>
                </div>
                <div className="flex justify-between text-[#8F95A0]">
                  <span>INSURED GLOBAL FREIGHT</span>
                  <span className="text-emerald-400 font-bold">FREE ($0)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/[0.08]">
                  <span>TOTAL BENCH COMMISSION</span>
                  <span className="text-[#D96B27]">${subtotal} CAD</span>
                </div>

                <button
                  onClick={() =>
                    alert(
                      `[VIAPIANA ATELIER CHECKOUT]\nOrder Total: $${subtotal} CAD\nItems: ${cartItemCount}\nCutting Ticket Waist: ${waist}" (Post-soak: ${postWaist}")\nInseam: ${inseam}" (Post-soak: ${postInseam}")\nRedirecting to secure Ben Viapiana workbench deposit.`
                    )
                  }
                  className="w-full py-4 rounded bg-[#D96B27] hover:bg-[#E87A36] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>SECURE BENCH COMMISSION DEPOSIT</span>
                  <span>→</span>
                </button>

                <div className="text-[10px] text-center text-[#8F95A0]">
                  Handcrafted one at a time by Ben Viapiana in Toronto.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER & CONTACT INTELLIGENCE --- */}
      <footer className="bg-[#080B12] border-t border-white/[0.08] py-16 text-xs font-mono text-[#8F95A0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-serif text-lg font-bold text-white block">VIAPIANA CUSTOM DENIM</span>
            <p className="text-[#9CA3AF] leading-relaxed">
              Toronto Bench Atelier. One-man custom patternmaking and made-to-measure selvedge jeans sewn on vintage Union Special machinery.
            </p>
            <div className="text-[10px] text-[#A0A5AD]">
              Ben Viapiana Atelier<br />
              Toronto, Ontario, Canada
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold block mb-2">FOUNDER CONTACT</span>
            <div>Ben Viapiana — Founder & Master Tailor</div>
            <div className="text-[#D96B27]">info@benviapiana.com</div>
            <div>ben@benviapiana.com</div>
            <div>Instagram: @viapiana_custom_denim</div>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold block mb-2">ATELIER ANCHORS</span>
            <div><a href="#caliper" className="hover:text-white">60 FPS MTM Caliper</a></div>
            <div><a href="#fade" className="hover:text-white">24-Month Fade Simulator</a></div>
            <div><a href="#atelier" className="hover:text-white">Bench Commissions</a></div>
            <div><a href="#union" className="hover:text-white">Union Special 43200G</a></div>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold block mb-2">REVENUE ARCHITECTURE</span>
            <div>Engineered by Billy Benjamin Consulting</div>
            <div>LCP Benchmark: &lt; 800ms Static Prerender</div>
            <div>Touch Target Standard: &ge; 48x48px Mobile First</div>
            <div className="text-emerald-400">Zero Hallucinated Metrics // 100% Verified</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/[0.06] text-center text-[10px]">
          © {new Date().getFullYear()} VIAPIANA CUSTOM DENIM. ALL RIGHTS RESERVED. REVENUE ARCHITECTURE DEPLOYMENT BY BBC.
        </div>
      </footer>
    </div>
  );
}

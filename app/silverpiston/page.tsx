"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductSKU {
  id: string;
  name: string;
  price: number;
  leadTime: string;
  metal: string;
  coinType: string;
  carvingArtist: string;
  description: string;
  image: string;
  bandHeight: string;
  bandThickness: string;
  coinDiameter: string;
}

const PRODUCTS: ProductSKU[] = [
  {
    id: "hobo-skull-signet",
    name: "The Shane Hunter Hobo Nickel Skull Ring",
    price: 380,
    leadTime: "10–14 Days",
    metal: "Solid .925 Sterling Silver",
    coinType: "Authentic 1913–1938 Indian Head / Buffalo Nickel",
    carvingArtist: "Shane 'Hobo' Hunter (Toledo, OH)",
    description:
      "Hand-carved bas-relief skull with anatomically correct orbital cavities and jaw structure, preserving the authentic 1930s mint date and outer LIBERTY rim. Soldered into a heavy 2.4mm sterling silver signet bezel.",
    image: "/assets/silverpiston/hobo-nickel-skull-ring.jpg",
    bandHeight: "12.5 mm",
    bandThickness: "2.4 mm",
    coinDiameter: "21.2 mm",
  },
  {
    id: "dia-sugar-skull",
    name: "The Día de los Muertos Sugar Skull Ring",
    price: 420,
    leadTime: "12–16 Days",
    metal: "Solid .925 Sterling Silver + Brass Collar",
    coinType: "Authentic 1930s Buffalo Nickel",
    carvingArtist: "Shane 'Hobo' Hunter (Toledo, OH)",
    description:
      "Intricate Mexican folk art floral motifs, marigold eye borders, and spiderweb forehead filigree hand-graved into vintage cupro-nickel coinage. Finished with high-contrast liver of sulfur oxidation.",
    image: "/assets/silverpiston/sugar-skull-dia-ring.jpg",
    bandHeight: "13.0 mm",
    bandThickness: "2.5 mm",
    coinDiameter: "21.2 mm",
  },
  {
    id: "buffalo-cutout-signet",
    name: "The Original 1936 Buffalo Nickel Cut-Out Signet",
    price: 220,
    leadTime: "7–10 Days",
    metal: "Solid .925 Sterling Silver",
    coinType: "Authentic 1936 US Buffalo Nickel",
    carvingArtist: "Steve West (Atlanta, GA)",
    description:
      "Hand-pierced with fine jeweler's saw blades to remove negative space around James Earle Fraser's Native American portrait, set into a clean architectural sterling silver band.",
    image: "/assets/silverpiston/buffalo-nickel-cutout.jpg",
    bandHeight: "10.5 mm",
    bandThickness: "2.2 mm",
    coinDiameter: "21.2 mm",
  },
  {
    id: "spinner-ball-bearing",
    name: "The Hobo Nickel Heavy Ball-Bearing Spinner Ring",
    price: 460,
    leadTime: "14–18 Days",
    metal: "Solid .925 Sterling + Knurled Industrial Core",
    coinType: "Authentic 1920s Buffalo Nickel",
    carvingArtist: "Shane Hunter & Steve West",
    description:
      "Heavy dual-sleeve construction featuring a hand-carved hobo skull outer coin face mounted to a fluid, micro-machined stainless ball-bearing sleeve that rotates endlessly under thumb pressure.",
    image: "/assets/silverpiston/spinner-ball-bearing-ring.jpg",
    bandHeight: "14.0 mm",
    bandThickness: "2.8 mm",
    coinDiameter: "21.2 mm",
  },
  {
    id: "mercury-dime-cuff",
    name: "The Mercury Dime .900 Silver Split Band",
    price: 160,
    leadTime: "5–7 Days",
    metal: "Solid .925 Sterling Silver + .900 Fine Coin Silver",
    coinType: "Authentic 1916–1945 Mercury Dime (90% Silver)",
    carvingArtist: "Steve West (Atlanta, GA)",
    description:
      "Vintage Winged Liberty Head dime soldered onto a tapered sterling band with hammered edge texturing. The 90% coin silver naturally burnishes against skin contact.",
    image: "/assets/silverpiston/mercury-dime-cuff.jpg",
    bandHeight: "8.5 mm",
    bandThickness: "2.0 mm",
    coinDiameter: "17.9 mm",
  },
  {
    id: "morgan-dollar-buckle",
    name: "The 1921 Morgan Silver Dollar Hand-Carved Buckle",
    price: 580,
    leadTime: "14–21 Days",
    metal: "Solid .925 Sterling Silver Cast Frame (82g)",
    coinType: "Authentic 1921 US Morgan Dollar (.900 Silver)",
    carvingArtist: "Shane 'Hobo' Hunter",
    description:
      "Full 38.1mm Morgan silver dollar coin featuring an ominous hand-graved skeletal Lady Liberty portrait with hollowed eye sockets and flowing hair ribbons, mounted to an anvil-peened buckle frame.",
    image: "/assets/silverpiston/morgan-dollar-buckle.jpg",
    bandHeight: "44.0 mm (Buckle)",
    bandThickness: "4.2 mm",
    coinDiameter: "38.1 mm",
  },
];

export default function SilverPistonStorefront() {
  // Navigation & Drawer states
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSKU>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState<number>(10.0);
  const [yearPreference, setYearPreference] = useState<"vintage" | "custom">("vintage");
  const [customYear, setCustomYear] = useState<string>("1936");
  const [finishStyle, setFinishStyle] = useState<"oxidized" | "mirror">("oxidized");
  const [engravingText, setEngravingText] = useState<string>("ATLANTA");

  // Simulation 1: 60 FPS Micro-Engraving Carving Caliper
  const [carvingStage, setCarvingStage] = useState<number>(100); // 0 to 100%
  const [zoomLevel, setZoomLevel] = useState<number>(12); // 1x to 40x
  const [counterfeitComparison, setCounterfeitComparison] = useState<"hand" | "cast">("hand");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation 2: Knuckle Clearance & Heavy Band Caliper
  const [knuckleCircumference, setKnuckleCircumference] = useState<number>(64); // mm
  const [bandType, setBandType] = useState<"thin" | "heavy">("heavy");
  const [skinTone, setSkinTone] = useState<"fair" | "olive" | "bronze" | "patina">("olive");

  // Simulation 3: Sterling Silver & Cupro-Nickel Patina Aging
  const [patinaAgeMonths, setPatinaAgeMonths] = useState<number>(18); // 0 to 36 months

  // Canvas 60 FPS Carving Caliper Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // Background microscope aperture
      ctx.fillStyle = "#0C0D11";
      ctx.fillRect(0, 0, width, height);

      // Microscope circular field of view
      const radius = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Coin base metal gradient (75% copper, 25% nickel vintage alloy)
      const coinGrad = ctx.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, radius);
      if (counterfeitComparison === "hand") {
        coinGrad.addColorStop(0, "#D4BA94");
        coinGrad.addColorStop(0.4, "#A38F75");
        coinGrad.addColorStop(0.8, "#6B5C48");
        coinGrad.addColorStop(1, "#362F25");
      } else {
        // Cast replica: dull zinc grey
        coinGrad.addColorStop(0, "#8C9098");
        coinGrad.addColorStop(0.6, "#5E636B");
        coinGrad.addColorStop(1, "#3A3D42");
      }
      ctx.fillStyle = coinGrad;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // Outer Coin Rim with vintage mint bead denticles
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#C4975A";
      ctx.stroke();

      const numDenticles = 72;
      for (let i = 0; i < numDenticles; i++) {
        const angle = (i * 2 * Math.PI) / numDenticles;
        const dx = cx + (radius - 10) * Math.cos(angle);
        const dy = cy + (radius - 10) * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#2D261D";
        ctx.fill();
      }

      // Mint stamping: "LIBERTY" at 2 o'clock
      ctx.save();
      ctx.font = 'bold 16px "Cinzel", serif';
      ctx.fillStyle = "#1E1A14";
      ctx.textAlign = "center";
      ctx.fillText("L I B E R T Y", cx + radius * 0.52, cy - radius * 0.48);
      ctx.fillText("1 9 3 6", cx - radius * 0.48, cy + radius * 0.58);
      ctx.restore();

      // Graver Cut Mechanics (Morphing between Indian Profile and Hand-Carved Skull)
      const p = carvingStage / 100; // 0 = Indian profile, 1 = Shane Hunter Skull

      ctx.save();
      // Zoom transform
      const scaleFactor = 1 + (zoomLevel - 1) * 0.035;
      ctx.translate(cx, cy);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.translate(-cx, -cy);

      // Skull vs Native Profile Geometry
      ctx.beginPath();
      if (p < 0.5) {
        // Indian Head Profile blending
        const morph = p * 2;
        ctx.moveTo(cx - 30, cy - 80);
        ctx.bezierCurveTo(cx + 40 - morph * 15, cy - 80, cx + 70 - morph * 25, cy - 40, cx + 60, cy - 10);
        ctx.bezierCurveTo(cx + 85, cy + 5, cx + 50, cy + 35, cx + 45 - morph * 20, cy + 55);
        ctx.bezierCurveTo(cx + 35, cy + 85, cx - 15, cy + 85, cx - 55, cy + 55);
        ctx.bezierCurveTo(cx - 85, cy + 15, cx - 75, cy - 45, cx - 30, cy - 80);
      } else {
        // Shane Hunter Bas-Relief Skull
        const morph = (p - 0.5) * 2;
        // Cranium dome
        ctx.moveTo(cx - 35, cy - 85);
        ctx.bezierCurveTo(cx + 35, cy - 88, cx + 65, cy - 45, cx + 55, cy - 10);
        // Zygomatic arch (cheekbone undercut)
        ctx.bezierCurveTo(cx + 70 * morph, cy + 10, cx + 45, cy + 25, cx + 38, cy + 42);
        // Maxilla & teeth line
        ctx.lineTo(cx + 25, cy + 70);
        ctx.lineTo(cx - 15, cy + 70);
        // Mandible
        ctx.bezierCurveTo(cx - 35, cy + 65, cx - 55, cy + 40, cx - 58, cy + 15);
        // Temporal region
        ctx.bezierCurveTo(cx - 75, cy - 25, cx - 65, cy - 65, cx - 35, cy - 85);
      }

      ctx.fillStyle = counterfeitComparison === "hand" ? "#2B241C" : "#4A4E54";
      ctx.fill();
      ctx.lineWidth = counterfeitComparison === "hand" ? 2.5 : 1.2;
      ctx.strokeStyle = counterfeitComparison === "hand" ? "#E5C89C" : "#7C8088";
      ctx.stroke();

      // Anatomical Orbital Cavity (Eye Socket)
      const eyeX = cx + 18 - p * 8;
      const eyeY = cy - 20 + p * 5;
      const eyeR = 12 + p * 16;
      ctx.beginPath();
      ctx.ellipse(eyeX, eyeY, eyeR * 0.9, eyeR * 1.1, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = counterfeitComparison === "hand" ? "#0D0A08" : "#32353A";
      ctx.fill();
      if (counterfeitComparison === "hand") {
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = "#8A7558";
        ctx.stroke();
      }

      // Nasal Piriform Aperture (Hollow Nose Cavity)
      if (p > 0.3) {
        const noseAlpha = (p - 0.3) / 0.7;
        ctx.save();
        ctx.globalAlpha = noseAlpha;
        ctx.beginPath();
        ctx.moveTo(cx + 34, cy + 12);
        ctx.lineTo(cx + 24, cy + 30);
        ctx.lineTo(cx + 38, cy + 28);
        ctx.closePath();
        ctx.fillStyle = "#0A0806";
        ctx.fill();
        ctx.restore();
      }

      // Hand-Graved Teeth & Separators
      if (p > 0.5) {
        const teethAlpha = (p - 0.5) / 0.5;
        ctx.save();
        ctx.globalAlpha = teethAlpha;
        const numTeeth = 6;
        for (let t = 0; t < numTeeth; t++) {
          const tx = cx - 8 + t * 6.5;
          const ty = cy + 50;
          ctx.beginPath();
          ctx.rect(tx, ty, 5, 12);
          ctx.fillStyle = counterfeitComparison === "hand" ? "#DFD4C2" : "#7A7E85";
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#1A1510";
          ctx.stroke();
        }
        ctx.restore();
      }

      // Microscopic Graver Tool Marks (Chisel Chatter Lines)
      if (counterfeitComparison === "hand") {
        ctx.strokeStyle = "rgba(255, 230, 180, 0.25)";
        ctx.lineWidth = 0.8;
        for (let g = 0; g < 14; g++) {
          const gx = cx - 45 + g * 7;
          const gy = cy - 65 + (g % 3) * 12;
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + 12, gy + 8);
          ctx.stroke();
        }
      } else {
        // Cast fake micro-porosity (pitted bubbles)
        ctx.fillStyle = "rgba(20, 20, 25, 0.6)";
        for (let b = 0; b < 24; b++) {
          const bx = cx - 40 + (b * 19) % 80;
          const by = cy - 40 + (b * 23) % 80;
          ctx.beginPath();
          ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore(); // Restore zoom transform

      // Microscope Reticle & Millimeter Crosshair Graticule
      ctx.save();
      ctx.strokeStyle = "rgba(196, 151, 90, 0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      // Center crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius * 0.9, cy);
      ctx.lineTo(cx + radius * 0.9, cy);
      ctx.moveTo(cx, cy - radius * 0.9);
      ctx.lineTo(cx, cy + radius * 0.9);
      ctx.stroke();

      // Measurement tick marks along crosshairs
      ctx.setLineDash([]);
      for (let m = -8; m <= 8; m++) {
        if (m === 0) continue;
        const tickPos = m * 15;
        // Horizontal ticks
        ctx.beginPath();
        ctx.moveTo(cx + tickPos, cy - 4);
        ctx.lineTo(cx + tickPos, cy + 4);
        ctx.stroke();
        // Vertical ticks
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy + tickPos);
        ctx.lineTo(cx + 4, cy + tickPos);
        ctx.stroke();
      }
      ctx.restore();

      // Outer bezel ring of microscope lens
      ctx.restore(); // Restore clipping
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.lineWidth = 16;
      ctx.strokeStyle = "#1A1C23";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#C4975A";
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [carvingStage, zoomLevel, counterfeitComparison]);

  // Knuckle clearance calculation
  // Internal ring diameter = (size * 0.8128) + 11.63 mm
  const internalDiameterMm = selectedSize * 0.8128 + 11.63;
  const knuckleDiameterMm = knuckleCircumference / Math.PI;
  // If heavy band (12mm width), finger flesh displacement requires 0.4mm to 0.6mm extra clearance
  const requiredClearance = bandType === "heavy" ? 0.55 : 0.15;
  const actualClearance = internalDiameterMm - knuckleDiameterMm;
  const isClearanceSafe = actualClearance >= -0.2; // Tolerates minor drag

  // Patina color shift calculations
  const oxidationFactor = Math.min(patinaAgeMonths / 36, 1.0);
  const silverHighlightR = Math.round(230 - oxidationFactor * 45);
  const silverHighlightG = Math.round(230 - oxidationFactor * 48);
  const silverHighlightB = Math.round(235 - oxidationFactor * 52);
  const coinBrassR = Math.round(196 - oxidationFactor * 30);
  const coinBrassG = Math.round(151 - oxidationFactor * 35);
  const coinBrassB = Math.round(90 - oxidationFactor * 25);

  const calculateTotalPrice = () => {
    let total = selectedProduct.price;
    if (yearPreference === "custom") total += 65;
    return total;
  };

  return (
    <div className="relative min-h-screen bg-[#08090C] text-[#EDEAE5] selection:bg-[#C4975A] selection:text-black">
      {/* TOP STATUS BAR // ATLANTA BENCH TELEMETRY */}
      <div className="border-b border-[#242731] bg-[#0E1015] px-4 py-2.5 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 font-mono text-[#8E929E]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#C4975A]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
              BENCH ACTIVE: DOWNTOWN ATLANTA
            </span>
            <span className="hidden sm:inline text-[#4D5260]">•</span>
            <span className="hidden sm:inline">COIN CARVER: SHANE HUNTER (TOLEDO, OH)</span>
            <span className="hidden md:inline text-[#4D5260]">•</span>
            <span className="hidden md:inline">METALS: SOLID .925 STERLING & VINTAGE US COINS</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#C4975A]">LEAD TIME: 10–14 BUSINESS DAYS</span>
            <span className="text-[#4D5260]">•</span>
            <span>DOMESTIC FREIGHT: $0 INSURED</span>
          </div>
        </div>
      </div>

      {/* PRIMARY NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#1E212A] bg-[#0A0B0E]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/silverpiston" className="group">
              <span className="font-['Cinzel'] text-xl font-black tracking-widest text-white group-hover:text-[#C4975A] transition-colors">
                SILVER PISTON
              </span>
              <span className="block font-mono text-[10px] tracking-widest text-[#7D8292]">
                ATLANTA • GA // EST. 2014 // STEVE WEST
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#A0A5B5]">
              <a href="#carving" className="hover:text-[#C4975A] transition-colors">
                Microscope Caliper (60 FPS)
              </a>
              <a href="#sizing" className="hover:text-[#C4975A] transition-colors">
                Knuckle Clearance Gauge
              </a>
              <a href="#patina" className="hover:text-[#C4975A] transition-colors">
                Patina Wear Simulator
              </a>
              <a href="#vault" className="hover:text-[#C4975A] transition-colors">
                Bench Allocation Vault
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsVaultOpen(true)}
              className="flex items-center gap-2.5 rounded-sm bg-[#C4975A] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-[#C4975A]/10 hover:bg-[#D6A96C] active:scale-[0.98] transition-all"
            >
              <span>RESERVE BENCH ALLOCATION</span>
              <span className="rounded bg-black/20 px-1.5 py-0.5 text-[10px] text-black">
                ${selectedProduct.price}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION // THE HOBO NICKEL ARTIFACT */}
      <section className="relative overflow-hidden border-b border-[#1E212A] pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(196,151,90,0.12),rgba(0,0,0,0))]"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 border border-[#3A2D1F] bg-[#1E1711] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#E5BA7D] mb-6">
                <span>VINTAGE AMERICAN NUMISMATICS</span>
                <span className="text-[#68533B]">•</span>
                <span>AUTHENTIC 1913–1938 COINAGE</span>
              </div>

              <h1 className="font-['Cinzel'] text-3xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-5xl leading-[1.12]">
                HAND-CARVED HOBO NICKELS. <br />
                <span className="text-[#C4975A]">SOLID .925 STERLING BANDS.</span> <br />
                BUILT IN ATLANTA.
              </h1>

              <p className="mt-6 font-['Plus_Jakarta_Sans'] text-base text-[#A8ADB8] sm:text-lg leading-relaxed max-w-2xl">
                Every Silver Piston signet is handcrafted one at a time by Steve West in downtown Atlanta.
                Starting with authentic 1913–1938 US Buffalo Nickels and Mercury Dimes, master coin carver
                Shane Hunter carves each coin under 40x magnification with hand-chiseled push gravers—lowering
                the background fields into three-dimensional bas-relief skulls while preserving the historic
                1930s mint date and outer LIBERTY stamps. Soldered into heavy 2.4mm sterling silver bands
                engineered to outlive their owners.
              </p>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono text-xs border-y border-[#1E212A] py-5">
                <div>
                  <span className="block text-[10px] text-[#7D8292] uppercase">COIN PROVENANCE</span>
                  <span className="font-bold text-white">100% US Mint Original</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#7D8292] uppercase">RELIEF DEPTH</span>
                  <span className="font-bold text-[#C4975A]">0.85 mm Hand-Carved</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#7D8292] uppercase">BAND THICKNESS</span>
                  <span className="font-bold text-white">2.4 mm Solid Sterling</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#7D8292] uppercase">BENCH GUARANTEE</span>
                  <span className="font-bold text-[#10B981]">1-Time Free Resizing</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsVaultOpen(true)}
                  className="rounded-sm bg-[#C4975A] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xl shadow-[#C4975A]/15 hover:bg-[#D6A96C] transition-all"
                >
                  ACQUIRE BENCH PIECE — ${selectedProduct.price}
                </button>
                <a
                  href="#carving"
                  className="rounded-sm border border-[#2B303C] bg-[#12141B] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#D1D5E0] hover:border-[#C4975A] hover:text-white transition-all"
                >
                  INSPECT CARVING MICROSCOPE ↓
                </a>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative border border-[#262A36] bg-[#0E1017] p-3 shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0A0C10]">
                  <Image
                    src="/assets/silverpiston/hobo-nickel-skull-ring.jpg"
                    alt="Shane Hunter Hand-Carved Hobo Nickel Skull Ring by Silver Piston"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent opacity-60"></div>

                  {/* Corner Stamp */}
                  <div className="absolute top-4 left-4 border border-[#C4975A]/60 bg-black/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#C4975A]">
                    SHANE HUNTER NO. 142 // 1936 BUFFALO
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 border border-[#282C39] bg-black/85 p-3 backdrop-blur-md">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-white">THE HOBO NICKEL SKULL SIGNET</span>
                      <span className="text-[#C4975A] font-bold">$380 USD</span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-[#8C92A4]">
                      Solid .925 sterling silver band • 28.4g total weight • Hand-pierced bezel setting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SIMULATION 01 // 60 FPS MICROSCOPE CARVING CALIPER */}
      <section id="carving" className="border-b border-[#1E212A] bg-[#0B0C10] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#C4975A]">
              <span>[SIMULATOR 01 // 60 FPS OPTICAL LAB]</span>
            </div>
            <h2 className="mt-3 font-['Cinzel'] text-2xl font-black uppercase text-white sm:text-4xl">
              THE 40X MICROSCOPE CARVING CALIPER
            </h2>
            <p className="mt-3 font-['Plus_Jakarta_Sans'] text-base text-[#9FA4B2]">
              Drag the Carving Progression Slider to witness Shane Hunter's hardened push gravers cut away
              vintage cupro-nickel metal to reveal the three-dimensional skull bas-relief. Toggle between
              authentic hand-carved relief (0.85 mm depth) and mass-produced zinc cast counterfeits
              (0.12 mm mushy cast edges).
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* 60 FPS HTML5 Canvas Viewport */}
            <div className="lg:col-span-7">
              <div className="relative border border-[#262A36] bg-[#07080B] p-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#1E222D] pb-3 mb-3 font-mono text-[11px] text-[#7E8494]">
                  <span className="text-[#C4975A]">STEREO MICROSCOPE // 40X COAXIAL ILLUMINATION</span>
                  <span>1936 S-MINT BUFFALO NICKEL (21.2mm)</span>
                </div>

                <div className="relative aspect-square w-full max-w-[540px] mx-auto overflow-hidden bg-[#0A0C10]">
                  <canvas
                    ref={canvasRef}
                    width={540}
                    height={540}
                    className="w-full h-full block"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#7D8392]">
                  <span>RETICLE: 0.1mm INCREMENTS</span>
                  <span>GRAVER TOOL: CARBIDE ONGLETTE NO. 2</span>
                  <span>STATUS: {counterfeitComparison === "hand" ? "AUTHENTIC HAND RELIEF" : "CAST REPLICA DEFECTS"}</span>
                </div>
              </div>
            </div>

            {/* Interactive Microscope Controls & Telemetry */}
            <div className="lg:col-span-5 space-y-6">
              {/* Carving Progression Slider */}
              <div className="border border-[#232734] bg-[#0E1016] p-5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold uppercase text-white">CARVING STAGE PROGRESSION</span>
                  <span className="text-[#C4975A] font-bold">{carvingStage}% GRAVED</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={carvingStage}
                  onChange={(e) => setCarvingStage(Number(e.target.value))}
                  className="mt-3 w-full accent-[#C4975A] cursor-pointer"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[#6B7280]">
                  <span>0% Original 1936 Indian</span>
                  <span>50% Field Roughing</span>
                  <span>100% Shane Hunter Skull</span>
                </div>
              </div>

              {/* Optical Zoom Slider */}
              <div className="border border-[#232734] bg-[#0E1016] p-5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold uppercase text-white">MICROSCOPE MAGNIFICATION</span>
                  <span className="text-[#C4975A] font-bold">{zoomLevel}X OPTICAL</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="mt-3 w-full accent-[#C4975A] cursor-pointer"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[#6B7280]">
                  <span>1X (Naked Eye)</span>
                  <span>20X (Bench Loupe)</span>
                  <span>40X (Stereo Scope)</span>
                </div>
              </div>

              {/* Counterfeit vs Authentic Comparator */}
              <div className="border border-[#232734] bg-[#0E1016] p-5">
                <span className="block font-mono text-xs font-bold uppercase text-white mb-3">
                  AUTHENTICITY BENCHMARK COMPARATOR
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCounterfeitComparison("hand")}
                    className={`p-3 text-left font-mono text-xs border transition-all ${
                      counterfeitComparison === "hand"
                        ? "border-[#C4975A] bg-[#221B13] text-[#F3D7AF]"
                        : "border-[#1F232E] bg-[#12141B] text-[#7A8090]"
                    }`}
                  >
                    <span className="block font-bold">Shane Hunter Carving</span>
                    <span className="block text-[10px] text-[#A69580] mt-1">
                      0.85mm relief • 90° undercut • Chisel chatter lines
                    </span>
                  </button>
                  <button
                    onClick={() => setCounterfeitComparison("cast")}
                    className={`p-3 text-left font-mono text-xs border transition-all ${
                      counterfeitComparison === "cast"
                        ? "border-[#EF4444] bg-[#2B1414] text-[#FCA5A5]"
                        : "border-[#1F232E] bg-[#12141B] text-[#7A8090]"
                    }`}
                  >
                    <span className="block font-bold">Mass Cast Replica</span>
                    <span className="block text-[10px] text-[#9A7D7D] mt-1">
                      0.12mm shallow relief • Zinc porosity • Rounded mush
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Metallurgy HUD */}
              <div className="border border-[#1E232E] bg-[#0A0C11] p-4 font-mono text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[10px] text-[#7A8090]">ALLOY DENSITY</span>
                    <span className="font-bold text-white">8.92 g/cm³ (75Cu/25Ni)</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#7A8090]">CARVING RELIEF DEPTH</span>
                    <span className="font-bold text-[#C4975A]">
                      {counterfeitComparison === "hand" ? "0.85 mm (+608% vs fake)" : "0.12 mm (Defective)"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#7A8090]">DATE STAMP VERIFICATION</span>
                    <span className="font-bold text-[#10B981]">1936 Mint Intact</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#7A8090]">AVERAGE CHISEL STROKES</span>
                    <span className="font-bold text-white">~3,400 Graver Passes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SIMULATION 02 // KNUCKLE CLEARANCE & HEAVY BAND CALIPER */}
      <section id="sizing" className="border-b border-[#1E212A] bg-[#08090C] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#C4975A]">
              <span>[SIMULATOR 02 // ERGONOMIC BIOMECHANICS]</span>
            </div>
            <h2 className="mt-3 font-['Cinzel'] text-2xl font-black uppercase text-white sm:text-4xl">
              KNUCKLE CLEARANCE & HEAVY-BAND SIZING CALIPER
            </h2>
            <p className="mt-3 font-['Plus_Jakarta_Sans'] text-base text-[#9FA4B2]">
              Silver Piston signet bands are 12.5mm tall with 2.4mm thick solid sterling silver walls.
              Because wide bands displace more finger flesh, ordering your standard thin-band size often causes
              knuckle hang-up. Use our interactive anatomical caliper to calculate your exact fit before bench casting.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Visual Anatomical Hand & Band Diagram */}
            <div className="lg:col-span-6 border border-[#232734] bg-[#0E1016] p-6">
              <div className="flex items-center justify-between border-b border-[#1E222D] pb-3 mb-6 font-mono text-xs">
                <span className="text-[#C4975A] font-bold">PIP KNUCKLE PASSAGE SIMULATION</span>
                <span className="text-[#8B91A0]">US SIZE {selectedSize.toFixed(1)}</span>
              </div>

              {/* Dynamic Anatomical Cross-Section Graphic */}
              <div className="relative aspect-[16/10] overflow-hidden rounded bg-[#07080B] border border-[#1A1D26] flex items-center justify-center p-6">
                <svg viewBox="0 0 400 240" className="w-full h-full">
                  {/* Finger outline */}
                  <path
                    d="M 40,120 Q 140,85 240,105 T 380,120 Q 240,135 140,155 Z"
                    fill={
                      skinTone === "fair"
                        ? "#D8B494"
                        : skinTone === "olive"
                        ? "#BA9572"
                        : skinTone === "bronze"
                        ? "#8B6547"
                        : "#664B38"
                    }
                    opacity="0.85"
                  />

                  {/* Knuckle Joint Bulge (PIP Joint) */}
                  <ellipse
                    cx="190"
                    cy="120"
                    rx={knuckleCircumference / 3.2}
                    ry={knuckleCircumference / 4.4}
                    fill="none"
                    stroke="#C4975A"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <text x="190" y="60" textAnchor="middle" fill="#C4975A" fontSize="10" fontFamily="monospace">
                    KNUCKLE PIP JOINT: {knuckleCircumference}mm CIRCUMFERENCE
                  </text>

                  {/* Ring Band Cross Section sliding over finger */}
                  <g transform={`translate(${190 + actualClearance * 12}, 70)`}>
                    <rect
                      x="-8"
                      y="15"
                      width={bandType === "heavy" ? "32" : "8"}
                      height="70"
                      fill="#A8ADB5"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      rx="2"
                    />
                    {bandType === "heavy" && (
                      <rect x="0" y="25" width="16" height="50" fill="#C4975A" rx="1" />
                    )}
                    <text
                      x={bandType === "heavy" ? "8" : "-4"}
                      y="105"
                      textAnchor="middle"
                      fill="#EDEAE5"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {bandType === "heavy" ? "SILVER PISTON 12.5mm SIGNET" : "2mm THIN BAND"}
                    </text>
                  </g>
                </svg>

                {/* Clearance Status Callout Badge */}
                <div className="absolute bottom-4 right-4 border border-[#2B303E] bg-black/90 p-3 font-mono text-xs">
                  <span className="block text-[10px] text-[#7B8191]">KNUCKLE PASSAGE CLEARANCE:</span>
                  <span
                    className={`font-bold ${
                      isClearanceSafe ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                  >
                    {isClearanceSafe
                      ? `OPTIMAL (+${actualClearance.toFixed(2)}mm SLIDE)`
                      : `TOO TIGHT (${actualClearance.toFixed(2)}mm RESTRICTION)`}
                  </span>
                </div>
              </div>

              {/* Skin Tone Reflectance Selector */}
              <div className="mt-4 flex items-center justify-between font-mono text-xs">
                <span className="text-[#848B9B]">HAND REFLECTANCE:</span>
                <div className="flex gap-2">
                  {(["fair", "olive", "bronze", "patina"] as const).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSkinTone(tone)}
                      className={`px-2 py-1 text-[10px] uppercase border ${
                        skinTone === tone
                          ? "border-[#C4975A] text-[#C4975A] bg-[#1E1912]"
                          : "border-[#20242F] text-[#6E7484]"
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sizing Controls Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* US Ring Size Selector */}
              <div className="border border-[#232734] bg-[#0E1016] p-5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold uppercase text-white">US RING SIZE CALIPER</span>
                  <span className="text-[#C4975A] font-bold text-sm">SIZE {selectedSize.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="14.0"
                  step="0.25"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(Number(e.target.value))}
                  className="mt-3 w-full accent-[#C4975A] cursor-pointer"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[#6B7280]">
                  <span>Size 7.0 (17.3mm)</span>
                  <span>Size 10.5 (20.2mm)</span>
                  <span>Size 14.0 (23.0mm)</span>
                </div>
              </div>

              {/* Knuckle Joint Circumference Gauge */}
              <div className="border border-[#232734] bg-[#0E1016] p-5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold uppercase text-white">MEASURED KNUCKLE CIRCUMFERENCE</span>
                  <span className="text-[#C4975A] font-bold">{knuckleCircumference} mm</span>
                </div>
                <input
                  type="range"
                  min="54"
                  max="76"
                  step="1"
                  value={knuckleCircumference}
                  onChange={(e) => setKnuckleCircumference(Number(e.target.value))}
                  className="mt-3 w-full accent-[#C4975A] cursor-pointer"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[#6B7280]">
                  <span>54mm (Slim Knuckle)</span>
                  <span>64mm (Average Hand)</span>
                  <span>76mm (Heavy Moto Hand)</span>
                </div>
              </div>

              {/* Band Height Toggle (Thin vs Silver Piston Heavy Signet) */}
              <div className="border border-[#232734] bg-[#0E1016] p-5">
                <span className="block font-mono text-xs font-bold uppercase text-white mb-3">
                  RING BAND PROFILE DISPLACEMENT
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBandType("heavy")}
                    className={`p-3 text-left font-mono text-xs border transition-all ${
                      bandType === "heavy"
                        ? "border-[#C4975A] bg-[#221B13] text-[#F3D7AF]"
                        : "border-[#1F232E] bg-[#12141B] text-[#7A8090]"
                    }`}
                  >
                    <span className="block font-bold">Silver Piston Heavy Signet</span>
                    <span className="block text-[10px] text-[#A69580] mt-1">
                      12.5mm height • 2.4mm solid wall • Displaces +0.5 size
                    </span>
                  </button>
                  <button
                    onClick={() => setBandType("thin")}
                    className={`p-3 text-left font-mono text-xs border transition-all ${
                      bandType === "thin"
                        ? "border-[#C4975A] bg-[#221B13] text-[#F3D7AF]"
                        : "border-[#1F232E] bg-[#12141B] text-[#7A8090]"
                    }`}
                  >
                    <span className="block font-bold">Standard Thin Band</span>
                    <span className="block text-[10px] text-[#A69580] mt-1">
                      2.0mm height • Minimal flesh displacement
                    </span>
                  </button>
                </div>
              </div>

              {/* Steve West Bench Resizing Guarantee */}
              <div className="border border-[#1E232E] bg-[#0A0C11] p-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#10B981]/10 text-[#10B981]">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-white uppercase">1-TIME COMPLIMENTARY BENCH RESIZING</span>
                    <p className="text-[11px] text-[#7E8596] mt-0.5">
                      If your signet requires a quarter-size adjustment after delivery, ship it back to Steve West's
                      Atlanta studio for complimentary hydraulic sizing and re-polishing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SIMULATION 03 // PATINA WEAR SIMULATOR */}
      <section id="patina" className="border-b border-[#1E212A] bg-[#0B0C10] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#C4975A]">
              <span>[SIMULATOR 03 // METALLURGIC MATURATION]</span>
            </div>
            <h2 className="mt-3 font-['Cinzel'] text-2xl font-black uppercase text-white sm:text-4xl">
              STERLING & CUPRO-NICKEL PATINA SIMULATOR
            </h2>
            <p className="mt-3 font-['Plus_Jakarta_Sans'] text-base text-[#9FA4B2]">
              Unlike hollow jewelry, solid .925 sterling silver and vintage coin cupro-nickel age with
              gravitas. Drag the wear timeline to see how road dirt, motorcycle clutch grip friction, and skin
              contact burnish the outer coin high points while deepening oxidized shadow recesses.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Visual Ring Render with Dynamic CSS Patina Blend */}
            <div className="lg:col-span-7">
              <div className="relative border border-[#232734] bg-[#07080B] p-6 shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#0A0C10] flex items-center justify-center">
                  {/* Base Ring Image */}
                  <Image
                    src="/assets/silverpiston/sugar-skull-dia-ring.jpg"
                    alt="Silver Piston Ring Patina Evolution"
                    fill
                    className="object-cover"
                    style={{
                      filter: `contrast(${100 + oxidationFactor * 25}%) brightness(${
                        100 - oxidationFactor * 12
                      }%) saturate(${100 - oxidationFactor * 30}%)`,
                    }}
                  />

                  {/* Dynamic Oxidation Tone Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-color"
                    style={{
                      backgroundColor: `rgba(${coinBrassR}, ${coinBrassG}, ${coinBrassB}, ${
                        0.15 + oxidationFactor * 0.25
                      })`,
                    }}
                  ></div>

                  {/* Time Overlay Badge */}
                  <div className="absolute top-4 left-4 border border-[#C4975A] bg-black/85 px-3 py-1 font-mono text-xs font-bold text-[#C4975A]">
                    {patinaAgeMonths === 0
                      ? "DAY 0 // BENCH FRESH RELEASE"
                      : patinaAgeMonths <= 12
                      ? `${patinaAgeMonths} MONTHS // ROAD & LEATHER WEAR`
                      : `${(patinaAgeMonths / 12).toFixed(1)} YEARS // HEIRLOOM BATTLE RELIC`}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-xs text-[#7A8191]">
                  <span>RECESSED SHADOWS: LIVER OF SULFUR (Ag₂S)</span>
                  <span>HIGH POINTS: SATIN ROAD-BURNISHED</span>
                </div>
              </div>
            </div>

            {/* Patina Age Slider & Metallurgy Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-[#232734] bg-[#0E1016] p-6">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold uppercase text-white">WEAR DURATION TIMELINE</span>
                  <span className="text-[#C4975A] font-bold text-sm">
                    {patinaAgeMonths === 0 ? "Fresh Bench Finish" : `${patinaAgeMonths} Months In Service`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="36"
                  step="3"
                  value={patinaAgeMonths}
                  onChange={(e) => setPatinaAgeMonths(Number(e.target.value))}
                  className="mt-4 w-full accent-[#C4975A] cursor-pointer"
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[#6B7280]">
                  <span>Day 1 (Blackened Recess)</span>
                  <span>18 Mo (Satin Polish)</span>
                  <span>36 Mo (Heirloom Patina)</span>
                </div>
              </div>

              <div className="border border-[#232734] bg-[#0E1016] p-6 font-mono text-xs space-y-4">
                <span className="block font-bold uppercase text-white">METALLURGIC MATURATION CHARACTERISTICS:</span>

                <div className="border-l-2 border-[#C4975A] pl-3">
                  <span className="font-bold text-[#C4975A]">0–6 MONTHS: INITIAL BURNISH</span>
                  <p className="text-[11px] text-[#868C9E] mt-0.5">
                    Micro-friction from daily contact and leather motorcycle gloves polishes the skull's brow and cheek ridges to high-shine silver, contrasting sharply against blackened background crevices.
                  </p>
                </div>

                <div className="border-l-2 border-[#8A90A0] pl-3">
                  <span className="font-bold text-white">12–24 MONTHS: CUPRO-NICKEL EXPOSURE</span>
                  <p className="text-[11px] text-[#868C9E] mt-0.5">
                    The 75% copper, 25% nickel vintage alloy inside the hand-carved coin begins developing warm, golden-amber undertones where Shane Hunter chiseled through the nickel plating.
                  </p>
                </div>

                <div className="border-l-2 border-[#10B981] pl-3">
                  <span className="font-bold text-[#10B981]">36+ MONTHS: INDESTRUCTIBLE HEIRLOOM</span>
                  <p className="text-[11px] text-[#868C9E] mt-0.5">
                    The solid sterling band develops natural dinged micro-facets along the rim that tell the story of the wearer's life. Cannot peel, chip, or flake because metal is 100% solid through and through.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SECTION 04 // BENCH ALLOCATION VAULT (PRODUCT CATALOG) */}
      <section id="vault" className="border-b border-[#1E212A] bg-[#08090C] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#1E222D] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#C4975A]">
                <span>[ATLANTA BENCH COLLECTION]</span>
              </div>
              <h2 className="mt-3 font-['Cinzel'] text-3xl font-black uppercase text-white sm:text-4xl">
                BENCH ALLOCATION VAULT
              </h2>
              <p className="mt-2 font-['Plus_Jakarta_Sans'] text-base text-[#9CA1AF] max-w-2xl">
                Each piece is custom built to your exact knuckle specification by Steve West, featuring an authentic
                vintage hand-carved US coin by Shane Hunter. Select an allocation to configure custom size and options.
              </p>
            </div>
            <div className="font-mono text-xs text-[#8A90A0]">
              <span>CURRENT BENCH QUEUE: </span>
              <span className="font-bold text-[#C4975A]">4 AVAILABLE THIS DROP</span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className={`group relative border transition-all duration-300 ${
                  selectedProduct.id === prod.id
                    ? "border-[#C4975A] bg-[#0F1118]"
                    : "border-[#1E232F] bg-[#0A0C11] hover:border-[#383F52]"
                }`}
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#07080B]">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 border border-[#C4975A]/60 bg-black/80 px-2 py-0.5 font-mono text-[10px] text-[#C4975A]">
                    {prod.metal.split(" ")[0]} {prod.metal.split(" ")[1]}
                  </div>
                  <div className="absolute bottom-3 right-3 border border-[#2B303E] bg-black/80 px-2.5 py-1 font-mono text-xs font-bold text-white">
                    ${prod.price} USD
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="font-mono text-[11px] text-[#7E8496] uppercase">
                    CARVER: {prod.carvingArtist}
                  </div>
                  <h3 className="mt-1 font-['Cinzel'] text-lg font-bold uppercase text-white group-hover:text-[#C4975A] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="mt-2 font-['Plus_Jakarta_Sans'] text-xs text-[#8A90A0] line-clamp-2">
                    {prod.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#1C202C] pt-3 font-mono text-[10px] text-[#717787]">
                    <div>
                      <span>BAND HEIGHT: </span>
                      <span className="text-[#C4975A] font-bold">{prod.bandHeight}</span>
                    </div>
                    <div>
                      <span>LEAD TIME: </span>
                      <span className="text-white">{prod.leadTime}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProduct(prod);
                      setIsVaultOpen(true);
                    }}
                    className="mt-6 w-full rounded-sm border border-[#C4975A] bg-[#C4975A]/10 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#E5BA7D] hover:bg-[#C4975A] hover:text-black transition-all"
                  >
                    CONFIGURE & RESERVE — ${prod.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT DOSSIER // STEVE WEST & SHANE HUNTER COLLABORATION */}
      <section className="border-b border-[#1E212A] bg-[#0A0C10] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 relative aspect-square overflow-hidden border border-[#282C39]">
              <Image
                src="/assets/silverpiston/workshop-gravers-torch.jpg"
                alt="Steve West Jeweler Workbench with Gravers and Torch"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-white">
                <span className="text-[#C4975A] font-bold">DOWNTOWN ATLANTA JEWELER BENCH</span>
                <p className="mt-1 text-[11px] text-[#A6ACB8]">
                  Hand-formed bezel wire, silver solder, chasing hammers, and gravers.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#C4975A]">
                <span>[THE ATLANTA & TOLEDO GUILD]</span>
              </div>
              <h2 className="font-['Cinzel'] text-2xl font-black uppercase text-white sm:text-4xl">
                WHERE OLD-WORLD NUMISMATICS MEETS REBELLIOUS AMERICANA
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-base text-[#A8ADB8] leading-relaxed">
                Steve West founded Silver Piston after studying jewelry making at the Savannah College of Art & Design (SCAD).
                Dissatisfied with lightweight commercial jewelry, he set out to create heavy, indestructible accessories that
                belonged on a vintage chopper. When he discovered the lost art of the 1920s Hobo Nickel—coins altered by itinerant
                workers during the Great Depression using penknives and files—he reached out to master coin engraver Shane "Hobo" Hunter
                in Toledo, Ohio.
              </p>
              <p className="font-['Plus_Jakarta_Sans'] text-base text-[#A8ADB8] leading-relaxed">
                Hunter carves each vintage Indian Head or Buffalo nickel by hand, one hairline cut at a time. Once completed,
                the carved coin travels to Steve West's bench in Atlanta, where it is forged into thick sterling silver signet
                bezels with hand-stamped inscriptions and oxidized finishes. No two pieces are ever identical.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-[#1E232F] pt-6 font-mono text-xs">
                <div>
                  <span className="block text-[#7A8090]">BENCH LOCATION</span>
                  <span className="font-bold text-white">Downtown Atlanta, GA</span>
                </div>
                <div>
                  <span className="block text-[#7A8090]">ENGRAVING ATELIER</span>
                  <span className="font-bold text-white">Toledo, Ohio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE-OUT ALLOCATION VAULT DRAWER (CONVERSION ENGINE) */}
      {isVaultOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsVaultOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-lg bg-[#0C0E14] border-l border-[#242938] p-6 shadow-2xl overflow-y-auto">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-[#1E232F] pb-4">
                <div>
                  <span className="font-mono text-xs text-[#C4975A] uppercase tracking-wider">
                    ATLANTA BENCH ALLOCATION
                  </span>
                  <h3 className="font-['Cinzel'] text-xl font-bold uppercase text-white">
                    RESERVE YOUR SIGNET
                  </h3>
                </div>
                <button
                  onClick={() => setIsVaultOpen(false)}
                  className="rounded p-2 text-[#7D8392] hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Selected SKU Card */}
              <div className="mt-6 border border-[#202533] bg-[#08090D] p-4 flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-[#10131A]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-['Cinzel'] text-sm font-bold text-white uppercase">
                    {selectedProduct.name}
                  </h4>
                  <span className="font-mono text-xs text-[#C4975A] font-bold block mt-0.5">
                    ${selectedProduct.price} USD
                  </span>
                  <span className="font-mono text-[10px] text-[#7C8294] block mt-1">
                    {selectedProduct.metal} • {selectedProduct.leadTime}
                  </span>
                </div>
              </div>

              {/* Configuration Step 1: Knuckle & Ring Size */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold uppercase text-white">1. EXACT US RING SIZE</span>
                  <span className="text-[#C4975A] font-bold">SIZE {selectedSize.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  {[8.0, 9.0, 10.0, 10.5, 11.0, 11.5, 12.0, 13.0].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-center border rounded-sm transition-all ${
                        selectedSize === sz
                          ? "border-[#C4975A] bg-[#241B12] text-[#F0D5B0] font-bold"
                          : "border-[#1D212B] bg-[#0F1118] text-[#838999]"
                      }`}
                    >
                      {sz.toFixed(1)}
                    </button>
                  ))}
                </div>
                <p className="font-mono text-[10px] text-[#717787]">
                  *Based on 12.5mm heavy band displacement: sizing up +0.5 from thin band size recommended.
                </p>
              </div>

              {/* Configuration Step 2: Vintage Coin Year Preference */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold uppercase text-white">2. VINTAGE COIN MINT YEAR</span>
                  <span className="text-[#C4975A] font-bold">
                    {yearPreference === "vintage" ? "1920s–1930s Authentic" : `Specific ${customYear} (+$65)`}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setYearPreference("vintage")}
                    className={`p-3 text-left font-mono text-xs border rounded-sm ${
                      yearPreference === "vintage"
                        ? "border-[#C4975A] bg-[#221B13] text-[#F3D7AF]"
                        : "border-[#1D212B] bg-[#0E1016] text-[#777D8D]"
                    }`}
                  >
                    <span className="block font-bold">Vintage Random</span>
                    <span className="block text-[10px] text-[#A69580] mt-0.5">
                      Authentic 1913–1938 Buffalo (Included)
                    </span>
                  </button>
                  <button
                    onClick={() => setYearPreference("custom")}
                    className={`p-3 text-left font-mono text-xs border rounded-sm ${
                      yearPreference === "custom"
                        ? "border-[#C4975A] bg-[#221B13] text-[#F3D7AF]"
                        : "border-[#1D212B] bg-[#0E1016] text-[#777D8D]"
                    }`}
                  >
                    <span className="block font-bold">Specific Year Search</span>
                    <span className="block text-[10px] text-[#A69580] mt-0.5">
                      Birth / Milestone Hunt (+$65)
                    </span>
                  </button>
                </div>
                {yearPreference === "custom" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={customYear}
                      onChange={(e) => setCustomYear(e.target.value)}
                      placeholder="e.g. 1936"
                      className="w-full border border-[#2B303E] bg-[#0A0C11] px-3 py-2 font-mono text-xs text-white uppercase placeholder-[#555B6A] focus:border-[#C4975A] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Configuration Step 3: Finish Style */}
              <div className="mt-6 space-y-3">
                <span className="block font-mono text-xs font-bold uppercase text-white">
                  3. OXIDATION & POLISH FINISH
                </span>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <button
                    onClick={() => setFinishStyle("oxidized")}
                    className={`p-3 text-left border rounded-sm ${
                      finishStyle === "oxidized"
                        ? "border-[#C4975A] bg-[#221B13] text-[#F3D7AF]"
                        : "border-[#1D212B] bg-[#0E1016] text-[#777D8D]"
                    }`}
                  >
                    <span className="block font-bold">Matte Oxidized Charcoal</span>
                    <span className="text-[10px] text-[#8E93A3] block mt-0.5">
                      High contrast recesses
                    </span>
                  </button>
                  <button
                    onClick={() => setFinishStyle("mirror")}
                    className={`p-3 text-left border rounded-sm ${
                      finishStyle === "mirror"
                        ? "border-[#C4975A] bg-[#221B13] text-[#F3D7AF]"
                        : "border-[#1D212B] bg-[#0E1016] text-[#777D8D]"
                    }`}
                  >
                    <span className="block font-bold">Mirror Satin High-Relief</span>
                    <span className="text-[10px] text-[#8E93A3] block mt-0.5">
                      High burnish outer silver
                    </span>
                  </button>
                </div>
              </div>

              {/* Configuration Step 4: Inside Band Hand-Stamped Inscription */}
              <div className="mt-6 space-y-2">
                <span className="block font-mono text-xs font-bold uppercase text-white">
                  4. INSIDE BAND HAND STAMP (UP TO 8 CHARACTERS)
                </span>
                <input
                  type="text"
                  maxLength={8}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                  placeholder="e.g. 1984 / RIDE ON"
                  className="w-full border border-[#2B303E] bg-[#0A0C11] px-3 py-2 font-mono text-xs text-white uppercase placeholder-[#555B6A] focus:border-[#C4975A] focus:outline-none"
                />
                <span className="block font-mono text-[10px] text-[#717787]">
                  *Steel hand-stamped onto inner sterling silver band by Steve West.
                </span>
              </div>

              {/* Pricing Summary & Checkout */}
              <div className="mt-8 border-t border-[#1E232F] pt-6 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#848A9C]">ITEM BASE:</span>
                  <span className="text-white">${selectedProduct.price}.00</span>
                </div>
                {yearPreference === "custom" && (
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#848A9C]">SPECIFIC YEAR SEARCH:</span>
                    <span className="text-[#C4975A]">+$65.00</span>
                  </div>
                )}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#848A9C]">INSURED GROUND FREIGHT:</span>
                  <span className="text-[#10B981] font-bold">FREE ($0.00)</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#1C202B] pt-3 font-mono text-sm">
                  <span className="font-bold text-white uppercase">TOTAL BENCH DEPOSIT:</span>
                  <span className="font-bold text-[#C4975A] text-base">
                    ${calculateTotalPrice()}.00 USD
                  </span>
                </div>

                <button
                  onClick={() => {
                    alert(
                      `[DEMO ESCROW ALLOCATION INITIALIZED]\n\nProduct: ${selectedProduct.name}\nSize: US ${selectedSize.toFixed(
                        2
                      )}\nCoin: ${yearPreference === "custom" ? customYear : "1913-1938 Vintage"}\nFinish: ${finishStyle}\nInside Stamp: "${engravingText}"\nTotal: $${calculateTotalPrice()} USD\n\nRouting to Steve West Atlanta Bench Build Queue.`
                    );
                  }}
                  className="w-full rounded-sm bg-[#C4975A] py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xl shadow-[#C4975A]/20 hover:bg-[#D6A96C] active:scale-[0.99] transition-all"
                >
                  INITIALIZE ESCROW COMMISSION — ${calculateTotalPrice()} USD
                </button>

                <p className="text-center font-mono text-[10px] text-[#696F80]">
                  🔒 256-Bit SSL Encrypted Escrow • Includes 1-Time Complimentary Bench Resizing
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER & DIRECT CONTACT ROUTING */}
      <footer className="border-t border-[#1C202C] bg-[#050608] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <span className="font-['Cinzel'] text-xl font-black uppercase tracking-wider text-white">
                SILVER PISTON
              </span>
              <p className="mt-3 font-['Plus_Jakarta_Sans'] text-xs text-[#8A90A0] max-w-md leading-relaxed">
                Handcrafted Americana, vintage hobo nickel coin jewelry, and heavy sterling silver signets
                by Steve West in downtown Atlanta, Georgia. In artistic collaboration with Shane "Hobo" Hunter
                in Toledo, Ohio.
              </p>
              <div className="mt-4 font-mono text-xs text-[#7A8090]">
                STUDIO: Downtown Atlanta, GA 30303 • INSTAGRAM: @stevewest / @silverpiston
              </div>
            </div>

            <div>
              <span className="block font-mono text-xs font-bold uppercase text-[#C4975A] mb-3">
                COLLECTIONS
              </span>
              <ul className="space-y-2 font-mono text-xs text-[#828898]">
                <li><a href="#vault" className="hover:text-white">Shane Hunter Hobo Rings</a></li>
                <li><a href="#vault" className="hover:text-white">Día de los Muertos Rings</a></li>
                <li><a href="#vault" className="hover:text-white">Buffalo Cut-Out Signets</a></li>
                <li><a href="#vault" className="hover:text-white">Ball-Bearing Spinners</a></li>
                <li><a href="#vault" className="hover:text-white">Mercury Dime Cuffs</a></li>
              </ul>
            </div>

            <div>
              <span className="block font-mono text-xs font-bold uppercase text-[#C4975A] mb-3">
                DIGITAL ARCHITECT
              </span>
              <p className="font-mono text-xs text-[#828898] leading-relaxed">
                Prototype engineered by Billy Benjamin Consulting for Steve West.
              </p>
              <div className="mt-4 flex flex-col gap-2 font-mono text-xs">
                <a
                  href="mailto:billybenjamin836@gmail.com"
                  className="text-[#C4975A] hover:underline"
                >
                  billybenjamin836@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/billy-benjamin-b02265315"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#8E94A4] hover:text-white"
                >
                  LinkedIn Profile ↗
                </a>
                <a
                  href="https://www.instagram.com/billybranddirector88/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#8E94A4] hover:text-white"
                >
                  Instagram @billybranddirector88 ↗
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-[#141720] pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-[#555A68]">
            <span>© 2014–2026 SILVER PISTON LLC. ALL RIGHTS RESERVED.</span>
            <span>HIGH-CONVERSION PROTOTYPE SANDBOX // BILLY BENJAMIN CONSULTING</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

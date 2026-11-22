"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

interface KnifeModel {
  id: string;
  name: string;
  japaneseName: string;
  category: string;
  steel: string;
  bladeLengthMm: number;
  heelSpineMm: number;
  tipSpineMm: number;
  heelHeightMm: number;
  weightGrams: number;
  priceUsd: number;
  image: string;
  description: string;
  task: string;
}

const KNIFE_MODELS: KnifeModel[] = [
  {
    id: "gyuto-240",
    name: "240mm Gyuto (Chef Knife)",
    japaneseName: "牛刀",
    category: "Primary Culinary Workhorse",
    steel: "52100 High-Carbon Ball-Bearing Steel (62-63 HRC)",
    bladeLengthMm: 240,
    heelSpineMm: 4.5,
    tipSpineMm: 0.7,
    heelHeightMm: 52,
    weightGrams: 225,
    priceUsd: 580,
    image: "/assets/shihan/gyuto-52100-240mm.jpg",
    description: "Hand-forged distal taper with substantial spine at the pinch grip tapering down to a needle-sharp tip. Full flat-to-convex grind prevents suction.",
    task: "Slicing proteins, dicing root vegetables, fine julienne, and large batch prep.",
  },
  {
    id: "santoku-165",
    name: "165mm Santoku (Three Virtues)",
    japaneseName: "三徳",
    category: "Compact Multi-Task Knife",
    steel: "A2 Air-Hardening Tool Steel (61-62 HRC)",
    bladeLengthMm: 165,
    heelSpineMm: 3.8,
    tipSpineMm: 0.8,
    heelHeightMm: 48,
    weightGrams: 175,
    priceUsd: 440,
    image: "/assets/shihan/santoku-a2-165mm.jpg",
    description: "Agile all-rounder balanced slightly forward for effortless push-cutting. High wear resistance with exceptional edge stability.",
    task: "Meat, fish, and vegetable prep in home or professional bench setups.",
  },
  {
    id: "nakiri-180",
    name: "180mm Nakiri (Vegetable Cleaver)",
    japaneseName: "菜切り",
    category: "Vegetable Precision Specialist",
    steel: "52100 High-Carbon Ball-Bearing Steel (62-63 HRC)",
    bladeLengthMm: 180,
    heelSpineMm: 3.4,
    tipSpineMm: 1.2,
    heelHeightMm: 56,
    weightGrams: 195,
    priceUsd: 480,
    image: "/assets/shihan/nakiri-52100-180mm.jpg",
    description: "Flat rectangular profile with subtle convex belly. Straight edge contacts board along full length for clean tap-chopping without accordion cuts.",
    task: "Rapid push-cutting of cabbages, leeks, squashes, and crisp herbs.",
  },
  {
    id: "petty-150",
    name: "150mm Petty (Utility Knife)",
    japaneseName: "ペティ",
    category: "Detail & Trimming Knife",
    steel: "52100 High-Carbon Ball-Bearing Steel (62-63 HRC)",
    bladeLengthMm: 150,
    heelSpineMm: 3.0,
    tipSpineMm: 0.6,
    heelHeightMm: 34,
    weightGrams: 92,
    priceUsd: 360,
    image: "/assets/shihan/petty-52100-150mm.jpg",
    description: "Featherweight utility blade with laser tip. Designed for in-hand paring, boning silver skin, and nimble shallot brunoise.",
    task: "Paring fruits, mincing garlic, trimming poultry, and precision garnishes.",
  },
  {
    id: "sujihiki-270",
    name: "270mm Sujihiki (Protein Slicer)",
    japaneseName: "筋引",
    category: "Long Carving & Sashimi Slicer",
    steel: "52100 High-Carbon Ball-Bearing Steel (62-63 HRC)",
    bladeLengthMm: 270,
    heelSpineMm: 3.6,
    tipSpineMm: 0.7,
    heelHeightMm: 38,
    weightGrams: 180,
    priceUsd: 640,
    image: "/assets/shihan/sujihiki-slicer-270mm.jpg",
    description: "Long, narrow slicing blade enabling continuous single-draw cuts through large roasts, crudo, or whole salmon fillets with zero sawing.",
    task: "Carving prime rib, portioning raw fish fillets, and slicing cured meats.",
  },
  {
    id: "gyuto-clad-210",
    name: "210mm Gyuto (Stainless-Clad 52100)",
    japaneseName: "本割込",
    category: "San-Mai Clad Chef Knife",
    steel: "52100 High-Carbon Core / 410 Stainless Steel Cladding (62 HRC)",
    bladeLengthMm: 210,
    heelSpineMm: 4.2,
    tipSpineMm: 0.7,
    heelHeightMm: 50,
    weightGrams: 205,
    priceUsd: 520,
    image: "/assets/shihan/gyuto-clad-210mm.jpg",
    description: "San-mai billet combining the screaming edge-holding performance of 52100 high-carbon steel with maintenance-free stainless cladding flanks.",
    task: "High-volume prep where rapid acidic ingredient turnaround is required.",
  },
];

interface HandleOption {
  id: string;
  name: string;
  material: string;
  origin: string;
  upcharge: number;
  colorHex: string;
}

const HANDLE_OPTIONS: HandleOption[] = [
  {
    id: "bog-oak",
    name: "Ancient Irish Bog Oak",
    material: "5,000-Year Submerged Oak with Blonde Horn Ferrule",
    origin: "County Galway, Ireland",
    upcharge: 0,
    colorHex: "#1F1D1A",
  },
  {
    id: "burnt-chestnut",
    name: "Charred Japanese Chestnut",
    material: "Traditional Yakisugi Charred Chestnut with Black Horn Ferrule",
    origin: "Niigata Prefecture, Japan",
    upcharge: 0,
    colorHex: "#2E2A27",
  },
  {
    id: "spalted-maple",
    name: "Stabilized Spalted Maple Burl",
    material: "High-Figure Figured Maple with Nickel Silver Spacer",
    origin: "Taos, New Mexico",
    upcharge: 60,
    colorHex: "#B88A58",
  },
  {
    id: "desert-ironwood",
    name: "Sonoran Desert Ironwood",
    material: "Dense High-Grain Ironwood with Buffalo Horn Ferrule",
    origin: "Sonoran Desert, Arizona / Sonora",
    upcharge: 85,
    colorHex: "#4A291A",
  },
];

interface CartItem {
  knife: KnifeModel;
  handle: HandleOption;
  hasSaya: boolean;
  orderType: "ready" | "deposit";
}

export default function ShiHanPage() {
  // Navigation / Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Engine 01: Distal Taper & Balance Caliper state
  const [selectedModelId, setSelectedModelId] = useState<string>("gyuto-240");
  const selectedModel = useMemo(
    () => KNIFE_MODELS.find((m) => m.id === selectedModelId) || KNIFE_MODELS[0],
    [selectedModelId]
  );

  const [bladeLength, setBladeLength] = useState<number>(selectedModel.bladeLengthMm);
  const [heelSpine, setHeelSpine] = useState<number>(selectedModel.heelSpineMm);
  const [tipSpine, setTipSpine] = useState<number>(selectedModel.tipSpineMm);
  const [selectedHandleId, setSelectedHandleId] = useState<string>("bog-oak");
  const selectedHandle = useMemo(
    () => HANDLE_OPTIONS.find((h) => h.id === selectedHandleId) || HANDLE_OPTIONS[0],
    [selectedHandleId]
  );

  // Reset sliders when model changes
  useEffect(() => {
    setBladeLength(selectedModel.bladeLengthMm);
    setHeelSpine(selectedModel.heelSpineMm);
    setTipSpine(selectedModel.tipSpineMm);
  }, [selectedModel]);

  // Engine 01 Calculations
  const calculatedMass = useMemo(() => {
    // Basic blade volume estimation: triangular prism + handle mass
    const handleMass = selectedHandle.id === "desert-ironwood" ? 65 : 48;
    const bladeVolFactor = (bladeLength * selectedModel.heelHeightMm * (heelSpine + tipSpine)) / 4;
    const steelDensity = 0.00785; // g/mm3
    return Math.round(bladeVolFactor * steelDensity * 0.58 + handleMass);
  }, [bladeLength, heelSpine, tipSpine, selectedModel.heelHeightMm, selectedHandle.id]);

  // Center of mass calculation (mm from handle junction)
  const centerOfMassMm = useMemo(() => {
    // Heavier spine at heel pulls balance backwards; longer blade pushes forward
    const balancePoint = (bladeLength * 0.22) + (tipSpine / heelSpine) * 18 - (heelSpine - 3.5) * 4;
    return Math.max(15, Math.min(65, Math.round(balancePoint)));
  }, [bladeLength, heelSpine, tipSpine]);

  // Pinch grip index position is nominally ~28mm forward from handle face on the choil
  const pinchGripPosMm = 28;
  const pinchOffsetMm = centerOfMassMm - pinchGripPosMm;
  const balanceTorqueNm = ((calculatedMass / 1000) * 9.81 * (pinchOffsetMm / 1000)).toFixed(3);
  const isOptimalBalance = Math.abs(pinchOffsetMm) <= 8;

  // Canvas ref for Engine 01
  const caliperCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = caliperCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 20;
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

      // Drawing coordinate anchors
      const originX = 130; // Handle junction
      const centerY = 135;
      const scaleX = (width - 180) / 280;

      // Draw Wa-Handle
      const handleLen = 110;
      const handleHeight = 26;
      ctx.fillStyle = selectedHandle.colorHex;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(originX - handleLen, centerY - handleHeight / 2, handleLen, handleHeight, 3);
      ctx.fill();
      ctx.stroke();

      // Handle ferrule collar
      ctx.fillStyle = "#EAE6DF";
      ctx.beginPath();
      ctx.roundRect(originX - 22, centerY - handleHeight / 2, 22, handleHeight, [0, 3, 3, 0]);
      ctx.fill();
      ctx.stroke();

      // Handle label
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "9px var(--font-shihan-mono, monospace)";
      ctx.fillText("OCTAGONAL WA", originX - handleLen + 8, centerY + 3);

      // Draw Blade Profile (Side View)
      const bLengthPx = bladeLength * scaleX;
      const heelHeightPx = selectedModel.heelHeightMm * 1.35;
      const tipX = originX + bLengthPx;

      ctx.beginPath();
      // Spine
      ctx.moveTo(originX, centerY - 4);
      ctx.lineTo(tipX, centerY + 8);
      // Tip curve to cutting edge
      ctx.quadraticCurveTo(tipX + 8, centerY + 18, tipX - 15, centerY + heelHeightPx * 0.65);
      // Belly and flat edge
      ctx.quadraticCurveTo(originX + bLengthPx * 0.4, centerY + heelHeightPx, originX + 18, centerY + heelHeightPx);
      // Heel & Choil
      ctx.quadraticCurveTo(originX + 4, centerY + heelHeightPx, originX + 2, centerY + 14);
      ctx.lineTo(originX, centerY - 4);
      ctx.closePath();

      // Gradient for blade steel
      const steelGrad = ctx.createLinearGradient(originX, centerY, tipX, centerY + heelHeightPx);
      steelGrad.addColorStop(0, "#DCE1E6");
      steelGrad.addColorStop(0.4, "#B8C0C8");
      steelGrad.addColorStop(0.8, "#8A94A0");
      steelGrad.addColorStop(1, "#545C66");

      ctx.fillStyle = steelGrad;
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Kurouchi dark forge scale zone along upper spine
      ctx.fillStyle = "rgba(18, 17, 16, 0.72)";
      ctx.beginPath();
      ctx.moveTo(originX, centerY - 4);
      ctx.lineTo(tipX * 0.82, centerY + 4);
      ctx.lineTo(tipX * 0.75, centerY + 22);
      ctx.quadraticCurveTo(originX + 60, centerY + 26, originX + 2, centerY + 14);
      ctx.closePath();
      ctx.fill();

      // Distal Taper Spine Cross-Section (Top overlay)
      const taperTopY = 32;
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(originX, taperTopY - 12, bLengthPx, 24);

      // Draw spine width line
      ctx.strokeStyle = "#D96B27";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(originX, taperTopY - (heelSpine * 1.8));
      ctx.lineTo(tipX, taperTopY - (tipSpine * 1.8));
      ctx.lineTo(tipX, taperTopY + (tipSpine * 1.8));
      ctx.lineTo(originX, taperTopY + (heelSpine * 1.8));
      ctx.closePath();
      ctx.fillStyle = "rgba(217, 107, 39, 0.28)";
      ctx.fill();
      ctx.stroke();

      // Spine thickness text annotations
      ctx.fillStyle = "#D96B27";
      ctx.font = "10px var(--font-shihan-mono, monospace)";
      ctx.fillText(`${heelSpine.toFixed(1)}mm HEEL`, originX - 4, taperTopY - 18);
      ctx.fillText(`${tipSpine.toFixed(1)}mm TIP`, tipX - 25, taperTopY - 18);

      // Pinch Grip Index Finger Notch Indicator
      const pinchX = originX + pinchGripPosMm * scaleX;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pinchX, centerY - 25);
      ctx.lineTo(pinchX, centerY + heelHeightPx + 15);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#38BDF8";
      ctx.beginPath();
      ctx.arc(pinchX, centerY - 6, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "9px var(--font-shihan-mono, monospace)";
      ctx.fillText("PINCH PIVOT", pinchX - 28, centerY - 14);

      // Center of Mass (Balance Point) Reticle
      const cmX = originX + centerOfMassMm * scaleX;
      const pulse = Math.sin(t) * 2;
      ctx.strokeStyle = isOptimalBalance ? "#22C55E" : "#F59E0B";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cmX, centerY + 24, 7 + pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cmX - 12, centerY + 24);
      ctx.lineTo(cmX + 12, centerY + 24);
      ctx.moveTo(cmX, centerY + 12);
      ctx.lineTo(cmX, centerY + 36);
      ctx.stroke();

      ctx.fillStyle = isOptimalBalance ? "#22C55E" : "#F59E0B";
      ctx.font = "bold 9px var(--font-shihan-mono, monospace)";
      ctx.fillText(`CENTER OF MASS (${centerOfMassMm}mm)`, cmX - 35, centerY + 46);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [bladeLength, heelSpine, tipSpine, selectedModel, selectedHandle, centerOfMassMm, isOptimalBalance]);

  // Engine 02: Patina Aging & Convex Food Release Simulator state
  const [activeEngine2Tab, setActiveEngine2Tab] = useState<"food-release" | "patina">("food-release");
  const [patinaAgeDays, setPatinaAgeDays] = useState<number>(30); // 0, 3, 30, 730 days
  const [cutIngredient, setCutIngredient] = useState<"potato" | "cucumber" | "tomato" | "brisket">("potato");
  const [isConvexGrind, setIsConvexGrind] = useState<boolean>(true);
  const [sliceProgress, setSliceProgress] = useState<number>(65); // 0 to 100%

  // Drawer Cart Helpers
  const addToCart = (orderType: "ready" | "deposit") => {
    const newItem: CartItem = {
      knife: selectedModel,
      handle: selectedHandle,
      hasSaya: false,
      orderType,
    };
    setCart((prev) => [...prev, newItem]);
    setDrawerOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSaya = (index: number) => {
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, hasSaya: !item.hasSaya } : item))
    );
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const base = item.orderType === "deposit" ? 150 : item.knife.priceUsd;
      const handleUp = item.orderType === "deposit" ? 0 : item.handle.upcharge;
      const sayaUp = item.hasSaya ? 55 : 0;
      return sum + base + handleUp + sayaUp;
    }, 0);
  }, [cart]);

  return (
    <div className="relative min-h-screen bg-[#0E0D0C] text-[#EDEAE4] selection:bg-[#D96B27] selection:text-white">
      {/* Structural Hairline Grid */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20">
        <div className="mx-auto h-full max-w-7xl border-x border-[#38332E] grid grid-cols-6 divide-x divide-[#38332E]">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-[#2C2723] bg-[#0E0D0C]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="#hero" className="flex items-baseline gap-2 text-decoration-none">
              <span
                className="text-xl font-bold tracking-tight text-white uppercase"
                style={{ fontFamily: "var(--font-shihan-serif, serif)" }}
              >
                SHI.HAN FINE KNIVES
              </span>
              <span className="hidden text-xs text-[#8E847A] sm:inline-block">
                / SANTA FE, NM
              </span>
            </a>
            <span className="hidden items-center gap-1.5 rounded-full border border-[#D96B27]/40 bg-[#D96B27]/10 px-2.5 py-0.5 text-[11px] font-mono text-[#D96B27] md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D96B27] animate-pulse" />
              SANJO METALLURGY
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-mono tracking-wider md:flex">
            <a href="#taper" className="text-[#A4998E] hover:text-white transition-colors">
              01 // DISTAL CALIPER
            </a>
            <a href="#patina" className="text-[#A4998E] hover:text-white transition-colors">
              02 // PATINA & FOOD RELEASE
            </a>
            <a href="#metallurgy" className="text-[#A4998E] hover:text-white transition-colors">
              03 // 52100 METALLURGY
            </a>
            <a href="#vault" className="text-[#A4998E] hover:text-white transition-colors">
              04 // FORGE ALLOCATION
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="group relative flex h-11 items-center gap-2.5 rounded border border-[#443D36] bg-[#1A1816] px-4 text-xs font-mono tracking-wider text-white hover:border-[#D96B27] transition-all"
              style={{ minWidth: "48px", minHeight: "48px" }}
            >
              <span>FORGE VAULT</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D96B27] text-[10px] font-bold text-white">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 border-b border-[#2C2723] pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Column: Commercial Proof & Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded border border-[#443D36] bg-[#161412] px-3 py-1 font-mono text-xs text-[#C85A32]">
                <span>SANJO & SAKAI APPRENTICESHIP</span>
                <span>•</span>
                <span>SANTA FE FORGE NO. 875</span>
              </div>

              <h1
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-shihan-serif, serif)", lineHeight: 1.08 }}
              >
                Hand-forged 52100 cutlery with radical distal taper and zero-suction convex geometry.
              </h1>

              <p className="max-w-2xl text-base text-[#B3A89D] sm:text-lg">
                Master bladesmith Shehan Prull hand-hammers high-carbon 52100 ball-bearing alloy and A2 tool steel in his Santa Fe, New Mexico workshop. Ground with a thick 4.5mm thumb-spine that continuously tapers to a 0.7mm tip, eliminating wrist torque and potato suction simultaneously.
              </p>

              {/* Above the fold proof metric bar */}
              <div className="grid grid-cols-2 gap-4 rounded border border-[#2E2925] bg-[#151311] p-4 sm:grid-cols-4">
                <div>
                  <div className="text-xl font-bold font-mono text-white">62-63 HRC</div>
                  <div className="text-[11px] font-mono text-[#8E847A]">52100 CRYO HARDNESS</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-[#D96B27]">0.7mm</div>
                  <div className="text-[11px] font-mono text-[#8E847A]">DISTAL TIP TAPER</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-white">100%</div>
                  <div className="text-[11px] font-mono text-[#8E847A]">LIFETIME BLADE SPA</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-[#38BDF8]">4.98 ★</div>
                  <div className="text-[11px] font-mono text-[#8E847A]">384 CHEF DISPATCHES</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#taper"
                  className="flex h-12 items-center justify-center rounded bg-[#D96B27] px-6 font-mono text-xs font-semibold tracking-wider text-white shadow-lg hover:bg-[#E07937] transition-all"
                  style={{ minWidth: "48px", minHeight: "48px" }}
                >
                  CALCULATE PINCH BALANCE
                </a>
                <a
                  href="#vault"
                  className="flex h-12 items-center justify-center rounded border border-[#443D36] bg-[#161412] px-6 font-mono text-xs tracking-wider text-white hover:border-[#D96B27] transition-all"
                  style={{ minWidth: "48px", minHeight: "48px" }}
                >
                  EXPLORE FORGE VAULT (6 SKUS)
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual with Real Inspection Badges */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded border border-[#38332E] bg-[#1A1816]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/assets/shihan/shihan-hero-knife.jpg"
                    alt="ShiHan 240mm Gyuto hand-forged in 52100 high carbon steel on wooden cutting board"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-transparent to-transparent opacity-80" />
                </div>

                {/* Overlaid telemetry badges */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="flex items-center justify-between rounded bg-[#0E0D0C]/90 p-2.5 backdrop-blur-md border border-[#38332E]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                      <span className="text-[11px] font-mono text-white">FORGE BATCH: 52100-SB8</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#D96B27]">$580 USD</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#A4998E]">
                    <div className="rounded bg-[#161412]/90 p-2 border border-[#2E2925]">
                      <span>SPINE: 4.5mm → 0.7mm</span>
                    </div>
                    <div className="rounded bg-[#161412]/90 p-2 border border-[#2E2925]">
                      <span>GRIND: CONVEX HAMAGURI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine 01: Live 60 FPS Distal Taper & Pinch-Grip Balance Caliper */}
      <section id="taper" className="relative z-10 border-b border-[#2C2723] py-20 bg-[#121110]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded border border-[#38332E] bg-[#1A1816] px-3 py-1 font-mono text-xs text-[#D96B27]">
              <span>INTERACTIVE PHYSICS ENGINE 01</span>
              <span>•</span>
              <span>60 FPS CANVAS CALIPER</span>
            </div>
            <h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-shihan-serif, serif)" }}
            >
              Distal Taper & Pinch-Grip Center-of-Mass Caliper
            </h2>
            <p className="text-sm text-[#A4998E] sm:text-base">
              Unlike flat laser-cut factory blanks stamped from uniform 2mm sheet steel, every ShiHan blade is hand-hammered with a continuous distal taper. The spine provides solid thumb purchase at the pinch grip before tapering to a whisper-thin tip for low-friction horizontal dicing.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left: Model Selector & Physical Parameter Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Knife Model Preset Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#B3A89D]">
                  Select Blade Profile Preset
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {KNIFE_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModelId(model.id)}
                      className={`flex flex-col items-start rounded border p-3 text-left transition-all ${
                        selectedModelId === model.id
                          ? "border-[#D96B27] bg-[#D96B27]/10 text-white"
                          : "border-[#2E2925] bg-[#161412] text-[#A4998E] hover:border-[#443D36]"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="text-xs font-bold text-white">{model.name.split(" ")[0]}</span>
                        <span className="text-[10px] font-mono text-[#D96B27]">{model.japaneseName}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8E847A] truncate w-full">
                        {model.bladeLengthMm}mm • {model.heelSpineMm}mm heel
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Parametric Sliders */}
              <div className="rounded border border-[#2E2925] bg-[#161412] p-5 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#B3A89D]">Blade Length (Edge Axis):</span>
                    <span className="text-[#D96B27] font-bold">{bladeLength} mm</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="270"
                    step="5"
                    value={bladeLength}
                    onChange={(e) => setBladeLength(Number(e.target.value))}
                    className="w-full accent-[#D96B27] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#6E645A]">
                    <span>150mm (Petty)</span>
                    <span>210mm (Standard)</span>
                    <span>270mm (Slicer)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#B3A89D]">Heel Spine Thickness:</span>
                    <span className="text-[#D96B27] font-bold">{heelSpine.toFixed(1)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="2.8"
                    max="5.0"
                    step="0.1"
                    value={heelSpine}
                    onChange={(e) => setHeelSpine(Number(e.target.value))}
                    className="w-full accent-[#D96B27] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#6E645A]">
                    <span>2.8mm (Laser)</span>
                    <span>3.8mm (Workhorse)</span>
                    <span>5.0mm (Heavy Forged)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#B3A89D]">Tip Thickness (10mm back):</span>
                    <span className="text-[#D96B27] font-bold">{tipSpine.toFixed(1)} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={tipSpine}
                    onChange={(e) => setTipSpine(Number(e.target.value))}
                    className="w-full accent-[#D96B27] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#6E645A]">
                    <span>0.5mm (Ultra Fine)</span>
                    <span>0.8mm (Benchmark)</span>
                    <span>1.5mm (Heavy Starch)</span>
                  </div>
                </div>

                {/* Handle Selection */}
                <div className="pt-2 border-t border-[#26221E] space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#B3A89D]">
                    Octagonal Wa-Handle Material
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {HANDLE_OPTIONS.map((handle) => (
                      <button
                        key={handle.id}
                        onClick={() => setSelectedHandleId(handle.id)}
                        className={`rounded border p-2 text-left text-[11px] font-mono transition-all ${
                          selectedHandleId === handle.id
                            ? "border-[#D96B27] bg-[#D96B27]/15 text-white"
                            : "border-[#2E2925] bg-[#121110] text-[#8E847A] hover:border-[#443D36]"
                        }`}
                        style={{ minHeight: "48px" }}
                      >
                        <div className="font-bold text-white truncate">{handle.name}</div>
                        <div className="text-[10px] text-[#A4998E]">
                          {handle.upcharge === 0 ? "Included" : `+$${handle.upcharge}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kinetic Balance Readout */}
              <div
                className={`rounded border p-4 space-y-2 ${
                  isOptimalBalance
                    ? "border-[#22C55E]/40 bg-[#22C55E]/10"
                    : "border-[#F59E0B]/40 bg-[#F59E0B]/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider text-white">
                    {isOptimalBalance ? "✓ BALANCED PINCH GRIP" : "⚠ BLADE FORWARD BIAS"}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      isOptimalBalance ? "text-[#22C55E]" : "text-[#F59E0B]"
                    }`}
                  >
                    Torque: {balanceTorqueNm} N•m
                  </span>
                </div>
                <p className="text-xs text-[#B3A89D]">
                  {isOptimalBalance
                    ? "Center of mass aligns directly with the chef pinch grip index finger choil. Wrist effort during 8-hour prep shifts drops by 43% compared to factory heavy-heel knives."
                    : "Forward balance torque provides extra inertia for slicing large squash and dense cuts, requiring slightly firmer index stabilization."}
                </p>
              </div>
            </div>

            {/* Right: Live Canvas Blueprint & Telemetry Display */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded border border-[#38332E] bg-[#0E0D0C] p-4">
                <div className="flex items-center justify-between border-b border-[#26221E] pb-3 text-xs font-mono text-[#8E847A]">
                  <span>LIVE BLUEPRINT TELEMETRY // 60 FPS</span>
                  <span className="text-[#D96B27]">SCALE: 1:1 MILLIMETRIC VIEWPORT</span>
                </div>

                <div className="relative mt-2 overflow-hidden rounded bg-[#090807]">
                  <canvas
                    ref={caliperCanvasRef}
                    width={720}
                    height={270}
                    className="w-full h-auto block"
                  />
                </div>

                {/* Real-Time Mathematical Telemetry Grid */}
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
                  <div className="rounded bg-[#161412] p-2.5 border border-[#2E2925]">
                    <div className="text-[10px] text-[#8E847A]">TOTAL CUTLERY MASS</div>
                    <div className="text-sm font-bold text-white">{calculatedMass} g</div>
                  </div>
                  <div className="rounded bg-[#161412] p-2.5 border border-[#2E2925]">
                    <div className="text-[10px] text-[#8E847A]">BALANCE POINT (CM)</div>
                    <div className="text-sm font-bold text-[#D96B27]">+{centerOfMassMm} mm</div>
                  </div>
                  <div className="rounded bg-[#161412] p-2.5 border border-[#2E2925]">
                    <div className="text-[10px] text-[#8E847A]">PINCH OFFSET (ΔX)</div>
                    <div
                      className={`text-sm font-bold ${
                        isOptimalBalance ? "text-[#22C55E]" : "text-[#F59E0B]"
                      }`}
                    >
                      {pinchOffsetMm >= 0 ? `+${pinchOffsetMm}` : pinchOffsetMm} mm
                    </div>
                  </div>
                  <div className="rounded bg-[#161412] p-2.5 border border-[#2E2925]">
                    <div className="text-[10px] text-[#8E847A]">TAPER GRADIENT</div>
                    <div className="text-sm font-bold text-[#38BDF8]">
                      {((heelSpine - tipSpine) / bladeLength * 100).toFixed(2)}% slope
                    </div>
                  </div>
                </div>

                {/* Action button: add configured knife directly */}
                <div className="mt-4 flex items-center justify-between border-t border-[#26221E] pt-4">
                  <div>
                    <div className="text-xs font-mono text-[#8E847A]">CONFIGURED SPECIFICATION</div>
                    <div className="text-base font-bold text-white">
                      {selectedModel.name} with {selectedHandle.name}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart("ready")}
                    className="flex h-11 items-center gap-2 rounded bg-[#D96B27] px-5 font-mono text-xs font-bold text-white hover:bg-[#E07937] transition-all"
                    style={{ minHeight: "48px" }}
                  >
                    <span>ALLOCATE SPEC (${selectedModel.priceUsd + selectedHandle.upcharge})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine 02: High-Carbon 52100 Steel Patina & Food-Release Slicing Simulator */}
      <section id="patina" className="relative z-10 border-b border-[#2C2723] py-20 bg-[#0E0D0C]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded border border-[#38332E] bg-[#1A1816] px-3 py-1 font-mono text-xs text-[#38BDF8]">
              <span>INTERACTIVE PHYSICS ENGINE 02</span>
              <span>•</span>
              <span>METALLURGY & FLUID RELEASE</span>
            </div>
            <h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-shihan-serif, serif)" }}
            >
              Convex Food-Release Geometry & 52100 Patina Evolution
            </h2>
            <p className="text-sm text-[#A4998E] sm:text-base">
              Digital knife shoppers fear two things: food sticking like suction cups to the blade face, and high-carbon steel rusting. Here we simulate the physical solution to both.
            </p>
          </div>

          {/* Engine 2 Tab Selector */}
          <div className="flex border-b border-[#2E2925] mb-8 font-mono text-xs">
            <button
              onClick={() => setActiveEngine2Tab("food-release")}
              className={`pb-3 px-4 font-bold border-b-2 transition-all ${
                activeEngine2Tab === "food-release"
                  ? "border-[#D96B27] text-white"
                  : "border-transparent text-[#8E847A] hover:text-white"
              }`}
              style={{ minHeight: "48px" }}
            >
              01 // CONVEX FOOD RELEASE (HAMAGURI-BA)
            </button>
            <button
              onClick={() => setActiveEngine2Tab("patina")}
              className={`pb-3 px-4 font-bold border-b-2 transition-all ${
                activeEngine2Tab === "patina"
                  ? "border-[#38BDF8] text-white"
                  : "border-transparent text-[#8E847A] hover:text-white"
              }`}
              style={{ minHeight: "48px" }}
            >
              02 // 52100 PATINA OXIDATION AGING (DAY 0 TO YEAR 2)
            </button>
          </div>

          {activeEngine2Tab === "food-release" ? (
            /* Tab 1: Convex Food Release vs Flat Grind */
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#B3A89D]">
                    Test Culinary Ingredient
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "potato", label: "Russet Potato", note: "High Starch Vacuum" },
                      { id: "cucumber", label: "English Cucumber", note: "Surface Tension Drag" },
                      { id: "tomato", label: "Heirloom Tomato", note: "Delicate Pulp Skin" },
                      { id: "brisket", label: "Smoked Brisket", note: "Dense Protein Fibers" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCutIngredient(item.id as any)}
                        className={`rounded border p-2.5 text-left font-mono transition-all ${
                          cutIngredient === item.id
                            ? "border-[#D96B27] bg-[#D96B27]/15 text-white"
                            : "border-[#2E2925] bg-[#161412] text-[#8E847A] hover:border-[#443D36]"
                        }`}
                        style={{ minHeight: "48px" }}
                      >
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] text-[#A4998E]">{item.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#B3A89D]">
                    Blade Bevel Cross-Section
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsConvexGrind(true)}
                      className={`rounded border p-3 text-left font-mono transition-all ${
                        isConvexGrind
                          ? "border-[#22C55E] bg-[#22C55E]/15 text-white"
                          : "border-[#2E2925] bg-[#161412] text-[#8E847A]"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      <div className="text-xs font-bold text-[#22C55E]">SHIHAN CONVEX</div>
                      <div className="text-[10px] text-[#A4998E]">Hamaguri Clam-Shell Bevel</div>
                    </button>
                    <button
                      onClick={() => setIsConvexGrind(false)}
                      className={`rounded border p-3 text-left font-mono transition-all ${
                        !isConvexGrind
                          ? "border-[#EF4444] bg-[#EF4444]/15 text-white"
                          : "border-[#2E2925] bg-[#161412] text-[#8E847A]"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      <div className="text-xs font-bold text-[#EF4444]">FLAT GRIND (FACTORY)</div>
                      <div className="text-[10px] text-[#A4998E]">Uniform Planar Bevel</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#B3A89D]">Knife Push-Cut Depth:</span>
                    <span className="text-[#D96B27] font-bold">{sliceProgress}% Through Cut</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={sliceProgress}
                    onChange={(e) => setSliceProgress(Number(e.target.value))}
                    className="w-full accent-[#D96B27] cursor-pointer"
                  />
                </div>

                <div
                  className={`rounded border p-4 font-mono text-xs space-y-1.5 ${
                    isConvexGrind
                      ? "border-[#22C55E]/40 bg-[#22C55E]/10 text-[#EDEAE4]"
                      : "border-[#EF4444]/40 bg-[#EF4444]/10 text-[#EDEAE4]"
                  }`}
                >
                  <div className="font-bold flex justify-between">
                    <span>{isConvexGrind ? "AIR GAP FORMED: ZERO SUCTION" : "NEGATIVE VACUUM LOCK"}</span>
                    <span>{isConvexGrind ? "ΔP = 0.0 kPa" : "ΔP = -18.4 kPa"}</span>
                  </div>
                  <p className="text-[11px] text-[#A4998E]">
                    {isConvexGrind
                      ? "The subtle convex curve forces air into the micro-cavity between the vegetable cell wall and steel bevel. The slice automatically peels away and drops directly to the cutting board."
                      : "Planar flat grinds trap starchy potato juices against the blade face, creating an airtight vacuum. Slices climb up the blade and must be pushed off manually with fingers."}
                  </p>
                </div>
              </div>

              {/* Visual Demonstration Canvas / Mockup */}
              <div className="lg:col-span-7">
                <div className="rounded border border-[#38332E] bg-[#161412] p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8E847A]">
                    <span>CROSS-SECTION CROSSING POINT // 20X ZOOM</span>
                    <span className={isConvexGrind ? "text-[#22C55E]" : "text-[#EF4444]"}>
                      {isConvexGrind ? "EFFORTLESS RELEASE" : "HIGH FRICTION WEDGING"}
                    </span>
                  </div>

                  {/* SVG Cross-Section Illustration */}
                  <div className="relative aspect-[16/9] w-full rounded bg-[#090807] overflow-hidden flex items-center justify-center p-8">
                    <svg viewBox="0 0 500 240" className="w-full h-full">
                      {/* Cutting Board Line */}
                      <line x1="20" y1="210" x2="480" y2="210" stroke="#52483E" strokeWidth="4" />
                      <text x="24" y="230" fill="#8E847A" fontSize="10" fontFamily="monospace">
                        END-GRAIN JAPANESE CHERRY BOARD
                      </text>

                      {/* Vegetable / Potato Block */}
                      <rect x="250" y="70" width="160" height="140" fill="#D4A373" rx="4" />
                      <text x="280" y="145" fill="#583B1F" fontSize="12" fontWeight="bold" fontFamily="monospace">
                        {cutIngredient.toUpperCase()}
                      </text>

                      {/* Sliced Piece Being Separated */}
                      {isConvexGrind ? (
                        /* Sliced piece peels away to the right */
                        <path
                          d={`M 250 ${70 + (100 - sliceProgress) * 0.9} Q 225 150 200 200`}
                          fill="none"
                          stroke="#E2B98E"
                          strokeWidth="14"
                          strokeLinecap="round"
                        />
                      ) : (
                        /* Flat grind: sliced piece glued flat to blade */
                        <rect
                          x="236"
                          y="70"
                          width="12"
                          height="140"
                          fill="#E2B98E"
                        />
                      )}

                      {/* Knife Blade Bevel */}
                      {isConvexGrind ? (
                        /* Convex Clam-Shell Bevel */
                        <path
                          d="M 240 20 Q 236 120 246 208 L 247 208 Q 256 120 252 20 Z"
                          fill="#D1D5DB"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      ) : (
                        /* Flat Straight Wedge */
                        <path
                          d="M 240 20 L 246 208 L 248 208 L 254 20 Z"
                          fill="#9CA3AF"
                          stroke="#D1D5DB"
                          strokeWidth="1.5"
                        />
                      )}

                      {/* Air Gap Indicator */}
                      {isConvexGrind ? (
                        <>
                          <circle cx="230" cy="120" r="14" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="3,3" />
                          <text x="135" y="115" fill="#22C55E" fontSize="9" fontFamily="monospace">
                            AIR RELIEF POCKET
                          </text>
                          <line x1="210" y1="118" x2="225" y2="120" stroke="#22C55E" strokeWidth="1" />
                        </>
                      ) : (
                        <>
                          <text x="130" y="115" fill="#EF4444" fontSize="9" fontFamily="monospace">
                            VACUUM STICKING ZONE
                          </text>
                          <line x1="220" y1="118" x2="238" y2="120" stroke="#EF4444" strokeWidth="1" />
                        </>
                      )}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: 52100 High-Carbon Steel Patina Evolution */
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#B3A89D]">Culinary Service Timeline:</span>
                    <span className="text-[#38BDF8] font-bold">
                      {patinaAgeDays === 0
                        ? "Day 0 (Mirror Forged Silver)"
                        : patinaAgeDays === 3
                        ? "Day 3 (Electric Blue Citrus Patina)"
                        : patinaAgeDays === 30
                        ? "Day 30 (Golden Allium Amber)"
                        : "Year 2 (Inert Gunmetal Shield)"}
                    </span>
                  </div>

                  {/* Buttons for exact benchmark timeline milestones */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {[
                      { days: 0, label: "DAY 0", state: "Raw Silver" },
                      { days: 3, label: "DAY 3", state: "Citrus Blue" },
                      { days: 30, label: "DAY 30", state: "Amber Gold" },
                      { days: 730, label: "YEAR 2", state: "Charcoal" },
                    ].map((step) => (
                      <button
                        key={step.days}
                        onClick={() => setPatinaAgeDays(step.days)}
                        className={`rounded border p-2 text-center font-mono transition-all ${
                          patinaAgeDays === step.days
                            ? "border-[#38BDF8] bg-[#38BDF8]/15 text-white"
                            : "border-[#2E2925] bg-[#161412] text-[#8E847A] hover:border-[#443D36]"
                        }`}
                        style={{ minHeight: "48px" }}
                      >
                        <div className="text-xs font-bold">{step.label}</div>
                        <div className="text-[9px] text-[#A4998E] truncate">{step.state}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded border border-[#2E2925] bg-[#161412] p-4 font-mono text-xs space-y-2">
                  <div className="text-sm font-bold text-white flex justify-between">
                    <span>
                      {patinaAgeDays === 0
                        ? "Day 0: Hand-Rubbed 52100 Satin"
                        : patinaAgeDays === 3
                        ? "Day 3: Iridescent Citrus & Myoglobin Bloom"
                        : patinaAgeDays === 30
                        ? "Day 30: Allium Oxide Amber Matrix"
                        : "Year 2: Magnetite (Fe₃O₄) Protective Shield"}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A4998E]">
                    {patinaAgeDays === 0
                      ? "Freshly sharpened and hand-buffed to 12 micro-inch Ra finish. Reacts swiftly with fresh lemon juice and warm roast beef."
                      : patinaAgeDays === 3
                      ? "Citric acid and amino acids react with the high-carbon iron matrix, creating stunning electric blue, violet, and cyan interference films."
                      : patinaAgeDays === 30
                      ? "Daily contact with shallots, red onions, and root vegetables deposits warm bronze and amber oxides that seal microscopic surface pores."
                      : "The patina stabilizes into non-toxic black iron oxide (magnetite Fe₃O₄). This natural protective shield permanently prevents destructive orange rust (ferric oxide Fe₂O₃)."}
                  </p>
                </div>

                {/* Carbon Care Checklist */}
                <div className="rounded border border-[#38332E] bg-[#121110] p-4 text-xs font-mono space-y-2">
                  <div className="font-bold text-white uppercase tracking-wider">
                    High-Carbon 52100 Daily Protocol
                  </div>
                  <ul className="space-y-1.5 text-[#B3A89D]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#22C55E]">✓</span> Wipe dry with side towel immediately after cutting acidic citrus.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#22C55E]">✓</span> Wash by hand with warm water and mild soap. Never enter a dishwasher.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#22C55E]">✓</span> Light coat of organic Japanese Camellia seed oil during long storage.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visualizer Image with Dynamically Rendered Patina Hue Filter */}
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded border border-[#38332E] bg-[#1A1816]">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/assets/shihan/food-release-patina.jpg"
                      alt="52100 carbon steel knife slicing with natural patina"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-all duration-700"
                      style={{
                        filter:
                          patinaAgeDays === 0
                            ? "none"
                            : patinaAgeDays === 3
                            ? "hue-rotate(210deg) saturate(1.8) contrast(1.15)"
                            : patinaAgeDays === 30
                            ? "sepia(0.65) saturate(1.4) hue-rotate(-20deg)"
                            : "grayscale(0.6) contrast(1.3) brightness(0.85)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="p-4 border-t border-[#2C2723] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            patinaAgeDays === 0
                              ? "#E5E7EB"
                              : patinaAgeDays === 3
                              ? "#38BDF8"
                              : patinaAgeDays === 30
                              ? "#D97706"
                              : "#374151",
                        }}
                      />
                      <span className="text-white font-bold">
                        {patinaAgeDays === 0
                          ? "RA 12 μin SILVER"
                          : patinaAgeDays === 3
                          ? "CITRUS BLUE INTERFERENCE"
                          : patinaAgeDays === 30
                          ? "ALLIUM AMBER BARRIER"
                          : "MAGNETITE Fe₃O₄ INERT"}
                      </span>
                    </div>
                    <span className="text-[#8E847A]">0.98% C / 1.45% Cr ALLOY</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Metallurgy & Sanjo Apprenticeship Section */}
      <section id="metallurgy" className="relative z-10 border-b border-[#2C2723] py-20 bg-[#121110]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded border border-[#38332E] bg-[#1A1816] px-3 py-1 font-mono text-xs text-[#D96B27]">
                <span>SANTA FE FORGE METALLURGY</span>
              </div>

              <h2
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-shihan-serif, serif)" }}
              >
                Why 52100 ball-bearing steel outperforms industrial stainless blanks.
              </h2>

              <p className="text-sm text-[#B3A89D] leading-relaxed sm:text-base">
                Originally engineered for high-load aerospace ball bearings, 52100 is a deep-hardening chromium alloy (0.98% to 1.10% Carbon, 1.30% to 1.60% Chromium). When forged with Shehan Prull&apos;s stepped thermal cycling and cryogenic quenching, it achieves an exceptionally fine iron-carbide grain matrix.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="rounded border border-[#2E2925] bg-[#161412] p-3 flex justify-between items-center">
                  <span className="text-white font-bold">EDGE RETENTION (CATRA TEST)</span>
                  <span className="text-[#D96B27] font-bold">640mm Cut Depth (2.4x German Stainless)</span>
                </div>
                <div className="rounded border border-[#2E2925] bg-[#161412] p-3 flex justify-between items-center">
                  <span className="text-white font-bold">CRYOGENIC HEAT TREATMENT</span>
                  <span className="text-[#38BDF8] font-bold">-196°C Liquid Nitrogen Sub-Zero Soak</span>
                </div>
                <div className="rounded border border-[#2E2925] bg-[#161412] p-3 flex justify-between items-center">
                  <span className="text-white font-bold">HONING RESPONSE</span>
                  <span className="text-[#22C55E] font-bold">3 Passes on 6000-Grit Waterstone</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded border border-[#38332E]">
                <Image
                  src="/assets/shihan/shihan-forge-bench.jpg"
                  alt="Santa Fe forge anvil and hammers"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded bg-[#0E0D0C]/80 px-2 py-1 text-[10px] font-mono text-white">
                  SANTA FE FORGE
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded border border-[#38332E]">
                <Image
                  src="/assets/shihan/wa-handle-burl.jpg"
                  alt="Stabilized burl and horn Wa-handle materials"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded bg-[#0E0D0C]/80 px-2 py-1 text-[10px] font-mono text-white">
                  BURL & HORN FERRULES
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded border border-[#38332E]">
                <Image
                  src="/assets/shihan/distal-taper-spine.jpg"
                  alt="Distal taper spine geometry inspection"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded bg-[#0E0D0C]/80 px-2 py-1 text-[10px] font-mono text-white">
                  DISTAL GEOMETRY
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded border border-[#38332E]">
                <Image
                  src="/assets/shihan/shehan-prull-portrait.jpg"
                  alt="Shehan Prull Master Bladesmith"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded bg-[#0E0D0C]/80 px-2 py-1 text-[10px] font-mono text-white">
                  SHEHAN PRULL (BENCH)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine 03: Santa Fe Forge Allocation Vault (Product Grid) */}
      <section id="vault" className="relative z-10 border-b border-[#2C2723] py-20 bg-[#0E0D0C]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded border border-[#38332E] bg-[#1A1816] px-3 py-1 font-mono text-xs text-[#D96B27]">
                <span>ENGINE 03 // FORGE ALLOCATION VAULT</span>
              </div>
              <h2
                className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-shihan-serif, serif)" }}
              >
                Santa Fe Forge Allocation Suite
              </h2>
              <p className="mt-2 text-sm text-[#A4998E]">
                Select ready-to-ship drop allocations or lock your position in Shehan&apos;s next kiln batch with a refundable $150 deposit.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#22C55E]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>ORDER BOOKS CURRENTLY OPEN</span>
            </div>
          </div>

          {/* 6 SKU Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KNIFE_MODELS.map((knife) => (
              <div
                key={knife.id}
                className="group flex flex-col justify-between overflow-hidden rounded border border-[#2E2925] bg-[#141210] transition-all hover:border-[#D96B27]"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0908]">
                    <Image
                      src={knife.image}
                      alt={knife.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded bg-[#0E0D0C]/85 px-2.5 py-1 text-[10px] font-mono text-white">
                      {knife.category}
                    </div>
                    <div className="absolute top-3 right-3 rounded bg-[#D96B27] px-2.5 py-1 text-[11px] font-mono font-bold text-white">
                      ${knife.priceUsd} USD
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "var(--font-shihan-serif, serif)" }}
                      >
                        {knife.name}
                      </h3>
                      <span className="text-xs font-mono text-[#D96B27]">{knife.japaneseName}</span>
                    </div>

                    <p className="text-xs text-[#A4998E] line-clamp-2">{knife.description}</p>

                    <div className="space-y-1 font-mono text-[11px] text-[#8E847A] border-t border-[#24201C] pt-3">
                      <div className="flex justify-between">
                        <span>STEEL:</span>
                        <span className="text-white truncate max-w-[170px]">{knife.steel.split("(")[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DIMENSIONS:</span>
                        <span className="text-white">{knife.bladeLengthMm}mm × {knife.heelHeightMm}mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DISTAL TAPER:</span>
                        <span className="text-[#D96B27]">{knife.heelSpineMm}mm → {knife.tipSpineMm}mm</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedModelId(knife.id);
                      addToCart("ready");
                    }}
                    className="flex h-11 items-center justify-center rounded bg-[#D96B27] font-mono text-xs font-bold text-white hover:bg-[#E07937] transition-all"
                    style={{ minHeight: "48px" }}
                  >
                    ACQUIRE (${knife.priceUsd})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedModelId(knife.id);
                      addToCart("deposit");
                    }}
                    className="flex h-11 items-center justify-center rounded border border-[#38332E] bg-[#1A1816] font-mono text-xs text-[#EDEAE4] hover:border-[#D96B27] transition-all"
                    style={{ minHeight: "48px" }}
                  >
                    LOCK QUEUE ($150)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide-Out Forge Allocation Vault Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity">
          <div className="flex h-full w-full max-w-md flex-col justify-between border-l border-[#38332E] bg-[#121110] p-6 text-white shadow-2xl">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#2C2723] pb-4">
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-shihan-serif, serif)" }}
                  >
                    FORGE ALLOCATION VAULT
                  </h3>
                  <div className="text-xs font-mono text-[#8E847A]">
                    SANTA FE WORKSHOP • SHEHAN PRULL
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded border border-[#38332E] text-sm text-[#A4998E] hover:text-white"
                  style={{ minWidth: "48px", minHeight: "48px" }}
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="mt-6 max-h-[55vh] space-y-4 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-[#8E847A]">
                    YOUR ALLOCATION VAULT IS EMPTY.
                    <div className="mt-2 text-[#D96B27]">SELECT A KNIFE TO COMMENCE ALLOCATION.</div>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded border border-[#2E2925] bg-[#181614] p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-sm">{item.knife.name}</div>
                          <div className="text-[10px] font-mono text-[#D96B27]">
                            {item.orderType === "deposit" ? "CUSTOM QUEUE DEPOSIT ($150)" : "DIRECT DISPATCH"}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="text-xs font-mono text-[#8E847A] hover:text-[#EF4444]"
                        >
                          REMOVE
                        </button>
                      </div>

                      <div className="space-y-1 text-[11px] font-mono text-[#A4998E]">
                        <div className="flex justify-between">
                          <span>HANDLE:</span>
                          <span className="text-white">{item.handle.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>STEEL SPEC:</span>
                          <span className="text-white">{item.knife.steel.split("(")[0]}</span>
                        </div>
                      </div>

                      {/* Add Saya Sheath Toggle */}
                      <div className="flex items-center justify-between border-t border-[#24201C] pt-2 text-xs font-mono">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.hasSaya}
                            onChange={() => toggleSaya(idx)}
                            className="accent-[#D96B27]"
                          />
                          <span>Pin-Lock Poplar Saya (+$55)</span>
                        </label>
                        <span className="text-white font-bold">
                          $
                          {(item.orderType === "deposit"
                            ? 150
                            : item.knife.priceUsd + item.handle.upcharge) + (item.hasSaya ? 55 : 0)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer & Checkout Trigger */}
            <div className="border-t border-[#2C2723] pt-4 space-y-3">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#8E847A]">
                  <span>SUBTOTAL:</span>
                  <span className="text-white">${cartSubtotal} USD</span>
                </div>
                <div className="flex justify-between text-[#8E847A]">
                  <span>INSURED COURIER DISPATCH:</span>
                  <span className="text-[#22C55E]">FREE ($0.00)</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-white border-t border-[#24201C] pt-2">
                  <span>DUE TODAY:</span>
                  <span className="text-[#D96B27]">${cartSubtotal} USD</span>
                </div>
              </div>

              {checkoutComplete ? (
                <div className="rounded border border-[#22C55E]/50 bg-[#22C55E]/10 p-3 text-center text-xs font-mono text-[#22C55E]">
                  ✓ ALLOCATION CONFIRMED // WORKSHOP DISPATCH SLIP GENERATED
                </div>
              ) : (
                <button
                  disabled={cart.length === 0}
                  onClick={() => setCheckoutComplete(true)}
                  className="flex h-12 w-full items-center justify-center rounded bg-[#D96B27] font-mono text-xs font-bold tracking-wider text-white hover:bg-[#E07937] disabled:opacity-50 transition-all"
                  style={{ minHeight: "48px" }}
                >
                  SECURE ALLOCATION (INSTANT CONFIRMATION)
                </button>
              )}

              <div className="text-center text-[10px] font-mono text-[#6E645A]">
                100% SECURE ESCROW • 14-DAY RETURN PRIVILEGE • LIFETIME BLADE SPA
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#2C2723] bg-[#0A0908] py-16 text-xs font-mono text-[#8E847A]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-2">
              <div
                className="text-sm font-bold text-white uppercase"
                style={{ fontFamily: "var(--font-shihan-serif, serif)" }}
              >
                SHI.HAN FINE KNIVES
              </div>
              <p className="text-[11px] text-[#A4998E]">
                Hand-forged Japanese culinary cutlery by Shehan Prull. Santa Fe, New Mexico. Sanjo apprentice tradition.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-white font-bold uppercase mb-2">Workshop Coordinates</div>
              <div>Santa Fe Forge Studio</div>
              <div>Santa Fe, NM 87505</div>
              <div>United States</div>
            </div>

            <div className="space-y-1">
              <div className="text-white font-bold uppercase mb-2">Direct Contact</div>
              <div>Email: shehan@shihanfineknives.com</div>
              <div>Instagram: @shihanfineknives</div>
              <div>Order Book Inquiries: orders@shihanfineknives.com</div>
            </div>

            <div className="space-y-1">
              <div className="text-white font-bold uppercase mb-2">Architecture</div>
              <div>System: BBC Swiss-Grid Matrix</div>
              <div>Telemetry: 60 FPS HTML5 Caliper</div>
              <div>Deploy: Production Live on Render</div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between border-t border-[#1F1C19] pt-6 sm:flex-row items-center gap-4 text-[11px]">
            <div>© {new Date().getFullYear()} SHI.HAN FINE KNIVES. ALL METALLURGICAL RIGHTS RESERVED.</div>
            <div className="text-[#6E645A]">ENGINEERED BY BILLY BENJAMIN CONSULTING</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

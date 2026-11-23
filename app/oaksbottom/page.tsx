"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

interface BoardModel {
  id: string;
  name: string;
  species: string;
  construction: string;
  dimensions: string;
  lengthIn: number;
  widthIn: number;
  thicknessIn: number;
  weightLbs: number;
  priceUsd: number;
  image: string;
  description: string;
  idealFor: string;
}

const BOARD_MODELS: BoardModel[] = [
  {
    id: "walnut-commercial-20x15",
    name: "Heavy Commercial End-Grain Block",
    species: "Oregon Black Walnut",
    construction: "True Vertical End-Grain Mosaic",
    dimensions: "20\" × 15\" × 2.5\"",
    lengthIn: 20,
    widthIn: 15,
    thicknessIn: 2.5,
    weightLbs: 22,
    priceUsd: 480,
    image: "/assets/oaksbottom/endgrain-walnut-commercial.jpg",
    description: "Substantial 2.5-inch commercial butcher block. Vertical end-grain fibers absorb knife impact like bristles, preserving 63 HRC Japanese edges while self-healing under mineral oil.",
    idealFor: "Daily prep workhorse for serious culinary kitchens and professional knife preservation.",
  },
  {
    id: "maple-walnut-mosaic-18x12",
    name: "Chef Flagship Mosaic Prep Block",
    species: "Hard Sugar Maple & Black Walnut",
    construction: "Dual-Timber End-Grain Parquet",
    dimensions: "18\" × 12\" × 2.0\"",
    lengthIn: 18,
    widthIn: 12,
    thicknessIn: 2.0,
    weightLbs: 14,
    priceUsd: 380,
    image: "/assets/oaksbottom/maple-walnut-mosaic.jpg",
    description: "High-contrast checkerboard mosaic pairing dense Pacific hard maple with rich Oregon walnut. Engineered for kitchen counter stability with recessed bench hand-holds.",
    idealFor: "All-purpose prep, bench dicing, vegetable julienne, and aesthetic counter staging.",
  },
  {
    id: "cherry-carving-groove-22x16",
    name: "Master Carving Board with Juice Reservoir",
    species: "Pacific Northwest Black Cherry",
    construction: "Edge-Grain with Perimeter Channel",
    dimensions: "22\" × 16\" × 2.0\"",
    lengthIn: 22,
    widthIn: 16,
    thicknessIn: 2.0,
    weightLbs: 16,
    priceUsd: 420,
    image: "/assets/oaksbottom/cherry-carving-groove.jpg",
    description: "Extra-deep 3/4-inch perimeter juice groove with corner pour reservoir holding up to 450ml of pan juices. Darkens into rich amber-red under natural kitchen light.",
    idealFor: "Resting and carving prime rib, smoked briskets, whole turkeys, and roasted fowl.",
  },
  {
    id: "charcuterie-live-edge-24x8",
    name: "Bench Presentation & Charcuterie Board",
    species: "Live Edge Oregon Black Walnut",
    construction: "Single-Slab Planar Grain",
    dimensions: "24\" × 8\" × 1.25\"",
    lengthIn: 24,
    widthIn: 8,
    thicknessIn: 1.25,
    weightLbs: 8,
    priceUsd: 240,
    image: "/assets/oaksbottom/charcuterie-live-edge.jpg",
    description: "Single-slab Oregon walnut featuring natural bark-edge contours and rich figured sapwood swirls. Finished with organic beeswax for cheese and charcuterie presentation.",
    idealFor: "Artisanal cheese flights, cured salumi spreads, and dining room presentation.",
  },
  {
    id: "monolith-island-24x18",
    name: "The Butcher Island Monolith",
    species: "Solid Oregon Black Walnut",
    construction: "3-Inch Monolithic End-Grain",
    dimensions: "24\" × 18\" × 3.0\"",
    lengthIn: 24,
    widthIn: 18,
    thicknessIn: 3.0,
    weightLbs: 38,
    priceUsd: 680,
    image: "/assets/oaksbottom/monolith-island-block.jpg",
    description: "Heirloom center-island statement piece. Thirty-eight pounds of immovable end-grain mass fitted with industrial non-slip silicone feet for heavy cleaver chops.",
    idealFor: "Dedicated butcher stations, heavy cleaver butchery, and generational family heirlooms.",
  },
  {
    id: "beeswax-conditioner-tin",
    name: "Organic Beeswax & Mineral Oil Conditioner",
    species: "Oregon Beeswax & USP Mineral Oil",
    construction: "Food-Grade Wood Seasoning Paste",
    dimensions: "8 oz Sealed Aluminum Tin",
    lengthIn: 4,
    widthIn: 4,
    thicknessIn: 1.5,
    weightLbs: 0.8,
    priceUsd: 32,
    image: "/assets/oaksbottom/mineral-oil-conditioner.jpg",
    description: "Small-batch formulation of pure pharmaceutical-grade USP mineral oil and local Willamette Valley beeswax. Seals wood capillaries against moisture and bacteria.",
    idealFor: "Monthly deep conditioning to maintain water-beading luster and prevent drying checks.",
  },
];

interface CustomizerConfig {
  hasMonogram: boolean;
  monogramText: string;
  hasJuiceGroove: boolean;
  includeConditioner: boolean;
  orderType: "ready" | "commission";
}

interface CartItem {
  board: BoardModel;
  config: CustomizerConfig;
}

export default function OaksBottomPage() {
  // Navigation & Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Engine 01: End-Grain Knife Damping Caliper State
  const [selectedBoardId, setSelectedBoardId] = useState<string>("walnut-commercial-20x15");
  const selectedBoard = useMemo(
    () => BOARD_MODELS.find((b) => b.id === selectedBoardId) || BOARD_MODELS[0],
    [selectedBoardId]
  );

  const [impactVelocityMs, setImpactVelocityMs] = useState<number>(2.5); // 1.0 to 4.5 m/s
  const [knifeHardnessHrc, setKnifeHardnessHrc] = useState<number>(63); // 56 (German) to 64 (Japanese)
  const [surfaceMaterial, setSurfaceMaterial] = useState<"endgrain" | "edgegrain" | "plastic">("endgrain");
  const [boardThicknessIn, setBoardThicknessIn] = useState<number>(selectedBoard.thicknessIn);

  useEffect(() => {
    setBoardThicknessIn(selectedBoard.thicknessIn);
  }, [selectedBoard]);

  // Engine 01 Physics Computations
  const edgeLifeMultiplier = useMemo(() => {
    if (surfaceMaterial === "endgrain") return 4.2;
    if (surfaceMaterial === "edgegrain") return 1.8;
    return 1.0;
  }, [surfaceMaterial]);

  const shockAbsorptionPct = useMemo(() => {
    if (surfaceMaterial === "endgrain") return 88.4;
    if (surfaceMaterial === "edgegrain") return 42.1;
    return 14.5;
  }, [surfaceMaterial]);

  const peakForceNewtons = useMemo(() => {
    const baseForce = impactVelocityMs * 18;
    const materialFactor = surfaceMaterial === "endgrain" ? 0.35 : surfaceMaterial === "edgegrain" ? 0.95 : 2.4;
    return Math.round(baseForce * materialFactor);
  }, [impactVelocityMs, surfaceMaterial]);

  // Engine 01 Canvas Ref
  const caliperCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = caliperCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const boardTopY = 150;
      const boardThicknessPx = boardThicknessIn * 28;

      // Draw Board Base
      if (surfaceMaterial === "endgrain") {
        ctx.fillStyle = "#261E18";
      } else if (surfaceMaterial === "edgegrain") {
        ctx.fillStyle = "#8C4524";
      } else {
        ctx.fillStyle = "#D1D5DB";
      }
      ctx.fillRect(80, boardTopY, w - 160, boardThicknessPx);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(80, boardTopY, w - 160, boardThicknessPx);

      // Vertical Wood Fibers (End-Grain Representation)
      if (surfaceMaterial === "endgrain") {
        const numFibers = 50;
        const fiberStep = (w - 180) / numFibers;
        for (let i = 0; i < numFibers; i++) {
          const fx = 90 + i * fiberStep;
          ctx.strokeStyle = i % 2 === 0 ? "rgba(180, 83, 9, 0.4)" : "rgba(232, 220, 186, 0.25)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(fx, boardTopY);
          ctx.lineTo(fx, boardTopY + boardThicknessPx);
          ctx.stroke();
        }
      } else if (surfaceMaterial === "edgegrain") {
        // Horizontal Wood Grain
        for (let j = 0; j < boardThicknessPx; j += 8) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(80, boardTopY + j);
          ctx.lineTo(w - 80, boardTopY + j);
          ctx.stroke();
        }
      }

      // Animated Knife Blade Coming Down
      const knifeCenter = w / 2;
      const oscillation = Math.sin(t) * 15;
      const bladeApexY = boardTopY + 2 + Math.max(0, oscillation * 0.4);

      // Knife Blade Silhouette
      ctx.beginPath();
      ctx.moveTo(knifeCenter - 22, 20);
      ctx.lineTo(knifeCenter + 22, 20);
      ctx.lineTo(knifeCenter + 2, bladeApexY);
      ctx.lineTo(knifeCenter - 2, bladeApexY);
      ctx.closePath();
      ctx.fillStyle = "linear-gradient(to bottom, #E5E7EB, #9CA3AF)";
      ctx.fillStyle = "#D4D8DD";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Shock Wave / Energy Absorption Vector
      if (surfaceMaterial === "endgrain") {
        // Fibers separating around the edge
        ctx.strokeStyle = "#22C55E";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(knifeCenter, bladeApexY, 18 + Math.abs(oscillation), 0, Math.PI);
        ctx.stroke();

        ctx.fillStyle = "#22C55E";
        ctx.font = "bold 9px var(--font-oaks-mono, monospace)";
        ctx.fillText("FIBERS SEPARATING // 88.4% ENERGY ABSORPTION", knifeCenter - 110, bladeApexY + 32);
      } else if (surfaceMaterial === "plastic") {
        // Harsh deflection rebound
        ctx.strokeStyle = "#EF4444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(knifeCenter - 25, bladeApexY - 10);
        ctx.lineTo(knifeCenter - 10, bladeApexY);
        ctx.lineTo(knifeCenter + 10, bladeApexY);
        ctx.lineTo(knifeCenter + 25, bladeApexY - 10);
        ctx.stroke();

        ctx.fillStyle = "#EF4444";
        ctx.font = "bold 9px var(--font-oaks-mono, monospace)";
        ctx.fillText("HARD DEFLECTION // APEX BURR DEFORMATION", knifeCenter - 105, bladeApexY + 32);
      } else {
        ctx.fillStyle = "#F59E0B";
        ctx.font = "bold 9px var(--font-oaks-mono, monospace)";
        ctx.fillText("HORIZONTAL SEVERANCE // SCAR ACCUMULATION", knifeCenter - 110, bladeApexY + 32);
      }

      // Board Dimensions Callout
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "10px var(--font-oaks-mono, monospace)";
      ctx.fillText(`${selectedBoard.dimensions} • ${selectedBoard.weightLbs} LBS`, 85, boardTopY + boardThicknessPx + 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedBoard, surfaceMaterial, boardThicknessIn]);

  // Engine 02: Food-Grade Mineral Oil & Beeswax Saturation Hydration State
  const [hydrationStage, setHydrationStage] = useState<number>(2); // 0 = Dry, 1 = First Coat, 2 = Saturated, 3 = Beeswax Shield
  const [waterPoured, setWaterPoured] = useState<boolean>(false);

  // Drawer & Cart Actions
  const handleAddToCart = (orderType: "ready" | "commission") => {
    const newItem: CartItem = {
      board: selectedBoard,
      config: {
        hasMonogram: false,
        monogramText: "OBW",
        hasJuiceGroove: selectedBoard.id.includes("cherry"),
        includeConditioner: true,
        orderType,
      },
    };
    setCart((prev) => [...prev, newItem]);
    setDrawerOpen(true);
  };

  const removeFromCart = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleItemAddon = (idx: number, key: "hasMonogram" | "hasJuiceGroove" | "includeConditioner") => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, config: { ...item.config, [key]: !item.config[key] } } : item
      )
    );
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const base = item.config.orderType === "commission" ? 150 : item.board.priceUsd;
      const monogramCost = item.config.hasMonogram ? 35 : 0;
      const grooveCost = item.config.hasJuiceGroove ? 40 : 0;
      const conditionerCost = item.config.includeConditioner ? 32 : 0;
      return sum + base + monogramCost + grooveCost + conditionerCost;
    }, 0);
  }, [cart]);

  return (
    <div className="relative min-h-screen bg-[#0E120F] text-[#ECE7DF] selection:bg-[#B45309] selection:text-white">
      {/* Background Structural Matrix */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-15">
        <div className="mx-auto h-full max-w-7xl border-x border-[#2A352C] grid grid-cols-6 divide-x divide-[#2A352C]">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#242E26] bg-[#0E120F]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="#hero" className="flex items-baseline gap-2">
              <span
                className="text-xl font-bold tracking-tight text-white uppercase"
                style={{ fontFamily: "var(--font-oaks-serif, serif)" }}
              >
                OAKS BOTTOM WOODCRAFT
              </span>
              <span className="hidden text-xs text-[#8F9E92] sm:inline-block">
                / PORTLAND, OR
              </span>
            </a>
            <span className="hidden items-center gap-1.5 rounded-full border border-[#B45309]/40 bg-[#B45309]/10 px-2.5 py-0.5 text-[11px] font-mono text-[#D97706] md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D97706] animate-pulse" />
              SELLWOOD BENCH ACTIVE
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-mono tracking-wider md:flex">
            <a href="#damping" className="text-[#A3B3A6] hover:text-white transition-colors">
              01 // EDGE DAMPING CALIPER
            </a>
            <a href="#hydration" className="text-[#A3B3A6] hover:text-white transition-colors">
              02 // HYDRATION SIMULATOR
            </a>
            <a href="#forestry" className="text-[#A3B3A6] hover:text-white transition-colors">
              03 // PACIFIC TIMBER
            </a>
            <a href="#vault" className="text-[#A3B3A6] hover:text-white transition-colors">
              04 // WORKSHOP VAULT
            </a>
          </nav>

          <button
            onClick={() => setDrawerOpen(true)}
            className="flex h-11 items-center gap-2.5 rounded border border-[#3A493D] bg-[#161D18] px-4 text-xs font-mono tracking-wider text-white hover:border-[#B45309] transition-all"
            style={{ minWidth: "48px", minHeight: "48px" }}
          >
            <span>WORKSHOP VAULT</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B45309] text-[10px] font-bold text-white">
              {cart.length}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 border-b border-[#242E26] pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Column: Proof & Commercial Angles */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded border border-[#3A493D] bg-[#141B16] px-3 py-1 font-mono text-xs text-[#D97706]">
                <span>PACIFIC NORTHWEST BOTANICAL HARDWOODS</span>
                <span>•</span>
                <span>SELLWOOD STUDIO NO. 97202</span>
              </div>

              <h1
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-oaks-serif, serif)", lineHeight: 1.08 }}
              >
                Hand-turned end-grain Oregon black walnut butcher blocks engineered for knife preservation.
              </h1>

              <p className="max-w-2xl text-base text-[#BAC7BD] sm:text-lg">
                Crafted by master woodworker Soren Miller along the Willamette River. Vertical wood fiber capillaries part on blade impact and self-heal automatically—absorbing 88% of striking energy and eliminating the edge micro-chipping caused by plastic or edge-grain boards.
              </p>

              {/* Above-the-fold Trust Metrics */}
              <div className="grid grid-cols-2 gap-4 rounded border border-[#28362B] bg-[#141B16] p-4 sm:grid-cols-4">
                <div>
                  <div className="text-xl font-bold font-mono text-[#22C55E]">88.4%</div>
                  <div className="text-[11px] font-mono text-[#8F9E92]">BLADE ENERGY ABSORBED</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-[#D97706]">4.2x</div>
                  <div className="text-[11px] font-mono text-[#8F9E92]">EDGE LIFE MULTIPLIER</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-white">2.5 INCH</div>
                  <div className="text-[11px] font-mono text-[#8F9E92]">SOLID END-GRAIN MASS</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-[#38BDF8]">100%</div>
                  <div className="text-[11px] font-mono text-[#8F9E92]">FDA TITEBOND III JOINTS</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#damping"
                  className="flex h-12 items-center justify-center rounded bg-[#B45309] px-6 font-mono text-xs font-semibold tracking-wider text-white shadow-lg hover:bg-[#C25E0A] transition-all"
                  style={{ minWidth: "48px", minHeight: "48px" }}
                >
                  CALCULATE EDGE DAMPING
                </a>
                <a
                  href="#vault"
                  className="flex h-12 items-center justify-center rounded border border-[#3A493D] bg-[#161D18] px-6 font-mono text-xs tracking-wider text-white hover:border-[#B45309] transition-all"
                  style={{ minWidth: "48px", minHeight: "48px" }}
                >
                  EXPLORE ALLOCATION VAULT (6 SKUS)
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual with Inspection Metadata */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded border border-[#3A493D] bg-[#141B16]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/assets/oaksbottom/oaksbottom-hero-board.jpg"
                    alt="Oaks Bottom End-Grain Black Walnut Butcher Block with Chef Knife"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E120F] via-transparent to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="flex items-center justify-between rounded bg-[#0E120F]/90 p-2.5 backdrop-blur-md border border-[#3A493D]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                      <span className="text-[11px] font-mono text-white">BATCH NO. 2026-OBW</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#D97706]">$480 USD</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#A3B3A6]">
                    <div className="rounded bg-[#141B16]/90 p-2 border border-[#28362B]">
                      <span>MASS: 22 LBS SOLID</span>
                    </div>
                    <div className="rounded bg-[#141B16]/90 p-2 border border-[#28362B]">
                      <span>GRAIN: VERTICAL CAPILLARY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine 01: Live 60 FPS End-Grain Knife Edge Damping Caliper */}
      <section id="damping" className="relative z-10 border-b border-[#242E26] py-20 bg-[#121813]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded border border-[#3A493D] bg-[#161D18] px-3 py-1 font-mono text-xs text-[#D97706]">
              <span>INTERACTIVE PHYSICS ENGINE 01</span>
              <span>•</span>
              <span>60 FPS IMPACT SIMULATOR</span>
            </div>
            <h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-oaks-serif, serif)" }}
            >
              End-Grain Knife Edge Damping &amp; Fiber Restitution Caliper
            </h2>
            <p className="text-sm text-[#BAC7BD] sm:text-base">
              When a thin 62-63 HRC Japanese chef knife strikes an ordinary plastic cutting board, the non-yielding polymer deflects energy directly back into the knife apex, micro-chipping the cutting tooth. On an Oaks Bottom end-grain block, vertical fibers stand upright like brush bristles, parting to receive the edge and cushioning 88.4% of the force.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left Column: Preset & Control Sliders */}
            <div className="lg:col-span-5 space-y-6">
              {/* Board Preset Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#A3B3A6]">
                  Select Butcher Block Model
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {BOARD_MODELS.slice(0, 4).map((board) => (
                    <button
                      key={board.id}
                      onClick={() => setSelectedBoardId(board.id)}
                      className={`flex flex-col items-start rounded border p-3 text-left transition-all ${
                        selectedBoardId === board.id
                          ? "border-[#B45309] bg-[#B45309]/15 text-white"
                          : "border-[#28362B] bg-[#141B16] text-[#8F9E92] hover:border-[#3A493D]"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      <div className="text-xs font-bold text-white truncate w-full">{board.name}</div>
                      <div className="text-[10px] font-mono text-[#D97706] mt-0.5">
                        {board.dimensions} • {board.weightLbs} lbs
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Parameters */}
              <div className="rounded border border-[#28362B] bg-[#141B16] p-5 space-y-4">
                {/* Surface Material Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#A3B3A6]">
                    Board Surface Construction
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <button
                      onClick={() => setSurfaceMaterial("endgrain")}
                      className={`rounded border p-2.5 transition-all ${
                        surfaceMaterial === "endgrain"
                          ? "border-[#22C55E] bg-[#22C55E]/15 text-white font-bold"
                          : "border-[#28362B] bg-[#0E120F] text-[#8F9E92]"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      <div className="text-[#22C55E]">END-GRAIN</div>
                      <div className="text-[9px] text-[#A3B3A6]">Self-Healing</div>
                    </button>
                    <button
                      onClick={() => setSurfaceMaterial("edgegrain")}
                      className={`rounded border p-2.5 transition-all ${
                        surfaceMaterial === "edgegrain"
                          ? "border-[#F59E0B] bg-[#F59E0B]/15 text-white font-bold"
                          : "border-[#28362B] bg-[#0E120F] text-[#8F9E92]"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      <div className="text-[#F59E0B]">EDGE-GRAIN</div>
                      <div className="text-[9px] text-[#A3B3A6]">Horizontal Fibers</div>
                    </button>
                    <button
                      onClick={() => setSurfaceMaterial("plastic")}
                      className={`rounded border p-2.5 transition-all ${
                        surfaceMaterial === "plastic"
                          ? "border-[#EF4444] bg-[#EF4444]/15 text-white font-bold"
                          : "border-[#28362B] bg-[#0E120F] text-[#8F9E92]"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      <div className="text-[#EF4444]">PLASTIC</div>
                      <div className="text-[9px] text-[#A3B3A6]">Polymer Shredding</div>
                    </button>
                  </div>
                </div>

                {/* Impact Velocity Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#A3B3A6]">Knife Impact Velocity:</span>
                    <span className="text-[#D97706] font-bold">{impactVelocityMs.toFixed(1)} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="4.5"
                    step="0.1"
                    value={impactVelocityMs}
                    onChange={(e) => setImpactVelocityMs(Number(e.target.value))}
                    className="w-full accent-[#B45309] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#6E7D71]">
                    <span>1.0 m/s (Gentle Mince)</span>
                    <span>2.5 m/s (Rhythmic Chop)</span>
                    <span>4.5 m/s (Cleaver Strike)</span>
                  </div>
                </div>

                {/* Knife Steel Hardness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#A3B3A6]">Knife Steel Hardness:</span>
                    <span className="text-[#D97706] font-bold">{knifeHardnessHrc} HRC</span>
                  </div>
                  <input
                    type="range"
                    min="56"
                    max="64"
                    step="1"
                    value={knifeHardnessHrc}
                    onChange={(e) => setKnifeHardnessHrc(Number(e.target.value))}
                    className="w-full accent-[#B45309] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#6E7D71]">
                    <span>56 HRC (German Stainless)</span>
                    <span>60 HRC (A2 Steel)</span>
                    <span>64 HRC (52100 Cryo / Shirogami)</span>
                  </div>
                </div>
              </div>

              {/* Edge Longevity Telemetry Banner */}
              <div
                className={`rounded border p-4 space-y-2 ${
                  surfaceMaterial === "endgrain"
                    ? "border-[#22C55E]/40 bg-[#22C55E]/10"
                    : surfaceMaterial === "edgegrain"
                    ? "border-[#F59E0B]/40 bg-[#F59E0B]/10"
                    : "border-[#EF4444]/40 bg-[#EF4444]/10"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span>
                    {surfaceMaterial === "endgrain"
                      ? "✓ END-GRAIN FIBER RECOVERY (SELF-HEALING)"
                      : surfaceMaterial === "edgegrain"
                      ? "⚠ TRANSVERSE FIBER SEVERANCE"
                      : "✕ APEX DEFLECTION & MICRO-CHIPPING"}
                  </span>
                  <span>{edgeLifeMultiplier}x Edge Life</span>
                </div>
                <p className="text-xs text-[#BAC7BD]">
                  {surfaceMaterial === "endgrain"
                    ? "Knife apex slides smoothly into vertical capillaries with 88.4% energy absorption. Honing frequency drops from every 3 prep shifts to once per month."
                    : surfaceMaterial === "edgegrain"
                    ? "Knife cuts crosswise through horizontal timber fibers, severing wood bundles and leaving permanent white scar furrows."
                    : "Hard plastic deflects peak shock (240 N) directly back into the microscopic knife apex, accelerating dulling by 4.2x while shedding microplastic particles into ingredients."}
                </p>
              </div>
            </div>

            {/* Right Column: Live 60 FPS Canvas Blueprint & Stats */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded border border-[#3A493D] bg-[#0A0E0B] p-4">
                <div className="flex items-center justify-between border-b border-[#242E26] pb-3 text-xs font-mono text-[#8F9E92]">
                  <span>LIVE IMPACTION BLUEPRINT // 60 FPS</span>
                  <span className="text-[#D97706]">SCALE: 1:1 APEX CAPILLARY SECTION</span>
                </div>

                <div className="relative mt-2 overflow-hidden rounded bg-[#060807]">
                  <canvas
                    ref={caliperCanvasRef}
                    width={720}
                    height={280}
                    className="w-full h-auto block"
                  />
                </div>

                {/* Telemetry Readout Grid */}
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
                  <div className="rounded bg-[#141B16] p-2.5 border border-[#28362B]">
                    <div className="text-[10px] text-[#8F9E92]">ABSORBED ENERGY</div>
                    <div className="text-sm font-bold text-[#22C55E]">{shockAbsorptionPct}%</div>
                  </div>
                  <div className="rounded bg-[#141B16] p-2.5 border border-[#28362B]">
                    <div className="text-[10px] text-[#8F9E92]">PEAK IMPACTION FORCE</div>
                    <div
                      className={`text-sm font-bold ${
                        surfaceMaterial === "endgrain" ? "text-white" : "text-[#EF4444]"
                      }`}
                    >
                      {peakForceNewtons} N
                    </div>
                  </div>
                  <div className="rounded bg-[#141B16] p-2.5 border border-[#28362B]">
                    <div className="text-[10px] text-[#8F9E92]">HONING INTERVAL</div>
                    <div className="text-sm font-bold text-[#D97706]">
                      {surfaceMaterial === "endgrain" ? "30 Days" : surfaceMaterial === "edgegrain" ? "12 Days" : "7 Days"}
                    </div>
                  </div>
                  <div className="rounded bg-[#141B16] p-2.5 border border-[#28362B]">
                    <div className="text-[10px] text-[#8F9E92]">BOARD MASS STABILITY</div>
                    <div className="text-sm font-bold text-[#38BDF8]">{selectedBoard.weightLbs} lbs Solid</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#242E26] pt-4">
                  <div>
                    <div className="text-xs font-mono text-[#8F9E92]">SELECTED BUTCHER BLOCK</div>
                    <div className="text-base font-bold text-white">
                      {selectedBoard.name} ({selectedBoard.dimensions})
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart("ready")}
                    className="flex h-11 items-center gap-2 rounded bg-[#B45309] px-5 font-mono text-xs font-bold text-white hover:bg-[#C25E0A] transition-all"
                    style={{ minHeight: "48px" }}
                  >
                    <span>ACQUIRE BLOCK (${selectedBoard.priceUsd})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine 02: Mineral Oil & Beeswax Saturation Hydration Simulator */}
      <section id="hydration" className="relative z-10 border-b border-[#242E26] py-20 bg-[#0E120F]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded border border-[#3A493D] bg-[#161D18] px-3 py-1 font-mono text-xs text-[#38BDF8]">
              <span>INTERACTIVE PHYSICS ENGINE 02</span>
              <span>•</span>
              <span>HYDROPHOBIC OIL SATURATION</span>
            </div>
            <h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-oaks-serif, serif)" }}
            >
              Deep Mineral Oil Saturation &amp; Beeswax Barrier Simulator
            </h2>
            <p className="text-sm text-[#BAC7BD] sm:text-base">
              End-grain wood is composed of open microscopic vessels that act like thousands of tiny drinking straws. When dry, they absorb vegetable liquids and expand. Saturated with food-grade USP mineral oil and sealed with local Oregon beeswax, they form an impenetrable hydrophobic barrier.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left: Interactive Hydration Slider & Water Test */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#A3B3A6]">Hydration &amp; Seasoning Stage:</span>
                  <span className="text-[#D97706] font-bold">
                    {hydrationStage === 0
                      ? "Stage 0: Unseasoned Raw Timber"
                      : hydrationStage === 1
                      ? "Stage 1: Initial Mineral Oil Penetration"
                      : hydrationStage === 2
                      ? "Stage 2: Deep Core Saturation"
                      : "Stage 3: Beeswax & Carnauba Seal"}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {[
                    { s: 0, label: "STAGE 0", desc: "Dry Timber" },
                    { s: 1, label: "STAGE 1", desc: "1st Coat" },
                    { s: 2, label: "STAGE 2", desc: "Saturated" },
                    { s: 3, label: "STAGE 3", desc: "Wax Sealed" },
                  ].map((step) => (
                    <button
                      key={step.s}
                      onClick={() => {
                        setHydrationStage(step.s);
                        setWaterPoured(false);
                      }}
                      className={`rounded border p-2 text-center font-mono transition-all ${
                        hydrationStage === step.s
                          ? "border-[#D97706] bg-[#D97706]/15 text-white"
                          : "border-[#28362B] bg-[#141B16] text-[#8F9E92] hover:border-[#3A493D]"
                      }`}
                      style={{ minHeight: "48px" }}
                    >
                      <div className="text-xs font-bold">{step.label}</div>
                      <div className="text-[9px] text-[#A3B3A6] truncate">{step.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Droplet Surface Test Button */}
              <div className="rounded border border-[#28362B] bg-[#141B16] p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">DROPLET TEST: WATER DROPLET PENETRATION</span>
                  <button
                    onClick={() => setWaterPoured(!waterPoured)}
                    className="rounded bg-[#38BDF8] px-3 py-1 font-bold text-[#0E120F] hover:bg-[#60A5FA] transition-all"
                    style={{ minHeight: "48px", minWidth: "120px" }}
                  >
                    {waterPoured ? "WIPE DRY" : "POUR WATER"}
                  </button>
                </div>

                <div
                  className={`rounded border p-3 ${
                    hydrationStage >= 2
                      ? "border-[#22C55E]/40 bg-[#22C55E]/10 text-white"
                      : "border-[#EF4444]/40 bg-[#EF4444]/10 text-white"
                  }`}
                >
                  <div className="font-bold">
                    {hydrationStage >= 2
                      ? `HYDROPHOBIC CONTACT ANGLE: θ = ${hydrationStage === 3 ? "114°" : "96°"} (BEADING)`
                      : "HIGH CAPILLARY ABSORPTION: θ < 20° (ABSORBING)"}
                  </div>
                  <p className="text-[11px] text-[#BAC7BD] mt-1">
                    {hydrationStage === 0
                      ? "Raw dry walnut absorbs spilled liquids within 3 seconds, leading to localized swelling and food odor retention."
                      : hydrationStage === 1
                      ? "First oil application fills larger vascular channels; light moisture beading begins but needs second coat."
                      : hydrationStage === 2
                      ? "Full capillary core saturation. Water beads into hemispheres that roll freely across the wood grain without penetrating."
                      : "Organic beeswax and carnauba polish creates a lustrous, silky barrier. Zero moisture uptake even after 60 minutes."}
                  </p>
                </div>
              </div>

              {/* Seasoning Protocol Checklist */}
              <div className="rounded border border-[#3A493D] bg-[#121813] p-4 text-xs font-mono space-y-2">
                <div className="font-bold text-white uppercase tracking-wider">
                  Oaks Bottom Maintenance Protocol
                </div>
                <ul className="space-y-1.5 text-[#BAC7BD]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Hand wash with warm soapy water. Never submerge in sink or enter dishwasher.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Stand block upright on edge to air dry evenly on both faces.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Apply Oaks Bottom Beeswax Conditioner once every 4–6 weeks.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Dynamic Visualizer with Wood Tone Color Shift */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded border border-[#3A493D] bg-[#141B16]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/assets/oaksbottom/water-beading-luster.jpg"
                    alt="End-grain cutting board seasoning hydration"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-700"
                    style={{
                      filter:
                        hydrationStage === 0
                          ? "grayscale(0.4) contrast(0.9) brightness(1.15)"
                          : hydrationStage === 1
                          ? "sepia(0.2) contrast(1.1) brightness(0.95)"
                          : hydrationStage === 2
                          ? "saturate(1.4) contrast(1.2) brightness(0.85)"
                          : "saturate(1.6) contrast(1.3) brightness(0.78)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E120F] via-transparent to-transparent opacity-60" />

                  {/* Simulated Water Droplets Overlay if Poured */}
                  {waterPoured && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex gap-4">
                        {[0, 1, 2, 3].map((d) => (
                          <div
                            key={d}
                            className={`rounded-full border transition-all duration-500 ${
                              hydrationStage >= 2
                                ? "h-7 w-7 border-white/60 bg-[#38BDF8]/40 backdrop-blur-md shadow-lg scale-100"
                                : "h-14 w-14 border-[#EF4444]/40 bg-[#EF4444]/20 blur-sm scale-125"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-[#242E26] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          hydrationStage === 0
                            ? "#A8A29E"
                            : hydrationStage === 1
                            ? "#B45309"
                            : hydrationStage === 2
                            ? "#78350F"
                            : "#451A03",
                      }}
                    />
                    <span className="text-white font-bold">
                      {hydrationStage === 0
                        ? "UNSEASONED CHALKY WALNUT"
                        : hydrationStage === 1
                        ? "WARM COCOA 1ST COAT"
                        : hydrationStage === 2
                        ? "RICH CHOCOLATE DEEP CORE"
                        : "BEESWAX SATIN POLISH LUSTER"}
                    </span>
                  </div>
                  <span className="text-[#8F9E92]">OREGON BLACK WALNUT GRAIN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pacific Northwest Hardwood Forestry Section */}
      <section id="forestry" className="relative z-10 border-b border-[#242E26] py-20 bg-[#121813]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded border border-[#3A493D] bg-[#161D18] px-3 py-1 font-mono text-xs text-[#D97706]">
                <span>SUSTAINABLY HARVESTED PACIFIC TIMBER</span>
              </div>

              <h2
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-oaks-serif, serif)" }}
              >
                Why Willamette Valley black walnut makes the optimal butcher block.
              </h2>

              <p className="text-sm text-[#BAC7BD] leading-relaxed sm:text-base">
                Oregon Black Walnut (*Juglans hindsii* / *nigra*) grows in temperate rain shadow river valleys, yielding a wood density that lands in the goldilocks zone: 1,010 lbf Janka hardness. It is firm enough to withstand cleaver strikes without denting, yet forgiving enough to protect 62–63 HRC Japanese high-carbon knife edges.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="rounded border border-[#28362B] bg-[#141B16] p-3 flex justify-between items-center">
                  <span className="text-white font-bold">JANKA TIMBER HARDNESS</span>
                  <span className="text-[#D97706] font-bold">1,010 lbf (Optimal Knife Protection)</span>
                </div>
                <div className="rounded border border-[#28362B] bg-[#141B16] p-3 flex justify-between items-center">
                  <span className="text-white font-bold">FDA WATERPROOF ADHESIVE</span>
                  <span className="text-[#22C55E] font-bold">Titebond III Cross-Linked Polymer</span>
                </div>
                <div className="rounded border border-[#28362B] bg-[#141B16] p-3 flex justify-between items-center">
                  <span className="text-white font-bold">SURFACE FLATTENING TOLERANCE</span>
                  <span className="text-[#38BDF8] font-bold">± 0.005&quot; Precision Drum Sanded</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded border border-[#3A493D]">
                <Image
                  src="/assets/oaksbottom/workshop-portland-bench.jpg"
                  alt="Portland woodworking workbench with hand planes"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded bg-[#0E120F]/80 px-2 py-1 text-[10px] font-mono text-white">
                  SELLWOOD BENCH
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded border border-[#3A493D]">
                <Image
                  src="/assets/oaksbottom/endgrain-macro-fibers.jpg"
                  alt="End-grain wood grain rings close up"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded bg-[#0E120F]/80 px-2 py-1 text-[10px] font-mono text-white">
                  END-GRAIN RINGS
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded border border-[#3A493D]">
                <Image
                  src="/assets/oaksbottom/maple-walnut-mosaic.jpg"
                  alt="Maple and walnut mosaic parquet block"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded bg-[#0E120F]/80 px-2 py-1 text-[10px] font-mono text-white">
                  MAPLE MOSAIC
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded border border-[#3A493D]">
                <Image
                  src="/assets/oaksbottom/soren-miller-portrait.jpg"
                  alt="Soren Miller Master Woodworker"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded bg-[#0E120F]/80 px-2 py-1 text-[10px] font-mono text-white">
                  SOREN MILLER
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine 03: Portland Workshop Allocation Vault (Product Grid) */}
      <section id="vault" className="relative z-10 border-b border-[#242E26] py-20 bg-[#0E120F]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded border border-[#3A493D] bg-[#161D18] px-3 py-1 font-mono text-xs text-[#D97706]">
                <span>ENGINE 03 // WORKSHOP ALLOCATION VAULT</span>
              </div>
              <h2
                className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-oaks-serif, serif)" }}
              >
                Portland Workshop Allocation Suite
              </h2>
              <p className="mt-2 text-sm text-[#BAC7BD]">
                Select ready-to-ship bench stock or reserve a custom dimension commission in Soren&apos;s next glue-up run with a refundable $150 deposit.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#22C55E]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>CURRENT BENCH CAPACITY: 6 SUITES ACTIVE</span>
            </div>
          </div>

          {/* 6 SKU Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BOARD_MODELS.map((board) => (
              <div
                key={board.id}
                className="group flex flex-col justify-between overflow-hidden rounded border border-[#28362B] bg-[#141B16] transition-all hover:border-[#B45309]"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0E0B]">
                    <Image
                      src={board.image}
                      alt={board.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded bg-[#0E120F]/85 px-2.5 py-1 text-[10px] font-mono text-white">
                      {board.species}
                    </div>
                    <div className="absolute top-3 right-3 rounded bg-[#B45309] px-2.5 py-1 text-[11px] font-mono font-bold text-white">
                      ${board.priceUsd} USD
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "var(--font-oaks-serif, serif)" }}
                      >
                        {board.name}
                      </h3>
                      <span className="text-xs font-mono text-[#D97706]">{board.weightLbs} lbs</span>
                    </div>

                    <p className="text-xs text-[#BAC7BD] line-clamp-2">{board.description}</p>

                    <div className="space-y-1 font-mono text-[11px] text-[#8F9E92] border-t border-[#202B22] pt-3">
                      <div className="flex justify-between">
                        <span>DIMENSIONS:</span>
                        <span className="text-white">{board.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CONSTRUCTION:</span>
                        <span className="text-white">{board.construction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IDEAL APPLICATION:</span>
                        <span className="text-[#D97706] truncate max-w-[170px]">{board.idealFor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedBoardId(board.id);
                      handleAddToCart("ready");
                    }}
                    className="flex h-11 items-center justify-center rounded bg-[#B45309] font-mono text-xs font-bold text-white hover:bg-[#C25E0A] transition-all"
                    style={{ minHeight: "48px" }}
                  >
                    ACQUIRE (${board.priceUsd})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBoardId(board.id);
                      handleAddToCart("commission");
                    }}
                    className="flex h-11 items-center justify-center rounded border border-[#3A493D] bg-[#161D18] font-mono text-xs text-[#ECE7DF] hover:border-[#B45309] transition-all"
                    style={{ minHeight: "48px" }}
                  >
                    COMMISSION ($150)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide-Out Workshop Allocation Vault Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity">
          <div className="flex h-full w-full max-w-md flex-col justify-between border-l border-[#3A493D] bg-[#121813] p-6 text-white shadow-2xl">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#242E26] pb-4">
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-oaks-serif, serif)" }}
                  >
                    PORTLAND ALLOCATION VAULT
                  </h3>
                  <div className="text-xs font-mono text-[#8F9E92]">
                    SELLWOOD WORKSHOP • SOREN MILLER
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded border border-[#3A493D] text-sm text-[#BAC7BD] hover:text-white"
                  style={{ minWidth: "48px", minHeight: "48px" }}
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="mt-6 max-h-[55vh] space-y-4 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-[#8F9E92]">
                    YOUR ALLOCATION VAULT IS EMPTY.
                    <div className="mt-2 text-[#D97706]">SELECT A BUTCHER BLOCK TO COMMENCE.</div>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded border border-[#28362B] bg-[#161D18] p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-sm">{item.board.name}</div>
                          <div className="text-[10px] font-mono text-[#D97706]">
                            {item.config.orderType === "commission"
                              ? "CUSTOM BENCH DEPOSIT ($150)"
                              : "READY-TO-SHIP STOCK"}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="text-xs font-mono text-[#8F9E92] hover:text-[#EF4444]"
                        >
                          REMOVE
                        </button>
                      </div>

                      <div className="space-y-1 text-[11px] font-mono text-[#BAC7BD]">
                        <div className="flex justify-between">
                          <span>SPECIES:</span>
                          <span className="text-white">{item.board.species}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DIMENSIONS:</span>
                          <span className="text-white">{item.board.dimensions}</span>
                        </div>
                      </div>

                      {/* Add-on toggles */}
                      <div className="space-y-2 border-t border-[#202B22] pt-2 text-xs font-mono">
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.config.hasMonogram}
                              onChange={() => toggleItemAddon(idx, "hasMonogram")}
                              className="accent-[#B45309]"
                            />
                            <span>Laser Engraved Monogram</span>
                          </span>
                          <span className="text-white font-bold">+$35</span>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.config.hasJuiceGroove}
                              onChange={() => toggleItemAddon(idx, "hasJuiceGroove")}
                              className="accent-[#B45309]"
                            />
                            <span>Juice Groove &amp; Spout</span>
                          </span>
                          <span className="text-white font-bold">+$40</span>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.config.includeConditioner}
                              onChange={() => toggleItemAddon(idx, "includeConditioner")}
                              className="accent-[#B45309]"
                            />
                            <span>8oz Beeswax Conditioner Tin</span>
                          </span>
                          <span className="text-white font-bold">+$32</span>
                        </label>
                      </div>

                      <div className="flex justify-between items-center border-t border-[#202B22] pt-2 text-xs font-mono">
                        <span className="text-[#8F9E92]">ITEM TOTAL:</span>
                        <span className="text-white font-bold">
                          $
                          {(item.config.orderType === "commission" ? 150 : item.board.priceUsd) +
                            (item.config.hasMonogram ? 35 : 0) +
                            (item.config.hasJuiceGroove ? 40 : 0) +
                            (item.config.includeConditioner ? 32 : 0)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Summary & Checkout */}
            <div className="border-t border-[#242E26] pt-4 space-y-3">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#8F9E92]">
                  <span>SUBTOTAL:</span>
                  <span className="text-white">${cartSubtotal} USD</span>
                </div>
                <div className="flex justify-between text-[#8F9E92]">
                  <span>HEAVY FREIGHT DISPATCH:</span>
                  <span className="text-[#22C55E]">FREE ($0.00)</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-white border-t border-[#202B22] pt-2">
                  <span>DUE TODAY:</span>
                  <span className="text-[#D97706]">${cartSubtotal} USD</span>
                </div>
              </div>

              {checkoutComplete ? (
                <div className="rounded border border-[#22C55E]/50 bg-[#22C55E]/10 p-3 text-center text-xs font-mono text-[#22C55E]">
                  ✓ BENCH ALLOCATION CONFIRMED // WORKSHOP TICKET NO. 97202 GENERATED
                </div>
              ) : (
                <button
                  disabled={cart.length === 0}
                  onClick={() => setCheckoutComplete(true)}
                  className="flex h-12 w-full items-center justify-center rounded bg-[#B45309] font-mono text-xs font-bold tracking-wider text-white hover:bg-[#C25E0A] disabled:opacity-50 transition-all"
                  style={{ minHeight: "48px" }}
                >
                  CONFIRM ALLOCATION (1-CLICK DIRECT)
                </button>
              )}

              <div className="text-center text-[10px] font-mono text-[#6E7D71]">
                100% SECURE ESCROW • LIFETIME WARP WARRANTY • $0 HEAVY INSURED FREIGHT
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#242E26] bg-[#0A0E0B] py-16 text-xs font-mono text-[#8F9E92]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-2">
              <div
                className="text-sm font-bold text-white uppercase"
                style={{ fontFamily: "var(--font-oaks-serif, serif)" }}
              >
                OAKS BOTTOM WOODCRAFT
              </div>
              <p className="text-[11px] text-[#BAC7BD]">
                Hand-turned end-grain butcher blocks and heirloom prep boards by Soren Miller. Portland, Oregon.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-white font-bold uppercase mb-2">Workshop Coordinates</div>
              <div>Sellwood-Moreland Studio</div>
              <div>Portland, OR 97202</div>
              <div>United States</div>
            </div>

            <div className="space-y-1">
              <div className="text-white font-bold uppercase mb-2">Direct Contact</div>
              <div>Email: soren@oaksbottomwoodcraft.com</div>
              <div>Instagram: @oaksbottomwoodcraft</div>
              <div>Orders: orders@oaksbottomwoodcraft.com</div>
            </div>

            <div className="space-y-1">
              <div className="text-white font-bold uppercase mb-2">Architecture</div>
              <div>System: BBC Swiss-Grid Matrix</div>
              <div>Engine: 60 FPS Damping Caliper</div>
              <div>Deploy: Production Live on Render</div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between border-t border-[#1C241E] pt-6 sm:flex-row items-center gap-4 text-[11px]">
            <div>© {new Date().getFullYear()} OAKS BOTTOM WOODCRAFT. ALL BOTANICAL WOODWORKING RIGHTS RESERVED.</div>
            <div className="text-[#6E7D71]">ENGINEERED BY BILLY BENJAMIN CONSULTING</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

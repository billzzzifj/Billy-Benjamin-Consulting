"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Shield, 
  ShoppingBag, 
  X, 
  ExternalLink, 
  RefreshCw, 
  Award,
  Maximize2,
  FileText,
  Layers,
  Activity,
  Info,
  Sliders,
  Volume2,
  Droplets,
  HardHat,
  Flame,
  Sparkle,
  Compass
} from "lucide-react";

interface BathProduct {
  id: string;
  name: string;
  germanTitle: string;
  designer: string;
  category: string;
  sku: string;
  price: number;
  capacityLiters: number;
  netWeightKg: number;
  dimensionsMm: { length: number; width: number; depth: number };
  material: string;
  warrantyYears: number;
  floorContactM2: number;
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface FloorSubstructure {
  id: string;
  name: string;
  germanName: string;
  maxLoadKgM2: number;
  deflectionLimitMm: number;
  description: string;
}

interface CartItem {
  productId: string;
  productName: string;
  price: number;
  finishColor: string;
  soundWaveEnabled: boolean;
  antiSlipEnabled: boolean;
  monogramCoverEnabled: boolean;
  decouplingKitEnabled: boolean;
  sku: string;
  imageUrl: string;
}

export default function KaldeweiShowcasePage() {
  // Flagship architectural catalog
  const products: BathProduct[] = [
    {
      id: "centro-duo-oval",
      name: "Meisterstück Centro Duo Oval",
      germanTitle: "Meisterstück Centro Duo Oval Freistehend",
      designer: "Sottsass Associati",
      category: "Freestanding Monolithic Bath",
      sku: "KW-MST-CDO-170",
      price: 8450,
      capacityLiters: 156,
      netWeightKg: 122,
      dimensionsMm: { length: 1700, width: 750, depth: 470 },
      material: "Kaldewei 3.5mm Glazed Titanium-Steel",
      warrantyYears: 30,
      floorContactM2: 1.15,
      curatorNotes: "Pure oval symmetry with dual identical backrest slopes. Seamless one-piece enamelled steel panelling eliminates visible joints, providing superior thermal retention and non-porous hygiene.",
      images: [
        {
          label: "Monolithic Oval Architecture",
          url: "/assets/kaldewei/kw-meisterstueck-hero.jpg",
          caption: "Kaldewei Meisterstück Centro Duo Oval in pure architectural travertine suite."
        },
        {
          label: "3.5mm Vitreous Steel Molecular Bond",
          url: "/assets/kaldewei/kw-enamel-macro.jpg",
          caption: "Precision edge radius showing fused glass enamel molecular bond to titanium steel."
        },
        {
          label: "Flush Integrated Waste System",
          url: "/assets/kaldewei/kw-drain-detail.jpg",
          caption: "Enamelled flush waste cover and overflow integrated flush to the bath contour."
        }
      ],
      accentColor: "#F4F1EA"
    },
    {
      id: "conoduo-freestanding",
      name: "Meisterstück Conoduo",
      germanTitle: "Meisterstück Conoduo Quader Freistehend",
      designer: "Studio Aisslinger",
      category: "Cubist Architectural Monolith",
      sku: "KW-MST-CND-170",
      price: 9280,
      capacityLiters: 159,
      netWeightKg: 138,
      dimensionsMm: { length: 1700, width: 750, depth: 445 },
      material: "Kaldewei 3.5mm Glazed Titanium-Steel",
      warrantyYears: 30,
      floorContactM2: 1.25,
      curatorNotes: "Sharp linear geometry engineered for central room placement. Perfectly planar exterior steel aprons create an architectural presence inspired by minimalist sculpture.",
      images: [
        {
          label: "Cubist Architectural Monolith",
          url: "/assets/kaldewei/kw-conoduo-freestanding.jpg",
          caption: "Meisterstück Conoduo freestanding cube with monolithic enamelled steel apron."
        },
        {
          label: "Concealed Sound Wave Resonance Transducers",
          url: "/assets/kaldewei/kw-soundwave-acoustic.jpg",
          caption: "Acoustic exciter transducer array mounted to exterior steel wall transforming the tub into a speaker."
        },
        {
          label: "Acoustic Sub-Floor Decoupling Frame",
          url: "/assets/kaldewei/kw-subfloor-installation.jpg",
          caption: "Heavy-duty sound-decoupled leveling frame with integrated waste rough-in connection."
        }
      ],
      accentColor: "#EAE7DF"
    },
    {
      id: "superplan-zero-miena",
      name: "Superplan Zero & Miena Suite",
      germanTitle: "Superplan Zero Duschfläche & Miena Waschschale",
      designer: "Werner Aisslinger",
      category: "Zero-Threshold Shower & Basin Suite",
      sku: "KW-SPZ-MNA-SET",
      price: 4620,
      capacityLiters: 0,
      netWeightKg: 60,
      dimensionsMm: { length: 1400, width: 900, depth: 32 },
      material: "Kaldewei 3.5mm Glazed Titanium-Steel",
      warrantyYears: 30,
      floorContactM2: 1.26,
      curatorNotes: "Zero-threshold floor-level shower surface with wall-adjacent linear drain, paired with ultra-thin Miena glazed steel washbasin. Designed with microscopic corner radii for direct tile integration.",
      images: [
        {
          label: "Zero-Threshold Flush Shower Plane",
          url: "/assets/kaldewei/kw-superplan-zero.jpg",
          caption: "Superplan Zero floor-level steel shower surface installed flush to natural stone tiles."
        },
        {
          label: "Miena Ultra-Thin Glazed Steel Basin",
          url: "/assets/kaldewei/kw-washbasin-miena.jpg",
          caption: "Miena washbasin bowl demonstrating thin-edge steel enamel forming precision."
        },
        {
          label: "Architectural Penthouse Suite Integration",
          url: "/assets/kaldewei/kw-architectural-bathroom.jpg",
          caption: "Complete Kaldewei sanitaryware suite installed in floor-to-ceiling glass pavilion."
        }
      ],
      accentColor: "#E2DDD3"
    }
  ];

  // Substructure presets for point load and deflection analysis
  const substructurePresets: FloorSubstructure[] = [
    {
      id: "cast-concrete",
      name: "Cast Reinforced Concrete Slab",
      germanName: "Stahlbetondecke DIN 1045",
      maxLoadKgM2: 500,
      deflectionLimitMm: 1.2,
      description: "Solid reinforced concrete slab with cement screed. Highest load-bearing capacity and acoustic isolation."
    },
    {
      id: "screed-insulation",
      name: "Floating Screed on Acoustic Layer",
      germanName: "Schwimmender Estrich auf Trittschall",
      maxLoadKgM2: 350,
      deflectionLimitMm: 2.0,
      description: "Standard luxury residential floor makeup. Requires verified compressive insulation strength under point loads."
    },
    {
      id: "timber-joists",
      name: "Historic Engineered Timber Joists",
      germanName: "Holzbalkendecke Altbau",
      maxLoadKgM2: 250,
      deflectionLimitMm: 3.5,
      description: "Heritage or penthouse timber beam framing. Demands weight distribution plate to eliminate localized deflection."
    }
  ];

  // State management
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Floor Load Simulator State
  const [waterFillPercent, setWaterFillPercent] = useState(85);
  const [batherWeightKg, setBatherWeightKg] = useState(80);
  const [selectedSubstructureId, setSelectedSubstructureId] = useState("cast-concrete");

  // Sound Wave Simulator State
  const [soundWaveMode, setSoundWaveMode] = useState<"ambient" | "hifi" | "tactile">("ambient");
  const [isAudioSimActive, setIsAudioSimActive] = useState(true);

  // Configuration Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState("Alpine White (High Gloss)");
  const [soundWaveAddon, setSoundWaveAddon] = useState(true);
  const [antiSlipAddon, setAntiSlipAddon] = useState(false);
  const [monogramCoverAddon, setMonogramCoverAddon] = useState(false);
  const [decouplingKitAddon, setDecouplingKitAddon] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const activeProduct = products[activeProductIndex];
  const activeSubstructure = substructurePresets.find(s => s.id === selectedSubstructureId) || substructurePresets[0];

  // Real-time calculations
  const waterWeightKg = Math.round((activeProduct.capacityLiters * waterFillPercent) / 100);
  const totalStaticMassKg = activeProduct.netWeightKg + waterWeightKg + (activeProduct.capacityLiters > 0 ? batherWeightKg : 0);
  const pointLoadKgM2 = Math.round(totalStaticMassKg / activeProduct.floorContactM2);
  const isOverloadRisk = pointLoadKgM2 > activeSubstructure.maxLoadKgM2;
  const loadPercentage = Math.round((pointLoadKgM2 / activeSubstructure.maxLoadKgM2) * 100);
  const estimatedDeflectionMm = Number(((pointLoadKgM2 / activeSubstructure.maxLoadKgM2) * activeSubstructure.deflectionLimitMm).toFixed(2));

  // Pricing calculations
  const basePrice = activeProduct.price;
  const soundWaveCost = soundWaveAddon ? 1450 : 0;
  const antiSlipCost = antiSlipAddon ? 280 : 0;
  const monogramCoverCost = monogramCoverAddon ? 190 : 0;
  const decouplingKitCost = decouplingKitAddon ? 420 : 0;
  const configuredTotal = basePrice + soundWaveCost + antiSlipCost + monogramCoverCost + decouplingKitCost;

  const handleAddToCart = () => {
    const newItem: CartItem = {
      productId: activeProduct.id,
      productName: activeProduct.name,
      price: configuredTotal,
      finishColor: selectedFinish,
      soundWaveEnabled: soundWaveAddon,
      antiSlipEnabled: antiSlipAddon,
      monogramCoverEnabled: monogramCoverAddon,
      decouplingKitEnabled: decouplingKitAddon,
      sku: `${activeProduct.sku}-${selectedFinish.substring(0, 3).toUpperCase()}`,
      imageUrl: activeProduct.images[0].url
    };
    setCart([newItem]);
    setIsDrawerOpen(true);
    setOrderConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#EAE6DF] font-sans antialiased selection:bg-[#EAE6DF] selection:text-[#0E0F11]">
      
      {/* Top Telemetry & Swiss Header */}
      <header className="sticky top-0 z-40 bg-[#0E0F11]/95 backdrop-blur-md border-b border-[#24262B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#9A9A9A] hover:text-[#FFFFFF] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK TO RADAR
            </Link>
            <div className="h-4 w-px bg-[#24262B] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#C5A059] uppercase tracking-wider font-semibold">
                [PROSPECT 14 // RECON SANDBOX]
              </span>
              <span className="text-xs text-[#707070] hidden md:inline">
                KALDEWEI // AHLEN, GERMANY (FOUNDED 1918)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#floor-load-calibrator"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#D4CDC3] hover:text-[#FFFFFF] transition-colors"
            >
              <HardHat className="w-3.5 h-3.5 text-[#C5A059]" />
              FLOOR-LOAD SIMULATOR
            </a>
            <a 
              href="#soundwave-resonance"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#D4CDC3] hover:text-[#FFFFFF] transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
              SOUND WAVE ACOUSTICS
            </a>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative inline-flex items-center gap-2 px-3 py-2 bg-[#1B1D22] hover:bg-[#252830] border border-[#2E313A] rounded-none text-xs font-mono text-[#EAE6DF] transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>COMMISSION VAULT</span>
              {cart.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#C5A059] text-[#0E0F11] text-[10px] font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Architectural Showcase Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">

        {/* Section 01: Hero Diagnostic Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#24262B] pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#191B20] border border-[#2B2F38] text-[11px] font-mono tracking-wider text-[#C5A059]">
              <Shield className="w-3 h-3" />
              GERMAN GLAZED TITANIUM-STEEL SANITARY ARCHITECTURE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FFFFFF] leading-tight">
              Eliminating Structural Floor-Load Hesitation & Enamel Ambiguity for Architectural Commissions
            </h1>
            <p className="text-sm md:text-base text-[#9E9B93] leading-relaxed max-w-3xl">
              High-net-worth residential homeowners and interior architectural practices frequently stall high-ticket master bath commissions (€8,000–€28,000) over structural point-load capacity (350kg–580kg filled bath mass) and acoustic specification uncertainty. This live engineering sandbox verifies residential floor-slab deflection limits in real time and demonstrates the acoustic properties of Kaldewei&apos;s 3.5mm steel enamel Sound Wave transducer system.
            </p>
          </div>

          {/* Quick Metric Telemetry Box */}
          <div className="lg:col-span-4 bg-[#141519] border border-[#252830] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#22242B] pb-3">
              <span className="text-xs font-mono text-[#8C887F]">MANUFACTURE BASE</span>
              <span className="text-xs font-mono text-[#EAE6DF] font-semibold">Ahlen, Germany</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#22242B] pb-3">
              <span className="text-xs font-mono text-[#8C887F]">MATERIAL BOND</span>
              <span className="text-xs font-mono text-[#EAE6DF] font-semibold">3.5mm Steel + Vitreous Enamel</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#22242B] pb-3">
              <span className="text-xs font-mono text-[#8C887F]">WARRANTY STANDARD</span>
              <span className="text-xs font-mono text-[#C5A059] font-semibold">30-Year Warranty DIN EN 14516</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8C887F]">RECYCLABILITY RATIO</span>
              <span className="text-xs font-mono text-[#EAE6DF] font-semibold">100% Circular Steel (Zero Resin)</span>
            </div>
          </div>
        </section>

        {/* Section 02: Flagship Product Selector & High-Resolution Optical Gallery */}
        <section id="gallery" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#C5A059] tracking-widest uppercase">
                [EXECUTIVE CATALOGUE // 3 ARCHITECTURAL MODELS]
              </span>
              <h2 className="text-2xl font-light tracking-tight text-[#FFFFFF] mt-1">
                Monolithic Enamelled Masterpieces
              </h2>
            </div>

            {/* Model Tab Controls */}
            <div className="flex flex-wrap gap-2">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setActiveProductIndex(index);
                    setActiveImageIndex(0);
                  }}
                  className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border ${
                    activeProductIndex === index
                      ? "bg-[#C5A059] text-[#0E0F11] border-[#C5A059] font-bold"
                      : "bg-[#141519] text-[#9E9B93] border-[#252830] hover:border-[#3E424E] hover:text-[#FFFFFF]"
                  }`}
                >
                  0{index + 1} // {product.name.replace("Meisterstück ", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Active Product Staging Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Main Optical Stage */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] bg-[#141519] border border-[#252830] overflow-hidden group">
                <img
                  src={activeProduct.images[activeImageIndex].url}
                  alt={activeProduct.images[activeImageIndex].label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                
                {/* HUD Overlay Badge */}
                <div className="absolute top-4 left-4 bg-[#0E0F11]/85 backdrop-blur-sm border border-[#2B2F38] px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                  <span className="text-[11px] font-mono text-[#EAE6DF] tracking-wide uppercase">
                    {activeProduct.images[activeImageIndex].label}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#0E0F11]/85 backdrop-blur-sm border border-[#2B2F38] px-3 py-1.5">
                  <span className="text-[11px] font-mono text-[#8C887F]">
                    ASSET {activeImageIndex + 1} OF {activeProduct.images.length} // LOCAL 100% VERIFIED
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-4">
                {activeProduct.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[16/10] bg-[#141519] border overflow-hidden text-left transition-all ${
                      activeImageIndex === idx 
                        ? "border-[#C5A059] ring-1 ring-[#C5A059]" 
                        : "border-[#252830] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={image.label} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[#0E0F11]/90 p-1.5">
                      <p className="text-[10px] font-mono text-[#EAE6DF] truncate">
                        0{idx + 1}. {image.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Technical Dossier & Immediate Commission CTA */}
            <div className="lg:col-span-4 bg-[#141519] border border-[#252830] p-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#C5A059] tracking-wider uppercase">
                  {activeProduct.category}
                </span>
                <h3 className="text-2xl font-light text-[#FFFFFF] mt-1">
                  {activeProduct.name}
                </h3>
                <p className="text-xs font-mono text-[#8C887F] mt-0.5">
                  {activeProduct.germanTitle}
                </p>
                <p className="text-xs text-[#B2AEA6] mt-3 leading-relaxed">
                  {activeProduct.curatorNotes}
                </p>
              </div>

              {/* Specification Grid */}
              <div className="space-y-3 border-t border-b border-[#252830] py-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#8C887F]">DESIGNER</span>
                  <span className="text-[#FFFFFF]">{activeProduct.designer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C887F]">DIMENSIONS</span>
                  <span className="text-[#FFFFFF]">
                    {activeProduct.dimensionsMm.length} × {activeProduct.dimensionsMm.width} × {activeProduct.dimensionsMm.depth} mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C887F]">WATER CAPACITY</span>
                  <span className="text-[#FFFFFF]">
                    {activeProduct.capacityLiters > 0 ? `${activeProduct.capacityLiters} Liters` : "Continuous Direct Drain"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C887F]">NET STEEL TARE</span>
                  <span className="text-[#FFFFFF]">{activeProduct.netWeightKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C887F]">SURFACE SPEC</span>
                  <span className="text-[#C5A059]">{activeProduct.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C887F]">MANUFACTURE SKU</span>
                  <span className="text-[#FFFFFF]">{activeProduct.sku}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-[#8C887F]">FACTORY MSRP</span>
                  <span className="text-2xl font-mono text-[#FFFFFF] font-light">
                    €{activeProduct.price.toLocaleString("de-DE")}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF67] text-[#0E0F11] text-xs font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  CONFIGURE & SPECIFY SUITE
                </button>

                <p className="text-[11px] text-center font-mono text-[#7A766F]">
                  Includes CAD/BIM Revit files & DIN EN 14516 factory certificate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Interactive Structural Floor-Load & Static Deflection Engine */}
        <section id="floor-load-calibrator" className="bg-[#141519] border border-[#252830] p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#24262B] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">
                <HardHat className="w-3.5 h-3.5" />
                [ARCHITECTURAL STRUCTURAL SIMULATOR]
              </div>
              <h2 className="text-2xl font-light text-[#FFFFFF]">
                Residential Floor-Load & Static Deflection Calibrator
              </h2>
              <p className="text-xs text-[#9E9B93] mt-1 max-w-2xl">
                Simulate point-load concentration (kg/m²) and joist deflection risks based on water volume fill, bather mass, and sub-floor makeup before project sign-off.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#1B1D22] border border-[#2E313A] px-3 py-1.5 text-xs font-mono">
              <span className="text-[#8C887F]">CURRENT BATH:</span>
              <span className="text-[#C5A059] font-bold">{activeProduct.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Substructure & Sliders Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Substructure Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#8C887F] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                  SELECT RESIDENTIAL SUBSTRUCTURE MAKEUP:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {substructurePresets.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubstructureId(sub.id)}
                      className={`p-3 text-left border transition-all ${
                        selectedSubstructureId === sub.id
                          ? "bg-[#1E2129] border-[#C5A059] ring-1 ring-[#C5A059]"
                          : "bg-[#101114] border-[#252830] hover:border-[#3E424E]"
                      }`}
                    >
                      <p className="text-xs font-mono text-[#FFFFFF] font-semibold">{sub.name}</p>
                      <p className="text-[10px] font-mono text-[#C5A059] mt-0.5">{sub.germanName}</p>
                      <p className="text-[10px] text-[#7A766F] mt-1.5 leading-tight">
                        Limit: {sub.maxLoadKgM2} kg/m²
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Fill Level Slider */}
              {activeProduct.capacityLiters > 0 && (
                <div className="space-y-2 bg-[#101114] border border-[#252830] p-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#8C887F] flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-[#6BA4B8]" />
                      WATER DISPLACEMENT FILL RATIO:
                    </span>
                    <span className="text-[#FFFFFF] font-bold">
                      {waterFillPercent}% ({waterWeightKg} Liters / kg)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={waterFillPercent}
                    onChange={(e) => setWaterFillPercent(Number(e.target.value))}
                    className="w-full accent-[#C5A059] bg-[#24262B] h-1.5 rounded-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#5C5953]">
                    <span>0% (Empty Vessel)</span>
                    <span>50% (Half Bath)</span>
                    <span>100% (Overflow Brim: {activeProduct.capacityLiters}L)</span>
                  </div>
                </div>
              )}

              {/* Bather Mass Slider */}
              {activeProduct.capacityLiters > 0 && (
                <div className="space-y-2 bg-[#101114] border border-[#252830] p-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#8C887F] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#C5A059]" />
                      BATHER STATIC MASS CALIBRATION:
                    </span>
                    <span className="text-[#FFFFFF] font-bold">{batherWeightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    step="5"
                    value={batherWeightKg}
                    onChange={(e) => setBatherWeightKg(Number(e.target.value))}
                    className="w-full accent-[#C5A059] bg-[#24262B] h-1.5 rounded-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#5C5953]">
                    <span>40 kg (Lightweight)</span>
                    <span>80 kg (Standard Single)</span>
                    <span>160 kg (Dual Occupancy)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Live Readout & Compliance HUD Column */}
            <div className="lg:col-span-5 bg-[#101114] border border-[#252830] p-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#8C887F] uppercase tracking-wider">
                  STRUCTURAL POINT-LOAD READOUT
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-mono text-[#FFFFFF] font-light">
                    {pointLoadKgM2}
                  </span>
                  <span className="text-sm font-mono text-[#8C887F]">kg / m² footprint</span>
                </div>
                <p className="text-[11px] font-mono text-[#7A766F] mt-1">
                  Floor Contact Surface: {activeProduct.floorContactM2} m² footprint
                </p>
              </div>

              {/* Progress Load Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#8C887F]">SUBSTRUCTURE CAPACITY USAGE:</span>
                  <span className={isOverloadRisk ? "text-[#E65050] font-bold" : "text-[#54B86A] font-bold"}>
                    {loadPercentage}% of Max Rated Load
                  </span>
                </div>
                <div className="w-full bg-[#202229] h-2">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      isOverloadRisk ? "bg-[#E65050]" : "bg-[#54B86A]"
                    }`}
                    style={{ width: `${Math.min(loadPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Detailed Mass Breakdown Table */}
              <div className="space-y-2 border-t border-b border-[#202229] py-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#8C887F]">3.5mm Steel Tare Weight:</span>
                  <span className="text-[#FFFFFF]">{activeProduct.netWeightKg} kg</span>
                </div>
                {activeProduct.capacityLiters > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[#8C887F]">Displaced Water Mass ({waterFillPercent}%):</span>
                      <span className="text-[#FFFFFF]">+{waterWeightKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C887F]">Bather Occupant Mass:</span>
                      <span className="text-[#FFFFFF]">+{batherWeightKg} kg</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between border-t border-[#202229] pt-2 font-bold">
                  <span className="text-[#C5A059]">Total Static Load Mass:</span>
                  <span className="text-[#C5A059]">{totalStaticMassKg} kg</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8C887F]">Estimated Slab Deflection:</span>
                  <span className={estimatedDeflectionMm > activeSubstructure.deflectionLimitMm ? "text-[#E65050]" : "text-[#54B86A]"}>
                    ~{estimatedDeflectionMm} mm (Tolerance: &lt;{activeSubstructure.deflectionLimitMm}mm)
                  </span>
                </div>
              </div>

              {/* Pass / Reinforcement Verdict */}
              <div className={`p-3.5 border ${
                isOverloadRisk 
                  ? "bg-[#2A1616] border-[#E65050] text-[#E65050]" 
                  : "bg-[#142319] border-[#54B86A] text-[#54B86A]"
              }`}>
                <div className="flex items-center gap-2 text-xs font-mono font-bold">
                  {isOverloadRisk ? <Info className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  <span>
                    {isOverloadRisk ? "ARCHITECTURAL ALERT: LOAD EXCEEDS SUBSTRUCTURE LIMIT" : "STRUCTURAL COMPLIANCE VERIFIED: SAFE RESIDENTIAL POINT LOAD"}
                  </span>
                </div>
                <p className="text-[11px] text-[#D8D2C5] mt-1 leading-relaxed">
                  {isOverloadRisk 
                    ? `Point-load concentration exceeds ${activeSubstructure.name} rating (${substructurePresets.find(s=>s.id===selectedSubstructureId)?.maxLoadKgM2} kg/m²). Install a sub-floor steel load distribution spreader plate or select cast concrete foundation.`
                    : `Static point load falls within safe DIN 1055 floor deflection margins. Installation approved without structural joist sistering or heavy slab modification.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Sound Wave Acoustic Bath Resonance Simulator */}
        <section id="soundwave-resonance" className="bg-[#141519] border border-[#252830] p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#24262B] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">
                <Volume2 className="w-3.5 h-3.5" />
                [ACOUSTIC MEMBRANE TRANSDUCER SYSTEM]
              </div>
              <h2 className="text-2xl font-light text-[#FFFFFF]">
                Kaldewei Sound Wave Acoustic Engineering
              </h2>
              <p className="text-xs text-[#9E9B93] mt-1 max-w-2xl">
                The bathtub body becomes an acoustic soundboard. Six concealed Bluetooth exciter transducers bond to the steel exterior, radiating high-fidelity acoustic frequencies directly through the water without visible speaker grilles.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setSoundWaveMode("ambient")}
                className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
                  soundWaveMode === "ambient"
                    ? "bg-[#C5A059] text-[#0E0F11] border-[#C5A059] font-bold"
                    : "bg-[#101114] text-[#8C887F] border-[#252830] hover:text-[#FFFFFF]"
                }`}
              >
                432Hz Ambient Theta
              </button>
              <button
                onClick={() => setSoundWaveMode("hifi")}
                className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
                  soundWaveMode === "hifi"
                    ? "bg-[#C5A059] text-[#0E0F11] border-[#C5A059] font-bold"
                    : "bg-[#101114] text-[#8C887F] border-[#252830] hover:text-[#FFFFFF]"
                }`}
              >
                Full-Spectrum Hi-Fi
              </button>
              <button
                onClick={() => setSoundWaveMode("tactile")}
                className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
                  soundWaveMode === "tactile"
                    ? "bg-[#C5A059] text-[#0E0F11] border-[#C5A059] font-bold"
                    : "bg-[#101114] text-[#8C887F] border-[#252830] hover:text-[#FFFFFF]"
                }`}
              >
                Tactile Hydro-Resonance
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visualizer Frame */}
            <div className="lg:col-span-7 bg-[#0E0F11] border border-[#252830] p-6 space-y-6">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8C887F]">ACOUSTIC TRANSDUCER TELEMETRY</span>
                <span className="text-[#C5A059] flex items-center gap-1.5 font-bold">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  TRANSDUCER ARRAY: 6 UNITS ACTIVE
                </span>
              </div>

              {/* Animated Wave Simulation (Pure SVG, zero lag) */}
              <div className="h-40 flex items-center justify-center relative overflow-hidden bg-[#121317] border border-[#1E2026]">
                <svg className="w-full h-full" viewBox="0 0 600 160">
                  <path
                    d={soundWaveMode === "ambient"
                      ? "M 0 80 Q 75 30 150 80 T 300 80 T 450 80 T 600 80"
                      : soundWaveMode === "hifi"
                      ? "M 0 80 Q 30 20 60 80 T 120 80 T 180 80 T 240 80 T 300 80 T 360 80 T 420 80 T 480 80 T 540 80 T 600 80"
                      : "M 0 80 Q 150 5 300 80 T 600 80"}
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="2.5"
                    className="transition-all duration-500"
                  />
                  <path
                    d={soundWaveMode === "ambient"
                      ? "M 0 80 Q 75 130 150 80 T 300 80 T 450 80 T 600 80"
                      : soundWaveMode === "hifi"
                      ? "M 0 80 Q 30 140 60 80 T 120 80 T 180 80 T 240 80 T 300 80 T 360 80 T 420 80 T 480 80 T 540 80 T 600 80"
                      : "M 0 80 Q 150 155 300 80 T 600 80"}
                    fill="none"
                    stroke="#6BA4B8"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-70 transition-all duration-500"
                  />
                </svg>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-6 text-[10px] font-mono text-[#58554F]">
                  <span>20 Hz (Deep Bass)</span>
                  <span>1 kHz (Vocal Mid)</span>
                  <span>20 kHz (Crystalline Treble)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-xs font-mono">
                <div className="p-3 bg-[#15171D] border border-[#22252E]">
                  <p className="text-[#8C887F]">EXTERIOR BLEED</p>
                  <p className="text-base text-[#FFFFFF] font-light mt-1">&lt;15 dB (Whisper)</p>
                </div>
                <div className="p-3 bg-[#15171D] border border-[#22252E]">
                  <p className="text-[#8C887F]">IN-WATER EFFICIENCY</p>
                  <p className="text-base text-[#C5A059] font-light mt-1">4.3x Air Speed</p>
                </div>
                <div className="p-3 bg-[#15171D] border border-[#22252E]">
                  <p className="text-[#8C887F]">PROTOCOL</p>
                  <p className="text-base text-[#FFFFFF] font-light mt-1">Bluetooth 5.2 AptX</p>
                </div>
              </div>
            </div>

            {/* Acoustic System Narrative */}
            <div className="lg:col-span-5 space-y-4 text-xs font-mono text-[#B2AEA6]">
              <div className="space-y-2">
                <span className="text-[#C5A059] uppercase tracking-wider font-bold">
                  PHYSICAL ACOUSTIC PRINCIPLE
                </span>
                <p className="leading-relaxed">
                  Sound waves travel at approximately 1,480 meters per second through water—over four times faster than through air. Kaldewei utilizes the rigid 3.5mm titanium-steel substrate as an ideal vibration conductor.
                </p>
              </div>

              <div className="space-y-2 border-t border-[#202229] pt-3">
                <span className="text-[#FFFFFF] uppercase tracking-wider font-bold">
                  ZERO SURFACE PENETRATION
                </span>
                <p className="leading-relaxed">
                  Transducer exciters are bonded directly to the unglazed reverse side of the steel shell inside the bathroom furniture or tile apron cavity. The interior enamel remains uninterrupted, maintaining 100% water hygiene and ease of maintenance.
                </p>
              </div>

              <div className="space-y-2 border-t border-[#202229] pt-3">
                <span className="text-[#FFFFFF] uppercase tracking-wider font-bold">
                  SUB-FLOOR ACOUSTIC DECOUPLING
                </span>
                <p className="leading-relaxed">
                  Every Sound Wave bath includes structural rubber isolation dampeners beneath the bath feet, ensuring acoustic energy transfers exclusively into water and bather, with zero vibrational transfer into the building structural slab.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Glazed Titanium-Steel vs Acrylic Comparison Matrix */}
        <section className="bg-[#141519] border border-[#252830] p-6 md:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider">
              [MATERIAL SCIENCE COMPARATIVE ANALYSIS]
            </span>
            <h2 className="text-2xl font-light text-[#FFFFFF] mt-1">
              3.5mm Glazed Titanium-Steel vs Sanitary Acrylic
            </h2>
            <p className="text-xs text-[#9E9B93] mt-1">
              Why leading luxury architectural firms specify vitreous enamelled steel over petroleum-based acrylic resins.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2B2F38] bg-[#0E0F11]">
                  <th className="py-3 px-4 text-[#8C887F]">PERFORMANCE DIMENSION</th>
                  <th className="py-3 px-4 text-[#C5A059] font-bold">KALDEWEI 3.5MM STEEL ENAMEL</th>
                  <th className="py-3 px-4 text-[#7A766F]">CONVENTIONAL ACRYLIC RESIN</th>
                  <th className="py-3 px-4 text-[#8C887F]">ARCHITECTURAL ADVANTAGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202229]">
                <tr>
                  <td className="py-3.5 px-4 text-[#FFFFFF] font-semibold">Surface Hardness & Scratching</td>
                  <td className="py-3.5 px-4 text-[#C5A059]">Mohs Scale 7 (Harder than window glass)</td>
                  <td className="py-3.5 px-4 text-[#7A766F]">Mohs Scale 3 (Scratches with jewelry & sand)</td>
                  <td className="py-3.5 px-4 text-[#B2AEA6]">Zero micro-scratch clouding; impervious to pets & bath salts</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-[#FFFFFF] font-semibold">Thermal Storage & Heat Retention</td>
                  <td className="py-3.5 px-4 text-[#C5A059]">High thermal conductivity & steel radiant mass</td>
                  <td className="py-3.5 px-4 text-[#7A766F]">Low mass insulator; water cools via surface radiation</td>
                  <td className="py-3.5 px-4 text-[#B2AEA6]">Water stays bath-hot 38% longer through radiant steel absorption</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-[#FFFFFF] font-semibold">Chemical & Stain Resistance</td>
                  <td className="py-3.5 px-4 text-[#C5A059]">Non-porous glass glaze; impervious to acetone & dyes</td>
                  <td className="py-3.5 px-4 text-[#7A766F]">Absorbs hair dyes, essential oils, and solvents</td>
                  <td className="py-3.5 px-4 text-[#B2AEA6]">Direct sanitization with medical disinfectants without yellowing</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-[#FFFFFF] font-semibold">Ecological Lifecycle</td>
                  <td className="py-3.5 px-4 text-[#C5A059]">100% Circular Steel & Sand (Zero Plastic)</td>
                  <td className="py-3.5 px-4 text-[#7A766F]">Non-recyclable composite plastic (Landfill waste)</td>
                  <td className="py-3.5 px-4 text-[#B2AEA6]">Meets highest LEED / BREEAM sustainability architectural credits</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-[#FFFFFF] font-semibold">Manufacturer Warranty</td>
                  <td className="py-3.5 px-4 text-[#C5A059]">30-Year Guarantee DIN EN 14516</td>
                  <td className="py-3.5 px-4 text-[#7A766F]">Typically 2 to 5 years limited</td>
                  <td className="py-3.5 px-4 text-[#B2AEA6]">Generational longevity for luxury estate construction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Slide-Out Architectural Specification & Commission Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0E0F11]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#121317] border-l border-[#2B2F38] p-6 flex flex-col justify-between overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#202229] pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest">
                      [ARCHITECTURAL COMMISSION SPECIFIER]
                    </span>
                    <h3 className="text-xl font-light text-[#FFFFFF] mt-0.5">
                      Factory Build Specification
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 text-[#8C887F] hover:text-[#FFFFFF] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {orderConfirmed ? (
                  <div className="py-8 space-y-4 text-center">
                    <div className="w-12 h-12 bg-[#1A261C] border border-[#54B86A] text-[#54B86A] rounded-full mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-light text-[#FFFFFF]">Commission Reservation Confirmed</h4>
                    <p className="text-xs font-mono text-[#9E9B93] leading-relaxed">
                      Factory production slot allocated at Kaldewei Werk I in Ahlen, Germany. Technical CAD/BIM drawing package and escrow invoice dispatched to your executive email.
                    </p>
                    <div className="p-3 bg-[#191B20] border border-[#282B34] text-xs font-mono text-left space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#8C887F]">COMMISSION ID:</span>
                        <span className="text-[#C5A059]">KW-2026-ARCH-8842</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8C887F]">MODEL:</span>
                        <span className="text-[#FFFFFF]">{activeProduct.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8C887F]">ESCROW DEPOSIT:</span>
                        <span className="text-[#FFFFFF]">€3,500.00</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Active Selected Model Snapshot */}
                    <div className="p-4 bg-[#181A20] border border-[#252830] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-mono text-[#C5A059] uppercase tracking-wider">SELECTED VESSEL</p>
                          <h4 className="text-base text-[#FFFFFF] font-normal">{activeProduct.name}</h4>
                          <p className="text-[11px] font-mono text-[#8C887F]">{activeProduct.sku}</p>
                        </div>
                        <span className="text-sm font-mono text-[#FFFFFF] font-light">
                          €{activeProduct.price.toLocaleString("de-DE")}
                        </span>
                      </div>
                    </div>

                    {/* Finish Color Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[#8C887F] uppercase tracking-wider">
                        ENAMEL FINISH PALETTE:
                      </label>
                      <select
                        value={selectedFinish}
                        onChange={(e) => setSelectedFinish(e.target.value)}
                        className="w-full bg-[#181A20] border border-[#282B34] p-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#C5A059]"
                      >
                        <option value="Alpine White (High Gloss)">Alpine White 001 (High Gloss Reflective)</option>
                        <option value="Lava Black Matte">Lava Black Matte 057 (Coordinated Architectural Slate)</option>
                        <option value="Warm Oyster Matte">Warm Oyster Matte 060 (Natural Travertine Match)</option>
                        <option value="Manhattan Grey Gloss">Manhattan Grey Gloss 022 (Industrial Mineral)</option>
                      </select>
                    </div>

                    {/* Addon Toggles */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-mono text-[#8C887F] uppercase tracking-wider">
                        ARCHITECTURAL SPECIFICATION ADD-ONS:
                      </label>

                      {/* Sound Wave */}
                      <label className="flex items-start gap-3 p-3 bg-[#181A20] border border-[#252830] cursor-pointer hover:border-[#383C48] transition-colors">
                        <input
                          type="checkbox"
                          checked={soundWaveAddon}
                          onChange={(e) => setSoundWaveAddon(e.target.checked)}
                          className="mt-0.5 accent-[#C5A059]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Sound Wave Audio Transducer System</span>
                            <span className="text-[#C5A059]">+€1,450</span>
                          </div>
                          <p className="text-[10px] text-[#7A766F] mt-0.5">
                            6 concealed Bluetooth exciter pads on steel outer shell
                          </p>
                        </div>
                      </label>

                      {/* Anti-Slip Glaze */}
                      <label className="flex items-start gap-3 p-3 bg-[#181A20] border border-[#252830] cursor-pointer hover:border-[#383C48] transition-colors">
                        <input
                          type="checkbox"
                          checked={antiSlipAddon}
                          onChange={(e) => setAntiSlipAddon(e.target.checked)}
                          className="mt-0.5 accent-[#C5A059]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Invisible Anti-Slip Vitreous Grip</span>
                            <span className="text-[#C5A059]">+€280</span>
                          </div>
                          <p className="text-[10px] text-[#7A766F] mt-0.5">
                            Microscopic structured quartz glaze DIN 51097 Class B
                          </p>
                        </div>
                      </label>

                      {/* Monogram Drain Cover */}
                      <label className="flex items-start gap-3 p-3 bg-[#181A20] border border-[#252830] cursor-pointer hover:border-[#383C48] transition-colors">
                        <input
                          type="checkbox"
                          checked={monogramCoverAddon}
                          onChange={(e) => setMonogramCoverAddon(e.target.checked)}
                          className="mt-0.5 accent-[#C5A059]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Monogrammed Enamel Waste Cover</span>
                            <span className="text-[#C5A059]">+€190</span>
                          </div>
                          <p className="text-[10px] text-[#7A766F] mt-0.5">
                            Custom laser-etched family crest or architect project seal
                          </p>
                        </div>
                      </label>

                      {/* Decoupling Kit */}
                      <label className="flex items-start gap-3 p-3 bg-[#181A20] border border-[#252830] cursor-pointer hover:border-[#383C48] transition-colors">
                        <input
                          type="checkbox"
                          checked={decouplingKitAddon}
                          onChange={(e) => setDecouplingKitAddon(e.target.checked)}
                          className="mt-0.5 accent-[#C5A059]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Acoustic Sub-Floor Decoupling Kit</span>
                            <span className="text-[#C5A059]">+€420</span>
                          </div>
                          <p className="text-[10px] text-[#7A766F] mt-0.5">
                            Heavy-duty elastomer isolation feet & flexible waste connection
                          </p>
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer & Escrow Confirmation */}
              <div className="border-t border-[#202229] pt-4 space-y-3">
                {!orderConfirmed ? (
                  <>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-[#8C887F]">
                        <span>BASE VESSEL:</span>
                        <span>€{basePrice.toLocaleString("de-DE")}</span>
                      </div>
                      <div className="flex justify-between text-[#8C887F]">
                        <span>SPECIFICATION ADD-ONS:</span>
                        <span>€{(configuredTotal - basePrice).toLocaleString("de-DE")}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-[#FFFFFF] border-t border-[#202229] pt-2">
                        <span>TOTAL SPECIFIED:</span>
                        <span className="text-[#C5A059]">€{configuredTotal.toLocaleString("de-DE")}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setOrderConfirmed(true)}
                      className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF67] text-[#0E0F11] text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                    >
                      CONFIRM ARCHITECTURAL RESERVATION (€3,500 ESCROW)
                    </button>

                    <p className="text-[10px] text-center font-mono text-[#6A6660]">
                      Protected by 30-year manufacturer warranty & direct factory production SLA
                    </p>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      setIsDrawerOpen(false);
                    }}
                    className="w-full py-3 bg-[#1B1D22] border border-[#2E313A] hover:bg-[#252830] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider"
                  >
                    RETURN TO SHOWCASE
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <footer className="border-t border-[#24262B] bg-[#0A0B0D] py-8 text-center text-xs font-mono text-[#7A766F] space-y-2">
        <p>
          BILLY BENJAMIN CONSULTING // SOVEREIGN REVENUE ARCHITECT &amp; DESIGN SYSTEM (v15.0-SINGULARITY)
        </p>
        <p className="text-[11px] text-[#5A5752]">
          Target Reconnaissance 14: Franz Kaldewei GmbH &amp; Co. KG (Ahlen, Germany) • Direct routing: <a href="mailto:billybenjamin836@gmail.com" className="text-[#C5A059] hover:underline">billybenjamin836@gmail.com</a>
        </p>
      </footer>

    </div>
  );
}

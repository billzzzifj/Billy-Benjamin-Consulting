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
  Radio,
  Zap,
  Sparkle,
  Compass,
  Cpu
} from "lucide-react";

interface AudioProduct {
  id: string;
  name: string;
  germanTitle: string;
  series: string;
  sku: string;
  priceUsd: number;
  sensitivityDb: number;
  nominalImpedanceOhm: number;
  minImpedanceOhm: number;
  continuousPowerHandlingWatts: number;
  peakPowerHandlingWatts: number;
  weightKg: number;
  dimensionsMm: { height: number; width: number; depth: number };
  driverTechnology: string;
  recommendedRoomAreaM2: { min: number; max: number };
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface RoomBoundaryPreset {
  id: string;
  name: string;
  acousticCharacter: string;
  reflectionCoefficient: number; // 0 to 1
  absorptionAlpha: number;
  description: string;
}

interface CartItem {
  productId: string;
  productName: string;
  priceUsd: number;
  finishOption: string;
  subwooferTowerPairIncluded: boolean;
  monoblockAmpPairIncluded: boolean;
  biWiringTerminalUpgrade: boolean;
  factoryCalibratedRooomTuning: boolean;
  sku: string;
  imageUrl: string;
}

export default function MblShowcasePage() {
  // Flagship MBL Radialstrahler and Reference catalog
  const products: AudioProduct[] = [
    {
      id: "101-x-treme",
      name: "Radialstrahler 101 X-Treme",
      germanTitle: "Referenz 4-Turm Radialstrahler System",
      series: "Reference Line Ultimate",
      sku: "MBL-REF-101X-TRM",
      priceUsd: 320000,
      sensitivityDb: 81.5,
      nominalImpedanceOhm: 4,
      minImpedanceOhm: 2.1,
      continuousPowerHandlingWatts: 900,
      peakPowerHandlingWatts: 2200,
      weightKg: 1650,
      dimensionsMm: { height: 1850, width: 490, depth: 640 },
      driverTechnology: "Dual 360° Radialstrahler Carbon Lamellae Array + Active Subwoofer Towers",
      recommendedRoomAreaM2: { min: 50, max: 200 },
      curatorNotes: "The undisputed apex of omnidirectional acoustic reproduction. Four freestanding towers comprising two main Radialstrahler satellite arrays and two active bass towers housing twelve 12-inch aluminum long-throw woofers driven by dedicated internal Class-D amplification.",
      images: [
        {
          label: "101 X-Treme 4-Tower Reference Architecture",
          url: "/assets/mbl/mbl-xtreme-hero.png",
          caption: "MBL Radialstrahler 101 X-Treme flagship system with carbon lamellae satellites and dual subwoofer towers."
        },
        {
          label: "Architectural Villa Listening Salon",
          url: "/assets/mbl/mbl-reference-villa.jpg",
          caption: "Reference Line system installed in double-height private architectural residence."
        },
        {
          label: "Reference Line Preamplifier Console",
          url: "/assets/mbl/mbl-preamp-console.jpg",
          caption: "Precision balanced preamplifier console with illuminated digital attenuation display."
        }
      ],
      accentColor: "#D4AF37"
    },
    {
      id: "101-e-mkii",
      name: "Radialstrahler 101 E MKII",
      germanTitle: "Radialstrahler 4-Wege Standlautsprecher",
      series: "Reference Line Iconic",
      sku: "MBL-REF-101E-MK2",
      priceUsd: 91000,
      sensitivityDb: 81.0,
      nominalImpedanceOhm: 4,
      minImpedanceOhm: 2.8,
      continuousPowerHandlingWatts: 500,
      peakPowerHandlingWatts: 1400,
      weightKg: 80,
      dimensionsMm: { height: 1720, width: 410, depth: 460 },
      driverTechnology: "4-Way 360° Radialstrahler Array with Hand-Selected Carbon Fiber Petals",
      recommendedRoomAreaM2: { min: 25, max: 80 },
      curatorNotes: "The iconic silhouette that redefined high-end audio physics. Pulsating spherical carbon lamellae for the tweeter and upper-midrange combined with an aluminum lower-mid melon and downward-firing subwoofer deliver a holographic 360-degree soundfield identical to live orchestral performance.",
      images: [
        {
          label: "101 E MKII Master Omnidirectional Tower",
          url: "/assets/mbl/mbl-101e-radialstrahler.jpg",
          caption: "Official studio portrait of the MBL 101 E MKII Radialstrahler in Piano Black with 24K Gold trim."
        },
        {
          label: "Eberswalde Acoustic Handcrafting",
          url: "/assets/mbl/mbl-manufacture-craft.jpg",
          caption: "Precision hand assembly of carbon fiber lamellae and magnetic motor assemblies in Germany."
        },
        {
          label: "Reference High-Current Monoblock Stage",
          url: "/assets/mbl/mbl-monoblock-amplifier.jpg",
          caption: "MBL Reference monoblock power amplifier engineered for continuous 40A current delivery."
        }
      ],
      accentColor: "#E5C158"
    },
    {
      id: "reference-9011-pair",
      name: "Reference 9011 Monoblock (Pair)",
      germanTitle: "Referenz Hochstrom-Monoblock-Endstufen",
      series: "Reference Line Amplification",
      sku: "MBL-AMP-9011-PR",
      priceUsd: 116000,
      sensitivityDb: 0,
      nominalImpedanceOhm: 0,
      minImpedanceOhm: 1.0,
      continuousPowerHandlingWatts: 840,
      peakPowerHandlingWatts: 5000,
      weightKg: 90,
      dimensionsMm: { height: 330, width: 480, depth: 610 },
      driverTechnology: "Ultra-High Current Discrete Direct-Drive Stage with Dual Toroidal Transformers",
      recommendedRoomAreaM2: { min: 25, max: 200 },
      curatorNotes: "Massive solid-copper busbar architecture delivering up to 5000 Watts peak power into 2 Ohms with 40 Amperes continuous current. Engineered specifically to eliminate dynamic compression on low-impedance Radialstrahler carbon lamellae.",
      images: [
        {
          label: "Reference Monoblock High-Current Powerhouse",
          url: "/assets/mbl/mbl-power-amp.jpg",
          caption: "Dual Reference monoblock power amplifiers with massive copper grounding and milled aluminum heatsinks."
        },
        {
          label: "111F Hybrid Radialstrahler Tower",
          url: "/assets/mbl/mbl-111f-hybrid.png",
          caption: "MBL 111F hybrid floorstanding loudspeaker combining radial midrange and high-efficiency dynamic woofers."
        },
        {
          label: "126 Compact Standmount Monitor",
          url: "/assets/mbl/mbl-126-compact.png",
          caption: "MBL 126 compact omnidirectional monitor with precision radial melon driver."
        }
      ],
      accentColor: "#F2D879"
    }
  ];

  // Room Boundary Presets
  const roomPresets: RoomBoundaryPreset[] = [
    {
      id: "glass-marble",
      name: "Penthouse Glass & Polished Marble",
      acousticCharacter: "Highly Reflective Live Space",
      reflectionCoefficient: 0.88,
      absorptionAlpha: 0.05,
      description: "Hard floor-to-ceiling glazing and stone flooring. Demands calibrated 1.8m+ wall boundary spacing and directional DSP decay tuning."
    },
    {
      id: "hardwood-rugs",
      name: "Executive Salon (Oak & Silk Rugs)",
      acousticCharacter: "Balanced Semi-Reflective Space",
      reflectionCoefficient: 0.52,
      absorptionAlpha: 0.28,
      description: "Classic luxury residential listening interior. Natural diffuse reflections create the ideal 70% diffuse to 30% direct sound ratio."
    },
    {
      id: "acoustic-atelier",
      name: "Treated Acoustic Listening Atelier",
      acousticCharacter: "Diffused Controlled Resonance",
      reflectionCoefficient: 0.25,
      absorptionAlpha: 0.65,
      description: "Dedicated private auditioning salon with quadratic residue diffusers and bass traps. Yields reference mastering-grade soundstage imaging."
    }
  ];

  // State Management
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Room Simulation Parameters
  const [roomLengthM, setRoomLengthM] = useState(10.5);
  const [roomWidthM, setRoomWidthM] = useState(7.0);
  const [roomHeightM, setRoomHeightM] = useState(3.4);
  const [wallOffsetM, setWallOffsetM] = useState(2.2);
  const [selectedRoomPresetId, setSelectedRoomPresetId] = useState("hardwood-rugs");

  // Configuration Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState("Piano Black + 24K Gold Hardware");
  const [includeSubwoofers, setIncludeSubwoofers] = useState(true);
  const [includeMonoblocks, setIncludeMonoblocks] = useState(false);
  const [biWiringUpgrade, setBiWiringUpgrade] = useState(true);
  const [roomTuningService, setRoomTuningService] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const activeProduct = products[activeProductIndex];
  const activeRoomPreset = roomPresets.find(r => r.id === selectedRoomPresetId) || roomPresets[0];

  // Real-time acoustic calculations
  const roomVolumeM3 = Math.round(roomLengthM * roomWidthM * roomHeightM);
  const totalSurfaceAreaM2 = Math.round(2 * (roomLengthM * roomWidthM + roomLengthM * roomHeightM + roomWidthM * roomHeightM));
  
  // Sabine equation for RT60 (seconds): RT60 = 0.161 * V / (S * alpha)
  const totalAbsorptionUnits = totalSurfaceAreaM2 * activeRoomPreset.absorptionAlpha;
  const rawRt60 = (0.161 * roomVolumeM3) / Math.max(totalAbsorptionUnits, 5);
  const rt60Seconds = Number(Math.max(0.28, Math.min(rawRt60, 1.85)).toFixed(2));
  
  // First boundary reflection delay (ms): Distance = 2 * wallOffsetM, Speed of sound = 343 m/s
  const firstReflectionDelayMs = Number(((wallOffsetM * 2 / 343) * 1000).toFixed(1));
  const isAcousticOptimum = rt60Seconds >= 0.35 && rt60Seconds <= 0.65 && firstReflectionDelayMs >= 11.0;

  // Soundstage Holography Score (0-100)
  const calculateHolographyScore = () => {
    let score = 98;
    if (rt60Seconds > 0.8) score -= Math.round((rt60Seconds - 0.8) * 45);
    if (rt60Seconds < 0.3) score -= 15;
    if (firstReflectionDelayMs < 8.0) score -= Math.round((8.0 - firstReflectionDelayMs) * 6);
    if (wallOffsetM < 1.5) score -= 12;
    return Math.max(score, 45);
  };
  const holographyScore = calculateHolographyScore();

  // Pricing calculations
  const basePrice = activeProduct.priceUsd;
  const subwoofersCost = (activeProduct.id !== "101-x-treme" && includeSubwoofers) ? 42000 : 0;
  const monoblocksCost = (activeProduct.id !== "reference-9011-pair" && includeMonoblocks) ? 116000 : 0;
  const biWiringCost = biWiringUpgrade ? 4800 : 0;
  const roomTuningCost = roomTuningService ? 7500 : 0;
  const totalConfiguredUsd = basePrice + subwoofersCost + monoblocksCost + biWiringCost + roomTuningCost;

  const handleAddToCart = () => {
    const newItem: CartItem = {
      productId: activeProduct.id,
      productName: activeProduct.name,
      priceUsd: totalConfiguredUsd,
      finishOption: selectedFinish,
      subwooferTowerPairIncluded: includeSubwoofers,
      monoblockAmpPairIncluded: includeMonoblocks,
      biWiringTerminalUpgrade: biWiringUpgrade,
      factoryCalibratedRooomTuning: roomTuningService,
      sku: `${activeProduct.sku}-${selectedFinish.includes("Gold") ? "GLD" : "CRM"}`,
      imageUrl: activeProduct.images[0].url
    };
    setCart([newItem]);
    setIsDrawerOpen(true);
    setOrderConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#EAE6DF] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#0A0A0C]">
      
      {/* Top Telemetry & Swiss Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#222329]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8F8C84] hover:text-[#FFFFFF] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              PORTFOLIO RADAR
            </Link>
            <div className="h-4 w-px bg-[#222329] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">
                [PROSPECT 15 // APEX TELEMETRY]
              </span>
              <span className="text-xs text-[#6E6B65] hidden md:inline">
                MBL AKUSTIKGERÄTE // BERLIN &amp; EBERSWALDE, GERMANY
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#room-simulator"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#D4CDC3] hover:text-[#FFFFFF] transition-colors"
            >
              <Radio className="w-3.5 h-3.5 text-[#D4AF37]" />
              360° ROOM DISPERSION
            </a>
            <a 
              href="#current-matcher"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#D4CDC3] hover:text-[#FFFFFF] transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
              CURRENT DAMPING TELEMETRY
            </a>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative inline-flex items-center gap-2 px-3 py-2 bg-[#17181D] hover:bg-[#202229] border border-[#2B2D36] rounded-none text-xs font-mono text-[#EAE6DF] transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>ATELIER ALLOCATION</span>
              {cart.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#D4AF37] text-[#0A0A0C] text-[10px] font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Architectural Showcase Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">

        {/* Section 01: Hero Diagnostic & Executive Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#222329] pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#14151A] border border-[#282A33] text-[11px] font-mono tracking-wider text-[#D4AF37]">
              <Volume2 className="w-3 h-3" />
              OMNIDIRECTIONAL ACOUSTIC ARCHITECTURE // 360° CARBON RADIALSTRAHLER
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FFFFFF] leading-tight">
              Eliminating Penthouse Room Reflection Anxiety &amp; Low-Impedance Current Hesitation for Flagship Audiophiles
            </h1>
            <p className="text-sm md:text-base text-[#9C988F] leading-relaxed max-w-3xl">
              Connoisseurs evaluating a $91,000 to $320,000 MBL Radialstrahler commission abandon digital consultation funnels over two primary points of friction: boundary reflection anxiety (whether 360-degree pulsating soundwaves will smear in untreated luxury glass-and-marble salons) and current-delivery hesitation (whether their existing monoblocks can sustain 2-Ohm continuous impedance). This interactive engineering sandbox calculates room decay times (RT60) and current delivery in real time, converting speculative interest into confirmed private listening allocations.
            </p>
          </div>

          {/* Quick Metric Telemetry Box */}
          <div className="lg:col-span-4 bg-[#121317] border border-[#23252E] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E2028] pb-3">
              <span className="text-xs font-mono text-[#827E76]">MANUFACTURE BASE</span>
              <span className="text-xs font-mono text-[#EAE6DF] font-semibold">Berlin &amp; Eberswalde, Germany</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1E2028] pb-3">
              <span className="text-xs font-mono text-[#827E76]">DRIVER GEOMETRY</span>
              <span className="text-xs font-mono text-[#EAE6DF] font-semibold">360° Pulsating Spherical Lamellae</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1E2028] pb-3">
              <span className="text-xs font-mono text-[#827E76]">DIFFUSE FIELD RATIO</span>
              <span className="text-xs font-mono text-[#D4AF37] font-semibold">70% Diffuse / 30% Direct (Concert Hall)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#827E76]">PEAK CURRENT HEADROOM</span>
              <span className="text-xs font-mono text-[#EAE6DF] font-semibold">40 Amperes @ 2 Ohms Load</span>
            </div>
          </div>
        </section>

        {/* Section 02: Flagship Radialstrahler Catalog & Gallery */}
        <section id="gallery" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">
                [REFERENCE MASTERPIECES // 3 TRANSDUCER ARCHITECTURES]
              </span>
              <h2 className="text-2xl font-light tracking-tight text-[#FFFFFF] mt-1">
                Spherical Soundfield Transducers
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
                      ? "bg-[#D4AF37] text-[#0A0A0C] border-[#D4AF37] font-bold"
                      : "bg-[#121317] text-[#9C988F] border-[#23252E] hover:border-[#383B47] hover:text-[#FFFFFF]"
                  }`}
                >
                  0{index + 1} // {product.name.replace("Radialstrahler ", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Active Product Staging Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Main Optical Stage */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] bg-[#121317] border border-[#23252E] overflow-hidden group flex items-center justify-center p-6">
                <img
                  src={activeProduct.images[activeImageIndex].url}
                  alt={activeProduct.images[activeImageIndex].label}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-102"
                />
                
                {/* HUD Overlay Badge */}
                <div className="absolute top-4 left-4 bg-[#0A0A0C]/85 backdrop-blur-sm border border-[#262832] px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[11px] font-mono text-[#EAE6DF] tracking-wide uppercase">
                    {activeProduct.images[activeImageIndex].label}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#0A0A0C]/85 backdrop-blur-sm border border-[#262832] px-3 py-1.5">
                  <span className="text-[11px] font-mono text-[#827E76]">
                    SLOT {activeImageIndex + 1} OF {activeProduct.images.length} // VERIFIED LOCAL HIGH-RES
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-4">
                {activeProduct.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[16/10] bg-[#121317] border overflow-hidden text-left transition-all p-2 flex items-center justify-center ${
                      activeImageIndex === idx 
                        ? "border-[#D4AF37] ring-1 ring-[#D4AF37]" 
                        : "border-[#23252E] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={image.label} 
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[#0A0A0C]/90 p-1.5">
                      <p className="text-[10px] font-mono text-[#EAE6DF] truncate">
                        0{idx + 1}. {image.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Technical Dossier & Immediate Allocation CTA */}
            <div className="lg:col-span-4 bg-[#121317] border border-[#23252E] p-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase">
                  {activeProduct.series}
                </span>
                <h3 className="text-2xl font-light text-[#FFFFFF] mt-1">
                  {activeProduct.name}
                </h3>
                <p className="text-xs font-mono text-[#827E76] mt-0.5">
                  {activeProduct.germanTitle}
                </p>
                <p className="text-xs text-[#B2AEA5] mt-3 leading-relaxed">
                  {activeProduct.curatorNotes}
                </p>
              </div>

              {/* Specification Grid */}
              <div className="space-y-3 border-t border-b border-[#23252E] py-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#827E76]">ACOUSTIC TRANSDUCER</span>
                  <span className="text-[#FFFFFF] text-right truncate max-w-[210px]">{activeProduct.driverTechnology}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#827E76]">SENSITIVITY (2.83V/1M)</span>
                  <span className="text-[#FFFFFF]">{activeProduct.sensitivityDb > 0 ? `${activeProduct.sensitivityDb} dB` : "Line Input Stage"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#827E76]">MINIMUM IMPEDANCE</span>
                  <span className="text-[#D4AF37]">{activeProduct.minImpedanceOhm} Ohms (High-Current Load)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#827E76]">PEAK POWER HANDLING</span>
                  <span className="text-[#FFFFFF]">{activeProduct.peakPowerHandlingWatts} Watts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#827E76]">TOTAL SYSTEM TARE</span>
                  <span className="text-[#FFFFFF]">{activeProduct.weightKg} kg (Cast Steel &amp; Aluminum)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#827E76]">ROOM VOLUMETRIC TARGET</span>
                  <span className="text-[#FFFFFF]">{activeProduct.recommendedRoomAreaM2.min}–{activeProduct.recommendedRoomAreaM2.max} m²</span>
                </div>
              </div>

              {/* Price & Allocation Action */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-[#827E76]">FACTORY ALLOCATION MSRP</span>
                  <span className="text-2xl font-mono text-[#FFFFFF] font-light">
                    ${activeProduct.priceUsd.toLocaleString("en-US")}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A0A0C] text-xs font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  RESERVE PRIVATE AUDITION &amp; BUILD
                </button>

                <p className="text-[11px] text-center font-mono text-[#736F67]">
                  Includes VIP Berlin/Eberswalde listening salon access &amp; master acoustician calibration
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Interactive 360° Room Reflection & RT60 Decay Simulator */}
        <section id="room-simulator" className="bg-[#121317] border border-[#23252E] p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222329] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
                <Radio className="w-3.5 h-3.5" />
                [ACOUSTIC WAVE PROPAGATION SIMULATOR]
              </div>
              <h2 className="text-2xl font-light text-[#FFFFFF]">
                360° Omnidirectional Room Dispersion &amp; RT60 Decay Engine
              </h2>
              <p className="text-xs text-[#9C988F] mt-1 max-w-2xl">
                Simulate how MBL&apos;s pulsating spherical soundwaves interact with your specific room volume, wall materials, and boundary offsets to verify uncompressed soundstage holography before delivery.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#17181D] border border-[#2B2D36] px-3 py-1.5 text-xs font-mono">
              <span className="text-[#827E76]">TRANSDUCER MODEL:</span>
              <span className="text-[#D4AF37] font-bold">{activeProduct.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sliders & Parameters Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Room Boundary Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#827E76] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                  SELECT LISTENING SALON BOUNDARY MATERIAL:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {roomPresets.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoomPresetId(room.id)}
                      className={`p-3 text-left border transition-all ${
                        selectedRoomPresetId === room.id
                          ? "bg-[#1C1D24] border-[#D4AF37] ring-1 ring-[#D4AF37]"
                          : "bg-[#0E0F12] border-[#23252E] hover:border-[#383B47]"
                      }`}
                    >
                      <p className="text-xs font-mono text-[#FFFFFF] font-semibold">{room.name}</p>
                      <p className="text-[10px] font-mono text-[#D4AF37] mt-0.5">{room.acousticCharacter}</p>
                      <p className="text-[10px] text-[#736F67] mt-1.5 leading-tight">
                        Reflection: {Math.round(room.reflectionCoefficient * 100)}%
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Dimensions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0E0F12] border border-[#23252E] p-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#827E76]">LENGTH:</span>
                    <span className="text-[#FFFFFF]">{roomLengthM} m</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.5"
                    value={roomLengthM}
                    onChange={(e) => setRoomLengthM(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] bg-[#222329] h-1.5 cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#827E76]">WIDTH:</span>
                    <span className="text-[#FFFFFF]">{roomWidthM} m</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    step="0.5"
                    value={roomWidthM}
                    onChange={(e) => setRoomWidthM(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] bg-[#222329] h-1.5 cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#827E76]">CEILING:</span>
                    <span className="text-[#FFFFFF]">{roomHeightM} m</span>
                  </div>
                  <input
                    type="range"
                    min="2.4"
                    max="6.0"
                    step="0.2"
                    value={roomHeightM}
                    onChange={(e) => setRoomHeightM(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] bg-[#222329] h-1.5 cursor-pointer"
                  />
                </div>
              </div>

              {/* Boundary Offset Slider */}
              <div className="space-y-2 bg-[#0E0F12] border border-[#23252E] p-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#827E76] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                    WALL BOUNDARY CLEARANCE OFFSET:
                  </span>
                  <span className="text-[#FFFFFF] font-bold">{wallOffsetM} meters from rear/side walls</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="4.5"
                  step="0.1"
                  value={wallOffsetM}
                  onChange={(e) => setWallOffsetM(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] bg-[#222329] h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#54514B]">
                  <span>0.8m (Compressed Field)</span>
                  <span>2.0m (Standard Audiophile Golden Ratio)</span>
                  <span>4.5m (Infinite Baffle Emulation)</span>
                </div>
              </div>
            </div>

            {/* Live Readout & Compliance HUD Column */}
            <div className="lg:col-span-5 bg-[#0E0F12] border border-[#23252E] p-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#827E76] uppercase tracking-wider">
                  HOLOGRAPHIC SOUNDSTAGE INDEX
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className={`text-4xl font-mono font-light ${
                    holographyScore >= 85 ? "text-[#54B86A]" : holographyScore >= 70 ? "text-[#D4AF37]" : "text-[#E65050]"
                  }`}>
                    {holographyScore} / 100
                  </span>
                  <span className="text-xs font-mono text-[#827E76]">Acoustic Immersion Rating</span>
                </div>
                <p className="text-[11px] font-mono text-[#736F67] mt-1">
                  Enclosure Volume: {roomVolumeM3} m³ ({Math.round(roomLengthM * roomWidthM)} m² floorplan)
                </p>
              </div>

              {/* RT60 Bar Indicator */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#827E76]">REVERBERATION DECAY TIME (RT60):</span>
                  <span className={rt60Seconds <= 0.65 && rt60Seconds >= 0.35 ? "text-[#54B86A] font-bold" : "text-[#D4AF37] font-bold"}>
                    {rt60Seconds} seconds
                  </span>
                </div>
                <div className="w-full bg-[#1A1C22] h-2">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      rt60Seconds <= 0.65 && rt60Seconds >= 0.35 ? "bg-[#54B86A]" : rt60Seconds > 0.8 ? "bg-[#E65050]" : "bg-[#D4AF37]"
                    }`}
                    style={{ width: `${Math.min((rt60Seconds / 1.5) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#54514B]">
                  <span>0.2s (Dead Studio)</span>
                  <span>0.45s (Concert Optimum)</span>
                  <span>1.5s+ (Echo Cathedral)</span>
                </div>
              </div>

              {/* First Boundary Reflection Delay */}
              <div className="space-y-2 border-t border-b border-[#1E2028] py-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#827E76]">First Reflection Arrival Time:</span>
                  <span className={firstReflectionDelayMs >= 10.0 ? "text-[#54B86A]" : "text-[#D4AF37]"}>
                    +{firstReflectionDelayMs} ms (Ear Integration Window: &gt;10ms)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#827E76]">Direct-to-Reflected Energy Ratio:</span>
                  <span className="text-[#FFFFFF]">
                    {Math.round((1 - activeRoomPreset.reflectionCoefficient) * 100)}% Direct / {Math.round(activeRoomPreset.reflectionCoefficient * 100)}% Diffuse Field
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#827E76]">Bass Mode Axial Resonances:</span>
                  <span className="text-[#FFFFFF]">
                    {(343 / (2 * roomLengthM)).toFixed(1)} Hz / {(343 / (2 * roomWidthM)).toFixed(1)} Hz
                  </span>
                </div>
              </div>

              {/* Status Verdict */}
              <div className={`p-3.5 border ${
                isAcousticOptimum 
                  ? "bg-[#142319] border-[#54B86A] text-[#54B86A]" 
                  : "bg-[#211E15] border-[#D4AF37] text-[#D4AF37]"
              }`}>
                <div className="flex items-center gap-2 text-xs font-mono font-bold">
                  {isAcousticOptimum ? <Check className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                  <span>
                    {isAcousticOptimum ? "OPTIMUM ORCHESTRAL DISPERSION VERIFIED" : "ROOM BOUNDARY COMPENSATION RECOMMENDED"}
                  </span>
                </div>
                <p className="text-[11px] text-[#D4CDC3] mt-1 leading-relaxed">
                  {isAcousticOptimum
                    ? `360-degree soundfield expands naturally. First reflection arrives past the 10ms Haas effect threshold, preserving precise pinpoint spatial localization with zero acoustic smear.`
                    : `In high-reflectance interiors, MBL factory DSP phase compensation or 2.0m+ boundary offset eliminates flutter echoes, preserving genuine Berlin Philharmonic hall acoustics.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Current Delivery & Monoblock Impedance Telemetry */}
        <section id="current-matcher" className="bg-[#121317] border border-[#23252E] p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222329] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
                <Zap className="w-3.5 h-3.5" />
                [SOLID-COPPER BUSBAR CURRENT TELEMETRY]
              </div>
              <h2 className="text-2xl font-light text-[#FFFFFF]">
                Low-Impedance Current Delivery &amp; Damping Factor Validation
              </h2>
              <p className="text-xs text-[#9C988F] mt-1 max-w-2xl">
                Carbon fiber lamellae operate as a pure mechanical acoustic piston. When impedance plunges to 2.1 Ohms in complex orchestral crescendos, conventional amplifiers collapse. MBL Reference amplifiers deliver unyielding current without thermal compression.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#17181D] border border-[#2B2D36] px-3 py-1.5 text-xs font-mono">
              <span className="text-[#827E76]">AMPLIFICATION BENCHMARK:</span>
              <span className="text-[#D4AF37] font-bold">MBL Reference 9011 (5000W Peak / 40A)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            <div className="p-5 bg-[#0E0F12] border border-[#23252E] space-y-3">
              <div className="flex items-center justify-between text-[#827E76]">
                <span>IMPEDANCE MINIMA</span>
                <Cpu className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <p className="text-3xl font-light text-[#FFFFFF]">2.1 Ω</p>
              <p className="text-[11px] text-[#9C988F] leading-relaxed">
                Measured at 380 Hz on Radialstrahler lower-mid lamellae. Demands high instantaneous current delivery without protection relay tripping.
              </p>
            </div>

            <div className="p-5 bg-[#0E0F12] border border-[#23252E] space-y-3">
              <div className="flex items-center justify-between text-[#827E76]">
                <span>CONTINUOUS CURRENT</span>
                <Zap className="w-4 h-4 text-[#54B86A]" />
              </div>
              <p className="text-3xl font-light text-[#54B86A]">40.0 A</p>
              <p className="text-[11px] text-[#9C988F] leading-relaxed">
                MBL 9011 monoblock sustained output via twin shielded toroidal transformers and custom high-amperage filter capacitor banks.
              </p>
            </div>

            <div className="p-5 bg-[#0E0F12] border border-[#23252E] space-y-3">
              <div className="flex items-center justify-between text-[#827E76]">
                <span>DAMPING FACTOR</span>
                <Activity className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <p className="text-3xl font-light text-[#FFFFFF]">&gt;300 @ 4Ω</p>
              <p className="text-[11px] text-[#9C988F] leading-relaxed">
                Guarantees instantaneous transient start-stop control over the pulsating carbon petals. Eliminates driver ringing and harmonic distortion.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Slide-Out Private Listening Atelier & Factory Allocation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0A0A0C]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#111216] border-l border-[#2B2D36] p-6 flex flex-col justify-between overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1E2028] pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                      [BERLIN / EBERSWALDE FACTORY RESERVATION]
                    </span>
                    <h3 className="text-xl font-light text-[#FFFFFF] mt-0.5">
                      Private Listening Atelier Allocation
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 text-[#827E76] hover:text-[#FFFFFF] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {orderConfirmed ? (
                  <div className="py-8 space-y-4 text-center">
                    <div className="w-12 h-12 bg-[#142319] border border-[#54B86A] text-[#54B86A] rounded-full mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-light text-[#FFFFFF]">Factory Production Slot Reserved</h4>
                    <p className="text-xs font-mono text-[#9C988F] leading-relaxed">
                      Allocation confirmed for MBL Werk Eberswalde. Chief acoustician consultation and VIP Berlin listening salon invitation dispatched to your executive email.
                    </p>
                    <div className="p-3 bg-[#17181E] border border-[#262832] text-xs font-mono text-left space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#827E76]">ALLOCATION CODE:</span>
                        <span className="text-[#D4AF37]">MBL-2026-BER-9941</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#827E76]">SYSTEM:</span>
                        <span className="text-[#FFFFFF]">{activeProduct.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#827E76]">ESCROW DEPOSIT:</span>
                        <span className="text-[#FFFFFF]">$15,000.00</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Active Selected System Snapshot */}
                    <div className="p-4 bg-[#16171D] border border-[#23252E] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">SELECTED SYSTEM</p>
                          <h4 className="text-base text-[#FFFFFF] font-normal">{activeProduct.name}</h4>
                          <p className="text-[11px] font-mono text-[#827E76]">{activeProduct.sku}</p>
                        </div>
                        <span className="text-sm font-mono text-[#FFFFFF] font-light">
                          ${activeProduct.priceUsd.toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>

                    {/* Finish Option Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-[#827E76] uppercase tracking-wider">
                        EBERSWALDE HAND-FINISHED PIANO LACQUER:
                      </label>
                      <select
                        value={selectedFinish}
                        onChange={(e) => setSelectedFinish(e.target.value)}
                        className="w-full bg-[#16171D] border border-[#272933] p-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Piano Black + 24K Gold Hardware">Piano High-Gloss Black + 24K Gold Hardware</option>
                        <option value="Piano Black + Chrome Hardware">Piano High-Gloss Black + Chrome Hardware</option>
                        <option value="Arctic White + Chrome Hardware">Arctic White High-Gloss + Chrome Hardware</option>
                        <option value="Satin Carbon + Matte Titanium Hardware">Satin Carbon + Matte Titanium Hardware</option>
                      </select>
                    </div>

                    {/* Add-on Upgrades */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-mono text-[#827E76] uppercase tracking-wider">
                        REFERENCE EXPANSION OPTIONS:
                      </label>

                      {/* Active Subwoofer Towers */}
                      {activeProduct.id !== "101-x-treme" && (
                        <label className="flex items-start gap-3 p-3 bg-[#16171D] border border-[#23252E] cursor-pointer hover:border-[#383B47] transition-colors">
                          <input
                            type="checkbox"
                            checked={includeSubwoofers}
                            onChange={(e) => setIncludeSubwoofers(e.target.checked)}
                            className="mt-0.5 accent-[#D4AF37]"
                          />
                          <div className="flex-1 text-xs font-mono">
                            <div className="flex justify-between">
                              <span className="text-[#FFFFFF]">Active 12&quot; Subwoofer Tower Pair</span>
                              <span className="text-[#D4AF37]">+$42,000</span>
                            </div>
                            <p className="text-[10px] text-[#736F67] mt-0.5">
                              Dual active sub towers delivering linear 20Hz infrasonic extension
                            </p>
                          </div>
                        </label>
                      )}

                      {/* 9011 Monoblocks */}
                      {activeProduct.id !== "reference-9011-pair" && (
                        <label className="flex items-start gap-3 p-3 bg-[#16171D] border border-[#23252E] cursor-pointer hover:border-[#383B47] transition-colors">
                          <input
                            type="checkbox"
                            checked={includeMonoblocks}
                            onChange={(e) => setIncludeMonoblocks(e.target.checked)}
                            className="mt-0.5 accent-[#D4AF37]"
                          />
                          <div className="flex-1 text-xs font-mono">
                            <div className="flex justify-between">
                              <span className="text-[#FFFFFF]">Reference 9011 Monoblock Amp Pair</span>
                              <span className="text-[#D4AF37]">+$116,000</span>
                            </div>
                            <p className="text-[10px] text-[#736F67] mt-0.5">
                              5000W peak power / 40A high-current direct-drive pair
                            </p>
                          </div>
                        </label>
                      )}

                      {/* Bi-Wiring Solid Copper Terminals */}
                      <label className="flex items-start gap-3 p-3 bg-[#16171D] border border-[#23252E] cursor-pointer hover:border-[#383B47] transition-colors">
                        <input
                          type="checkbox"
                          checked={biWiringUpgrade}
                          onChange={(e) => setBiWiringUpgrade(e.target.checked)}
                          className="mt-0.5 accent-[#D4AF37]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">24K Solid Copper Wingnut Terminals</span>
                            <span className="text-[#D4AF37]">+$4,800</span>
                          </div>
                          <p className="text-[10px] text-[#736F67] mt-0.5">
                            Low-mass oxygen-free copper bi-wiring terminal blocks
                          </p>
                        </div>
                      </label>

                      {/* On-Site Master Acoustician Tuning */}
                      <label className="flex items-start gap-3 p-3 bg-[#16171D] border border-[#23252E] cursor-pointer hover:border-[#383B47] transition-colors">
                        <input
                          type="checkbox"
                          checked={roomTuningService}
                          onChange={(e) => setRoomTuningService(e.target.checked)}
                          className="mt-0.5 accent-[#D4AF37]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">On-Site Eberswalde Master Acoustician</span>
                            <span className="text-[#D4AF37]">+$7,500</span>
                          </div>
                          <p className="text-[10px] text-[#736F67] mt-0.5">
                            Factory physical installation, laser alignment, and calibrated microphone tuning
                          </p>
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer & Escrow Confirmation */}
              <div className="border-t border-[#1E2028] pt-4 space-y-3">
                {!orderConfirmed ? (
                  <>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-[#827E76]">
                        <span>BASE HARDWARE:</span>
                        <span>${basePrice.toLocaleString("en-US")}</span>
                      </div>
                      <div className="flex justify-between text-[#827E76]">
                        <span>REFERENCE UPGRADES:</span>
                        <span>${(totalConfiguredUsd - basePrice).toLocaleString("en-US")}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-[#FFFFFF] border-t border-[#1E2028] pt-2">
                        <span>TOTAL SYSTEM INVESTMENT:</span>
                        <span className="text-[#D4AF37]">${totalConfiguredUsd.toLocaleString("en-US")}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setOrderConfirmed(true)}
                      className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A0A0C] text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                    >
                      CONFIRM FACTORY ALLOCATION ($15,000 ESCROW)
                    </button>

                    <p className="text-[10px] text-center font-mono text-[#636058]">
                      Includes 5-year global factory warranty &amp; direct Eberswalde master certification
                    </p>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      setIsDrawerOpen(false);
                    }}
                    className="w-full py-3 bg-[#17181D] border border-[#2B2D36] hover:bg-[#202229] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider"
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
      <footer className="border-t border-[#222329] bg-[#070709] py-8 text-center text-xs font-mono text-[#736F67] space-y-2">
        <p>
          BILLY BENJAMIN CONSULTING // SOVEREIGN REVENUE ARCHITECT &amp; DESIGN SYSTEM (v15.0-SINGULARITY)
        </p>
        <p className="text-[11px] text-[#54514B]">
          Target Reconnaissance 15: MBL Akustikgeräte GmbH &amp; Co. KG (Berlin &amp; Eberswalde, Germany) • Direct routing: <a href="mailto:billybenjamin836@gmail.com" className="text-[#D4AF37] hover:underline">billybenjamin836@gmail.com</a>
        </p>
      </footer>

    </div>
  );
}

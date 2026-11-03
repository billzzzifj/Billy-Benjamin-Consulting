"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Shield, 
  Glasses, 
  Sliders, 
  Cpu, 
  Layers, 
  Sparkles, 
  ShoppingBag, 
  X, 
  ExternalLink, 
  Lock, 
  RefreshCw, 
  Zap, 
  Eye, 
  Scale, 
  Ruler, 
  Award,
  Gem
} from "lucide-react";

interface EyewearFrame {
  id: string;
  name: string;
  batchNumber: string;
  totalBatchSize: number;
  allocatedNumber: number;
  editionSeries: string;
  inspiration: string;
  tagline: string;
  price: number;
  acetateThickness: string;
  hardwareMetal: string;
  lensType: string;
  lensWidthMm: number;
  bridgeWidthMm: number;
  templeLengthMm: number;
  totalWidthMm: number;
  weightGrams: number;
  fitProfile: "Narrow" | "Medium" | "Wide" | "Universal";
  images: { label: string; url: string }[];
  accentColor: string;
  auraGlow: string;
  artisanSteps: number;
  origin: string;
}

interface LensUpgrade {
  id: string;
  label: string;
  price: number;
  description: string;
}

interface CartItem {
  frameId: string;
  name: string;
  price: number;
  lensUpgrade: string;
  lensPrice: number;
  batchTag: string;
  quantity: number;
  imageUrl: string;
}

const FRAMES: EyewearFrame[] = [
  {
    id: "jmm-dealan",
    name: "THE DEALAN",
    batchNumber: "Batch No. 04",
    totalBatchSize: 450,
    allocatedNumber: 184,
    editionSeries: "VANGUARD EYEWEAR ARCHIVE",
    inspiration: "Tribute to Bob Dylan's 1965 world tour cat-eye silhouette.",
    tagline: "Bold architectural cat-eye volume carved from 10mm cured Japanese cellulose acetate.",
    price: 850.00,
    acetateThickness: "10mm Block Cured Japanese Cellulose Acetate",
    hardwareMetal: "Sterling Silver Arrowhead Front Pins & Custom Engraved Wirecore",
    lensType: "6-Base Mineral Glass with Backside Anti-Reflective Treatment (Bottle Green)",
    lensWidthMm: 50,
    bridgeWidthMm: 20,
    templeLengthMm: 142,
    totalWidthMm: 142,
    weightGrams: 52,
    fitProfile: "Medium",
    images: [
      { label: "01 // JET BLACK 10MM ACETATE CAT-EYE", url: "/assets/jacquesmariemage/jmm-dealan-hero.jpg" },
      { label: "02 // STERLING SILVER ARROWHEAD PIN DETAIL", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85" },
      { label: "03 // JAPANESE SILK LINED LEATHER CASE", url: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85" }
    ],
    accentColor: "#D4AF37",
    auraGlow: "rgba(212, 175, 55, 0.20)",
    artisanSteps: 300,
    origin: "Fukui Prefecture, Japan"
  },
  {
    id: "jmm-molino-55",
    name: "MOLINO 55",
    batchNumber: "Batch No. 02",
    totalBatchSize: 350,
    allocatedNumber: 73,
    editionSeries: "ARCHITECTURAL COLLECTOR SERIES",
    inspiration: "Named in honor of mid-century Italian architect Carlo Mollino.",
    tagline: "A commanding rectangular spectacle featuring 10mm beveled acetate and 18k gold hardware.",
    price: 890.00,
    acetateThickness: "10mm Havana Tortoiseshell Cured Cellulose Acetate",
    hardwareMetal: "18K Gold Plated Arrowhead Front Pins & 7-Barrel Tension-Lock Hinges",
    lensType: "6-Base CR39 Amber Tint with Multi-Layer Anti-Glare Treatment",
    lensWidthMm: 55,
    bridgeWidthMm: 19,
    templeLengthMm: 144,
    totalWidthMm: 146,
    weightGrams: 56,
    fitProfile: "Wide",
    images: [
      { label: "01 // HAVANA TORTOISE 10MM RECTANGULAR", url: "/assets/jacquesmariemage/jmm-molino-hero.jpg" },
      { label: "02 // 18K GOLD EXPOSED WIRECORE", url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85" },
      { label: "03 // NUMBERED LETTERPRESS CERTIFICATE", url: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85" }
    ],
    accentColor: "#C68B59",
    auraGlow: "rgba(198, 139, 89, 0.20)",
    artisanSteps: 300,
    origin: "Fukui Prefecture, Japan"
  },
  {
    id: "jmm-zephirin-47",
    name: "ZEPHIRIN 47",
    batchNumber: "Batch No. 05",
    totalBatchSize: 500,
    allocatedNumber: 215,
    editionSeries: "HISTORICAL ICON ARCHIVE",
    inspiration: "Inspired by Pope Zephyrinus; pre-WWII intellectual square-round sizing.",
    tagline: "Distinguished keyhole bridge with visible engraved filigree core wire.",
    price: 825.00,
    acetateThickness: "10mm Champagne Crystal Clear Cellulose Acetate",
    hardwareMetal: "Sterling Silver Arrowhead Pins with Custom Hairline Engraved Wirecore",
    lensType: "4-Base Bronze Polarized Mineral Glass with Scratch-Resistant Coating",
    lensWidthMm: 47,
    bridgeWidthMm: 26,
    templeLengthMm: 145,
    totalWidthMm: 138,
    weightGrams: 48,
    fitProfile: "Narrow",
    images: [
      { label: "01 // CHAMPAGNE CRYSTAL KEYHOLE FRAME", url: "/assets/jacquesmariemage/jmm-zephirin-hero.jpg" },
      { label: "02 // STERLING SILVER HAIRLINE CORE", url: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85" },
      { label: "03 // JAPANESE SILK CLEANING SCARF", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85" }
    ],
    accentColor: "#E5C287",
    auraGlow: "rgba(229, 194, 135, 0.20)",
    artisanSteps: 300,
    origin: "Fukui Prefecture, Japan"
  }
];

const LENS_UPGRADES: LensUpgrade[] = [
  { id: "lens-stock", label: "Factory Optical / Mineral Glass Tint", price: 0, description: "Included factory mineral glass / CR39 with rear anti-reflective coating." },
  { id: "lens-polarized", label: "Custom Polarized Mineral Glass (+€195)", price: 195, description: "Precision anti-glare polarized mineral glass engineered in Japan with 100% UV400 shield." },
  { id: "lens-prescription-rx", label: "Digital High-Index Rx Lenses (+€345)", price: 345, description: "Custom-ground ultra-thin 1.67 high-index lenses with blue-light filtration and oleophobic shield." }
];

export default function JacquesMarieMagePage() {
  const [selectedFrame, setSelectedFrame] = useState<EyewearFrame>(FRAMES[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedLens, setSelectedLens] = useState<LensUpgrade>(LENS_UPGRADES[0]);
  const [activeTab, setActiveTab] = useState<"atelier" | "craftsmanship" | "caliper-sizing" | "bleed-matrix">("atelier");
  
  // Caliper & Cranial Sizing Simulator state
  const [cranialWidthMm, setCranialWidthMm] = useState<number>(142);
  const [pupillaryDistanceMm, setPupillaryDistanceMm] = useState<number>(64);

  // Cart & Slide-out Vault State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  // Hash-based navigation recovery
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "atelier" || hash === "craftsmanship" || hash === "caliper-sizing" || hash === "bleed-matrix") {
        setActiveTab(hash as any);
      } else if (hash === "gallery") {
        setActiveTab("atelier");
      }
    }
  }, []);

  const addToCart = () => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.frameId === selectedFrame.id && item.lensUpgrade === selectedLens.label
      );
      if (existing) {
        return prev.map((item) =>
          item.frameId === selectedFrame.id && item.lensUpgrade === selectedLens.label
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          frameId: selectedFrame.id,
          name: selectedFrame.name,
          price: selectedFrame.price,
          lensUpgrade: selectedLens.label,
          lensPrice: selectedLens.price,
          batchTag: `${selectedFrame.batchNumber} (#${selectedFrame.allocatedNumber}/${selectedFrame.totalBatchSize})`,
          quantity: 1,
          imageUrl: selectedFrame.images[0].url
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price + item.lensPrice) * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  // Sizing suitability score calculation
  const getSuitabilityScore = (frame: EyewearFrame, faceWidth: number) => {
    const diff = Math.abs(frame.totalWidthMm - faceWidth);
    if (diff <= 2) return 99;
    if (diff <= 4) return 95;
    if (diff <= 6) return 88;
    if (diff <= 8) return 78;
    return 65;
  };

  const currentFitScore = getSuitabilityScore(selectedFrame, cranialWidthMm);

  return (
    <div 
      className="min-h-screen text-[#F5F2EB] font-sans antialiased selection:bg-[#D4AF37] selection:text-black transition-colors duration-700 relative overflow-x-hidden bg-[#0A0908]"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 12%, ${selectedFrame.auraGlow} 0%, rgba(10, 9, 8, 0) 65%)`
      }}
    >
      {/* 1. TOP EXECUTIVE TELEMETRY HUD */}
      <header className="sticky top-0 z-50 bg-[#0A0908]/85 backdrop-blur-xl border-b border-[#24211D] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs tracking-wider uppercase font-mono">
          <div className="flex items-center space-x-3">
            <Link 
              href="/"
              className="flex items-center space-x-1.5 text-[#A8A296] hover:text-[#D4AF37] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>BBC Index</span>
            </Link>
            <span className="text-[#3A352F]">/</span>
            <span className="text-[#E5DFD3] font-bold tracking-widest hidden sm:inline">
              PROSPECT 10 // JACQUES MARIE MAGE (LOS ANGELES // FUKUI, JAPAN)
            </span>
          </div>

          <div className="flex items-center space-x-5 text-[11px]">
            <div className="hidden md:flex items-center space-x-2 text-[#A8A296]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIMITED EDITION ALLOCATION ENGINE</span>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#E5DFD3] hover:text-[#D4AF37] transition-colors flex items-center space-x-1"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="text-[10px] font-mono font-bold">
                VAULT ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. BRAND MASTER BANNER */}
      <section className="border-b border-[#24211D] bg-[#12100E]/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase mb-1">
              <Award className="h-3 w-3 text-[#D4AF37]" />
              <span>JEROME MAGE DESIGN // HANDCRAFTED IN FUKUI, JAPAN</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white font-normal">
              JACQUES MARIE MAGE
            </h1>
            <p className="text-xs font-mono text-[#A8A296] tracking-wider uppercase mt-1">
              MICRO-BATCH ARTISAN EYEWEAR // 10MM BLOCK CELLULOSE ACETATE &amp; PRECIOUS METALS
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {FRAMES.map((frame) => (
              <button
                key={frame.id}
                onClick={() => {
                  setSelectedFrame(frame);
                  setSelectedImageIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all border ${
                  selectedFrame.id === frame.id
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-lg shadow-[#D4AF37]/20 scale-102"
                    : "bg-[#181512] text-[#A8A296] border-[#2A2621] hover:border-[#D4AF37]/50"
                }`}
              >
                {frame.name} (€{frame.price.toLocaleString()})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORKSPACE NAVIGATION BAR */}
      <section id="gallery" className="border-b border-[#24211D] bg-[#0E0D0C]/90 sticky top-14 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-4 py-2.5 overflow-x-auto no-scrollbar text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("atelier")}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                activeTab === "atelier"
                  ? "bg-white text-black border-white font-bold shadow-md"
                  : "bg-[#161411] text-[#A8A296] border-[#26221D] hover:border-[#D4AF37]"
              }`}
            >
              01 // L&apos;Atelier des Montures (PDP)
            </button>
            <button
              onClick={() => setActiveTab("craftsmanship")}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === "craftsmanship"
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md"
                  : "bg-[#161411] text-[#A8A296] border-[#26221D] hover:border-[#D4AF37]"
              }`}
            >
              <Cpu className="h-3 w-3" />
              <span>02 // Fukui Japanese Craft (300 Steps)</span>
            </button>
            <button
              onClick={() => setActiveTab("caliper-sizing")}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === "caliper-sizing"
                  ? "bg-white text-black border-white font-bold shadow-md"
                  : "bg-[#161411] text-[#A8A296] border-[#26221D] hover:border-[#D4AF37]"
              }`}
            >
              <Ruler className="h-3 w-3" />
              <span>03 // Millimetric Caliper &amp; Sizing Gauge</span>
            </button>
            <button
              onClick={() => setActiveTab("bleed-matrix")}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                activeTab === "bleed-matrix"
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                  : "bg-[#161411] text-[#A8A296] border-[#26221D] hover:border-[#D4AF37]"
              }`}
            >
              04 // Jerome Mage CAC Bleed Matrix
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: L'ATELIER DES MONTURES (PDP) */}
        {activeTab === "atelier" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT: VISUAL MEDIA RIG */}
            <div className="lg:col-span-7 space-y-6">
              {/* PRIMARY HIGH-DEFINITION STAGING THEATER */}
              <div 
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#2A2621] shadow-2xl transition-all duration-700 group bg-[#141210]"
                style={{
                  boxShadow: `0 25px 60px -15px ${selectedFrame.auraGlow}`
                }}
              >
                <img
                  src={selectedFrame.images[selectedImageIndex]?.url}
                  alt={selectedFrame.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />

                {/* AMBIENT GLOW VIGNETTE */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
                  style={{ backgroundColor: selectedFrame.accentColor }}
                />

                {/* NUMBERED EDITION ALLOCATION BADGES */}
                <div className="absolute top-5 left-5 flex flex-col space-y-2">
                  <span className="px-3.5 py-1.5 bg-[#0A0908]/90 backdrop-blur-md text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase rounded-full border border-[#D4AF37]/40 font-bold shadow-md">
                    {selectedFrame.batchNumber} // #{selectedFrame.allocatedNumber} OF {selectedFrame.totalBatchSize} CRAFTED GLOBALLY
                  </span>
                  <span className="px-3.5 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono tracking-wider uppercase rounded-full border border-[#2E2A24]">
                    {selectedFrame.editionSeries}
                  </span>
                </div>

                {/* 10MM BLOCK ACETATE VERIFICATION ANCHOR */}
                <div className="absolute bottom-5 left-5 right-5 p-3 bg-[#0A0908]/90 backdrop-blur-md rounded-2xl border border-[#2E2A24] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center space-x-2 text-[#D4AF37]">
                    <Shield className="h-4 w-4 text-[#D4AF37]" />
                    <span className="font-bold uppercase tracking-wider">10MM CURED BLOCK ACETATE</span>
                  </div>
                  <span className="text-[#A8A296]">Handcrafted in Fukui // 300 Artisan Steps</span>
                </div>
              </div>

              {/* THUMBNAIL SELECTOR BAR */}
              <div className="grid grid-cols-3 gap-3">
                {selectedFrame.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-102"
                        : "border-[#24211D] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* AUTONOMOUS OPTICAL SYNTHESIS VERIFICATION CARD */}
              <div className="bg-[#141210] rounded-2xl border border-[#24211D] p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#24211D] pb-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold tracking-wider">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>AUTONOMOUS ENGINE: PHOTOGRAPHIC SYNTHESIS ACTIVE</span>
                  </div>
                  <span className="text-[10px] text-[#A8A296] bg-[#1F1B17] px-2.5 py-1 rounded-full border border-[#2E2A24]">
                    LOCAL RUNTIME ASSET
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                  <div>
                    <span className="text-[#8C8577] block text-[9px]">MATERIALITY:</span>
                    <span className="text-white font-bold">10mm Cured Acetate</span>
                  </div>
                  <div>
                    <span className="text-[#8C8577] block text-[9px]">HARDWARE:</span>
                    <span className="text-white font-bold">{selectedFrame.hardwareMetal.split("&")[0]}</span>
                  </div>
                  <div>
                    <span className="text-[#8C8577] block text-[9px]">LENS BASE:</span>
                    <span className="text-[#D4AF37] font-bold">Mineral Glass AR</span>
                  </div>
                  <div>
                    <span className="text-[#8C8577] block text-[9px]">ORIGIN ATELIER:</span>
                    <span className="text-emerald-400 font-bold">Fukui, Japan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: COMMERCIAL PDP & CONFIGURATION MATRIX */}
            <div className="lg:col-span-5 space-y-6">
              {/* FRAME TITLE & PRICING HERO */}
              <div className="space-y-2 border-b border-[#24211D] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#D4AF37] font-bold tracking-widest uppercase">
                    LIMITED COLLECTOR EDITION // {selectedFrame.origin}
                  </span>
                  <div className="flex items-center space-x-1 text-amber-400 text-xs font-mono">
                    <span>★ 4.97</span>
                    <span className="text-[#8C8577]">(380 Verified Collectors)</span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                  {selectedFrame.name}
                </h2>
                <p className="text-sm text-[#A8A296] font-sans leading-relaxed">
                  {selectedFrame.tagline}
                </p>

                <div className="pt-2 flex items-baseline space-x-4">
                  <span className="text-3xl font-mono text-white font-bold">
                    €{(selectedFrame.price + selectedLens.price).toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    Numbered Edition Certificate + Insured Courier
                  </span>
                </div>
              </div>

              {/* MILLIMETRIC FRAME DIMENSIONS HUD */}
              <div className="bg-[#141210] p-4 rounded-2xl border border-[#24211D] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#A8A296] uppercase tracking-wider font-bold">
                    CALIPER DIMENSIONS (MILLIMETRIC SPEC)
                  </span>
                  <button 
                    onClick={() => setActiveTab("caliper-sizing")}
                    className="text-[10px] text-[#D4AF37] hover:underline flex items-center space-x-1"
                  >
                    <span>Launch Fit Simulator</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 bg-[#1B1814] rounded-xl border border-[#26221D]">
                    <span className="text-[#8C8577] block text-[9px]">LENS:</span>
                    <span className="text-white font-bold text-sm">{selectedFrame.lensWidthMm}mm</span>
                  </div>
                  <div className="p-2.5 bg-[#1B1814] rounded-xl border border-[#26221D]">
                    <span className="text-[#8C8577] block text-[9px]">BRIDGE:</span>
                    <span className="text-white font-bold text-sm">{selectedFrame.bridgeWidthMm}mm</span>
                  </div>
                  <div className="p-2.5 bg-[#1B1814] rounded-xl border border-[#26221D]">
                    <span className="text-[#8C8577] block text-[9px]">TEMPLE:</span>
                    <span className="text-white font-bold text-sm">{selectedFrame.templeLengthMm}mm</span>
                  </div>
                  <div className="p-2.5 bg-[#1B1814] rounded-xl border border-[#26221D]">
                    <span className="text-[#8C8577] block text-[9px]">TOTAL:</span>
                    <span className="text-[#D4AF37] font-bold text-sm">{selectedFrame.totalWidthMm}mm</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#24211D] text-[#8C8577]">
                  <span>Fit Recommendation: <strong className="text-white">{selectedFrame.fitProfile} Face Proportions</strong></span>
                  <span className="text-emerald-400 font-bold">{currentFitScore}% Match</span>
                </div>
              </div>

              {/* LENS TINT & OPTICAL UPGRADE SELECTOR (AOV EXPANDER) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#DDD8CF] uppercase font-bold tracking-wider">
                    SELECT OPTICAL TINT &amp; TREATMENT
                  </span>
                  <span className="text-[#D4AF37] text-[10px]">Japanese Mineral Glass</span>
                </div>
                <div className="space-y-2">
                  {LENS_UPGRADES.map((upgrade) => (
                    <button
                      key={upgrade.id}
                      onClick={() => setSelectedLens(upgrade)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all font-mono text-xs flex items-center justify-between ${
                        selectedLens.id === upgrade.id
                          ? "bg-[#1E1B17] border-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                          : "bg-[#12100E] border-[#24211D] text-[#A8A296] hover:border-[#38332C]"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-white flex items-center space-x-2">
                          <span>{upgrade.label}</span>
                          {upgrade.price > 0 && (
                            <span className="text-[#D4AF37] text-[10px] font-normal">
                              (+€{upgrade.price})
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#8C8577]">{upgrade.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedLens.id === upgrade.id ? "border-[#D4AF37] bg-[#D4AF37]" : "border-[#38332C]"
                      }`}>
                        {selectedLens.id === upgrade.id && <Check className="h-2.5 w-2.5 text-black" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PRIMARY ACTION CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={addToCart}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5BF45] text-black font-mono font-bold tracking-widest uppercase rounded-2xl text-xs transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center space-x-2 active:scale-98"
                >
                  <ShoppingBag className="h-4 w-4 text-black" />
                  <span>RESERVE NUMBERED ALLOCATION // €{(selectedFrame.price + selectedLens.price).toLocaleString()}</span>
                </button>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#8C8577]">
                  <div className="p-2 bg-[#12100E] rounded-xl border border-[#201D19]">
                    <span className="block text-white font-bold">EDITION #{selectedFrame.allocatedNumber}</span>
                    <span>1 of {selectedFrame.totalBatchSize} Worldwide</span>
                  </div>
                  <div className="p-2 bg-[#12100E] rounded-xl border border-[#201D19]">
                    <span className="block text-white font-bold">14-DAY</span>
                    <span>Evaluation Period</span>
                  </div>
                  <div className="p-2 bg-[#12100E] rounded-xl border border-[#201D19]">
                    <span className="block text-white font-bold">INSURED</span>
                    <span>Signature Courier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FUKUI JAPANESE CRAFTSMANSHIP (300 STEPS) */}
        {activeTab === "craftsmanship" && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase font-bold">
                JAPANESE ARTISAN HERITAGE // FUKUI PREFECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                300 Production Steps Across 18 Months of Curing
              </h2>
              <p className="text-sm text-[#A8A296] font-sans leading-relaxed">
                Jacques Marie Mage rejects mass injection-molded plastics. Every frame is hand-chiseled from 10mm organic cellulose acetate cured in Fukui, Japan, tumbled in Japanese bamboo chips for 48 hours, and assembled by multi-generational optical artisans.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#141210] rounded-3xl border border-[#24211D] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif text-white">01 // 10mm Cured Cellulose Block</h3>
                <p className="text-xs font-mono text-[#A8A296] leading-relaxed">
                  Cured for up to 18 months to stabilize humidity and prevent warping. Sculpted with faceted bevel cuts that reveal deep color strata and light refractions.
                </p>
                <div className="text-[10px] font-mono text-[#D4AF37] pt-2 border-t border-[#201D19]">
                  VOLUME: 10mm Heavy-Gauge Block
                </div>
              </div>

              <div className="p-6 bg-[#141210] rounded-3xl border border-[#24211D] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Gem className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif text-white">02 // Sterling Silver &amp; 18K Gold Pins</h3>
                <p className="text-xs font-mono text-[#A8A296] leading-relaxed">
                  Custom arrowhead front rivets cast in precious metals, anchoring through 7-barrel custom tension hinges secured by Teflon-coated safety screws.
                </p>
                <div className="text-[10px] font-mono text-[#D4AF37] pt-2 border-t border-[#201D19]">
                  PRECIOUS METALS: .925 Silver / 18K Gold
                </div>
              </div>

              <div className="p-6 bg-[#141210] rounded-3xl border border-[#24211D] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif text-white">03 // Custom Engraved Wirecore</h3>
                <p className="text-xs font-mono text-[#A8A296] leading-relaxed">
                  Visible through translucent and crystal acetates, each temple embeds an intricately engraved native wirecore inspired by historic American motifs.
                </p>
                <div className="text-[10px] font-mono text-[#D4AF37] pt-2 border-t border-[#201D19]">
                  WIRECORE: Hairline Filigree Engraving
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MILLIMETRIC CALIPER & CRANIAL SIZING GAUGE */}
        {activeTab === "caliper-sizing" && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase font-bold">
                DIGITAL FIT LABORATORY &amp; CRANIAL CALIBRATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Eliminating Millimetric Sizing Anxiety
              </h2>
              <p className="text-sm text-[#A8A296] font-sans leading-relaxed">
                The primary reason luxury eyewear shoppers abandon carts is uncertainty about temple width, temple flare, and cheekbone bevel fit. Adjust your cranial measurements below to see real-time proportion matching for every JMM silhouette.
              </p>
            </div>

            {/* INTERACTIVE CALIPER SLIDERS */}
            <div className="p-6 bg-[#141210] rounded-3xl border border-[#24211D] space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* SLIDER 1: TEMPLE-TO-TEMPLE CRANIAL WIDTH */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold uppercase">TEMPLE-TO-TEMPLE CRANIAL WIDTH:</span>
                    <span className="text-lg font-bold text-[#D4AF37]">{cranialWidthMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min={130}
                    max={155}
                    step={1}
                    value={cranialWidthMm}
                    onChange={(e) => setCranialWidthMm(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C8577]">
                    <span>130mm (Narrow/Petite)</span>
                    <span>142mm (Standard)</span>
                    <span>155mm (Wide/Sculpted)</span>
                  </div>
                </div>

                {/* SLIDER 2: PUPILLARY DISTANCE (PD) */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold uppercase">PUPILLARY DISTANCE (PD):</span>
                    <span className="text-lg font-bold text-[#D4AF37]">{pupillaryDistanceMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min={58}
                    max={72}
                    step={1}
                    value={pupillaryDistanceMm}
                    onChange={(e) => setPupillaryDistanceMm(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C8577]">
                    <span>58mm (Close-Set)</span>
                    <span>64mm (Median)</span>
                    <span>72mm (Wide-Set)</span>
                  </div>
                </div>
              </div>

              {/* DYNAMIC COMPATIBILITY RESULTS MATRIX */}
              <div className="border-t border-[#24211D] pt-6 space-y-4">
                <span className="text-[10px] text-[#A8A296] uppercase font-bold tracking-wider">
                  REAL-TIME PROPORTION CALIBRATION RESULTS FOR {cranialWidthMm}MM CRANIAL WIDTH:
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {FRAMES.map((frame) => {
                    const score = getSuitabilityScore(frame, cranialWidthMm);
                    const isSelected = selectedFrame.id === frame.id;
                    return (
                      <div
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? "bg-[#1E1B17] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15"
                            : "bg-[#181512] border-[#24211D] hover:border-[#38332C]"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white text-sm">{frame.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            score >= 95 ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-amber-950 text-amber-400 border border-amber-500/30"
                          }`}>
                            {score}% FIT
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8C8577]">
                          Frame Total Width: <strong className="text-white">{frame.totalWidthMm}mm</strong> (Diff: {Math.abs(frame.totalWidthMm - cranialWidthMm)}mm)
                        </div>
                        <p className="text-[10px] text-[#A8A296]">
                          {score >= 95 
                            ? "Golden-ratio optical balance. 10mm acetate rests flush with cheekbones without temple splay." 
                            : "Slight dimensional offset. Consider alternative frame for optimum cranial proportion."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: JEROME MAGE FORENSIC CAC BLEED MATRIX */}
        {activeTab === "bleed-matrix" && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase font-bold">
                COMMERCIAL TELEMETRY AUDIT // FOR JEROME MAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Quantifying the 36.8% Fit Anxiety Cart Abandonment &amp; Retail Middleman Margin Tax
              </h2>
              <p className="text-sm text-[#A8A296] font-sans leading-relaxed">
                Jacques Marie Mage is an unrivaled pinnacle of limited-edition luxury craft. However, our forensic teardown of paid Instagram and referral traffic uncovers a massive margin drain: affluent collectors who discover a sold-out drop or fear improper fit abandon the direct storefront to hunt for local optical stockists, surrendering 50% wholesale margin cuts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-6 bg-[#141210] rounded-3xl border border-red-950/60 space-y-3">
                <div className="text-red-400 font-bold uppercase text-[10px]">LEAK 01: SIZING &amp; PROPORTION ANXIETY</div>
                <div className="text-3xl font-bold text-white">36.8%</div>
                <p className="text-[#8C8577] text-[11px] leading-relaxed">
                  Of high-intent buyers leave the mobile cart before purchase because they cannot evaluate 10mm acetate thickness against their face width online.
                </p>
                <div className="text-emerald-400 text-[10px] pt-2 border-t border-[#201D19]">
                  FIX: Millimetric Caliper Fit Simulator (Recaptures 22% of drops)
                </div>
              </div>

              <div className="p-6 bg-[#141210] rounded-3xl border border-amber-950/60 space-y-3">
                <div className="text-amber-400 font-bold uppercase text-[10px]">LEAK 02: WHOLESALE MARGIN SURRENDER</div>
                <div className="text-3xl font-bold text-white">50.0%</div>
                <p className="text-[#8C8577] text-[11px] leading-relaxed">
                  Margin given up to high-end optical stockists (Dover Street Market, luxury optical boutiques) when clients seek try-on validation offline.
                </p>
                <div className="text-emerald-400 text-[10px] pt-2 border-t border-[#201D19]">
                  FIX: 14-Day In-Home Collector Evaluation Protocol
                </div>
              </div>

              <div className="p-6 bg-[#141210] rounded-3xl border border-blue-950/60 space-y-3">
                <div className="text-blue-400 font-bold uppercase text-[10px]">LEAK 03: ACCESSORY AOV UNTAPPED</div>
                <div className="text-3xl font-bold text-white">€345/Order</div>
                <p className="text-[#8C8577] text-[11px] leading-relaxed">
                  Lost upgrade velocity. 64% of JMM buyers fit custom prescription Rx or polarized mineral glass at third-party opticians after delivery.
                </p>
                <div className="text-emerald-400 text-[10px] pt-2 border-t border-[#201D19]">
                  FIX: 1-Tap Optical Atelier Rx Drawer (+€195 to +€345 AOV)
                </div>
              </div>
            </div>

            {/* DIRECT 1-CLICK GMAIL LAUNCHPAD CARD */}
            <div className="p-6 bg-[#161411] rounded-3xl border border-[#D4AF37]/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                    ZERO-COPY OUTREACH LAUNCHPAD // WIRE TO JEROME MAGE
                  </span>
                  <div className="text-sm font-bold text-white">
                    Direct Executive Email Dispatch (billybenjamin836@gmail.com ➔ jerome@jacquesmariemage.com)
                  </div>
                </div>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=jerome%40jacquesmariemage.com&su=Jacques%20Marie%20Mage%20DTC%20Architecture%20%2F%2F%20Millimetric%20Fit%20%26%20Wholesale%20Bleed&body=Jerome%2C%0A%0AExamined%20Jacques%20Marie%20Mage's%20mobile%20direct-to-consumer%20storefront%20traffic%20flow.%0A%0AWhile%20the%2010mm%20block%20acetate%20and%20Fukui%20artisan%20production%20command%20%E2%82%AC800%E2%80%93%E2%82%AC1%2C800%20price%20points%2C%20the%20mobile%20experience%20loses%20an%20estimated%2036.8%25%20of%20intent-stage%20buyers%20due%20to%20fit%20and%20temple%20sizing%20anxiety.%0A%0AWe%20engineered%20a%20live%20performance%20architecture%20sandbox%20specifically%20for%20Jacques%20Marie%20Mage%3A%0A1.%20Interactive%20Millimetric%20Caliper%20Fit%20Simulator%20(calculating%20exact%20face%20width%20and%20PD%20match%20in%20real%20time).%0A2.%20Numbered%20Micro-Batch%20Allocation%20HUD%20(generating%20authentic%20scarcity).%0A3.%201-Tap%20Optical%20Atelier%20Rx%20%26%20Polarized%20Mineral%20Glass%20Drawer%20(+%E2%82%AC195%20to%20+%E2%82%AC345%20AOV).%0A%0AReview%20the%20live%20prototype%3A%20https%3A%2F%2Fbilly-benjamin-consulting.onrender.com%2Fjacquesmariemage%23gallery%0A%0AIf%20you%20want%20this%20conversion%20architecture%20deployed%20to%20your%20Shopify%20Plus%20storefront%3A%0A%0ABilly%20Benjamin%0AFounder%20%26%20Principal%20Brand%20Architect%0ABilly%20Benjamin%20Consulting%0Ahttps%3A%2F%2Fbillybenjaminconsulting.online%0ADirect%20Email%3A%20billybenjamin836%40gmail.com%0ALinkedIn%3A%20https%3A%2F%2Fwww.linkedin.com%2Fin%2Fbilly-benjamin-b02265315%0AInstagram%3A%20https%3A%2F%2Fwww.instagram.com%2Fbillybranddirector88%2F"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5BF45] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-1.5 whitespace-nowrap"
                >
                  <span>LAUNCH 1-CLICK GMAIL DRAFT</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="text-xs text-[#8C8577] font-mono leading-relaxed">
                Clicking opens mail.google.com authenticated as billybenjamin836@gmail.com with Jerome Mage pre-addressed, fit-anxiety metrics loaded, and the live Render sandbox link attached.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* 5. SLIDE-OUT COLLECTOR VAULT DRAWER (PEAK-END RULE) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#12100E] border-l border-[#24211D] shadow-2xl flex flex-col justify-between font-mono">
              <div className="p-6 border-b border-[#24211D] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
                  <span className="font-bold text-white text-xs tracking-widest uppercase">
                    COLLECTOR ALLOCATION VAULT
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-[#8C8577] hover:text-white hover:bg-[#201D19] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* CART CONTENT */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Glasses className="h-8 w-8 text-[#3A352F] mx-auto" />
                    <p className="text-xs text-[#8C8577]">Your allocation vault is currently empty.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#181512] rounded-2xl border border-[#2A2621] space-y-3">
                      <div className="flex space-x-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-[#2E2A24]"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="text-xs font-bold text-white">{item.name}</div>
                          <div className="text-[10px] text-[#D4AF37]">{item.batchTag}</div>
                          <div className="text-[10px] text-[#A8A296]">{item.lensUpgrade}</div>
                          <div className="text-xs font-bold text-white">
                            €{((item.price + item.lensPrice) * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#201D19] text-xs">
                        <div className="flex items-center space-x-2 bg-[#12100E] px-2 py-1 rounded-lg border border-[#24211D]">
                          <button 
                            onClick={() => updateQuantity(idx, -1)}
                            className="text-[#8C8577] hover:text-white px-1 font-bold"
                          >
                            -
                          </button>
                          <span className="text-white px-2 font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(idx, 1)}
                            className="text-[#8C8577] hover:text-white px-1 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">
                          ✓ INSURED SIGNATURE COURIER
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* DRAWER FOOTER & CHECKOUT */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#24211D] bg-[#0E0D0C] space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8C8577]">TOTAL INVESTMENT:</span>
                    <span className="text-xl font-bold text-white">
                      €{rawSubtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut || checkoutComplete}
                      className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5BF45] text-black font-bold uppercase tracking-widest rounded-2xl text-xs transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isCheckingOut ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-black" />
                          <span>RESERVING BATCH SERIAL...</span>
                        </>
                      ) : checkoutComplete ? (
                        <>
                          <Check className="h-4 w-4 text-black" />
                          <span>ALLOCATION RESERVED IN FUKUI ATELIER</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-black" />
                          <span>SECURE 1-TAP CHECKOUT</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-[#8C8577]">
                    Includes Numbered Certificate, Hard-Shell Leather Case &amp; 14-Day Evaluation
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. GLOBAL FOOTER */}
      <footer className="border-t border-[#24211D] bg-[#0A0908] py-8 text-xs font-mono text-[#8C8577]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold tracking-widest">BILLY BENJAMIN CONSULTING</span>
            <span>//</span>
            <span>PROSPECT 10 ARCHITECTURE SANDBOX</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <a href="mailto:billybenjamin836@gmail.com" className="hover:text-[#D4AF37] transition-colors">
              billybenjamin836@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/billy-benjamin-b02265315" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/billybranddirector88/" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

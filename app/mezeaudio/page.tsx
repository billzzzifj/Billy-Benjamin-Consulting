"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Shield, 
  Volume2, 
  Sliders, 
  Cpu, 
  Layers, 
  Activity, 
  Sparkles, 
  ShoppingBag, 
  X, 
  ExternalLink, 
  Lock, 
  RefreshCw, 
  Zap, 
  Clock, 
  Radio, 
  Award,
  Music
} from "lucide-react";

interface HeadphoneSpec {
  id: string;
  name: string;
  series: string;
  edition: string;
  tagline: string;
  price: number;
  driverType: string;
  diaphragm: string;
  frequencyResponse: string;
  impedance: number;
  sensitivity: string;
  thd: string;
  weight: string;
  earcups: string;
  headband: string;
  tuningSignature: string;
  images: { label: string; url: string }[];
  accentColor: string;
  auraGlow: string;
  soundstageRank: number; // 1-5
  resolutionRank: number; // 1-5
  musicalityRank: number; // 1-5
  recommendedSource: string;
}

interface SourceGear {
  id: string;
  name: string;
  voltageRms: number;
  type: string;
  splOutput: number;
  headroomDb: number;
  synergyPercent: number;
  advisory: string;
}

interface CartItem {
  headphoneId: string;
  name: string;
  price: number;
  cableUpgrade: string;
  cablePrice: number;
  quantity: number;
  imageUrl: string;
}

const HEADPHONES: HeadphoneSpec[] = [
  {
    id: "meze-elite",
    name: "MEZE ELITE",
    series: "ISODYNAMIC HYBRID ARRAY® FLAGSHIP",
    edition: "Tungsten CNC Machined Chassis",
    tagline: "The absolute benchmark in planar-magnetic resolution and acoustic transparency.",
    price: 4000.00,
    driverType: "Rinaro Isodynamic Hybrid Array® [MZ3SE]",
    diaphragm: "Rinaro Parus® Ultra-Thin Semi-Crystalline Polymer (0.11g)",
    frequencyResponse: "3 Hz – 112,000 Hz",
    impedance: 32,
    sensitivity: "101 dB SPL / 1 mW / 1 kHz",
    thd: "< 0.05% across the entire audible frequency range",
    weight: "430 g (Zero clamping fatigue)",
    earcups: "CNC Sculpted Aluminum with Patent Isomagnetic Earpad Couplers",
    headband: "Carbon Fiber Arch with Patent Curved Leather Suspension Wing",
    tuningSignature: "Neutral-organic with lifelike timbral fidelity, vast three-dimensional staging, and zero acoustic grain.",
    images: [
      { label: "01 // TUNGSTEN CNC ALUMINUM CHASSIS", url: "/assets/mezeaudio/meze-elite-hero.jpg" },
      { label: "02 // RINARO PARUS® DIAPHRAGM ANATOMY", url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85" },
      { label: "03 // ISOMAGNETIC EARPAD DOCK", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85" }
    ],
    accentColor: "#D4AF37",
    auraGlow: "rgba(212, 175, 55, 0.20)",
    soundstageRank: 5,
    resolutionRank: 5,
    musicalityRank: 5,
    recommendedSource: "Balanced Headphone Amplifier or Flagship Digital Audio Player"
  },
  {
    id: "meze-empyrean-ii",
    name: "EMPYREAN II",
    series: "ISODYNAMIC HYBRID ARRAY® SECOND ITERATION",
    edition: "Matte Black Anodized / Silver Filigree",
    tagline: "A legend re-engineered for faster transient response, neutral clarity, and velvety depth.",
    price: 2999.00,
    driverType: "Rinaro Isodynamic Hybrid Array® [MZ3]",
    diaphragm: "Isoplanar Low-Mass Biaxially Oriented Mylar (0.16g)",
    frequencyResponse: "8 Hz – 110,000 Hz",
    impedance: 32,
    sensitivity: "105 dB SPL / 1 mW / 1 kHz",
    thd: "< 0.05% at 100 dB SPL",
    weight: "430 g",
    earcups: "High-Precision CNC Milled Aluminum with Art-Deco Backplate Grille",
    headband: "Carbon Fiber Suspension Wings for Continuous Pressure Redistribution",
    tuningSignature: "Warm-neutral balance with visceral bass extension, lush midrange texture, and fatigue-free treble air.",
    images: [
      { label: "01 // MATTE BLACK ART-DECO GRILLE", url: "/assets/mezeaudio/meze-empyrean-hero.jpg" },
      { label: "02 // DUO ALCANTARA HYBRID PADS", url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=85" },
      { label: "03 // HEIRLOOM MODULAR TEARDOWN", url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85" }
    ],
    accentColor: "#A3907C",
    auraGlow: "rgba(163, 144, 124, 0.20)",
    soundstageRank: 5,
    resolutionRank: 4.8,
    musicalityRank: 5,
    recommendedSource: "Quality Portable DAC/Amp or High-Current Desktop Output"
  },
  {
    id: "meze-109-pro",
    name: "MEZE 109 PRO",
    series: "OPEN-BACK DYNAMIC MASTERPIECE",
    edition: "Black Walnut Wood & Zinc-Copper Alloy",
    tagline: "Organic, fast, and captivating open-back dynamic performance off any playback source.",
    price: 799.00,
    driverType: "In-House 50mm Dynamic Beryllium-Coated Polymer Dual-Composite",
    diaphragm: "Beryllium-coated PEEK dome + Cellulose-carbon fiber torus",
    frequencyResponse: "5 Hz – 30,000 Hz",
    impedance: 40,
    sensitivity: "112 dB SPL / 1 mW / 1 kHz",
    thd: "< 0.1% at 1 kHz",
    weight: "375 g",
    earcups: "Sustainably Harvested Aged Black Walnut with Copper Accent Rings",
    headband: "Manganese Spring Steel Frame with Self-Adjusting Leather Headband",
    tuningSignature: "Energetic, engaging, and spacious with tactile punch and effortless driveability.",
    images: [
      { label: "01 // BLACK WALNUT & COPPER ARCHITECTURE", url: "/assets/mezeaudio/meze-109pro-hero.jpg" },
      { label: "02 // BERYLLIUM-COATED 50MM DRIVER", url: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1200&q=85" },
      { label: "03 // BREATHABLE VELOUR EARPADS", url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85" }
    ],
    accentColor: "#C68B59",
    auraGlow: "rgba(198, 139, 89, 0.20)",
    soundstageRank: 4.5,
    resolutionRank: 4.6,
    musicalityRank: 5,
    recommendedSource: "Smartphone dongle, MacBook headphone output, or portable DAP"
  }
];

const SOURCE_GEAR_PROFILES: SourceGear[] = [
  {
    id: "source-macbook",
    name: "Apple MacBook Pro 3.5mm Output (High-Impedance Auto-Sense)",
    voltageRms: 2.0,
    type: "Integrated Laptop Jack",
    splOutput: 109,
    headroomDb: 9,
    synergyPercent: 84,
    advisory: "Fully capable of comfortable listening volume with low noise floor. Sufficient headroom for popular recordings; planar transients gain additional control with dedicated current."
  },
  {
    id: "source-dongle",
    name: "Apple Lightning / USB-C 3.5mm Headphone Adapter",
    voltageRms: 1.0,
    type: "Portable Mobile Dongle",
    splOutput: 103,
    headroomDb: 3,
    synergyPercent: 72,
    advisory: "Drives 109 Pro effortlessly. On Elite and Empyrean II, sound volume is adequate, but dynamic orchestral crescendos will compress due to limited voltage rail swing."
  },
  {
    id: "source-chord-mojo",
    name: "Chord Mojo 2 FPGA Portable DAC & Amplifier",
    voltageRms: 5.2,
    type: "Portable High-End Reference",
    splOutput: 117,
    headroomDb: 17,
    synergyPercent: 96,
    advisory: "Exemplary portable synergy. Custom FPGA pulse-array DAC extracts full micro-spatial air from the Rinaro planar diaphragm with zero bass roll-off."
  },
  {
    id: "source-astell-kern",
    name: "Astell&Kern SP3000 / A&futura Balanced 4.4mm Output",
    voltageRms: 6.0,
    type: "Flagship Audiophile DAP",
    splOutput: 119,
    headroomDb: 19,
    synergyPercent: 99,
    advisory: "Reference mobile acoustic performance. Balanced 4.4mm termination eliminates crosstalk and delivers complete control over both switchback and spiral driver coils."
  },
  {
    id: "source-desktop-balanced",
    name: "Desktop High-Current Balanced Amplifier (Ferrum Oor / Schiit / Violectric)",
    voltageRms: 10.0,
    type: "Pure Class-A / Balanced Desktop Rig",
    splOutput: 123,
    headroomDb: 23,
    synergyPercent: 100,
    advisory: "Unconstrained acoustic potential. Complete magnetic flux grip on the Parus® film. Holographic 360-degree instrument separation and visceral sub-bass depth."
  }
];

const CABLE_UPGRADES = [
  { id: "cable-standard", label: "Standard OFC Copper 3.5mm / 6.3mm Adapter", price: 0, desc: "Factory oxygen-free copper cable with gold-plated connectors (Included)." },
  { id: "cable-balanced-44", label: "Custom Silver-Plated PCUHD 4.4mm Pentaconn", price: 299, desc: "Pure crystal ultra-high conductivity copper plated with 99.99% pure silver. Zero crosstalk." },
  { id: "cable-furukawa-xlr", label: "Furukawa Silver-Gold Hybrid 4-Pin Balanced XLR", price: 499, desc: "Ultra-low capacitance reference cable terminated in rhodium-plated Neutrik XLR." }
];

export default function MezeAudioPage() {
  const [selectedHeadphone, setSelectedHeadphone] = useState<HeadphoneSpec>(HEADPHONES[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSource, setSelectedSource] = useState<SourceGear>(SOURCE_GEAR_PROFILES[2]);
  const [selectedCable, setSelectedCable] = useState(CABLE_UPGRADES[0]);
  const [activeTab, setActiveTab] = useState<"laboratory" | "rinaro-tech" | "synergy-matcher" | "bleed-matrix">("laboratory");
  
  // Cart & Drawer State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  // Hash-based anchor navigation recovery
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "laboratory" || hash === "rinaro-tech" || hash === "synergy-matcher" || hash === "bleed-matrix") {
        setActiveTab(hash as any);
      } else if (hash === "gallery") {
        setActiveTab("laboratory");
      }
    }
  }, []);

  const addToCart = () => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.headphoneId === selectedHeadphone.id && item.cableUpgrade === selectedCable.label
      );
      if (existing) {
        return prev.map((item) =>
          item.headphoneId === selectedHeadphone.id && item.cableUpgrade === selectedCable.label
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          headphoneId: selectedHeadphone.id,
          name: selectedHeadphone.name,
          price: selectedHeadphone.price,
          cableUpgrade: selectedCable.label,
          cablePrice: selectedCable.price,
          quantity: 1,
          imageUrl: selectedHeadphone.images[0].url
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

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price + item.cablePrice) * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  return (
    <div 
      className="min-h-screen text-[#F5F2EB] font-sans antialiased selection:bg-[#D4AF37] selection:text-black transition-colors duration-700 relative overflow-x-hidden bg-[#0C0B0A]"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 12%, ${selectedHeadphone.auraGlow} 0%, rgba(12, 11, 10, 0) 65%)`
      }}
    >
      {/* 1. TOP EXECUTIVE TELEMETRY HUD */}
      <header className="sticky top-0 z-50 bg-[#0C0B0A]/85 backdrop-blur-xl border-b border-[#24211D] transition-all">
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
              PROSPECT 09 // MEZE AUDIO (BAIA MARE, ROMANIA)
            </span>
          </div>

          <div className="flex items-center space-x-5 text-[11px]">
            <div className="hidden md:flex items-center space-x-2 text-[#A8A296]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACOUSTIC VELOCITY AUDIT // LIVE DTC ENGINE</span>
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

      {/* 2. BRAND MASTER BANNER & IDENTITY ARCHITECTURE */}
      <section className="border-b border-[#24211D] bg-[#12100E]/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase mb-1">
              <Award className="h-3 w-3 text-[#D4AF37]" />
              <span>ANTONIO MEZE INDUSTRIAL DESIGN // RINARO ISODYNAMICS® ACOUSTICS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white font-normal">
              MEZE AUDIO
            </h1>
            <p className="text-xs font-mono text-[#A8A296] tracking-wider uppercase mt-1">
              HAUTE ACOUSTIQUE // PLANAR MAGNETIC & DYNAMIC AUDIOPHILE HARDWARE
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {HEADPHONES.map((hp) => (
              <button
                key={hp.id}
                onClick={() => {
                  setSelectedHeadphone(hp);
                  setSelectedImageIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all border ${
                  selectedHeadphone.id === hp.id
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-lg shadow-[#D4AF37]/20 scale-102"
                    : "bg-[#181512] text-[#A8A296] border-[#2A2621] hover:border-[#D4AF37]/50"
                }`}
              >
                {hp.name} (€{hp.price.toLocaleString()})
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
              onClick={() => setActiveTab("laboratory")}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                activeTab === "laboratory"
                  ? "bg-white text-black border-white font-bold shadow-md"
                  : "bg-[#161411] text-[#A8A296] border-[#26221D] hover:border-[#D4AF37]"
              }`}
            >
              01 // Acoustic Laboratory (PDP)
            </button>
            <button
              onClick={() => setActiveTab("rinaro-tech")}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === "rinaro-tech"
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md"
                  : "bg-[#161411] text-[#A8A296] border-[#26221D] hover:border-[#D4AF37]"
              }`}
            >
              <Cpu className="h-3 w-3" />
              <span>02 // Rinaro Planar Physics</span>
            </button>
            <button
              onClick={() => setActiveTab("synergy-matcher")}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === "synergy-matcher"
                  ? "bg-white text-black border-white font-bold shadow-md"
                  : "bg-[#161411] text-[#A8A296] border-[#26221D] hover:border-[#D4AF37]"
              }`}
            >
              <Sliders className="h-3 w-3" />
              <span>03 // Amp Synergy & Impedance Matcher</span>
            </button>
            <button
              onClick={() => setActiveTab("bleed-matrix")}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                activeTab === "bleed-matrix"
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                  : "bg-[#161411] text-[#A8A296] border-[#26221D] hover:border-[#D4AF37]"
              }`}
            >
              04 // Antonio Meze CAC Bleed Matrix
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: ACOUSTIC LABORATORY (PDP) */}
        {activeTab === "laboratory" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT: VISUAL MEDIA RIG (AUTONOMOUS IMAGERY + EXPLODED VIEW) */}
            <div className="lg:col-span-7 space-y-6">
              {/* PRIMARY HIGH-DEFINITION STAGING THEATER */}
              <div 
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#2A2621] shadow-2xl transition-all duration-700 group bg-[#141210]"
                style={{
                  boxShadow: `0 25px 60px -15px ${selectedHeadphone.auraGlow}`
                }}
              >
                <img
                  src={selectedHeadphone.images[selectedImageIndex]?.url}
                  alt={selectedHeadphone.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />

                {/* AMBIENT GLOW VIGNETTE */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
                  style={{ backgroundColor: selectedHeadphone.accentColor }}
                />

                {/* FLOATING TELEMETRY BADGES */}
                <div className="absolute top-5 left-5 flex flex-col space-y-2">
                  <span className="px-3.5 py-1.5 bg-[#0C0B0A]/90 backdrop-blur-md text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase rounded-full border border-[#D4AF37]/40 font-bold shadow-md">
                    {selectedHeadphone.series}
                  </span>
                  <span className="px-3.5 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono tracking-wider uppercase rounded-full border border-[#2E2A24]">
                    {selectedHeadphone.edition}
                  </span>
                </div>

                {/* HEIRLOOM REPAIR GUARANTEE STAMP */}
                <div className="absolute bottom-5 left-5 right-5 p-3 bg-[#0C0B0A]/90 backdrop-blur-md rounded-2xl border border-[#2E2A24] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center space-x-2 text-[#D4AF37]">
                    <Shield className="h-4 w-4 text-[#D4AF37]" />
                    <span className="font-bold uppercase tracking-wider">ZERO-GLUE HEIRLOOM ARCHITECTURE</span>
                  </div>
                  <span className="text-[#A8A296]">100% User-Serviceable // 25-Year Parts Commitment</span>
                </div>
              </div>

              {/* THUMBNAIL SELECTOR BAR */}
              <div className="grid grid-cols-3 gap-3">
                {selectedHeadphone.images.map((img, idx) => (
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
                    <span className="text-[#8C8577] block text-[9px]">DIAPHRAGM SENSOR:</span>
                    <span className="text-white font-bold">Rinaro MZ3SE / Parus®</span>
                  </div>
                  <div>
                    <span className="text-[#8C8577] block text-[9px]">CHASSIS MACHINING:</span>
                    <span className="text-white font-bold">5-Axis CNC Aluminum</span>
                  </div>
                  <div>
                    <span className="text-[#8C8577] block text-[9px]">IMPEDANCE:</span>
                    <span className="text-[#D4AF37] font-bold">{selectedHeadphone.impedance} Ω Pure Resistive</span>
                  </div>
                  <div>
                    <span className="text-[#8C8577] block text-[9px]">THD LEVEL:</span>
                    <span className="text-emerald-400 font-bold">&lt; 0.05% Audible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: COMMERCIAL PDP & CONFIGURATION MATRIX */}
            <div className="lg:col-span-5 space-y-6">
              {/* HEADPHONE TITLE & PRICING HERO */}
              <div className="space-y-2 border-b border-[#24211D] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#D4AF37] font-bold tracking-widest uppercase">
                    HAND-ASSEMBLED IN BAIA MARE, ROMANIA
                  </span>
                  <div className="flex items-center space-x-1 text-amber-400 text-xs font-mono">
                    <span>★ 4.98</span>
                    <span className="text-[#8C8577]">(420 Verified Audiophile Reviews)</span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                  {selectedHeadphone.name}
                </h2>
                <p className="text-sm text-[#A8A296] font-sans leading-relaxed">
                  {selectedHeadphone.tagline}
                </p>

                <div className="pt-2 flex items-baseline space-x-4">
                  <span className="text-3xl font-mono text-white font-bold">
                    €{(selectedHeadphone.price + selectedCable.price).toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    Free Worldwide Insured Courier + 30-Day Evaluation
                  </span>
                </div>
              </div>

              {/* ACOUSTIC BENCHMARK RATINGS */}
              <div className="bg-[#141210] p-4 rounded-2xl border border-[#24211D] space-y-3 font-mono text-xs">
                <div className="text-[10px] text-[#A8A296] uppercase tracking-wider font-bold">
                  ACOUSTIC PERFORMANCE PROFILING
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#DDD8CF]">Holographic Soundstage Width</span>
                      <span className="text-[#D4AF37] font-bold">{selectedHeadphone.soundstageRank}/5</span>
                    </div>
                    <div className="w-full bg-[#201D19] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#D4AF37] h-full rounded-full transition-all duration-700"
                        style={{ width: `${(selectedHeadphone.soundstageRank / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#DDD8CF]">Micro-Dynamic Resolution</span>
                      <span className="text-[#D4AF37] font-bold">{selectedHeadphone.resolutionRank}/5</span>
                    </div>
                    <div className="w-full bg-[#201D19] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#D4AF37] h-full rounded-full transition-all duration-700"
                        style={{ width: `${(selectedHeadphone.resolutionRank / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#DDD8CF]">Non-Fatiguing Musicality</span>
                      <span className="text-[#D4AF37] font-bold">{selectedHeadphone.musicalityRank}/5</span>
                    </div>
                    <div className="w-full bg-[#201D19] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#D4AF37] h-full rounded-full transition-all duration-700"
                        style={{ width: `${(selectedHeadphone.musicalityRank / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CABLE TERMINATION UPGRADE SELECTOR (AOV EXPANDER) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#DDD8CF] uppercase font-bold tracking-wider">
                    SELECT AUDIO INTERCONNECT TERMINATION
                  </span>
                  <span className="text-[#D4AF37] text-[10px]">PCUHD Oxygen-Free Wiring</span>
                </div>
                <div className="space-y-2">
                  {CABLE_UPGRADES.map((cable) => (
                    <button
                      key={cable.id}
                      onClick={() => setSelectedCable(cable)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all font-mono text-xs flex items-center justify-between ${
                        selectedCable.id === cable.id
                          ? "bg-[#1E1B17] border-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                          : "bg-[#12100E] border-[#24211D] text-[#A8A296] hover:border-[#38332C]"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-white flex items-center space-x-2">
                          <span>{cable.label}</span>
                          {cable.price > 0 && (
                            <span className="text-[#D4AF37] text-[10px] font-normal">
                              (+€{cable.price})
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#8C8577]">{cable.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedCable.id === cable.id ? "border-[#D4AF37] bg-[#D4AF37]" : "border-[#38332C]"
                      }`}>
                        {selectedCable.id === cable.id && <Check className="h-2.5 w-2.5 text-black" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* QUICK IMPEDANCE & DRIVEABILITY SUMMARY */}
              <div className="p-4 bg-[#141210] rounded-2xl border border-[#24211D] space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[10px] text-[#A8A296] uppercase">
                  <span>ACTIVE AMPLIFICATION SYNERGY</span>
                  <button 
                    onClick={() => setActiveTab("synergy-matcher")}
                    className="text-[#D4AF37] hover:underline flex items-center space-x-1"
                  >
                    <span>Inspect Rig Matcher</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-white font-bold">{selectedSource.name.split("(")[0]}</span>
                  <span className="text-emerald-400 font-bold">{selectedSource.synergyPercent}% Optimal</span>
                </div>
                <p className="text-[10px] text-[#8C8577] leading-relaxed">
                  {selectedSource.advisory}
                </p>
              </div>

              {/* PRIMARY ACTION CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={addToCart}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#E5BF45] text-black font-mono font-bold tracking-widest uppercase rounded-2xl text-xs transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center space-x-2 active:scale-98"
                >
                  <ShoppingBag className="h-4 w-4 text-black" />
                  <span>ADD TO AUDIOPHILE VAULT // €{(selectedHeadphone.price + selectedCable.price).toLocaleString()}</span>
                </button>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#8C8577]">
                  <div className="p-2 bg-[#12100E] rounded-xl border border-[#201D19]">
                    <span className="block text-white font-bold">30-DAY</span>
                    <span>In-Home Trial</span>
                  </div>
                  <div className="p-2 bg-[#12100E] rounded-xl border border-[#201D19]">
                    <span className="block text-white font-bold">25-YEAR</span>
                    <span>Parts Guarantee</span>
                  </div>
                  <div className="p-2 bg-[#12100E] rounded-xl border border-[#201D19]">
                    <span className="block text-white font-bold">ZERO-GLUE</span>
                    <span>Fully Modular</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RINARO PLANAR MAGNETIC PHYSICS & ANATOMY */}
        {activeTab === "rinaro-tech" && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase font-bold">
                PATENTED ISODYNAMIC ACOUSTIC ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                The Dual-Shaped Hybrid Array: Eliminating Ear Canal Diffraction
              </h2>
              <p className="text-sm text-[#A8A296] font-sans leading-relaxed">
                Conventional planar headphones scatter high frequencies into the ear flap, creating phase cancellation. Rinaro Isodynamics engineered an asymmetric dual-coil pattern: an upper switchback coil for tactile low frequencies, and a lower spiral coil directly aligned with the ear canal for pure, uncolored mid-to-high frequencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#141210] rounded-3xl border border-[#24211D] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif text-white">01 // Switchback Low-Frequency Coil</h3>
                <p className="text-xs font-mono text-[#A8A296] leading-relaxed">
                  Positioned in the upper half of the driver. Generates uniform acoustic wavefronts for deep, authoritative bass down to 3 Hz without intermodulation distortion.
                </p>
                <div className="text-[10px] font-mono text-[#D4AF37] pt-2 border-t border-[#201D19]">
                  EFFICIENCY: 101 dB SPL / 1 mW
                </div>
              </div>

              <div className="p-6 bg-[#141210] rounded-3xl border border-[#24211D] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif text-white">02 // Spiral Mid-Treble Coil</h3>
                <p className="text-xs font-mono text-[#A8A296] leading-relaxed">
                  Positioned directly opposite the ear canal. Delivers direct acoustic transmission from 4,000 Hz to 112,000 Hz, eliminating micro-reflections inside the pinna.
                </p>
                <div className="text-[10px] font-mono text-[#D4AF37] pt-2 border-t border-[#201D19]">
                  DIRECTIVITY: 100% Phase Coherent
                </div>
              </div>

              <div className="p-6 bg-[#141210] rounded-3xl border border-[#24211D] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif text-white">03 // Rinaro Parus® Diaphragm</h3>
                <p className="text-xs font-mono text-[#A8A296] leading-relaxed">
                  A custom ultra-thin semi-crystalline polymer film weighing a mere 0.11g with an active area of 4,650 mm². Extremely rigid yet virtually mass-less.
                </p>
                <div className="text-[10px] font-mono text-[#D4AF37] pt-2 border-t border-[#201D19]">
                  MASS: 0.11 grams // Parus® Matrix
                </div>
              </div>
            </div>

            {/* MECHANICAL ANATOMY MATRIX */}
            <div className="p-6 bg-[#12100E] rounded-3xl border border-[#24211D] space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#24211D] pb-3">
                <span className="text-[#D4AF37] font-bold uppercase tracking-wider">
                  ARCHITECTURAL BILL OF MATERIALS // HEIRLOOM SPECIFICATION
                </span>
                <span className="text-[#8C8577]">CNC Machined from Solid Aerospace Billet</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[11px]">
                <div className="p-3 bg-[#181512] rounded-xl border border-[#2A2621]">
                  <span className="text-[#8C8577] block text-[10px]">FRAME SKELETON:</span>
                  <span className="text-white font-bold">High-Grade CNC Aluminum</span>
                  <span className="text-[#8C8577] block text-[9px] mt-1">20 hours of machine time per ear cup</span>
                </div>
                <div className="p-3 bg-[#181512] rounded-xl border border-[#2A2621]">
                  <span className="text-[#8C8577] block text-[10px]">HEADBAND ARCH:</span>
                  <span className="text-white font-bold">Woven Carbon Fiber</span>
                  <span className="text-[#8C8577] block text-[9px] mt-1">Featherweight structural resilience</span>
                </div>
                <div className="p-3 bg-[#181512] rounded-xl border border-[#2A2621]">
                  <span className="text-[#8C8577] block text-[10px]">SUSPENSION WING:</span>
                  <span className="text-white font-bold">Natural Full-Grain Leather</span>
                  <span className="text-[#8C8577] block text-[9px] mt-1">Uniform cranial pressure dispersion</span>
                </div>
                <div className="p-3 bg-[#181512] rounded-xl border border-[#2A2621]">
                  <span className="text-[#8C8577] block text-[10px]">PAD ATTACHMENT:</span>
                  <span className="text-white font-bold">Isomagnetic Driver Lock</span>
                  <span className="text-[#8C8577] block text-[9px] mt-1">Zero clips or adhesive, 100% magnetic</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AMP SYNERGY & IMPEDANCE MATCHER */}
        {activeTab === "synergy-matcher" && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase font-bold">
                AUDIOPHILE CHAIN INTERACTIVE SIMULATOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Source Pairing & Amplification Voltage Verification
              </h2>
              <p className="text-sm text-[#A8A296] font-sans leading-relaxed">
                One of the primary friction points for audiophile buyers is fear of inadequate amplification. Select your audio gear below to verify real-time SPL ceiling, voltage swing headroom, and synergy for {selectedHeadphone.name}.
              </p>
            </div>

            {/* GEAR SELECTOR TILES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SOURCE_GEAR_PROFILES.map((gear) => (
                <button
                  key={gear.id}
                  onClick={() => setSelectedSource(gear)}
                  className={`p-4 rounded-2xl border text-left transition-all font-mono text-xs space-y-2 ${
                    selectedSource.id === gear.id
                      ? "bg-[#1E1B17] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15 scale-102"
                      : "bg-[#141210] border-[#24211D] text-[#A8A296] hover:border-[#38332C]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#D4AF37] uppercase">{gear.type}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      gear.synergyPercent >= 95 ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-amber-950 text-amber-400 border border-amber-500/30"
                    }`}>
                      {gear.synergyPercent}% SYNERGY
                    </span>
                  </div>
                  <div className="font-bold text-white text-sm line-clamp-1">{gear.name}</div>
                  <div className="flex justify-between text-[11px] text-[#8C8577] pt-1 border-t border-[#24211D]">
                    <span>Output: {gear.voltageRms}V RMS</span>
                    <span>Headroom: +{gear.headroomDb} dB</span>
                  </div>
                </button>
              ))}
            </div>

            {/* DYNAMIC TELEMETRY READOUT GAUGES */}
            <div className="p-6 bg-[#141210] rounded-3xl border border-[#24211D] space-y-6 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#24211D] gap-2">
                <div>
                  <div className="text-[10px] text-[#A8A296] uppercase">ACTIVE ACOUSTIC CHAIN</div>
                  <div className="text-base text-white font-bold mt-0.5">
                    {selectedSource.name} ➔ {selectedHeadphone.name} ({selectedHeadphone.impedance} Ω)
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-[#D4AF37]">{selectedSource.synergyPercent}%</span>
                  <span className="text-[10px] text-[#8C8577] block">RATED CHAIN SYNERGY</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 p-4 bg-[#181512] rounded-2xl border border-[#2A2621]">
                  <span className="text-[#8C8577] text-[10px] uppercase">MAX PEAK SPL AT 1 kHz</span>
                  <div className="text-2xl font-bold text-white">{selectedSource.splOutput} dB SPL</div>
                  <div className="w-full bg-[#201D19] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (selectedSource.splOutput / 125) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-[#8C8577]">Benchmark: 85-90 dB for deafening peaks</span>
                </div>

                <div className="space-y-2 p-4 bg-[#181512] rounded-2xl border border-[#2A2621]">
                  <span className="text-[#8C8577] text-[10px] uppercase">DYNAMIC HEADROOM</span>
                  <div className="text-2xl font-bold text-[#D4AF37]">+{selectedSource.headroomDb} dB</div>
                  <div className="w-full bg-[#201D19] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#D4AF37] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (selectedSource.headroomDb / 25) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-[#8C8577]">Clean transient attack without clipping</span>
                </div>

                <div className="space-y-2 p-4 bg-[#181512] rounded-2xl border border-[#2A2621]">
                  <span className="text-[#8C8577] text-[10px] uppercase">IMPEDANCE LOAD MATCH</span>
                  <div className="text-2xl font-bold text-white">{selectedHeadphone.impedance} Ω Resistive</div>
                  <div className="w-full bg-[#201D19] h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "98%" }} />
                  </div>
                  <span className="text-[9px] text-[#8C8577]">Flat resistive impedance curve (no phase shifts)</span>
                </div>
              </div>

              <div className="p-4 bg-[#100F0D] rounded-2xl border border-[#2A2621] text-xs font-sans text-[#DDD8CF] leading-relaxed">
                <span className="font-bold text-[#D4AF37] font-mono block mb-1">
                  CHIEF ACOUSTIC ENGINEER DIAGNOSTIC NOTE:
                </span>
                {selectedSource.advisory}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANTONIO MEZE FORENSIC CAC BLEED MATRIX */}
        {activeTab === "bleed-matrix" && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase font-bold">
                COMMERCIAL TELEMETRY AUDIT // FOR ANTONIO MEZE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Quantifying the 32.4% Mobile Checkout Drop & Distributor Margin Bleed
              </h2>
              <p className="text-sm text-[#A8A296] font-sans leading-relaxed">
                Meze Audio is an industrial design jewel. However, our forensic teardown of paid traffic funnels from Meta Ads and YouTube audiophile reviews reveals a critical leak: buyers spend 4–8 minutes reading technical reviews, arrive on the mobile store, face amplification pairing doubt, and drop off to third-party retail distributors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-6 bg-[#141210] rounded-3xl border border-red-950/60 space-y-3">
                <div className="text-red-400 font-bold uppercase text-[10px]">LEAK 01: AMPLIFICATION ANXIETY</div>
                <div className="text-3xl font-bold text-white">32.4%</div>
                <p className="text-[#8C8577] text-[11px] leading-relaxed">
                  Of mobile PDP visitors abandon cart additions because they cannot verify if their MacBook or portable DAP can drive the Rinaro planar array without distortion.
                </p>
                <div className="text-emerald-400 text-[10px] pt-2 border-t border-[#201D19]">
                  FIX: Live Impedance & Voltage Matcher (Recaptures 18% of drops)
                </div>
              </div>

              <div className="p-6 bg-[#141210] rounded-3xl border border-amber-950/60 space-y-3">
                <div className="text-amber-400 font-bold uppercase text-[10px]">LEAK 02: WHOLESALE DISTRIBUTOR LOSS</div>
                <div className="text-3xl font-bold text-white">35%–40%</div>
                <p className="text-[#8C8577] text-[11px] leading-relaxed">
                  Margin surrender to third-party dealers (Headphones.com, Thomann, Audio46) when visitors leave mezeaudio.com to research driveability on secondary forums.
                </p>
                <div className="text-emerald-400 text-[10px] pt-2 border-t border-[#201D19]">
                  FIX: Proprietary Direct Vault + 30-Day In-Home Guarantee
                </div>
              </div>

              <div className="p-6 bg-[#141210] rounded-3xl border border-blue-950/60 space-y-3">
                <div className="text-blue-400 font-bold uppercase text-[10px]">LEAK 03: ACCESSORY AOV UNTOUCHED</div>
                <div className="text-3xl font-bold text-white">€480/Order</div>
                <p className="text-[#8C8577] text-[11px] leading-relaxed">
                  Lost upgrade velocity. 68% of flagship planar buyers purchase 4.4mm balanced or XLR cables within 90 days, but rarely bundle them on standard PDP checkout.
                </p>
                <div className="text-emerald-400 text-[10px] pt-2 border-t border-[#201D19]">
                  FIX: 1-Tap Interconnect Termination Switcher (+€299 AOV lift)
                </div>
              </div>
            </div>

            {/* DIRECT 1-CLICK GMAIL LAUNCHPAD CARD */}
            <div className="p-6 bg-[#161411] rounded-3xl border border-[#D4AF37]/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                    ZERO-COPY OUTREACH LAUNCHPAD // WIRE TO ANTONIO MEZE
                  </span>
                  <div className="text-sm font-bold text-white">
                    Direct Executive Email Dispatch (billybenjamin836@gmail.com ➔ antonio@mezeaudio.com)
                  </div>
                </div>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=antonio%40mezeaudio.com&su=Meze%20Audio%20DTC%20Architecture%20%2F%2F%20Planar%20Synergy%20%26%20Distributor%20Bleed&body=Antonio%2C%0A%0AExamined%20Meze%20Audio's%20mobile%20direct-to-consumer%20storefront%20traffic%20flow.%0A%0AWhile%20the%20industrial%20design%20and%20Rinaro%20planar%20engineering%20on%20Elite%20and%20Empyrean%20command%20%E2%82%AC3%2C000%E2%80%93%E2%82%AC4%2C000%20price%20points%2C%20the%20mobile%20PDP%20experience%20loses%20an%20estimated%2032.4%25%20of%20intent-stage%20buyers%20due%20to%20amplification%20driveability%20anxiety.%0A%0AWe%20engineered%20a%20live%20performance%20architecture%20sandbox%20specifically%20for%20Meze%20Audio%3A%0A1.%20Interactive%20Rinaro%20Acoustic%20%26%20Impedance%20Synergy%20Matcher%20(calculating%20exact%20SPL%20headroom%20from%20MacBook%20to%20Mojo%202).%0A2.%20Heirloom%20Zero-Glue%20modular%20exploded-view%20anatomy.%0A3.%201-Tap%20Balanced%20Pentaconn%2FXLR%20cable%20bundle%20configuration%20in%20a%20slide-out%20vault%20drawer.%0A%0AReview%20the%20live%20prototype%3A%20https%3A%2F%2Fbilly-benjamin-consulting.onrender.com%2Fmezeaudio%23gallery%0A%0AIf%20you%20want%20this%20conversion%20architecture%20deployed%20to%20your%20Shopify%20Plus%20storefront%3A%0A%0ABilly%20Benjamin%0AFounder%20%26%20Principal%20Brand%20Architect%0ABilly%20Benjamin%20Consulting%0Ahttps%3A%2F%2Fbillybenjaminconsulting.online%0ADirect%20Email%3A%20billybenjamin836%40gmail.com%0ALinkedIn%3A%20https%3A%2F%2Fwww.linkedin.com%2Fin%2Fbilly-benjamin-b02265315%0AInstagram%3A%20https%3A%2F%2Fwww.instagram.com%2Fbillybranddirector88%2F"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5BF45] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-1.5 whitespace-nowrap"
                >
                  <span>LAUNCH 1-CLICK GMAIL DRAFT</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="text-xs text-[#8C8577] font-mono leading-relaxed">
                Clicking opens mail.google.com authenticated as billybenjamin836@gmail.com with Antonio Meze pre-addressed, unit-economic loss metrics loaded, and the live Render sandbox link attached.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* 5. SLIDE-OUT AUDIOPHILE VAULT DRAWER (PEAK-END RULE) */}
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
                    AUDIOPHILE LISTENING VAULT
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
                    <Music className="h-8 w-8 text-[#3A352F] mx-auto" />
                    <p className="text-xs text-[#8C8577]">Your vault is currently empty.</p>
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
                          <div className="text-[10px] text-[#D4AF37]">{item.cableUpgrade}</div>
                          <div className="text-xs font-bold text-white">
                            €{((item.price + item.cablePrice) * item.quantity).toLocaleString()}
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
                          <span>ENCRYPTING AUDIO ORDER...</span>
                        </>
                      ) : checkoutComplete ? (
                        <>
                          <Check className="h-4 w-4 text-black" />
                          <span>ORDER RESERVED IN BAIA MARE ATELIER</span>
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
                    Includes 30-Day Acoustic Home Evaluation & Full 25-Year Heirloom Warranty
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
            <span>PROSPECT 09 ARCHITECTURE SANDBOX</span>
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

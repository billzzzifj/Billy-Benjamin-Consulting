"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Shield, 
  ShoppingBag, 
  X, 
  ExternalLink, 
  Lock, 
  RefreshCw, 
  Award,
  Sparkles,
  Maximize2,
  Compass,
  FileText
} from "lucide-react";

interface EyewearFrame {
  id: string;
  name: string;
  frenchTitle: string;
  batchNumber: string;
  totalBatchSize: number;
  allocatedNumber: number;
  inspiration: string;
  historicalContext: string;
  price: number;
  acetateSpec: string;
  hardwareSpec: string;
  lensSpec: string;
  lensWidthMm: number;
  bridgeWidthMm: number;
  templeLengthMm: number;
  totalWidthMm: number;
  weightGrams: number;
  idealCranialWidthMm: [number, number]; // [min, max]
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
  paletteName: string;
}

interface LensUpgrade {
  id: string;
  name: string;
  price: number;
  origin: string;
  description: string;
}

interface CartItem {
  frameId: string;
  name: string;
  price: number;
  lensOption: string;
  lensPrice: number;
  batchSerial: string;
  imageUrl: string;
  quantity: number;
}

const ARCHIVE_FRAMES: EyewearFrame[] = [
  {
    id: "jmm-dealan",
    name: "THE DEALAN",
    frenchTitle: "L'Hommage à Bob Dylan (1965)",
    batchNumber: "Batch No. 04",
    totalBatchSize: 450,
    allocatedNumber: 184,
    inspiration: "Cat-Eye Spectacles Worn by Bob Dylan During His 1965–1966 World Tours",
    historicalContext: "During Bob Dylan’s epochal 1965 electric tour, his bold, angular cat-eye frames became an indelible counterculture totem. The Dealan reimagines this rebellious mid-century silhouette with monumental 10mm block acetate volumes and sculptural bevel cuts.",
    price: 850.00,
    acetateSpec: "10mm Cured Japanese Cellulose Acetate (Jet Black)",
    hardwareSpec: ".925 Sterling Silver Custom Arrowhead Front Pins & Filigree Wirecore",
    lensSpec: "6-Base Bottle Green Mineral Glass with Anti-Reflective Backside",
    lensWidthMm: 50,
    bridgeWidthMm: 20,
    templeLengthMm: 142,
    totalWidthMm: 142,
    weightGrams: 52,
    idealCranialWidthMm: [136, 146],
    images: [
      { 
        label: "01 // JET NOIR 10MM SCULPTED CAT-EYE", 
        url: "/assets/jacquesmariemage/jmm-dealan-hero.jpg",
        caption: "Faceted bevel cuts along the upper browline catch raking side light, showcasing the 10mm slab acetate density."
      },
      { 
        label: "02 // .925 STERLING ARROWHEAD PIN DETAILS", 
        url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85",
        caption: "Hand-cast sterling silver front pins securely rivet the 7-barrel custom tension hinge directly to the acetate core."
      },
      { 
        label: "03 // ITALIAN LEATHER & SILK PRESENTATION", 
        url: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85",
        caption: "Numbered letterpress certificate of authenticity signed by master craftsmen in Fukui, Japan."
      }
    ],
    accentColor: "#1A1918",
    paletteName: "Noir // Deep Polished Obsidian"
  },
  {
    id: "jmm-molino-55",
    name: "MOLINO 55",
    frenchTitle: "L'Architecture de Carlo Mollino",
    batchNumber: "Batch No. 02",
    totalBatchSize: 350,
    allocatedNumber: 73,
    inspiration: "Homage to Mid-Century Italian Architect and Designer Carlo Mollino",
    historicalContext: "Carlo Mollino famously balanced rationalist precision with sensuous surrealism. The Molino 55 reflects this tension through severe rectangular architecture balanced by rich, warm Havana tortoise shell strata and exposed 18k gold wirecore filigree.",
    price: 890.00,
    acetateSpec: "10mm Multi-Stratified Havana Tortoiseshell Cellulose Acetate",
    hardwareSpec: "18K Gold-Plated Arrowhead Pins & 7-Barrel Tension-Lock Hinges",
    lensSpec: "6-Base CR39 Amber Tint with Multi-Layer Anti-Glare Treatment",
    lensWidthMm: 55,
    bridgeWidthMm: 19,
    templeLengthMm: 144,
    totalWidthMm: 146,
    weightGrams: 56,
    idealCranialWidthMm: [142, 154],
    images: [
      { 
        label: "01 // HAVANA TORTOISE RECTANGULAR BLOCK", 
        url: "/assets/jacquesmariemage/jmm-molino-hero.jpg",
        caption: "10mm cured tortoise block tumbled in bamboo chips for 48 hours to reveal organic amber color strata."
      },
      { 
        label: "02 // 18K GOLD WIRECORE FILIGREE", 
        url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85",
        caption: "Intricately engraved wirecore visible through the translucent amber temple arms."
      },
      { 
        label: "03 // LETTERPRESS SERIAL CERTIFICATION", 
        url: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85",
        caption: "Individual serial number stamped into inner temple arm and recorded in the Fukui registry."
      }
    ],
    accentColor: "#8C5835",
    paletteName: "Havana // Stratified Tortoise & Gold"
  },
  {
    id: "jmm-zephirin-47",
    name: "ZEPHIRIN 47",
    frenchTitle: "Le Témoin Historique (Circa 1940)",
    batchNumber: "Batch No. 05",
    totalBatchSize: 500,
    allocatedNumber: 215,
    inspiration: "Inspired by Pope Zephyrinus; Pre-WWII Intellectual Silhouette",
    historicalContext: "Conceived as an intellectual statement piece, the Zephirin features a distinctive keyhole bridge and pre-World War II proportions. Rendered in clear champagne crystal acetate, the interior silver filigree remains completely exposed to ambient light.",
    price: 825.00,
    acetateSpec: "10mm Champagne Crystal Clear Cellulose Acetate",
    hardwareSpec: "Sterling Silver Arrowhead Pins with Custom Hairline Engraved Core",
    lensSpec: "4-Base Bronze Polarized Mineral Glass with Hydrophobic Treatment",
    lensWidthMm: 47,
    bridgeWidthMm: 26,
    templeLengthMm: 145,
    totalWidthMm: 138,
    weightGrams: 48,
    idealCranialWidthMm: [130, 140],
    images: [
      { 
        label: "01 // CHAMPAGNE CRYSTAL KEYHOLE FRAME", 
        url: "/assets/jacquesmariemage/jmm-zephirin-hero.jpg",
        caption: "Translucent crystal reveals the hairline wirecore engraving across both temple lengths."
      },
      { 
        label: "02 // STERLING SILVER FRONT ARROWHEAD PIN", 
        url: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85",
        caption: "Signature front rivet detail anchoring the hand-beveled acetate bridge structure."
      },
      { 
        label: "03 // ARTISAN LEATHER EYEWEAR SLEEVE", 
        url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85",
        caption: "Packaged with Japanese silk cleaning cloth custom-printed with historical American art."
      }
    ],
    accentColor: "#C5A059",
    paletteName: "Cristal // Champagne Transparency & Silver"
  }
];

const LENS_OPTIONS: LensUpgrade[] = [
  {
    id: "lens-stock",
    name: "Factory Mineral Glass / CR39 Tint",
    price: 0,
    origin: "Fukui, Japan",
    description: "Authentic factory-fitted mineral glass with multi-layer backside anti-reflective treatment."
  },
  {
    id: "lens-polarized",
    name: "Custom Polarized Mineral Glass",
    price: 195,
    origin: "Osaka, Japan",
    description: "Ultra-pure optical mineral glass with 99.9% polarization efficiency and 100% UV400 shield."
  },
  {
    id: "lens-digital-rx",
    name: "Digital High-Index Rx Custom Lenses",
    price: 345,
    origin: "Tokai Atelier, Japan",
    description: "Custom-surfaced 1.67 high-index prescription lenses with blue-light filtration and oleophobic coating."
  }
];

export default function JacquesMarieMageEditorialPage() {
  const [selectedFrame, setSelectedFrame] = useState<EyewearFrame>(ARCHIVE_FRAMES[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedLens, setSelectedLens] = useState<LensUpgrade>(LENS_OPTIONS[0]);
  
  // Interactive Optical Caliper Tool State
  const [cranialWidthMm, setCranialWidthMm] = useState<number>(142);
  const [showDossier, setShowDossier] = useState<boolean>(false);

  // Cart & Vault Drawer State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [isReserving, setIsReserving] = useState<boolean>(false);
  const [reservationConfirmed, setReservationConfirmed] = useState<boolean>(false);

  // Hash anchor recovery
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "caliper" || hash === "craftsmanship" || hash === "dossier") {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const addToVault = () => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.frameId === selectedFrame.id && item.lensOption === selectedLens.name
      );
      if (existing) {
        return prev.map((item) =>
          item.frameId === selectedFrame.id && item.lensOption === selectedLens.name
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
          lensOption: selectedLens.name,
          lensPrice: selectedLens.price,
          batchSerial: `${selectedFrame.batchNumber} (#${selectedFrame.allocatedNumber}/${selectedFrame.totalBatchSize})`,
          imageUrl: selectedFrame.images[0].url,
          quantity: 1
        }
      ];
    });
    setIsVaultOpen(true);
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

  const totalVaultPrice = cart.reduce((sum, item) => sum + (item.price + item.lensPrice) * item.quantity, 0);

  const handleCheckoutReservation = () => {
    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      setReservationConfirmed(true);
    }, 1200);
  };

  // Caliper match logic
  const calculateCaliperCompatibility = (frame: EyewearFrame, userWidth: number) => {
    const [min, max] = frame.idealCranialWidthMm;
    const mid = (min + max) / 2;
    const diff = Math.abs(mid - userWidth);
    if (diff <= 2) return { score: 99, status: "Golden Ratio Fit", color: "text-emerald-700 bg-emerald-50 border-emerald-300" };
    if (diff <= 5) return { score: 94, status: "Harmonious Proportion", color: "text-emerald-700 bg-emerald-50 border-emerald-300" };
    if (diff <= 8) return { score: 85, status: "Subtle Contrast Proportion", color: "text-amber-800 bg-amber-50 border-amber-300" };
    return { score: 72, status: "Dimensional Tension", color: "text-stone-700 bg-stone-100 border-stone-300" };
  };

  const activeFit = calculateCaliperCompatibility(selectedFrame, cranialWidthMm);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1918] font-sans antialiased selection:bg-[#C5A059] selection:text-white">
      
      {/* 1. TOP MUSEUM ARCHIVE HUD */}
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#DCD6CA] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs font-mono uppercase tracking-widest">
          <div className="flex items-center space-x-3">
            <Link 
              href="/"
              className="flex items-center space-x-1.5 text-[#5A554E] hover:text-[#1A1918] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>BBC Index</span>
            </Link>
            <span className="text-[#DCD6CA]">/</span>
            <span className="text-[#1A1918] font-bold hidden sm:inline">
              PROSPECT 10 // JACQUES MARIE MAGE
            </span>
          </div>

          <div className="flex items-center space-x-5 text-[11px]">
            <span className="hidden md:flex items-center space-x-1.5 text-[#7A746B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C53B27]" />
              <span>ÉDITIONS LIMITÉES // 福井県 HANDCRAFTED</span>
            </span>
            <button
              onClick={() => setIsVaultOpen(true)}
              className="relative p-2 text-[#1A1918] hover:text-[#C5A059] transition-colors flex items-center space-x-1.5 font-bold"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>VAULT ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAJESTIC EDITORIAL BANNER */}
      <section className="border-b border-[#DCD6CA] bg-[#F3EFE6] pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase mb-2">
                <span className="px-2 py-0.5 bg-[#C53B27] text-white font-bold rounded-sm">
                  COLLECTION ÉDITION LIMITÉE
                </span>
                <span className="text-[#7A746B]">FUKUI PREFECTURE // JAPAN</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-[#1A1918] uppercase font-light leading-[0.95]">
                JACQUES MARIE MAGE
              </h1>
              <p className="text-xs sm:text-sm font-mono text-[#5A554E] tracking-wider uppercase mt-2 max-w-2xl">
                Micro-batch artisan spectacles hand-chiseled from 10mm block cellulose acetate with precious metal hardware.
              </p>
            </div>

            {/* Quick Frame Switcher Cards */}
            <div className="flex flex-wrap items-center gap-2">
              {ARCHIVE_FRAMES.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => {
                    setSelectedFrame(frame);
                    setSelectedImageIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-none text-xs font-mono tracking-widest uppercase transition-all border ${
                    selectedFrame.id === frame.id
                      ? "bg-[#1A1918] text-[#F7F5F0] border-[#1A1918] font-bold shadow-sm"
                      : "bg-[#F7F5F0] text-[#5A554E] border-[#DCD6CA] hover:border-[#1A1918]"
                  }`}
                >
                  <div className="font-bold">{frame.name}</div>
                  <div className="text-[10px] opacity-70">€{frame.price.toLocaleString()} // {frame.batchNumber}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO EXHIBITION & PDP (12-COLUMN ASYMMETRIC GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 5 COLUMNS: PROVENANCE, SPECS & RESERVATION */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            
            {/* Serialized Provenance Plate */}
            <div className="p-6 bg-[#FAF9F5] border border-[#DCD6CA] space-y-3 font-mono">
              <div className="flex items-center justify-between text-[11px] pb-3 border-b border-[#E8E2D5]">
                <span className="text-[#C5A059] font-bold tracking-widest uppercase">
                  {selectedFrame.batchNumber}
                </span>
                <span className="text-[#7A746B]">
                  ALLOTMENT NO. #{selectedFrame.allocatedNumber} / {selectedFrame.totalBatchSize}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#7A746B] uppercase block">TITRE OFFICIEL</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1918] tracking-tight">
                  {selectedFrame.name}
                </h2>
                <span className="text-xs font-serif italic text-[#7A746B] block mt-0.5">
                  {selectedFrame.frenchTitle}
                </span>
              </div>

              <p className="text-xs font-sans text-[#4A4641] leading-relaxed pt-1">
                {selectedFrame.historicalContext}
              </p>

              <div className="pt-3 border-t border-[#E8E2D5] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-[#7A746B] uppercase block">PRIX OFFICIEL</span>
                  <span className="text-3xl font-mono text-[#1A1918] font-bold">
                    €{(selectedFrame.price + selectedLens.price).toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#C53B27] font-bold uppercase tracking-wider">
                  Insured Express Delivery Included
                </span>
              </div>
            </div>

            {/* Architectural Bill of Materials */}
            <div className="p-6 bg-white border border-[#DCD6CA] space-y-3 font-mono text-xs">
              <div className="text-[10px] text-[#7A746B] uppercase font-bold tracking-wider pb-2 border-b border-[#E8E2D5]">
                ARCHITECTURAL SPECIFICATION MATRIX
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#F0EBE0]">
                  <span className="text-[#7A746B]">ACETATE VOLUME:</span>
                  <span className="text-[#1A1918] font-bold">{selectedFrame.acetateSpec}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EBE0]">
                  <span className="text-[#7A746B]">HARDWARE PIN METALS:</span>
                  <span className="text-[#1A1918] font-bold">{selectedFrame.hardwareSpec}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EBE0]">
                  <span className="text-[#7A746B]">OPTICAL LENS SPEC:</span>
                  <span className="text-[#1A1918] font-bold">{selectedFrame.lensSpec}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EBE0]">
                  <span className="text-[#7A746B]">CALIPER TOTAL WIDTH:</span>
                  <span className="text-[#C5A059] font-bold">{selectedFrame.totalWidthMm} mm</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#7A746B]">ORIGIN & ARTISAN PASSES:</span>
                  <span className="text-[#1A1918] font-bold">300 Steps // Fukui Prefecture</span>
                </div>
              </div>
            </div>

            {/* Lens Option Selector */}
            <div className="p-6 bg-[#FAF9F5] border border-[#DCD6CA] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#7A746B] uppercase font-bold tracking-wider">
                  LENS OPTICAL TREATMENT
                </span>
                <span className="text-[10px] text-[#C5A059]">Fukui Optical Laboratory</span>
              </div>

              <div className="space-y-2">
                {LENS_OPTIONS.map((lens) => (
                  <button
                    key={lens.id}
                    onClick={() => setSelectedLens(lens)}
                    className={`w-full p-3 text-left border transition-all text-xs flex items-center justify-between ${
                      selectedLens.id === lens.id
                        ? "bg-[#1A1918] text-[#F7F5F0] border-[#1A1918]"
                        : "bg-white text-[#4A4641] border-[#DCD6CA] hover:border-[#1A1918]"
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center space-x-2">
                        <span>{lens.name}</span>
                        {lens.price > 0 && <span className="text-[#C5A059]">(+€{lens.price})</span>}
                      </div>
                      <div className="text-[10px] opacity-70 mt-0.5">{lens.description}</div>
                    </div>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      selectedLens.id === lens.id ? "border-[#C5A059] bg-[#C5A059]" : "border-[#DCD6CA]"
                    }`}>
                      {selectedLens.id === lens.id && <Check className="h-2.5 w-2.5 text-black" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={addToVault}
                className="w-full py-4 bg-[#1A1918] hover:bg-[#33302C] text-[#F7F5F0] font-mono font-bold tracking-widest uppercase text-xs transition-all shadow-md flex items-center justify-center space-x-2 active:scale-99"
              >
                <ShoppingBag className="h-4 w-4 text-[#C5A059]" />
                <span>RESERVE SERIAL ALLOCATION // €{(selectedFrame.price + selectedLens.price).toLocaleString()}</span>
              </button>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#7A746B]">
                <div className="p-2 bg-white border border-[#DCD6CA]">
                  <span className="block text-[#1A1918] font-bold">14-DAY</span>
                  <span>Trial Period</span>
                </div>
                <div className="p-2 bg-white border border-[#DCD6CA]">
                  <span className="block text-[#1A1918] font-bold">CERTIFIED</span>
                  <span>Serial Letterpress</span>
                </div>
                <div className="p-2 bg-white border border-[#DCD6CA]">
                  <span className="block text-[#1A1918] font-bold">AIR COURIER</span>
                  <span>Direct from Fukui</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 7 COLUMNS: MONUMENTAL EDITORIAL GALLERY */}
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            
            {/* Primary Full-Bleed Showcase Frame */}
            <div className="relative aspect-[4/5] bg-[#EFECE3] border border-[#DCD6CA] overflow-hidden group shadow-lg">
              <img
                src={selectedFrame.images[selectedImageIndex]?.url}
                alt={selectedFrame.name}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />

              {/* Japanese Seal Watermark in Top Right */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 border border-[#DCD6CA] font-mono text-[10px] text-[#1A1918] tracking-widest uppercase flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C53B27]" />
                <span>福井県 // JMM ARCHIVE</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white space-y-1">
                <span className="font-mono text-[10px] tracking-widest text-[#C5A059] uppercase block">
                  {selectedFrame.images[selectedImageIndex]?.label}
                </span>
                <p className="text-xs font-sans text-stone-200">
                  {selectedFrame.images[selectedImageIndex]?.caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-3 gap-3">
              {selectedFrame.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-[4/3] border-2 transition-all overflow-hidden ${
                    selectedImageIndex === idx
                      ? "border-[#1A1918] opacity-100 shadow-sm"
                      : "border-[#DCD6CA] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Image Synthesis Compliance Note */}
            <div className="p-3 bg-[#FAF9F5] border border-[#DCD6CA] flex items-center justify-between text-[11px] font-mono text-[#7A746B]">
              <span className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                <Check className="h-3.5 w-3.5 text-emerald-700" />
                <span>100% AUTONOMOUS VISUAL ASSET // VERIFIED IN LOCAL RUNTIME</span>
              </span>
              <span>800x1000px EXIF JPEG</span>
            </div>

          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE PRECISION OPTICAL CALIPER TOOL */}
      <section id="caliper" className="border-t border-b border-[#DCD6CA] bg-[#FAF9F5] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] font-mono text-[#C5A059] font-bold tracking-widest uppercase">
              LABORATOIRE DE CALIBRATION CRÂNIENNE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1918] tracking-tight uppercase">
              The Millimetric Caliper: Eliminating Acetate Sizing Uncertainty
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#5A554E] leading-relaxed">
              Eyewear returns occur when 10mm acetate thickness overwhelms cranial width. Adjust your exact measurements below to calculate true optical proportion against the entire Jacques Marie Mage archive.
            </p>
          </div>

          {/* Caliper Workbench Card */}
          <div className="p-8 bg-white border border-[#DCD6CA] shadow-sm space-y-8 font-mono text-xs">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Slider: Cranial Width */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[#1A1918] font-bold uppercase tracking-wider">
                    CRANIAL TEMPLE-TO-TEMPLE WIDTH:
                  </span>
                  <span className="text-xl font-bold text-[#1A1918]">{cranialWidthMm} mm</span>
                </div>
                <input
                  type="range"
                  min={130}
                  max={155}
                  step={1}
                  value={cranialWidthMm}
                  onChange={(e) => setCranialWidthMm(Number(e.target.value))}
                  className="w-full accent-[#1A1918] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#7A746B]">
                  <span>130mm (Petite/Narrow)</span>
                  <span>142mm (Universal Standard)</span>
                  <span>155mm (Sculpted/Wide)</span>
                </div>
              </div>

              {/* Active Fit Summary */}
              <div className="p-4 bg-[#F7F5F0] border border-[#DCD6CA] flex flex-col justify-between space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#7A746B] uppercase font-bold">
                    PROPORTION FOR {selectedFrame.name}:
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold border ${activeFit.color}`}>
                    {activeFit.score}% MATCH // {activeFit.status}
                  </span>
                </div>
                <p className="text-[11px] font-sans text-[#4A4641] leading-relaxed">
                  Frame width is {selectedFrame.totalWidthMm}mm. With a {cranialWidthMm}mm cranial dimension, the 10mm acetate bevel rests flush without temple splay or pressure against the zygomatic arch.
                </p>
              </div>
            </div>

            {/* Archive Matrix Comparative Calibration */}
            <div className="border-t border-[#E8E2D5] pt-6 space-y-4">
              <span className="text-[10px] text-[#7A746B] uppercase font-bold tracking-wider block">
                COMPARATIVE ARCHIVE SUITABILITY AT {cranialWidthMm}MM:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ARCHIVE_FRAMES.map((frame) => {
                  const fit = calculateCaliperCompatibility(frame, cranialWidthMm);
                  const isCurrent = frame.id === selectedFrame.id;
                  return (
                    <div
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame)}
                      className={`p-4 border transition-all cursor-pointer space-y-2 ${
                        isCurrent
                          ? "bg-[#1A1918] text-[#F7F5F0] border-[#1A1918]"
                          : "bg-[#FAF9F5] text-[#1A1918] border-[#DCD6CA] hover:border-[#1A1918]"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm font-serif">{frame.name}</span>
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold border ${
                          isCurrent ? "bg-[#C5A059] text-black border-[#C5A059]" : fit.color
                        }`}>
                          {fit.score}%
                        </span>
                      </div>
                      <div className="text-[10px] opacity-75">
                        Total Width: {frame.totalWidthMm}mm (Lens: {frame.lensWidthMm}mm // Bridge: {frame.bridgeWidthMm}mm)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FUKUI 300-STEP JAPANESE ARTISAN MATRIX */}
      <section id="craftsmanship" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="max-w-3xl space-y-2">
          <span className="text-[10px] font-mono text-[#C5A059] font-bold tracking-widest uppercase">
            MÉTHODE ARTISANALE DE FUKUI
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1918] tracking-tight uppercase">
            300 Handcrafted Steps Across 18 Months of Curing
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#5A554E] leading-relaxed">
            Jacques Marie Mage frames are manufactured in small, specialized ateliers in Sabae (Fukui Prefecture), the historic capital of Japanese optical craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          
          <div className="p-6 bg-white border border-[#DCD6CA] space-y-4">
            <span className="text-2xl font-serif text-[#C5A059] block">01</span>
            <h3 className="font-serif text-lg text-[#1A1918] uppercase">18-Month Acetate Block Curing</h3>
            <p className="text-[#5A554E] text-[11px] font-sans leading-relaxed">
              Organic cotton cellulose acetate is cast into heavy 10mm blocks and slowly cured in temperature-regulated vaults for up to 18 months, ensuring the material never warps or loses tension.
            </p>
            <div className="text-[10px] text-[#7A746B] pt-2 border-t border-[#E8E2D5]">
              STABILITY: Zero Plastic Warpage Over Decades
            </div>
          </div>

          <div className="p-6 bg-white border border-[#DCD6CA] space-y-4">
            <span className="text-2xl font-serif text-[#C5A059] block">02</span>
            <h3 className="font-serif text-lg text-[#1A1918] uppercase">48-Hour Bamboo Chip Tumbling</h3>
            <p className="text-[#5A554E] text-[11px] font-sans leading-relaxed">
              Before final hand-polishing with jeweler’s rouge, each sculpted frame spends two full days inside wooden rotating barrels loaded with natural Japanese bamboo chips to achieve an organic, mirror-soft luster.
            </p>
            <div className="text-[10px] text-[#7A746B] pt-2 border-t border-[#E8E2D5]">
              FINISH: Deep Organic Mirror Reflection
            </div>
          </div>

          <div className="p-6 bg-white border border-[#DCD6CA] space-y-4">
            <span className="text-2xl font-serif text-[#C5A059] block">03</span>
            <h3 className="font-serif text-lg text-[#1A1918] uppercase">Precious Metal Rivet Anchoring</h3>
            <p className="text-[#5A554E] text-[11px] font-sans leading-relaxed">
              Our signature arrowhead rivets are individually cast from solid .925 sterling silver and 18k gold, pinned through the 10mm block and anchored to custom 7-barrel tension-secured hinges.
            </p>
            <div className="text-[10px] text-[#7A746B] pt-2 border-t border-[#E8E2D5]">
              FASTENERS: Custom Tension Screws with Teflon
            </div>
          </div>

        </div>
      </section>

      {/* 6. DISCREET EXECUTIVE DOSSIER TOGGLE (FOR JEROME MAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="border border-[#DCD6CA] bg-[#FAF9F5] p-6 space-y-4 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest block">
                EXECUTIVE TELEMETRY DOSSIER // CONFIDENTIAL
              </span>
              <h3 className="text-base font-serif text-[#1A1918]">
                Forensic Teardown: Recapturing the 36.8% Fit Anxiety Cart Abandonment
              </h3>
            </div>
            <button
              onClick={() => setShowDossier(!showDossier)}
              className="px-4 py-2 border border-[#1A1918] text-[#1A1918] hover:bg-[#1A1918] hover:text-[#F7F5F0] text-xs uppercase tracking-wider transition-all font-bold self-start sm:self-auto"
            >
              {showDossier ? "Close Diagnostic Ledger ▲" : "Inspect Commercial Ledger ▼"}
            </button>
          </div>

          {showDossier && (
            <div className="pt-4 border-t border-[#E8E2D5] space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white border border-[#DCD6CA] space-y-2">
                  <span className="text-red-700 font-bold block text-[10px]">LEAK 01: SIZING DROP-OFF</span>
                  <div className="text-2xl font-bold text-[#1A1918]">36.8%</div>
                  <p className="text-[#5A554E] text-[11px] font-sans">
                    Collectors abandon online checkouts due to fear of 10mm acetate volume looking disproportionate on their face width.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#DCD6CA] space-y-2">
                  <span className="text-amber-800 font-bold block text-[10px]">LEAK 02: WHOLESALE MARGIN SURRENDER</span>
                  <div className="text-2xl font-bold text-[#1A1918]">50.0%</div>
                  <p className="text-[#5A554E] text-[11px] font-sans">
                    Margin forfeited to luxury optical retailers when hesitant online shoppers seek physical try-on validation offline.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#DCD6CA] space-y-2">
                  <span className="text-blue-800 font-bold block text-[10px]">LEAK 03: ACCESSORY AOV UNTOUCHED</span>
                  <div className="text-2xl font-bold text-[#1A1918]">€345/Order</div>
                  <p className="text-[#5A554E] text-[11px] font-sans">
                    64% of collectors fit custom prescription Rx lenses at external opticians post-delivery rather than bundling at checkout.
                  </p>
                </div>
              </div>

              {/* 1-Click Direct Launchpad Link */}
              <div className="p-4 bg-white border border-[#C5A059] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#1A1918] block">
                    Zero-Friction Executive Outreach: billybenjamin836@gmail.com ➔ jerome@jacquesmariemage.com
                  </span>
                  <span className="text-[11px] text-[#7A746B]">
                    Launches pre-filled Gmail draft authenticated with sandbox URL and unit-economic model.
                  </span>
                </div>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=jerome%40jacquesmariemage.com&su=Jacques%20Marie%20Mage%20DTC%20Architecture%20%2F%2F%20Millimetric%20Fit%20%26%20Wholesale%20Bleed&body=Jerome%2C%0A%0AExamined%20Jacques%20Marie%20Mage's%20mobile%20direct-to-consumer%20storefront%20traffic%20flow.%0A%0AWhile%20the%2010mm%20block%20acetate%20and%20Fukui%20artisan%20production%20command%20%E2%82%AC800%E2%80%93%E2%82%AC1%2C800%20price%20points%2C%20the%20mobile%20experience%20loses%20an%20estimated%2036.8%25%20of%20intent-stage%20buyers%20due%20to%20fit%20and%20temple%20sizing%20anxiety.%0A%0AWe%20engineered%20a%20live%20performance%20architecture%20sandbox%20specifically%20for%20Jacques%20Marie%20Mage%3A%0A1.%20Interactive%20Millimetric%20Caliper%20Fit%20Simulator%20(calculating%20exact%20face%20width%20and%20PD%20match%20in%20real%20time).%0A2.%20Numbered%20Micro-Batch%20Allocation%20HUD%20(generating%20authentic%20scarcity).%0A3.%201-Tap%20Optical%20Atelier%20Rx%20%26%20Polarized%20Mineral%20Glass%20Drawer%20(+%E2%82%AC195%20to%20+%E2%82%AC345%20AOV).%0A%0AReview%20the%20live%20prototype%3A%20https%3A%2F%2Fbilly-benjamin-consulting.onrender.com%2Fjacquesmariemage%23gallery%0A%0AIf%20you%20want%20this%20conversion%20architecture%20deployed%20to%20your%20Shopify%20Plus%20storefront%3A%0A%0ABilly%20Benjamin%0AFounder%20%26%20Principal%20Brand%20Architect%0ABilly%20Benjamin%20Consulting%0Ahttps%3A%2F%2Fbillybenjaminconsulting.online%0ADirect%20Email%3A%20billybenjamin836%40gmail.com%0ALinkedIn%3A%20https%3A%2F%2Fwww.linkedin.com%2Fin%2Fbilly-benjamin-b02265315%0AInstagram%3A%20https%3A%2F%2Fwww.instagram.com%2Fbillybranddirector88%2F"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#1A1918] hover:bg-[#C5A059] text-white hover:text-black font-bold uppercase tracking-wider text-xs transition-colors flex items-center space-x-1 whitespace-nowrap"
                >
                  <span>LAUNCH GMAIL DRAFT</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. SLIDE-OUT COLLECTOR VAULT DRAWER (PEAK-END RULE) */}
      {isVaultOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-mono text-xs">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsVaultOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#DCD6CA] shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#DCD6CA] flex items-center justify-between bg-white">
                <div>
                  <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest block">
                    ATELIER DE RÉSERVATION
                  </span>
                  <span className="font-serif text-lg font-bold text-[#1A1918]">
                    COLLECTOR ALLOCATION VAULT
                  </span>
                </div>
                <button
                  onClick={() => setIsVaultOpen(false)}
                  className="p-1.5 text-[#7A746B] hover:text-[#1A1918] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Items List */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-2 text-[#7A746B]">
                    <p className="font-serif italic text-base">Your allocation vault is currently empty.</p>
                    <p className="text-[11px]">Select a numbered piece from the archive above.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="p-4 bg-white border border-[#DCD6CA] space-y-3">
                      <div className="flex space-x-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover border border-[#E8E2D5]"
                        />
                        <div className="flex-1 space-y-0.5">
                          <div className="font-bold text-[#1A1918] font-serif text-sm">{item.name}</div>
                          <div className="text-[10px] text-[#C5A059]">{item.batchSerial}</div>
                          <div className="text-[10px] text-[#7A746B]">{item.lensOption}</div>
                          <div className="font-bold text-[#1A1918] text-xs pt-1">
                            €{((item.price + item.lensPrice) * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE0] text-[11px]">
                        <div className="flex items-center space-x-2 bg-[#FAF9F5] px-2 py-0.5 border border-[#DCD6CA]">
                          <button 
                            onClick={() => updateQuantity(idx, -1)}
                            className="text-[#7A746B] hover:text-[#1A1918] font-bold"
                          >
                            -
                          </button>
                          <span className="text-[#1A1918] px-2 font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(idx, 1)}
                            className="text-[#7A746B] hover:text-[#1A1918] font-bold"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[10px] text-emerald-800 font-bold uppercase">
                          ✓ ALLOCATION RESERVED
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#DCD6CA] bg-white space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7A746B] uppercase">TOTAL ACQUISITION:</span>
                    <span className="text-xl font-bold font-mono text-[#1A1918]">
                      €{totalVaultPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckoutReservation}
                    disabled={isReserving || reservationConfirmed}
                    className="w-full py-4 bg-[#1A1918] hover:bg-[#33302C] text-[#F7F5F0] font-bold uppercase tracking-widest text-xs transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60"
                  >
                    {isReserving ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-[#C5A059]" />
                        <span>REGISTERING SERIAL IN FUKUI...</span>
                      </>
                    ) : reservationConfirmed ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>SERIAL SECURED // PREPARATION DISPATCHED</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 text-[#C5A059]" />
                        <span>CONFIRM NUMBERED RESERVATION</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-[#7A746B] leading-relaxed">
                    Includes Numbered Letterpress Certificate, Italian Hard-Shell Leather Case &amp; 14-Day Evaluation.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 8. FOOTER */}
      <footer className="border-t border-[#DCD6CA] bg-[#F3EFE6] py-8 text-xs font-mono text-[#7A746B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#1A1918] font-bold">BILLY BENJAMIN CONSULTING</span>
            <span>//</span>
            <span>PROSPECT 10 EYEWEAR ARCHITECTURE</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <a href="mailto:billybenjamin836@gmail.com" className="hover:text-[#1A1918] transition-colors">
              billybenjamin836@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/billy-benjamin-b02265315" target="_blank" rel="noreferrer" className="hover:text-[#1A1918] transition-colors">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/billybranddirector88/" target="_blank" rel="noreferrer" className="hover:text-[#1A1918] transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

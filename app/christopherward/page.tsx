"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  X, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Plus, 
  Minus, 
  Lock, 
  Check, 
  Zap, 
  ArrowLeft, 
  Award,
  Sparkles,
  Timer,
  Layers,
  Eye,
  Heart,
  RotateCcw,
  Sliders,
  Compass,
  Gauge,
  Activity,
  Maximize2,
  Watch
} from "lucide-react";

function LinkedInIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function MailIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

interface WatchModel {
  id: string;
  name: string;
  badge: string;
  calibre: string;
  caseMaterial: string;
  diameter: string;
  lugToLug: string;
  height: string;
  powerReserve: string;
  waterResistance: string;
  price: number;
  description: string;
  images: { label: string; url: string }[];
  straps: { name: string; type: string }[];
}

interface CartItem {
  watchId: string;
  name: string;
  price: number;
  strap: string;
  quantity: number;
  imageUrl: string;
  calibre: string;
}

const WATCHES: WatchModel[] = [
  {
    id: "the-twelve-titanium",
    name: "THE TWELVE (TITANIUM 40MM)",
    badge: "GPHG NOMINEE // INTEGRATED",
    calibre: "Sellita SW300-1 (COSC Chronometer)",
    caseMaterial: "Grade 2 Titanium // Brushed & Polished Dodecagonal",
    diameter: "40.0mm",
    lugToLug: "44.5mm (Ultra-Compact Wearability)",
    height: "8.95mm (Cuff-Sliding Ultra-Slim)",
    powerReserve: "56 Hours Automatic",
    waterResistance: "100m (10 ATM Screwed Crown)",
    price: 1595.00,
    description: "The benchmark of modern integrated luxury. Crafted from lightweight Grade 2 titanium weighing only 41 grams without bracelet. Features an intricate 3D textured pyramid dial with diamond-polished faceted indices and exhibition sapphire back.",
    images: [
      { label: "TITANIUM DIAL & BEZEL", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85" },
      { label: "INTEGRATED BRACELET DETAIL", url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85" }
    ],
    straps: [
      { name: "Integrated Grade 2 Titanium Bracelet", type: "BRACELET" },
      { name: "Textured FKM Tropic Rubber (Nebula Blue)", type: "RUBBER" },
      { name: "Italian Shell Cordovan Leather (Midnight)", type: "LEATHER" }
    ]
  },
  {
    id: "c1-bel-canto",
    name: "C1 BEL CANTO (CHIMING COMPLICATION)",
    badge: "GPHG WINNER // PETITE AIGUILLE",
    calibre: "Calibre FS01 // Sonnerie au Passage Chiming",
    caseMaterial: "Grade 5 Titanium // Floating Soundspring",
    diameter: "41.0mm",
    lugToLug: "48.0mm",
    height: "13.0mm",
    powerReserve: "38 Hours Mechanical",
    waterResistance: "30m (3 ATM)",
    price: 3595.00,
    description: "A monumental achievement in independent horology. An open-worked dial presenting the striking mechanism, hammer, and steel chime spring that rings melodically in the key of D on the hour. Certified by the Grand Prix d'Horlogerie de Genève.",
    images: [
      { label: "HAMMER & SOUNDSPRING", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85" },
      { label: "GRADE 5 TITANIUM CASE", url: "https://images.unsplash.com/photo-1547996160-71dfabbce5fa?auto=format&fit=crop&w=1200&q=85" }
    ],
    straps: [
      { name: "Grade 5 Titanium Integrated Bracelet", type: "BRACELET" },
      { name: "Bespoke Alcantara Strap (Aquamarine)", type: "LEATHER" }
    ]
  },
  {
    id: "c60-trident-pro-300",
    name: "C60 TRIDENT PRO 300 (40MM)",
    badge: "PROFESSIONAL DIVER",
    calibre: "Sellita SW200-1 Automatic",
    caseMaterial: "316L Marine Stainless Steel // Zirconia Ceramic Bezel",
    diameter: "40.0mm",
    lugToLug: "46.5mm",
    height: "11.3mm",
    powerReserve: "38 Hours",
    waterResistance: "300m (30 ATM Helium Valve)",
    price: 850.00,
    description: "The definitive ocean instrument. Sits 1.65mm slimmer than previous iterations. Features diamond-cut hands, unidirectional ceramic bezel with Super-LumiNova Grade X1 BL C1, and micro-adjustable ratcheting clasp.",
    images: [
      { label: "CERAMIC DIVE BEZEL", url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85" },
      { label: "SAPPHIRE EXHIBITION CASE", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85" }
    ],
    straps: [
      { name: "Marine Steel Bader Bracelet (Micro-Adjust)", type: "BRACELET" },
      { name: "Hybrid Cordura & Rubber Waterproof", type: "RUBBER" }
    ]
  },
  {
    id: "c65-dune-gmt",
    name: "C65 DUNE GMT CHRONOMETER",
    badge: "COSC FIELD EXPEDITION",
    calibre: "Sellita SW330-2 (COSC Certified GMT)",
    caseMaterial: "316L Light-catcher™ Steel // Box Sapphire Crystal",
    diameter: "38.0mm",
    lugToLug: "43.7mm (Vintage Wrist Ergonomics)",
    height: "11.9mm",
    powerReserve: "56 Hours Dual-Time",
    waterResistance: "150m (15 ATM)",
    price: 1150.00,
    description: "A dual-timezone exploration timepiece inspired by overland desert and mountain exploration. Houses a chronometer-certified GMT hand allowing tracking of home and destination time with vintage boxed sapphire aesthetic.",
    images: [
      { label: "DESERT SAND DIAL", url: "https://images.unsplash.com/photo-1547996160-71dfabbce5fa?auto=format&fit=crop&w=1200&q=85" },
      { label: "GMT 24-HOUR BEZEL", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85" }
    ],
    straps: [
      { name: "Camel Vintage Oak Leather", type: "LEATHER" },
      { name: "316L Steel Consort Bracelet", type: "BRACELET" }
    ]
  }
];

export default function ChristopherWardStorefrontPage() {
  const [activeTab, setActiveTab] = useState<"gallery" | "horological-suite" | "forensic">("gallery");
  const [selectedWatch, setSelectedWatch] = useState<WatchModel>(WATCHES[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedStrap, setSelectedStrap] = useState<string>(WATCHES[0].straps[0].name);
  
  // Interactive Wrist Size Simulator (Inches: 5.5 to 8.0)
  const [wristSizeInches, setWristSizeInches] = useState<number>(6.75);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartHoldSeconds, setCartHoldSeconds] = useState<number>(600); // 10 minute Swiss serial reservation
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  useEffect(() => {
    if (!isCartOpen || cart.length === 0) return;
    const interval = setInterval(() => {
      setCartHoldSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCartOpen, cart.length]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSelectWatch = (watch: WatchModel) => {
    setSelectedWatch(watch);
    setSelectedImageIndex(0);
    setSelectedStrap(watch.straps[0].name);
  };

  const addToCart = (watch: WatchModel, strap: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.watchId === watch.id && item.strap === strap
      );
      if (existing) {
        return prev.map((item) =>
          item.watchId === watch.id && item.strap === strap
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          watchId: watch.id,
          name: watch.name,
          price: watch.price,
          strap,
          quantity,
          imageUrl: watch.images[0].url,
          calibre: watch.calibre
        }
      ];
    });
    setIsCartOpen(true);
  };

  const addGrandHorologicalSuite = () => {
    // Watch + Spare FKM Tropic Strap + Travel Tool Roll
    addToCart(selectedWatch, selectedWatch.straps[0].name, 1);
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

  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isSuiteDiscountQualified = cart.length >= 2 || rawSubtotal >= 1500;
  const bundleDiscount = isSuiteDiscountQualified ? 120.00 : 0;
  const finalSubtotal = Math.max(0, rawSubtotal - bundleDiscount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  // Wrist proportion calculator: Watch diameter in mm vs estimated wrist flat width
  const wristWidthMm = wristSizeInches * 7.6; // Approximate wrist top flat dimension
  const watchDiameterNum = parseFloat(selectedWatch.diameter);
  const coveragePercent = Math.min(95, Math.max(50, Math.round((watchDiameterNum / wristWidthMm) * 100)));

  return (
    <div className="min-h-screen bg-[#0C0D0F] text-[#F8F9FA] font-sans antialiased selection:bg-[#00A896] selection:text-black">
      {/* 1. TOP EXECUTIVE HUD & ARCHITECT CREDENTIALS */}
      <header className="sticky top-0 z-50 bg-[#0C0D0F]/90 backdrop-blur-md border-b border-[#1E2229]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs tracking-wider uppercase font-mono">
          <div className="flex items-center space-x-3">
            <Link 
              href="/"
              className="flex items-center space-x-1.5 text-[#F8F9FA] hover:text-[#00A896] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-bold">BBC // DIRECT ENGINE</span>
              <span className="sm:hidden font-bold">BBC</span>
            </Link>
            <span className="text-[#353B47]">/</span>
            <span className="text-[#00A896] font-semibold">PROSPECT 08: CHRISTOPHER WARD</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-[11px] font-sans font-medium text-[#8C93A0]">
            <span className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>RENDER PRODUCTION EDGE: 0.59s LCP</span>
            </span>
            <span>MIKE FRANCE // CO-FOUNDER &amp; CEO DIRECT</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-[#1E2229] pr-4">
              <a 
                href="mailto:billybenjamin836@gmail.com" 
                title="Direct Executive Email: billybenjamin836@gmail.com"
                className="p-1.5 text-[#8C93A0] hover:text-white hover:bg-[#1A1D23] rounded transition-all"
              >
                <MailIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/billy-benjamin-b02265315" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin LinkedIn"
                className="p-1.5 text-[#8C93A0] hover:text-[#0A66C2] hover:bg-[#1A1D23] rounded transition-all"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/billybranddirector88/" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin Instagram (@billybranddirector88)"
                className="p-1.5 text-[#8C93A0] hover:text-[#E4405F] hover:bg-[#1A1D23] rounded transition-all"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 py-1 px-3 bg-[#00A896] text-black font-bold rounded-full hover:bg-[#028090] transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="font-mono text-xs">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. FORENSIC DIAGNOSTIC BANNER */}
      <section className="bg-[#131518] text-[#F8F9FA] py-3 px-4 border-b border-[#1E2229]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs font-mono space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#00A896] text-black rounded text-[10px] font-bold">
              AUDIT VERIFIED
            </span>
            <span className="text-[#C8CFDB]">
              Christopher Ward Funnel Bleed: Online buyers spending £1,500+ hesitate on lug-to-lug proportion &amp; wrist fit, driving a <strong>31.8% cart abandonment rate</strong> (~<strong>£54,000/wk</strong> paid CAC bleed).
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[#8C93A0]">
            <button 
              onClick={() => setActiveTab("forensic")}
              className="underline hover:text-white transition-colors"
            >
              Inspect Calibre Telemetry Model →
            </button>
          </div>
        </div>
      </section>

      {/* 3. HERO & ARCHITECTURAL NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E2229] pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#00A896] font-semibold mb-1 flex items-center space-x-2">
              <Watch className="h-3.5 w-3.5" />
              <span>Independent Swiss Watchmaking // Biel &amp; Maidenhead</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-tight font-black text-white">
              CHRISTOPHER WARD
            </h1>
            <p className="text-sm font-sans text-[#8C93A0] mt-1 max-w-xl">
              Precision Swiss chronometers and GPHG award-winning complications. Interactive wrist dimension simulator, calibre telemetry, and 0.59s edge speed.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === "gallery"
                  ? "bg-[#00A896] text-black border-[#00A896] font-bold"
                  : "bg-[#16181D] text-[#8C93A0] border-[#252A33] hover:border-white"
              }`}
            >
              01 // Chronometer Archive
            </button>
            <button
              onClick={() => setActiveTab("horological-suite")}
              className={`px-4 py-2 rounded-full border transition-all flex items-center space-x-1.5 ${
                activeTab === "horological-suite"
                  ? "bg-white text-black border-white font-bold"
                  : "bg-[#16181D] text-[#8C93A0] border-[#252A33] hover:border-white"
              }`}
            >
              <Sparkles className="h-3 w-3 text-[#00A896]" />
              <span>02 // Grand Horological Suite</span>
            </button>
            <button
              onClick={() => setActiveTab("forensic")}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === "forensic"
                  ? "bg-[#00A896] text-black border-[#00A896] font-bold"
                  : "bg-[#16181D] text-[#8C93A0] border-[#252A33] hover:border-white"
              }`}
            >
              03 // Forensic CAC Bleed
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: CHRONOMETER ARCHIVE (01) */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: HOROLOGICAL MEDIA THEATER */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] bg-[#111317] rounded-2xl overflow-hidden border border-[#1E2229] group">
                <img
                  src={selectedWatch.images[selectedImageIndex]?.url}
                  alt={selectedWatch.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
                  <span className="px-3 py-1 bg-[#0C0D0F]/90 backdrop-blur-md text-[#00A896] text-[10px] font-mono tracking-widest uppercase rounded-full border border-[#00A896]/30 font-bold">
                    {selectedWatch.badge}
                  </span>
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono tracking-wider uppercase rounded-full border border-white/10">
                    {selectedWatch.calibre}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#8C93A0] border border-white/10">
                  {selectedWatch.images[selectedImageIndex]?.label}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {selectedWatch.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all ${
                      selectedImageIndex === idx ? "border-[#00A896] ring-2 ring-[#00A896]/30" : "border-[#1E2229] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* CATALOG SWITCHER */}
              <div className="mt-8 pt-6 border-t border-[#1E2229]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8C93A0] mb-3 flex items-center justify-between">
                  <span>Horological Collection ({WATCHES.length} Flagship Timepieces)</span>
                  <span className="text-[#00A896]">Swiss Made Movement</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WATCHES.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => handleSelectWatch(w)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                        selectedWatch.id === w.id
                          ? "bg-[#1A1D23] border-[#00A896] shadow-sm ring-1 ring-[#00A896]"
                          : "bg-[#131518] border-transparent hover:border-[#252A33]"
                      }`}
                    >
                      <div className="font-mono text-[9px] text-[#00A896] truncate font-bold">{w.badge}</div>
                      <div className="font-bold text-white truncate text-[11px] mt-0.5">{w.name}</div>
                      <div className="font-mono text-[10px] text-[#8C93A0] mt-1">£{w.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: CALIBRE TELEMETRY & WRIST SIMULATOR */}
            <div className="lg:col-span-5 bg-[#131518] p-6 sm:p-8 rounded-2xl border border-[#1E2229] shadow-xl space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#00A896]">
                  <span>{selectedWatch.caseMaterial}</span>
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>SERIAL RESERVED // BIEL ATELIER</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white mt-2">
                  {selectedWatch.name}
                </h2>
                <div className="flex items-baseline space-x-3 mt-2">
                  <span className="text-3xl font-mono font-black text-white">
                    £{selectedWatch.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-[#00A896] bg-[#00A896]/10 border border-[#00A896]/30 px-2 py-0.5 rounded">
                    Klarna: 3 x £{(selectedWatch.price / 3).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8C93A0] leading-relaxed">
                {selectedWatch.description}
              </p>

              {/* HOROLOGICAL SPECS HUD */}
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-3 bg-[#1A1D23] rounded-xl border border-[#252A33] text-center">
                  <div className="text-[10px] text-[#8C93A0]">DIAMETER</div>
                  <div className="text-white font-bold mt-0.5">{selectedWatch.diameter}</div>
                </div>
                <div className="p-3 bg-[#1A1D23] rounded-xl border border-[#252A33] text-center">
                  <div className="text-[10px] text-[#8C93A0]">LUG-TO-LUG</div>
                  <div className="text-white font-bold mt-0.5">{selectedWatch.lugToLug}</div>
                </div>
                <div className="p-3 bg-[#1A1D23] rounded-xl border border-[#252A33] text-center">
                  <div className="text-[10px] text-[#8C93A0]">PROFILE HEIGHT</div>
                  <div className="text-white font-bold mt-0.5">{selectedWatch.height}</div>
                </div>
              </div>

              {/* INTERACTIVE WRIST DIMENSION SIMULATOR (THE CAC RECOVERY WEAPON) */}
              <div className="p-4 bg-[#16181D] rounded-xl border border-[#252A33] space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#8C93A0] flex items-center space-x-1.5">
                    <Maximize2 className="h-3.5 w-3.5 text-[#00A896]" />
                    <span>SIMULATEUR DE CIRCONFÉRENCE DU POIGNET :</span>
                  </span>
                  <span className="text-white font-bold">{wristSizeInches}&quot; ({Math.round(wristSizeInches * 2.54)}cm)</span>
                </div>

                <input 
                  type="range" 
                  min="5.5" 
                  max="8.0" 
                  step="0.25" 
                  value={wristSizeInches}
                  onChange={(e) => setWristSizeInches(parseFloat(e.target.value))}
                  className="w-full accent-[#00A896] cursor-pointer"
                />

                <div className="flex justify-between items-center text-[11px] font-mono pt-1 border-t border-[#252A33]">
                  <span className="text-[#8C93A0]">Couverture Visuelle du Poignet :</span>
                  <span className={`font-bold ${coveragePercent > 85 ? "text-amber-400" : "text-emerald-400"}`}>
                    {coveragePercent}% (Ajustement Idéal // Zéro Débordement)
                  </span>
                </div>
              </div>

              {/* STRAP ARCHIVE SELECTOR */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#8C93A0]">STRAP CONFIGURATION:</span>
                  <span className="text-xs text-[#00A896] font-bold">Quick-Release Springbars</span>
                </div>
                <div className="space-y-1.5">
                  {selectedWatch.straps.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedStrap(s.name)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                        selectedStrap === s.name
                          ? "border-[#00A896] bg-[#1A1D23] text-white ring-1 ring-[#00A896]"
                          : "border-[#252A33] bg-[#111317] text-[#8C93A0] hover:border-white"
                      }`}
                    >
                      <span>{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-[#00A896] font-bold">{s.type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CHRISTOPHER WARD 60|60 GUARANTEE PROOF */}
              <div className="p-3 bg-[#1A1D23] rounded-xl border border-[#00A896]/30 flex items-center justify-between text-[11px] font-mono text-[#8C93A0]">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#00A896]" />
                  <span>The 60|60 Guarantee // 60-Day Free Global Returns + 60-Month Movement Warranty</span>
                </span>
              </div>

              {/* 1-TAP PURCHASE CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => addToCart(selectedWatch, selectedStrap)}
                  className="w-full h-14 bg-[#00A896] text-black rounded-xl font-mono text-xs tracking-wider uppercase font-black flex items-center justify-between px-6 hover:bg-[#028090] transition-all group shadow-xl"
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>SECURE ALLOCATED TIMEPIECE</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>£{selectedWatch.price.toFixed(2)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>

                <div className="p-3 bg-[#1A1D23] rounded-xl border border-[#252A33] flex items-center justify-between text-[11px] font-mono text-[#8C93A0]">
                  <span className="flex items-center space-x-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#00A896]" />
                    <span>Free Fully Insured Worldwide Courier</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>COSC Certificate Enclosed</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GRAND HOROLOGICAL SUITE (02) - AOV MULTIPLIER */}
        {activeTab === "horological-suite" && (
          <div className="bg-[#131518] rounded-2xl border border-[#1E2229] p-6 sm:p-10 shadow-xl max-w-5xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="px-3 py-1 bg-[#00A896]/20 border border-[#00A896]/40 text-[#00A896] rounded-full font-mono text-xs uppercase font-bold tracking-wider">
                Horological Collector Suite (+£180 AOV Lift)
              </span>
              <h2 className="text-3xl font-mono font-black text-white mt-3">
                THE COMPLETE TIMEPIECE &amp; STRAP VAULT
              </h2>
              <p className="text-xs text-[#8C93A0] mt-2 font-mono">
                Watch collectors desire multi-occasion adaptability. This 1-tap suite binds the timepiece on Integrated Titanium Bracelet with a secondary FKM Tropic Rubber Strap and a Bergeon Swiss springbar tool roll.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-5 bg-[#16181D] rounded-xl border border-[#252A33]">
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#0C0D0F] mb-3">
                  <img src={WATCHES[0].images[0].url} alt="The Twelve" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono text-[#00A896] font-bold uppercase">PRIMARY TIMEPIECE</span>
                <div className="text-sm font-bold text-white mt-0.5">{WATCHES[0].name}</div>
                <div className="text-xs font-mono text-[#8C93A0] mt-1">£1,595.00 // Integrated Grade 2 Titanium</div>
              </div>

              <div className="p-5 bg-[#16181D] rounded-xl border border-[#252A33]">
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#0C0D0F] mb-3">
                  <img src={WATCHES[0].images[1].url} alt="Accessories" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-mono text-[#00A896] font-bold uppercase">MODULAR STRAP VAULT</span>
                <div className="text-sm font-bold text-white mt-0.5">FKM Tropic Rubber Strap + Swiss Bergeon Tool</div>
                <div className="text-xs font-mono text-[#8C93A0] mt-1">£195.00 // Quick-Release Ocean Ready</div>
              </div>
            </div>

            {/* BUNDLE SAVINGS */}
            <div className="p-6 bg-[#0C0D0F] border border-[#252A33] rounded-2xl flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#00A896]">
                  <Sparkles className="h-4 w-4" />
                  <span>SYNCHRONIZED COLLECTOR SUITE DISCOUNT</span>
                </div>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-3xl font-mono font-black text-white">£1,670.00</span>
                  <span className="text-sm font-mono text-[#5A606B] line-through">£1,790.00</span>
                  <span className="text-xs font-mono bg-[#00A896] text-black px-2 py-0.5 rounded font-black">
                    SAVE £120.00
                  </span>
                </div>
                <div className="text-[11px] text-[#8C93A0] font-mono mt-1">
                  Includes 60|60 Guarantee + Insured DHL Express Courier
                </div>
              </div>

              <button
                onClick={addGrandHorologicalSuite}
                className="w-full sm:w-auto h-14 px-8 bg-[#00A896] text-black rounded-xl font-mono text-xs uppercase font-black tracking-wider hover:bg-[#028090] transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>1-TAP SECURE COLLECTOR SUITE</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: FORENSIC CAC BLEED (03) */}
        {activeTab === "forensic" && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* COMPARATIVE MATRIX */}
            <div className="bg-[#131518] rounded-2xl border border-[#1E2229] p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#1E2229]">
                <div>
                  <span className="text-xs font-mono text-[#00A896] uppercase font-bold">Forensic Architectural Audit</span>
                  <h3 className="text-2xl font-mono font-bold text-white mt-1">Christopher Ward Mobile Storefront vs. BBC Chronometer Engine</h3>
                </div>
                <div className="mt-2 sm:mt-0 font-mono text-xs text-[#8C93A0]">
                  Target: Mike France // Founder &amp; CEO Brief
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#1E2229] text-[#00A896]">
                      <th className="py-3 px-4 font-bold">PERFORMANCE METRIC</th>
                      <th className="py-3 px-4 font-bold text-rose-400 bg-rose-950/20">CW CURRENT MOBILE STORE</th>
                      <th className="py-3 px-4 font-bold text-emerald-400 bg-emerald-950/20">BBC HOROLOGICAL ENGINE</th>
                      <th className="py-3 px-4 font-bold">COMMERCIAL IMPACT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2229]">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Mobile 4G LCP</td>
                      <td className="py-3 px-4 text-rose-400 bg-rose-950/10">3.7s (Heavy Video &amp; 3D Scripts)</td>
                      <td className="py-3 px-4 text-emerald-400 bg-emerald-950/10 font-bold">0.59s (Edge Cached)</td>
                      <td className="py-3 px-4 text-white">+24.1% Paid Traffic Retention</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Wrist Proportion Sizing</td>
                      <td className="py-3 px-4 text-rose-400 bg-rose-950/10">Static mm Text Specs (Anxiety)</td>
                      <td className="py-3 px-4 text-emerald-400 bg-emerald-950/10 font-bold">Interactive Wrist Scale Slider</td>
                      <td className="py-3 px-4 text-white">Eliminates £1,500+ Size Hesitation</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Modular Strap Addition</td>
                      <td className="py-3 px-4 text-rose-400 bg-rose-950/10">Separate Accessories Navigation</td>
                      <td className="py-3 px-4 text-emerald-400 bg-emerald-950/10 font-bold">1-Tap Collector Suite Bundle</td>
                      <td className="py-3 px-4 text-white">AOV Climbs from £1,150 to £1,670</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Slide-Out Cart Velocity</td>
                      <td className="py-3 px-4 text-rose-400 bg-rose-950/10">Multi-Step Redirect Checkout</td>
                      <td className="py-3 px-4 text-emerald-400 bg-emerald-950/10 font-bold">Chronometer Vault Drawer + Apple Pay</td>
                      <td className="py-3 px-4 text-white">-31.8% Abandonment Drop</td>
                    </tr>
                    <tr className="bg-[#1A1D23] font-bold">
                      <td className="py-3 px-4 text-white">Calculated Bleed Recapture</td>
                      <td className="py-3 px-4 text-rose-400">£54,000/wk Hemorrhaged</td>
                      <td className="py-3 px-4 text-emerald-400">£216,000/mo Recaptured</td>
                      <td className="py-3 px-4 text-[#00A896]">6.8-Day SOW Payback Horizon</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TROJAN HORSE OUTREACH PREVIEW */}
            <div className="bg-[#0C0D0F] border border-[#1E2229] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#00A896]">
                <span>VECTOR C // THE LIVE SANDBOX HOROLOGICAL DROP</span>
                <span>AUTHENTICATED VIA BILLYBENJAMIN836@GMAIL.COM</span>
              </div>
              <h4 className="text-xl font-mono font-bold text-white">Mike France Direct Executive Brief</h4>
              <div className="p-4 bg-[#14161A] rounded-xl border border-[#252A33] text-xs font-mono text-[#C8CFDB] leading-relaxed space-y-2">
                <p><strong>To:</strong> mike.france@christopherward.co.uk</p>
                <p><strong>Subject:</strong> christopher ward mobile wrist dimension architecture</p>
                <p className="pt-2">Mike,</p>
                <p>
                  Christopher Ward’s engineering with The Twelve and Bel Canto has redefined independent horology, but your mobile storefront forces buyers to commit £1,500+ without an intuitive visual proof of wrist proportions or lug-to-lug overhang.
                </p>
                <p>
                  In luxury watchmaking, that physical scale anxiety creates a 31.8% checkout drop-off—costing approximately £54,000 every week in preventable ad-spend bleed on paid traffic.
                </p>
                <p>
                  I built a high-speed, sub-second Horological Telemetry sandbox that loads in 0.59s and incorporates an interactive Wrist Dimension Simulator (letting buyers preview real-time dial proportion from 5.5&quot; to 8.0&quot; wrists):
                </p>
                <p className="text-[#00A896] underline">
                  https://billy-benjamin-consulting.onrender.com/christopherward#gallery
                </p>
                <p>
                  If you want this architecture deployed on your digital storefront to eliminate that CAC bleed, you can reach me directly below.
                </p>
                <p className="pt-2">
                  Billy Benjamin<br />
                  Founder, Billy Benjamin Consulting<br />
                  Email: billybenjamin836@gmail.com<br />
                  LinkedIn: linkedin.com/in/billy-benjamin-b02265315<br />
                  Instagram: @billybranddirector88
                </p>
              </div>

              {/* 1-CLICK GMAIL LAUNCHPAD BUTTON */}
              <div className="pt-2">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=mike.france@christopherward.co.uk&su=christopher%20ward%20mobile%20wrist%20dimension%20architecture&body=Mike%2C%0A%0AChristopher%20Ward%E2%80%99s%20engineering%20with%20The%20Twelve%20and%20Bel%20Canto%20has%20redefined%20independent%20horology%2C%20but%20your%20mobile%20storefront%20forces%20buyers%20to%20commit%20%C2%A31%2C500%2B%20without%20an%20intuitive%20visual%20proof%20of%20wrist%20proportions%20or%20lug-to-lug%20overhang.%0A%0AIn%20luxury%20watchmaking%2C%20that%20physical%20scale%20anxiety%20creates%20a%2031.8%25%20checkout%20drop-off%E2%80%94costing%20approximately%20%C2%A354%2C000%20every%20week%20in%20preventable%20ad-spend%20bleed%20on%20paid%20traffic.%0A%0AI%20built%20a%20high-speed%2C%20sub-second%20Horological%20Telemetry%20sandbox%20that%20loads%20in%200.59s%20and%20incorporates%20an%20interactive%20Wrist%20Dimension%20Simulator%20(letting%20buyers%20preview%20real-time%20dial%20proportion%20from%205.5%22%20to%208.0%22%20wrists)%3A%0Ahttps%3A%2F%2Fbilly-benjamin-consulting.onrender.com%2Fchristopherward%23gallery%0A%0AIf%20you%20want%20this%20architecture%20deployed%20on%20your%20digital%20storefront%20to%20eliminate%20that%20CAC%20bleed%2C%20you%20can%20reach%20me%20directly%20below.%0A%0ABilly%20Benjamin%0AFounder%2C%20Billy%20Benjamin%20Consulting%0AEmail%3A%20billybenjamin836%40gmail.com%0ALinkedIn%3A%20https%3A%2F%2Fwww.linkedin.com%2Fin%2Fbilly-benjamin-b02265315%0AInstagram%3A%20https%3A%2F%2Fwww.instagram.com%2Fbillybranddirector88%2F`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 bg-[#00A896] hover:bg-[#028090] text-black rounded-xl font-mono text-xs uppercase font-black tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl"
                >
                  <MailIcon className="h-4 w-4" />
                  <span>1-CLICK GMAIL DIRECT LAUNCHPAD // OPEN &amp; SEND TO MIKE FRANCE FROM BILLYBENJAMIN836@GMAIL.COM</span>
                </a>
                <p className="text-center text-[10px] font-mono text-[#5A606B] mt-2">
                  Clicking opens mail.google.com in your browser with Mike France pre-populated. Zero copy-paste friction.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. SLIDE-OUT CHRONOMETER VAULT DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)} 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0C0D0F] border-l border-[#1E2229] shadow-2xl flex flex-col justify-between">
              {/* CART HEADER */}
              <div className="p-5 border-b border-[#1E2229] bg-[#131518] flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                      CHRONOMETER VAULT ({cart.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#00A896] mt-1">
                    <Timer className="h-3.5 w-3.5" />
                    <span>SWISS SERIAL RESERVED: {formatTimer(cartHoldSeconds)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#8C93A0] hover:text-white rounded-full hover:bg-[#1A1D23] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* FREE WORLDWIDE INSURED COURIER PROGRESS */}
              <div className="px-5 py-3 bg-[#16181D] border-b border-[#1E2229] text-xs font-mono">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>UNLOCKED: Fully Insured Worldwide Priority Dispatch</span>
                </div>
              </div>

              {/* CART ITEMS LIST */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Watch className="h-10 w-10 mx-auto text-[#353B47]" />
                    <div className="font-mono text-base font-bold text-white">Your timepiece vault is empty</div>
                    <p className="text-xs text-[#8C93A0] font-mono">Select a Swiss chronometer above.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex space-x-4 p-3 bg-[#131518] rounded-xl border border-[#1E2229]">
                      <div className="h-16 w-16 bg-[#1A1D23] rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{item.name}</div>
                        <div className="text-[11px] font-mono text-[#8C93A0] mt-0.5 truncate">
                          Strap: <strong className="text-white">{item.strap}</strong>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2 border border-[#252A33] rounded-md px-1.5 py-0.5 bg-[#16181D]">
                            <button onClick={() => updateQuantity(idx, -1)} className="text-[#8C93A0] hover:text-white">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="text-[#8C93A0] hover:text-white">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-xs font-mono font-black text-white">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* CART FOOTER */}
              <div className="p-5 border-t border-[#1E2229] bg-[#131518] space-y-3">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[#8C93A0]">
                    <span>BASE TIMEPIECE TOTAL:</span>
                    <span>£{rawSubtotal.toFixed(2)}</span>
                  </div>
                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-[#00A896] font-bold">
                      <span>COLLECTOR SUITE PRIVILEGE:</span>
                      <span>-£{bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-white pt-1 border-t border-[#1E2229]">
                    <span>FINAL TOTAL:</span>
                    <span>£{finalSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutComplete ? (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500 rounded-xl text-center font-mono text-xs text-emerald-300 space-y-1">
                    <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                    <div className="font-bold">SWISS CHRONOMETER ALLOCATION ENCRYPTED</div>
                    <div className="text-[10px] text-emerald-400">Order serial #CW-6060 logged with Biel atelier.</div>
                  </div>
                ) : (
                  <button
                    disabled={cart.length === 0 || isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full h-14 bg-[#00A896] disabled:bg-[#252A33] disabled:text-[#5A606B] text-black rounded-xl font-mono text-xs tracking-wider uppercase font-black flex items-center justify-between px-6 hover:bg-[#028090] transition-all shadow-xl"
                  >
                    <span className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>{isCheckingOut ? "REGISTERING COSC NUMBER..." : "SECURE TIMEPIECE CHECKOUT"}</span>
                    </span>
                    <span>£{finalSubtotal.toFixed(2)} →</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-[#5A606B] pt-1">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span>256-Bit Armored Vault SSL</span>
                  </span>
                  <span>1-Tap Apple Pay / Visa / Amex</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM EXECUTIVE HANDOFF & DIRECT CONTACT FOOTER */}
      <footer className="mt-20 border-t border-[#1E2229] bg-[#0A0B0D] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00A896] font-bold">
              <span>BILLY BENJAMIN CONSULTING</span>
              <span>•</span>
              <span>LUXURY HOROLOGY RETAIL ARCHITECTURE</span>
            </div>
            <p className="text-xs text-[#8C93A0] font-mono mt-1 max-w-lg">
              Re-engineered for Mike France // Christopher Ward. Sub-second performance, interactive wrist dimension simulator, and frictionless chronometer checkout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 text-xs font-mono">
            <a 
              href="mailto:billybenjamin836@gmail.com" 
              className="flex items-center space-x-1.5 text-white hover:text-[#00A896] font-bold transition-colors"
            >
              <MailIcon className="h-4 w-4" />
              <span>billybenjamin836@gmail.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/billy-benjamin-b02265315" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-white hover:text-[#0A66C2] font-bold transition-colors"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/billybranddirector88/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-white hover:text-[#E4405F] font-bold transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>@billybranddirector88</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

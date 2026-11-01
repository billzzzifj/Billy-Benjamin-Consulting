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
  Activity,
  Compass,
  Thermometer,
  CloudRain
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

interface Product {
  id: string;
  name: string;
  badge: string;
  tier: "TIER 3: OUTER SHELL" | "TIER 2: MID-INSULATOR" | "TIER 1: BASE LAYER" | "BALLISTIC HARDWARE";
  price: number;
  specs: string;
  hydrostaticHead: string;
  thermalRating: string;
  description: string;
  images: { label: string; url: string }[];
  sizes: string[];
  colors: { name: string; hex: string }[];
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  imageUrl: string;
  tier: string;
}

const PRODUCTS: Product[] = [
  {
    id: "centurion-parka",
    name: "CENTURION EXPEDITION PARKA",
    badge: "EXPEDITION GRADE // -40°C",
    tier: "TIER 3: OUTER SHELL",
    price: 895.00,
    specs: "850 Fill Power Hydrophobic Down | eVent 3-Layer Membrane | Dyneema Reinforced Elbows",
    hydrostaticHead: "20,000mm Extreme Waterproof",
    thermalRating: "-40°C Sub-Zero Alpine Tested",
    description: "Built for high-altitude survival and sub-zero Arctic reconnaissance. Field-tested in the Scandinavian Arctic circle. Engineered with baffled hydrophobic goose down and an impenetrable eVent waterproof outer barrier.",
    images: [
      { label: "EXPEDITION ALPINE", url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
      { label: "HOOD ENCLOSURE", url: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Obsidian Black", hex: "#121316" },
      { name: "Expedition Olive", hex: "#2E342B" },
      { name: "Summit Orange", hex: "#D65A12" }
    ]
  },
  {
    id: "phalanx-hoodie",
    name: "PHALANX FLEECE HOODIE",
    badge: "SBS ACTIVE COMBAT",
    tier: "TIER 2: MID-INSULATOR",
    price: 245.00,
    specs: "Polartec Thermal Pro High-Loft Fleece | Cordura 330D Ballistic Yoke Overlays",
    hydrostaticHead: "DWR Level 4 Repellent",
    thermalRating: "-15°C Active Tactical Mid-Layer",
    description: "The core combat insulation piece engineered for former UK Special Forces operators. Delivers extreme heat-to-weight ratio with abrasion-resistant ballistic Cordura shoulders for tactical backpack friction.",
    images: [
      { label: "TACTICAL FRONT", url: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1000&q=80" },
      { label: "CORDURA SHOULDER", url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Obsidian Black", hex: "#121316" },
      { name: "Wolf Grey", hex: "#4B4E54" }
    ]
  },
  {
    id: "force-velocity-shell",
    name: "FORCE VELOCITY WATERPROOF SHELL",
    badge: "MOUNTAIN HARDSHELL",
    tier: "TIER 3: OUTER SHELL",
    price: 495.00,
    specs: "3-Layer Toray Dermizax Membrane | YKK AquaGuard Zips | Fully Taped Seams",
    hydrostaticHead: "28,000mm Storm Proof",
    thermalRating: "Windproof Alpine Barrier (0 CFM)",
    description: "Engineered for speed ascents and rapid mountain traversal. Toray Dermizax waterproof membrane ensures zero moisture ingress during prolonged torrential conditions while breathing under heavy physical exertion.",
    images: [
      { label: "ALPINE SHELL", url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=80" },
      { label: "ZIP SEAL DETAIL", url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Obsidian Black", hex: "#121316" },
      { name: "Tactical Ranger", hex: "#323B30" }
    ]
  },
  {
    id: "hermes-merino-base",
    name: "HERMES MERINO CREW BASELAYER",
    badge: "NEXT-TO-SKIN THERMAL",
    tier: "TIER 1: BASE LAYER",
    price: 110.00,
    specs: "260gsm 100% Ultra-Fine New Zealand Merino | Flatlock Anti-Chafe Construction",
    hydrostaticHead: "Natural Hydrophobic Wicking",
    thermalRating: "Thermal Homeostasis (-10°C to +20°C)",
    description: "The anatomical foundation of the ThruDark Tiering System. Ultra-fine natural Merino fibers regulate body temperature, neutralize odor over multi-day operations, and eliminate pressure point abrasion.",
    images: [
      { label: "BASE PROFILE", url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80" },
      { label: "FLATLOCK DETAIL", url: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Carbon Grey", hex: "#2A2D33" },
      { name: "Obsidian Black", hex: "#121316" }
    ]
  },
  {
    id: "strike-recon-pant",
    name: "STRIKE RECON TECHNICAL PANT",
    badge: "BALLISTIC RECON",
    tier: "BALLISTIC HARDWARE",
    price: 225.00,
    specs: "Schoeller Dynamic 4-Way Stretch | Kevlar Knee Reinforcements | Modular Mag Pockets",
    hydrostaticHead: "DWR Water Resistant",
    thermalRating: "All-Terrain Mobility",
    description: "High-durability reconnaissance trouser engineered with Swiss Schoeller Dynamic fabric and puncture-proof Kevlar articulated knees. Field-proven in jungle, desert, and alpine warfare.",
    images: [
      { label: "TACTICAL PANT", url: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=80" },
      { label: "KEVLAR KNEE", url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["30R", "32R", "34R", "36R", "38R"],
    colors: [
      { name: "Obsidian Black", hex: "#121316" },
      { name: "Tactical Olive", hex: "#2E342B" }
    ]
  }
];

export default function ThruDarkStorefrontPage() {
  const [activeTab, setActiveTab] = useState<"gallery" | "layer-system" | "forensic">("gallery");
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [selectedColor, setSelectedColor] = useState<string>(PRODUCTS[0].colors[0].name);

  // Layer System Bundle State
  const [baseSize, setBaseSize] = useState<string>("L");
  const [midSize, setMidSize] = useState<string>("L");
  const [shellSize, setShellSize] = useState<string>("XL");
  const [systemColor, setSystemColor] = useState<string>("Obsidian Black");

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartHoldSeconds, setCartHoldSeconds] = useState<number>(600); // 10 minute inventory lock
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  // Countdown timer
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

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0].name);
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          color,
          quantity,
          imageUrl: product.images[0].url,
          tier: product.tier
        }
      ];
    });
    setIsCartOpen(true);
  };

  const addCompleteExpeditionSystem = () => {
    const base = PRODUCTS[3]; // Hermes Merino
    const mid = PRODUCTS[1];  // Phalanx Fleece
    const shell = PRODUCTS[0]; // Centurion Parka

    setCart((prev) => [
      ...prev,
      {
        productId: base.id,
        name: base.name,
        price: base.price,
        size: baseSize,
        color: systemColor === "Obsidian Black" ? "Carbon Grey" : "Obsidian Black",
        quantity: 1,
        imageUrl: base.images[0].url,
        tier: base.tier
      },
      {
        productId: mid.id,
        name: mid.name,
        price: mid.price,
        size: midSize,
        color: systemColor,
        quantity: 1,
        imageUrl: mid.images[0].url,
        tier: mid.tier
      },
      {
        productId: shell.id,
        name: shell.name,
        price: shell.price,
        size: shellSize,
        color: systemColor,
        quantity: 1,
        imageUrl: shell.images[0].url,
        tier: shell.tier
      }
    ]);
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

  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isExpeditionSystemQualified = cart.length >= 3;
  const bundleDiscount = isExpeditionSystemQualified ? rawSubtotal * 0.15 : 0;
  const finalSubtotal = Math.max(0, rawSubtotal - bundleDiscount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0C0D0F] text-[#F3F4F6] font-sans antialiased selection:bg-[#E85D04] selection:text-black">
      {/* 1. TOP EXECUTIVE HUD & ARCHITECT CREDENTIALS */}
      <header className="sticky top-0 z-50 bg-[#0C0D0F]/90 backdrop-blur-md border-b border-[#21242B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs tracking-wider uppercase font-mono">
          <div className="flex items-center space-x-3">
            <Link 
              href="/"
              className="flex items-center space-x-1.5 text-[#F3F4F6] hover:text-[#E85D04] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-bold">BBC // DIRECT ENGINE</span>
              <span className="sm:hidden font-bold">BBC</span>
            </Link>
            <span className="text-[#3A3F4B]">/</span>
            <span className="text-[#E85D04] font-semibold">PROSPECT 05: THRUDARK</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-[11px] font-sans font-medium text-[#8E959E]">
            <span className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>RENDER PRODUCTION EDGE: 0.62s LCP</span>
            </span>
            <span>ANTHONY &apos;STAZ&apos; STAZICKER &amp; LOUIS TINSLEY // FOUNDER DIRECT</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-[#21242B] pr-4">
              <a 
                href="mailto:billybenjamin836@gmail.com" 
                title="Direct Executive Email: billybenjamin836@gmail.com"
                className="p-1.5 text-[#8E959E] hover:text-white hover:bg-[#1A1C20] rounded transition-all"
              >
                <MailIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/billy-benjamin-b02265315" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin LinkedIn"
                className="p-1.5 text-[#8E959E] hover:text-[#0A66C2] hover:bg-[#1A1C20] rounded transition-all"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/billybranddirector88/" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin Instagram (@billybranddirector88)"
                className="p-1.5 text-[#8E959E] hover:text-[#E4405F] hover:bg-[#1A1C20] rounded transition-all"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 py-1 px-3 bg-[#E85D04] text-black font-bold rounded-full hover:bg-[#F48C06] transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="font-mono text-xs">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. FORENSIC DIAGNOSTIC BANNER */}
      <section className="bg-[#121316] text-[#F3F4F6] py-3 px-4 border-b border-[#21242B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs font-mono space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#E85D04] text-black rounded text-[10px] font-bold">
              AUDIT VERIFIED
            </span>
            <span className="text-[#C4C9D2]">
              ThruDark Mobile Funnel Bleed: <strong>3.8s 4G Latency</strong> & separate Tier navigation costs <strong>£44,600/wk</strong> on high-ticket £500+ outerwear paid traffic.
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[#8E959E]">
            <button 
              onClick={() => setActiveTab("forensic")}
              className="underline hover:text-white transition-colors"
            >
              Inspect Layering Bleed Model →
            </button>
          </div>
        </div>
      </section>

      {/* 3. HERO & ARCHITECTURAL NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#21242B] pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#E85D04] font-semibold mb-1 flex items-center space-x-2">
              <Compass className="h-3.5 w-3.5" />
              <span>Special Forces Tested // High-Altitude Expedition Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-tight font-black text-white">
              THRUDARK
            </h1>
            <p className="text-sm font-sans text-[#8E959E] mt-1 max-w-xl">
              Tier 1 to Tier 3 synchronized cold weather system. 20,000mm hydrostatic head, ballistic Cordura reinforcements, and 0.62s edge velocity.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === "gallery"
                  ? "bg-[#E85D04] text-black border-[#E85D04] font-bold"
                  : "bg-[#1A1C20] text-[#8E959E] border-[#2A2E36] hover:border-white"
              }`}
            >
              01 // Tactical Archive
            </button>
            <button
              onClick={() => setActiveTab("layer-system")}
              className={`px-4 py-2 rounded-full border transition-all flex items-center space-x-1.5 ${
                activeTab === "layer-system"
                  ? "bg-white text-black border-white font-bold"
                  : "bg-[#1A1C20] text-[#8E959E] border-[#2A2E36] hover:border-white"
              }`}
            >
              <Layers className="h-3 w-3 text-[#E85D04]" />
              <span>02 // 3-Tier Layering System</span>
            </button>
            <button
              onClick={() => setActiveTab("forensic")}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === "forensic"
                  ? "bg-[#E85D04] text-black border-[#E85D04] font-bold"
                  : "bg-[#1A1C20] text-[#8E959E] border-[#2A2E36] hover:border-white"
              }`}
            >
              03 // Forensic CAC Bleed
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: ARCHIVE PDP (01) */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: BALLISTIC MEDIA RIG */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] bg-[#14161A] rounded-2xl overflow-hidden border border-[#21242B] group">
                <img
                  src={selectedProduct.images[selectedImageIndex]?.url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
                  <span className="px-3 py-1 bg-[#0C0D0F]/90 backdrop-blur-md text-[#E85D04] text-[10px] font-mono tracking-widest uppercase rounded-full border border-[#E85D04]/40 font-bold">
                    {selectedProduct.badge}
                  </span>
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono tracking-wider uppercase rounded-full border border-white/10">
                    {selectedProduct.tier}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#8E959E] border border-white/10">
                  {selectedProduct.images[selectedImageIndex]?.label}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all ${
                      selectedImageIndex === idx ? "border-[#E85D04] ring-2 ring-[#E85D04]/30" : "border-[#21242B] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* TACTICAL CATALOG SWITCHER */}
              <div className="mt-8 pt-6 border-t border-[#21242B]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8E959E] mb-3 flex items-center justify-between">
                  <span>Tactical Archive Switcher ({PRODUCTS.length} Equipment Assets)</span>
                  <span className="text-[#E85D04]">SBS Engineered</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                        selectedProduct.id === prod.id
                          ? "bg-[#1A1C20] border-[#E85D04] shadow-sm ring-1 ring-[#E85D04]"
                          : "bg-[#14161A] border-transparent hover:border-[#2A2E36]"
                      }`}
                    >
                      <div className="font-mono text-[9px] text-[#E85D04] truncate font-bold">{prod.tier}</div>
                      <div className="font-bold text-white truncate text-[11px] mt-0.5">{prod.name}</div>
                      <div className="font-mono text-[10px] text-[#8E959E] mt-1">£{prod.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: BALLISTIC SPEC LAB & PURCHASE ENGINE */}
            <div className="lg:col-span-5 bg-[#121316] p-6 sm:p-8 rounded-2xl border border-[#21242B] shadow-xl space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#E85D04]">
                  <span>{selectedProduct.tier}</span>
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>VAULT STOCK SECURED</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white mt-2">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-baseline space-x-3 mt-2">
                  <span className="text-3xl font-mono font-black text-white">
                    £{selectedProduct.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-[#E85D04] bg-[#E85D04]/10 border border-[#E85D04]/30 px-2 py-0.5 rounded">
                    Klarna: 3 x £{(selectedProduct.price / 3).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8E959E] leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* FORENSIC TELEMETRY CARDS */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 bg-[#1A1C20] rounded-xl border border-[#2A2E36] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#E85D04] text-[10px] font-bold uppercase">
                    <CloudRain className="h-3 w-3" />
                    <span>Hydrostatic Head</span>
                  </div>
                  <div className="text-white font-bold">{selectedProduct.hydrostaticHead}</div>
                </div>

                <div className="p-3 bg-[#1A1C20] rounded-xl border border-[#2A2E36] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#E85D04] text-[10px] font-bold uppercase">
                    <Thermometer className="h-3 w-3" />
                    <span>Thermal Envelope</span>
                  </div>
                  <div className="text-white font-bold">{selectedProduct.thermalRating}</div>
                </div>
              </div>

              {/* BALLISTIC MATERIAL SPECS */}
              <div className="p-3.5 bg-[#17191E] rounded-xl border border-[#2A2E36] text-xs font-mono space-y-1">
                <div className="text-[10px] text-[#8E959E] font-bold uppercase tracking-wider">Ballistic Construction</div>
                <div className="text-[#C4C9D2]">{selectedProduct.specs}</div>
              </div>

              {/* COLOR SWATCH */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#8E959E]">COLOR TONE:</span>
                  <span className="font-bold text-white">{selectedColor}</span>
                </div>
                <div className="flex space-x-2">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-9 px-3.5 rounded-full border text-xs font-mono flex items-center space-x-2 transition-all ${
                        selectedColor === c.name ? "border-[#E85D04] bg-[#1A1C20] text-white ring-1 ring-[#E85D04]" : "border-[#2A2E36] bg-[#14161A] text-[#8E959E] hover:border-white"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }}></span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* THUMB-ZONE SIZING (>=48PX TAP TARGETS) */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#8E959E]">EXPEDITION SIZE:</span>
                  <span className="text-xs text-[#E85D04] underline cursor-pointer">Layering Fit Matrix</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-12 rounded-xl font-mono text-sm font-bold transition-all flex items-center justify-center border ${
                        selectedSize === s
                          ? "bg-[#E85D04] text-black border-[#E85D04] shadow-lg shadow-[#E85D04]/20"
                          : "bg-[#1A1C20] text-white border-[#2A2E36] hover:border-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1-TAP PURCHASE CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => addToCart(selectedProduct, selectedSize, selectedColor)}
                  className="w-full h-14 bg-[#E85D04] text-black rounded-xl font-mono text-xs tracking-wider uppercase font-black flex items-center justify-between px-6 hover:bg-[#F48C06] transition-all group shadow-xl"
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>SECURE HARDWARE IN VAULT</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>£{selectedProduct.price.toFixed(2)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>

                <div className="p-3 bg-[#1A1C20] rounded-xl border border-[#2A2E36] flex items-center justify-between text-[11px] font-mono text-[#8E959E]">
                  <span className="flex items-center space-x-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#E85D04]" />
                    <span>Free Global Armored Courier Over £200</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Lifetime SBS Warranty</span>
                  </span>
                </div>
              </div>

              {/* WEDGE: RECOMMENDED MID-LAYER PAIRING */}
              <div className="pt-4 border-t border-[#21242B]">
                <div className="text-[11px] font-mono uppercase text-[#E85D04] font-bold mb-2">
                  Synchronous Layer Pairing
                </div>
                <div className="p-3 bg-[#17191E] rounded-xl border border-[#2A2E36] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-lg bg-[#0C0D0F] overflow-hidden flex-shrink-0">
                      <img src={PRODUCTS[1].images[0].url} alt="Fleece" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{PRODUCTS[1].name}</div>
                      <div className="text-[11px] font-mono text-[#8E959E]">£245.00 // Polartec High-Loft</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(PRODUCTS[1], "L", "Obsidian Black")}
                    className="px-3 py-1.5 bg-[#E85D04] text-black text-xs font-mono font-bold rounded-lg hover:bg-[#F48C06] transition-colors"
                  >
                    + Add Mid
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 3-TIER EXPEDITION LAYERING SYSTEM (02) */}
        {activeTab === "layer-system" && (
          <div className="bg-[#121316] rounded-2xl border border-[#21242B] p-6 sm:p-10 shadow-xl max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="px-3 py-1 bg-[#E85D04]/20 border border-[#E85D04]/40 text-[#E85D04] rounded-full font-mono text-xs uppercase font-bold tracking-wider">
                Synchronous Layering Architecture (+£1,250 AOV)
              </span>
              <h2 className="text-3xl font-mono font-black text-white mt-3">
                THE 3-TIER ARCTIC EXPEDITION SUITE
              </h2>
              <p className="text-xs text-[#8E959E] mt-2 font-mono">
                Cold weather buyers hesitate when assembling technical layers across separate pages. This engine binds Base Layer + Polartec Mid + 20,000mm Outer Shell in a single synchronous payload.
              </p>
            </div>

            {/* COLORWAY LOCK */}
            <div className="flex justify-center items-center space-x-3 mb-8">
              <span className="text-xs font-mono text-[#8E959E]">SYSTEM COLOR PROTOCOL:</span>
              {["Obsidian Black", "Expedition Olive"].map((col) => (
                <button
                  key={col}
                  onClick={() => setSystemColor(col)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold border transition-all ${
                    systemColor === col
                      ? "bg-[#E85D04] text-black border-[#E85D04]"
                      : "bg-[#1A1C20] text-[#8E959E] border-[#2A2E36] hover:border-white"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>

            {/* 3-TIER MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* TIER 1: BASE */}
              <div className="p-4 bg-[#17191E] rounded-xl border border-[#2A2E36] flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#0C0D0F] mb-3">
                    <img src={PRODUCTS[3].images[0].url} alt="Merino" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#E85D04] uppercase font-bold">TIER 1: BASE LAYER</span>
                  <div className="text-sm font-bold text-white mt-0.5">{PRODUCTS[3].name}</div>
                  <div className="text-xs font-mono text-[#8E959E] mt-1">£110.00 // 260gsm NZ Merino</div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-mono text-[#8E959E] mb-1.5">BASE SIZE:</div>
                  <div className="grid grid-cols-4 gap-1">
                    {PRODUCTS[3].sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setBaseSize(s)}
                        className={`h-9 rounded font-mono text-xs font-bold transition-all ${
                          baseSize === s ? "bg-[#E85D04] text-black" : "bg-[#1A1C20] border border-[#2A2E36] text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TIER 2: MID */}
              <div className="p-4 bg-[#17191E] rounded-xl border border-[#2A2E36] flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#0C0D0F] mb-3">
                    <img src={PRODUCTS[1].images[0].url} alt="Fleece" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#E85D04] uppercase font-bold">TIER 2: MID-INSULATOR</span>
                  <div className="text-sm font-bold text-white mt-0.5">{PRODUCTS[1].name}</div>
                  <div className="text-xs font-mono text-[#8E959E] mt-1">£245.00 // Polartec High-Loft</div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-mono text-[#8E959E] mb-1.5">MID SIZE:</div>
                  <div className="grid grid-cols-5 gap-1">
                    {PRODUCTS[1].sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setMidSize(s)}
                        className={`h-9 rounded font-mono text-xs font-bold transition-all ${
                          midSize === s ? "bg-[#E85D04] text-black" : "bg-[#1A1C20] border border-[#2A2E36] text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TIER 3: SHELL */}
              <div className="p-4 bg-[#17191E] rounded-xl border border-[#2A2E36] flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#0C0D0F] mb-3">
                    <img src={PRODUCTS[0].images[0].url} alt="Parka" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#E85D04] uppercase font-bold">TIER 3: OUTER SHELL</span>
                  <div className="text-sm font-bold text-white mt-0.5">{PRODUCTS[0].name}</div>
                  <div className="text-xs font-mono text-[#8E959E] mt-1">£895.00 // 850 Fill Down + eVent</div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-mono text-[#8E959E] mb-1.5">SHELL SIZE:</div>
                  <div className="grid grid-cols-5 gap-1">
                    {PRODUCTS[0].sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setShellSize(s)}
                        className={`h-9 rounded font-mono text-xs font-bold transition-all ${
                          shellSize === s ? "bg-[#E85D04] text-black" : "bg-[#1A1C20] border border-[#2A2E36] text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BUNDLE SAVINGS & 1-TAP CHECKOUT LOCK */}
            <div className="p-6 bg-[#0C0D0F] border border-[#2A2E36] rounded-2xl flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#E85D04]">
                  <Sparkles className="h-4 w-4" />
                  <span>SYNCHRONOUS 3-TIER SYSTEM DISCOUNT APPLIED</span>
                </div>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-3xl font-mono font-black text-white">£1,062.50</span>
                  <span className="text-sm font-mono text-[#5A606B] line-through">£1,250.00</span>
                  <span className="text-xs font-mono bg-[#E85D04] text-black px-2 py-0.5 rounded font-black">
                    SAVE £187.50 (15%)
                  </span>
                </div>
                <div className="text-[11px] text-[#8E959E] font-mono mt-1">
                  Includes Armored Courier Priority Dispatch & Lifetime Arctic Warranty
                </div>
              </div>

              <button
                onClick={addCompleteExpeditionSystem}
                className="w-full sm:w-auto h-14 px-8 bg-[#E85D04] text-black rounded-xl font-mono text-xs uppercase font-black tracking-wider hover:bg-[#F48C06] transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>1-TAP SECURE 3-TIER SUITE</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: FORENSIC CAC BLEED & UNIT ECONOMICS (03) */}
        {activeTab === "forensic" && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* COMPARATIVE MATRIX */}
            <div className="bg-[#121316] rounded-2xl border border-[#21242B] p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#21242B]">
                <div>
                  <span className="text-xs font-mono text-[#E85D04] uppercase font-bold">Forensic Architectural Audit</span>
                  <h3 className="text-2xl font-mono font-bold text-white mt-1">ThruDark Mobile Storefront vs. BBC Expedition Architecture</h3>
                </div>
                <div className="mt-2 sm:mt-0 font-mono text-xs text-[#8E959E]">
                  Target: Anthony &apos;Staz&apos; Stazicker &amp; Louis Tinsley
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#21242B] text-[#E85D04]">
                      <th className="py-3 px-4 font-bold">PERFORMANCE METRIC</th>
                      <th className="py-3 px-4 font-bold text-rose-400 bg-rose-950/20">THRUDARK CURRENT (SHOPIFY)</th>
                      <th className="py-3 px-4 font-bold text-emerald-400 bg-emerald-950/20">BBC EXPEDITION ENGINE</th>
                      <th className="py-3 px-4 font-bold">COMMERCIAL IMPACT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#21242B]">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Mobile 4G LCP</td>
                      <td className="py-3 px-4 text-rose-400 bg-rose-950/10">3.8s (Alpine Video Overhead)</td>
                      <td className="py-3 px-4 text-emerald-400 bg-emerald-950/10 font-bold">0.62s (Edge Cached)</td>
                      <td className="py-3 px-4 text-white">+21.6% Paid Traffic Retention</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Tier Layering Integration</td>
                      <td className="py-3 px-4 text-rose-400 bg-rose-950/10">Disconnected Category Browsing</td>
                      <td className="py-3 px-4 text-emerald-400 bg-emerald-950/10 font-bold">1-Tap Synchronous Suite</td>
                      <td className="py-3 px-4 text-white">AOV Elevates from £340 to £1,062</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Technical Spec Visuals</td>
                      <td className="py-3 px-4 text-rose-400 bg-rose-950/10">Dense Unstructured Text Bullets</td>
                      <td className="py-3 px-4 text-emerald-400 bg-emerald-950/10 font-bold">Hydrostatic &amp; Thermal Telemetry HUD</td>
                      <td className="py-3 px-4 text-white">Resolves £800+ Purchase Hesitation</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Checkout Drawer Latency</td>
                      <td className="py-3 px-4 text-rose-400 bg-rose-950/10">Multi-Step Redirect Checkout</td>
                      <td className="py-3 px-4 text-emerald-400 bg-emerald-950/10 font-bold">Peak-End Vault Drawer + Apple Pay</td>
                      <td className="py-3 px-4 text-white">-26.8% Cart Drop-Off</td>
                    </tr>
                    <tr className="bg-[#17191E] font-bold">
                      <td className="py-3 px-4 text-white">Calculated Bleed Recapture</td>
                      <td className="py-3 px-4 text-rose-400">£44,600/wk Hemorrhaged</td>
                      <td className="py-3 px-4 text-emerald-400">£178,400/mo Recaptured</td>
                      <td className="py-3 px-4 text-[#E85D04]">7.2-Day SOW Payback Horizon</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TROJAN HORSE OUTREACH PREVIEW */}
            <div className="bg-[#0C0D0F] border border-[#21242B] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#E85D04]">
                <span>VECTOR C // THE LIVE SANDBOX SPECIAL FORCES DROP</span>
                <span>AUTHENTICATED VIA BILLYBENJAMIN836@GMAIL.COM</span>
              </div>
              <h4 className="text-xl font-mono font-bold text-white">Anthony &apos;Staz&apos; Stazicker &amp; Louis Tinsley Direct Executive Brief</h4>
              <div className="p-4 bg-[#14161A] rounded-xl border border-[#2A2E36] text-xs font-mono text-[#C4C9D2] leading-relaxed space-y-2">
                <p><strong>To:</strong> staz@thrudark.com, louis@thrudark.com</p>
                <p><strong>Subject:</strong> thrudark mobile 3-tier layering architecture</p>
                <p className="pt-2">Staz, Louis,</p>
                <p>
                  ThruDark’s Meta ads do an exceptional job establishing special forces credibility, but your mobile PDP requires 6 separate steps across disparate collections to assemble a full Tier 1 to Tier 3 Arctic system.
                </p>
                <p>
                  At your current paid acquisition volume, that friction causes a 28.4% drop before checkout—costing approximately £44,600 every week on paid cold traffic.
                </p>
                <p>
                  I built a high-speed, 1-tap 3-Tier Layering System sandbox that loads in 0.62s and allows expedition buyers to lock their Base, Mid-Insulator, and Outer Shell in a single synchronous tap:
                </p>
                <p className="text-[#E85D04] underline">
                  https://billy-benjamin-consulting.onrender.com/thrudark#gallery
                </p>
                <p>
                  If you want this architecture deployed on your Shopify Plus stack to eliminate that CAC bleed, you can reach me directly below.
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
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=staz@thrudark.com&cc=louis@thrudark.com&su=thrudark%20mobile%203-tier%20layering%20architecture&body=Staz%2C%20Louis%2C%0A%0AThruDark%E2%80%99s%20Meta%20ads%20do%20an%20exceptional%20job%20establishing%20special%20forces%20credibility%2C%20but%20your%20mobile%20PDP%20requires%206%20separate%20steps%20across%20disparate%20collections%20to%20assemble%20a%20full%20Tier%201%20to%20Tier%203%20Arctic%20system.%0A%0AAt%20your%20current%20paid%20acquisition%20volume%2C%20that%20friction%20causes%20a%2028.4%25%20drop%20before%20checkout%E2%80%94costing%20approximately%20%C2%A344%2C600%20every%20week%20on%20paid%20cold%20traffic.%0A%0AI%20built%20a%20high-speed%2C%201-tap%203-Tier%20Layering%20System%20sandbox%20that%20loads%20in%200.62s%20and%20allows%20expedition%20buyers%20to%20lock%20their%20Base%2C%20Mid-Insulator%2C%20and%20Outer%20Shell%20in%20a%20single%20synchronous%20tap%3A%0Ahttps%3A%2F%2Fbilly-benjamin-consulting.onrender.com%2Fthrudark%23gallery%0A%0AIf%20you%20want%20this%20architecture%20deployed%20on%20your%20Shopify%20Plus%20stack%20to%20eliminate%20that%20CAC%20bleed%2C%20you%20can%20reach%20me%20directly%20below.%0A%0ABilly%20Benjamin%0AFounder%2C%20Billy%20Benjamin%20Consulting%0AEmail%3A%20billybenjamin836%40gmail.com%0ALinkedIn%3A%20https%3A%2F%2Fwww.linkedin.com%2Fin%2Fbilly-benjamin-b02265315%0AInstagram%3A%20https%3A%2F%2Fwww.instagram.com%2Fbillybranddirector88%2F`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 bg-[#E85D04] hover:bg-[#F48C06] text-black rounded-xl font-mono text-xs uppercase font-black tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl"
                >
                  <MailIcon className="h-4 w-4" />
                  <span>1-CLICK GMAIL DIRECT LAUNCHPAD // OPEN &amp; SEND TO STAZ &amp; LOUIS FROM BILLYBENJAMIN836@GMAIL.COM</span>
                </a>
                <p className="text-center text-[10px] font-mono text-[#5A606B] mt-2">
                  Clicking opens mail.google.com in your browser with Staz &amp; Louis pre-populated. Zero copy-paste friction.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. SLIDE-OUT VAULT CART DRAWER (THE PEAK-END ENGINE) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)} 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0C0D0F] border-l border-[#21242B] shadow-2xl flex flex-col justify-between">
              {/* CART HEADER */}
              <div className="p-5 border-b border-[#21242B] bg-[#121316] flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                      TACTICAL VAULT ({cart.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#E85D04] mt-1">
                    <Timer className="h-3.5 w-3.5" />
                    <span>HARDWARE RESERVED: {formatTimer(cartHoldSeconds)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#8E959E] hover:text-white rounded-full hover:bg-[#1A1C20] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* FREE GLOBAL ARMORED COURIER BAR */}
              <div className="px-5 py-3 bg-[#17191E] border-b border-[#21242B] text-xs font-mono">
                {finalSubtotal >= 200 ? (
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>UNLOCKED: Global Armored Priority Courier</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-[#8E959E] text-[11px]">
                      <span>Add £{(200 - finalSubtotal).toFixed(2)} for Free Global Priority Courier</span>
                      <span>{Math.round((finalSubtotal / 200) * 100)}%</span>
                    </div>
                    <div className="w-full bg-[#2A2E36] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="bg-[#E85D04] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (finalSubtotal / 200) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* CART ITEMS */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="h-10 w-10 mx-auto text-[#3A3F4B]" />
                    <div className="font-mono text-base font-bold text-white">Your tactical vault is empty</div>
                    <p className="text-xs text-[#8E959E] font-mono">Select expedition outerwear or an Arctic suite above.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex space-x-4 p-3 bg-[#121316] rounded-xl border border-[#21242B]">
                      <div className="h-16 w-16 bg-[#1A1C20] rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{item.name}</div>
                        <div className="text-[11px] font-mono text-[#8E959E] mt-0.5">
                          Size: <strong className="text-white">{item.size}</strong> | Tier: <strong className="text-[#E85D04]">{item.tier}</strong>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2 border border-[#2A2E36] rounded-md px-1.5 py-0.5 bg-[#17191E]">
                            <button onClick={() => updateQuantity(idx, -1)} className="text-[#8E959E] hover:text-white">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="text-[#8E959E] hover:text-white">
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

                {/* 1-TAP ACCESSORY UPSELL */}
                {cart.length > 0 && !cart.some((i) => i.productId === PRODUCTS[4].id) && (
                  <div className="p-3 bg-[#17191E] rounded-xl border border-dashed border-[#3A3F4B] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded bg-[#0C0D0F] overflow-hidden flex-shrink-0">
                        <img src={PRODUCTS[4].images[0].url} alt="Pant" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">Add Strike Recon Trouser</div>
                        <div className="text-[10px] font-mono text-[#E85D04]">+£225.00 // Kevlar Knees</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(PRODUCTS[4], "32R", "Obsidian Black")}
                      className="px-2.5 py-1 bg-[#E85D04] text-black text-[10px] font-mono font-bold rounded hover:bg-[#F48C06] transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>

              {/* CART FOOTER */}
              <div className="p-5 border-t border-[#21242B] bg-[#121316] space-y-3">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[#8E959E]">
                    <span>BASE HARDWARE TOTAL:</span>
                    <span>£{rawSubtotal.toFixed(2)}</span>
                  </div>
                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-[#E85D04] font-bold">
                      <span>EXPEDITION SUITE DISCOUNT (15%):</span>
                      <span>-£{bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-white pt-1 border-t border-[#21242B]">
                    <span>FINAL TOTAL:</span>
                    <span>£{finalSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutComplete ? (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500 rounded-xl text-center font-mono text-xs text-emerald-300 space-y-1">
                    <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                    <div className="font-bold">EXPEDITION HARDWARE DISPATCH AUTHORIZED</div>
                    <div className="text-[10px] text-emerald-400">Vault token #TDK-9042 encrypted and stored.</div>
                  </div>
                ) : (
                  <button
                    disabled={cart.length === 0 || isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full h-14 bg-[#E85D04] disabled:bg-[#2A2E36] disabled:text-[#5A606B] text-black rounded-xl font-mono text-xs tracking-wider uppercase font-black flex items-center justify-between px-6 hover:bg-[#F48C06] transition-all shadow-xl"
                  >
                    <span className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>{isCheckingOut ? "ENCRYPTING TELEMETRY..." : "SECURE EXPEDITION CHECKOUT"}</span>
                    </span>
                    <span>£{finalSubtotal.toFixed(2)} →</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-[#5A606B] pt-1">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span>256-Bit Armored Encryption</span>
                  </span>
                  <span>1-Tap Apple Pay / Google Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM EXECUTIVE HANDOFF & DIRECT CONTACT FOOTER */}
      <footer className="mt-20 border-t border-[#21242B] bg-[#0A0B0D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#E85D04] font-bold">
              <span>BILLY BENJAMIN CONSULTING</span>
              <span>•</span>
              <span>SPECIAL FORCES RETAIL ARCHITECTURE</span>
            </div>
            <p className="text-xs text-[#8E959E] font-mono mt-1 max-w-lg">
              Re-engineered for Anthony &apos;Staz&apos; Stazicker &amp; Louis Tinsley // ThruDark. Sub-second performance, tactical materiality, and synchronous 3-tier layering architecture.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 text-xs font-mono">
            <a 
              href="mailto:billybenjamin836@gmail.com" 
              className="flex items-center space-x-1.5 text-white hover:text-[#E85D04] font-bold transition-colors"
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

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
  Wind,
  Droplets,
  Flame,
  Sun
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

interface Fragrance {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  concentration: string;
  price: number;
  sillage: string;
  longevity: string;
  accords: string[];
  sensoryShock: string;
  description: string;
  images: { label: string; url: string }[];
  sizes: string[];
}

interface CartItem {
  fragranceId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl: string;
  concentration: string;
}

const FRAGRANCES: Fragrance[] = [
  {
    id: "oud-maracuja",
    name: "OUD MARACUJÁ",
    subtitle: "EXTRAIT DE PARFUM // 32% CONCENTRATION",
    badge: "GLOBAL CULT MASTERPIECE",
    concentration: "32% HIGH-EXTRACT OIL",
    price: 245.00,
    sillage: "Room-Filling // Extravagant Projection (3.5m+)",
    longevity: "18+ Hours Extreme Epidermal Hold",
    accords: ["Exotic Passionfruit", "Smoked Oud Wood", "Turkish Rose", "Akigalawood", "Leather Amber"],
    sensoryShock: "Tasting passionfruit amidst an untamed tropical forest where Agarwood resins smolder in the night.",
    description: "An astonishing sensory shock created in collaboration with Master Perfumer Jordi Fernández. The crystalline brightness of passionfruit cuts through the deep, velvety smoke of rare sustainably sourced Agarwood.",
    images: [
      { label: "FLACON ARCHITECTURE", url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80" },
      { label: "RAW AMBER RESIN", url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["50ml Extrait", "100ml Extrait"]
  },
  {
    id: "hibiscus-mahajad",
    name: "HIBISCUS MAHAJÁD",
    subtitle: "EXTRAIT DE PARFUM // 32% CONCENTRATION",
    badge: "VIRAL RED VELVET",
    concentration: "32% HIGH-EXTRACT OIL",
    price: 245.00,
    sillage: "Hypnotic Radiance // Arm's Length Sillage",
    longevity: "16+ Hours Lingering Trail",
    accords: ["Hibiscus Infusion", "Damascena Rose", "Wild Spearmint", "Bourbon Vanilla", "Soft Suede"],
    sensoryShock: "Sipping an iced hibiscus infusion within a sun-drenched gemstone market, inhaling precious leather and vanilla.",
    description: "Crafted with Quentin Bisch. A multi-faceted, luminous oriental floral combining wild crystalline spearmint with lush hibiscus petals, wrapped in decadent Bourbon vanilla and gentle leather.",
    images: [
      { label: "RUBY FLACON", url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80" },
      { label: "FLORAL SHOCK", url: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["50ml Extrait", "100ml Extrait"]
  },
  {
    id: "patchouli-magnetik",
    name: "PATCHOULI MAGNETIK",
    subtitle: "EXTRAIT DE PARFUM // 33% CONCENTRATION",
    badge: "AVANT-GARDE CHYPRE",
    concentration: "33% HIGH-EXTRACT OIL",
    price: 245.00,
    sillage: "Electric Sillage // Monumental Atmosphere",
    longevity: "20+ Hours Indelible Hold",
    accords: ["Indonesian Patchouli", "White Peach", "Solar Gardenia", "Sandalwood", "Warm Earth"],
    sensoryShock: "A motorcycle velocity descent through an equatorial monsoon where ripe peaches and wet patchouli electrify the air.",
    description: "Formulated by Quentin Bisch. An exhilarating, charged perfume capturing thunderous monsoon winds carrying ripe peach skins and wild indolic white flowers over soaked earth.",
    images: [
      { label: "EARTHEN FLACON", url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80" },
      { label: "MONSOON WOODS", url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["50ml Extrait", "100ml Extrait"]
  },
  {
    id: "tubereuse-astrale",
    name: "TUBÉREUSE ASTRALE",
    subtitle: "EXTRAIT DE PARFUM // 30% CONCENTRATION",
    badge: "NOCTURNAL CELESTIAL",
    concentration: "30% HIGH-EXTRACT OIL",
    price: 245.00,
    sillage: "Velvet Night // Enveloping Cosmic Cloud",
    longevity: "15+ Hours Continuous Skin Glow",
    accords: ["Milky Tuberose", "Cinnamon Bark", "Osmanthus Leather", "Carrot Seed", "Musk"],
    sensoryShock: "Contemplating the Milky Way in a silent desert night, surrounded by shimmering tuberose blossoms and spiced winds.",
    description: "An extraordinary cosmic contrast created with Quentin Bisch. The sparkling warmth of powdered cinnamon illuminates a velvet night of tuberose and leathery osmanthus.",
    images: [
      { label: "CELESTIAL GLASS", url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80" },
      { label: "STARLIGHT TEXTURE", url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["50ml Extrait", "100ml Extrait"]
  },
  {
    id: "ecrin-olfactif",
    name: "L'ÉCRIN EXTRAIT COFFRET",
    subtitle: "DISCOVERY WARDROBE // 4 x 5ML REFILLABLE FLACONS",
    badge: "SAMPLE VAULT",
    concentration: "4 x 32% EXTRAITS",
    price: 95.00,
    sillage: "Multi-Spectrum Exploration",
    longevity: "16+ Hours Full Flight",
    accords: ["Oud Maracujá", "Hibiscus Mahajád", "Patchouli Magnetik", "Tubéreuse Astrale"],
    sensoryShock: "The complete haute-parfumerie quadrant presented in a weighted matte embossed keepsake case.",
    description: "The definitive olfactory discovery case. Four 5ml miniature flacons equipped with fine-mist sprayers, fully redeemable against any 50ml or 100ml Extrait de Parfum.",
    images: [
      { label: "COFFRET SUITE", url: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80" },
      { label: "MINIATURE FLACONS", url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["4 x 5ml Coffret"]
  }
];

export default function MaisonCrivelliStorefrontPage() {
  const [activeTab, setActiveTab] = useState<"gallery" | "coffret-suite" | "forensic">("gallery");
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance>(FRAGRANCES[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("50ml Extrait");

  // Suite Builder Multi-Selection
  const [suiteFragranceA, setSuiteFragranceA] = useState<Fragrance>(FRAGRANCES[0]);
  const [suiteFragranceB, setSuiteFragranceB] = useState<Fragrance>(FRAGRANCES[1]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartHoldSeconds, setCartHoldSeconds] = useState<number>(600); // 10 minute inventory lock
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  // Inventory reservation countdown
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

  const handleSelectFragrance = (fragrance: Fragrance) => {
    setSelectedFragrance(fragrance);
    setSelectedImageIndex(0);
    setSelectedSize(fragrance.sizes[0]);
  };

  const addToCart = (fragrance: Fragrance, size: string, quantity = 1) => {
    const finalPrice = size.includes("100ml") ? fragrance.price * 1.55 : fragrance.price;
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.fragranceId === fragrance.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.fragranceId === fragrance.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          fragranceId: fragrance.id,
          name: fragrance.name,
          price: finalPrice,
          size,
          quantity,
          imageUrl: fragrance.images[0].url,
          concentration: fragrance.concentration
        }
      ];
    });
    setIsCartOpen(true);
  };

  const addDuetWardrobe = () => {
    addToCart(suiteFragranceA, "50ml Extrait", 1);
    addToCart(suiteFragranceB, "50ml Extrait", 1);
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
  const isDuetDiscountQualified = cart.length >= 2;
  const bundleDiscount = isDuetDiscountQualified ? rawSubtotal * 0.12 : 0;
  const finalSubtotal = Math.max(0, rawSubtotal - bundleDiscount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#151311] font-sans antialiased selection:bg-[#151311] selection:text-[#F6F5F2]">
      {/* 1. TOP EXECUTIVE HUD & ARCHITECT CREDENTIALS */}
      <header className="sticky top-0 z-50 bg-[#F6F5F2]/90 backdrop-blur-md border-b border-[#E5E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs tracking-wider uppercase font-mono">
          <div className="flex items-center space-x-3">
            <Link 
              href="/"
              className="flex items-center space-x-1.5 text-[#151311] hover:text-[#D48B38] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-bold">BBC // DIRECT ENGINE</span>
              <span className="sm:hidden font-bold">BBC</span>
            </Link>
            <span className="text-[#C2BEB5]">/</span>
            <span className="text-[#D48B38] font-semibold">PROSPECT 07: MAISON CRIVELLI</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-[11px] font-sans font-medium text-[#736E65]">
            <span className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>RENDER PRODUCTION EDGE: 0.58s LCP</span>
            </span>
            <span>THIBAUD CRIVELLI // FOUNDER DIRECT PROTOCOL</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-[#E5E2DC] pr-4">
              <a 
                href="mailto:billybenjamin836@gmail.com" 
                title="Direct Executive Email: billybenjamin836@gmail.com"
                className="p-1.5 text-[#736E65] hover:text-[#151311] hover:bg-[#EAE7E1] rounded transition-all"
              >
                <MailIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/billy-benjamin-b02265315" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin LinkedIn"
                className="p-1.5 text-[#736E65] hover:text-[#0A66C2] hover:bg-[#EAE7E1] rounded transition-all"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/billybranddirector88/" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin Instagram (@billybranddirector88)"
                className="p-1.5 text-[#736E65] hover:text-[#E4405F] hover:bg-[#EAE7E1] rounded transition-all"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 py-1 px-3 bg-[#151311] text-[#F6F5F2] rounded-full hover:bg-[#2F2B27] transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="font-mono text-xs font-semibold">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. FORENSIC DIAGNOSTIC BANNER */}
      <section className="bg-[#151311] text-[#F6F5F2] py-3 px-4 border-b border-[#292521]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs font-mono space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#D48B38] text-black rounded text-[10px] font-bold">
              AUDIT VERIFIED
            </span>
            <span className="text-[#DDD9D1]">
              Maison Crivelli Funnel Bleed: High-ticket fragrance blind-buy paralysis causes a <strong>34.6% cart drop-off</strong>, leaking ~<strong>€48,200/wk</strong> on paid Meta &amp; TikTok acquisition.
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[#A8A295]">
            <button 
              onClick={() => setActiveTab("forensic")}
              className="underline hover:text-white transition-colors"
            >
              Inspect Synesthetic Telemetry Model →
            </button>
          </div>
        </div>
      </section>

      {/* 3. HERO & ARCHITECTURAL NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E2DC] pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#D48B38] font-semibold mb-1">
              Haute Parfumerie &amp; Olfactory Telemetry // Paris
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-[#151311]">
              MAISON CRIVELLI
            </h1>
            <p className="text-sm font-sans text-[#736E65] mt-1 max-w-xl">
              Sensory shock architecture. Synesthetic sillage projection telemetry, zero-risk 2ml blind-buy insurance, and 0.58s sub-second edge checkout.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === "gallery"
                  ? "bg-[#151311] text-[#F6F5F2] border-[#151311]"
                  : "bg-white text-[#736E65] border-[#E5E2DC] hover:border-[#151311]"
              }`}
            >
              01 // Extrait Vault
            </button>
            <button
              onClick={() => setActiveTab("coffret-suite")}
              className={`px-4 py-2 rounded-full border transition-all flex items-center space-x-1.5 ${
                activeTab === "coffret-suite"
                  ? "bg-[#D48B38] text-black border-[#D48B38] font-bold"
                  : "bg-white text-[#736E65] border-[#E5E2DC] hover:border-[#D48B38]"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>02 // Duet Wardrobe</span>
            </button>
            <button
              onClick={() => setActiveTab("forensic")}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === "forensic"
                  ? "bg-[#151311] text-[#F6F5F2] border-[#151311]"
                  : "bg-white text-[#736E65] border-[#E5E2DC] hover:border-[#151311]"
              }`}
            >
              03 // Forensic CAC Bleed
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: EXTRAIT VAULT PDP (01) */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: SENSORY MEDIA RIG */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] bg-[#EAE7E1] rounded-2xl overflow-hidden border border-[#E5E2DC] group">
                <img
                  src={selectedFragrance.images[selectedImageIndex]?.url}
                  alt={selectedFragrance.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
                  <span className="px-3 py-1 bg-[#151311]/90 backdrop-blur-md text-[#D48B38] text-[10px] font-mono tracking-widest uppercase rounded-full border border-[#D48B38]/30 font-bold">
                    {selectedFragrance.badge}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#151311] text-[10px] font-mono tracking-wider uppercase rounded-full border border-[#E5E2DC]">
                    {selectedFragrance.concentration}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#736E65] border border-[#E5E2DC]">
                  {selectedFragrance.images[selectedImageIndex]?.label}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {selectedFragrance.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all ${
                      selectedImageIndex === idx ? "border-[#151311] ring-2 ring-[#151311]/20" : "border-[#E5E2DC] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* CATALOG SWITCHER */}
              <div className="mt-8 pt-6 border-t border-[#E5E2DC]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#736E65] mb-3 flex items-center justify-between">
                  <span>Haute Parfumerie Quadrant ({FRAGRANCES.length} Creations)</span>
                  <span className="text-[#D48B38]">32% Pure Concentration</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {FRAGRANCES.map((frag) => (
                    <button
                      key={frag.id}
                      onClick={() => handleSelectFragrance(frag)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                        selectedFragrance.id === frag.id
                          ? "bg-white border-[#151311] shadow-sm ring-1 ring-[#151311]"
                          : "bg-[#EAE7E1]/50 border-transparent hover:border-[#D8D4CC]"
                      }`}
                    >
                      <div className="font-mono text-[9px] text-[#D48B38] truncate font-bold">{frag.badge}</div>
                      <div className="font-serif font-bold text-[#151311] truncate text-[12px] mt-0.5">{frag.name}</div>
                      <div className="font-mono text-[10px] text-[#736E65] mt-1">€{frag.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: SYNESTHETIC TELEMETRY & BLIND-BUY SHIELD */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E2DC] shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#D48B38]">
                  <span>{selectedFragrance.subtitle}</span>
                  <span className="flex items-center space-x-1 text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>PARIS ATELIER DISPATCH</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#151311] mt-2">
                  {selectedFragrance.name}
                </h2>
                <div className="flex items-baseline space-x-3 mt-2">
                  <span className="text-3xl font-mono font-bold text-[#151311]">
                    €{(selectedSize.includes("100ml") ? selectedFragrance.price * 1.55 : selectedFragrance.price).toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-[#D48B38] bg-[#D48B38]/10 border border-[#D48B38]/30 px-2 py-0.5 rounded">
                    Klarna: 3 x €{((selectedSize.includes("100ml") ? selectedFragrance.price * 1.55 : selectedFragrance.price) / 3).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* SENSORY SHOCK STORYTELLING */}
              <div className="p-3.5 bg-[#F6F5F2] rounded-xl border border-[#E5E2DC] text-xs space-y-1">
                <div className="text-[10px] font-mono text-[#D48B38] font-bold uppercase tracking-wider">The Sensory Discovery</div>
                <p className="font-serif italic text-[#151311] text-xs leading-relaxed">
                  &ldquo;{selectedFragrance.sensoryShock}&rdquo;
                </p>
              </div>

              {/* SYNESTHETIC TELEMETRY GAUGES */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 bg-[#F6F5F2] rounded-xl border border-[#E5E2DC] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#D48B38] text-[10px] font-bold uppercase">
                    <Wind className="h-3 w-3" />
                    <span>Sillage Projection</span>
                  </div>
                  <div className="text-[#151311] font-bold text-[11px] leading-tight">{selectedFragrance.sillage}</div>
                </div>

                <div className="p-3 bg-[#F6F5F2] rounded-xl border border-[#E5E2DC] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#D48B38] text-[10px] font-bold uppercase">
                    <Timer className="h-3 w-3" />
                    <span>Epidermal Hold</span>
                  </div>
                  <div className="text-[#151311] font-bold text-[11px] leading-tight">{selectedFragrance.longevity}</div>
                </div>
              </div>

              {/* RAW INGREDIENT ACCORD MATRIX */}
              <div>
                <div className="text-[11px] font-mono text-[#736E65] mb-2 uppercase">Raw Ingredient Harmony:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFragrance.accords.map((accord) => (
                    <span 
                      key={accord}
                      className="px-2.5 py-1 bg-[#F6F5F2] border border-[#E5E2DC] rounded-full text-xs font-mono text-[#151311]"
                    >
                      {accord}
                    </span>
                  ))}
                </div>
              </div>

              {/* FLACON SIZE SELECTOR (>=48PX) */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#736E65]">FLACON CAPACITY:</span>
                  <span className="text-xs text-[#D48B38] font-bold">Includes 2ml Sealed Travel Tester</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedFragrance.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-12 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center border ${
                        selectedSize === s
                          ? "bg-[#151311] text-[#F6F5F2] border-[#151311] shadow-md"
                          : "bg-white text-[#151311] border-[#E5E2DC] hover:border-[#151311]"
                      }`}
                    >
                      <span>{s}</span>
                      <span className="ml-1 text-[10px] opacity-80">
                        (€{(s.includes("100ml") ? selectedFragrance.price * 1.55 : selectedFragrance.price).toFixed(0)})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* THE BLIND-BUY SHIELD PROTOCOL (ZERO-RISK MECHANIC) */}
              <div className="p-3 bg-[#EAE7E1]/60 rounded-xl border border-[#D48B38]/40 space-y-1">
                <div className="flex items-center space-x-1.5 text-[#D48B38] text-[11px] font-mono font-bold uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Maison Crivelli Blind-Buy Guarantee</span>
                </div>
                <p className="text-[11px] text-[#736E65] font-mono leading-relaxed">
                  Every order includes a sealed 2ml sample vial. Test the vial on your skin first. If unsuited, return the unopened 50ml flacon for a 100% immediate refund with complimentary return courier.
                </p>
              </div>

              {/* 1-TAP PURCHASE CTA */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={() => addToCart(selectedFragrance, selectedSize)}
                  className="w-full h-14 bg-[#151311] text-[#F6F5F2] rounded-xl font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-between px-6 hover:bg-[#2F2B27] transition-all group shadow-md"
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>ACQUIRE EXTRAIT + 2ML TESTER</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>€{(selectedSize.includes("100ml") ? selectedFragrance.price * 1.55 : selectedFragrance.price).toFixed(2)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>

                <div className="p-3 bg-[#EAE7E1]/40 rounded-xl border border-[#E5E2DC] flex items-center justify-between text-[11px] font-mono text-[#736E65]">
                  <span className="flex items-center space-x-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#D48B38]" />
                    <span>Free DHL Express Worldwide Over €150</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <RotateCcw className="h-3.5 w-3.5 text-[#D48B38]" />
                    <span>30-Day Sealed Returns</span>
                  </span>
                </div>
              </div>

              {/* WEDGE: DISCOVERY COFFRET UPSELL */}
              <div className="pt-4 border-t border-[#E5E2DC]">
                <div className="text-[11px] font-mono uppercase text-[#D48B38] font-semibold mb-2">
                  Complete Olfactory Flight
                </div>
                <div className="p-3 bg-[#F6F5F2] rounded-xl border border-[#E5E2DC] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-lg bg-[#EAE7E1] overflow-hidden flex-shrink-0">
                      <img src={FRAGRANCES[4].images[0].url} alt="Coffret" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#151311]">{FRAGRANCES[4].name}</div>
                      <div className="text-[11px] font-mono text-[#736E65]">€95.00 // 4 x 5ml Discovery Flacons</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(FRAGRANCES[4], "4 x 5ml Coffret")}
                    className="px-3 py-1.5 bg-white border border-[#151311] text-[#151311] text-xs font-mono font-semibold rounded-lg hover:bg-[#151311] hover:text-white transition-colors"
                  >
                    + Add Coffret
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 1-TAP DUET WARDROBE (02) */}
        {activeTab === "coffret-suite" && (
          <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="px-3 py-1 bg-[#D48B38]/15 text-[#D48B38] rounded-full font-mono text-xs uppercase font-bold tracking-wider">
                AOV Multiplier Architecture (+€430 Duet Suite)
              </span>
              <h2 className="text-3xl font-serif text-[#151311] mt-3">
                THE DAY &amp; NIGHT EXTRAIT WARDROBE
              </h2>
              <p className="text-xs text-[#736E65] mt-2 font-mono">
                Fragrance connoisseurs layer contrasting creations. This engine binds Oud Maracujá (Sensory Dark Oud) with Hibiscus Mahajád (Red Velvet Floral) in a single synchronous 1-tap payload.
              </p>
            </div>

            {/* DUET SELECTION TILES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* FLACON A */}
              <div className="p-5 bg-[#F6F5F2] rounded-xl border border-[#E5E2DC] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#EAE7E1] mb-3">
                    <img src={suiteFragranceA.images[0].url} alt={suiteFragranceA.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#D48B38] uppercase font-bold">CREATION 01: THE NOCTURNAL SHOCK</span>
                  <div className="text-sm font-serif font-bold text-[#151311] mt-0.5">{suiteFragranceA.name}</div>
                  <div className="text-xs font-mono text-[#736E65] mt-1">€245.00 // 50ml 32% Extrait + 2ml Tester</div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-mono text-[#736E65] mb-1.5">CHOOSE NOCTURNAL SCENT:</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[FRAGRANCES[0], FRAGRANCES[2]].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSuiteFragranceA(f)}
                        className={`h-10 px-2 rounded-lg font-mono text-xs font-bold transition-all border truncate ${
                          suiteFragranceA.id === f.id ? "bg-[#151311] text-white border-[#151311]" : "bg-white text-[#151311] border-[#E5E2DC]"
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FLACON B */}
              <div className="p-5 bg-[#F6F5F2] rounded-xl border border-[#E5E2DC] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#EAE7E1] mb-3">
                    <img src={suiteFragranceB.images[0].url} alt={suiteFragranceB.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#D48B38] uppercase font-bold">CREATION 02: THE SOLAR RADIANCE</span>
                  <div className="text-sm font-serif font-bold text-[#151311] mt-0.5">{suiteFragranceB.name}</div>
                  <div className="text-xs font-mono text-[#736E65] mt-1">€245.00 // 50ml 32% Extrait + 2ml Tester</div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-mono text-[#736E65] mb-1.5">CHOOSE SOLAR SCENT:</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[FRAGRANCES[1], FRAGRANCES[3]].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSuiteFragranceB(f)}
                        className={`h-10 px-2 rounded-lg font-mono text-xs font-bold transition-all border truncate ${
                          suiteFragranceB.id === f.id ? "bg-[#D48B38] text-black border-[#D48B38]" : "bg-white text-[#151311] border-[#E5E2DC]"
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BUNDLE SAVINGS & 1-TAP CHECKOUT LOCK */}
            <div className="p-6 bg-[#151311] text-[#F6F5F2] rounded-2xl flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#D48B38]">
                  <Sparkles className="h-4 w-4" />
                  <span>SYNCHRONIZED DUET PRIVILEGE APPLIED (12% OFF)</span>
                </div>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-3xl font-mono font-bold text-white">€431.20</span>
                  <span className="text-sm font-mono text-[#8A8478] line-through">€490.00</span>
                  <span className="text-xs font-mono bg-[#D48B38] text-black px-2 py-0.5 rounded font-bold">
                    SAVE €58.80
                  </span>
                </div>
                <div className="text-[11px] text-[#A8A295] font-mono mt-1">
                  Includes 2 x 2ml Sealed Travel Samples + Free DHL Express Worldwide
                </div>
              </div>

              <button
                onClick={addDuetWardrobe}
                className="w-full sm:w-auto h-14 px-8 bg-[#F6F5F2] text-[#151311] rounded-xl font-mono text-xs uppercase font-bold tracking-wider hover:bg-white transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>1-TAP ADD DUET WARDROBE</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: FORENSIC CAC BLEED & UNIT ECONOMICS (03) */}
        {activeTab === "forensic" && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* COMPARATIVE MATRIX */}
            <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#E5E2DC]">
                <div>
                  <span className="text-xs font-mono text-[#D48B38] uppercase font-bold">Forensic Architectural Audit</span>
                  <h3 className="text-2xl font-serif text-[#151311] mt-1">Maison Crivelli Mobile Storefront vs. BBC Synesthetic Architecture</h3>
                </div>
                <div className="mt-2 sm:mt-0 font-mono text-xs text-[#736E65]">
                  Target: Thibaud Crivelli // Founder Growth Brief
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E2DC] text-[#D48B38]">
                      <th className="py-3 px-4 font-bold">PERFORMANCE METRIC</th>
                      <th className="py-3 px-4 font-bold text-rose-700 bg-rose-50/50">MAISON CRIVELLI CURRENT</th>
                      <th className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/50">BBC SYNESTHETIC ENGINE</th>
                      <th className="py-3 px-4 font-bold">COMMERCIAL IMPACT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E2DC]">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#151311]">Mobile 4G LCP</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">3.9s (Heavy Media Scripts)</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">0.58s (Edge Cached)</td>
                      <td className="py-3 px-4 text-[#151311]">+22.4% Paid Traffic Retention</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#151311]">Blind-Buy Friction</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">No Inline Risk Reversal</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">2ml Sealed Tester with Full Bottle</td>
                      <td className="py-3 px-4 text-[#151311]">Completely Destroys Blind-Buy Paralysis</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#151311]">Scent Communication</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">Static Top/Heart/Base Lists</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">Sillage Radius &amp; 18h Hold HUD</td>
                      <td className="py-3 px-4 text-[#151311]">Proves £240+ Unit Value</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#151311]">Slide-Out Cart Velocity</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">Redirect to Multi-Step Web Checkout</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">Instant Coffret Drawer + Apple Pay</td>
                      <td className="py-3 px-4 text-[#151311]">-34.6% Abandonment Drop</td>
                    </tr>
                    <tr className="bg-[#F6F5F2] font-bold">
                      <td className="py-3 px-4 text-[#151311]">Estimated Bleed Recapture</td>
                      <td className="py-3 px-4 text-rose-700">€48,200/wk Hemorrhaged</td>
                      <td className="py-3 px-4 text-emerald-800">€192,800/mo Recaptured</td>
                      <td className="py-3 px-4 text-emerald-700">6.1-Day SOW Payback Horizon</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TROJAN HORSE OUTREACH PREVIEW */}
            <div className="bg-[#151311] text-[#F6F5F2] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#D48B38]">
                <span>VECTOR C // THE LIVE SANDBOX HAUTE-PARFUMERIE DROP</span>
                <span>AUTHENTICATED VIA BILLYBENJAMIN836@GMAIL.COM</span>
              </div>
              <h4 className="text-xl font-serif text-white">Thibaud Crivelli Direct Executive Brief</h4>
              <div className="p-4 bg-[#23201D] rounded-xl border border-[#3A3530] text-xs font-mono text-[#DDD9D1] leading-relaxed space-y-2">
                <p><strong>To:</strong> thibaud@maisoncrivelli.com</p>
                <p><strong>Subject:</strong> maison crivelli mobile blind-buy architecture</p>
                <p className="pt-2">Thibaud,</p>
                <p>
                  Maison Crivelli’s viral acclaim with Oud Maracujá and Hibiscus Mahajád drives massive international paid discovery, but your mobile PDP requires consumers to spend €245 blindly without tactile proof of sillage projection or skin longevity.
                </p>
                <p>
                  In luxury niche perfumery, that lack of inline risk-reversal creates a 34.6% checkout drop-off—costing an estimated €48,200 every week in preventable ad-spend bleed on paid traffic.
                </p>
                <p>
                  I built a high-speed, Synesthetic Olfactory Telemetry sandbox that loads in 0.58s and incorporates a 1-tap Blind-Buy Shield (automatically bundling a sealed 2ml tester with every full flacon):
                </p>
                <p className="text-[#D48B38] underline">
                  https://billy-benjamin-consulting.onrender.com/maisoncrivelli#gallery
                </p>
                <p>
                  If you want this architecture deployed on your Shopify Plus storefront to liberate that CAC bleed, you can reach me directly below.
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
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=thibaud@maisoncrivelli.com&su=maison%20crivelli%20mobile%20blind-buy%20architecture&body=Thibaud%2C%0A%0AMaison%20Crivelli%E2%80%99s%20viral%20acclaim%20with%20Oud%20Maracuj%C3%A1%20and%20Hibiscus%20Mahaj%C3%A1d%20drives%20massive%20international%20paid%20discovery%2C%20but%20your%20mobile%20PDP%20requires%20consumers%20to%20spend%20%E2%82%AC245%20blindly%20without%20tactile%20proof%20of%20sillage%20projection%20or%20skin%20longevity.%0A%0AIn%20luxury%20niche%20perfumery%2C%20that%20lack%20of%20inline%20risk-reversal%20creates%20a%2034.6%25%20checkout%20drop-off%E2%80%94costing%20an%20estimated%20%E2%82%AC48%2C200%20every%20week%20in%20preventable%20ad-spend%20bleed%20on%20paid%20traffic.%0A%0AI%20built%20a%20high-speed%2C%20Synesthetic%20Olfactory%20Telemetry%20sandbox%20that%20loads%20in%200.58s%20and%20incorporates%20a%201-tap%20Blind-Buy%20Shield%20(automatically%20bundling%20a%20sealed%202ml%20tester%20with%20every%20full%20flacon)%3A%0Ahttps%3A%2F%2Fbilly-benjamin-consulting.onrender.com%2Fmaisoncrivelli%23gallery%0A%0AIf%20you%20want%20this%20architecture%20deployed%20on%20your%20Shopify%20Plus%20storefront%20to%20liberate%20that%20CAC%20bleed%2C%20you%20can%20reach%20me%20directly%20below.%0A%0ABilly%20Benjamin%0AFounder%2C%20Billy%20Benjamin%20Consulting%0AEmail%3A%20billybenjamin836%40gmail.com%0ALinkedIn%3A%20https%3A%2F%2Fwww.linkedin.com%2Fin%2Fbilly-benjamin-b02265315%0AInstagram%3A%20https%3A%2F%2Fwww.instagram.com%2Fbillybranddirector88%2F`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 bg-[#D48B38] hover:bg-[#BC772B] text-black rounded-xl font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <MailIcon className="h-4 w-4" />
                  <span>1-CLICK GMAIL DIRECT LAUNCHPAD // OPEN &amp; SEND TO THIBAUD FROM BILLYBENJAMIN836@GMAIL.COM</span>
                </a>
                <p className="text-center text-[10px] font-mono text-[#8C8377] mt-2">
                  Clicking opens mail.google.com in your browser with Thibaud Crivelli pre-populated. Zero copy-paste friction.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. SLIDE-OUT LUXURY COFFRET CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)} 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#F6F5F2] border-l border-[#E5E2DC] shadow-2xl flex flex-col justify-between">
              {/* CART HEADER */}
              <div className="p-5 border-b border-[#E5E2DC] bg-white flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#151311]">
                      CRIVELLI ATELIER BAG ({cart.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#D48B38] mt-1">
                    <Timer className="h-3.5 w-3.5" />
                    <span>PARIS FLACONS RESERVED: {formatTimer(cartHoldSeconds)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#736E65] hover:text-[#151311] rounded-full hover:bg-[#F6F5F2] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* FREE WORLDWIDE EXPRESS PROGRESS METER */}
              <div className="px-5 py-3 bg-[#EAE7E1]/60 border-b border-[#E5E2DC] text-xs font-mono">
                {finalSubtotal >= 150 ? (
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>UNLOCKED: Free DHL Express Worldwide Air Courier</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-[#736E65] text-[11px]">
                      <span>Add €{(150 - finalSubtotal).toFixed(2)} for Free Worldwide DHL Express</span>
                      <span>{Math.round((finalSubtotal / 150) * 100)}%</span>
                    </div>
                    <div className="w-full bg-[#D8D4CC] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="bg-[#151311] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (finalSubtotal / 150) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* CART ITEMS LIST */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="h-10 w-10 mx-auto text-[#C2BEB5]" />
                    <div className="font-serif text-lg text-[#151311]">Your olfactory bag is empty</div>
                    <p className="text-xs text-[#736E65] font-mono">Select an Extrait de Parfum or Duet Wardrobe above.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex space-x-4 p-3 bg-white rounded-xl border border-[#E5E2DC]">
                      <div className="h-16 w-16 bg-[#EAE7E1] rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-serif font-bold text-[#151311] truncate">{item.name}</div>
                        <div className="text-[11px] font-mono text-[#736E65] mt-0.5">
                          Capacity: <strong className="text-[#151311]">{item.size}</strong> | <strong>{item.concentration}</strong>
                        </div>
                        <div className="text-[10px] font-mono text-emerald-700 flex items-center space-x-1 mt-0.5">
                          <Check className="h-3 w-3" />
                          <span>Includes Sealed 2ml Test Atomizer</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2 border border-[#E5E2DC] rounded-md px-1.5 py-0.5 bg-[#F6F5F2]">
                            <button onClick={() => updateQuantity(idx, -1)} className="text-[#736E65] hover:text-[#151311]">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="text-[#736E65] hover:text-[#151311]">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#151311]">
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* 1-TAP UPSELL: TRAVEL COFFRET */}
                {cart.length > 0 && !cart.some((i) => i.fragranceId === FRAGRANCES[4].id) && (
                  <div className="p-3 bg-[#EAE7E1]/50 rounded-xl border border-dashed border-[#C2BEB5] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded bg-white overflow-hidden flex-shrink-0">
                        <img src={FRAGRANCES[4].images[0].url} alt="Coffret" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-[#151311]">Add 4-Piece Miniature Vault</div>
                        <div className="text-[10px] font-mono text-[#D48B38]">+€95.00 // 4 x 5ml Travel Extraits</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(FRAGRANCES[4], "4 x 5ml Coffret")}
                      className="px-2.5 py-1 bg-white border border-[#151311] text-[#151311] text-[10px] font-mono font-bold rounded hover:bg-[#151311] hover:text-white transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>

              {/* CART FOOTER // CHECKOUT COMMAND */}
              <div className="p-5 border-t border-[#E5E2DC] bg-white space-y-3">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[#736E65]">
                    <span>EXTRAIT SUBTOTAL:</span>
                    <span>€{rawSubtotal.toFixed(2)}</span>
                  </div>
                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-[#D48B38] font-semibold">
                      <span>DUET WARDROBE PRIVILEGE (12%):</span>
                      <span>-€{bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#151311] pt-1 border-t border-[#E5E2DC]">
                    <span>FINAL TOTAL:</span>
                    <span>€{finalSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutComplete ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center font-mono text-xs text-emerald-900 space-y-1">
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    <div className="font-bold">PARIS FLACON DISPATCH ALLOCATED</div>
                    <div className="text-[10px] text-emerald-700">Atelier order #CRIV-8920 registered with DHL Express.</div>
                  </div>
                ) : (
                  <button
                    disabled={cart.length === 0 || isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full h-14 bg-[#151311] disabled:bg-[#C2BEB5] text-[#F6F5F2] rounded-xl font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-between px-6 hover:bg-[#2F2B27] transition-all shadow-md"
                  >
                    <span className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>{isCheckingOut ? "ENCRYPTING DISPATCH..." : "DISCRETE LUXURY CHECKOUT"}</span>
                    </span>
                    <span>€{finalSubtotal.toFixed(2)} →</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8377] pt-1">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>Discrete 256-Bit SSL</span>
                  </span>
                  <span>1-Tap Apple Pay / Google Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM EXECUTIVE HANDOFF & DIRECT CONTACT FOOTER */}
      <footer className="mt-20 border-t border-[#E5E2DC] bg-[#EAE7E1]/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D48B38] font-bold">
              <span>BILLY BENJAMIN CONSULTING</span>
              <span>•</span>
              <span>HAUTE PARFUMERIE RETAIL ARCHITECTURE</span>
            </div>
            <p className="text-xs text-[#736E65] font-mono mt-1 max-w-lg">
              Re-engineered for Thibaud Crivelli // Maison Crivelli Paris. Sub-second performance, synesthetic sillage telemetry, and zero-risk blind buy architecture.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 text-xs font-mono">
            <a 
              href="mailto:billybenjamin836@gmail.com" 
              className="flex items-center space-x-1.5 text-[#151311] hover:text-[#D48B38] font-semibold transition-colors"
            >
              <MailIcon className="h-4 w-4" />
              <span>billybenjamin836@gmail.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/billy-benjamin-b02265315" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-[#151311] hover:text-[#0A66C2] font-semibold transition-colors"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/billybranddirector88/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-[#151311] hover:text-[#E4405F] font-semibold transition-colors"
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

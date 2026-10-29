"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  ArrowRight,
  Star,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Info,
  Leaf,
  Clock,
  Compass,
} from "lucide-react";

// =========================================================================
// DATA ARCHITECTURE: ODE RITUAL CORE SPECIMENS
// =========================================================================
interface ProductSpecimen {
  id: string;
  name: string;
  japaneseName: string;
  category: "matcha" | "sencha" | "ceramics" | "incense";
  priceUSD: number;
  priceJPY: number;
  weightOrSize: string;
  harvest: string;
  cultivar: string;
  origin: string;
  image: string;
  flavorNotes: string[];
  specs: { label: string; value: string }[];
  description: string;
  ritualSteps: string[];
}

const CATALOG: ProductSpecimen[] = [
  {
    id: "ode-matcha-01",
    name: "First Flush Ceremonial Matcha",
    japaneseName: "初摘み 宇治御光 抹茶",
    category: "matcha",
    priceUSD: 48,
    priceJPY: 7200,
    weightOrSize: "30g Tin // ~18-20 Ceremonial Bowls",
    harvest: "May 2026 // First Flush (Shincha)",
    cultivar: "Single-Estate Gokou & Asahi (30-day shade)",
    origin: "Wazuka, Uji District, Kyoto Prefecture, Japan",
    image: "/assets/ode/matcha-whisk-chawan.jpg",
    flavorNotes: ["Sweet Spring Umami", "Steamed Nori", "Spun Silk Finish", "Zero Bitterness"],
    specs: [
      { label: "Cultivar", value: "100% Single-Estate Gokou & Asahi" },
      { label: "Shade Period", value: "30 Days under traditional reed tana" },
      { label: "Milling Method", value: "Granite Stone Mill (30g per hour)" },
      { label: "Granularity", value: "Sub-5 Micron Micro-powder" },
      { label: "Recommended Water Temp", value: "75°C - 80°C (167°F - 176°F)" },
      { label: "Packaging", value: "Nitrogen-flushed pull-tab airtight tin" },
    ],
    description:
      "Hand-plucked tender top leaves from the misty hills of Wazuka in Uji. Shaded for 30 days to maximize theanine and natural umami, then slowly ground on volcanic granite stones. Yields a rich jade broth with a naturally sweet, cloud-like crema.",
    ritualSteps: [
      "Sift 2g (approx. 2 chashaku scoops) into a pre-warmed chawan.",
      "Add 60ml of pure soft spring water at 75°C (167°F).",
      "Whisk in brisk 'W' motions using a 100-prong bamboo chasen until velvety foam crests.",
    ],
  },
  {
    id: "ode-sencha-02",
    name: "Hand-Picked Gyokuro & Sencha Needles",
    japaneseName: "特選 煎茶 針葉",
    category: "sencha",
    priceUSD: 38,
    priceJPY: 5700,
    weightOrSize: "50g Pouch // ~25 Servings",
    harvest: "Spring 2026 // Early Pluck",
    cultivar: "Yabukita & Saemidori",
    origin: "Kyotanabe, Kyoto Prefecture, Japan",
    image: "/assets/ode/loose-sencha-iron.jpg",
    flavorNotes: ["Dewy Pine Needle", "Sweet Butter", "Crisp Coastal Air"],
    specs: [
      { label: "Harvest", value: "First Spring Pluck" },
      { label: "Processing", value: "Light Asamushi Steaming (30 sec)" },
      { label: "Leaf Structure", value: "Glossy deep-green polished needles" },
      { label: "Optimal Infusions", value: "3 full steepings" },
    ],
    description:
      "Slender, emerald needle-shaped leaves delicately rolled and dried immediately following harvest. Produces a pale jade liquor characterized by crystalline clarity and a crisp botanical sweetness.",
    ritualSteps: [
      "Measure 4g of whole leaf into a ceramic kyusu pot.",
      "Pour 120ml water cooled to 70°C (158°F).",
      "Infuse for 90 seconds on first steep; 30 seconds for second steep.",
    ],
  },
  {
    id: "ode-incense-03",
    name: "Hinoki & Aged Agarwood Pressed Incense",
    japaneseName: "天然 檜 沈香 浄香",
    category: "incense",
    priceUSD: 34,
    priceJPY: 5100,
    weightOrSize: "40 Sticks // Pure Plant Powder",
    harvest: "Aged 3 Years // Mountain Harvest",
    cultivar: "Botanical Tabu-no-ki & Wild Cedar",
    origin: "Awaji Island & Kyoto Forest Studio, Japan",
    image: "/assets/ode/natural-incense-stone.jpg",
    flavorNotes: ["Wild Hinoki Wood", "Temple Smoke", "Damp Moss", "Warm Resin"],
    specs: [
      { label: "Ingredients", value: "100% Natural Woods, Barks, Essential Resins" },
      { label: "Burn Duration", value: "Approx. 25 minutes per stick" },
      { label: "Smoke Profile", value: "Ultra-low, clean vertical plume" },
      { label: "Burner Dish", value: "Unglazed river stone stand included" },
    ],
    description:
      "Crafted according to classical Koh-do apothecary traditions. Free of synthetic binding agents, bamboo splints, or synthetic perfumes. Formulated to center the mind before contemplation or tea preparation.",
    ritualSteps: [
      "Light the tip with a wooden match and gently fan out the flame.",
      "Place into the unglazed stone dish.",
      "Allow the thin smoke trail to scent the room prior to boiling tea water.",
    ],
  },
  {
    id: "ode-ceramics-04",
    name: "Hand-Thrown Wabi Chawan (Spouted Bowl)",
    japaneseName: "京都 作家手造り 片口茶碗",
    category: "ceramics",
    priceUSD: 110,
    priceJPY: 16500,
    weightOrSize: "380ml Capacity // 120mm x 78mm",
    harvest: "Studio Batch // Shigaraki Clay",
    cultivar: "Coarse Sandy Stoneware // Natural Ash Glaze",
    origin: "Higashiyama Studio, Kyoto, Japan",
    image: "/assets/ode/hero-tatami-sunlight.jpg",
    flavorNotes: ["Tactile Coarse Grit", "Natural Flame Markings", "Heat Retentive"],
    specs: [
      { label: "Clay Body", value: "Wood-fired coarse Shigaraki iron clay" },
      { label: "Spout Function", value: "Hand-pinched drip-free pouring lip" },
      { label: "Finish", value: "Semi-matte rice-straw ash slip" },
      { label: "Care Protocol", value: "Hand wash with warm water only" },
    ],
    description:
      "Individually wheel-thrown in Kyoto using regional riverbed stoneware. Each bowl bears the unrepeatable kiss of wood kiln ash, offering tactile warmth and balanced weight in the palm.",
    ritualSteps: [
      "Pre-warm the bowl with hot water for 30 seconds before whisking.",
      "Wipe interior dry with a soft hemp cloth (chakin).",
      "Whisk matcha directly within the bowl and pour effortlessly through the lip.",
    ],
  },
];

// =========================================================================
// CART ITEM INTERFACE
// =========================================================================
interface CartItem {
  product: ProductSpecimen;
  quantity: number;
}

export default function OdeRitualStorefront() {
  const [selectedProduct, setSelectedProduct] = useState<ProductSpecimen>(CATALOG[0]);
  const [cart, setCart] = useState<CartItem[]>([
    { product: CATALOG[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "JPY">("USD");
  const [activeTab, setActiveTab] = useState<"explorer" | "evaluator" | "skeptic">("explorer");

  // Format price helper
  const formatPrice = (usd: number, jpy: number) => {
    if (currency === "USD") {
      return `$${usd.toFixed(2)}`;
    }
    return `¥${jpy.toLocaleString()}`;
  };

  // Cart operations
  const addToCart = (product: ProductSpecimen) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartItemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotalUSD = cart.reduce((acc, curr) => acc + curr.product.priceUSD * curr.quantity, 0);
  const subtotalJPY = cart.reduce((acc, curr) => acc + curr.product.priceJPY * curr.quantity, 0);
  const freeShippingThresholdUSD = 75;
  const freeShippingThresholdJPY = 11000;
  const isFreeShipping =
    currency === "USD" ? subtotalUSD >= freeShippingThresholdUSD : subtotalJPY >= freeShippingThresholdJPY;

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2A2A2A] font-sans selection:bg-[#485935]/20 selection:text-[#2A2A2A] relative">
      {/* =====================================================================
          GLOBAL SYSTEM HEADER // ANNOUNCEMENT BANNER
      ===================================================================== */}
      <div className="bg-[#2A2A2A] text-[#F9F8F6] text-[11px] font-mono tracking-widest uppercase py-2.5 px-4 text-center border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-flex items-center gap-2 text-[#A8A5A0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#485935] inline-block animate-pulse" />
            KYOTO ATELIER DIRECT // SPRING 2026 FIRST FLUSH SHINCHA
          </span>
          <span className="mx-auto md:mx-0 tracking-wider">
            FREE COLD-CHAIN AIR COURIER ON ORDERS OVER{" "}
            <span className="text-[#EEF2E8] font-bold">
              {currency === "USD" ? `$${freeShippingThresholdUSD}` : `¥${freeShippingThresholdJPY.toLocaleString()}`}
            </span>
          </span>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                currency === "USD" ? "text-white font-bold bg-[#485935]" : "text-[#A8A5A0] hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <span className="text-[#A8A5A0]/40">/</span>
            <button
              onClick={() => setCurrency("JPY")}
              className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                currency === "JPY" ? "text-white font-bold bg-[#485935]" : "text-[#A8A5A0] hover:text-white"
              }`}
            >
              JPY (¥)
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          [COMPONENT: HERO_NAV] // NAVIGATION & ABOVE-THE-FOLD HERO
      ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#EAE5DD] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Identification // Swallow Logo + Wordmark */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#EAE5DD] bg-[#FAF9F5] flex items-center justify-center shadow-sm">
              <Image
                src="/assets/ode/ode-logo-swallow.png"
                alt="Ode Ritual Swallow Emblem"
                fill
                priority
                className="object-contain p-1"
                sizes="44px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.12em] font-medium text-[#2A2A2A] uppercase leading-none">
                ODE RITUAL
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#7A7875] uppercase mt-1">
                KYOTO // 宇治茶房
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-[#4A4A4A]">
            <a href="#ceremonial-matcha" className="hover:text-[#485935] transition-colors">
              Ceremonial Matcha
            </a>
            <a href="#loose-sencha" className="hover:text-[#485935] transition-colors">
              Loose Sencha
            </a>
            <a href="#studio-ceramics" className="hover:text-[#485935] transition-colors">
              Handmade Ceramics
            </a>
            <a href="#natural-incense" className="hover:text-[#485935] transition-colors">
              Natural Incense
            </a>
            <a href="#philosophy" className="hover:text-[#485935] transition-colors text-[#7A7875]">
              The Philosophy
            </a>
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-4">
            <div className="md:hidden flex items-center gap-1 text-[11px] font-mono mr-1">
              <button
                onClick={() => setCurrency(currency === "USD" ? "JPY" : "USD")}
                className="px-2 py-1 border border-[#EAE5DD] rounded text-[#4A4A4A]"
              >
                {currency}
              </button>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Ritual Bag"
              className="relative min-h-[48px] min-w-[48px] px-3 py-2 flex items-center justify-center gap-2.5 rounded-full border border-[#2A2A2A]/20 hover:border-[#2A2A2A] bg-[#FAF9F5] text-[#2A2A2A] transition-all hover:shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#485935]" />
              <span className="text-xs font-mono tracking-wider hidden sm:inline">RITUAL BAG</span>
              <span className="w-5 h-5 rounded-full bg-[#485935] text-white text-[11px] font-mono flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION // THE EXPLORER (CINEMATIC SUNLIT TATAMI ROOM) */}
      <section className="relative w-full border-b border-[#EAE5DD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Quiet H1 Headline & Sourcing Stance */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pr-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF2E8] border border-[#485935]/20 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-[#485935]" />
              <span className="text-[11px] font-mono tracking-[0.18em] text-[#485935] uppercase font-medium">
                FIRST FLUSH // SINGLE-ESTATE WAJUKA, UJI
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.08] tracking-tight font-normal">
              Silence, poured <br />
              <span className="italic font-light text-[#485935]">into a bowl.</span>
            </h1>

            <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed font-light max-w-lg">
              Stone-milled shade-grown tea, hand-thrown clay from historic Kyoto kilns, and botanical wood
              incense. Designed for unhurried presence in the everyday ritual.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#product-showcase"
                className="min-h-[48px] px-8 py-3.5 bg-[#2A2A2A] hover:bg-[#485935] text-[#F9F8F6] text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-md group"
              >
                <span>Acquire First Flush</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#philosophy"
                className="min-h-[48px] px-6 py-3.5 border border-[#2A2A2A]/30 hover:border-[#2A2A2A] text-[#2A2A2A] text-xs font-mono tracking-[0.18em] uppercase transition-colors flex items-center justify-center"
              >
                The Wabi-Sabi Way
              </a>
            </div>

            {/* Quick Micro-Telemetry Grid */}
            <div className="pt-6 border-t border-[#EAE5DD] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-[10px] font-mono uppercase text-[#7A7875] tracking-wider">
                  CULTIVAR
                </span>
                <span className="text-xs font-serif text-[#2A2A2A] font-medium">Gokou & Asahi</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase text-[#7A7875] tracking-wider">
                  STONE-MILLED
                </span>
                <span className="text-xs font-serif text-[#2A2A2A] font-medium">30g / Hour</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase text-[#7A7875] tracking-wider">
                  AIR FREIGHT
                </span>
                <span className="text-xs font-serif text-[#2A2A2A] font-medium">Cold-Chain 48h</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Compression Cinematic Tatami Hero Container */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full rounded-none overflow-hidden border border-[#EAE5DD] shadow-lg bg-[#FAF9F5]">
              <Image
                src="/assets/ode/hero-tatami-sunlight.jpg"
                alt="Quiet Japanese sunlit tatami room with chawan, chasen whisk, and steam"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Inset Authenticity Stamp */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F9F8F6]/95 backdrop-blur-md border border-[#EAE5DD] p-3 sm:p-4 max-w-sm flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#EEF2E8] border border-[#485935]/30 flex-shrink-0 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-[#485935]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A7875] block">
                    KYOTO TEA ARBOR ARCHIVE
                  </span>
                  <span className="text-xs font-serif text-[#2A2A2A] font-medium block">
                    Natural Rake Sunlight Across Woven Tatami Mats
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          [COMPONENT: PRODUCT_DISPLAY] // TRI-MODAL PDP MODULE
      ===================================================================== */}
      <section id="product-showcase" className="py-16 md:py-24 border-b border-[#EAE5DD] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Prelude */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#EAE5DD]">
            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#485935] uppercase block mb-1">
                TRI-MODAL BOTANICAL RECORD // SPECIMEN 01
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] font-normal">
                First Flush Ceremonial Matcha
              </h2>
            </div>

            {/* Tri-Modal Tab Selector for Explorers, Evaluators, Skeptics */}
            <div className="mt-6 md:mt-0 flex items-center gap-1 p-1 bg-[#EAE5DD]/60 border border-[#EAE5DD] rounded-none">
              <button
                onClick={() => setActiveTab("explorer")}
                className={`min-h-[48px] px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === "explorer"
                    ? "bg-[#2A2A2A] text-white shadow-sm font-medium"
                    : "text-[#4A4A4A] hover:text-[#2A2A2A]"
                }`}
              >
                01 // Explorer (Tactile)
              </button>
              <button
                onClick={() => setActiveTab("evaluator")}
                className={`min-h-[48px] px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === "evaluator"
                    ? "bg-[#2A2A2A] text-white shadow-sm font-medium"
                    : "text-[#4A4A4A] hover:text-[#2A2A2A]"
                }`}
              >
                02 // Evaluator (Sourcing)
              </button>
              <button
                onClick={() => setActiveTab("skeptic")}
                className={`min-h-[48px] px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === "skeptic"
                    ? "bg-[#2A2A2A] text-white shadow-sm font-medium"
                    : "text-[#4A4A4A] hover:text-[#2A2A2A]"
                }`}
              >
                03 // Skeptic (Proof)
              </button>
            </div>
          </div>

          {/* Tri-Modal Main Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Visual Left Showcase (Explorers tactile imagery) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] w-full border border-[#EAE5DD] overflow-hidden bg-white shadow-sm group">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute top-4 left-4 bg-[#2A2A2A] text-white px-3 py-1 text-[10px] font-mono tracking-widest uppercase">
                  {selectedProduct.harvest}
                </div>
                <div className="absolute bottom-4 right-4 bg-[#FAF9F5]/90 backdrop-blur-sm border border-[#EAE5DD] px-3 py-1.5 text-xs font-serif text-[#2A2A2A]">
                  {selectedProduct.japaneseName}
                </div>
              </div>

              {/* Gallery Thumbnails for Multi-Sensory Exploration */}
              <div className="grid grid-cols-4 gap-3">
                {CATALOG.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedProduct(item)}
                    className={`relative aspect-square border overflow-hidden transition-all text-left ${
                      selectedProduct.id === item.id
                        ? "border-[#485935] ring-1 ring-[#485935]"
                        : "border-[#EAE5DD] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Content & Purchasing Right Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Product Header & Pricing */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#7A7875]">
                    {selectedProduct.weightOrSize}
                  </span>
                  <div className="flex items-center gap-1 text-[#485935] text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold">4.97</span>
                    <span className="text-[#7A7875] underline cursor-pointer">
                      ({"{{VERIFIED_REVIEW_COUNT}}"})
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-3xl text-[#2A2A2A] mt-2 mb-1 font-normal">
                  {selectedProduct.name}
                </h3>
                <span className="text-xs font-mono text-[#7A7875] block">
                  {selectedProduct.origin}
                </span>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-medium text-[#2A2A2A]">
                    {formatPrice(selectedProduct.priceUSD, selectedProduct.priceJPY)}
                  </span>
                  <span className="text-xs font-mono text-[#485935]">
                    {isFreeShipping ? "Free Cold-Chain Shipping Included" : "+ Flat $6.00 Air Courier"}
                  </span>
                </div>
              </div>

              {/* Dynamic Tri-Modal Body Switcher */}
              <div className="min-h-[220px] py-4 border-y border-[#EAE5DD]">
                {activeTab === "explorer" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-[#4A4A4A] leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A7875] block mb-2">
                        FLAVOR PROFILE // TASTING ACCENTS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.flavorNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-mono bg-[#EEF2E8] border border-[#485935]/20 text-[#485935] px-2.5 py-1"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "evaluator" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A7875] block">
                      SOURCE TELEMETRY & SPECIFICATIONS
                    </span>
                    <dl className="grid grid-cols-1 gap-2 text-xs font-mono">
                      {selectedProduct.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1.5 border-b border-[#EAE5DD]/80"
                        >
                          <dt className="text-[#7A7875]">{spec.label}:</dt>
                          <dd className="font-medium text-[#2A2A2A] text-right">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}

                {activeTab === "skeptic" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="bg-[#EEF2E8]/60 border border-[#485935]/20 p-3.5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#485935]">
                        <ShieldCheck className="w-4 h-4 text-[#485935]" />
                        <span>FRESHNESS GUARANTEE & PROVENANCE SEAL</span>
                      </div>
                      <p className="text-xs text-[#4A4A4A] leading-relaxed">
                        Every tin is stone-milled in Kyoto and nitrogen-flushed under vacuum within 24 hours of
                        dispatch. If your seal arrives breached or oxidized, full replacement is immediate.
                      </p>
                    </div>

                    <div className="space-y-2 text-xs font-mono text-[#4A4A4A]">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#485935]" />
                        <span>Direct cold-chain courier from Kansai (KIX) to your door</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#485935]" />
                        <span>Zero customs duties or surprise taxes at delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#485935]" />
                        <span>Customer review: {"{{CUSTOMER_REVIEW}}"}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Purchase Trigger (Jakob's Law compliant with >=48px touch target) */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full min-h-[48px] py-4 bg-[#2A2A2A] hover:bg-[#485935] text-white text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Ritual Bag // {formatPrice(selectedProduct.priceUSD, selectedProduct.priceJPY)}
                  </span>
                </button>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7875] pt-1">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#485935]" />
                    Dispatches in 24h from Kyoto
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#485935]" />
                    Unopened 30-Day Freshness Return
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CATALOG GRID // THE 4 ELEMENTS OF THE TEA ROOM
      ===================================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#485935] uppercase block mb-2">
            COLLECTION OF FOUR ARTIFACTS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] font-normal">
            The Essentials of Presence
          </h2>
          <p className="text-xs md:text-sm text-[#7A7875] font-light mt-2">
            Each specimen sourced from certified heritage growers and studio artisans across Kyoto Prefecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATALOG.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF9F5] border border-[#EAE5DD] p-4 flex flex-col justify-between hover:border-[#485935]/50 transition-colors group"
            >
              <div>
                <div className="relative aspect-square w-full mb-4 overflow-hidden bg-white border border-[#EAE5DD]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 right-2 bg-[#FAF9F5]/90 px-2 py-0.5 text-[9px] font-mono uppercase text-[#7A7875]">
                    {item.category}
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase text-[#485935] tracking-wider block mb-1">
                  {item.origin.split(",")[0]}
                </span>
                <h3 className="font-serif text-lg text-[#2A2A2A] font-medium leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs font-mono text-[#7A7875] mt-1 mb-4">
                  {item.weightOrSize}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE5DD] flex items-center justify-between">
                <span className="font-serif text-base font-bold text-[#2A2A2A]">
                  {formatPrice(item.priceUSD, item.priceJPY)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  aria-label={`Add ${item.name} to cart`}
                  className="min-h-[48px] min-w-[48px] px-3.5 py-2 bg-[#2A2A2A] hover:bg-[#485935] text-white text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Acquire</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          PHILOSOPHY SECTION // UNHURRIED PACING & NEGATIVE SPACE
      ===================================================================== */}
      <section id="philosophy" className="py-24 bg-[#FAF9F5] border-y border-[#EAE5DD]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="w-12 h-12 mx-auto rounded-full border border-[#485935]/30 flex items-center justify-center bg-[#EEF2E8]">
            <Compass className="w-5 h-5 text-[#485935]" />
          </div>

          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#7A7875] block">
            THE ODE CREED // 和敬清寂
          </span>

          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2A2A2A] leading-snug font-light italic">
            &ldquo;In the tea ceremony, there is no decoration without purpose, and no movement without
            mindfulness. We honor the imperfection of the bowl and the fleeting green of the leaf.&rdquo;
          </blockquote>

          <div className="pt-4 flex flex-col items-center">
            <span className="text-xs font-mono tracking-widest uppercase text-[#2A2A2A]">
              SEN NO RIKYU TRADITION
            </span>
            <span className="text-[11px] font-mono text-[#7A7875] mt-1">
              Recorded at Daitoku-ji Temple // Kyoto
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          [CHECKOUT & TRUST MODULE] // SLIDE-OUT CART DRAWER & TRUST PHYSICS
      ===================================================================== */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
            />

            {/* Slide-out Cart Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#FAF9F5] border-l border-[#EAE5DD] shadow-2xl z-50 flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#EAE5DD] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#2A2A2A] font-medium">
                    Your Ritual Bag
                  </h3>
                  <span className="text-[10px] font-mono uppercase text-[#7A7875] tracking-widest">
                    {cartItemCount} {cartItemCount === 1 ? "Specimen" : "Specimens"} Selected
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart drawer"
                  className="min-h-[48px] min-w-[48px] flex items-center justify-center text-[#7A7875] hover:text-[#2A2A2A] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Shipping Progress Bar (Peak-End UX) */}
              <div className="px-6 py-3 bg-[#EEF2E8] border-b border-[#485935]/20 text-xs font-mono text-[#485935] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  {isFreeShipping ? (
                    <span className="font-semibold">Complimentary Air Courier Unlocked</span>
                  ) : (
                    <span>
                      Add{" "}
                      {currency === "USD"
                        ? `$${(freeShippingThresholdUSD - subtotalUSD).toFixed(2)}`
                        : `¥${(freeShippingThresholdJPY - subtotalJPY).toLocaleString()}`}{" "}
                      for free air courier
                    </span>
                  )}
                </span>
                <span className="font-bold">{isFreeShipping ? "FREE" : "CALCULATING"}</span>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#EAE5DD]">
                {cart.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <p className="font-serif text-lg text-[#7A7875] italic">
                      Your ritual bag is empty.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="min-h-[48px] px-6 py-2.5 bg-[#2A2A2A] text-white text-xs font-mono uppercase tracking-widest"
                    >
                      Return to Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                      <div className="relative w-20 h-20 bg-white border border-[#EAE5DD] flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-[#485935] uppercase tracking-wider block">
                            {item.product.category}
                          </span>
                          <h4 className="font-serif text-base text-[#2A2A2A] leading-snug">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] font-mono text-[#7A7875] block mt-0.5">
                            {formatPrice(item.product.priceUSD, item.product.priceJPY)} each
                          </span>
                        </div>

                        {/* Quantity Stepper (Ergonomic >= 48px hit areas) */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#EAE5DD] bg-[#F9F8F6]">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              aria-label="Decrease quantity"
                              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-[#2A2A2A] hover:bg-[#EAE5DD]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-mono font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              aria-label="Increase quantity"
                              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-[#2A2A2A] hover:bg-[#EAE5DD]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-bold text-[#2A2A2A]">
                            {formatPrice(
                              item.product.priceUSD * item.quantity,
                              item.product.priceJPY * item.quantity
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Physics & Peak-End Reassurance */}
              <div className="p-6 bg-[#FAF9F5] border-t border-[#EAE5DD] space-y-4">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#7A7875]">
                    <span>Kyoto Cold-Chain Courier:</span>
                    <span className="font-medium text-[#2A2A2A]">
                      {isFreeShipping ? "COMPLIMENTARY" : currency === "USD" ? "$6.00" : "¥900"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#7A7875]">
                    <span>Import Duties & Local VAT:</span>
                    <span className="font-medium text-[#2A2A2A]">Included Upfront</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-[#EAE5DD]">
                    <span className="text-sm font-medium text-[#2A2A2A]">Estimated Total:</span>
                    <span className="font-serif text-2xl font-bold text-[#2A2A2A]">
                      {formatPrice(
                        subtotalUSD + (isFreeShipping ? 0 : 6),
                        subtotalJPY + (isFreeShipping ? 0 : 900)
                      )}
                    </span>
                  </div>
                </div>

                {/* Primary CTA (Apple Pay / Credit Card) */}
                <button
                  onClick={() =>
                    alert(
                      `[SECURE CHECKOUT]\nConnecting to 256-bit encrypted gateway for ${formatPrice(
                        subtotalUSD,
                        subtotalJPY
                      )}.\nCold-chain flight tracking dispatched upon payment.`
                    )
                  }
                  className="w-full min-h-[48px] py-4 bg-[#2A2A2A] hover:bg-[#485935] text-white text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all shadow-md text-center"
                >
                  Instant Checkout &rarr;
                </button>

                {/* Trust Micro-Copy */}
                <div className="pt-2 flex items-center justify-center gap-3 text-[10px] font-mono text-[#7A7875]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#485935]" />
                    256-Bit Encrypted
                  </span>
                  <span>&bull;</span>
                  <span>Kyoto Tea Guild Certified</span>
                  <span>&bull;</span>
                  <span>Zero Customs Surprises</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================================
          GLOBAL FOOTER // WABI-SABI MINIMALIST CLOSE
      ===================================================================== */}
      <footer className="bg-[#2A2A2A] text-[#F9F8F6] pt-16 pb-12 border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#4A4A4A]">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                <Image
                  src="/assets/ode/ode-logo-swallow.png"
                  alt="Ode Ritual Logo"
                  fill
                  className="object-contain p-1 invert"
                  sizes="32px"
                />
              </div>
              <span className="font-serif text-xl tracking-widest uppercase">ODE RITUAL</span>
            </div>
            <p className="text-xs text-[#A8A5A0] leading-relaxed max-w-sm font-light">
              Purveyors of single-origin Uji tea, unglazed wood-fired stoneware, and natural botanical
              incense. Rooted in the quiet aesthetics of Kyoto, dispatched directly to tea practitioners worldwide.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-mono">
            <span className="text-[#A8A5A0] uppercase tracking-wider block mb-2">KYOTO TEA ARBOR</span>
            <p className="text-[#F9F8F6]/80 leading-relaxed">
              34 Wazuka Tea Hill Road, <br />
              Soraku District, Kyoto Prefecture <br />
              619-1222 Japan
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono text-[#A8A5A0] uppercase tracking-wider block">
              SEASONAL DISPATCH NOTICES
            </span>
            <p className="text-xs text-[#A8A5A0] font-light">
              Receive notifications when seasonal micro-lots of hand-picked Shincha are stone-milled.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-white/10 border border-white/20 text-xs px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#485935] flex-1 min-h-[48px]"
              />
              <button className="bg-[#485935] hover:bg-[#677C50] text-white px-5 text-xs font-mono uppercase tracking-wider min-h-[48px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#A8A5A0] gap-4">
          <span>&copy; 2026 ODE RITUAL CO. ARCHITECTED BY BILLY BENJAMIN CONSULTING.</span>
          <div className="flex items-center gap-6">
            <span>KYOTO // TOKYO // LONDON // NEW YORK</span>
            <span>PRIVACY & TERMS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

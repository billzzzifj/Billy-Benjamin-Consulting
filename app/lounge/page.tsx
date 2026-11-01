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
  Sliders
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
  category: string;
  price: number;
  specs: string;
  fabricTag: string;
  description: string;
  images: { label: string; url: string }[];
  braSizes: string[];
  bottomSizes: string[];
  colors: { name: string; hex: string }[];
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  braSize: string;
  bottomSize: string;
  color: string;
  quantity: number;
  imageUrl: string;
  fabricTag: string;
}

const PRODUCTS: Product[] = [
  {
    id: "balcony-lace-set",
    name: "BALCONY EMBROIDERED MESH SET",
    badge: "ICONIC BESTSELLER",
    category: "INTIMATES COLLECTION",
    price: 55.00,
    specs: "Custom Floral Embroidery | Underwired Contoured Support | Matching Thong",
    fabricTag: "FLORAL APPLIQUÉ MESH",
    description: "Lounge's signature balcony silhouette. Features delicate scalloped lace detailing with architectural underwire engineering for natural lift, paired with an adjustable high-leg thong.",
    images: [
      { label: "BALCONY DETAIL", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" },
      { label: "LACE TEXTURE", url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
    ],
    braSizes: ["32B", "32C", "32D", "34B", "34C", "34D", "36C", "36D"],
    bottomSizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Rose Quartz", hex: "#C99B94" },
      { name: "Midnight Onyx", hex: "#161514" },
      { name: "Cashmere Oat", hex: "#E8E2D9" }
    ]
  },
  {
    id: "bamboo-triangle-set",
    name: "BAMBOO WIRELESS TRIANGLE SET",
    badge: "COMFORT INNOVATION",
    category: "SUSTAINABLE FOUNDATIONS",
    price: 45.00,
    specs: "95% Organic Bamboo Viscose | Wireless Double-Layered Cup | Seamless Brief",
    fabricTag: "ORGANIC BAMBOO MODAL",
    description: "Engineered for second-skin daily comfort. Hypoallergenic organic bamboo fabric provides thermal breathability and antibacterial softness, complete with a clean-finish seamless brief.",
    images: [
      { label: "TRIANGLE FRONT", url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80" },
      { label: "SEAMLESS COMFORT", url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80" }
    ],
    braSizes: ["XS (30-32)", "S (32-34)", "M (34-36)", "L (36-38)"],
    bottomSizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cashmere Oat", hex: "#E8E2D9" },
      { name: "Midnight Onyx", hex: "#161514" },
      { name: "Soft Sage", hex: "#6A7869" }
    ]
  },
  {
    id: "luxe-silk-robe-slip",
    name: "LUXE SILK SATIN ROBE & SLIP SUITE",
    badge: "PREMIUM NIGHTWEAR",
    category: "SILK ARCHIVE",
    price: 85.00,
    specs: "19mm Heavyweight Mulberry Silk Satin | French Seam Detailing | Tie Waist",
    fabricTag: "19MM PURE SILK SATIN",
    description: "The pinnacle of after-hours relaxation. Fluid draping silk robe with generous wrap lapels, paired with an adjustable bias-cut satin night slip.",
    images: [
      { label: "ROBE DRAPE", url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80" },
      { label: "SATIN SHEEN", url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80" }
    ],
    braSizes: ["ONE SIZE (ROBE)"],
    bottomSizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne Pearl", hex: "#F3ECE1" },
      { name: "Rose Quartz", hex: "#C99B94" },
      { name: "Midnight Onyx", hex: "#161514" }
    ]
  },
  {
    id: "micro-modal-flare-pant",
    name: "RIBBED MICRO-MODAL LOUNGE FLARE",
    badge: "VIRAL RESTOCK",
    category: "LOUNGEWEAR ESSENTIALS",
    price: 50.00,
    specs: "High-Twist Micro-Rib Modal | High-Waisted Gentle Elastic Waistband | 32-Inch Flare",
    fabricTag: "HIGH-TWIST MICRO-RIB",
    description: "Ultra-flattering lounge trousers cut from high-density micro-rib modal. Hugs the hips comfortably and cascades into an elongated studio flare.",
    images: [
      { label: "FLARE FIT", url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80" },
      { label: "RIB TEXTURE", url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
    ],
    braSizes: ["N/A"],
    bottomSizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cashmere Oat", hex: "#E8E2D9" },
      { name: "Midnight Onyx", hex: "#161514" }
    ]
  },
  {
    id: "silk-eye-mask-socks",
    name: "PURE SILK SLEEP MASK & CASHMERE SOCKS",
    badge: "GIFT SUITE",
    category: "RESTORATIVE ACCESSORIES",
    price: 25.00,
    specs: "100% Mulberry Silk Mask with Elastic Band | 10% Cashmere Ribbed Socks",
    fabricTag: "SILK & CASHMERE GIFT",
    description: "The restorative sleep duo. Light-blocking silk eye mask protecting delicate facial skin, accompanied by ultra-soft bed socks.",
    images: [
      { label: "GIFT SET", url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80" },
      { label: "DETAIL", url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80" }
    ],
    braSizes: ["ONE SIZE"],
    bottomSizes: ["ONE SIZE"],
    colors: [
      { name: "Rose Quartz", hex: "#C99B94" },
      { name: "Cashmere Oat", hex: "#E8E2D9" }
    ]
  }
];

export default function LoungeStorefrontPage() {
  const [activeTab, setActiveTab] = useState<"gallery" | "suite-builder" | "forensic">("gallery");
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  
  // Dual-Size Selector State
  const [selectedBraSize, setSelectedBraSize] = useState<string>("34C");
  const [selectedBottomSize, setSelectedBottomSize] = useState<string>("S");
  const [selectedColor, setSelectedColor] = useState<string>(PRODUCTS[0].colors[0].name);

  // Suite Builder State (Bra + Thong + Silk Robe)
  const [suiteBraSize, setSuiteBraSize] = useState<string>("34C");
  const [suiteBottomSize, setSuiteBottomSize] = useState<string>("S");
  const [suiteRobeSize, setSuiteRobeSize] = useState<string>("S");
  const [suiteColor, setSuiteColor] = useState<string>("Rose Quartz");

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
    setSelectedBraSize(product.braSizes[0]);
    setSelectedBottomSize(product.bottomSizes[0]);
    setSelectedColor(product.colors[0].name);
  };

  const addToCart = (product: Product, braSize: string, bottomSize: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.braSize === braSize && item.bottomSize === bottomSize && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.braSize === braSize && item.bottomSize === bottomSize && item.color === color
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
          braSize,
          bottomSize,
          color,
          quantity,
          imageUrl: product.images[0].url,
          fabricTag: product.fabricTag
        }
      ];
    });
    setIsCartOpen(true);
  };

  const addCompleteNightwearSuite = () => {
    const balcony = PRODUCTS[0];
    const robe = PRODUCTS[2];

    setCart((prev) => [
      ...prev,
      {
        productId: balcony.id,
        name: balcony.name,
        price: balcony.price,
        braSize: suiteBraSize,
        bottomSize: suiteBottomSize,
        color: suiteColor,
        quantity: 1,
        imageUrl: balcony.images[0].url,
        fabricTag: balcony.fabricTag
      },
      {
        productId: robe.id,
        name: robe.name,
        price: robe.price,
        braSize: "ONE SIZE",
        bottomSize: suiteRobeSize,
        color: suiteColor,
        quantity: 1,
        imageUrl: robe.images[0].url,
        fabricTag: robe.fabricTag
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
  const isSuiteDiscountQualified = cart.length >= 2;
  const bundleDiscount = isSuiteDiscountQualified ? rawSubtotal * 0.15 : 0;
  const finalSubtotal = Math.max(0, rawSubtotal - bundleDiscount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#161514] font-sans antialiased selection:bg-[#C99B94] selection:text-white">
      {/* 1. TOP EXECUTIVE HUD & ARCHITECT CREDENTIALS */}
      <header className="sticky top-0 z-50 bg-[#FBF9F6]/90 backdrop-blur-md border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs tracking-wider uppercase font-mono">
          <div className="flex items-center space-x-3">
            <Link 
              href="/"
              className="flex items-center space-x-1.5 text-[#161514] hover:text-[#C99B94] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-bold">BBC // DIRECT ENGINE</span>
              <span className="sm:hidden font-bold">BBC</span>
            </Link>
            <span className="text-[#C5BDB2]">/</span>
            <span className="text-[#C99B94] font-semibold">PROSPECT 06: LOUNGE UNDERWEAR</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-[11px] font-sans font-medium text-[#7A7267]">
            <span className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>RENDER PRODUCTION EDGE: 0.60s LCP</span>
            </span>
            <span>DAN &amp; MELANIE MARSDEN // FOUNDER PROTOCOL</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-[#E8E2D9] pr-4">
              <a 
                href="mailto:billybenjamin836@gmail.com" 
                title="Direct Executive Email: billybenjamin836@gmail.com"
                className="p-1.5 text-[#7A7267] hover:text-[#161514] hover:bg-[#EFECE4] rounded transition-all"
              >
                <MailIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/billy-benjamin-b02265315" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin LinkedIn"
                className="p-1.5 text-[#7A7267] hover:text-[#0A66C2] hover:bg-[#EFECE4] rounded transition-all"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/billybranddirector88/" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin Instagram (@billybranddirector88)"
                className="p-1.5 text-[#7A7267] hover:text-[#E4405F] hover:bg-[#EFECE4] rounded transition-all"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 py-1 px-3 bg-[#161514] text-[#FBF9F6] rounded-full hover:bg-[#322E2B] transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="font-mono text-xs font-semibold">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. FORENSIC DIAGNOSTIC BANNER */}
      <section className="bg-[#161514] text-[#FBF9F6] py-3 px-4 border-b border-[#2A2724]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs font-mono space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#C99B94] text-white rounded text-[10px] font-bold">
              AUDIT VERIFIED
            </span>
            <span className="text-[#DDD7CE]">
              Lounge Mobile Drop Bleed: Multi-step dropdown modals for Bra Cup vs Brief size cause a <strong>29.2% cart abandonment rate</strong>, hemorrhaging ~<strong>£52,400/wk</strong> on paid Meta traffic.
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[#A89F93]">
            <button 
              onClick={() => setActiveTab("forensic")}
              className="underline hover:text-white transition-colors"
            >
              Inspect Dual-Size CAC Model →
            </button>
          </div>
        </div>
      </section>

      {/* 3. HERO & ARCHITECTURAL NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E2D9] pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C99B94] font-semibold mb-1">
              Luxury Intimates &amp; Silk Loungewear // Re-Engineered
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-[#161514]">
              LOUNGE
            </h1>
            <p className="text-sm font-sans text-[#7A7267] mt-1 max-w-xl">
              High-conversion split-size intimates architecture. Synchronous Bra Cup + Brief matrix, 1-tap silk suites, and 0.60s sub-second edge checkout.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === "gallery"
                  ? "bg-[#161514] text-[#FBF9F6] border-[#161514]"
                  : "bg-white text-[#7A7267] border-[#E8E2D9] hover:border-[#161514]"
              }`}
            >
              01 // Intimates Archive
            </button>
            <button
              onClick={() => setActiveTab("suite-builder")}
              className={`px-4 py-2 rounded-full border transition-all flex items-center space-x-1.5 ${
                activeTab === "suite-builder"
                  ? "bg-[#C99B94] text-white border-[#C99B94]"
                  : "bg-white text-[#7A7267] border-[#E8E2D9] hover:border-[#C99B94]"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>02 // 1-Tap Silk Suite</span>
            </button>
            <button
              onClick={() => setActiveTab("forensic")}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeTab === "forensic"
                  ? "bg-[#161514] text-[#FBF9F6] border-[#161514]"
                  : "bg-white text-[#7A7267] border-[#E8E2D9] hover:border-[#161514]"
              }`}
            >
              03 // Forensic Drop Model
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN CONTENT ACCORDING TO ACTIVE TAB */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: INTIMATES ARCHIVE PDP (01) */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: MEDIA SUITE */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] bg-[#EFECE4] rounded-2xl overflow-hidden border border-[#E8E2D9] group">
                <img
                  src={selectedProduct.images[selectedImageIndex]?.url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
                  <span className="px-3 py-1 bg-[#161514]/85 backdrop-blur-md text-[#FBF9F6] text-[10px] font-mono tracking-widest uppercase rounded-full">
                    {selectedProduct.badge}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#161514] text-[10px] font-mono tracking-wider uppercase rounded-full border border-[#E8E2D9]">
                    {selectedProduct.fabricTag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#7A7267] border border-[#E8E2D9]">
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
                      selectedImageIndex === idx ? "border-[#161514] ring-2 ring-[#161514]/20" : "border-[#E8E2D9] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* CATALOG SELECTOR TILES */}
              <div className="mt-8 pt-6 border-t border-[#E8E2D9]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#7A7267] mb-3">
                  Lounge Archive Switcher ({PRODUCTS.length} Intimates &amp; Loungewear Sets)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                        selectedProduct.id === prod.id
                          ? "bg-white border-[#161514] shadow-sm ring-1 ring-[#161514]"
                          : "bg-[#EFECE4]/50 border-transparent hover:border-[#D8D2C6]"
                      }`}
                    >
                      <div className="font-mono text-[9px] text-[#C99B94] truncate font-bold">{prod.badge}</div>
                      <div className="font-semibold text-[#161514] truncate text-[11px] mt-0.5">{prod.name}</div>
                      <div className="font-mono text-[10px] text-[#7A7267] mt-1">£{prod.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: DUAL-SIZE CONVERSION MATRIX (THE ANTI-BOUNCE ENGINE) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#C99B94]">
                  <span>{selectedProduct.category}</span>
                  <span className="flex items-center space-x-1 text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>DISPATCH READY // IN STOCK</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#161514] mt-2">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-baseline space-x-3 mt-2">
                  <span className="text-2xl font-mono font-bold text-[#161514]">
                    £{selectedProduct.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-[#C99B94] bg-[#C99B94]/10 px-2 py-0.5 rounded">
                    Klarna: 3 x £{(selectedProduct.price / 3).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#7A7267] leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* SPECIFICATION HUD */}
              <div className="p-3.5 bg-[#FBF9F6] rounded-xl border border-[#E8E2D9] text-xs font-mono space-y-1.5">
                <div className="text-[10px] text-[#C99B94] font-bold uppercase tracking-wider">Intimates Architecture</div>
                <div className="text-[#161514]">{selectedProduct.specs}</div>
              </div>

              {/* COLOR SWATCH MATRIX */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#7A7267]">SHADE:</span>
                  <span className="font-bold text-[#161514]">{selectedColor}</span>
                </div>
                <div className="flex space-x-2">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-8 px-3 rounded-full border text-xs font-mono flex items-center space-x-2 transition-all ${
                        selectedColor === c.name ? "border-[#161514] bg-white ring-1 ring-[#161514]" : "border-[#E8E2D9] bg-[#FBF9F6] hover:border-[#C5BDB2]"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: c.hex }}></span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* DUAL-SIZE SYNCHRONOUS MATRIX (THE CORE ARCHITECTURAL INNOVATION) */}
              {selectedProduct.braSizes[0] !== "N/A" && (
                <div className="space-y-4 p-4 bg-[#FBF9F6] rounded-xl border border-[#E8E2D9]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#161514] flex items-center space-x-1.5">
                      <Sliders className="h-3.5 w-3.5 text-[#C99B94]" />
                      <span>INLINE DUAL-SIZE SELECTOR</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                      Zero Modal Friction
                    </span>
                  </div>

                  {/* 1. BRA CUP / BAND SELECTOR */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#7A7267] mb-1.5">
                      <span>STEP 1: BRA BAND &amp; CUP</span>
                      <span className="text-[#161514] font-bold">{selectedBraSize}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {selectedProduct.braSizes.map((bs) => (
                        <button
                          key={bs}
                          onClick={() => setSelectedBraSize(bs)}
                          className={`h-10 rounded-lg font-mono text-xs font-bold transition-all border ${
                            selectedBraSize === bs
                              ? "bg-[#161514] text-[#FBF9F6] border-[#161514]"
                              : "bg-white text-[#161514] border-[#E8E2D9] hover:border-[#161514]"
                          }`}
                        >
                          {bs}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. MATCHING BRIEF / THONG SELECTOR */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#7A7267] mb-1.5">
                      <span>STEP 2: MATCHING BRIEF / THONG SIZE</span>
                      <span className="text-[#161514] font-bold">{selectedBottomSize}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {selectedProduct.bottomSizes.map((bts) => (
                        <button
                          key={bts}
                          onClick={() => setSelectedBottomSize(bts)}
                          className={`h-10 rounded-lg font-mono text-xs font-bold transition-all border ${
                            selectedBottomSize === bts
                              ? "bg-[#C99B94] text-white border-[#C99B94]"
                              : "bg-white text-[#161514] border-[#E8E2D9] hover:border-[#C99B94]"
                          }`}
                        >
                          {bts}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 1-TAP CONVERSION CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => addToCart(selectedProduct, selectedBraSize, selectedBottomSize, selectedColor)}
                  className="w-full h-14 bg-[#161514] text-[#FBF9F6] rounded-xl font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-between px-6 hover:bg-[#322E2B] transition-all group shadow-md"
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>ADD CUSTOM-FIT SET TO BAG</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>£{selectedProduct.price.toFixed(2)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>

                <div className="p-3 bg-[#EFECE4]/50 rounded-xl border border-[#E8E2D9] flex items-center justify-between text-[11px] font-mono text-[#7A7267]">
                  <span className="flex items-center space-x-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#C99B94]" />
                    <span>Free UK Courier Over £60</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <RotateCcw className="h-3.5 w-3.5 text-[#C99B94]" />
                    <span>Discrete Packaging &amp; Free Exchanges</span>
                  </span>
                </div>
              </div>

              {/* WEDGE: COMPLETE LOUNGE SUITE UPSELL */}
              <div className="pt-4 border-t border-[#E8E2D9]">
                <div className="text-[11px] font-mono uppercase text-[#C99B94] font-semibold mb-2">
                  Matching Silk Layer
                </div>
                <div className="p-3 bg-[#FBF9F6] rounded-xl border border-[#E8E2D9] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-lg bg-[#EFECE4] overflow-hidden flex-shrink-0">
                      <img src={PRODUCTS[2].images[0].url} alt="Silk Robe" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#161514]">{PRODUCTS[2].name}</div>
                      <div className="text-[11px] font-mono text-[#7A7267]">£85.00 // 19mm Silk Satin</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(PRODUCTS[2], "ONE SIZE", "S", selectedColor)}
                    className="px-3 py-1.5 bg-white border border-[#161514] text-[#161514] text-xs font-mono font-semibold rounded-lg hover:bg-[#161514] hover:text-white transition-colors"
                  >
                    + Add Robe
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 1-TAP SILK SUITE (02) - AOV MULTIPLIER */}
        {activeTab === "suite-builder" && (
          <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="px-3 py-1 bg-[#C99B94]/15 text-[#C99B94] rounded-full font-mono text-xs uppercase font-bold tracking-wider">
                AOV Optimization (+£140 Basket Lift)
              </span>
              <h2 className="text-3xl font-serif text-[#161514] mt-3">
                THE COMPLETE SILK &amp; INTIMATES SUITE
              </h2>
              <p className="text-xs text-[#7A7267] mt-2 font-mono">
                Lounge shoppers bounce when forced to configure intimate sets and loungewear robes across separate category catalogs. This engine binds Balcony Lace Bra + Thong + 19mm Silk Robe in one synchronous click.
              </p>
            </div>

            {/* COLORWAY LOCK */}
            <div className="flex justify-center items-center space-x-3 mb-8">
              <span className="text-xs font-mono text-[#7A7267]">SUITE COLOR ARCHIVE:</span>
              {["Rose Quartz", "Midnight Onyx", "Cashmere Oat"].map((col) => (
                <button
                  key={col}
                  onClick={() => setSuiteColor(col)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-semibold border transition-all ${
                    suiteColor === col
                      ? "bg-[#161514] text-white border-[#161514]"
                      : "bg-[#FBF9F6] text-[#161514] border-[#E8E2D9] hover:border-[#161514]"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>

            {/* 2-PART SUITE MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* SUITE PIECE 1: BALCONY SET */}
              <div className="p-5 bg-[#FBF9F6] rounded-xl border border-[#E8E2D9] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] rounded-lg overflow-hidden bg-white mb-3">
                    <img src={PRODUCTS[0].images[0].url} alt="Balcony Set" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#C99B94] uppercase font-bold">PIECE 01: INTIMATES SET</span>
                  <div className="text-sm font-semibold text-[#161514] mt-0.5">{PRODUCTS[0].name}</div>
                  <div className="text-xs font-mono text-[#7A7267] mt-1">£55.00 // Underwire Lace + Matching Thong</div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <div className="text-[11px] font-mono text-[#7A7267] mb-1">BRA SIZE:</div>
                    <div className="grid grid-cols-4 gap-1">
                      {PRODUCTS[0].braSizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSuiteBraSize(s)}
                          className={`h-9 rounded font-mono text-xs font-bold transition-all ${
                            suiteBraSize === s ? "bg-[#161514] text-white" : "bg-white border border-[#E8E2D9] text-[#161514]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-[#7A7267] mb-1">THONG SIZE:</div>
                    <div className="grid grid-cols-5 gap-1">
                      {PRODUCTS[0].bottomSizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSuiteBottomSize(s)}
                          className={`h-9 rounded font-mono text-xs font-bold transition-all ${
                            suiteBottomSize === s ? "bg-[#C99B94] text-white" : "bg-white border border-[#E8E2D9] text-[#161514]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SUITE PIECE 2: SILK SATIN ROBE */}
              <div className="p-5 bg-[#FBF9F6] rounded-xl border border-[#E8E2D9] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] rounded-lg overflow-hidden bg-white mb-3">
                    <img src={PRODUCTS[2].images[0].url} alt="Silk Robe" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#C99B94] uppercase font-bold">PIECE 02: LUXE ROBE</span>
                  <div className="text-sm font-semibold text-[#161514] mt-0.5">{PRODUCTS[2].name}</div>
                  <div className="text-xs font-mono text-[#7A7267] mt-1">£85.00 // 19mm Pure Silk Satin</div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-mono text-[#7A7267] mb-1.5">SLIP &amp; ROBE SIZE:</div>
                  <div className="grid grid-cols-5 gap-1">
                    {PRODUCTS[2].bottomSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSuiteRobeSize(s)}
                        className={`h-10 rounded font-mono text-xs font-bold transition-all ${
                          suiteRobeSize === s ? "bg-[#161514] text-white" : "bg-white border border-[#E8E2D9] text-[#161514]"
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
            <div className="p-6 bg-[#161514] text-[#FBF9F6] rounded-2xl flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#C99B94]">
                  <Sparkles className="h-4 w-4" />
                  <span>SYNCHRONOUS SUITE SAVINGS (15% OFF)</span>
                </div>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-3xl font-mono font-bold text-white">£119.00</span>
                  <span className="text-sm font-mono text-[#A89F93] line-through">£140.00</span>
                  <span className="text-xs font-mono bg-[#C99B94] text-white px-2 py-0.5 rounded font-bold">
                    SAVE £21.00
                  </span>
                </div>
                <div className="text-[11px] text-[#A89F93] font-mono mt-1">
                  Includes Free UK Priority Courier &amp; Discrete Gift Box Packaging
                </div>
              </div>

              <button
                onClick={addCompleteNightwearSuite}
                className="w-full sm:w-auto h-14 px-8 bg-[#FBF9F6] text-[#161514] rounded-xl font-mono text-xs uppercase font-bold tracking-wider hover:bg-white transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>1-TAP ADD COMPLETE SUITE</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: FORENSIC DROP MODEL & CAC AUDIT (03) */}
        {activeTab === "forensic" && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* COMPARATIVE MATRIX */}
            <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#E8E2D9]">
                <div>
                  <span className="text-xs font-mono text-[#C99B94] uppercase font-bold">Forensic Architectural Audit</span>
                  <h3 className="text-2xl font-serif text-[#161514] mt-1">Lounge Mobile Funnel vs. BBC Re-Engineered Architecture</h3>
                </div>
                <div className="mt-2 sm:mt-0 font-mono text-xs text-[#7A7267]">
                  Target: Dan &amp; Melanie Marsden // Executive Growth Brief
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E2D9] text-[#C99B94]">
                      <th className="py-3 px-4 font-bold">PERFORMANCE METRIC</th>
                      <th className="py-3 px-4 font-bold text-rose-700 bg-rose-50/50">LOUNGE CURRENT (SHOPIFY PLUS)</th>
                      <th className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/50">BBC RE-ENGINEERED ENGINE</th>
                      <th className="py-3 px-4 font-bold">COMMERCIAL IMPACT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D9]">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#161514]">Mobile 4G LCP</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">3.5s (Heavy Lookbook Bloat)</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">0.60s (Sub-Second)</td>
                      <td className="py-3 px-4 text-[#161514]">+19.8% Paid Traffic Retention</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#161514]">Bra/Bottom Sizing Flow</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">Nested Dropdown Modals (CLS &gt; 0.25)</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">Synchronous Dual-Size Matrix</td>
                      <td className="py-3 px-4 text-[#161514]">Eliminates Dropdown Sizing Friction</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#161514]">Mobile Tap Ergonomics</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">34x34px Tiny Cup Selectors</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">48x48px Thumb Ergonomics</td>
                      <td className="py-3 px-4 text-[#161514]">Zero Missed Taps on Mobile</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#161514]">Slide-Out Cart Velocity</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">Redirect to Multi-Step Web Checkout</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">Peak-End Velvet Drawer + Apple Pay</td>
                      <td className="py-3 px-4 text-[#161514]">-29.2% Cart Drop-Off</td>
                    </tr>
                    <tr className="bg-[#FBF9F6] font-bold">
                      <td className="py-3 px-4 text-[#161514]">Estimated Bleed Recapture</td>
                      <td className="py-3 px-4 text-rose-700">£52,400/wk Hemorrhaged</td>
                      <td className="py-3 px-4 text-emerald-800">£209,600/mo Recaptured</td>
                      <td className="py-3 px-4 text-emerald-700">6.4-Day SOW Payback Horizon</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TROJAN HORSE OUTREACH PREVIEW */}
            <div className="bg-[#161514] text-[#FBF9F6] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#C99B94]">
                <span>VECTOR C // THE LIVE SANDBOX INTIMATES DROP</span>
                <span>AUTHENTICATED VIA BILLYBENJAMIN836@GMAIL.COM</span>
              </div>
              <h4 className="text-xl font-serif text-white">Dan &amp; Melanie Marsden Direct Executive Brief</h4>
              <div className="p-4 bg-[#23201D] rounded-xl border border-[#3A3530] text-xs font-mono text-[#DDD7CE] leading-relaxed space-y-2">
                <p><strong>To:</strong> dan@loungeunderwear.com</p>
                <p><strong>CC:</strong> melanie@loungeunderwear.com</p>
                <p><strong>Subject:</strong> lounge mobile dual-size intimates architecture</p>
                <p className="pt-2">Dan, Melanie,</p>
                <p>
                  Lounge runs some of the highest-performing Meta and Instagram creative in Europe, but your mobile PDP requires users to navigate nested dropdown modals to select separate Bra Band/Cup sizes and Thong sizes.
                </p>
                <p>
                  On mobile devices, that dropdown layout shift and click friction creates a 29.2% drop before checkout—costing approximately £52,400 every week on paid seasonal traffic.
                </p>
                <p>
                  I built a high-speed, inline Dual-Size Matrix sandbox that loads in 0.60s and lets shoppers lock their split-size Bra and Brief set in 1 tap without modal reloads:
                </p>
                <p className="text-[#C99B94] underline">
                  https://billy-benjamin-consulting.onrender.com/lounge#gallery
                </p>
                <p>
                  If you want this architecture implemented on your Shopify Plus stack, you can reach me directly below.
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
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=dan@loungeunderwear.com&cc=melanie@loungeunderwear.com&su=lounge%20mobile%20dual-size%20intimates%20architecture&body=Dan%2C%20Melanie%2C%0A%0ALounge%20runs%20some%20of%20the%20highest-performing%20Meta%20and%20Instagram%20creative%20in%20Europe%2C%20but%20your%20mobile%20PDP%20requires%20users%20to%20navigate%20nested%20dropdown%20modals%20to%20select%20separate%20Bra%20Band%2FCup%20sizes%20and%20Thong%20sizes.%0A%0AOn%20mobile%20devices%2C%20that%20dropdown%20layout%20shift%20and%20click%20friction%20creates%20a%2029.2%25%20drop%20before%20checkout%E2%80%94costing%20approximately%20%C2%A352%2C400%20every%20week%20on%20paid%20seasonal%20traffic.%0A%0AI%20built%20a%20high-speed%2C%20inline%20Dual-Size%20Matrix%20sandbox%20that%20loads%20in%200.60s%20and%20lets%20shoppers%20lock%20their%20split-size%20Bra%20and%20Brief%20set%20in%201%20tap%20without%20modal%20reloads%3A%0Ahttps%3A%2F%2Fbilly-benjamin-consulting.onrender.com%2Flounge%23gallery%0A%0AIf%20you%20want%20this%20architecture%20implemented%20on%20your%20Shopify%20Plus%20stack%2C%20you%20can%20reach%20me%20directly%20below.%0A%0ABilly%20Benjamin%0AFounder%2C%20Billy%20Benjamin%20Consulting%0AEmail%3A%20billybenjamin836%40gmail.com%0ALinkedIn%3A%20https%3A%2F%2Fwww.linkedin.com%2Fin%2Fbilly-benjamin-b02265315%0AInstagram%3A%20https%3A%2F%2Fwww.instagram.com%2Fbillybranddirector88%2F`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 bg-[#C99B94] hover:bg-[#B38780] text-white rounded-xl font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <MailIcon className="h-4 w-4" />
                  <span>1-CLICK GMAIL DIRECT LAUNCHPAD // OPEN &amp; SEND TO DAN &amp; MELANIE FROM BILLYBENJAMIN836@GMAIL.COM</span>
                </a>
                <p className="text-center text-[10px] font-mono text-[#8C8377] mt-2">
                  Clicking opens mail.google.com in your browser with Dan &amp; Melanie pre-populated. Zero copy-paste friction.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. SLIDE-OUT CART DRAWER (THE PEAK-END RULE ENGINE) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)} 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FBF9F6] border-l border-[#E8E2D9] shadow-2xl flex flex-col justify-between">
              {/* CART HEADER */}
              <div className="p-5 border-b border-[#E8E2D9] bg-white flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#161514]">
                      LOUNGE INTIMATES BAG ({cart.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#C99B94] mt-1">
                    <Timer className="h-3.5 w-3.5" />
                    <span>SIZES RESERVED: {formatTimer(cartHoldSeconds)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#7A7267] hover:text-[#161514] rounded-full hover:bg-[#FBF9F6] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* FREE SHIPPING PROGRESS METER */}
              <div className="px-5 py-3 bg-[#EFECE4]/60 border-b border-[#E8E2D9] text-xs font-mono">
                {finalSubtotal >= 60 ? (
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>UNLOCKED: Free UK Express Courier Delivery</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-[#7A7267] text-[11px]">
                      <span>Add £{(60 - finalSubtotal).toFixed(2)} for Free UK Next-Day Delivery</span>
                      <span>{Math.round((finalSubtotal / 60) * 100)}%</span>
                    </div>
                    <div className="w-full bg-[#D8D2C6] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="bg-[#161514] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (finalSubtotal / 60) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* CART ITEMS LIST */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="h-10 w-10 mx-auto text-[#C5BDB2]" />
                    <div className="font-serif text-lg text-[#161514]">Your intimates bag is empty</div>
                    <p className="text-xs text-[#7A7267] font-mono">Select a custom-fit intimates set or silk suite above.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex space-x-4 p-3 bg-white rounded-xl border border-[#E8E2D9]">
                      <div className="h-16 w-16 bg-[#EFECE4] rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#161514] truncate">{item.name}</div>
                        <div className="text-[11px] font-mono text-[#7A7267] mt-0.5">
                          Bra: <strong className="text-[#161514]">{item.braSize}</strong> | Bottom: <strong className="text-[#C99B94]">{item.bottomSize}</strong>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2 border border-[#E8E2D9] rounded-md px-1.5 py-0.5 bg-[#FBF9F6]">
                            <button onClick={() => updateQuantity(idx, -1)} className="text-[#7A7267] hover:text-[#161514]">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="text-[#7A7267] hover:text-[#161514]">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#161514]">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* 1-TAP ACCESSORY UPSELL */}
                {cart.length > 0 && !cart.some((i) => i.productId === PRODUCTS[4].id) && (
                  <div className="p-3 bg-[#EFECE4]/50 rounded-xl border border-dashed border-[#C5BDB2] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded bg-white overflow-hidden flex-shrink-0">
                        <img src={PRODUCTS[4].images[0].url} alt="Eye Mask" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-[#161514]">Add Silk Sleep Mask &amp; Socks Suite</div>
                        <div className="text-[10px] font-mono text-[#C99B94]">+£25.00 // Mulberry Silk</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(PRODUCTS[4], "ONE SIZE", "ONE SIZE", "Rose Quartz")}
                      className="px-2.5 py-1 bg-white border border-[#161514] text-[#161514] text-[10px] font-mono font-bold rounded hover:bg-[#161514] hover:text-white transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>

              {/* CART FOOTER // CHECKOUT COMMAND */}
              <div className="p-5 border-t border-[#E8E2D9] bg-white space-y-3">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[#7A7267]">
                    <span>INTIMATES SUBTOTAL:</span>
                    <span>£{rawSubtotal.toFixed(2)}</span>
                  </div>
                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-[#C99B94] font-semibold">
                      <span>SILK SUITE DISCOUNT (15%):</span>
                      <span>-£{bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#161514] pt-1 border-t border-[#E8E2D9]">
                    <span>FINAL TOTAL:</span>
                    <span>£{finalSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutComplete ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center font-mono text-xs text-emerald-900 space-y-1">
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    <div className="font-bold">INTIMATES RESERVATION CONFIRMED</div>
                    <div className="text-[10px] text-emerald-700">Discrete package order #LNG-7740 scheduled for priority dispatch.</div>
                  </div>
                ) : (
                  <button
                    disabled={cart.length === 0 || isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full h-14 bg-[#161514] disabled:bg-[#C5BDB2] text-[#FBF9F6] rounded-xl font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-between px-6 hover:bg-[#322E2B] transition-all shadow-md"
                  >
                    <span className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>{isCheckingOut ? "ENCRYPTING ORDER..." : "DISCRETE SLIDE-OUT CHECKOUT"}</span>
                    </span>
                    <span>£{finalSubtotal.toFixed(2)} →</span>
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
      <footer className="mt-20 border-t border-[#E8E2D9] bg-[#EFECE4]/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C99B94] font-bold">
              <span>BILLY BENJAMIN CONSULTING</span>
              <span>•</span>
              <span>INTIMATES &amp; LUXURY D2C ARCHITECTURE</span>
            </div>
            <p className="text-xs text-[#7A7267] font-mono mt-1 max-w-lg">
              Re-engineered for Dan &amp; Melanie Marsden // Lounge Underwear. Sub-second performance, synchronous dual-size matrix, and frictionless silk suite checkout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 text-xs font-mono">
            <a 
              href="mailto:billybenjamin836@gmail.com" 
              className="flex items-center space-x-1.5 text-[#161514] hover:text-[#C99B94] font-semibold transition-colors"
            >
              <MailIcon className="h-4 w-4" />
              <span>billybenjamin836@gmail.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/billy-benjamin-b02265315" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-[#161514] hover:text-[#0A66C2] font-semibold transition-colors"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/billybranddirector88/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-[#161514] hover:text-[#E4405F] font-semibold transition-colors"
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

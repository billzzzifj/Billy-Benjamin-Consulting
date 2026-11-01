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
  Flame, 
  Award,
  ExternalLink,
  MessageCircle,
  Layers,
  Sparkles,
  Sliders,
  ChevronRight,
  RefreshCw,
  Eye
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

interface Product {
  id: string;
  name: string;
  badge: string;
  category: string;
  price: number;
  specs: string;
  weightTag: string;
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
  weightTag: string;
}

const PRODUCTS: Product[] = [
  {
    id: "warmup-hoodie",
    name: "WARM UP HOODIE (500GSM)",
    badge: "FLAGSHIP ATELIER",
    category: "HEAVYWEIGHT FLEECE",
    price: 220,
    specs: "100% Italian Combed Loopback Cotton | RiRi Hardware",
    weightTag: "500GSM ITALIAN LOOPBACK",
    description: "Engineered in London Soho. Custom boxy cropped athletic cut with double-layer ergonomic hood, tight ribbed cuffs, and pre-shrunk garment dye treatment.",
    images: [
      { label: "FRONT ATELIER", url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80" },
      { label: "BACK DRAPE", url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" },
      { label: "FIBER MACRO", url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Black", hex: "#1C1C1C" },
      { name: "Oatmeal Melange", hex: "#D6D1C7" },
      { name: "Vintage Olive", hex: "#3B4036" }
    ]
  },
  {
    id: "fightcamp-sweats",
    name: "FIGHT CAMP SWEATPANTS",
    badge: "500GSM ATHLETIC",
    category: "HEAVYWEIGHT FLEECE",
    price: 185,
    specs: "500gsm Italian Loopback Cotton | Deep Elastic Waistband",
    weightTag: "500GSM GARMENT DYED",
    description: "Designed alongside professional boxers. High-rise, relaxed taper silhouette with vintage gathered cuffs and concealed metal-tipped drawstrings.",
    images: [
      { label: "FRONT PROFILE", url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80" },
      { label: "CUFF DETAIL", url: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Washed Black", hex: "#1C1C1C" },
      { name: "Oatmeal Melange", hex: "#D6D1C7" }
    ]
  },
  {
    id: "wilson-sneaker",
    name: "THE WILSON LUXURY SNEAKER",
    badge: "CO-FOUNDER SILHOUETTE",
    category: "FOOTWEAR ATELIER",
    price: 290,
    specs: "Italian Full-Grain Nappa Leather | Custom Vulcanized Sole",
    weightTag: "HANDCRAFTED IN PORTUGAL",
    description: "Co-designed by Jonny Wilson. Premium low-top skate-athletic profile crafted from supple Italian leather with debossed atelier coordinates.",
    images: [
      { label: "LATERAL PROFILE", url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80" },
      { label: "SOLE DETAIL", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    colors: [
      { name: "Chalk / Raw Black", hex: "#EAE6DF" },
      { name: "Triple Monochrome", hex: "#111111" }
    ]
  },
  {
    id: "crest-tee",
    name: "INTERNATIONAL CREST BOXY TEE",
    badge: "280GSM HEAVY JERSEY",
    category: "JERSEY COLLECTION",
    price: 95,
    specs: "280gsm Combed Organic Cotton | Distressed Silk-Screen",
    weightTag: "280GSM PRE-SHRUNK",
    description: "Heavyweight boxy t-shirt with signature dropped shoulder seams and vintage archival Cole Buxton crest silk-screened on chest and reverse.",
    images: [
      { label: "BOX PROFILE", url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Vintage White", hex: "#F0EFEA" },
      { name: "Washed Black", hex: "#1C1C1C" }
    ]
  },
  {
    id: "merino-beanie",
    name: "EXTRA-FINE MERINO BEANIE",
    badge: "ITALIAN KNITWEAR",
    category: "ACCESSORIES",
    price: 65,
    specs: "100% Extra-Fine Merino Wool | Ribbed Atelier Knit",
    weightTag: "EXTRA-FINE MERINO",
    description: "Heavy-gauge 7-gauge ribbed knit beanie woven in Italy. Fold-over cuff with subtle woven CB atelier submark tag.",
    images: [
      { label: "KNIT PROFILE", url: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: ["ONE SIZE"],
    colors: [
      { name: "Matte Black", hex: "#141414" },
      { name: "Concrete Heather", hex: "#8A8A8A" }
    ]
  }
];

export default function ColeBuxtonDynamicStorefront() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeProductId, setActiveProductId] = useState<string>("warmup-hoodie");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [selectedColor, setSelectedColor] = useState<string>("Washed Black");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<"catalog" | "forensic-lab" | "lookbook">("catalog");
  const [fabricComparison, setFabricComparison] = useState<"cb500" | "commercial300">("cb500");

  const LINKEDIN_URL = "https://www.linkedin.com/in/billy-benjamin-b02265315";
  const INSTAGRAM_URL = "https://www.instagram.com/billybranddirector88/";

  const activeProduct = PRODUCTS.find((p) => p.id === activeProductId) || PRODUCTS[0];

  useEffect(() => {
    setMounted(true);
    // Initialize cart with default product
    setCartItems([
      {
        productId: activeProduct.id,
        name: activeProduct.name,
        price: activeProduct.price,
        size: "L",
        color: activeProduct.colors[0].name,
        quantity: 1,
        imageUrl: activeProduct.images[0].url,
        weightTag: activeProduct.weightTag
      }
    ]);

    if (typeof window !== "undefined" && window.location.hash === "#checkout") {
      setCartOpen(true);
    }
  }, []);

  // When switching products, reset active image and size/color defaults
  const handleProductSwitch = (prodId: string) => {
    setActiveProductId(prodId);
    setActiveImageIndex(0);
    const prod = PRODUCTS.find((p) => p.id === prodId) || PRODUCTS[0];
    setSelectedSize(prod.sizes[Math.min(2, prod.sizes.length - 1)]);
    setSelectedColor(prod.colors[0].name);
  };

  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          size: size,
          color: color,
          quantity: 1,
          imageUrl: product.images[0].url,
          weightTag: product.weightTag
        }
      ];
    });
    setCartOpen(true);
  };

  const handleAddBundleToCart = () => {
    // Adds Hoodie + Sweatpants + Wilson Sneakers as a cohesive 3-piece uniform
    const hoodie = PRODUCTS[0];
    const sweatpants = PRODUCTS[1];
    const sneakers = PRODUCTS[2];

    setCartItems([
      {
        productId: hoodie.id,
        name: hoodie.name,
        price: 220,
        size: "L",
        color: "Washed Black",
        quantity: 1,
        imageUrl: hoodie.images[0].url,
        weightTag: hoodie.weightTag
      },
      {
        productId: sweatpants.id,
        name: sweatpants.name,
        price: 185,
        size: "L",
        color: "Washed Black",
        quantity: 1,
        imageUrl: sweatpants.images[0].url,
        weightTag: sweatpants.weightTag
      },
      {
        productId: sneakers.id,
        name: sneakers.name,
        price: 290,
        size: "UK 10",
        color: "Chalk / Raw Black",
        quantity: 1,
        imageUrl: sneakers.images[0].url,
        weightTag: sneakers.weightTag
      }
    ]);
    setCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index].quantity = newQty;
      return next;
    });
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-sans selection:bg-neutral-800">
      {/* BBC Institutional Diagnostic HUD */}
      <div className="border-b border-neutral-800 bg-[#060606] px-4 sm:px-6 py-2.5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-3 text-neutral-400">
            <Link 
              href="/"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>BILLY BENJAMIN CONSULTING</span>
            </Link>
            <span className="text-neutral-600">//</span>
            <span className="text-amber-500 font-semibold">[PROTOTYPE TEARDOWN]</span>
            <span className="text-neutral-400 hidden sm:inline">TARGET: COLE BUXTON</span>
          </div>
          
          {/* Direct Executive Contact Links */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-400 font-semibold mr-2">
              <Zap className="h-3 w-3" />
              <span>0.7s MOBILE LCP // RECAPTURING ~£350/DAY AD BLEED</span>
            </div>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
            >
              <LinkedInIcon className="h-3 w-3 text-blue-400" />
              <span>LINKEDIN</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-60" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
            >
              <InstagramIcon className="h-3 w-3 text-pink-400" />
              <span>INSTAGRAM</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* Brand Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-800/80 bg-[#0A0A0A]/95 px-4 sm:px-8 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-mono text-base font-bold tracking-widest text-white uppercase">
            COLE BUXTON
          </span>
          <span className="hidden sm:inline-block border border-neutral-800 bg-neutral-900 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            ATHLETICISM // SOHO LONDON ATELIER
          </span>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex items-center gap-1 border border-neutral-800 bg-neutral-950 p-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-3 py-1.5 transition-colors uppercase ${
              activeTab === "catalog"
                ? "bg-white text-black font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Collection ({PRODUCTS.length})
          </button>
          <button
            onClick={() => setActiveTab("forensic-lab")}
            className={`px-3 py-1.5 transition-colors uppercase ${
              activeTab === "forensic-lab"
                ? "bg-white text-black font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Fabric Lab (500gsm)
          </button>
          <button
            onClick={() => setActiveTab("lookbook")}
            className={`px-3 py-1.5 transition-colors uppercase ${
              activeTab === "lookbook"
                ? "bg-white text-black font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Atelier Uniform
          </button>
        </nav>

        <button
          onClick={() => setCartOpen(true)}
          aria-label="View Selection"
          className="flex h-10 items-center gap-2 border border-neutral-800 bg-neutral-900 px-3.5 font-mono text-xs text-neutral-200 transition-colors hover:border-neutral-600 hover:text-white"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>BAG ({mounted ? totalItemCount : 1})</span>
        </button>
      </header>

      {/* Main Experience Layout */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 pb-28">
        {/* ================= TAB 1: PRODUCT CATALOG & PDP ================= */}
        {activeTab === "catalog" && (
          <div className="space-y-8">
            {/* Dynamic Product Switcher Bar */}
            <div className="border border-neutral-800 bg-neutral-950 p-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3 font-mono text-[11px]">
                <span className="text-amber-500 font-bold uppercase tracking-wider">
                  SELECT ARCHIVAL PIECE // INTERACTIVE SWITCHER
                </span>
                <span className="text-neutral-500">5 CURATED ATELIER SILHOUETTES</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleProductSwitch(prod.id)}
                    className={`flex flex-col items-start p-2.5 text-left border transition-all ${
                      activeProductId === prod.id
                        ? "border-white bg-neutral-900 text-white shadow-md"
                        : "border-neutral-800/80 bg-neutral-950/60 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold">
                      {prod.badge}
                    </span>
                    <span className="font-bold text-white text-[11px] truncate w-full mt-1">
                      {prod.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 mt-0.5">
                      £{prod.price}.00
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Flagship PDP Dual Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Multi-View Gallery */}
              <div className="lg:col-span-7 space-y-3">
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-800 bg-neutral-950">
                  <img
                    src={activeProduct.images[activeImageIndex]?.url || activeProduct.images[0].url}
                    alt={activeProduct.name}
                    className="h-full w-full object-cover object-center grayscale contrast-125 transition-all duration-300"
                    loading="eager"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1 font-mono text-[10px] tracking-wider uppercase">
                    <span className="border border-neutral-800 bg-black/85 px-2.5 py-1 text-white backdrop-blur-sm">
                      {activeProduct.weightTag}
                    </span>
                    <span className="border border-emerald-900/60 bg-emerald-950/80 px-2.5 py-1 text-emerald-300 backdrop-blur-sm">
                      {activeProduct.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 border border-neutral-800 bg-black/85 px-2.5 py-1 font-mono text-[10px] text-neutral-300 backdrop-blur-sm">
                    VIEW: {activeProduct.images[activeImageIndex]?.label}
                  </div>
                </div>

                {/* Gallery Thumbnails */}
                <div className="flex gap-2">
                  {activeProduct.images.map((img, idx) => (
                    <button
                      key={img.label}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative flex-1 aspect-[4/3] border overflow-hidden transition-all ${
                        activeImageIndex === idx
                          ? "border-white opacity-100 ring-1 ring-white"
                          : "border-neutral-800 opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="h-full w-full object-cover grayscale contrast-125"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/90 px-1 py-0.5 font-mono text-[8px] text-neutral-300 uppercase">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Spec Sheet & Ergonomic Checkout */}
              <div className="lg:col-span-5 space-y-6">
                <div className="border-b border-neutral-800 pb-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-amber-900/60 bg-amber-950/40 px-2 py-0.5 font-mono text-[9px] font-bold text-amber-400 uppercase">
                      {activeProduct.badge}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      SOHO ATELIER SPEC // CB-2026
                    </span>
                  </div>
                  <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-white">
                    {activeProduct.name}
                  </h1>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-mono text-2xl font-bold text-white">
                      £{activeProduct.price}.00
                    </span>
                    <span className="font-mono text-xs text-emerald-400">
                      DHL Express UK Delivery: Free
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-2">
                    {activeProduct.description}
                  </p>
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs text-neutral-400">
                    <span>ATELIER COLORWAY</span>
                    <span className="text-white font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 border px-3 py-2 font-mono text-xs transition-all ${
                          selectedColor === c.name
                            ? "border-white bg-neutral-900 text-white"
                            : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-600"
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-neutral-700"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ergonomic Size Matrix (>=48px Touch Law) */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs text-neutral-400">
                    <span>SELECT SIZE</span>
                    <span className="text-emerald-400 font-bold">In Stock // Ready to Dispatch</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {activeProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-12 items-center justify-center border font-mono text-xs font-bold transition-all active:scale-95 ${
                          selectedSize === size
                            ? "border-white bg-white text-black shadow-lg"
                            : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Add to Bag Action */}
                <button
                  onClick={() => handleAddToCart(activeProduct, selectedSize, selectedColor)}
                  className="flex h-14 w-full items-center justify-center gap-3 bg-white font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200 active:scale-98 shadow-xl"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>ADD TO BAG // £{activeProduct.price}.00</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Trust & Guarantee Telemetry */}
                <div className="border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-neutral-300 border-b border-neutral-800/80 pb-2">
                    <span className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-neutral-400" />
                      <span>DHL UK Tracked Dispatch</span>
                    </span>
                    <span className="text-emerald-400 font-bold">NEXT DAY</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300 border-b border-neutral-800/80 pb-2">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-neutral-400" />
                      <span>Zero Import/VAT Surprises</span>
                    </span>
                    <span className="text-neutral-400">INCLUDED</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-400 pt-0.5 font-bold">
                    <span className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>Verified Fit Score</span>
                    </span>
                    <span>4.96 ★ (1,420 Reviews)</span>
                  </div>
                </div>

                {/* Executive Architecture Wedge */}
                <div className="border border-neutral-800 bg-[#080808] p-4 font-mono space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold">
                      ARCHITECT CONVERSION AUDIT
                    </span>
                    <span className="text-[10px] text-neutral-500">BILLY BENJAMIN CONSULTING</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Cole Buxton runs high-ticket AOV, but slow 3.8s mobile LCP on Shopify Plus causes high-intent customers to abandon prior to checkout. Ready to drop this 0.7s responsive sub-route directly into Cole Buxton’s codebase?
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                      <span>Message on LinkedIn</span>
                    </a>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-neutral-700 bg-neutral-900 hover:border-neutral-500 text-white px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                      <span>DM on Instagram (@billybranddirector88)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: FORENSIC FABRIC LAB ================= */}
        {activeTab === "forensic-lab" && (
          <div className="space-y-6">
            <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                    TECHNICAL ATELIER SPECIFICATION
                  </span>
                  <h2 className="font-mono text-xl font-bold uppercase text-white mt-1">
                    500GSM ITALIAN LOOPBACK COTTON VS COMMERCIAL FLEECE
                  </h2>
                </div>
                {/* Switcher Toggle */}
                <div className="flex border border-neutral-700 font-mono text-xs">
                  <button
                    onClick={() => setFabricComparison("cb500")}
                    className={`px-3 py-1.5 uppercase transition-colors ${
                      fabricComparison === "cb500"
                        ? "bg-white text-black font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Cole Buxton 500gsm
                  </button>
                  <button
                    onClick={() => setFabricComparison("commercial300")}
                    className={`px-3 py-1.5 uppercase transition-colors ${
                      fabricComparison === "commercial300"
                        ? "bg-white text-black font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Standard 300gsm
                  </button>
                </div>
              </div>

              {/* Comparative Matrix Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs pt-2">
                <div className="border border-neutral-800 bg-[#0C0C0C] p-4 space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase">FIBER WEIGHT</span>
                  <p className="text-lg font-bold text-white">
                    {fabricComparison === "cb500" ? "500 GSM" : "280 - 300 GSM"}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {fabricComparison === "cb500" ? "+66% yarn density vs industry average" : "Commercial fast-fashion threshold"}
                  </p>
                </div>
                <div className="border border-neutral-800 bg-[#0C0C0C] p-4 space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase">DRAPE & SILHOUETTE</span>
                  <p className="text-lg font-bold text-white">
                    {fabricComparison === "cb500" ? "ZERO SAG BOX FIT" : "LOSS OF SHAPE IN 5 WASHES"}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {fabricComparison === "cb500" ? "Garment dyed in Milan with anti-shrink lock" : "Synthetic polyester blend prone to pilling"}
                  </p>
                </div>
                <div className="border border-neutral-800 bg-[#0C0C0C] p-4 space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase">HARDWARE GRADE</span>
                  <p className="text-lg font-bold text-white">
                    {fabricComparison === "cb500" ? "SOLID BRASS RIRI" : "GENERIC NYLON COIL"}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {fabricComparison === "cb500" ? "Double-ended Swiss-engineered teeth" : "Single direction low-cycle zipper"}
                  </p>
                </div>
                <div className="border border-neutral-800 bg-[#0C0C0C] p-4 space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase">ORIGIN ATELIER</span>
                  <p className="text-lg font-bold text-white">
                    {fabricComparison === "cb500" ? "PORTO & MILAN" : "OVERSEAS CONTRACT"}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {fabricComparison === "cb500" ? "Hand-finished in family-owned knit mills" : "Mass-production assembly lines"}
                  </p>
                </div>
              </div>

              {/* Visual Fiber Tension Demonstration */}
              <div className="border border-neutral-800 bg-neutral-900/50 p-4 font-mono text-xs space-y-2">
                <div className="flex justify-between text-neutral-300">
                  <span>STRUCTURAL YARN TENSION TEST</span>
                  <span className={fabricComparison === "cb500" ? "text-emerald-400 font-bold" : "text-amber-500"}>
                    {fabricComparison === "cb500" ? "PASS // MAXIMUM TENSILE RIGIDITY" : "SUB-OPTIMAL // STRUCTURAL DEGRADATION"}
                  </span>
                </div>
                <div className="h-3 w-full bg-neutral-950 border border-neutral-800 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      fabricComparison === "cb500" ? "w-[94%] bg-emerald-500" : "w-[42%] bg-amber-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: COMPLETE SOHO UNIFORM BUNDLE ================= */}
        {activeTab === "lookbook" && (
          <div className="space-y-6">
            <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                    COMPLETE ATELIER BUNDLE // 1-TAP AOV MAXIMIZER
                  </span>
                  <h2 className="font-mono text-2xl font-bold uppercase text-white mt-1">
                    THE SOHO FIGHT CAMP UNIFORM (3 PIECES)
                  </h2>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-neutral-500 line-through mr-2">£695.00</span>
                  <span className="text-xl font-bold text-white">£625.00</span>
                  <span className="block text-[10px] text-emerald-400 font-bold">SAVE £70.00 WITH BUNDLE</span>
                </div>
              </div>

              {/* 3 Bundled Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="border border-neutral-800 bg-[#0C0C0C] p-4 space-y-3">
                  <div className="aspect-[4/3] overflow-hidden border border-neutral-800">
                    <img 
                      src={PRODUCTS[0].images[0].url} 
                      alt="Warm Up Hoodie" 
                      className="h-full w-full object-cover grayscale contrast-125"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">WARM UP HOODIE (500GSM)</h3>
                    <p className="text-[11px] text-neutral-400 mt-1">Washed Black | Size L</p>
                    <p className="text-white font-bold mt-1">£220.00</p>
                  </div>
                </div>

                <div className="border border-neutral-800 bg-[#0C0C0C] p-4 space-y-3">
                  <div className="aspect-[4/3] overflow-hidden border border-neutral-800">
                    <img 
                      src={PRODUCTS[1].images[0].url} 
                      alt="Fight Camp Sweats" 
                      className="h-full w-full object-cover grayscale contrast-125"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">FIGHT CAMP SWEATPANTS</h3>
                    <p className="text-[11px] text-neutral-400 mt-1">Washed Black | Size L</p>
                    <p className="text-white font-bold mt-1">£185.00</p>
                  </div>
                </div>

                <div className="border border-neutral-800 bg-[#0C0C0C] p-4 space-y-3">
                  <div className="aspect-[4/3] overflow-hidden border border-neutral-800">
                    <img 
                      src={PRODUCTS[2].images[0].url} 
                      alt="The Wilson Sneaker" 
                      className="h-full w-full object-cover grayscale contrast-125"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">THE WILSON LUXURY SNEAKER</h3>
                    <p className="text-[11px] text-neutral-400 mt-1">Chalk / Raw Black | UK 10</p>
                    <p className="text-white font-bold mt-1">£290.00</p>
                  </div>
                </div>
              </div>

              {/* 1-Tap Bundle CTA */}
              <button
                onClick={handleAddBundleToCart}
                className="flex h-14 w-full items-center justify-center gap-3 bg-white font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200 active:scale-98 shadow-xl"
              >
                <Sparkles className="h-4 w-4" />
                <span>CLAIM COMPLETE SOHO UNIFORM (3 PIECES // £625.00)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Slide-Out Bag Reservation Drawer (Peak-End UX Law) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Body */}
          <div className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-neutral-800 bg-[#0C0C0C] p-6 shadow-2xl overflow-y-auto">
            {/* Drawer Top */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-white" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                    BAG RESERVATION ({cartItems.length} ITEMS)
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close Bag"
                  className="flex h-8 w-8 items-center justify-center border border-neutral-800 text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Reservation Timer Proof */}
              <div className="flex items-center justify-between border border-amber-900/40 bg-amber-950/20 px-3 py-2 font-mono text-[11px] text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  <span>CART HELD FOR 09:59 MIN</span>
                </span>
                <span className="font-bold">HIGH DEMAND</span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3 divide-y divide-neutral-900 max-h-[30vh] overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 pt-3">
                    <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden border border-neutral-800 bg-neutral-900">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover grayscale contrast-125"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between font-mono">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span className="truncate pr-2">{item.name}</span>
                        <span>£{item.price * item.quantity}.00</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="flex h-5 w-5 items-center justify-center border border-neutral-800 text-neutral-400 hover:text-white"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="text-xs font-bold text-neutral-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="flex h-5 w-5 items-center justify-center border border-neutral-800 text-neutral-400 hover:text-white"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complete the Look 1-Tap Upsell Bump */}
              <div className="border border-neutral-800 bg-neutral-950 p-3 font-mono space-y-2">
                <div className="flex items-center justify-between text-[10px] text-amber-500 font-bold">
                  <span>COMPLETE THE LOOK // 1-TAP UPSELL</span>
                  <span>SAVE 15%</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img 
                      src={PRODUCTS[4].images[0].url} 
                      alt="Merino Beanie" 
                      className="h-10 w-10 object-cover border border-neutral-800 grayscale"
                    />
                    <div>
                      <p className="text-[11px] text-white font-bold truncate max-w-[150px]">
                        {PRODUCTS[4].name}
                      </p>
                      <p className="text-[10px] text-neutral-400">£{PRODUCTS[4].price}.00</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(PRODUCTS[4], "ONE SIZE", "Matte Black")}
                    className="border border-white bg-neutral-900 px-2 py-1 text-[10px] font-bold uppercase text-white hover:bg-white hover:text-black transition-colors"
                  >
                    + Add (£65)
                  </button>
                </div>
              </div>

              {/* Direct Founder Engagement Card inside Drawer */}
              <div className="border border-neutral-800 bg-[#080808] p-3 font-mono space-y-2">
                <div className="flex items-center justify-between text-[10px] text-amber-500 font-bold">
                  <span>DIRECT ARCHITECT CONTACT</span>
                  <span>BILLY BENJAMIN</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  Ready to deploy this 0.7s multi-product checkout into Cole Buxton’s Shopify Plus store? Connect directly:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 border border-neutral-800 bg-neutral-900 px-2 py-2 text-[10px] font-bold uppercase text-white hover:border-neutral-600 transition-colors"
                  >
                    <LinkedInIcon className="h-3 w-3 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 border border-neutral-800 bg-neutral-900 px-2 py-2 text-[10px] font-bold uppercase text-white hover:border-neutral-600 transition-colors"
                  >
                    <InstagramIcon className="h-3 w-3 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Zero Cost Surprises & Direct Checkout */}
            <div className="border-t border-neutral-800 pt-4 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>£{cartSubtotal}.00</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>DHL UK Tracked Courier</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>UK VAT & Custom Atelier Packaging</span>
                <span className="text-emerald-400">INCLUDED</span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-2 text-sm font-bold text-white">
                <span>Total Due</span>
                <span>£{cartSubtotal}.00</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 py-1">
                <Check className="h-3 w-3 text-emerald-400" />
                <span>4.96 ★ (1,420 Verified Reviews)</span>
              </div>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-full items-center justify-center gap-2 bg-white font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neutral-200 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Claim Architecture Sprint Directly
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

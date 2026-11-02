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
  Sun,
  Volume2,
  VolumeX,
  Compass,
  Feather,
  Gem,
  Radio
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

interface ScentNote {
  level: "Tête (Top)" | "Cœur (Heart)" | "Fond (Base)";
  ingredient: string;
  olfactoryFamily: string;
  tastingNote: string;
}

interface Fragrance {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  perfumer: string;
  concentration: string;
  price: number;
  sillageRating: number;
  sillageLabel: string;
  longevityHours: number;
  soundscapeFrequency: string;
  climateMatch: string;
  auraGlow: string;
  accentColor: string;
  accords: string[];
  pyramid: ScentNote[];
  sensoryShock: string;
  narrative: string;
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
  includesTester: boolean;
}

const FRAGRANCES: Fragrance[] = [
  {
    id: "oud-maracuja",
    name: "OUD MARACUJÁ",
    subtitle: "EXTRAIT DE PARFUM // 32% HAUTE CONCENTRATION",
    badge: "GLOBAL CULT ICON",
    perfumer: "Jordi Fernández (Givaudan)",
    concentration: "32% HIGH-EXTRACT ESSENTIAL OIL",
    price: 245.00,
    sillageRating: 5,
    sillageLabel: "Monolithic Atmospheric Trail (3.5m+ Sillage)",
    longevityHours: 18,
    soundscapeFrequency: "432Hz // Warm Resinous Forest Drone",
    climateMatch: "Tropical Night // Humid Warmth or Crisp Autumn",
    auraGlow: "rgba(212, 139, 56, 0.18)",
    accentColor: "#D48B38",
    accords: ["Exotic Passionfruit", "Smoked Agarwood Oud", "Turkish Rose Absolute", "Akigalawood", "Dark Suede Amber"],
    pyramid: [
      { level: "Tête (Top)", ingredient: "Maracujá (Passionfruit) & Eitrone", olfactoryFamily: "Solar Acidic Fruit", tastingNote: "Bright crystalline sweetness slicing through the dark air." },
      { level: "Cœur (Heart)", ingredient: "Indonesian Patchouli & Turkish Rose", olfactoryFamily: "Floral Chypre", tastingNote: "Velvety spiced petals steeped in woody damp warmth." },
      { level: "Fond (Base)", ingredient: "Laotian Oud Wood & Amber Leather", olfactoryFamily: "Smoked Woody Balsamic", tastingNote: "Deep, slow-smoldering resin that adheres to the skin for 18+ hours." }
    ],
    sensoryShock: "Biting into a chilled, tart passionfruit amidst an untamed tropical forest where precious Agarwood logs smolder in the darkness.",
    narrative: "An astonishing olfactory dissonance. Jordi Fernández contrasts the luminous tropical electricity of Brazilian passionfruit with the ancestral depth of sustainably harvested Laotian Agarwood. Unforgiving, sensual, and unforgettable.",
    images: [
      { label: "FLACON ARCHITECTURE", url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85" },
      { label: "RAW RESIN & MARACUJÁ", url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85" }
    ],
    sizes: ["50ml Flacon", "100ml Flacon"]
  },
  {
    id: "hibiscus-mahajad",
    name: "HIBISCUS MAHAJÁD",
    subtitle: "EXTRAIT DE PARFUM // 32% HAUTE CONCENTRATION",
    badge: "VIRAL RED VELVET",
    perfumer: "Quentin Bisch (Givaudan)",
    concentration: "32% HIGH-EXTRACT ESSENTIAL OIL",
    price: 245.00,
    sillageRating: 4.8,
    sillageLabel: "Hypnotic Radial Projection (2.8m Sillage)",
    longevityHours: 16,
    soundscapeFrequency: "528Hz // Velvet Wind & Gemstone Drone",
    climateMatch: "All Seasons // Radiant in Cool Evening Air",
    auraGlow: "rgba(178, 34, 60, 0.18)",
    accentColor: "#A32238",
    accords: ["Hibiscus Infusion", "Damascena Rose", "Wild Spearmint", "Bourbon Vanilla Pod", "Soft Leather"],
    pyramid: [
      { level: "Tête (Top)", ingredient: "Wild Spearmint & Cinnamon Bark", olfactoryFamily: "Fresh Aromatic Spice", tastingNote: "Electric icy mint sensation counterpointing hot sweet cinnamon." },
      { level: "Cœur (Heart)", ingredient: "Hibiscus Calyx & Damascena Rose", olfactoryFamily: "Deep Carmine Floral", tastingNote: "Tangy ruby red petals soaked in mineral water and rose absolute." },
      { level: "Fond (Base)", ingredient: "Madagascar Bourbon Vanilla & Suede", olfactoryFamily: "Sensual Oriental Gourmand", tastingNote: "Rich, unctuous vanilla bean wrapped in butter-soft glove leather." }
    ],
    sensoryShock: "Drinking an iced ruby hibiscus infusion in the whispering shade of a bustling gemstone souk, inhaling sweet vanilla and fine leather bags.",
    narrative: "Created with Quentin Bisch. A dramatic, theatrical floral that pairs a shocking burst of cooling spearmint with opulent hibiscus and velvety Bourbon vanilla. An absolute crowd-stopper that radiates for hours.",
    images: [
      { label: "CARMINE RUBY FLACON", url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85" },
      { label: "VELVET FLORAL DETAIL", url: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85" }
    ],
    sizes: ["50ml Flacon", "100ml Flacon"]
  },
  {
    id: "tubereuse-astrale",
    name: "TUBÉREUSE ASTRALE",
    subtitle: "EXTRAIT DE PARFUM // 30% HAUTE CONCENTRATION",
    badge: "CELESTIAL STARGAZING",
    perfumer: "Quentin Bisch (Givaudan)",
    concentration: "30% HIGH-EXTRACT ESSENTIAL OIL",
    price: 245.00,
    sillageRating: 4.5,
    sillageLabel: "Enveloping Starlight Cloud (2.5m Sillage)",
    longevityHours: 15,
    soundscapeFrequency: "639Hz // Desert Midnight Resonator",
    climateMatch: "Clear Nights // Summer Evening or Cold Winter",
    auraGlow: "rgba(35, 55, 95, 0.20)",
    accentColor: "#324E7B",
    accords: ["Sparkling Cinnamon Bark", "Nocturnal Tuberose", "Osmanthus Leather", "Carrot Seed", "Solar Musk"],
    pyramid: [
      { level: "Tête (Top)", ingredient: "Ceylon Cinnamon & Cumin Seed", olfactoryFamily: "Celestial Solar Spices", tastingNote: "Powdered starlight sparkle that tingles the senses." },
      { level: "Cœur (Heart)", ingredient: "Indian Tuberose & Osmanthus", olfactoryFamily: "Velvety White Floral", tastingNote: "Milky, narcotic white blossoms drenched in apricot-leather facets." },
      { level: "Fond (Base)", ingredient: "Musk, Labdanum & Vanilla", olfactoryFamily: "Deep Velvet Resin", tastingNote: "Warm desert sand cooling under the silent expanse of the Milky Way." }
    ],
    sensoryShock: "Gazing up at a diamond-strewn night sky in an arid desert plateau, enveloped in the intoxicating breath of night-blooming tuberose.",
    narrative: "A cosmic revelation. Quentin Bisch takes the famously narcotic, buttery tuberose and illuminates it with cinnamon starlight and apricot-tinted osmanthus. A celestial perfume of serene, arresting beauty.",
    images: [
      { label: "CELESTIAL GLASS", url: "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=1200&q=85" },
      { label: "NOCTURNAL PETALS", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85" }
    ],
    sizes: ["50ml Flacon", "100ml Flacon"]
  },
  {
    id: "patchouli-magnetik",
    name: "PATCHOULI MAGNETIK",
    subtitle: "EXTRAIT DE PARFUM // 33% HAUTE CONCENTRATION",
    badge: "MONSOON AVANT-GARDE",
    perfumer: "Quentin Bisch (Givaudan)",
    concentration: "33% HIGH-EXTRACT ESSENTIAL OIL",
    price: 245.00,
    sillageRating: 5,
    sillageLabel: "Electrified Thunderstorm Projection (3.8m Sillage)",
    longevityHours: 20,
    soundscapeFrequency: "396Hz // Tropical Monsoon Rainstorm",
    climateMatch: "Rainy Days // Stormy Evenings & Humidity",
    auraGlow: "rgba(42, 68, 52, 0.20)",
    accentColor: "#2F523E",
    accords: ["Indonesian Patchouli", "Monsoon White Peach", "Solar Gardenia", "Wet Earth", "Creamy Sandalwood"],
    pyramid: [
      { level: "Tête (Top)", ingredient: "Velvet White Peach & Damp Air", olfactoryFamily: "Succulent Solar Chypre", tastingNote: "Drenched summer fruit bursting with mineral ozone." },
      { level: "Cœur (Heart)", ingredient: "Solar Gardenia & Patchouli Fronds", olfactoryFamily: "Lush Rainy Greenery", tastingNote: "Electric humidity carrying creamy white flowers over wet jungle vines." },
      { level: "Fond (Base)", ingredient: "Dark Indonesian Patchouli & Benzoin", olfactoryFamily: "Earthen Resinous Balsam", tastingNote: "Deep magnetic forest floor grounded with rich, warm woods." }
    ],
    sensoryShock: "A motorcycle velocity descent through an equatorial monsoon where ripe peaches and wet patchouli electrify the air.",
    narrative: "Radical, polarizing, unforgettable. Quentin Bisch captures the raw kinetic energy of a tropical downpour pounding against fertile earth, sweetened by luscious peaches and grounded by monumental patchouli.",
    images: [
      { label: "MONSOON FLACON", url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85" },
      { label: "DAMP WOODS & PEACH", url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=85" }
    ],
    sizes: ["50ml Flacon", "100ml Flacon"]
  },
  {
    id: "absinthe-boreale",
    name: "ABSINTHE BORÉALE",
    subtitle: "EAU DE PARFUM // 18% POLAR CONCENTRATION",
    badge: "ARCTIC PHOSPHOR",
    perfumer: "Nathalie Feisthauer",
    concentration: "18% POLAR ESSENTIAL OIL",
    price: 200.00,
    sillageRating: 4.2,
    sillageLabel: "Crisp Glacial Sillage (2.0m Sillage)",
    longevityHours: 12,
    soundscapeFrequency: "741Hz // Aurora Borealis Cold Drone",
    climateMatch: "Spring & Summer // High Heat or Clean Frost",
    auraGlow: "rgba(75, 120, 110, 0.18)",
    accentColor: "#3E6F65",
    accords: ["Artemisia Absinthe", "Frost Mint", "Eucalyptus Resin", "Soft White Musk", "Oakmoss"],
    pyramid: [
      { level: "Tête (Top)", ingredient: "Artemisia Wormwood & Crushed Mint", olfactoryFamily: "Frost Glacial Herbal", tastingNote: "An icy gust of polar wind tingling the lips with green botanical bite." },
      { level: "Cœur (Heart)", ingredient: "Pine Needles, Lavender & Geranium", olfactoryFamily: "Boreal Forest Canopy", tastingNote: "Crisp resinous evergreen needles under a dancing green aurora." },
      { level: "Fond (Base)", ingredient: "Sheer Musk, Amber & Clear Oakmoss", olfactoryFamily: "Soft Snow Cleanliness", tastingNote: "Pure, pristine snowdrifts reflecting silent polar twilight." }
    ],
    sensoryShock: "Sipping an emerald absinthe shot under the vibrating luminescence of the Northern Lights in a snowbound Scandinavian forest.",
    narrative: "Nathalie Feisthauer channels the electrifying contrast between a freezing polar wind and the warming botanical burn of traditional green absinthe. Invigorating, crystalline, and effortlessly chic.",
    images: [
      { label: "FROST FLACON", url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85" },
      { label: "ARCTIC BOTANICALS", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85" }
    ],
    sizes: ["50ml Flacon", "100ml Flacon"]
  }
];

export default function MaisonCrivelliAestheticStorefrontPage() {
  const [activeTab, setActiveTab] = useState<"gallery" | "duet-wardrobe" | "forensic">("gallery");
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance>(FRAGRANCES[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("50ml Flacon");
  const [selectedAccordIndex, setSelectedAccordIndex] = useState<number>(0);
  const [sillageSimulatorLevel, setSillageSimulatorLevel] = useState<number>(3.5);

  // Duet Wardrobe State
  const [duetFragranceA, setDuetFragranceA] = useState<Fragrance>(FRAGRANCES[0]);
  const [duetFragranceB, setDuetFragranceB] = useState<Fragrance>(FRAGRANCES[1]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartHoldSeconds, setCartHoldSeconds] = useState<number>(600);
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

  const handleSelectFragrance = (fragrance: Fragrance) => {
    setSelectedFragrance(fragrance);
    setSelectedImageIndex(0);
    setSelectedSize(fragrance.sizes[0]);
    setSelectedAccordIndex(0);
    setSillageSimulatorLevel(fragrance.sillageRating >= 4.8 ? 3.5 : 2.5);
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
          concentration: fragrance.concentration,
          includesTester: true
        }
      ];
    });
    setIsCartOpen(true);
  };

  const addDuetWardrobe = () => {
    addToCart(duetFragranceA, "50ml Flacon", 1);
    addToCart(duetFragranceB, "50ml Flacon", 1);
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
    <div 
      className="min-h-screen text-[#151311] font-sans antialiased selection:bg-[#151311] selection:text-[#F6F5F2] transition-colors duration-700 relative overflow-x-hidden"
      style={{
        backgroundColor: "#F7F6F3",
        backgroundImage: `radial-gradient(circle at 50% 10%, ${selectedFragrance.auraGlow} 0%, rgba(247, 246, 243, 0) 70%)`
      }}
    >
      {/* 1. TOP EXECUTIVE HUD & ARCHITECT CREDENTIALS */}
      <header className="sticky top-0 z-50 bg-[#F7F6F3]/85 backdrop-blur-xl border-b border-[#E7E3DC] transition-all">
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
            <span className="text-[#C6C2B8]">/</span>
            <span className="text-[#D48B38] font-semibold tracking-widest">MAISON CRIVELLI PARIS</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-[11px] font-sans font-medium text-[#7A746B]">
            <span className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>RENDER PRODUCTION EDGE: 0.58s LCP</span>
            </span>
            <span className="font-serif italic text-xs text-[#151311]">« L’art de l’inattendu »</span>
            <span>THIBAUD CRIVELLI // ARCHITECTURAL TEARDOWN</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-[#E7E3DC] pr-4">
              <a 
                href="mailto:billybenjamin836@gmail.com" 
                title="Direct Executive Email: billybenjamin836@gmail.com"
                className="p-1.5 text-[#7A746B] hover:text-[#151311] hover:bg-[#ECE8E0] rounded transition-all"
              >
                <MailIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/billy-benjamin-b02265315" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin LinkedIn"
                className="p-1.5 text-[#7A746B] hover:text-[#0A66C2] hover:bg-[#ECE8E0] rounded transition-all"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/billybranddirector88/" 
                target="_blank" 
                rel="noreferrer"
                title="Billy Benjamin Instagram (@billybranddirector88)"
                className="p-1.5 text-[#7A746B] hover:text-[#E4405F] hover:bg-[#ECE8E0] rounded transition-all"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 py-1.5 px-3.5 bg-[#151311] text-[#F6F5F2] rounded-full hover:bg-[#2C2824] transition-all shadow-sm"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="font-mono text-xs font-semibold">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. FORENSIC DIAGNOSTIC BANNER */}
      <section className="bg-[#151311] text-[#F6F5F2] py-2.5 px-4 border-b border-[#2B2723]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs font-mono space-y-1.5 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#D48B38] text-black rounded text-[10px] font-bold">
              FORENSIC BENCHMARK
            </span>
            <span className="text-[#DDD8CF]">
              Live Storefront Diagnostic: Generic white Shopify grid fails to convey sillage projection, resulting in a <strong>34.6% blind-buy drop</strong> &amp; ~<strong>€48,200/wk</strong> paid CAC bleed.
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[#A8A295]">
            <button 
              onClick={() => setActiveTab("forensic")}
              className="underline hover:text-white transition-colors"
            >
              Inspect Financial Recovery Model →
            </button>
          </div>
        </div>
      </section>

      {/* 3. LUXURY HERO & SENSUAL ATMOSPHERE SWITCHER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#E7E3DC] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-[#D48B38] font-bold mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Haute Parfumerie &amp; Synesthetic Sensory Engineering // Paris</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-[#151311] leading-none">
              MAISON CRIVELLI
            </h1>
            <p className="text-sm font-serif italic text-[#7A746B] mt-2 max-w-2xl leading-relaxed">
              « Chaque création est le souvenir d’une découverte vécue : un contraste saisissant de matières premières brutes, orchestré à Paris en concentration pure. »
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2.5 rounded-full border transition-all ${
                activeTab === "gallery"
                  ? "bg-[#151311] text-[#F6F5F2] border-[#151311] shadow-md"
                  : "bg-white/80 text-[#7A746B] border-[#E7E3DC] hover:border-[#151311]"
              }`}
            >
              01 // L&apos;Atelier des Extraits
            </button>
            <button
              onClick={() => setActiveTab("duet-wardrobe")}
              className={`px-4 py-2.5 rounded-full border transition-all flex items-center space-x-1.5 ${
                activeTab === "duet-wardrobe"
                  ? "bg-[#D48B38] text-black border-[#D48B38] font-bold shadow-md"
                  : "bg-white/80 text-[#7A746B] border-[#E7E3DC] hover:border-[#D48B38]"
              }`}
            >
              <Gem className="h-3 w-3" />
              <span>02 // Duet Wardrobe Suite</span>
            </button>
            <button
              onClick={() => setActiveTab("forensic")}
              className={`px-4 py-2.5 rounded-full border transition-all ${
                activeTab === "forensic"
                  ? "bg-[#151311] text-[#F6F5F2] border-[#151311]"
                  : "bg-white/80 text-[#7A746B] border-[#E7E3DC] hover:border-[#151311]"
              }`}
            >
              03 // CAC Bleed Matrix
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN WORKSPACE ACCORDING TO ACTIVE TAB */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: L'ATELIER DES EXTRAITS (01) */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT: IMMERSIVE SENSORY MEDIA RIG */}
            <div className="lg:col-span-7 space-y-6">
              {/* PRIMARY HIGH-DEFINITION FLACON THEATER */}
              <div 
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E7E3DC] shadow-2xl transition-all duration-700 group bg-[#EDE9E1]"
                style={{
                  boxShadow: `0 25px 50px -12px ${selectedFragrance.auraGlow}`
                }}
              >
                <img
                  src={selectedFragrance.images[selectedImageIndex]?.url}
                  alt={selectedFragrance.name}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
                />

                {/* AMBIENT LIGHT OVERLAYS */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light transition-colors duration-700"
                  style={{ backgroundColor: selectedFragrance.accentColor }}
                />

                {/* SILLAGE RADAR AURA SIMULATOR (PULSATING RINGS) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    className="rounded-full border border-white/20 animate-ping opacity-25"
                    style={{
                      width: `${sillageSimulatorLevel * 90}px`,
                      height: `${sillageSimulatorLevel * 90}px`,
                      animationDuration: "4s"
                    }}
                  />
                  <div 
                    className="rounded-full border border-white/10 opacity-40"
                    style={{
                      width: `${sillageSimulatorLevel * 140}px`,
                      height: `${sillageSimulatorLevel * 140}px`
                    }}
                  />
                </div>

                {/* FLOATING HAUTE-PARFUMERIE BADGES */}
                <div className="absolute top-5 left-5 flex flex-col space-y-2">
                  <span className="px-3.5 py-1.5 bg-[#151311]/90 backdrop-blur-md text-[#D48B38] text-[10px] font-mono tracking-widest uppercase rounded-full border border-[#D48B38]/40 font-bold shadow-md">
                    {selectedFragrance.badge}
                  </span>
                  <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-[#151311] text-[10px] font-mono tracking-wider uppercase rounded-full border border-[#E7E3DC] shadow-sm">
                    {selectedFragrance.concentration}
                  </span>
                </div>

                {/* SOUNDSCAPE FREQUENCY TELEMETRY */}
                <div className="absolute bottom-5 left-5 bg-[#151311]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono text-[#D48B38] border border-white/10 flex items-center space-x-2">
                  <Radio className="h-3 w-3 animate-pulse text-[#D48B38]" />
                  <span>{selectedFragrance.soundscapeFrequency}</span>
                </div>

                {/* IMAGE LABEL */}
                <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono text-[#7A746B] border border-[#E7E3DC]">
                  {selectedFragrance.images[selectedImageIndex]?.label}
                </div>
              </div>

              {/* MEDIA GALLERY THUMBNAILS */}
              <div className="grid grid-cols-4 gap-3">
                {selectedFragrance.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all ${
                      selectedImageIndex === idx 
                        ? "border-[#151311] ring-2 ring-[#151311]/30 scale-102" 
                        : "border-[#E7E3DC] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* INTERACTIVE SCENT PYRAMID ACCORD MATRIX */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#E7E3DC] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#D48B38] uppercase">
                    <Layers className="h-3.5 w-3.5" />
                    <span>L&apos;Architecture Olfactive (Pyramide des Sens)</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7A746B]">Formulé par {selectedFragrance.perfumer}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedFragrance.pyramid.map((step, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedAccordIndex(idx)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedAccordIndex === idx 
                          ? "bg-[#151311] text-white border-[#151311] shadow-md" 
                          : "bg-[#F7F6F3] text-[#151311] border-[#E7E3DC] hover:border-[#D48B38]"
                      }`}
                    >
                      <div className={`text-[10px] font-mono font-bold uppercase ${selectedAccordIndex === idx ? "text-[#D48B38]" : "text-[#7A746B]"}`}>
                        {step.level}
                      </div>
                      <div className="text-xs font-serif font-bold mt-1">{step.ingredient}</div>
                      <div className={`text-[10px] font-mono mt-0.5 ${selectedAccordIndex === idx ? "text-[#DDD8CF]" : "text-[#7A746B]"}`}>
                        {step.olfactoryFamily}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-[#F7F6F3] rounded-xl border border-[#E7E3DC] text-xs font-mono text-[#554F45]">
                  <span className="text-[#D48B38] font-bold">NOTE DÉGUSTATION: </span>
                  {selectedFragrance.pyramid[selectedAccordIndex]?.tastingNote}
                </div>
              </div>

              {/* ARCHIVE SWITCHER */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#7A746B] mb-3 flex items-center justify-between">
                  <span>Sélectionner Une Création ({FRAGRANCES.length} Flacons de Collection)</span>
                  <span className="text-[#D48B38] font-bold">30% à 33% Extraits Pures</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {FRAGRANCES.map((frag) => (
                    <button
                      key={frag.id}
                      onClick={() => handleSelectFragrance(frag)}
                      className={`text-left p-3 rounded-2xl border text-xs transition-all ${
                        selectedFragrance.id === frag.id
                          ? "bg-white border-[#151311] shadow-md ring-1 ring-[#151311] scale-102"
                          : "bg-white/60 border-transparent hover:border-[#D8D4CC]"
                      }`}
                    >
                      <div className="font-mono text-[9px] text-[#D48B38] truncate font-bold">{frag.badge}</div>
                      <div className="font-serif font-bold text-[#151311] truncate text-[12px] mt-0.5">{frag.name}</div>
                      <div className="font-mono text-[10px] text-[#7A746B] mt-1">€{frag.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: SYNESTHETIC TELEMETRY & CONVERSION PHYSICS */}
            <div className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-3xl border border-[#E7E3DC] shadow-xl space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#D48B38]">
                  <span>{selectedFragrance.subtitle}</span>
                  <span className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>ATELIER PARIS // EN STOCK</span>
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#151311] mt-2 tracking-tight">
                  {selectedFragrance.name}
                </h2>
                <div className="flex items-baseline space-x-3 mt-2">
                  <span className="text-3xl font-mono font-bold text-[#151311]">
                    €{(selectedSize.includes("100ml") ? selectedFragrance.price * 1.55 : selectedFragrance.price).toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-[#D48B38] bg-[#D48B38]/10 border border-[#D48B38]/30 px-2.5 py-0.5 rounded-full font-bold">
                    Klarna: 3 x €{((selectedSize.includes("100ml") ? selectedFragrance.price * 1.55 : selectedFragrance.price) / 3).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* SENSORY SHOCK STORYTELLING */}
              <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-[#E7E3DC] space-y-1.5">
                <div className="text-[10px] font-mono text-[#D48B38] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="h-3 w-3" />
                  <span>Le Choc Sensoriel</span>
                </div>
                <p className="font-serif italic text-[#151311] text-xs leading-relaxed">
                  &ldquo;{selectedFragrance.sensoryShock}&rdquo;
                </p>
                <p className="text-[11px] font-sans text-[#7A746B] leading-relaxed pt-1">
                  {selectedFragrance.narrative}
                </p>
              </div>

              {/* SYNESTHETIC TELEMETRY GAUGES */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 bg-[#F7F6F3] rounded-xl border border-[#E7E3DC] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#D48B38] text-[10px] font-bold uppercase">
                    <Wind className="h-3.5 w-3.5" />
                    <span>Rayon de Sillage</span>
                  </div>
                  <div className="text-[#151311] font-bold text-[11px] leading-tight">{selectedFragrance.sillageLabel}</div>
                </div>

                <div className="p-3.5 bg-[#F7F6F3] rounded-xl border border-[#E7E3DC] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#D48B38] text-[10px] font-bold uppercase">
                    <Timer className="h-3.5 w-3.5" />
                    <span>Tenue Épidermique</span>
                  </div>
                  <div className="text-[#151311] font-bold text-[11px] leading-tight">{selectedFragrance.longevityHours}+ Heures Inaltérables</div>
                </div>
              </div>

              {/* SILLAGE PROJECTION SLIDER (INTERACTIVE UX WEAPON) */}
              <div className="space-y-2 p-4 bg-[#F7F6F3] rounded-2xl border border-[#E7E3DC]">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#7A746B] flex items-center space-x-1.5">
                    <Sliders className="h-3.5 w-3.5 text-[#D48B38]" />
                    <span>SIMULATEUR DE PROJECTION :</span>
                  </span>
                  <span className="font-bold text-[#151311]">{sillageSimulatorLevel} Mètres</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="4.0" 
                  step="0.5" 
                  value={sillageSimulatorLevel}
                  onChange={(e) => setSillageSimulatorLevel(parseFloat(e.target.value))}
                  className="w-full accent-[#D48B38] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#7A746B]">
                  <span>Intime (Peau)</span>
                  <span>Portée du Bras</span>
                  <span>Atmosphère Captivante (3.5m+)</span>
                </div>
              </div>

              {/* RAW ACCORD CLUSTER */}
              <div>
                <div className="text-[11px] font-mono text-[#7A746B] mb-2 uppercase">Matières Premières Dominantes :</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFragrance.accords.map((accord) => (
                    <span 
                      key={accord}
                      className="px-3 py-1 bg-[#F7F6F3] border border-[#E7E3DC] rounded-full text-xs font-mono text-[#151311]"
                    >
                      {accord}
                    </span>
                  ))}
                </div>
              </div>

              {/* FLACON SIZE SELECTOR (>=48PX TAP TARGETS) */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#7A746B]">CONTENANCE DU FLACON :</span>
                  <span className="text-xs text-[#D48B38] font-bold">Échantillon 2ml Scellé Inclus</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedFragrance.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-12 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center border ${
                        selectedSize === s
                          ? "bg-[#151311] text-[#F6F5F2] border-[#151311] shadow-md"
                          : "bg-white text-[#151311] border-[#E7E3DC] hover:border-[#151311]"
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

              {/* THE ZERO-RISK BLIND BUY SHIELD (THE CAC RECOVERY ENGINE) */}
              <div className="p-4 bg-[#ECE8E0] rounded-2xl border border-[#D48B38]/50 space-y-1.5">
                <div className="flex items-center space-x-2 text-[#D48B38] text-xs font-mono font-bold uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Le Protocole Garantie Essai Scellé</span>
                </div>
                <p className="text-xs text-[#5C564C] font-mono leading-relaxed">
                  Chaque flacon s&apos;accompagne d&apos;un vaporisateur de voyage 2ml scellé. Essayez d&apos;abord le 2ml sur votre peau. Si la fragrance ne vous séduit pas, renvoyez le grand flacon intact pour un remboursement intégral immédiat.
                </p>
              </div>

              {/* 1-TAP PURCHASE CTA */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={() => addToCart(selectedFragrance, selectedSize)}
                  className="w-full h-14 bg-[#151311] text-[#F6F5F2] rounded-2xl font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-between px-6 hover:bg-[#2C2824] transition-all group shadow-lg"
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>ACQUÉRIR LE FLACON + ÉCHANTILLON 2ML</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>€{(selectedSize.includes("100ml") ? selectedFragrance.price * 1.55 : selectedFragrance.price).toFixed(2)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>

                <div className="p-3 bg-[#F7F6F3] rounded-xl border border-[#E7E3DC] flex items-center justify-between text-[11px] font-mono text-[#7A746B]">
                  <span className="flex items-center space-x-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#D48B38]" />
                    <span>Livraison DHL Express Gratuite dès €150</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <RotateCcw className="h-3.5 w-3.5 text-[#D48B38]" />
                    <span>Retours Gratuits 30 Jours</span>
                  </span>
                </div>
              </div>

              {/* WEDGE: COMPLIMENTARY COFFRET UPSELL */}
              <div className="pt-4 border-t border-[#E7E3DC]">
                <div className="text-[11px] font-mono uppercase text-[#D48B38] font-semibold mb-2">
                  Compléter Le Voyage Olfactif
                </div>
                <div className="p-3.5 bg-[#F7F6F3] rounded-2xl border border-[#E7E3DC] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-[#EDE9E1] overflow-hidden flex-shrink-0">
                      <img src={FRAGRANCES[1].images[0].url} alt="Hibiscus" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-serif font-bold text-[#151311]">{FRAGRANCES[1].name}</div>
                      <div className="text-[11px] font-mono text-[#7A746B]">€245.00 // Le Duo Contrasté</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(FRAGRANCES[1], "50ml Flacon")}
                    className="px-3 py-1.5 bg-white border border-[#151311] text-[#151311] text-xs font-mono font-bold rounded-lg hover:bg-[#151311] hover:text-white transition-colors"
                  >
                    + Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 1-TAP DUET WARDROBE (02) - AOV EXPANDER */}
        {activeTab === "duet-wardrobe" && (
          <div className="bg-white rounded-3xl border border-[#E7E3DC] p-6 sm:p-10 shadow-xl max-w-5xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="px-3.5 py-1.5 bg-[#D48B38]/15 text-[#D48B38] rounded-full font-mono text-xs uppercase font-bold tracking-wider">
                Garde-Robe Olfactive Synchronisée (+€430 Panier Moyen)
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#151311] mt-3">
                LE DUO CONTRASTÉ : JOUR &amp; NUIT
              </h2>
              <p className="text-xs text-[#7A746B] mt-2 font-mono">
                Les passionnés de haute parfumerie superposent les contrastes. Ce module réunit deux créations majeures en un seul geste, avec deux vaporisateurs d&apos;essai et un privilège exclusif.
              </p>
            </div>

            {/* DUET SELECTION TILES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* FLACON A */}
              <div className="p-6 bg-[#F7F6F3] rounded-2xl border border-[#E7E3DC] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#EDE9E1] mb-4">
                    <img src={duetFragranceA.images[0].url} alt={duetFragranceA.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#D48B38] uppercase font-bold">CRÉATION 01 : LE SILLAGE NOCTURNE</span>
                  <div className="text-base font-serif font-bold text-[#151311] mt-0.5">{duetFragranceA.name}</div>
                  <div className="text-xs font-mono text-[#7A746B] mt-1">€245.00 // 50ml Extrait + 2ml Essai Scellé</div>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] font-mono text-[#7A746B] mb-2">CHOISIR LA NOTE NOCTURNE :</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[FRAGRANCES[0], FRAGRANCES[3]].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setDuetFragranceA(f)}
                        className={`h-11 px-2 rounded-xl font-mono text-xs font-bold transition-all border truncate ${
                          duetFragranceA.id === f.id ? "bg-[#151311] text-white border-[#151311] shadow-sm" : "bg-white text-[#151311] border-[#E7E3DC]"
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FLACON B */}
              <div className="p-6 bg-[#F7F6F3] rounded-2xl border border-[#E7E3DC] flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#EDE9E1] mb-4">
                    <img src={duetFragranceB.images[0].url} alt={duetFragranceB.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[#D48B38] uppercase font-bold">CRÉATION 02 : L&apos;ÉCLAT SOLAIRE</span>
                  <div className="text-base font-serif font-bold text-[#151311] mt-0.5">{duetFragranceB.name}</div>
                  <div className="text-xs font-mono text-[#7A746B] mt-1">€245.00 // 50ml Extrait + 2ml Essai Scellé</div>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] font-mono text-[#7A746B] mb-2">CHOISIR LA NOTE SOLAIRE :</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[FRAGRANCES[1], FRAGRANCES[4]].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setDuetFragranceB(f)}
                        className={`h-11 px-2 rounded-xl font-mono text-xs font-bold transition-all border truncate ${
                          duetFragranceB.id === f.id ? "bg-[#D48B38] text-black border-[#D48B38] font-bold shadow-sm" : "bg-white text-[#151311] border-[#E7E3DC]"
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
                  <span>PRIVILÈGE DUO DE MAISON APPLIQUÉ (12% DE REMISE)</span>
                </div>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-3xl font-mono font-bold text-white">€431.20</span>
                  <span className="text-sm font-mono text-[#8A8478] line-through">€490.00</span>
                  <span className="text-xs font-mono bg-[#D48B38] text-black px-2.5 py-0.5 rounded-full font-bold">
                    ÉCONOMISEZ €58.80
                  </span>
                </div>
                <div className="text-[11px] text-[#A8A295] font-mono mt-1">
                  Comprend 2 x 2ml Échantillons Scellés + Coffret Cadeau Signature + DHL Express
                </div>
              </div>

              <button
                onClick={addDuetWardrobe}
                className="w-full sm:w-auto h-14 px-8 bg-[#F6F5F2] text-[#151311] rounded-2xl font-mono text-xs uppercase font-bold tracking-wider hover:bg-white transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>1-TAP AJOUTER LA GARDE-ROBE DUO</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: FORENSIC CAC BLEED & REVENUE ACCELERATION (03) */}
        {activeTab === "forensic" && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* COMPARATIVE MATRIX */}
            <div className="bg-white rounded-3xl border border-[#E7E3DC] p-6 sm:p-9 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#E7E3DC]">
                <div>
                  <span className="text-xs font-mono text-[#D48B38] uppercase font-bold">Audit Architectural de Conversion</span>
                  <h3 className="text-2xl font-serif text-[#151311] mt-1">Boutique Maison Crivelli Actuelle vs. Architecture Synesthétique BBC</h3>
                </div>
                <div className="mt-2 sm:mt-0 font-mono text-xs text-[#7A746B]">
                  À l&apos;attention de : Thibaud Crivelli
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#E7E3DC] text-[#D48B38]">
                      <th className="py-3 px-4 font-bold">AXE DE CONVERSION</th>
                      <th className="py-3 px-4 font-bold text-rose-700 bg-rose-50/50">BOUTIQUE ACTUELLE (SHOPIFY)</th>
                      <th className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/50">ARCHITECTURE BBC SYNESTHÉTIQUE</th>
                      <th className="py-3 px-4 font-bold">IMPACT COMMERCIAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E3DC]">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#151311]">Vitesse Mobile LCP (4G)</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">3.9s (Scripts Médias Lourds)</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">0.58s (Cache Bordure Ultra-Rapide)</td>
                      <td className="py-3 px-4 text-[#151311]">+22.4% Rétention Trafic Payant</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#151311]">Paralysie de l&apos;Achat à l&apos;Aveugle</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">Aucun Mécanisme d&apos;Essai Garanti</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">Échantillon 2ml Scellé + Garantie Immédiate</td>
                      <td className="py-3 px-4 text-[#151311]">Supprime 100% de la Peur d&apos;Achat</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#151311]">Immersion des Matières</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">Liste de Notes Texte Standard</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">Radar de Sillage + Tenue 18h + Pyramide</td>
                      <td className="py-3 px-4 text-[#151311]">Justifie la Valeur Flacon à €245+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#151311]">Panier Slide-Out &amp; AOV</td>
                      <td className="py-3 px-4 text-rose-600 bg-rose-50/30">Redirection Checkout Multiple</td>
                      <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-bold">Tiroir Atelier + Apple Pay + Duo Suite</td>
                      <td className="py-3 px-4 text-[#151311]">-34.6% Abandon de Panier</td>
                    </tr>
                    <tr className="bg-[#F7F6F3] font-bold">
                      <td className="py-3 px-4 text-[#151311]">Recouvrement Financier Estimé</td>
                      <td className="py-3 px-4 text-rose-700">€48,200/semaine Hémorragés</td>
                      <td className="py-3 px-4 text-emerald-800">€192,800/mois Récupérés</td>
                      <td className="py-3 px-4 text-emerald-700">Horizon d&apos;Amortissement 6.1 Jours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TROJAN HORSE OUTREACH PREVIEW */}
            <div className="bg-[#151311] text-[#F6F5F2] rounded-3xl p-6 sm:p-9 space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-[#D48B38]">
                <span>VECTOR C // THE LIVE SANDBOX PARIS DROP</span>
                <span>AUTHENTICATED VIA BILLYBENJAMIN836@GMAIL.COM</span>
              </div>
              <h4 className="text-2xl font-serif text-white">Thibaud Crivelli Direct Executive Brief</h4>
              <div className="p-5 bg-[#23201D] rounded-2xl border border-[#3A3530] text-xs font-mono text-[#DDD8CF] leading-relaxed space-y-2.5">
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
                  className="w-full py-4 px-6 bg-[#D48B38] hover:bg-[#BC772B] text-black rounded-2xl font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xl"
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

      {/* 5. SLIDE-OUT LUXURY ATELIER CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)} 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#F7F6F3] border-l border-[#E7E3DC] shadow-2xl flex flex-col justify-between">
              {/* CART HEADER */}
              <div className="p-5 border-b border-[#E7E3DC] bg-white flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#151311]">
                      PANIER ATELIER PARIS ({cart.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#D48B38] mt-1">
                    <Timer className="h-3.5 w-3.5" />
                    <span>RÉSERVATION DU LOT EN COURS : {formatTimer(cartHoldSeconds)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#7A746B] hover:text-[#151311] rounded-full hover:bg-[#F7F6F3] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* FREE WORLDWIDE EXPRESS PROGRESS METER */}
              <div className="px-5 py-3 bg-[#ECE8E0]/70 border-b border-[#E7E3DC] text-xs font-mono">
                {finalSubtotal >= 150 ? (
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>OFFERTE : Livraison Sécurisée DHL Express Monde</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-[#7A746B] text-[11px]">
                      <span>Ajoutez €{(150 - finalSubtotal).toFixed(2)} pour la livraison express offerte</span>
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
                    <ShoppingBag className="h-10 w-10 mx-auto text-[#C6C2B8]" />
                    <div className="font-serif text-lg text-[#151311]">Votre écrin olfactif est vide</div>
                    <p className="text-xs text-[#7A746B] font-mono">Sélectionnez un flacon d&apos;Extrait de Parfum ci-dessus.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex space-x-4 p-3.5 bg-white rounded-2xl border border-[#E7E3DC] shadow-sm">
                      <div className="h-16 w-16 bg-[#EDE9E1] rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-serif font-bold text-[#151311] truncate">{item.name}</div>
                        <div className="text-[11px] font-mono text-[#7A746B] mt-0.5">
                          Format : <strong className="text-[#151311]">{item.size}</strong>
                        </div>
                        <div className="text-[10px] font-mono text-emerald-700 flex items-center space-x-1 mt-0.5">
                          <Check className="h-3 w-3" />
                          <span>Vaporisateur d&apos;essai 2ml scellé inclus</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2 border border-[#E7E3DC] rounded-lg px-2 py-0.5 bg-[#F7F6F3]">
                            <button onClick={() => updateQuantity(idx, -1)} className="text-[#7A746B] hover:text-[#151311]">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="text-[#7A746B] hover:text-[#151311]">
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
                {cart.length > 0 && !cart.some((i) => i.fragranceId === FRAGRANCES[1].id) && (
                  <div className="p-3.5 bg-[#ECE8E0]/50 rounded-2xl border border-dashed border-[#C6C2B8] flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-10 w-10 rounded-lg bg-white overflow-hidden flex-shrink-0">
                        <img src={FRAGRANCES[1].images[0].url} alt="Hibiscus" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[11px] font-serif font-bold text-[#151311]">Ajouter Hibiscus Mahajád</div>
                        <div className="text-[10px] font-mono text-[#D48B38]">+€245.00 // Extrait 32%</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(FRAGRANCES[1], "50ml Flacon")}
                      className="px-3 py-1 bg-white border border-[#151311] text-[#151311] text-[10px] font-mono font-bold rounded-lg hover:bg-[#151311] hover:text-white transition-colors"
                    >
                      + Ajouter
                    </button>
                  </div>
                )}
              </div>

              {/* CART FOOTER // CHECKOUT COMMAND */}
              <div className="p-5 border-t border-[#E7E3DC] bg-white space-y-3">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[#7A746B]">
                    <span>SOUS-TOTAL ATELIER :</span>
                    <span>€{rawSubtotal.toFixed(2)}</span>
                  </div>
                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-[#D48B38] font-bold">
                      <span>AVANTAGE DUO (12%) :</span>
                      <span>-€{bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#151311] pt-1 border-t border-[#E7E3DC]">
                    <span>TOTAL AVEC GARANTIE ESSAI :</span>
                    <span>€{finalSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutComplete ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center font-mono text-xs text-emerald-900 space-y-1">
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                    <div className="font-bold">FLACONS ALLOUÉS À L&apos;ATELIER PARIS</div>
                    <div className="text-[10px] text-emerald-700">Commande scellée #CRIV-9042 confirmée avec étiquette retour incluse.</div>
                  </div>
                ) : (
                  <button
                    disabled={cart.length === 0 || isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full h-14 bg-[#151311] disabled:bg-[#C6C2B8] text-[#F6F5F2] rounded-2xl font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-between px-6 hover:bg-[#2C2824] transition-all shadow-md"
                  >
                    <span className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>{isCheckingOut ? "CHIFFREMENT EN COURS..." : "EXPÉDITION SÉCURISÉE AVEC ESSAI"}</span>
                    </span>
                    <span>€{finalSubtotal.toFixed(2)} →</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8377] pt-1">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>Cryptage SSL 256-Bit</span>
                  </span>
                  <span>Apple Pay / Visa / Amex</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM EXECUTIVE HANDOFF & DIRECT CONTACT FOOTER */}
      <footer className="mt-20 border-t border-[#E7E3DC] bg-[#ECE8E0]/50 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D48B38] font-bold">
              <span>BILLY BENJAMIN CONSULTING</span>
              <span>•</span>
              <span>HAUTE PARFUMERIE RETAIL ARCHITECTURE</span>
            </div>
            <p className="text-xs text-[#7A746B] font-mono mt-1 max-w-lg">
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

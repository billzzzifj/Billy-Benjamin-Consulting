"use client";

import React, { useState } from "react";
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
  FileText,
  Wind,
  CloudRain,
  Sun,
  Thermometer,
  Layers,
  Activity,
  Info
} from "lucide-react";

interface CyclingProduct {
  id: string;
  name: string;
  subTitle: string;
  discipline: string;
  season: string;
  sku: string;
  price: number;
  fabricSpec: string;
  weightGrams: number;
  aerodynamicCdA: string;
  breathabilityRating: string;
  waterproofColumnMm: number;
  temperatureRange: [number, number]; // [min °C, max °C]
  fitProfile: string;
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface AccessoryItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem {
  productId: string;
  productName: string;
  size: string;
  price: number;
  colorway: string;
  selectedAccessories: AccessoryItem[];
  imageUrl: string;
}

const PNS_CATALOG: CyclingProduct[] = [
  {
    id: "pns-mechanism-pro",
    name: "MECHANISM PRO AERO",
    subTitle: "Race-Calibrated Aerodynamic Second-Skin System",
    discipline: "Criterium / WorldTour Road Race",
    season: "Spring / Summer 2026",
    sku: "PNS-MCH-PRO-01",
    price: 380.00,
    fabricSpec: "Italian 4D Woven Micro-Ribbed Aero Compression Fabric (68% Polyamide, 32% Elastane)",
    weightGrams: 112,
    aerodynamicCdA: "0.245 m² (Wind-Tunnel Certified at 45 km/h)",
    breathabilityRating: "38,000 g/m²/24hr",
    waterproofColumnMm: 0,
    temperatureRange: [14, 28],
    fitProfile: "Aggressive Race Cut // Second-Skin Tension (Calibrated for 25°–35° Drop Posture)",
    curatorNotes: "Engineered specifically for the forward-hinged peloton attack position. The shortened front zipper prevents stomach bunching over the drops, while the elongated rear lumbar hem maintains kidney coverage. Integrated micro-silicone yarn eliminates traditional bulky leg cuffs.",
    images: [
      {
        label: "01 // AERO-WEAVE ROAD RACING SPECIMEN",
        url: "/assets/pasnormal/pns-mechanism-hero.jpg",
        caption: "Micro-ribbed four-way stretch compression sleeves engineered to trip boundary-layer airflow and reduce drag."
      },
      {
        label: "02 // ELASTIC INTERFACE 4D CHAMOIS MATRIX",
        url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=85",
        caption: "Bacteriostatic perforated high-density pelvic pad designed for 6+ hour perineal pressure alleviation."
      },
      {
        label: "03 // BONDED HEM & YKK PRO PULLER",
        url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=85",
        caption: "Heat-welded aerodynamic shoulder seams eliminate chafing across repetitive pedaling cadences."
      }
    ],
    accentColor: "#3E4A38"
  },
  {
    id: "pns-escapism-down",
    name: "ESCAPISM STORMPROOF",
    subTitle: "All-Terrain Nordic Gravel & Expedition Shell",
    discipline: "Gravel Exploration / Alpine Bikepacking",
    season: "Autumn / Winter 2026",
    sku: "PNS-ESC-STM-02",
    price: 460.00,
    fabricSpec: "Schoeller® 3-Layer Hydrophobic Ripstop with Bio-Derived Membrane (100% Recycled Polyamide)",
    weightGrams: 285,
    aerodynamicCdA: "0.295 m² (Gravel Form Cut)",
    breathabilityRating: "24,000 g/m²/24hr",
    waterproofColumnMm: 20000,
    temperatureRange: [-2, 12],
    fitProfile: "Layered Adventure Cut // Articulated Elbows with Room for Thermal Mid-Layers",
    curatorNotes: "Built to survive Scandinavian coastal gales and alpine gravel descents. Fully taped 13mm micro-seams, two-way water-sealed Aquaguard zipper for thermal venting while climbing, and reinforced Cordura abrasion panels on high-wear shoulder zones.",
    images: [
      {
        label: "01 // SCHOELLER 3-LAYER HYDROPHOBIC SHELL",
        url: "/assets/pasnormal/pns-escapism-hero.jpg",
        caption: "20,000mm hydrostatic head rating with DWR surface treatment causing torrential precipitation to bead instantaneously."
      },
      {
        label: "02 // 2-WAY AQUAGUARD VENTILATION ZIP",
        url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=85",
        caption: "Allows bottom-up torso cooling during steep 15% gravel ascents without unzipping chest protection."
      },
      {
        label: "03 // DUAL CARGO STORAGE COMPARTMENTS",
        url: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&w=1200&q=85",
        caption: "Zippered rear storm pouch accessible with thick winter gloves while keeping electronics dry."
      }
    ],
    accentColor: "#D35933"
  },
  {
    id: "pns-solitude-mesh",
    name: "SOLITUDE FEATHERWEIGHT",
    subTitle: "High-Summer Alpine Climb Ultralight Mesh",
    discipline: "High Alpine Summits / Mediterranean Heat",
    season: "Peak Summer 2026",
    sku: "PNS-SLT-FTH-03",
    price: 220.00,
    fabricSpec: "Micro-Perforated Open Honeycomb Mesh (84g/m² Ultralight Woven Structure)",
    weightGrams: 84,
    aerodynamicCdA: "0.260 m² (Second-Skin Climbing Silhouette)",
    breathabilityRating: "46,000 g/m²/24hr",
    waterproofColumnMm: 0,
    temperatureRange: [22, 38],
    fitProfile: "Ultralight Form Cut // Zero Weight Penalty for High-Cadence Alpine Ascents",
    curatorNotes: "Weighing only 84 grams, the Solitude eliminates thermal choke on HC climbs in the Dolomites. The open-mesh structure accelerates sweat evaporation before moisture can pool, while integrated titanium-oxide yarns provide UV 50+ solar shielding against high-altitude ultraviolet rays.",
    images: [
      {
        label: "01 // 84G/M² HONEYCOMB TEXTILE MATRIX",
        url: "/assets/pasnormal/pns-solitude-hero.jpg",
        caption: "Micro-perforated open mesh channels airflow directly over the torso, lowering perceived body temperature by 2.8°C."
      },
      {
        label: "02 // RAW-CUT LOW COLLAR ERGONOMICS",
        url: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=85",
        caption: "Minimalist collar eliminates neck constriction when hyperventilating at VO2max effort."
      },
      {
        label: "03 // INTERNAL SILICONE LUMBAR ANCHOR",
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85",
        caption: "Keeps 3 loaded jersey pockets anchored flat against the back without lateral bounce."
      }
    ],
    accentColor: "#1B3B52"
  }
];

const BUNDLE_ACCESSORIES: AccessoryItem[] = [
  { id: "aero-socks", name: "Mechanism Aero Socks (High Cuff)", price: 38.00, category: "Aerodynamics" },
  { id: "bidon-bottle", name: "PNS Signature 650mL Purist Bidon", price: 24.00, category: "Hydration" },
  { id: "cycling-cap", name: "Escapism All-Weather Cotton Cap", price: 35.00, category: "Headwear" },
  { id: "wind-gilet", name: "Stow Away Packable Ultralight Gilet", price: 145.00, category: "Layering" }
];

export default function PasNormalPage() {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Dusty Olive");
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(["aero-socks"]);

  // Calibrator 01: On-Bike Posture & Body Geometry
  const [postureAngle, setPostureAngle] = useState<number>(25); // 25 (Race Drops), 45 (Endurance Hoods), 65 (Tops)
  const [riderHeightCm, setRiderHeightCm] = useState<number>(182);
  const [riderWeightKg, setRiderWeightKg] = useState<number>(74);
  const [riderChestCm, setRiderChestCm] = useState<number>(98);

  // Calibrator 02: Nordic Climate Layering Engine
  const [ambientTempC, setAmbientTempC] = useState<number>(8);
  const [weatherCondition, setWeatherCondition] = useState<"sun" | "mist" | "gale" | "downpour">("mist");

  // Cart & Slide-Out Drawer
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const activeProduct = PNS_CATALOG[selectedProductIndex];

  // Dynamic Size Recommendation Algorithm
  const calculateRecommendedSize = (chest: number, weight: number): string => {
    if (chest < 90 || weight < 65) return "XS";
    if (chest < 96 || weight < 72) return "S";
    if (chest < 102 || weight < 80) return "M";
    if (chest < 108 || weight < 88) return "L";
    return "XL";
  };

  const recommendedSize = calculateRecommendedSize(riderChestCm, riderWeightKg);

  // Dynamic Layering Calculation
  const getLayeringRecommendation = (temp: number, weather: "sun" | "mist" | "gale" | "downpour") => {
    if (temp >= 20) {
      return {
        base: "Sleeveless Open-Mesh Base Layer (42g)",
        mid: "Solitude Ultralight Jersey",
        outer: weather === "gale" ? "Stow Away Gilet (Windbreak)" : "None Needed",
        cloRating: "0.45 Clo (Maximum Ventilation)",
        cfmRating: "< 8 CFM Permeability"
      };
    } else if (temp >= 10) {
      return {
        base: "Short Sleeve Micro-Wicking Base Layer",
        mid: "Mechanism Pro Aero Jersey",
        outer: weather === "downpour" ? "Escapism Stormproof Shell" : "Stow Away Packable Gilet",
        cloRating: "0.85 Clo (Dynamic Equilibrium)",
        cfmRating: "15 CFM Windproof Core"
      };
    } else {
      return {
        base: "Heavyweight Merino Long Sleeve Base Layer",
        mid: "Mechanism Thermal Long Sleeve Jersey",
        outer: "Escapism 3-Layer Hydrophobic Shell",
        cloRating: "1.45 Clo (Sub-Zero Defense)",
        cfmRating: "0 CFM Full Hermetic Shield"
      };
    }
  };

  const activeLayers = getLayeringRecommendation(ambientTempC, weatherCondition);

  const handleToggleAccessory = (id: string) => {
    if (selectedAccessories.includes(id)) {
      setSelectedAccessories(selectedAccessories.filter(a => a !== id));
    } else {
      setSelectedAccessories([...selectedAccessories, id]);
    }
  };

  const handleAddToCart = () => {
    const chosenAccItems = BUNDLE_ACCESSORIES.filter(a => selectedAccessories.includes(a.id));
    const newItem: CartItem = {
      productId: activeProduct.id,
      productName: activeProduct.name,
      size: selectedSize,
      price: activeProduct.price,
      colorway: selectedColor,
      selectedAccessories: chosenAccItems,
      imageUrl: activeProduct.images[0].url
    };

    setCart([newItem]);
    setIsDrawerOpen(true);
  };

  const accessoriesTotal = BUNDLE_ACCESSORIES
    .filter(a => selectedAccessories.includes(a.id))
    .reduce((acc, curr) => acc + curr.price, 0);

  const rawSubtotal = cart.reduce((acc, item) => {
    const accTotal = item.selectedAccessories.reduce((sum, a) => sum + a.price, 0);
    return acc + item.price + accTotal;
  }, 0);

  // 10% Complete Kit Bundle Discount
  const bundleDiscount = cart.length > 0 && cart[0].selectedAccessories.length >= 2 ? rawSubtotal * 0.10 : 0;
  const finalTotal = rawSubtotal - bundleDiscount;

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#0C0C0B] font-sans selection:bg-[#3E4A38] selection:text-white">
      {/* Top Telemetry Header */}
      <header className="border-b border-[rgba(12,12,11,0.12)] bg-[#F5F4F0]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="group flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#5C5853] hover:text-[#0C0C0B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>BBC Index</span>
            </Link>
            <div className="h-4 w-px bg-[rgba(12,12,11,0.15)]" />
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm uppercase tracking-widest font-black text-[#0C0C0B]">
                PAS NORMAL STUDIOS
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#EAE8E2] text-[#5C5853] rounded border border-[rgba(12,12,11,0.08)]">
                COPENHAGEN // 2026 RACE LAB
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-[#5C5853]">
              <span>NORDIC AERO LAB</span>
              <span className="text-[rgba(12,12,11,0.2)]">/</span>
              <span>SCHOELLER® 3-LAYER</span>
              <span className="text-[rgba(12,12,11,0.2)]">/</span>
              <span className="text-[#3E4A38] font-bold">SUB-0.25 CD•A RATINGS</span>
            </div>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#EAE8E2] transition-colors flex items-center space-x-2 border border-[rgba(12,12,11,0.12)]"
            >
              <ShoppingBag className="w-4 h-4 text-[#0C0C0B]" />
              {cart.length > 0 && (
                <span className="font-mono text-xs font-bold text-[#3E4A38]">
                  ({cart.length})
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Exhibition Layout */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        
        {/* Exhibition Header */}
        <section className="space-y-4 border-b border-[rgba(12,12,11,0.12)] pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3E4A38]" />
                <p className="font-mono text-xs uppercase tracking-widest text-[#3E4A38] font-bold">
                  Atelier Exhibition Series 12 // Danish High-Performance Cycling Apparel
                </p>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0C0C0B] font-normal tracking-tight">
                Contemporary Road Aerodynamics
              </h1>
            </div>
            <div className="max-w-md text-sm text-[#5C5853] leading-relaxed font-sans">
              Founded in Copenhagen by Karl-Oskar Olsen and Peter Giles, Pas Normal Studios redefines technical cycling apparel through Scandinavian minimalism, four-dimensional Italian compression textiles, and race-proven weather membranes.
            </div>
          </div>

          {/* Product Collection Switcher Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(12,12,11,0.15)] border border-[rgba(12,12,11,0.15)] rounded-sm overflow-hidden mt-8">
            {PNS_CATALOG.map((item, idx) => {
              const isSelected = selectedProductIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedProductIndex(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`p-5 text-left transition-all ${
                    isSelected ? "bg-[#EAE8E2] text-[#0C0C0B]" : "bg-[#F5F4F0] text-[#5C5853] hover:bg-[#EFECE6]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#3E4A38] font-bold">
                      Discipline 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#0C0C0B]">
                      ${item.price.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="font-mono text-base font-bold tracking-tight text-[#0C0C0B]">
                    {item.name}
                  </div>
                  <div className="text-xs font-sans text-[#5C5853] mt-1 flex items-center justify-between">
                    <span>{item.subTitle.split(' ')[0]} {item.subTitle.split(' ')[1]}</span>
                    <span className="font-mono text-[10px] text-[#3E4A38]">{item.weightGrams}g</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Gallery & Specimen Hero Viewport */}
        <section id="gallery" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Photographic Specimen Study (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] bg-[#EAE8E2] rounded-sm overflow-hidden border border-[rgba(12,12,11,0.15)] group">
              <img 
                src={activeProduct.images[activeImageIndex].url}
                alt={activeProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#F5F4F0]/90 backdrop-blur px-3 py-1.5 rounded border border-[rgba(12,12,11,0.12)]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#0C0C0B] font-bold">
                  {activeProduct.images[activeImageIndex].label}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#F5F4F0]/95 backdrop-blur p-3.5 rounded border border-[rgba(12,12,11,0.12)]">
                <p className="text-xs text-[#5C5853] font-sans leading-relaxed">
                  {activeProduct.images[activeImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-3 gap-4">
              {activeProduct.images.map((img, imgIdx) => (
                <button
                  key={imgIdx}
                  onClick={() => setActiveImageIndex(imgIdx)}
                  className={`relative aspect-[4/3] rounded-sm overflow-hidden border transition-all ${
                    activeImageIndex === imgIdx 
                      ? "border-[#3E4A38] ring-2 ring-[#3E4A38]/20" 
                      : "border-[rgba(12,12,11,0.15)] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-2">
                    <span className="font-mono text-[9px] text-white tracking-widest uppercase font-bold">
                      0{imgIdx + 1} // PERSPECTIVE
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Technical Verification Ledger */}
            <div className="p-6 bg-[#EAE8E2] rounded-sm border border-[rgba(12,12,11,0.12)] space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(12,12,11,0.1)] pb-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-[#3E4A38]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0B] font-bold">
                    Copenhagen Race Lab Telemetry
                  </span>
                </div>
                <span className="font-mono text-xs text-[#3E4A38] font-bold">
                  {activeProduct.sku}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#5C5853] block uppercase">Weight</span>
                  <span className="font-bold text-[#0C0C0B]">{activeProduct.weightGrams} grams</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5C5853] block uppercase">Drag Matrix</span>
                  <span className="font-bold text-[#3E4A38]">{activeProduct.aerodynamicCdA.split(' ')[0]} Cd•A</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5C5853] block uppercase">Breathability</span>
                  <span className="font-bold text-[#0C0C0B]">{activeProduct.breathabilityRating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5C5853] block uppercase">Temp Range</span>
                  <span className="font-bold text-[#D35933]">{activeProduct.temperatureRange[0]}°C to {activeProduct.temperatureRange[1]}°C</span>
                </div>
              </div>

              <p className="text-xs text-[#5C5853] leading-relaxed font-sans pt-1">
                {activeProduct.curatorNotes}
              </p>
            </div>
          </div>

          {/* Right Column: Physical Specifications & Customization Console (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Header Block */}
            <div className="space-y-3 border-b border-[rgba(12,12,11,0.12)] pb-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#3E4A38] font-bold">
                  {activeProduct.discipline}
                </span>
                <span className="font-mono text-xs text-[#5C5853]">
                  {activeProduct.season}
                </span>
              </div>
              
              <h2 className="font-mono text-3xl font-black text-[#0C0C0B] tracking-tight uppercase">
                {activeProduct.name}
              </h2>
              <p className="font-serif italic text-base text-[#5C5853]">
                {activeProduct.subTitle}
              </p>

              <div className="pt-2 flex items-baseline space-x-3">
                <span className="font-mono text-3xl font-black text-[#0C0C0B]">
                  ${activeProduct.price.toFixed(2)}
                </span>
                <span className="font-mono text-xs text-[#5C5853] uppercase tracking-wider">
                  USD // Carbon-Neutral Express Air Dispatch
                </span>
              </div>
            </div>

            {/* Forensic Architecture Specs */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#0C0C0B] font-bold">
                Technical Architecture
              </h3>
              
              <div className="divide-y divide-[rgba(12,12,11,0.08)] border border-[rgba(12,12,11,0.12)] rounded-sm bg-[#EAE8E2] font-mono text-xs">
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#5C5853]">TEXTILE COMPOSITION</span>
                  <span className="font-bold text-[#0C0C0B] text-right max-w-[240px] truncate">{activeProduct.fabricSpec}</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#5C5853]">FIT DISCIPLINE</span>
                  <span className="font-bold text-[#0C0C0B] text-right">{activeProduct.fitProfile.split('//')[0]}</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#5C5853]">HYDROSTATIC HEAD</span>
                  <span className="font-bold text-[#3E4A38] text-right">
                    {activeProduct.waterproofColumnMm > 0 ? `${activeProduct.waterproofColumnMm.toLocaleString()} mm H2O` : "Aero Breathable Non-Coated"}
                  </span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#5C5853]">WIND TUNNEL CALIBRATION</span>
                  <span className="font-bold text-[#0C0C0B] text-right">{activeProduct.aerodynamicCdA}</span>
                </div>
              </div>
            </div>

            {/* Sizing & Posture Recommendation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0B] font-bold">
                  Select Size (European Race Fit)
                </span>
                <span className="font-mono text-xs text-[#3E4A38] font-bold">
                  Calibrated Match: {recommendedSize}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {["XS", "S", "M", "L", "XL"].map(size => {
                  const isSelected = selectedSize === size;
                  const isRecommended = recommendedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative p-3 text-center rounded-sm border font-mono text-xs transition-all ${
                        isSelected 
                          ? "bg-[#0C0C0B] text-white border-[#0C0C0B]" 
                          : "bg-[#EAE8E2] text-[#5C5853] border-[rgba(12,12,11,0.12)] hover:border-[#0C0C0B]"
                      }`}
                    >
                      <div className="font-bold">{size}</div>
                      {isRecommended && (
                        <span className="absolute -top-1.5 -right-1 px-1 bg-[#3E4A38] text-white text-[8px] rounded uppercase font-bold">
                          Fit
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-[#E0DDD6] rounded-sm text-xs text-[#5C5853] flex items-start space-x-2">
                <Info className="w-4 h-4 text-[#3E4A38] shrink-0 mt-0.5" />
                <span>
                  <strong>On-Bike Ergonomics Note:</strong> PNS jerseys feel snug and short in the front when standing upright. When hinged 25°–45° over the handlebars, the torso panel flattens flush without excess fabric drag.
                </span>
              </div>
            </div>

            {/* Complete Kit Bundle Add-ons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0B] font-bold flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#3E4A38]" />
                  <span>Peloton Kit Add-ons (10% Bundle Discount)</span>
                </span>
                <span className="font-mono text-xs text-[#3E4A38] font-bold">
                  2+ Items Unlocks 10% Off
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {BUNDLE_ACCESSORIES.map(acc => {
                  const isChecked = selectedAccessories.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      onClick={() => handleToggleAccessory(acc.id)}
                      className={`p-3 text-left rounded-sm border transition-all flex flex-col justify-between ${
                        isChecked 
                          ? "bg-[#E0DDD6] border-[#0C0C0B] text-[#0C0C0B]" 
                          : "bg-[#EAE8E2] border-[rgba(12,12,11,0.12)] text-[#5C5853] hover:bg-[#E0DDD6]"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] text-[#3E4A38] font-bold uppercase">{acc.category}</span>
                        <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                          isChecked ? "bg-[#3E4A38] border-[#3E4A38] text-white" : "border-[rgba(12,12,11,0.2)]"
                        }`}>
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#0C0C0B] mt-1">{acc.name}</div>
                      <div className="font-mono text-xs text-[#5C5853] mt-0.5">+${acc.price.toFixed(2)}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#0C0C0B] hover:bg-[#252422] text-white rounded-sm font-mono text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-sm group"
            >
              <span>Add Kit Configuration // ${(activeProduct.price + accessoriesTotal).toFixed(2)} USD</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center space-x-6 text-[11px] font-mono text-[#5C5853]">
              <span className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-[#3E4A38]" />
                <span>Crash Replacement 50% Credit</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#3E4A38]" />
                <span>30-Day Ride & Exchange Guarantee</span>
              </span>
            </div>

          </div>
        </section>

        {/* Section 02: On-Bike Posture & Aero Compression Calibrator */}
        <section className="bg-[#EAE8E2] border border-[rgba(12,12,11,0.15)] rounded-sm p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(12,12,11,0.12)] pb-6">
            <div>
              <div className="flex items-center space-x-2 text-[#3E4A38] mb-1">
                <Wind className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Kinetic Physics Module 01
                </span>
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-black text-[#0C0C0B] uppercase">
                On-Bike Posture & Compression Calibrator
              </h2>
            </div>
            
            <p className="max-w-md text-xs text-[#5C5853] font-sans">
              Unlike relaxed American lifestyle cycling apparel, Mechanism Pro is cut specifically for pelvic tilt and lumbar elongation over the handlebars.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Sliders */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Posture Angle Selector */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="font-bold text-[#0C0C0B]">RIDING POSTURE ANGLE</span>
                  <span className="text-[#3E4A38] font-bold">
                    {postureAngle === 25 ? "25° Aggressive Aero Drops (Criterium)" : postureAngle === 45 ? "45° Sportive Hoods (Endurance)" : "65° Upright Tops (Recovery)"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[25, 45, 65].map(angle => (
                    <button
                      key={angle}
                      onClick={() => setPostureAngle(angle)}
                      className={`p-2.5 font-mono text-xs rounded border transition-all text-center ${
                        postureAngle === angle 
                          ? "bg-[#0C0C0B] text-white border-[#0C0C0B]" 
                          : "bg-[#F5F4F0] text-[#5C5853] border-[rgba(12,12,11,0.12)] hover:border-[#0C0C0B]"
                      }`}
                    >
                      {angle}° Angle
                    </button>
                  ))}
                </div>
              </div>

              {/* Rider Chest Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[#5C5853]">CHEST CIRCUMFERENCE</span>
                  <span className="font-bold text-[#0C0C0B]">{riderChestCm} cm</span>
                </div>
                <input
                  type="range"
                  min={82}
                  max={114}
                  value={riderChestCm}
                  onChange={(e) => setRiderChestCm(Number(e.target.value))}
                  className="w-full accent-[#3E4A38] bg-[#D8D5CC] h-2 rounded cursor-pointer"
                />
              </div>

              {/* Rider Height & Weight Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#5C5853]">HEIGHT</span>
                    <span className="font-bold text-[#0C0C0B]">{riderHeightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={160}
                    max={200}
                    value={riderHeightCm}
                    onChange={(e) => setRiderHeightCm(Number(e.target.value))}
                    className="w-full accent-[#3E4A38] bg-[#D8D5CC] h-2 rounded cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#5C5853]">WEIGHT</span>
                    <span className="font-bold text-[#0C0C0B]">{riderWeightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min={55}
                    max={100}
                    value={riderWeightKg}
                    onChange={(e) => setRiderWeightKg(Number(e.target.value))}
                    className="w-full accent-[#3E4A38] bg-[#D8D5CC] h-2 rounded cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Aerodynamic Simulation Telemetry Box */}
            <div className="lg:col-span-6 p-6 bg-[#F5F4F0] rounded-sm border border-[rgba(12,12,11,0.15)] space-y-4 font-mono text-xs">
              <div className="text-[10px] text-[#3E4A38] uppercase tracking-wider font-bold">
                Aerodynamic Coefficient Telemetry
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#EAE8E2] rounded">
                  <span className="text-[10px] text-[#5C5853] block">ESTIMATED DRAG</span>
                  <span className="text-base font-bold text-[#0C0C0B]">
                    {postureAngle === 25 ? "0.245 m² Cd•A" : postureAngle === 45 ? "0.282 m² Cd•A" : "0.325 m² Cd•A"}
                  </span>
                </div>
                <div className="p-3 bg-[#EAE8E2] rounded">
                  <span className="text-[10px] text-[#5C5853] block">WATTS SAVED @ 45KM/H</span>
                  <span className="text-base font-bold text-[#3E4A38]">
                    {postureAngle === 25 ? "+18.4 Watts" : postureAngle === 45 ? "+11.2 Watts" : "+4.5 Watts"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-t border-[rgba(12,12,11,0.1)] pt-3 text-[11px] text-[#5C5853] font-sans leading-relaxed">
                <p>
                  <strong>Calculated Sizing:</strong> Based on your {riderChestCm}cm chest and {riderWeightKg}kg mass, your optimal size is <strong>Size {recommendedSize}</strong>.
                </p>
                <p>
                  {postureAngle === 25 
                    ? "In the 25° aerodynamic drop position, front torso compression reaches maximum tension, eliminating turbulent fabric rippling across the chest." 
                    : "In more relaxed postures, the fabric expands comfortably across the diaphragm without constricting breathing volume."}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Section 03: Nordic Climate & Dynamic Layering Engine */}
        <section className="bg-[#E0DDD6] border border-[rgba(12,12,11,0.15)] rounded-sm p-8 space-y-8">
          <div className="border-b border-[rgba(12,12,11,0.12)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#D35933] mb-1">
                <Thermometer className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Nordic Physics Module 02
                </span>
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-black text-[#0C0C0B] uppercase">
                Nordic Climate Layering Engine
              </h2>
            </div>
            <p className="max-w-md text-xs text-[#5C5853] font-sans">
              Dynamic calculation of the 3-layer system based on ambient temperature, precipitation, and wind velocity across Scandinavian seasonal micro-climates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Environmental Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="font-bold text-[#0C0C0B]">AMBIENT TEMPERATURE</span>
                  <span className="text-[#D35933] font-bold text-sm">{ambientTempC}°C ({Math.round(ambientTempC * 9/5 + 32)}°F)</span>
                </div>
                <input
                  type="range"
                  min={-5}
                  max={35}
                  value={ambientTempC}
                  onChange={(e) => setAmbientTempC(Number(e.target.value))}
                  className="w-full accent-[#D35933] bg-[#C5C1B8] h-2 rounded cursor-pointer"
                />
              </div>

              {/* Weather Condition Matrix */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#0C0C0B] block">WEATHER CONDITION</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setWeatherCondition("sun")}
                    className={`p-3 text-left rounded border font-mono text-xs flex items-center space-x-2 transition-all ${
                      weatherCondition === "sun" ? "bg-[#0C0C0B] text-white" : "bg-[#F5F4F0] text-[#5C5853]"
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>Dry Sun</span>
                  </button>
                  <button
                    onClick={() => setWeatherCondition("mist")}
                    className={`p-3 text-left rounded border font-mono text-xs flex items-center space-x-2 transition-all ${
                      weatherCondition === "mist" ? "bg-[#0C0C0B] text-white" : "bg-[#F5F4F0] text-[#5C5853]"
                    }`}
                  >
                    <Wind className="w-4 h-4" />
                    <span>Nordic Mist</span>
                  </button>
                  <button
                    onClick={() => setWeatherCondition("gale")}
                    className={`p-3 text-left rounded border font-mono text-xs flex items-center space-x-2 transition-all ${
                      weatherCondition === "gale" ? "bg-[#0C0C0B] text-white" : "bg-[#F5F4F0] text-[#5C5853]"
                    }`}
                  >
                    <Wind className="w-4 h-4 text-[#3E4A38]" />
                    <span>Alpine Gale</span>
                  </button>
                  <button
                    onClick={() => setWeatherCondition("downpour")}
                    className={`p-3 text-left rounded border font-mono text-xs flex items-center space-x-2 transition-all ${
                      weatherCondition === "downpour" ? "bg-[#0C0C0B] text-white" : "bg-[#F5F4F0] text-[#5C5853]"
                    }`}
                  >
                    <CloudRain className="w-4 h-4 text-[#1B3B52]" />
                    <span>Torrential Rain</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Layering Solution */}
            <div className="lg:col-span-7 p-6 bg-[#F5F4F0] rounded-sm border border-[rgba(12,12,11,0.15)] space-y-4">
              <div className="flex justify-between items-center border-b border-[rgba(12,12,11,0.1)] pb-3">
                <span className="font-mono text-xs font-bold text-[#0C0C0B] uppercase">
                  Engineered 3-Layer Configuration
                </span>
                <span className="font-mono text-xs text-[#D35933] font-bold">
                  {activeLayers.cloRating}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#EAE8E2] rounded flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-[#5C5853] block uppercase">01 // Base Layer</span>
                    <span className="font-bold text-[#0C0C0B]">{activeLayers.base}</span>
                  </div>
                  <span className="text-[10px] text-[#3E4A38] font-bold">Moisture Transport</span>
                </div>

                <div className="p-3 bg-[#EAE8E2] rounded flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-[#5C5853] block uppercase">02 // Mid Aerodynamic Layer</span>
                    <span className="font-bold text-[#0C0C0B]">{activeLayers.mid}</span>
                  </div>
                  <span className="text-[10px] text-[#3E4A38] font-bold">Thermal Core</span>
                </div>

                <div className="p-3 bg-[#EAE8E2] rounded flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-[#5C5853] block uppercase">03 // Outer Defensive Shell</span>
                    <span className="font-bold text-[#0C0C0B]">{activeLayers.outer}</span>
                  </div>
                  <span className="text-[10px] text-[#D35933] font-bold">{activeLayers.cfmRating}</span>
                </div>
              </div>

              <p className="text-xs text-[#5C5853] font-sans pt-1">
                This exact trio preserves optimal 37.2°C core temperature during steady-state threshold training while venting excess internal vapor through micro-porous channels.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Slide-out Peloton Vault Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#F5F4F0] border-l border-[rgba(12,12,11,0.15)] shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[rgba(12,12,11,0.12)] flex items-center justify-between bg-[#EAE8E2]">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-[#3E4A38]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0B] font-bold">
                    Peloton Kit Dispatch
                  </span>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#E0DDD6] text-[#5C5853] hover:text-[#0C0C0B] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {orderConfirmed ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#3E4A38]/10 text-[#3E4A38] flex items-center justify-center mx-auto border border-[#3E4A38]/20">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-mono text-2xl font-black text-[#0C0C0B] uppercase">
                      Dispatch Queued
                    </h3>
                    <p className="text-xs text-[#5C5853] leading-relaxed font-sans max-w-xs mx-auto">
                      Your Pas Normal Studios kit configuration has been routed to the Copenhagen distribution warehouse. Express courier tracking will transmit to your terminal shortly.
                    </p>
                    <div className="p-3 bg-[#EAE8E2] rounded font-mono text-[11px] text-[#3E4A38] font-bold">
                      ORDER: PNS-CPH-2026 // ESCROW SETTLED
                    </div>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-[#5C5853]">
                    Your Peloton Vault is empty.
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#EAE8E2] rounded-sm border border-[rgba(12,12,11,0.12)] space-y-3">
                      <div className="flex gap-4 items-start">
                        <img 
                          src={item.imageUrl} 
                          alt={item.productName}
                          className="w-16 h-20 object-cover rounded border border-[rgba(12,12,11,0.15)] bg-white" 
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-mono font-bold text-sm text-[#0C0C0B] uppercase">
                              {item.productName}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[#0C0C0B]">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="font-mono text-[11px] text-[#3E4A38]">
                            Size: {item.size} // {item.colorway}
                          </div>
                          {item.selectedAccessories.length > 0 && (
                            <div className="text-[11px] text-[#5C5853] space-y-0.5 pt-1 border-t border-[rgba(12,12,11,0.08)] mt-2">
                              <span className="font-mono text-[9px] uppercase tracking-wider block font-bold text-[#0C0C0B]">Bundled Accessories:</span>
                              {item.selectedAccessories.map(acc => (
                                <div key={acc.id} className="flex justify-between">
                                  <span>• {acc.name}</span>
                                  <span>+${acc.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Crash Replacement Policy Card */}
                <div className="p-4 bg-[#E0DDD6] rounded-sm border border-[rgba(12,12,11,0.1)] space-y-2 text-xs">
                  <div className="font-mono text-[10px] text-[#3E4A38] uppercase tracking-wider font-bold">
                    PNS 50% Crash Replacement Guarantee
                  </div>
                  <p className="text-[#5C5853] text-[11px] leading-relaxed">
                    Should your kit suffer tears or abrasion during a racing or training crash, return the damaged garment for a 50% discount on an immediate replacement piece.
                  </p>
                </div>
              </div>

              {/* Drawer Footer */}
              {!orderConfirmed && cart.length > 0 && (
                <div className="p-6 border-t border-[rgba(12,12,11,0.12)] bg-[#EAE8E2] space-y-4">
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-[#5C5853]">
                      <span>SUBTOTAL</span>
                      <span>${rawSubtotal.toFixed(2)}</span>
                    </div>
                    {bundleDiscount > 0 && (
                      <div className="flex justify-between text-[#3E4A38] font-bold">
                        <span>10% KIT BUNDLE SAVINGS</span>
                        <span>-${bundleDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-[#0C0C0B] pt-2 border-t border-[rgba(12,12,11,0.1)]">
                      <span>FINAL SETTLEMENT</span>
                      <span>${finalTotal.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setOrderConfirmed(true)}
                    className="w-full py-4 bg-[#0C0C0B] hover:bg-[#252422] text-white rounded-sm font-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
                  >
                    Authorize Dispatch // ${finalTotal.toFixed(2)} USD
                  </button>

                  <p className="font-mono text-[10px] text-center text-[#5C5853]">
                    DISPATCHED VIA DHL EXPRESS // CARBON NEUTRAL
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[rgba(12,12,11,0.12)] bg-[#EAE8E2] py-12 text-[#5C5853] font-mono text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-[#0C0C0B]">PAS NORMAL STUDIOS</span>
            <span className="text-[rgba(12,12,11,0.2)]">/</span>
            <span>INTERNATIONAL CYCLING CLUB // COPENHAGEN</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span>DESIGNED BY KARL-OSKAR OLSEN & PETER GILES</span>
            <span className="text-[rgba(12,12,11,0.2)]">/</span>
            <span>RACE PROVEN SINCE 2014</span>
          </div>

          <div className="text-[10px] text-[#3E4A38] font-bold">
            ENGINEERED BY BILLY BENJAMIN CONSULTING
          </div>
        </div>
      </footer>
    </div>
  );
}

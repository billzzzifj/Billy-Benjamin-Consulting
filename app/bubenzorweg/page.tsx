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
  Clock,
  Key,
  Fingerprint,
  Layers,
  Activity,
  Info,
  Sliders
} from "lucide-react";

interface VaultProduct {
  id: string;
  name: string;
  germanTitle: string;
  collectionTier: string;
  yearIntroduced: string;
  sku: string;
  price: number;
  winderCount: number;
  securityRating: string;
  lockType: string;
  bodyArmorSpec: string;
  dimensionsCm: { height: number; width: number; depth: number };
  weightKg: number;
  floorLoadKgM2: number;
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface CaliberPreset {
  id: string;
  brand: string;
  caliber: string;
  typicalModel: string;
  tpdTarget: number;
  direction: "Bidirectional" | "Clockwise" | "Counter-Clockwise";
  rotorType: string;
  reserveHours: number;
  restSchedule: string;
}

interface CartItem {
  vaultId: string;
  vaultName: string;
  price: number;
  leatherColor: string;
  ledColorTemp: string;
  alarmTieInEnabled: boolean;
  calibratedCaliber: string;
  sku: string;
  imageUrl: string;
}

const BZ_CATALOG: VaultProduct[] = [
  {
    id: "bz-orion-safe",
    name: "THE ORION VDS-I",
    germanTitle: "Hochsicherheits-Tresor mit TIME MOVER®",
    collectionTier: "VdS-I Certified Master Safe Tier",
    yearIntroduced: "2021 / German Armored Refinement",
    sku: "BZ-ORN-VDS1-08",
    price: 42000.00,
    winderCount: 8,
    securityRating: "German VdS Class I (EN 1143-1 Security Standard)",
    lockType: "Redundant Biometric Fingerprint Recognition & German Mechanical Key Lock",
    bodyArmorSpec: "Multi-Wall Composite Steel & Thermal Relocker Barrier Resistant to Diamond Core Drilling",
    dimensionsCm: { height: 122, width: 62, depth: 54 },
    weightKg: 340,
    floorLoadKgM2: 890,
    curatorNotes: "Constructed with German precision in Pforzheim, the Orion combines high-security VdS-certified steel vault defense with handcrafted Italian Nappa leather. Each TIME MOVER® module operates with micro-stepper motors emitting less than 10 decibels of sound, ensuring silent bedside or master dressing room integration.",
    images: [
      {
        label: "01 // VDS-I ARMORED STEEL & TIME MOVER® MATRIX",
        url: "/assets/bubenzorweg/bz-orion-safe.jpg",
        caption: "Precision watch winder bay lined with hand-stitched leather and calibrated LED museum spotlights."
      },
      {
        label: "02 // BIOMETRIC STEEL KEYPAD & REDUNDANCY",
        url: "/assets/bubenzorweg/bz-orion-keypad.jpg",
        caption: "Optical fingerprint sensor opens the 60mm solid steel door in under 0.8 seconds."
      },
      {
        label: "03 // GERMAN MECHANICAL RELOCKER MECHANICS",
        url: "/assets/bubenzorweg/bz-orion-relocker.jpg",
        caption: "Emergency glass-plate relockers instantly fire hardened bolts into the frame upon drill penetration."
      }
    ],
    accentColor: "#C5A059"
  },
  {
    id: "bz-illusion-vault",
    name: "THE ILLUSION COLUMN",
    germanTitle: "Säulen-Tresor mit Mechanischer Hebevorrichtung",
    collectionTier: "Architectural Elevation Vault Tier",
    yearIntroduced: "2019",
    sku: "BZ-ILS-ELEV-04",
    price: 71000.00,
    winderCount: 4,
    securityRating: "Integrated Armored Steel Base with High-Tensile Steel Column",
    lockType: "Silent Biometric Elevation Sensor with Motorized Telescopic Rise",
    bodyArmorSpec: "Laser-Cut Structural Steel Column with Hand-Polished High-Gloss Obsidian Lacquer",
    dimensionsCm: { height: 130, width: 48, depth: 48 },
    weightKg: 240,
    floorLoadKgM2: 680,
    curatorNotes: "The Illusion appears as a sleek, monolithic sculptural column in piano black lacquer. Upon biometric fingerprint authorization, the central armored steel column rises silently upwards, presenting 4 Time Mover® watch winders and two locked velvet drawers for bullion and high jewelry.",
    images: [
      {
        label: "01 // MONOLITHIC ELEVATION ARCHITECTURE",
        url: "/assets/bubenzorweg/bz-illusion-vault.jpg",
        caption: "Silent telescopic motorized ascent unveiling horological winders upon biometric scan."
      },
      {
        label: "02 // ITALIAN NAPPA DRAWER STORAGE",
        url: "/assets/bubenzorweg/bz-illusion-drawers.jpg",
        caption: "Compartments sized for passport folios, bearer instruments, and high-jewelry presentation."
      },
      {
        label: "03 // HIGH-GLOSS OBSIDIAN PIANO FINISH",
        url: "/assets/bubenzorweg/bz-illusion-finish.jpg",
        caption: "18 coats of hand-rubbed polyester lacquer polished to an immaculate mirror gloss."
      }
    ],
    accentColor: "#7E4826"
  },
  {
    id: "bz-grand-infinity",
    name: "THE GRANDE INFINITY",
    germanTitle: "Monumentale Tourbillon-Wanduhr & Tresor",
    collectionTier: "Imperial Horological Complication Tier",
    yearIntroduced: "2023 / Centennial Masterpiece",
    sku: "BZ-GRD-INF-20",
    price: 142000.00,
    winderCount: 20,
    securityRating: "German VdS Class II Reinforced Vault Base (EN 1143-1)",
    lockType: "Dual Biometric & Mechanical Master Locks with Electronic Alarm Linkage",
    bodyArmorSpec: "Armored Steel Vault Foundation supporting Flying Minute Tourbillon Clock Cabinet",
    dimensionsCm: { height: 212, width: 88, depth: 64 },
    weightKg: 580,
    floorLoadKgM2: 1240,
    curatorNotes: "A monumental horological installation crowned by an authentic Buben & Zorweg Flying Minute Tourbillon clock with a 500-hour power reserve. Beneath the crystal showcase sits an armored VdS Class II vault housing 20 individually programmable Time Mover® winders.",
    images: [
      {
        label: "01 // SKELETONIZED TOURBILLON & 20-WINDER VAULT",
        url: "/assets/bubenzorweg/bz-tourbillon-infinity.jpg",
        caption: "Exposed ruthenium-plated gearing and 500-hour power reserve balance wheel above the vault bay."
      },
      {
        label: "02 // 20-WINDER INDEPENDENT PROGRAMMING",
        url: "/assets/bubenzorweg/bz-infinity-winders.jpg",
        caption: "Each timepiece winder module can be independently tuned to exact caliber TPD specifications."
      },
      {
        label: "03 // INTEGRATED WORLD TIME COMPLICATION",
        url: "/assets/bubenzorweg/bz-infinity-dial.jpg",
        caption: "Hand-finished blued steel hands sweeping across an open-worked three-dimensional dial."
      }
    ],
    accentColor: "#2E5077"
  }
];

const CALIBER_PRESETS: CaliberPreset[] = [
  {
    id: "rolex-3235",
    brand: "Rolex",
    caliber: "Caliber 3235 (Submariner / Datejust 41)",
    typicalModel: "Submariner Date, Sea-Dweller, GMT-Master II",
    tpdTarget: 650,
    direction: "Bidirectional",
    rotorType: "Perpetual Rotor with Ball Bearings",
    reserveHours: 70,
    restSchedule: "12 Hours Winding (54 TPH) / 12 Hours Rest Phase"
  },
  {
    id: "patek-240",
    brand: "Patek Philippe",
    caliber: "Caliber 240 (Nautilus / Calatrava Ultra-Thin)",
    typicalModel: "Nautilus 5712, Calatrava 6006G",
    tpdTarget: 800,
    direction: "Clockwise",
    rotorType: "22K Solid Gold Unidirectional Micro-Rotor",
    reserveHours: 48,
    restSchedule: "14 Hours Winding (57 TPH) / 10 Hours Rest Phase"
  },
  {
    id: "ap-4302",
    brand: "Audemars Piguet",
    caliber: "Caliber 4302 (Royal Oak 41mm)",
    typicalModel: "Royal Oak Selfwinding Ref. 15500ST",
    tpdTarget: 750,
    direction: "Bidirectional",
    rotorType: "22K Solid Gold Monobloc Rotor",
    reserveHours: 70,
    restSchedule: "12 Hours Winding (62 TPH) / 12 Hours Rest Phase"
  },
  {
    id: "lange-l095",
    brand: "A. Lange & Söhne",
    caliber: "Caliber L095.1 (Lange 1 Daymatic)",
    typicalModel: "Lange 1 Daymatic in Platinum",
    tpdTarget: 650,
    direction: "Counter-Clockwise",
    rotorType: "21K Gold Rotor with Platinum Centrifugal Mass",
    reserveHours: 50,
    restSchedule: "12 Hours Winding (54 TPH) / 12 Hours Rest Phase"
  },
  {
    id: "richard-mille-rmul2",
    brand: "Richard Mille",
    caliber: "Caliber RMUL2 (Skeletonized Titanium)",
    typicalModel: "RM 035 Baby Nadal, RM 055 Bubba Watson",
    tpdTarget: 850,
    direction: "Bidirectional",
    rotorType: "Variable-Geometry Heavy Tungsten Rotor Ribs",
    reserveHours: 55,
    restSchedule: "14 Hours Winding (60 TPH) / 10 Hours Rest Phase"
  }
];

export default function BubenZorwegPage() {
  const [selectedVaultIndex, setSelectedVaultIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedLeather, setSelectedLeather] = useState<string>("Cognac Saddle Nappa");
  const [selectedLedTemp, setSelectedLedTemp] = useState<string>("3000K Warm Museum");
  const [alarmTieInEnabled, setAlarmTieInEnabled] = useState<boolean>(true);

  // Calibrator 01: Horological Caliber & TPD Matcher
  const [selectedCaliberId, setSelectedCaliberId] = useState<string>("rolex-3235");
  const [isWinderOscillating, setIsWinderOscillating] = useState<boolean>(true);

  // Calibrator 02: Structural Floor Load & VdS Defense
  const [selectedFloorType, setSelectedFloorType] = useState<"concrete" | "timber" | "penthouse">("concrete");

  // Cart & Slide-Out Drawer
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const activeVault = BZ_CATALOG[selectedVaultIndex];
  const activeCaliber = CALIBER_PRESETS.find(c => c.id === selectedCaliberId) || CALIBER_PRESETS[0];

  const handleAddToCart = () => {
    const finalPrice = activeVault.price + (alarmTieInEnabled ? 3800 : 0);
    const newItem: CartItem = {
      vaultId: activeVault.id,
      vaultName: activeVault.name,
      price: finalPrice,
      leatherColor: selectedLeather,
      ledColorTemp: selectedLedTemp,
      alarmTieInEnabled: alarmTieInEnabled,
      calibratedCaliber: `${activeCaliber.brand} ${activeCaliber.caliber}`,
      sku: activeVault.sku,
      imageUrl: activeVault.images[0].url
    };

    setCart([newItem]);
    setIsDrawerOpen(true);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-[#0E1013] text-[#E2E6EA] font-sans selection:bg-[#C5A059] selection:text-black">
      {/* Top Telemetry Header */}
      <header className="border-b border-[rgba(226,230,234,0.12)] bg-[#0E1013]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="group flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8A9099] hover:text-[#E2E6EA] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>BBC Index</span>
            </Link>
            <div className="h-4 w-px bg-[rgba(226,230,234,0.15)]" />
            <div className="flex items-center space-x-2">
              <span className="font-serif italic text-lg tracking-wide text-[#E2E6EA]">
                Buben & Zorweg
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#181A1F] text-[#C5A059] rounded border border-[rgba(197,160,89,0.2)]">
                Pforzheim & Grieskirchen // 1995
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-[#8A9099]">
              <span>GERMAN VDS-I / VDS-II CERTIFIED</span>
              <span className="text-[rgba(226,230,234,0.2)]">/</span>
              <span>TIME MOVER® INDUCTION</span>
              <span className="text-[rgba(226,230,234,0.2)]">/</span>
              <span className="text-[#C5A059] font-bold">&lt; 10 DB SILENT MOTOR</span>
            </div>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#181A1F] transition-colors flex items-center space-x-2 border border-[rgba(226,230,234,0.15)]"
            >
              <ShoppingBag className="w-4 h-4 text-[#E2E6EA]" />
              {cart.length > 0 && (
                <span className="font-mono text-xs font-bold text-[#C5A059]">
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
        <section className="space-y-4 border-b border-[rgba(226,230,234,0.12)] pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                <p className="font-mono text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                  Atelier Exhibition Series 13 // High-Security Horological Vaults
                </p>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#E2E6EA] font-normal tracking-tight">
                Architectural Horology & Vault Engineering
              </h1>
            </div>
            <div className="max-w-md text-sm text-[#8A9099] leading-relaxed font-sans">
              Founded by Harald Buben and Christian Zorweg, Buben & Zorweg manufactures certified German armored safes, silent TIME MOVER® watch winders, and private collector vaults safeguarding multi-million-dollar horological archives.
            </div>
          </div>

          {/* Vault Collection Switcher Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(226,230,234,0.15)] border border-[rgba(226,230,234,0.15)] rounded-sm overflow-hidden mt-8">
            {BZ_CATALOG.map((vault, idx) => {
              const isSelected = selectedVaultIndex === idx;
              return (
                <button
                  key={vault.id}
                  onClick={() => {
                    setSelectedVaultIndex(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`p-5 text-left transition-all ${
                    isSelected ? "bg-[#181A1F] text-[#E2E6EA]" : "bg-[#121417] text-[#8A9099] hover:bg-[#16181D]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#C5A059] font-bold">
                      Vault Specimen 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#E2E6EA]">
                      ${vault.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="font-serif text-lg font-medium tracking-tight text-[#E2E6EA]">
                    {vault.name}
                  </div>
                  <div className="text-xs font-sans text-[#8A9099] mt-1 flex items-center justify-between">
                    <span>{vault.winderCount} Time Mover® Units</span>
                    <span className="font-mono text-[10px] text-[#C5A059]">{vault.weightKg} kg</span>
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
            <div className="relative aspect-[4/5] bg-[#121417] rounded-sm overflow-hidden border border-[rgba(226,230,234,0.15)] group">
              <img 
                src={activeVault.images[activeImageIndex].url}
                alt={activeVault.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#0E1013]/90 backdrop-blur px-3 py-1.5 rounded border border-[rgba(226,230,234,0.15)]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#E2E6EA] font-bold">
                  {activeVault.images[activeImageIndex].label}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#0E1013]/95 backdrop-blur p-3.5 rounded border border-[rgba(226,230,234,0.15)]">
                <p className="text-xs text-[#8A9099] font-sans leading-relaxed">
                  {activeVault.images[activeImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-3 gap-4">
              {activeVault.images.map((img, imgIdx) => (
                <button
                  key={imgIdx}
                  onClick={() => setActiveImageIndex(imgIdx)}
                  className={`relative aspect-[4/3] rounded-sm overflow-hidden border transition-all ${
                    activeImageIndex === imgIdx 
                      ? "border-[#C5A059] ring-2 ring-[#C5A059]/20" 
                      : "border-[rgba(226,230,234,0.15)] opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="font-mono text-[9px] text-white tracking-widest uppercase font-bold">
                      0{imgIdx + 1} // VIEW
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Forensic Engineering Telemetry Ledger */}
            <div className="p-6 bg-[#14161A] rounded-sm border border-[rgba(226,230,234,0.12)] space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(226,230,234,0.1)] pb-3">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2E6EA] font-bold">
                    German VdS Armor & Structural Audit
                  </span>
                </div>
                <span className="font-mono text-xs text-[#C5A059] font-bold">
                  {activeVault.sku}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#8A9099] block uppercase">Weight</span>
                  <span className="font-bold text-[#E2E6EA]">{activeVault.weightKg} kg (Net)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A9099] block uppercase">Floor Load</span>
                  <span className="font-bold text-[#C5A059]">{activeVault.floorLoadKgM2} kg/m²</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A9099] block uppercase">Security Rating</span>
                  <span className="font-bold text-[#E2E6EA]">{activeVault.securityRating.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A9099] block uppercase">Dimensions</span>
                  <span className="font-bold text-[#8A9099]">{activeVault.dimensionsCm.height}×{activeVault.dimensionsCm.width}×{activeVault.dimensionsCm.depth} cm</span>
                </div>
              </div>

              <p className="text-xs text-[#8A9099] leading-relaxed font-sans pt-1">
                {activeVault.curatorNotes}
              </p>
            </div>
          </div>

          {/* Right Column: Physical Specifications & Customization Console (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Header Block */}
            <div className="space-y-3 border-b border-[rgba(226,230,234,0.12)] pb-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                  {activeVault.collectionTier}
                </span>
                <span className="font-mono text-xs text-[#8A9099]">
                  {activeVault.yearIntroduced}
                </span>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-[#E2E6EA] tracking-tight">
                {activeVault.name}
              </h2>
              <p className="font-serif italic text-base text-[#8A9099]">
                {activeVault.germanTitle}
              </p>

              <div className="pt-2 flex items-baseline space-x-3">
                <span className="font-serif text-3xl font-medium text-[#E2E6EA]">
                  ${activeVault.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className="font-mono text-xs text-[#8A9099] uppercase tracking-wider">
                  USD // White-Glove Armored Transit Included
                </span>
              </div>
            </div>

            {/* Forensic Architecture Specs */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#E2E6EA] font-bold">
                Security & Mechanical Specs
              </h3>
              
              <div className="divide-y divide-[rgba(226,230,234,0.08)] border border-[rgba(226,230,234,0.12)] rounded-sm bg-[#14161A] font-mono text-xs">
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#8A9099]">TIME MOVER® MODULES</span>
                  <span className="font-bold text-[#E2E6EA] text-right">{activeVault.winderCount} Independent Winders</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#8A9099]">AUTHENTICATION</span>
                  <span className="font-bold text-[#E2E6EA] text-right max-w-[220px] truncate">{activeVault.lockType}</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#8A9099]">ARMOR COMPOSITION</span>
                  <span className="font-bold text-[#C5A059] text-right max-w-[240px] truncate">{activeVault.bodyArmorSpec}</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#8A9099]">SOUND EMISSION</span>
                  <span className="font-bold text-[#E2E6EA] text-right">&lt; 10 dB (Whisper Silent Stepper)</span>
                </div>
              </div>
            </div>

            {/* Bespoke Italian Nappa Leather Interior Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E2E6EA] font-bold">
                  Interior Nappa Leather Lining
                </span>
                <span className="font-mono text-xs text-[#C5A059]">
                  {selectedLeather}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Cognac Saddle Nappa", hex: "#7E4826" },
                  { name: "Obsidian Black Nappa", hex: "#151618" },
                  { name: "Royal Burgundy Nappa", hex: "#5C1D24" },
                  { name: "Alabaster Ivory Nappa", hex: "#E6E2D8" }
                ].map(leather => {
                  const isSelected = selectedLeather === leather.name;
                  return (
                    <button
                      key={leather.name}
                      onClick={() => setSelectedLeather(leather.name)}
                      className={`p-3 text-left rounded-sm border transition-all flex items-center space-x-3 ${
                        isSelected 
                          ? "bg-[#1C1F24] border-[#C5A059] text-[#E2E6EA]" 
                          : "bg-[#14161A] border-[rgba(226,230,234,0.12)] text-[#8A9099] hover:bg-[#181A1F]"
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-white/20 shrink-0" 
                        style={{ backgroundColor: leather.hex }} 
                      />
                      <span className="text-xs font-medium truncate">{leather.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LED Color Temperature & Alarm Add-on */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E2E6EA] font-bold">
                  Ambient Museum LED Lighting
                </span>
                <span className="font-mono text-xs text-[#8A9099]">
                  Fading Dimmer Included
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {["3000K Warm Museum", "4500K Pure Daylight"].map(temp => (
                  <button
                    key={temp}
                    onClick={() => setSelectedLedTemp(temp)}
                    className={`p-2.5 text-center rounded border transition-all ${
                      selectedLedTemp === temp 
                        ? "bg-[#1C1F24] text-[#C5A059] border-[#C5A059]" 
                        : "bg-[#14161A] text-[#8A9099] border-[rgba(226,230,234,0.12)]"
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>

              {/* Swiss Home Security System Tie-In */}
              <div className="p-4 bg-[#14161A] rounded-sm border border-[rgba(226,230,234,0.12)] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alarmTieInEnabled}
                      onChange={(e) => setAlarmTieInEnabled(e.target.checked)}
                      className="rounded border-[rgba(226,230,234,0.2)] text-[#C5A059] focus:ring-[#C5A059] bg-[#0E1013]"
                    />
                    <span className="font-mono text-xs font-bold text-[#E2E6EA] uppercase tracking-wider">
                      Integrated VdS Home Alarm Relay Interface
                    </span>
                  </label>
                  <span className="font-mono text-xs font-semibold text-[#C5A059]">
                    +$3,800.00
                  </span>
                </div>
                <p className="text-xs text-[#8A9099] pl-6 font-sans">
                  Direct connection interface wiring into central residential monitoring systems, reporting duress code entry or vibration tampering.
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#C5A059] hover:bg-[#B38F48] text-black rounded-sm font-mono text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-sm font-bold group"
            >
              <span>Reserve Vault Commission // ${(activeVault.price + (alarmTieInEnabled ? 3800 : 0)).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
            </button>

            <div className="flex items-center justify-center space-x-6 text-[11px] font-mono text-[#8A9099]">
              <span className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>5-Year German Factory Warranty</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>VdS German Security Certificate</span>
              </span>
            </div>

          </div>
        </section>

        {/* Section 02: Horological Caliber & Turns-Per-Day (TPD) Matcher */}
        <section className="bg-[#14161A] border border-[rgba(226,230,234,0.15)] rounded-sm p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(226,230,234,0.12)] pb-6">
            <div>
              <div className="flex items-center space-x-2 text-[#C5A059] mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Precision Engineering Module 01
                </span>
              </div>
              <h2 className="font-serif text-3xl text-[#E2E6EA]">
                Caliber & Turns-Per-Day (TPD) Time Mover® Matcher
              </h2>
            </div>
            
            <p className="max-w-md text-xs text-[#8A9099] font-sans">
              Automatic mechanical calibers suffer mainspring bridle wear when continuously wound or rotor sluggishness when under-wound. Time Mover® executes exact turns followed by 12-hour resting intervals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Caliber Selector Strip */}
            <div className="lg:col-span-5 space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E2E6EA] font-bold block mb-3">
                Select Collector Timepiece Caliber
              </span>
              {CALIBER_PRESETS.map(cal => {
                const isSelected = selectedCaliberId === cal.id;
                return (
                  <button
                    key={cal.id}
                    onClick={() => setSelectedCaliberId(cal.id)}
                    className={`w-full p-3.5 text-left rounded-sm border transition-all ${
                      isSelected 
                        ? "bg-[#1C1F24] border-[#C5A059] text-[#E2E6EA]" 
                        : "bg-[#0E1013] border-[rgba(226,230,234,0.1)] text-[#8A9099] hover:bg-[#14161A]"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-[#C5A059]">{cal.brand}</span>
                      <span className="font-mono text-[11px] text-[#E2E6EA]">{cal.tpdTarget} TPD // {cal.direction}</span>
                    </div>
                    <div className="text-xs font-medium text-[#E2E6EA] mt-1">{cal.caliber}</div>
                    <div className="text-[11px] text-[#8A9099] font-sans mt-0.5">{cal.typicalModel}</div>
                  </button>
                );
              })}
            </div>

            {/* Time Mover® Dynamic Telemetry Box */}
            <div className="lg:col-span-7 p-6 bg-[#0E1013] rounded-sm border border-[rgba(226,230,234,0.15)] space-y-5 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[rgba(226,230,234,0.1)] pb-3">
                <div className="text-[10px] text-[#C5A059] uppercase tracking-wider font-bold">
                  Time Mover® Induction Telemetry // {activeCaliber.brand}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Motor Active</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-[#181A1F] rounded">
                  <span className="text-[10px] text-[#8A9099] block uppercase">Target TPD</span>
                  <span className="text-base font-bold text-[#C5A059]">{activeCaliber.tpdTarget} Rotations/Day</span>
                </div>
                <div className="p-3 bg-[#181A1F] rounded">
                  <span className="text-[10px] text-[#8A9099] block uppercase">Rotation Sense</span>
                  <span className="text-base font-bold text-[#E2E6EA]">{activeCaliber.direction}</span>
                </div>
                <div className="p-3 bg-[#181A1F] rounded">
                  <span className="text-[10px] text-[#8A9099] block uppercase">Power Reserve</span>
                  <span className="text-base font-bold text-[#E2E6EA]">{activeCaliber.reserveHours} Hours</span>
                </div>
              </div>

              <div className="p-4 bg-[#14161A] rounded space-y-2 border border-[rgba(226,230,234,0.08)]">
                <span className="text-[10px] text-[#C5A059] block uppercase font-bold">Bridle Protection & Sleep Phase Cycle</span>
                <p className="text-xs text-[#8A9099] font-sans leading-relaxed">
                  {activeCaliber.restSchedule}. The winder operates at 12 RPM, rotating the watch into vertical display alignment at the conclusion of each duty cycle so the dial remains upright for aesthetic appreciation.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8A9099] pt-1">
                <span>Rotor Construction: {activeCaliber.rotorType}</span>
                <span className="text-[#C5A059] font-bold">Zero Magnetization Shielding</span>
              </div>
            </div>

          </div>
        </section>

        {/* Section 03: VdS German Security & Structural Floor Load Calibrator */}
        <section className="bg-[#121417] border border-[rgba(226,230,234,0.15)] rounded-sm p-8 space-y-8">
          <div className="border-b border-[rgba(226,230,234,0.12)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#C5A059] mb-1">
                <Shield className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Precision Engineering Module 02
                </span>
              </div>
              <h2 className="font-serif text-3xl text-[#E2E6EA]">
                VdS Security Certification & Architectural Floor Load
              </h2>
            </div>
            <p className="max-w-md text-xs text-[#8A9099] font-sans">
              Safes weighing between 240kg and 580kg require forensic architectural verification to determine floor anchoring compliance and slab load dispersal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Structural Selection Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3 font-mono text-xs">
                <span className="font-bold text-[#E2E6EA] uppercase tracking-wider block">
                  Select Architectural Substructure
                </span>

                {[
                  { id: "concrete", title: "Reinforced Concrete Slab", maxLoad: "1,500 kg/m²", note: "Direct M16 floor expansion anchor drilling permitted." },
                  { id: "timber", title: "Historic Timber Beam Joists", maxLoad: "280 kg/m²", note: "Requires load-dispersion steel sub-frame plate." },
                  { id: "penthouse", title: "Penthouse Floating Screed", maxLoad: "450 kg/m²", note: "Requires acoustic dampening elastomer decoupling pad." }
                ].map(floor => (
                  <button
                    key={floor.id}
                    onClick={() => setSelectedFloorType(floor.id as any)}
                    className={`w-full p-3.5 text-left rounded border transition-all ${
                      selectedFloorType === floor.id 
                        ? "bg-[#1C1F24] border-[#C5A059] text-[#E2E6EA]" 
                        : "bg-[#0E1013] border-[rgba(226,230,234,0.1)] text-[#8A9099] hover:bg-[#14161A]"
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-[#E2E6EA]">{floor.title}</span>
                      <span className="text-[#C5A059]">{floor.maxLoad} Limit</span>
                    </div>
                    <div className="text-[11px] text-[#8A9099] font-sans mt-1">{floor.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Compliance HUD */}
            <div className="lg:col-span-7 p-6 bg-[#0E1013] rounded-sm border border-[rgba(226,230,234,0.15)] space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[rgba(226,230,234,0.1)] pb-3">
                <span className="text-[10px] text-[#C5A059] uppercase tracking-wider font-bold">
                  Slab Load Verification // {activeVault.name}
                </span>
                <span className="text-emerald-400 font-bold uppercase">
                  {selectedFloorType === "timber" && activeVault.floorLoadKgM2 > 280 ? "Spreader Plate Required" : "Structural Clearance OK"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#181A1F] rounded">
                  <span className="text-[10px] text-[#8A9099] block uppercase">Applied Vault Load</span>
                  <span className="text-base font-bold text-[#E2E6EA]">{activeVault.floorLoadKgM2} kg/m²</span>
                </div>
                <div className="p-3 bg-[#181A1F] rounded">
                  <span className="text-[10px] text-[#8A9099] block uppercase">Armor Resistance Class</span>
                  <span className="text-base font-bold text-[#C5A059]">{activeVault.securityRating.split(' ')[1]}</span>
                </div>
              </div>

              <div className="p-4 bg-[#14161A] rounded space-y-2 border border-[rgba(226,230,234,0.08)] font-sans text-xs text-[#8A9099]">
                <p>
                  <strong>Euro-Norm EN 1143-1 Telemetry:</strong> Features glass plate explosive relockers that trigger instantaneous deadbolt deadlocks if diamond core drills or thermal cutting lances penetrate past the outer 25mm composite armor barrier.
                </p>
                <p>
                  Certified under European Insurance standards for high-value horology contents up to €250,000 without requiring secondary guard personnel.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Slide-out Commission Vault Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0E1013] border-l border-[rgba(226,230,234,0.15)] shadow-2xl flex flex-col justify-between text-[#E2E6EA]">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[rgba(226,230,234,0.12)] flex items-center justify-between bg-[#14161A]">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2E6EA] font-bold">
                    Vault Allocation Registry
                  </span>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#1C1F24] text-[#8A9099] hover:text-[#E2E6EA] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {orderConfirmed ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mx-auto border border-[#C5A059]/20">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#E2E6EA]">
                      Commission Allocated
                    </h3>
                    <p className="text-xs text-[#8A9099] leading-relaxed font-sans max-w-xs mx-auto">
                      Your vault commission has been transmitted to Buben & Zorweg manufacture headquarters in Pforzheim. An armored transport dossier has been queued for your estate address.
                    </p>
                    <div className="p-3 bg-[#181A1F] rounded font-mono text-[11px] text-[#C5A059] font-bold">
                      SKU: {activeVault.sku} // ESCROW DEPOSIT LOCKED
                    </div>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-[#8A9099]">
                    Your Vault Registry is empty.
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#14161A] rounded-sm border border-[rgba(226,230,234,0.12)] space-y-3">
                      <div className="flex gap-4 items-start">
                        <img 
                          src={item.imageUrl} 
                          alt={item.vaultName}
                          className="w-16 h-20 object-cover rounded border border-[rgba(226,230,234,0.15)] bg-black" 
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif font-medium text-base text-[#E2E6EA]">
                              {item.vaultName}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[#C5A059]">
                              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="font-mono text-[11px] text-[#8A9099]">
                            {item.sku}
                          </div>
                          <div className="text-[11px] text-[#8A9099] space-y-0.5 pt-1 border-t border-[rgba(226,230,234,0.08)] mt-2">
                            <div>• Leather: {item.leatherColor}</div>
                            <div>• LED: {item.ledColorTemp}</div>
                            <div>• Time Mover®: {item.calibratedCaliber}</div>
                            {item.alarmTieInEnabled && (
                              <div className="text-[#C5A059]">• VdS Alarm Interface: Activated</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Armored Delivery Guarantee */}
                <div className="p-4 bg-[#14161A] rounded-sm border border-[rgba(226,230,234,0.1)] space-y-2 text-xs">
                  <div className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider font-bold">
                    White-Glove Armored Installation
                  </div>
                  <p className="text-[#8A9099] text-[11px] leading-relaxed">
                    Delivered via specialized heavy-handling logistics crews with hydraulic crawler stair-climbers. Floor anchoring and M16 bolt installation executed according to VdS guidelines.
                  </p>
                </div>
              </div>

              {/* Drawer Footer */}
              {!orderConfirmed && cart.length > 0 && (
                <div className="p-6 border-t border-[rgba(226,230,234,0.12)] bg-[#14161A] space-y-4">
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="text-xs text-[#8A9099]">TOTAL COMMISSION</span>
                    <span className="text-xl font-bold text-[#E2E6EA]">
                      ${cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <button
                    onClick={() => setOrderConfirmed(true)}
                    className="w-full py-4 bg-[#C5A059] hover:bg-[#B38F48] text-black rounded-sm font-mono text-xs uppercase tracking-widest font-bold transition-colors shadow-sm"
                  >
                    Authorize Escrow Allocation
                  </button>

                  <p className="font-mono text-[10px] text-center text-[#8A9099]">
                    ESCROW RECEPTACLE MONITORED BY STRIPE & VDS COMPLIANCE
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[rgba(226,230,234,0.12)] bg-[#0A0C0E] py-12 text-[#8A9099] font-mono text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-serif italic text-base text-[#E2E6EA]">Buben & Zorweg</span>
            <span className="text-[rgba(226,230,234,0.2)]">/</span>
            <span>MANUFACTURE DE LUXE // PFORZHEIM • GRIESKIRCHEN</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span>FOUNDED 1995 BY HARALD BUBEN & CHRISTIAN ZORWEG</span>
            <span className="text-[rgba(226,230,234,0.2)]">/</span>
            <span>VDS-GERMANY CERTIFIED</span>
          </div>

          <div className="text-[10px] text-[#C5A059]">
            ENGINEERED BY BILLY BENJAMIN CONSULTING
          </div>
        </div>
      </footer>
    </div>
  );
}

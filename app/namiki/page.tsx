"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Feather,
  Droplet,
  Layers,
  Info
} from "lucide-react";

interface ArtisanPen {
  id: string;
  name: string;
  japaneseTitle: string;
  artisanGuildMaster: string;
  collectionTier: string;
  yearIntroduced: string;
  serialNumber: string;
  annualAllocation: number;
  allocatedNumber: number;
  price: number;
  nibSpec: string;
  nibSizeCode: string;
  fillingMechanism: string;
  reservoirCapacityMl: number;
  lacquerTechnique: string;
  bodyMaterial: string;
  dimensionsMm: { lengthCapped: number; diameterBarrel: number; weightGrams: number };
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface InkOption {
  id: string;
  name: string;
  japaneseName: string;
  hex: string;
  description: string;
}

interface CartItem {
  penId: string;
  penName: string;
  price: number;
  nibGrade: string;
  inkChoice: string;
  hasCustomMonogram: boolean;
  monogramInitials: string;
  serialNumber: string;
  imageUrl: string;
}

const NAMIKI_ARCHIVE: ArtisanPen[] = [
  {
    id: "namiki-emperor-dragon",
    name: "THE EMPEROR DRAGON",
    japaneseTitle: "皇帝 龍 研出高蒔絵",
    artisanGuildMaster: "Master Masato Sato (佐藤雅人) — Kokkokai",
    collectionTier: "Imperial Grand Complication Tier",
    yearIntroduced: "1930 / Reissued 2018",
    serialNumber: "EMP-2026-042",
    annualAllocation: 88,
    allocatedNumber: 42,
    price: 12800.00,
    nibSpec: "Oversized Colossal No. 50 18-Karat Two-Tone Solid Gold with Mount Fuji Engraving",
    nibSizeCode: "No. 50",
    fillingMechanism: "Traditional Japanese Eyedropper with Stainless Steel Shut-Off Valve & Seal Rod",
    reservoirCapacityMl: 6.0,
    lacquerTechnique: "Togidashi-Taka Maki-e (Burnished Raised Gold Relief with Charcoal Polish)",
    bodyMaterial: "Hand-Turned Natural Hard Ebonite (Vulcanite Core)",
    dimensionsMm: { lengthCapped: 174, diameterBarrel: 17.2, weightGrams: 48.5 },
    curatorNotes: "Crafted on an imposing hard vulcanite foundation, the Emperor represents the zenith of the Kokkokai guild. The five-clawed celestial dragon is sculpted using sumiko charcoal dust paste for dimensional relief, then showered in high-karat gold powder (Kinpun) before undergoing weeks of delicate charcoal leveling.",
    images: [
      {
        label: "01 // TOGIDASHI-TAKA MAKI-E EMPIRE SCALE",
        url: "/assets/namiki/namiki-emperor-dragon.jpg",
        caption: "Colossal No. 50 two-tone gold nib paired with raised burnished gold dragon relief on mirror-finished Roiro Urushi."
      },
      {
        label: "02 // KOKKOKAI GUILD SIGNATURE & SEAL",
        url: "https://images.unsplash.com/photo-1585336261026-61168065d648?auto=format&fit=crop&w=1200&q=85",
        caption: "Individual artisan mark inscribed in fine red Urushi lacquer certifying master guild origin."
      },
      {
        label: "03 // KIRI WOOD PRESENTATION ARCHIVE",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
        caption: "Traditional Japanese Paulownia (Kiri) chest lined in raw silk with eyedropper pipette and certification scroll."
      }
    ],
    accentColor: "#9E7B34"
  },
  {
    id: "namiki-yukari-royale-vermilion",
    name: "YUKARI ROYALE VERMILION",
    japaneseTitle: "ユカリ ロイヤル 朱漆",
    artisanGuildMaster: "Master Kyusai Yoshida (吉田久斎) — Kokkokai",
    collectionTier: "Prestige Roiro Urushi Tier",
    yearIntroduced: "1998",
    serialNumber: "YKR-2026-119",
    annualAllocation: 250,
    allocatedNumber: 119,
    price: 2400.00,
    nibSpec: "Large No. 20 18-Karat Two-Tone Solid Gold with Pilot Heritage Stamping",
    nibSizeCode: "No. 20",
    fillingMechanism: "High-Capacity Con-70 Push-Button Vacuum Converter / Cartridge",
    reservoirCapacityMl: 1.1,
    lacquerTechnique: "Pure Roiro Urushi (32 Micro-Layers of Hand-Cured Cinnabar Lacquer)",
    bodyMaterial: "Precision Brass Core Weighted Foundation with Ebonite Cap",
    dimensionsMm: { lengthCapped: 149, diameterBarrel: 15.6, weightGrams: 44.5 },
    curatorNotes: "The Yukari Royale Vermilion represents monochrome purism. Without decorative gold powder, the entire focus rests on the purity of the cinnabar mineral pigment suspended in Japanese tree sap, cured in moisture-regulated muro chambers and hand-polished with Suruga charcoal.",
    images: [
      {
        label: "01 // CINNABAR ROIRO REFLECTANCE",
        url: "/assets/namiki/namiki-yukari-royale.jpg",
        caption: "Liquid glass depth of 32 hand-applied cinnabar urushi layers meeting the solid 18k No. 20 nib."
      },
      {
        label: "02 // CON-70 VACUUM CALIBRATION",
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85",
        caption: "High-capacity push-button converter delivering rhythmic, bubble-free capillary ink induction."
      },
      {
        label: "03 // ECHIZEN WASHI CALLIGRAPHY STUDY",
        url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85",
        caption: "Balanced center of gravity engineered for prolonged manuscript writing without fatigue."
      }
    ],
    accentColor: "#A63A29"
  },
  {
    id: "namiki-yukari-raden-galaxy",
    name: "YUKARI RADEN MILKY WAY",
    japaneseTitle: "ユカリ 螺鈿 天の川",
    artisanGuildMaster: "Master Seiki Chida (千田清紀) — Kokkokai",
    collectionTier: "Nacre Inlay & Maki-e Tier",
    yearIntroduced: "2012",
    serialNumber: "RAD-2026-087",
    annualAllocation: 150,
    allocatedNumber: 87,
    price: 3600.00,
    nibSpec: "Classical No. 10 18-Karat Solid Gold Nib with Fine Engraved Borders",
    nibSizeCode: "No. 10",
    fillingMechanism: "Con-70 Push-Button Converter / Standard Pilot Cartridge",
    reservoirCapacityMl: 1.1,
    lacquerTechnique: "Raden (Abalone Shell Inlay) & Togidashi Maki-e (Gold Nacre Dusting)",
    bodyMaterial: "Balanced Hard Ebonite with Precision Internal Sleeving",
    dimensionsMm: { lengthCapped: 142, diameterBarrel: 12.0, weightGrams: 31.0 },
    curatorNotes: "Microscopic slivers of precious blue-green mother-of-pearl abalone shell are manually placed one-by-one by Kokkokai artisans upon tacky Urushi lacquer, evoking celestial star dust across the night sky. The pen is repeatedly glazed and burnished until the iridescent shell lies completely flush.",
    images: [
      {
        label: "01 // IRIDESCENT ABALONE RADEN FIELD",
        url: "/assets/namiki/namiki-raden-galaxy.jpg",
        caption: "Prismatic green and cobalt light refraction from hand-fractured mother-of-pearl suspended in deep obsidian Urushi."
      },
      {
        label: "02 // NO. 10 GOLD NIB ARCHITECTURE",
        url: "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1200&q=85",
        caption: "Flexible tines tuned to respond to micro-variations in hand pressure with immediate capillary ink flow."
      },
      {
        label: "03 // HANDCRAFTED BAMBOO APPARATUS",
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
        caption: "Traditional artisan funpun-zutsu hollow bamboo tubes used to distribute varying gauges of gold dust."
      }
    ],
    accentColor: "#2F5266"
  }
];

const IROSHIZUKU_INKS: InkOption[] = [
  {
    id: "take-sumi",
    name: "Take-Sumi (Bamboo Charcoal)",
    japaneseName: "竹炭",
    hex: "#1A1918",
    description: "Deep velvety matte black inspired by dense bamboo charcoal; supreme water resistance and zero bleed."
  },
  {
    id: "yama-budo",
    name: "Yama-Budo (Crimson Wild Grape)",
    japaneseName: "山葡萄",
    hex: "#7A2048",
    description: "Celebrated dual-tone magenta-crimson with rich gold-green flash sheeting when pooled heavily."
  },
  {
    id: "shin-kai",
    name: "Shin-Kai (Deep Sea)",
    japaneseName: "深海",
    hex: "#1B3B52",
    description: "Subtle muted blue-black recalling ocean depths at dusk; exceptionally clean shade transitions on cotton paper."
  },
  {
    id: "ku-jaku",
    name: "Ku-Jaku (Peacock Teal)",
    japaneseName: "孔雀",
    hex: "#1D6A74",
    description: "Luminous mineral teal with bright turquoise undertones, evoking vibrant plumage in morning light."
  }
];

interface NibGradeSpec {
  grade: string;
  name: string;
  japaneseName: string;
  mmWidth: number;
  inkLaydownRate: string;
  recommendedUse: string;
  strokeDescription: string;
}

const NIB_GRADES: NibGradeSpec[] = [
  {
    grade: "EF",
    name: "Extra Fine",
    japaneseName: "極細",
    mmWidth: 0.28,
    inkLaydownRate: "14.2 µL / meter",
    recommendedUse: "Micro-Marginalia, Japanese Kanji balance, architectural annotations",
    strokeDescription: "Crisp, surgical hairline with absolute tactile tooth and zero feathering on untreated fiber."
  },
  {
    grade: "F",
    name: "Fine",
    japaneseName: "細字",
    mmWidth: 0.38,
    inkLaydownRate: "19.5 µL / meter",
    recommendedUse: "Daily executive correspondence, contracts, continuous cursive journals",
    strokeDescription: "The gold standard Japanese executive point. Equivalent to a Western Extra Fine."
  },
  {
    grade: "FM",
    name: "Fine Medium",
    japaneseName: "中細",
    mmWidth: 0.46,
    inkLaydownRate: "24.8 µL / meter",
    recommendedUse: "Quintessential Japanese balance; subtle flex shading without line sprawl",
    strokeDescription: "Proprietary Japanese geometry offering soft cushion feel with controlled ink distribution."
  },
  {
    grade: "M",
    name: "Medium",
    japaneseName: "中字",
    mmWidth: 0.58,
    inkLaydownRate: "32.0 µL / meter",
    recommendedUse: "Expressive manuscript signatures, rich multi-chromatic ink pooling",
    strokeDescription: "Generous capillary flow with glassy glide across cotton paper and pronounced sheen revelation."
  },
  {
    grade: "B",
    name: "Broad",
    japaneseName: "太字",
    mmWidth: 0.76,
    inkLaydownRate: "42.5 µL / meter",
    recommendedUse: "Diplomatic signings, bold calligraphy ribbon titles, heavy ink sheen display",
    strokeDescription: "Opulent, wet ribbon of ink revealing the full chromatic separation of natural mineral dyes."
  }
];

const MAKI_E_STRATA = [
  {
    step: "01",
    title: "Raw Vulcanized Ebonite Core",
    japaneseTitle: "エボナイト芯材 削り出し",
    duration: "2 Weeks Lathe Turning",
    description: "Hard natural rubber vulcanized with pure sulfur is turned on precision Japanese lathes. Ebonite provides the optimal thermal inertia, absorbing hand warmth and maintaining constant internal air temperature to prevent pressure leaks."
  },
  {
    step: "02",
    title: "Ki-Urushi Primer & Linen Wrapping",
    japaneseTitle: "布着せ 木地固め",
    duration: "14 Days Curing",
    description: "Raw unrefined Urushi sap (Ki-Urushi) is impregnated into the porous ebonite. Critical stress joints are reinforced with fine Echizen linen cloth bound in lacquer paste (Nori-urushi) to eliminate barrel warping over decades."
  },
  {
    step: "03",
    title: "Roiro Kuro-Urushi Foundation",
    japaneseTitle: "下地 呂色漆 塗布",
    duration: "6 Weeks Muro Drying",
    description: "Up to 15 successive coats of iron-catalyzed black Roiro lacquer are layered. Each layer is cured inside a high-humidity wooden cabinet (Furo/Muro) at 25°C and 75% humidity, where the lacquer hardens through enzymatic oxidation."
  },
  {
    step: "04",
    title: "Kinpun 24K Gold & Raden Dusting",
    japaneseTitle: "粉蒔き 螺鈿 象嵌",
    duration: "Artisan Guild Hand-Scoring",
    description: "Master artisans blow pure 24-karat gold powder (Kinpun) of graduated particle sizes through goose-quill or bamboo pipes (Funpun-zutsu) onto tacky wet lacquer. Abalone nacre slivers are precisely embedded with needle tweezers."
  },
  {
    step: "05",
    title: "Suki-Urushi Amber Protective Glaze",
    japaneseTitle: "固め 研ぎ出し",
    duration: "30 Days Encasement",
    description: "The metallic dust and fragile shell inlays are completely flooded in amber-translucent protective lacquer (Suki-urushi), hermetically sealing the precious materials against human skin oils and atmospheric oxidation."
  },
  {
    step: "06",
    title: "Suruga Charcoal Mirror Leveling",
    japaneseTitle: "炭研ぎ 磨き 仕上げ",
    duration: "10 Days Micro-Polishing",
    description: "Using soft water and natural Suruga charcoal blocks, the master burnishes the surface until the gold artwork re-emerges flush with the surrounding lacquer. Finished by hand with deer horn powder (Tsunoko) and refined camellia oil."
  }
];

export default function NamikiHauteAtelierPage() {
  const [selectedPenIndex, setSelectedPenIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedNibGrade, setSelectedNibGrade] = useState<string>("FM");
  const [selectedInkId, setSelectedInkId] = useState<string>("take-sumi");
  const [selectedStrataStep, setSelectedStrataStep] = useState<number>(3);
  const [paperTexture, setPaperTexture] = useState<"washi" | "vellum">("washi");
  const [monogramEnabled, setMonogramEnabled] = useState<boolean>(false);
  const [monogramText, setMonogramText] = useState<string>("BB");

  // Cart & Drawer State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  // Drawing Canvas State for the Nib Calibrator
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  const activePen = NAMIKI_ARCHIVE[selectedPenIndex];
  const activeNibSpec = NIB_GRADES.find(n => n.grade === selectedNibGrade) || NIB_GRADES[2];
  const activeInk = IROSHIZUKU_INKS.find(i => i.id === selectedInkId) || IROSHIZUKU_INKS[0];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = 200;

    // Draw background texture
    drawCanvasBackground(ctx, canvas.width, canvas.height, paperTexture);
  }, [paperTexture]);

  const drawCanvasBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, paper: "washi" | "vellum") => {
    if (paper === "washi") {
      ctx.fillStyle = "#F7F4EC";
      ctx.fillRect(0, 0, width, height);

      // Subtle Washi paper grain
      ctx.strokeStyle = "rgba(166, 140, 100, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < height; i += 12) {
        ctx.beginPath();
        ctx.moveTo(0, i + Math.sin(i * 0.1) * 2);
        ctx.lineTo(width, i + Math.cos(i * 0.1) * 2);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Rhodia-style subtle dot grid
      ctx.fillStyle = "rgba(100, 120, 150, 0.18)";
      for (let x = 15; x < width; x += 15) {
        for (let y = 15; y < height; y += 15) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Default calligraphic watermarks
    ctx.font = "italic 14px 'Playfair Display', Georgia, serif";
    ctx.fillStyle = "rgba(100, 90, 80, 0.3)";
    ctx.fillText("Kokkokai Artisan Nib Pressure Pad — Draw with Cursor / Stylus", 20, 30);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawCanvasBackground(ctx, canvas.width, canvas.height, paperTexture);
  };

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setLastPoint({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const currentPoint = { x: clientX - rect.left, y: clientY - rect.top };

    // Calculate line stroke physics based on nib millimeter width
    const baseWidth = activeNibSpec.mmWidth * 4.5;
    ctx.lineWidth = baseWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Set ink color with subtle wet bleed
    ctx.strokeStyle = activeInk.hex;
    ctx.shadowColor = activeInk.hex;
    ctx.shadowBlur = paperTexture === "washi" ? 1.5 : 0.4;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    setLastPoint(currentPoint);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const handleAddToCart = () => {
    const newItem: CartItem = {
      penId: activePen.id,
      penName: activePen.name,
      price: activePen.price + (monogramEnabled ? 250 : 0),
      nibGrade: `${activeNibSpec.grade} — ${activeNibSpec.name} (${activeNibSpec.mmWidth}mm)`,
      inkChoice: `${activeInk.name} [50ml Glass Flacon]`,
      hasCustomMonogram: monogramEnabled,
      monogramInitials: monogramEnabled ? monogramText.toUpperCase() : "None",
      serialNumber: activePen.serialNumber,
      imageUrl: activePen.images[0].url
    };

    setCart([newItem]);
    setIsDrawerOpen(true);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#181615] font-sans selection:bg-[#A63A29] selection:text-white">
      {/* Top Telemetry Bar */}
      <header className="border-b border-[rgba(24,22,21,0.12)] bg-[#F8F6F0]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="group flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#69625A] hover:text-[#181615] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>BBC Index</span>
            </Link>
            <div className="h-4 w-px bg-[rgba(24,22,21,0.15)]" />
            <div className="flex items-center space-x-2">
              <span className="font-serif italic text-lg tracking-wide text-[#181615]">Namiki</span>
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#EDE7DC] text-[#69625A] rounded border border-[rgba(24,22,21,0.08)]">
                Kokkokai Artisan Guild 1926
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-[#69625A]">
              <span>TOKYO // HIRATSUKA ATELIER</span>
              <span className="text-[rgba(24,22,21,0.2)]">/</span>
              <span>18K GOLD NIB FORGE</span>
              <span className="text-[rgba(24,22,21,0.2)]">/</span>
              <span className="text-[#A63A29] font-medium">国光会 KOKKOKAI REGISTER</span>
            </div>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#EDE7DC] transition-colors flex items-center space-x-2 border border-[rgba(24,22,21,0.12)]"
            >
              <ShoppingBag className="w-4 h-4 text-[#181615]" />
              {cart.length > 0 && (
                <span className="font-mono text-xs font-bold text-[#A63A29]">
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
        <section className="space-y-4 border-b border-[rgba(24,22,21,0.12)] pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A63A29]" />
                <p className="font-mono text-xs uppercase tracking-widest text-[#A63A29] font-medium">
                  Atelier Exhibition Series 11 // Sovereign Writing Instruments
                </p>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#181615] font-normal tracking-tight">
                The Kokkokai Urushi Stratigraphy
              </h1>
            </div>
            <div className="max-w-md text-sm text-[#69625A] leading-relaxed font-sans">
              Founded in 1926 by Ryosuke Namiki and Gonroku Matsuda, the Kokkokai artisan collective unites Living National Treasure masters in Hiratsuka, Japan. Each piece demands months of unaccelerated lacquer sap enzymatic curing, hand-carved ebonite turning, and pure 24K gold powder distribution.
            </div>
          </div>

          {/* Model Selector Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(24,22,21,0.15)] border border-[rgba(24,22,21,0.15)] rounded-sm overflow-hidden mt-8">
            {NAMIKI_ARCHIVE.map((pen, idx) => {
              const isSelected = selectedPenIndex === idx;
              return (
                <button
                  key={pen.id}
                  onClick={() => {
                    setSelectedPenIndex(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`p-5 text-left transition-all ${
                    isSelected ? "bg-[#EDE7DC] text-[#181615]" : "bg-[#F8F6F0] text-[#69625A] hover:bg-[#F3EFE6]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#A63A29]">
                      Archive 0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#181615]">
                      ${pen.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="font-serif text-lg font-medium text-[#181615] tracking-tight">
                    {pen.name}
                  </div>
                  <div className="text-xs font-sans text-[#69625A] mt-1 flex items-center justify-between">
                    <span>{pen.japaneseTitle}</span>
                    <span className="font-mono text-[10px] text-[#A63A29]">{pen.nibSizeCode}</span>
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
            <div className="relative aspect-[4/5] bg-[#EDE7DC] rounded-sm overflow-hidden border border-[rgba(24,22,21,0.15)] group">
              <img 
                src={activePen.images[activeImageIndex].url}
                alt={activePen.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#F8F6F0]/90 backdrop-blur px-3 py-1.5 rounded border border-[rgba(24,22,21,0.12)]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#181615]">
                  {activePen.images[activeImageIndex].label}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#F8F6F0]/95 backdrop-blur p-3.5 rounded border border-[rgba(24,22,21,0.12)]">
                <p className="text-xs text-[#69625A] font-sans leading-relaxed">
                  {activePen.images[activeImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-3 gap-4">
              {activePen.images.map((img, imgIdx) => (
                <button
                  key={imgIdx}
                  onClick={() => setActiveImageIndex(imgIdx)}
                  className={`relative aspect-[4/3] rounded-sm overflow-hidden border transition-all ${
                    activeImageIndex === imgIdx 
                      ? "border-[#A63A29] ring-2 ring-[#A63A29]/20" 
                      : "border-[rgba(24,22,21,0.15)] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-2">
                    <span className="font-mono text-[9px] text-white tracking-widest uppercase">
                      0{imgIdx + 1} // VIEW
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Artisan Verification Ledger */}
            <div className="p-6 bg-[#F3EFE6] rounded-sm border border-[rgba(24,22,21,0.12)] space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(24,22,21,0.1)] pb-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#A63A29]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#181615] font-bold">
                    Master Artisan Sign-Off Ledger
                  </span>
                </div>
                <span className="font-mono text-xs text-[#A63A29] font-medium">
                  {activePen.serialNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#69625A] block uppercase">Artisan Master</span>
                  <span className="font-medium text-[#181615]">{activePen.artisanGuildMaster.split(' ')[1]} {activePen.artisanGuildMaster.split(' ')[2]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#69625A] block uppercase">Guild Guild</span>
                  <span className="font-medium text-[#181615]">Kokkokai (国光会)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#69625A] block uppercase">Annual Limit</span>
                  <span className="font-medium text-[#181615]">{activePen.annualAllocation} Pieces</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#69625A] block uppercase">Allocation</span>
                  <span className="font-medium text-[#A63A29]">No. {activePen.allocatedNumber} / {activePen.annualAllocation}</span>
                </div>
              </div>

              <p className="text-xs text-[#69625A] leading-relaxed font-sans pt-1">
                {activePen.curatorNotes}
              </p>
            </div>
          </div>

          {/* Right Column: Physical Specifications & Commission Console (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Specimen Header Block */}
            <div className="space-y-3 border-b border-[rgba(24,22,21,0.12)] pb-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#A63A29] font-medium">
                  {activePen.collectionTier}
                </span>
                <span className="font-mono text-xs text-[#69625A]">
                  EST. {activePen.yearIntroduced}
                </span>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-[#181615] tracking-tight">
                {activePen.name}
              </h2>
              <p className="font-serif italic text-base text-[#69625A]">
                {activePen.japaneseTitle}
              </p>

              <div className="pt-2 flex items-baseline space-x-3">
                <span className="font-serif text-3xl font-medium text-[#181615]">
                  ${activePen.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className="font-mono text-xs text-[#69625A] uppercase tracking-wider">
                  USD // Diplomatic Air Freight Included
                </span>
              </div>
            </div>

            {/* Forensic Architecture Specs */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#181615] font-bold">
                Instrument Specifications
              </h3>
              
              <div className="divide-y divide-[rgba(24,22,21,0.08)] border border-[rgba(24,22,21,0.12)] rounded-sm bg-[#F3EFE6] font-mono text-xs">
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#69625A]">NIB ARCHITECTURE</span>
                  <span className="font-medium text-[#181615] text-right max-w-[240px] truncate">{activePen.nibSpec}</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#69625A]">FILLING MECHANISM</span>
                  <span className="font-medium text-[#181615] text-right">{activePen.fillingMechanism}</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#69625A]">INK CAPACITY</span>
                  <span className="font-medium text-[#A63A29] text-right">{activePen.reservoirCapacityMl} mL Reservoir</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#69625A]">LACQUER PROFILE</span>
                  <span className="font-medium text-[#181615] text-right max-w-[240px] truncate">{activePen.lacquerTechnique}</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#69625A]">FOUNDATION</span>
                  <span className="font-medium text-[#181615] text-right">{activePen.bodyMaterial}</span>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <span className="text-[#69625A]">DIMENSIONS / WEIGHT</span>
                  <span className="font-medium text-[#181615] text-right">
                    {activePen.dimensionsMm.lengthCapped}mm × {activePen.dimensionsMm.diameterBarrel}mm ({activePen.dimensionsMm.weightGrams}g)
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Nib Grade Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#181615] font-bold flex items-center space-x-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#A63A29]" />
                  <span>Calibrated Japanese Gold Nib</span>
                </span>
                <span className="font-mono text-xs text-[#A63A29]">
                  {activeNibSpec.grade} ({activeNibSpec.mmWidth}mm)
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {NIB_GRADES.map(nib => {
                  const isSelected = selectedNibGrade === nib.grade;
                  return (
                    <button
                      key={nib.grade}
                      onClick={() => setSelectedNibGrade(nib.grade)}
                      className={`p-2.5 text-center rounded-sm border transition-all ${
                        isSelected 
                          ? "bg-[#181615] text-white border-[#181615]" 
                          : "bg-[#F3EFE6] text-[#69625A] border-[rgba(24,22,21,0.12)] hover:border-[#181615]"
                      }`}
                    >
                      <div className="font-mono text-xs font-bold">{nib.grade}</div>
                      <div className="text-[10px] opacity-75">{nib.japaneseName}</div>
                      <div className="text-[9px] font-mono mt-0.5">{nib.mmWidth}mm</div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-[#EDE7DC] rounded-sm text-xs text-[#69625A] flex items-start space-x-2">
                <Info className="w-4 h-4 text-[#A63A29] shrink-0 mt-0.5" />
                <span>
                  <strong>Japanese Nib Metric:</strong> Japanese hand-ground tines produce lines approximately 1 full grade finer than German or Italian nibs. Recommended for: {activeNibSpec.recommendedUse}.
                </span>
              </div>
            </div>

            {/* Complimentary Iroshizuku Ink Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#181615] font-bold flex items-center space-x-1.5">
                  <Droplet className="w-3.5 h-3.5 text-[#A63A29]" />
                  <span>Complimentary Iroshizuku 50mL Flacon</span>
                </span>
                <span className="font-mono text-xs text-[#69625A]">
                  Included ($35 Value)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {IROSHIZUKU_INKS.map(ink => {
                  const isSelected = selectedInkId === ink.id;
                  return (
                    <button
                      key={ink.id}
                      onClick={() => setSelectedInkId(ink.id)}
                      className={`p-3 text-left rounded-sm border transition-all flex items-center space-x-3 ${
                        isSelected 
                          ? "bg-[#EDE7DC] border-[#181615] text-[#181615]" 
                          : "bg-[#F3EFE6] border-[rgba(24,22,21,0.12)] text-[#69625A] hover:bg-[#EDE7DC]"
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0" 
                        style={{ backgroundColor: ink.hex }} 
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-medium text-[#181615] truncate">{ink.name}</div>
                        <div className="text-[10px] font-mono text-[#69625A]">{ink.japaneseName}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Maki-e Monogramming Add-on */}
            <div className="p-4 bg-[#F3EFE6] rounded-sm border border-[rgba(24,22,21,0.12)] space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={monogramEnabled}
                    onChange={(e) => setMonogramEnabled(e.target.checked)}
                    className="rounded border-[rgba(24,22,21,0.2)] text-[#A63A29] focus:ring-[#A63A29]"
                  />
                  <span className="font-mono text-xs font-bold text-[#181615] uppercase tracking-wider">
                    24K Gold Urushi Monogramming
                  </span>
                </label>
                <span className="font-mono text-xs font-semibold text-[#A63A29]">
                  +$250.00
                </span>
              </div>

              {monogramEnabled && (
                <div className="pt-2 space-y-2">
                  <p className="text-xs text-[#69625A]">
                    Master artisan will hand-paint initials in pure gold dust (Kinpun) on the lower barrel flank:
                  </p>
                  <input
                    type="text"
                    maxLength={3}
                    value={monogramText}
                    onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                    className="w-full bg-[#F8F6F0] border border-[rgba(24,22,21,0.2)] rounded px-3 py-2 font-mono text-center tracking-widest text-lg font-bold text-[#181615] focus:outline-none focus:border-[#A63A29]"
                    placeholder="INITIALS (MAX 3)"
                  />
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-[#181615] hover:bg-[#2C2927] text-white rounded-sm font-mono text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-sm group"
            >
              <span>Commission Instrument // ${(activePen.price + (monogramEnabled ? 250 : 0)).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center space-x-6 text-[11px] font-mono text-[#69625A]">
              <span className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-[#A63A29]" />
                <span>Lifetime Guild Guarantee</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#A63A29]" />
                <span>Insured Escrow Transit</span>
              </span>
            </div>

          </div>
        </section>

        {/* Section 02: Interactive Japanese Nib Calligraphy & Ink Flow Calibrator */}
        <section className="bg-[#F3EFE6] border border-[rgba(24,22,21,0.15)] rounded-sm p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(24,22,21,0.12)] pb-6">
            <div>
              <div className="flex items-center space-x-2 text-[#A63A29] mb-1">
                <Feather className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Tactile Physics Module 01
                </span>
              </div>
              <h2 className="font-serif text-3xl text-[#181615]">
                Japanese Nib Width & Ink Flow Calibrator
              </h2>
            </div>
            
            {/* Paper Selection Toggle */}
            <div className="flex items-center space-x-2 bg-[#EDE7DC] p-1 rounded-sm border border-[rgba(24,22,21,0.1)]">
              <button
                onClick={() => setPaperTexture("washi")}
                className={`px-3 py-1.5 font-mono text-xs rounded transition-colors ${
                  paperTexture === "washi" 
                    ? "bg-[#181615] text-white" 
                    : "text-[#69625A] hover:text-[#181615]"
                }`}
              >
                Echizen Mulberry Washi
              </button>
              <button
                onClick={() => setPaperTexture("vellum")}
                className={`px-3 py-1.5 font-mono text-xs rounded transition-colors ${
                  paperTexture === "vellum" 
                    ? "bg-[#181615] text-white" 
                    : "text-[#69625A] hover:text-[#181615]"
                }`}
              >
                Rhodia 90gsm Vellum
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Telemetry Readout */}
            <div className="lg:col-span-4 space-y-4 font-mono text-xs">
              <div className="p-4 bg-[#EDE7DC] rounded-sm space-y-3 border border-[rgba(24,22,21,0.1)]">
                <div className="text-[10px] text-[#A63A29] uppercase tracking-wider font-bold">
                  Active Point Telemetry
                </div>
                <div className="flex justify-between items-center text-sm font-serif">
                  <span className="text-[#181615] font-bold">{activeNibSpec.name} ({activeNibSpec.grade})</span>
                  <span className="text-[#A63A29] font-mono text-xs">{activeNibSpec.japaneseName}</span>
                </div>
                <div className="flex justify-between text-[#69625A]">
                  <span>STROKE DIAMETER</span>
                  <span className="text-[#181615] font-bold">{activeNibSpec.mmWidth} mm</span>
                </div>
                <div className="flex justify-between text-[#69625A]">
                  <span>INK LAYDOWN RATE</span>
                  <span className="text-[#181615] font-bold">{activeNibSpec.inkLaydownRate}</span>
                </div>
                <div className="flex justify-between text-[#69625A]">
                  <span>ACTIVE INK PIGMENT</span>
                  <span className="text-[#181615] font-bold">{activeInk.name.split(' ')[0]}</span>
                </div>
              </div>

              <div className="text-xs text-[#69625A] leading-relaxed font-sans">
                {activeNibSpec.strokeDescription}
              </div>

              <button
                onClick={clearCanvas}
                className="w-full py-2 bg-[#EDE7DC] hover:bg-[#E3DCCF] text-[#181615] rounded border border-[rgba(24,22,21,0.12)] font-mono text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear Calibration Pad</span>
              </button>
            </div>

            {/* Interactive Canvas Pad */}
            <div className="lg:col-span-8 space-y-3">
              <div className="relative border-2 border-[rgba(24,22,21,0.2)] rounded-sm overflow-hidden shadow-inner cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-52 block"
                />
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-[#69625A]">
                <span>DRAG CURSOR OR TOUCHPAD ACROSS CANVAS TO SIMULATE TACTILE STROKE FEEL</span>
                <span className="text-[#A63A29] font-medium">REAL-TIME INK BLEED ACTIVE</span>
              </div>
            </div>

          </div>
        </section>

        {/* Section 03: Togidashi Maki-e Stratigraphy Exploded Layer Viewer */}
        <section className="bg-[#EDE7DC] border border-[rgba(24,22,21,0.15)] rounded-sm p-8 space-y-8">
          <div className="border-b border-[rgba(24,22,21,0.12)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#A63A29] mb-1">
                <Layers className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Tactile Physics Module 02
                </span>
              </div>
              <h2 className="font-serif text-3xl text-[#181615]">
                Togidashi Maki-e Stratigraphy Exploded Anatomy
              </h2>
            </div>
            <p className="max-w-md text-xs text-[#69625A] font-sans">
              Unlike industrial surface painting, Togidashi Maki-e is an additive and subtractive sculpture of 30+ micro-layers requiring 90 to 180 days of patient manual transformation.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {MAKI_E_STRATA.map((layer, idx) => {
              const isSelected = selectedStrataStep === idx;
              return (
                <button
                  key={layer.step}
                  onClick={() => setSelectedStrataStep(idx)}
                  className={`p-3 text-left rounded-sm border transition-all ${
                    isSelected 
                      ? "bg-[#181615] text-white border-[#181615]" 
                      : "bg-[#F8F6F0] text-[#69625A] border-[rgba(24,22,21,0.12)] hover:bg-[#F3EFE6]"
                  }`}
                >
                  <div className={`font-mono text-xs font-bold ${isSelected ? "text-[#C49E4A]" : "text-[#A63A29]"}`}>
                    LAYER {layer.step}
                  </div>
                  <div className="text-[11px] font-medium mt-1 truncate">
                    {layer.title.split(' ')[0]} {layer.title.split(' ')[1]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Layer Deep Dive Card */}
          <div className="p-6 bg-[#F8F6F0] rounded-sm border border-[rgba(24,22,21,0.15)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#A63A29] text-white rounded">
                  STAGE {MAKI_E_STRATA[selectedStrataStep].step} // {MAKI_E_STRATA[selectedStrataStep].duration}
                </span>
                <span className="font-serif italic text-sm text-[#69625A]">
                  {MAKI_E_STRATA[selectedStrataStep].japaneseTitle}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#181615]">
                {MAKI_E_STRATA[selectedStrataStep].title}
              </h3>
              <p className="text-sm text-[#69625A] leading-relaxed font-sans">
                {MAKI_E_STRATA[selectedStrataStep].description}
              </p>
            </div>

            <div className="md:col-span-4 p-4 bg-[#EDE7DC] rounded border border-[rgba(24,22,21,0.1)] space-y-2 font-mono text-xs">
              <div className="text-[10px] text-[#A63A29] uppercase tracking-wider font-bold">
                Curing Physics Telemetry
              </div>
              <div className="flex justify-between text-[#69625A]">
                <span>CHAMBER TEMP</span>
                <span className="text-[#181615] font-bold">24.5°C — 26.0°C</span>
              </div>
              <div className="flex justify-between text-[#69625A]">
                <span>CHAMBER HUMIDITY</span>
                <span className="text-[#181615] font-bold">75% — 80% RH</span>
              </div>
              <div className="flex justify-between text-[#69625A]">
                <span>OXIDATIVE AGENT</span>
                <span className="text-[#181615] font-bold">Laccase Enzyme</span>
              </div>
              <div className="flex justify-between text-[#69625A]">
                <span>POLISHING GRAIN</span>
                <span className="text-[#181615] font-bold">Suruga Charcoal #3000</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Slide-out Commission Vault Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#F8F6F0] border-l border-[rgba(24,22,21,0.15)] shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[rgba(24,22,21,0.12)] flex items-center justify-between bg-[#F3EFE6]">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-[#A63A29]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#181615] font-bold">
                    Imperial Calligraphy Vault
                  </span>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#EDE7DC] text-[#69625A] hover:text-[#181615] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {orderConfirmed ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#A63A29]/10 text-[#A63A29] flex items-center justify-center mx-auto border border-[#A63A29]/20">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#181615]">
                      Commission Registered
                    </h3>
                    <p className="text-xs text-[#69625A] leading-relaxed font-sans max-w-xs mx-auto">
                      Your allocation request has been forwarded to the Kokkokai master artisan desk in Tokyo. An authenticated diplomatic dossier has been queued for your dispatch.
                    </p>
                    <div className="p-3 bg-[#EDE7DC] rounded font-mono text-[11px] text-[#A63A29]">
                      SERIAL: {activePen.serialNumber} // ESCROW SECURED
                    </div>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-[#69625A]">
                    Your Calligraphy Vault is empty.
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#F3EFE6] rounded-sm border border-[rgba(24,22,21,0.12)] space-y-3">
                      <div className="flex gap-4 items-start">
                        <img 
                          src={item.imageUrl} 
                          alt={item.penName}
                          className="w-16 h-20 object-cover rounded border border-[rgba(24,22,21,0.15)] bg-white" 
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif font-medium text-base text-[#181615]">
                              {item.penName}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[#181615]">
                              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="font-mono text-[11px] text-[#A63A29]">
                            {item.serialNumber}
                          </div>
                          <div className="text-[11px] text-[#69625A] space-y-0.5 pt-1">
                            <div>• Nib: {item.nibGrade}</div>
                            <div>• Ink: {item.inkChoice}</div>
                            {item.hasCustomMonogram && (
                              <div>• Gold Monogram: [{item.monogramInitials}]</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Delivery Guarantee Placard */}
                <div className="p-4 bg-[#EDE7DC] rounded-sm border border-[rgba(24,22,21,0.1)] space-y-2 text-xs">
                  <div className="font-mono text-[10px] text-[#A63A29] uppercase tracking-wider font-bold">
                    White-Glove Diplomatic Transit
                  </div>
                  <p className="text-[#69625A] text-[11px] leading-relaxed">
                    Delivered in traditional Paulownia (Kiri) chest with hand-inscribed certificate of authenticity signed by Kokkokai guild masters. Fully insured against transit damage.
                  </p>
                </div>
              </div>

              {/* Drawer Footer */}
              {!orderConfirmed && cart.length > 0 && (
                <div className="p-6 border-t border-[rgba(24,22,21,0.12)] bg-[#F3EFE6] space-y-4">
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="text-xs text-[#69625A]">TOTAL COMMISSION</span>
                    <span className="text-xl font-bold text-[#181615]">
                      ${cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <button
                    onClick={() => setOrderConfirmed(true)}
                    className="w-full py-4 bg-[#A63A29] hover:bg-[#8F3123] text-white rounded-sm font-mono text-xs uppercase tracking-widest transition-colors shadow-sm"
                  >
                    Authorize Escrow Allocation
                  </button>

                  <p className="font-mono text-[10px] text-center text-[#69625A]">
                    SECURED BY STRIPE ESCROW & KOKKOKAI REGISTER
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[rgba(24,22,21,0.12)] bg-[#EDE7DC] py-12 text-[#69625A] font-mono text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-serif italic text-lg text-[#181615]">Namiki</span>
            <span className="text-[rgba(24,22,21,0.2)]">/</span>
            <span>PILOT CORPORATION LUXURY DIVISION</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span>1926–2026 CENTENNIAL GUILD ARCHIVE</span>
            <span className="text-[rgba(24,22,21,0.2)]">/</span>
            <span>TOKYO • HIRATSUKA • PARIS • NEW YORK</span>
          </div>

          <div className="text-[10px] text-[#A63A29]">
            ENGINEERED BY BILLY BENJAMIN CONSULTING
          </div>
        </div>
      </footer>
    </div>
  );
}

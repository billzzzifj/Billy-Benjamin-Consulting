"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Shield, 
  ShoppingBag, 
  X, 
  Activity, 
  Zap, 
  Sparkles, 
  Clock, 
  Flame, 
  Thermometer, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sliders,
  Eye,
  Layers,
  Wrench,
  Fuel,
  Compass,
  FileText,
  Key,
  Maximize2,
  Award,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Package,
  Heart,
  Droplets,
  Sun,
  Moon,
  Wind,
  Watch
} from "lucide-react";

interface WatchModel {
  id: string;
  name: string;
  series: string;
  colorway: string;
  caseDiameter: number; // 38.5 or 37
  lugToLug: number; // 44.5 or 46
  thickness: number; // 13.6
  movement: string;
  dialDescription: string;
  heroImage: string;
  accentColor: string;
  priceGbp: number;
  batchStatus: string;
}

interface StrapOption {
  id: string;
  name: string;
  material: string;
  image: string;
  priceGbp: number;
}

export default function StudioUnderd0gPage() {
  // Flagship Models
  const models: WatchModel[] = [
    {
      id: "watermel0n",
      name: "01SERIES Watermel0n (Gen3)",
      series: "01SERIES Chronograph",
      colorway: "Cantaloupe Green Dégradé & Seed-Stippled Pink",
      caseDiameter: 38.5,
      lugToLug: 44.5,
      thickness: 13.6,
      movement: "Seagull Calibre ST-1901 Manual-Wind (Column Wheel)",
      dialDescription: "Multi-layered dial with coarse stippled dégradé pink core, seed-shaped black hour markers, brushed green tachymeter ring, and cyan chronograph hand.",
      heroImage: "/assets/underd0g/watermel0n-01series.png",
      accentColor: "#FF5E7E",
      priceGbp: 500,
      batchStatus: "BATCH 04 // 18 / 500 REMAINING"
    },
    {
      id: "desert-sky",
      name: "01SERIES Desert Sky (Gen3)",
      series: "01SERIES Chronograph",
      colorway: "Dune Sand Texture & Sky Cyan",
      caseDiameter: 38.5,
      lugToLug: 44.5,
      thickness: 13.6,
      movement: "Seagull Calibre ST-1901 Manual-Wind (Column Wheel)",
      dialDescription: "Evocative desert sand textured dial with sky-blue chronograph sub-registers and deep navy hour tracks, paired with caramel calfskin.",
      heroImage: "/assets/underd0g/desert-sky-01series.png",
      accentColor: "#00C2FF",
      priceGbp: 500,
      batchStatus: "BATCH 04 // 12 / 500 REMAINING"
    },
    {
      id: "mint-ch0c-chip",
      name: "01SERIES Mint Ch0c Chip (Gen3)",
      series: "01SERIES Chronograph",
      colorway: "Pastel Mint Green & Dark Chocolate",
      caseDiameter: 38.5,
      lugToLug: 44.5,
      thickness: 13.6,
      movement: "Seagull Calibre ST-1901 Manual-Wind (Column Wheel)",
      dialDescription: "Cool pastel mint green grain dial with deep dark chocolate pips, cream subdial accents, and polished stainless steel hands.",
      heroImage: "/assets/underd0g/mint-ch0c-chip-01series.png",
      accentColor: "#7AD3B8",
      priceGbp: 500,
      batchStatus: "BATCH 04 // 24 / 500 REMAINING"
    },
    {
      id: "go0fy-panda",
      name: "01SERIES Go0fy Panda (Gen3)",
      series: "01SERIES Chronograph",
      colorway: "Monochrome Panda & Hazard Lime Needle",
      caseDiameter: 38.5,
      lugToLug: 44.5,
      thickness: 13.6,
      movement: "Seagull Calibre ST-1901 Manual-Wind (Column Wheel)",
      dialDescription: "Classic vintage panda layout with asymmetric 3 o'clock oversized minute sub-dial, matte black tachymeter, and lime green chronograph counter.",
      heroImage: "/assets/underd0g/go0fy-panda-01series.png",
      accentColor: "#CCFF00",
      priceGbp: 500,
      batchStatus: "BATCH 04 // 9 / 500 REMAINING"
    },
    {
      id: "pink-lem0nade",
      name: "02SERIES Pink Lem0nade",
      series: "02SERIES Field Watch",
      colorway: "Full-Lume Citron Yellow & Bubblegum Pink",
      caseDiameter: 37.0,
      lugToLug: 46.0,
      thickness: 12.0,
      movement: "Sellita SW210-1 Manual-Wind",
      dialDescription: "37mm field watch architecture with two-piece sapphire dial, completely coated in multi-layered Super-LumiNova for nocturnal visibility.",
      heroImage: "/assets/underd0g/pink-lem0nade-02series.png",
      accentColor: "#FFD43F",
      priceGbp: 675,
      batchStatus: "LIMITED DROP // 31 / 300 REMAINING"
    },
    {
      id: "salm0n",
      name: "03SERIES Salm0n Monopusher",
      series: "03SERIES Monopusher Chronograph",
      colorway: "Brushed Salmon & Charcoal Inlay",
      caseDiameter: 38.5,
      lugToLug: 44.5,
      thickness: 13.6,
      movement: "Sellita SW510M Monopusher Chronograph (Swiss)",
      dialDescription: "Coaxial crown single-pusher chronograph with sector salmon dial, stepped circular brushing, and British hand-assembly.",
      heroImage: "/assets/underd0g/salm0n-03series.png",
      accentColor: "#FA8072",
      priceGbp: 1400,
      batchStatus: "ATELIER BATCH // 5 / 100 REMAINING"
    }
  ];

  // Straps
  const straps: StrapOption[] = [
    {
      id: "strap-forest",
      name: "The Strap Tailor // Forest Green Epsom",
      material: "Handmade British Epsom Calfskin (Tapered 20mm to 16mm)",
      image: "/assets/underd0g/strap-forest-green-epsom.png",
      priceGbp: 0
    },
    {
      id: "strap-taupe",
      name: "The Strap Tailor // Taupe Epsom",
      material: "Handmade British Epsom Calfskin (Supple Vegetable Tan)",
      image: "/assets/underd0g/strap-taupe-epsom.png",
      priceGbp: 0
    },
    {
      id: "strap-mesh",
      name: "Milanese Stainless Steel Mesh",
      material: "Solid 316L Stainless Steel Tight-Weave Milanese",
      image: "/assets/underd0g/strap-milanese-mesh.png",
      priceGbp: 45
    }
  ];

  // State
  const [selectedModel, setSelectedModel] = useState<WatchModel>(models[0]);
  const [selectedStrap, setSelectedStrap] = useState<StrapOption>(straps[0]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Feature 1: Wrist Caliper State
  const [wristInches, setWristInches] = useState<number>(6.75); // 5.5 to 8.5
  const [skinTone, setSkinTone] = useState<"FAIR" | "OLIVE" | "MELANIN" | "DEEP">("OLIVE");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Feature 2: Chronograph Engine State
  const [chronoRunning, setChronoRunning] = useState<boolean>(false);
  const [chronoElapsedSeconds, setChronoElapsedSeconds] = useState<number>(0);
  const [viewExhibitionBack, setViewExhibitionBack] = useState<boolean>(false);
  const chronoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Feature 3: Drop Queue Drawer State
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [queueCountdown, setQueueCountdown] = useState<number>(599); // 10 minutes (599s)
  const [customEngraving, setCustomEngraving] = useState<string>("042 / 500");
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [orderSerial, setOrderSerial] = useState<string>("");

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio Synthesizer: Column Wheel Pusher Click & Reset Snap
  const playColumnWheelClick = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      // Sharp mechanical metal-on-metal column-wheel click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio fallback silent
    }
  };

  const playResetSnapSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      // Heavier mechanical hammer reset spring snap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.45, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio fallback silent
    }
  };

  // Chronograph Stopwatch Engine
  const handleToggleChrono = () => {
    playColumnWheelClick();
    setChronoRunning(prev => !prev);
  };

  const handleResetChrono = () => {
    playResetSnapSound();
    setChronoRunning(false);
    setChronoElapsedSeconds(0);
  };

  useEffect(() => {
    if (chronoRunning) {
      chronoIntervalRef.current = setInterval(() => {
        setChronoElapsedSeconds(prev => prev + 0.1);
      }, 100);
    } else {
      if (chronoIntervalRef.current) clearInterval(chronoIntervalRef.current);
    }
    return () => {
      if (chronoIntervalRef.current) clearInterval(chronoIntervalRef.current);
    };
  }, [chronoRunning]);

  // Drop Queue Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setQueueCountdown(prev => (prev > 0 ? prev - 1 : 599));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 60 FPS Canvas Wrist-Circumference Caliper Simulator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.52;

      // Calculate anatomical wrist flat width from circumference (mm)
      // Standard wrist ergonomics: flat width ~ circumference (in mm) * 0.285
      const wristMm = wristInches * 25.4;
      const flatWidthMm = wristMm * 0.285; // e.g. 6.75" = 171.45mm -> 48.8mm flat top
      const wristHeightMm = wristMm * 0.19;

      // Scale factor: 1mm = 4.2px on canvas
      const pxPerMm = 4.2;
      const wristPixelWidth = flatWidthMm * pxPerMm;
      const wristPixelHeight = wristHeightMm * pxPerMm;

      // Case Dimensions in Pixels
      const lugToLugPx = selectedModel.lugToLug * pxPerMm; // 44.5mm * 4.2 = 186.9px
      const caseDiamPx = selectedModel.caseDiameter * pxPerMm; // 38.5mm * 4.2 = 161.7px

      // Skin Tone Fill
      const skinColors = {
        FAIR: { main: "#F7D8C4", shadow: "#DEB49B" },
        OLIVE: { main: "#D4A373", shadow: "#BC8A5F" },
        MELANIN: { main: "#8D5B4C", shadow: "#6B3E32" },
        DEEP: { main: "#4B281E", shadow: "#32160E" }
      };
      const activeSkin = skinColors[skinTone];

      // Draw Background Millimeter Caliper Grid
      ctx.strokeStyle = "rgba(20, 21, 23, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Anatomical Wrist Ellipse (Top-down perspective)
      ctx.fillStyle = activeSkin.main;
      ctx.strokeStyle = activeSkin.shadow;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, wristPixelWidth / 2, wristPixelHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Wrist Width Boundary Caliper Lines
      ctx.strokeStyle = "rgba(20, 21, 23, 0.25)";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;

      // Left boundary
      ctx.beginPath();
      ctx.moveTo(centerX - wristPixelWidth / 2, 25);
      ctx.lineTo(centerX - wristPixelWidth / 2, canvas.height - 25);
      ctx.stroke();

      // Right boundary
      ctx.beginPath();
      ctx.moveTo(centerX + wristPixelWidth / 2, 25);
      ctx.lineTo(centerX + wristPixelWidth / 2, canvas.height - 25);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Epsom Calfskin Strap Bands
      ctx.fillStyle = "#1E2024";
      ctx.fillRect(centerX - 35, centerY - wristPixelHeight / 2 - 25, 70, 30);
      ctx.fillRect(centerX - 35, centerY + wristPixelHeight / 2 - 5, 70, 30);

      // Draw 316L Stainless Steel Watch Case (Lug-to-Lug Span)
      // Lugs
      ctx.fillStyle = "#E4E6EA";
      ctx.strokeStyle = "#9CA3AF";
      ctx.lineWidth = 1.5;

      // Lug footprint outline
      ctx.beginPath();
      ctx.roundRect(centerX - caseDiamPx / 2 - 6, centerY - lugToLugPx / 2, caseDiamPx + 12, lugToLugPx, 8);
      ctx.fill();
      ctx.stroke();

      // Round Dial Body
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = selectedModel.accentColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, caseDiamPx / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Bezel ring
      ctx.strokeStyle = "#1A1D20";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, caseDiamPx / 2 - 4, 0, Math.PI * 2);
      ctx.stroke();

      // Dial Center Graphic / Hands
      ctx.fillStyle = selectedModel.accentColor;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Caliper Dimension Arrows & Text
      const ratio = selectedModel.lugToLug / flatWidthMm;
      let ratioColor = "#10B981"; // Green (<85%)
      let ratioText = "OPTIMAL FIT // ZERO OVERHANG";
      if (ratio > 0.85 && ratio <= 0.98) {
        ratioColor = "#F59E0B";
        ratioText = "SNUG FIT // LUGS NEAR EDGE";
      } else if (ratio > 0.98) {
        ratioColor = "#EF4444";
        ratioText = "OVERHANG ALERT // LUGS EXCEED WRIST FLAT";
      }

      // Overlay Ratio Badge
      ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
      ctx.strokeStyle = ratioColor;
      ctx.lineWidth = 1.5;
      ctx.fillRect(15, 15, 230, 68);
      ctx.strokeRect(15, 15, 230, 68);

      ctx.fillStyle = "#6B7280";
      ctx.font = "8px monospace";
      ctx.fillText("LUG-TO-WRIST RATIO", 25, 30);

      ctx.fillStyle = ratioColor;
      ctx.font = "bold 13px monospace";
      ctx.fillText(`${(ratio * 100).toFixed(1)}% FLAT OCCUPANCY`, 25, 48);

      ctx.fillStyle = "#1F2937";
      ctx.font = "9px monospace";
      ctx.fillText(ratioText, 25, 66);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [wristInches, skinTone, selectedModel]);

  // Submit Drop Reservation
  const handleReserveDrop = () => {
    const serial = `01WMB-MAIDENHEAD-2026-${Math.floor(100 + Math.random() * 900)}`;
    setOrderSerial(serial);
    setOrderComplete(true);
    playColumnWheelClick();

    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: [selectedModel.accentColor, "#4EBF67", "#00C2FF", "#111111"]
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121316] selection:bg-[#FF5E7E] selection:text-white font-sans antialiased">
      {/* Top Telemetry Header */}
      <header className="sticky top-0 z-40 border-b border-[#121316]/10 bg-[#FAF8F5]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="text-xs font-mono uppercase tracking-widest text-[#71747A] hover:text-black transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <div className="h-4 w-px bg-[#121316]/15" />
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E7E] animate-pulse" />
              <span className="text-sm font-extrabold tracking-tight font-mono text-[#121316]">
                STUDIO UNDERD0G // THE D0GHOUSE
              </span>
            </div>
            <span className="hidden md:inline-block text-[11px] font-mono text-[#8C9098]">
              51.5200° N, 0.6900° W // MAIDENHEAD, UK
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playColumnWheelClick();
              }}
              className="text-xs font-mono flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#121316]/15 hover:border-[#121316]/40 text-[#54575E] transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#FF5E7E]" />
                  <span className="hidden sm:inline">COLUMN WHEEL SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-500" />
                  <span className="hidden sm:inline">COLUMN WHEEL SOUND: OFF</span>
                </>
              )}
            </button>

            {/* Drop Queue Allocation Trigger */}
            <button
              onClick={() => {
                setDrawerOpen(true);
                playColumnWheelClick();
              }}
              className="text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[#121316] text-white hover:bg-[#2C2E33] transition-all flex items-center gap-2 shadow-sm"
            >
              <Clock className="w-3.5 h-3.5 text-[#FF5E7E]" />
              <span>DROP QUEUE ({formatCountdown(queueCountdown)})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Marquee Banner */}
      <div className="border-b border-[#121316]/10 bg-[#FF5E7E]/10 py-2 px-4 text-center">
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#121316] font-bold">
          ASSEMBLED IN GREAT BRITAIN // SEAGULL ST-1901 COLUMN WHEEL // REGULATED BY HOROLOGIUM // EPSOM LEATHER BY THE STRAP TAILOR
        </p>
      </div>

      {/* MAIN HERO: Model Switchboard & Interactive Stage */}
      <section className="py-12 border-b border-[#121316]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#71747A] flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#FF5E7E]" />
              <span>INDEPENDENT BRITISH HOROLOGY // PLAYFUL HOROLOGICAL ART</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#121316] font-mono">
              Serious Watchmaking. Not Taking Ourselves Seriously.
            </h1>
            <p className="text-sm sm:text-base text-[#54575E] mt-3 leading-relaxed">
              Founded by Richard Benc in London. Combining mechanical column-wheel chronographs with joyful colorways and handmade British leathercraft.
            </p>
          </div>

          {/* Model Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
            {models.map(m => {
              const active = m.id === selectedModel.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModel(m);
                    playColumnWheelClick();
                  }}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    active 
                      ? "bg-white border-[#121316] shadow-md scale-[1.02]" 
                      : "bg-[#F0EEEA] border-[#121316]/10 hover:border-[#121316]/30"
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#71747A]">{m.series.split(" ")[0]}</div>
                  <div className="text-xs font-bold font-mono text-[#121316] truncate mt-0.5">
                    {m.name.split(" ")[1]}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#FF5E7E] mt-1">
                    £{m.priceGbp} GBP
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Visual Card + Movement Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Watch Visual Stage */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#121316]/15 bg-white p-8 sm:p-12 relative shadow-lg flex flex-col justify-between min-h-[480px]">
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-[#121316]/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#71747A]">
                      {selectedModel.series}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black font-mono text-[#121316]">
                      {selectedModel.name}
                    </h2>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FF5E7E]/10 border border-[#FF5E7E]/30 text-[#FF5E7E]">
                    {selectedModel.batchStatus}
                  </span>
                </div>

                {/* Hero Product Display */}
                <div className="relative my-6 h-[320px] flex items-center justify-center">
                  <img
                    src={selectedModel.heroImage}
                    alt={selectedModel.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Bottom Dimension Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#121316]/10 text-center font-mono">
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#121316]/5">
                    <div className="text-[10px] text-[#71747A]">CASE DIAMETER</div>
                    <div className="text-sm font-bold text-[#121316]">{selectedModel.caseDiameter} mm</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#121316]/5">
                    <div className="text-[10px] text-[#71747A]">LUG-TO-LUG</div>
                    <div className="text-sm font-bold text-[#121316]">{selectedModel.lugToLug} mm</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#121316]/5">
                    <div className="text-[10px] text-[#71747A]">THICKNESS</div>
                    <div className="text-sm font-bold text-[#121316]">{selectedModel.thickness} mm</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-[#121316]/15 bg-white p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#121316]/10 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#71747A]">
                    SPECIFICATION BREAKDOWN
                  </span>
                  <span className="text-xs font-mono text-[#FF5E7E] font-bold">
                    316L STAINLESS STEEL
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#54575E] leading-relaxed">
                  {selectedModel.dialDescription}
                </p>

                <div className="space-y-2.5 pt-1 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-[#121316]/5">
                    <span className="text-[#71747A]">Movement Architecture</span>
                    <span className="font-bold text-[#121316] text-right max-w-[210px]">{selectedModel.movement}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#121316]/5">
                    <span className="text-[#71747A]">Crystal Structure</span>
                    <span className="font-bold text-[#121316]">Double-Domed Sapphire (AR Coated)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#121316]/5">
                    <span className="text-[#71747A]">Water Resistance</span>
                    <span className="font-bold text-[#121316]">50 Meters (5 ATM)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#121316]/5">
                    <span className="text-[#71747A]">Assembly & QC</span>
                    <span className="font-bold text-emerald-600">Horologium (Maidenhead, UK)</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4 border-t border-[#121316]/10">
                  <div>
                    <div className="text-[10px] font-mono text-[#71747A]">PRICE (INCL. UK VAT)</div>
                    <div className="text-2xl font-black font-mono text-[#121316]">
                      £{selectedModel.priceGbp} GBP
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setDrawerOpen(true);
                      playColumnWheelClick();
                    }}
                    className="px-5 py-3 rounded-full bg-[#121316] hover:bg-[#2C2E33] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    <span>JOIN DROP QUEUE</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Founder Context Card */}
              <div className="rounded-2xl border border-[#121316]/10 bg-[#F0EEEA] p-4 flex items-center gap-4">
                <img
                  src="/assets/underd0g/richard-benc-founder.jpg"
                  alt="Richard Benc, Founder"
                  className="w-14 h-14 rounded-xl object-cover border border-[#121316]/15"
                />
                <div className="flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#FF5E7E] font-bold">
                    FOUNDED IN LONDON // INDEPENDENT
                  </div>
                  <div className="text-xs font-bold text-[#121316] mt-0.5">
                    Richard Benc — Creative Director
                  </div>
                  <p className="text-[11px] text-[#54575E] mt-0.5">
                    "We design watches to spark conversation. If someone doesn't smile when they look at your wrist, what's the point?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 1: 60 FPS Wrist-Circumference Caliper Fit Simulator Canvas */}
      <section className="py-16 border-b border-[#121316]/10 bg-[#F4F2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5E7E] font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>HYPER-CRAFT ERGONOMIC HARNESS // PILOT 01</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#121316] font-mono mt-1 tracking-tight">
                Wrist-Circumference Caliper Simulator.
              </h2>
              <p className="text-xs sm:text-sm text-[#54575E] mt-1 max-w-2xl">
                Eliminate sizing hesitation. Adjust your exact wrist circumference (5.5" to 8.5") to render an anatomically proportional flat-top cross section and verify zero lug overhang.
              </p>
            </div>

            {/* Skin Tone Selector */}
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="text-xs font-mono text-[#71747A] mr-1">Skin Tone:</span>
              {(["FAIR", "OLIVE", "MELANIN", "DEEP"] as const).map(tone => (
                <button
                  key={tone}
                  onClick={() => {
                    setSkinTone(tone);
                    playColumnWheelClick();
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border transition-colors ${
                    skinTone === tone
                      ? "bg-[#121316] text-white border-[#121316]"
                      : "bg-white text-[#71747A] border-[#121316]/15 hover:border-[#121316]/40"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* The 60 FPS Canvas */}
            <div className="lg:col-span-8 rounded-3xl border border-[#121316]/15 bg-white p-6 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono text-[#71747A] mb-3">
                <span>ANATOMICAL WRIST SCALE (4.2 PX = 1.0 MM)</span>
                <span className="text-[#FF5E7E] font-bold">CASE: 38.5MM // LUG-TO-LUG: 44.5MM</span>
              </div>

              <canvas
                ref={canvasRef}
                width={720}
                height={340}
                className="w-full h-[280px] sm:h-[340px] rounded-2xl bg-[#FAF8F5] border border-[#121316]/10"
              />

              {/* Slider Controls Bar */}
              <div className="mt-6 pt-4 border-t border-[#121316]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <span className="text-xs font-mono text-[#71747A]">Wrist Circumference:</span>
                  <input
                    type="range"
                    min="5.5"
                    max="8.5"
                    step="0.125"
                    value={wristInches}
                    onChange={(e) => setWristInches(Number(e.target.value))}
                    className="w-48 accent-[#FF5E7E] cursor-pointer"
                  />
                  <strong className="text-sm font-mono text-[#121316] font-bold">
                    {wristInches}" ({(wristInches * 25.4).toFixed(0)} mm)
                  </strong>
                </div>

                <div className="text-xs font-mono text-[#71747A]">
                  Flat Wrist Top Span: <strong className="text-[#121316]">{(wristInches * 25.4 * 0.285).toFixed(1)} mm</strong>
                </div>
              </div>
            </div>

            {/* Ergonomic Metric Dashboard */}
            <div className="lg:col-span-4 rounded-3xl border border-[#121316]/15 bg-white p-6 space-y-5 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-wider text-[#71747A] border-b border-[#121316]/10 pb-3">
                ERGONOMIC CLEARANCE DOSSIER
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#121316]/10 space-y-2">
                <div className="text-[10px] font-mono text-[#71747A]">CALCULATED WRIST FLAT WIDTH</div>
                <div className="text-2xl font-black font-mono text-[#121316]">
                  {(wristInches * 25.4 * 0.285).toFixed(1)} mm
                </div>
                <p className="text-[11px] text-[#54575E]">
                  Derived from medical bone span formulas across the carpal flat zone.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-[#121316]/5">
                  <span className="text-[#71747A]">Watch Lug-to-Lug Span</span>
                  <span className="font-bold text-[#121316]">44.5 mm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#121316]/5">
                  <span className="text-[#71747A]">Edge Lateral Clearance</span>
                  <span className="font-bold text-emerald-600">
                    +{(((wristInches * 25.4 * 0.285) - 44.5) / 2).toFixed(1)} mm per side
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#71747A]">Strap Hug Angle</span>
                  <span className="font-bold text-[#121316]">Natural Downward Contour</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 leading-snug">
                <strong>VERDICT:</strong> The 44.5mm lug span sits comfortably inside your wrist flat boundary. The downward curved lugs prevent any unsightly overhang.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2: Seagull ST-1901 Chronograph Column Wheel Timing Engine */}
      <section className="py-16 border-b border-[#121316]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5E7E] font-bold flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>MECHANICAL CHRONOGRAPH INTERACTIVE ENGINE // PILOT 02</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#121316] font-mono mt-1 tracking-tight">
                Seagull ST-1901 Column-Wheel Engine.
              </h2>
              <p className="text-xs sm:text-sm text-[#54575E] mt-1 max-w-2xl">
                Experience the tactile actuation of a genuine mechanical column-wheel chronograph. Operates at 21,600 vph with horizontal clutch and swan-neck precision regulator.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Stopwatch Instrument Display */}
            <div className="lg:col-span-7 rounded-3xl border border-[#121316]/15 bg-[#FAF8F5] p-8 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-[#121316]/10 pb-4">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${chronoRunning ? "bg-emerald-500 animate-ping" : "bg-red-500"}`} />
                  <span className="text-xs font-mono font-bold text-[#121316]">
                    STATUS: {chronoRunning ? "CHRONOGRAPH RUNNING (3 HZ SWEEP)" : "CHRONOGRAPH STOPPED"}
                  </span>
                </div>

                <span className="text-xs font-mono text-[#71747A]">
                  CALIBRE ST-1901 // 21,600 VPH
                </span>
              </div>

              {/* Digital Telemetry Stopwatch Display */}
              <div className="p-6 rounded-2xl bg-white border border-[#121316]/10 text-center space-y-2">
                <div className="text-[10px] font-mono text-[#71747A] uppercase">
                  ELAPSED MECHANICAL CHRONOGRAPH TIME
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono text-[#121316] tracking-tight">
                  {Math.floor(chronoElapsedSeconds / 60).toString().padStart(2, "0")}:
                  {(chronoElapsedSeconds % 60).toFixed(1).padStart(4, "0")}s
                </div>
                <div className="text-xs font-mono text-[#71747A]">
                  Continuous Sub-seconds: <strong>{((chronoElapsedSeconds * 6) % 60).toFixed(0)} Ticks</strong> (6 Steps / Sec)
                </div>
              </div>

              {/* Pusher Hardware Controls */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleToggleChrono}
                  className={`py-3.5 px-4 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                    chronoRunning
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-[#121316] hover:bg-[#2C2E33] text-white"
                  }`}
                >
                  {chronoRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>STOP PUSHER (2 O'CLOCK)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>START PUSHER (2 O'CLOCK)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleResetChrono}
                  className="py-3.5 px-4 rounded-full bg-white hover:bg-[#F0EEEA] border border-[#121316]/20 font-mono text-xs font-bold uppercase tracking-wider text-[#121316] transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>RESET PUSHER (4 O'CLOCK)</span>
                </button>
              </div>

              {/* Movement Architecture Callouts */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#121316]/10 text-center font-mono text-xs">
                <div className="p-2 rounded-xl bg-white border border-[#121316]/5">
                  <div className="text-[10px] text-[#71747A]">COLUMN WHEEL</div>
                  <div className="font-bold text-[#121316]">8 Pillars</div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#121316]/5">
                  <div className="text-[10px] text-[#71747A]">POWER RESERVE</div>
                  <div className="font-bold text-[#121316]">42 Hours</div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#121316]/5">
                  <div className="text-[10px] text-[#71747A]">REGULATOR</div>
                  <div className="font-bold text-[#121316]">Swan-Neck</div>
                </div>
              </div>
            </div>

            {/* Right Movement Exploded Info Card */}
            <div className="lg:col-span-5 rounded-3xl border border-[#121316]/15 bg-[#FAF8F5] p-6 sm:p-8 space-y-5 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5E7E] font-bold">
                THE SEAGULL ST-1901 STORY
              </span>
              <h3 className="text-xl font-bold font-mono text-[#121316]">
                Swiss Venus 175 Lineage. Hand-Regulated in Britain.
              </h3>
              <p className="text-xs sm:text-sm text-[#54575E] leading-relaxed">
                The Seagull ST-1901 is the direct historical descendant of the Swiss Venus 175 column-wheel chronograph movement from the 1960s. Studio Underd0g imports raw calibres and partners directly with <strong>Horologium</strong> in Maidenhead, UK to inspect, demagnetize, and regulate every single movement within ±10 seconds/day.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 space-y-2">
                <div className="text-[10px] font-mono text-[#71747A] uppercase">
                  EXHIBITION CASEBACK FINISHES:
                </div>
                <ul className="text-xs font-mono text-[#121316] space-y-1.5 list-disc list-inside">
                  <li>Thermally blued steel actuation screws</li>
                  <li>Hand-beveled horizontal coupling clutch</li>
                  <li>Micro-metric swan-neck spring regulator</li>
                  <li>Golden balance wheel with Incabloc shock protection</li>
                </ul>
              </div>

              <div className="text-xs font-mono text-[#71747A] pt-2 border-t border-[#121316]/10 flex items-center justify-between">
                <span>WARRANTY:</span>
                <span className="font-bold text-[#121316]">2-YEAR FULL UK COVERAGE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRAP SELECTION ATELIER: The Strap Tailor Collaboration */}
      <section className="py-16 border-b border-[#121316]/10 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#71747A] font-bold">
              HANDMADE BRITISH LEATHERCRAFT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-mono mt-1">
              Paired with The Strap Tailor.
            </h2>
            <p className="text-xs sm:text-sm text-[#54575E] mt-1">
              Every Studio Underd0g chronograph ships on an Epsom calfskin strap handmade by artisan David Richards (The Strap Tailor). Tapered from 20mm at the lugs to 16mm at the buckle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {straps.map(s => {
              const active = s.id === selectedStrap.id;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedStrap(s);
                    playColumnWheelClick();
                  }}
                  className={`rounded-2xl border p-6 cursor-pointer transition-all ${
                    active 
                      ? "bg-white border-[#121316] shadow-md scale-[1.02]" 
                      : "bg-[#F0EEEA] border-[#121316]/10 hover:border-[#121316]/30"
                  }`}
                >
                  <div className="h-32 flex items-center justify-center mb-4">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="max-h-full object-contain filter drop-shadow-md"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#121316]">
                    <span>{s.name.split(" // ")[1]}</span>
                    <span>{s.priceGbp === 0 ? "INCLUDED" : `+£${s.priceGbp}`}</span>
                  </div>
                  <div className="text-[11px] text-[#71747A] mt-1 leading-snug">
                    {s.material}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 border-t border-[#121316]/10 bg-[#F0EEEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block p-2 rounded-full bg-[#121316] text-white mb-2">
            <Award className="w-5 h-5 text-[#FF5E7E]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-mono tracking-tight">
            STUDIO UNDERD0G // THE D0GHOUSE
          </h2>
          <p className="text-xs sm:text-sm text-[#54575E] max-w-xl mx-auto leading-relaxed">
            Independent British watch design studio founded by Richard Benc. Dedicated to mechanical transparency, joyful storytelling, and accessible horology.
          </p>

          <div className="pt-6 border-t border-[#121316]/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#71747A] gap-4">
            <div>
              © 2026 STUDIO UNDERD0G LTD // ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center space-x-4">
              <span>BILLY BENJAMIN CONSULTING APEX INTEGRATION</span>
              <span>•</span>
              <a href="mailto:billybenjamin836@gmail.com" className="text-[#121316] hover:text-[#FF5E7E] font-bold transition-colors">
                DIRECT INQUIRY
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* SLIDE-OUT DROP QUEUE ALLOCATION DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#121316]/15 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#121316]/10 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5E7E] uppercase tracking-wider font-bold">
                      THE D0GHOUSE DROP QUEUE
                    </span>
                    <h3 className="text-xl font-bold font-mono text-[#121316] mt-0.5">
                      Batch 04 Allocation
                    </h3>
                  </div>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1 rounded text-[#71747A] hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!orderComplete ? (
                  <div className="space-y-6">
                    {/* Active Timer Pill */}
                    <div className="p-3.5 rounded-xl bg-[#FF5E7E]/10 border border-[#FF5E7E]/30 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[#121316]">RESERVATION CART HOLD:</span>
                      <span className="text-lg font-black text-[#FF5E7E]">{formatCountdown(queueCountdown)}</span>
                    </div>

                    {/* Selected Watch Summary */}
                    <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 flex items-center gap-4">
                      <img
                        src={selectedModel.heroImage}
                        alt={selectedModel.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex-1">
                        <div className="text-xs font-bold font-mono text-[#121316]">{selectedModel.name}</div>
                        <div className="text-[11px] text-[#71747A] mt-0.5">38.5mm // Seagull ST-1901</div>
                        <div className="text-xs font-mono font-bold text-[#FF5E7E] mt-1">£{selectedModel.priceGbp} GBP</div>
                      </div>
                    </div>

                    {/* Selected Strap Display */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#121316]/10 text-xs font-mono flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-[#71747A] uppercase">STRAP SELECTION:</div>
                        <div className="font-bold text-[#121316] mt-0.5">{selectedStrap.name.split(" // ")[1]}</div>
                      </div>
                      <span className="text-[#71747A]">{selectedStrap.priceGbp === 0 ? "INCLUDED" : `+£${selectedStrap.priceGbp}`}</span>
                    </div>

                    {/* Custom Batch Number Engraving */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-[#71747A] uppercase">
                        Caseback Serial Engraving Preference
                      </label>
                      <input
                        type="text"
                        maxLength={12}
                        value={customEngraving}
                        onChange={(e) => setCustomEngraving(e.target.value)}
                        placeholder="e.g. 042 / 500"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#121316]/15 font-mono text-xs text-[#121316] focus:outline-none"
                      />
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-[#71747A]">
                        <span>Timepiece Price:</span>
                        <span>£{selectedModel.priceGbp} GBP</span>
                      </div>
                      {selectedStrap.priceGbp > 0 && (
                        <div className="flex justify-between text-[#71747A]">
                          <span>Strap Upgrade:</span>
                          <span>+£{selectedStrap.priceGbp} GBP</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#71747A]">
                        <span>Tracked UK & Global Shipping:</span>
                        <span className="text-emerald-600 font-bold">COMPLIMENTARY</span>
                      </div>
                      <div className="pt-2 border-t border-[#121316]/10 flex justify-between text-base font-black text-[#121316]">
                        <span>Total Payable:</span>
                        <span>£{selectedModel.priceGbp + selectedStrap.priceGbp} GBP</span>
                      </div>
                    </div>

                    <button
                      onClick={handleReserveDrop}
                      className="w-full py-4 rounded-full bg-[#121316] hover:bg-[#2C2E33] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#FF5E7E]" />
                      <span>SECURE ALLOCATION (£{selectedModel.priceGbp + selectedStrap.priceGbp} GBP)</span>
                    </button>
                  </div>
                ) : (
                  /* Confirmation Ceremony */
                  <div className="space-y-6 text-center py-6">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 border border-emerald-500 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#FF5E7E] uppercase tracking-wider font-bold">
                        ALLOCATION SECURED // THE D0GHOUSE QUEUE
                      </span>
                      <h4 className="text-xl font-bold font-mono text-[#121316] mt-1">
                        Batch 04 Slot Reserved
                      </h4>
                      <p className="text-xs text-[#71747A] mt-1 font-mono">
                        Serial: <strong className="text-[#121316]">{orderSerial}</strong>
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#121316]/10 text-left font-mono text-xs space-y-2">
                      <div className="flex justify-between text-[#71747A]">
                        <span>Model:</span>
                        <span className="text-[#121316]">{selectedModel.name}</span>
                      </div>
                      <div className="flex justify-between text-[#71747A]">
                        <span>Strap:</span>
                        <span className="text-[#121316]">{selectedStrap.name.split(" // ")[1]}</span>
                      </div>
                      <div className="flex justify-between text-[#71747A]">
                        <span>Caseback Inscription:</span>
                        <span className="text-[#FF5E7E]">{customEngraving}</span>
                      </div>
                      <div className="flex justify-between text-[#71747A] pt-2 border-t border-[#121316]/10">
                        <span>Fulfillment:</span>
                        <span className="text-emerald-600 font-bold">HOROLOGIUM DISPATCH</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setOrderComplete(false);
                        setDrawerOpen(false);
                      }}
                      className="w-full py-2.5 rounded-full bg-[#121316] text-white font-mono text-xs uppercase"
                    >
                      RETURN TO SHOWROOM
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-[#121316]/10 text-center text-[10px] font-mono text-[#8C9098]">
                DIRECT ADVISOR: BILLY BENJAMIN CONSULTING // billybenjamin836@gmail.com
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

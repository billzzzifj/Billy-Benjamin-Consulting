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
  ExternalLink, 
  RefreshCw, 
  Award,
  Maximize2,
  FileText,
  Layers,
  Activity,
  Info,
  Sliders,
  Volume2,
  VolumeX,
  Radio,
  Zap,
  Sparkle,
  Compass,
  Cpu,
  Gauge,
  SlidersHorizontal,
  Flame,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Crosshair,
  Maximize,
  Eye,
  Settings2
} from "lucide-react";

interface AudioProduct {
  id: string;
  name: string;
  germanTitle: string;
  series: string;
  sku: string;
  priceUsd: number;
  sensitivityDb: number;
  nominalImpedanceOhm: number;
  minImpedanceOhm: number;
  continuousPowerHandlingWatts: number;
  peakPowerHandlingWatts: number;
  weightKg: number;
  dimensionsMm: { height: number; width: number; depth: number };
  driverTechnology: string;
  recommendedRoomAreaM2: { min: number; max: number };
  curatorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface RoomBoundaryPreset {
  id: string;
  name: string;
  acousticCharacter: string;
  reflectionCoefficient: number; // 0 to 1
  absorptionAlpha: number;
  description: string;
}

export default function MblShowcasePage() {
  // Flagship MBL Radialstrahler and Reference catalog
  const products: AudioProduct[] = [
    {
      id: "101-x-treme",
      name: "Radialstrahler 101 X-Treme",
      germanTitle: "Referenz 4-Turm Radialstrahler System",
      series: "Reference Line Ultimate",
      sku: "MBL-REF-101X-TRM",
      priceUsd: 320000,
      sensitivityDb: 81.5,
      nominalImpedanceOhm: 4,
      minImpedanceOhm: 2.1,
      continuousPowerHandlingWatts: 900,
      peakPowerHandlingWatts: 2200,
      weightKg: 1650,
      dimensionsMm: { height: 1850, width: 490, depth: 640 },
      driverTechnology: "Dual 360° Radialstrahler Carbon Lamellae Array + Active Subwoofer Towers",
      recommendedRoomAreaM2: { min: 50, max: 200 },
      curatorNotes: "The undisputed apex of omnidirectional acoustic reproduction. Four freestanding towers comprising two main Radialstrahler satellite arrays and two active bass towers housing twelve 12-inch aluminum woofers driven by dedicated internal Class-D amplification.",
      images: [
        {
          label: "101 X-Treme Twilight Architectural Villa Salon",
          url: "/assets/mbl/mbl-xtreme-lakeside.jpg",
          caption: "MBL 101 X-Treme four-tower reference system installed in a brutalist lakeside listening residence."
        },
        {
          label: "Carbon Lamellae Pulsating Sphere Macro Detail",
          url: "/assets/mbl/mbl-lamellae-sphere-macro.jpg",
          caption: "Macro examination of hand-bent carbon fiber lamellae petals and copper voice coil leads."
        },
        {
          label: "Reference Line Preamplifier Console",
          url: "/assets/mbl/mbl-preamp-console.jpg",
          caption: "Precision balanced preamplifier console with digital attenuation."
        }
      ],
      accentColor: "#D4AF37"
    },
    {
      id: "101-e-mkii",
      name: "Radialstrahler 101 E MKII",
      germanTitle: "Radialstrahler 4-Wege Standlautsprecher",
      series: "Reference Line Iconic",
      sku: "MBL-REF-101E-MK2",
      priceUsd: 91000,
      sensitivityDb: 81.0,
      nominalImpedanceOhm: 4,
      minImpedanceOhm: 2.8,
      continuousPowerHandlingWatts: 500,
      peakPowerHandlingWatts: 1200,
      weightKg: 80,
      dimensionsMm: { height: 1230, width: 400, depth: 400 },
      driverTechnology: "360° Radialstrahler Carbon Lamellae (Tweeter, Upper-Mid, Lower-Mid) + Sub-Bass Base",
      recommendedRoomAreaM2: { min: 30, max: 100 },
      curatorNotes: "The quintessential sculpture that redefined high-end audio. Three pulsating spheres engineered from hand-selected unidirectional carbon fiber ribbons radiate sound spherically with zero directional beaming.",
      images: [
        {
          label: "101 E MKII Radialstrahler Monolith",
          url: "/assets/mbl/mbl-101e-radialstrahler.jpg",
          caption: "Single 101 E MKII freestanding loudspeaker in high-gloss black lacquer with gold-plated collar rings."
        },
        {
          label: "Eberswalde Acoustic Handcrafting & Inspection",
          url: "/assets/mbl/mbl-eberswalde-artisan-loupe.jpg",
          caption: "Master craftsman inspecting gold-plated driver assembly with jeweler's loupe in Eberswalde."
        },
        {
          label: "Architectural Villa Listening Salon",
          url: "/assets/mbl/mbl-reference-villa.jpg",
          caption: "101 E MKII installed in double-height private architectural residence."
        }
      ],
      accentColor: "#E5C158"
    },
    {
      id: "ref-9011-amp",
      name: "Reference 9011 Monoblock",
      germanTitle: "Referenz Mono-Leistungsverstärker",
      series: "Reference Electronics",
      sku: "MBL-REF-AMP-9011",
      priceUsd: 116000,
      sensitivityDb: 0,
      nominalImpedanceOhm: 2,
      minImpedanceOhm: 1.0,
      continuousPowerHandlingWatts: 840,
      peakPowerHandlingWatts: 5000,
      weightKg: 90,
      dimensionsMm: { height: 330, width: 480, depth: 610 },
      driverTechnology: "Ultra-High-Current Discrete Bipolar Output Stage (40 Amperes Continuous, 130A Peak)",
      recommendedRoomAreaM2: { min: 25, max: 200 },
      curatorNotes: "Engineered specifically to tame the 2.1-Ohm minimum impedance dip of Radialstrahler carbon drivers. Features massive isolated toroidal transformers and ultra-low internal output impedance, ensuring damping factor exceeding 300.",
      images: [
        {
          label: "Reference 9011 Power Stage Study",
          url: "/assets/mbl/mbl-reference-power-stage.jpg",
          caption: "Reference 9011 resting on acoustic flamed granite plinth with heavy extruded heatsinks."
        },
        {
          label: "Front Chassis Crest & Gold Power Bezel",
          url: "/assets/mbl/mbl-monoblock-amplifier.jpg",
          caption: "24K gold-plated MBL emblem and power switchgear on high-gloss piano black fascia."
        },
        {
          label: "Stereo Reference Power Stage",
          url: "/assets/mbl/mbl-power-amp.jpg",
          caption: "Dual-mono reference power amplifier showing precision heatsink fin geometry."
        }
      ],
      accentColor: "#C9A030"
    }
  ];

  // Room acoustic boundary presets
  const roomPresets: RoomBoundaryPreset[] = [
    {
      id: "glass-concrete",
      name: "Penthouse Glass & Concrete",
      acousticCharacter: "Highly Reflective // Untreated Modern Interior",
      reflectionCoefficient: 0.88,
      absorptionAlpha: 0.08,
      description: "Large perimeter glass curtain walls and polished Italian marble flooring. Without omnidirectional wave cohesion, standard directional horns cause severe harshness. Radialstrahler maintains uniform spectral balance across all reflection angles."
    },
    {
      id: "oak-drapery",
      name: "Hardwood & Silk Drapery",
      acousticCharacter: "Moderately Damped // Classic Luxury Salon",
      reflectionCoefficient: 0.58,
      absorptionAlpha: 0.32,
      description: "Chevron European oak floors with wool area rugs and heavy linen or silk window drapery. Delivers ideal acoustic decay timing for natural concert-hall immersion."
    },
    {
      id: "treated-salon",
      name: "Treated Architectural Atelier",
      acousticCharacter: "Precision Acoustic Architecture // Studio Standard",
      reflectionCoefficient: 0.32,
      absorptionAlpha: 0.62,
      description: "Custom slotted wood bass traps, quadratic residue diffusers, and concealed fabric wall absorbers calibrated to German DIN 18041 listening specifications."
    }
  ];

  // Active state
  const [selectedProduct, setSelectedProduct] = useState<AudioProduct>(products[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedPreset, setSelectedPreset] = useState<RoomBoundaryPreset>(roomPresets[0]);
  
  // Interactive Room Sliders
  const [roomLengthM, setRoomLengthM] = useState<number>(10.5);
  const [roomWidthM, setRoomWidthM] = useState<number>(7.2);
  const [roomCeilingHeightM, setRoomCeilingHeightM] = useState<number>(3.6);
  const [wallClearanceOffsetM, setWallClearanceOffsetM] = useState<number>(1.8);

  // Sound and Tactile click mode
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isTestImpulsePlaying, setIsTestImpulsePlaying] = useState<boolean>(false);

  // Finish configuration
  const [selectedFinish, setSelectedFinish] = useState<string>("piano-black-gold");

  // Exploded anatomy active hotspot
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  // Analog VU Meter Level
  const [vuLevel, setVuLevel] = useState<number>(68); // 0 to 100 scale
  const [meterBallistics, setMeterBallistics] = useState<"RMS" | "PEAK" | "FAST">("RMS");

  // Reservation Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [auditionLocation, setAuditionLocation] = useState<string>("berlin-salon");
  const [includeAcousticConsultation, setIncludeAcousticConsultation] = useState<boolean>(true);
  const [includeMonoblockPair, setIncludeMonoblockPair] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientCity, setClientCity] = useState<string>("");

  // Canvas ref for live 360 wave propagation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Web Audio Context helper for synthesized tactile feedback
  const playTactileClick = () => {
    if (isAudioMuted || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const playAcousticImpulse = () => {
    if (typeof window === "undefined") return;
    setIsTestImpulsePlaying(true);
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      // Fundamental 432Hz sine pulse with resonant decay
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(108, ctx.currentTime + 0.6);

      // Reverb decay envelope based on current calculated RT60
      const currentRt60 = calculatedRt60Seconds;
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + Math.min(2.5, currentRt60 * 1.2));

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + Math.min(2.5, currentRt60 * 1.2));

      setTimeout(() => {
        setIsTestImpulsePlaying(false);
      }, Math.min(2500, currentRt60 * 1200));
    } catch {
      setIsTestImpulsePlaying(false);
    }
  };

  // Calculations for Sabine Reverberation Time (RT60)
  const roomVolumeM3 = roomLengthM * roomWidthM * roomCeilingHeightM;
  const roomTotalSurfaceAreaM2 = 2 * (roomLengthM * roomWidthM + roomLengthM * roomCeilingHeightM + roomWidthM * roomCeilingHeightM);
  const totalAbsorptionMetricUnits = roomTotalSurfaceAreaM2 * selectedPreset.absorptionAlpha;
  const calculatedRt60Seconds = Number((0.161 * (roomVolumeM3 / Math.max(1, totalAbsorptionMetricUnits))).toFixed(2));
  
  // First boundary reflection arrival delay delta in milliseconds: t = 2 * d / c (c = 343 m/s)
  const firstReflectionDelayMs = Number(((2 * wallClearanceOffsetM / 343) * 1000).toFixed(1));
  const isAcousticallyIdeal = calculatedRt60Seconds >= 0.35 && calculatedRt60Seconds <= 0.65;

  // Exploded anatomy hotspots
  const anatomyPoints = [
    {
      id: 1,
      title: "Carbon Fiber Lamellae Petals",
      techSpecs: "12 Unidirectional Carbon Blades // Heat-Formed Parabolic Geometry",
      germanLabel: "Kohlefaser-Lamellen Resonanzkörper",
      description: "Precision-milled aerospace carbon ribbons assembled in an omnidirectional petal crown. Each blade pulses in micro-millimeter excursions, generating true spherical soundwaves with zero directional beaming."
    },
    {
      id: 2,
      title: "Central High-Flux Neodymium Core",
      techSpecs: "1.8 Tesla Magnetic Gap Flux // Direct Copper Coupling",
      germanLabel: "Neodym-Radialmagnetsystem",
      description: "High-temperature neodymium ring magnets produce an ultra-dense radial magnetic flux field. Delivers instantaneous transient attack with zero voice coil overhang or thermal compression."
    },
    {
      id: 3,
      title: "Aerospace T6 Aluminum Spindle",
      techSpecs: "CNC-Machined 7075-T6 Alloy // <5 Micron Axial Tolerance",
      germanLabel: "Präzisions-Führungsachse",
      description: "Rigid center shaft maintaining structural concentricity during high-SPL musical fortissimos. Hand-lapped in Eberswalde to eliminate mechanical resonance."
    },
    {
      id: 4,
      title: "Silver-Plated Oxygen-Free Litz Leads",
      techSpecs: "99.9999% OFC Conductors // Teflon Dielectric Insulation",
      germanLabel: "Hochreine Litzendraht-Zuführung",
      description: "Flexible high-current signal paths engineered to withstand millions of continuous excursion cycles without work-hardening or resistance drift."
    }
  ];

  // Live 60fps HTML5 Canvas Animation for 360 Spherical Waves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let waveRadius = 0;
    const waves: { r: number; alpha: number }[] = [];
    let frame = 0;

    const render = () => {
      frame++;
      // Spawn new wave every 28 frames
      if (frame % 26 === 0) {
        waves.push({ r: 4, alpha: 1.0 });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw background grid lines (room blueprint)
      ctx.strokeStyle = "#1A1D24";
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw room perimeter boundary
      const padX = 24;
      const padY = 24;
      const roomW = w - padX * 2;
      const roomH = h - padY * 2;

      ctx.strokeStyle = selectedPreset.id === "glass-concrete" ? "#4A6B82" : selectedPreset.id === "oak-drapery" ? "#A37C4D" : "#509E77";
      ctx.lineWidth = 3;
      ctx.strokeRect(padX, padY, roomW, roomH);

      // Room boundary label
      ctx.fillStyle = "#8E929E";
      ctx.font = "9px 'Courier New', monospace";
      ctx.fillText(`ROOM BOUNDARY: ${roomLengthM}m × ${roomWidthM}m [${selectedPreset.name.toUpperCase()}]`, padX + 8, padY - 8);

      // Center speaker position (affected by wall clearance)
      const speakerX = padX + (roomW * 0.35);
      const speakerY = padY + (roomH * 0.5);

      // Draw concentric expanding soundwaves
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.r += 1.8;
        wave.alpha -= 0.007;

        if (wave.alpha <= 0 || wave.r > roomW * 0.9) {
          waves.splice(i, 1);
          continue;
        }

        // Draw primary 360 wave
        ctx.save();
        ctx.beginPath();
        ctx.arc(speakerX, speakerY, wave.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${wave.alpha * 0.65})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        // Draw acoustic wall reflections if wave exceeds boundary
        if (speakerX - wave.r < padX) {
          const reflectDist = padX - (speakerX - wave.r);
          ctx.beginPath();
          ctx.arc(padX - reflectDist, speakerY, wave.r * 0.9, -Math.PI / 3, Math.PI / 3);
          ctx.strokeStyle = `rgba(180, 195, 220, ${wave.alpha * selectedPreset.reflectionCoefficient * 0.4})`;
          ctx.stroke();
        }
        if (speakerX + wave.r > padX + roomW) {
          const reflectDist = (speakerX + wave.r) - (padX + roomW);
          ctx.beginPath();
          ctx.arc(padX + roomW + reflectDist, speakerY, wave.r * 0.9, (2 * Math.PI) / 3, (4 * Math.PI) / 3);
          ctx.strokeStyle = `rgba(180, 195, 220, ${wave.alpha * selectedPreset.reflectionCoefficient * 0.4})`;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Speaker Core Pulsating Sphere Icon
      ctx.beginPath();
      ctx.arc(speakerX, speakerY, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(speakerX, speakerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#0A0B0E";
      ctx.fill();

      // Speaker marker ring
      ctx.beginPath();
      ctx.arc(speakerX, speakerY, 20 + Math.sin(frame * 0.1) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label speaker node
      ctx.fillStyle = "#E5DFD5";
      ctx.font = "10px sans-serif";
      ctx.fillText("MBL RADIALSTRAHLER", speakerX - 55, speakerY + 34);

      // Wall offset telemetry line
      ctx.strokeStyle = "#FF8800";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(speakerX, speakerY);
      ctx.lineTo(padX, speakerY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#FF8800";
      ctx.font = "9px monospace";
      ctx.fillText(`${wallClearanceOffsetM}m OFFSET (Δt=${firstReflectionDelayMs}ms)`, padX + 8, speakerY - 6);

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [roomLengthM, roomWidthM, wallClearanceOffsetM, selectedPreset, firstReflectionDelayMs]);

  // Handle Reservation Confirmation with Confetti
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFFFFF", "#FF8800", "#1E1F24"]
    });

    setOrderComplete(true);
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-[#EDE8E1] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#07080A]">
      
      {/* 00 // TACTICAL GERMAN ACOUSTIC TELEMETRY TOP BAR */}
      <div className="border-b border-[#1E2028] bg-[#0B0C10] px-4 py-2.5 text-xs text-[#8E929E] font-mono sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-[#FFFFFF] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>RETURN TO BBC COLLECTIVE</span>
            </Link>
            <span className="hidden sm:inline text-[#2A2D37]">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#8E929E]">
              <Radio className="w-3 h-3 text-[#00FF88] animate-pulse" />
              <span>EBERSWALDE MANUFAKTUR 52.8337° N, 13.8329° E</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden lg:inline text-[#8E929E]">
              DE-PAT 29 46 832 C2 // RADIALSTRAHLER 360°
            </span>
            <div className="flex items-center gap-2 border-l border-[#222530] pl-4">
              <button
                onClick={() => {
                  setIsAudioMuted(!isAudioMuted);
                  playTactileClick();
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-colors ${
                  !isAudioMuted 
                    ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]" 
                    : "bg-[#14161C] border-[#222530] text-[#7A7E8C] hover:text-[#EDE8E1]"
                }`}
                title="Toggle Web Audio tactile sound synthesis"
              >
                {!isAudioMuted ? <Volume2 className="w-3 h-3 text-[#D4AF37]" /> : <VolumeX className="w-3 h-3" />}
                <span>{!isAudioMuted ? "TACTILE AUDIO: ON" : "AUDIO: MUTE"}</span>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                  playTactileClick();
                }}
                className="flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#07080A] font-semibold px-3 py-1 rounded text-[11px] transition-all"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>COMMISSION AUDITION</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* 01 // EDITORIAL CINEMATIC HERO & GERMAN ACOUSTIC AUTHORITY */}
        <section className="relative border border-[#1E2028] bg-[#0C0D12] overflow-hidden rounded-xl">
          {/* Subtle gold hairline accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-75"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Hero Column: Typography & Strategy */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#181A22] border border-[#282B38] text-[11px] font-mono text-[#D4AF37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></span>
                  <span>MBL AKUSTIKGERÄTE GMBH // BERLIN & EBERSWALDE</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.08]">
                  Pulsating Sphere Acoustics.
                  <span className="block text-[#D4AF37] font-serif font-normal italic mt-1 text-2xl sm:text-4xl">
                    Zero Room Boundary Smear.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-[#9FA4B2] leading-relaxed max-w-xl">
                  For four decades, MBL has engineered the absolute pinnacle of high-end acoustic physics. The 360-degree Radialstrahler eliminates the directional beam distortion of conventional horn and cone speakers, replicating the spherical soundwave expansion of an unamplified Steinway grand piano or Stradivarius violin.
                </p>
              </div>

              {/* Finish Selection Switcher */}
              <div className="space-y-3 pt-2 border-t border-[#1D202A]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8E929E]">
                  <span>FACTORY LACQUER & METALLURGY SPEC:</span>
                  <span className="text-[#D4AF37]">
                    {selectedFinish === "piano-black-gold" && "Piano Black Lacquer + 24K Gold Plating"}
                    {selectedFinish === "glacier-white-chrome" && "Glacier White + High-Mirror Chrome"}
                    {selectedFinish === "matte-carbon-titanium" && "Matte Carbon Weave + Titanium Gray"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedFinish("piano-black-gold");
                      playTactileClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      selectedFinish === "piano-black-gold" 
                        ? "border-[#D4AF37] bg-[#1A1812] text-[#FFFFFF]" 
                        : "border-[#1F212B] bg-[#101217] text-[#7A7E8C] hover:border-[#2D313F]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-black border border-[#D4AF37] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">24K Black Gold</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFinish("glacier-white-chrome");
                      playTactileClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      selectedFinish === "glacier-white-chrome" 
                        ? "border-[#E0E0E0] bg-[#16181F] text-[#FFFFFF]" 
                        : "border-[#1F212B] bg-[#101217] text-[#7A7E8C] hover:border-[#2D313F]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-white border border-[#A0A0A0] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">White Chrome</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFinish("matte-carbon-titanium");
                      playTactileClick();
                    }}
                    className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-all ${
                      selectedFinish === "matte-carbon-titanium" 
                        ? "border-[#778099] bg-[#14171E] text-[#FFFFFF]" 
                        : "border-[#1F212B] bg-[#101217] text-[#7A7E8C] hover:border-[#2D313F]"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#2A2B30] border border-[#555866] flex-shrink-0"></span>
                    <span className="truncate text-[11px] font-mono">Carbon Ti</span>
                  </button>
                </div>
              </div>

              {/* Physical Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#1E212B] text-xs font-mono">
                <div>
                  <span className="block text-[#686D7D] text-[10px]">RADIAL DISPERSION</span>
                  <span className="text-[#FFFFFF] font-bold text-sm">360° Spherical</span>
                </div>
                <div>
                  <span className="block text-[#686D7D] text-[10px]">LAMELLAE ACCURACY</span>
                  <span className="text-[#D4AF37] font-bold text-sm">±0.02 mm</span>
                </div>
                <div>
                  <span className="block text-[#686D7D] text-[10px]">MIN IMPEDANCE</span>
                  <span className="text-[#FFFFFF] font-bold text-sm">2.1 Ω Load</span>
                </div>
                <div>
                  <span className="block text-[#686D7D] text-[10px]">CONTINUOUS CURRENT</span>
                  <span className="text-[#00FF88] font-bold text-sm">40.0A RMS</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsDrawerOpen(true);
                    playTactileClick();
                  }}
                  className="px-6 py-3.5 rounded bg-[#D4AF37] hover:bg-[#E5C158] text-[#07080A] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>RESERVE ATELIER AUDITION</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href="#room-simulator"
                  onClick={playTactileClick}
                  className="px-5 py-3.5 rounded border border-[#262936] hover:border-[#D4AF37]/50 bg-[#12141A] hover:bg-[#181B24] text-[#D8DCE6] text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                  <span>LAUNCH ROOM SIMULATOR</span>
                </a>
              </div>
            </div>

            {/* Right Hero Column: User's Master Render Asset (101 X-Treme Lakeside Twilight) */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full bg-[#08090C] border-t lg:border-t-0 lg:border-l border-[#1E2028] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <div className="relative w-full h-full min-h-[360px] lg:min-h-[520px] rounded-lg overflow-hidden border border-[#252833]">
                <img
                  src="/assets/mbl/mbl-xtreme-lakeside.jpg"
                  alt="MBL 101 X-Treme Flagship System in lakeside brutalist salon at twilight"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-transparent opacity-80"></div>
                
                {/* Visual Telemetry Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0B0C10]/85 border border-[#242735] backdrop-blur-md rounded flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block text-[#D4AF37] font-bold">MBL 101 X-TREME FOUR-TOWER SYSTEM</span>
                    <span className="text-[#888D9E] text-[11px]">Architectural Listening Salon // Lake Geneva Twilight</span>
                  </div>
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-[#1B1D25] border border-[#2D3140] rounded text-[10px] text-[#A6ABB9]">
                    1,650 KG NET MASS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 // INTERACTIVE 360° ACOUSTIC WAVE PROPAGATION CANVAS & RT60 DECAY ENGINE */}
        <section id="room-simulator" className="border border-[#1E2028] bg-[#0C0D12] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E212B] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37]">
                <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>PHYSICAL ACOUSTIC LAB // 360° SPHERICAL WAVEFORM MATRIX</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Acoustic Room Boundary & Decay Simulator
              </h2>
              <p className="text-sm text-[#8E929E] max-w-2xl">
                Simulate how MBL's pulsating spherical wavefronts propagate through your specific penthouse interior. Calculate real-time Sabine RT60 reverberation and boundary reflection arrival delay delta.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={playAcousticImpulse}
                disabled={isTestImpulsePlaying}
                className="px-4 py-2 rounded bg-[#181B24] hover:bg-[#202430] border border-[#2C3040] hover:border-[#D4AF37] text-xs font-mono text-[#EDE8E1] transition-all flex items-center gap-2"
              >
                <Radio className={`w-3.5 h-3.5 ${isTestImpulsePlaying ? "text-[#00FF88] animate-ping" : "text-[#D4AF37]"}`} />
                <span>{isTestImpulsePlaying ? "RESONATING..." : "AUDITION 432Hz IMPULSE"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Live HTML5 Canvas */}
            <div className="lg:col-span-7 bg-[#07080B] border border-[#1E212B] rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono px-2 text-[#7E8394]">
                <span>TOP-DOWN RESIDENTIAL BLUEPRINT (60 FPS REAL-TIME PHYSICS)</span>
                <span className="text-[#00FF88] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse"></span>
                  PROPAGATING 343 M/S
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full bg-[#050608] rounded overflow-hidden border border-[#161820]">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={400}
                  className="w-full h-full block"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="bg-[#0E1015] border border-[#1B1D25] p-2 rounded">
                  <span className="block text-[#686D7D] text-[10px]">CALCULATED RT60</span>
                  <span className={`text-sm font-bold ${isAcousticallyIdeal ? "text-[#00FF88]" : "text-[#FF8800]"}`}>
                    {calculatedRt60Seconds}s
                  </span>
                </div>
                <div className="bg-[#0E1015] border border-[#1B1D25] p-2 rounded">
                  <span className="block text-[#686D7D] text-[10px]">FIRST REFLECTION Δt</span>
                  <span className="text-sm font-bold text-[#D4AF37]">
                    +{firstReflectionDelayMs} ms
                  </span>
                </div>
                <div className="bg-[#0E1015] border border-[#1B1D25] p-2 rounded">
                  <span className="block text-[#686D7D] text-[10px]">ABSORPTION ALPHA (α)</span>
                  <span className="text-sm font-bold text-[#FFFFFF]">
                    {selectedPreset.absorptionAlpha}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Architectural Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Boundary Presets */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#8E929E] uppercase tracking-wider block">
                  Select Architectural Boundary Envelope:
                </label>
                <div className="space-y-2">
                  {roomPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPreset(preset);
                        playTactileClick();
                      }}
                      className={`w-full p-3 rounded text-left border transition-all ${
                        selectedPreset.id === preset.id 
                          ? "border-[#D4AF37] bg-[#171922] text-[#FFFFFF]" 
                          : "border-[#1E212B] bg-[#0E1015] text-[#7A7E8C] hover:border-[#2C3040]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-sm">{preset.name}</span>
                        <span className="font-mono text-[11px] text-[#D4AF37]">
                          Reflectivity: {(preset.reflectionCoefficient * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-xs text-[#8E929E] mt-1 leading-snug">
                        {preset.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimension Sliders */}
              <div className="space-y-4 pt-4 border-t border-[#1C1F28] font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[#8E929E] mb-1.5">
                    <span>ROOM LENGTH: {roomLengthM} METERS</span>
                    <span className="text-[#FFFFFF]">{(roomLengthM * 3.28084).toFixed(1)} FT</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.5"
                    value={roomLengthM}
                    onChange={(e) => setRoomLengthM(parseFloat(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#8E929E] mb-1.5">
                    <span>ROOM WIDTH: {roomWidthM} METERS</span>
                    <span className="text-[#FFFFFF]">{(roomWidthM * 3.28084).toFixed(1)} FT</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    step="0.5"
                    value={roomWidthM}
                    onChange={(e) => setRoomWidthM(parseFloat(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#8E929E] mb-1.5">
                    <span>WALL CLEARANCE OFFSET: {wallClearanceOffsetM} METERS</span>
                    <span className="text-[#D4AF37]">HAAS DELTA: {firstReflectionDelayMs}ms</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="4.5"
                    step="0.1"
                    value={wallClearanceOffsetM}
                    onChange={(e) => setWallClearanceOffsetM(parseFloat(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </div>

              {/* Acoustic Verdict Ledger */}
              <div className="p-4 bg-[#0A0B0E] border border-[#1E212B] rounded text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#D4AF37] font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                  <span>PRE-COMMISSION ACOUSTIC VERDICT:</span>
                </div>
                <p className="text-[#8E929E] leading-relaxed">
                  {isAcousticallyIdeal 
                    ? `Your room volume (${roomVolumeM3.toFixed(0)} m³) with ${selectedPreset.name} exhibits optimal decay timing (${calculatedRt60Seconds}s). The 360° spherical wavefront integrates without flutter echo.` 
                    : `Your room volume produces a ${calculatedRt60Seconds}s decay time. MBL's omnidirectional dispersion maintains natural acoustic cohesion; our complimentary White-Glove Factory Atelier service will fine-tune boundary placement during installation.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 // ANALOG RETRO-INDUSTRIAL DUAL VU METERS & LOW-IMPEDANCE TELEMETRY */}
        <section className="border border-[#1E2028] bg-[#0C0D12] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E212B] pb-5">
            <div>
              <span className="text-xs font-mono text-[#D4AF37]">ANALOG CURRENT TELEMETRY // GERMAN DIN 45406</span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">Dual Ballistic VU Power Meters</h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#8E929E]">BALLISTICS:</span>
              {(["RMS", "PEAK", "FAST"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setMeterBallistics(mode);
                    playTactileClick();
                  }}
                  className={`px-2 py-1 rounded border text-[10px] transition-colors ${
                    meterBallistics === mode 
                      ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold" 
                      : "bg-[#14161E] border-[#222532] text-[#8E929E] hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Dual Analog VU Meters Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Channel Meter */}
            <div className="bg-[#12110D] border-2 border-[#2E2818] rounded-lg p-5 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFAE00]/10 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="flex justify-between items-center text-[10px] font-mono text-[#C4A052] mb-2">
                <span>CHANNEL A // LEFT RADIALSTRAHLER</span>
                <span className="text-[#FF8800] animate-pulse">40.0A PEAK LOAD</span>
              </div>

              {/* Analog Scale Arc */}
              <div className="relative h-28 flex items-end justify-center overflow-hidden border-b border-[#3D3520] pb-2">
                {/* Dial numbers */}
                <div className="absolute top-2 left-6 text-[9px] font-mono text-[#8A7545]">-20</div>
                <div className="absolute top-0 left-16 text-[9px] font-mono text-[#8A7545]">-10</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#C4A052]">0 dB</div>
                <div className="absolute top-0 right-16 text-[9px] font-mono text-[#FF4444]">+2</div>
                <div className="absolute top-2 right-6 text-[9px] font-mono text-[#FF4444]">+3</div>

                {/* Animated Needle */}
                <div 
                  className="w-[2px] h-24 bg-gradient-to-t from-transparent via-[#FF4400] to-[#FFCC00] origin-bottom transition-transform duration-100 ease-out shadow-[0_0_8px_#FFAA00]"
                  style={{
                    transform: `rotate(${((vuLevel / 100) * 80) - 40}deg)`
                  }}
                ></div>
                <div className="absolute bottom-0 w-5 h-5 rounded-full bg-[#1F190D] border border-[#524424] z-10"></div>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-[#8E8670] mt-3">
                <span>MIN IMPEDANCE: 2.1 Ω</span>
                <span className="text-[#00FF88]">DAMPING FACTOR: &gt;300</span>
              </div>
            </div>

            {/* Right Channel Meter */}
            <div className="bg-[#12110D] border-2 border-[#2E2818] rounded-lg p-5 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFAE00]/10 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="flex justify-between items-center text-[10px] font-mono text-[#C4A052] mb-2">
                <span>CHANNEL B // RIGHT RADIALSTRAHLER</span>
                <span className="text-[#00FF88]">CURRENT RESERVE: 130A</span>
              </div>

              {/* Analog Scale Arc */}
              <div className="relative h-28 flex items-end justify-center overflow-hidden border-b border-[#3D3520] pb-2">
                <div className="absolute top-2 left-6 text-[9px] font-mono text-[#8A7545]">-20</div>
                <div className="absolute top-0 left-16 text-[9px] font-mono text-[#8A7545]">-10</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#C4A052]">0 dB</div>
                <div className="absolute top-0 right-16 text-[9px] font-mono text-[#FF4444]">+2</div>
                <div className="absolute top-2 right-6 text-[9px] font-mono text-[#FF4444]">+3</div>

                {/* Animated Needle with slight stereo variance */}
                <div 
                  className="w-[2px] h-24 bg-gradient-to-t from-transparent via-[#FF4400] to-[#FFCC00] origin-bottom transition-transform duration-100 ease-out shadow-[0_0_8px_#FFAA00]"
                  style={{
                    transform: `rotate(${(((vuLevel + 3) / 100) * 80) - 40}deg)`
                  }}
                ></div>
                <div className="absolute bottom-0 w-5 h-5 rounded-full bg-[#1F190D] border border-[#524424] z-10"></div>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-[#8E8670] mt-3">
                <span>VOLTAGE SWING: 100 V/μs</span>
                <span className="text-[#D4AF37]">CONTINUOUS: 840W @ 4Ω</span>
              </div>
            </div>
          </div>

          {/* Tactical VU Control Slider */}
          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#8E929E]">
            <span className="flex-shrink-0">SYSTEM OUTPUT DRIVE TEST:</span>
            <input
              type="range"
              min="20"
              max="95"
              value={vuLevel}
              onChange={(e) => setVuLevel(parseInt(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-[#D4AF37] font-bold w-12 text-right">{vuLevel}%</span>
          </div>
        </section>

        {/* 04 // EXPLODED ANATOMY OF THE RADIALSTRAHLER SPHERE (USER MACRO ASSET) */}
        <section id="exploded-anatomy" className="border border-[#1E2028] bg-[#0C0D12] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="space-y-1 border-b border-[#1E212B] pb-5">
            <span className="text-xs font-mono text-[#D4AF37]">MICRO-STRUCTURAL STRATIGRAPHY // EBERSWALDE LABS</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Exploded Anatomy of the Carbon Lamellae Sphere
            </h3>
            <p className="text-sm text-[#8E929E] max-w-2xl">
              Inspect the micro-engineered components comprising the high-frequency and midrange Radialstrahler driver assemblies. Click each hotspot to examine the aerospace materials.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* User Generated Macro Image with Interactive Pins */}
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-[#242735] bg-[#0A0B0E]">
              <img
                src="/assets/mbl/mbl-lamellae-sphere-macro.jpg"
                alt="Macro study of MBL carbon fiber pulsating sphere driver assembly"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Hotspot 1: Lamellae Petal */}
              <button
                onClick={() => {
                  setActiveHotspot(0);
                  playTactileClick();
                }}
                className={`absolute top-[35%] left-[45%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 0 
                    ? "bg-[#D4AF37] text-black scale-125 ring-4 ring-[#D4AF37]/30" 
                    : "bg-black/80 text-[#D4AF37] border border-[#D4AF37] hover:scale-110"
                }`}
                title="Inspect Carbon Lamellae Petal"
              >
                01
              </button>

              {/* Hotspot 2: Neodymium Core */}
              <button
                onClick={() => {
                  setActiveHotspot(1);
                  playTactileClick();
                }}
                className={`absolute top-[52%] left-[58%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 1 
                    ? "bg-[#D4AF37] text-black scale-125 ring-4 ring-[#D4AF37]/30" 
                    : "bg-black/80 text-[#D4AF37] border border-[#D4AF37] hover:scale-110"
                }`}
                title="Inspect Neodymium Core"
              >
                02
              </button>

              {/* Hotspot 3: Aluminum Spindle */}
              <button
                onClick={() => {
                  setActiveHotspot(2);
                  playTactileClick();
                }}
                className={`absolute top-[68%] left-[26%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 2 
                    ? "bg-[#D4AF37] text-black scale-125 ring-4 ring-[#D4AF37]/30" 
                    : "bg-black/80 text-[#D4AF37] border border-[#D4AF37] hover:scale-110"
                }`}
                title="Inspect Aluminum Spindle"
              >
                03
              </button>

              {/* Hotspot 4: Copper Litz Leads */}
              <button
                onClick={() => {
                  setActiveHotspot(3);
                  playTactileClick();
                }}
                className={`absolute top-[62%] left-[42%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                  activeHotspot === 3 
                    ? "bg-[#D4AF37] text-black scale-125 ring-4 ring-[#D4AF37]/30" 
                    : "bg-black/80 text-[#D4AF37] border border-[#D4AF37] hover:scale-110"
                }`}
                title="Inspect Copper Leads"
              >
                04
              </button>
            </div>

            {/* Hotspot Inspection Dossier */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-[#0E1015] border border-[#232634] rounded-lg space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E212B] pb-3">
                  <span className="text-xs font-mono text-[#D4AF37]">
                    COMPONENT SPECIFICATION #{activeHotspot + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#686D7D]">
                    {anatomyPoints[activeHotspot].germanLabel}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#FFFFFF]">
                  {anatomyPoints[activeHotspot].title}
                </h4>

                <div className="p-2.5 bg-[#14161E] border border-[#1E212B] rounded text-xs font-mono text-[#D4AF37]">
                  {anatomyPoints[activeHotspot].techSpecs}
                </div>

                <p className="text-sm text-[#9FA4B2] leading-relaxed">
                  {anatomyPoints[activeHotspot].description}
                </p>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {anatomyPoints.map((pt, idx) => (
                    <button
                      key={pt.id}
                      onClick={() => {
                        setActiveHotspot(idx);
                        playTactileClick();
                      }}
                      className={`p-2 rounded border text-center text-xs font-mono transition-colors ${
                        activeHotspot === idx 
                          ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]" 
                          : "border-[#1E212B] bg-[#101217] text-[#6C7182] hover:text-[#EDE8E1]"
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 // FLAGSHIP RADIALSTRAHLER CATALOG & MONOBLOCK AMPLIFICATION */}
        <section id="flagships" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E212B] pb-5">
            <div>
              <span className="text-xs font-mono text-[#D4AF37]">EBERSWALDE HANDCRAFTED CATALOG</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">Flagship Reference Ensembles</h3>
            </div>
            <span className="text-xs font-mono text-[#8E929E]">
              HANDCRAFTED IN GERMANY // 5-YEAR FACTORY WARRANTY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div 
                key={p.id}
                className="border border-[#1E2028] bg-[#0C0D12] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all group"
              >
                <div>
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#07080B] border-b border-[#1E212B]">
                    <img 
                      src={p.images[0].url} 
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0B0C10]/80 border border-[#232634] text-[10px] font-mono text-[#D4AF37]">
                      {p.series.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-xs font-mono text-[#6C7182] block">{p.germanTitle}</span>
                    <h4 className="text-lg font-bold text-[#FFFFFF]">{p.name}</h4>
                    <p className="text-xs text-[#8E929E] leading-relaxed line-clamp-3">
                      {p.curatorNotes}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1B1D26] text-xs font-mono">
                      <div>
                        <span className="text-[#686D7D] text-[10px] block">MIN IMPEDANCE</span>
                        <span className="text-[#FFFFFF]">{p.minImpedanceOhm} Ω</span>
                      </div>
                      <div>
                        <span className="text-[#686D7D] text-[10px] block">NET MASS</span>
                        <span className="text-[#FFFFFF]">{p.weightKg} kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between border-t border-[#1B1D26] pt-4 mb-3">
                    <span className="text-xs font-mono text-[#8E929E]">COMMISSION:</span>
                    <span className="text-base font-bold font-mono text-[#D4AF37]">
                      ${p.priceUsd.toLocaleString()} USD
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsDrawerOpen(true);
                      playTactileClick();
                    }}
                    className="w-full py-2.5 rounded bg-[#151720] hover:bg-[#D4AF37] text-[#D8DCE6] hover:text-[#07080A] border border-[#252836] hover:border-[#D4AF37] text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>CONFIGURE ALLOCATION</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 // EBERSWALDE MANUFACTURE & ARTISAN CRAFT CHRONICLE (USER ARTISAN ASSET) */}
        <section id="manufacture" className="border border-[#1E2028] bg-[#0C0D12] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* User Generated Master Artisan Image */}
            <div className="lg:col-span-6 relative rounded-lg overflow-hidden border border-[#242735] bg-[#0A0B0E]">
              <img
                src="/assets/mbl/mbl-eberswalde-artisan-loupe.jpg"
                alt="Master German technician inspecting gold-plated driver assembly in Eberswalde workshop"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#0B0C10]/85 border border-[#222532] rounded backdrop-blur-md text-xs font-mono">
                <span className="text-[#D4AF37] block font-bold">EBERSWALDE ACOUSTIC MANUFAKTUR</span>
                <span className="text-[#888E9E] text-[11px]">Hand-Lapping & Jeweler’s Loupe Inspection</span>
              </div>
            </div>

            {/* Editorial Craft Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37]">
                <Award className="w-3.5 h-3.5" />
                <span>HAND-BUILT IN BRANDENBURG // SERIAL NUMBER ALLOCATION</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Fourteen Coats of Lacquer. Zero Compromise on Physics.
              </h3>

              <p className="text-sm text-[#9FA4B2] leading-relaxed">
                Every MBL loudspeaker and amplifier is crafted by master technicians in our Eberswalde manufacture outside Berlin. A single Radialstrahler driver requires over 90 hours of manual assembly, including laser vibrometry testing inside our dedicated anechoic chamber to ensure frequency response consistency within ±0.1 dB between stereo channels.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="p-3 bg-[#0A0B0E] border border-[#1E212B] rounded">
                  <span className="block text-[#686D7D] text-[10px]">PIANO FINISH</span>
                  <span className="text-[#FFFFFF] font-bold">14 Rubbed Coats</span>
                </div>
                <div className="p-3 bg-[#0A0B0E] border border-[#1E212B] rounded">
                  <span className="block text-[#686D7D] text-[10px]">ANECHOIC BURN-IN</span>
                  <span className="text-[#D4AF37] font-bold">72 Continuous Hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 07 // SLIDE-OUT PRIVATE AUDITION ATELIER & RESERVATION DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0C0D12] border-l border-[#222532] h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E212B] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#D4AF37]">MBL PRIVATE AUDITION ATELIER</span>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Commission Allocation</h3>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setOrderComplete(false);
                    playTactileClick();
                  }}
                  className="p-1.5 rounded hover:bg-[#1E212B] text-[#7A7E8C] hover:text-[#EDE8E1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!orderComplete ? (
                <form onSubmit={handleConfirmReservation} className="space-y-5">
                  <div className="p-3.5 bg-[#141620] border border-[#222534] rounded space-y-2">
                    <span className="text-xs font-mono text-[#6C7182] block">SELECTED ENSEMBLE:</span>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#FFFFFF]">{selectedProduct.name}</span>
                      <span className="font-mono text-sm text-[#D4AF37]">
                        ${selectedProduct.priceUsd.toLocaleString()} USD
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#8E929E] block">
                      Finish: {selectedFinish === "piano-black-gold" ? "Piano Black / 24K Gold" : selectedFinish === "glacier-white-chrome" ? "Glacier White / Chrome" : "Carbon / Titanium"}
                    </span>
                  </div>

                  {/* Location Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#8E929E] block">
                      PREFERRED AUDITION ATELIER:
                    </label>
                    <div className="space-y-1.5 text-xs font-mono">
                      {[
                        { id: "berlin-salon", label: "Berlin Sound Salon (Kurfürstendamm)", notes: "Dedicated acoustic listening suite" },
                        { id: "eberswalde-factory", label: "Eberswalde High-Precision Manufacture", notes: "Includes private factory and lab tour" },
                        { id: "insitu-penthouse", label: "Private Penthouse In-Situ Audition", notes: "White-glove VIP freight delivery trial" }
                      ].map((loc) => (
                        <button
                          type="button"
                          key={loc.id}
                          onClick={() => {
                            setAuditionLocation(loc.id);
                            playTactileClick();
                          }}
                          className={`w-full p-2.5 rounded border text-left transition-all ${
                            auditionLocation === loc.id 
                              ? "border-[#D4AF37] bg-[#1A1812] text-[#FFFFFF]" 
                              : "border-[#1E212B] bg-[#0E1015] text-[#7A7E8C] hover:border-[#2C3040]"
                          }`}
                        >
                          <span className="font-semibold block">{loc.label}</span>
                          <span className="text-[10px] text-[#8E929E]">{loc.notes}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-2 pt-2 border-t border-[#1C1F28]">
                    <span className="text-xs font-mono text-[#8E929E] block">OPTIONAL WHITE-GLOVE SERVICES:</span>
                    
                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0E1015] border border-[#1E212B] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeAcousticConsultation}
                        onChange={(e) => setIncludeAcousticConsultation(e.target.checked)}
                        className="accent-[#D4AF37]"
                      />
                      <span>Acoustic Architect On-Site Room Calibration (+$3,500)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0E1015] border border-[#1E212B] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeMonoblockPair}
                        onChange={(e) => setIncludeMonoblockPair(e.target.checked)}
                        className="accent-[#D4AF37]"
                      />
                      <span>Bundle Reference 9011 Monoblock Amp Pair (+$116,000)</span>
                    </label>
                  </div>

                  {/* Client Info */}
                  <div className="space-y-3 pt-2 border-t border-[#1C1F28] text-xs font-mono">
                    <div>
                      <label className="text-[#8E929E] block mb-1">CLIENT NAME / HOUSEHOLD PRINCIPAL:</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Lord Alistair Vance"
                        className="w-full bg-[#14161F] border border-[#242735] rounded p-2.5 text-[#EDE8E1] focus:border-[#D4AF37] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8E929E] block mb-1">DIRECT EXECUTIVE EMAIL:</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. principal@vance-atelier.com"
                        className="w-full bg-[#14161F] border border-[#242735] rounded p-2.5 text-[#EDE8E1] focus:border-[#D4AF37] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8E929E] block mb-1">RESIDENCE RESIDENTIAL CITY:</label>
                      <input
                        type="text"
                        value={clientCity}
                        onChange={(e) => setClientCity(e.target.value)}
                        placeholder="e.g. Zurich, London, Dubai, New York"
                        className="w-full bg-[#14161F] border border-[#242735] rounded p-2.5 text-[#EDE8E1] focus:border-[#D4AF37] outline-none"
                      />
                    </div>
                  </div>

                  {/* Deposit Summary & Trigger */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs font-mono mb-3">
                      <span className="text-[#8E929E]">REFUNDABLE ESCROW DEPOSIT:</span>
                      <span className="text-base font-bold text-[#D4AF37]">$15,000 USD</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded bg-[#D4AF37] hover:bg-[#E5C158] text-[#07080A] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>CONFIRM ATELIER RESERVATION</span>
                    </button>
                    <span className="block text-center text-[10px] text-[#6C7182] font-mono mt-2">
                      Held in secure escrow. Fully refundable prior to final factory dispatch.
                    </span>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#FFFFFF]">Audition Allocation Secured</h4>
                  <p className="text-xs text-[#9FA4B2] max-w-sm mx-auto leading-relaxed">
                    Thank you, {clientName}. An official MBL Factory Protocol confirmation and room calibration dossier has been dispatched to <span className="text-[#D4AF37] font-mono">{clientEmail}</span>.
                  </p>
                  <div className="p-3 bg-[#101218] border border-[#232635] rounded font-mono text-xs text-[#8E929E] max-w-xs mx-auto text-left">
                    <div>ALLOCATION: #{Math.floor(100000 + Math.random() * 900000)}</div>
                    <div>STATUS: ESCROW RESERVED</div>
                    <div>LOCATION: {auditionLocation.toUpperCase()}</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setOrderComplete(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded bg-[#181A22] border border-[#2B2E3D] hover:border-[#D4AF37] text-xs font-mono text-[#D8DCE6] transition-all"
                  >
                    RETURN TO SHOWCASE
                  </button>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#1C1F28] text-center text-[11px] font-mono text-[#686D7D]">
              MBL AKUSTIKGERÄTE GMBH & CO. KG // KURTHS & BIEGER BERLIN
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

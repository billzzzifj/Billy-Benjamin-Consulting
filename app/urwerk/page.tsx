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
  Gauge, 
  Clock, 
  Globe, 
  Moon, 
  Sun, 
  Compass, 
  RotateCw, 
  Cpu, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkle,
  Sliders,
  Eye,
  Layers,
  Wrench,
  Radio,
  FileText
} from "lucide-react";

interface TimepieceModel {
  id: string;
  name: string;
  subtitle: string;
  editionLimit: string;
  priceUsd: number;
  caliber: string;
  complications: string;
  caseMaterial: string;
  dimensionsMm: string;
  powerReserveHours: number;
  windingSystem: string;
  collectorNotes: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

export default function UrwerkShowcasePage() {
  const timepieces: TimepieceModel[] = [
    {
      id: "ur-100v",
      name: "URWERK UR-100V Lightspeed",
      subtitle: "Space-Time Astrophysics // Satellite Wandering Hours",
      editionLimit: "Limited Production // Geneva Manufacture",
      priceUsd: 74000,
      caliber: "Calibre UR-12.02 with Windfänger Planetary Turbine",
      complications: "Satellite wandering hours, retrograde minutes, Earth rotational distance (555.55 km/20m), Earth orbital distance (35,740 km/20m)",
      caseMaterial: "Black DLC Titanium and Ceramic Composite with Sapphire Crystal Canopy",
      dimensionsMm: "41.0 mm wide x 49.7 mm long x 14.0 mm high",
      powerReserveHours: 48,
      windingSystem: "Self-winding governed by Windfänger planetary turbine dampening rotor shock",
      collectorNotes: "Felix Baumgartner and Martin Frei's tribute to astronomical physics. As the minute hand crosses 60, it disappears to reappear on dual astrophysical scales: measuring the rotation of the Earth on its axis at the equator (555 km every 20 minutes) and its voyage around the Sun (35,740 km every 20 minutes).",
      images: [
        {
          label: "UR-100V Lightspeed Architecture",
          url: "/assets/urwerk/urwerk-ur100v-hero.jpg",
          caption: "Black ceramic and DLC titanium aerodynamic case framing the three wandering-hour satellites."
        },
        {
          label: "Calibre UR-12.02 Exploded Anatomy",
          url: "/assets/urwerk/urwerk-ur100v-exploded-caliber.jpg",
          caption: "Precision Maltese cross satellite carousel with beryllium bronze planetary gearing and Windfänger rotor."
        },
        {
          label: "Satellite Orbit & Astrophysical Dials",
          url: "/assets/urwerk/urwerk-ur100v-satellite-dial.png",
          caption: "Dual astrophysical distance apertures tracking Earth's axial rotation and solar orbital trajectory."
        }
      ],
      accentColor: "#00E5FF"
    },
    {
      id: "ur-120",
      name: "URWERK UR-120 'Spock'",
      subtitle: "Morphing Satellite Prisms // Split-Hour Vulcan Salute",
      editionLimit: "Manufacture Run // Geneva Studio",
      priceUsd: 135000,
      caliber: "Calibre UR-20.01 Automatic with Dual Turbine Winding",
      complications: "Split-satellite wandering hours dividing into two rotating prisms before reuniting, central retrograde minute carousel",
      caseMaterial: "Sandblasted Titanium and Stainless Steel with Curved Sapphire Glazing",
      dimensionsMm: "44.0 mm wide x 47.0 mm long x 15.8 mm high",
      powerReserveHours: 48,
      windingSystem: "Automatic winding with dual shock-absorbing micro-turbines",
      collectorNotes: "An unprecedented horological kinematic mechanism nicknamed 'Spock' for its V-shaped split. Each satellite arm carries two morphing prisms that divide into a V-formation, rotate independently on their internal axes, and reunite into a single planar numeral when entering the active minute track.",
      images: [
        {
          label: "UR-120 Split Satellite Architecture",
          url: "/assets/urwerk/urwerk-ur120-spock-split.jpg",
          caption: "Kinematic satellites splitting into Vulcan salute formation before re-indexing the hour digit."
        },
        {
          label: "Exploded Kinematic Calibre Anatomy",
          url: "/assets/urwerk/urwerk-ur120-exploded.jpg",
          caption: "Micro-machined star wheels, planetary gears, and lyre springs orchestrating the satellite split."
        }
      ],
      accentColor: "#00FF66"
    },
    {
      id: "ur-220",
      name: "URWERK UR-220 'Falcon Project'",
      subtitle: "Carbon Thin Ply (CTP) // 39-Month Oil Change Gauge",
      editionLimit: "Numbered Limited Edition // Geneva Manufacture",
      priceUsd: 165000,
      caliber: "Calibre UR-7.20 Manual-Wind with Twin Mainspring Barrels",
      complications: "3D retrograde minute pointer framing rotating satellite cubes, 39-month Oil Change service indicator, dual power reserve",
      caseMaterial: "Carbon Thin Ply (CTP) composed of 81 layers of compressed 150g/m² carbon filament",
      dimensionsMm: "43.8 mm wide x 53.6 mm long x 14.8 mm high",
      powerReserveHours: 60,
      windingSystem: "Manual wind with dual rear-mounted roller counters tracking operational lifespan up to 39 months",
      collectorNotes: "The ultimate technical expression of the satellite carousel. Features an open-worked aluminum retrograde hand weighing just 0.10 grams driven by an 83-tooth rack. On the caseback, two calibrated roller drums count operational time over 39 months, signaling when oil viscosity requires manufacture service.",
      images: [
        {
          label: "UR-220 Super-LumiNova Luminescent Night Glow",
          url: "/assets/urwerk/urwerk-ur220-luminescent-night.jpg",
          caption: "Grade X1 Super-LumiNova glowing emerald green across the three-dimensional retrograde minute cage."
        },
        {
          label: "Exploded Falcon Calibre Architecture",
          url: "/assets/urwerk/urwerk-ur220-falcon-exploded.jpg",
          caption: "Twin mainspring barrels delivering 60 hours of torque through the retrograde minute cam."
        },
        {
          label: "Compressed 81-Layer Carbon Thin Ply Case",
          url: "/assets/urwerk/urwerk-ur220-carbon-case.jpg",
          caption: "Micro-stratified carbon shell with concentric striations machined directly from solid block."
        }
      ],
      accentColor: "#FF7700"
    },
    {
      id: "ur-112",
      name: "URWERK UR-112 Aggregat",
      subtitle: "Special Projects Division // Jumping Digital Cylinders",
      editionLimit: "Strictly Limited to 25 Pieces Worldwide",
      priceUsd: 280000,
      caliber: "Calibre UR-13.01 with Long Drive Shaft and Planetary Differentials",
      complications: "Jumping hours on dual triangular prism cylinders, jumping minutes on dual triangular prisms, sweep digital seconds",
      caseMaterial: "Aerodynamic Matte Titanium and Black Grooved Steel with Flip-Top Hunter Canopy",
      dimensionsMm: "42.0 mm wide x 51.0 mm long x 16.0 mm high",
      powerReserveHours: 48,
      windingSystem: "Self-winding with Cardan drive shaft linking movement to horizontal jumping cylinders",
      collectorNotes: "Inspired by Bugatti streamline speed records and aerospace cockpit indicators. Beneath a titanium hunter hood that unlatches like an aerodynamic cowl, hours and minutes revolve on miniature triangular prisms connected by a central titanium driveshaft.",
      images: [
        {
          label: "UR-112 Aggregat Profile with Cockpit Hood",
          url: "/assets/urwerk/urwerk-ur112-aggregat.jpg",
          caption: "Twin viewing cylinders displaying digital jumping numerals under anti-reflective sapphire crystals."
        },
        {
          label: "Internal Cardan Shaft & Planetary Differential",
          url: "/assets/urwerk/urwerk-ur112-insight-mechanics.jpg",
          caption: "Exposed horizontal transmission converting vertical spring energy into instant digital jumps."
        }
      ],
      accentColor: "#D4AF37"
    }
  ];

  const [selectedPiece, setSelectedPiece] = useState<TimepieceModel>(timepieces[0]);
  const [timeMultiplier, setTimeMultiplier] = useState<number>(60); // 1x to 3600x
  const [isLumeMode, setIsLumeMode] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [activeDossierHotspot, setActiveDossierHotspot] = useState<number>(0);

  // Escrow Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [handoverOption, setHandoverOption] = useState<string>("geneva-manufacture");
  const [includeWatchmakerMasterclass, setIncludeWatchmakerMasterclass] = useState<boolean>(true);
  const [includeCustomStrapSuite, setIncludeCustomStrapSuite] = useState<boolean>(true);
  const [allocationConfirmed, setAllocationConfirmed] = useState<boolean>(false);
  const [patronName, setPatronName] = useState<string>("");
  const [patronEmail, setPatronEmail] = useState<string>("");
  const [patronCity, setPatronCity] = useState<string>("");

  // Virtual Clock & Astrophysics state
  const [virtualSeconds, setVirtualSeconds] = useState<number>(10 * 3600 + 8 * 60 + 20); // 10:08:20
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Calculated values
  const currentTotalMinutes = (virtualSeconds / 60) % 720;
  const currentHour = Math.floor(currentTotalMinutes / 60) === 0 ? 12 : Math.floor(currentTotalMinutes / 60);
  const currentMinute = Math.floor(currentTotalMinutes % 60);
  const currentSecond = Math.floor(virtualSeconds % 60);

  // Astrophysics distance calculations (UR-100V scale)
  const earthRotationalKm = Number(((virtualSeconds / 1200) * 555.55).toFixed(2));
  const earthOrbitalKm = Number(((virtualSeconds / 1200) * 35740).toFixed(0));

  // Audio synthesis: mechanical escapement click
  const playMechanicalClick = () => {
    if (isAudioMuted || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // AudioContext unavailable
    }
  };

  // Virtual time progression timer
  useEffect(() => {
    const interval = setInterval(() => {
      setVirtualSeconds((prev) => prev + (timeMultiplier / 10));
    }, 100);
    return () => clearInterval(interval);
  }, [timeMultiplier]);

  // 60 FPS HTML5 Canvas: Live Urwerk Wandering Hour Satellite Orbit Simulator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const centerX = w / 2;
      const centerY = h / 2 + 10;
      const radius = 135;

      ctx.clearRect(0, 0, w, h);

      // Background plate
      ctx.fillStyle = isLumeMode ? "#040806" : "#0A0C11";
      ctx.fillRect(0, 0, w, h);

      // Outer bezel ring
      ctx.strokeStyle = isLumeMode ? "#00FF6633" : "#1E2433";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 25, 0, Math.PI * 2);
      ctx.stroke();

      // Lower 120-degree Minute Arc (from 30° to 150° in standard clock coordinates: 0m to 60m)
      const startAngle = Math.PI * 0.25;
      const endAngle = Math.PI * 0.75;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = isLumeMode ? "#00FF66" : "#00E5FF";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Minute Tick Marks along the arc (0 to 60 minutes)
      for (let m = 0; m <= 60; m += 5) {
        const t = m / 60;
        const angle = startAngle + t * (endAngle - startAngle);
        const x1 = centerX + Math.cos(angle) * (radius - 8);
        const y1 = centerY + Math.sin(angle) * (radius - 8);
        const x2 = centerX + Math.cos(angle) * (radius + 8);
        const y2 = centerY + Math.sin(angle) * (radius + 8);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = m % 15 === 0 
          ? (isLumeMode ? "#00FF66" : "#D4AF37") 
          : (isLumeMode ? "#00FF6666" : "#4A5266");
        ctx.lineWidth = m % 15 === 0 ? 2.5 : 1.5;
        ctx.stroke();

        // Numerals for 0, 15, 30, 45, 60
        if (m % 15 === 0) {
          const textRadius = radius + 19;
          const tx = centerX + Math.cos(angle) * textRadius;
          const ty = centerY + Math.sin(angle) * textRadius + 4;
          ctx.fillStyle = isLumeMode ? "#00FF66" : "#EDE8E1";
          ctx.font = "bold 9px 'Courier New', monospace";
          ctx.textAlign = "center";
          ctx.fillText(m.toString(), tx, ty);
        }
      }

      // 3-Arm Rotating Central Carousel
      // Total carousel rotation: 1 full turn (360 degrees) = 3 hours = 180 minutes
      // Active arm passes the 120-degree arc in exactly 60 minutes
      const carouselAngle = (virtualSeconds / 10800) * (Math.PI * 2);

      // Central Hub
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(carouselAngle);

      // Hub Body
      ctx.fillStyle = isLumeMode ? "#061A10" : "#141722";
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isLumeMode ? "#00FF66" : "#2E364A";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3 Radial Satellite Arms (120 degrees apart)
      for (let arm = 0; arm < 3; arm++) {
        const armAngle = (arm * Math.PI * 2) / 3;
        ctx.save();
        ctx.rotate(armAngle);

        // Titanium Arm Skeleton
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(-4, radius);
        ctx.lineTo(4, radius);
        ctx.lineTo(6, 0);
        ctx.closePath();
        ctx.fillStyle = isLumeMode ? "#0A2616" : "#1B202E";
        ctx.fill();
        ctx.strokeStyle = isLumeMode ? "#00FF6688" : "#364158";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Satellite Hour Disc / Pod
        ctx.save();
        ctx.translate(0, radius);
        
        // Counter-rotation to keep numeral oriented or compute Maltese cross jump
        ctx.rotate(-carouselAngle - armAngle);

        ctx.fillStyle = isLumeMode ? "#021A0C" : "#0D1017";
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isLumeMode ? "#00FF66" : "#00E5FF";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Satellite Hour Value calculation for this arm
        const baseHour = ((currentHour + arm * 4 - 1) % 12) + 1;
        ctx.fillStyle = isLumeMode ? "#00FF66" : "#FFFFFF";
        ctx.font = "bold 13px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(baseHour.toString(), 0, 0);

        // Arrow Pointer extending toward minute track
        ctx.beginPath();
        ctx.moveTo(0, 18);
        ctx.lineTo(4, 25);
        ctx.lineTo(-4, 25);
        ctx.closePath();
        ctx.fillStyle = isLumeMode ? "#00FF66" : "#FF7700";
        ctx.fill();

        ctx.restore();
        ctx.restore();
      }

      ctx.restore();

      // Center Pinion with Geneva cross emblem
      ctx.fillStyle = isLumeMode ? "#00FF66" : "#D4AF37";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Planetary Telemetry Callouts
      ctx.fillStyle = isLumeMode ? "#00FF6688" : "#8A909F";
      ctx.font = "10px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`GENEVA MANUFACTURE // 60 FPS ORBITAL SATELLITE KINEMATICS`, 18, 22);
      ctx.fillText(`TIME: ${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}:${currentSecond.toString().padStart(2, "0")}`, 18, 36);

      ctx.textAlign = "right";
      ctx.fillStyle = isLumeMode ? "#00FF66" : "#00E5FF";
      ctx.fillText(`EARTH ROTATION: ${earthRotationalKm} KM`, w - 18, 22);
      ctx.fillText(`SOLAR ORBIT: ${earthOrbitalKm} KM`, w - 18, 36);

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [virtualSeconds, isLumeMode, currentHour, currentMinute, currentSecond, earthRotationalKm, earthOrbitalKm]);

  // Engineering Dossier Hotspot Items
  const dossierItems = [
    {
      id: 1,
      title: "Windfänger Planetary Turbine Rotor",
      spec: "Calibre UR-12.02 // Planetary Damper Ring",
      image: "/assets/urwerk/urwerk-ur100v-exploded-caliber.jpg",
      description: "Felix Baumgartner's patented air-resistance winding brake. When violent wrist shocks accelerate the winding rotor, the planetary gear train spins miniature fan blades creating air turbulence that limits rotor speed and protects the winding arbor from friction damage."
    },
    {
      id: 2,
      title: "Maltese Cross Satellite Geneva Mechanism",
      spec: "Beryllium Bronze Geneva Crosses // 120° Indexing",
      image: "/assets/urwerk/urwerk-ur100v-satellite-dial.png",
      description: "Three satellite discs mounted on a central carousel revolving on a fixed ring gear. Each satellite carries four hour numerals on distinct planar facets. As a satellite leaves the 60-minute mark, a Maltese cross pin strikes a star cam, rotating the satellite by 90 degrees to reveal its next hour numeral."
    },
    {
      id: 3,
      title: "Kinematic Split-Prism 'Spock' System",
      spec: "Calibre UR-20.01 // Dual Synchronized Prisms",
      image: "/assets/urwerk/urwerk-ur120-exploded.jpg",
      description: "An intricate planetary differential split. Instead of a solid satellite block, each hour numeral is composed of two half-prisms that split into an open V-shape, rotate independently on twin internal axes, and lock back into a single flat plane with 5-micron tolerance."
    },
    {
      id: 4,
      title: "39-Month Mechanical Oil Change Gauge",
      spec: "Roller Drum Mechanical Service Counter",
      image: "/assets/urwerk/urwerk-ur220-falcon-exploded.jpg",
      description: "Positioned on the caseback of the UR-220, two numbered cylindrical rollers advance continually during operation. When the mechanism registers 39 months of movement runtime, the gauge signals that oil lubrication viscosity is approaching threshold and requires Geneva manufacture service."
    }
  ];

  const handleConfirmAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName || !patronEmail) return;

    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#00E5FF", "#00FF66", "#D4AF37", "#EDE8E1"]
    });

    setAllocationConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#06070A] text-[#EDE8E1] font-sans antialiased selection:bg-[#00E5FF] selection:text-[#06070A]">

      {/* 00 // GENEVA MANUFACTURE RUNWAY TOP BAR */}
      <div className="border-b border-[#161B26] bg-[#080A0F] px-4 py-2.5 text-xs text-[#8A909F] font-mono sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[#00E5FF] hover:text-[#FFFFFF] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>RETURN TO BBC COLLECTIVE</span>
            </Link>
            <span className="hidden sm:inline text-[#202738]">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#8A909F]">
              <Compass className="w-3 h-3 text-[#00FF66]" />
              <span>GENEVA MANUFACTURE // 46.2044° N, 6.1432° E</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden lg:inline text-[#8A909F]">
              FELIX BAUMGARTNER & MARTIN FREI // SATELLITE HAUTE HORLOGERIE
            </span>
            <div className="flex items-center gap-2 border-l border-[#1F2738] pl-4">
              <button
                onClick={() => {
                  setIsAudioMuted(!isAudioMuted);
                  playMechanicalClick();
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-colors ${
                  !isAudioMuted 
                    ? "bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF]" 
                    : "bg-[#101420] border-[#1C2333] text-[#6E7585] hover:text-[#EDE8E1]"
                }`}
                title="Toggle Web Audio escapement tick sound"
              >
                {!isAudioMuted ? <Volume2 className="w-3 h-3 text-[#00E5FF]" /> : <VolumeX className="w-3 h-3 text-[#6E7585]" />}
                <span>{!isAudioMuted ? "ESCAPEMENT: ON" : "AUDIO: MUTE"}</span>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                  playMechanicalClick();
                }}
                className="flex items-center gap-1.5 bg-[#00E5FF] hover:bg-[#33ECFF] text-[#06070A] font-semibold px-3 py-1 rounded text-[11px] transition-all"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ALLOCATION ESCROW</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* 01 // EDITORIAL HERO: SATELLITE WANDERING-HOUR ARCHITECTURE */}
        <section className="relative border border-[#191F2C] bg-[#090B10] overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-80"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Hero Column: Horological Philosophy & Astronomy */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#121622] border border-[#212A3E] text-[11px] font-mono text-[#00E5FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping"></span>
                  <span>URWERK GENÈVE // EST. 1997 INDEPENDENT MANUFACTURE</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.08]">
                  Satellite Wandering Hours.
                  <span className="block text-[#00E5FF] font-mono font-normal mt-1 text-2xl sm:text-4xl">
                    Planetary Orbit Time.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-[#959DAF] leading-relaxed max-w-xl">
                  Rejecting conventional hands and circular dial conformity, master watchmaker Felix Baumgartner and designer Martin Frei pioneered orbiting satellite carousel movements that measure not merely terrestrial minutes, but humanity's cosmic voyage through space-time.
                </p>
              </div>

              {/* Astrophysics Telemetry Counters */}
              <div className="p-4 bg-[#0E121B] border border-[#1C2436] rounded-lg space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[#8A909F] pb-1 border-b border-[#182030]">
                  <span className="flex items-center gap-1.5 text-[#00E5FF]">
                    <Globe className="w-3.5 h-3.5" />
                    <span>ASTROPHYSICAL SCALES (UR-100V PROTOCOL)</span>
                  </span>
                  <span className="text-[#00FF66]">LIVE REAL-TIME TELEMETRY</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] text-[#636C80] block">EARTH AXIAL ROTATION</span>
                    <span className="text-sm font-bold text-[#FFFFFF]">{earthRotationalKm} KM</span>
                    <span className="text-[10px] text-[#8A909F] block">At equator (555.55 km / 20 min)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#636C80] block">EARTH SOLAR VOYAGE</span>
                    <span className="text-sm font-bold text-[#00E5FF]">{earthOrbitalKm} KM</span>
                    <span className="text-[10px] text-[#8A909F] block">Orbit speed (35,740 km / 20 min)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsDrawerOpen(true);
                    playMechanicalClick();
                  }}
                  className="px-6 py-3.5 rounded bg-[#00E5FF] hover:bg-[#33ECFF] text-[#06070A] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#00E5FF]/15 flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>REQUEST MANUFACTURE ALLOCATION</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href="#orbital-canvas"
                  onClick={() => playMechanicalClick()}
                  className="px-5 py-3.5 rounded border border-[#1F2738] hover:border-[#00E5FF]/50 bg-[#101420] hover:bg-[#161C2C] text-[#D8DDE8] text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <RotateCw className="w-4 h-4 text-[#00E5FF]" />
                  <span>ORBITAL SATELLITE SIMULATOR</span>
                </a>
              </div>
            </div>

            {/* Right Hero Column: UR-100V Lightspeed Master Image */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full bg-[#07090D] border-t lg:border-t-0 lg:border-l border-[#191F2C] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <div className="relative w-full h-full min-h-[360px] lg:min-h-[520px] rounded-lg overflow-hidden border border-[#202738] bg-[#0A0D14]">
                <img
                  src="/assets/urwerk/urwerk-ur100v-hero.jpg"
                  alt="URWERK UR-100V Lightspeed wandering hour satellite timepiece"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070A] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#090C12]/90 border border-[#1F283B] backdrop-blur-md rounded flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block text-[#00E5FF] font-bold">URWERK UR-100V // LIGHTSPEED</span>
                    <span className="text-[#8A909F] text-[11px]">Calibre UR-12.02 // Titanium & Ceramic // $74,000 USD</span>
                  </div>
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-[#121622] border border-[#27324A] rounded text-[10px] text-[#A6ADB8]">
                    GENEVA STUDIO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 // 60 FPS HTML5 CANVAS: WANDERING-HOUR SATELLITE ORBITAL MECHANICS */}
        <section id="orbital-canvas" className="border border-[#191F2C] bg-[#090B10] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#191F2C] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E5FF]">
                <Activity className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>60 FPS KINEMATIC SIMULATOR // WANDERING HOUR CAROUSEL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Satellite Planetary Orbital Mechanics
              </h2>
              <p className="text-sm text-[#8A909F] max-w-2xl">
                Observe Urwerk's patented satellite complication. Three rotating arms travel across the 120-degree minute sector. As one satellite finishes at minute 60, the next arm takes over at minute 0 while the outgoing pod indexes 90° on its Maltese cross.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsLumeMode(!isLumeMode);
                  playMechanicalClick();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono font-semibold transition-all ${
                  isLumeMode 
                    ? "bg-[#00FF66]/15 border-[#00FF66] text-[#00FF66] shadow-[0_0_12px_#00FF66]/30" 
                    : "bg-[#101420] border-[#1F2738] text-[#8A909F] hover:text-[#FFFFFF]"
                }`}
              >
                {isLumeMode ? <Moon className="w-3.5 h-3.5 text-[#00FF66]" /> : <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />}
                <span>{isLumeMode ? "SUPER-LUMINOVA: UV ACTIVATED" : "DAYLIGHT ATELIER VIEW"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Live Canvas */}
            <div className="lg:col-span-7 bg-[#05070B] border border-[#191F2C] rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono px-2 text-[#707685]">
                <span>120° MINUTE TRACK & SATELLITE CAROUSEL</span>
                <span className="text-[#00FF66] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
                  ORBITAL ACCELERATION: {timeMultiplier}X
                </span>
              </div>

              <div className="relative aspect-[16/11] w-full bg-[#040508] rounded overflow-hidden border border-[#141A26]">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={440}
                  className="w-full h-full block"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="bg-[#0D1017] border border-[#19202E] p-2 rounded">
                  <span className="block text-[#636C80] text-[10px]">CURRENT TIME</span>
                  <span className="text-sm font-bold text-[#00E5FF]">
                    {currentHour.toString().padStart(2, "0")}:{currentMinute.toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="bg-[#0D1017] border border-[#19202E] p-2 rounded">
                  <span className="block text-[#636C80] text-[10px]">ACTIVE MINUTE</span>
                  <span className="text-sm font-bold text-[#00FF66]">
                    {currentMinute} / 60 MIN
                  </span>
                </div>
                <div className="bg-[#0D1017] border border-[#19202E] p-2 rounded">
                  <span className="block text-[#636C80] text-[10px]">CAROUSEL CYCLE</span>
                  <span className="text-sm font-bold text-[#D4AF37]">
                    1 REV / 3 HOURS
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Speed Control & Physical Diagnostics */}
            <div className="lg:col-span-5 space-y-6">
              {/* Orbital Speed Slider */}
              <div className="p-4 bg-[#0B0E14] border border-[#191F2C] rounded-lg space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-[#8A909F]">
                  <span>ORBITAL SPEED MULTIPLIER:</span>
                  <span className="text-[#00E5FF] font-bold">{timeMultiplier}X VELOCITY</span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="360"
                  step="5"
                  value={timeMultiplier}
                  onChange={(e) => {
                    setTimeMultiplier(parseInt(e.target.value));
                    playMechanicalClick();
                  }}
                  className="w-full accent-[#00E5FF] cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-[#555C6E]">
                  <span>1X REAL-TIME</span>
                  <span>60X (1 MIN/SEC)</span>
                  <span>360X MAX ACCELERATION</span>
                </div>
              </div>

              {/* Maltese Cross Mechanical Breakdown */}
              <div className="p-5 bg-[#0B0E14] border border-[#191F2C] rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF]">
                  <Cpu className="w-4 h-4 text-[#00FF66]" />
                  <span>SATELLITE COMPLICATION PHYSICS:</span>
                </div>
                <p className="text-xs text-[#8A909F] leading-relaxed">
                  Traditional minute hands describe a complete 360° circle, requiring the eye to visually synthesize two independent angular pointers. In Urwerk's wandering-hour system, the hour digit physically sweeps across a linear 120° graduated minute scale, merging hours and minutes into a single focal point.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#161D2B] text-xs font-mono">
                  <div className="bg-[#0F131D] p-2 rounded border border-[#1C2436]">
                    <span className="text-[10px] text-[#636C80] block">MALTESE CROSS</span>
                    <span className="text-[#FFFFFF]">Beryllium Bronze</span>
                  </div>
                  <div className="bg-[#0F131D] p-2 rounded border border-[#1C2436]">
                    <span className="text-[10px] text-[#636C80] block">SECTOR ARC</span>
                    <span className="text-[#00FF66]">120 Degrees</span>
                  </div>
                </div>
              </div>

              {/* Night Luminescence Indicator */}
              <div className="p-4 bg-[#0B0E14] border border-[#191F2C] rounded-lg flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#8A909F] block text-[11px]">SUPER-LUMINOVA GRADE:</span>
                  <span className="text-[#00FF66] font-bold">Grade X1 Custom Green/Cyan</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsLumeMode(!isLumeMode);
                    playMechanicalClick();
                  }}
                  className="px-3 py-1.5 rounded bg-[#131824] hover:bg-[#1A2233] border border-[#222C3E] text-xs text-[#D8DDE8] transition-colors"
                >
                  {isLumeMode ? "SWITCH TO DAYLIGHT" : "SIMULATE NIGHT UV"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 03 // EXPLODED CALIBRE & SATELLITE ANATOMY */}
        <section id="engineering-dossier" className="border border-[#191F2C] bg-[#090B10] rounded-xl p-6 sm:p-8 space-y-8">
          <div className="space-y-1 border-b border-[#191F2C] pb-5">
            <span className="text-xs font-mono text-[#00E5FF]">HAUTE HORLOGERIE ANATOMY // FELIX BAUMGARTNER PATENTS</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Kinematic Calibre & Satellite Engineering
            </h3>
            <p className="text-sm text-[#8A909F] max-w-2xl">
              Inspect the micro-engineered components comprising Urwerk's mechanical creations. Select an engineering dossier below to examine the movement mechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Preview Container */}
            <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-[#202738] bg-[#06080D]">
              <div className="aspect-[16/10] relative w-full overflow-hidden">
                <img
                  src={dossierItems[activeDossierHotspot].image}
                  alt={dossierItems[activeDossierHotspot].title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-black/80 border border-[#222C3E] backdrop-blur-md rounded flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block text-[#00E5FF] font-bold">
                      {dossierItems[activeDossierHotspot].title}
                    </span>
                    <span className="text-[#8A909F] text-[10px]">
                      {dossierItems[activeDossierHotspot].spec}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#121622] border border-[#27324A] rounded text-[10px] text-[#00FF66]">
                    DOSSIER #{activeDossierHotspot + 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Dossier Selector & Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-[#0B0E14] border border-[#1E2536] rounded-lg space-y-4">
                <div className="flex items-center justify-between border-b border-[#182030] pb-3">
                  <span className="text-xs font-mono text-[#00E5FF]">
                    CALIBRE SPECIFICATION #{activeDossierHotspot + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#636C80]">
                    GENEVA MANUFACTURE
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#FFFFFF]">
                  {dossierItems[activeDossierHotspot].title}
                </h4>

                <div className="p-2.5 bg-[#101420] border border-[#1D2536] rounded text-xs font-mono text-[#00FF66]">
                  {dossierItems[activeDossierHotspot].spec}
                </div>

                <p className="text-sm text-[#959DAF] leading-relaxed">
                  {dossierItems[activeDossierHotspot].description}
                </p>

                {/* 4 Hotspot Buttons */}
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {dossierItems.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveDossierHotspot(idx);
                        playMechanicalClick();
                      }}
                      className={`p-2.5 rounded border text-center text-xs font-mono transition-colors ${
                        activeDossierHotspot === idx 
                          ? "border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF] font-bold" 
                          : "border-[#19202E] bg-[#0E1118] text-[#636C80] hover:text-[#EDE8E1]"
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

        {/* 04 // FLAGSHIP MANUFACTURE TIMEPIECE FLEET */}
        <section id="fleet" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#191F2C] pb-5">
            <div>
              <span className="text-xs font-mono text-[#00E5FF]">GENEVA STUDIO // MANUFACTURE CATALOG</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">Flagship Independent Creations</h3>
            </div>
            <span className="text-xs font-mono text-[#8A909F]">
              HANDMADE IN GENEVA & ZURICH // PATENTS PENDING
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timepieces.map((watch) => (
              <div
                key={watch.id}
                className="border border-[#191F2C] bg-[#090B10] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#00E5FF]/50 transition-all group"
              >
                <div>
                  <div className="aspect-square relative overflow-hidden bg-[#06080D] border-b border-[#191F2C]">
                    <img
                      src={watch.images[0].url}
                      alt={watch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#090C12]/85 border border-[#1E2536] text-[10px] font-mono text-[#00E5FF]">
                      {watch.editionLimit.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-xs font-mono text-[#636C80] block truncate">{watch.subtitle}</span>
                    <h4 className="text-lg font-bold text-[#FFFFFF]">{watch.name}</h4>
                    <p className="text-xs text-[#8A909F] leading-relaxed line-clamp-3">
                      {watch.collectorNotes}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#161D2B] text-xs font-mono">
                      <div>
                        <span className="text-[#636C80] text-[10px] block">POWER RESERVE</span>
                        <span className="text-[#FFFFFF]">{watch.powerReserveHours} Hours</span>
                      </div>
                      <div>
                        <span className="text-[#636C80] text-[10px] block">CASE MAT</span>
                        <span className="text-[#00E5FF] truncate block">{watch.caseMaterial.split(" ")[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between border-t border-[#161D2B] pt-4 mb-3">
                    <span className="text-xs font-mono text-[#8A909F]">MANUFACTURE PRICE:</span>
                    <span className="text-base font-bold font-mono text-[#00E5FF]">
                      ${watch.priceUsd.toLocaleString()} USD
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPiece(watch);
                      setIsDrawerOpen(true);
                      playMechanicalClick();
                    }}
                    className="w-full py-2.5 rounded bg-[#101420] hover:bg-[#00E5FF] text-[#D8DDE8] hover:text-[#06070A] border border-[#1F2738] hover:border-[#00E5FF] text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>CONFIGURE ALLOCATION</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 05 // SLIDE-OUT VIP MANUFACTURE ALLOCATION & ESCROW DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#090B10] border-l border-[#1F2738] h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#191F2C] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#00E5FF]">URWERK GENÈVE MANUFACTURE</span>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Timepiece Allocation Request</h3>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setAllocationConfirmed(false);
                    playMechanicalClick();
                  }}
                  className="p-1.5 rounded hover:bg-[#161C2A] text-[#707685] hover:text-[#EDE8E1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!allocationConfirmed ? (
                <form onSubmit={handleConfirmAllocation} className="space-y-5">
                  <div className="p-3.5 bg-[#0F131D] border border-[#1C2538] rounded space-y-2">
                    <span className="text-xs font-mono text-[#636C80] block">SELECTED TIMEPIECE:</span>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#FFFFFF]">{selectedPiece.name}</span>
                      <span className="font-mono text-sm text-[#00E5FF]">
                        ${selectedPiece.priceUsd.toLocaleString()} USD
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#8A909F] block">
                      {selectedPiece.caliber} // {selectedPiece.caseMaterial}
                    </span>
                  </div>

                  {/* Handover Options */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#8A909F] block">
                      PREFERRED MANUFACTURE HANDOVER PROTOCOL:
                    </label>
                    <div className="space-y-1.5 text-xs font-mono">
                      {[
                        { id: "geneva-manufacture", label: "Geneva Manufacture Studio Handover", notes: "Private dinner and atelier tour with Felix Baumgartner and Martin Frei" },
                        { id: "zurich-design", label: "Zurich Creative Studio Presentation", notes: "Design archive walkthrough with Martin Frei in Zurich" },
                        { id: "diplomatic-courier", label: "Insured White-Glove Diplomatic Airfreight", notes: "Secure armored transport directly to your private estate or bank vault" }
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => {
                            setHandoverOption(item.id);
                            playMechanicalClick();
                          }}
                          className={`w-full p-2.5 rounded border text-left transition-all ${
                            handoverOption === item.id 
                              ? "border-[#00E5FF] bg-[#0E1522] text-[#FFFFFF]" 
                              : "border-[#19202E] bg-[#0B0E14] text-[#707685] hover:border-[#242E42]"
                          }`}
                        >
                          <span className="font-semibold block">{item.label}</span>
                          <span className="text-[10px] text-[#8A909F]">{item.notes}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tailored Options */}
                  <div className="space-y-2 pt-2 border-t border-[#191F2C]">
                    <span className="text-xs font-mono text-[#8A909F] block">COLLECTOR EXPERIENCE OPTIONS:</span>
                    
                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0B0E14] border border-[#191F2C] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeWatchmakerMasterclass}
                        onChange={(e) => setIncludeWatchmakerMasterclass(e.target.checked)}
                        className="accent-[#00E5FF]"
                      />
                      <span>Half-Day Satellite Assembly Masterclass with Master Watchmaker (+$12,000)</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded bg-[#0B0E14] border border-[#191F2C] cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={includeCustomStrapSuite}
                        onChange={(e) => setIncludeCustomStrapSuite(e.target.checked)}
                        className="accent-[#00E5FF]"
                      />
                      <span>Custom Three-Strap Suite (Vulcanized Rubber, KEVLAR, Matte Alligator) (+$4,500)</span>
                    </label>
                  </div>

                  {/* Patron Details */}
                  <div className="space-y-3 pt-2 border-t border-[#191F2C] text-xs font-mono">
                    <div>
                      <label className="text-[#8A909F] block mb-1">PATRON / COLLECTOR NAME:</label>
                      <input
                        type="text"
                        required
                        value={patronName}
                        onChange={(e) => setPatronName(e.target.value)}
                        placeholder="e.g. Lord Alexander Sinclair"
                        className="w-full bg-[#101420] border border-[#1F2738] rounded p-2.5 text-[#EDE8E1] focus:border-[#00E5FF] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8A909F] block mb-1">DIRECT EXECUTIVE EMAIL:</label>
                      <input
                        type="email"
                        required
                        value={patronEmail}
                        onChange={(e) => setPatronEmail(e.target.value)}
                        placeholder="e.g. principal@sinclair-family.ch"
                        className="w-full bg-[#101420] border border-[#1F2738] rounded p-2.5 text-[#EDE8E1] focus:border-[#00E5FF] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#8A909F] block mb-1">CITY / REGISTRY RESIDENCE:</label>
                      <input
                        type="text"
                        value={patronCity}
                        onChange={(e) => setPatronCity(e.target.value)}
                        placeholder="e.g. Geneva, Switzerland / Singapore / London, UK"
                        className="w-full bg-[#101420] border border-[#1F2738] rounded p-2.5 text-[#EDE8E1] focus:border-[#00E5FF] outline-none"
                      />
                    </div>
                  </div>

                  {/* Escrow Trigger */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs font-mono mb-3">
                      <span className="text-[#8A909F]">REFUNDABLE MANUFACTURE ESCROW DEPOSIT:</span>
                      <span className="text-base font-bold text-[#00E5FF]">$25,000 USD</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded bg-[#00E5FF] hover:bg-[#33ECFF] text-[#06070A] font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#00E5FF]/20 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>CONFIRM ALLOCATION ESCROW</span>
                    </button>
                    <span className="block text-center text-[10px] text-[#636C80] font-mono mt-2">
                      Held in certified legal escrow. Fully refundable prior to final Geneva movement casing.
                    </span>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] mx-auto flex items-center justify-center text-[#00E5FF]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#FFFFFF]">Manufacture Allocation Reserved</h4>
                  <p className="text-xs text-[#959DAF] max-w-sm mx-auto leading-relaxed">
                    Thank you, {patronName}. Official Urwerk Geneva manufacture reservation certification and movement assembly dossiers have been dispatched to <span className="text-[#00E5FF] font-mono">{patronEmail}</span>.
                  </p>
                  <div className="p-3 bg-[#0E121B] border border-[#1E2536] rounded font-mono text-xs text-[#8A909F] max-w-xs mx-auto text-left">
                    <div>CHRONOMETRIC PROTOCOL: #URW-{Math.floor(1000 + Math.random() * 9000)}</div>
                    <div>STATUS: ESCROW ALLOCATED</div>
                    <div>HANDOVER: {handoverOption.toUpperCase()}</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setAllocationConfirmed(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded bg-[#131824] border border-[#222C3E] hover:border-[#00E5FF] text-xs font-mono text-[#D8DDE8] transition-all"
                  >
                    RETURN TO MANUFACTURE
                  </button>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#191F2C] text-center text-[11px] font-mono text-[#636C80]">
              URWERK SA // GENEVA & ZURICH, SWITZERLAND // EST. 1997
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

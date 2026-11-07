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
  FileText,
  Layers,
  Activity,
  Sliders,
  Volume2,
  VolumeX,
  Droplets,
  HardHat,
  Sparkle,
  Compass,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Play,
  Pause,
  ExternalLink,
  Maximize2
} from "lucide-react";

interface BathProduct {
  id: string;
  name: string;
  germanTitle: string;
  designer: string;
  category: string;
  sku: string;
  basePrice: number;
  capacityLiters: number;
  netWeightKg: number;
  dimensionsMm: { length: number; width: number; depth: number };
  material: string;
  warrantyYears: number;
  floorContactM2: number;
  description: string;
  images: { label: string; url: string; caption: string }[];
  accentColor: string;
}

interface ProjectileType {
  id: string;
  name: string;
  massKg: number;
  standard: string;
  description: string;
}

interface ProjectTier {
  id: string;
  name: string;
  scale: string;
  discountRate: number;
  description: string;
}

export default function KaldeweiShowcasePage() {
  // Flagship Architectural Catalog
  const products: BathProduct[] = [
    {
      id: "centro-duo-oval",
      name: "Meisterstück Centro Duo Oval",
      germanTitle: "Meisterstück Centro Duo Oval Freistehend",
      designer: "Sottsass Associati",
      category: "Freestanding Monolithic Bath",
      sku: "KW-MST-CDO-170",
      basePrice: 8450,
      capacityLiters: 156,
      netWeightKg: 122,
      dimensionsMm: { length: 1700, width: 750, depth: 470 },
      material: "3.5mm Glazed Titanium-Steel (Molecular Enamel Fusion)",
      warrantyYears: 30,
      floorContactM2: 1.15,
      description: "Pure oval symmetry with dual identical backrest slopes. Continuous single-piece enamelled steel apron eliminates visible joints, providing superior thermal retention, non-porous hygiene, and structural rigidity.",
      images: [
        {
          label: "Monolithic Oval Architecture",
          url: "/assets/kaldewei/kw-meisterstueck-hero.jpg",
          caption: "Kaldewei Meisterstück Centro Duo Oval in pure architectural travertine suite."
        },
        {
          label: "3.5mm Vitreous Steel Molecular Bond",
          url: "/assets/kaldewei/kw-enamel-macro.jpg",
          caption: "Precision edge radius showing fused glass enamel molecular bond to titanium steel at 850°C."
        },
        {
          label: "Flush Integrated Waste System",
          url: "/assets/kaldewei/kw-drain-detail.jpg",
          caption: "Enamelled flush waste cover and overflow integrated flush to the bath contour."
        }
      ],
      accentColor: "#F4F1EA"
    },
    {
      id: "conoduo-freestanding",
      name: "Meisterstück Conoduo",
      germanTitle: "Meisterstück Conoduo Quader Freistehend",
      designer: "Studio Aisslinger",
      category: "Cubist Architectural Monolith",
      sku: "KW-MST-CND-170",
      basePrice: 9280,
      capacityLiters: 159,
      netWeightKg: 138,
      dimensionsMm: { length: 1700, width: 750, depth: 445 },
      material: "3.5mm Glazed Titanium-Steel (Molecular Enamel Fusion)",
      warrantyYears: 30,
      floorContactM2: 1.25,
      description: "Sharp linear geometry engineered for central space placement. Planar exterior steel aprons create an architectural presence inspired by minimalist sculpture, concealing Sound Wave acoustic transducers.",
      images: [
        {
          label: "Cubist Architectural Monolith",
          url: "/assets/kaldewei/kw-conoduo-freestanding.jpg",
          caption: "Meisterstück Conoduo freestanding cube with monolithic enamelled steel apron."
        },
        {
          label: "Concealed Sound Wave Resonance Transducers",
          url: "/assets/kaldewei/kw-soundwave-acoustic.jpg",
          caption: "Acoustic exciter transducer array mounted to exterior steel wall transforming the tub into an audio diaphragm."
        },
        {
          label: "Acoustic Sub-Floor Decoupling Frame",
          url: "/assets/kaldewei/kw-subfloor-installation.jpg",
          caption: "Heavy-duty sound-decoupled leveling frame with integrated waste rough-in connection."
        }
      ],
      accentColor: "#EAE7DF"
    },
    {
      id: "superplan-zero-miena",
      name: "Superplan Zero & Miena Suite",
      germanTitle: "Superplan Zero Duschfläche & Miena Waschschale",
      designer: "Werner Aisslinger",
      category: "Zero-Threshold Shower & Basin Suite",
      sku: "KW-SPZ-MNA-SET",
      basePrice: 4620,
      capacityLiters: 0,
      netWeightKg: 60,
      dimensionsMm: { length: 1400, width: 900, depth: 32 },
      material: "3.5mm Glazed Titanium-Steel (Molecular Enamel Fusion)",
      warrantyYears: 30,
      floorContactM2: 1.26,
      description: "Zero-threshold floor-level shower surface with wall-adjacent linear drain, paired with ultra-thin Miena glazed steel washbasin. Designed with microscopic corner radii for direct flush tile integration.",
      images: [
        {
          label: "Zero-Threshold Flush Shower Plane",
          url: "/assets/kaldewei/kw-superplan-zero.jpg",
          caption: "Superplan Zero floor-level steel shower surface installed flush to natural stone floor slabs."
        },
        {
          label: "Miena Ultra-Thin Glazed Steel Basin",
          url: "/assets/kaldewei/kw-washbasin-miena.jpg",
          caption: "Miena washbasin bowl demonstrating thin-edge steel enamel forming precision."
        },
        {
          label: "Architectural Penthouse Suite Integration",
          url: "/assets/kaldewei/kw-architectural-bathroom.jpg",
          caption: "Complete Kaldewei sanitaryware suite installed in floor-to-ceiling glass pavilion."
        }
      ],
      accentColor: "#E2DDD3"
    }
  ];

  // Projectiles for DIN ISO 4532 Drop-Impact Test
  const projectiles: ProjectileType[] = [
    {
      id: "steel-ball",
      name: "200g Hardened Steel Ball",
      massKg: 0.20,
      standard: "DIN ISO 4532 Standard Impact Ball",
      description: "Standard industrial ball test for porcelain and vitreous glazed coatings."
    },
    {
      id: "crystal-flask",
      name: "500g Crystal Glass Flacon",
      massKg: 0.50,
      standard: "Domestic High-Density Heavy Perfume Bottle",
      description: "Dense leaded crystal dropped edge-first from vanity ledge."
    },
    {
      id: "brass-wand",
      name: "1.2kg Solid Brass Shower Wand",
      massKg: 1.20,
      standard: "Architectural Hand Shower Fitting",
      description: "Uncontrolled slip from wet hand during shower operation."
    }
  ];

  // Commercial & Architectural Project Tiers
  const projectTiers: ProjectTier[] = [
    {
      id: "villa",
      name: "Private Residential Estate",
      scale: "1 to 3 Master Bathrooms",
      discountRate: 0.0,
      description: "Direct atelier allocation with factory individual crate delivery."
    },
    {
      id: "multi-residence",
      name: "Luxury Multi-Unit Penthouse",
      scale: "4 to 12 Luxury Units",
      discountRate: 0.12,
      description: "Architectural project batch pricing with phased site drop deliveries."
    },
    {
      id: "alpine-hotel",
      name: "5★ Alpine Resort & Spa",
      scale: "15+ Hospitality Suites",
      discountRate: 0.22,
      description: "Direct Werk I Ahlen production scheduling and customized CAD/BIM support."
    }
  ];

  // Core State
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Drop-Impact Simulator State
  const [selectedProjectileId, setSelectedProjectileId] = useState("steel-ball");
  const [dropHeightM, setDropHeightM] = useState(1.5);
  const [testSurface, setTestSurface] = useState<"kaldewei" | "acrylic">("kaldewei");
  const [isImpactRunning, setIsImpactRunning] = useState(false);
  const [impactResult, setImpactResult] = useState<{
    energyJ: number;
    velocityMs: number;
    peakStressMpa: number;
    damageRating: string;
    fractureStatus: string;
  } | null>(null);

  // Acoustic Decibel Dampener State
  const [waterFlowRateLpm, setWaterFlowRateLpm] = useState(18);
  const [isAcousticDamped, setIsAcousticDamped] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioNodeRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  // Specification Drawer & Escrow State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState("Alpine White (Vitreous Gloss)");
  const [securePlusAddon, setSecurePlusAddon] = useState(true);
  const [easyCleanAddon, setEasyCleanAddon] = useState(true);
  const [soundWaveAddon, setSoundWaveAddon] = useState(true);
  const [decouplingKitAddon, setDecouplingKitAddon] = useState(true);
  const [selectedProjectTierId, setSelectedProjectTierId] = useState("villa");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmationSerial, setConfirmationSerial] = useState("");

  // CAD/BIM Download Modal State
  const [isBimModalOpen, setIsBimModalOpen] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadComplete, setDownloadComplete] = useState<string | null>(null);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const activeProduct = products[selectedProductIndex];
  const activeProjectile = projectiles.find(p => p.id === selectedProjectileId) || projectiles[0];
  const activeTier = projectTiers.find(t => t.id === selectedProjectTierId) || projectTiers[0];

  // Physics Calculations
  const gravity = 9.81;
  const impactVelocity = Math.sqrt(2 * gravity * dropHeightM);
  const kineticEnergy = activeProjectile.massKg * gravity * dropHeightM;
  // Steel enamel elasticity modulus 210 GPa vs Acrylic 3.2 GPa
  const peakStressKaldewei = (kineticEnergy * 14.5).toFixed(1);
  const peakStressAcrylic = (kineticEnergy * 58.2).toFixed(1);

  // Acoustic Calculations (DIN 4109 & SIA 181 standards)
  // Uninsulated water impact: 36dB to 46dB. Kaldewei damped: 12dB to 17dB.
  const flowFactor = (waterFlowRateLpm - 8) / (32 - 8);
  const uninsulatedDb = Math.round(36 + flowFactor * 10);
  const dampedDb = Math.round(12 + flowFactor * 5);
  const currentDb = isAcousticDamped ? dampedDb : uninsulatedDb;

  // Pricing calculations with add-ons and project discount
  const baseCost = activeProduct.basePrice;
  const securePlusCost = securePlusAddon ? 280 : 0;
  const easyCleanCost = easyCleanAddon ? 190 : 0;
  const soundWaveCost = soundWaveAddon ? 1450 : 0;
  const decouplingKitCost = decouplingKitAddon ? 420 : 0;
  const subtotal = baseCost + securePlusCost + easyCleanCost + soundWaveCost + decouplingKitCost;
  const discountAmount = subtotal * activeTier.discountRate;
  const finalPrice = Math.round(subtotal - discountAmount);
  const escrowDepositAmount = 2500;

  // Web Audio Synthesizer for Water & Hull Resonance
  useEffect(() => {
    if (!isAudioActive) {
      if (audioNodeRef.current) {
        audioNodeRef.current.gain.gain.setValueAtTime(0, audioCtxRef.current?.currentTime || 0);
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (!audioNodeRef.current) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(isAcousticDamped ? 72 : 184, ctx.currentTime);
        gain.gain.setValueAtTime(isAcousticDamped ? 0.04 : 0.22, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        audioNodeRef.current = { osc, gain };
      } else {
        const { osc, gain } = audioNodeRef.current;
        osc.frequency.setTargetAtTime(isAcousticDamped ? 68 : 192, ctx.currentTime, 0.1);
        gain.gain.setTargetAtTime(isAcousticDamped ? 0.03 : 0.20, ctx.currentTime, 0.1);
      }
    } catch {
      // AudioContext policy fallback
    }

    return () => {
      if (audioNodeRef.current) {
        audioNodeRef.current.gain.gain.setValueAtTime(0, audioCtxRef.current?.currentTime || 0);
      }
    };
  }, [isAudioActive, isAcousticDamped, waterFlowRateLpm]);

  // Drop-Impact Canvas Animation Engine (60 FPS)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ballY = 40;
    let ballSpeed = 0;
    const surfaceY = 220;
    let impactTime = 0;
    let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    let rippleRadius = 0;
    let isFalling = true;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid & Technical Ruler
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Height Reference Line
      ctx.strokeStyle = "rgba(197, 160, 89, 0.3)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(40, 40);
      ctx.lineTo(canvas.width - 40, 40);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#C5A059";
      ctx.font = "10px monospace";
      ctx.fillText(`DROP DATUM // H = ${dropHeightM.toFixed(1)}m`, 45, 34);

      // Material Target Substrate Layer
      const isKaldewei = testSurface === "kaldewei";
      ctx.fillStyle = isKaldewei ? "#1E222A" : "#1A1B1F";
      ctx.fillRect(40, surfaceY, canvas.width - 80, 45);

      // Enamel or Acrylic Surface Cap
      ctx.fillStyle = isKaldewei ? "#EAE6DF" : "#565D68";
      ctx.fillRect(40, surfaceY, canvas.width - 80, isKaldewei ? 8 : 12);

      // Substrate Label
      ctx.fillStyle = isKaldewei ? "#C5A059" : "#8A909A";
      ctx.font = "11px monospace";
      ctx.fillText(
        isKaldewei ? "KALDEWEI 3.5mm GLAZED TITANIUM-STEEL (MOHS 7 HARDNESS)" : "CONVENTIONAL 4.0mm SANITARY ACRYLIC (MOHS 3)",
        45,
        surfaceY + 32
      );

      // Ball Physics
      if (isFalling) {
        ballSpeed += 0.45;
        ballY += ballSpeed;

        if (ballY >= surfaceY - 14) {
          ballY = surfaceY - 14;
          isFalling = false;
          impactTime = 1;

          // Spawn Shockwave & Particles
          rippleRadius = 4;
          const particleCount = isKaldewei ? 12 : 28;
          for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI + Math.PI;
            const speed = Math.random() * 4 + 1.5;
            particles.push({
              x: canvas.width / 2,
              y: surfaceY - 4,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 1.0,
              color: isKaldewei ? "#C5A059" : "#E65050"
            });
          }

          // Register Result
          setImpactResult({
            energyJ: Number(kineticEnergy.toFixed(2)),
            velocityMs: Number(impactVelocity.toFixed(2)),
            peakStressMpa: Number(isKaldewei ? peakStressKaldewei : peakStressAcrylic),
            damageRating: isKaldewei ? "0.00% Zero Surface Fracture" : "Severe Spiderweb Stress Fracture",
            fractureStatus: isKaldewei ? "PASS // DIN ISO 4532 PERFECT INTEGRITY" : "FAIL // PERMANENT RESIN CAVITATION"
          });
          setIsImpactRunning(false);
        }
      }

      // Draw Shockwave Ripples
      if (impactTime > 0) {
        impactTime++;
        rippleRadius += 3.2;
        ctx.strokeStyle = isKaldewei 
          ? `rgba(197, 160, 89, ${Math.max(0, 1 - rippleRadius / 140)})` 
          : `rgba(230, 80, 80, ${Math.max(0, 1 - rippleRadius / 140)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, surfaceY, rippleRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary ripple
        if (rippleRadius > 25) {
          ctx.beginPath();
          ctx.arc(canvas.width / 2, surfaceY, rippleRadius - 20, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw Surface Damage Representation if Acrylic
        if (!isKaldewei) {
          ctx.strokeStyle = "#E65050";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          // Spiderweb crack paths
          ctx.moveTo(canvas.width / 2, surfaceY);
          ctx.lineTo(canvas.width / 2 - 25, surfaceY + 6);
          ctx.moveTo(canvas.width / 2, surfaceY);
          ctx.lineTo(canvas.width / 2 + 30, surfaceY + 8);
          ctx.moveTo(canvas.width / 2, surfaceY);
          ctx.lineTo(canvas.width / 2 - 12, surfaceY - 4);
          ctx.moveTo(canvas.width / 2, surfaceY);
          ctx.lineTo(canvas.width / 2 + 18, surfaceY - 5);
          ctx.stroke();

          ctx.fillStyle = "#E65050";
          ctx.font = "9px monospace";
          ctx.fillText("CRACK DEPTH: 1.2mm", canvas.width / 2 + 35, surfaceY + 16);
        } else {
          // Clean deflection marker on Kaldewei
          ctx.fillStyle = "#54B86A";
          ctx.font = "9px monospace";
          ctx.fillText("ELASTIC DEFLECTION: 0.00mm // ZERO CHIP", canvas.width / 2 + 25, surfaceY - 8);
        }
      }

      // Update & Draw Particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // particle gravity
        p.life -= 0.025;
        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else {
          particles.splice(idx, 1);
        }
      });

      // Draw Falling Projectile
      const projX = canvas.width / 2;
      ctx.fillStyle = "#D4CDC3";
      ctx.strokeStyle = "#C5A059";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const radius = activeProjectile.massKg > 1 ? 16 : activeProjectile.massKg > 0.4 ? 12 : 9;
      ctx.arc(projX, ballY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Projectile specular gleam
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(projX - radius * 0.3, ballY - radius * 0.3, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dropHeightM, activeProjectile, testSurface, kineticEnergy, impactVelocity, peakStressKaldewei, peakStressAcrylic]);

  const triggerImpactTest = () => {
    setIsImpactRunning(true);
    setImpactResult(null);
    // Restart animation from top
    const canvas = canvasRef.current;
    if (canvas) {
      // Re-trigger via state change
      setDropHeightM(prev => prev);
    }
  };

  const handleBimDownload = (format: string) => {
    setDownloadingFormat(format);
    setTimeout(() => {
      setDownloadingFormat(null);
      setDownloadComplete(format);
      setTimeout(() => setDownloadComplete(null), 3000);
    }, 1200);
  };

  const handleConfirmReservation = () => {
    const serial = `KW-${new Date().getFullYear()}-AH-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationSerial(serial);
    setOrderConfirmed(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C5A059", "#FFFFFF", "#3A404D"]
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EAE6DF] font-sans antialiased selection:bg-[#C5A059] selection:text-[#0A0B0D]">
      
      {/* Swiss Architectural Top Bar & Navigation */}
      <header className="sticky top-0 z-40 bg-[#0A0B0D]/95 backdrop-blur-md border-b border-[#1E2128]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8C9099] hover:text-[#FFFFFF] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              PORTFOLIO RADAR
            </Link>
            <div className="h-4 w-px bg-[#1E2128] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#C5A059] uppercase tracking-wider font-semibold">
                [TARGET 20 // HYPER-CRAFT SANDBOX]
              </span>
              <span className="text-xs text-[#707684] hidden md:inline font-mono">
                KALDEWEI // AHLEN, GERMANY (EST. 1918)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#drop-impact-test"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#B2B7C2] hover:text-[#FFFFFF] transition-colors"
            >
              <HardHat className="w-3.5 h-3.5 text-[#C5A059]" />
              ENAMEL IMPACT TEST
            </a>
            <a 
              href="#acoustic-decibel-dampener"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-[#B2B7C2] hover:text-[#FFFFFF] transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
              ACOUSTIC DAMPENER
            </a>
            <button
              onClick={() => setIsBimModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#14161C] hover:bg-[#1D2028] border border-[#272B36] text-xs font-mono text-[#EAE6DF] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              CAD / BIM PACKET
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D4AF67] text-[#0A0B0D] text-xs font-mono font-bold tracking-wider transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>SPECIFICATION VAULT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Architectural Showcase Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">

        {/* Section 01: Hero Swiss Grid & Diagnostic Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#1E2128] pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#14161C] border border-[#272B36] text-[11px] font-mono tracking-wider text-[#C5A059]">
              <Shield className="w-3 h-3" />
              SWISS AESTHETIC UNIVERSE // MONOLITHIC ARCHITECTURAL SANITARYWARE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FFFFFF] leading-tight">
              Kaldewei Glazed Titanium-Steel: Eliminating Impact Hesitation &amp; Acoustic Ambiguity
            </h1>
            <p className="text-sm md:text-base text-[#9A9EA8] leading-relaxed max-w-3xl">
              Architects and luxury developers evaluating €4,000 to €25,000+ sanitary fixtures face structural specification delays: skepticism over porcelain chipping risks under dropped heavy cosmetics, acoustic transmission through multi-story building slabs (DIN 4109 / SIA 181 standards), and non-standard floor-load limits. This sandbox delivers verified physical proof.
            </p>
          </div>

          {/* Quick Metric Telemetry Box */}
          <div className="lg:col-span-4 bg-[#111318] border border-[#1E2128] p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#1E2128] pb-3">
              <span className="text-[#707684]">MANUFACTURE LOCATION</span>
              <span className="text-[#FFFFFF]">Werk I, Ahlen (Germany)</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1E2128] pb-3">
              <span className="text-[#707684]">SUBSTRATE DENSITY</span>
              <span className="text-[#C5A059]">3.5mm Titanium Steel</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1E2128] pb-3">
              <span className="text-[#707684]">SURFACE HARDNESS</span>
              <span className="text-[#FFFFFF]">Mohs Scale 7 (Anti-Scratch)</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1E2128] pb-3">
              <span className="text-[#707684]">FACTORY WARRANTY</span>
              <span className="text-[#C5A059] font-bold">30-Year DIN EN 14516 Guarantee</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#707684]">CIRCULAR RECYCLABILITY</span>
              <span className="text-[#54B86A] font-bold">100% Steel &amp; Glass (0% Resin)</span>
            </div>
          </div>
        </section>

        {/* Section 02: Flagship Product Selector & High-Resolution Optical Gallery */}
        <section id="gallery" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#C5A059] tracking-widest uppercase">
                [ARCHITECTURAL CATALOGUE // 3 MONOLITHIC SUITES]
              </span>
              <h2 className="text-2xl font-light tracking-tight text-[#FFFFFF] mt-1">
                Monolithic Enamelled Masterpieces
              </h2>
            </div>

            {/* Model Tab Controls */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProductIndex(index);
                    setSelectedImageIndex(0);
                  }}
                  className={`px-4 py-2 border transition-all ${
                    selectedProductIndex === index
                      ? "bg-[#C5A059] text-[#0A0B0D] border-[#C5A059] font-bold"
                      : "bg-[#111318] text-[#8C9099] border-[#1E2128] hover:border-[#3A404D] hover:text-[#FFFFFF]"
                  }`}
                >
                  0{index + 1} // {product.name.replace("Meisterstück ", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Active Product Staging Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Main Optical Stage */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] bg-[#111318] border border-[#1E2128] overflow-hidden group">
                <img
                  src={activeProduct.images[selectedImageIndex].url}
                  alt={activeProduct.images[selectedImageIndex].label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                
                {/* HUD Overlay Badge */}
                <div className="absolute top-4 left-4 bg-[#0A0B0D]/90 backdrop-blur-sm border border-[#272B36] px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                  <span className="text-[11px] font-mono text-[#EAE6DF] tracking-wide uppercase">
                    {activeProduct.images[selectedImageIndex].label}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#0A0B0D]/90 backdrop-blur-sm border border-[#272B36] px-3 py-1.5">
                  <span className="text-[11px] font-mono text-[#707684]">
                    ASSET 0{selectedImageIndex + 1} OF 0{activeProduct.images.length} // LOCAL VERIFIED
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-4">
                {activeProduct.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[16/10] bg-[#111318] border overflow-hidden text-left transition-all ${
                      selectedImageIndex === idx 
                        ? "border-[#C5A059] ring-1 ring-[#C5A059]" 
                        : "border-[#1E2128] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={image.label} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[#0A0B0D]/90 p-1.5">
                      <p className="text-[10px] font-mono text-[#EAE6DF] truncate">
                        0{idx + 1}. {image.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Technical Specification Dossier */}
            <div className="lg:col-span-4 bg-[#111318] border border-[#1E2128] p-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#C5A059] tracking-wider uppercase">
                  {activeProduct.category}
                </span>
                <h3 className="text-2xl font-light text-[#FFFFFF] mt-1">
                  {activeProduct.name}
                </h3>
                <p className="text-xs font-mono text-[#707684] mt-0.5">
                  {activeProduct.germanTitle}
                </p>
                <p className="text-xs text-[#9A9EA8] mt-3 leading-relaxed">
                  {activeProduct.description}
                </p>
              </div>

              {/* Specification Grid */}
              <div className="space-y-3 border-t border-b border-[#1E2128] py-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#707684]">DESIGN PARTNER</span>
                  <span className="text-[#FFFFFF]">{activeProduct.designer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">DIMENSIONS</span>
                  <span className="text-[#FFFFFF]">
                    {activeProduct.dimensionsMm.length} × {activeProduct.dimensionsMm.width} × {activeProduct.dimensionsMm.depth} mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">WATER CAPACITY</span>
                  <span className="text-[#FFFFFF]">
                    {activeProduct.capacityLiters > 0 ? `${activeProduct.capacityLiters} Liters` : "Continuous Direct Drain"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">NET MASS TARE</span>
                  <span className="text-[#FFFFFF]">{activeProduct.netWeightKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">SUBSTRATE SPEC</span>
                  <span className="text-[#C5A059]">3.5mm Glazed Titanium Steel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">FACTORY SKU</span>
                  <span className="text-[#FFFFFF]">{activeProduct.sku}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-xs text-[#707684]">FACTORY BASE MSRP</span>
                  <span className="text-2xl text-[#FFFFFF] font-light">
                    €{activeProduct.basePrice.toLocaleString("de-DE")}
                  </span>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF67] text-[#0A0B0D] text-xs font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  SPECIFY &amp; CONFIGURE SUITE
                </button>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => setIsBimModalOpen(true)}
                    className="text-[11px] font-mono text-[#8C9099] hover:text-[#C5A059] underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download BIM / CAD Specification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: 30-Year Steel Enamel Drop-Impact Resistance Test Simulator (Live 60 FPS HTML5 Canvas) */}
        <section id="drop-impact-test" className="bg-[#111318] border border-[#1E2128] p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2128] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">
                <HardHat className="w-3.5 h-3.5" />
                [DIN ISO 4532 MECHANICAL PHYSICS SIMULATOR]
              </div>
              <h2 className="text-2xl font-light text-[#FFFFFF]">
                30-Year Steel Enamel Drop-Impact Resistance Simulator
              </h2>
              <p className="text-xs text-[#9A9EA8] mt-1 max-w-2xl">
                Simulate kinetic shockwave absorption and micro-fracture diagnostics under standardized DIN ISO 4532 ball drops. Compare Kaldewei 3.5mm Glazed Titanium-Steel against commercial sanitary acrylic.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={triggerImpactTest}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4AF67] text-[#0A0B0D] text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                TRIGGER DROP TEST
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Canvas Physics Viewport */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative bg-[#0A0B0D] border border-[#1E2128] p-2 overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  width={640} 
                  height={280} 
                  className="w-full h-auto block"
                />

                {/* HUD Coordinate Stamp */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-[#707684] space-y-0.5">
                  <p>GRAV_ACCEL: 9.81 m/s²</p>
                  <p>IMPACT_VEL: {impactVelocity.toFixed(2)} m/s</p>
                  <p>KINETIC_E: {kineticEnergy.toFixed(2)} Joules</p>
                </div>

                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#C5A059]">
                  60 FPS LIVE RIGID-BODY SIMULATION
                </div>
              </div>

              {/* Projectile & Height Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Projectile Selector */}
                <div className="space-y-2 bg-[#14161C] border border-[#1E2128] p-4">
                  <label className="text-xs font-mono text-[#707684] flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-[#C5A059]" />
                    SELECT IMPACT OBJECT:
                  </label>
                  <div className="space-y-1.5">
                    {projectiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProjectileId(p.id)}
                        className={`w-full p-2 text-left border text-xs font-mono transition-all ${
                          selectedProjectileId === p.id
                            ? "bg-[#1E2128] border-[#C5A059] text-[#FFFFFF]"
                            : "bg-[#0E0F12] border-[#1E2128] text-[#8C9099] hover:border-[#3A404D]"
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="font-semibold">{p.name}</span>
                          <span className="text-[#C5A059]">{p.massKg} kg</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Height Slider & Surface Toggle */}
                <div className="space-y-4 bg-[#14161C] border border-[#1E2128] p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#707684]">DROP HEIGHT:</span>
                      <span className="text-[#FFFFFF] font-bold">{dropHeightM.toFixed(1)} Meters</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={dropHeightM}
                      onChange={(e) => setDropHeightM(Number(e.target.value))}
                      className="w-full accent-[#C5A059] bg-[#1E2128] h-1.5 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#5A5F6B]">
                      <span>0.5m (Ledge)</span>
                      <span>1.5m (Chest)</span>
                      <span>2.5m (Overhead)</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#1E2128]">
                    <span className="text-xs font-mono text-[#707684]">TEST SUBSTRATE MATERIAL:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <button
                        onClick={() => setTestSurface("kaldewei")}
                        className={`p-2 text-center border font-semibold transition-all ${
                          testSurface === "kaldewei"
                            ? "bg-[#C5A059] text-[#0A0B0D] border-[#C5A059]"
                            : "bg-[#0E0F12] text-[#8C9099] border-[#1E2128] hover:text-[#FFFFFF]"
                        }`}
                      >
                        KALDEWEI STEEL
                      </button>
                      <button
                        onClick={() => setTestSurface("acrylic")}
                        className={`p-2 text-center border font-semibold transition-all ${
                          testSurface === "acrylic"
                            ? "bg-[#E65050] text-[#FFFFFF] border-[#E65050]"
                            : "bg-[#0E0F12] text-[#8C9099] border-[#1E2128] hover:text-[#FFFFFF]"
                        }`}
                      >
                        SANITARY ACRYLIC
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Diagnostic Readout & Comparative Verification HUD */}
            <div className="lg:col-span-5 bg-[#14161C] border border-[#1E2128] p-6 space-y-6 font-mono text-xs">
              <div>
                <span className="text-[#707684] uppercase tracking-wider text-[11px]">
                  DYNAMIC MECHANICAL STRESS READOUT
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl text-[#FFFFFF] font-light">
                    {testSurface === "kaldewei" ? peakStressKaldewei : peakStressAcrylic}
                  </span>
                  <span className="text-sm text-[#707684]">MPa Peak Substrate Stress</span>
                </div>
                <p className="text-[11px] text-[#5A5F6B] mt-1">
                  Tested against DIN ISO 4532 continuous porcelain enamel impact verification
                </p>
              </div>

              {/* Impact Verdict Box */}
              <div className={`p-4 border ${
                testSurface === "kaldewei"
                  ? "bg-[#142319] border-[#54B86A] text-[#54B86A]"
                  : "bg-[#2A1616] border-[#E65050] text-[#E65050]"
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs">
                  {testSurface === "kaldewei" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  <span>
                    {testSurface === "kaldewei" ? "ZERO STRUCTURAL DEFECT // PASS" : "IRREVERSIBLE MATRIX FAILURE // CRACK"}
                  </span>
                </div>
                <p className="text-[11px] text-[#D8D2C5] mt-2 leading-relaxed">
                  {testSurface === "kaldewei"
                    ? "Vitreous glass glaze fused at 850°C to 3.5mm titanium steel dissipates the kinetic wave through molecular shear bonding. Zero surface cracking, zero delamination, zero chipping."
                    : "Polymer resin core suffers localized yield point breach. Micro-fissures penetrate the acrylic gel coat, creating permanent gouges, discoloration, and bacterial entrapment crevices."}
                </p>
              </div>

              {/* Comparative Hardness Spec Table */}
              <div className="space-y-2 border-t border-[#1E2128] pt-4">
                <div className="flex justify-between">
                  <span className="text-[#707684]">SURFACE HARDNESS:</span>
                  <span className={testSurface === "kaldewei" ? "text-[#C5A059] font-bold" : "text-[#707684]"}>
                    Mohs 7 (Steel Enamel) vs Mohs 3 (Acrylic)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">HEAT TOLERANCE:</span>
                  <span className="text-[#FFFFFF]">Up to 400°C (Fireproof // DIN EN 13501)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">CHEMICAL STABILITY:</span>
                  <span className="text-[#FFFFFF]">100% Resistant to Acetone, Dyes, Solvents</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">CLEANING EFFORT:</span>
                  <span className="text-[#54B86A]">Easy-Clean Lotus Effect Repels Limescale</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 04: Acoustic Installation Insulation Decibel Dampener (Interactive DIN 4109 / SIA 181 Simulator) */}
        <section id="acoustic-decibel-dampener" className="bg-[#111318] border border-[#1E2128] p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2128] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">
                <Volume2 className="w-3.5 h-3.5" />
                [ACOUSTIC INSULATION &amp; TRANSMISSION ENGINE]
              </div>
              <h2 className="text-2xl font-light text-[#FFFFFF]">
                Acoustic Installation Decibel Dampener (DIN 4109 &amp; SIA 181)
              </h2>
              <p className="text-xs text-[#9A9EA8] mt-1 max-w-2xl">
                Measure water impact acoustic emissions and slab transmission into adjacent residential suites. Verify how Kaldewei sound-absorbing pads and BWS perimeter decoupling exceed Swiss SIA 181 acoustic insulation regulations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAudioActive(!isAudioActive)}
                className={`px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 border transition-all ${
                  isAudioActive
                    ? "bg-[#C5A059] text-[#0A0B0D] border-[#C5A059] font-bold"
                    : "bg-[#14161C] text-[#8C9099] border-[#1E2128] hover:text-[#FFFFFF]"
                }`}
              >
                {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isAudioActive ? "AUDIO SYNTHESIZER: ACTIVE" : "ACTIVATE AUDIO SIMULATION"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Controls & Sound Meter Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Flow Rate Slider */}
              <div className="bg-[#14161C] border border-[#1E2128] p-5 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#707684] flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[#0070F3]" />
                    BATH FILLING DELUGE FLOW RATE:
                  </span>
                  <span className="text-[#FFFFFF] font-bold">{waterFlowRateLpm} Liters / Minute</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={waterFlowRateLpm}
                  onChange={(e) => setWaterFlowRateLpm(Number(e.target.value))}
                  className="w-full accent-[#0070F3] bg-[#1E2128] h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#5A5F6B]">
                  <span>8 L/min (Gentle Spout)</span>
                  <span>18 L/min (Standard Mixer)</span>
                  <span>32 L/min (High-Flow Waterfall)</span>
                </div>
              </div>

              {/* Acoustic Decoupling System Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setIsAcousticDamped(true)}
                  className={`p-4 text-left border transition-all ${
                    isAcousticDamped
                      ? "bg-[#161C24] border-[#0070F3] ring-1 ring-[#0070F3]"
                      : "bg-[#14161C] border-[#1E2128] hover:border-[#3A404D]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#FFFFFF]">KALDEWEI DAMPED SYSTEM</span>
                    <span className="text-xs font-mono text-[#0070F3] font-bold">&lt;17 dB</span>
                  </div>
                  <p className="text-[11px] text-[#9A9EA8] mt-2 leading-relaxed">
                    Heavy elastomer pads bonded to reverse of steel shell, rubber leveling feet, and BWS acoustic wall-sealing tape.
                  </p>
                </button>

                <button
                  onClick={() => setIsAcousticDamped(false)}
                  className={`p-4 text-left border transition-all ${
                    !isAcousticDamped
                      ? "bg-[#251A1A] border-[#E65050] ring-1 ring-[#E65050]"
                      : "bg-[#14161C] border-[#1E2128] hover:border-[#3A404D]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#FFFFFF]">UNINSULATED INSTALLATION</span>
                    <span className="text-xs font-mono text-[#E65050] font-bold">~44 dB</span>
                  </div>
                  <p className="text-[11px] text-[#9A9EA8] mt-2 leading-relaxed">
                    Rigid metal feet resting directly on cement screed. Water cascades resonate through structural floor slab into lower floors.
                  </p>
                </button>
              </div>

            </div>

            {/* Decibel Meter & Compliance Readout HUD */}
            <div className="lg:col-span-5 bg-[#14161C] border border-[#1E2128] p-6 space-y-6 font-mono text-xs">
              <div>
                <span className="text-[#707684] uppercase tracking-wider text-[11px]">
                  TRANSMITTED ACOUSTIC LEVEL (ADJACENT SUITE)
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className={`text-4xl font-light ${isAcousticDamped ? "text-[#54B86A]" : "text-[#E65050]"}`}>
                    {currentDb}
                  </span>
                  <span className="text-sm text-[#707684]">dB(A) Sound Pressure</span>
                </div>
                <p className="text-[11px] text-[#5A5F6B] mt-1">
                  Threshold: DIN 4109 requires &lt;30 dB(A) // Swiss SIA 181 recommends &lt;25 dB(A)
                </p>
              </div>

              {/* Linear Visual Sound Level Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#707684]">SOUND LEVEL METER:</span>
                  <span className={isAcousticDamped ? "text-[#54B86A]" : "text-[#E65050]"}>
                    {isAcousticDamped ? "WHISPER COMPLIANT" : "STRUCTURAL ROAR (NON-COMPLIANT)"}
                  </span>
                </div>
                <div className="w-full bg-[#1A1C22] h-2.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isAcousticDamped ? "bg-[#54B86A]" : "bg-[#E65050]"
                    }`}
                    style={{ width: `${Math.min(100, (currentDb / 50) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#5A5F6B]">
                  <span>0 dB (Silence)</span>
                  <span>20 dB (Rustling Leaves)</span>
                  <span>30 dB (DIN Limit)</span>
                  <span>50 dB (Conversation)</span>
                </div>
              </div>

              {/* Standard Compliance Checkbox List */}
              <div className="space-y-2 border-t border-[#1E2128] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#707684]">GERMAN DIN 4109 ACOUSTIC NORM:</span>
                  <span className={isAcousticDamped ? "text-[#54B86A] font-bold" : "text-[#E65050] font-bold"}>
                    {isAcousticDamped ? "PASS (<30 dB)" : "VIOLATION (>30 dB)"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707684]">SWISS SIA 181 SOUNDPROOF STANDARD:</span>
                  <span className={isAcousticDamped ? "text-[#54B86A] font-bold" : "text-[#E65050] font-bold"}>
                    {isAcousticDamped ? "EXCEEDED (<25 dB)" : "FAILED"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707684]">VDI 4100 SOUND PROTECTION LEVEL III:</span>
                  <span className={isAcousticDamped ? "text-[#54B86A] font-bold" : "text-[#E65050] font-bold"}>
                    {isAcousticDamped ? "CERTIFIED" : "NON-CONFORMING"}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Section 05: Architectural CAD/BIM File Portal */}
        <section className="bg-[#111318] border border-[#1E2128] p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2128] pb-6">
            <div>
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider">
                [PROJECT SPECIFICATION ASSET PORTAL]
              </span>
              <h2 className="text-2xl font-light text-[#FFFFFF] mt-1">
                Architectural CAD &amp; BIM Asset Library
              </h2>
              <p className="text-xs text-[#9A9EA8] mt-1">
                Instant vector drawing packages, 3D parametric Revit families (LOD 400), and tender text templates for architectural practice documentation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            
            {/* DWG 2D Package */}
            <div className="bg-[#14161C] border border-[#1E2128] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFFFFF]">2D CAD PACKET (.DWG)</span>
                <span className="text-[10px] text-[#C5A059]">AutoCAD 2024</span>
              </div>
              <p className="text-[11px] text-[#707684] leading-relaxed">
                Full 1:1 architectural floor plans, longitudinal cross-sections, and millimetric rough-in dimensions.
              </p>
              <button
                onClick={() => handleBimDownload("dwg")}
                className="w-full py-2 bg-[#1E2128] hover:bg-[#272B36] text-[#EAE6DF] border border-[#2B2F38] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {downloadingFormat === "dwg" ? (
                  <span>GENERATING ARCHIVE...</span>
                ) : downloadComplete === "dwg" ? (
                  <span className="text-[#54B86A] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> DWG PACKET READY
                  </span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>DOWNLOAD DWG (8.4 MB)</span>
                  </>
                )}
              </button>
            </div>

            {/* Revit 3D BIM */}
            <div className="bg-[#14161C] border border-[#1E2128] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFFFFF]">REVIT BIM 3D (.RVT)</span>
                <span className="text-[10px] text-[#0070F3]">LOD 400 Parametric</span>
              </div>
              <p className="text-[11px] text-[#707684] leading-relaxed">
                Native parametric Revit families with MEP connector nodes, water supply rough-ins, and thermal properties.
              </p>
              <button
                onClick={() => handleBimDownload("rvt")}
                className="w-full py-2 bg-[#1E2128] hover:bg-[#272B36] text-[#EAE6DF] border border-[#2B2F38] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {downloadingFormat === "rvt" ? (
                  <span>GENERATING ARCHIVE...</span>
                ) : downloadComplete === "rvt" ? (
                  <span className="text-[#54B86A] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> RVT FAMILY READY
                  </span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#0070F3]" />
                    <span>DOWNLOAD RVT (14.2 MB)</span>
                  </>
                )}
              </button>
            </div>

            {/* IFC OpenBIM */}
            <div className="bg-[#14161C] border border-[#1E2128] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFFFFF]">OPEN BIM (.IFC)</span>
                <span className="text-[10px] text-[#54B86A]">IFC4 Certified</span>
              </div>
              <p className="text-[11px] text-[#707684] leading-relaxed">
                Vendor-neutral universal exchange format compatible with ArchiCAD, Vectorworks, and Solibri Model Checker.
              </p>
              <button
                onClick={() => handleBimDownload("ifc")}
                className="w-full py-2 bg-[#1E2128] hover:bg-[#272B36] text-[#EAE6DF] border border-[#2B2F38] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {downloadingFormat === "ifc" ? (
                  <span>GENERATING ARCHIVE...</span>
                ) : downloadComplete === "ifc" ? (
                  <span className="text-[#54B86A] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> IFC READY
                  </span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#54B86A]" />
                    <span>DOWNLOAD IFC (11.0 MB)</span>
                  </>
                )}
              </button>
            </div>

            {/* Tender PDF & Factory Spec */}
            <div className="bg-[#14161C] border border-[#1E2128] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFFFFF]">TENDER SPEC (.PDF)</span>
                <span className="text-[10px] text-[#C5A059]">DIN EN 14516</span>
              </div>
              <p className="text-[11px] text-[#707684] leading-relaxed">
                Comprehensive architectural tender specification text ready for bill-of-quantities insertion.
              </p>
              <button
                onClick={() => handleBimDownload("pdf")}
                className="w-full py-2 bg-[#1E2128] hover:bg-[#272B36] text-[#EAE6DF] border border-[#2B2F38] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {downloadingFormat === "pdf" ? (
                  <span>GENERATING ARCHIVE...</span>
                ) : downloadComplete === "pdf" ? (
                  <span className="text-[#54B86A] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> SPECIFICATION READY
                  </span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>DOWNLOAD PDF (3.8 MB)</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Slide-Out Architectural Specification & Escrow Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0A0B0D]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#111318] border-l border-[#1E2128] p-6 flex flex-col justify-between overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1E2128] pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest">
                      [ARCHITECTURAL COMMISSION SPECIFIER]
                    </span>
                    <h3 className="text-xl font-light text-[#FFFFFF] mt-0.5">
                      Factory Build Specification
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 text-[#707684] hover:text-[#FFFFFF] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {orderConfirmed ? (
                  <div className="py-8 space-y-4 text-center">
                    <div className="w-12 h-12 bg-[#142319] border border-[#54B86A] text-[#54B86A] rounded-full mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-light text-[#FFFFFF]">Specification Confirmed</h4>
                    <p className="text-xs font-mono text-[#9A9EA8] leading-relaxed">
                      Factory production allocation assigned at Werk I in Ahlen, Germany. Digital specification dossier and refundable escrow receipt dispatched.
                    </p>
                    <div className="p-4 bg-[#14161C] border border-[#1E2128] text-xs font-mono text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#707684]">CERTIFICATE ID:</span>
                        <span className="text-[#C5A059] font-bold">{confirmationSerial}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707684]">MODEL:</span>
                        <span className="text-[#FFFFFF]">{activeProduct.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707684]">FINISH:</span>
                        <span className="text-[#FFFFFF]">{selectedFinish}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#707684]">PROJECT TIER:</span>
                        <span className="text-[#C5A059]">{activeTier.name} ({activeTier.discountRate * 100}% Discount)</span>
                      </div>
                      <div className="flex justify-between border-t border-[#1E2128] pt-2">
                        <span className="text-[#707684]">ESCROW DEPOSIT:</span>
                        <span className="text-[#54B86A] font-bold">€{escrowDepositAmount.toLocaleString("de-DE")} (Refundable)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Active Selected Model Snapshot */}
                    <div className="p-4 bg-[#14161C] border border-[#1E2128] space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#C5A059] font-bold">{activeProduct.name}</span>
                        <span className="text-[#FFFFFF]">€{activeProduct.basePrice.toLocaleString("de-DE")}</span>
                      </div>
                      <p className="text-[11px] text-[#707684]">{activeProduct.material}</p>
                    </div>

                    {/* Finish Selector */}
                    <div className="space-y-2 font-mono text-xs">
                      <label className="text-[#707684]">SELECT COATING &amp; COLOR:</label>
                      <select
                        value={selectedFinish}
                        onChange={(e) => setSelectedFinish(e.target.value)}
                        className="w-full p-2.5 bg-[#14161C] border border-[#1E2128] text-[#FFFFFF] focus:outline-none focus:border-[#C5A059]"
                      >
                        <option value="Alpine White (Vitreous Gloss)">Alpine White (Vitreous Gloss)</option>
                        <option value="Lava Black Matte (Coordinated Colours)">Lava Black Matte (Coordinated Colours)</option>
                        <option value="Warm Oyster Matte (Coordinated Colours)">Warm Oyster Matte (Coordinated Colours)</option>
                        <option value="Manhattan Grey Matte (Architectural)">Manhattan Grey Matte (Architectural)</option>
                      </select>
                    </div>

                    {/* Project Scale Selector */}
                    <div className="space-y-2 font-mono text-xs">
                      <label className="text-[#707684]">PROJECT ARCHITECTURAL TIER:</label>
                      <select
                        value={selectedProjectTierId}
                        onChange={(e) => setSelectedProjectTierId(e.target.value)}
                        className="w-full p-2.5 bg-[#14161C] border border-[#1E2128] text-[#FFFFFF] focus:outline-none focus:border-[#C5A059]"
                      >
                        {projectTiers.map(tier => (
                          <option key={tier.id} value={tier.id}>
                            {tier.name} — {tier.discountRate * 100}% Project Discount
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Performance Add-ons */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-[#707684]">ARCHITECTURAL ADD-ONS:</span>

                      {/* Secure Plus */}
                      <label className="flex items-start gap-3 p-3 bg-[#14161C] border border-[#1E2128] cursor-pointer hover:border-[#2E3340] transition-colors">
                        <input
                          type="checkbox"
                          checked={securePlusAddon}
                          onChange={(e) => setSecurePlusAddon(e.target.checked)}
                          className="mt-0.5 accent-[#C5A059]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Secure Plus Anti-Slip Glaze</span>
                            <span className="text-[#C5A059]">+€280</span>
                          </div>
                          <p className="text-[10px] text-[#707684] mt-0.5">
                            Permanent microscopic mineral grain fused directly into enamel surface
                          </p>
                        </div>
                      </label>

                      {/* Easy Clean */}
                      <label className="flex items-start gap-3 p-3 bg-[#14161C] border border-[#1E2128] cursor-pointer hover:border-[#2E3340] transition-colors">
                        <input
                          type="checkbox"
                          checked={easyCleanAddon}
                          onChange={(e) => setEasyCleanAddon(e.target.checked)}
                          className="mt-0.5 accent-[#C5A059]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Easy-Clean Lotus Finish</span>
                            <span className="text-[#C5A059]">+€190</span>
                          </div>
                          <p className="text-[10px] text-[#707684] mt-0.5">
                            Hydrophobic glass seal causing water drops to sheet off without lime deposits
                          </p>
                        </div>
                      </label>

                      {/* Sound Wave */}
                      <label className="flex items-start gap-3 p-3 bg-[#14161C] border border-[#1E2128] cursor-pointer hover:border-[#2E3340] transition-colors">
                        <input
                          type="checkbox"
                          checked={soundWaveAddon}
                          onChange={(e) => setSoundWaveAddon(e.target.checked)}
                          className="mt-0.5 accent-[#C5A059]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Sound Wave Acoustic Transducer System</span>
                            <span className="text-[#C5A059]">+€1,450</span>
                          </div>
                          <p className="text-[10px] text-[#707684] mt-0.5">
                            6 concealed acoustic transducers bonded to reverse of steel shell
                          </p>
                        </div>
                      </label>

                      {/* Decoupling Kit */}
                      <label className="flex items-start gap-3 p-3 bg-[#14161C] border border-[#1E2128] cursor-pointer hover:border-[#2E3340] transition-colors">
                        <input
                          type="checkbox"
                          checked={decouplingKitAddon}
                          onChange={(e) => setDecouplingKitAddon(e.target.checked)}
                          className="mt-0.5 accent-[#C5A059]"
                        />
                        <div className="flex-1 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#FFFFFF]">Acoustic BWS Sub-Floor Decoupling Kit</span>
                            <span className="text-[#C5A059]">+€420</span>
                          </div>
                          <p className="text-[10px] text-[#707684] mt-0.5">
                            Heavy elastomer isolation feet &amp; sealing strip meeting Swiss SIA 181
                          </p>
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer & Escrow Confirmation */}
              <div className="border-t border-[#1E2128] pt-4 space-y-3">
                {!orderConfirmed ? (
                  <>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-[#707684]">
                        <span>BASE VESSEL:</span>
                        <span>€{baseCost.toLocaleString("de-DE")}</span>
                      </div>
                      <div className="flex justify-between text-[#707684]">
                        <span>ADD-ONS:</span>
                        <span>+€{(subtotal - baseCost).toLocaleString("de-DE")}</span>
                      </div>
                      {activeTier.discountRate > 0 && (
                        <div className="flex justify-between text-[#54B86A]">
                          <span>PROJECT DISCOUNT ({activeTier.discountRate * 100}%):</span>
                          <span>-€{Math.round(discountAmount).toLocaleString("de-DE")}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold text-[#FFFFFF] border-t border-[#1E2128] pt-2">
                        <span>TOTAL SPECIFICATION:</span>
                        <span className="text-[#C5A059]">€{finalPrice.toLocaleString("de-DE")}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleConfirmReservation}
                      className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF67] text-[#0A0B0D] text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                    >
                      CONFIRM ARCHITECTURAL ALLOCATION (€{escrowDepositAmount.toLocaleString("de-DE")} ESCROW)
                    </button>

                    <p className="text-[10px] text-center font-mono text-[#5A5F6B]">
                      Protected by 30-year manufacturer warranty &amp; direct factory production SLA
                    </p>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      setIsDrawerOpen(false);
                    }}
                    className="w-full py-3 bg-[#14161C] border border-[#1E2128] hover:bg-[#1D2028] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider"
                  >
                    RETURN TO SHOWCASE
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* BIM Modal */}
      {isBimModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#0A0B0D]/85 backdrop-blur-sm"
            onClick={() => setIsBimModalOpen(false)}
          />
          <div className="relative bg-[#111318] border border-[#1E2128] max-w-lg w-full p-6 space-y-4 font-mono text-xs z-10">
            <div className="flex items-center justify-between border-b border-[#1E2128] pb-3">
              <span className="text-sm font-semibold text-[#FFFFFF]">Direct CAD / BIM Package Access</span>
              <button onClick={() => setIsBimModalOpen(false)} className="text-[#707684] hover:text-[#FFFFFF]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[#9A9EA8] leading-relaxed">
              Kaldewei provides verified 2D/3D geometry packages for Revit, ArchiCAD, AutoCAD, and Vectorworks with DIN 4109 acoustic ratings embedded.
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleBimDownload("dwg")}
                className="w-full py-2.5 px-3 bg-[#14161C] hover:bg-[#1D2028] border border-[#1E2128] text-left flex justify-between items-center"
              >
                <span>AutoCAD 2024 (.DWG) Full Set</span>
                <span className="text-[#C5A059]">8.4 MB</span>
              </button>
              <button
                onClick={() => handleBimDownload("rvt")}
                className="w-full py-2.5 px-3 bg-[#14161C] hover:bg-[#1D2028] border border-[#1E2128] text-left flex justify-between items-center"
              >
                <span>Revit 2024 BIM Family (.RVT) LOD 400</span>
                <span className="text-[#0070F3]">14.2 MB</span>
              </button>
              <button
                onClick={() => handleBimDownload("ifc")}
                className="w-full py-2.5 px-3 bg-[#14161C] hover:bg-[#1D2028] border border-[#1E2128] text-left flex justify-between items-center"
              >
                <span>Universal OpenBIM (.IFC4)</span>
                <span className="text-[#54B86A]">11.0 MB</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Architectural Footer */}
      <footer className="border-t border-[#1E2128] bg-[#07080A] py-8 text-center text-xs font-mono text-[#707684] space-y-2">
        <p>
          BILLY BENJAMIN CONSULTING // SOVEREIGN REVENUE ARCHITECT &amp; DESIGN SYSTEM (v15.0-SINGULARITY)
        </p>
        <p className="text-[11px] text-[#5A5F6B]">
          Target Reconnaissance 20: Franz Kaldewei GmbH &amp; Co. KG (Ahlen, Germany) • Direct Executive Routing: <a href="mailto:billybenjamin836@gmail.com" className="text-[#C5A059] hover:underline">billybenjamin836@gmail.com</a>
        </p>
      </footer>

    </div>
  );
}

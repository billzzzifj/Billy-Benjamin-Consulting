'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Coffee,
  Eye,
  Gauge,
  Layers,
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Volume2,
  VolumeX,
  Watch,
  X,
} from 'lucide-react';

// ============================================================================
// BREW WATCH CO. AUTHENTIC NYC TIMEPIECE & STRAP REGISTRY
// ============================================================================

interface BrewWatch {
  id: string;
  name: string;
  series: 'Metric' | 'Super Metric' | 'Retrograph';
  editionNote: string;
  price: number;
  caseDimsMm: string;
  lugToLugMm: number;
  caseDiameterMm: number;
  thicknessMm: number;
  lugWidthMm: string;
  weightWithSteelG: number;
  caseMaterial: string;
  movement: string;
  dialHex: string;
  accentHex: string;
  highlightHex: string;
  subdialHex: string;
  hasCheckerStripe?: boolean;
  frontImage: string;
  wristImage: string;
  description: string;
}

interface QuickReleaseStrap {
  id: string;
  name: string;
  lugSpec: string;
  material: string;
  price: number;
  weightG: number;
  colorHex: string;
  liningHex: string;
  image: string;
}

const WATCHES: BrewWatch[] = [
  {
    id: 'chrono-taxi',
    name: 'Metric — Chrono Taxi',
    series: 'Metric',
    editionNote: 'Limited Numbered Edition (1,000 Pieces)',
    price: 495,
    caseDimsMm: '36mm × 41.5mm',
    lugToLugMm: 41.5,
    caseDiameterMm: 36,
    thicknessMm: 10.75,
    lugWidthMm: '19.85mm',
    weightWithSteelG: 135,
    caseMaterial: '316L Brushed Stainless Steel',
    movement: 'Hybrid VK68 Meca-Quartz Chronograph',
    dialHex: '#18181A',
    accentHex: '#F2B705',
    highlightHex: '#F2B705',
    subdialHex: '#EDEBE6',
    hasCheckerStripe: true,
    frontImage: '/assets/brewwatch/watch-taxi-front.jpg',
    wristImage: '/assets/brewwatch/watch-taxi-angle.jpg',
    description:
      'Taxi yellow meets matte asphalt black with an unbroken New York checker band running center-dial. Stamped "NEW YORK" at six o’clock inside the 25–35s extraction sector.',
  },
  {
    id: 'metric-retro',
    name: 'Metric — Retro Dial',
    series: 'Metric',
    editionNote: 'Signature Permanent Flagship',
    price: 475,
    caseDimsMm: '36mm × 41.5mm',
    lugToLugMm: 41.5,
    caseDiameterMm: 36,
    thicknessMm: 10.75,
    lugWidthMm: '19.85mm',
    weightWithSteelG: 135,
    caseMaterial: '316L Brushed Stainless Steel',
    movement: 'Hybrid VK68 Meca-Quartz Chronograph',
    dialHex: '#152028',
    accentHex: '#E86128',
    highlightHex: '#F2B705',
    subdialHex: '#EFECE6',
    frontImage: '/assets/brewwatch/watch-retro-front.jpg',
    wristImage: '/assets/brewwatch/watch-retro-wrist.jpg',
    description:
      'Deep petrol blue dial framed by a bright cyan seconds track, taxi-yellow espresso extraction arc between 25 and 35 seconds, and burnt-orange central chronograph sweep.',
  },
  {
    id: 'super-orange',
    name: 'Super Metric — Burnt Orange',
    series: 'Super Metric',
    editionNote: 'Textured Asphalt Dial Series',
    price: 475,
    caseDimsMm: '36mm × 41.5mm',
    lugToLugMm: 41.5,
    caseDiameterMm: 36,
    thicknessMm: 10.75,
    lugWidthMm: '19.85mm',
    weightWithSteelG: 135,
    caseMaterial: '316L Steel w/ Anodized 2H Pusher',
    movement: 'Hybrid VK68 Meca-Quartz Chronograph',
    dialHex: '#1A1A1C',
    accentHex: '#D94E28',
    highlightHex: '#E86128',
    subdialHex: '#F5F3EE',
    frontImage: '/assets/brewwatch/watch-orange-front.jpg',
    wristImage: '/assets/brewwatch/watch-orange-wrist.jpg',
    description:
      'Granular bead-blasted dial with anodized terracotta 2 o’clock start pusher and recessed louvered sub-register ribs celebrating commercial espresso drip grates.',
  },
  {
    id: 'super-cobalt',
    name: 'Super Metric — Electric Blue',
    series: 'Super Metric',
    editionNote: 'Textured Cobalt Edition',
    price: 475,
    caseDimsMm: '36mm × 41.5mm',
    lugToLugMm: 41.5,
    caseDiameterMm: 36,
    thicknessMm: 10.75,
    lugWidthMm: '19.85mm',
    weightWithSteelG: 135,
    caseMaterial: '316L Steel w/ Cobalt 2H Pusher',
    movement: 'Hybrid VK68 Meca-Quartz Chronograph',
    dialHex: '#161B26',
    accentHex: '#2C72E6',
    highlightHex: '#4BA3FF',
    subdialHex: '#F2F4F8',
    frontImage: '/assets/brewwatch/watch-cobalt-front.jpg',
    wristImage: '/assets/brewwatch/watch-cobalt-wrist.jpg',
    description:
      'Contrast cobalt hands over high-relief matte texture with luminous Batons and electric blue anodized push-piece calibrated for 30-second extraction timing.',
  },
  {
    id: 'metric-titanium',
    name: 'Metric — Bead-Blasted Titanium',
    series: 'Metric',
    editionNote: '40% Lighter Grade 2 Titanium',
    price: 495,
    caseDimsMm: '36mm × 41.5mm',
    lugToLugMm: 41.5,
    caseDiameterMm: 36,
    thicknessMm: 10.75,
    lugWidthMm: '19.85mm',
    weightWithSteelG: 84,
    caseMaterial: 'Brushed Grade 2 Titanium',
    movement: 'Hybrid VK68 Meca-Quartz Chronograph',
    dialHex: '#232629',
    accentHex: '#5CA4D6',
    highlightHex: '#F2B705',
    subdialHex: '#DCE1E6',
    frontImage: '/assets/brewwatch/watch-titanium-front.jpg',
    wristImage: '/assets/brewwatch/hero-cobalt-creative.jpg',
    description:
      'Gun-metal titanium chassis weighing 40% less than stainless steel across wrist wear, finished with cool ice-blue markers and a chamfered quick-adjust clasp.',
  },
  {
    id: 'metric-gold',
    name: 'Metric — Gold & Black PVD',
    series: 'Metric',
    editionNote: 'Satin Gold 316L PVD',
    price: 475,
    caseDimsMm: '36mm × 41.5mm',
    lugToLugMm: 41.5,
    caseDiameterMm: 36,
    thicknessMm: 10.75,
    lugWidthMm: '19.85mm',
    weightWithSteelG: 135,
    caseMaterial: 'Gold PVD Brushed Stainless',
    movement: 'Hybrid VK68 Meca-Quartz Chronograph',
    dialHex: '#151412',
    accentHex: '#D4A545',
    highlightHex: '#E8BC5A',
    subdialHex: '#1F1D19',
    frontImage: '/assets/brewwatch/watch-gold-front.jpg',
    wristImage: '/assets/brewwatch/watch-gold-wrist.jpg',
    description:
      'Warm brushed brass PVD case echoing vintage portafilter valves and espresso warming trays, contrasted against a deep pitch-black dial.',
  },
  {
    id: 'digital-blend',
    name: 'Metric — Digital Blend LED',
    series: 'Metric',
    editionNote: 'Analog + Animated Percolating LED',
    price: 425,
    caseDimsMm: '37.5mm × 42.5mm',
    lugToLugMm: 42.5,
    caseDiameterMm: 37.5,
    thicknessMm: 11.2,
    lugWidthMm: '19.85mm',
    weightWithSteelG: 128,
    caseMaterial: '316L Stainless Steel',
    movement: 'Hybrid Analog + 30s LED Countdown',
    dialHex: '#18191B',
    accentHex: '#F25C2A',
    highlightHex: '#18A96B',
    subdialHex: '#23262A',
    frontImage: '/assets/brewwatch/watch-digital-front.jpg',
    wristImage: '/assets/brewwatch/watch-digital-wrist.jpg',
    description:
      'Fuses traditional analog hands with an illuminated 30-second countdown LED array that animates a percolating espresso cup upon trigger activation.',
  },
  {
    id: 'retrograph-espresso',
    name: 'Retrograph — Espresso',
    series: 'Retrograph',
    editionNote: 'Rose Gold & Roasted Umber',
    price: 375,
    caseDimsMm: '38mm × 41.5mm',
    lugToLugMm: 41.5,
    caseDiameterMm: 38,
    thicknessMm: 10.4,
    lugWidthMm: '22.00mm',
    weightWithSteelG: 72,
    caseMaterial: 'Rose Gold PVD + Italian Leather',
    movement: 'VK64 Meca-Quartz Extraction Timer',
    dialHex: '#2A1D17',
    accentHex: '#C98A55',
    highlightHex: '#E0A16A',
    subdialHex: '#F0EAE0',
    frontImage: '/assets/brewwatch/watch-espresso-front.jpg',
    wristImage: '/assets/brewwatch/watch-espresso-wrist.jpg',
    description:
      'Wider 38mm stepped bezel silhouette inspired by copper-grouphead coffee machinery, pairing warm sunray espresso dials with stitched bridle calfskin.',
  },
];

const QUICK_RELEASE_STRAPS: QuickReleaseStrap[] = [
  {
    id: 'steel-bracelet',
    name: 'Integrated 316L Brushed Steel Bracelet',
    lugSpec: '19.85mm Taper',
    material: 'Solid Brushed 316L Links',
    price: 0,
    weightG: 62,
    colorHex: '#A7AAAC',
    liningHex: '#7A7D80',
    image: '/assets/brewwatch/watch-retro-front.jpg',
  },
  {
    id: 'taxi-rally',
    name: 'Chrono Taxi Rally Leather + Yellow Suede',
    lugSpec: '19.50mm Quick-Release',
    material: 'Perforated Calfskin / Taxi Suede',
    price: 55,
    weightG: 16,
    colorHex: '#19191B',
    liningHex: '#F2B705',
    image: '/assets/brewwatch/strap-taxi-rally.jpg',
  },
  {
    id: 'coral-orange',
    name: 'Coral Orange Italian Leather Strap',
    lugSpec: '19.50mm Quick-Release',
    material: 'Full-Grain Smooth Leather',
    price: 55,
    weightG: 16,
    colorHex: '#D95B26',
    liningHex: '#C8A582',
    image: '/assets/brewwatch/strap-coral-orange.jpg',
  },
  {
    id: 'teal-rubber',
    name: 'Bi-Color Teal Vulcanized FKM Rubber',
    lugSpec: '20.00mm Waterproof',
    material: 'High-Density FKM Rubber',
    price: 65,
    weightG: 20,
    colorHex: '#206A70',
    liningHex: '#17191A',
    image: '/assets/brewwatch/strap-teal-rubber.jpg',
  },
  {
    id: 'black-suede',
    name: 'Midnight Black Soft Suede Strap',
    lugSpec: '19.50mm Quick-Release',
    material: 'Brushed Split Calf Suede',
    price: 55,
    weightG: 14,
    colorHex: '#232120',
    liningHex: '#3A3634',
    image: '/assets/brewwatch/strap-black-suede.jpg',
  },
];

interface BrewVaultItem {
  key: string;
  watch: BrewWatch;
  bonusStrap: QuickReleaseStrap | null;
  engraving: string;
  quantity: number;
}

// ============================================================================
// SYNTHESIZED VK68 MECA-QUARTZ PUSHER CLICK AUDIO
// ============================================================================

function playMechanicalClick(enabled: boolean, pitch = 920, flyback = false) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = flyback ? 'triangle' : 'square';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(flyback ? 310 : 180, ctx.currentTime + 0.035);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.042);
    setTimeout(() => ctx.close().catch(() => {}), 140);
  } catch {
    // No-op fallback
  }
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function BrewWatchPage() {
  // Engine 01: 60 FPS Espresso Extraction Stopwatch & Meca-Quartz Dial State
  const [selectedDialId, setSelectedDialId] = useState<string>('chrono-taxi');
  const [chronoRunning, setChronoRunning] = useState<boolean>(true);
  const [elapsedSec, setElapsedSec] = useState<number>(28.4); // Starts near optimal extraction peak
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 3>(1);
  const [pusher2HAnim, setPusher2HAnim] = useState<boolean>(false);
  const [pusher4HAnim, setPusher4HAnim] = useState<boolean>(false);

  // Engine 02: Quick-Release Strap Pairer & Wrist Fit State
  const [selectedStrapId, setSelectedStrapId] = useState<string>('taxi-rally');
  const [wristCircumferenceIn, setWristCircumferenceIn] = useState<number>(6.75);

  // Collection & Gallery State
  const [activeSeriesFilter, setActiveSeriesFilter] = useState<'All' | 'Metric' | 'Super Metric' | 'Retrograph'>('All');
  const [wristViewCards, setWristViewCards] = useState<Record<string, boolean>>({});
  const [heroImageIdx, setHeroImageIdx] = useState<number>(0);

  // Vault Drawer & Audio State
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [customEngraving, setCustomEngraving] = useState<string>('PULL 29.5S NYC');
  const [vaultItems, setVaultItems] = useState<BrewVaultItem[]>([
    {
      key: 'chrono-taxi-taxi-rally',
      watch: WATCHES[0],
      bonusStrap: QUICK_RELEASE_STRAPS[1],
      engraving: 'PULL 29.5S NYC',
      quantity: 1,
    },
  ]);
  const [collectorName, setCollectorName] = useState<string>('');
  const [collectorEmail, setCollectorEmail] = useState<string>('');
  const [dispatchMethod, setDispatchMethod] = useState<'nyc-express' | 'soho-atelier'>('nyc-express');
  const [confirmedReceipt, setConfirmedReceipt] = useState<{
    orderCode: string;
    total: number;
    method: string;
  } | null>(null);

  const dialCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const activeWatch = useMemo(
    () => WATCHES.find((w) => w.id === selectedDialId) || WATCHES[0],
    [selectedDialId]
  );

  const activeStrap = useMemo(
    () => QUICK_RELEASE_STRAPS.find((s) => s.id === selectedStrapId) || QUICK_RELEASE_STRAPS[1],
    [selectedStrapId]
  );

  // Advance Chronograph elapsed time continuously when active
  useEffect(() => {
    if (!chronoRunning) {
      lastTickRef.current = null;
      return;
    }

    let animId = 0;
    const step = (now: number) => {
      if (lastTickRef.current !== null) {
        const dtSec = ((now - lastTickRef.current) / 1000) * speedMultiplier;
        setElapsedSec((prev) => (prev + dtSec) % 60);
      }
      lastTickRef.current = now;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [chronoRunning, speedMultiplier]);

  // Extraction Phase Evaluation (25.0s -> 35.0s)
  const extractionStatus = useMemo(() => {
    const s = elapsedSec;
    if (s < 25) {
      return {
        zone: 'PRE-INFUSION / UNDER-EXTRACTED',
        flavor: 'High Citrus Acidity • Thin Body',
        flowMl: (s * 1.15).toFixed(1),
        color: '#E09F3E',
        inOptimal: false,
      };
    }
    if (s <= 35) {
      return {
        zone: 'OPTIMAL 25–35S CREMA WINDOW',
        flavor: 'Balanced Caramel, Cocoa & Hazelnut',
        flowMl: (28.8 + (s - 25) * 0.92).toFixed(1),
        color: '#18A96B',
        inOptimal: true,
      };
    }
    return {
      zone: 'OVER-EXTRACTED ZONE (>35S)',
      flavor: 'Dry Roast Astringency • Bitter Finish',
      flowMl: (38.0 + (s - 35) * 0.65).toFixed(1),
      color: '#D94E28',
      inOptimal: false,
    };
  }, [elapsedSec]);

  // Wrist Fit Ergonomic Calculations (5.75" to 7.75")
  const wristFitStats = useMemo(() => {
    // Average flat top width of wrist in mm ~ circumferenceInches * 25.4 * 0.318 (elliptical aspect ratio)
    const wristTopWidthMm = wristCircumferenceIn * 25.4 * 0.325;
    const lugMarginMm = Number((wristTopWidthMm - activeWatch.lugToLugMm).toFixed(1));
    const headPlusStrapG = activeWatch.id === 'metric-titanium' ? 38 + activeStrap.weightG : 73 + activeStrap.weightG;
    const fitBadge =
      lugMarginMm >= 6
        ? 'ZERO OVERHANG — IDEAL CUSHION PROPORTION'
        : lugMarginMm >= 2
        ? 'FLUSH ARCHITECTURAL PRESENCE'
        : 'COMPACT VINTAGE HUG';

    return {
      wristTopWidthMm: Number(wristTopWidthMm.toFixed(1)),
      lugMarginMm,
      totalWeightG: headPlusStrapG,
      fitBadge,
    };
  }, [wristCircumferenceIn, activeWatch, activeStrap]);

  // ============================================================================
  // 60 FPS HTML5 MECA-QUARTZ VK68 CHRONOGRAPH CANVAS RENDERER
  // ============================================================================
  useEffect(() => {
    const canvas = dialCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const w = rect.width;
    const h = rect.height;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Industrial dark slate blueprint backdrop
    ctx.fillStyle = '#181513';
    ctx.fillRect(0, 0, w, h);

    // Micro machined coordinate grid
    ctx.strokeStyle = 'rgba(241, 237, 229, 0.045)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w / 2;
    const cy = h / 2;
    const caseHalfW = Math.min(w, h) * 0.31;
    const caseHalfH = caseHalfW * 1.15;

    // 1. Brushed 316L Integrated Bracelet Top & Bottom Links
    const braceletGrad = ctx.createLinearGradient(cx - caseHalfW * 0.72, 0, cx + caseHalfW * 0.72, 0);
    braceletGrad.addColorStop(0, '#5E6063');
    braceletGrad.addColorStop(0.3, '#B7BABC');
    braceletGrad.addColorStop(0.5, '#D7D9DB');
    braceletGrad.addColorStop(0.75, '#9EA1A4');
    braceletGrad.addColorStop(1, '#585A5D');

    [-1, 1].forEach((dir) => {
      for (let i = 0; i < 3; i++) {
        const taper = 1 - i * 0.06;
        const linkW = caseHalfW * 1.38 * taper;
        const linkH = 22;
        const ly = dir === -1 ? cy - caseHalfH - 8 - (i + 1) * (linkH + 2) : cy + caseHalfH + 8 + i * (linkH + 2);
        ctx.fillStyle = braceletGrad;
        ctx.beginPath();
        ctx.roundRect(cx - linkW / 2, ly, linkW, linkH, 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(20,18,16,0.45)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // 2. Chronograph Pushers (2H Start/Stop & 4H Reset) + Knurled Crown (3H)
    const p2Inset = pusher2HAnim ? 5 : 0;
    const p4Inset = pusher4HAnim ? 5 : 0;

    // 2H Pusher (Anodized accent color on Super Metric / steel on standard)
    ctx.save();
    ctx.translate(cx + caseHalfW - 4, cy - caseHalfH * 0.44);
    ctx.rotate(-0.22);
    ctx.fillStyle = activeWatch.id === 'super-orange' ? '#D94E28' : activeWatch.id === 'super-cobalt' ? '#2C72E6' : '#B8BBBE';
    ctx.fillRect(0, -10, 15 - p2Inset, 20);
    ctx.restore();

    // 3H Knurled Crown
    ctx.fillStyle = '#C7CACD';
    ctx.beginPath();
    ctx.roundRect(cx + caseHalfW - 2, cy - 15, 13, 30, 3);
    ctx.fill();
    for (let g = -11; g <= 11; g += 4) {
      ctx.fillStyle = 'rgba(20,18,16,0.35)';
      ctx.fillRect(cx + caseHalfW, cy + g, 11, 1.5);
    }

    // 4H Flyback Reset Pusher
    ctx.save();
    ctx.translate(cx + caseHalfW - 4, cy + caseHalfH * 0.44);
    ctx.rotate(0.22);
    ctx.fillStyle = '#B8BBBE';
    ctx.fillRect(0, -10, 15 - p4Inset, 20);
    ctx.restore();

    // 3. Cushion-Cut Steel Chassis (36mm x 41.5mm Barrel Case)
    const caseGrad = ctx.createLinearGradient(cx - caseHalfW, cy - caseHalfH, cx + caseHalfW, cy + caseHalfH);
    caseGrad.addColorStop(0, activeWatch.id === 'metric-gold' ? '#C79B3E' : activeWatch.id === 'metric-titanium' ? '#707478' : '#CED1D4');
    caseGrad.addColorStop(0.5, activeWatch.id === 'metric-gold' ? '#DFBA63' : activeWatch.id === 'metric-titanium' ? '#8B9095' : '#A9ACAF');
    caseGrad.addColorStop(1, activeWatch.id === 'metric-gold' ? '#916D24' : activeWatch.id === 'metric-titanium' ? '#565A5E' : '#737679');

    ctx.fillStyle = caseGrad;
    ctx.beginPath();
    ctx.roundRect(cx - caseHalfW, cy - caseHalfH, caseHalfW * 2, caseHalfH * 2, 26);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner Bezel Chamfer Step
    const innerPad = 14;
    const bezelR = caseHalfW - innerPad;
    ctx.fillStyle = '#201F1E';
    ctx.beginPath();
    ctx.roundRect(cx - bezelR, cy - (caseHalfH - innerPad), bezelR * 2, (caseHalfH - innerPad) * 2, 24);
    ctx.fill();

    // 4. Recessed Cushion Dial Plate
    const dialR = bezelR - 6;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cx - dialR, cy - (caseHalfH - innerPad - 6), dialR * 2, (caseHalfH - innerPad - 6) * 2, 22);
    ctx.clip();

    ctx.fillStyle = activeWatch.dialHex;
    ctx.fillRect(cx - dialR, cy - caseHalfH, dialR * 2, caseHalfH * 2);

    // Optional Checkered Taxi Cab Horizontal Stripe (Metric Chrono Taxi)
    if (activeWatch.hasCheckerStripe) {
      const sq = 10;
      const stripeTop = cy - sq;
      for (let x = cx - dialR; x < cx + dialR; x += sq) {
        const colIdx = Math.floor((x - (cx - dialR)) / sq);
        for (let r = 0; r < 2; r++) {
          ctx.fillStyle = (colIdx + r) % 2 === 0 ? '#FFFFFF' : '#111111';
          ctx.fillRect(x, stripeTop + r * sq, sq, sq);
        }
      }
    }

    // Super Metric Orange Grille Ribs at 8-9 o'clock
    if (activeWatch.id === 'super-orange') {
      ctx.strokeStyle = '#D94E28';
      ctx.lineWidth = 1.6;
      for (let gx = cx - dialR * 0.72; gx <= cx - 10; gx += 4.5) {
        ctx.beginPath();
        ctx.moveTo(gx, cy + 8);
        ctx.lineTo(gx, cy + dialR * 0.62);
        ctx.stroke();
      }
    }

    // 5. Outer Chapter Ring with Signature 25s -> 35s ESPRESSO EXTRACTION ZONE
    const trackR = dialR * 0.88;
    // Note: 0s is -PI/2. So t seconds angle = -PI/2 + (t / 60) * 2*PI.
    // 25s = -PI/2 + (25/60)*2*PI = PI/3 (approx 5 o'clock).
    // 35s = -PI/2 + (35/60)*2*PI = 2*PI/3 (approx 7 o'clock).
    const angle25 = -Math.PI / 2 + (25 / 60) * Math.PI * 2;
    const angle35 = -Math.PI / 2 + (35 / 60) * Math.PI * 2;

    // Glow intensity boosts dramatically when elapsed sweep enters 25–35s window!
    ctx.strokeStyle = extractionStatus.inOptimal ? '#18A96B' : activeWatch.highlightHex;
    ctx.lineWidth = extractionStatus.inOptimal ? 12 : 8;
    ctx.beginPath();
    ctx.arc(cx, cy, trackR, angle25, angle35);
    ctx.stroke();

    // Fine 1/5th second hash marks around full 60-second perimeter
    for (let t = 0; t < 60; t++) {
      const ang = -Math.PI / 2 + (t / 60) * Math.PI * 2;
      const inZone = t >= 25 && t <= 35;
      const rIn = t % 5 === 0 ? trackR - 11 : trackR - 6;
      const rOut = trackR + 3;
      ctx.strokeStyle = inZone ? (extractionStatus.inOptimal ? '#FFFFFF' : activeWatch.highlightHex) : 'rgba(241,237,229,0.55)';
      ctx.lineWidth = t % 5 === 0 ? 1.8 : 0.9;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * rIn, cy + Math.sin(ang) * rIn);
      ctx.lineTo(cx + Math.cos(ang) * rOut, cy + Math.sin(ang) * rOut);
      ctx.stroke();
    }

    // Applied Baton Hour Indices at 12 Hours
    for (let hr = 0; hr < 12; hr++) {
      const ang = -Math.PI / 2 + (hr / 12) * Math.PI * 2;
      const bR = trackR - 18;
      ctx.save();
      ctx.translate(cx + Math.cos(ang) * bR, cy + Math.sin(ang) * bR);
      ctx.rotate(ang + Math.PI / 2);
      ctx.fillStyle = '#F3EFE6';
      ctx.fillRect(-3.2, -5.5, 6.4, 11);
      ctx.restore();
    }

    // 6. Dual Asymmetric Sub-Dials (Left 10H = 60-Min Chrono Counter, Bottom 6H = Active Seconds)
    const sub60X = cx - dialR * 0.42;
    const sub60Y = cy - dialR * 0.24;
    const sub60R = dialR * 0.28;
    ctx.fillStyle = activeWatch.subdialHex;
    ctx.beginPath();
    ctx.arc(sub60X, sub60Y, sub60R, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = activeWatch.accentHex;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 6H Subdial
    const subSecY = cy + dialR * 0.42;
    const subSecR = dialR * 0.22;
    ctx.fillStyle = activeWatch.id === 'chrono-taxi' ? '#F2B705' : activeWatch.subdialHex;
    ctx.beginPath();
    ctx.arc(cx, subSecY, subSecR, 0, Math.PI * 2);
    ctx.fill();

    // Date Aperture at 4:30
    ctx.fillStyle = '#111111';
    ctx.fillRect(cx + dialR * 0.34, cy + dialR * 0.36, 17, 17);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('22', cx + dialR * 0.34 + 8.5, cy + dialR * 0.36 + 9);

    // 7. Etched Brew Bean Silhouette below 12 o'clock & -NEW YORK-
    ctx.fillStyle = 'rgba(241,237,229,0.28)';
    ctx.beginPath();
    ctx.ellipse(cx + 22, cy - dialR * 0.25, 7, 10, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = activeWatch.hasCheckerStripe ? '#111111' : 'rgba(241,237,229,0.85)';
    ctx.font = '700 8px "JetBrains Mono", monospace';
    ctx.fillText('- NEW YORK -', cx, cy + dialR * 0.72);

    // 8. Digital Blend Percolating Coffee LED Status (for Digital Blend / Telemetry HUD)
    if (activeWatch.id === 'digital-blend') {
      ctx.fillStyle = '#0D100F';
      ctx.fillRect(cx - 32, cy + 44, 64, 20);
      ctx.fillStyle = '#18A96B';
      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.fillText(`${elapsedSec.toFixed(1)}S CUP`, cx, cy + 54);
    }

    // 9. Analog Hour & Minute Hands (static architectural 10:10 proportion)
    // Hour hand at 10 o'clock
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 2 + (10.15 / 12) * Math.PI * 2);
    ctx.fillStyle = '#F3EFE6';
    ctx.fillRect(-3.5, -dialR * 0.48, 7, dialR * 0.52);
    ctx.restore();

    // Minute hand at 2 o'clock
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 2 + (9.5 / 60) * Math.PI * 2);
    ctx.fillStyle = '#F3EFE6';
    ctx.fillRect(-2.5, -dialR * 0.68, 5, dialR * 0.72);
    ctx.restore();

    // 10. LIVE 5 HZ VK68 MECA-QUARTZ CENTRAL CHRONOGRAPH SWEEP HAND
    const steppedSec = Math.floor(elapsedSec * 5) / 5; // Authentic 1/5th second mechanical tick!
    const sweepAngle = -Math.PI / 2 + (steppedSec / 60) * Math.PI * 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(sweepAngle);
    ctx.fillStyle = activeWatch.accentHex;
    ctx.fillRect(-1.5, -trackR + 4, 3, trackR + 12);
    // Counterweight loop
    ctx.beginPath();
    ctx.arc(0, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Center pinion cap
    ctx.fillStyle = '#D9DCDF';
    ctx.beginPath();
    ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }, [activeWatch, elapsedSec, pusher2HAnim, pusher4HAnim, extractionStatus.inOptimal]);

  // ============================================================================
  // INTERACTIVE PUSHER HANDLERS
  // ============================================================================
  const handleStartPausePusher = () => {
    setPusher2HAnim(true);
    setTimeout(() => setPusher2HAnim(false), 160);
    playMechanicalClick(audioEnabled, 980, false);
    setChronoRunning((r) => !r);
  };

  const handleFlybackResetPusher = () => {
    setPusher4HAnim(true);
    setTimeout(() => setPusher4HAnim(false), 160);
    playMechanicalClick(audioEnabled, 520, true);
    setChronoRunning(false);
    setElapsedSec(0);
  };

  // ============================================================================
  // VAULT DRAWER & BUNDLE MATH
  // ============================================================================
  const allocateToVault = (watch: BrewWatch, bonusStrap: QuickReleaseStrap | null = null) => {
    playMechanicalClick(audioEnabled, 880, false);
    const key = `${watch.id}-${bonusStrap ? bonusStrap.id : 'steel'}`;
    setVaultItems((prev) => {
      const exists = prev.find((item) => item.key === key);
      if (exists) {
        return prev.map((item) => (item.key === key ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { key, watch, bonusStrap, engraving: customEngraving, quantity: 1 }];
    });
    setConfirmedReceipt(null);
    setDrawerOpen(true);
  };

  const updateQty = (key: string, delta: number) => {
    playMechanicalClick(audioEnabled, delta > 0 ? 960 : 620, false);
    setVaultItems((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const vaultFinancials = useMemo(() => {
    const count = vaultItems.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = vaultItems.reduce((acc, i) => {
      const strapFee = i.bonusStrap && i.bonusStrap.price > 0 ? Math.round(i.bonusStrap.price * 0.85) : 0; // -15% bundled strap discount!
      return acc + (i.watch.price + strapFee) * i.quantity;
    }, 0);
    const multiDiscount = count >= 2 ? 40 : 0;
    const total = Math.max(0, subtotal - multiDiscount);
    return { count, subtotal, multiDiscount, total };
  }, [vaultItems]);

  const handleCheckoutConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (vaultItems.length === 0) return;

    playMechanicalClick(audioEnabled, 1080, true);
    const orderCode = `BREW-NYC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`;
    setConfirmedReceipt({
      orderCode,
      total: vaultFinancials.total,
      method:
        dispatchMethod === 'nyc-express'
          ? 'Insured NYC Direct Courier (2–4 Business Days)'
          : 'New York SoHo Industrial Showroom Pickup & Sizing',
    });

    confetti({
      particleCount: 75,
      spread: 68,
      origin: { y: 0.72 },
      colors: ['#F2B705', '#D95B26', '#18A96B', '#F1EDE5'],
    });
  };

  const filteredWatches = useMemo(() => {
    if (activeSeriesFilter === 'All') return WATCHES;
    return WATCHES.filter((w) => w.series === activeSeriesFilter);
  }, [activeSeriesFilter]);

  const HERO_SLIDES = [
    { src: '/assets/brewwatch/hero-taxi-slider.jpg', caption: 'METRIC CHRONO TAXI // LIMITED TO 1,000 NUMBERED PIECES' },
    { src: '/assets/brewwatch/hero-metric-retro.jpg', caption: 'METRIC RETRO DIAL // 25–35S EXTRACTION CHAPTER RING' },
    { src: '/assets/brewwatch/hero-retrograph-espresso.jpg', caption: 'RETROGRAPH ESPRESSO // VK64 INDUSTRIAL CHRONOMETRY' },
  ];

  // ============================================================================
  // RENDER INTERFACE
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#141210] text-[#F1EDE5] selection:bg-[#F2B705] selection:text-[#141210]">
      {/* 01 // INDUSTRIAL HARDWARE STICKY HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#F1EDE5]/15 bg-[#141210]/92 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="min-h-[48px] min-w-[48px] px-3 flex items-center gap-2 border border-[#F1EDE5]/20 hover:border-[#F2B705] hover:bg-[#F2B705] hover:text-[#141210] transition-colors font-mono text-[11px] uppercase tracking-widest"
              aria-label="Return to Billy Benjamin Consulting Index"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">BBC Index</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#F1EDE5]/25 bg-[#1E1A18] flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5 text-[#F2B705]" />
              </div>
              <div>
                <p
                  className="text-xl font-bold tracking-tight leading-none uppercase"
                  style={{ fontFamily: 'var(--font-brew-display), sans-serif' }}
                >
                  BREW WATCH CO.
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F1EDE5]/60 mt-1">
                  New York City • Jonathan Ferrer
                </p>
              </div>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-2">
            {[
              { href: '#extraction', label: '01 / 25–35s Extraction Lab' },
              { href: '#straps', label: '02 / Strap & Wrist Pairer' },
              { href: '#collection', label: '03 / NYC Drop Lineup' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-[48px] px-4 flex items-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#F1EDE5]/75 hover:text-[#F2B705] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setAudioEnabled((v) => !v)}
              className="min-h-[48px] min-w-[48px] px-3 flex items-center justify-center border border-[#F1EDE5]/20 hover:border-[#F2B705] bg-[#1E1A18] transition-colors"
              aria-label={audioEnabled ? 'Mute mechanical pusher sound' : 'Enable mechanical pusher sound'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-[#F2B705]" /> : <VolumeX className="w-4 h-4 opacity-50" />}
            </button>

            <button
              type="button"
              onClick={() => {
                playMechanicalClick(audioEnabled, 880, false);
                setDrawerOpen(true);
              }}
              className="min-h-[48px] px-4 sm:px-6 flex items-center gap-3 bg-[#F2B705] text-[#141210] hover:bg-[#D95B26] hover:text-white transition-colors font-mono text-xs font-bold uppercase tracking-[0.15em]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Reserve Vault</span>
              <span className="px-1.5 py-0.5 bg-[#141210]/15 text-[11px]">
                {vaultFinancials.count} • ${vaultFinancials.total}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 02 // INDUSTRIAL ESPRESSO CHRONOMETRY HERO */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 lg:py-16 border-b border-[#F1EDE5]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-[#1E1A18] border border-[#F1EDE5]/15 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2B705]">
                <span className="w-2 h-2 bg-[#D95B26] rounded-full animate-pulse" />
                <span>Industrial Espresso Chronometry • Designed In NYC</span>
              </div>

              <h1
                className="text-4xl sm:text-6xl xl:text-[66px] font-bold leading-[1.02] tracking-tight"
                style={{ fontFamily: 'var(--font-brew-display), sans-serif' }}
              >
                Brushed 316L Steel Meets The{' '}
                <span className="text-[#F2B705]">25–35 Second Espresso Standard.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#F1EDE5]/75 max-w-2xl leading-relaxed">
                Born in New York City specialty cafes by industrial designer Jonathan Ferrer, every
                Brew chronograph translates espresso machine textures, high-contrast dials, and
                meca-quartz flyback timing into compact 36mm cushion wrist architecture.
              </p>
            </div>

            {/* UX Law 3: Above-the-Fold Trust & Spec Anchors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-[#F1EDE5]/15 py-4 font-mono">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#F1EDE5]/55 block">
                  Collector Verdict
                </span>
                <span className="text-sm font-bold text-[#F2B705]">4.96★ / 5.0 (4,800+ Timed)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#F1EDE5]/55 block">
                  Chronograph Engine
                </span>
                <span className="text-sm font-bold">VK68 5 Hz Meca-Quartz</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#F1EDE5]/55 block">
                  Warranty &amp; Shipping
                </span>
                <span className="text-sm font-bold">2-Year NYC Insured $0 Ship</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#extraction"
                onClick={() => playMechanicalClick(audioEnabled, 920, false)}
                className="min-h-[54px] px-7 flex items-center justify-center gap-3 bg-[#D95B26] hover:bg-[#F2B705] hover:text-[#141210] text-white font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <Gauge className="w-4 h-4" />
                <span>Pull 25–35s Extraction Shot</span>
              </a>
              <a
                href="#straps"
                onClick={() => playMechanicalClick(audioEnabled, 780, false)}
                className="min-h-[54px] px-7 flex items-center justify-center gap-3 border border-[#F1EDE5]/35 hover:border-[#F2B705] hover:text-[#F2B705] font-mono text-xs uppercase tracking-[0.16em] transition-colors"
              >
                <Watch className="w-4 h-4" />
                <span>Pair 19.5mm Quick-Release Strap</span>
              </a>
            </div>
          </div>

          {/* Hero Showcase Visual Card */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-[4/4] sm:aspect-[5/4] lg:aspect-[4/4.3] w-full overflow-hidden border border-[#F1EDE5]/20 bg-[#1E1A18]">
              <img
                src={HERO_SLIDES[heroImageIdx].src}
                alt={HERO_SLIDES[heroImageIdx].caption}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#141210]/92 backdrop-blur-sm border border-[#F1EDE5]/20 px-4 py-3 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#F2B705]">
                  {HERO_SLIDES[heroImageIdx].caption}
                </span>
                <a
                  href="#collection"
                  className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-white flex items-center gap-1 hover:text-[#F2B705]"
                >
                  Inspect <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => {
                    playMechanicalClick(audioEnabled, 760 + idx * 90, false);
                    setHeroImageIdx(idx);
                  }}
                  className={`min-h-[48px] px-2 border font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    heroImageIdx === idx
                      ? 'bg-[#F2B705] text-[#141210] border-[#F2B705] font-bold'
                      : 'bg-[#1E1A18] text-[#F1EDE5]/75 border-[#F1EDE5]/20 hover:border-[#F2B705]'
                  }`}
                >
                  0{idx + 1} / Dial
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 // ENGINE 01: LIVE 60 FPS 25–35S ESPRESSO EXTRACTION STOPWATCH CANVAS */}
      <section
        id="extraction"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 lg:py-20 border-b border-[#F1EDE5]/15"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2B705]">
              Engine 01 // Interactive VK68 Meca-Quartz Complication
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-brew-display), sans-serif' }}
            >
              25–35s Espresso Extraction Chronograph Simulator
            </h2>
            <p className="text-sm sm:text-base text-[#F1EDE5]/75 leading-relaxed">
              Actuate the 2 o’clock pusher to launch the 5 Hz mechanical sweep hand. Track your pull
              entering Brew’s highlighted 25–35 second optimal extraction chapter ring, then snap back
              to zero via the 4 o’clock flyback reset.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playMechanicalClick(audioEnabled, 820, false);
                setSpeedMultiplier(1);
              }}
              className={`min-h-[48px] px-4 border font-mono text-xs uppercase tracking-wider ${
                speedMultiplier === 1
                  ? 'bg-[#F2B705] text-[#141210] border-[#F2B705] font-bold'
                  : 'bg-[#1E1A18] text-[#F1EDE5] border-[#F1EDE5]/20'
              }`}
            >
              1x True Time
            </button>
            <button
              type="button"
              onClick={() => {
                playMechanicalClick(audioEnabled, 940, false);
                setSpeedMultiplier(3);
              }}
              className={`min-h-[48px] px-4 border font-mono text-xs uppercase tracking-wider ${
                speedMultiplier === 3
                  ? 'bg-[#F2B705] text-[#141210] border-[#F2B705] font-bold'
                  : 'bg-[#1E1A18] text-[#F1EDE5] border-[#F1EDE5]/20'
              }`}
            >
              3x Fast Barista Test
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Live 60 FPS Cushion Steel Watch Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border border-[#F1EDE5]/20 bg-[#181513] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F1EDE5]/15 flex items-center justify-between bg-[#1E1A18]">
                <span className="font-mono text-[11px] uppercase tracking-widest flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      chronoRunning ? 'bg-[#18A96B] animate-pulse' : 'bg-[#F2B705]'
                    }`}
                  />
                  <span>{activeWatch.name} — 5 Hz VK68 Sweep</span>
                </span>
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1"
                  style={{
                    backgroundColor: extractionStatus.color,
                    color: '#141210',
                  }}
                >
                  {elapsedSec.toFixed(1)}s ELAPSED
                </span>
              </div>

              <canvas
                ref={dialCanvasRef}
                className="w-full h-[380px] sm:h-[430px] block"
                aria-label="Live Interactive Brew Chronograph Dial & 25-35s Espresso Window Canvas"
              />
            </div>

            {/* Extraction Chamber Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              <div className="p-4 bg-[#1E1A18] border border-[#F1EDE5]/15">
                <span className="text-[10px] uppercase tracking-widest text-[#F1EDE5]/55 block">
                  Extraction Phase
                </span>
                <span className="text-xs sm:text-sm font-bold block mt-1" style={{ color: extractionStatus.color }}>
                  {extractionStatus.zone}
                </span>
              </div>
              <div className="p-4 bg-[#1E1A18] border border-[#F1EDE5]/15">
                <span className="text-[10px] uppercase tracking-widest text-[#F1EDE5]/55 block">
                  Shot Yield Volume
                </span>
                <span className="text-lg font-bold block mt-0.5 text-[#F1EDE5]">
                  {extractionStatus.flowMl} g / 18g Dose
                </span>
              </div>
              <div className="p-4 bg-[#1E1A18] border border-[#F1EDE5]/15">
                <span className="text-[10px] uppercase tracking-widest text-[#F1EDE5]/55 block">
                  Tasting Balance
                </span>
                <span className="text-xs font-bold block mt-1 text-[#F2B705]">
                  {extractionStatus.flavor}
                </span>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Tactile Machined Pusher Controls & Colorway Switcher */}
          <div className="lg:col-span-5 bg-[#1E1A18] border border-[#F1EDE5]/20 p-5 sm:p-7 space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#F1EDE5]/70">
                1. Physical Chronograph Pushers
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleStartPausePusher}
                  className="min-h-[54px] px-4 bg-[#D95B26] hover:bg-[#E56934] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  {chronoRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{chronoRunning ? '2H Pause' : '2H Start'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleFlybackResetPusher}
                  className="min-h-[54px] px-4 border border-[#F1EDE5]/35 hover:border-[#F2B705] hover:text-[#F2B705] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>4H Flyback 00</span>
                </button>
              </div>
            </div>

            {/* Instant Shot Markers */}
            <div className="space-y-2.5 pt-2 border-t border-[#F1EDE5]/15">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#F1EDE5]/70">
                2. Jump To Espresso Flow Window
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '18s Sour', time: 18.2 },
                  { label: '29s Sweet', time: 29.0 },
                  { label: '41s Bitter', time: 41.5 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      playMechanicalClick(audioEnabled, 840, false);
                      setElapsedSec(preset.time);
                      setChronoRunning(false);
                    }}
                    className="min-h-[48px] px-2 bg-[#141210] border border-[#F1EDE5]/20 hover:border-[#F2B705] font-mono text-[11px] uppercase tracking-wider transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Dial Colorway Switcher */}
            <div className="space-y-2.5 pt-2 border-t border-[#F1EDE5]/15">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#F1EDE5]/70">
                3. Switch Live Bezel &amp; Dial Reference
              </p>
              <div className="grid grid-cols-1 gap-2">
                {WATCHES.slice(0, 6).map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      playMechanicalClick(audioEnabled, 810, false);
                      setSelectedDialId(w.id);
                    }}
                    className={`min-h-[48px] px-4 py-2 border flex items-center justify-between text-left transition-all ${
                      selectedDialId === w.id
                        ? 'bg-[#F1EDE5] text-[#141210] border-[#F1EDE5]'
                        : 'bg-[#141210] text-[#F1EDE5] border-[#F1EDE5]/15 hover:border-[#F2B705]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                        style={{ backgroundColor: w.accentHex }}
                      />
                      <span className="font-mono text-xs font-bold uppercase">{w.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold">${w.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => allocateToVault(activeWatch, activeStrap)}
              className="w-full min-h-[54px] bg-[#F2B705] hover:bg-[#D95B26] hover:text-white text-[#141210] font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors"
            >
              Reserve {activeWatch.name} — ${activeWatch.price} USD
            </button>
          </div>
        </div>
      </section>

      {/* 04 // ENGINE 02: QUICK-RELEASE STRAP BUNDLER & CUSHION CASE FIT WORKBENCH */}
      <section
        id="straps"
        className="bg-[#F1EDE5] text-[#141210] border-b border-[#141210]/15 py-14 lg:py-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 6 Cols: Quick-Release Strap Bundle Builder */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D95B26] font-bold">
                  Engine 02 // Toolless Quick-Release Spring Bars (-15% Bundle)
                </p>
                <h2
                  className="text-3xl sm:text-5xl font-bold tracking-tight"
                  style={{ fontFamily: 'var(--font-brew-display), sans-serif' }}
                >
                  Pair Italian Suede Or FKM Rubber Straps In One Tap
                </h2>
                <p className="text-sm sm:text-base text-[#141210]/75 leading-relaxed">
                  Swap cleanly between integrated 316L steel links and 19.50mm–20mm quick-release
                  straps without scratching brushed lugs. Pairing a spare strap applies automatic
                  15% privilege off the strap cost.
                </p>
              </div>

              <div className="space-y-2.5">
                {QUICK_RELEASE_STRAPS.map((strap) => {
                  const discounted = strap.price > 0 ? Math.round(strap.price * 0.85) : 0;
                  return (
                    <button
                      key={strap.id}
                      type="button"
                      onClick={() => {
                        playMechanicalClick(audioEnabled, 790, false);
                        setSelectedStrapId(strap.id);
                      }}
                      className={`w-full min-h-[60px] p-3.5 border flex items-center justify-between gap-4 text-left transition-all ${
                        selectedStrapId === strap.id
                          ? 'bg-[#141210] text-[#F1EDE5] border-[#141210]'
                          : 'bg-white text-[#141210] border-[#141210]/20 hover:border-[#D95B26]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={strap.image}
                          alt={strap.name}
                          className="w-12 h-12 object-cover border border-[#141210]/15 bg-[#FAF8F4] shrink-0"
                        />
                        <div>
                          <p className="font-mono text-xs font-bold uppercase">{strap.name}</p>
                          <p className="font-mono text-[10px] opacity-70">
                            {strap.lugSpec} • {strap.material} • {strap.weightG}g
                          </p>
                        </div>
                      </div>
                      <div className="font-mono text-right shrink-0">
                        {strap.price === 0 ? (
                          <span className="text-xs font-bold">INCLUDED</span>
                        ) : (
                          <>
                            <span className="text-xs font-bold text-[#F2B705] block">
                              +${discounted} USD
                            </span>
                            <span className="text-[10px] line-through opacity-50">${strap.price}</span>
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 6 Cols: 36mm Cushion Case Wrist-Fit Scale & Bundle Trigger */}
            <div className="lg:col-span-6 bg-white border border-[#141210]/20 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#141210]/15 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D95B26] font-bold">
                    36mm Cushion Fit Caliper
                  </span>
                  <h3
                    className="text-2xl font-bold mt-0.5"
                    style={{ fontFamily: 'var(--font-brew-display), sans-serif' }}
                  >
                    {activeWatch.name} + {activeStrap.name.split(' ')[0]}
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold px-3 py-1 bg-[#141210] text-[#F2B705]">
                  {activeWatch.lugToLugMm}mm L2L
                </span>
              </div>

              {/* Dual Asset Split View: Watch Front + Selected Strap */}
              <div className="grid grid-cols-2 gap-4 bg-[#FAF8F4] border border-[#141210]/10 p-4">
                <div className="aspect-square flex flex-col items-center justify-center p-2">
                  <img
                    src={activeWatch.frontImage}
                    alt={activeWatch.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="aspect-square flex flex-col items-center justify-center p-2 border-l border-[#141210]/10">
                  <img
                    src={activeStrap.image}
                    alt={activeStrap.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Wrist Circumference Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor="wrist-slider" className="uppercase tracking-wider font-bold">
                    Test Wrist Circumference
                  </label>
                  <span className="font-bold text-[#D95B26]">
                    {wristCircumferenceIn.toFixed(2)}&Prime; ({Math.round(wristCircumferenceIn * 25.4)} mm)
                  </span>
                </div>
                <input
                  id="wrist-slider"
                  type="range"
                  min={5.75}
                  max={7.75}
                  step={0.25}
                  value={wristCircumferenceIn}
                  onChange={(e) => setWristCircumferenceIn(Number(e.target.value))}
                  className="w-full h-3 accent-[#D95B26] cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] opacity-60 uppercase">
                  <span>5.75&Prime; Slender</span>
                  <span>6.75&Prime; Median</span>
                  <span>7.75&Prime; Broad</span>
                </div>
              </div>

              {/* Visual Lug-to-Wrist Span Bar */}
              <div className="p-4 bg-[#F1EDE5] border border-[#141210]/15 space-y-3">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="uppercase opacity-70">Top-Down Cushion Span vs Wrist Width:</span>
                  <span className="font-bold">+{wristFitStats.lugMarginMm}mm Skin Clearance</span>
                </div>
                <div className="h-5 w-full bg-[#141210]/10 relative flex items-center justify-center overflow-hidden">
                  <div
                    className="h-full bg-[#141210] transition-all duration-300 flex items-center justify-center text-[9px] font-mono text-[#F2B705]"
                    style={{
                      width: `${Math.min(92, Math.round((activeWatch.lugToLugMm / wristFitStats.wristTopWidthMm) * 100))}%`,
                    }}
                  >
                    {activeWatch.lugToLugMm}MM CASE
                  </div>
                </div>
                <div className="flex justify-between font-mono text-[10px] font-bold">
                  <span className="text-[#18A96B]">{wristFitStats.fitBadge}</span>
                  <span>WEIGHT ON WRIST: {wristFitStats.totalWeightG}G</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => allocateToVault(activeWatch, activeStrap)}
                className="w-full min-h-[54px] bg-[#141210] hover:bg-[#D95B26] text-[#F1EDE5] font-mono text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-3 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#F2B705]" />
                <span>
                  Bundle Watch + Strap &mdash; $
                  {activeWatch.price + (activeStrap.price > 0 ? Math.round(activeStrap.price * 0.85) : 0)} USD
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05 // FULL NYC COLLECTION GRID WITH MACRO DIAL ↔ WRIST TOGGLE */}
      <section
        id="collection"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 lg:py-20 border-b border-[#F1EDE5]/15"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2B705]">
              Full Studio Catalog // Compact 36mm–38mm Cases
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-brew-display), sans-serif' }}
            >
              Industrial Espresso Chronographs
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['All', 'Metric', 'Super Metric', 'Retrograph'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  playMechanicalClick(audioEnabled, 820, false);
                  setActiveSeriesFilter(tab);
                }}
                className={`min-h-[48px] px-5 border font-mono text-xs uppercase tracking-wider transition-colors ${
                  activeSeriesFilter === tab
                    ? 'bg-[#F2B705] text-[#141210] border-[#F2B705] font-bold'
                    : 'bg-[#1E1A18] text-[#F1EDE5] border-[#F1EDE5]/20 hover:border-[#F2B705]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredWatches.map((w) => {
            const showWrist = !!wristViewCards[w.id];
            return (
              <article
                key={w.id}
                className="flex flex-col justify-between border border-[#F1EDE5]/20 bg-[#1E1A18] group"
              >
                <div>
                  <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-white border-b border-[#F1EDE5]/15">
                    <img
                      src={showWrist ? w.wristImage : w.frontImage}
                      alt={w.name}
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
                        showWrist ? 'object-cover' : 'object-contain p-4 bg-white'
                      }`}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#141210]/90 text-[#F2B705] font-mono text-[10px] uppercase tracking-wider">
                      {w.caseDimsMm}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playMechanicalClick(audioEnabled, showWrist ? 740 : 880, false);
                        setWristViewCards((prev) => ({ ...prev, [w.id]: !prev[w.id] }));
                      }}
                      className="absolute bottom-3 right-3 min-h-[40px] px-3 bg-[#141210]/90 hover:bg-[#D95B26] text-white font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showWrist ? 'Macro Dial' : 'Wrist Shot'}</span>
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3
                        className="text-lg font-bold leading-snug"
                        style={{ fontFamily: 'var(--font-brew-display), sans-serif' }}
                      >
                        {w.name}
                      </h3>
                      <span className="font-mono text-sm font-bold text-[#F2B705] shrink-0">
                        ${w.price}
                      </span>
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#D95B26]">
                      {w.editionNote}
                    </p>

                    <p className="font-mono text-[11px] text-[#F1EDE5]/65">
                      {w.caseMaterial} • {w.movement.split(' ')[1]}
                    </p>

                    <p className="text-xs text-[#F1EDE5]/75 leading-relaxed line-clamp-3">
                      {w.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playMechanicalClick(audioEnabled, 900, false);
                      setSelectedDialId(w.id);
                      const el = document.getElementById('extraction');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="min-h-[48px] px-2 border border-[#F1EDE5]/25 hover:border-[#F2B705] hover:text-[#F2B705] font-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Time Dial Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => allocateToVault(w, activeStrap)}
                    className="min-h-[48px] px-2 bg-[#F2B705] hover:bg-[#D95B26] text-[#141210] hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    Reserve
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 06 // SOVEREIGN FOOTER & BILLY BENJAMIN CONSULTING CREDITS */}
      <footer className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2B705] font-bold">
            Billy Benjamin Consulting // Revenue Architecture Sandbox
          </p>
          <p className="text-sm text-[#F1EDE5]/70 leading-relaxed">
            Interactive storefront prototype engineered by Billy Benjamin for Jonathan Ferrer &amp;
            Brew Watch Co. (New York City). Built to demonstrate direct chronograph engagement and
            quick-release strap attach lift.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:billybenjamin836@gmail.com?subject=Brew%20Watch%20Co.%20Interactive%20Chronograph%20Architecture"
            className="min-h-[48px] px-5 flex items-center gap-2 border border-[#F1EDE5]/35 hover:border-[#F2B705] hover:text-[#F2B705] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            Direct Email <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/billy-benjamin-b02265315"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 flex items-center gap-2 border border-[#F1EDE5]/20 hover:border-[#F2B705] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/billybranddirector88/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 flex items-center gap-2 border border-[#F1EDE5]/20 hover:border-[#F2B705] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            @billybranddirector88
          </a>
        </div>
      </footer>

      {/* ======================================================================== */}
      {/* SLIDE-OUT NYC DROP RESERVE & BUNDLE DRAWER (PEAK-END RULE)               */}
      {/* ======================================================================== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          <aside className="relative z-10 w-full max-w-lg bg-[#141210] text-[#F1EDE5] h-full flex flex-col border-l border-[#F1EDE5]/20 shadow-2xl overflow-y-auto">
            <div className="sticky top-0 z-20 bg-[#141210] px-6 py-5 border-b border-[#F1EDE5]/15 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2B705]">
                  New York City Watch Vault
                </p>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-brew-display), sans-serif' }}
                >
                  Chronograph &amp; Strap Allocation
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="min-h-[48px] min-w-[48px] flex items-center justify-center border border-[#F1EDE5]/20 hover:bg-[#F2B705] hover:text-[#141210] transition-colors"
                aria-label="Close Reserve Vault Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {confirmedReceipt ? (
                <div className="bg-[#1E1A18] border border-[#F2B705]/40 p-6 space-y-5">
                  <div className="flex items-center gap-3 text-[#18A96B]">
                    <div className="w-10 h-10 rounded-full bg-[#18A96B]/20 flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest">
                        Allocation Locked
                      </p>
                      <h4 className="font-mono text-base font-bold text-[#F1EDE5]">
                        {confirmedReceipt.orderCode}
                      </h4>
                    </div>
                  </div>

                  <div className="border-y border-[#F1EDE5]/15 py-4 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="opacity-65">Caseback Engraving:</span>
                      <span className="font-bold text-[#F2B705]">{customEngraving || 'NONE'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-65">Dispatch:</span>
                      <span className="font-bold text-right max-w-[230px]">
                        {confirmedReceipt.method}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-65">Total Paid ($0 Ship):</span>
                      <span className="font-bold text-[#18A96B]">${confirmedReceipt.total} USD</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedReceipt(null);
                      setDrawerOpen(false);
                    }}
                    className="w-full min-h-[48px] bg-[#F2B705] text-[#141210] font-mono text-xs font-bold uppercase tracking-widest"
                  >
                    Return To Brew Atelier
                  </button>
                </div>
              ) : (
                <>
                  {/* Collector Multi-Watch Savings Banner */}
                  <div className="p-4 bg-[#1E1A18] border border-[#F2B705]/30 space-y-2">
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                      <span className="flex items-center gap-2 text-[#F2B705]">
                        <Sparkles className="w-4 h-4" />
                        {vaultFinancials.count >= 2
                          ? 'Collector Pair Active (-$40 + Travel Roll)'
                          : 'Add 1 More Watch For -$40 & Canvas Watch Roll'}
                      </span>
                      <span>{Math.min(2, vaultFinancials.count)} / 2</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-[#F2B705] transition-all duration-300"
                        style={{ width: `${Math.min(100, (vaultFinancials.count / 2) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {vaultItems.length === 0 ? (
                    <div className="p-8 border border-dashed border-[#F1EDE5]/25 text-center space-y-3">
                      <p className="font-mono text-xs uppercase opacity-65">Your Vault Is Empty</p>
                      <button
                        type="button"
                        onClick={() => setDrawerOpen(false)}
                        className="min-h-[48px] px-5 bg-[#F2B705] text-[#141210] font-mono text-xs font-bold uppercase"
                      >
                        Explore Timepieces
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {vaultItems.map((item) => {
                        const strapAddon =
                          item.bonusStrap && item.bonusStrap.price > 0
                            ? Math.round(item.bonusStrap.price * 0.85)
                            : 0;
                        return (
                          <div
                            key={item.key}
                            className="p-4 bg-[#1E1A18] border border-[#F1EDE5]/15 flex gap-4 items-center"
                          >
                            <img
                              src={item.watch.frontImage}
                              alt={item.watch.name}
                              className="w-20 h-20 object-contain bg-white border border-[#F1EDE5]/15 shrink-0 p-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline gap-2">
                                <p className="font-mono text-xs font-bold uppercase truncate">
                                  {item.watch.name}
                                </p>
                                <span className="font-mono text-xs font-bold text-[#F2B705]">
                                  ${(item.watch.price + strapAddon) * item.quantity}
                                </span>
                              </div>
                              <p className="font-mono text-[10px] opacity-65 truncate">
                                {item.watch.caseDimsMm} • {item.watch.caseMaterial}
                              </p>
                              {item.bonusStrap && (
                                <p className="font-mono text-[10px] text-[#18A96B] mt-0.5 truncate">
                                  + {item.bonusStrap.name} {strapAddon > 0 ? `(+$${strapAddon})` : '(Base)'}
                                </p>
                              )}

                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.key, -1)}
                                  className="w-10 h-10 border border-[#F1EDE5]/25 flex items-center justify-center hover:bg-[#F2B705] hover:text-[#141210]"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-mono text-xs font-bold w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.key, 1)}
                                  className="w-10 h-10 border border-[#F1EDE5]/25 flex items-center justify-center hover:bg-[#F2B705] hover:text-[#141210]"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Custom Stainless Steel Caseback Engraving Preview */}
                  <div className="space-y-2 pt-2 border-t border-[#F1EDE5]/15">
                    <div className="flex justify-between font-mono text-[11px] uppercase">
                      <label htmlFor="caseback-engraving">Complimentary Caseback Engraving</label>
                      <span className="text-[#F2B705]">Max 16 Chars</span>
                    </div>
                    <input
                      id="caseback-engraving"
                      type="text"
                      maxLength={16}
                      value={customEngraving}
                      onChange={(e) => setCustomEngraving(e.target.value.toUpperCase())}
                      className="w-full min-h-[48px] px-3 bg-[#1E1A18] border border-[#F1EDE5]/25 font-mono text-xs tracking-widest uppercase focus:outline-none focus:border-[#F2B705]"
                    />
                    <div className="p-2.5 bg-gradient-to-r from-[#585A5D] via-[#B4B7BA] to-[#585A5D] text-[#141210] font-mono text-[10px] text-center tracking-[0.26em] font-bold border border-white/30">
                      BREW NYC // {customEngraving || 'EDITION SERIAL'}
                    </div>
                  </div>

                  {/* Dispatch Selection */}
                  <div className="space-y-2 pt-2 border-t border-[#F1EDE5]/15">
                    <p className="font-mono text-[11px] uppercase tracking-wider font-bold">
                      Select Fulfillment Channel
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        onClick={() => setDispatchMethod('nyc-express')}
                        className={`min-h-[52px] p-3 border text-left font-mono text-[11px] transition-colors ${
                          dispatchMethod === 'nyc-express'
                            ? 'bg-[#1E1A18] border-[#F2B705] text-[#F1EDE5]'
                            : 'border-[#F1EDE5]/15 opacity-75'
                        }`}
                      >
                        <div className="flex justify-between font-bold">
                          <span>INSURED COURIER WORLDWIDE</span>
                          <span className="text-[#18A96B]">$0</span>
                        </div>
                        <span className="text-[10px] opacity-65">2–4 Business Days w/ Tracking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDispatchMethod('soho-atelier')}
                        className={`min-h-[52px] p-3 border text-left font-mono text-[11px] transition-colors ${
                          dispatchMethod === 'soho-atelier'
                            ? 'bg-[#1E1A18] border-[#F2B705] text-[#F1EDE5]'
                            : 'border-[#F1EDE5]/15 opacity-75'
                        }`}
                      >
                        <div className="flex justify-between font-bold">
                          <span>NYC SHOWROOM BRACELET SIZING</span>
                          <span className="text-[#18A96B]">$0</span>
                        </div>
                        <span className="text-[10px] opacity-65">Custom Link Sizing &amp; Espresso Pull</span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleCheckoutConfirm} className="space-y-4 pt-3 border-t border-[#F1EDE5]/15">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Collector Name"
                        value={collectorName}
                        onChange={(e) => setCollectorName(e.target.value)}
                        className="w-full min-h-[48px] px-3 bg-[#1E1A18] border border-[#F1EDE5]/25 font-mono text-xs focus:outline-none focus:border-[#F2B705]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email Receipt Address"
                        value={collectorEmail}
                        onChange={(e) => setCollectorEmail(e.target.value)}
                        className="w-full min-h-[48px] px-3 bg-[#1E1A18] border border-[#F1EDE5]/25 font-mono text-xs focus:outline-none focus:border-[#F2B705]"
                      />
                    </div>

                    <div className="p-4 bg-[#1E1A18] border border-[#F1EDE5]/15 space-y-2 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="opacity-70">Subtotal (Includes -15% Strap Bundle)</span>
                        <span>${vaultFinancials.subtotal} USD</span>
                      </div>
                      {vaultFinancials.multiDiscount > 0 && (
                        <div className="flex justify-between text-[#18A96B] font-bold">
                          <span>2+ Timepiece Collector Credit</span>
                          <span>-${vaultFinancials.multiDiscount} USD</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="opacity-70">Insured NYC Courier</span>
                        <span className="font-bold">FREE ($0)</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#F1EDE5]/15 text-base font-bold">
                        <span>Total Allocation</span>
                        <span className="text-[#F2B705]">${vaultFinancials.total} USD</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={vaultItems.length === 0}
                      className="w-full min-h-[54px] bg-[#D95B26] hover:bg-[#F2B705] hover:text-[#141210] disabled:opacity-40 text-white font-mono text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Confirm Chronograph Reservation</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

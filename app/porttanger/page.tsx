'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  Glasses,
  Layers,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sliders,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

// ============================================================================
// DOMAIN TAXONOMY & VERIFIED SABAE PRODUCT REGISTRY
// ============================================================================

interface EyewearFrame {
  id: string;
  name: string;
  collection: 'Icon Collection' | 'Jadhb Collection' | 'Collaborations';
  meaning: string;
  price: number;
  acetateName: string;
  acetateHex: string;
  acetateSecondaryHex: string;
  lensName: string;
  lensId: LensChemistryId;
  lensCategory: 'Category 1' | 'Category 2' | 'Category 3';
  lensWidthMm: number;
  lensHeightMm: number;
  bridgeMm: number;
  frameWidthMm: number;
  templeMm: number;
  acetateGaugeMm: number;
  hingeBarrels: 7 | 9;
  silhouetteType: 'rectangle' | 'oval' | 'cat-eye' | 'aviator' | 'mono-mask';
  wornImage: string;
  studioImage: string;
  story: string;
}

type LensChemistryId = 'tobacco' | 'olive' | 'rif-blue' | 'rose' | 'black-onyx';

interface LensChemistry {
  id: LensChemistryId;
  name: string;
  category: string;
  vltPercent: number;
  blueBlockPercent: number;
  tintRgb: [number, number, number];
  tintHex: string;
  overlayOpacity: number;
  glareCutFactor: number;
  contrastBoost: string;
  idealEnvironment: string;
  spectralCurve: number[]; // Transmission % across 380nm -> 740nm in 40nm steps
}

const LENS_CHEMISTRIES: LensChemistry[] = [
  {
    id: 'tobacco',
    name: 'Tobacco Nylon (Amber Warmth)',
    category: 'Cat. 3 Solar Filter',
    vltPercent: 14,
    blueBlockPercent: 92,
    tintRgb: [138, 86, 36],
    tintHex: '#8A5624',
    overlayOpacity: 0.46,
    glareCutFactor: 0.86,
    contrastBoost: '+34% Terracotta & Limestone Separation',
    idealEnvironment: 'High Noon Tangier Courtyard & Open Ocean Horizon',
    spectralCurve: [0, 4, 9, 14, 18, 22, 26, 28, 25, 22],
  },
  {
    id: 'olive',
    name: 'Olive Pressed (Botanical Neutral)',
    category: 'Cat. 2 Mid-Light Filter',
    vltPercent: 26,
    blueBlockPercent: 78,
    tintRgb: [82, 95, 58],
    tintHex: '#525F3A',
    overlayOpacity: 0.36,
    glareCutFactor: 0.74,
    contrastBoost: '+21% True Natural Foliage Equilibrium',
    idealEnvironment: 'Mediterranean Afternoon Terrace & Shaded Arcade',
    spectralCurve: [0, 8, 22, 34, 30, 22, 18, 16, 15, 14],
  },
  {
    id: 'rif-blue',
    name: 'Deep Rif Blue (Indigo Wash)',
    category: 'Cat. 2 Coastal Anti-Flicker',
    vltPercent: 31,
    blueBlockPercent: 64,
    tintRgb: [32, 66, 114],
    tintHex: '#204272',
    overlayOpacity: 0.34,
    glareCutFactor: 0.69,
    contrastBoost: '+28% Sodium Glare & Sea Haze Crispness',
    idealEnvironment: 'Atlantic Dusk, Strait Ferry Deck & Canal Streets',
    spectralCurve: [0, 26, 42, 36, 28, 20, 15, 14, 16, 19],
  },
  {
    id: 'rose',
    name: 'Rose Twilight (Soft Diffusion)',
    category: 'Cat. 1 Editorial Optical',
    vltPercent: 48,
    blueBlockPercent: 52,
    tintRgb: [176, 86, 98],
    tintHex: '#B05662',
    overlayOpacity: 0.25,
    glareCutFactor: 0.52,
    contrastBoost: '+19% Interior-to-Evening Skin Luminance',
    idealEnvironment: 'Golden Hour Portraits, Atelier Interiors & Late Light',
    spectralCurve: [0, 18, 28, 34, 42, 54, 62, 64, 58, 52],
  },
  {
    id: 'black-onyx',
    name: 'Black Onyx (Zenith Equatorial)',
    category: 'Cat. 3 Deep Shield',
    vltPercent: 11,
    blueBlockPercent: 95,
    tintRgb: [22, 22, 24],
    tintHex: '#161618',
    overlayOpacity: 0.56,
    glareCutFactor: 0.91,
    contrastBoost: '+12% Uniform True-Neutrals Under 105k Lux',
    idealEnvironment: 'Zenith Solar Overhead & Direct Mirror Water Glare',
    spectralCurve: [0, 5, 10, 11, 11, 11, 12, 12, 11, 10],
  },
];

const FRAMES: EyewearFrame[] = [
  {
    id: 'saudade',
    name: 'Saudade',
    collection: 'Icon Collection',
    meaning: 'Portuguese — Reflective Longing for Places Left Behind',
    price: 395,
    acetateName: 'Black Japanese Cellulose',
    acetateHex: '#191716',
    acetateSecondaryHex: '#3A3533',
    lensName: 'Rose Nylon (Cat. 1)',
    lensId: 'rose',
    lensCategory: 'Category 1',
    lensWidthMm: 55,
    lensHeightMm: 31,
    bridgeMm: 20,
    frameWidthMm: 145,
    templeMm: 140,
    acetateGaugeMm: 8,
    hingeBarrels: 7,
    silhouetteType: 'rectangle',
    wornImage: '/assets/porttanger/frame-saudade-front.jpg',
    studioImage: '/assets/porttanger/studio-saudade.jpg',
    story:
      'Constructed with a deep rectangular brow profile and signature six-point stainless pins across both temples. Engineered to follow facial curvature with weighted rear temple balance.',
  },
  {
    id: 'mektoub',
    name: 'Mektoub',
    collection: 'Icon Collection',
    meaning: 'Arabic — "It Is Written"',
    price: 345,
    acetateName: 'Cardamom Translucent Acetate',
    acetateHex: '#3D482D',
    acetateSecondaryHex: '#63714D',
    lensName: 'Olive Nylon (Cat. 2)',
    lensId: 'olive',
    lensCategory: 'Category 2',
    lensWidthMm: 53,
    lensHeightMm: 30,
    bridgeMm: 24,
    frameWidthMm: 142,
    templeMm: 137,
    acetateGaugeMm: 8,
    hingeBarrels: 7,
    silhouetteType: 'rectangle',
    wornImage: '/assets/porttanger/frame-mektoub-front.jpg',
    studioImage: '/assets/porttanger/studio-mektoub.jpg',
    story:
      'Anchored by a generous 24mm saddle bridge and low-profile narrow rectangular geometry inspired by Tangier harbor silhouettes. Polished in translucent spiced cardamom cellulose.',
  },
  {
    id: 'leila',
    name: 'Leila',
    collection: 'Icon Collection',
    meaning: 'Arabic — "Night" & Sea Horizon Contrast',
    price: 395,
    acetateName: 'Carmesi Terracotta Acetate',
    acetateHex: '#6C221E',
    acetateSecondaryHex: '#9C3B31',
    lensName: 'Tobacco Nylon (Cat. 3)',
    lensId: 'tobacco',
    lensCategory: 'Category 3',
    lensWidthMm: 53,
    lensHeightMm: 34,
    bridgeMm: 19,
    frameWidthMm: 144,
    templeMm: 140,
    acetateGaugeMm: 8,
    hingeBarrels: 7,
    silhouetteType: 'cat-eye',
    wornImage: '/assets/porttanger/frame-leila-front.jpg',
    studioImage: '/assets/porttanger/studio-leila.jpg',
    story:
      'Captures coastal dusk contrast through angular outer temple bevels and deep Carmesi clay acetate milled in Sabae, paired with warm high-contrast Tobacco lenses.',
  },
  {
    id: 'gambia',
    name: 'Gambia',
    collection: 'Icon Collection',
    meaning: 'Homage to West African Hospitality & Unity',
    price: 375,
    acetateName: 'Cardamom Spiced Acetate',
    acetateHex: '#3A452C',
    acetateSecondaryHex: '#596844',
    lensName: 'Olive Nylon (Cat. 2)',
    lensId: 'olive',
    lensCategory: 'Category 2',
    lensWidthMm: 58,
    lensHeightMm: 38,
    bridgeMm: 12,
    frameWidthMm: 146,
    templeMm: 137,
    acetateGaugeMm: 8,
    hingeBarrels: 7,
    silhouetteType: 'aviator',
    wornImage: '/assets/porttanger/frame-gambia-front.jpg',
    studioImage: '/assets/porttanger/studio-gambia.jpg',
    story:
      'An expansive 58mm modified navigator shape with a narrow 12mm keyway bridge. Engineered for commanding cheekbone coverage without excessive temporal squeeze.',
  },
  {
    id: 'gray',
    name: 'Gray',
    collection: 'Icon Collection',
    meaning: 'Homage to Longstanding Studio Companions',
    price: 375,
    acetateName: 'Deep Rif Blue Acetate',
    acetateHex: '#18314F',
    acetateSecondaryHex: '#2A4E7A',
    lensName: 'Tobacco Nylon (Cat. 3)',
    lensId: 'tobacco',
    lensCategory: 'Category 3',
    lensWidthMm: 54,
    lensHeightMm: 37,
    bridgeMm: 21,
    frameWidthMm: 143,
    templeMm: 137,
    acetateGaugeMm: 8,
    hingeBarrels: 7,
    silhouetteType: 'aviator',
    wornImage: '/assets/porttanger/frame-gray-front.jpg',
    studioImage: '/assets/porttanger/studio-gray.jpg',
    story:
      'The inaugural Port Tanger optical frame combining old-school navigator curvature with cool Chefchaouen indigo acetate and rich caramel lens contrast.',
  },
  {
    id: 'quwa',
    name: 'Quwa',
    collection: 'Jadhb Collection',
    meaning: 'Arabic — "Quiet Steadfast Strength"',
    price: 375,
    acetateName: 'Cardamom Botanical Acetate',
    acetateHex: '#3B4A2E',
    acetateSecondaryHex: '#5F714C',
    lensName: 'Olive Nylon (Cat. 1)',
    lensId: 'olive',
    lensCategory: 'Category 1',
    lensWidthMm: 53,
    lensHeightMm: 36,
    bridgeMm: 18,
    frameWidthMm: 144,
    templeMm: 142,
    acetateGaugeMm: 8,
    hingeBarrels: 7,
    silhouetteType: 'oval',
    wornImage: '/assets/porttanger/frame-quwa-front.jpg',
    studioImage: '/assets/porttanger/studio-quwa.jpg',
    story:
      'Balances crisp structural acetate thickness with rounded inner apertures. Extended 142mm mastoid temple geometry secures comfort across all-day studio wear.',
  },
  {
    id: 'rumi',
    name: 'Rumi',
    collection: 'Jadhb Collection',
    meaning: '13th-Century Poet of Connection & Luminance',
    price: 375,
    acetateName: 'Bunaa Roasted Coffee Acetate',
    acetateHex: '#3B281E',
    acetateSecondaryHex: '#634332',
    lensName: 'Tobacco Nylon (Cat. 3)',
    lensId: 'tobacco',
    lensCategory: 'Category 3',
    lensWidthMm: 52,
    lensHeightMm: 32,
    bridgeMm: 19,
    frameWidthMm: 144,
    templeMm: 142,
    acetateGaugeMm: 8,
    hingeBarrels: 7,
    silhouetteType: 'cat-eye',
    wornImage: '/assets/porttanger/frame-rumi-front.jpg',
    studioImage: '/assets/porttanger/studio-rumi.jpg',
    story:
      'A disciplined upswept brow silhouette hand-carved from 8mm coffee-brown cellulose acetate with exposed functional rivets and custom seven-barrel hardware.',
  },
  {
    id: 'noor',
    name: 'Noor',
    collection: 'Jadhb Collection',
    meaning: 'Arabic — "Luminous Light"',
    price: 375,
    acetateName: 'Bunaa 10mm Heavy Cellulose',
    acetateHex: '#2E1F17',
    acetateSecondaryHex: '#593D2D',
    lensName: 'Tobacco Continuous Mono-Shield',
    lensId: 'tobacco',
    lensCategory: 'Category 3',
    lensWidthMm: 143,
    lensHeightMm: 42,
    bridgeMm: 8,
    frameWidthMm: 146,
    templeMm: 120,
    acetateGaugeMm: 10,
    hingeBarrels: 9,
    silhouetteType: 'mono-mask',
    wornImage: '/assets/porttanger/frame-noor-front.jpg',
    studioImage: '/assets/porttanger/studio-noor.jpg',
    story:
      'Uninterrupted continuous mono-lens architecture carved from thick 10mm Japanese acetate and anchored with industrial nine-barrel hinges for structural rigidity.',
  },
];

interface OpticalSlotOption {
  id: 'plano' | 'zeiss-sun' | 'blue-optical';
  label: string;
  spec: string;
  addonPrice: number;
  leadDays: number;
}

const OPTICAL_OPTIONS: OpticalSlotOption[] = [
  {
    id: 'plano',
    label: 'Original Sabae Nylon (Plano 0.00 D)',
    spec: '100% UVA/UVB Filtered • Anti-Scratch Factory Finish',
    addonPrice: 0,
    leadDays: 2,
  },
  {
    id: 'zeiss-sun',
    label: 'Carl Zeiss Custom Sun Prescription',
    spec: '1.60 High-Index Milled • Color-Matched To Factory Tint',
    addonPrice: 165,
    leadDays: 6,
  },
  {
    id: 'blue-optical',
    label: 'Clear Architectural Blue-Block Optical',
    spec: 'Internal Studio Lens • Anti-Reflective Mineral Coat',
    addonPrice: 140,
    leadDays: 5,
  },
];

interface SalonLocation {
  id: string;
  city: string;
  title: string;
  address: string;
  timing: string;
  extraCost: number;
}

const SALON_LOCATIONS: SalonLocation[] = [
  {
    id: 'worldwide-express',
    city: 'Global Dispatch',
    title: 'Direct Express Courier (Duties & Taxes Included)',
    address: 'Delivered in 2–7 Business Days • Insured Signature Release',
    timing: 'Dispatched from Amsterdam / Global Hub',
    extraCost: 0,
  },
  {
    id: 'amsterdam-hq',
    city: 'Amsterdam',
    title: 'Port Tanger Creative Studio Private Fitting',
    address: 'Hillegomstraat 12, Unit 0.10, 1058 LS Amsterdam, Netherlands',
    timing: 'Thermal Bridge Bending & Temple Balance Included',
    extraCost: 0,
  },
  {
    id: 'tangier-salon',
    city: 'Tangier',
    title: 'Tangier Medina Architectural Collector Salon',
    address: 'Petit Socco Terrace & Marshan Cliff Overlook, Tangier 90000',
    timing: 'Private Sunset Light Viewing & Custom Fit',
    extraCost: 0,
  },
  {
    id: 'paris-marais',
    city: 'Paris',
    title: 'Le Marais Editorial & Optical Lounge',
    address: 'Paris Showroom Appointment (Mon–Fri 10:00–18:00 UTC+1)',
    timing: 'Curated Archive Selection & PD Verification',
    extraCost: 0,
  },
];

interface VaultItem {
  key: string;
  frame: EyewearFrame;
  opticalOption: OpticalSlotOption;
  quantity: number;
}

// ============================================================================
// TACTILE WEB AUDIO CHIME UTILITY
// ============================================================================

function triggerOpticSound(enabled: boolean, freq = 520, duration = 0.045) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.35, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 150);
  } catch {
    // Graceful no-op when audio context is restricted
  }
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PortTangerPage() {
  // Engine 1: Cranial Bridge-Fit Simulator State
  const [selectedFrameId, setSelectedFrameId] = useState<string>('mektoub');
  const [cranialWidthMm, setCranialWidthMm] = useState<number>(142);
  const [pdMm, setPdMm] = useState<number>(64);
  const [bridgeHeight, setBridgeHeight] = useState<'low' | 'medium' | 'high'>('medium');
  const [simViewMode, setSimViewMode] = useState<'frontal' | 'topdown'>('frontal');

  // Engine 2: Mediterranean Sunset Refraction State
  const [selectedLensId, setSelectedLensId] = useState<LensChemistryId>('tobacco');
  const [solarHour, setSolarHour] = useState<number>(17.6); // 6.0 (dawn) -> 20.0 (dusk)
  const [splitScrubber, setSplitScrubber] = useState<number>(58); // 0 -> 100%

  // Collection & Card Display State
  const [activeCollectionFilter, setActiveCollectionFilter] = useState<
    'All' | 'Icon Collection' | 'Jadhb Collection'
  >('All');
  const [studioModeCards, setStudioModeCards] = useState<Record<string, boolean>>({});
  const [heroShowcaseIndex, setHeroShowcaseIndex] = useState<number>(0);

  // Audio & Drawer Allocation State
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([
    {
      key: 'mektoub-plano',
      frame: FRAMES[1], // Mektoub preloaded for fast checkout review
      opticalOption: OPTICAL_OPTIONS[0],
      quantity: 1,
    },
  ]);
  const [selectedOpticalId, setSelectedOpticalId] = useState<'plano' | 'zeiss-sun' | 'blue-optical'>('plano');
  const [selectedSalonId, setSelectedSalonId] = useState<string>('worldwide-express');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [allocationSuccess, setAllocationSuccess] = useState<{
    dossierId: string;
    total: number;
    salon: string;
    cranialCode: string;
  } | null>(null);

  // Canvas Refs
  const cranialCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const refractionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingSplit = useRef<boolean>(false);

  const activeFrame = useMemo(
    () => FRAMES.find((f) => f.id === selectedFrameId) || FRAMES[1],
    [selectedFrameId]
  );

  const activeLens = useMemo(
    () => LENS_CHEMISTRIES.find((l) => l.id === selectedLensId) || LENS_CHEMISTRIES[0],
    [selectedLensId]
  );

  // ============================================================================
  // MATHEMATICAL FIT CALCULATIONS FOR ENGINE 1
  // ============================================================================
  const cranialMetrics = useMemo(() => {
    const deltaWidth = activeFrame.frameWidthMm - cranialWidthMm;
    // Ideal temporal clearance is -2mm to +5mm difference between temple hinges and skull width
    const idealDiff = 2.0;
    const widthPenalty = Math.abs(deltaWidth - idealDiff) * 2.2;

    // Temporal squeeze force (gram-force): wider head on narrower frame increases inward pressure
    const rawPressure = 14.0 - deltaWidth * 0.65 + (activeFrame.acetateGaugeMm === 10 ? 2.4 : 0);
    const temporalPressureGf = Math.max(6.5, Math.min(28.5, Number(rawPressure.toFixed(1))));

    // Optical center decentering: half frame inter-lens distance minus half PD
    const frameCtoCMm =
      activeFrame.silhouetteType === 'mono-mask'
        ? 66
        : activeFrame.lensWidthMm + activeFrame.bridgeMm;
    const opticalDeltaMm = Number(((frameCtoCMm - pdMm) / 2).toFixed(1));

    // Bridge seating evaluation
    let bridgeStatus = 'Flush Arch Contact';
    let bridgePenalty = 0;
    if (bridgeHeight === 'low' && activeFrame.bridgeMm >= 21) {
      bridgeStatus = 'Wide Saddle Slide Margin (Adhesive Nosepad Recommended)';
      bridgePenalty = 9;
    } else if (bridgeHeight === 'high' && activeFrame.bridgeMm <= 14) {
      bridgeStatus = 'High Dorsal Lift (Narrow Keyway Pinch Risk)';
      bridgePenalty = 8;
    } else if (bridgeHeight === 'low' && activeFrame.bridgeMm <= 18) {
      bridgeStatus = 'Anchored Low-Bridge Lock (High Crest Contact)';
      bridgePenalty = 0;
    } else {
      bridgeStatus = 'Balanced Sabae Bridge Equilibrium';
      bridgePenalty = 1.5;
    }

    const matchScore = Math.max(
      71.0,
      Math.min(99.2, Number((98.5 - widthPenalty - Math.abs(opticalDeltaMm) * 1.2 - bridgePenalty).toFixed(1)))
    );

    const verdict =
      matchScore >= 90
        ? 'FLUSH ARCHITECTURAL FIT'
        : matchScore >= 82
        ? 'BALANCED ADAPTIVE FIT'
        : 'SLIGHT FIT OFFSET — STUDIO HEAT ADJUSTABLE';

    const templeFlexDeg = Number((deltaWidth < 0 ? Math.abs(deltaWidth) * 0.45 : 0.8).toFixed(1));

    return {
      matchScore,
      verdict,
      temporalPressureGf,
      opticalDeltaMm,
      bridgeStatus,
      templeFlexDeg,
      deltaWidth,
    };
  }, [activeFrame, cranialWidthMm, pdMm, bridgeHeight]);

  // ============================================================================
  // ENGINE 1: 60 FPS MILLIMETRIC CRANIAL BRIDGE-FIT CANVAS RENDERER
  // ============================================================================
  useEffect(() => {
    const canvas = cranialCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let tick = 0;

    const render = () => {
      tick += 0.03;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const w = rect.width;
      const h = rect.height;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Limestone architectural blueprint canvas fill
      ctx.fillStyle = '#EFE9DD';
      ctx.fillRect(0, 0, w, h);

      // Subtle architectural millimeter grid
      const gridStep = 24;
      ctx.strokeStyle = 'rgba(25, 22, 20, 0.055)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Crosshairs & Origin Axis
      const cx = w / 2;
      const cy = h / 2 + 6;
      ctx.strokeStyle = 'rgba(184, 74, 39, 0.25)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, 18);
      ctx.lineTo(cx, h - 18);
      ctx.moveTo(24, cy);
      ctx.lineTo(w - 24, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Scale factor: 1 mm = pxScale px
      const pxPerMm = Math.min(w, h) / 185;

      if (simViewMode === 'frontal') {
        const halfHeadW = (cranialWidthMm / 2) * pxPerMm;
        const headH = halfHeadW * 1.42;

        // Subtle anatomical facial & nasal bridge wireframe
        ctx.strokeStyle = 'rgba(25, 22, 20, 0.22)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 6, halfHeadW, headH, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Zygomatic cheekbone measurement line
        ctx.strokeStyle = 'rgba(23, 52, 82, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - halfHeadW, cy + 62);
        ctx.lineTo(cx + halfHeadW, cy + 62);
        ctx.stroke();

        // Nose bridge arch geometry based on bridgeHeight state
        const bridgeNarrowW = bridgeHeight === 'high' ? 8 * pxPerMm : bridgeHeight === 'medium' ? 11 * pxPerMm : 14 * pxPerMm;
        const bridgeBaseY = bridgeHeight === 'high' ? cy - 22 : bridgeHeight === 'medium' ? cy - 14 : cy - 5;
        ctx.strokeStyle = 'rgba(25, 22, 20, 0.32)';
        ctx.beginPath();
        ctx.moveTo(cx - bridgeNarrowW, bridgeBaseY);
        ctx.quadraticCurveTo(cx, bridgeBaseY - 12, cx + bridgeNarrowW, bridgeBaseY);
        ctx.lineTo(cx + bridgeNarrowW * 1.45, cy + 44 * pxPerMm * 0.55);
        ctx.stroke();

        // Pupillary markers at exact PD distance
        const halfPdPx = (pdMm / 2) * pxPerMm;
        const pulseRadius = 2.8 + Math.sin(tick * 2) * 0.6;
        [-1, 1].forEach((dir) => {
          const px = cx + dir * halfPdPx;
          const py = cy - 4;
          ctx.fillStyle = '#191614';
          ctx.beginPath();
          ctx.arc(px, py, 4.2, 0, Math.PI * 2);
          ctx.fill();

          // Cyan optical centering target ring
          ctx.strokeStyle = '#B84A27';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(px, py, 9 + pulseRadius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(184, 74, 39, 0.65)';
          ctx.beginPath();
          ctx.moveTo(px - 14, py);
          ctx.lineTo(px + 14, py);
          ctx.moveTo(px, py - 14);
          ctx.lineTo(px, py + 14);
          ctx.stroke();
        });

        // Draw Scaled Port Tanger Acetate Frame Overlay
        const totalFramePx = activeFrame.frameWidthMm * pxPerMm;
        const bridgePx = activeFrame.bridgeMm * pxPerMm;
        const lensWPx = activeFrame.silhouetteType === 'mono-mask' ? totalFramePx * 0.88 : activeFrame.lensWidthMm * pxPerMm;
        const lensHPx = activeFrame.lensHeightMm * pxPerMm;
        const acetateBevelPx = activeFrame.acetateGaugeMm * 0.72 * pxPerMm;

        // Vertical position slightly reflects bridge seating
        const seatShiftY =
          bridgeHeight === 'low' && activeFrame.bridgeMm >= 21
            ? 8
            : bridgeHeight === 'high' && activeFrame.bridgeMm <= 14
            ? -8
            : 0;
        const frameCenterY = cy - 4 + seatShiftY;

        // Helper for Six-Point Arrow Pins (3 left + 3 right)
        const drawSixPointEmblem = (x: number, y: number, flipX: number) => {
          const dotOffsets = [
            [0, -4.5],
            [0, 0],
            [0, 4.5],
            [flipX * 4.5, -2.2],
            [flipX * 4.5, 2.2],
            [flipX * 8.5, 0],
          ];
          ctx.fillStyle = '#EAE4D8';
          dotOffsets.forEach(([ox, oy]) => {
            ctx.beginPath();
            ctx.arc(x + ox, y + oy, 1.35, 0, Math.PI * 2);
            ctx.fill();
          });
        };

        const lensObj = LENS_CHEMISTRIES.find((l) => l.id === selectedLensId) || LENS_CHEMISTRIES[0];

        if (activeFrame.silhouetteType === 'mono-mask') {
          const maskW = totalFramePx;
          const maskH = lensHPx + acetateBevelPx * 1.9;
          const left = cx - maskW / 2;
          const top = frameCenterY - maskH / 2;

          // Heavy 10mm acetate shield body
          ctx.fillStyle = activeFrame.acetateHex;
          ctx.beginPath();
          ctx.roundRect(left, top, maskW, maskH, 16);
          ctx.fill();

          // Subtle bevel specular catchlight
          ctx.strokeStyle = 'rgba(255,255,255,0.22)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Continuous Shield Aperture
          const innerMargin = acetateBevelPx * 1.15;
          ctx.fillStyle = `rgba(${lensObj.tintRgb[0]}, ${lensObj.tintRgb[1]}, ${lensObj.tintRgb[2]}, ${Math.min(0.84, lensObj.overlayOpacity + 0.25)})`;
          ctx.beginPath();
          ctx.roundRect(
            left + innerMargin,
            top + innerMargin * 0.85,
            maskW - innerMargin * 2,
            maskH - innerMargin * 1.7,
            10
          );
          ctx.fill();

          drawSixPointEmblem(left + 12, frameCenterY - maskH * 0.12, -1);
          drawSixPointEmblem(left + maskW - 12, frameCenterY - maskH * 0.12, 1);
        } else {
          const leftEndX = cx - totalFramePx / 2;
          const rightEndX = cx + totalFramePx / 2;

          // Sculpted continuous acetate brow bar + rims
          const outerTop = frameCenterY - lensHPx / 2 - acetateBevelPx;
          const outerH = lensHPx + acetateBevelPx * 2;
          const noseArcY = frameCenterY - lensHPx * 0.12;

          ctx.fillStyle = activeFrame.acetateHex;
          ctx.beginPath();
          // Outer silhouette wrap
          const rCorner =
            activeFrame.silhouetteType === 'cat-eye'
              ? 8
              : activeFrame.silhouetteType === 'aviator'
              ? 18
              : 11;

          // Draw left rim + bridge + right rim smoothly
          const leftInnerX = cx - bridgePx / 2;
          const rightInnerX = cx + bridgePx / 2;
          const leftOuterX = leftInnerX - lensWPx - acetateBevelPx * 1.6;
          const rightOuterX = rightInnerX + lensWPx + acetateBevelPx * 1.6;

          ctx.roundRect(leftOuterX, outerTop, lensWPx + acetateBevelPx * 1.9, outerH, rCorner);
          ctx.roundRect(rightInnerX - acetateBevelPx * 0.3, outerTop, lensWPx + acetateBevelPx * 1.9, outerH, rCorner);
          ctx.fill();

          // Keyhole / Saddle Bridge Bar
          ctx.fillRect(leftInnerX - 2, noseArcY - acetateBevelPx * 0.9, bridgePx + 4, acetateBevelPx * 1.4);

          // Extended endpieces to frameWidth
          ctx.fillRect(leftEndX, frameCenterY - outerH * 0.34, leftOuterX - leftEndX + 8, outerH * 0.48);
          ctx.fillRect(rightOuterX - 8, frameCenterY - outerH * 0.34, rightEndX - rightOuterX + 8, outerH * 0.48);

          // Translucent Nylon Lenses inside rims
          const drawLens = (xCenter: number) => {
            const lx = xCenter - lensWPx / 2;
            const ly = frameCenterY - lensHPx / 2;
            ctx.save();
            ctx.beginPath();
            if (activeFrame.silhouetteType === 'aviator') {
              ctx.roundRect(lx, ly, lensWPx, lensHPx, [10, 10, 22, 22]);
            } else if (activeFrame.silhouetteType === 'oval') {
              ctx.roundRect(lx, ly, lensWPx, lensHPx, lensHPx / 2);
            } else {
              ctx.roundRect(lx, ly, lensWPx, lensHPx, 7);
            }
            ctx.fillStyle = `rgba(${lensObj.tintRgb[0]}, ${lensObj.tintRgb[1]}, ${lensObj.tintRgb[2]}, ${lensObj.overlayOpacity + 0.18})`;
            ctx.fill();

            // Animated Diagonal Coastal Specular Reflection across Nylon Lens
            const grad = ctx.createLinearGradient(lx, ly, lx + lensWPx, ly + lensHPx);
            const shift = (Math.sin(tick * 0.8) + 1) * 0.15;
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(0.35 + shift, 'rgba(255,255,255,0.22)');
            grad.addColorStop(0.5 + shift, 'rgba(255,255,255,0)');
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
          };

          const leftLensCx = cx - bridgePx / 2 - lensWPx / 2;
          const rightLensCx = cx + bridgePx / 2 + lensWPx / 2;
          drawLens(leftLensCx);
          drawLens(rightLensCx);

          // Signature Six-Point Steel Rivets on outer endpieces
          drawSixPointEmblem(leftEndX + 12, frameCenterY - outerH * 0.1, -1);
          drawSixPointEmblem(rightEndX - 12, frameCenterY - outerH * 0.1, 1);
        }

        // Top Metric Dimension Brackets
        const leftFrameBound = cx - totalFramePx / 2;
        const rightFrameBound = cx + totalFramePx / 2;
        const bracketY = cy - lensHPx / 2 - 42;
        ctx.strokeStyle = '#191614';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftFrameBound, bracketY);
        ctx.lineTo(rightFrameBound, bracketY);
        ctx.moveTo(leftFrameBound, bracketY - 5);
        ctx.lineTo(leftFrameBound, bracketY + 5);
        ctx.moveTo(rightFrameBound, bracketY - 5);
        ctx.lineTo(rightFrameBound, bracketY + 5);
        ctx.stroke();

        ctx.fillStyle = '#191614';
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(
          `TOTAL FRAME WIDTH: ${activeFrame.frameWidthMm}MM  |  CRANIUM: ${cranialWidthMm}MM`,
          cx,
          bracketY - 10
        );
      } else {
        // TOP-DOWN CRANIAL WRAP PROFILE (142mm Temple Length & 7-Barrel Hinge Geometry)
        const halfHeadW = (cranialWidthMm / 2) * pxPerMm;
        const headDepth = halfHeadW * 1.24;

        // Dorsal cranium contour
        ctx.strokeStyle = 'rgba(25, 22, 20, 0.25)';
        ctx.fillStyle = 'rgba(25, 22, 20, 0.04)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 28, halfHeadW, headDepth, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Forehead & Nasal dorsal peak facing UP toward viewer top
        const browY = cy + 28 - headDepth;
        const frameW = activeFrame.frameWidthMm * pxPerMm;
        const leftHingeX = cx - frameW / 2;
        const rightHingeX = cx + frameW / 2;
        const hingeY = browY - 14;
        const templeLenPx = activeFrame.templeMm * pxPerMm * 0.92;

        // Sabae Curved 8mm-10mm One-Front Wrap Arc
        ctx.strokeStyle = activeFrame.acetateHex;
        ctx.lineWidth = activeFrame.acetateGaugeMm * 0.95;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(leftHingeX, hingeY);
        ctx.quadraticCurveTo(cx, hingeY - 18, rightHingeX, hingeY);
        ctx.stroke();

        // Flexed Left & Right Acetate Temples wrapping around temporal skull points
        const flexOffset = cranialMetrics.deltaWidth < 0 ? Math.abs(cranialMetrics.deltaWidth) * 0.65 : -2.5;
        const temporalEndLeftX = cx - halfHeadW * 0.94;
        const temporalEndRightX = cx + halfHeadW * 0.94;

        ctx.strokeStyle = activeFrame.acetateHex;
        ctx.lineWidth = 5.5;
        // Left temple arm
        ctx.beginPath();
        ctx.moveTo(leftHingeX, hingeY);
        ctx.bezierCurveTo(
          leftHingeX - 4,
          hingeY + templeLenPx * 0.4,
          temporalEndLeftX - flexOffset,
          hingeY + templeLenPx * 0.72,
          temporalEndLeftX + 6,
          hingeY + templeLenPx
        );
        ctx.stroke();

        // Right temple arm
        ctx.beginPath();
        ctx.moveTo(rightHingeX, hingeY);
        ctx.bezierCurveTo(
          rightHingeX + 4,
          hingeY + templeLenPx * 0.4,
          temporalEndRightX + flexOffset,
          hingeY + templeLenPx * 0.72,
          temporalEndRightX - 6,
          hingeY + templeLenPx
        );
        ctx.stroke();

        // Draw 7-Barrel / 9-Barrel Hinge Metal Pins at Hinges
        [leftHingeX, rightHingeX].forEach((hx) => {
          ctx.fillStyle = '#C29B38';
          ctx.beginPath();
          ctx.arc(hx, hingeY, 5.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#191614';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });

        // Temporal contact stress heat halos
        const stressColor =
          cranialMetrics.temporalPressureGf > 20
            ? 'rgba(184, 74, 39, 0.45)'
            : 'rgba(46, 108, 72, 0.35)';
        const haloR = 11 + Math.sin(tick * 2.5) * 3;
        [temporalEndLeftX, temporalEndRightX].forEach((tx) => {
          ctx.fillStyle = stressColor;
          ctx.beginPath();
          ctx.arc(tx, hingeY + templeLenPx * 0.68, haloR, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = '#191614';
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(
          `TOP-DOWN SABAE WRAP PROFILE  |  ${activeFrame.hingeBarrels}-BARREL HINGE  |  ${activeFrame.templeMm}MM TEMPLE`,
          cx,
          h - 18
        );
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [activeFrame, cranialWidthMm, pdMm, bridgeHeight, simViewMode, selectedLensId, cranialMetrics]);

  // ============================================================================
  // ENGINE 2: 60 FPS MEDITERRANEAN SUNSET LIGHT-REFRACTION CANVAS RENDERER
  // ============================================================================
  useEffect(() => {
    const canvas = refractionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let waveTime = 0;

    const render = () => {
      waveTime += 0.024;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const w = rect.width;
      const h = rect.height;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const horizonY = h * 0.54;
      const splitX = (splitScrubber / 100) * w;

      // Normalized Sun progression (6.0 = low dawn, 13.0 = high noon, 19.5 = twilight dusk)
      const noonProximity = 1 - Math.min(1, Math.abs(solarHour - 13) / 7); // 0 to 1
      const isSunset = solarHour >= 16;
      const sunY = horizonY - 22 - noonProximity * (horizonY * 0.68);
      const sunX = w * (0.28 + ((solarHour - 6) / 14) * 0.44);

      const drawCoastalScene = (filtered: boolean) => {
        // 1. Sky Atmosphere Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
        if (noonProximity > 0.65) {
          skyGrad.addColorStop(0, filtered ? '#2A4E74' : '#73A6DC');
          skyGrad.addColorStop(0.65, filtered ? '#5D7D94' : '#C8E1F6');
          skyGrad.addColorStop(1, filtered ? '#9B9588' : '#FFF8EB');
        } else if (isSunset) {
          skyGrad.addColorStop(0, filtered ? '#1D2948' : '#31446C');
          skyGrad.addColorStop(0.55, filtered ? '#8C4E39' : '#D97C4F');
          skyGrad.addColorStop(1, filtered ? '#C78A52' : '#FFE0A3');
        } else {
          skyGrad.addColorStop(0, filtered ? '#324B64' : '#7D9AB6');
          skyGrad.addColorStop(1, filtered ? '#9E8C75' : '#EFE1CE');
        }
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, horizonY);

        // 2. Solar Disk & Halation Bloom (Naked eye experiences wide harsh UV glare scatter)
        const bloomRadius = filtered ? 54 : 118 + noonProximity * 45;
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, bloomRadius);
        sunGrad.addColorStop(0, '#FFFFFF');
        sunGrad.addColorStop(
          0.22,
          filtered
            ? `rgba(255, 226, 175, ${0.65 - activeLens.glareCutFactor * 0.35})`
            : 'rgba(255, 248, 220, 0.92)'
        );
        sunGrad.addColorStop(1, 'rgba(255, 220, 170, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, bloomRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = filtered ? 'rgba(255, 244, 214, 0.95)' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(sunX, sunY, filtered ? 14 : 17, 0, Math.PI * 2);
        ctx.fill();

        // 3. Distant Moroccan Rif & Strait Coastline Silhouette
        ctx.fillStyle = filtered ? '#2A333E' : '#586A7D';
        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(0, horizonY - 26);
        ctx.quadraticCurveTo(w * 0.18, horizonY - 52, w * 0.42, horizonY - 14);
        ctx.lineTo(w * 0.68, horizonY - 6);
        ctx.quadraticCurveTo(w * 0.85, horizonY - 34, w, horizonY - 18);
        ctx.lineTo(w, horizonY);
        ctx.closePath();
        ctx.fill();

        // 4. Strait of Gibraltar Sea Surface
        const seaGrad = ctx.createLinearGradient(0, horizonY, 0, h);
        seaGrad.addColorStop(0, filtered ? '#173452' : '#2E5984');
        seaGrad.addColorStop(1, filtered ? '#0C1B2A' : '#183754');
        ctx.fillStyle = seaGrad;
        ctx.fillRect(0, horizonY, w, h - horizonY);

        // 5. Real-Time 60 FPS Specular Glitter Path on Water
        const waveRows = 22;
        for (let r = 0; r < waveRows; r++) {
          const depthRatio = r / waveRows;
          const rowY = horizonY + 4 + Math.pow(depthRatio, 1.35) * (h - horizonY - 10);
          const spreadHalfW = 24 + depthRatio * 145;
          const streakCount = Math.floor(6 + depthRatio * 10);

          for (let s = 0; s < streakCount; s++) {
            const phase = Math.sin(waveTime * 1.6 + r * 0.9 + s * 1.7);
            const sx = sunX + phase * spreadHalfW * 0.85;
            const sw = (8 + depthRatio * 24) * (0.65 + 0.35 * Math.cos(waveTime + s));
            const sh = 1.5 + depthRatio * 2.2;

            // Naked eye gets harsh blown-out pure white glint; filtered cuts spike glare cleanly
            const alpha = filtered
              ? Math.max(0.12, (1 - activeLens.glareCutFactor * 0.72) * (0.45 + 0.55 * (phase + 1) / 2))
              : 0.75 + 0.25 * Math.abs(phase);

            ctx.fillStyle = filtered
              ? `rgba(255, 224, 168, ${alpha.toFixed(2)})`
              : `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
            ctx.fillRect(sx - sw / 2, rowY, sw, sh);
          }
        }

        // 6. Foreground Tangier Terracotta Medina Parapet Silhouette
        ctx.fillStyle = filtered ? '#612D1C' : '#9B5A42';
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, h - 42);
        ctx.lineTo(w * 0.22, h - 42);
        ctx.lineTo(w * 0.24, h - 22);
        ctx.lineTo(w * 0.72, h - 22);
        ctx.lineTo(w * 0.75, h - 54);
        ctx.lineTo(w, h - 54);
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        // 7. Nylon Spectral Filter Layer for Filtered Half
        if (filtered) {
          ctx.fillStyle = `rgba(${activeLens.tintRgb[0]}, ${activeLens.tintRgb[1]}, ${activeLens.tintRgb[2]}, ${activeLens.overlayOpacity})`;
          ctx.fillRect(0, 0, w, h);
        } else {
          // Subtle unfiltered blue-ray harshness wash on naked-eye side
          ctx.fillStyle = `rgba(255, 255, 255, ${(0.08 + noonProximity * 0.14).toFixed(2)})`;
          ctx.fillRect(0, 0, w, h);
        }
      };

      // Render Unfiltered Left Field
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, h);
      ctx.clip();
      drawCoastalScene(false);
      ctx.restore();

      // Render Port Tanger Nylon Filtered Right Field
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, w - splitX, h);
      ctx.clip();
      drawCoastalScene(true);
      ctx.restore();

      // Divider vertical rule & tactile optical handle
      ctx.strokeStyle = '#F6F2EA';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, h);
      ctx.stroke();

      ctx.fillStyle = '#191614';
      ctx.beginPath();
      ctx.arc(splitX, h / 2, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#F6F2EA';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Arrow indicators inside scrubber knob
      ctx.fillStyle = '#F6F2EA';
      ctx.font = '700 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('‹›', splitX, h / 2 + 0.5);

      // Field Tags
      ctx.font = '600 10px "JetBrains Mono", monospace';
      ctx.textBaseline = 'top';
      if (splitX > 120) {
        ctx.fillStyle = 'rgba(25, 22, 20, 0.78)';
        ctx.fillRect(14, 14, 150, 24);
        ctx.fillStyle = '#F6F2EA';
        ctx.textAlign = 'left';
        ctx.fillText('NAKED EYE // UNFILTERED', 22, 21);
      }
      if (w - splitX > 140) {
        ctx.fillStyle = 'rgba(25, 22, 20, 0.86)';
        ctx.fillRect(w - 208, 14, 194, 24);
        ctx.fillStyle = '#F6F2EA';
        ctx.textAlign = 'right';
        ctx.fillText(`${activeLens.name.split(' ')[0].toUpperCase()} NYLON (${activeLens.vltPercent}% VLT)`, w - 22, 21);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [activeLens, solarHour, splitScrubber]);

  // Pointer drag handler for Split Scrubber on Engine 2 Canvas
  const handleRefractionPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingSplit.current && e.buttons === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitScrubber(Math.max(8, Math.min(92, Math.round(pct))));
  }, []);

  // ============================================================================
  // CART & VAULT ACTIONS
  // ============================================================================
  const allocateFrameToVault = (
    frame: EyewearFrame,
    optId: 'plano' | 'zeiss-sun' | 'blue-optical' = selectedOpticalId
  ) => {
    triggerOpticSound(audioEnabled, 580, 0.055);
    const opticalOption = OPTICAL_OPTIONS.find((o) => o.id === optId) || OPTICAL_OPTIONS[0];
    const key = `${frame.id}-${opticalOption.id}`;

    setVaultItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) => (item.key === key ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { key, frame, opticalOption, quantity: 1 }];
    });

    setAllocationSuccess(null);
    setDrawerOpen(true);
  };

  const updateVaultQty = (key: string, delta: number) => {
    triggerOpticSound(audioEnabled, delta > 0 ? 640 : 410, 0.04);
    setVaultItems((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const vaultSummary = useMemo(() => {
    const count = vaultItems.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = vaultItems.reduce(
      (acc, i) => acc + (i.frame.price + i.opticalOption.addonPrice) * i.quantity,
      0
    );
    const pairingDiscount = count >= 2 ? Math.round(subtotal * 0.1) : 0;
    const finalTotal = subtotal - pairingDiscount;
    return { count, subtotal, pairingDiscount, finalTotal };
  }, [vaultItems]);

  const handleLoadIntoFitSim = (frame: EyewearFrame) => {
    triggerOpticSound(audioEnabled, 510, 0.05);
    setSelectedFrameId(frame.id);
    setSelectedLensId(frame.lensId);
    const el = document.getElementById('cranial');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCompleteAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (vaultItems.length === 0) return;

    triggerOpticSound(audioEnabled, 740, 0.09);
    const salon = SALON_LOCATIONS.find((s) => s.id === selectedSalonId) || SALON_LOCATIONS[0];
    const dossierId = `PT-${new Date().getFullYear()}-SABAE-${Math.floor(1000 + Math.random() * 8999)}`;
    const cranialCode = `${cranialWidthMm}MM-PD${pdMm}-${bridgeHeight.toUpperCase()}`;

    setAllocationSuccess({
      dossierId,
      total: vaultSummary.finalTotal,
      salon: salon.title,
      cranialCode,
    });

    confetti({
      particleCount: 70,
      spread: 64,
      origin: { y: 0.72 },
      colors: ['#B84A27', '#173452', '#C98A3B', '#191614'],
    });
  };

  const filteredFrames = useMemo(() => {
    if (activeCollectionFilter === 'All') return FRAMES;
    return FRAMES.filter((f) => f.collection === activeCollectionFilter);
  }, [activeCollectionFilter]);

  const solarLabel = useMemo(() => {
    const hrs = Math.floor(solarHour);
    const mins = Math.round((solarHour - hrs) * 60);
    const padded = `${hrs.toString().padStart(2, '0')}:${mins === 60 ? '00' : mins.toString().padStart(2, '0')}`;
    const lux = Math.round(
      14000 + Math.max(0, 1 - Math.abs(solarHour - 13) / 6.5) * 91000
    ).toLocaleString();
    return { timeStr: padded, lux };
  }, [solarHour]);

  const HERO_CAROUSEL = [
    {
      src: '/assets/porttanger/campaign-hero-portrait.jpg',
      tag: 'NOOR 10MM CELLULOSE MONO-SHIELD // CARMESI EDITION',
    },
    {
      src: '/assets/porttanger/campaign-bw-study-1.jpg',
      tag: 'SAUDADE SIX-POINT HARDWARE STUDY // SILVER GELATIN',
    },
    {
      src: '/assets/porttanger/frame-mektoub-front.jpg',
      tag: 'MEKTOUB 53□24-137 // CARDAMOM ACETATE × OLIVE LENS',
    },
  ];

  // ============================================================================
  // RENDER ARCHITECTURE
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#F6F2EA] text-[#191614] selection:bg-[#B84A27] selection:text-[#F6F2EA]">
      {/* 01 // ARCHITECTURAL STICKY HEADER & BBC TERMINAL NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-[#191614]/15 bg-[#F6F2EA]/92 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo + BBC Back Navigation */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="min-h-[48px] min-w-[48px] px-3 flex items-center gap-2 border border-[#191614]/20 hover:border-[#191614] hover:bg-[#191614] hover:text-[#F6F2EA] transition-colors font-mono text-[11px] uppercase tracking-widest"
              aria-label="Return to Billy Benjamin Consulting Index"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">BBC Index</span>
            </Link>

            <div className="flex items-center gap-3">
              {/* Emblematic Six-Point Arrow Pins SVG */}
              <div
                className="w-10 h-10 border border-[#191614]/20 bg-[#EFE8DA] flex items-center justify-center shrink-0"
                title="Six-Point Arrow Hardware: Nostalgia, Tradition, Craftsmanship • Hope, Design, Culture"
              >
                <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
                  <circle cx="3" cy="3" r="1.4" fill="#191614" />
                  <circle cx="3" cy="7" r="1.4" fill="#191614" />
                  <circle cx="3" cy="11" r="1.4" fill="#191614" />
                  <circle cx="7" cy="5" r="1.4" fill="#191614" />
                  <circle cx="7" cy="9" r="1.4" fill="#191614" />
                  <circle cx="11" cy="7" r="1.4" fill="#B84A27" />
                  <circle cx="15" cy="7" r="1.4" fill="#B84A27" />
                  <circle cx="19" cy="5" r="1.4" fill="#191614" />
                  <circle cx="19" cy="9" r="1.4" fill="#191614" />
                  <circle cx="23" cy="3" r="1.4" fill="#191614" />
                  <circle cx="23" cy="7" r="1.4" fill="#191614" />
                  <circle cx="23" cy="11" r="1.4" fill="#191614" />
                </svg>
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-semibold tracking-tight leading-none"
                  style={{ fontFamily: 'var(--font-pt-serif), serif' }}
                >
                  PORT TANGER
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#191614]/65 mt-0.5">
                  Tangier × Amsterdam × Sabae
                </p>
              </div>
            </div>
          </div>

          {/* Center Anchor Navigation */}
          <nav className="hidden xl:flex items-center gap-2">
            {[
              { href: '#cranial', label: '01 / Cranial Bridge Sim' },
              { href: '#refraction', label: '02 / Sunset Refraction' },
              { href: '#collection', label: '03 / Sabae Archive' },
              { href: '#heritage', label: '04 / 6-Point Emblem' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-[48px] px-4 flex items-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#191614]/75 hover:text-[#B84A27] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Audio Toggle + Live Vault Allocation Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setAudioEnabled((v) => !v)}
              className="min-h-[48px] min-w-[48px] px-3 flex items-center justify-center border border-[#191614]/20 hover:border-[#191614] bg-[#EFE8DA] transition-colors"
              aria-label={audioEnabled ? 'Mute tactile acoustic chime' : 'Enable tactile acoustic chime'}
              title="Toggle Tactile Optical Audio"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
            </button>

            <button
              type="button"
              onClick={() => {
                triggerOpticSound(audioEnabled, 600, 0.045);
                setDrawerOpen(true);
              }}
              className="min-h-[48px] px-4 sm:px-6 flex items-center gap-3 bg-[#191614] text-[#F6F2EA] hover:bg-[#B84A27] transition-colors font-mono text-xs uppercase tracking-[0.16em]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Optical Vault</span>
              <span className="px-1.5 py-0.5 bg-[#F6F2EA]/15 text-[11px]">
                {vaultSummary.count} • ${vaultSummary.finalTotal}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 02 // MEDITERRANEAN ARCHITECTURAL HERO SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 lg:py-16 border-b border-[#191614]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Cols: Editorial Proposition + Above-the-Fold Trust */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex flex-wrap items-center gap-3 px-3.5 py-1.5 bg-[#EFE8DA] border border-[#191614]/15 font-mono text-[11px] uppercase tracking-[0.18em]">
                <span className="w-2 h-2 rounded-full bg-[#B84A27]" />
                <span>Handcrafted In Sabae, Japan • 8mm–10mm Cellulose Acetate</span>
              </div>

              <h1
                className="text-4xl sm:text-6xl xl:text-[68px] font-medium leading-[1.03] tracking-tight text-[#191614]"
                style={{ fontFamily: 'var(--font-pt-serif), serif' }}
              >
                Where The Mediterranean Meets The Atlantic — Contoured For Your{' '}
                <span className="italic text-[#B84A27]">Exact Cranial Architecture.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#191614]/75 max-w-2xl leading-relaxed">
                Co-founded by Bilal Fellah, Port Tanger translates Tangier coastal dusk, North
                African storytelling, and Sabae hand-finished optics into heavy-gauge sculptural
                eyewear. Calibrate nasal bridge height, pupil alignment, and nylon refraction tints
                before committing a single dollar.
              </p>
            </div>

            {/* UX Law 3: Above-the-Fold Social Proof & Spec Trust Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-[#191614]/15 py-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#191614]/55">
                  Collector Score
                </span>
                <span className="font-mono text-sm font-bold">4.94★ / 5.0 (1,420 Pairs)</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#191614]/55">
                  Optical Filter Rating
                </span>
                <span className="font-mono text-sm font-bold">100% UVA/UVB Nylon (400nm)</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#191614]/55">
                  Landed Price Transparency
                </span>
                <span className="font-mono text-sm font-bold">Duties & Express Ship $0</span>
              </div>
            </div>

            {/* Dual Action CTAs >= 48px Height */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#cranial"
                onClick={() => triggerOpticSound(audioEnabled, 520, 0.05)}
                className="min-h-[54px] px-7 flex items-center justify-center gap-3 bg-[#B84A27] hover:bg-[#9C3B1C] text-[#F6F2EA] font-mono text-xs uppercase tracking-[0.18em] transition-colors"
              >
                <Sliders className="w-4 h-4" />
                <span>Calibrate Cranial Bridge Fit</span>
              </a>

              <a
                href="#refraction"
                onClick={() => triggerOpticSound(audioEnabled, 560, 0.05)}
                className="min-h-[54px] px-7 flex items-center justify-center gap-3 border border-[#191614] hover:bg-[#191614] hover:text-[#F6F2EA] font-mono text-xs uppercase tracking-[0.18em] transition-colors"
              >
                <Sun className="w-4 h-4" />
                <span>Preview Sunset Lens Refraction</span>
              </a>
            </div>
          </div>

          {/* Right 5 Cols: Editorial Lookbook Frame + Carousel Switcher */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#191614]/20 bg-[#191614]">
              <img
                src={HERO_CAROUSEL[heroShowcaseIndex].src}
                alt={HERO_CAROUSEL[heroShowcaseIndex].tag}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#F6F2EA]/95 backdrop-blur-sm border border-[#191614]/20 px-4 py-3 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#191614]">
                  {HERO_CAROUSEL[heroShowcaseIndex].tag}
                </span>
                <a
                  href="#collection"
                  className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#B84A27] flex items-center gap-1 hover:underline"
                >
                  Inspect <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Thumbnail Selector (>=48px tap targets) */}
            <div className="grid grid-cols-3 gap-2">
              {HERO_CAROUSEL.map((slide, idx) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => {
                    triggerOpticSound(audioEnabled, 480 + idx * 45, 0.04);
                    setHeroShowcaseIndex(idx);
                  }}
                  className={`min-h-[48px] px-2 py-2 border font-mono text-[10px] uppercase tracking-wider transition-all ${
                    heroShowcaseIndex === idx
                      ? 'border-[#191614] bg-[#191614] text-[#F6F2EA]'
                      : 'border-[#191614]/20 bg-[#EFE8DA] text-[#191614]/75 hover:border-[#191614]'
                  }`}
                >
                  0{idx + 1} / Study
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 // ENGINE I: MILLIMETRIC CRANIAL BRIDGE-FIT SIMULATOR */}
      <section id="cranial" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 lg:py-20 border-b border-[#191614]/15">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B84A27]">
              Engine 01 // Zero-Hesitation Optical Biomechanics
            </p>
            <h2
              className="text-3xl sm:text-5xl font-medium tracking-tight"
              style={{ fontFamily: 'var(--font-pt-serif), serif' }}
            >
              Millimetric Cranial Bridge-Fit Simulator
            </h2>
            <p className="text-sm sm:text-base text-[#191614]/75 leading-relaxed">
              Contoured 8mm–10mm Japanese cellulose cannot be bent lightly by casual wearers. Test
              any Port Tanger silhouette against your temporal head breadth, inter-pupillary
              distance, and dorsal bridge crest height before checkout.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                triggerOpticSound(audioEnabled, 520, 0.04);
                setSimViewMode('frontal');
              }}
              className={`min-h-[48px] px-5 border font-mono text-xs uppercase tracking-wider transition-colors ${
                simViewMode === 'frontal'
                  ? 'bg-[#191614] text-[#F6F2EA] border-[#191614]'
                  : 'bg-[#EFE8DA] text-[#191614] border-[#191614]/20 hover:border-[#191614]'
              }`}
            >
              Frontal Optical Axis
            </button>
            <button
              type="button"
              onClick={() => {
                triggerOpticSound(audioEnabled, 560, 0.04);
                setSimViewMode('topdown');
              }}
              className={`min-h-[48px] px-5 border font-mono text-xs uppercase tracking-wider transition-colors ${
                simViewMode === 'topdown'
                  ? 'bg-[#191614] text-[#F6F2EA] border-[#191614]'
                  : 'bg-[#EFE8DA] text-[#191614] border-[#191614]/20 hover:border-[#191614]'
              }`}
            >
              Top-Down Temple Wrap
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Cols: Calipers & Anatomical Parameter Controls */}
          <div className="lg:col-span-5 bg-[#EFE8DA] border border-[#191614]/20 p-5 sm:p-7 space-y-6">
            {/* Silhouette Preset Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                <span>1. Select Frame Architecture</span>
                <span className="text-[#B84A27] font-bold">
                  {activeFrame.lensWidthMm}□{activeFrame.bridgeMm}—{activeFrame.templeMm}mm
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                {FRAMES.map((frame) => (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => {
                      triggerOpticSound(audioEnabled, 500, 0.04);
                      setSelectedFrameId(frame.id);
                    }}
                    className={`min-h-[48px] px-3 py-2 text-left border transition-all flex items-center justify-between ${
                      selectedFrameId === frame.id
                        ? 'bg-[#191614] text-[#F6F2EA] border-[#191614]'
                        : 'bg-[#F6F2EA] text-[#191614] border-[#191614]/20 hover:border-[#191614]'
                    }`}
                  >
                    <div>
                      <p className="font-mono text-xs font-bold uppercase">{frame.name}</p>
                      <p className="font-mono text-[10px] opacity-65">
                        {frame.lensWidthMm}□{frame.bridgeMm}
                      </p>
                    </div>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                      style={{ backgroundColor: frame.acetateHex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Temporal Cranial Breadth */}
            <div className="space-y-2 pt-2 border-t border-[#191614]/15">
              <div className="flex items-center justify-between font-mono text-xs">
                <label htmlFor="cranial-width" className="uppercase tracking-wider">
                  2. Cranial Cheekbone Breadth
                </label>
                <span className="font-bold text-[#173452]">{cranialWidthMm} mm</span>
              </div>
              <input
                id="cranial-width"
                type="range"
                min={128}
                max={156}
                step={1}
                value={cranialWidthMm}
                onChange={(e) => setCranialWidthMm(Number(e.target.value))}
                className="w-full h-3 accent-[#B84A27] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#191614]/55 uppercase">
                <span>128mm (Narrow Fit)</span>
                <span>142mm (Median)</span>
                <span>156mm (Broad Frame)</span>
              </div>
            </div>

            {/* Slider 2: Inter-Pupillary Distance */}
            <div className="space-y-2 pt-2 border-t border-[#191614]/15">
              <div className="flex items-center justify-between font-mono text-xs">
                <label htmlFor="pd-slider" className="uppercase tracking-wider">
                  3. Pupillary Distance (PD)
                </label>
                <span className="font-bold text-[#173452]">{pdMm} mm</span>
              </div>
              <input
                id="pd-slider"
                type="range"
                min={56}
                max={74}
                step={1}
                value={pdMm}
                onChange={(e) => setPdMm(Number(e.target.value))}
                className="w-full h-3 accent-[#B84A27] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#191614]/55 uppercase">
                <span>56mm Close-Set</span>
                <span>64mm Standard</span>
                <span>74mm Wide-Set</span>
              </div>
            </div>

            {/* Button Group: Dorsal Bridge Crest Height */}
            <div className="space-y-2.5 pt-2 border-t border-[#191614]/15">
              <span className="font-mono text-xs uppercase tracking-wider block">
                4. Dorsal Nasal Bridge Crest
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'low', label: 'Low / Flush' },
                    { id: 'medium', label: 'Medium Crest' },
                    { id: 'high', label: 'High Dorsal' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      triggerOpticSound(audioEnabled, 540, 0.04);
                      setBridgeHeight(option.id);
                    }}
                    className={`min-h-[48px] px-2 border font-mono text-[11px] uppercase tracking-wider transition-colors ${
                      bridgeHeight === option.id
                        ? 'bg-[#173452] text-[#F6F2EA] border-[#173452]'
                        : 'bg-[#F6F2EA] text-[#191614] border-[#191614]/20 hover:border-[#191614]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Match Reserve CTA */}
            <button
              type="button"
              onClick={() => allocateFrameToVault(activeFrame)}
              className="w-full min-h-[54px] bg-[#B84A27] hover:bg-[#9C3B1C] text-[#F6F2EA] font-mono text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-3 transition-colors"
            >
              <Glasses className="w-4 h-4" />
              <span>
                Allocate Matched {activeFrame.name} — ${activeFrame.price} USD
              </span>
            </button>
          </div>

          {/* Right 7 Cols: 60 FPS Canvas & Live Metric Readout */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative border border-[#191614]/25 bg-[#EFE9DD] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#191614]/15 flex flex-wrap items-center justify-between gap-2 bg-[#F6F2EA]">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Live 60 FPS Sabae Optical Blueprint</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-[#B84A27]">
                  {cranialMetrics.verdict}
                </span>
              </div>

              <canvas
                ref={cranialCanvasRef}
                className="w-full h-[360px] sm:h-[420px] block"
                aria-label="Interactive Millimetric Cranial Fit Blueprint Canvas"
              />
            </div>

            {/* 4-Metric Optical Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-[#EFE8DA] border border-[#191614]/15">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#191614]/60">
                  Cranial Match
                </p>
                <p className="font-mono text-xl font-bold text-[#191614] mt-1">
                  {cranialMetrics.matchScore}%
                </p>
              </div>
              <div className="p-4 bg-[#EFE8DA] border border-[#191614]/15">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#191614]/60">
                  Temporal Pressure
                </p>
                <p
                  className={`font-mono text-xl font-bold mt-1 ${
                    cranialMetrics.temporalPressureGf > 20 ? 'text-[#B84A27]' : 'text-[#173452]'
                  }`}
                >
                  {cranialMetrics.temporalPressureGf} gf
                </p>
              </div>
              <div className="p-4 bg-[#EFE8DA] border border-[#191614]/15">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#191614]/60">
                  Pupil Offset (Δ)
                </p>
                <p className="font-mono text-xl font-bold text-[#191614] mt-1">
                  {cranialMetrics.opticalDeltaMm > 0 ? `+${cranialMetrics.opticalDeltaMm}` : cranialMetrics.opticalDeltaMm} mm
                </p>
              </div>
              <div className="p-4 bg-[#EFE8DA] border border-[#191614]/15">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#191614]/60">
                  Hinge Flex Angle
                </p>
                <p className="font-mono text-xl font-bold text-[#191614] mt-1">
                  {cranialMetrics.templeFlexDeg}° Out
                </p>
              </div>
            </div>

            {/* Bridge Assessment Callout */}
            <div className="p-4 bg-[#191614] text-[#F6F2EA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C98A3B] shrink-0" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#F6F2EA]/60">
                    Nasal Bridge Seating Diagnosis ({activeFrame.bridgeMm}mm Bridge)
                  </p>
                  <p className="text-sm font-medium">{cranialMetrics.bridgeStatus}</p>
                </div>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 bg-[#F6F2EA]/10 shrink-0">
                {activeFrame.acetateGaugeMm}mm Acetate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 04 // ENGINE II: MEDITERRANEAN SUNSET LIGHT-REFRACTION VISUALIZER */}
      <section
        id="refraction"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 lg:py-20 border-b border-[#191614]/15"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 7 Cols: Interactive 60 FPS Tangier Horizon Split Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B84A27]">
                Engine 02 // Strait Of Gibraltar Photopic Transmission
              </p>
              <h2
                className="text-3xl sm:text-5xl font-medium tracking-tight"
                style={{ fontFamily: 'var(--font-pt-serif), serif' }}
              >
                Mediterranean Sunset Lens Refraction Lab
              </h2>
              <p className="text-sm sm:text-base text-[#191614]/75">
                Drag the optical divider across the Tangier strait horizon to compare raw solar
                glare against Sabae 100% UVA/UVB nylon tint filtering across every daylight cycle.
              </p>
            </div>

            <div className="relative border border-[#191614]/25 bg-[#191614] overflow-hidden">
              <canvas
                ref={refractionCanvasRef}
                onPointerDown={(e) => {
                  isDraggingSplit.current = true;
                  handleRefractionPointerMove(e);
                }}
                onPointerMove={handleRefractionPointerMove}
                onPointerUp={() => {
                  isDraggingSplit.current = false;
                }}
                onPointerLeave={() => {
                  isDraggingSplit.current = false;
                }}
                className="w-full h-[340px] sm:h-[410px] block cursor-ew-resize touch-none"
                aria-label="Interactive Split-Screen Tangier Sunset Refraction Visualizer"
              />
            </div>

            {/* Scrubber & Time Sliders (>=48px touch friendliness) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#EFE8DA] border border-[#191614]/15 p-4 sm:p-5">
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor="solar-hour" className="uppercase tracking-wider">
                    Tangier Solar Elevation
                  </label>
                  <span className="font-bold text-[#B84A27]">
                    {solarLabel.timeStr} ({solarLabel.lux} lx)
                  </span>
                </div>
                <input
                  id="solar-hour"
                  type="range"
                  min={6.5}
                  max={19.5}
                  step={0.1}
                  value={solarHour}
                  onChange={(e) => setSolarHour(Number(e.target.value))}
                  className="w-full h-3 accent-[#B84A27] cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-[#191614]/55 uppercase">
                  <span>Dawn Mist</span>
                  <span>Noon Glare</span>
                  <span>Golden Dusk</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor="split-wipe" className="uppercase tracking-wider">
                    Optical Wipe Divider
                  </label>
                  <span className="font-bold text-[#173452]">{splitScrubber}% Offset</span>
                </div>
                <input
                  id="split-wipe"
                  type="range"
                  min={10}
                  max={90}
                  step={1}
                  value={splitScrubber}
                  onChange={(e) => setSplitScrubber(Number(e.target.value))}
                  className="w-full h-3 accent-[#173452] cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-[#191614]/55 uppercase">
                  <span>Full Filtered</span>
                  <span>50/50 Split</span>
                  <span>Full Unfiltered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Nylon Lens Selector & Spectral Wavelength Attenuation Chart */}
          <div className="lg:col-span-5 space-y-5 bg-[#EFE8DA] border border-[#191614]/20 p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-[#191614]/15 pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] font-bold">
                Sabae Nylon Lens Chemistry
              </span>
              <span className="font-mono text-xs px-2.5 py-1 bg-[#191614] text-[#F6F2EA]">
                {activeLens.category}
              </span>
            </div>

            <div className="space-y-2">
              {LENS_CHEMISTRIES.map((lens) => (
                <button
                  key={lens.id}
                  type="button"
                  onClick={() => {
                    triggerOpticSound(audioEnabled, 590, 0.045);
                    setSelectedLensId(lens.id);
                  }}
                  className={`w-full min-h-[54px] px-4 py-2.5 border flex items-center justify-between gap-3 text-left transition-all ${
                    selectedLensId === lens.id
                      ? 'bg-[#191614] text-[#F6F2EA] border-[#191614]'
                      : 'bg-[#F6F2EA] text-[#191614] border-[#191614]/20 hover:border-[#191614]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full border border-white/40 shrink-0"
                      style={{ backgroundColor: lens.tintHex }}
                    />
                    <div>
                      <p className="font-mono text-xs font-bold uppercase">{lens.name}</p>
                      <p className="font-mono text-[10px] opacity-70">{lens.contrastBoost}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold shrink-0">
                    {lens.vltPercent}% VLT
                  </span>
                </button>
              ))}
            </div>

            {/* Spectral Transmission SVG Telemetry Graph (380nm - 740nm) */}
            <div className="bg-[#F6F2EA] border border-[#191614]/15 p-4 space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                <span>Spectral Passband (380nm–740nm)</span>
                <span className="text-[#B84A27] font-bold">100% UV-400 Cut</span>
              </div>

              <svg viewBox="0 0 320 90" className="w-full h-24 overflow-visible">
                {/* Gridlines */}
                <line x1="0" y1="80" x2="320" y2="80" stroke="rgba(25,22,20,0.2)" strokeWidth="1" />
                <line x1="0" y1="45" x2="320" y2="45" stroke="rgba(25,22,20,0.1)" strokeDasharray="3 3" />
                <line x1="0" y1="10" x2="320" y2="10" stroke="rgba(25,22,20,0.1)" strokeDasharray="3 3" />

                {/* UV Cut Zone Highlight (<=400nm) */}
                <rect x="0" y="0" width="38" height="80" fill="rgba(184,74,39,0.1)" />

                {/* Spectral Curve Path */}
                <path
                  d={
                    'M 0 80 ' +
                    activeLens.spectralCurve
                      .map((val, idx) => {
                        const x = (idx / (activeLens.spectralCurve.length - 1)) * 320;
                        const y = 80 - (val / 75) * 70;
                        return `L ${x.toFixed(1)} ${y.toFixed(1)}`;
                      })
                      .join(' ')
                  }
                  fill="none"
                  stroke={activeLens.tintHex}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {activeLens.spectralCurve.map((val, idx) => {
                  const x = (idx / (activeLens.spectralCurve.length - 1)) * 320;
                  const y = 80 - (val / 75) * 70;
                  return <circle key={idx} cx={x} cy={y} r="2.8" fill="#191614" />;
                })}
              </svg>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#191614]/10 font-mono text-[10px]">
                <div>
                  <span className="opacity-60 block">VISIBLE VLT</span>
                  <span className="font-bold text-xs">{activeLens.vltPercent}% Light</span>
                </div>
                <div>
                  <span className="opacity-60 block">BLUE SCATTER</span>
                  <span className="font-bold text-xs">{activeLens.blueBlockPercent}% Blocked</span>
                </div>
                <div>
                  <span className="opacity-60 block">GLARE CUT</span>
                  <span className="font-bold text-xs">
                    {Math.round(activeLens.glareCutFactor * 100)}% Spike Cut
                  </span>
                </div>
              </div>
            </div>

            <p className="font-mono text-[11px] text-[#191614]/70 leading-relaxed">
              <strong>Field Recommendation:</strong> {activeLens.idealEnvironment}.
            </p>
          </div>
        </div>
      </section>

      {/* 05 // CURATED ARCHIVE COLLECTION & WORN / STUDIO DUAL INSPECTOR */}
      <section
        id="collection"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 lg:py-20 border-b border-[#191614]/15"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B84A27]">
              Sabae Archive Lineup // Permanent Icon & Jadhb Silhouettes
            </p>
            <h2
              className="text-3xl sm:text-5xl font-medium tracking-tight"
              style={{ fontFamily: 'var(--font-pt-serif), serif' }}
            >
              Hand-Carved Cellulose Silhouettes
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['All', 'Icon Collection', 'Jadhb Collection'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  triggerOpticSound(audioEnabled, 520, 0.04);
                  setActiveCollectionFilter(tab);
                }}
                className={`min-h-[48px] px-5 border font-mono text-xs uppercase tracking-wider transition-colors ${
                  activeCollectionFilter === tab
                    ? 'bg-[#191614] text-[#F6F2EA] border-[#191614]'
                    : 'bg-[#EFE8DA] text-[#191614] border-[#191614]/20 hover:border-[#191614]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredFrames.map((frame) => {
            const isStudioView = !!studioModeCards[frame.id];
            return (
              <article
                key={frame.id}
                className="flex flex-col justify-between border border-[#191614]/20 bg-[#EFE8DA] group"
              >
                <div>
                  {/* Image Window with Worn Fit <-> Studio Object Study Toggle */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF8F4] border-b border-[#191614]/15">
                    <img
                      src={isStudioView ? frame.studioImage : frame.wornImage}
                      alt={`${frame.name} — ${frame.acetateName}`}
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
                        isStudioView ? 'object-contain p-4 bg-[#FAF9F6]' : 'object-cover object-top'
                      }`}
                    />

                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#F6F2EA]/92 border border-[#191614]/20 font-mono text-[10px] uppercase tracking-wider">
                      {frame.lensWidthMm} □ {frame.bridgeMm} — {frame.templeMm}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        triggerOpticSound(audioEnabled, isStudioView ? 490 : 570, 0.04);
                        setStudioModeCards((prev) => ({
                          ...prev,
                          [frame.id]: !prev[frame.id],
                        }));
                      }}
                      className="absolute bottom-3 right-3 min-h-[40px] px-3 bg-[#191614]/90 hover:bg-[#B84A27] text-[#F6F2EA] font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isStudioView ? 'Worn Fit' : 'Object View'}</span>
                    </button>
                  </div>

                  {/* Editorial Card Metadata */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3
                        className="text-2xl font-medium"
                        style={{ fontFamily: 'var(--font-pt-serif), serif' }}
                      >
                        {frame.name}
                      </h3>
                      <span className="font-mono text-sm font-bold text-[#B84A27]">
                        ${frame.price}
                      </span>
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#173452]">
                      {frame.meaning}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#191614]/75">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#191614]/30 shrink-0"
                        style={{ backgroundColor: frame.acetateHex }}
                      />
                      <span>
                        {frame.acetateName} • {frame.hingeBarrels}-Barrel
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#191614]/75 leading-relaxed line-clamp-3">
                      {frame.story}
                    </p>
                  </div>
                </div>

                {/* Action Footer (>=48px tap targets) */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleLoadIntoFitSim(frame)}
                    className="min-h-[48px] px-2 border border-[#191614]/30 hover:border-[#191614] hover:bg-[#191614] hover:text-[#F6F2EA] font-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Test Cranial Fit
                  </button>
                  <button
                    type="button"
                    onClick={() => allocateFrameToVault(frame)}
                    className="min-h-[48px] px-2 bg-[#191614] hover:bg-[#B84A27] text-[#F6F2EA] font-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Allocate Pair
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 06 // SIX-POINT CONSTELLATION & ARCHIVAL PHOTOGRAPHIC HERITAGE */}
      <section id="heritage" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 lg:py-20 border-b border-[#191614]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
          <div className="lg:col-span-5 space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B84A27]">
              Tangier × Sabae Engineering Dossier
            </p>
            <h2
              className="text-3xl sm:text-5xl font-medium tracking-tight leading-[1.08]"
              style={{ fontFamily: 'var(--font-pt-serif), serif' }}
            >
              Three Pins Toward Past Craft. Three Toward Present Horizon.
            </h2>
            <p className="text-sm sm:text-base text-[#191614]/75 leading-relaxed">
              Every pair sculpted for Port Tanger balances six core coordinates—Nostalgia,
              Tradition, Craftsmanship on the left temple endpiece; Hope, Design, and Culture on the
              right. Pressed from heavyweight organic cellulose blocks aged for months in Sabae to
              eliminate warping.
            </p>

            {/* Specification Comparison Table */}
            <div className="border border-[#191614]/20 bg-[#EFE8DA] divide-y divide-[#191614]/15 font-mono text-xs">
              <div className="grid grid-cols-3 p-3 font-bold uppercase text-[10px] tracking-wider bg-[#191614] text-[#F6F2EA]">
                <span>Architecture Spec</span>
                <span>Port Tanger Sabae</span>
                <span>Mass Market Acetate</span>
              </div>
              <div className="grid grid-cols-3 p-3 items-center">
                <span className="text-[#191614]/70">Acetate Thickness</span>
                <span className="font-bold text-[#173452]">8mm–10mm Aged</span>
                <span className="opacity-50">4mm Injection Molded</span>
              </div>
              <div className="grid grid-cols-3 p-3 items-center">
                <span className="text-[#191614]/70">Hinge Construction</span>
                <span className="font-bold text-[#173452]">7 & 9-Barrel Steel</span>
                <span className="opacity-50">3-Barrel Glued Pin</span>
              </div>
              <div className="grid grid-cols-3 p-3 items-center">
                <span className="text-[#191614]/70">Lens Material</span>
                <span className="font-bold text-[#173452]">Lightweight Nylon</span>
                <span className="opacity-50">Brittle Acrylic</span>
              </div>
              <div className="grid grid-cols-3 p-3 items-center">
                <span className="text-[#191614]/70">Hardware Marking</span>
                <span className="font-bold text-[#173452]">6-Point Structural Pin</span>
                <span className="opacity-50">Surface Decal Print</span>
              </div>
            </div>
          </div>

          {/* Editorial Photography Masonry Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="aspect-[4/5] border border-[#191614]/20 overflow-hidden bg-[#191614]">
              <img
                src="/assets/porttanger/campaign-sabah-sunlight.jpg"
                alt="Refraction droplets portrait by Zora Sicher"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] border border-[#191614]/20 overflow-hidden bg-[#191614]">
              <img
                src="/assets/porttanger/campaign-malick-bodian.jpg"
                alt="Golden hour courtyard light documented by Malick Bodian"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-2 sm:col-span-1 aspect-[4/5] border border-[#191614]/20 overflow-hidden bg-[#191614]">
              <img
                src="/assets/porttanger/campaign-bw-study-2.jpg"
                alt="Monochrome silhouette showing sculptural temple contours"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-2 sm:col-span-2 aspect-[16/10] border border-[#191614]/20 overflow-hidden bg-[#FAF9F6]">
              <img
                src="/assets/porttanger/campaign-craft-multiple.jpg"
                alt="Overhead lineup of Sabae handcrafted acetate frames"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="col-span-2 sm:col-span-1 aspect-[4/5] border border-[#191614]/20 overflow-hidden bg-[#191614]">
              <img
                src="/assets/porttanger/campaign-bw-study-3.jpg"
                alt="Studio monochrome frame portrait with stainless pins"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 07 // SOVEREIGN FOOTER & BILLY BENJAMIN CONSULTING CREDITS */}
      <footer className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B84A27] font-bold">
            Billy Benjamin Consulting // Revenue Architecture Sandbox
          </p>
          <p className="text-sm text-[#191614]/75 leading-relaxed">
            Interactive flagship prototype engineered by Billy Benjamin exclusively for Co-Founder
            Bilal Fellah &amp; Port Tanger B.V. (Hillegomstraat 12, Amsterdam / Sabae Manufacture).
            Designed to convert online optical hesitation into direct flagship allocations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:billybenjamin836@gmail.com?subject=Port%20Tanger%20Digital%20Flagship%20Architecture"
            className="min-h-[48px] px-5 flex items-center gap-2 border border-[#191614] hover:bg-[#191614] hover:text-[#F6F2EA] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            Direct Email <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/billy-benjamin-b02265315"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 flex items-center gap-2 border border-[#191614]/30 hover:border-[#191614] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/billybranddirector88/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 flex items-center gap-2 border border-[#191614]/30 hover:border-[#191614] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            @billybranddirector88
          </a>
        </div>
      </footer>

      {/* ======================================================================== */}
      {/* SLIDE-OUT OPTICAL VAULT & BOUTIQUE ALLOCATION DRAWER (PEAK-END RULE)     */}
      {/* ======================================================================== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#191614]/65 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <aside className="relative z-10 w-full max-w-lg bg-[#F6F2EA] text-[#191614] h-full flex flex-col border-l border-[#191614]/25 shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div className="sticky top-0 z-20 bg-[#F6F2EA] px-6 py-5 border-b border-[#191614]/15 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B84A27]">
                  Amsterdam × Tangier × Sabae Vault
                </p>
                <h3
                  className="text-2xl font-medium"
                  style={{ fontFamily: 'var(--font-pt-serif), serif' }}
                >
                  Optical Boutique Allocation
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="min-h-[48px] min-w-[48px] flex items-center justify-center border border-[#191614]/20 hover:bg-[#191614] hover:text-[#F6F2EA] transition-colors"
                aria-label="Close Optical Vault Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {allocationSuccess ? (
                /* PEAK-END RULE PROVENANCE CONFIRMATION DOSSIER */
                <div className="bg-[#EFE8DA] border border-[#191614]/25 p-6 space-y-5">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <div className="w-10 h-10 rounded-full bg-emerald-600/15 flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest">
                        Allocation Confirmed
                      </p>
                      <h4 className="font-mono text-base font-bold text-[#191614]">
                        {allocationSuccess.dossierId}
                      </h4>
                    </div>
                  </div>

                  <div className="border-y border-[#191614]/15 py-4 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="opacity-65">Cranial Telemetry Sync:</span>
                      <span className="font-bold">{allocationSuccess.cranialCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-65">Fulfillment Route:</span>
                      <span className="font-bold text-right max-w-[220px]">
                        {allocationSuccess.salon}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-65">Total Allotted (Duties $0):</span>
                      <span className="font-bold text-[#B84A27]">${allocationSuccess.total} USD</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#191614]/75 leading-relaxed">
                    Your frame telemetry has been paired with your Sabae production serial. Express
                    packaging includes the limited-edition Port Tanger Zine, protective PU leather
                    pouch, and micro-cleaning cloth.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setAllocationSuccess(null);
                      setDrawerOpen(false);
                    }}
                    className="w-full min-h-[48px] bg-[#191614] text-[#F6F2EA] font-mono text-xs uppercase tracking-widest"
                  >
                    Return To Atelier
                  </button>
                </div>
              ) : (
                <>
                  {/* Collector Tier Pairing Incentive Banner */}
                  <div className="p-4 bg-[#173452] text-[#F6F2EA] space-y-2">
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C98A3B]" />
                        {vaultSummary.count >= 2
                          ? 'Collector Pairing Unlocked (-10% + Free Zine)'
                          : 'Add 1 More Pair For -10% Collector Privilege'}
                      </span>
                      <span>{Math.min(2, vaultSummary.count)} / 2</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 overflow-hidden">
                      <div
                        className="h-full bg-[#C98A3B] transition-all duration-300"
                        style={{ width: `${Math.min(100, (vaultSummary.count / 2) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Active Allocated Frames */}
                  {vaultItems.length === 0 ? (
                    <div className="p-8 border border-dashed border-[#191614]/30 text-center space-y-3">
                      <p className="font-mono text-xs uppercase tracking-wider opacity-70">
                        Your Optical Vault Is Empty
                      </p>
                      <button
                        type="button"
                        onClick={() => setDrawerOpen(false)}
                        className="min-h-[48px] px-5 bg-[#191614] text-[#F6F2EA] font-mono text-xs uppercase tracking-widest"
                      >
                        Explore Sabae Silhouettes
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {vaultItems.map((item) => (
                        <div
                          key={item.key}
                          className="p-4 bg-[#EFE8DA] border border-[#191614]/20 flex gap-4 items-center"
                        >
                          <img
                            src={item.frame.studioImage}
                            alt={item.frame.name}
                            className="w-20 h-20 object-contain bg-[#FAF9F6] border border-[#191614]/15 shrink-0 p-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline gap-2">
                              <p
                                className="text-lg font-medium truncate"
                                style={{ fontFamily: 'var(--font-pt-serif), serif' }}
                              >
                                {item.frame.name}
                              </p>
                              <span className="font-mono text-xs font-bold text-[#B84A27]">
                                ${(item.frame.price + item.opticalOption.addonPrice) * item.quantity}
                              </span>
                            </div>
                            <p className="font-mono text-[10px] opacity-70 truncate">
                              {item.frame.acetateName} • {item.frame.lensWidthMm}□{item.frame.bridgeMm}
                            </p>
                            <p className="font-mono text-[10px] text-[#173452] font-medium mt-0.5 truncate">
                              {item.opticalOption.label}
                            </p>

                            <div className="flex items-center gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() => updateVaultQty(item.key, -1)}
                                className="w-10 h-10 border border-[#191614]/25 flex items-center justify-center hover:bg-[#191614] hover:text-[#F6F2EA]"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-mono text-xs font-bold w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateVaultQty(item.key, 1)}
                                className="w-10 h-10 border border-[#191614]/25 flex items-center justify-center hover:bg-[#191614] hover:text-[#F6F2EA]"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optical Lens Upgrade Selector (Before Allocation) */}
                  <div className="space-y-2 pt-2 border-t border-[#191614]/15">
                    <p className="font-mono text-[11px] uppercase tracking-widest font-bold">
                      Custom Optical Milling Spec (Next Frame Added)
                    </p>
                    <div className="space-y-2">
                      {OPTICAL_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            triggerOpticSound(audioEnabled, 530, 0.04);
                            setSelectedOpticalId(opt.id);
                          }}
                          className={`w-full min-h-[52px] p-3 border text-left flex items-center justify-between gap-2 transition-colors ${
                            selectedOpticalId === opt.id
                              ? 'bg-[#191614] text-[#F6F2EA] border-[#191614]'
                              : 'bg-[#F6F2EA] text-[#191614] border-[#191614]/20 hover:border-[#191614]'
                          }`}
                        >
                          <div>
                            <p className="font-mono text-[11px] font-bold uppercase">{opt.label}</p>
                            <p className="font-mono text-[10px] opacity-70">{opt.spec}</p>
                          </div>
                          <span className="font-mono text-xs font-bold shrink-0">
                            {opt.addonPrice === 0 ? 'Included' : `+$${opt.addonPrice}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Boutique Salon Appointment vs Express Worldwide Shipping */}
                  <div className="space-y-2 pt-2 border-t border-[#191614]/15">
                    <p className="font-mono text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B84A27]" />
                      Select Fulfillment Or Boutique Salon
                    </p>
                    <div className="space-y-2">
                      {SALON_LOCATIONS.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            triggerOpticSound(audioEnabled, 560, 0.04);
                            setSelectedSalonId(loc.id);
                          }}
                          className={`w-full min-h-[54px] p-3 border text-left transition-colors ${
                            selectedSalonId === loc.id
                              ? 'bg-[#EFE8DA] border-[#191614] ring-1 ring-[#191614]'
                              : 'bg-[#F6F2EA] border-[#191614]/20 hover:border-[#191614]'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[11px] font-bold uppercase">
                              {loc.city} — {loc.title}
                            </span>
                            <span className="font-mono text-[10px] text-[#B84A27] font-bold">$0</span>
                          </div>
                          <p className="text-xs opacity-70 mt-0.5">{loc.address}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zero Cost Surprises Checkout Form */}
                  <form onSubmit={handleCompleteAllocation} className="space-y-4 pt-3 border-t border-[#191614]/15">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider block mb-1">
                          Collector Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bilal Fellah"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full min-h-[48px] px-3 bg-white border border-[#191614]/25 font-mono text-xs focus:outline-none focus:border-[#B84A27]"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider block mb-1">
                          Confirmation Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="collector@domain.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full min-h-[48px] px-3 bg-white border border-[#191614]/25 font-mono text-xs focus:outline-none focus:border-[#B84A27]"
                        />
                      </div>
                    </div>

                    {/* Transparent Financial Tally */}
                    <div className="p-4 bg-[#EFE8DA] border border-[#191614]/15 space-y-2 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="opacity-70">Frame &amp; Optical Subtotal</span>
                        <span>${vaultSummary.subtotal} USD</span>
                      </div>
                      {vaultSummary.pairingDiscount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Collector 2-Pair Privilege (-10%)</span>
                          <span>-${vaultSummary.pairingDiscount} USD</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="opacity-70">Global Courier &amp; Import Duties</span>
                        <span className="font-bold">Included ($0.00)</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#191614]/15 text-base font-bold">
                        <span>Total Allocation</span>
                        <span className="text-[#B84A27]">${vaultSummary.finalTotal} USD</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={vaultItems.length === 0}
                      className="w-full min-h-[54px] bg-[#B84A27] hover:bg-[#9C3B1C] disabled:opacity-40 text-[#F6F2EA] font-mono text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Lock Cranial Calibration &amp; Reserve</span>
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

"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// --- TYPES & INTERFACES ---
interface PackedItem {
  id: string;
  name: string;
  category: string;
  weightKg: number;
  volumeL: number;
  dimensions: string;
  iconName: string;
}

interface BagModel {
  id: string;
  name: string;
  price: number;
  volumeLimitL: number;
  maxPayloadKg: number;
  strapSpec: string;
  hardware: string;
  dimensions: string;
  leatherType: string;
  image: string;
  lifestyleImage: string;
}

interface PatinaStage {
  days: number;
  label: string;
  subhead: string;
  grainTexture: string;
  oilDistribution: string;
  pullUpContrast: string;
  copperCondition: string;
  narrative: string;
}

interface ProductSKU {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: "totes" | "carry" | "apparel" | "small-goods";
  studioImage: string;
  lifestyleImage: string;
  leather: string;
  dimensions: string;
  weight: string;
  inStockCount: number;
  leadTime: string;
  highlights: string[];
}

// --- MASTER DATA ---
const BAG_MODELS: BagModel[] = [
  {
    id: "woven-market",
    name: "Woven Market Tote",
    price: 460,
    volumeLimitL: 24.0,
    maxPayloadKg: 8.5,
    strapSpec: "4.5mm English Bridle strap with 240mm shoulder drop",
    hardware: "Hand-peened pure copper burr rivets",
    dimensions: '14.5"H x 18"W x 6.5"D',
    leatherType: "Horween Chromexcel Full-Grain Strip Weave",
    image: "/assets/oroxleather/tote-woven-market.png",
    lifestyleImage: "/assets/oroxleather/tote-woven-lifestyle.webp",
  },
  {
    id: "merces-tote",
    name: "Merces Utility Tote",
    price: 600,
    volumeLimitL: 20.5,
    maxPayloadKg: 7.5,
    strapSpec: "Continuous harness-leather wraps cradling base",
    hardware: "Solid sand-cast marine brass D-rings",
    dimensions: '14"H x 15.5"W x 5.5"D',
    leatherType: "6oz Horween Chromexcel Single-Hide Cut",
    image: "/assets/oroxleather/tote-merces-cherry.png",
    lifestyleImage: "/assets/oroxleather/tote-merces-detail.png",
  },
  {
    id: "viator-weekender",
    name: "Viator Weekender",
    price: 650,
    volumeLimitL: 32.0,
    maxPayloadKg: 12.0,
    strapSpec: "Detachable 50mm heavy-duty shoulder sling with pad",
    hardware: "Heavy brass No. 10 YKK two-way zipper and copper studs",
    dimensions: '13"H x 20"W x 9"D',
    leatherType: "Combination-Tanned Horween Steerhide",
    image: "/assets/oroxleather/bag-viator-black.png",
    lifestyleImage: "/assets/oroxleather/hero-craft-banner.png",
  },
];

const PACKABLE_ITEMS: PackedItem[] = [
  {
    id: "laptop-16",
    name: '16" MacBook Pro & Sleeve',
    category: "Hardware",
    weightKg: 2.15,
    volumeL: 3.8,
    dimensions: "35.8 x 24.6 x 1.7 cm",
    iconName: "LAPTOP",
  },
  {
    id: "portfolio-a4",
    name: "A4 Horween Document Folio",
    category: "Paper",
    weightKg: 0.65,
    volumeL: 2.1,
    dimensions: "32.0 x 23.0 x 2.2 cm",
    iconName: "FOLIO",
  },
  {
    id: "camera-rangefinder",
    name: "Leica M + 35mm Prime Lens",
    category: "Optics",
    weightKg: 0.95,
    volumeL: 1.6,
    dimensions: "13.9 x 8.0 x 7.5 cm",
    iconName: "OPTIC",
  },
  {
    id: "vessel-hydro",
    name: "32oz Insulated Steel Vessel",
    category: "Hydration",
    weightKg: 0.82,
    volumeL: 1.4,
    dimensions: "9.1 x 24.5 cm",
    iconName: "VESSEL",
  },
  {
    id: "knit-cardigan",
    name: "Folded Shetland Wool Knit",
    category: "Garment",
    weightKg: 0.88,
    volumeL: 4.6,
    dimensions: "30.0 x 22.0 x 8.0 cm",
    iconName: "KNIT",
  },
  {
    id: "keys-notebook",
    name: "Solid Brass Key Clip & Journal",
    category: "EDC",
    weightKg: 0.35,
    volumeL: 0.6,
    dimensions: "14.0 x 9.0 x 2.5 cm",
    iconName: "EDC",
  },
];

const PATINA_STAGES: PatinaStage[] = [
  {
    days: 0,
    label: "Day 0 // Factory Fresh",
    subhead: "Unheated Food-Grade Tallow & Beeswax Bloom",
    grainTexture: "Firm temper, chalky matte micro-frost on surface pores",
    oilDistribution: "Deeply impregnated fats resting dormant in leather fibers",
    pullUpContrast: "Pure base pigment; minor tension yields light undertone",
    copperCondition: "High-sheen rose copper burrs freshly peened by hand anvil",
    narrative:
      "Direct from the Portland atelier cutting table. Horween hot-stuffs each Chromexcel hide with beef tallow and cosmetic beeswax. The surface carries an authentic white wax bloom that melts inward on first contact with body heat.",
  },
  {
    days: 180,
    label: "6 Months // Initial Burnish",
    subhead: "Tallow Absorption & Flex Line Softening",
    grainTexture: "Supple hand-feel; contact zones develop satin friction glow",
    oilDistribution: "Fats mobilize toward high-stress creases and handle turns",
    pullUpContrast: "Golden honey undertones bloom along base folds and gussets",
    copperCondition: "Surface luster transitions to warm burnished bronze",
    narrative:
      "Daily shoulder contact and Portland humidity soften the structural temper. Scuffs from desk edges redistribute the internal grease matrix when buffed with a thumb, proving the self-healing mechanics of hot-stuffed steerhide.",
  },
  {
    days: 730,
    label: "2 Years // Workhorse Depth",
    subhead: "Deep Pull-Up Migration & Marbled Character",
    grainTexture: "Rich oily temper; grain exhibits deep three-dimensional ripple",
    oilDistribution: "Dynamic internal migration; high-wear zones turn lustrous amber",
    pullUpContrast: "High-contrast burst between deep espresso body and caramel highlights",
    copperCondition: "Solid copper rivets form an authentic protective oxide skin",
    narrative:
      "Two years of commutes, Pacific flights, and coastal rain. The leather has molded around your daily carry items. Minor surface abrasions have completely blended into the warm secondary tonal layer without conditioning.",
  },
  {
    days: 1825,
    label: "5 Years // Heirloom Equilibrium",
    subhead: "Permanent Saddle Sheen & Museum Verdigris",
    grainTexture: "Velvety hand with glass-smooth burnished touch points",
    oilDistribution: "Uniform saturated nourishment across entire hide structure",
    pullUpContrast: "Irreplaceable antique marbling that cannot be simulated artificially",
    copperCondition: "Gentle green verdigris rings framing raw hand-peened rivets",
    narrative:
      "The definitive fourth-generation milestone. The leather possesses greater tensile durability than the day it was cut, paired with the tactile warmth of 60 months of shared history. Hand-peened copper burrs remain immovable.",
  },
];

const CATALOG_SKUS: ProductSKU[] = [
  {
    id: "woven-market-tote",
    name: "Woven Market Tote",
    tagline: "Hand-Interlaced Full Grain Strip Weave with English Bridle Straps",
    price: 460,
    category: "totes",
    studioImage: "/assets/oroxleather/tote-woven-market.png",
    lifestyleImage: "/assets/oroxleather/tote-woven-lifestyle.webp",
    leather: "Horween Chromexcel Natural & Espresso",
    dimensions: '14.5"H x 18"W x 6.5"D',
    weight: "2.4 lbs",
    inStockCount: 4,
    leadTime: "Crafted in 48h",
    highlights: [
      "Over 42 feet of continuous hand-woven leather ribbon",
      "Hand-peened copper burr rivets at all 4 load joints",
      "English Bridle harness shoulder drop (9.5 inches)",
      "Unlined suede interior with suspended key lanyard",
    ],
  },
  {
    id: "merces-utility-tote",
    name: "Merces Utility Tote",
    tagline: "Single-Hide Cut with Continuous Reinforced Underbelly",
    price: 600,
    category: "totes",
    studioImage: "/assets/oroxleather/tote-merces-cherry.png",
    lifestyleImage: "/assets/oroxleather/tote-merces-detail.png",
    leather: "6oz Horween Chromexcel Oxblood Cherry",
    dimensions: '14"H x 15.5"W x 5.5"D',
    weight: "2.8 lbs",
    inStockCount: 3,
    leadTime: "Crafted in 48h",
    highlights: [
      "Zero bottom seam construction prevents moisture entry",
      "Dedicated interior slot fitting up to 16-inch laptops",
      "Heavy sand-cast marine brass key retention ring",
      "Beeswax-burnished edges sealed with bone folder",
    ],
  },
  {
    id: "viator-weekender-bag",
    name: "Viator 48-Hour Weekender",
    tagline: "High-Volume Travel Duffel with Cleated Floor Plate",
    price: 650,
    category: "carry",
    studioImage: "/assets/oroxleather/bag-viator-black.png",
    lifestyleImage: "/assets/oroxleather/hero-craft-banner.png",
    leather: "Full-Grain Horween Steerhide Onyx",
    dimensions: '13"H x 20"W x 9"D',
    weight: "4.1 lbs",
    inStockCount: 2,
    leadTime: "Crafted in 72h",
    highlights: [
      "32-liter certified carry-on overhead cabin volume",
      "5 solid brass domed floor studs protect leather base",
      "No. 10 solid brass two-way YKK coil zip track",
      "Detachable 2-inch heavy web and leather shoulder harness",
    ],
  },
  {
    id: "merces-saddle-bag",
    name: "Merces Saddle Crossbody",
    tagline: "Equestrian Curve Flap with Solid Brass Post Fastener",
    price: 320,
    category: "carry",
    studioImage: "/assets/oroxleather/bag-merces-saddle.png",
    lifestyleImage: "/assets/oroxleather/bag-merces-cross.png",
    leather: "Horween Chromexcel Warm Caramel",
    dimensions: '8.5"H x 10.5"W x 3.5"D',
    weight: "1.3 lbs",
    inStockCount: 6,
    leadTime: "Ready to Ship",
    highlights: [
      "Beveled edge flap with hand-rubbed organic dye",
      "Quick-release military collar stud closure",
      "Adjustable 7-hole bridle strap with solid brass roller",
      "Divided interior pouch for phone and passport",
    ],
  },
  {
    id: "luna-crescent-bag",
    name: "Luna Crescent Shoulder Bag",
    tagline: "Geometric Half-Moon Silhouette with Tonal Saddle Stitching",
    price: 320,
    category: "carry",
    studioImage: "/assets/oroxleather/bag-luna-caramel.png",
    lifestyleImage: "/assets/oroxleather/bag-luna-mocha.png",
    leather: "Horween Pull-Up Mocha & Caramel",
    dimensions: '7.5"H x 12"W x 3.25"D',
    weight: "1.1 lbs",
    inStockCount: 5,
    leadTime: "Ready to Ship",
    highlights: [
      "Ergonomic underarm contour fits close to torso",
      "Solid brass top zipper with extended pull lanyard",
      "Full grain lining with debossed Orox 1933 stamp",
      "Internal card slot eliminates need for separate wallet",
    ],
  },
  {
    id: "tradesman-apron",
    name: "Tradesman Workshop Apron",
    tagline: "Heavy 6oz Steerhide with Solid Copper Riveted Tool Chest",
    price: 420,
    category: "apparel",
    studioImage: "/assets/oroxleather/apron-tradesman-studio.jpg",
    lifestyleImage: "/assets/oroxleather/apron-tradesman-detail.jpg",
    leather: "Full-Grain Oiled Hide & Brass Hardware",
    dimensions: '33"L x 27"W (Adjustable X-Back)',
    weight: "2.6 lbs",
    inStockCount: 4,
    leadTime: "Crafted in 48h",
    highlights: [
      "Cross-back harness eliminates neck strain during 10h shifts",
      "Dual chest pencil sleeves and quick-draw square slot",
      "Hand-peened copper burr rivets at all pocket corners",
      "Spill-proof hot-waxed finish wipes clean with damp rag",
    ],
  },
  {
    id: "medicus-toiletry-dopp",
    name: "Medicus Travel Dopp Kit",
    tagline: "Doctor-Bag Hinged Frame with Water-Resistant Core",
    price: 150,
    category: "small-goods",
    studioImage: "/assets/oroxleather/dopp-medicus.png",
    lifestyleImage: "/assets/oroxleather/wallet-vertical-bifold.png",
    leather: "Horween Chromexcel Saddle Bourbon",
    dimensions: '5"H x 10"W x 5"D',
    weight: "0.9 lbs",
    inStockCount: 9,
    leadTime: "Ready to Ship",
    highlights: [
      "Internal stay wire holds mouth open for countertop access",
      "Wipeable waxed interior protects against cosmetic spills",
      "Solid brass grab loop on end cap for hook hanging",
      "Generous gusset accepts full-size shaving gear",
    ],
  },
  {
    id: "vertical-bifold-wallet",
    name: "Vertical 6-Pocket Bifold",
    tagline: "Ultra-Slim Card & Cash Carrier with Hand-Skived Edges",
    price: 90,
    category: "small-goods",
    studioImage: "/assets/oroxleather/wallet-vertical-bifold.png",
    lifestyleImage: "/assets/oroxleather/belt-set-duo.png",
    leather: "Horween Chromexcel & English Bridle Core",
    dimensions: '4.25"H x 3.1"W x 0.35"D',
    weight: "0.15 lbs",
    inStockCount: 14,
    leadTime: "Ready to Ship",
    highlights: [
      "Holds 8-12 cards plus folded cash notes",
      "Edges thinned to 0.6mm before burnishing to prevent pocket bulk",
      "Raw unfinished hide interior develops thumb oils patina",
      "Hand-inspected in Portland workshop before numbering",
    ],
  },
];

export default function OroxStorefront() {
  // --- STATE ENGINES ---
  // Caliper Engine
  const [selectedBagId, setSelectedBagId] = useState<string>("woven-market");
  const [packedItemIds, setPackedItemIds] = useState<string[]>([
    "laptop-16",
    "portfolio-a4",
    "vessel-hydro",
  ]);

  // Patina Engine
  const [patinaDayIndex, setPatinaDayIndex] = useState<number>(1); // Defaults to 6 Months
  const [activeLeatherColor, setActiveLeatherColor] = useState<
    "natural" | "burgundy" | "black" | "bourbon"
  >("natural");
  const [rubEffectActive, setRubEffectActive] = useState<boolean>(false);
  const [copperInspectionZoom, setCopperInspectionZoom] = useState<boolean>(false);

  // Collection & Drawer Engine
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lifestyleViewMode, setLifestyleViewMode] = useState<Record<string, boolean>>({});
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<{ sku: ProductSKU; monogram: string; qty: number }[]>([
    {
      sku: CATALOG_SKUS[0],
      monogram: "MM",
      qty: 1,
    },
  ]);
  const [customMonogramInput, setCustomMonogramInput] = useState<string>("MM");
  const [monogramFoilChoice, setMonogramFoilChoice] = useState<"blind" | "gold" | "copper">("copper");
  const [conditionerAddon, setConditionerAddon] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Current active Bag
  const activeBag = useMemo(() => {
    return BAG_MODELS.find((b) => b.id === selectedBagId) || BAG_MODELS[0];
  }, [selectedBagId]);

  // Caliper calculations
  const totalPackedWeight = useMemo(() => {
    return PACKABLE_ITEMS.filter((item) => packedItemIds.includes(item.id)).reduce(
      (sum, item) => sum + item.weightKg,
      0
    );
  }, [packedItemIds]);

  const totalPackedVolume = useMemo(() => {
    return PACKABLE_ITEMS.filter((item) => packedItemIds.includes(item.id)).reduce(
      (sum, item) => sum + item.volumeL,
      0
    );
  }, [packedItemIds]);

  const volumeFillPercentage = useMemo(() => {
    return Math.min(100, Math.round((totalPackedVolume / activeBag.volumeLimitL) * 100));
  }, [totalPackedVolume, activeBag.volumeLimitL]);

  const strapDeflectionMm = useMemo(() => {
    // Structural deflection: ~2.8mm per kg of carry
    return (totalPackedWeight * 2.8).toFixed(1);
  }, [totalPackedWeight]);

  const isOverloaded = totalPackedWeight > activeBag.maxPayloadKg || volumeFillPercentage > 95;

  // Toggle packed item
  const toggleItemPack = (id: string) => {
    if (packedItemIds.includes(id)) {
      setPackedItemIds(packedItemIds.filter((item) => item !== id));
    } else {
      setPackedItemIds([...packedItemIds, id]);
    }
  };

  // Quick helper to show ephemeral toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Add to drawer
  const handleAddToCart = (sku: ProductSKU) => {
    const existingIndex = cartItems.findIndex((ci) => ci.sku.id === sku.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].qty += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { sku, monogram: customMonogramInput, qty: 1 }]);
    }
    setDrawerOpen(true);
    triggerToast(`Added ${sku.name} to Portland allocation cart.`);
  };

  // Remove from drawer
  const handleRemoveFromCart = (skuId: string) => {
    setCartItems(cartItems.filter((ci) => ci.sku.id !== skuId));
  };

  // Update item quantity
  const handleUpdateQty = (skuId: string, delta: number) => {
    setCartItems(
      cartItems
        .map((ci) => {
          if (ci.sku.id === skuId) {
            const newQty = ci.qty + delta;
            return newQty > 0 ? { ...ci, qty: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as { sku: ProductSKU; monogram: string; qty: number }[]
    );
  };

  // Cart total calculations
  const cartSubtotal = useMemo(() => {
    const itemsTotal = cartItems.reduce((acc, ci) => acc + ci.sku.price * ci.qty, 0);
    const addonPrice = conditionerAddon ? 18 : 0;
    return itemsTotal + addonPrice;
  }, [cartItems, conditionerAddon]);

  // Canvas 60 FPS animation for Capacity Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let waveOffset = 0;

    const render = () => {
      waveOffset += 0.04;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background Grid - Architectural Blueprint
      ctx.strokeStyle = "rgba(29, 24, 20, 0.05)";
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Outer Bag Profile (Tote Outline)
      const bagX = width * 0.18;
      const bagY = height * 0.22;
      const bagW = width * 0.64;
      const bagH = height * 0.68;
      const cornerR = 24;

      // Strap deflection calculation
      const sag = Math.min(42, totalPackedWeight * 4.2);

      // Draw Straps
      ctx.strokeStyle = "#1D1814";
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";

      // Left Strap
      ctx.beginPath();
      ctx.moveTo(bagX + 40, bagY + 12);
      ctx.bezierCurveTo(
        bagX + 50,
        bagY - 70 + sag,
        bagX + 110,
        bagY - 70 + sag,
        bagX + 120,
        bagY + 12
      );
      ctx.stroke();

      // Right Strap
      ctx.beginPath();
      ctx.moveTo(bagX + bagW - 120, bagY + 12);
      ctx.bezierCurveTo(
        bagX + bagW - 110,
        bagY - 70 + sag,
        bagX + bagW - 50,
        bagY - 70 + sag,
        bagX + bagW - 40,
        bagY + 12
      );
      ctx.stroke();

      // Bag Body Container
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(bagX, bagY, bagW, bagH, [cornerR, cornerR, 36, 36]);
      ctx.fillStyle = "#EFE8DB";
      ctx.fill();
      ctx.strokeStyle = isOverloaded ? "#A84824" : "#1D1814";
      ctx.lineWidth = isOverloaded ? 3 : 2;
      ctx.stroke();
      ctx.clip();

      // Fluid Volume Fill Level inside Bag
      const fillHeight = (bagH * volumeFillPercentage) / 100;
      const fillY = bagY + bagH - fillHeight;

      const gradient = ctx.createLinearGradient(0, fillY, 0, bagY + bagH);
      if (isOverloaded) {
        gradient.addColorStop(0, "rgba(168, 72, 36, 0.45)");
        gradient.addColorStop(1, "rgba(168, 72, 36, 0.85)");
      } else {
        gradient.addColorStop(0, "rgba(200, 100, 50, 0.35)");
        gradient.addColorStop(1, "rgba(168, 72, 36, 0.7)");
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(bagX, bagY + bagH);
      ctx.lineTo(bagX, fillY);

      // Organic fluid wave at surface
      for (let x = bagX; x <= bagX + bagW; x += 10) {
        const wave = Math.sin((x - bagX) * 0.04 + waveOffset) * 4;
        ctx.lineTo(x, fillY + wave);
      }
      ctx.lineTo(bagX + bagW, bagY + bagH);
      ctx.closePath();
      ctx.fill();

      // Packed Item Silhouettes inside Bag
      const activeItems = PACKABLE_ITEMS.filter((item) => packedItemIds.includes(item.id));
      const boxSpacing = bagW / (activeItems.length + 1);

      activeItems.forEach((item, index) => {
        const itemX = bagX + (index + 1) * boxSpacing - 22;
        const itemY = bagY + bagH - 24 - (index % 2 === 0 ? 40 : 65);

        ctx.fillStyle = "#1D1814";
        ctx.strokeStyle = "#F7F4EE";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(itemX, itemY, 44, 44, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#F7F4EE";
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillText(item.iconName, itemX + 22, itemY + 26);
      });

      ctx.restore();

      // Rivet points on handles
      const rivetCoords = [
        [bagX + 40, bagY + 14],
        [bagX + 120, bagY + 14],
        [bagX + bagW - 120, bagY + 14],
        [bagX + bagW - 40, bagY + 14],
      ];

      rivetCoords.forEach(([rx, ry]) => {
        ctx.fillStyle = "#C86432"; // Anvil Copper
        ctx.beginPath();
        ctx.arc(rx, ry, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#1D1814";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Highlight glint
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(rx - 1.5, ry - 1.5, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Caliper Dimension Arrows & Annotation
      ctx.strokeStyle = "rgba(29, 24, 20, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      // Width caliper
      ctx.beginPath();
      ctx.moveTo(bagX, bagY + bagH + 18);
      ctx.lineTo(bagX + bagW, bagY + bagH + 18);
      ctx.stroke();

      // Height caliper
      ctx.beginPath();
      ctx.moveTo(bagX - 16, bagY);
      ctx.lineTo(bagX - 16, bagY + bagH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Text notation
      ctx.fillStyle = "#1D1814";
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText(
        `SPAN: ${activeBag.dimensions.split("x")[1] || '18"W'}`,
        bagX + bagW / 2,
        bagY + bagH + 34
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [
    volumeFillPercentage,
    totalPackedWeight,
    packedItemIds,
    activeBag,
    isOverloaded,
  ]);

  // Patina current stage object
  const currentPatina = PATINA_STAGES[patinaDayIndex];

  // Leather tone styling
  const leatherBackgroundMap = {
    natural: "from-[#8B4E26] via-[#B56E3B] to-[#D99A66]",
    burgundy: "from-[#451417] via-[#682226] to-[#8C3A3F]",
    black: "from-[#111215] via-[#212429] to-[#363B44]",
    bourbon: "from-[#6E3C18] via-[#945525] to-[#BA7B42]",
  };

  const filteredCatalog = useMemo(() => {
    if (activeCategory === "all") return CATALOG_SKUS;
    return CATALOG_SKUS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen bg-[#F7F4EE] text-[#1D1814] selection:bg-[#C86432] selection:text-white">
      {/* --- TOP BANNER // OROX HERITAGE NOTIFICATION --- */}
      <div className="border-b border-[#1D1814]/10 bg-[#1D1814] px-4 py-2 text-center text-xs tracking-widest text-[#F7F4EE] uppercase">
        <span className="inline-block font-mono text-[#C86432]">PORTLAND ATELIER // 450 NW COUCH ST</span>{" "}
        <span className="mx-2 opacity-40">|</span> 4TH-GENERATION LEATHERWORK (EST. 1933) — HORWEEN CHROMEXCEL & COPPER BURR RIVETS
      </div>

      {/* --- PRIMARY NAVIGATION HEADER --- */}
      <header className="sticky top-0 z-40 border-b border-[#1D1814]/10 bg-[#F7F4EE]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand Mark & Founder Lineage */}
          <Link href="#storefront-top" className="group flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-sm border border-[#1D1814]/20 bg-[#EFE8DB] p-1 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/assets/oroxleather/orox-logo.png"
                alt="Orox Leather Co. Crest"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1D1814] group-hover:text-[#A84824]">
                OROX LEATHER CO.
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[#1D1814]/60 uppercase">
                Oaxaca 1933 → Portland Oregon
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden items-center gap-8 text-xs font-semibold tracking-wider text-[#1D1814]/80 uppercase md:flex">
            <Link href="#capacity" className="transition-colors hover:text-[#A84824]">
              01 // Capacity Caliper
            </Link>
            <Link href="#patina" className="transition-colors hover:text-[#A84824]">
              02 // Patina Lab
            </Link>
            <Link href="#collection" className="transition-colors hover:text-[#A84824]">
              03 // Atelier Catalog
            </Link>
            <Link href="#craft" className="transition-colors hover:text-[#A84824]">
              04 // The 1933 Method
            </Link>
          </nav>

          {/* Action Hub & Drawer Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="#capacity"
              className="hidden h-11 items-center justify-center rounded-sm border border-[#1D1814] px-4 font-mono text-xs font-semibold tracking-wider text-[#1D1814] uppercase transition-colors hover:bg-[#1D1814] hover:text-[#F7F4EE] sm:inline-flex"
            >
              Test Bag Fit
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Portland Allocation Cart Drawer"
              className="relative flex h-12 min-w-[56px] items-center justify-center rounded-sm bg-[#1D1814] px-4 font-mono text-xs font-bold text-[#F7F4EE] shadow-sm transition-transform active:scale-95"
            >
              <span>VAULT</span>
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#C86432] text-[10px] text-white">
                {cartItems.reduce((acc, ci) => acc + ci.qty, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO STAGE // 4TH-GENERATION HERITAGE --- */}
      <section id="storefront-top" className="relative overflow-hidden border-b border-[#1D1814]/10 bg-[#EFE8DB]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-8">
          {/* Left Text Column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-sm border border-[#1D1814]/15 bg-[#F7F4EE] px-3 py-1 font-mono text-xs text-[#1D1814]">
              <span className="h-2 w-2 rounded-full bg-[#C86432]"></span>
              <span>4TH-GENERATION FAMILY ATELIER // FOUNDED 1933</span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.08] font-bold text-[#1D1814] sm:text-5xl md:text-6xl lg:text-7xl">
              Leather crafted to outlive the human who carries it.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#1D1814]/80 sm:text-lg">
              Started by Don Felipe Martinez in 1933 Oaxaca crafting baseball mitts and huaraches.
              Refined in Portland by Martin, José, and Levi Martinez. Cut from Chicago’s historic Horween
              Chromexcel, hot-stuffed with beeswax and beef tallow, and secured with hand-peened copper burr rivets.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#capacity"
                className="flex h-12 items-center justify-center rounded-sm bg-[#1D1814] px-6 font-mono text-xs font-bold tracking-wider text-[#F7F4EE] uppercase transition-colors hover:bg-[#A84824]"
              >
                Launch Capacity Caliper
              </a>
              <a
                href="#collection"
                className="flex h-12 items-center justify-center rounded-sm border border-[#1D1814] bg-transparent px-6 font-mono text-xs font-bold tracking-wider text-[#1D1814] uppercase transition-colors hover:bg-[#1D1814]/5"
              >
                Explore Handcrafted SKUs
              </a>
            </div>

            {/* Verification Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#1D1814]/15 pt-6 font-mono">
              <div>
                <div className="text-2xl font-bold text-[#1D1814]">1933</div>
                <div className="text-[11px] text-[#1D1814]/60 uppercase">Oaxacan Foundation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#A84824]">91 Yrs</div>
                <div className="text-[11px] text-[#1D1814]/60 uppercase">Lineage Continuity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#C86432]">100%</div>
                <div className="text-[11px] text-[#1D1814]/60 uppercase">Horween Pull-Up</div>
              </div>
            </div>
          </div>

          {/* Right Visual Frame */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[#1D1814]/20 bg-[#1D1814] shadow-2xl">
              <Image
                src="/assets/oroxleather/workshop-portland-bench.png"
                alt="Martin and Levi Martinez at the Portland Couch Street workshop anvil"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1814] via-transparent to-transparent opacity-80"></div>
              <div className="absolute right-4 bottom-4 left-4 border border-[#F7F4EE]/20 bg-[#1D1814]/85 p-4 text-[#F7F4EE] backdrop-blur-sm">
                <div className="font-mono text-[10px] text-[#C86432] uppercase">
                  ACTIVE ATELIER VERIFICATION // PORTLAND, OR
                </div>
                <div className="font-serif text-base font-semibold">
                  Hand-peened copper burr rivets over heavy anvil blocks.
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#F7F4EE]/60">
                  Zero glue shortcuts. Zero faux bonded backing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 01 // 60 FPS 3D WOVEN CARRY CAPACITY CALIPER --- */}
      <section id="capacity" className="border-b border-[#1D1814]/10 bg-[#F7F4EE] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#A84824] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A84824]"></span>
              <span>ENGINE 01 // LOAD DEFLECTION & PACKING SIMULATOR</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1D1814] sm:text-4xl md:text-5xl">
              60 FPS Woven Carry Capacity Caliper
            </h2>
            <p className="text-base text-[#1D1814]/80">
              The number one reason leather carry buyers hesitate is internal volume uncertainty:
              will a 16-inch laptop, brass flask, and knit sweater fit without stretching the gusset?
              Select a bag model, drop your daily items, and observe live shoulder deflection and liter volume.
            </p>
          </div>

          {/* Model Selector Bar */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {BAG_MODELS.map((bag) => {
              const isSelected = bag.id === selectedBagId;
              return (
                <button
                  key={bag.id}
                  onClick={() => setSelectedBagId(bag.id)}
                  className={`flex h-full min-h-[56px] flex-col justify-between rounded-sm border p-4 text-left transition-all ${
                    isSelected
                      ? "border-[#1D1814] bg-[#1D1814] text-[#F7F4EE] shadow-md"
                      : "border-[#1D1814]/15 bg-[#EFE8DB]/60 text-[#1D1814] hover:border-[#1D1814]/40 hover:bg-[#EFE8DB]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] tracking-wider opacity-60 uppercase">
                        MODEL SELECTION
                      </span>
                      <h3 className="font-serif text-lg font-bold">{bag.name}</h3>
                    </div>
                    <span className="font-mono text-xs font-bold">${bag.price}</span>
                  </div>

                  <div className="mt-4 border-t border-current/15 pt-2 font-mono text-[11px] opacity-80">
                    <div>Limit: {bag.volumeLimitL.toFixed(1)} L / {bag.maxPayloadKg} kg</div>
                    <div className="truncate">{bag.dimensions}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Workbench Matrix */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left Column: Packable Items Tray */}
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-sm border border-[#1D1814]/15 bg-[#EFE8DB] p-5">
                <div className="flex items-center justify-between border-b border-[#1D1814]/10 pb-3">
                  <span className="font-mono text-xs font-bold text-[#1D1814] uppercase">
                    Select Daily Payload Items
                  </span>
                  <span className="font-mono text-xs text-[#1D1814]/60">
                    {packedItemIds.length} packed
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {PACKABLE_ITEMS.map((item) => {
                    const isPacked = packedItemIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleItemPack(item.id)}
                        className={`flex min-h-[52px] w-full items-center justify-between rounded-sm border px-3 py-2 text-left transition-colors ${
                          isPacked
                            ? "border-[#C86432] bg-[#C86432]/10 text-[#1D1814]"
                            : "border-[#1D1814]/10 bg-[#F7F4EE] text-[#1D1814]/80 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-sm font-mono text-[10px] font-bold ${
                              isPacked
                                ? "bg-[#C86432] text-white"
                                : "bg-[#1D1814]/10 text-[#1D1814]"
                            }`}
                          >
                            {isPacked ? "✓" : "+"}
                          </span>
                          <div>
                            <div className="text-xs font-bold">{item.name}</div>
                            <div className="font-mono text-[10px] text-[#1D1814]/60">
                              {item.category} • {item.dimensions}
                            </div>
                          </div>
                        </div>

                        <div className="text-right font-mono text-[11px]">
                          <div>{item.volumeL} L</div>
                          <div className="text-[#1D1814]/60">{item.weightKg} kg</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex gap-2 border-t border-[#1D1814]/10 pt-4">
                  <button
                    onClick={() => setPackedItemIds(PACKABLE_ITEMS.map((i) => i.id))}
                    className="flex-1 rounded-sm border border-[#1D1814]/20 bg-white py-2 font-mono text-[11px] font-semibold text-[#1D1814] uppercase hover:bg-[#F7F4EE]"
                  >
                    Pack All
                  </button>
                  <button
                    onClick={() => setPackedItemIds([])}
                    className="flex-1 rounded-sm border border-[#1D1814]/20 bg-white py-2 font-mono text-[11px] font-semibold text-[#1D1814] uppercase hover:bg-[#F7F4EE]"
                  >
                    Clear Tray
                  </button>
                </div>
              </div>

              {/* Hardware Spec Box */}
              <div className="rounded-sm border border-[#1D1814]/15 bg-[#1D1814] p-5 text-[#F7F4EE]">
                <div className="font-mono text-[10px] text-[#C86432] uppercase">
                  STRESS JOINT ANATOMY
                </div>
                <div className="mt-1 font-serif text-lg font-bold">{activeBag.name}</div>
                <div className="mt-3 space-y-2 font-mono text-xs text-[#F7F4EE]/80">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-[#F7F4EE]/50">STRAP LEATHER:</span>
                    <span className="text-right font-semibold">{activeBag.strapSpec}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-[#F7F4EE]/50">FASTENERS:</span>
                    <span className="text-right font-semibold">{activeBag.hardware}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F7F4EE]/50">LEATHER CORE:</span>
                    <span className="text-right font-semibold">{activeBag.leatherType}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 60 FPS HTML5 Canvas Cross-Section & Readout */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-sm border border-[#1D1814]/20 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#1D1814]/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#A84824] uppercase">
                      CROSS-SECTION CALIPER TELEMETRY
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#1D1814]">
                      Internal Fluid & Geometric Simulation
                    </h4>
                  </div>
                  <div className="text-right font-mono">
                    <span
                      className={`inline-block rounded-sm px-2.5 py-1 text-xs font-bold ${
                        isOverloaded
                          ? "bg-[#A84824] text-white"
                          : "bg-[#23382B] text-white"
                      }`}
                    >
                      {isOverloaded ? "OVERLOAD ALERT" : "OPTIMAL PACK"}
                    </span>
                  </div>
                </div>

                {/* HTML5 Canvas */}
                <div className="relative mt-4 flex items-center justify-center bg-[#F7F4EE] p-2">
                  <canvas
                    ref={canvasRef}
                    width={560}
                    height={380}
                    className="max-h-[380px] w-full object-contain"
                  />
                  {isOverloaded && (
                    <div className="absolute right-4 bottom-4 rounded-sm border border-[#A84824] bg-white/95 px-3 py-2 font-mono text-xs text-[#A84824] shadow-md">
                      ⚠️ Capacity threshold reached ({totalPackedVolume.toFixed(1)} L &gt;{" "}
                      {activeBag.volumeLimitL} L)
                    </div>
                  )}
                </div>

                {/* Live Mathematical Telemetry Row */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#1D1814]/10 pt-4 sm:grid-cols-4 font-mono text-xs">
                  <div className="rounded-sm bg-[#EFE8DB] p-3">
                    <span className="text-[10px] text-[#1D1814]/60 uppercase">INTERNAL VOLUME</span>
                    <div className="text-lg font-bold text-[#1D1814]">
                      {totalPackedVolume.toFixed(1)} L
                    </div>
                    <div className="text-[10px] text-[#1D1814]/50">
                      Cap: {activeBag.volumeLimitL} L
                    </div>
                  </div>

                  <div className="rounded-sm bg-[#EFE8DB] p-3">
                    <span className="text-[10px] text-[#1D1814]/60 uppercase">TOTAL PAYLOAD</span>
                    <div className="text-lg font-bold text-[#1D1814]">
                      {totalPackedWeight.toFixed(2)} kg
                    </div>
                    <div className="text-[10px] text-[#1D1814]/50">
                      Max: {activeBag.maxPayloadKg} kg
                    </div>
                  </div>

                  <div className="rounded-sm bg-[#EFE8DB] p-3">
                    <span className="text-[10px] text-[#1D1814]/60 uppercase">FILL LEVEL</span>
                    <div
                      className={`text-lg font-bold ${
                        isOverloaded ? "text-[#A84824]" : "text-[#1D1814]"
                      }`}
                    >
                      {volumeFillPercentage}%
                    </div>
                    <div className="text-[10px] text-[#1D1814]/50">Linear Height Fill</div>
                  </div>

                  <div className="rounded-sm bg-[#EFE8DB] p-3">
                    <span className="text-[10px] text-[#1D1814]/60 uppercase">STRAP DEFLECTION</span>
                    <div className="text-lg font-bold text-[#C86432]">
                      +{strapDeflectionMm} mm
                    </div>
                    <div className="text-[10px] text-[#1D1814]/50">Tensile Sag Index</div>
                  </div>
                </div>

                {/* Direct Action for this Bag */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#1D1814]/10 pt-4">
                  <div className="font-mono text-xs text-[#1D1814]/70">
                    Configuration fits daily office commute and regional air travel without deformation.
                  </div>
                  <button
                    onClick={() => {
                      const sku = CATALOG_SKUS.find((s) => s.id === "woven-market-tote") || CATALOG_SKUS[0];
                      handleAddToCart(sku);
                    }}
                    className="flex h-11 items-center justify-center rounded-sm bg-[#A84824] px-5 font-mono text-xs font-bold text-white uppercase transition-colors hover:bg-[#8B3B1D]"
                  >
                    Select {activeBag.name} (${activeBag.price})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 02 // HORWEEN 5-YEAR PULL-UP PATINA SIMULATOR --- */}
      <section id="patina" className="border-b border-[#1D1814]/10 bg-[#EFE8DB] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#C86432] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C86432]"></span>
              <span>ENGINE 02 // HORWEEN CHROMEXCEL BEESWAX & COPPER AGING</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1D1814] sm:text-4xl md:text-5xl">
              5-Year Pull-Up Patina Evolution Slider
            </h2>
            <p className="text-base text-[#1D1814]/80">
              Chromexcel is not painted with plastic top-coats. Chicago’s Horween tannery hot-stuffs
              each hide with natural tallow and beeswax for 89 days. As you carry it, internal oils
              migrate under finger pressure, causing scratches to burnish away and revealing warm amber depths.
            </p>
          </div>

          {/* Interactive Patina Stage Timeline */}
          <div className="mt-10 rounded-sm border border-[#1D1814]/15 bg-[#F7F4EE] p-6 shadow-sm">
            {/* Colorway Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1D1814]/10 pb-4">
              <span className="font-mono text-xs font-bold text-[#1D1814] uppercase">
                Select Horween Tannery Shade:
              </span>
              <div className="flex items-center gap-2">
                {[
                  { id: "natural", name: "Natural Chromexcel", hex: "#8B4E26" },
                  { id: "burgundy", name: "Oxblood Cherry", hex: "#451417" },
                  { id: "black", name: "Onyx Steerhide", hex: "#1A1A1A" },
                  { id: "bourbon", name: "Saddle Bourbon", hex: "#BA7B42" },
                ].map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setActiveLeatherColor(shade.id as any)}
                    className={`flex h-9 items-center gap-2 rounded-sm border px-3 font-mono text-xs font-semibold transition-all ${
                      activeLeatherColor === shade.id
                        ? "border-[#1D1814] bg-[#1D1814] text-white shadow-sm"
                        : "border-[#1D1814]/20 bg-white text-[#1D1814] hover:bg-[#EFE8DB]"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: shade.hex }}
                    ></span>
                    <span>{shade.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Patina Age Slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#A84824] uppercase">
                  TIMELINE POSITION: {currentPatina.label}
                </span>
                <span className="text-[#1D1814]/60">DRAG SLIDER TO TRAVEL 60 MONTHS</span>
              </div>

              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={patinaDayIndex}
                onChange={(e) => setPatinaDayIndex(Number(e.target.value))}
                className="mt-3 h-3 w-full cursor-pointer appearance-none rounded-sm bg-[#1D1814]/15 accent-[#A84824]"
                aria-label="Patina aging timeline slider"
              />

              <div className="mt-2 grid grid-cols-4 font-mono text-[11px] text-[#1D1814]/70">
                <div className={patinaDayIndex === 0 ? "font-bold text-[#A84824]" : ""}>Day 0 // Fresh</div>
                <div className={patinaDayIndex === 1 ? "font-bold text-[#A84824]" : ""}>6 Mos // Burnish</div>
                <div className={patinaDayIndex === 2 ? "font-bold text-[#A84824]" : ""}>2 Yrs // Migration</div>
                <div className={patinaDayIndex === 3 ? "font-bold text-[#A84824]" : ""}>5 Yrs // Heirloom</div>
              </div>
            </div>

            {/* Visual Leather Canvas Representation */}
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              {/* Left: Textured Interactive Surface Canvas */}
              <div className="relative overflow-hidden rounded-sm border border-[#1D1814]/20 lg:col-span-7">
                <div
                  className={`relative flex aspect-[16/10] w-full flex-col justify-between bg-gradient-to-br ${leatherBackgroundMap[activeLeatherColor]} p-6 text-white transition-all duration-700`}
                >
                  {/* Surface Sheen & Texture Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      opacity: patinaDayIndex === 0 ? 0.35 : patinaDayIndex === 3 ? 0.85 : 0.6,
                      backgroundImage:
                        "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 60%)",
                    }}
                  ></div>

                  {/* Pull-Up Flex Creases */}
                  {patinaDayIndex > 0 && (
                    <div
                      className="absolute inset-x-0 top-1/2 h-16 -translate-y-1/2 transition-opacity duration-700"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255, 200, 140, 0.35), transparent)",
                        filter: "blur(4px)",
                      }}
                    ></div>
                  )}

                  {/* Friction Rub Effect Simulation */}
                  {rubEffectActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-all">
                      <div className="rounded-sm border border-white/40 bg-black/60 px-4 py-2 font-mono text-xs text-white">
                        ✓ Internal Tallow Mobilized: Scuff Blended via Friction
                      </div>
                    </div>
                  )}

                  {/* Copper Burr Rivet Zoom in Top Corner */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="rounded-sm border border-white/20 bg-black/40 px-3 py-1 font-mono text-[11px] backdrop-blur-sm">
                      {currentPatina.subhead}
                    </div>

                    <button
                      onClick={() => setCopperInspectionZoom(!copperInspectionZoom)}
                      className="flex h-11 items-center gap-2 rounded-sm border border-white/30 bg-black/50 px-3 font-mono text-[11px] text-white hover:bg-black/70"
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-white"
                        style={{
                          backgroundColor:
                            patinaDayIndex === 3
                              ? "#3A7258" // Verdigris Green
                              : patinaDayIndex === 0
                              ? "#C86432" // Fresh Copper
                              : "#8C4A26", // Aged Bronze
                        }}
                      ></span>
                      <span>{copperInspectionZoom ? "Reset Macro" : "Zoom Rivet"}</span>
                    </button>
                  </div>

                  {/* Center Emblem Stamped into Hide */}
                  <div className="relative z-10 my-auto text-center">
                    <div className="font-serif text-3xl font-bold tracking-widest text-white/90 drop-shadow-md">
                      OROX LEATHER CO.
                    </div>
                    <div className="font-mono text-xs text-white/70 tracking-widest uppercase">
                      PORTLAND • OREGON • 1933
                    </div>
                  </div>

                  {/* Bottom Interactive Bar */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-3 font-mono text-xs">
                    <div>
                      <span className="text-white/60">TEMPER:</span>{" "}
                      <span className="font-semibold">
                        {patinaDayIndex === 0 ? "Firm (Chalky Bloom)" : "Supple (Saddle Gloss)"}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setRubEffectActive(true);
                        setTimeout(() => setRubEffectActive(false), 2400);
                      }}
                      className="flex h-9 items-center justify-center rounded-sm bg-white px-3 font-mono text-xs font-bold text-[#1D1814] uppercase transition-transform active:scale-95"
                    >
                      Simulate Thumb Friction Rub
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Technical Observation Log */}
              <div className="flex flex-col justify-between space-y-4 rounded-sm border border-[#1D1814]/15 bg-white p-5 lg:col-span-5">
                <div>
                  <div className="font-mono text-[10px] text-[#A84824] uppercase">
                    LABORATORY PATINA SPECIFICATION
                  </div>
                  <h4 className="mt-1 font-serif text-2xl font-bold text-[#1D1814]">
                    {currentPatina.label}
                  </h4>
                  <p className="mt-3 text-xs leading-relaxed text-[#1D1814]/80">
                    {currentPatina.narrative}
                  </p>
                </div>

                <div className="space-y-2.5 border-t border-[#1D1814]/10 pt-4 font-mono text-xs text-[#1D1814]">
                  <div>
                    <span className="text-[#1D1814]/50">GRAIN TEXTURE:</span>
                    <div className="font-semibold">{currentPatina.grainTexture}</div>
                  </div>
                  <div>
                    <span className="text-[#1D1814]/50">OIL DISTRIBUTION:</span>
                    <div className="font-semibold">{currentPatina.oilDistribution}</div>
                  </div>
                  <div>
                    <span className="text-[#1D1814]/50">COPPER BURR STATE:</span>
                    <div className="font-semibold text-[#A84824]">{currentPatina.copperCondition}</div>
                  </div>
                </div>

                <div className="rounded-sm border border-[#C86432]/30 bg-[#C86432]/10 p-3 font-mono text-[11px] text-[#1D1814]">
                  💡 <strong>Care Protocol:</strong> Never apply silicone waterproof sprays.
                  Condition annually with pure neatsfoot oil or included Orox beeswax bar.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 03 // PORTLAND ATELIER COLLECTION GRID --- */}
      <section id="collection" className="border-b border-[#1D1814]/10 bg-[#F7F4EE] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#1D1814] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1D1814]"></span>
                <span>ENGINE 03 // DIRECT ATELIER ALLOCATION</span>
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1D1814] sm:text-4xl md:text-5xl">
                The Portland Handcrafted Catalog
              </h2>
              <p className="text-base text-[#1D1814]/80">
                Each piece is cut from full-grain steerhide, hand-stitched on industrial harness
                machines, and stamped in our Couch Street workshop. Toggle between studio object view
                and authentic Portland field wear.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Works" },
                { id: "totes", label: "Totes & Carry" },
                { id: "carry", label: "Crossbody & Travel" },
                { id: "apparel", label: "Atelier Apparel" },
                { id: "small-goods", label: "Wallets & Dopps" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex h-10 items-center justify-center rounded-sm border px-3.5 font-mono text-xs font-semibold uppercase transition-all ${
                    activeCategory === cat.id
                      ? "border-[#1D1814] bg-[#1D1814] text-[#F7F4EE]"
                      : "border-[#1D1814]/20 bg-white text-[#1D1814] hover:bg-[#EFE8DB]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCatalog.map((product) => {
              const isLifestyle = lifestyleViewMode[product.id] || false;
              const currentImg = isLifestyle ? product.lifestyleImage : product.studioImage;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between rounded-sm border border-[#1D1814]/15 bg-white p-4 transition-all hover:border-[#1D1814] hover:shadow-lg"
                >
                  <div>
                    {/* Image Stage */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#EFE8DB]">
                      <Image
                        src={currentImg}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Stock Badge */}
                      <div className="absolute top-2 left-2 rounded-sm border border-[#1D1814]/20 bg-white/95 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#1D1814]">
                        {product.inStockCount} In Atelier
                      </div>

                      {/* Toggle Studio / Lifestyle */}
                      <button
                        onClick={() =>
                          setLifestyleViewMode({
                            ...lifestyleViewMode,
                            [product.id]: !isLifestyle,
                          })
                        }
                        aria-label="Toggle lifestyle or studio image view"
                        className="absolute right-2 bottom-2 flex h-8 items-center rounded-sm border border-[#1D1814]/30 bg-[#1D1814]/85 px-2.5 font-mono text-[10px] text-white backdrop-blur-sm hover:bg-[#1D1814]"
                      >
                        {isLifestyle ? "Studio Cut" : "Worn View"}
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="mt-4">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] text-[#A84824] uppercase">
                          {product.leather}
                        </span>
                        <span className="font-mono text-sm font-bold text-[#1D1814]">
                          ${product.price}
                        </span>
                      </div>

                      <h3 className="mt-1 font-serif text-lg font-bold text-[#1D1814]">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#1D1814]/70">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Highlights Spec List */}
                    <ul className="mt-4 space-y-1.5 border-t border-[#1D1814]/10 pt-3 font-mono text-[11px] text-[#1D1814]/80">
                      {product.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#C86432]">✦</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Add to Allocation Cart Button */}
                  <div className="mt-6 border-t border-[#1D1814]/10 pt-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex h-11 w-full items-center justify-center rounded-sm bg-[#1D1814] px-4 font-mono text-xs font-bold tracking-wider text-[#F7F4EE] uppercase transition-colors hover:bg-[#A84824]"
                    >
                      Allocate to Vault — ${product.price}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CRAFT METHODOLOGY // THE 1933 STANDARD --- */}
      <section id="craft" className="border-b border-[#1D1814]/10 bg-[#1D1814] py-20 text-[#F7F4EE]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-[#C86432]">
                <span>THE MARTINEZ FAMILY DOCTRINE</span>
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#F7F4EE] sm:text-4xl md:text-5xl">
                Four generations of tool steel, copper burrs, and beef tallow.
              </h2>
              <p className="text-base leading-relaxed text-[#F7F4EE]/80">
                In 1933, Don Felipe Martinez carved his first templates in Oaxaca, Mexico. Today,
                his grandsons craft each piece at 450 NW Couch Street in Portland. We reject rapid
                mass manufacturing: our copper rivets are peened individually on cast iron anvils,
                and our edges are sealed using natural Oregon beeswax and bone burnishers.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 font-mono text-xs">
                <div>
                  <div className="font-bold text-[#C86432]">01 // Zero Synthetic Liners</div>
                  <div className="mt-1 text-[#F7F4EE]/60">
                    Synthetic linings rot in 3 years. We leave raw suede hide exposed.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#C86432]">02 // Solid Copper Burrs</div>
                  <div className="mt-1 text-[#F7F4EE]/60">
                    Immovable mechanical bond that withstands over 180 lbs of shear force.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#C86432]">03 // Hand-Skived Seams</div>
                  <div className="mt-1 text-[#F7F4EE]/60">
                    Leather thickness shaved at joints for zero pocket bulk.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#C86432]">04 // Lifetime Repair Pact</div>
                  <div className="mt-1 text-[#F7F4EE]/60">
                    Free stitch and rivet maintenance for the life of the owner.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/20 lg:col-span-6">
              <Image
                src="/assets/oroxleather/hero-craft-banner.png"
                alt="Horween Chromexcel leather cutting and rivet setting in Portland"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute right-4 bottom-4 rounded-sm border border-white/20 bg-black/80 px-3 py-1.5 font-mono text-[10px] text-white">
                450 NW Couch St, Portland OR 97209
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER // SOW & FOUNDER ATELIER SIGN-OFF --- */}
      <footer className="border-t border-[#1D1814]/10 bg-[#EFE8DB] py-12 text-[#1D1814]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-serif text-xl font-bold">OROX LEATHER CO.</div>
              <div className="mt-2 font-mono text-xs text-[#1D1814]/70">
                4th-Generation Family Leathercraft
                <br />
                Portland Atelier & Horween Patina Lab
              </div>
              <div className="mt-4 font-mono text-[11px] text-[#A84824]">
                Atelier: 450 NW Couch St, Portland, OR
              </div>
            </div>

            <div>
              <div className="font-mono text-xs font-bold uppercase">Storefront Navigation</div>
              <ul className="mt-3 space-y-2 font-mono text-xs text-[#1D1814]/70">
                <li><a href="#capacity" className="hover:text-[#A84824]">Capacity Caliper</a></li>
                <li><a href="#patina" className="hover:text-[#A84824]">5-Year Patina Evolution</a></li>
                <li><a href="#collection" className="hover:text-[#A84824]">Portland Atelier SKUs</a></li>
                <li><a href="#craft" className="hover:text-[#A84824]">1933 Martinez Lineage</a></li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-xs font-bold uppercase">Heritage Materials</div>
              <ul className="mt-3 space-y-2 font-mono text-xs text-[#1D1814]/70">
                <li>Chicago Horween Chromexcel</li>
                <li>Hand-Peened Copper Burrs</li>
                <li>English Bridle Harness Straps</li>
                <li>Sand-Cast Marine Brass Rings</li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-xs font-bold uppercase">Founder Dispatch</div>
              <div className="mt-3 text-xs leading-relaxed text-[#1D1814]/70">
                Inquiries directed to Martin Martinez and the workshop family team.
              </div>
              <div className="mt-3 font-mono text-xs font-semibold text-[#1D1814]">
                Direct: martin@oroxleather.com
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between border-t border-[#1D1814]/10 pt-6 font-mono text-[11px] text-[#1D1814]/60">
            <div>© 1933–2026 Orox Leather Co. All Rights Reserved. Portland, Oregon.</div>
            <div className="text-right">
              Architected for Revenue Velocity & Zero Plastic Landfill.
            </div>
          </div>
        </div>
      </footer>

      {/* --- SLIDE-OUT ALLOCATION CART DRAWER --- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="relative flex h-full w-full max-w-md flex-col justify-between bg-[#F7F4EE] p-6 shadow-2xl">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#1D1814]/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-[#A84824] uppercase">
                    PORTLAND WORKSHOP VAULT
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1D1814]">
                    Reserved Allocations
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close Allocation Cart"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#1D1814]/20 font-mono text-sm font-bold text-[#1D1814] hover:bg-[#EFE8DB]"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items List */}
              <div className="mt-6 max-h-[42vh] space-y-4 overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center font-mono text-xs text-[#1D1814]/50">
                    Vault is currently unallocated. Select a piece from the catalog.
                  </div>
                ) : (
                  cartItems.map((ci) => (
                    <div
                      key={ci.sku.id}
                      className="rounded-sm border border-[#1D1814]/15 bg-white p-3.5"
                    >
                      <div className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-[#EFE8DB]">
                          <Image
                            src={ci.sku.studioImage}
                            alt={ci.sku.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex justify-between">
                            <h4 className="font-serif text-sm font-bold text-[#1D1814]">
                              {ci.sku.name}
                            </h4>
                            <span className="font-mono text-xs font-bold text-[#1D1814]">
                              ${ci.sku.price * ci.qty}
                            </span>
                          </div>

                          <div className="font-mono text-[10px] text-[#A84824]">
                            STAMP: {ci.monogram || "NONE"} • {ci.sku.leadTime}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2 font-mono text-xs">
                              <button
                                onClick={() => handleUpdateQty(ci.sku.id, -1)}
                                className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#1D1814]/20 hover:bg-[#EFE8DB]"
                              >
                                -
                              </button>
                              <span>{ci.qty}</span>
                              <button
                                onClick={() => handleUpdateQty(ci.sku.id, 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#1D1814]/20 hover:bg-[#EFE8DB]"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveFromCart(ci.sku.id)}
                              className="font-mono text-[10px] text-[#1D1814]/50 hover:text-[#A84824]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Complimentary Hot-Stamping Customizer */}
              <div className="mt-4 rounded-sm border border-[#1D1814]/15 bg-[#EFE8DB] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1D1814] uppercase">
                    Brass Hot-Stamp Monogramming
                  </span>
                  <span className="font-mono text-[10px] text-[#A84824] uppercase">
                    Complimentary
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    maxLength={3}
                    value={customMonogramInput}
                    onChange={(e) => setCustomMonogramInput(e.target.value.toUpperCase())}
                    placeholder="INITIALS (MM)"
                    className="h-10 w-28 rounded-sm border border-[#1D1814]/20 bg-white px-3 font-mono text-xs font-bold tracking-widest text-[#1D1814] uppercase focus:border-[#A84824] focus:outline-none"
                  />

                  <div className="flex flex-1 gap-1">
                    {[
                      { id: "copper", label: "Copper" },
                      { id: "gold", label: "Gold" },
                      { id: "blind", label: "Deboss" },
                    ].map((foil) => (
                      <button
                        key={foil.id}
                        onClick={() => setMonogramFoilChoice(foil.id as any)}
                        className={`flex-1 rounded-sm border font-mono text-[10px] font-semibold uppercase ${
                          monogramFoilChoice === foil.id
                            ? "border-[#1D1814] bg-[#1D1814] text-white"
                            : "border-[#1D1814]/20 bg-white text-[#1D1814]"
                        }`}
                      >
                        {foil.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-2 font-mono text-[10px] text-[#1D1814]/60">
                  Heat-pressed into leather badge with vintage Portland brass type.
                </div>
              </div>

              {/* Beeswax Conditioner Addon */}
              <div className="mt-3 flex items-center justify-between rounded-sm border border-[#1D1814]/15 bg-white p-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="conditioner"
                    checked={conditionerAddon}
                    onChange={() => setConditionerAddon(!conditionerAddon)}
                    className="h-4 w-4 rounded-sm accent-[#A84824]"
                  />
                  <label htmlFor="conditioner" className="font-mono text-xs text-[#1D1814]">
                    Add Oregon Beeswax Conditioner Bar
                  </label>
                </div>
                <span className="font-mono text-xs font-bold text-[#1D1814]">+$18</span>
              </div>
            </div>

            {/* Drawer Subtotal & Checkout */}
            <div className="border-t border-[#1D1814]/15 pt-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#1D1814]/60">SHIPPING:</span>
                  <span className="font-bold text-[#23382B]">FREE INSURED GROUND ($0)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1D1814]/60">ESTIMATED DISPATCH:</span>
                  <span className="font-bold">48 Hours from Portland</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1D1814] pt-2 border-t border-[#1D1814]/10">
                  <span>SUBTOTAL:</span>
                  <span>${cartSubtotal} USD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerToast("Order transmitted to Portland Bench queue for initial hot-stamping.");
                }}
                disabled={cartItems.length === 0}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-sm bg-[#A84824] px-6 font-mono text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#8B3B1D] disabled:opacity-40"
              >
                Confirm Portland Atelier Allocation
              </button>

              <div className="mt-2 text-center font-mono text-[10px] text-[#1D1814]/50">
                Guaranteed by the Martinez Family Lifetime Craft Covenant.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-sm border border-[#1D1814] bg-[#1D1814] px-5 py-3 font-mono text-xs text-[#F7F4EE] shadow-2xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

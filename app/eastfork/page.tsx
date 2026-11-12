"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// --- TYPES & INTERFACES ---
interface GlazeColor {
  id: string;
  name: string;
  hex: string;
  toneClass: string;
  description: string;
  ironSpeckling: "subtle" | "pronounced" | "dense";
}

interface CeramicPiece {
  id: string;
  name: string;
  role: string;
  price: number;
  diameterInches: number;
  heightInches: number;
  stackHeightInches: number; // for 4 nested pieces
  weightOz: number;
  image: string;
}

interface TableSettingPreset {
  id: string;
  label: string;
  peopleCount: number;
  tableLengthInches: number;
  tableWidthInches: number;
  description: string;
}

interface KilnStage {
  cone: string;
  tempF: number;
  tempC: number;
  label: string;
  atmosphere: string;
  clayState: string;
  glazeAction: string;
  narrative: string;
}

interface CatalogSKU {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: "dinnerware" | "bowls" | "drinkware" | "sets";
  studioImage: string;
  dimensions: string;
  volumeOrWeight: string;
  leadTime: string;
  inKilnBatchCount: number;
  highlights: string[];
}

// --- MASTER DATA ---
const GLAZE_PALETTE: GlazeColor[] = [
  {
    id: "panna-cotta",
    name: "Panna Cotta",
    hex: "#F4EFE6",
    toneClass: "bg-[#F4EFE6]",
    description: "Warm creamy off-white with fine Appalachian iron freckles",
    ironSpeckling: "pronounced",
  },
  {
    id: "morel",
    name: "Morel",
    hex: "#5C5248",
    toneClass: "bg-[#5C5248]",
    description: "Deep forest umber inspired by wild spring Blue Ridge mushrooms",
    ironSpeckling: "subtle",
  },
  {
    id: "amaro",
    name: "Amaro",
    hex: "#A8532C",
    toneClass: "bg-[#A8532C]",
    description: "Bittersweet burnt terracotta amber blooming under gas reduction",
    ironSpeckling: "dense",
  },
  {
    id: "pollen",
    name: "Pollen",
    hex: "#D69F3D",
    toneClass: "bg-[#D69F3D]",
    description: "Golden calendula and wild mountain mustard mineral glaze",
    ironSpeckling: "subtle",
  },
  {
    id: "soapstone",
    name: "Soapstone",
    hex: "#3D4448",
    toneClass: "bg-[#3D4448]",
    description: "Matte cool slate charcoal mirroring Appalachian riverbed rocks",
    ironSpeckling: "dense",
  },
  {
    id: "night-swim",
    name: "Night Swim",
    hex: "#1F2B37",
    toneClass: "bg-[#1F2B37]",
    description: "Abyssal indigo blue recalling midnight mountain swimming holes",
    ironSpeckling: "subtle",
  },
];

const CERAMIC_PIECES: CeramicPiece[] = [
  {
    id: "dinner-plate",
    name: "The Dinner Plate",
    role: "Base Course",
    price: 48,
    diameterInches: 10.5,
    heightInches: 1.2,
    stackHeightInches: 2.8,
    weightOz: 32,
    image: "/assets/eastfork/plate-dinner-plate.jpg",
  },
  {
    id: "everyday-bowl",
    name: "The Everyday Bowl",
    role: "Pasta & Grains",
    price: 44,
    diameterInches: 8.0,
    heightInches: 2.25,
    stackHeightInches: 4.8,
    weightOz: 22,
    image: "/assets/eastfork/bowl-everyday-bowl.jpg",
  },
  {
    id: "side-plate",
    name: "The Side Plate",
    role: "Bread & Salad",
    price: 42,
    diameterInches: 8.0,
    heightInches: 1.0,
    stackHeightInches: 2.4,
    weightOz: 18,
    image: "/assets/eastfork/plate-side-plate.jpg",
  },
  {
    id: "the-mug",
    name: "The Mug",
    role: "Coffee & Broth",
    price: 44,
    diameterInches: 3.5,
    heightInches: 4.25,
    stackHeightInches: 8.5,
    weightOz: 16,
    image: "/assets/eastfork/cup-the-mug.jpg",
  },
  {
    id: "bitty-bowl",
    name: "The Bitty Bowl",
    role: "Pinch & Sauce",
    price: 24,
    diameterInches: 4.25,
    heightInches: 1.75,
    stackHeightInches: 3.6,
    weightOz: 6,
    image: "/assets/eastfork/bowl-bitty-bowl.jpg",
  },
];

const TABLE_PRESETS: TableSettingPreset[] = [
  {
    id: "bistro-2",
    label: "2-Person Bistro",
    peopleCount: 2,
    tableLengthInches: 48,
    tableWidthInches: 32,
    description: "Compact round or cafe dining table; focus on nesting efficiency",
  },
  {
    id: "family-4",
    label: "4-Person Casual Gathering",
    peopleCount: 4,
    tableLengthInches: 72,
    tableWidthInches: 36,
    description: "Standard residential dining table with generous shared serving zone",
  },
  {
    id: "harvest-8",
    label: "8-Person Harvest Feast",
    peopleCount: 8,
    tableLengthInches: 96,
    tableWidthInches: 42,
    description: "Full Appalachian farm table with multi-course layering and platters",
  },
];

const KILN_STAGES: KilnStage[] = [
  {
    cone: "Cone 06",
    tempF: 1828,
    tempC: 998,
    label: "Stage 01 // Bisque Burnout",
    atmosphere: "Oxidizing Pre-Heat",
    clayState: "Porous terra-cotta body, chemically bound water evaporated",
    glazeAction: "Raw powdered mineral dip applied; dry chalky suspension",
    narrative:
      "All physical and chemical water leaves the regional North Carolina clay. The bisque ware rings hollow and porous, ready to absorb the liquid feldspar and wood ash glaze suspension.",
  },
  {
    cone: "Cone 6",
    tempF: 2232,
    tempC: 1222,
    label: "Stage 02 // Vitrification Melt",
    atmosphere: "Transition Air Mix",
    clayState: "Clay particles fuse; pore structure begins irreversible shrinkage",
    glazeAction: "Silica and feldspar melt into glass flux; iron begins activation",
    narrative:
      "Stoneware body vitrifies into a non-porous ceramic mass. The glaze liquefies into a viscous molten glass coating, bonding permanently to the clay body without synthetic adhesives.",
  },
  {
    cone: "Cone 10",
    tempF: 2345,
    tempC: 1285,
    label: "Stage 03 // Gas Reduction Peak",
    atmosphere: "Starved Oxygen (CO Rich)",
    clayState: "Full stone vitrification; zero water absorption, chip resistant",
    glazeAction: "Atmosphere strips oxygen from clay iron, pulling dark freckles outward",
    narrative:
      "The definitive East Fork threshold. The burners are starved of oxygen, forcing flames to draw oxygen directly from iron oxide inside the local clay. This creates the signature speckled bloom across every plate.",
  },
];

const CATALOG_DATA: CatalogSKU[] = [
  {
    id: "the-mug-core",
    name: "The Mug",
    tagline: "Iconic 12oz Everyday Cup with Generous Two-Finger Handle",
    price: 44,
    category: "drinkware",
    studioImage: "/assets/eastfork/cup-the-mug.jpg",
    dimensions: '4.25"H x 3.5"W (excluding handle)',
    volumeOrWeight: "12 oz fluid capacity / 16 oz clay weight",
    leadTime: "Kiln Batch: Ships in 48h",
    inKilnBatchCount: 18,
    highlights: [
      "Ergonomic handle pulled to balance comfortably when filled",
      "Unglazed raw clay foot ring polished smooth on diamond pads",
      "Microwave, dishwasher, and commercial oven safe to 450°F",
      "Formulated with North Carolina and Southeast clays",
    ],
  },
  {
    id: "the-everyday-bowl-core",
    name: "The Everyday Bowl",
    tagline: "Wide, Low-Slung 8-Inch Bowl for Grain Bowls, Stews & Pasta",
    price: 44,
    category: "bowls",
    studioImage: "/assets/eastfork/bowl-everyday-bowl.jpg",
    dimensions: '8" Diameter x 2.25" Height',
    volumeOrWeight: "3.5 cups fluid capacity / 22 oz clay weight",
    leadTime: "Kiln Batch: Ships in 48h",
    inKilnBatchCount: 14,
    highlights: [
      "Low center of gravity prevents tipping during casual dining",
      "Curved interior wall guides spoons naturally to the rim",
      "Stacks 4 bowls tall inside compact 5-inch cabinet spaces",
      "Tested for daily cutlery friction with zero glaze scuffing",
    ],
  },
  {
    id: "the-dinner-plate-core",
    name: "The Dinner Plate",
    tagline: "10.5-Inch Flatware Anchor with Generous Low Coupe Lip",
    price: 48,
    category: "dinnerware",
    studioImage: "/assets/eastfork/plate-dinner-plate.jpg",
    dimensions: '10.5" Diameter x 1.2" Height',
    volumeOrWeight: "32 oz dense vitrified stoneware",
    leadTime: "Kiln Batch: Ships in 48h",
    inKilnBatchCount: 12,
    highlights: [
      "Flat interior floor allows sauces to pool without spillover",
      "Precision-machined rim nests smoothly in standard dishwashers",
      "Unglazed burnished base prevents scratching polished wood tables",
      "Retains plate warmth through 45-minute family meals",
    ],
  },
  {
    id: "the-side-plate-core",
    name: "The Side Plate",
    tagline: "8-Inch Coupe for Toast, Morning Eggs, and Fresh Greens",
    price: 42,
    category: "dinnerware",
    studioImage: "/assets/eastfork/plate-side-plate.jpg",
    dimensions: '8" Diameter x 1.0" Height',
    volumeOrWeight: "18 oz clay weight",
    leadTime: "Kiln Batch: Ships in 48h",
    inKilnBatchCount: 16,
    highlights: [
      "Pairs directly under the Everyday Bowl as a dining charger",
      "Gentle coupe lip keeps olive oils and dressings contained",
      "Stack profile of 4 plates occupies just 2.4 inches vertically",
      "Hand-trimmed on potter wheel chucks before reduction firing",
    ],
  },
  {
    id: "the-weeknight-serving-bowl",
    name: "The Weeknight Serving Bowl",
    tagline: "Generous 11-Inch Centerpiece Bowl for Family Dinners",
    price: 98,
    category: "bowls",
    studioImage: "/assets/eastfork/bowl-weeknight-serving-bowl.jpg",
    dimensions: '11" Diameter x 3.5" Height',
    volumeOrWeight: "8.5 cups fluid capacity / 48 oz clay weight",
    leadTime: "Crafted in 72h",
    inKilnBatchCount: 6,
    highlights: [
      "Holds full family salad greens, roasted tubers, or shellfish",
      "Thick thermal mass keeps family servings hot table-side",
      "Flat bottom anchors stably on linen runners or bare wood",
      "Double-dipped glaze gradient along exterior wall",
    ],
  },
  {
    id: "the-bitty-bowl-duo",
    name: "The Bitty Bowl",
    tagline: "Pocket-Sized 4.25-Inch Prep and Finishing Salt Cellar",
    price: 24,
    category: "bowls",
    studioImage: "/assets/eastfork/bowl-bitty-bowl.jpg",
    dimensions: '4.25" Diameter x 1.75" Height',
    volumeOrWeight: "6 oz clay weight",
    leadTime: "Ready to Ship",
    inKilnBatchCount: 28,
    highlights: [
      "Essential for pinch salts, chili crisps, dipping oils, and herbs",
      "Nests inside Everyday Bowl for compact storage",
      "Tapered foot for steady grip when seasoning active pans",
      "Gifted commonly as the introduction to East Fork glaze world",
    ],
  },
  {
    id: "the-potters-5-piece",
    name: "The Potter's 5-Piece Setting",
    tagline: "Complete Individual Suite: Mug, Everyday Bowl, Bitty, Side & Dinner",
    price: 198,
    category: "sets",
    studioImage: "/assets/eastfork/atelier-hero-05.jpg",
    dimensions: "Full Multi-Piece Suite (10.5\" to 4.25\")",
    volumeOrWeight: "96 oz total ceramic mass",
    leadTime: "Kiln Batch: Ships in 48h",
    inKilnBatchCount: 8,
    highlights: [
      "Includes 1 Dinner Plate, 1 Side Plate, 1 Everyday Bowl, 1 Bitty, 1 Mug",
      "Saves $8 versus open stock selection",
      "Allows contrasting glaze mix across courses or monochrome suite",
      "Packaged in custom recycled mold pulp protective cradles",
    ],
  },
  {
    id: "all-set-7-piece",
    name: "The 7-Piece Place Setting Suite",
    tagline: "Full Heirloom Setting with Serving Accents for One Diner",
    price: 280,
    category: "sets",
    studioImage: "/assets/eastfork/atelier-hero-06.jpg",
    dimensions: "7 Nested Forms",
    volumeOrWeight: "138 oz total ceramic mass",
    leadTime: "Kiln Batch: Ships in 48h",
    inKilnBatchCount: 5,
    highlights: [
      "Adds Soup Bowl and Coupe Plate for complete 4-course dinners",
      "Saves $26 versus individually boxed pieces",
      "Includes complimentary East Fork felt dining protectors",
      "Lifetime chip replacement warranty guarantee",
    ],
  },
];

export default function EastForkStorefront() {
  // --- ENGINE 01: TABLETOP DINNER PARTY CANVAS STATE ---
  const [activeTablePresetId, setActiveTablePresetId] = useState<string>("family-4");
  const [selectedPieceGlazes, setSelectedPieceGlazes] = useState<Record<string, string>>({
    "dinner-plate": "panna-cotta",
    "everyday-bowl": "amaro",
    "side-plate": "morel",
    "the-mug": "pollen",
    "bitty-bowl": "soapstone",
  });
  const [tabletopViewMode, setTabletopViewMode] = useState<"tabletop" | "stacking">("tabletop");
  const [linenColor, setLinenColor] = useState<"natural" | "slate" | "terracotta">("natural");
  const [flatwareFinish, setFlatwareFinish] = useState<"brass" | "blackened">("brass");

  // --- ENGINE 02: KILN REDUCTION SIMULATOR STATE ---
  const [activeKilnStageIdx, setActiveKilnStageIdx] = useState<number>(2); // Defaults to Cone 10 (Peak)
  const [reductionAtmosphere, setReductionAtmosphere] = useState<boolean>(true); // true = Reduction, false = Oxidation
  const [selectedKilnGlaze, setSelectedKilnGlaze] = useState<string>("amaro");

  // --- ENGINE 03: CATALOG & ALLOCATION VAULT STATE ---
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<{ sku: CatalogSKU; glaze: string; qty: number }[]>([
    { sku: CATALOG_DATA[6], glaze: "panna-cotta", qty: 2 }, // 2x 5-Piece Settings
  ]);
  const [feltProtectorsAddon, setFeltProtectorsAddon] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Computed Table Setting Spec
  const activeTablePreset = useMemo(() => {
    return TABLE_PRESETS.find((t) => t.id === activeTablePresetId) || TABLE_PRESETS[1];
  }, [activeTablePresetId]);

  // Computed Total Weight of Tableware
  const totalTableCeramicWeightLbs = useMemo(() => {
    const singleSettingWeightOz = CERAMIC_PIECES.reduce((acc, p) => acc + p.weightOz, 0);
    const totalOz = singleSettingWeightOz * activeTablePreset.peopleCount;
    return (totalOz / 16).toFixed(1);
  }, [activeTablePreset]);

  // Computed Cart Subtotal
  const cartSubtotal = useMemo(() => {
    const itemsTotal = cartItems.reduce((acc, item) => acc + item.sku.price * item.qty, 0);
    const addonPrice = feltProtectorsAddon ? 16 : 0;
    // Volume discount for 4+ place settings
    const totalSettingQty = cartItems
      .filter((i) => i.sku.category === "sets")
      .reduce((acc, i) => acc + i.qty, 0);
    const discountMultiplier = totalSettingQty >= 8 ? 0.85 : totalSettingQty >= 4 ? 0.9 : 1.0;
    return Math.round(itemsTotal * discountMultiplier + addonPrice);
  }, [cartItems, feltProtectorsAddon]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleAddToCart = (sku: CatalogSKU, glazeChoice?: string) => {
    const chosenGlaze = glazeChoice || selectedPieceGlazes["dinner-plate"] || "panna-cotta";
    const existingIndex = cartItems.findIndex(
      (item) => item.sku.id === sku.id && item.glaze === chosenGlaze
    );
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].qty += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { sku, glaze: chosenGlaze, qty: 1 }]);
    }
    setDrawerOpen(true);
    triggerToast(`Allocated ${sku.name} (${chosenGlaze}) to Asheville kiln queue.`);
  };

  const handleUpdateQty = (skuId: string, glaze: string, delta: number) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.sku.id === skuId && item.glaze === glaze) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { sku: CatalogSKU; glaze: string; qty: number }[]
    );
  };

  const handleRemoveFromCart = (skuId: string, glaze: string) => {
    setCartItems(cartItems.filter((item) => !(item.sku.id === skuId && item.glaze === glaze)));
  };

  // --- 60 FPS HTML5 CANVAS ENGINE: TABLETOP & STACKING SIMULATION ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let pulseOffset = 0;

    const render = () => {
      pulseOffset += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (tabletopViewMode === "tabletop") {
        // --- VIEW 01: ARCHITECTURAL TOP-DOWN TABLE SETTING ---
        // Tabletop Texture Backdrop (Appalachian Oak / Mineral Wash)
        ctx.fillStyle = linenColor === "natural" ? "#EAE4D7" : linenColor === "slate" ? "#D8DFE2" : "#E2CEC5";
        ctx.fillRect(0, 0, width, height);

        // Linen Runner down center
        ctx.fillStyle = linenColor === "natural" ? "#F5EFE4" : linenColor === "slate" ? "#E8F0F3" : "#EEDFD9";
        ctx.fillRect(width * 0.15, 0, width * 0.7, height);

        // Linen Edge Hairlines
        ctx.strokeStyle = "rgba(33, 31, 29, 0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(width * 0.15, 0);
        ctx.lineTo(width * 0.15, height);
        ctx.moveTo(width * 0.85, 0);
        ctx.lineTo(width * 0.85, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Determine place-setting positions based on table preset
        const diners = activeTablePreset.peopleCount;
        const positions: { x: number; y: number; label: string }[] = [];

        if (diners === 2) {
          positions.push({ x: width * 0.5, y: height * 0.75, label: "Place 01" });
          positions.push({ x: width * 0.5, y: height * 0.25, label: "Place 02" });
        } else if (diners === 4) {
          positions.push({ x: width * 0.32, y: height * 0.75, label: "Place 01" });
          positions.push({ x: width * 0.68, y: height * 0.75, label: "Place 02" });
          positions.push({ x: width * 0.32, y: height * 0.25, label: "Place 03" });
          positions.push({ x: width * 0.68, y: height * 0.25, label: "Place 04" });
        } else {
          // 8 Diners
          for (let i = 0; i < 4; i++) {
            positions.push({ x: width * 0.2 + i * (width * 0.2), y: height * 0.75, label: `P0${i + 1}` });
            positions.push({ x: width * 0.2 + i * (width * 0.2), y: height * 0.25, label: `P0${i + 5}` });
          }
        }

        // Draw Place Settings
        positions.forEach((pos) => {
          const dinnerGlaze = GLAZE_PALETTE.find((g) => g.id === selectedPieceGlazes["dinner-plate"]) || GLAZE_PALETTE[0];
          const bowlGlaze = GLAZE_PALETTE.find((g) => g.id === selectedPieceGlazes["everyday-bowl"]) || GLAZE_PALETTE[2];
          const mugGlaze = GLAZE_PALETTE.find((g) => g.id === selectedPieceGlazes["the-mug"]) || GLAZE_PALETTE[3];
          const sideGlaze = GLAZE_PALETTE.find((g) => g.id === selectedPieceGlazes["side-plate"]) || GLAZE_PALETTE[1];

          // 1. Dinner Plate (Outer Circle)
          const dinnerRadius = diners === 8 ? 38 : 54;
          ctx.save();
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, dinnerRadius, 0, Math.PI * 2);
          ctx.fillStyle = dinnerGlaze.hex;
          ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
          ctx.shadowBlur = 12;
          ctx.shadowOffsetY = 4;
          ctx.fill();
          ctx.shadowColor = "transparent";

          // Unglazed outer rim ridge
          ctx.strokeStyle = "#C9B6A1";
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // 2. Everyday Bowl or Side Plate (Inner Circle Stack)
          const bowlRadius = dinnerRadius * 0.75;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, bowlRadius, 0, Math.PI * 2);
          ctx.fillStyle = bowlGlaze.hex;
          ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
          ctx.shadowBlur = 6;
          ctx.shadowOffsetY = 2;
          ctx.fill();
          ctx.strokeStyle = "#211F1D";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Bowl Interior Cavity
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, bowlRadius * 0.85, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0,0,0,0.12)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();

          // 3. Side Plate (Upper Left of Dinner Plate)
          const sideX = pos.x - dinnerRadius * 1.35;
          const sideY = pos.y - dinnerRadius * 0.45;
          const sideRadius = dinnerRadius * 0.65;
          ctx.save();
          ctx.beginPath();
          ctx.arc(sideX, sideY, sideRadius, 0, Math.PI * 2);
          ctx.fillStyle = sideGlaze.hex;
          ctx.shadowColor = "rgba(0,0,0,0.1)";
          ctx.shadowBlur = 6;
          ctx.shadowOffsetY = 2;
          ctx.fill();
          ctx.strokeStyle = "#C9B6A1";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();

          // 4. The Mug (Upper Right of Dinner Plate)
          const mugX = pos.x + dinnerRadius * 1.35;
          const mugY = pos.y - dinnerRadius * 0.55;
          const mugRadius = dinnerRadius * 0.38;
          ctx.save();
          // Mug Body
          ctx.beginPath();
          ctx.arc(mugX, mugY, mugRadius, 0, Math.PI * 2);
          ctx.fillStyle = mugGlaze.hex;
          ctx.shadowColor = "rgba(0,0,0,0.12)";
          ctx.shadowBlur = 5;
          ctx.shadowOffsetY = 2;
          ctx.fill();
          ctx.strokeStyle = "#211F1D";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Mug Handle (drawn to the right)
          ctx.beginPath();
          ctx.arc(mugX + mugRadius + 3, mugY, 5, -Math.PI / 2, Math.PI / 2);
          ctx.lineWidth = 3;
          ctx.strokeStyle = mugGlaze.hex;
          ctx.stroke();
          ctx.restore();

          // 5. Flatware Accents (Fork left, Knife/Spoon right)
          ctx.strokeStyle = flatwareFinish === "brass" ? "#C69234" : "#1A1918";
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";

          // Fork (Left)
          ctx.beginPath();
          ctx.moveTo(pos.x - dinnerRadius - 12, pos.y - dinnerRadius * 0.7);
          ctx.lineTo(pos.x - dinnerRadius - 12, pos.y + dinnerRadius * 0.7);
          ctx.stroke();

          // Knife (Right)
          ctx.beginPath();
          ctx.moveTo(pos.x + dinnerRadius + 12, pos.y - dinnerRadius * 0.7);
          ctx.lineTo(pos.x + dinnerRadius + 12, pos.y + dinnerRadius * 0.7);
          ctx.stroke();
        });

        // Center Table Telemetry Label
        ctx.fillStyle = "#211F1D";
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillText(
          `DINING SPAN: ${activeTablePreset.tableLengthInches}"L x ${activeTablePreset.tableWidthInches}"W // ${activeTablePreset.peopleCount} COVERS // TOTAL CERAMIC MASS: ${totalTableCeramicWeightLbs} LBS`,
          width / 2,
          height / 2
        );
      } else {
        // --- VIEW 02: CABINET STACKING CALIPER (VERTICAL NESTING PROFILE) ---
        ctx.fillStyle = "#F8F6F0";
        ctx.fillRect(0, 0, width, height);

        // Cupboard Shelf Line
        const shelfY = height * 0.78;
        ctx.strokeStyle = "#211F1D";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width * 0.1, shelfY);
        ctx.lineTo(width * 0.9, shelfY);
        ctx.stroke();

        // Shelf Wall
        ctx.fillStyle = "rgba(33, 31, 29, 0.04)";
        ctx.fillRect(width * 0.1, shelfY, width * 0.8, 18);

        // Stacking Everyday Bowls (4 Nested Bowls)
        const bowlStackX = width * 0.35;
        const bowlGlaze = GLAZE_PALETTE.find((g) => g.id === selectedPieceGlazes["everyday-bowl"]) || GLAZE_PALETTE[2];

        for (let i = 0; i < 4; i++) {
          const currentY = shelfY - 14 - i * 22;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(bowlStackX - 90, currentY - 26);
          ctx.quadraticCurveTo(bowlStackX, currentY + 14, bowlStackX + 90, currentY - 26);
          ctx.lineTo(bowlStackX + 70, currentY + 4);
          ctx.lineTo(bowlStackX - 70, currentY + 4);
          ctx.closePath();
          ctx.fillStyle = bowlGlaze.hex;
          ctx.shadowColor = "rgba(0,0,0,0.1)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 2;
          ctx.fill();
          ctx.strokeStyle = "#211F1D";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        // Stacking Dinner Plates (4 Nested Plates)
        const plateStackX = width * 0.7;
        const plateGlaze = GLAZE_PALETTE.find((g) => g.id === selectedPieceGlazes["dinner-plate"]) || GLAZE_PALETTE[0];

        for (let i = 0; i < 4; i++) {
          const currentY = shelfY - 6 - i * 14;
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(plateStackX - 110, currentY - 8, 220, 10, [2, 2, 4, 4]);
          ctx.fillStyle = plateGlaze.hex;
          ctx.fill();
          ctx.strokeStyle = "#211F1D";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        // Caliper Arrows & Measurement Annotations
        ctx.strokeStyle = "#A8532C";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);

        // Bowl Stack Height Caliper
        ctx.beginPath();
        ctx.moveTo(bowlStackX + 110, shelfY);
        ctx.lineTo(bowlStackX + 110, shelfY - 88);
        ctx.stroke();

        // Plate Stack Height Caliper
        ctx.beginPath();
        ctx.moveTo(plateStackX + 130, shelfY);
        ctx.lineTo(plateStackX + 130, shelfY - 52);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#A8532C";
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = "left";
        ctx.fillText("4 BOWLS: 4.8\" VERTICAL SPAN", bowlStackX + 118, shelfY - 44);
        ctx.fillText("4 PLATES: 2.8\" VERTICAL SPAN", plateStackX + 138, shelfY - 26);

        ctx.fillStyle = "#211F1D";
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillText(
          "CABINET CUPBOARD CLEARANCE: PRECISION NESTED COUPE GEOMETRY (ZERO WOBBLE)",
          width / 2,
          height * 0.18
        );
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [
    tabletopViewMode,
    activeTablePreset,
    selectedPieceGlazes,
    linenColor,
    flatwareFinish,
    totalTableCeramicWeightLbs,
  ]);

  const currentKilnStage = KILN_STAGES[activeKilnStageIdx];
  const activeGlazeObj = GLAZE_PALETTE.find((g) => g.id === selectedKilnGlaze) || GLAZE_PALETTE[2];

  const filteredCatalog = useMemo(() => {
    if (activeCategory === "all") return CATALOG_DATA;
    return CATALOG_DATA.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen bg-[#F8F6F0] text-[#211F1D] selection:bg-[#B3542E] selection:text-white">
      {/* --- TOP BANNER // ASHEVILLE CRAFT MANIFESTO --- */}
      <div className="border-b border-[#211F1D]/10 bg-[#211F1D] px-4 py-2 text-center text-xs tracking-widest text-[#F8F6F0] uppercase">
        <span className="inline-block font-mono text-[#D69F3D]">ASHEVILLE ATELIER // FOUNDED 2009</span>{" "}
        <span className="mx-2 opacity-40">|</span> REGIONAL APPALACHIAN CLAY • CONE 10 (2,345°F) GAS-FIRED REDUCTION STONEWARE
      </div>

      {/* --- PRIMARY NAVIGATION HEADER --- */}
      <header className="sticky top-0 z-40 border-b border-[#211F1D]/10 bg-[#F8F6F0]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand Mark & Lineage */}
          <Link href="#storefront-top" className="group flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-sm border border-[#211F1D]/20 bg-[#E8DFD1] p-1 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/assets/eastfork/eastfork-logo.svg"
                alt="East Fork Pottery Mark"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#211F1D] group-hover:text-[#B3542E]">
                EAST FORK
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[#211F1D]/60 uppercase">
                Alex & Connie Matisse • Asheville, NC
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-8 text-xs font-semibold tracking-wider text-[#211F1D]/80 uppercase md:flex">
            <Link href="#tabletop" className="transition-colors hover:text-[#B3542E]">
              01 // Tabletop Canvas
            </Link>
            <Link href="#kiln" className="transition-colors hover:text-[#B3542E]">
              02 // Cone 10 Kiln Lab
            </Link>
            <Link href="#collection" className="transition-colors hover:text-[#B3542E]">
              03 // Pottery Suite
            </Link>
            <Link href="#matisse" className="transition-colors hover:text-[#B3542E]">
              04 // The 2009 Lineage
            </Link>
          </nav>

          {/* Action Hub & Cart Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="#tabletop"
              className="hidden h-11 items-center justify-center rounded-sm border border-[#211F1D] px-4 font-mono text-xs font-semibold tracking-wider text-[#211F1D] uppercase transition-colors hover:bg-[#211F1D] hover:text-[#F8F6F0] sm:inline-flex"
            >
              Set Tabletop
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Asheville Allocation Vault Drawer"
              className="relative flex h-12 min-w-[56px] items-center justify-center rounded-sm bg-[#211F1D] px-4 font-mono text-xs font-bold text-[#F8F6F0] shadow-sm transition-transform active:scale-95"
            >
              <span>VAULT</span>
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#B3542E] text-[10px] text-white">
                {cartItems.reduce((acc, ci) => acc + ci.qty, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION // APPALACHIAN STONEWARE LINEAGE --- */}
      <section id="storefront-top" className="relative overflow-hidden border-b border-[#211F1D]/10 bg-[#E8DFD1]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-8">
          {/* Left Text Column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-sm border border-[#211F1D]/15 bg-[#F8F6F0] px-3 py-1 font-mono text-xs text-[#211F1D]">
              <span className="h-2 w-2 rounded-full bg-[#B3542E]"></span>
              <span>INDEPENDENT ASHEVILLE POTTERY // CERTIFIED B-CORP</span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.08] font-bold text-[#211F1D] sm:text-5xl md:text-6xl lg:text-7xl">
              Stoneware molded from North Carolina clay and 2,345°F reduction fire.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#211F1D]/80 sm:text-lg">
              Founded in 2009 by Alex Matisse (great-grandson of painter Henri Matisse), Connie Matisse,
              and John Vigeland. Fired at Cone 10 in gas reduction kilns, pulling raw iron freckles
              through velvety feldspar glazes. Designed to outlast generations of daily meals.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#tabletop"
                className="flex h-12 items-center justify-center rounded-sm bg-[#211F1D] px-6 font-mono text-xs font-bold tracking-wider text-[#F8F6F0] uppercase transition-colors hover:bg-[#B3542E]"
              >
                Launch Tabletop Place Setting Canvas
              </a>
              <a
                href="#collection"
                className="flex h-12 items-center justify-center rounded-sm border border-[#211F1D] bg-transparent px-6 font-mono text-xs font-bold tracking-wider text-[#211F1D] uppercase transition-colors hover:bg-[#211F1D]/5"
              >
                Browse Fired Ceramics
              </a>
            </div>

            {/* Verification Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#211F1D]/15 pt-6 font-mono">
              <div>
                <div className="text-2xl font-bold text-[#211F1D]">Cone 10</div>
                <div className="text-[11px] text-[#211F1D]/60 uppercase">2,345°F Vitrification</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#B3542E]">100%</div>
                <div className="text-[11px] text-[#211F1D]/60 uppercase">SE Regional Clay</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#D69F3D]">Zero</div>
                <div className="text-[11px] text-[#211F1D]/60 uppercase">Lead & Cadmium</div>
              </div>
            </div>
          </div>

          {/* Right Visual Frame */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[#211F1D]/20 bg-[#211F1D] shadow-2xl">
              <Image
                src="/assets/eastfork/atelier-hero-04.jpg"
                alt="East Fork pottery place setting in Asheville dining atmosphere"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211F1D] via-transparent to-transparent opacity-80"></div>
              <div className="absolute right-4 bottom-4 left-4 border border-[#F8F6F0]/20 bg-[#211F1D]/85 p-4 text-[#F8F6F0] backdrop-blur-sm">
                <div className="font-mono text-[10px] text-[#D69F3D] uppercase">
                  ASHEVILLE ATELIER VERIFICATION
                </div>
                <div className="font-serif text-base font-semibold">
                  Hand-trimmed on wheel chucks with raw burnished foot rings.
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#F8F6F0]/60">
                  Zero plastic coating. Zero mass-market molds.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 01 // 60 FPS TABLETOP DINNER PARTY PLACE-SETTING CANVAS --- */}
      <section id="tabletop" className="border-b border-[#211F1D]/10 bg-[#F8F6F0] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#B3542E] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B3542E]"></span>
              <span>ENGINE 01 // INTERACTIVE DINING ARCHITECTURE</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#211F1D] sm:text-4xl md:text-5xl">
              60 FPS Tabletop Dinner Party Canvas
            </h2>
            <p className="text-base text-[#211F1D]/80">
              The primary hurdle in purchasing multi-piece ceramic suites is tabletop uncertainty:
              how do contrasting glaze colorways look together, how do 4 or 8 place-settings fit your
              dining table span, and how do they nest inside your kitchen cabinet?
            </p>
          </div>

          {/* Table Size Preset Selector */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {TABLE_PRESETS.map((preset) => {
              const isSelected = preset.id === activeTablePresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveTablePresetId(preset.id)}
                  className={`flex h-full min-h-[56px] flex-col justify-between rounded-sm border p-4 text-left transition-all ${
                    isSelected
                      ? "border-[#211F1D] bg-[#211F1D] text-[#F8F6F0] shadow-md"
                      : "border-[#211F1D]/15 bg-[#E8DFD1]/60 text-[#211F1D] hover:border-[#211F1D]/40 hover:bg-[#E8DFD1]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] tracking-wider opacity-60 uppercase">
                        TABLE DIMENSION
                      </span>
                      <h3 className="font-serif text-lg font-bold">{preset.label}</h3>
                    </div>
                    <span className="font-mono text-xs font-bold">{preset.peopleCount} Covers</span>
                  </div>

                  <div className="mt-4 border-t border-current/15 pt-2 font-mono text-[11px] opacity-80">
                    <div>Span: {preset.tableLengthInches}"L x {preset.tableWidthInches}"W</div>
                    <div className="truncate">{preset.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Workspace Matrix */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left Column: Course-by-Course Glaze Mixer */}
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-sm border border-[#211F1D]/15 bg-[#E8DFD1] p-5">
                <div className="flex items-center justify-between border-b border-[#211F1D]/10 pb-3">
                  <span className="font-mono text-xs font-bold text-[#211F1D] uppercase">
                    Place Setting Glaze Mixer
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTabletopViewMode("tabletop")}
                      className={`rounded-sm px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-colors ${
                        tabletopViewMode === "tabletop"
                          ? "bg-[#211F1D] text-white"
                          : "bg-white text-[#211F1D]"
                      }`}
                    >
                      Top-Down
                    </button>
                    <button
                      onClick={() => setTabletopViewMode("stacking")}
                      className={`rounded-sm px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-colors ${
                        tabletopViewMode === "stacking"
                          ? "bg-[#211F1D] text-white"
                          : "bg-white text-[#211F1D]"
                      }`}
                    >
                      Stacking
                    </button>
                  </div>
                </div>

                {/* Individual Pieces Glaze Selector */}
                <div className="mt-4 space-y-3">
                  {CERAMIC_PIECES.map((piece) => {
                    const currentGlazeId = selectedPieceGlazes[piece.id] || "panna-cotta";
                    const currentGlaze = GLAZE_PALETTE.find((g) => g.id === currentGlazeId) || GLAZE_PALETTE[0];

                    return (
                      <div
                        key={piece.id}
                        className="rounded-sm border border-[#211F1D]/10 bg-[#F8F6F0] p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold">{piece.name}</div>
                            <div className="font-mono text-[10px] text-[#211F1D]/60">
                              {piece.role} • {piece.diameterInches}" Diameter • ${piece.price}
                            </div>
                          </div>
                          <span
                            className="inline-block h-4 w-4 rounded-full border border-black/20"
                            style={{ backgroundColor: currentGlaze.hex }}
                          ></span>
                        </div>

                        {/* Swatches Row */}
                        <div className="mt-2.5 flex items-center gap-1.5">
                          {GLAZE_PALETTE.map((glaze) => (
                            <button
                              key={glaze.id}
                              onClick={() =>
                                setSelectedPieceGlazes({
                                  ...selectedPieceGlazes,
                                  [piece.id]: glaze.id,
                                })
                              }
                              title={`${glaze.name} — ${glaze.description}`}
                              className={`h-6 flex-1 rounded-sm border transition-all ${
                                currentGlazeId === glaze.id
                                  ? "scale-105 border-[#211F1D] ring-1 ring-[#211F1D]"
                                  : "border-black/20 opacity-70 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: glaze.hex }}
                              aria-label={`Select ${glaze.name} glaze for ${piece.name}`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tabletop Atmosphere Accents */}
                <div className="mt-4 border-t border-[#211F1D]/10 pt-3">
                  <span className="font-mono text-[10px] font-bold text-[#211F1D] uppercase">
                    Table Runner & Flatware Accents:
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div className="flex gap-1">
                      {(["natural", "slate", "terracotta"] as const).map((clr) => (
                        <button
                          key={clr}
                          onClick={() => setLinenColor(clr)}
                          className={`flex-1 rounded-sm border py-1 capitalize ${
                            linenColor === clr ? "border-[#211F1D] bg-[#211F1D] text-white" : "bg-white"
                          }`}
                        >
                          {clr}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {(["brass", "blackened"] as const).map((fin) => (
                        <button
                          key={fin}
                          onClick={() => setFlatwareFinish(fin)}
                          className={`flex-1 rounded-sm border py-1 capitalize ${
                            flatwareFinish === fin ? "border-[#211F1D] bg-[#211F1D] text-white" : "bg-white"
                          }`}
                        >
                          {fin}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clay & Kiln Spec Card */}
              <div className="rounded-sm border border-[#211F1D]/15 bg-[#211F1D] p-5 text-[#F8F6F0]">
                <div className="font-mono text-[10px] text-[#D69F3D] uppercase">
                  APPALACHIAN GEOLOGICAL FORMULA
                </div>
                <div className="mt-1 font-serif text-lg font-bold">Asheville Vitrified Stoneware</div>
                <div className="mt-3 space-y-2 font-mono text-xs text-[#F8F6F0]/80">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-[#F8F6F0]/50">CLAY BODY:</span>
                    <span className="text-right font-semibold">Regional Red & Buff Stoneware</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-[#F8F6F0]/50">FIRING TARGET:</span>
                    <span className="text-right font-semibold">Cone 10 // 2,345°F Gas Reduction</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8F6F0]/50">POROSITY INDEX:</span>
                    <span className="text-right font-semibold">&lt; 0.5% Absorption (Commercial Grade)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 60 FPS HTML5 Canvas Viewport & Metrics */}
            <div className="space-y-4 lg:col-span-7">
              <div className="relative overflow-hidden rounded-sm border border-[#211F1D]/20 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#211F1D]/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#B3542E] uppercase">
                      TABLETOP SPREAD SIMULATION
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#211F1D]">
                      {tabletopViewMode === "tabletop"
                        ? "Top-Down Table Setting Spread"
                        : "Cupboard Cabinet Vertical Nesting"}
                    </h4>
                  </div>
                  <div className="text-right font-mono">
                    <span className="inline-block rounded-sm bg-[#211F1D] px-2.5 py-1 text-xs font-bold text-white">
                      {activeTablePreset.peopleCount} COVERS ACTIVE
                    </span>
                  </div>
                </div>

                {/* HTML5 Canvas */}
                <div className="relative mt-4 flex items-center justify-center bg-[#F8F6F0] p-2">
                  <canvas
                    ref={canvasRef}
                    width={560}
                    height={380}
                    className="max-h-[380px] w-full object-contain"
                  />
                </div>

                {/* Telemetry Metrics Row */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#211F1D]/10 pt-4 sm:grid-cols-4 font-mono text-xs">
                  <div className="rounded-sm bg-[#E8DFD1] p-3">
                    <span className="text-[10px] text-[#211F1D]/60 uppercase">TABLE CLEARANCE</span>
                    <div className="text-lg font-bold text-[#211F1D]">
                      {activeTablePreset.tableLengthInches}" × {activeTablePreset.tableWidthInches}"
                    </div>
                    <div className="text-[10px] text-[#211F1D]/50">Span Dimension</div>
                  </div>

                  <div className="rounded-sm bg-[#E8DFD1] p-3">
                    <span className="text-[10px] text-[#211F1D]/60 uppercase">CERAMIC PAYLOAD</span>
                    <div className="text-lg font-bold text-[#211F1D]">
                      {totalTableCeramicWeightLbs} lbs
                    </div>
                    <div className="text-[10px] text-[#211F1D]/50">Total Stoneware Mass</div>
                  </div>

                  <div className="rounded-sm bg-[#E8DFD1] p-3">
                    <span className="text-[10px] text-[#211F1D]/60 uppercase">NESTING HEIGHT</span>
                    <div className="text-lg font-bold text-[#B3542E]">4.8" Max</div>
                    <div className="text-[10px] text-[#211F1D]/50">4 Nested Bowls</div>
                  </div>

                  <div className="rounded-sm bg-[#E8DFD1] p-3">
                    <span className="text-[10px] text-[#211F1D]/60 uppercase">TABLE SPREAD</span>
                    <div className="text-lg font-bold text-[#211F1D]">
                      {activeTablePreset.peopleCount * 5} Pieces
                    </div>
                    <div className="text-[10px] text-[#211F1D]/50">Across Tabletop</div>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#211F1D]/10 pt-4">
                  <div className="font-mono text-xs text-[#211F1D]/70">
                    Configuration optimized for dishwasher racks and cabinet shelves.
                  </div>
                  <button
                    onClick={() => {
                      const fivePiece = CATALOG_DATA.find((c) => c.id === "the-potters-5-piece") || CATALOG_DATA[6];
                      handleAddToCart(fivePiece, selectedPieceGlazes["dinner-plate"]);
                    }}
                    className="flex h-11 items-center justify-center rounded-sm bg-[#B3542E] px-5 font-mono text-xs font-bold text-white uppercase transition-colors hover:bg-[#8E3F20]"
                  >
                    Allocate {activeTablePreset.peopleCount} Sets to Vault
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 02 // GAS-FIRED REDUCTION GLAZE KILN TEMPERATURE SIMULATOR --- */}
      <section id="kiln" className="border-b border-[#211F1D]/10 bg-[#E8DFD1] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#D69F3D] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D69F3D]"></span>
              <span>ENGINE 02 // PYROMETRIC HEAT & REDUCTION KILN LAB</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#211F1D] sm:text-4xl md:text-5xl">
              Cone 10 (2,345°F) Reduction Kiln Simulator
            </h2>
            <p className="text-base text-[#211F1D]/80">
              Unlike electric kilns that bake ceramics in uniform clean air, East Fork fires in
              gas kilns starved of oxygen. The hungry flame pulls oxygen directly from iron minerals
              inside the local clay, creating the warm freckled blooming that defines authentic studio pottery.
            </p>
          </div>

          {/* Interactive Kiln Matrix */}
          <div className="mt-10 rounded-sm border border-[#211F1D]/15 bg-[#F8F6F0] p-6 shadow-sm">
            {/* Atmosphere Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#211F1D]/10 pb-4">
              <span className="font-mono text-xs font-bold text-[#211F1D] uppercase">
                Kiln Atmospheric Draft:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReductionAtmosphere(false)}
                  className={`flex h-9 items-center gap-2 rounded-sm border px-3 font-mono text-xs font-semibold transition-all ${
                    !reductionAtmosphere
                      ? "border-[#211F1D] bg-[#211F1D] text-white shadow-sm"
                      : "border-[#211F1D]/20 bg-white text-[#211F1D] hover:bg-[#E8DFD1]"
                  }`}
                >
                  <span>Oxidation (Electric Air)</span>
                </button>
                <button
                  onClick={() => setReductionAtmosphere(true)}
                  className={`flex h-9 items-center gap-2 rounded-sm border px-3 font-mono text-xs font-semibold transition-all ${
                    reductionAtmosphere
                      ? "border-[#B3542E] bg-[#B3542E] text-white shadow-sm"
                      : "border-[#211F1D]/20 bg-white text-[#211F1D] hover:bg-[#E8DFD1]"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-[#D69F3D]"></span>
                  <span>Gas Reduction (East Fork Cone 10)</span>
                </button>
              </div>
            </div>

            {/* Pyrometric Cone Temperature Slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#B3542E] uppercase">
                  TEMPERATURE TARGET: {currentKilnStage.cone} ({currentKilnStage.tempF}°F / {currentKilnStage.tempC}°C)
                </span>
                <span className="text-[#211F1D]/60">DRAG CONE SLIDER TO HEAT FIRING</span>
              </div>

              <input
                type="range"
                min={0}
                max={2}
                step={1}
                value={activeKilnStageIdx}
                onChange={(e) => setActiveKilnStageIdx(Number(e.target.value))}
                className="mt-3 h-3 w-full cursor-pointer appearance-none rounded-sm bg-[#211F1D]/15 accent-[#B3542E]"
                aria-label="Pyrometric cone temperature slider"
              />

              <div className="mt-2 grid grid-cols-3 font-mono text-[11px] text-[#211F1D]/70">
                <div className={activeKilnStageIdx === 0 ? "font-bold text-[#B3542E]" : ""}>
                  Cone 06 // 1,828°F (Bisque)
                </div>
                <div className={activeKilnStageIdx === 1 ? "font-bold text-[#B3542E]" : ""}>
                  Cone 6 // 2,232°F (Melt)
                </div>
                <div className={activeKilnStageIdx === 2 ? "font-bold text-[#B3542E]" : ""}>
                  Cone 10 // 2,345°F (Peak Reduction)
                </div>
              </div>
            </div>

            {/* Kiln Chamber Visual Representation */}
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              {/* Left: Interactive Glazed Surface & Iron Bloom */}
              <div className="relative overflow-hidden rounded-sm border border-[#211F1D]/20 lg:col-span-7">
                <div
                  className="relative flex aspect-[16/10] w-full flex-col justify-between p-6 transition-all duration-700"
                  style={{
                    backgroundColor: activeGlazeObj.hex,
                    filter: !reductionAtmosphere ? "saturate(0.7) brightness(1.1)" : "none",
                  }}
                >
                  {/* Iron Speckle Particles Bloom */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      opacity:
                        activeKilnStageIdx === 0
                          ? 0.1
                          : activeKilnStageIdx === 1
                          ? 0.45
                          : reductionAtmosphere
                          ? 0.95
                          : 0.3,
                      backgroundImage:
                        "radial-gradient(#211F1D 1.5px, transparent 1.5px), radial-gradient(#5C5248 1px, transparent 1px)",
                      backgroundSize: "24px 24px, 12px 12px",
                      backgroundPosition: "0 0, 6px 6px",
                    }}
                  ></div>

                  {/* Kiln Atmosphere Glow */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: reductionAtmosphere
                        ? "radial-gradient(circle at 50% 50%, rgba(232, 106, 46, 0.15) 0%, transparent 70%)"
                        : "none",
                    }}
                  ></div>

                  {/* Top Bar Badges */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="rounded-sm border border-black/15 bg-white/90 px-3 py-1 font-mono text-[11px] text-[#211F1D] shadow-sm backdrop-blur-sm">
                      {currentKilnStage.label}
                    </div>

                    <div className="rounded-sm border border-black/15 bg-white/90 px-3 py-1 font-mono text-[11px] text-[#B3542E] shadow-sm backdrop-blur-sm">
                      {reductionAtmosphere ? "Oxygen-Starved Reduction Draft" : "Clean Electric Oxidation"}
                    </div>
                  </div>

                  {/* Center Ceramic Mark */}
                  <div className="relative z-10 my-auto text-center">
                    <div className="font-serif text-3xl font-bold tracking-widest text-[#211F1D]/80">
                      EAST FORK • ASHEVILLE
                    </div>
                    <div className="font-mono text-xs tracking-widest text-[#211F1D]/60 uppercase">
                      CONE 10 • VITRIFIED STONEWARE • EST. 2009
                    </div>
                  </div>

                  {/* Bottom Glaze Switcher Bar */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-black/15 bg-white/85 p-3 backdrop-blur-sm font-mono text-xs">
                    <div>
                      <span className="text-[#211F1D]/60">GLAZE FORMULATION:</span>{" "}
                      <span className="font-bold text-[#211F1D]">{activeGlazeObj.name}</span>
                    </div>

                    <div className="flex gap-1.5">
                      {GLAZE_PALETTE.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setSelectedKilnGlaze(g.id)}
                          title={g.name}
                          className={`h-6 w-6 rounded-sm border transition-transform ${
                            selectedKilnGlaze === g.id ? "scale-110 border-[#211F1D]" : "border-black/30"
                          }`}
                          style={{ backgroundColor: g.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Technical Kiln Diagnostic Specification */}
              <div className="flex flex-col justify-between space-y-4 rounded-sm border border-[#211F1D]/15 bg-white p-5 lg:col-span-5">
                <div>
                  <div className="font-mono text-[10px] text-[#B3542E] uppercase">
                    THERMAL KILN LOG & PYROMETRICS
                  </div>
                  <h4 className="mt-1 font-serif text-2xl font-bold text-[#211F1D]">
                    {currentKilnStage.label}
                  </h4>
                  <p className="mt-3 text-xs leading-relaxed text-[#211F1D]/80">
                    {currentKilnStage.narrative}
                  </p>
                </div>

                <div className="space-y-2.5 border-t border-[#211F1D]/10 pt-4 font-mono text-xs text-[#211F1D]">
                  <div>
                    <span className="text-[#211F1D]/50">CLAY BODY REACTION:</span>
                    <div className="font-semibold">{currentKilnStage.clayState}</div>
                  </div>
                  <div>
                    <span className="text-[#211F1D]/50">FELDSPAR FLUX ACTION:</span>
                    <div className="font-semibold">{currentKilnStage.glazeAction}</div>
                  </div>
                  <div>
                    <span className="text-[#211F1D]/50">IRON BLOOM INDEX:</span>
                    <div className="font-semibold text-[#B3542E]">
                      {reductionAtmosphere ? "Dense Authentic Iron Freckles" : "Sterile Uniform Hue"}
                    </div>
                  </div>
                </div>

                <div className="rounded-sm border border-[#B3542E]/30 bg-[#B3542E]/10 p-3 font-mono text-[11px] text-[#211F1D]">
                  💡 <strong>Studio Guarantee:</strong> 100% dishwasher and microwave safe.
                  Vitrified to commercial absorption standards (&lt;0.5%).
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINE 03 // ASHEVILLE DIRECT POTTERY CATALOG --- */}
      <section id="collection" className="border-b border-[#211F1D]/10 bg-[#F8F6F0] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#211F1D] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#211F1D]"></span>
                <span>ENGINE 03 // ASHEVILLE STUDIO DIRECT ALLOCATION</span>
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#211F1D] sm:text-4xl md:text-5xl">
                The Asheville Stoneware Collection
              </h2>
              <p className="text-base text-[#211F1D]/80">
                Each piece is mixed, molded, glazed, and gas-fired at our Asheville pottery atelier.
                Allocate individual pieces or curate full dining suites with bundle savings.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Works" },
                { id: "dinnerware", label: "Plates & Coupes" },
                { id: "bowls", label: "Bowls & Servings" },
                { id: "drinkware", label: "Mugs & Cups" },
                { id: "sets", label: "Curated Sets" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex h-10 items-center justify-center rounded-sm border px-3.5 font-mono text-xs font-semibold uppercase transition-all ${
                    activeCategory === cat.id
                      ? "border-[#211F1D] bg-[#211F1D] text-[#F8F6F0]"
                      : "border-[#211F1D]/20 bg-white text-[#211F1D] hover:bg-[#E8DFD1]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCatalog.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-sm border border-[#211F1D]/15 bg-white p-4 transition-all hover:border-[#211F1D] hover:shadow-lg"
              >
                <div>
                  {/* Image Stage */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#E8DFD1]">
                    <Image
                      src={product.studioImage}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Stock Status Badge */}
                    <div className="absolute top-2 left-2 rounded-sm border border-[#211F1D]/20 bg-white/95 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#211F1D]">
                      {product.inKilnBatchCount} In Active Kiln
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-4">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[10px] text-[#B3542E] uppercase">
                        {product.leadTime}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#211F1D]">
                        ${product.price}
                      </span>
                    </div>

                    <h3 className="mt-1 font-serif text-lg font-bold text-[#211F1D]">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#211F1D]/70">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Highlights Spec List */}
                  <ul className="mt-4 space-y-1.5 border-t border-[#211F1D]/10 pt-3 font-mono text-[11px] text-[#211F1D]/80">
                    {product.highlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#B3542E]">✦</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to Allocation Cart Button */}
                <div className="mt-6 border-t border-[#211F1D]/10 pt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex h-11 w-full items-center justify-center rounded-sm bg-[#211F1D] px-4 font-mono text-xs font-bold tracking-wider text-[#F8F6F0] uppercase transition-colors hover:bg-[#B3542E]"
                  >
                    Allocate to Vault — ${product.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CRAFT METHODOLOGY // THE MATISSE & ASHEVILLE LINEAGE --- */}
      <section id="matisse" className="border-b border-[#211F1D]/10 bg-[#211F1D] py-20 text-[#F8F6F0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-[#D69F3D]">
                <span>THE MATISSE CERAMIC DOCTRINE</span>
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#F8F6F0] sm:text-4xl md:text-5xl">
                Trained in wood-firing. Perfected in gas reduction.
              </h2>
              <p className="text-base leading-relaxed text-[#F8F6F0]/80">
                Alex Matisse began by constructing a 36-foot wood-firing kiln in the mountains of
                Madison County, North Carolina, apprenticing under master Southern potters. Today,
                East Fork operates one of America's few large-scale gas reduction potteries, producing
                functional stoneware built to hold food, coffee, and conversations for generations.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 font-mono text-xs">
                <div>
                  <div className="font-bold text-[#D69F3D]">01 // Regional Sourcing</div>
                  <div className="mt-1 text-[#F8F6F0]/60">
                    Clays mined within 400 miles of our Asheville workshop.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#D69F3D]">02 // Cone 10 Vitrification</div>
                  <div className="mt-1 text-[#F8F6F0]/60">
                    Fired at 2,345°F until the clay body fuses like natural granite.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#D69F3D]">03 // Zero Glaze Crazing</div>
                  <div className="mt-1 text-[#F8F6F0]/60">
                    Thermal expansion tuned to prevent micro-cracks over decades.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#D69F3D]">04 // Certified B-Corp</div>
                  <div className="mt-1 text-[#F8F6F0]/60">
                    Living wages and local Appalachian community stewardship.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/20 lg:col-span-6">
              <Image
                src="/assets/eastfork/atelier-hero-03.jpg"
                alt="East Fork pottery drying on studio ware boards in Asheville"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute right-4 bottom-4 rounded-sm border border-white/20 bg-black/80 px-3 py-1.5 font-mono text-[10px] text-white">
                Asheville Atelier // Blue Ridge Mountains, NC
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER // COLOPHON & DIRECT CONTACT --- */}
      <footer className="border-t border-[#211F1D]/10 bg-[#E8DFD1] py-12 text-[#211F1D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-serif text-xl font-bold">EAST FORK POTTERY</div>
              <div className="mt-2 font-mono text-xs text-[#211F1D]/70">
                Independent Stoneware Ceramics
                <br />
                Asheville Studio & Kiln Lab
              </div>
              <div className="mt-4 font-mono text-[11px] text-[#B3542E]">
                Workshop: Asheville, North Carolina 28801
              </div>
            </div>

            <div>
              <div className="font-mono text-xs font-bold uppercase">Storefront Navigation</div>
              <ul className="mt-3 space-y-2 font-mono text-xs text-[#211F1D]/70">
                <li><a href="#tabletop" className="hover:text-[#B3542E]">Tabletop Place Setting Canvas</a></li>
                <li><a href="#kiln" className="hover:text-[#B3542E]">Cone 10 Kiln Simulator</a></li>
                <li><a href="#collection" className="hover:text-[#B3542E]">Asheville Pottery Collection</a></li>
                <li><a href="#matisse" className="hover:text-[#B3542E]">2009 Matisse Lineage</a></li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-xs font-bold uppercase">Core Glazes</div>
              <ul className="mt-3 space-y-2 font-mono text-xs text-[#211F1D]/70">
                <li>Panna Cotta (Cream Iron Freckle)</li>
                <li>Morel (Blue Ridge Earth Umber)</li>
                <li>Amaro (Gas Reduction Terracotta)</li>
                <li>Soapstone (Matte River Slate)</li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-xs font-bold uppercase">Founder Dispatch</div>
              <div className="mt-3 text-xs leading-relaxed text-[#211F1D]/70">
                Direct inquiries for Alex Matisse, Connie Matisse, and the studio team.
              </div>
              <div className="mt-3 font-mono text-xs font-semibold text-[#211F1D]">
                Direct: alex@eastfork.com
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between border-t border-[#211F1D]/10 pt-6 font-mono text-[11px] text-[#211F1D]/60">
            <div>© 2009–2026 East Fork Pottery. All Rights Reserved. Asheville, North Carolina.</div>
            <div className="text-right">
              Architected for Revenue Velocity & Zero Ceramic Waste.
            </div>
          </div>
        </div>
      </footer>

      {/* --- SLIDE-OUT ALLOCATION CART DRAWER --- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="relative flex h-full w-full max-w-md flex-col justify-between bg-[#F8F6F0] p-6 shadow-2xl">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#211F1D]/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-[#B3542E] uppercase">
                    ASHEVILLE KILN ALLOCATION VAULT
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#211F1D]">
                    Reserved Pottery Batch
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close Allocation Cart"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#211F1D]/20 font-mono text-sm font-bold text-[#211F1D] hover:bg-[#E8DFD1]"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="mt-6 max-h-[42vh] space-y-4 overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center font-mono text-xs text-[#211F1D]/50">
                    Vault is currently unallocated. Select a piece from the collection.
                  </div>
                ) : (
                  cartItems.map((ci) => {
                    const glazeObj = GLAZE_PALETTE.find((g) => g.id === ci.glaze) || GLAZE_PALETTE[0];
                    return (
                      <div
                        key={`${ci.sku.id}-${ci.glaze}`}
                        className="rounded-sm border border-[#211F1D]/15 bg-white p-3.5"
                      >
                        <div className="flex gap-3">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-[#E8DFD1]">
                            <Image
                              src={ci.sku.studioImage}
                              alt={ci.sku.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between">
                              <h4 className="font-serif text-sm font-bold text-[#211F1D]">
                                {ci.sku.name}
                              </h4>
                              <span className="font-mono text-xs font-bold text-[#211F1D]">
                                ${ci.sku.price * ci.qty}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#B3542E]">
                              <span
                                className="h-2.5 w-2.5 rounded-full border border-black/20"
                                style={{ backgroundColor: glazeObj.hex }}
                              ></span>
                              <span>GLAZE: {glazeObj.name.toUpperCase()}</span>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center gap-2 font-mono text-xs">
                                <button
                                  onClick={() => handleUpdateQty(ci.sku.id, ci.glaze, -1)}
                                  className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#211F1D]/20 hover:bg-[#E8DFD1]"
                                >
                                  -
                                </button>
                                <span>{ci.qty}</span>
                                <button
                                  onClick={() => handleUpdateQty(ci.sku.id, ci.glaze, 1)}
                                  className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#211F1D]/20 hover:bg-[#E8DFD1]"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveFromCart(ci.sku.id, ci.glaze)}
                                className="font-mono text-[10px] text-[#211F1D]/50 hover:text-[#B3542E]"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Protective Felt Separators Addon */}
              <div className="mt-4 flex items-center justify-between rounded-sm border border-[#211F1D]/15 bg-white p-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="feltPads"
                    checked={feltProtectorsAddon}
                    onChange={() => setFeltProtectorsAddon(!feltProtectorsAddon)}
                    className="h-4 w-4 rounded-sm accent-[#B3542E]"
                  />
                  <label htmlFor="feltPads" className="font-mono text-xs text-[#211F1D]">
                    Add Wool Felt Cabinet Separator Pads (Pack of 8)
                  </label>
                </div>
                <span className="font-mono text-xs font-bold text-[#211F1D]">+$16</span>
              </div>
            </div>

            {/* Drawer Subtotal & Checkout */}
            <div className="border-t border-[#211F1D]/15 pt-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#211F1D]/60">SHIPPING:</span>
                  <span className="font-bold text-[#2E5E4E]">FREE INSURED CERAMIC FREIGHT ($0)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#211F1D]/60">PACKAGING:</span>
                  <span className="font-bold">100% Recycled Molded Pulp Cradles</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#211F1D] pt-2 border-t border-[#211F1D]/10">
                  <span>SUBTOTAL:</span>
                  <span>${cartSubtotal} USD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerToast("Reservation transmitted to Asheville Kiln packing schedule.");
                }}
                disabled={cartItems.length === 0}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-sm bg-[#B3542E] px-6 font-mono text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#8E3F20] disabled:opacity-40"
              >
                Confirm Asheville Kiln Allocation
              </button>

              <div className="mt-2 text-center font-mono text-[10px] text-[#211F1D]/50">
                Backed by East Fork's Lifetime Vitrified Ceramic Guarantee.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-sm border border-[#211F1D] bg-[#211F1D] px-5 py-3 font-mono text-xs text-[#F8F6F0] shadow-2xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

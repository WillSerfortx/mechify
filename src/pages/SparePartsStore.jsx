import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── 10 AUTOMOTIVE CATEGORIES DATA (60 PRODUCTS WITH 100% MATCHED IMAGES) ─── */
const CAR_PARTS_CATEGORIES = [
  {
    id: 'engine-parts',
    title: 'Engine Parts',
    tagline: 'High-performance core internal & bolt-on engine components',
    icon: '⚡',
    bannerBadge: 'HOT PERFORMANCE',
    products: [
      {
        id: 'eng-1',
        name: 'Performance Air Filter',
        desc: 'High-flow multi-layer oiled cotton gauze filter engineered for maximum horsepower & clean induction.',
        price: 59.99,
        prevPrice: 79.99,
        discount: 25,
        rating: 4.8,
        reviewsCount: 142,
        stock: 'In Stock',
        stockCount: 18,
        sku: 'ENG-AF-882',
        brand: 'AeroFlow Pro',
        warranty: 'Lifetime Washable',
        image: '/images/parts/air_filter.jpg',
        specs: ['Material: 4-Layer Oiled Cotton', 'Flow Rate: 480 CFM', 'Fitment: Universal 3.0" / 3.5"', 'Cleaning: Washable & Reusable']
      },
      {
        id: 'eng-2',
        name: 'Turbocharger',
        desc: 'Twin-scroll billet compressor wheel turbo designed for instant boost spool-up and top-end power.',
        price: 499.99,
        prevPrice: 599.99,
        discount: 17,
        rating: 4.7,
        reviewsCount: 89,
        stock: 'In Stock',
        stockCount: 6,
        sku: 'ENG-TB-901',
        brand: 'ApexBoost Turbo',
        warranty: '2-Year Limited',
        image: '/images/parts/turbocharger.jpg',
        specs: ['Bearing: Dual Ceramic Ball-Bearing', 'Turbine: Inconel 713C Alloy', 'Max Boost: 32 PSI', 'Power Rating: Up to 550 HP']
      },
      {
        id: 'eng-3',
        name: 'Fuel Injector',
        desc: 'High-impedance multi-hole spray fuel injector for ultra-fine fuel atomization and improved throttle response.',
        price: 89.99,
        prevPrice: 109.99,
        discount: 18,
        rating: 4.6,
        reviewsCount: 64,
        stock: 'In Stock',
        stockCount: 24,
        sku: 'ENG-FI-550',
        brand: 'PrecisionFlow',
        warranty: '1-Year Warranty',
        image: '/images/parts/fuel_injector.jpg',
        specs: ['Flow Rate: 650cc / min', 'Impedance: 12.5 Ohms (High)', 'Spray Pattern: 12-Hole Atomizer', 'Compatibility: E85 / Pump Gas']
      },
      {
        id: 'eng-4',
        name: 'Oil Filter',
        desc: 'Synthetic blend micro-fiber filtration media captures 99% of engine contaminants down to 10 microns.',
        price: 24.99,
        prevPrice: 32.99,
        discount: 24,
        rating: 4.8,
        reviewsCount: 310,
        stock: 'In Stock',
        stockCount: 45,
        sku: 'ENG-OF-104',
        brand: 'GuardTech Filters',
        warranty: '10,000 Mile Protection',
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=700&q=80',
        specs: ['Media: Synthetic Wire-Backed Mesh', 'Burst Pressure: 280 PSI', 'Anti-Drainback: Silicone Valve', 'Efficiency: 99% @ 20 Microns']
      },
      {
        id: 'eng-5',
        name: 'Spark Plug Set',
        desc: 'Laser iridium spark plugs delivering ultra-stable spark ignition, better combustion, and extended service life.',
        price: 39.99,
        prevPrice: 54.99,
        discount: 27,
        rating: 4.9,
        reviewsCount: 220,
        stock: 'In Stock',
        stockCount: 32,
        sku: 'ENG-SP-408',
        brand: 'IgniteCore Iridium',
        warranty: '60,000 Miles Guaranteed',
        image: '/images/parts/spark_plugs.jpg',
        specs: ['Electrode: 0.6mm Laser Iridium Tip', 'Thread Size: 14mm', 'Heat Range: Cold 7', 'Pack: Set of 4 Plugs']
      },
      {
        id: 'eng-6',
        name: 'Engine Mount',
        desc: 'Heavy-duty polyurethane engine mount reducing unwanted drivetrain slop while maintaining comfortable NVH.',
        price: 79.99,
        prevPrice: 99.99,
        discount: 20,
        rating: 4.5,
        reviewsCount: 52,
        stock: 'In Stock',
        stockCount: 14,
        sku: 'ENG-EM-302',
        brand: 'TorqueLock Poly',
        warranty: '3-Year Warranty',
        image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=700&q=80',
        specs: ['Bushing: 75A Durometer Polyurethane', 'Bracket: CNC Billet Aluminum', 'Position: Lower / Trans Mount', 'Corrosion: Anodized Black']
      }
    ]
  },
  {
    id: 'brake-system',
    title: 'Brake System',
    tagline: 'Track-tested stopping power, calipers, rotors & performance ceramic pads',
    icon: '🛑',
    bannerBadge: 'SAFETY & CONTROL',
    products: [
      {
        id: 'brk-1',
        name: 'Performance Brake Disc',
        desc: 'Drilled and slotted high-carbon alloy discs for exceptional heat dissipation, bite, and fade resistance.',
        price: 249.99,
        prevPrice: 319.99,
        discount: 22,
        rating: 4.9,
        reviewsCount: 198,
        stock: 'In Stock',
        stockCount: 12,
        sku: 'BRK-BD-900',
        brand: 'StopTech Pro',
        warranty: '3-Year Anti-Warp',
        image: '/images/parts/brake_disc.jpg',
        specs: ['Diameter: 355mm Vented', 'Material: G3000 Grey Cast Iron', 'Slotting: Bi-Directional Curved', 'Coating: Black Electro-Deposit']
      },
      {
        id: 'brk-2',
        name: 'Ceramic Brake Pads',
        desc: 'Low-dust, noise-free extreme thermal ceramic formulation with multi-layer rubberized stainless shims.',
        price: 79.99,
        prevPrice: 99.99,
        discount: 20,
        rating: 4.8,
        reviewsCount: 245,
        stock: 'In Stock',
        stockCount: 29,
        sku: 'BRK-CP-202',
        brand: 'CarbonKevlar Ceramic',
        warranty: '40,000 Miles Wear',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80',
        specs: ['Compound: Carbon-Ceramic Matrix', 'Operating Temp: 0°F – 1,100°F', 'Dust Level: Ultra-Low', 'Hardware: Stainless Clips Included']
      },
      {
        id: 'brk-3',
        name: 'Brake Caliper',
        desc: '4-piston forged aluminum performance caliper with high-pressure fluid seals and dual bleed screws.',
        price: 189.99,
        prevPrice: 239.99,
        discount: 21,
        rating: 4.7,
        reviewsCount: 76,
        stock: 'In Stock',
        stockCount: 8,
        sku: 'BRK-BC-410',
        brand: 'ApexStop Forged',
        warranty: '2-Year Caliper Core',
        image: '/images/parts/brake_caliper.jpg',
        specs: ['Piston Count: 4 Opposed Pistons', 'Body: Forged T6 Aluminum', 'Finish: Gloss Heat-Resistant Red', 'Bleeder: Dual Micro-Sealed']
      },
      {
        id: 'brk-4',
        name: 'Brake Rotor Set',
        desc: 'Geomet-coated vented front and rear rotor set with precision zinc anti-corrosion protective layer.',
        price: 219.99,
        prevPrice: 279.99,
        discount: 21,
        rating: 4.6,
        reviewsCount: 88,
        stock: 'In Stock',
        stockCount: 15,
        sku: 'BRK-RS-330',
        brand: 'RotorMaster OE+',
        warranty: '2-Year Road Warranty',
        image: '/images/parts/brake_disc.jpg',
        specs: ['Set: Front + Rear (4 Discs)', 'Coating: Full Geomet 360°', 'Balancing: Dynamic Mill Balanced', 'Venting: Directional Vanes']
      },
      {
        id: 'brk-5',
        name: 'Brake Line Kit',
        desc: 'Stainless steel braided brake lines offering firmer pedal feel, zero volumetric expansion, and fast response.',
        price: 64.99,
        prevPrice: 84.99,
        discount: 24,
        rating: 4.5,
        reviewsCount: 62,
        stock: 'In Stock',
        stockCount: 22,
        sku: 'BRK-BL-105',
        brand: 'FlexBraid Pro',
        warranty: 'Lifetime Guarantee',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=700&q=80',
        specs: ['Core: PTFE Teflon Inner Liner', 'Braiding: 308 Stainless Steel', 'Jacket: Clear UV Polyurethane', 'Pressure: Rated to 4,000 PSI']
      },
      {
        id: 'brk-6',
        name: 'Brake Master Cylinder',
        desc: 'OEM spec dual-circuit master cylinder ensuring consistent hydraulic pressure and emergency fail-safe backup.',
        price: 129.99,
        prevPrice: 159.99,
        discount: 19,
        rating: 4.7,
        reviewsCount: 41,
        stock: 'In Stock',
        stockCount: 11,
        sku: 'BRK-MC-802',
        brand: 'HydraBrake OEM',
        warranty: '18-Month Warranty',
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=700&q=80',
        specs: ['Bore Diameter: 1.0 Inch (25.4mm)', 'Port Size: M10 x 1.0 Inverted', 'Reservoir: High-Impact Poly', 'Sensor: Fluid Level Sensor Included']
      }
    ]
  },
  {
    id: 'suspension-steering',
    title: 'Suspension & Steering',
    tagline: 'Coilovers, shocks, control arms and precision cornering hardware',
    icon: '🏎️',
    bannerBadge: 'PRECISION HANDLING',
    products: [
      {
        id: 'sus-1',
        name: 'Coilover Suspension Kit',
        desc: '32-way adjustable damping mono-tube coilovers with high-tensile chrome silicon springs and height adjustment.',
        price: 699.99,
        prevPrice: 899.99,
        discount: 22,
        rating: 4.8,
        reviewsCount: 175,
        stock: 'In Stock',
        stockCount: 5,
        sku: 'SUS-CK-990',
        brand: 'StanceWorks Track',
        warranty: '3-Year Performance',
        image: '/images/parts/coilover_suspension.jpg',
        specs: ['Damping: 32-Click Rebound/Comp', 'Lowering: 1.0" to 3.5" Drop', 'Top Mount: Pillow-ball Camber Plates', 'Spring Rates: 8kg Front / 6kg Rear']
      },
      {
        id: 'sus-2',
        name: 'Shock Absorber',
        desc: 'Nitrogen gas charged twin-tube shock absorber for plush street ride and controlled high-speed rebound.',
        price: 149.99,
        prevPrice: 189.99,
        discount: 21,
        rating: 4.7,
        reviewsCount: 93,
        stock: 'In Stock',
        stockCount: 16,
        sku: 'SUS-SA-401',
        brand: 'Biltech Struts',
        warranty: 'Lifetime Limited',
        image: '/images/parts/coilover_suspension.jpg',
        specs: ['Piston Rod: Hard Chromed Micro-Polished', 'Fluid: Multi-Viscosity All-Weather', 'Valving: Velocity-Sensitive', 'Mounting: Direct OEM Replacement']
      },
      {
        id: 'sus-3',
        name: 'Control Arm',
        desc: 'Reinforced tubular steel front lower control arm with heavy-duty pressed ball joints and polyurethane bushings.',
        price: 119.99,
        prevPrice: 149.99,
        discount: 20,
        rating: 4.6,
        reviewsCount: 78,
        stock: 'In Stock',
        stockCount: 14,
        sku: 'SUS-CA-220',
        brand: 'UltraArm Chassis',
        warranty: '2-Year Chassis Warranty',
        image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=700&q=80',
        specs: ['Material: Tubular DOM Steel', 'Ball Joint: Greasable Heavy-Duty', 'Geometry: Corrected Roll Center', 'Finish: Powder-Coated Titanium Grey']
      },
      {
        id: 'sus-4',
        name: 'Tie Rod End',
        desc: 'Precision forged chromoly outer tie rod end for crisp, zero-play responsive steering feel and alignment lock.',
        price: 49.99,
        prevPrice: 64.99,
        discount: 23,
        rating: 4.5,
        reviewsCount: 84,
        stock: 'In Stock',
        stockCount: 30,
        sku: 'SUS-TR-118',
        brand: 'DirectSteer Pro',
        warranty: '1-Year Alignment Warranty',
        image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=700&q=80',
        specs: ['Steel: 4140 Chromoly Steel', 'Boot: Neoprene Dust Seal', 'Grease: Synthetic Lithium Pre-Packed', 'Adjustability: 1.5" Metric Thread']
      },
      {
        id: 'sus-5',
        name: 'Stabilizer Bar',
        desc: '26mm solid cold-formed anti-roll sway bar reducing cornering body roll by over 40% without harshness.',
        price: 99.99,
        prevPrice: 129.99,
        discount: 23,
        rating: 4.6,
        reviewsCount: 67,
        stock: 'In Stock',
        stockCount: 19,
        sku: 'SUS-SB-550',
        brand: 'FlatCorner Sway',
        warranty: '5-Year Structural',
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=700&q=80',
        specs: ['Diameter: 26mm Solid Core', 'Adjustment: 3-Hole End Links', 'Bushings: Low-Friction Delrin', 'Stiffness: +55% Over Stock']
      },
      {
        id: 'sus-6',
        name: 'Power Steering Pump',
        desc: 'Direct-fit high-efficiency hydraulic steering pump computer tested for silent operation and smooth assist.',
        price: 179.99,
        prevPrice: 219.99,
        discount: 18,
        rating: 4.7,
        reviewsCount: 55,
        stock: 'In Stock',
        stockCount: 9,
        sku: 'SUS-PS-710',
        brand: 'HydroSteer Core',
        warranty: '2-Year Limited',
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=700&q=80',
        specs: ['Max Pressure: 1,450 PSI', 'Pulley: Press-On Serpentine 6-Rib', 'O-Rings: Viton High-Temp', 'Testing: 100% Flow Bench Tested']
      }
    ]
  },
  {
    id: 'wheels-tires',
    title: 'Wheels & Tires',
    tagline: 'Forged lightweight alloy wheels, track-spec sticky rubber, spacers & hardware',
    icon: '🛞',
    bannerBadge: 'FORGED & TRACK READY',
    products: [
      {
        id: 'whl-1',
        name: '19" Forged Alloy Wheel',
        desc: 'Monoblock 6061-T6 aerospace aluminum wheel with aggressive concave multi-spoke satin finish.',
        price: 349.99,
        prevPrice: 429.99,
        discount: 19,
        rating: 4.9,
        reviewsCount: 162,
        stock: 'In Stock',
        stockCount: 8,
        sku: 'WHL-AW-199',
        brand: 'Veloce Forged',
        warranty: 'Structural Lifetime',
        image: '/images/parts/forged_wheel.jpg',
        specs: ['Size: 19x9.5 ET+35', 'Bolt Pattern: 5x114.3 / 5x120', 'Weight: 19.8 lbs (Ultra-Light)', 'Load Rating: 1,800 lbs']
      },
      {
        id: 'whl-2',
        name: 'Performance Tire',
        desc: 'Ultra-high performance silica compound tire featuring asymmetrical tread for razor-sharp wet & dry grip.',
        price: 219.99,
        prevPrice: 269.99,
        discount: 19,
        rating: 4.8,
        reviewsCount: 280,
        stock: 'In Stock',
        stockCount: 22,
        sku: 'WHL-PT-245',
        brand: 'GripMax Sport 4S',
        warranty: '35,000 Mile Treadwear',
        image: 'https://images.unsplash.com/photo-1541348263662-e0c86629c983?auto=format&fit=crop&w=700&q=80',
        specs: ['Size: 255/35R19 96Y XL', 'Treadwear: 300 AA A', 'Speed Rating: (Y) 186+ MPH', 'Technology: Dynamic Response Belt']
      },
      {
        id: 'whl-3',
        name: 'Racing Wheel Set',
        desc: 'Complete set of 4 ultra-lightweight track-spec wheels engineered for extreme lateral g-forces.',
        price: 1099.99,
        prevPrice: 1399.99,
        discount: 21,
        rating: 4.9,
        reviewsCount: 45,
        stock: 'In Stock',
        stockCount: 4,
        sku: 'WHL-RW-400',
        brand: 'ApexMotorsport Forged',
        warranty: 'Lifetime Structural',
        image: '/images/parts/forged_wheel.jpg',
        specs: ['Quantity: Set of 4 Wheels', 'Configuration: Staggered 19x8.5 / 19x10', 'Brake Clearance: Clears 6-Piston Big Brakes', 'Finish: Satin Bronze / Gunmetal']
      },
      {
        id: 'whl-4',
        name: 'Wheel Spacer',
        desc: 'Hubcentric 20mm CNC-machined wheel spacer kit with grade 10.9 extended carbon-steel pressed studs.',
        price: 89.99,
        prevPrice: 114.99,
        discount: 22,
        rating: 4.6,
        reviewsCount: 112,
        stock: 'In Stock',
        stockCount: 35,
        sku: 'WHL-WS-20M',
        brand: 'StanceFlush Spacers',
        warranty: '5-Year Warranty',
        image: '/images/parts/forged_wheel.jpg',
        specs: ['Thickness: 20mm Per Side (40mm Track)', 'Hub Bore: 66.6mm to 72.6mm', 'Stud Grade: 10.9 Heat Treated', 'Material: Forged 6061-T6 Aluminum']
      },
      {
        id: 'whl-5',
        name: 'Performance Tire Set',
        desc: 'Complete 4-tire set of track-day road legal competition rubber delivering unmatched acceleration and braking.',
        price: 799.99,
        prevPrice: 999.99,
        discount: 20,
        rating: 4.8,
        reviewsCount: 73,
        stock: 'In Stock',
        stockCount: 6,
        sku: 'WHL-TS-4PK',
        brand: 'TrackGrip R-Compound',
        warranty: 'Full Manufacturer Warranty',
        image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=700&q=80',
        specs: ['Includes: 4 Matching Performance Tires', 'Compound: 200 Treadwear Semi-Slick', 'Sidewall: Aramid Reinforced', 'Rim Protection: Integrated Flange']
      },
      {
        id: 'whl-6',
        name: 'Racing Lug Nuts',
        desc: 'Titanium burned-blue open-ended lug nuts with knurled ends for rapid tire changes on pit lane.',
        price: 39.99,
        prevPrice: 54.99,
        discount: 27,
        rating: 4.5,
        reviewsCount: 140,
        stock: 'In Stock',
        stockCount: 50,
        sku: 'WHL-LN-20P',
        brand: 'Ti-Pro Fasteners',
        warranty: 'Lifetime Finish',
        image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=700&q=80',
        specs: ['Pack: 20 Lug Nuts + Key Adapter', 'Thread Pitch: M12x1.5 / M12x1.25', 'Design: 48mm Open-End Knurled', 'Material: Forged 50BV30 Steel']
      }
    ]
  },
  {
    id: 'car-electrical',
    title: 'Car Electrical',
    tagline: 'High-output alternators, AGM batteries, LED lighting and ignition systems',
    icon: '💡',
    bannerBadge: 'HIGH VOLTAGE',
    products: [
      {
        id: 'ele-1',
        name: 'LED Headlight Kit',
        desc: '12,000 Lumens 6500K crisp cool white LED conversion kit with turbo silent dual-ball bearing cooling fan.',
        price: 69.99,
        prevPrice: 89.99,
        discount: 22,
        rating: 4.8,
        reviewsCount: 420,
        stock: 'In Stock',
        stockCount: 40,
        sku: 'ELE-LED-9005',
        brand: 'LumenMax Vision',
        warranty: '3-Year Replacement',
        image: '/images/parts/led_headlight.jpg',
        specs: ['Output: 12,000 Lumens / Pair', 'Color: 6500K Crystal White', 'Chip: Custom G-XP CSP LEDs', 'Waterproof: IP68 Submersible']
      },
      {
        id: 'ele-2',
        name: 'Car Battery',
        desc: 'AGM sealed deep-cycle 850 CCA battery engineered for extreme climates, start-stop systems & sound setups.',
        price: 129.99,
        prevPrice: 169.99,
        discount: 24,
        rating: 4.7,
        reviewsCount: 184,
        stock: 'In Stock',
        stockCount: 14,
        sku: 'ELE-BAT-850',
        brand: 'VoltMax AGM Power',
        warranty: '48-Month Free Replacement',
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=700&q=80',
        specs: ['Cold Cranking Amps: 850 CCA', 'Reserve Capacity: 140 Minutes', 'Type: Pure Lead Absorbed Glass Mat', 'Maintenance: 100% Sealed Zero Spill']
      },
      {
        id: 'ele-3',
        name: 'Alternator',
        desc: '160 Amp high-output alternator with heavy-duty internal rectifier and pure copper windings.',
        price: 249.99,
        prevPrice: 299.99,
        discount: 17,
        rating: 4.6,
        reviewsCount: 68,
        stock: 'In Stock',
        stockCount: 10,
        sku: 'ELE-ALT-160',
        brand: 'PowerCharge HD',
        warranty: '2-Year Warranty',
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=700&q=80',
        specs: ['Output: 160A Peak / 110A Idle', 'Voltage: 14.2V Regulated', 'Bearings: Heavy Duty Double Sealed', 'Pulley: Decoupler Pulley Included']
      },
      {
        id: 'ele-4',
        name: 'Starter Motor',
        desc: 'High-torque gear reduction starter motor for instantaneous cranking even with high-compression engines.',
        price: 199.99,
        prevPrice: 249.99,
        discount: 20,
        rating: 4.7,
        reviewsCount: 92,
        stock: 'In Stock',
        stockCount: 11,
        sku: 'ELE-SM-180',
        brand: 'QuickCrank Starter',
        warranty: '2-Year Unlimited Miles',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80',
        specs: ['Power: 1.8 kW High Torque', 'Gear Ratio: 4.4:1 Planetary Gear', 'Rotation: Clockwise 10-Tooth', 'Housing: Cast Aluminum Shell']
      },
      {
        id: 'ele-5',
        name: 'Ignition Coil',
        desc: 'Performance direct-ignition coil pack producing 15% higher secondary voltage for cleaner spark burn.',
        price: 59.99,
        prevPrice: 79.99,
        discount: 25,
        rating: 4.6,
        reviewsCount: 130,
        stock: 'In Stock',
        stockCount: 28,
        sku: 'ELE-IC-404',
        brand: 'SparkVolt Red',
        warranty: '18-Month Warranty',
        image: '/images/parts/spark_plugs.jpg',
        specs: ['Voltage Output: 45,000 Volts', 'Core: High Grade German Silicon Steel', 'Primary Resistance: 0.55 Ohms', 'Fitment: Direct Plug-in Replacement']
      },
      {
        id: 'ele-6',
        name: 'Car Fuse Kit',
        desc: '150-piece standard and mini blade fuse assortment with circuit test light, puller tool, and clear organizer.',
        price: 19.99,
        prevPrice: 29.99,
        discount: 33,
        rating: 4.5,
        reviewsCount: 310,
        stock: 'In Stock',
        stockCount: 65,
        sku: 'ELE-FK-150',
        brand: 'CircuitSafe Pro',
        warranty: 'Lifetime Warranty',
        image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=700&q=80',
        specs: ['Count: 150 Pieces (2A – 35A)', 'Types: Standard + Mini Blade', 'Material: Zinc Alloy + Plastic Shell', 'Bonus: Fast-Action Voltage Tester']
      }
    ]
  },
  {
    id: 'exterior-parts',
    title: 'Exterior Parts',
    tagline: 'Carbon fiber aero kits, aggressive bumpers, diffusers, hoods & sport grilles',
    icon: '✨',
    bannerBadge: 'AERO STYLING',
    products: [
      {
        id: 'ext-1',
        name: 'Carbon Fiber Spoiler',
        desc: 'Real 3K twill weave carbon fiber GT rear trunk spoiler offering functional high-speed downforce.',
        price: 299.99,
        prevPrice: 379.99,
        discount: 21,
        rating: 4.8,
        reviewsCount: 114,
        stock: 'In Stock',
        stockCount: 7,
        sku: 'EXT-CFS-55',
        brand: 'AeroCarbon Tech',
        warranty: '3-Year UV Clear Guarantee',
        image: '/images/parts/carbon_spoiler.jpg',
        specs: ['Material: 100% Real 3K Carbon Fiber', 'Mounting: 3M VHB Tape + Optional Bolts', 'Downforce: 85 lbs @ 80 MPH', 'Finish: High Gloss UV Clear Coat']
      },
      {
        id: 'ext-2',
        name: 'Front Bumper',
        desc: 'Aerodynamic ABS polyurethane front bumper cover with integrated mesh cooling ducts and lower splitter.',
        price: 449.99,
        prevPrice: 549.99,
        discount: 18,
        rating: 4.6,
        reviewsCount: 56,
        stock: 'In Stock',
        stockCount: 4,
        sku: 'EXT-FB-910',
        brand: 'AggroAero Dynamics',
        warranty: '1-Year Fitment Guarantee',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80',
        specs: ['Material: OEM-Grade Polypropylene', 'Hardware: Pre-drilled Factory Holes', 'Includes: Lower Grille + Fog Bezels', 'Primer: Black Ready-to-Paint Primer']
      },
      {
        id: 'ext-3',
        name: 'Side Mirror',
        desc: 'Power-heated aerodynamic side mirror assembly with integrated sequential amber LED turn indicator.',
        price: 129.99,
        prevPrice: 159.99,
        discount: 19,
        rating: 4.5,
        reviewsCount: 72,
        stock: 'In Stock',
        stockCount: 18,
        sku: 'EXT-SM-310',
        brand: 'AeroView Power',
        warranty: '2-Year Electrical',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
        specs: ['Function: Power Adjust + Heated Glass', 'Turn Signal: Dynamic Sequential LED', 'Blind Spot: Convex Wide-Angle Edge', 'Plug: 9-Pin Direct Factory Harness']
      },
      {
        id: 'ext-4',
        name: 'Carbon Fiber Hood',
        desc: 'Ultra-lightweight vented carbon hood with functional heat extraction vents and underside skeleton reinforcement.',
        price: 699.99,
        prevPrice: 899.99,
        discount: 22,
        rating: 4.8,
        reviewsCount: 39,
        stock: 'In Stock',
        stockCount: 3,
        sku: 'EXT-CFH-800',
        brand: 'AeroCarbon Track',
        warranty: '3-Year Structural',
        image: '/images/parts/carbon_spoiler.jpg',
        specs: ['Weight: 14.5 lbs (-22 lbs vs OEM)', 'Venting: Dual Reverse Louver Vents', 'Latch: OEM Latch Compatible', 'Finish: Vacuum Infused Wet Carbon']
      },
      {
        id: 'ext-5',
        name: 'Side Skirts',
        desc: 'Low-profile ground-effect side skirt extensions adding aggressive aerodynamic stance and stone protection.',
        price: 249.99,
        prevPrice: 319.99,
        discount: 22,
        rating: 4.7,
        reviewsCount: 65,
        stock: 'In Stock',
        stockCount: 12,
        sku: 'EXT-SS-420',
        brand: 'GroundFlow Splitters',
        warranty: '2-Year Structural',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=700&q=80',
        specs: ['Pair: Left & Right Extensions (2pc)', 'Length: 78.5" Universal Trimmable', 'Material: Flexible Impact-Resistant ABS', 'Mounting: Self-Tapping Screws Included']
      },
      {
        id: 'ext-6',
        name: 'Grille',
        desc: 'Gloss black honeycomb front grille designed for optimized radiator airflow and stealth styling.',
        price: 159.99,
        prevPrice: 199.99,
        discount: 20,
        rating: 4.6,
        reviewsCount: 88,
        stock: 'In Stock',
        stockCount: 15,
        sku: 'EXT-GR-106',
        brand: 'StealthBlack Grilles',
        warranty: '2-Year Finish Warranty',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=700&q=80',
        specs: ['Style: RS Honeycomb Mesh', 'Finish: Piano Black Gloss', 'Emblem: Removable Ring Mount', 'Installation: Direct Clip-in OEM Tabs']
      }
    ]
  },
  {
    id: 'interior-parts',
    title: 'Interior Parts',
    tagline: 'Custom leather seat covers, sport steering wheels, machined pedals & trim',
    icon: '💺',
    bannerBadge: 'LUXURY COCKPIT',
    products: [
      {
        id: 'int-1',
        name: 'Racing Steering Wheel',
        desc: '350mm deep-dish suede racing steering wheel with red center alignment stripe and ergonomic thumb rests.',
        price: 199.99,
        prevPrice: 259.99,
        discount: 23,
        rating: 4.8,
        reviewsCount: 145,
        stock: 'In Stock',
        stockCount: 10,
        sku: 'INT-SW-350',
        brand: 'ApexGrip Pro',
        warranty: '2-Year Suede Guarantee',
        image: '/images/parts/steering_wheel.jpg',
        specs: ['Diameter: 350mm (13.8")', 'Dish Depth: 75mm Deep Dish', 'Grip: Italian Micro-Suede Leather', 'Spokes: 4mm Anodized Black Aluminum']
      },
      {
        id: 'int-2',
        name: 'Leather Seat Cover Set',
        desc: 'Breathable Nappa leather universal tailored seat covers with memory foam lumbar padding and side-airbag seams.',
        price: 149.99,
        prevPrice: 199.99,
        discount: 25,
        rating: 4.7,
        reviewsCount: 210,
        stock: 'In Stock',
        stockCount: 16,
        sku: 'INT-SC-500',
        brand: 'NappaLuxe Auto',
        warranty: '3-Year Leather Shield',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
        specs: ['Package: Full Set Front + Rear', 'Material: Waterproof Nappa Microfiber', 'Airbag: Certified Side-Tear Seams', 'Padding: 10mm High-Density Foam']
      },
      {
        id: 'int-3',
        name: 'Aluminum Pedal Set',
        desc: 'Billet aluminum non-slip pedal covers with raised rubber nubs for heel-toe shifting and wet grip.',
        price: 59.99,
        prevPrice: 79.99,
        discount: 25,
        rating: 4.6,
        reviewsCount: 119,
        stock: 'In Stock',
        stockCount: 26,
        sku: 'INT-PD-300',
        brand: 'RaceTrack Pedals',
        warranty: 'Lifetime Guarantee',
        image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=700&q=80',
        specs: ['Set: Gas, Brake, Clutch, Footrest', 'Surface: Textured Non-Slip EPDM', 'Material: T6061 Forged Aluminum', 'Fit: Clamp-on or Drill Mount']
      },
      {
        id: 'int-4',
        name: 'Custom Floor Mat Set',
        desc: 'All-weather laser-measured heavy duty floor liners with deep channeled water walls and anti-skid backing.',
        price: 89.99,
        prevPrice: 119.99,
        discount: 25,
        rating: 4.8,
        reviewsCount: 340,
        stock: 'In Stock',
        stockCount: 38,
        sku: 'INT-FM-4PK',
        brand: 'WeatherGuard 3D',
        warranty: 'Lifetime Wear Warranty',
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=700&q=80',
        specs: ['Set: 4-Piece Front + Rear Floor Liners', 'Material: Odorless Thermoplastic TPE', 'Edges: 1.5" High Raised Spill Walls', 'Cleaning: 100% Washable & Quick Dry']
      },
      {
        id: 'int-5',
        name: 'Gear Shift Knob',
        desc: 'Weighted 450g stainless steel shift knob with red engraved 6-speed gear pattern and weighted throw assist.',
        price: 49.99,
        prevPrice: 69.99,
        discount: 29,
        rating: 4.5,
        reviewsCount: 168,
        stock: 'In Stock',
        stockCount: 42,
        sku: 'INT-SK-450',
        brand: 'ShiftPoint Heavy',
        warranty: 'Lifetime Finish',
        image: '/images/parts/steering_wheel.jpg',
        specs: ['Weight: 450 Grams (Counter-Weighted)', 'Finish: Brushed Titanium Gunmetal', 'Adapters: M8, M10, M12 Included', 'Engraving: CNC Laser 6-Speed Pattern']
      },
      {
        id: 'int-6',
        name: 'Dashboard Trim Kit',
        desc: 'Real carbon fiber interior dashboard and console overlay accents with precision laser cut edges.',
        price: 79.99,
        prevPrice: 99.99,
        discount: 20,
        rating: 4.6,
        reviewsCount: 82,
        stock: 'In Stock',
        stockCount: 20,
        sku: 'INT-DT-8PC',
        brand: 'CarbonCabin Pro',
        warranty: '2-Year Adhesion Guarantee',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
        specs: ['Pieces: 8-Piece Trim Accent Kit', 'Material: Flexible Real Carbon Weave', 'Backing: 3M 300LSE High-Bond Adhesive', 'Resin: Non-Yellowing Polyurethane']
      }
    ]
  },
  {
    id: 'car-electronics',
    title: 'Car Electronics',
    tagline: '4K dual dashcams, Android Auto stereos, GPS trackers & sensors',
    icon: '📹',
    bannerBadge: 'SMART CONNECTED',
    products: [
      {
        id: 'elec-1',
        name: '4K Dash Camera',
        desc: 'Ultra HD 4K front & 1080P rear dual dash cam with Sony Starvis night vision, Wi-Fi, GPS & 24H parking sentinel.',
        price: 119.99,
        prevPrice: 159.99,
        discount: 25,
        rating: 4.8,
        reviewsCount: 310,
        stock: 'In Stock',
        stockCount: 25,
        sku: 'ELEC-DC-4K',
        brand: 'SightDrive Pro 4K',
        warranty: '2-Year Free Replacement',
        image: '/images/parts/dash_camera.jpg',
        specs: ['Sensor: Sony Starvis 2 IMX678', 'Resolution: 3840x2160 @ 30fps', 'FOV: 170° Ultra-Wide Angle', 'Features: G-Sensor, App Wi-Fi Sync, GPS']
      },
      {
        id: 'elec-2',
        name: 'Android Car Stereo',
        desc: '10.1" QLED touchscreen head unit with Wireless Apple CarPlay, Android Auto, DSP equalizer & Bluetooth 5.2.',
        price: 299.99,
        prevPrice: 379.99,
        discount: 21,
        rating: 4.7,
        reviewsCount: 154,
        stock: 'In Stock',
        stockCount: 8,
        sku: 'ELEC-ST-101',
        brand: 'SoundStream Android',
        warranty: '2-Year Warranty',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
        specs: ['Screen: 10.1" QLED 1280x720 Glass', 'Processor: 8-Core Octa 2.0GHz / 4GB RAM', 'Audio: 48-Band DSP EQ, 4x50W Output', 'Connectivity: 4G LTE SIM + 5GHz Wi-Fi']
      },
      {
        id: 'elec-3',
        name: 'Parking Sensor Kit',
        desc: '4-sensor ultrasonic reverse parking assist system with digital LED distance display and multi-stage buzzer.',
        price: 49.99,
        prevPrice: 69.99,
        discount: 29,
        rating: 4.6,
        reviewsCount: 98,
        stock: 'In Stock',
        stockCount: 30,
        sku: 'ELEC-PS-400',
        brand: 'ParkGuard Radar',
        warranty: '2-Year Sensor Warranty',
        image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=700&q=80',
        specs: ['Sensors: 4 Ultrasonic Waterproof Sensors', 'Detection: 0.3m to 2.5m Accurate', 'Display: Color OLED Dashboard Bar', 'Hole Saw: 22mm Drill Bit Included']
      },
      {
        id: 'elec-4',
        name: 'GPS Tracker',
        desc: '4G LTE real-time anti-theft OBD-II GPS tracker with geofence alerts, speed monitor and instant smartphone app.',
        price: 79.99,
        prevPrice: 99.99,
        discount: 20,
        rating: 4.5,
        reviewsCount: 115,
        stock: 'In Stock',
        stockCount: 22,
        sku: 'ELEC-GPS-4G',
        brand: 'TrackPoint Secure',
        warranty: '1-Year Service Included',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=700&q=80',
        specs: ['Network: Global 4G LTE Band', 'Location: GPS + GLONASS + LBS', 'Power: Plug into OBD-II + Backup Battery', 'Alerts: Tow Alert, Speeding, Vibration']
      },
      {
        id: 'elec-5',
        name: 'Wireless Car Charger',
        desc: '15W Qi fast charging auto-clamping vent mount with motorized smart infrared sensor arms and capacitor backup.',
        price: 39.99,
        prevPrice: 54.99,
        discount: 27,
        rating: 4.7,
        reviewsCount: 230,
        stock: 'In Stock',
        stockCount: 45,
        sku: 'ELEC-WC-15W',
        brand: 'MagMount Turbo',
        warranty: '18-Month Warranty',
        image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=700&q=80',
        specs: ['Output: 15W / 10W / 7.5W Fast Qi', 'Clamping: Automatic Motorized Infrared', 'Mount: 360° Steel Hook Air Vent Clip', 'Safety: Over-Heat & FOD Protection']
      },
      {
        id: 'elec-6',
        name: 'Tire Pressure Monitor',
        desc: 'Solar powered TPMS with 4 external waterproof sensors and real-time high-accuracy LCD color screen.',
        price: 69.99,
        prevPrice: 89.99,
        discount: 22,
        rating: 4.8,
        reviewsCount: 172,
        stock: 'In Stock',
        stockCount: 26,
        sku: 'ELEC-TPMS-4',
        brand: 'PressureGuard Solar',
        warranty: '2-Year Sensor Battery Life',
        image: 'https://images.unsplash.com/photo-1541348263662-e0c86629c983?auto=format&fit=crop&w=700&q=80',
        specs: ['Charging: Monocrystalline Solar + USB', 'Range: 0 - 87 PSI (0 - 6.0 Bar)', 'Accuracy: ±1.5 PSI Digital Precision', 'Alarms: High/Low Pressure & High Temp']
      }
    ]
  },
  {
    id: 'performance-parts',
    title: 'Performance Parts',
    tagline: 'Cold air intakes, valved catback exhausts, intercoolers & Stage tuning kits',
    icon: '🔥',
    bannerBadge: 'MAX HORSEPOWER',
    products: [
      {
        id: 'perf-1',
        name: 'Cold Air Intake',
        desc: 'Mandrel-bent powder-coated aluminum intake tube paired with high-velocity heat shield for cold dense air.',
        price: 179.99,
        prevPrice: 229.99,
        discount: 22,
        rating: 4.8,
        reviewsCount: 190,
        stock: 'In Stock',
        stockCount: 14,
        sku: 'PERF-CAI-35',
        brand: 'AeroRam Intake',
        warranty: 'Lifetime Filter Warranty',
        image: '/images/parts/cold_air_intake.jpg',
        specs: ['Gain: +12 to +16 Wheel HP', 'Tube: 3.5" Mandrel-Bent T6 Aluminum', 'Shield: Laser Cut Steel with Rubber Seal', 'Filter: Oiled Inverted Cone Filter']
      },
      {
        id: 'perf-2',
        name: 'Performance Exhaust',
        desc: 'T304 stainless steel mandrel-bent cat-back exhaust system with quad burnt titanium tips and deep drone-free note.',
        price: 599.99,
        prevPrice: 749.99,
        discount: 20,
        rating: 4.9,
        reviewsCount: 135,
        stock: 'In Stock',
        stockCount: 5,
        sku: 'PERF-EXH-304',
        brand: 'VortexSound Racing',
        warranty: '5-Year Stainless Shield',
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=700&q=80',
        specs: ['Pipe Diameter: 3.0" Straight-Through', 'Material: Polished T304 Stainless', 'Tips: 4.0" Quad Beveled Titanium', 'Weight: -18 lbs vs Heavy OEM Muffler']
      },
      {
        id: 'perf-3',
        name: 'Intercooler',
        desc: 'High-density bar-and-plate front-mount aluminum intercooler core supporting up to 650 horsepower with zero heat soak.',
        price: 349.99,
        prevPrice: 429.99,
        discount: 19,
        rating: 4.7,
        reviewsCount: 84,
        stock: 'In Stock',
        stockCount: 7,
        sku: 'PERF-IC-650',
        brand: 'CoolForge Core',
        warranty: '3-Year Leak-Free',
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=700&q=80',
        specs: ['Core Dimensions: 24" x 12" x 3.5"', 'End Tanks: Cast Aluminum TIG Welded', 'Inlet/Outlet: 2.75" Beaded End Connections', 'Pressure Drop: Under 0.75 PSI @ 30 PSI']
      },
      {
        id: 'perf-4',
        name: 'ECU Tuning Module',
        desc: 'Plug-and-play performance piggyback flash tuner unlocking up to +45 HP and +60 lb-ft torque via Bluetooth map selector.',
        price: 299.99,
        prevPrice: 389.99,
        discount: 23,
        rating: 4.8,
        reviewsCount: 110,
        stock: 'In Stock',
        stockCount: 12,
        sku: 'PERF-ECU-PRO',
        brand: 'MapMaster Flash',
        warranty: '2-Year Electronics',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
        specs: ['Maps: 4 Selectable Driving Modes (Eco/Sport/Race/Valet)', 'Installation: 10-Minute Plug & Play Harness', 'Control: iOS / Android App Realtime Telemetry', 'Warranty-Safe: Leaves No ECU Flash Trace']
      },
      {
        id: 'perf-5',
        name: 'Racing Clutch Kit',
        desc: 'Stage 3 sprung 6-puck ceramic clutch kit with heavy-duty pressure plate capable of holding 480 lb-ft of torque.',
        price: 449.99,
        prevPrice: 559.99,
        discount: 20,
        rating: 4.7,
        reviewsCount: 62,
        stock: 'In Stock',
        stockCount: 8,
        sku: 'PERF-CK-ST3',
        brand: 'TorqueBite Ceramic',
        warranty: '1-Year Performance',
        image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=700&q=80',
        specs: ['Disc Material: 6-Puck Copper-Ceramic', 'Torque Capacity: 480 lb-ft Wheel Torque', 'Clamp Load: +40% Heavy Duty Diaphragm', 'Includes: Throw-out Bearing & Alignment Tool']
      },
      {
        id: 'perf-6',
        name: 'Performance Camshaft',
        desc: 'High-lift billet steel camshaft set engineered for increased valve duration, lift and top-end rev power band.',
        price: 399.99,
        prevPrice: 499.99,
        discount: 20,
        rating: 4.6,
        reviewsCount: 48,
        stock: 'In Stock',
        stockCount: 6,
        sku: 'PERF-CAM-272',
        brand: 'ApexLift Billet',
        warranty: '3-Year Hardness Guarantee',
        image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=700&q=80',
        specs: ['Duration: 272° Intake / 268° Exhaust', 'Lift: 11.2mm High-Lift Cam Profiles', 'Material: Billet 8620 Heat-Treated Steel', 'Target RPM: 3,500 – 8,500 Powerband']
      }
    ]
  },
  {
    id: 'car-maintenance',
    title: 'Car Maintenance & Accessories',
    tagline: 'Synthetic oils, diagnostic scan tools, hydraulic floor jacks & emergency gear',
    icon: '🧰',
    bannerBadge: 'PRO WORKSHOP',
    products: [
      {
        id: 'maint-1',
        name: 'Engine Oil',
        desc: 'Full synthetic 5W-30 motor oil with advanced anti-wear titanium liquid additives (5-Quart jug).',
        price: 39.99,
        prevPrice: 49.99,
        discount: 20,
        rating: 4.8,
        reviewsCount: 480,
        stock: 'In Stock',
        stockCount: 60,
        sku: 'MNT-OIL-5W30',
        brand: 'TitanSyn 10K',
        warranty: '10,000 Mile Protection',
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=700&q=80',
        specs: ['Viscosity: 5W-30 Full Synthetic', 'Volume: 5 US Quarts (4.73 Liters)', 'Standards: API SP / ILSAC GF-6A / Dexos 1', 'Protection: Extended High-Temp Sludge Defense']
      },
      {
        id: 'maint-2',
        name: 'Car Cleaning Kit',
        desc: '12-piece professional detailing kit with brass foam cannon, plush microfiber mitts, ceramic spray & tire shine.',
        price: 49.99,
        prevPrice: 69.99,
        discount: 29,
        rating: 4.7,
        reviewsCount: 260,
        stock: 'In Stock',
        stockCount: 35,
        sku: 'MNT-CK-12PC',
        brand: 'GleamDetail Master',
        warranty: '100% Satisfaction Guarantee',
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=700&q=80',
        specs: ['Includes: 12 Premium Detailing Tools', 'Foam Cannon: 1/4" Quick Connect Solid Brass', 'Coating: 16oz SiO2 Ceramic Quick Detailer', 'Towels: 4x 800 GSM Edgeless Microfiber']
      },
      {
        id: 'maint-3',
        name: 'Hydraulic Floor Jack',
        desc: '3-Ton low-profile steel racing floor jack with dual rapid pump pistons and universal rubber saddle pad.',
        price: 129.99,
        prevPrice: 169.99,
        discount: 24,
        rating: 4.6,
        reviewsCount: 140,
        stock: 'In Stock',
        stockCount: 11,
        sku: 'MNT-FJ-3TON',
        brand: 'LiftPro HeavyDuty',
        warranty: '3-Year Hydraulic Seal',
        image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=700&q=80',
        specs: ['Capacity: 3 Tons (6,000 lbs)', 'Min Height: 3.125" (Low-Car Friendly)', 'Max Height: 19.8" Lift Elevation', 'System: Dual Rapid-Pump Power Unit']
      },
      {
        id: 'maint-4',
        name: 'Portable Air Compressor',
        desc: '150 PSI cordless heavy-duty tire inflator with digital pressure auto-stop and emergency LED beacon light.',
        price: 79.99,
        prevPrice: 99.99,
        discount: 20,
        rating: 4.8,
        reviewsCount: 220,
        stock: 'In Stock',
        stockCount: 28,
        sku: 'MNT-AC-150',
        brand: 'AeroPump Digital',
        warranty: '2-Year Battery & Motor',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80',
        specs: ['Max Pressure: 150 PSI (10.3 Bar)', 'Battery: 6000mAh Rechargeable Lithium', 'Speed: Inflates Flat Car Tire in 4 Mins', 'Extras: 12V DC Car Adapter + 4 Nozzles']
      },
      {
        id: 'maint-5',
        name: 'Jump Starter',
        desc: '2500A peak current lithium battery jump starter box with QC 3.0 fast charging power bank and safety spark-proof clamps.',
        price: 99.99,
        prevPrice: 129.99,
        discount: 23,
        rating: 4.7,
        reviewsCount: 195,
        stock: 'In Stock',
        stockCount: 21,
        sku: 'MNT-JS-2500A',
        brand: 'VoltBooster Peak',
        warranty: '2-Year Replacement',
        image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=700&q=80',
        specs: ['Peak Current: 2500A (Starts up to 8.5L Gas / 6.5L Diesel)', 'Battery: 20,000mAh Power Bank Capacity', 'Protection: 8 Smart Anti-Reverse Spark Protections', 'Light: 400 Lumen SOS / Strobe Flashlight']
      },
      {
        id: 'maint-6',
        name: 'OBD2 Diagnostic Scanner',
        desc: 'Professional handheld auto code reader with live sensor data graphing and instant check engine light reset.',
        price: 89.99,
        prevPrice: 119.99,
        discount: 25,
        rating: 4.9,
        reviewsCount: 310,
        stock: 'In Stock',
        stockCount: 30,
        sku: 'MNT-OBD-PRO',
        brand: 'DiagScan Ultra',
        warranty: 'Lifetime Free Software Updates',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
        specs: ['Protocols: All 1996+ OBD2 / EOBD / CAN', 'Screen: 2.8" Color TFT Display Screen', 'Functions: Read/Erase DTCs, O2 Sensor, EVAP, I/M Readiness', 'Library: 50,000+ Built-in Fault Code Explanations']
      }
    ]
  }
];

export default function SparePartsStore() {
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  // Cart & Wishlist states with LocalStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('mechify_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('mechify_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('mechify_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mechify_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast trigger
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Cart actions
  const handleAddToCart = (product, quantity = 1, e) => {
    if (e) e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [...prev, { ...product, qty: quantity }];
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
    triggerToast(`🛒 Added ${product.name} to your cart!`);
  };

  const handleUpdateQty = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Wishlist actions
  const handleToggleWishlist = (product, e) => {
    if (e) e.stopPropagation();
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        triggerToast(`💔 Removed ${product.name} from Wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        triggerToast(`❤️ Saved ${product.name} to Wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Computed Cart metrics
  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  // Smooth Horizontal Scroll Refs for each of the 10 rows
  const rowRefs = useRef({});

  const scrollRow = (categoryId, direction) => {
    const container = rowRefs.current[categoryId];
    if (container) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Quick jump to row
  const scrollToCategorySection = (catId) => {
    setActiveCategoryTab(catId);
    if (catId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(`section-${catId}`);
    if (elem) {
      const yOffset = -120;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Filtered categories & products based on search & quick filters
  const filteredCategories = useMemo(() => {
    return CAR_PARTS_CATEGORIES.map(cat => {
      const matchingProducts = cat.products.filter(prod => {
        const matchesSearch =
          searchQuery.trim() === '' ||
          prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.brand.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesFilter = true;
        if (selectedFilter === 'discounts') matchesFilter = prod.discount >= 20;
        if (selectedFilter === 'top-rated') matchesFilter = prod.rating >= 4.8;
        if (selectedFilter === 'under-100') matchesFilter = prod.price < 100;

        return matchesSearch && matchesFilter;
      });

      return {
        ...cat,
        products: matchingProducts
      };
    }).filter(cat => cat.products.length > 0);
  }, [searchQuery, selectedFilter]);

  return (
    <div className="bg-[#08090C] min-h-screen text-white font-outfit relative selection:bg-red-600 selection:text-white pb-32">
      
      {/* ─── CARBON FIBER & AMBIENT GLOW BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-gradient-to-br from-red-600/15 via-red-900/5 to-transparent blur-[140px]" />
        <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-gradient-to-bl from-orange-600/10 via-red-900/5 to-transparent blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[700px] h-[600px] bg-gradient-to-tr from-red-700/10 via-black to-transparent blur-[160px]" />
      </div>

      {/* ─── TOAST NOTIFICATION POPUP ─── */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#161822]/95 border border-red-500/40 backdrop-blur-xl text-white px-6 py-3.5 rounded-full shadow-[0_10px_35px_rgba(220,38,38,0.35)] flex items-center gap-3 animate-fadeInUp">
          <span className="text-xl">✨</span>
          <span className="font-semibold text-sm sm:text-base tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* ─── STICKY HEADER & MARKETPLACE CONTROLS ─── */}
      <div className="relative z-20 pt-28 pb-8 px-4 sm:px-8 lg:px-14 max-w-[1920px] mx-auto">
        
        {/* Marketplace Header Card */}
        <div className="relative bg-gradient-to-r from-[#12131C] via-[#171824] to-[#12131C] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden mb-8">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs tracking-wider uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                OFFICIAL AUTOMOTIVE MARKETPLACE
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sora">
                Car Parts <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-red-500">Superstore</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
                Explore 10 curated automotive categories with 60 high-performance replacement & upgrade components, precision engineered for maximum power, safety and reliability.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <div className="bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Categories</p>
                <p className="text-2xl font-black text-white font-sora">10</p>
              </div>
              <div className="bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Products</p>
                <p className="text-2xl font-black text-red-500 font-sora">60</p>
              </div>
              <div className="bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Fast Freight</p>
                <p className="text-2xl font-black text-green-400 font-sora">24h</p>
              </div>
            </div>
          </div>

          {/* Search Bar & Filter Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search turbo, brake disc, coilover, exhaust..."
                className="w-full bg-black/60 border border-white/15 focus:border-red-500 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs bg-white/10 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {[
                { id: 'all', label: 'All 60 Items' },
                { id: 'discounts', label: '🔥 20%+ Off Deals' },
                { id: 'top-rated', label: '⭐ Top Rated (4.8+)' },
                { id: 'under-100', label: '⚡ Under $100' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    selectedFilter === f.id
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── QUICK CATEGORY JUMP PILLS ─── */}
        <div className="sticky top-20 z-30 bg-[#08090C]/90 backdrop-blur-xl py-3 -mx-4 px-4 sm:-mx-8 sm:px-8 border-y border-white/10 flex items-center gap-2.5 overflow-x-auto no-scrollbar shadow-lg">
          <span className="text-xs font-black uppercase text-gray-400 tracking-wider whitespace-nowrap pl-1">
            Browse Rows:
          </span>
          <button
            onClick={() => scrollToCategorySection('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategoryTab === 'all'
                ? 'bg-white text-black font-extrabold shadow-md'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            All Categories
          </button>
          {CAR_PARTS_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategorySection(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategoryTab === cat.id
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── 10 HORIZONTAL PRODUCT ROWS ─── */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-14 space-y-16">
        
        {filteredCategories.length === 0 ? (
          <div className="bg-[#12131C] border border-white/10 rounded-3xl p-16 text-center max-w-xl mx-auto my-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-black text-white mb-2">No Parts Found</h3>
            <p className="text-gray-400 text-sm mb-6">No automotive parts matched your search or filters. Try clearing your query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category, rowIndex) => (
            <section
              key={category.id}
              id={`section-${category.id}`}
              className="relative group/section"
            >
              {/* Category Row Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600/20 via-white/5 to-transparent border border-red-500/30 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(220,38,38,0.15)]">
                    {category.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-red-500 tracking-widest uppercase">
                        ROW {rowIndex + 1}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                        {category.products.length} Products
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-sora">
                      {category.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Left / Right Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollRow(category.id, 'left')}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
                      title="Scroll Left"
                      aria-label="Previous Products"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollRow(category.id, 'right')}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
                      title="Scroll Right"
                      aria-label="Next Products"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* View All Button */}
                  <button
                    onClick={() => {
                      setSelectedFilter('all');
                      setSearchQuery(category.title);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-xs sm:text-sm font-bold text-gray-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5"
                  >
                    <span>View All</span>
                    <span className="text-red-500">→</span>
                  </button>
                </div>
              </div>

              {/* Horizontally Scrollable Row Container */}
              <div
                ref={el => (rowRefs.current[category.id] = el)}
                className="flex overflow-x-auto gap-6 pb-6 pt-2 no-scrollbar snap-x snap-mandatory scroll-smooth px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {category.products.map(product => {
                  const wishlisted = isWishlisted(product.id);
                  const isJustAdded = recentlyAddedId === product.id;

                  return (
                    <div
                      key={product.id}
                      className="snap-start flex-shrink-0 w-[290px] sm:w-[320px] lg:w-[340px] bg-gradient-to-b from-[#141520] via-[#10111A] to-[#0D0E15] border border-white/10 hover:border-red-500/60 rounded-3xl overflow-hidden hover:shadow-[0_15px_35px_rgba(220,38,38,0.2)] hover:-translate-y-2 transition-all duration-400 group flex flex-col relative"
                    >
                      {/* Product Image Container */}
                      <div className="relative h-56 w-full bg-black/60 overflow-hidden flex items-center justify-center p-2">
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-[#10111A] via-transparent to-black/40 z-10 pointer-events-none" />

                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                        />

                        {/* Discount Badge */}
                        {product.discount > 0 && (
                          <div className="absolute top-3.5 left-3.5 z-20 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            -{product.discount}% OFF
                          </div>
                        )}

                        {/* Stock Status Badge */}
                        <div className="absolute bottom-3 left-3.5 z-20 px-2.5 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-extrabold backdrop-blur-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          {product.stock}
                        </div>

                        {/* Wishlist Button (❤️) */}
                        <button
                          onClick={(e) => handleToggleWishlist(product, e)}
                          className={`absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                            wishlisted
                              ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.8)] scale-110'
                              : 'bg-black/60 text-gray-300 hover:text-white hover:bg-black/90 border border-white/15 hover:scale-110'
                          }`}
                          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          aria-label="Wishlist"
                        >
                          <svg
                            className={`w-5 h-5 transition-transform duration-300 ${wishlisted ? 'fill-current scale-110' : 'fill-none'}`}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>

                        {/* Quick View Hover Overlay Button */}
                        <button
                          onClick={() => { setQuickViewProduct(product); setQuickViewQty(1); }}
                          className="absolute inset-x-8 bottom-3 z-20 py-2 bg-white/90 hover:bg-white text-black font-extrabold text-xs rounded-xl shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1.5"
                        >
                          <span>👁️</span> Quick View
                        </button>
                      </div>

                      {/* Product Content */}
                      <div className="p-5 flex flex-col flex-1 justify-between">
                        
                        <div>
                          {/* Brand & Star Rating Row */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                              {product.brand}
                            </span>
                            
                            <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                              <span className="text-yellow-400 text-xs">⭐</span>
                              <span className="text-white text-xs font-bold">{product.rating}</span>
                              <span className="text-gray-500 text-[10px]">({product.reviewsCount})</span>
                            </div>
                          </div>

                          {/* Product Title */}
                          <h3
                            onClick={() => { setQuickViewProduct(product); setQuickViewQty(1); }}
                            className="font-bold text-base sm:text-lg text-white group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer mb-1.5 font-sora"
                          >
                            {product.name}
                          </h3>

                          {/* Short 1-Line Description */}
                          <p className="text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed font-normal">
                            {product.desc}
                          </p>
                        </div>

                        {/* Price & Add to Cart Footer */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl sm:text-2xl font-black text-white font-sora">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.prevPrice && (
                                <span className="text-xs text-gray-500 line-through font-semibold">
                                  ${product.prevPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400 uppercase font-semibold">
                              SKU: {product.sku}
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={(e) => handleAddToCart(product, 1, e)}
                            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 select-none shadow-md ${
                              isJustAdded
                                ? 'bg-green-600 text-white scale-105 shadow-[0_0_15px_rgba(34,197,94,0.6)]'
                                : 'bg-red-600 hover:bg-red-500 active:scale-95 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <span>✓</span>
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <span>🛒</span>
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>

      {/* ─── FLOATING STICKY ACTION BUTTONS ─── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        
        {/* Wishlist Floating Trigger */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative w-14 h-14 rounded-full bg-[#161824] hover:bg-[#1E2030] text-white border border-white/20 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          title="Open Wishlist"
        >
          <span className="text-xl group-hover:scale-125 transition-transform">❤️</span>
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-[#08090C] animate-bounce">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Cart Floating Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-orange-500 text-white shadow-[0_0_35px_rgba(220,38,38,0.6)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-sosPulse"
          title="Open Cart"
        >
          <span className="text-2xl">🛒</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-red-600">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* ─── QUICK VIEW PRODUCT MODAL ─── */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="relative bg-[#12141E] border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-scaleIn text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Modal Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors z-20"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image Stage */}
              <div className="relative bg-black/60 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center min-h-[300px]">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover max-h-[360px]"
                />
                {quickViewProduct.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                    SAVE {quickViewProduct.discount}%
                  </div>
                )}
              </div>

              {/* Details & Specs */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black text-red-500 uppercase tracking-wider">
                      {quickViewProduct.brand}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-xs text-gray-400">SKU: {quickViewProduct.sku}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white font-sora mb-2">
                    {quickViewProduct.name}
                  </h3>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400 text-sm">
                      {'★'.repeat(Math.floor(quickViewProduct.rating))}
                    </div>
                    <span className="text-white font-bold text-sm">{quickViewProduct.rating} / 5.0</span>
                    <span className="text-gray-400 text-xs">({quickViewProduct.reviewsCount} verified reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-white/10">
                    <span className="text-3xl font-black text-white font-sora">
                      ${quickViewProduct.price.toFixed(2)}
                    </span>
                    {quickViewProduct.prevPrice && (
                      <span className="text-base text-gray-500 line-through">
                        ${quickViewProduct.prevPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">
                      {quickViewProduct.stock} ({quickViewProduct.stockCount} left)
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {quickViewProduct.desc}
                  </p>

                  {/* Technical Specifications */}
                  {quickViewProduct.specs && (
                    <div className="mb-6 bg-black/40 rounded-xl p-4 border border-white/5">
                      <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                        Key Specifications:
                      </p>
                      <ul className="space-y-1.5 text-xs text-gray-300">
                        {quickViewProduct.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-red-500 font-bold">✓</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Quantity & CTA */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-black/60 border border-white/15 rounded-xl p-1">
                      <button
                        onClick={() => setQuickViewQty(q => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-black text-sm">{quickViewQty}</span>
                      <button
                        onClick={() => setQuickViewQty(q => q + 1)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart(quickViewProduct, quickViewQty);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-3.5 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 text-sm sm:text-base active:scale-98"
                    >
                      <span>🛒</span> Add to Cart • ${(quickViewProduct.price * quickViewQty).toFixed(2)}
                    </button>
                  </div>

                  <button
                    onClick={(e) => handleToggleWishlist(quickViewProduct, e)}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-white/10"
                  >
                    <span>{isWishlisted(quickViewProduct.id) ? '💔 Remove from Wishlist' : '❤️ Save to Wishlist'}</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── CART SLIDE-OUT DRAWER ─── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div
            className="w-full max-w-md bg-[#0F101A] border-l border-white/15 h-full flex flex-col shadow-2xl p-6 relative animate-slideInRight text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🛒</span>
                <div>
                  <h3 className="text-xl font-black font-sora">Your Cart</h3>
                  <p className="text-xs text-gray-400">{totalCartCount} item(s) selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="my-4 p-3.5 bg-black/40 rounded-2xl border border-white/5">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-300">
                  {cartSubtotal >= 150 ? '🎉 Free Express Freight Unlocked!' : `Add $${(150 - cartSubtotal).toFixed(2)} for Free Freight`}
                </span>
                <span className="text-red-400">{Math.min(100, Math.round((cartSubtotal / 150) * 100))}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-green-400 transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (cartSubtotal / 150) * 100)}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {cart.length === 0 ? (
                <div className="py-20 text-center text-gray-400">
                  <span className="text-5xl block mb-3 opacity-40">🛒</span>
                  <p className="text-base font-bold text-white mb-1">Your cart is currently empty</p>
                  <p className="text-xs">Browse our 10 product rows and upgrade your ride!</p>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-white/5 border border-white/5 rounded-2xl p-3 items-center justify-between"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl bg-black/50 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-white truncate font-sora">{item.name}</h4>
                      <p className="text-xs text-red-400 font-extrabold">${item.price.toFixed(2)}</p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleUpdateQty(item.id, -1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-white font-sora">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors mt-2"
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Estimated Shipping</span>
                  <span className="text-green-400 font-bold">{cartSubtotal >= 150 ? 'FREE' : '$14.99'}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-white border-t border-white/10 pt-2 font-sora">
                  <span>Total</span>
                  <span className="text-red-400">
                    ${(cartSubtotal + (cartSubtotal >= 150 ? 0 : 14.99)).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    alert(`Proceeding to checkout with ${totalCartCount} item(s)! Total: $${(cartSubtotal + (cartSubtotal >= 150 ? 0 : 14.99)).toFixed(2)}`);
                    navigate('/payment-select');
                  }}
                  className="w-full py-4 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:opacity-95 text-white font-black rounded-2xl text-base shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all active:scale-98"
                >
                  Proceed to Secure Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── WISHLIST SLIDE-OUT DRAWER ─── */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div
            className="w-full max-w-md bg-[#0F101A] border-l border-white/15 h-full flex flex-col shadow-2xl p-6 relative animate-slideInRight text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">❤️</span>
                <div>
                  <h3 className="text-xl font-black font-sora">Saved Wishlist</h3>
                  <p className="text-xs text-gray-400">{wishlist.length} item(s) saved</p>
                </div>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto space-y-4 my-4 pr-1">
              {wishlist.length === 0 ? (
                <div className="py-20 text-center text-gray-400">
                  <span className="text-5xl block mb-3 opacity-40">💔</span>
                  <p className="text-base font-bold text-white mb-1">Your wishlist is empty</p>
                  <p className="text-xs">Click the ❤️ on any product card to save your favorite parts!</p>
                </div>
              ) : (
                wishlist.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-white/5 border border-white/5 rounded-2xl p-3 items-center justify-between"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl bg-black/50 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-white truncate font-sora">{item.name}</h4>
                      <p className="text-xs text-red-400 font-extrabold">${item.price.toFixed(2)}</p>
                      <span className="text-[10px] text-gray-400 uppercase">{item.brand}</span>
                    </div>

                    <div className="flex flex-col gap-1 items-end">
                      <button
                        onClick={() => {
                          handleAddToCart(item, 1);
                          handleToggleWishlist(item);
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <span>🛒</span> Move to Cart
                      </button>
                      <button
                        onClick={() => handleToggleWishlist(item)}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Wishlist Footer */}
            {wishlist.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    wishlist.forEach(item => handleAddToCart(item, 1));
                    setWishlist([]);
                    triggerToast(`🛒 Moved all ${wishlist.length} wishlist items to your cart!`);
                  }}
                  className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-sm border border-white/15 transition-all"
                >
                  Move All to Cart 🛒
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

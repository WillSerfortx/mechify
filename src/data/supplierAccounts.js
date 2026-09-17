// Demo Supplier / Vendor Accounts & Marketplace Inventory for Mechify
// All demo accounts have password: "123"

export const SUPPLIER_DEMO_ACCOUNTS = [
  {
    id: 'supp-1',
    email: 'supplier@gmail.com',
    alternateEmail: 'vendors@tandem.mechify.com',
    password: '123',
    vendorName: 'Ronald Richards',
    companyName: 'AeroFlow Tuning & OEM Spares Ltd.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1200&h=400&fit=crop',
    role: 'supplier',
    phone: '+880 1711-224466',
    address: 'Plot 42, Tejgaon Light Industrial Area, Dhaka 1208',
    tradeBin: 'BIN-990812401',
    rating: 4.9,
    totalReviewsCount: 342,
    businessHours: 'Mon - Sat: 09:00 AM - 08:00 PM (Closed on Friday)',
    returnPolicy: '30-Day Hassle-Free Return for unused OEM items in original packaging.',
    warrantyPolicy: '1 to 3 Year Official Manufacturer Warranty on all genuine performance parts.',
    socialLinks: {
      website: 'https://aeroflow.mechify.store',
      facebook: 'facebook.com/aeroflow.bd',
      instagram: '@aeroflow_spares'
    },
    storeDescription: 'Premier distributor of motorsport-grade braking, twin-turbo systems, aerodynamic splitters, and high-performance synthetic lubricants across Bangladesh.',
    kpis: {
      totalProducts: 48,
      activeProducts: 42,
      outOfStock: 2,
      pendingOrders: 5,
      totalOrders: 684,
      totalSales: '$549,735.00',
      revenue: '$749,735.00',
      todayRevenue: '$4,280.00',
      monthlyRevenue: '$62,400.00',
      pendingPayments: '$3,420.00',
      completedPayments: '$724,315.00',
      refunds: '$1,200.00',
      platformFeeRate: '8%',
      platformFeesPaid: '$59,978.00',
      netEarnings: '$689,757.00',
      avgRating: 4.9,
      dayOfCredit: '45 Days',
      dayOfCreditChange: '↑ 45% ORDER',
      totalCreditAmount: '4,00,000',
      totalCreditChange: '↑ 12% INCREASE ORDER',
      totalAmountPO: '$45,251',
      totalAmountPOChange: '↓ 14% DECREASE PO',
      totalInvoice: '2574',
      totalInvoiceChange: '↑ 40% INCREASE AMOUNT',
      salesChange: '↑ 25% increase',
      totalSpend: '$145,000',
      totalSpendChange: '↓ 20% Decrease',
      inTotalHighlight: '$749,735.00',
      inTotalDate: '08 April GMT + 6'
    },
    ratingBreakdown: {
      star5: 78,
      star4: 15,
      star3: 5,
      star2: 1,
      star1: 1
    },
    orders: [
      {
        id: 'A&R2409R',
        orderDate: '30/01/24 - 12:51 PM',
        deliveryDate: '01/02/25 - 07:00 PM',
        status: 'Pending',
        total: '$143.00',
        subtotal: '$135.00',
        shippingCost: '$8.00',
        tax: '$0.00',
        paymentStatus: 'Paid',
        paymentMethod: 'bKash Merchant Pay',
        customer: 'Ronald Richards',
        customerPhone: '+880 1712-345678',
        shippingAddress: 'House 14, Road 11, Banani, Dhaka',
        product: 'Brembo Carbon Ceramic Brake Pads',
        sku: 'BRM-CC-902',
        qty: 2,
        timeline: [
          { status: 'Order Placed', time: '30 Jan 2024, 12:51 PM', done: true },
          { status: 'Payment Verified', time: '30 Jan 2024, 12:53 PM', done: true },
          { status: 'Packaging in Warehouse', time: 'Pending Action', done: false },
          { status: 'Shipped with Courier', time: 'Estimated 31 Jan', done: false },
          { status: 'Delivered', time: 'Estimated 01 Feb', done: false }
        ]
      },
      {
        id: 'ERO459W1',
        orderDate: '28/01/24 - 11:00 AM',
        deliveryDate: '01/02/25 - 12:00 PM',
        status: 'Accepted',
        total: '$78.00',
        subtotal: '$70.00',
        shippingCost: '$8.00',
        tax: '$0.00',
        paymentStatus: 'Paid',
        paymentMethod: 'Mastercard •••• 4092',
        customer: 'Mahi Rahman',
        customerPhone: '+880 1819-223344',
        shippingAddress: 'Plot 88, Kemal Ataturk Ave, Gulshan 2, Dhaka',
        product: 'Motul 300V 5W-40 Synthetic Oil (4L)',
        sku: 'MOT-300V-4L',
        qty: 1,
        timeline: [
          { status: 'Order Placed', time: '28 Jan 2024, 11:00 AM', done: true },
          { status: 'Payment Verified', time: '28 Jan 2024, 11:02 AM', done: true },
          { status: 'Packaging in Warehouse', time: '28 Jan 2024, 02:30 PM', done: true },
          { status: 'Shipped with Courier', time: 'Pending', done: false },
          { status: 'Delivered', time: 'Estimated 01 Feb', done: false }
        ]
      },
      {
        id: 'AR2409R4',
        orderDate: '27/01/24 - 01:35 PM',
        deliveryDate: '31/01/25 - 04:00 PM',
        status: 'Processing',
        total: '$360.00',
        subtotal: '$350.00',
        shippingCost: '$10.00',
        tax: '$0.00',
        paymentStatus: 'Paid',
        paymentMethod: 'Bank Wire Transfer',
        customer: 'Tanvir Hossain',
        customerPhone: '+880 1722-114477',
        shippingAddress: 'Sector 4, Road 18, Uttara, Dhaka',
        product: 'Garrett GTX3582R Gen II Turbocharger',
        sku: 'GAR-GTX-3582',
        qty: 1,
        timeline: [
          { status: 'Order Placed', time: '27 Jan 2024, 01:35 PM', done: true },
          { status: 'Payment Verified', time: '27 Jan 2024, 01:40 PM', done: true },
          { status: 'Packaging in Warehouse', time: '27 Jan 2024, 04:10 PM', done: true },
          { status: 'Quality Inspection', time: '28 Jan 2024, 10:00 AM', done: true },
          { status: 'Ready for Courier Dispatch', time: 'Pending Courier Pickup', done: false }
        ]
      },
      {
        id: 'AO459W1',
        orderDate: '26/01/24 - 05:00 PM',
        deliveryDate: '04/02/25 - 07:00 PM',
        status: 'Shipped',
        total: '$115.00',
        subtotal: '$110.00',
        shippingCost: '$5.00',
        tax: '$0.00',
        paymentStatus: 'Paid',
        paymentMethod: 'Visa •••• 9921',
        customer: 'Arman Khan',
        customerPhone: '+880 1911-332211',
        shippingAddress: 'Dhanmondi 8/A, House 22, Dhaka',
        product: 'Akrapovič Titanium Dual Exhaust Tips',
        sku: 'AKR-TIP-TI',
        qty: 2,
        timeline: [
          { status: 'Order Placed', time: '26 Jan 2024', done: true },
          { status: 'Payment Verified', time: '26 Jan 2024', done: true },
          { status: 'Dispatched via Paperfly Logistics', time: '27 Jan 2024, Waybill #PF-9021', done: true },
          { status: 'Out for Delivery', time: 'In Transit', done: false }
        ]
      },
      {
        id: 'R2409R37',
        orderDate: '25/01/24 - 03:00 PM',
        deliveryDate: '31/01/25 - 02:00 PM',
        status: 'Delivered',
        total: '$474.00',
        subtotal: '$460.00',
        shippingCost: '$14.00',
        tax: '$0.00',
        paymentStatus: 'Paid',
        paymentMethod: 'Cash On Delivery',
        customer: 'Sabbir Ahmed',
        customerPhone: '+880 1622-445566',
        shippingAddress: 'Mirpur DOHS, Avenue 3, Road 7, Dhaka',
        product: 'Bilstein B16 PSS10 Coilover Damper Kit',
        sku: 'BIL-B16-PSS',
        qty: 1,
        timeline: [
          { status: 'Order Placed', time: '25 Jan 2024', done: true },
          { status: 'Dispatched', time: '26 Jan 2024', done: true },
          { status: 'Delivered & Signed', time: '28 Jan 2024', done: true }
        ]
      },
      {
        id: 'R2409R69',
        orderDate: '24/01/24 - 11:14 AM',
        deliveryDate: '28/01/25 - 06:00 PM',
        status: 'Accepted',
        total: '$446.00',
        subtotal: '$438.00',
        shippingCost: '$8.00',
        tax: '$0.00',
        paymentStatus: 'Paid',
        paymentMethod: 'bKash Online',
        customer: 'Navid Hasan',
        customerPhone: '+880 1755-667788',
        shippingAddress: 'Bashundhara R/A, Block D, Road 4, Dhaka',
        product: 'NGK Laser Iridium Spark Plugs (Set of 8)',
        sku: 'NGK-IR-8PC',
        qty: 4,
        timeline: [
          { status: 'Order Placed', time: '24 Jan 2024', done: true },
          { status: 'Confirmed by Seller', time: '24 Jan 2024', done: true }
        ]
      },
      {
        id: 'ERO459E1',
        orderDate: '23/01/24 - 11:01 AM',
        deliveryDate: '27/01/25 - 12:00 PM',
        status: 'Delivered',
        total: '$264.00',
        subtotal: '$255.00',
        shippingCost: '$9.00',
        tax: '$0.00',
        paymentStatus: 'Paid',
        paymentMethod: 'Credit Card',
        customer: 'Fahim Chowdhury',
        customerPhone: '+880 1833-998877',
        shippingAddress: 'Lalmatia Block C, Dhaka',
        product: 'Mishimoto Performance Dual Core Radiator',
        sku: 'MIS-RAD-DC',
        qty: 1,
        timeline: [
          { status: 'Delivered', time: '27 Jan 2024', done: true }
        ]
      },
      {
        id: 'ERO459A1',
        orderDate: '23/01/24 - 11:51 AM',
        deliveryDate: '28/01/25 - 01:00 PM',
        status: 'Cancelled',
        total: '$529.00',
        subtotal: '$520.00',
        shippingCost: '$9.00',
        tax: '$0.00',
        paymentStatus: 'Refunded',
        paymentMethod: 'bKash Refund',
        customer: 'Zubair Hossain',
        customerPhone: '+880 1799-223311',
        shippingAddress: 'Mohakhali DOHS, Road 14, Dhaka',
        product: 'K&N Carbon Air Intake Induction System',
        sku: 'KN-CAB-INT',
        qty: 1,
        timeline: [
          { status: 'Cancelled by Customer (Car Sold)', time: '23 Jan 2024', done: true },
          { status: 'Refund Processed', time: '24 Jan 2024', done: true }
        ]
      }
    ],
    products: [
      {
        id: 'P-101',
        name: 'Brembo Carbon Ceramic Brake Pads',
        brand: 'Brembo',
        sku: 'BRM-CC-902',
        category: 'Braking',
        subcategory: 'Brake Pads & Rotors',
        partNumber: 'P 85 147X',
        condition: 'New',
        price: 143.00,
        msrp: 180.00,
        discount: 21,
        stock: 45,
        lowStockAlert: 10,
        reservedStock: 4,
        availableStock: 41,
        minOrderQty: 1,
        weight: '2.4 kg',
        dimensions: '22 x 14 x 8 cm',
        unitsSold: 184,
        revenue: '$26,312.00',
        rating: 4.9,
        reviewsCount: 48,
        status: 'Active',
        createdDate: '12 Jan 2024',
        shortDescription: 'High-temperature carbon ceramic composite brake pads designed for extreme track performance with zero fade.',
        fullDescription: 'Genuine Brembo Carbon Ceramic brake pad kit manufactured in Italy. Features patented chamfered friction edges and anti-squeal shims. Tested for thermal stability up to 750°C.',
        images: [
          'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&h=400&fit=crop',
          'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&h=400&fit=crop'
        ],
        compatibility: [
          { make: 'Porsche', model: '911 Carrera / Turbo', year: '2016 - 2023', engine: '3.0L Twin-Turbo Flat-6', transmission: 'PDK Automatic' },
          { make: 'BMW', model: 'M3 / M4 Competition (G80/G82)', year: '2021 - 2024', engine: '3.0L S58 Twin-Turbo', transmission: '8-Speed Steptronic' },
          { make: 'Audi', model: 'RS6 Avant / RS7', year: '2020 - 2024', engine: '4.0L Twin-Turbo V8', transmission: 'Tiptronic Automatic' }
        ],
        shipping: {
          method: 'Standard Express (2-3 Days)',
          cost: 8.00,
          freeShipping: false,
          deliveryTime: '2-3 Business Days',
          warranty: '2 Years Manufacturer Warranty'
        }
      },
      {
        id: 'P-102',
        name: 'Motul 300V Trophy 0W-40 Synthetic Ester Core (4L)',
        brand: 'Motul',
        sku: 'MOT-300V-4L',
        category: 'Lubricants',
        subcategory: 'Engine Oil',
        partNumber: '104240',
        condition: 'New',
        price: 78.00,
        msrp: 95.00,
        discount: 18,
        stock: 120,
        lowStockAlert: 20,
        reservedStock: 12,
        availableStock: 108,
        minOrderQty: 1,
        weight: '4.1 kg',
        dimensions: '28 x 18 x 12 cm',
        unitsSold: 312,
        revenue: '$24,336.00',
        rating: 5.0,
        reviewsCount: 86,
        status: 'Active',
        createdDate: '10 Jan 2024',
        shortDescription: '100% synthetic racing motor oil based on ESTER Core technology for track and high-performance road cars.',
        fullDescription: 'Motul 300V Trophy 0W-40 provides maximum power output with uncompromising engine reliability and wear protection. Excellent shear resistance under high thermal loads.',
        images: [
          'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&h=400&fit=crop'
        ],
        compatibility: [
          { make: 'Universal', model: 'All High Performance Gasoline Engines', year: 'All Years', engine: 'Naturally Aspirated & Turbocharged', transmission: 'All Transmissions' }
        ],
        shipping: {
          method: 'Fast Courier',
          cost: 5.00,
          freeShipping: true,
          deliveryTime: '1-2 Days in Dhaka',
          warranty: 'Guaranteed Authentic Import'
        }
      },
      {
        id: 'P-103',
        name: 'Garrett GTX3582R Gen II Dual Ball Bearing Turbocharger',
        brand: 'Garrett',
        sku: 'GAR-GTX-3582',
        category: 'Performance',
        subcategory: 'Forced Induction & Turbos',
        partNumber: '856801-5079S',
        condition: 'New',
        price: 1850.00,
        msrp: 2150.00,
        discount: 14,
        stock: 8,
        lowStockAlert: 3,
        reservedStock: 1,
        availableStock: 7,
        minOrderQty: 1,
        weight: '8.5 kg',
        dimensions: '35 x 30 x 28 cm',
        unitsSold: 28,
        revenue: '$51,800.00',
        rating: 4.8,
        reviewsCount: 14,
        status: 'Active',
        createdDate: '05 Jan 2024',
        shortDescription: 'Gen II aerodynamics point-milled billet compressor wheel capable of generating up to 850 horsepower.',
        fullDescription: 'High-flowing ceramic dual ball-bearing cartridge with water-cooled center housing. Delivers instantaneous boost response and massive top-end power.',
        images: [
          'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=500&h=400&fit=crop'
        ],
        compatibility: [
          { make: 'Toyota', model: 'Supra JZA80 / GR Supra A90', year: '1993 - 2024', engine: '2JZ-GTE / B58 3.0L', transmission: 'Manual / Auto' },
          { make: 'Nissan', model: 'Skyline GT-R (R32 / R33 / R34)', year: '1989 - 2002', engine: 'RB26DETT', transmission: 'Manual' },
          { make: 'Mitsubishi', model: 'Lancer Evolution VIII / IX / X', year: '2003 - 2015', engine: '4G63T / 4B11T', transmission: '5-Speed Manual' }
        ],
        shipping: {
          method: 'Heavy Freight Secure',
          cost: 25.00,
          freeShipping: false,
          deliveryTime: '2-4 Days Insured',
          warranty: '1 Year Garrett Global Warranty'
        }
      },
      {
        id: 'P-104',
        name: 'Bilstein B16 PSS10 Ride-Height & Damping Adjustable Coilovers',
        brand: 'Bilstein',
        sku: 'BIL-B16-PSS',
        category: 'Suspension',
        subcategory: 'Coilover Kits',
        partNumber: '48-135894',
        condition: 'New',
        price: 1650.00,
        msrp: 1950.00,
        discount: 15,
        stock: 14,
        lowStockAlert: 4,
        reservedStock: 2,
        availableStock: 12,
        minOrderQty: 1,
        weight: '16.2 kg',
        dimensions: '60 x 30 x 25 cm',
        unitsSold: 39,
        revenue: '$64,350.00',
        rating: 4.9,
        reviewsCount: 22,
        status: 'Active',
        createdDate: '02 Jan 2024',
        shortDescription: '10-stage parallel damping adjustability with German monotube gas pressure technology.',
        fullDescription: 'Nürburgring-tuned suspension kit allowing 30mm to 50mm ride height lowering. Dual-click system changes rebound and bump settings simultaneously in seconds.',
        images: [
          'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&h=400&fit=crop'
        ],
        compatibility: [
          { make: 'BMW', model: '3 Series (F30) / M3 (F80)', year: '2012 - 2018', engine: '2.0L / 3.0L Turbo', transmission: 'Manual & Automatic' },
          { make: 'Volkswagen', model: 'Golf GTI / Golf R (Mk7 / Mk7.5)', year: '2014 - 2021', engine: '2.0 TSI', transmission: 'DSG / Manual' }
        ],
        shipping: {
          method: 'Express Secure Courier',
          cost: 18.00,
          freeShipping: false,
          deliveryTime: '3-4 Business Days',
          warranty: '2 Year German Warranty'
        }
      },
      {
        id: 'P-105',
        name: 'Akrapovič Slip-On Line Titanium Dual Exhaust System',
        brand: 'Akrapovič',
        sku: 'AKR-TIP-TI',
        category: 'Exhaust',
        subcategory: 'Cat-Back Exhausts',
        partNumber: 'S-PO991R-AP',
        condition: 'New',
        price: 3200.00,
        msrp: 3600.00,
        discount: 11,
        stock: 3,
        lowStockAlert: 2,
        reservedStock: 1,
        availableStock: 2,
        minOrderQty: 1,
        weight: '6.8 kg',
        dimensions: '90 x 40 x 30 cm',
        unitsSold: 12,
        revenue: '$38,400.00',
        rating: 5.0,
        reviewsCount: 9,
        status: 'Active',
        createdDate: '15 Dec 2023',
        shortDescription: 'Ultra-lightweight titanium rear muffler system with carbon fiber exit diffuser tips.',
        fullDescription: 'Precision crafted in Slovenia from aerospace-grade proprietary titanium. Saves 8.4 kg over stock exhaust while unleashing an aggressive acoustic pitch.',
        images: [
          'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&h=400&fit=crop'
        ],
        compatibility: [
          { make: 'Porsche', model: '911 GT3 / GT3 RS (991.2)', year: '2017 - 2019', engine: '4.0L Naturally Aspirated Flat-6', transmission: 'PDK / Manual' }
        ],
        shipping: {
          method: 'White Glove Fragile Delivery',
          cost: 30.00,
          freeShipping: true,
          deliveryTime: '2-3 Business Days',
          warranty: 'Official Akrapovič 2-Year Warranty'
        }
      },
      {
        id: 'P-106',
        name: 'Mishimoto Performance Dual Core Aluminum Radiator',
        brand: 'Mishimoto',
        sku: 'MIS-RAD-DC',
        category: 'Cooling',
        subcategory: 'Radiators & Intercoolers',
        partNumber: 'MMRAD-UNI-02',
        condition: 'New',
        price: 264.00,
        msrp: 320.00,
        discount: 17,
        stock: 0,
        lowStockAlert: 5,
        reservedStock: 0,
        availableStock: 0,
        minOrderQty: 1,
        weight: '5.2 kg',
        dimensions: '65 x 45 x 10 cm',
        unitsSold: 54,
        revenue: '$14,256.00',
        rating: 4.7,
        reviewsCount: 19,
        status: 'Out of Stock',
        createdDate: '01 Dec 2023',
        shortDescription: '100% brazed aluminum core with TIG-welded end tanks for superior cooling under heavy track use.',
        fullDescription: 'Increases cooling capacity by 35% over stock OEM plastic radiators. Direct bolt-in fitment requiring no cutting or custom brackets.',
        images: [
          'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=500&h=400&fit=crop'
        ],
        compatibility: [
          { make: 'Honda', model: 'Civic Type R (FK8 / FL5)', year: '2017 - 2024', engine: '2.0L K20C1 Turbo', transmission: '6-Speed Manual' },
          { make: 'Toyota', model: 'GR Yaris / GR Corolla', year: '2020 - 2024', engine: '1.6L G16E-GTS 3-Cyl Turbo', transmission: '6-Speed Manual' }
        ],
        shipping: {
          method: 'Standard Express',
          cost: 9.00,
          freeShipping: false,
          deliveryTime: '2-3 Days',
          warranty: 'Mishimoto Lifetime Warranty'
        }
      }
    ],
    messages: [
      {
        id: 'MSG-1',
        customerName: 'Tanvir Hossain',
        customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        relatedProduct: 'Garrett GTX3582R Gen II Turbocharger',
        lastMessage: 'Does this turbo kit come with the T3 exhaust inlet housing or v-band clamp?',
        time: '15 mins ago',
        unread: true,
        history: [
          { sender: 'customer', text: 'Hi Ronald, I am building a 2JZ Supra in Mirpur.', time: '10:20 AM' },
          { sender: 'supplier', text: 'Hello Tanvir! Excellent project. We have the GTX3582R in stock right here in Tejgaon warehouse.', time: '10:25 AM' },
          { sender: 'customer', text: 'Does this turbo kit come with the T3 exhaust inlet housing or v-band clamp?', time: '10:28 AM' }
        ]
      },
      {
        id: 'MSG-2',
        customerName: 'Arman Khan',
        customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        relatedProduct: 'Akrapovič Titanium Dual Exhaust Tips',
        lastMessage: 'Got the tracking number PF-9021. Thank you so much for the prompt dispatch!',
        time: '2 hours ago',
        unread: false,
        history: [
          { sender: 'customer', text: 'Order #AO459W1 placed. Can you ensure double bubble wrap?', time: 'Yesterday' },
          { sender: 'supplier', text: 'Absolutely Arman, our warehouse team packed it in reinforced foam crating and dispatched it with Paperfly.', time: 'Yesterday' },
          { sender: 'customer', text: 'Got the tracking number PF-9021. Thank you so much for the prompt dispatch!', time: '2 hours ago' }
        ]
      },
      {
        id: 'MSG-3',
        customerName: 'Sabbir Ahmed',
        customerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
        relatedProduct: 'Bilstein B16 PSS10 Coilover Damper Kit',
        lastMessage: 'Installed the coilovers on my F30 330i today. Ride quality is unbelievable!',
        time: '1 day ago',
        unread: false,
        history: [
          { sender: 'customer', text: 'Installed the coilovers on my F30 330i today. Ride quality is unbelievable!', time: 'Yesterday' },
          { sender: 'supplier', text: 'Glad to hear that Sabbir! Enjoy the German precision damping on the highway.', time: 'Yesterday' }
        ]
      }
    ],
    reviews: [
      {
        id: 'REV-1',
        customerName: 'Farhan Ahmed',
        rating: 5,
        date: '28 Jan 2024',
        product: 'Brembo Carbon Ceramic Brake Pads',
        comment: '100% authentic Brembo parts with holographic QR check. High speed braking on Dhaka-Chittagong highway is rock solid. Zero noise or dust.',
        verifiedPurchase: true,
        reply: 'Thank you Farhan! We are direct certified importers of Brembo Italy. Enjoy safe stopping power!'
      },
      {
        id: 'REV-2',
        customerName: 'Mahi Rahman',
        rating: 5,
        date: '24 Jan 2024',
        product: 'Motul 300V Trophy 0W-40 Synthetic Oil (4L)',
        comment: 'Best engine oil for turbocharged cars. Engine idle is noticeably smoother and oil temp stays cooler during hot traffic.',
        verifiedPurchase: true,
        reply: null
      },
      {
        id: 'REV-3',
        customerName: 'Masud Chowdhury',
        rating: 4,
        date: '18 Jan 2024',
        product: 'Bilstein B16 PSS10 Coilover Damper Kit',
        comment: 'Great coilovers, took 2 days for delivery due to traffic, but packaging was immaculate and genuine Bilstein warranty card was included.',
        verifiedPurchase: true,
        reply: 'Thank you Masud. We have upgraded our courier partner for faster next-day delivery.'
      },
      {
        id: 'REV-4',
        customerName: 'Shakib Rahman',
        rating: 5,
        date: '12 Jan 2024',
        product: 'Akrapovič Slip-On Line Titanium Dual Exhaust System',
        comment: 'Exquisite build quality. The titanium welds look like art and the sound is phenomenal on the 911 GT3.',
        verifiedPurchase: true,
        reply: 'Appreciate your business Shakib! That 911 GT3 is a masterpiece.'
      }
    ],
    notifications: [
      { id: 'NOTIF-1', title: 'New Order Received', desc: 'Order #A&R2409R for Brembo Brake Pads received from Ronald Richards.', time: '10 mins ago', type: 'order', unread: true },
      { id: 'NOTIF-2', title: 'Low Stock Alert', desc: 'Garrett GTX3582R Gen II Turbo has only 8 units left in warehouse.', time: '2 hours ago', type: 'stock', unread: true },
      { id: 'NOTIF-3', title: '5-Star Review Received', desc: 'Farhan Ahmed left a 5-star review for Brembo Carbon Ceramic Brake Pads.', time: '1 day ago', type: 'review', unread: false },
      { id: 'NOTIF-4', title: 'Payment Disbursed', desc: 'Payout of $42,500.00 successfully transferred to Eastern Bank Ltd.', time: '3 days ago', type: 'payment', unread: false }
    ]
  },
  {
    id: 'supp-2',
    email: 'supplier1@gmail.com',
    alternateEmail: 'apex.spares@mechify.com',
    password: '123',
    vendorName: 'Rafiqul Alam',
    companyName: 'Apex Spares & Brembo Distro Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=400&fit=crop',
    role: 'supplier',
    phone: '+880 1911-558899',
    address: 'Road 27, Dhanmondi Auto Market, Dhaka 1209',
    tradeBin: 'BIN-110294812',
    rating: 4.8,
    totalReviewsCount: 189,
    businessHours: 'Sat - Thu: 10:00 AM - 09:00 PM',
    returnPolicy: '14-Day return policy for electrical and fuel system components.',
    warrantyPolicy: '1-Year comprehensive replacement warranty on fuel pumps and clutch kits.',
    socialLinks: {
      website: 'https://apexspares.mechify.store',
      facebook: 'facebook.com/apexspares.bd',
      instagram: '@apexspares'
    },
    storeDescription: 'Authorized distributors of Walbro, Exedy Racing Clutches, DeatschWerks injectors, and high-output fueling components.',
    kpis: {
      totalProducts: 24,
      activeProducts: 22,
      outOfStock: 1,
      pendingOrders: 3,
      totalOrders: 420,
      totalSales: '$420,500.00',
      revenue: '$610,000.00',
      todayRevenue: '$2,150.00',
      monthlyRevenue: '$48,900.00',
      pendingPayments: '$2,100.00',
      completedPayments: '$580,000.00',
      refunds: '$850.00',
      platformFeeRate: '8%',
      platformFeesPaid: '$48,800.00',
      netEarnings: '$561,200.00',
      avgRating: 4.8,
      dayOfCredit: '38 Days',
      dayOfCreditChange: '↑ 20% ORDER',
      totalCreditAmount: '3,20,000',
      totalCreditChange: '↑ 18% INCREASE ORDER',
      totalAmountPO: '$52,800',
      totalAmountPOChange: '↓ 5% DECREASE PO',
      totalInvoice: '1890',
      totalInvoiceChange: '↑ 32% INCREASE AMOUNT',
      salesChange: '↑ 19% increase',
      totalSpend: '$112,000',
      totalSpendChange: '↓ 12% Decrease',
      inTotalHighlight: '$610,000.00',
      inTotalDate: '12 May GMT + 6'
    },
    ratingBreakdown: { star5: 65, star4: 25, star3: 7, star2: 2, star1: 1 },
    orders: [
      {
        id: 'APX-9901',
        orderDate: '29/01/24 - 02:15 PM',
        deliveryDate: '02/02/25 - 06:00 PM',
        status: 'Accepted',
        total: '$220.00',
        subtotal: '$210.00',
        shippingCost: '$10.00',
        tax: '$0.00',
        paymentStatus: 'Paid',
        paymentMethod: 'bKash',
        customer: 'Tony Stark',
        customerPhone: '+880 1304-098448',
        shippingAddress: 'Gulshan 2, Plot 12, Dhaka',
        product: 'Walbro 450LPH E85 High-Pressure Fuel Pump',
        sku: 'WAL-450-E85',
        qty: 1,
        timeline: [
          { status: 'Order Placed', time: '29 Jan 2024', done: true },
          { status: 'Ready to Dispatch', time: 'Pending Pickup', done: false }
        ]
      }
    ],
    products: [
      {
        id: 'P-201',
        name: 'Walbro 450LPH E85 High-Pressure Fuel Pump',
        brand: 'Walbro TI Automotive',
        sku: 'WAL-450-E85',
        category: 'Fuel Systems',
        subcategory: 'In-Tank Fuel Pumps',
        partNumber: 'F90000267',
        condition: 'New',
        price: 220.00,
        msrp: 260.00,
        discount: 15,
        stock: 32,
        lowStockAlert: 8,
        reservedStock: 3,
        availableStock: 29,
        minOrderQty: 1,
        weight: '1.2 kg',
        dimensions: '20 x 10 x 10 cm',
        unitsSold: 88,
        revenue: '$19,360.00',
        rating: 4.9,
        reviewsCount: 31,
        status: 'Active',
        createdDate: '18 Jan 2024',
        shortDescription: 'Drop-in high pressure turbine fuel pump compatible with gasoline and E85 ethanol for builds up to 750 HP.',
        fullDescription: 'Outperforms standard 255LPH pumps. Equipped with dual-channel single-stage impeller technology for maximum fuel volume delivery under high boost pressures.',
        images: [
          'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&h=400&fit=crop'
        ],
        compatibility: [
          { make: 'Universal Fitment', model: 'In-Tank Fuel Baskets', year: 'All Years', engine: 'All Gasoline / Ethanol Engines', transmission: 'All' }
        ],
        shipping: {
          method: 'Express Courier',
          cost: 8.00,
          freeShipping: false,
          deliveryTime: '2 Days in Dhaka',
          warranty: '1 Year Direct Replacement Warranty'
        }
      },
      {
        id: 'P-202',
        name: 'Exedy Stage 2 Cerametallic Heavy Duty Clutch Kit',
        brand: 'Exedy Racing',
        sku: 'EXE-ST2-CER',
        category: 'Drivetrain',
        subcategory: 'Clutch Kits & Flywheels',
        partNumber: '08950B',
        condition: 'New',
        price: 680.00,
        msrp: 790.00,
        discount: 14,
        stock: 12,
        lowStockAlert: 3,
        reservedStock: 1,
        availableStock: 11,
        minOrderQty: 1,
        weight: '9.8 kg',
        dimensions: '35 x 35 x 12 cm',
        unitsSold: 24,
        revenue: '$16,320.00',
        rating: 4.8,
        reviewsCount: 16,
        status: 'Active',
        createdDate: '14 Jan 2024',
        shortDescription: 'Thick cerametallic friction disc engineered to handle severe track abuse, aggressive launches, and high torque.',
        fullDescription: 'Ductile iron pressure plate with high clamp load springs. Retains manageable pedal effort while eliminating clutch slippage during fast gear changes.',
        images: [
          'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&h=400&fit=crop'
        ],
        compatibility: [
          { make: 'Subaru', model: 'WRX STI (EJ257)', year: '2004 - 2021', engine: '2.5L Turbo Boxer', transmission: '6-Speed Manual' },
          { make: 'Honda', model: 'S2000 (AP1 / AP2)', year: '2000 - 2009', engine: '2.0L / 2.2L F20C/F22C', transmission: '6-Speed Manual' }
        ],
        shipping: {
          method: 'Heavy Express Delivery',
          cost: 15.00,
          freeShipping: false,
          deliveryTime: '2-3 Business Days',
          warranty: '1 Year Exedy Official Warranty'
        }
      }
    ],
    messages: [],
    reviews: [],
    notifications: []
  }
];

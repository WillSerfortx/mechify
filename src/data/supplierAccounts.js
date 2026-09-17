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
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
    role: 'supplier',
    phone: '+880 1711-224466',
    address: 'Tejgaon Light Industrial Area, Plot 42, Dhaka',
    tradeBin: 'BIN-990812401',
    rating: 4.9,
    kpis: {
      dayOfCredit: '45 Days',
      dayOfCreditChange: '↑ 45% ORDER',
      totalCreditAmount: '4,00,000',
      totalCreditChange: '↑ 12% INCREASE ORDER',
      totalAmountPO: '$45,251',
      totalAmountPOChange: '↓ 14% DECREASE PO',
      totalInvoice: '2574',
      totalInvoiceChange: '↑ 40% INCREASE AMOUNT',
      totalSales: '$549,735.00',
      totalSalesChange: '↑ 25% increase',
      totalSpend: '$145,000',
      totalSpendChange: '↓ 20% Decrease',
      inTotalHighlight: '$749,735.00',
      inTotalDate: '08 April GMT + 6'
    },
    orders: [
      { id: 'A&R2409R', orderDate: '30/01/24 - 12:51 PM', deliveryDate: '01/02/25 - 07:00 PM', status: 'Pending', total: '$143.00', customer: 'Ronald Richards', product: 'Brembo Carbon Ceramic Brake Pads', qty: 2 },
      { id: 'ERO459W1', orderDate: '28/01/24 - 11:00 AM', deliveryDate: '01/02/25 - 12:00 PM', status: 'Accepted', total: '$78.00', customer: 'Mahi Rahman', product: 'Motul 300V 5W-40 Synthetic Oil (4L)', qty: 1 },
      { id: 'AR2409R4', orderDate: '27/01/09 - 01:35 PM', deliveryDate: '31/01/09 - 04:00 PM', status: 'Cancel', total: '$360.00', customer: 'Tanvir Hossain', product: 'Garrett GTX3582R Gen II Turbocharger', qty: 1 },
      { id: 'AO459W1', orderDate: '26/01/09 - 05:00 PM', deliveryDate: '04/02/09 - 07:00 PM', status: 'Closed', total: '$115.00', customer: 'Arman Khan', product: 'Akrapovič Titanium Dual Exhaust Tips', qty: 2 },
      { id: 'R2409R37', orderDate: '25/01/09 - 03:00 PM', deliveryDate: '31/01/09 - 02:00 PM', status: 'Pending Approval', total: '$474.00', customer: 'Sabbir Ahmed', product: 'Bilstein B16 PSS10 Coilover Damper Kit', qty: 1 },
      { id: 'R2409R69', orderDate: '24/01/09 - 11:14 AM', deliveryDate: '28/01/09 - 06:00 PM', status: 'Accepted', total: '$446.00', customer: 'Navid Hasan', product: 'NGK Laser Iridium Spark Plugs (Set of 8)', qty: 4 },
      { id: 'ERO459E1', orderDate: '23/01/09 - 11:01 AM', deliveryDate: '27/01/09 - 12:00 PM', status: 'Closed', total: '$264.00', customer: 'Fahim Chowdhury', product: 'Mishimoto Performance Dual Core Radiator', qty: 1 },
      { id: 'ERO459A1', orderDate: '23/01/09 - 11:51 AM', deliveryDate: '28/01/09 - 01:00 PM', status: 'Closed', total: '$529.00', customer: 'Zubair Hossain', product: 'K&N Carbon Air Intake Induction System', qty: 1 }
    ],
    products: [
      { id: 'P-101', name: 'Brembo Carbon Ceramic Brake Pads', category: 'Braking', price: 143, stock: 45, sku: 'BRM-CC-902' },
      { id: 'P-102', name: 'Motul 300V Trophy 0W-40 Synthetic Oil', category: 'Lubricants', price: 78, stock: 120, sku: 'MOT-300V-4L' },
      { id: 'P-103', name: 'Garrett GTX3582R Gen II Turbocharger', category: 'Performance', price: 1850, stock: 8, sku: 'GAR-GTX-3582' },
      { id: 'P-104', name: 'Bilstein B16 PSS10 Coilover Damper Kit', category: 'Suspension', price: 1650, stock: 14, sku: 'BIL-B16-PSS' }
    ]
  },
  {
    id: 'supp-2',
    email: 'supplier1@gmail.com',
    alternateEmail: 'apex.spares@mechify.com',
    password: '123',
    vendorName: 'Rafiqul Alam',
    companyName: 'Apex Spares & Brembo Distro Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    role: 'supplier',
    phone: '+880 1911-558899',
    address: 'Dhanmondi Auto Market, Road 27, Dhaka',
    tradeBin: 'BIN-110294812',
    rating: 4.8,
    kpis: {
      dayOfCredit: '38 Days',
      dayOfCreditChange: '↑ 20% ORDER',
      totalCreditAmount: '3,20,000',
      totalCreditChange: '↑ 18% INCREASE ORDER',
      totalAmountPO: '$52,800',
      totalAmountPOChange: '↓ 5% DECREASE PO',
      totalInvoice: '1890',
      totalInvoiceChange: '↑ 32% INCREASE AMOUNT',
      totalSales: '$420,500.00',
      totalSalesChange: '↑ 19% increase',
      totalSpend: '$112,000',
      totalSpendChange: '↓ 12% Decrease',
      inTotalHighlight: '$610,000.00',
      inTotalDate: '12 May GMT + 6'
    },
    orders: [
      { id: 'APX-9901', orderDate: '29/01/24 - 02:15 PM', deliveryDate: '02/02/25 - 06:00 PM', status: 'Accepted', total: '$220.00', customer: 'Tony Stark', product: 'High Flow Fuel Pump 450LPH', qty: 2 },
      { id: 'APX-9902', orderDate: '28/01/24 - 04:45 PM', deliveryDate: '01/02/25 - 03:00 PM', status: 'Pending', total: '$185.00', customer: 'Kamal Hossain', product: 'Stage 2 Ceramic Clutch Disc', qty: 1 }
    ],
    products: [
      { id: 'P-201', name: 'Walbro 450LPH E85 Fuel Pump', category: 'Fuel Systems', price: 220, stock: 32, sku: 'WAL-450-E85' },
      { id: 'P-202', name: 'Exedy Stage 2 Cerametallic Clutch Kit', category: 'Drivetrain', price: 680, stock: 12, sku: 'EXE-ST2-CER' }
    ]
  }
];

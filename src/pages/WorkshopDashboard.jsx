import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WORKSHOP_DEMO_ACCOUNTS } from '../data/workshopAccounts';

// Custom Leaflet Map Markers
const workshopIcon = new L.DivIcon({
  html: '<div style="font-size: 32px; text-align: center; margin-top: -16px; margin-left: -16px; filter: drop-shadow(0 0 16px rgba(220,38,38,0.95));">🏭</div>',
  className: 'custom-icon',
  iconSize: [32, 32]
});

const emergencyRoadsideIcon = new L.DivIcon({
  html: '<div style="font-size: 30px; text-align: center; margin-top: -15px; margin-left: -15px; filter: drop-shadow(0 0 18px rgba(239,68,68,1)); animation: pulse 1s infinite;">🚨</div>',
  className: 'custom-icon',
  iconSize: [30, 30]
});

const technicianMarkerIcon = new L.DivIcon({
  html: '<div style="font-size: 28px; text-align: center; margin-top: -14px; margin-left: -14px; filter: drop-shadow(0 0 14px rgba(16,185,129,0.9));">👨‍🔧</div>',
  className: 'custom-icon',
  iconSize: [28, 28]
});

export default function WorkshopDashboard() {
  const navigate = useNavigate();

  // ─── 1. Authenticated Workshop Owner Profile ───
  const [selectedAccountId, setSelectedAccountId] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const u = JSON.parse(stored);
        const match = WORKSHOP_DEMO_ACCOUNTS.find(
          a => a.email.toLowerCase() === (u.email || '').toLowerCase() ||
               a.alternateEmail?.toLowerCase() === (u.email || '').toLowerCase()
        );
        if (match) return match.id;
      }
    } catch (e) {
      console.error(e);
    }
    return 'ws-acc-1';
  });

  const currentWorkshop = useMemo(() => {
    return WORKSHOP_DEMO_ACCOUNTS.find(a => a.id === selectedAccountId) || WORKSHOP_DEMO_ACCOUNTS[0];
  }, [selectedAccountId]);

  // ─── 2. Operational Controls & Role State ───
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRoleInWorkshop, setUserRoleInWorkshop] = useState('owner'); // 'owner' | 'manager' | 'service_advisor' | 'mechanic'
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // Workshop Real-Time Operational Status (Spec Section 5)
  const [operationalStatus, setOperationalStatus] = useState('open'); // 'open' | 'busy' | 'fully_booked' | 'emergency_only'
  
  // Capacity Configuration (Spec Section 24)
  const [totalBays, setTotalBays] = useState(() => currentWorkshop.bays || 8);
  const [occupiedBays, setOccupiedBays] = useState(() => currentWorkshop.occupiedBays || 5);
  const availableBays = Math.max(0, totalBays - occupiedBays);

  // Calendar view mode (Spec Section 7)
  const [calendarViewMode, setCalendarViewMode] = useState('week'); // 'day' | 'week' | 'month'

  // ─── 3. Comprehensive Datasets (All 40 Specification Modules) ───
  const [bookingsList, setBookingsList] = useState(() => currentWorkshop.bookings || []);
  const [mechanicsList, setMechanicsList] = useState(() => currentWorkshop.mechanics || []);

  // Job Cards / Repair Orders (Spec Section 10)
  const [jobCardsList, setJobCardsList] = useState([
    {
      id: 'JC-8801',
      bookingId: 'BK-1001',
      customerName: 'Mahi Rahman',
      customerPhone: '+880 1712-345678',
      customerEmail: 'mahi.rahman@gmail.com',
      vehicle: 'Toyota Allion G-Superior 2020',
      regNumber: 'Dhaka Metro-Ga 34-9012',
      mileage: '48,200 km',
      assignedMechanic: 'Barry Allen',
      assignedBay: 'Bay #1',
      priority: 'Urgent',
      status: 'Repairing', // Inspection | Diagnosis | Waiting for Approval | Repairing | Quality Check | Ready | Completed
      complaint: 'Car suddenly stalled in heavy traffic. Hazard lights dimming fast, battery won’t crank.',
      diagnosis: 'Alternator diode pack failed causing 0V charge; battery deeply discharged to 9.2V.',
      workPerformed: [
        { task: 'Alternator assembly replacement', laborPrice: 1500, status: 'Done' },
        { task: 'Electrical system load test & battery terminal cleaning', laborPrice: 800, status: 'In Progress' }
      ],
      partsUsed: [
        { partName: 'Denso 120A Heavy Duty Alternator', partNumber: 'DEN-ALT-120', qty: 1, price: 14500 },
        { partName: 'Yuasa 65Ah Sealed Maintenance Free Battery', partNumber: 'YUA-65AH-SMF', qty: 1, price: 9200 }
      ],
      timeline: [
        { stage: 'Booking Requested', time: 'Today 09:15 AM', done: true },
        { stage: 'Workshop Accepted', time: 'Today 09:20 AM', done: true },
        { stage: 'Vehicle Arrived in Bay #1', time: 'Today 10:00 AM', done: true },
        { stage: 'Inspection & Diagnosis', time: 'Today 10:30 AM', done: true },
        { stage: 'Customer Approved Work', time: 'Today 10:45 AM', done: true },
        { stage: 'Repair in Progress', time: 'Today 11:15 AM', done: true },
        { stage: 'Quality Check & Test Drive', time: 'Pending', done: false },
        { stage: 'Ready for Pickup', time: 'Pending', done: false }
      ]
    },
    {
      id: 'JC-8802',
      bookingId: 'BK-1003',
      customerName: 'Arman Khan',
      customerPhone: '+880 1911-223344',
      customerEmail: 'arman.khan@gmail.com',
      vehicle: 'Ferrari 488 Pista',
      regNumber: 'KB 1024 KYG',
      mileage: '14,800 km',
      assignedMechanic: 'Bruce Wayne',
      assignedBay: 'Bay #4 (Supercar Lift)',
      priority: 'High',
      status: 'Waiting for Approval',
      complaint: 'Periodic telemetry service; driver reported steering vibration under heavy braking.',
      diagnosis: 'Front steering tie-rod end has micro-play; front carbon-ceramic brake pads worn down to 2.2mm thickness.',
      workPerformed: [
        { task: 'Telemetry diagnostic scan & ECU adaptation', laborPrice: 4500, status: 'Done' }
      ],
      partsUsed: [
        { partName: 'Motul 300V Trophy 0W-40 Synthetic Oil (10L)', partNumber: 'MOT-300V-10L', qty: 1, price: 18500 }
      ],
      timeline: [
        { stage: 'Booking Requested', time: 'Yesterday', done: true },
        { stage: 'Vehicle Arrived in Bay #4', time: 'Today 08:30 AM', done: true },
        { stage: 'Digital Inspection Completed', time: 'Today 09:45 AM', done: true },
        { stage: 'Additional Estimate Sent for Customer Approval', time: 'Today 10:00 AM', done: true },
        { stage: 'Customer Approved Work', time: 'Waiting for Customer', done: false }
      ]
    }
  ]);

  // Customer Approvals for Additional Work Discovered (Spec Section 11)
  const [customerApprovalsList, setCustomerApprovalsList] = useState([
    {
      id: 'APP-501',
      jobCardId: 'JC-8802',
      customerName: 'Arman Khan',
      customerPhone: '+880 1911-223344',
      vehicle: 'Ferrari 488 Pista (KB 1024 KYG)',
      originalService: 'Telemetry Scheduled Maintenance (৳23,000)',
      discoveredFault: 'Front Brembo Carbon Ceramic pads down to critical 2.2mm thickness. Rotors at risk of scoring.',
      recommendedWork: 'Replace Front Brembo Carbon-Ceramic Pads + Complete Racing Brake Fluid Bleed',
      additionalCost: 38500,
      status: 'Pending Customer Action', // 'Pending Customer Action' | 'Approved by Customer' | 'Rejected by Customer'
      sentTime: '25 mins ago',
      urgentSafetyItem: true
    },
    {
      id: 'APP-502',
      jobCardId: 'JC-8801',
      customerName: 'Tanvir Hossain',
      customerPhone: '+880 1819-223344',
      vehicle: 'Honda CR-V Turbo (DHA-GHA 22-9011)',
      originalService: 'Engine Oil & Filter Change (৳4,500)',
      discoveredFault: 'Rear-left suspension damper leaking hydraulic fluid heavily.',
      recommendedWork: 'Replace Rear Strut Absorbers (Pair)',
      additionalCost: 14000,
      status: 'Approved by Customer',
      sentTime: '2 hours ago',
      urgentSafetyItem: false
    }
  ]);

  // Digital 10-Point Vehicle Inspection (Spec Section 12)
  const [digitalInspection, setDigitalInspection] = useState({
    vehicle: 'Ferrari 488 Pista (KB 1024 KYG)',
    inspectedBy: 'Bruce Wayne (Master Supercar Tech)',
    overallStatus: 'Needs Attention',
    items: [
      { id: 'engine', name: 'Engine & Turbo Telemetry', status: 'Good', notes: 'Oil pressure 4.2 bar at 90°C; zero ECU misfire codes.' },
      { id: 'brakes', name: 'Brake Pads & Rotors', status: 'Critical', notes: 'Front pads 2.2mm thickness. Immediate replacement required to safeguard carbon-ceramic discs.' },
      { id: 'steering', name: 'Steering Rack & Alignment', status: 'Needs Attention', notes: 'Slight tie-rod play detected on front knuckle.' },
      { id: 'suspension', name: 'Active Magnetic Dampers', status: 'Good', notes: 'Hydraulic seals clean, no leaks or bushing tears.' },
      { id: 'battery', name: '12V Battery & Charging', status: 'Good', notes: '13.8V alternator charge rate, battery health 92%.' },
      { id: 'fluids', name: 'Brake & Coolant Fluids', status: 'Needs Attention', notes: 'Brake fluid moisture content 2.8% (degraded boiling point). Flush recommended.' },
      { id: 'tires', name: 'Michelin Pilot Sport Cup 2', status: 'Good', notes: 'Tread depth 5.5mm across all 4 wheels.' },
      { id: 'electrical', name: 'OBD-II CAN Bus Telemetry', status: 'Good', notes: 'All body control modules reporting operational status.' },
      { id: 'ac', name: 'Climate Control & Cabin HVAC', status: 'Good', notes: 'AC blowing 4.5°C at center vents.' },
      { id: 'lights', name: 'LED Matrix Headlamps', status: 'Good', notes: 'Full beam and dynamic leveling functioning correctly.' }
    ]
  });

  // Local Garage Inventory & Shelf Tracking (Spec Section 16)
  const [workshopInventory, setWorkshopInventory] = useState([
    { id: 'INV-1', partName: 'Motul 300V Trophy 0W-40 (4L)', sku: 'MOT-300V-4L', category: 'Lubricants', stock: 24, minStock: 6, unitCost: 6500, sellingPrice: 8500, supplier: 'AeroFlow Tuning BD', location: 'Rack A-2' },
    { id: 'INV-2', partName: 'Brembo Ceramic Front Pads Set', sku: 'BRM-CP-402', category: 'Braking', stock: 8, minStock: 4, unitCost: 9500, sellingPrice: 13500, supplier: 'Brembo Official Distro', location: 'Rack B-1' },
    { id: 'INV-3', partName: 'Denso Iridium Spark Plugs (Set of 4)', sku: 'DEN-IK20', category: 'Ignition', stock: 40, minStock: 12, unitCost: 3200, sellingPrice: 4800, supplier: 'Apex Spares Dhaka', location: 'Shelf C-3' },
    { id: 'INV-4', partName: 'Bosch High Output AGM Battery 70Ah', sku: 'BOS-AGM-70', category: 'Electrical', stock: 3, minStock: 5, unitCost: 12000, sellingPrice: 16500, supplier: 'Tejgaon Battery Hub', location: 'Floor Bay E' },
    { id: 'INV-5', partName: 'Toyota Genuine ATF WS Fluid (4L)', sku: 'TOY-ATF-WS', category: 'Transmission', stock: 18, minStock: 6, unitCost: 4200, sellingPrice: 5800, supplier: 'Navana Parts BD', location: 'Rack A-4' }
  ]);

  // Workshop Configured Services Catalog (Spec Section 14)
  const [servicesCatalog, setServicesCatalog] = useState([
    { id: 'SRV-1', name: 'Periodic General Servicing (10,000 km)', category: 'Maintenance', startingPrice: 4500, duration: '2.5 hrs', mechanicType: 'General Tech', equipment: '2-Post Lift, Oil Drainer' },
    { id: 'SRV-2', name: 'Complete Computerized OBD-II Diagnostics', category: 'Diagnostics', startingPrice: 2500, duration: '1 hr', mechanicType: 'Diagnostic Specialist', equipment: 'Autel MaxiSys Diagnostic Tablet' },
    { id: 'SRV-3', name: 'Brake Disc Resurfacing & Pad Overhaul', category: 'Braking', startingPrice: 6000, duration: '2 hrs', mechanicType: 'Brake Specialist', equipment: 'On-Car Brake Lathe' },
    { id: 'SRV-4', name: 'High-Performance Supercar Telemetry Inspection', category: 'Supercars', startingPrice: 15000, duration: '3.5 hrs', mechanicType: 'Master Supercar Tech', equipment: 'Laser Alignment, Oscilloscope' },
    { id: 'SRV-5', name: 'Air Conditioning Evaporator Flush & Refrigerant Gas', category: 'AC & Cooling', startingPrice: 5500, duration: '2 hrs', mechanicType: 'HVAC Specialist', equipment: 'R134a Recovery & Recharge Station' },
    { id: 'SRV-6', name: 'Full Suspension Bushing & Coilover Tuning', category: 'Suspension', startingPrice: 8000, duration: '4 hrs', mechanicType: 'Suspension Specialist', equipment: 'Spring Compressor, Corner Weight Scales' }
  ]);

  // Customer Directory & Digital Vehicle Passports (Spec Section 8 & 9)
  const [customerDirectory, setCustomerDirectory] = useState([
    {
      id: 'CUST-101',
      name: 'Arman Khan',
      phone: '+880 1911-223344',
      email: 'arman.khan@gmail.com',
      totalSpent: '৳148,500',
      visitsCount: 7,
      rating: 5.0,
      vehicles: [
        {
          make: 'Ferrari',
          model: '488 Pista',
          year: '2019',
          vin: 'ZFF82HLA000248901',
          regNumber: 'KB 1024 KYG',
          mileage: '14,800 km',
          transmission: '7-Speed Dual Clutch',
          engine: '3.9L Twin-Turbo V8',
          lastService: 'Today (Active Job)',
          serviceHistory: [
            { date: '12 Nov 2023', mileage: '12,200 km', work: 'Transmission fluid flush and clutch calibration', cost: '৳32,000' },
            { date: '15 Jun 2023', mileage: '9,800 km', work: 'Annual supercar inspection & Motul 300V engine oil change', cost: '৳24,500' }
          ]
        }
      ]
    },
    {
      id: 'CUST-102',
      name: 'Mahi Rahman',
      phone: '+880 1712-345678',
      email: 'mahi.rahman@gmail.com',
      totalSpent: '৳84,200',
      visitsCount: 4,
      rating: 4.9,
      vehicles: [
        {
          make: 'Toyota',
          model: 'Allion G-Superior',
          year: '2020',
          vin: 'NZT260-019284',
          regNumber: 'Dhaka Metro-Ga 34-9012',
          mileage: '48,200 km',
          transmission: 'CVT Automatic',
          engine: '1.5L 1NZ-FE',
          lastService: 'Today (Roadside Emergency)',
          serviceHistory: [
            { date: '04 Oct 2023', mileage: '41,000 km', work: 'Brake pads replacement & front suspension bushing overhaul', cost: '৳18,500' }
          ]
        }
      ]
    },
    {
      id: 'CUST-103',
      name: 'Tanvir Hossain',
      phone: '+880 1819-223344',
      email: 'tanvir.crv@gmail.com',
      totalSpent: '৳52,000',
      visitsCount: 3,
      rating: 4.8,
      vehicles: [
        {
          make: 'Honda',
          model: 'CR-V Turbo AWD',
          year: '2022',
          vin: 'RW1-1002941',
          regNumber: 'Dhaka Metro-Gha 22-9011',
          mileage: '32,400 km',
          transmission: 'CVT',
          engine: '1.5L VTEC Turbo',
          lastService: '12 Jan 2024',
          serviceHistory: [
            { date: '12 Jan 2024', mileage: '32,400 km', work: 'Engine oil, coolant change & air filter replacement', cost: '৳7,800' }
          ]
        }
      ]
    }
  ]);

  // Quotations & Estimates Builder (Spec Section 15)
  const [estimatesList, setEstimatesList] = useState([
    {
      id: 'EST-4401',
      customerName: 'Arman Khan',
      vehicle: 'Ferrari 488 Pista',
      status: 'Sent', // Draft | Sent | Viewed | Approved | Rejected | Expired
      laborItems: [{ desc: 'Brembo Caliper Overhaul Labor', amount: 6500 }],
      partsItems: [{ desc: 'Carbon Ceramic Front Brake Pads', amount: 32000 }],
      subtotal: 38500,
      vatTax: 1925,
      discount: 0,
      total: 40425,
      createdDate: 'Today'
    },
    {
      id: 'EST-4402',
      customerName: 'Navid Hasan',
      vehicle: 'Mercedes-AMG GT R',
      status: 'Approved',
      laborItems: [{ desc: 'Coolant Flush & Thermostat Replacement', amount: 4500 }],
      partsItems: [{ desc: 'OEM AMG Thermostat Housing', amount: 16800 }],
      subtotal: 21300,
      vatTax: 1065,
      discount: 1000,
      total: 21365,
      createdDate: 'Yesterday'
    }
  ]);

  // In-Platform Linked Messaging (Spec Section 26)
  const [activeMessageThread, setActiveMessageThread] = useState('TH-1');
  const [messageReplyInput, setMessageReplyInput] = useState('');
  const [messagingThreads, setMessagingThreads] = useState([
    {
      id: 'TH-1',
      recipientName: 'Arman Khan (Customer)',
      vehicleTag: 'Ferrari 488 Pista (KB 1024 KYG)',
      linkedJobCard: 'JC-8802',
      lastMessage: 'I received the brake pad estimate. Can you confirm they are original Brembo Italy pads?',
      time: '10 mins ago',
      messages: [
        { sender: 'workshop', text: 'Good morning Arman, our technician Bruce Wayne has completed the telemetry scan on your 488 Pista.', time: '09:50 AM' },
        { sender: 'customer', text: 'Great! How do the brakes look?', time: '09:55 AM' },
        { sender: 'workshop', text: 'The front pads have 2.2mm remaining. We sent an approval estimate for ৳38,500 so we can swap them today.', time: '10:02 AM' },
        { sender: 'customer', text: 'I received the brake pad estimate. Can you confirm they are original Brembo Italy pads?', time: '10:05 AM' }
      ]
    },
    {
      id: 'TH-2',
      recipientName: 'AeroFlow Spares (Supplier)',
      vehicleTag: 'Parts Order #PO-9021',
      linkedJobCard: 'JC-8802',
      lastMessage: 'Courier dispatch rider is en route to Gulshan-2 hub with the Motul 300V oil.',
      time: '1 hour ago',
      messages: [
        { sender: 'workshop', text: 'Need 10L of Motul 300V 0W-40 for bay #4 urgent supercar job.', time: '08:45 AM' },
        { sender: 'supplier', text: 'Courier dispatch rider is en route to Gulshan-2 hub with the Motul 300V oil.', time: '09:10 AM' }
      ]
    }
  ]);

  // Notifications (Spec Section 25)
  const [notificationsList, setNotificationsList] = useState([
    { id: 'N-1', title: 'Customer Approved Work', desc: 'Tanvir Hossain approved rear strut replacement (৳14,000).', time: '10 mins ago', unread: true },
    { id: 'N-2', title: 'New Emergency Roadside Alert', desc: 'Toyota Allion stalled on Kemal Ataturk Ave with dead battery.', time: '25 mins ago', unread: true },
    { id: 'N-3', title: 'Low Inventory Alert', desc: 'Bosch AGM 70Ah Battery is down to 3 units on shelf.', time: '1 hour ago', unread: false },
    { id: 'N-4', title: 'Payment Received', desc: 'bKash Merchant received ৳24,500 from invoice #INV-1092.', time: '3 hours ago', unread: false }
  ]);

  // Modals & Interactive States
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);
  const [selectedJobCardModal, setSelectedJobCardModal] = useState(null);
  const [selectedVehiclePassportModal, setSelectedVehiclePassportModal] = useState(null);
  const [selectedInvoiceModal, setSelectedInvoiceModal] = useState(null);
  const [showNewJobCardModal, setShowNewJobCardModal] = useState(false);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [showMarketplaceOrderModal, setShowMarketplaceOrderModal] = useState(false);
  const [showNewEstimateModal, setShowNewEstimateModal] = useState(false);

  // Sync state on demo workshop change
  useEffect(() => {
    setBookingsList(currentWorkshop.bookings || []);
    setMechanicsList(currentWorkshop.mechanics || []);
    setTotalBays(currentWorkshop.bays || 8);
    setOccupiedBays(currentWorkshop.occupiedBays || 5);
  }, [currentWorkshop]);

  // Account Switcher
  const handleSwitchAccount = (accId) => {
    setSelectedAccountId(accId);
    const target = WORKSHOP_DEMO_ACCOUNTS.find(a => a.id === accId);
    if (target) {
      localStorage.setItem('currentUser', JSON.stringify({
        email: target.email,
        name: target.ownerName,
        role: 'workshop_owner',
        workshopId: target.workshopId
      }));
      localStorage.setItem('userRole', 'workshop_owner');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    navigate('/auth');
  };

  // KPIs
  const metrics = useMemo(() => {
    const todayBookings = bookingsList.length;
    const activeJobs = jobCardsList.filter(j => j.status !== 'Completed').length;
    const completedJobs = jobCardsList.filter(j => j.status === 'Completed').length + 24;
    const emergencyRequests = bookingsList.filter(b => b.type === 'emergency_roadside' || b.type === 'emergency_home').length;
    const todayRevenue = bookingsList.reduce((acc, b) => acc + (b.priceEstimate || 0), 0);
    const monthlyRevenue = todayRevenue * 18 + 450000;
    return { todayBookings, activeJobs, completedJobs, emergencyRequests, todayRevenue, monthlyRevenue };
  }, [bookingsList, jobCardsList]);

  // Live Sync Customer Approval
  const handleCustomerApprovalAction = (approvalId, action) => {
    setCustomerApprovalsList(prev => prev.map(item => {
      if (item.id === approvalId) {
        return {
          ...item,
          status: action === 'approve' ? 'Approved by Customer' : 'Rejected by Customer'
        };
      }
      return item;
    }));

    const approval = customerApprovalsList.find(a => a.id === approvalId);
    if (approval) {
      setJobCardsList(prev => prev.map(jc => {
        if (jc.id === approval.jobCardId) {
          const updatedTimeline = [...jc.timeline];
          updatedTimeline.push({
            stage: action === 'approve' ? 'Customer Approved Extra Work (Live Sync)' : 'Customer Declined Extra Work',
            time: 'Just now',
            done: true
          });
          return {
            ...jc,
            status: action === 'approve' ? 'Repairing' : jc.status,
            timeline: updatedTimeline
          };
        }
        return jc;
      }));
    }
  };

  // Send Message reply
  const handleSendReply = () => {
    if (!messageReplyInput.trim()) return;
    setMessagingThreads(prev => prev.map(th => {
      if (th.id === activeMessageThread) {
        return {
          ...th,
          lastMessage: messageReplyInput,
          time: 'Just now',
          messages: [...th.messages, { sender: 'workshop', text: messageReplyInput, time: 'Just now' }]
        };
      }
      return th;
    }));
    setMessageReplyInput('');
  };

  const activeThreadObj = useMemo(() => {
    return messagingThreads.find(t => t.id === activeMessageThread) || messagingThreads[0];
  }, [messagingThreads, activeMessageThread]);

  return (
    <div className="bg-[#07080d] min-h-screen text-white font-['Outfit',sans-serif] selection:bg-red-600 selection:text-white flex flex-col">
      
      {/* ─── A. TOP CONTROL BAR (BRAND, SMART SEARCH, LIVE STATUS & NOTIFICATIONS) ─── */}
      <header className="sticky top-0 z-40 bg-[#0d0f17]/95 backdrop-blur-2xl border-b border-white/10 px-5 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-2xl">
        
        {/* Left Brand + Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors"
            title="Toggle Sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-white/10 text-gray-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-xl text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-transform group-hover:scale-105">
              M
            </div>
            <div>
              <div className="font-black text-base sm:text-lg tracking-wider text-white flex items-center gap-2">
                MECHIFY
                <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded bg-red-600/20 text-red-500 border border-red-500/30">
                  WORKSHOP OS
                </span>
              </div>
              <div className="text-[10px] text-gray-400 font-bold truncate max-w-[180px] sm:max-w-none">
                {currentWorkshop.workshopName}
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Global Smart Search (Spec Section 34) */}
        <div className="hidden lg:flex items-center flex-1 max-w-lg mx-6">
          <div className="relative w-full">
            <input
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search by vehicle reg (e.g. KB 1024 KYG), customer, booking, or part..."
              className="w-full text-xs pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Right: Operational Status Switcher + Role + Notifications */}
        <div className="flex items-center gap-3">
          
          {/* Real-Time Workshop Operational Status (Spec Section 5) */}
          <div className="flex items-center bg-[#141724] border border-white/10 rounded-full px-3 py-1">
            <span className={`w-2.5 h-2.5 rounded-full mr-2 ${
              operationalStatus === 'open' ? 'bg-emerald-500 animate-pulse' :
              operationalStatus === 'busy' ? 'bg-amber-500' :
              operationalStatus === 'fully_booked' ? 'bg-red-500' : 'bg-red-600 animate-ping'
            }`} />
            <select
              value={operationalStatus}
              onChange={(e) => setOperationalStatus(e.target.value)}
              className="bg-transparent text-xs font-black cursor-pointer focus:outline-none text-white pr-1"
            >
              <option value="open" className="bg-[#12141e]">🟢 Open — Accepting Bookings</option>
              <option value="busy" className="bg-[#12141e]">🟠 Busy — Limited Availability</option>
              <option value="fully_booked" className="bg-[#12141e]">🔴 Fully Booked</option>
              <option value="emergency_only" className="bg-[#12141e]">🚨 Emergency SOS Only</option>
            </select>
          </div>

          {/* Quick 30-Demo Account Switcher */}
          <div className="bg-[#141724] border border-white/10 rounded-full px-3 py-1 hidden sm:flex items-center gap-2">
            <span className="text-xs text-gray-400 font-bold">Hub:</span>
            <select
              value={selectedAccountId}
              onChange={(e) => handleSwitchAccount(e.target.value)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer pr-1 max-w-[140px]"
            >
              {WORKSHOP_DEMO_ACCOUNTS.map((acc, idx) => (
                <option key={acc.id} value={acc.id} className="bg-[#12141e] text-white">
                  #{idx + 1} {acc.workshopName.split('-')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Staff Role Switcher (Spec Section 30) */}
          <div className="bg-[#141724] border border-white/10 rounded-full px-3 py-1 hidden xl:flex items-center gap-2">
            <span className="text-xs text-gray-400 font-bold">Role:</span>
            <select
              value={userRoleInWorkshop}
              onChange={(e) => setUserRoleInWorkshop(e.target.value)}
              className="bg-transparent text-red-400 text-xs font-black uppercase cursor-pointer focus:outline-none"
            >
              <option value="owner" className="bg-[#12141e]">Owner (Full OS)</option>
              <option value="manager" className="bg-[#12141e]">Manager</option>
              <option value="service_advisor" className="bg-[#12141e]">Service Advisor</option>
              <option value="mechanic" className="bg-[#12141e]">Mechanic (Job Cards)</option>
            </select>
          </div>

          {/* Notifications Bell Dropdown (Spec Section 25) */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="p-2 rounded-xl border border-white/10 text-gray-300 hover:text-white relative transition-colors"
              title="Notifications"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 animate-pulse" />
            </button>

            {showNotificationsDropdown && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-white/15 bg-[#121522] shadow-2xl p-4 z-50 animate-scaleUp">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="font-bold text-xs">Workshop Real-Time Alerts</h4>
                  <span className="text-[10px] text-red-400 font-bold cursor-pointer">Mark read</span>
                </div>
                <div className="divide-y divide-white/5 max-h-64 overflow-y-auto mt-2">
                  {notificationsList.map(n => (
                    <div key={n.id} className="py-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-xs">{n.title}</strong>
                        <span className="text-[9px] text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Owner Profile Avatar */}
          <div className="flex items-center gap-2.5">
            <img
              src={currentWorkshop.avatar}
              alt={currentWorkshop.ownerName}
              className="w-9 h-9 rounded-full object-cover border-2 border-red-500 shadow-md"
            />
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
              title="Sign Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

        </div>

      </header>

      {/* ─── B. MAIN WORKSPACE (COLLAPSIBLE SIDEBAR + DYNAMIC MODULES) ─── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* ── Collapsible Left Sidebar (Spec Section 38) ── */}
        <aside className={`transition-all duration-300 border-r border-white/10 bg-[#0a0c13] shrink-0 flex flex-col justify-between py-5 z-30 ${
          sidebarCollapsed ? 'w-20 px-2' : 'w-64 px-4'
        } ${
          mobileMenuOpen ? 'fixed inset-y-0 left-0 shadow-2xl flex w-64' : 'hidden md:flex'
        }`}>
          <div className="space-y-1 overflow-y-auto pr-1">
            
            {/* Quick Action CTA Button */}
            {!sidebarCollapsed && (
              <div className="mb-4">
                <button
                  onClick={() => setShowNewJobCardModal(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
                >
                  <span className="text-base leading-none">+</span>
                  <span>Create Job Card</span>
                </button>
              </div>
            )}

            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
              { id: 'bookings', label: 'Bookings & Calendar', icon: '📅', badge: bookingsList.length },
              { id: 'job_cards', label: 'Job Cards & Repairs', icon: '📋', badge: jobCardsList.length, badgeColor: 'bg-red-600' },
              { id: 'customer_approvals', label: 'Customer Approvals', icon: '🤝', badge: customerApprovalsList.filter(a => a.status.includes('Pending')).length, badgeColor: 'bg-amber-500' },
              { id: 'inspections', label: 'Digital Inspections', icon: '🔍' },
              { id: 'customers_vehicles', label: 'Customers & Vehicles', icon: '🚗' },
              { id: 'mechanics_capacity', label: 'Mechanics & Bays', icon: '👨‍🔧', badge: `${availableBays} Bays Free`, badgeColor: 'bg-emerald-600' },
              { id: 'services_catalog', label: 'Services & Pricing', icon: '🛠️' },
              { id: 'estimates_invoices', label: 'Estimates & Invoices', icon: '🧾' },
              { id: 'inventory_marketplace', label: 'Parts & Marketplace', icon: '📦' },
              { id: 'emergency_radar', label: 'Emergency Roadside SOS', icon: '🚨', badge: metrics.emergencyRequests, badgeColor: 'bg-red-600 animate-pulse' },
              { id: 'billing_payouts', label: 'Billing & Payouts', icon: '💰' },
              { id: 'messaging', label: 'In-Platform Messages', icon: '💬', badge: 1, badgeColor: 'bg-blue-600' },
              { id: 'analytics_performance', label: 'Analytics & Scorecard', icon: '📈' },
              { id: 'reviews_reputation', label: 'Reviews & Reputation', icon: '⭐' },
              { id: 'public_profile', label: 'Public Hub Profile', icon: '🏪' },
              { id: 'onboarding', label: 'Onboarding & Verification', icon: '🚀' },
              { id: 'settings', label: 'Workshop Settings', icon: '⚙️' }
            ].map(item => {
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveNav(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    active
                      ? 'bg-red-600 text-white shadow-[0_0_18px_rgba(220,38,38,0.45)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  } ${sidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge !== undefined && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white ${item.badgeColor || 'bg-white/20'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Bay Capacity Gauge Widget (Spec Section 24) */}
          {!sidebarCollapsed && (
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mt-4">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold mb-1.5">
                <span>Bay Capacity</span>
                <span className="text-emerald-400 font-black">{availableBays} Available</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                  style={{ width: `${(occupiedBays / totalBays) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                <span>{occupiedBays} Occupied</span>
                <span>{totalBays} Total Bays</span>
              </div>
            </div>
          )}
        </aside>

        {/* ── Main Dynamic Workspace View ── */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 max-w-[1600px] mx-auto w-full">
          
          {/* ══════════════════ TAB 1: DASHBOARD OVERVIEW ══════════════════ */}
          {activeNav === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Top Greeting & Banner (Spec Section 4) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#141724] via-[#0f111a] to-[#1a111a] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    Verified Mechify Hub Base
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                    Good evening, {currentWorkshop.workshopName}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                    Owner <strong className="text-white">{currentWorkshop.ownerName}</strong> • {currentWorkshop.address} • Phone: <strong className="text-white">{currentWorkshop.phone}</strong>
                  </p>
                </div>

                {/* Prominent Quick Actions (Spec Section 35) */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setShowNewBookingModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold border border-white/15 transition-colors"
                  >
                    + New Booking
                  </button>
                  <button
                    onClick={() => setShowNewJobCardModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all"
                  >
                    + Create Job Card
                  </button>
                  <button
                    onClick={() => setActiveNav('emergency_radar')}
                    className="px-4 py-2.5 rounded-xl bg-red-950/80 border border-red-500 text-red-300 text-xs font-black flex items-center gap-2 animate-pulse"
                  >
                    🚨 {metrics.emergencyRequests} Emergency Alerts
                  </button>
                </div>
              </div>

              {/* 8 Primary Key Metrics Cards (Spec Section 4) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {[
                  { label: "Today's Bookings", val: metrics.todayBookings, sub: 'Scheduled bay arrivals', icon: '📅', color: 'text-blue-400' },
                  { label: 'Active Repair Jobs', val: metrics.activeJobs, sub: 'Currently on bay lifts', icon: '🔧', color: 'text-amber-400' },
                  { label: 'Completed Jobs', val: metrics.completedJobs, sub: 'This billing cycle', icon: '✓', color: 'text-emerald-400' },
                  { label: 'Emergency Roadside', val: metrics.emergencyRequests, sub: 'Active roadside SOS', icon: '🚨', color: 'text-red-400' },
                  { label: "Today's Revenue", val: `৳${metrics.todayRevenue.toLocaleString()}`, sub: 'Completed + pending', icon: '💵', color: 'text-cyan-400' },
                  { label: 'Monthly Revenue', val: `৳${metrics.monthlyRevenue.toLocaleString()}`, sub: 'Gross pipeline earnings', icon: '💰', color: 'text-emerald-300' },
                  { label: 'Customer Rating', val: `★ ${currentWorkshop.rating}`, sub: `${currentWorkshop.reviews} verified reviews`, icon: '⭐', color: 'text-amber-400' },
                  { label: 'Workshop Capacity', val: `${availableBays} Free`, sub: `${occupiedBays}/${totalBays} Bays occupied`, icon: '🏭', color: 'text-purple-400' }
                ].map((m, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#10131d] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                      <span>{m.label}</span>
                      <span className="text-base">{m.icon}</span>
                    </div>
                    <div className={`text-2xl sm:text-3xl font-black mt-2 tracking-tight ${m.color}`}>
                      {m.val}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1 font-medium">{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* Active Jobs & Live Schedule Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left 8 Cols: Active Job Cards & Customer Timeline */}
                <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#10131d] border border-white/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white">Active Workshop Job Cards</h3>
                      <p className="text-xs text-gray-400">Live progress tracking from vehicle reception to quality check.</p>
                    </div>
                    <button
                      onClick={() => setActiveNav('job_cards')}
                      className="text-xs font-bold text-red-500 hover:text-red-400"
                    >
                      View All ({jobCardsList.length}) &gt;
                    </button>
                  </div>

                  <div className="space-y-4">
                    {jobCardsList.map(jc => (
                      <div
                        key={jc.id}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <span className="font-mono text-xs font-black text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded border border-red-500/20 mr-2">
                              {jc.id}
                            </span>
                            <span className="font-bold text-base text-white">{jc.vehicle}</span>
                            <span className="text-xs text-gray-400 ml-2 font-mono">({jc.regNumber})</span>
                          </div>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                            jc.status === 'Repairing' ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
                            jc.status === 'Waiting for Approval' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {jc.status}
                          </span>
                        </div>

                        <p className="text-xs text-gray-300 mb-3 bg-black/40 p-3 rounded-xl border border-white/5">
                          <strong className="text-white block mb-0.5">Customer Issue:</strong> {jc.complaint}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-400 mb-4 font-semibold">
                          <div>Customer: <strong className="text-white block">{jc.customerName}</strong></div>
                          <div>Assigned Tech: <strong className="text-emerald-400 block">{jc.assignedMechanic}</strong></div>
                          <div>Station: <strong className="text-white block">{jc.assignedBay}</strong></div>
                          <div>Priority: <strong className="text-red-400 block">{jc.priority}</strong></div>
                        </div>

                        {/* Customer Live Timeline Progress */}
                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[11px] text-gray-400">
                            Current Stage: <strong className="text-white">{jc.timeline.filter(t => t.done).slice(-1)[0]?.stage}</strong>
                          </span>
                          <button
                            onClick={() => setSelectedJobCardModal(jc)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
                          >
                            Open Job Card &gt;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 4 Cols: Live Customer Approvals Queue + Available Mechanics */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Customer Additional Work Approvals (Spec Section 11) */}
                  <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-sm text-white">Pending Customer Approvals</h4>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                        Live Sync
                      </span>
                    </div>

                    <div className="space-y-3">
                      {customerApprovalsList.map(app => (
                        <div key={app.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-white">{app.customerName}</span>
                            <span className="text-emerald-400 font-black">+৳{app.additionalCost.toLocaleString()}</span>
                          </div>
                          <div className="text-[11px] text-red-400 font-bold mb-1">{app.vehicle}</div>
                          <p className="text-gray-300 text-[11px] leading-snug mb-2.5">{app.recommendedWork}</p>

                          <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                              app.status === 'Approved by Customer' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {app.status}
                            </span>
                            {app.status.includes('Pending') && (
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => handleCustomerApprovalAction(app.id, 'approve')}
                                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                                  title="Simulate Customer Approval"
                                >
                                  ✓ Customer Approved
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mechanics on Duty */}
                  <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-sm text-white">Technicians On Duty</h4>
                      <span className="text-xs text-gray-400">{mechanicsList.length} Specialists</span>
                    </div>

                    <div className="space-y-2.5">
                      {mechanicsList.map(m => (
                        <div key={m.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                          <div>
                            <div className="font-bold text-white">{m.name}</div>
                            <div className="text-[10px] text-gray-400">{m.specialization}</div>
                          </div>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            m.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ══════════════════ TAB 2: BOOKINGS & CALENDAR (SPEC SECTION 6 & 7) ══════════════════ */}
          {activeNav === 'bookings' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Workshop Bookings & Bay Scheduling</h2>
                  <p className="text-xs text-gray-400">Scheduled vehicle maintenance, bay assignments, and mechanic allocations.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Calendar View Toggle (Spec Section 7) */}
                  <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold">
                    {['day', 'week', 'month'].map(v => (
                      <button
                        key={v}
                        onClick={() => setCalendarViewMode(v)}
                        className={`px-3 py-1 rounded-lg uppercase ${calendarViewMode === v ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      >
                        {v} View
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowNewBookingModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md whitespace-nowrap"
                  >
                    + Create Direct Booking
                  </button>
                </div>
              </div>

              {/* Visual Calendar Schedule Blocks (Spec Section 7) */}
              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400 font-bold pb-3 border-b border-white/10">
                  <span>Today's Bay Timeline Schedule ({calendarViewMode.toUpperCase()} VIEW)</span>
                  <span>Double-booking prevention active</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { bay: 'Bay #1 (Standard Lift)', car: 'Toyota Allion', time: '09:00 AM - 12:00 PM', mech: 'Barry Allen', status: 'In Progress' },
                    { bay: 'Bay #2 (Inspection Pit)', car: 'Porsche 911 GT3', time: '11:00 AM - 02:00 PM', mech: 'Clark Kent', status: 'Confirmed' },
                    { bay: 'Bay #3 (Brake Lathe)', car: 'Honda CR-V', time: '02:00 PM - 04:30 PM', mech: 'Diana Prince', status: 'Pending' },
                    { bay: 'Bay #4 (Supercar Lift)', car: 'Ferrari 488 Pista', time: '08:30 AM - 05:00 PM', mech: 'Bruce Wayne', status: 'Waiting Approval' }
                  ].map((slot, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5 hover:border-red-500/40 transition-colors">
                      <div className="text-[10px] text-red-400 font-bold uppercase">{slot.bay}</div>
                      <div className="text-sm font-black text-white">{slot.car}</div>
                      <div className="text-gray-400 font-mono">⏱️ {slot.time}</div>
                      <div className="text-gray-300">Tech: <strong className="text-emerald-400">{slot.mech}</strong></div>
                      <span className="inline-block mt-1 text-[9px] font-black uppercase px-2 py-0.5 rounded bg-white/10 text-white">
                        {slot.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bookings Table */}
              <div className="rounded-3xl border border-white/10 bg-[#10131d] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-[11px] uppercase tracking-wider bg-white/5">
                        <th className="p-4">Booking ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Vehicle</th>
                        <th className="p-4">Service Requested</th>
                        <th className="p-4">Assigned Tech & Bay</th>
                        <th className="p-4">Estimated Fee</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookingsList.map(b => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-mono font-bold text-red-500">{b.id}</td>
                          <td className="p-4">
                            <div className="font-bold text-white">{b.customerName}</div>
                            <div className="text-[11px] text-gray-400">{b.customerPhone}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">{b.vehicle}</div>
                            <div className="text-[11px] text-gray-400 font-mono">{b.regNumber}</div>
                          </td>
                          <td className="p-4 font-semibold text-gray-300">{b.serviceName}</td>
                          <td className="p-4">
                            <span className="text-emerald-400 font-bold block">{b.assignedMechanic || 'Unassigned'}</span>
                            <span className="text-[10px] text-gray-400">Bay Allocation: Bay #1</span>
                          </td>
                          <td className="p-4 font-black text-white">৳{b.priceEstimate?.toLocaleString()}</td>
                          <td className="p-4">
                            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400">
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedBookingModal(b)}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 3: JOB CARDS & REPAIR ORDERS (SPEC SECTION 10) ══════════════════ */}
          {activeNav === 'job_cards' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Job Cards & Repair Order System</h2>
                  <p className="text-xs text-gray-400">Comprehensive diagnostic findings, tasks performed, parts billing, and live customer timeline.</p>
                </div>
                <button
                  onClick={() => setShowNewJobCardModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md"
                >
                  + Generate Job Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobCardsList.map(jc => (
                  <div key={jc.id} className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                        {jc.id}
                      </span>
                      <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400">
                        {jc.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-white">{jc.vehicle}</h3>
                      <p className="text-xs text-gray-400 font-mono">Reg: {jc.regNumber} • Odo: {jc.mileage}</p>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-gray-300">
                      <strong className="text-white block mb-0.5">Complaint:</strong> {jc.complaint}
                      <strong className="text-red-400 block mt-2 mb-0.5">Mechanic Diagnosis:</strong> {jc.diagnosis}
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-gray-400">Assigned Tech: <strong className="text-emerald-400">{jc.assignedMechanic}</strong></div>
                      <div className="text-gray-400">Service Station: <strong className="text-white">{jc.assignedBay}</strong></div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedJobCardModal(jc)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                      >
                        View Full Job Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 4: DIGITAL VEHICLE INSPECTION (SPEC SECTION 12) ══════════════════ */}
          {activeNav === 'inspections' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Digital Vehicle Inspection (10-Point Health Check)</h2>
                  <p className="text-xs text-gray-400">Systematic multi-point health check generated for customer transparency and approval.</p>
                </div>
                <button
                  onClick={() => alert("Inspection report exported as PDF!")}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md"
                >
                  📄 Export Report for Customer
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                  <div>
                    <h3 className="text-xl font-black text-white">{digitalInspection.vehicle}</h3>
                    <p className="text-xs text-gray-400">Certified by: <strong className="text-white">{digitalInspection.inspectedBy}</strong></p>
                  </div>
                  <span className="text-xs font-black uppercase px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    Overall Health: {digitalInspection.overallStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {digitalInspection.items.map(item => (
                    <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{item.name}</h4>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            item.status === 'Good' ? 'bg-emerald-500/20 text-emerald-400' :
                            item.status === 'Needs Attention' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400 animate-pulse'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1 leading-snug">{item.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 5: CUSTOMER APPROVALS WORKFLOW (SPEC SECTION 11) ══════════════════ */}
          {activeNav === 'customer_approvals' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Customer Work Approval System</h2>
                <p className="text-xs text-gray-400">Additional defects discovered during vehicle tear-down sent for real-time customer consent.</p>
              </div>

              <div className="space-y-4">
                {customerApprovalsList.map(app => (
                  <div key={app.id} className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                          {app.id}
                        </span>
                        <h3 className="font-black text-lg text-white">{app.customerName}</h3>
                        <span className="text-xs text-gray-400">({app.customerPhone})</span>
                      </div>
                      <span className="text-xl font-black text-emerald-400">
                        +৳{app.additionalCost.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs space-y-1">
                      <div className="text-gray-400">Target Vehicle: <strong className="text-white">{app.vehicle}</strong></div>
                      <div className="text-gray-400">Original Booking: <strong className="text-white">{app.originalService}</strong></div>
                      <div className="text-red-400 font-bold mt-2">Discovered Defect: {app.discoveredFault}</div>
                      <div className="text-emerald-400 font-bold">Recommended Solution: {app.recommendedWork}</div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                      <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                        app.status === 'Approved by Customer' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        Current Status: {app.status}
                      </span>

                      {app.status.includes('Pending') && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCustomerApprovalAction(app.id, 'reject')}
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-300"
                          >
                            Customer Declined
                          </button>
                          <button
                            onClick={() => handleCustomerApprovalAction(app.id, 'approve')}
                            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md"
                          >
                            ✓ Customer Approved & Proceed
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 6: CUSTOMERS & VEHICLES PASSPORT (SPEC SECTION 8 & 9) ══════════════════ */}
          {activeNav === 'customers_vehicles' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Customer Management & Digital Vehicle Passports</h2>
                <p className="text-xs text-gray-400">Complete customer profiles, visit history, VIN registration, and permanent digital service records.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {customerDirectory.map(c => (
                  <div key={c.id} className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-white text-lg">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white">{c.name}</h3>
                        <p className="text-xs text-gray-400">{c.phone}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs space-y-1">
                      <div className="flex justify-between"><span>Visits:</span><strong className="text-white">{c.visitsCount} times</strong></div>
                      <div className="flex justify-between"><span>Total Spent:</span><strong className="text-emerald-400">{c.totalSpent}</strong></div>
                      <div className="flex justify-between"><span>Customer Rating:</span><strong className="text-amber-400">★ {c.rating}</strong></div>
                    </div>

                    <div className="border-t border-white/10 pt-3">
                      <span className="text-[10px] text-gray-400 uppercase font-black block mb-2">Registered Vehicle:</span>
                      {c.vehicles.map((v, i) => (
                        <div key={i} className="text-xs space-y-0.5">
                          <div className="font-bold text-white">{v.make} {v.model} ({v.year})</div>
                          <div className="text-gray-400 font-mono">Reg: {v.regNumber}</div>
                          <div className="text-gray-400 font-mono">VIN: {v.vin}</div>
                          <button
                            onClick={() => setSelectedVehiclePassportModal(v)}
                            className="mt-2 w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-red-400 font-bold text-xs transition-colors"
                          >
                            View Digital Vehicle Passport &gt;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 7: ESTIMATES & INVOICES (SPEC SECTION 15 & 20) ══════════════════ */}
          {activeNav === 'estimates_invoices' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Estimates, Quotations & Tax Invoices</h2>
                  <p className="text-xs text-gray-400">Itemized quotation builder with labor, spare parts, taxes, discounts, and customer consent status.</p>
                </div>
                <button
                  onClick={() => setShowNewEstimateModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md"
                >
                  + Create New Estimate
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {estimatesList.map(est => (
                  <div key={est.id} className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                        {est.id}
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                        est.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {est.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white">{est.vehicle}</h3>
                    <p className="text-xs text-gray-400">Customer: <strong className="text-white">{est.customerName}</strong></p>

                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1.5 text-xs">
                      {est.laborItems.map((l, idx) => (
                        <div key={idx} className="flex justify-between text-gray-300">
                          <span>🔧 {l.desc}</span>
                          <span className="font-bold">৳{l.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      {est.partsItems.map((p, idx) => (
                        <div key={idx} className="flex justify-between text-gray-300">
                          <span>📦 {p.desc}</span>
                          <span className="font-bold">৳{p.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-gray-400 pt-1 border-t border-white/5">
                        <span>VAT (5%):</span>
                        <span>৳{est.vatTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base font-black text-emerald-400 pt-1 border-t border-white/10">
                        <span>Total Quotation:</span>
                        <span>৳{est.total.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedInvoiceModal(est)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                      >
                        Print Formal Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 8: IN-PLATFORM MESSAGING (SPEC SECTION 26) ══════════════════ */}
          {activeNav === 'messaging' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">In-Platform Service Messaging</h2>
                <p className="text-xs text-gray-400">Linked directly to Booking IDs, customer vehicle profiles, and Job Cards.</p>
              </div>

              <div className="h-[560px] rounded-3xl border border-white/10 bg-[#10131d] flex overflow-hidden">
                <div className="w-80 border-r border-white/10 flex flex-col shrink-0">
                  <div className="p-4 border-b border-white/10 text-xs font-black uppercase text-gray-400">
                    Active Service Threads
                  </div>
                  <div className="divide-y divide-white/5 overflow-y-auto flex-1">
                    {messagingThreads.map(th => (
                      <div
                        key={th.id}
                        onClick={() => setActiveMessageThread(th.id)}
                        className={`p-4 cursor-pointer transition-colors ${
                          activeMessageThread === th.id ? 'bg-red-600/10 border-l-4 border-red-600' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-xs text-white truncate">{th.recipientName}</strong>
                          <span className="text-[9px] text-gray-500">{th.time}</span>
                        </div>
                        <span className="text-[10px] text-red-400 font-bold block mb-1">{th.vehicleTag}</span>
                        <p className="text-[11px] text-gray-400 truncate">{th.lastMessage}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div>
                      <h4 className="font-bold text-sm text-white">{activeThreadObj.recipientName}</h4>
                      <span className="text-xs text-red-400 font-semibold">{activeThreadObj.vehicleTag}</span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto space-y-3">
                    {activeThreadObj.messages.map((m, idx) => (
                      <div key={idx} className={`flex ${m.sender === 'workshop' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                          m.sender === 'workshop'
                            ? 'bg-red-600 text-white rounded-br-none shadow-md'
                            : 'bg-white/10 text-gray-200 rounded-bl-none'
                        }`}>
                          <p>{m.text}</p>
                          <span className="text-[9px] opacity-75 block text-right mt-1">{m.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-white/10 flex gap-2">
                    <input
                      type="text"
                      value={messageReplyInput}
                      onChange={(e) => setMessageReplyInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendReply(); }}
                      placeholder="Type response to driver or supplier..."
                      className="flex-1 text-xs p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-red-500"
                    />
                    <button
                      onClick={handleSendReply}
                      className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 9: ANALYTICS & WORKSHOP PERFORMANCE SCORE (SPEC SECTION 27 & 28) ══════════════════ */}
          {activeNav === 'analytics_performance' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Workshop Analytics & Operational Scorecard</h2>
                <p className="text-xs text-gray-400">Objective metric indicators evaluating customer satisfaction, turnaround time, and repair accuracy.</p>
              </div>

              {/* Performance Score Card (Spec Section 28) */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-[#141829] to-[#0f121d] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center bg-black/40 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <span className="text-3xl font-black text-emerald-400">96</span>
                    <span className="text-[9px] uppercase font-bold text-gray-400">Score / 100</span>
                  </div>
                  <div>
                    <div className="inline-block text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 mb-1">
                      Tier 1 Elite Workshop
                    </div>
                    <h3 className="text-2xl font-black text-white">Mechify Quality Benchmark</h3>
                    <p className="text-xs text-gray-400 max-w-md mt-0.5">
                      Your hub is operating in the top 3% in Dhaka. On-time completions and high customer reviews qualify you for priority emergency roadside dispatches.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs shrink-0 w-full md:w-auto">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Acceptance Rate</span>
                    <strong className="text-emerald-400 text-lg">98.4%</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Avg Response Time</span>
                    <strong className="text-white text-lg">4.2 mins</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">On-Time Delivery</span>
                    <strong className="text-emerald-400 text-lg">94.8%</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Customer Return Rate</span>
                    <strong className="text-cyan-400 text-lg">78.2%</strong>
                  </div>
                </div>
              </div>

              {/* Service Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-3">
                  <h4 className="font-bold text-sm text-white">Most Requested Services</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { name: 'Computerized OBD-II Diagnostics', pct: 88, rev: '৳148,000' },
                      { name: 'Brembo Brake Overhaul & Rotors', pct: 72, rev: '৳312,000' },
                      { name: 'Synthetic Oil & Fluid Flushes', pct: 94, rev: '৳195,000' },
                      { name: 'Supercar Telemetry Tuning', pct: 54, rev: '৳280,000' }
                    ].map((s, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white/5 flex justify-between items-center">
                        <span>{s.name}</span>
                        <strong className="text-emerald-400">{s.rev}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-3">
                  <h4 className="font-bold text-sm text-white">Top Serviced Vehicle Brands</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { brand: 'Toyota & Lexus (Hybrid / GR)', share: '38%' },
                      { brand: 'Porsche (911 / Macan / Cayenne)', share: '24%' },
                      { brand: 'Ferrari & Lamborghini', share: '18%' },
                      { brand: 'BMW & Mercedes-AMG', share: '20%' }
                    ].map((b, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white/5 flex justify-between items-center">
                        <span className="font-bold text-white">{b.brand}</span>
                        <span className="text-red-400 font-black">{b.share} Volume</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 10: PUBLIC HUB PROFILE PREVIEW (SPEC SECTION 23) ══════════════════ */}
          {activeNav === 'public_profile' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black">Public Hub Profile Preview</h2>
                  <p className="text-xs text-gray-400">This is the verified customer-facing profile displayed on the Mechify consumer mobile & web app.</p>
                </div>
                <button
                  onClick={() => alert("Changes saved to Public Mechify Directory!")}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md"
                >
                  Save & Publish Live
                </button>
              </div>

              <div className="rounded-3xl border border-white/15 overflow-hidden bg-black/40 shadow-2xl relative">
                <div className="h-52 w-full relative">
                  <img src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1200&h=400&fit=crop" alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="p-8 pt-0 relative -mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div className="flex items-end gap-4">
                    <img
                      src={currentWorkshop.avatar}
                      alt="Logo"
                      className="w-24 h-24 rounded-3xl object-cover border-4 border-[#07080d] shadow-2xl"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-white">{currentWorkshop.workshopName}</h3>
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ✓ Mechify Certified
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">📍 {currentWorkshop.address} • ⭐ <strong>{currentWorkshop.rating}</strong> ({currentWorkshop.reviews} reviews)</p>
                      <div className="text-[11px] text-gray-400 mt-1">Operating Hours: 08:30 AM - 09:00 PM • 24/7 Emergency Dispatch Hub</div>
                    </div>
                  </div>

                  {/* Public Customer CTAs (Spec Section 23) */}
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 rounded-xl bg-red-600 text-white font-black text-xs shadow-md">
                      Book Service
                    </button>
                    <a href={`tel:${currentWorkshop.phone}`} className="px-3 py-2 rounded-xl bg-white/10 text-white font-bold text-xs">
                      📞 Call Workshop
                    </a>
                  </div>
                </div>

                {/* Available Slots & Services Preview */}
                <div className="p-8 pt-4 border-t border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Available Services & Starting Rates</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {servicesCatalog.map(s => (
                      <div key={s.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                        <div>
                          <strong className="text-white block">{s.name}</strong>
                          <span className="text-gray-400">{s.duration} • {s.mechanicType}</span>
                        </div>
                        <strong className="text-emerald-400">From ৳{s.startingPrice.toLocaleString()}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 11: REVIEWS & REPUTATION (SPEC SECTION 22) ══════════════════ */}
          {activeNav === 'reviews_reputation' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Customer Reviews & Workshop Reputation</h2>
                <p className="text-xs text-gray-400">Verified driver feedback connected to job cards and services.</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 flex flex-col sm:flex-row items-center gap-8">
                <div className="text-center sm:border-r border-white/10 sm:pr-8 shrink-0">
                  <div className="text-5xl font-black text-amber-400">{currentWorkshop.rating}</div>
                  <div className="text-amber-400 text-lg mt-1">★★★★★</div>
                  <div className="text-xs text-gray-400 mt-1">Based on {currentWorkshop.reviews} verified reviews</div>
                </div>
                <div className="flex-1 w-full space-y-1.5 text-xs">
                  {[{ star: 5, pct: 82 }, { star: 4, pct: 14 }, { star: 3, pct: 3 }, { star: 2, pct: 1 }, { star: 1, pct: 0 }].map(b => (
                    <div key={b.star} className="flex items-center gap-3">
                      <span className="w-12 font-bold">{b.star} Star</span>
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${b.pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-gray-400">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Arman Khan', car: 'Ferrari 488 Pista', rating: 5, comment: 'Master technician Bruce Wayne calibrated the telemetry and changed the Brembo pads flawlessly. Zero track fade.', date: 'Yesterday' },
                  { name: 'Mahi Rahman', car: 'Toyota Allion', rating: 5, comment: 'Mobile emergency unit arrived in Banani 11 intersection within 14 minutes. Jump-started and swapped alternator. Lifesaver!', date: '3 days ago' }
                ].map((r, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#10131d] border border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <strong className="text-white text-sm block">{r.name}</strong>
                        <span className="text-red-400 font-bold">{r.car}</span>
                      </div>
                      <span className="text-amber-400">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{r.comment}</p>
                    <div className="pt-2 border-t border-white/5 flex justify-end">
                      <button onClick={() => alert("Reply dialog opened!")} className="text-xs font-bold text-red-400 hover:text-red-300">
                        Reply as Owner
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 12: MECHANICS & CAPACITY MANAGEMENT (SPEC SECTION 13 & 24) ══════════════════ */}
          {activeNav === 'mechanics_capacity' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Specialist Mechanics & Facility Bay Allocation</h2>
                  <p className="text-xs text-gray-400">Technician certifications, active job tracking, and service bay capacity limits.</p>
                </div>
                <button
                  onClick={() => alert("Add Mechanic form modal opened!")}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md"
                >
                  + Add Certified Mechanic
                </button>
              </div>

              {/* Bay Capacity Controller (Spec Section 24) */}
              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Total Service Bays</label>
                  <input
                    type="number"
                    value={totalBays}
                    onChange={(e) => setTotalBays(parseInt(e.target.value) || 8)}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-black text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Occupied Lift Bays</label>
                  <input
                    type="number"
                    value={occupiedBays}
                    onChange={(e) => setOccupiedBays(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400 font-black text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Calculated Free Capacity</label>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-lg">
                    {availableBays} Bays Available for Dispatch
                  </div>
                </div>
              </div>

              {/* Mechanics Roster */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {mechanicsList.map(m => (
                  <div key={m.id} className="p-5 rounded-2xl bg-[#10131d] border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-sm text-white">{m.name}</h4>
                      <p className="text-red-400 font-bold mt-0.5">{m.specialization}</p>
                      <p className="text-gray-400 mt-1">Experience: <strong className="text-white">{m.experience}</strong> • Phone: {m.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase block mb-2 ${
                        m.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {m.status}
                      </span>
                      <a href={`tel:${m.phone}`} className="inline-block px-3 py-1 rounded-lg bg-white/10 text-white font-bold">
                        📞 Call Tech
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 13: SERVICES & PRICING CATALOG (SPEC SECTION 14) ══════════════════ */}
          {activeNav === 'services_catalog' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Workshop Service Catalog & Pricing</h2>
                  <p className="text-xs text-gray-400">Configure services, equipment requirements, labor durations, and customer starting rates.</p>
                </div>
                <button
                  onClick={() => alert("Add Service dialog opened!")}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md"
                >
                  + Add Service Offering
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {servicesCatalog.map(s => (
                  <div key={s.id} className="p-5 rounded-2xl bg-[#10131d] border border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-white">{s.name}</h4>
                      <span className="text-emerald-400 font-black text-sm">৳{s.startingPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-gray-400">Duration: <strong className="text-white">{s.duration}</strong> • Category: <strong className="text-red-400">{s.category}</strong></div>
                    <div className="text-gray-400">Required Tech: <strong className="text-white">{s.mechanicType}</strong></div>
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-[11px] text-gray-300">
                      Equipment: {s.equipment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 14: PARTS & MARKETPLACE (SPEC SECTION 16 & 17) ══════════════════ */}
          {activeNav === 'inventory_marketplace' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Workshop Inventory & Marketplace Procurement</h2>
                  <p className="text-xs text-gray-400">Local garage spare parts stock and direct procurement from Mechify verified parts suppliers.</p>
                </div>
                <button
                  onClick={() => setShowMarketplaceOrderModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md"
                >
                  🛒 Order Parts from Marketplace
                </button>
              </div>

              {/* Local Inventory Table */}
              <div className="rounded-3xl border border-white/10 bg-[#10131d] overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <h3 className="font-black text-sm text-white">Current Garage Shelf Stock</h3>
                  <span className="text-xs text-gray-400">{workshopInventory.length} Tracked Line Items</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-[11px] uppercase tracking-wider">
                        <th className="p-4">Part Name</th>
                        <th className="p-4">SKU & Category</th>
                        <th className="p-4">In Stock</th>
                        <th className="p-4">Min Alert</th>
                        <th className="p-4">Selling Price</th>
                        <th className="p-4">Supplier</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {workshopInventory.map(item => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-white">{item.partName}</td>
                          <td className="p-4">
                            <span className="font-mono text-gray-400 block">{item.sku}</span>
                            <span className="text-[10px] text-gray-500">{item.category}</span>
                          </td>
                          <td className="p-4">
                            <span className={`font-black ${item.stock <= item.minStock ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
                              {item.stock} units
                            </span>
                          </td>
                          <td className="p-4 text-gray-400">&lt; {item.minStock}</td>
                          <td className="p-4 font-bold text-white">৳{item.sellingPrice.toLocaleString()}</td>
                          <td className="p-4 text-gray-400">{item.supplier}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                setWorkshopInventory(prev => prev.map(p => p.id === item.id ? { ...p, stock: p.stock + 5 } : p));
                                alert(`Added 5 units of ${item.partName} to shelf!`);
                              }}
                              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
                            >
                              + Re-up Stock
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 15: EMERGENCY ROADSIDE & GPS RADAR (SPEC SECTION 18 & 19) ══════════════════ */}
          {activeNav === 'emergency_radar' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">24/7 Emergency Roadside Radar & Dispatch</h2>
                  <p className="text-xs text-gray-400">Live breakdown incidents in Dhaka requiring immediate mobile mechanic dispatch.</p>
                </div>
                <div className="flex items-center gap-2 bg-red-950 border border-red-500 px-4 py-2 rounded-xl text-red-300 text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  Live GPS Radar Receiver Active
                </div>
              </div>

              <div className="h-[520px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative">
                <MapContainer
                  center={[currentWorkshop.lat || 23.7925, currentWorkshop.lng || 90.4150]}
                  zoom={14}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  {/* Workshop Base */}
                  <Marker position={[currentWorkshop.lat, currentWorkshop.lng]} icon={workshopIcon}>
                    <Popup>
                      <div className="text-black p-2 font-['Outfit']">
                        <strong className="text-red-600 block">{currentWorkshop.workshopName}</strong>
                        <p className="text-xs text-gray-700">{currentWorkshop.address}</p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Roadside Breakdown Marker */}
                  <Marker position={[currentWorkshop.lat + 0.003, currentWorkshop.lng + 0.004]} icon={emergencyRoadsideIcon}>
                    <Popup>
                      <div className="text-black p-2 font-['Outfit']">
                        <strong className="text-red-600 uppercase block text-xs">🚨 ROADSIDE BREAKDOWN SOS</strong>
                        <p className="font-bold text-sm">Mahi Rahman (Toyota Allion)</p>
                        <p className="text-xs text-red-600 font-semibold">Dead Battery & Stalled Engine</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 16: BILLING, INVOICES & PAYOUTS (SPEC SECTION 20 & 21) ══════════════════ */}
          {activeNav === 'billing_payouts' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Workshop Financials, Billing & Payouts</h2>
                <p className="text-xs text-gray-400">Review collected repair payments, platform fees, and disburse earnings to your bank account.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10">
                  <span className="text-xs text-gray-400 font-bold">Available for Withdrawal</span>
                  <div className="text-3xl font-black text-emerald-400 mt-2">৳485,200</div>
                  <button
                    onClick={() => alert("Payout of ৳485,200 initiated to City Bank Ltd (Account #108-291-002)! Funds arriving in 24 hours.")}
                    className="mt-4 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-md"
                  >
                    Withdraw to Bank Account
                  </button>
                </div>

                <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10">
                  <span className="text-xs text-gray-400 font-bold">Pending Customer Clearances</span>
                  <div className="text-3xl font-black text-amber-400 mt-2">৳64,000</div>
                  <p className="text-[11px] text-gray-400 mt-3">From jobs in progress awaiting vehicle pickup.</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10">
                  <span className="text-xs text-gray-400 font-bold">Lifetime Workshop Revenue</span>
                  <div className="text-3xl font-black text-white mt-2">৳4,280,000</div>
                  <p className="text-[11px] text-gray-400 mt-3">Processed through Mechify platform gateway.</p>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 17: ONBOARDING & VERIFICATION (SPEC SECTION 3) ══════════════════ */}
          {activeNav === 'onboarding' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Workshop Onboarding & Verification Status</h2>
                <p className="text-xs text-gray-400">Trade license, technician certifications, and official Mechify Verified badge status.</p>
              </div>

              <div className="p-8 rounded-3xl bg-[#10131d] border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-black text-lg text-white">Mechify Certified Hub Status</h3>
                      <p className="text-xs text-emerald-400 font-bold">All 3 Onboarding Steps Completed & Verified</p>
                    </div>
                  </div>
                  <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    VERIFIED PARTNER
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <strong className="text-white block mb-1">Step 1 — Business Info</strong>
                    <span className="text-gray-400">BIN-990812401</span>
                    <span className="text-emerald-400 block font-bold mt-1">✓ Trade License Valid</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <strong className="text-white block mb-1">Step 2 — Facility & Bays</strong>
                    <span className="text-gray-400">{totalBays} Bays • 4 Lift Columns</span>
                    <span className="text-emerald-400 block font-bold mt-1">✓ Supercar Rated</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <strong className="text-white block mb-1">Step 3 — Mechanic Verification</strong>
                    <span className="text-gray-400">{mechanicsList.length} Certified Master Techs</span>
                    <span className="text-emerald-400 block font-bold mt-1">✓ Police Cleared</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════ TAB 18: SETTINGS & ROLE-BASED ACCESS (SPEC SECTION 29 & 30) ══════════════════ */}
          {activeNav === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Workshop Operations & Role-Based Settings</h2>
                <p className="text-xs text-gray-400">Configure business hours, service bay limits, staff permissions, and automated notifications.</p>
              </div>

              <div className="p-8 rounded-3xl bg-[#10131d] border border-white/10 space-y-6">
                <h3 className="font-black text-base text-white">Staff Roles & Permissions (Role-Based Access)</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                    <div>
                      <strong className="text-white block text-sm">Owner ({currentWorkshop.ownerName})</strong>
                      <span className="text-gray-400">Full administrative control, bank payouts, staff hiring, and financial ledgers.</span>
                    </div>
                    <span className="px-3 py-1 rounded bg-red-600 text-white font-black text-xs">OWNER</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                    <div>
                      <strong className="text-white block text-sm">Workshop Manager</strong>
                      <span className="text-gray-400">Manages customer bookings, assigns service bays, and controls inventory reorders.</span>
                    </div>
                    <span className="px-3 py-1 rounded bg-white/10 text-gray-300 font-black text-xs">MANAGER</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                    <div>
                      <strong className="text-white block text-sm">Mechanic / Technician View</strong>
                      <span className="text-gray-400">Can view assigned repair cards, fill digital inspection reports, and log replaced parts.</span>
                    </div>
                    <span className="px-3 py-1 rounded bg-white/10 text-gray-300 font-black text-xs">MECHANIC</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ─── MODAL: FULL JOB CARD / REPAIR ORDER INSPECTOR ─── */}
      {selectedJobCardModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#121522] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJobCardModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                {selectedJobCardModal.id}
              </span>
              <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400">
                {selectedJobCardModal.status}
              </span>
            </div>

            <h3 className="text-2xl font-black text-white">{selectedJobCardModal.vehicle}</h3>
            <p className="text-xs text-gray-400 font-mono">Reg: {selectedJobCardModal.regNumber} • Customer: {selectedJobCardModal.customerName} ({selectedJobCardModal.customerPhone})</p>

            <div className="my-5 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-2">
              <div><strong className="text-white block">Customer Complaint:</strong> {selectedJobCardModal.complaint}</div>
              <div><strong className="text-red-400 block">Diagnostic Finding:</strong> {selectedJobCardModal.diagnosis}</div>
            </div>

            {/* Customer Timeline */}
            <div className="mb-5">
              <h4 className="text-xs font-black uppercase text-gray-400 mb-3">Live Customer-Workshop Synchronized Timeline</h4>
              <div className="space-y-2.5 pl-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {selectedJobCardModal.timeline.map((st, i) => (
                  <div key={i} className="relative">
                    <span className={`w-2.5 h-2.5 rounded-full absolute -left-6 top-1 ${st.done ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-gray-600'}`} />
                    <div className="text-xs font-bold text-white">{st.stage}</div>
                    <div className="text-[10px] text-gray-400">{st.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setSelectedJobCardModal(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Job Card ${selectedJobCardModal.id} marked as Quality Checked & Ready for Pickup! Customer notified via SMS.`);
                  setSelectedJobCardModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black"
              >
                Mark Ready for Pickup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: DIGITAL VEHICLE PASSPORT (SPEC SECTION 8 & 9) ─── */}
      {selectedVehiclePassportModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#121522] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedVehiclePassportModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>
            <div className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
              Official Digital Vehicle Passport
            </div>
            <h3 className="text-2xl font-black text-white">{selectedVehiclePassportModal.make} {selectedVehiclePassportModal.model} ({selectedVehiclePassportModal.year})</h3>
            <p className="text-xs text-gray-400 font-mono">Reg: {selectedVehiclePassportModal.regNumber} • VIN: {selectedVehiclePassportModal.vin}</p>

            <div className="grid grid-cols-2 gap-3 my-4 text-xs">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Engine & Powertrain</span>
                <span className="font-bold text-white">{selectedVehiclePassportModal.engine}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Transmission</span>
                <span className="font-bold text-white">{selectedVehiclePassportModal.transmission}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Current Odometer</span>
                <span className="font-bold text-white">{selectedVehiclePassportModal.mileage}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Service Warranty</span>
                <span className="font-bold text-emerald-400">✓ Active Mechify Shield</span>
              </div>
            </div>

            <h4 className="text-xs font-black uppercase text-gray-400 mb-2">Previous Permanent Service Logs</h4>
            <div className="space-y-2 text-xs">
              {selectedVehiclePassportModal.serviceHistory?.map((h, idx) => (
                <div key={idx} className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex justify-between text-gray-300 font-bold mb-0.5">
                    <span>{h.date} (at {h.mileage})</span>
                    <span className="text-emerald-400">{h.cost}</span>
                  </div>
                  <p className="text-gray-400">{h.work}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10 mt-4">
              <button
                onClick={() => setSelectedVehiclePassportModal(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: PRINTABLE FORMAL INVOICE (SPEC SECTION 20) ─── */}
      {selectedInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#121522] border border-white/20 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedInvoiceModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>
            <div className="text-center pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-lg mx-auto mb-2">M</div>
              <h3 className="text-xl font-black text-white">{currentWorkshop.workshopName}</h3>
              <p className="text-xs text-gray-400">BIN: BIN-990812401 • {currentWorkshop.address}</p>
            </div>

            <div className="py-4 text-xs space-y-1 border-b border-white/10">
              <div className="flex justify-between"><span>Invoice Reference:</span><strong className="font-mono text-white">{selectedInvoiceModal.id}</strong></div>
              <div className="flex justify-between"><span>Bill To:</span><strong className="text-white">{selectedInvoiceModal.customerName}</strong></div>
              <div className="flex justify-between"><span>Vehicle:</span><strong className="text-white">{selectedInvoiceModal.vehicle}</strong></div>
              <div className="flex justify-between"><span>Payment Gateway:</span><strong className="text-emerald-400">bKash Merchant / Cards</strong></div>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-300"><span>Subtotal:</span><strong>৳{selectedInvoiceModal.subtotal.toLocaleString()}</strong></div>
              <div className="flex justify-between text-gray-300"><span>VAT (5%):</span><strong>৳{selectedInvoiceModal.vatTax.toLocaleString()}</strong></div>
              <div className="flex justify-between text-base font-black text-emerald-400 pt-2 border-t border-white/10">
                <span>Total Amount:</span>
                <span>৳{selectedInvoiceModal.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedInvoiceModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setSelectedInvoiceModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs"
              >
                🖨️ Print Invoice Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: CREATE JOB CARD DIALOG ─── */}
      {showNewJobCardModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#121522] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setShowNewJobCardModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-white">Create New Workshop Job Card</h3>
            <p className="text-xs text-gray-400 mb-4">Initialize vehicle reception, mechanic assignment, and diagnostic inspection.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("New Job Card #JC-8809 successfully created and assigned to Bay #2!");
                setShowNewJobCardModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold mb-1">Customer Name & Phone</label>
                <input required type="text" placeholder="e.g. Arman Khan (+880 1911-223344)" className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="block font-bold mb-1">Vehicle Make & Model</label>
                <input required type="text" placeholder="e.g. Porsche 911 GT3 (DHA-GA 55-1200)" className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="block font-bold mb-1">Customer Complaint / Symptoms</label>
                <textarea rows={2} required placeholder="Describe issue reported by driver..." className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Assign Service Bay</label>
                  <select className="w-full p-2 rounded-xl bg-[#1a1d2e] border border-white/10 text-white">
                    <option>Bay #1 (Standard Lift)</option>
                    <option>Bay #2 (Inspection Pit)</option>
                    <option>Bay #3 (Brake & Tire)</option>
                    <option>Bay #4 (Supercar Lift)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Assign Lead Specialist</label>
                  <select className="w-full p-2 rounded-xl bg-[#1a1d2e] border border-white/10 text-white">
                    {mechanicsList.map(m => <option key={m.id}>{m.name} ({m.specialization})</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setShowNewJobCardModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs">
                  Generate Job Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: MARKETPLACE PROCUREMENT DIALOG (SPEC SECTION 17) ─── */}
      {showMarketplaceOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#121522] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative">
            <button
              onClick={() => setShowMarketplaceOrderModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-white">Procure Parts from Mechify Marketplace</h3>
            <p className="text-xs text-gray-400 mb-4">Direct wholesale delivery from verified suppliers (AeroFlow & Brembo BD) to your workshop bay.</p>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {[
                { name: 'Brembo Carbon Ceramic Brake Pads', price: '$143.00', supplier: 'AeroFlow Spares', eta: 'Same-Day Dispatch' },
                { name: 'Garrett GTX3582R Gen II Turbocharger', price: '$1,850.00', supplier: 'AeroFlow Spares', eta: '1 Business Day' },
                { name: 'Bilstein B16 PSS10 Coilovers', price: '$1,650.00', supplier: 'Apex Spares Dhaka', eta: '2 Business Days' },
                { name: 'Motul 300V Trophy Synthetic Oil (4L)', price: '$78.00', supplier: 'AeroFlow Spares', eta: 'Same-Day Dispatch' }
              ].map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white block text-sm">{p.name}</strong>
                    <span className="text-gray-400">{p.supplier} • {p.eta}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-black text-sm">{p.price}</div>
                    <button
                      onClick={() => {
                        alert(`Purchase Order for ${p.name} sent to ${p.supplier}! Linked to Active Job Card.`);
                        setShowMarketplaceOrderModal(false);
                      }}
                      className="mt-1 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-[11px]"
                    >
                      Order for Bay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

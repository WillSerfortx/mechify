import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WORKSHOP_DEMO_ACCOUNTS } from '../data/workshopAccounts';

// Custom Map Markers
const workshopIcon = new L.DivIcon({
  html: '<div style="font-size: 32px; text-align: center; margin-top: -16px; margin-left: -16px; filter: drop-shadow(0 0 14px rgba(220,38,38,0.9));">🏭</div>',
  className: 'custom-icon',
  iconSize: [32, 32]
});

const emergencyRoadsideIcon = new L.DivIcon({
  html: '<div style="font-size: 30px; text-align: center; margin-top: -15px; margin-left: -15px; filter: drop-shadow(0 0 16px rgba(239,68,68,1)); animation: pulse 1s infinite;">🚨</div>',
  className: 'custom-icon',
  iconSize: [30, 30]
});

const emergencyHomeIcon = new L.DivIcon({
  html: '<div style="font-size: 30px; text-align: center; margin-top: -15px; margin-left: -15px; filter: drop-shadow(0 0 16px rgba(245,158,11,1));">🏠</div>',
  className: 'custom-icon',
  iconSize: [30, 30]
});

// Bay mock database template
const DEFAULT_BAYS = [
  { id: 'A1', name: 'Bay A1', status: 'booked', vehicle: 'Ferrari 458 Italia', reg: 'KB 1024 KYG', customer: 'Ronald Richards', customerPhone: '+880 1712-889900', service: 'Full Telemetry & Oil Overhaul', time: '10:00 AM' },
  { id: 'A2', name: 'Bay A2', status: 'ready', vehicle: 'Porsche 911 GT3', reg: 'DHA-GA 55-1200', customer: 'Arman Khan', customerPhone: '+880 1819-334455', service: 'Inspection Complete', time: '11:30 AM' },
  { id: 'A3', name: 'Bay A3', status: 'ready', vehicle: 'BMW M8 Competition', reg: 'DHA-HA 77-8899', customer: 'Sabbir Ahmed', customerPhone: '+880 1911-223344', service: 'Station Ready', time: '01:00 PM' },
  { id: 'A4', name: 'Bay A4', status: 'current', vehicle: 'Lamborghini Huracán Evo', reg: 'KB 1024 KYG', customer: 'Ronald Richards', customerPhone: '+880 1712-889900', service: 'Active Diagnostics & Steering', time: '02:15 PM' },
  { id: 'B1', name: 'Bay B1', status: 'ready', vehicle: 'Mercedes-AMG GT R', reg: 'DHA-KHA 19-3321', customer: 'Navid Hasan', customerPhone: '+880 1722-114477', service: 'Coolant Flush Scheduled', time: '03:00 PM' },
  { id: 'B2', name: 'Bay B2', status: 'ready', vehicle: 'Audi R8 V10 Plus', reg: 'DHA-CHA 44-5566', customer: 'Fahim Chowdhury', customerPhone: '+880 1633-998877', service: 'Brake Disc Inspection', time: '04:15 PM' },
  { id: 'B3', name: 'Bay B3', status: 'booked', vehicle: 'McLaren 720S', reg: 'DHA-LA 66-7788', customer: 'Zubair Hossain', customerPhone: '+880 1788-552211', service: 'Suspension Dampers Repair', time: '05:00 PM' },
  { id: 'B4', name: 'Bay B4', status: 'ready', vehicle: 'Aston Martin Vantage', reg: 'DHA-TA 88-9900', customer: 'Tanvir Alam', customerPhone: '+880 1799-441122', service: 'Station Clean & Ready', time: '05:45 PM' },
  { id: 'C1', name: 'Bay C1', status: 'ready', vehicle: 'Nissan GT-R Nismo', reg: 'DHA-JA 33-2211', customer: 'Adnan Sami', customerPhone: '+880 1755-667788', service: 'ECU Tuning Queue', time: '06:30 PM' },
  { id: 'C2', name: 'Bay C2', status: 'booked', vehicle: 'Toyota Supra GR', reg: 'DHA-MA 11-4455', customer: 'Sakib Khan', customerPhone: '+880 1822-778899', service: 'Twin Turbo Diagnostic', time: '07:15 PM' },
];

export default function WorkshopDashboard() {
  const navigate = useNavigate();

  // Current logged in workshop account (1-30)
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

  // Bays state
  const [bays, setBays] = useState(DEFAULT_BAYS);
  const [currentBayId, setCurrentBayId] = useState('A4');
  const activeBay = useMemo(() => bays.find(b => b.id === currentBayId) || bays[3], [bays, currentBayId]);

  // Bookings & Telemetry state
  const [bookingsState, setBookingsState] = useState(() => currentWorkshop.bookings || []);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCallModal, setShowCallModal] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [emergencyReady, setEmergencyReady] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavTab, setActiveNavTab] = useState('station'); // 'overview' | 'station' | 'bookings' | 'schedule' | 'settings'

  // Diagnostic items state for the currently inspected vehicle
  const [diagnostics, setDiagnostics] = useState({
    oilLevel: { label: 'Oil Level', category: 'Engine', status: "Don't Replace", score: 84, state: 'good' },
    brakePads: { label: 'Brake Pads', category: 'Wheels', status: 'Still Good', score: 68, state: 'warning' },
    steering: { label: 'Steering', category: 'Drivetrain', status: 'Need Change', score: 32, state: 'danger' },
  });
  const [activeDiagCard, setActiveDiagCard] = useState('steering');

  // Sync bookings on workshop change
  useEffect(() => {
    if (currentWorkshop?.bookings) {
      setBookingsState(currentWorkshop.bookings);
    }
  }, [currentWorkshop]);

  // Switch demo account
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

  const handleSelectBay = (bayId) => {
    setCurrentBayId(bayId);
    setBays(prev => prev.map(b => ({
      ...b,
      status: b.id === bayId ? 'current' : (b.status === 'current' ? 'booked' : b.status)
    })));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    navigate('/auth');
  };

  // Emergency stats
  const roadsideAlerts = bookingsState.filter(b => b.type === 'emergency_roadside');
  const homeAlerts = bookingsState.filter(b => b.type === 'emergency_home');

  return (
    <div className="bg-[#090a0f] min-h-screen text-white font-['Outfit',sans-serif] selection:bg-red-600 selection:text-white flex flex-col xl:flex-row overflow-x-hidden">
      
      {/* ─── 1. Left Slim Navigation Rail (From Screenshot) ─── */}
      <aside className="w-full xl:w-20 bg-[#0d0e15] border-b xl:border-b-0 xl:border-r border-white/10 flex xl:flex-col items-center justify-between py-4 px-6 xl:px-0 shrink-0 z-40">
        
        {/* Brand Avatar */}
        <div className="flex xl:flex-col items-center gap-6">
          <Link to="/home" className="group relative" title="Mechify Home">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-xl text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-transform group-hover:scale-105">
              M
            </div>
          </Link>

          {/* Nav Icons */}
          <nav className="flex xl:flex-col items-center gap-4 sm:gap-6">
            <button
              onClick={() => setActiveNavTab('overview')}
              className={`p-3 rounded-xl transition-all ${
                activeNavTab === 'overview'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title="Overview & Telemetry"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>

            <button
              onClick={() => setActiveNavTab('station')}
              className={`p-3 rounded-xl transition-all ${
                activeNavTab === 'station'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title="Service Station Bays"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </button>

            <button
              onClick={() => setActiveNavTab('bookings')}
              className={`p-3 rounded-xl transition-all relative ${
                activeNavTab === 'bookings'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title="Emergency & Work Orders"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {roadsideAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              )}
            </button>

            <button
              onClick={() => setShowMapModal(true)}
              className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              title="Emergency GPS Radar Map"
            >
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </button>
          </nav>
        </div>

        {/* Bottom User & Logout */}
        <div className="flex xl:flex-col items-center gap-3">
          <img
            src={currentWorkshop.avatar}
            alt={currentWorkshop.ownerName}
            className="w-10 h-10 rounded-xl object-cover border border-red-500/40"
            title={`${currentWorkshop.ownerName} - ${currentWorkshop.workshopName}`}
          />
          <button
            onClick={handleLogout}
            className="p-3 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
            title="Sign out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ─── 2. Main Body: Telemetry Dashboard & Station Workspace ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ── Top Header Greeting Bar (From Screenshot) ── */}
        <header className="px-6 lg:px-10 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#0b0c12]/80 backdrop-blur-xl">
          
          {/* Greeting */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentWorkshop.avatar}
                alt={currentWorkshop.ownerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0b0c12]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Hi, {currentWorkshop.ownerName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Sunny day isn't it? • <span className="text-red-400 font-bold">{currentWorkshop.workshopName}</span>
              </p>
            </div>
          </div>

          {/* Quick Search & Demo Account Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input from Screenshot */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find another vehicles here"
                className="bg-[#141622] border border-white/10 rounded-full px-4 py-2 pl-9 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors w-52 sm:w-64"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Quick 30-Account Switcher */}
            <div className="bg-[#141622] border border-white/10 rounded-full px-3 py-1.5 flex items-center">
              <span className="text-xs text-gray-400 mr-2 hidden md:inline">Demo:</span>
              <select
                value={selectedAccountId}
                onChange={(e) => handleSwitchAccount(e.target.value)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer pr-2 max-w-[170px] sm:max-w-[220px]"
              >
                {WORKSHOP_DEMO_ACCOUNTS.map((acc, idx) => (
                  <option key={acc.id} value={acc.id} className="bg-[#12141c] text-white">
                    #{idx + 1} {acc.workshopName.split('-')[0]} ({acc.ownerName})
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency SOS Radar Pill */}
            <button
              onClick={() => setEmergencyReady(!emergencyReady)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                emergencyReady
                  ? 'bg-red-950/60 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.35)]'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${emergencyReady ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="hidden sm:inline">{emergencyReady ? 'Radar ON' : 'Radar Off'}</span>
            </button>
          </div>
        </header>

        {/* ── Main Workspace Content ── */}
        <div className="flex-1 p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT 8 COLUMNS: Service Station Bays & Supercar Inspection Telemetry ── */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            
            {/* ── A. SERVICE STATION HORIZONTAL BAYS TRACK (Directly Matching Screenshot) ── */}
            <div className="bg-[#10121a]/90 border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  Service Station
                </h2>
                <button
                  onClick={() => setShowMapModal(true)}
                  className="text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                >
                  Change Schedule &gt;
                </button>
              </div>

              {/* Station Bays Carousel Track */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
                <button className="p-2 text-gray-500 hover:text-white transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-between min-w-[620px]">
                  {bays.map((bay) => {
                    const isCurrent = bay.id === currentBayId;
                    const isBooked = bay.status === 'booked';
                    
                    return (
                      <button
                        key={bay.id}
                        onClick={() => handleSelectBay(bay.id)}
                        className={`flex-1 py-3.5 px-2 rounded-xl text-center font-black text-xs sm:text-sm transition-all duration-300 border relative group ${
                          isCurrent
                            ? 'bg-gradient-to-b from-red-600 to-red-700 text-white border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.55)] scale-105 z-10'
                            : isBooked
                            ? 'bg-[#182a44] text-[#60a5fa] border-[#2563eb]/40 hover:border-[#60a5fa]'
                            : 'bg-[#141620] text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div>{bay.id}</div>
                        <div className="text-[9px] uppercase tracking-wider opacity-75 font-normal mt-0.5">
                          {isCurrent ? 'ACTIVE' : isBooked ? 'BOOKED' : 'READY'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button className="p-2 text-gray-500 hover:text-white transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Station Legend */}
              <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-transparent" /> Ready
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" /> Booked
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" /> Current Station
                </span>
              </div>
            </div>

            {/* ── B. ACTIVE VEHICLE WIREFRAME & DIAGNOSTIC STAGE (From Screenshot) ── */}
            <div className="bg-[#10121a]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
              
              {/* Vehicle Title & License Plate */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {activeBay.vehicle}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 tracking-widest">
                      {activeBay.reg}
                    </span>
                    <span className="text-xs text-gray-400">
                      Owner: <strong className="text-white">{activeBay.customer}</strong>
                    </span>
                    <span className="text-xs text-red-400 font-bold">
                      {activeBay.service}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                    Station {activeBay.id}
                  </span>
                </div>
              </div>

              {/* Supercar Vector / Telemetry Visualizer (Matching Ferrari/Lamborghini in Screenshot) */}
              <div className="relative my-4 w-full h-[220px] sm:h-[300px] flex items-center justify-center">
                
                {/* Background ambient glow behind car */}
                <div className="absolute w-[80%] h-[60%] bg-red-600/10 rounded-full blur-[70px] pointer-events-none" />

                {/* SVG Line-art Wireframe of Supercar with Glowing Red Accents */}
                <svg
                  viewBox="0 0 1000 420"
                  className="w-full h-full max-h-[320px] object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="neonPulse" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Supercar Main Contours (Precision Vector Lines) */}
                  <g stroke="#ffffff" strokeWidth="2.5" opacity="0.85" strokeLinecap="round" strokeLinejoin="round">
                    {/* Roof & Cockpit Arch */}
                    <path d="M 330,170 C 400,120 540,110 650,170 C 720,210 750,230 830,240" fill="none" />
                    <path d="M 390,175 C 440,135 520,130 580,170 Z" fill="rgba(255,255,255,0.03)" />
                    {/* Front Hood and Nose */}
                    <path d="M 330,170 C 270,185 200,225 150,245 C 135,250 120,260 115,270 L 110,290 C 130,295 180,295 240,290" />
                    {/* Front Splitter Lower Lip */}
                    <path d="M 105,285 C 115,300 150,305 210,305 C 230,305 250,300 270,290" />
                    {/* Front Wheel Arch */}
                    <path d="M 210,290 C 220,240 280,230 330,270" />
                    {/* Side Skirt */}
                    <path d="M 330,270 L 640,270" />
                    {/* Rear Wheel Arch */}
                    <path d="M 640,270 C 650,220 720,220 770,270" />
                    {/* Rear Bumper & Spoiler */}
                    <path d="M 770,270 L 850,265 C 870,255 880,240 870,230 C 850,220 830,225 800,235" />
                    {/* Side Air Scoop & Character Creases */}
                    <path d="M 520,200 C 580,210 630,230 650,260" />
                    <path d="M 380,210 L 490,215" strokeDasharray="6 4" opacity="0.6" />
                    <path d="M 230,200 C 270,215 320,220 370,220" opacity="0.6" />
                  </g>

                  {/* Wheels and Rims */}
                  <g stroke="#ffffff" strokeWidth="2.5" opacity="0.9">
                    {/* Front Wheel */}
                    <circle cx="270" cy="285" r="48" fill="#0d0e15" stroke="#ffffff" strokeWidth="3" />
                    <circle cx="270" cy="285" r="32" stroke="#666" strokeWidth="1.5" />
                    <circle cx="270" cy="285" r="10" fill="#222" stroke="#888" />
                    <line x1="270" y1="237" x2="270" y2="333" stroke="#aaa" />
                    <line x1="222" y1="285" x2="318" y2="285" stroke="#aaa" />
                    <line x1="236" y1="251" x2="304" y2="319" stroke="#aaa" />
                    <line x1="236" y1="319" x2="304" y2="251" stroke="#aaa" />

                    {/* Rear Wheel */}
                    <circle cx="705" cy="285" r="48" fill="#0d0e15" stroke="#ffffff" strokeWidth="3" />
                    <circle cx="705" cy="285" r="32" stroke="#666" strokeWidth="1.5" />
                    <circle cx="705" cy="285" r="10" fill="#222" stroke="#888" />
                    <line x1="705" y1="237" x2="705" y2="333" stroke="#aaa" />
                    <line x1="657" y1="285" x2="753" y2="285" stroke="#aaa" />
                    <line x1="671" y1="251" x2="739" y2="319" stroke="#aaa" />
                    <line x1="671" y1="319" x2="739" y2="251" stroke="#aaa" />
                  </g>

                  {/* ── Glowing Crimson Highlight Accents (Exact Reference Style) ── */}
                  {/* Front Bumper Aero Ribbon */}
                  <path
                    d="M 120,285 C 150,280 200,270 240,270"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#neonPulse)"
                  />
                  {/* Steering Wheel / Cockpit Accent */}
                  <path
                    d="M 405,170 C 415,150 435,150 445,170"
                    stroke="#ef4444"
                    strokeWidth="7"
                    strokeLinecap="round"
                    filter="url(#neonPulse)"
                  />
                  {/* Side Skirt Aero Accent */}
                  <path
                    d="M 540,282 L 635,282"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#neonPulse)"
                  />
                  {/* Rear Engine / Intake Flank Flow */}
                  <path
                    d="M 680,225 C 720,220 740,230 750,250"
                    stroke="#ef4444"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#neonPulse)"
                  />

                  {/* Brake Calipers Highlight */}
                  <path d="M 285,255 A 25 25 0 0 1 300,285" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                  <path d="M 720,255 A 25 25 0 0 1 735,285" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />

                  {/* Ground Shadow & Floor Reflection */}
                  <ellipse cx="480" cy="350" rx="390" ry="16" fill="rgba(0,0,0,0.6)" />
                </svg>

                {/* Hotspot Interactive Markers */}
                <div 
                  onClick={() => setActiveDiagCard('oilLevel')}
                  className="absolute left-[20%] top-[45%] cursor-pointer group"
                  title="Engine & Oil Level"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping absolute" />
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white relative z-10 shadow-[0_0_12px_#ef4444]" />
                </div>

                <div 
                  onClick={() => setActiveDiagCard('brakePads')}
                  className="absolute left-[30%] bottom-[20%] cursor-pointer group"
                  title="Front Brembo Brakes"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500 animate-ping absolute" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white relative z-10 shadow-[0_0_12px_#f59e0b]" />
                </div>

                <div 
                  onClick={() => setActiveDiagCard('steering')}
                  className="absolute left-[44%] top-[30%] cursor-pointer group"
                  title="Cockpit & Steering Rack"
                >
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-ping absolute" />
                  <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white relative z-10 shadow-[0_0_15px_#ef4444]" />
                </div>
              </div>

              {/* ── C. THREE TELEMETRY DIAGNOSTIC CARDS (Matching Screenshot Bottom Strip) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                
                {/* 1. Oil Level Card */}
                <div
                  onClick={() => setActiveDiagCard('oilLevel')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    activeDiagCard === 'oilLevel'
                      ? 'bg-[#181a28] border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                      : 'bg-[#12141e]/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">
                      🛢️
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{diagnostics.oilLevel.label}</h4>
                      <p className="text-[11px] text-gray-400">{diagnostics.oilLevel.category} • <span className="text-emerald-400 font-bold">{diagnostics.oilLevel.status}</span></p>
                    </div>
                  </div>
                  {/* Indicator Bar */}
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-3">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${diagnostics.oilLevel.score}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                    <span>Level: {diagnostics.oilLevel.score}%</span>
                    <span className="text-emerald-400 font-bold">Optimal</span>
                  </div>
                </div>

                {/* 2. Brake Pads Card */}
                <div
                  onClick={() => setActiveDiagCard('brakePads')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    activeDiagCard === 'brakePads'
                      ? 'bg-[#181a28] border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                      : 'bg-[#12141e]/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
                      🛑
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{diagnostics.brakePads.label}</h4>
                      <p className="text-[11px] text-gray-400">{diagnostics.brakePads.category} • <span className="text-amber-400 font-bold">{diagnostics.brakePads.status}</span></p>
                    </div>
                  </div>
                  {/* Indicator Bar */}
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-3">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${diagnostics.brakePads.score}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                    <span>Wear: {diagnostics.brakePads.score}%</span>
                    <span className="text-amber-400 font-bold">Inspect Soon</span>
                  </div>
                </div>

                {/* 3. Steering Card (Highlighted/Selected by default as in screenshot) */}
                <div
                  onClick={() => setActiveDiagCard('steering')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    activeDiagCard === 'steering'
                      ? 'bg-gradient-to-br from-[#2a1b54] to-[#1e133d] border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.4)] text-white'
                      : 'bg-[#12141e]/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/30 text-indigo-300 flex items-center justify-center text-lg shadow-inner">
                      ⚙️
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{diagnostics.steering.label}</h4>
                      <p className="text-[11px] text-indigo-200">{diagnostics.steering.category} • <span className="text-red-400 font-bold">{diagnostics.steering.status}</span></p>
                    </div>
                  </div>
                  {/* Slider Toggle Dots from Screenshot */}
                  <div className="flex items-center gap-2 mt-3 pt-1">
                    <div className="flex-1 bg-white/20 h-1 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                    </div>
                    <div className="w-3 h-3 rounded-full border border-white/40" />
                  </div>
                  <div className="flex justify-between text-[10px] text-indigo-200 mt-1 font-mono">
                    <span className="text-red-400 font-bold">Action Required</span>
                    <span>Service Order #408</span>
                  </div>
                </div>

              </div>

            </div>

          </section>

          {/* ── RIGHT 4 COLUMNS: Service Required & Service Schedule (Directly Matching Screenshot) ── */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* ── A. SERVICE REQUIRED (Directly Matching Screenshot) ── */}
            <div className="bg-[#10121a]/90 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  Service Required
                </h3>
                <span className="text-gray-400 font-black text-lg tracking-widest cursor-pointer hover:text-white">•••</span>
              </div>

              {/* Connected Vertical Timeline */}
              <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10">
                
                {/* Step 1: Center Care */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-lg z-10 shrink-0">
                    👨‍🔧
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">Center Care</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span>Price: <strong className="text-white">৳4,800</strong></span>
                      <span>•</span>
                      <span>Processing: <strong className="text-white">1 hours</strong></span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Diagnostics */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-lg z-10 shrink-0">
                    🔧
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">Diagnostics</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span>Price: <strong className="text-white">৳7,800</strong></span>
                      <span>•</span>
                      <span>Processing: <strong className="text-white">2 hours</strong></span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Inner Cleaning */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-lg z-10 shrink-0">
                    🚗
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">Inner Cleaning & Fluid Flush</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span>Price: <strong className="text-white">৳12,700</strong></span>
                      <span>•</span>
                      <span>Processing: <strong className="text-white">1 hours</strong></span>
                    </div>
                  </div>
                </div>

              </div>

              {/* View Service History Link */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <button
                  onClick={() => setActiveNavTab('bookings')}
                  className="text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 transition-colors"
                >
                  View Service History &gt;
                </button>
              </div>
            </div>

            {/* ── B. SERVICE SCHEDULE (Directly Matching Screenshot) ── */}
            <div className="bg-[#10121a]/90 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  Service Schedule
                </h3>
                <span className="text-gray-400 font-black text-lg tracking-widest cursor-pointer hover:text-white">•••</span>
              </div>

              <div className="space-y-3.5">
                
                {/* Active Highlighted Schedule Card (Blue Card from Screenshot) */}
                <div className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center mt-0.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm leading-snug">
                        Upgrade your favorite car periodically
                      </h4>
                      <div className="flex items-center justify-between text-xs text-blue-100 mt-3 font-semibold">
                        <span>Today, 10.00</span>
                        <span>Fix Price: ৳120,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Schedule Card */}
                <div className="bg-[#141622] border border-white/10 p-5 rounded-2xl hover:border-white/20 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-gray-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-200 leading-snug">
                        Buy spare parts for suspension
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
                        <span>Today, 14.00</span>
                        <span className="text-white font-bold">Fix Price: ৳41,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live SOS Alert Tile if any Roadside Emergency is active */}
                {roadsideAlerts.length > 0 && (
                  <div className="bg-red-950/70 border border-red-600/60 p-4 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase text-red-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        🚨 EMERGENCY SOS ALERT
                      </span>
                      <span className="text-[10px] text-gray-400">{roadsideAlerts[0].time}</span>
                    </div>
                    <p className="text-xs text-white font-bold">{roadsideAlerts[0].customerName} • {roadsideAlerts[0].vehicle}</p>
                    <p className="text-[11px] text-red-300 mt-0.5 truncate">{roadsideAlerts[0].issueDescription}</p>
                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-red-500/30">
                      <button
                        onClick={() => setShowCallModal(roadsideAlerts[0])}
                        className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg"
                      >
                        📞 Call
                      </button>
                      <button
                        onClick={() => setSelectedBooking(roadsideAlerts[0])}
                        className="text-xs font-black text-white bg-red-600 hover:bg-red-700 px-3.5 py-1.5 rounded-lg shadow"
                      >
                        Dispatch Unit
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </aside>

        </div>

      </div>

      {/* ─── MODAL: Full Emergency GPS Radar Map (Leaflet) ─── */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#12141c] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl relative">
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>🛰️ Live Emergency GPS Radar</span>
                <span className="text-xs font-black bg-red-600 text-white px-2.5 py-0.5 rounded-full animate-pulse">LIVE</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Real-time tracking of your workshop hub, roadside breakdown SOS requests, and doorstep dispatches.
              </p>
            </div>

            <div className="h-[460px] rounded-2xl overflow-hidden border border-white/15 shadow-inner">
              <MapContainer
                center={[currentWorkshop.lat || 23.7925, currentWorkshop.lng || 90.4150]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {/* Workshop Base Pin */}
                <Marker position={[currentWorkshop.lat, currentWorkshop.lng]} icon={workshopIcon}>
                  <Popup>
                    <div className="text-black p-2 font-['Outfit']">
                      <strong className="text-sm font-black text-red-600 block">{currentWorkshop.workshopName}</strong>
                      <p className="text-xs text-gray-800 mt-0.5">{currentWorkshop.address}</p>
                      <p className="text-xs text-emerald-600 font-bold mt-1">🏭 Base Workshop</p>
                    </div>
                  </Popup>
                </Marker>

                {/* Roadside SOS Pins */}
                {roadsideAlerts.map((b, i) => (
                  <Marker key={b.id} position={[currentWorkshop.lat + (i === 0 ? 0.003 : -0.003), currentWorkshop.lng + (i === 0 ? 0.004 : -0.003)]} icon={emergencyRoadsideIcon}>
                    <Popup>
                      <div className="text-black p-2 font-['Outfit']">
                        <strong className="text-xs font-black text-red-600 block">🚨 ROADSIDE BREAKDOWN</strong>
                        <p className="font-bold text-xs text-gray-900 mt-1">{b.customerName} ({b.customerPhone})</p>
                        <p className="text-xs text-gray-700">{b.vehicle}</p>
                        <p className="text-xs text-red-600 font-bold">{b.serviceName}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Home Service Pins */}
                {homeAlerts.map((b, i) => (
                  <Marker key={b.id} position={[currentWorkshop.lat + (i === 0 ? -0.004 : 0.005), currentWorkshop.lng + (i === 0 ? 0.003 : -0.004)]} icon={emergencyHomeIcon}>
                    <Popup>
                      <div className="text-black p-2 font-['Outfit']">
                        <strong className="text-xs font-black text-amber-600 block">🏠 DOORSTEP DISPATCH</strong>
                        <p className="font-bold text-xs text-gray-900 mt-1">{b.customerName}</p>
                        <p className="text-xs text-gray-700">{b.vehicle}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowMapModal(false)}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Close Radar Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: Simulate Call Customer ─── */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141622] border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-2xl animate-bounce">
              📞
            </div>
            <h4 className="text-xl font-black text-white">Calling Customer</h4>
            <p className="text-emerald-400 font-black text-lg mt-1">{showCallModal.customerPhone}</p>
            <p className="text-gray-200 text-sm font-bold mt-1">{showCallModal.customerName}</p>
            <p className="text-xs text-gray-400 mt-3">Connecting workshop hotline to customer...</p>
            <button
              onClick={() => setShowCallModal(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* ─── MODAL: Dispatch / Booking Details ─── */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141622] border border-white/20 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-lg font-bold"
            >
              ✕
            </button>
            <span className="text-xs font-black uppercase text-red-400 tracking-wider">
              {selectedBooking.type.replace('_', ' ')}
            </span>
            <h3 className="text-2xl font-black text-white mt-1">{selectedBooking.serviceName}</h3>
            <p className="text-sm text-gray-300 mt-1 font-semibold">{selectedBooking.customerName} • {selectedBooking.customerPhone}</p>
            
            <div className="my-5 space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Vehicle</span>
                <span className="text-white font-bold">{selectedBooking.vehicle} ({selectedBooking.regNumber})</span>
              </div>
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Issue Description</span>
                <span className="text-gray-200">{selectedBooking.issueDescription}</span>
              </div>
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="text-white font-bold">{selectedBooking.location}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Unit dispatched to ${selectedBooking.location} for ${selectedBooking.customerName}!`);
                  setSelectedBooking(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-lg"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

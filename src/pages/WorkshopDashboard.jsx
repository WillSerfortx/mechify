import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WORKSHOP_DEMO_ACCOUNTS } from '../data/workshopAccounts';

// Custom Map Markers
const workshopIcon = new L.DivIcon({
  html: '<div style="font-size: 36px; text-align: center; margin-top: -18px; margin-left: -18px; filter: drop-shadow(0 0 16px rgba(220,38,38,0.9));">🏭</div>',
  className: 'custom-icon',
  iconSize: [36, 36]
});

const emergencyRoadsideIcon = new L.DivIcon({
  html: '<div style="font-size: 34px; text-align: center; margin-top: -17px; margin-left: -17px; filter: drop-shadow(0 0 18px rgba(239,68,68,1)); animation: pulse 1s infinite;">🚨</div>',
  className: 'custom-icon',
  iconSize: [34, 34]
});

const emergencyHomeIcon = new L.DivIcon({
  html: '<div style="font-size: 34px; text-align: center; margin-top: -17px; margin-left: -17px; filter: drop-shadow(0 0 18px rgba(245,158,11,1));">🏠</div>',
  className: 'custom-icon',
  iconSize: [34, 34]
});

export default function WorkshopDashboard() {
  const navigate = useNavigate();

  // Find currently logged-in user or default to workshop 1 (Tony Stark - Mechify Premier Hub)
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

  // Current active workshop profile
  const currentWorkshop = useMemo(() => {
    return WORKSHOP_DEMO_ACCOUNTS.find(a => a.id === selectedAccountId) || WORKSHOP_DEMO_ACCOUNTS[0];
  }, [selectedAccountId]);

  // Manage bookings state locally so workshop owners can interact
  const [bookingsState, setBookingsState] = useState(() => currentWorkshop.bookings);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [emergencyReady, setEmergencyReady] = useState(true);
  const [selectedMechanicForAssign, setSelectedMechanicForAssign] = useState('');
  const [showCallModal, setShowCallModal] = useState(null);
  const [activeViewMode, setActiveViewMode] = useState('cards');

  // Update bookings when workshop account changes
  useEffect(() => {
    setBookingsState(currentWorkshop.bookings);
    setSelectedBooking(null);
  }, [currentWorkshop]);

  // Save current workshop to storage as logged in
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

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookingsState.filter(b => {
      const matchesTab = activeTab === 'all' || b.type === activeTab;
      const matchesSearch =
        b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [bookingsState, activeTab, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    const roadside = bookingsState.filter(b => b.type === 'emergency_roadside').length;
    const home = bookingsState.filter(b => b.type === 'emergency_home').length;
    const bay = bookingsState.filter(b => b.type === 'workshop_bay').length;
    const revenue = bookingsState.reduce((sum, b) => sum + (b.priceEstimate || 0), 0);
    return { roadside, home, bay, total: bookingsState.length, revenue };
  }, [bookingsState]);

  // Handlers for booking actions
  const handleUpdateStatus = (bookingId, newStatus, assignedMech = null) => {
    setBookingsState(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: newStatus,
          assignedMechanic: assignedMech || b.assignedMechanic
        };
      }
      return b;
    }));
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(prev => ({
        ...prev,
        status: newStatus,
        assignedMechanic: assignedMech || prev.assignedMechanic
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    navigate('/auth');
  };

  return (
    <div className="bg-[#0b0c10] min-h-screen text-white font-['Outfit',sans-serif] selection:bg-red-600 selection:text-white pb-24">
      
      {/* ─── Top Sticky Control Bar ─── */}
      <header className="sticky top-0 z-40 bg-[#12141c]/95 backdrop-blur-2xl border-b border-white/10 px-6 sm:px-12 py-4 shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-5">
          
          {/* Logo & Portal Branding */}
          <div className="flex items-center gap-5">
            <Link to="/home" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-2xl text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-transform group-hover:scale-105">
                M
              </div>
              <div className="leading-tight">
                <span className="font-black text-xl tracking-wider text-white">MECHIFY</span>
                <span className="block text-xs text-red-500 font-bold uppercase tracking-widest mt-0.5">Workshop Portal</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2.5 pl-5 border-l border-white/15">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-sm text-emerald-400 font-bold tracking-wide">LIVE DISPATCH ACTIVE</span>
            </div>
          </div>

          {/* Quick 30-Account Switcher & SOS Readiness */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-white/5 border border-white/20 rounded-2xl px-4 py-2.5 focus-within:border-red-500 transition-all shadow-inner">
              <span className="text-sm text-gray-300 font-bold mr-3 hidden sm:inline">Active Workshop:</span>
              <select
                value={selectedAccountId}
                onChange={(e) => handleSwitchAccount(e.target.value)}
                className="bg-transparent text-white text-sm sm:text-base font-bold focus:outline-none cursor-pointer pr-2 max-w-[260px] sm:max-w-[380px]"
              >
                {WORKSHOP_DEMO_ACCOUNTS.map((acc, index) => (
                  <option key={acc.id} value={acc.id} className="bg-[#1a1d29] text-white py-1">
                    #{index + 1} {acc.workshopName} ({acc.ownerName} - pass: 123)
                  </option>
                ))}
              </select>
            </div>

            {/* 24/7 Rapid Emergency Readiness Switch */}
            <button
              onClick={() => setEmergencyReady(!emergencyReady)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all flex items-center gap-2.5 border shadow-lg ${
                emergencyReady
                  ? 'bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                  : 'bg-gray-800 border-gray-700 text-gray-400'
              }`}
              title="Toggle emergency dispatch broadcast receiver"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${emergencyReady ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
              <span>{emergencyReady ? '24/7 SOS Radar: ON' : 'SOS Radar: PAUSED'}</span>
            </button>

            {/* Sign Out */}
            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
              title="Sign out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Workshop Profile Header ─── */}
      <section className="bg-gradient-to-b from-[#181b26] to-[#0b0c10] border-b border-white/10 px-6 sm:px-12 py-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Owner & Facility Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <div className="relative shrink-0">
                <img
                  src={currentWorkshop.avatar}
                  alt={currentWorkshop.ownerName}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-3 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.45)]"
                />
                <span className="absolute -bottom-2 -right-2 bg-red-600 text-xs font-black uppercase px-3 py-1 rounded-lg text-white shadow-lg tracking-wider">
                  OWNER
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    {currentWorkshop.workshopName}
                  </h1>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    VERIFIED MECHIFY HUB
                  </span>
                </div>

                <p className="text-gray-300 text-base sm:text-lg flex flex-wrap items-center gap-3 font-medium mt-1">
                  <span>👤 <strong className="text-white font-bold">{currentWorkshop.ownerName}</strong></span>
                  <span className="text-gray-600">•</span>
                  <span>📍 {currentWorkshop.address}</span>
                  <span className="text-gray-600">•</span>
                  <span>⭐ <strong className="text-amber-400 font-black">{currentWorkshop.rating}</strong> ({currentWorkshop.reviews} reviews)</span>
                  <span className="text-gray-600">•</span>
                  <span>📞 <strong className="text-white">{currentWorkshop.phone}</strong></span>
                </p>

                <div className="flex flex-wrap items-center gap-3.5 mt-4">
                  <span className="text-sm bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-xl text-gray-200">
                    Bays: <strong className="text-white font-black">{currentWorkshop.occupiedBays}/{currentWorkshop.bays} Occupied</strong>
                  </span>
                  <span className="text-sm bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-xl text-gray-200">
                    Mechanics On Duty: <strong className="text-emerald-400 font-black">{currentWorkshop.mechanics.length} Specialists</strong>
                  </span>
                  <span className="text-sm bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-xl text-gray-200">
                    Account: <code className="text-red-400 font-black">{currentWorkshop.email}</code> (Pass: <strong className="text-white">123</strong>)
                  </span>
                </div>
              </div>
            </div>

            {/* Switch between Cards and Map */}
            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
              <button
                onClick={() => setActiveViewMode(activeViewMode === 'cards' ? 'map' : 'cards')}
                className={`px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base border transition-all flex items-center gap-2.5 shadow-xl ${
                  activeViewMode === 'map'
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_25px_rgba(220,38,38,0.5)]'
                    : 'bg-white/10 border-white/20 text-gray-100 hover:bg-white/20'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {activeViewMode === 'map' ? 'Show Booking List' : 'Live Emergency GPS Map'}
              </button>
            </div>
          </div>

          {/* ─── 4 Primary Metric KPI Cards ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            
            {/* Stat 1: Emergency Roadside SOS */}
            <div 
              onClick={() => setActiveTab('emergency_roadside')}
              className={`p-6 sm:p-7 rounded-3xl border cursor-pointer transition-all duration-300 ${
                activeTab === 'emergency_roadside'
                  ? 'bg-red-950/60 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.35)] scale-102 ring-2 ring-red-500/50'
                  : 'bg-white/5 border-white/15 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-black uppercase tracking-wider text-red-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  🚨 Emergency Roadside
                </span>
                <span className="text-xs bg-red-600/40 text-red-300 font-black px-3 py-1 rounded-full border border-red-500/40">
                  SOS CALLS
                </span>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">{counts.roadside}</div>
              <p className="text-sm text-gray-400 mt-2 font-medium">Active breakdown alerts on road</p>
            </div>

            {/* Stat 2: Emergency Home Service */}
            <div 
              onClick={() => setActiveTab('emergency_home')}
              className={`p-6 sm:p-7 rounded-3xl border cursor-pointer transition-all duration-300 ${
                activeTab === 'emergency_home'
                  ? 'bg-amber-950/60 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.35)] scale-102 ring-2 ring-amber-500/50'
                  : 'bg-white/5 border-white/15 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  🏠 Emergency Home Service
                </span>
                <span className="text-xs bg-amber-600/40 text-amber-300 font-black px-3 py-1 rounded-full border border-amber-500/40">
                  DOORSTEP
                </span>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">{counts.home}</div>
              <p className="text-sm text-gray-400 mt-2 font-medium">Mechanic sent to customer residence</p>
            </div>

            {/* Stat 3: Workshop Bay Bookings */}
            <div 
              onClick={() => setActiveTab('workshop_bay')}
              className={`p-6 sm:p-7 rounded-3xl border cursor-pointer transition-all duration-300 ${
                activeTab === 'workshop_bay'
                  ? 'bg-cyan-950/60 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.35)] scale-102 ring-2 ring-cyan-500/50'
                  : 'bg-white/5 border-white/15 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  🛠️ Workshop Bay Bookings
                </span>
                <span className="text-xs bg-cyan-600/40 text-cyan-300 font-black px-3 py-1 rounded-full border border-cyan-500/40">
                  BAY RESERVED
                </span>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">{counts.bay}</div>
              <p className="text-sm text-gray-400 mt-2 font-medium">Scheduled bay maintenance & diagnostics</p>
            </div>

            {/* Stat 4: Estimated Pipeline Revenue */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/15">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-black uppercase tracking-wider text-emerald-400">
                  💰 Pipeline Revenue
                </span>
                <span className="text-xs bg-emerald-600/40 text-emerald-300 font-black px-3 py-1 rounded-full border border-emerald-500/40">
                  BDT ৳
                </span>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                ৳{counts.revenue.toLocaleString()}
              </div>
              <p className="text-sm text-gray-400 mt-2 font-medium">Estimated gross across all {counts.total} jobs</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content Area ─── */}
      <main className="max-w-[1600px] mx-auto px-6 sm:px-12 py-10">
        
        {/* Active View Mode: Map View */}
        {activeViewMode === 'map' && (
          <div className="bg-[#12141c] border border-white/15 rounded-3xl p-7 shadow-2xl mb-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <span>🛰️ Live Emergency GPS Radar (Dhaka)</span>
                  <span className="text-xs font-black bg-red-600 text-white px-3 py-1 rounded-full animate-pulse">LIVE FEED</span>
                </h3>
                <p className="text-sm text-gray-400 mt-1">Interactive map pins for your workshop hub, roadside SOS incidents, and home doorstep dispatches.</p>
              </div>
              <button
                onClick={() => setActiveViewMode('cards')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Back to Booking Cards
              </button>
            </div>

            <div className="h-[560px] rounded-3xl overflow-hidden border border-white/15 shadow-inner">
              <MapContainer
                center={[currentWorkshop.lat || 23.7925, currentWorkshop.lng || 90.4150]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {/* Workshop Pin */}
                <Marker position={[currentWorkshop.lat, currentWorkshop.lng]} icon={workshopIcon}>
                  <Popup>
                    <div className="text-black p-2 font-['Outfit']">
                      <strong className="text-base font-black text-red-600 block">{currentWorkshop.workshopName}</strong>
                      <p className="text-xs text-gray-800 mt-1 font-semibold">{currentWorkshop.address}</p>
                      <p className="text-xs text-emerald-600 font-bold mt-1">🏭 Workshop Hub Base</p>
                    </div>
                  </Popup>
                </Marker>

                {/* Roadside Emergency Pins */}
                {bookingsState.filter(b => b.type === 'emergency_roadside').map((b, i) => (
                  <Marker key={b.id} position={[currentWorkshop.lat + (i === 0 ? 0.003 : -0.003), currentWorkshop.lng + (i === 0 ? 0.004 : -0.003)]} icon={emergencyRoadsideIcon}>
                    <Popup>
                      <div className="text-black p-2 font-['Outfit']">
                        <strong className="text-xs font-black text-red-600 uppercase block">🚨 EMERGENCY ROADSIDE SOS</strong>
                        <p className="font-bold text-sm text-gray-900 mt-1">{b.customerName} ({b.customerPhone})</p>
                        <p className="text-xs text-gray-700 font-semibold">Vehicle: {b.vehicle}</p>
                        <p className="text-xs text-red-600 font-bold">{b.serviceName}</p>
                        <p className="text-xs text-gray-500 mt-1">{b.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Home Service Pins */}
                {bookingsState.filter(b => b.type === 'emergency_home').map((b, i) => (
                  <Marker key={b.id} position={[currentWorkshop.lat + (i === 0 ? -0.004 : 0.005), currentWorkshop.lng + (i === 0 ? 0.003 : -0.004)]} icon={emergencyHomeIcon}>
                    <Popup>
                      <div className="text-black p-2 font-['Outfit']">
                        <strong className="text-xs font-black text-amber-600 uppercase block">🏠 EMERGENCY HOME DISPATCH</strong>
                        <p className="font-bold text-sm text-gray-900 mt-1">{b.customerName} ({b.customerPhone})</p>
                        <p className="text-xs text-gray-700 font-semibold">Vehicle: {b.vehicle}</p>
                        <p className="text-xs text-amber-600 font-bold">{b.serviceName}</p>
                        <p className="text-xs text-gray-500 mt-1">{b.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        )}

        {/* Filter Navigation Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Bookings', count: counts.total },
              { id: 'emergency_roadside', label: '🚨 Emergency Roadside', count: counts.roadside },
              { id: 'emergency_home', label: '🏠 Emergency Home Service', count: counts.home },
              { id: 'workshop_bay', label: '🛠️ Workshop Bay Appointments', count: counts.bay },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 sm:px-6 py-3.5 rounded-2xl text-sm sm:text-base font-black whitespace-nowrap transition-all flex items-center gap-2.5 border shadow-md ${
                  activeTab === tab.id
                    ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.25)] scale-102'
                    : 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                  activeTab === tab.id ? 'bg-black text-white' : 'bg-white/15 text-gray-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer, car, or fault..."
              className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-3.5 pl-12 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors shadow-inner"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* ─── Bookings Cards Grid ─── */}
        {filteredBookings.length === 0 ? (
          <div className="bg-[#12141c] border border-white/15 rounded-3xl p-16 text-center my-8">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto text-4xl mb-5">
              🔍
            </div>
            <h3 className="text-2xl font-black text-white mb-2">No Active Bookings in this Category</h3>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-6">
              There are currently no customer bookings matching "{activeTab}". Select another tab or pick another workshop from the dropdown above to test other demo scenarios!
            </p>
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-base font-black transition-colors shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {filteredBookings.map((b) => {
              const isRoadside = b.type === 'emergency_roadside';
              const isHome = b.type === 'emergency_home';

              return (
                <div
                  key={b.id}
                  className={`bg-[#12141c] border rounded-3xl p-7 sm:p-8 transition-all duration-300 relative overflow-hidden group hover:border-white/40 shadow-2xl ${
                    isRoadside
                      ? 'border-red-600/50 hover:shadow-[0_0_35px_rgba(220,38,38,0.25)]'
                      : isHome
                      ? 'border-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]'
                      : 'border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]'
                  }`}
                >
                  {/* Category Banner Ribbon */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-xs sm:text-sm font-black uppercase tracking-wider px-4 py-1.5 rounded-full border flex items-center gap-2 ${
                        isRoadside
                          ? 'bg-red-950 text-red-300 border-red-500 shadow-md'
                          : isHome
                          ? 'bg-amber-950 text-amber-300 border-amber-500 shadow-md'
                          : 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-md'
                      }`}
                    >
                      {isRoadside && <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />}
                      {isRoadside ? '🚨 EMERGENCY ROADSIDE SERVICE' : isHome ? '🏠 EMERGENCY HOME SERVICE' : '🛠️ WORKSHOP BAY APPOINTMENT'}
                    </span>

                    <span className="text-sm text-gray-400 font-bold">
                      ⏱️ {b.time}
                    </span>
                  </div>

                  {/* Header: Service Title & Estimated Price */}
                  <div className="flex items-start justify-between gap-5 mb-4">
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                        {b.serviceName}
                      </h4>
                      <p className="text-base sm:text-lg font-bold text-gray-300 mt-1">
                        Vehicle: <span className="text-white font-black">{b.vehicle}</span> ({b.regNumber})
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                        ৳{b.priceEstimate?.toLocaleString()}
                      </div>
                      <span className={`text-xs font-black px-3 py-1 rounded-full uppercase mt-1 inline-block ${
                        b.paymentStatus === 'Paid' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}>
                        {b.paymentStatus} via {b.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Issue description box */}
                  <div className="bg-white/5 rounded-2xl p-5 mb-5 border border-white/10 text-sm sm:text-base text-gray-200 leading-relaxed shadow-inner">
                    <strong className="text-white font-bold block mb-1">Issue Reported by Customer:</strong>
                    {b.issueDescription}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm sm:text-base text-gray-300 mb-6">
                    <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3.5 border border-white/5">
                      <span className="text-2xl">👤</span>
                      <div>
                        <span className="text-gray-400 block text-xs uppercase font-bold">Customer</span>
                        <strong className="text-white font-bold text-base">{b.customerName}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3.5 border border-white/5">
                      <span className="text-2xl">📍</span>
                      <div className="truncate">
                        <span className="text-gray-400 block text-xs uppercase font-bold">Location ({b.distance || 'On-site'})</span>
                        <span className="text-white font-semibold text-sm truncate block">{b.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3.5 border border-white/5">
                      <span className="text-2xl">🔧</span>
                      <div>
                        <span className="text-gray-400 block text-xs uppercase font-bold">Assigned Specialist</span>
                        <strong className={`text-base ${b.assignedMechanic === 'Unassigned' ? 'text-amber-400 font-black' : 'text-white font-bold'}`}>
                          {b.assignedMechanic}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3.5 border border-white/5">
                      <span className="text-2xl">📊</span>
                      <div>
                        <span className="text-gray-400 block text-xs uppercase font-bold">Current Status</span>
                        <strong className={`text-base uppercase font-black ${
                          b.status === 'Completed'
                            ? 'text-emerald-400'
                            : b.status === 'In Progress' || b.status === 'Mechanic En Route'
                            ? 'text-blue-400'
                            : 'text-amber-400'
                        }`}>
                          {b.status}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
                    
                    {/* Call Customer Button */}
                    <button
                      onClick={() => setShowCallModal(b)}
                      className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-sm transition-all flex items-center gap-2 border border-white/15 shadow-sm active:scale-95"
                    >
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call: {b.customerPhone}
                    </button>

                    {/* Operational Action Buttons */}
                    <div className="flex items-center gap-3">
                      
                      {b.status === 'Pending Acceptance' && (
                        <button
                          onClick={() => {
                            const firstFreeMech = currentWorkshop.mechanics.find(m => m.status === 'Available')?.name || currentWorkshop.mechanics[0].name;
                            handleUpdateStatus(b.id, isRoadside ? 'Assigned' : isHome ? 'Mechanic En Route' : 'Confirmed', firstFreeMech);
                          }}
                          className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95"
                        >
                          {isRoadside ? '🚨 Dispatch Emergency Unit' : isHome ? '🏠 Dispatch Home Mechanic' : 'Accept Bay Booking'}
                        </button>
                      )}

                      {b.status !== 'Completed' && b.status !== 'Pending Acceptance' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'Completed')}
                          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95"
                        >
                          ✓ Mark Resolved & Done
                        </button>
                      )}

                      {b.status === 'Completed' && (
                        <span className="text-emerald-400 font-black text-sm flex items-center gap-1.5 bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-500/30">
                          ✓ Completed Successfully
                        </span>
                      )}

                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                        title="View Full Booking Details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── Workshop Mechanics Roster ─── */}
        <section className="mt-14 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                <span>👨‍🔧 Workshop Mechanics on Duty</span>
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-gray-200 font-bold border border-white/15">
                  {currentWorkshop.mechanics.length} Active Specialists
                </span>
              </h3>
              <p className="text-base text-gray-400 mt-1">Available technicians stationed for emergency dispatch and scheduled repair bays.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentWorkshop.mechanics.map(m => (
              <div key={m.id} className="bg-[#12141c] border border-white/15 rounded-3xl p-5 flex items-center justify-between shadow-xl">
                <div>
                  <h5 className="font-black text-base sm:text-lg text-white">{m.name}</h5>
                  <p className="text-sm text-red-400 font-bold mt-0.5">{m.specialization}</p>
                  <p className="text-xs text-gray-400 mt-1">Experience: <strong className="text-white">{m.experience}</strong></p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-black px-3 py-1 rounded-full uppercase block mb-2 ${
                    m.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400 animate-pulse border border-red-500/40'
                  }`}>
                    {m.status}
                  </span>
                  <a href={`tel:${m.phone}`} className="inline-block text-xs bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-xl transition-colors">
                    📞 Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ─── Detailed Booking Inspection Modal ─── */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#161924] border border-white/20 rounded-3xl p-8 sm:p-10 max-w-2xl w-full shadow-2xl relative animate-fadeIn">
            
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs sm:text-sm font-black uppercase tracking-wider px-4 py-1.5 rounded-full border ${
                selectedBooking.type === 'emergency_roadside'
                  ? 'bg-red-950 text-red-300 border-red-500'
                  : selectedBooking.type === 'emergency_home'
                  ? 'bg-amber-950 text-amber-300 border-amber-500'
                  : 'bg-cyan-950 text-cyan-300 border-cyan-500'
              }`}>
                {selectedBooking.type.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-sm text-gray-400 font-mono">ID: {selectedBooking.id}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">{selectedBooking.serviceName}</h3>
            <p className="text-base text-gray-300 mb-6 font-medium">Customer: <strong className="text-white font-bold">{selectedBooking.customerName}</strong> ({selectedBooking.customerPhone})</p>

            <div className="space-y-5 text-sm sm:text-base">
              <div className="bg-black/50 rounded-2xl p-5 border border-white/10">
                <span className="text-gray-400 uppercase text-xs font-black block mb-1">Issue Description</span>
                <p className="text-white leading-relaxed">{selectedBooking.issueDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 rounded-2xl p-4 border border-white/10">
                  <span className="text-gray-400 uppercase text-xs font-black block mb-1">Vehicle</span>
                  <span className="text-white font-black text-base">{selectedBooking.vehicle}</span>
                  <span className="text-gray-400 block text-xs mt-0.5">{selectedBooking.regNumber}</span>
                </div>

                <div className="bg-black/50 rounded-2xl p-4 border border-white/10">
                  <span className="text-gray-400 uppercase text-xs font-black block mb-1">Dispatch Location</span>
                  <span className="text-white font-bold text-base">{selectedBooking.location}</span>
                  <span className="text-red-400 block text-xs mt-0.5 font-bold">{selectedBooking.distance || 'Direct to bay'}</span>
                </div>
              </div>

              {/* Re-assign mechanic */}
              <div className="bg-black/50 rounded-2xl p-5 border border-white/10">
                <span className="text-gray-400 uppercase text-xs font-black block mb-2">Assign or Re-assign Specialist</span>
                <div className="flex gap-3">
                  <select
                    value={selectedMechanicForAssign || selectedBooking.assignedMechanic}
                    onChange={(e) => setSelectedMechanicForAssign(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm font-bold focus:outline-none cursor-pointer"
                  >
                    {currentWorkshop.mechanics.map(m => (
                      <option key={m.id} value={m.name} className="bg-[#1a1d29] text-white py-1">
                        {m.name} ({m.specialization}) - {m.status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (selectedMechanicForAssign) {
                        handleUpdateStatus(selectedBooking.id, selectedBooking.status, selectedMechanicForAssign);
                        alert(`Specialist ${selectedMechanicForAssign} assigned!`);
                      }
                    }}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-xl transition-colors shadow-md"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3.5">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors"
              >
                Close
              </button>
              {selectedBooking.status !== 'Completed' && (
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedBooking.id, 'Completed');
                    setSelectedBooking(null);
                  }}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black transition-colors shadow-lg"
                >
                  ✓ Mark Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Simulate Call Customer Modal ─── */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#161924] border border-white/20 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl animate-scaleUp">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-5 text-3xl animate-bounce">
              📞
            </div>
            <h4 className="text-2xl font-black text-white">Calling Customer</h4>
            <p className="text-emerald-400 font-black text-xl mt-2">{showCallModal.customerPhone}</p>
            <p className="text-gray-200 text-base font-bold mt-1">{showCallModal.customerName}</p>
            <p className="text-sm text-gray-400 mt-4">Connecting workshop hotline to customer phone...</p>
            
            <button
              onClick={() => setShowCallModal(null)}
              className="mt-7 w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-base transition-colors shadow-xl"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

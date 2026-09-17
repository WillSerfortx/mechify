import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WORKSHOP_DEMO_ACCOUNTS } from '../data/workshopAccounts';

// Custom Map Markers
const workshopIcon = new L.DivIcon({
  html: '<div style="font-size: 32px; text-align: center; margin-top: -16px; margin-left: -16px; filter: drop-shadow(0 0 12px rgba(220,38,38,0.9));">🏭</div>',
  className: 'custom-icon',
  iconSize: [32, 32]
});

const emergencyRoadsideIcon = new L.DivIcon({
  html: '<div style="font-size: 30px; text-align: center; margin-top: -15px; margin-left: -15px; filter: drop-shadow(0 0 14px rgba(239,68,68,1)); animation: pulse 1s infinite;">🚨</div>',
  className: 'custom-icon',
  iconSize: [30, 30]
});

const emergencyHomeIcon = new L.DivIcon({
  html: '<div style="font-size: 30px; text-align: center; margin-top: -15px; margin-left: -15px; filter: drop-shadow(0 0 14px rgba(245,158,11,1));">🏠</div>',
  className: 'custom-icon',
  iconSize: [30, 30]
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
          a => a.email.toLowerCase() === (u.email || '').toLowerCase()
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

  // Manage bookings state locally so workshop owners can interact (Accept, Dispatch, Complete)
  const [bookingsState, setBookingsState] = useState(() => currentWorkshop.bookings);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'emergency_roadside', 'emergency_home', 'workshop_bay'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [emergencyReady, setEmergencyReady] = useState(true);
  const [selectedMechanicForAssign, setSelectedMechanicForAssign] = useState('');
  const [showCallModal, setShowCallModal] = useState(null);
  const [soundAlertEnabled, setSoundAlertEnabled] = useState(true);
  const [activeViewMode, setActiveViewMode] = useState('cards'); // 'cards' or 'map'

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
    <div className="bg-[#0b0c10] min-h-screen text-white font-['Outfit',sans-serif] selection:bg-red-600 selection:text-white">
      
      {/* ─── Top Sticky Control Navigation Bar ─── */}
      <header className="sticky top-0 z-40 bg-[#12141c]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Hub Identity */}
          <div className="flex items-center gap-4">
            <Link to="/home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-xl text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                M
              </div>
              <div className="leading-tight">
                <span className="font-black text-lg tracking-wider text-white">MECHIFY</span>
                <span className="block text-[10px] text-red-500 font-bold uppercase tracking-widest">Workshop Portal</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs text-emerald-400 font-semibold tracking-wide">LIVE DISPATCH RADAR</span>
            </div>
          </div>

          {/* Quick 30-Account Switcher (Primary Testing Utility) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/5 border border-white/15 rounded-xl px-3 py-1.5 focus-within:border-red-500 transition-all">
              <span className="text-xs text-gray-400 font-medium mr-2 hidden sm:inline">Active Workshop:</span>
              <select
                value={selectedAccountId}
                onChange={(e) => handleSwitchAccount(e.target.value)}
                className="bg-transparent text-white text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer pr-2 max-w-[220px] sm:max-w-[340px]"
              >
                {WORKSHOP_DEMO_ACCOUNTS.map((acc, index) => (
                  <option key={acc.id} value={acc.id} className="bg-[#1a1d29] text-white">
                    #{index + 1} {acc.workshopName} ({acc.ownerName} - pass: 123)
                  </option>
                ))}
              </select>
            </div>

            {/* 24/7 Rapid Emergency Readiness Switch */}
            <button
              onClick={() => setEmergencyReady(!emergencyReady)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                emergencyReady
                  ? 'bg-red-950/70 border-red-500/60 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-gray-800 border-gray-700 text-gray-400'
              }`}
              title="Toggle emergency dispatch broadcast receiver"
            >
              <span className={`w-2 h-2 rounded-full ${emergencyReady ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="hidden md:inline">{emergencyReady ? '24/7 SOS Ready: ON' : 'SOS Radar: PAUSED'}</span>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
              title="Sign out to test another role"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Workshop Profile Header ─── */}
      <section className="bg-gradient-to-b from-[#161924] to-[#0b0c10] border-b border-white/10 px-4 sm:px-8 py-6">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Owner & Facility Info */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={currentWorkshop.avatar}
                  alt={currentWorkshop.ownerName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-red-600/70 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                />
                <span className="absolute -bottom-1 -right-1 bg-red-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md text-white shadow-md">
                  OWNER
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {currentWorkshop.workshopName}
                  </h1>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    VERIFIED MECHIFY HUB
                  </span>
                </div>

                <p className="text-gray-400 text-sm flex flex-wrap items-center gap-3">
                  <span>👤 <strong className="text-gray-200">{currentWorkshop.ownerName}</strong></span>
                  <span className="text-gray-600">•</span>
                  <span>📍 {currentWorkshop.address}</span>
                  <span className="text-gray-600">•</span>
                  <span>⭐ <strong className="text-amber-400">{currentWorkshop.rating}</strong> ({currentWorkshop.reviews} reviews)</span>
                  <span className="text-gray-600">•</span>
                  <span>📞 {currentWorkshop.phone}</span>
                </p>

                <div className="flex items-center gap-4 mt-2.5">
                  <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-gray-300">
                    Bays: <strong className="text-white">{currentWorkshop.occupiedBays}/{currentWorkshop.bays} Occupied</strong>
                  </span>
                  <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-gray-300">
                    Mechanics On Duty: <strong className="text-emerald-400">{currentWorkshop.mechanics.length} Specialists</strong>
                  </span>
                  <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-gray-300">
                    Account: <code className="text-red-400 font-bold">{currentWorkshop.email}</code> (Pass: <strong>123</strong>)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Summary Badges */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                onClick={() => setActiveViewMode(activeViewMode === 'cards' ? 'map' : 'cards')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center gap-2 ${
                  activeViewMode === 'map'
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                    : 'bg-white/10 border-white/15 text-gray-200 hover:bg-white/15'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {activeViewMode === 'map' ? 'Switch to Booking List' : 'Live Emergency GPS Radar'}
              </button>
            </div>
          </div>

          {/* ─── 4 Primary Metric Stat Cards ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            
            {/* Stat 1: Emergency Roadside SOS */}
            <div 
              onClick={() => setActiveTab('emergency_roadside')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeTab === 'emergency_roadside'
                  ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)] scale-102'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  🚨 Emergency Roadside
                </span>
                <span className="text-xs bg-red-600/30 text-red-300 font-black px-2 py-0.5 rounded-full border border-red-500/30">
                  SOS
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">{counts.roadside}</div>
              <p className="text-[11px] text-gray-400 mt-1">Direct roadside breakdown dispatches</p>
            </div>

            {/* Stat 2: Emergency Home Service */}
            <div 
              onClick={() => setActiveTab('emergency_home')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeTab === 'emergency_home'
                  ? 'bg-amber-950/40 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-102'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  🏠 Emergency Home Service
                </span>
                <span className="text-xs bg-amber-600/30 text-amber-300 font-black px-2 py-0.5 rounded-full border border-amber-500/30">
                  Doorstep
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">{counts.home}</div>
              <p className="text-[11px] text-gray-400 mt-1">Mechanic sent to customer's home</p>
            </div>

            {/* Stat 3: Workshop Bay Bookings */}
            <div 
              onClick={() => setActiveTab('workshop_bay')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeTab === 'workshop_bay'
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.25)] scale-102'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  🛠️ Workshop Bay Bookings
                </span>
                <span className="text-xs bg-cyan-600/30 text-cyan-300 font-black px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Bay Res.
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">{counts.bay}</div>
              <p className="text-[11px] text-gray-400 mt-1">Scheduled repairs at facility bays</p>
            </div>

            {/* Stat 4: Estimated Revenue */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                  💰 Pipeline Revenue
                </span>
                <span className="text-xs bg-emerald-600/30 text-emerald-300 font-black px-2 py-0.5 rounded-full border border-emerald-500/30">
                  BDT
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white">
                ৳{counts.revenue.toLocaleString()}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Across all {counts.total} active bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content Section ─── */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-8 py-8">
        
        {/* Active View 1: Map View */}
        {activeViewMode === 'map' ? (
          <div className="bg-[#12141c] border border-white/10 rounded-3xl p-5 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🛰️ Live Emergency GPS Radar</span>
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded-md animate-pulse">LIVE</span>
                </h3>
                <p className="text-xs text-gray-400">Pins reflect your workshop hub and surrounding customer emergency requests in Dhaka.</p>
              </div>
              <button
                onClick={() => setActiveViewMode('cards')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Back to List View
              </button>
            </div>

            <div className="h-[520px] rounded-2xl overflow-hidden border border-white/10">
              <MapContainer
                center={[currentWorkshop.lat || 23.7925, currentWorkshop.lng || 90.4150]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {/* Workshop Pin */}
                <Marker position={[currentWorkshop.lat, currentWorkshop.lng]} icon={workshopIcon}>
                  <Popup>
                    <div className="text-black p-1">
                      <strong className="text-sm font-bold text-red-600">{currentWorkshop.workshopName}</strong>
                      <p className="text-xs text-gray-700 mt-1">{currentWorkshop.address}</p>
                      <p className="text-xs text-emerald-600 font-bold mt-1">Workshop Base Location</p>
                    </div>
                  </Popup>
                </Marker>

                {/* Roadside Emergency Pins */}
                {bookingsState.filter(b => b.type === 'emergency_roadside').map((b, i) => (
                  <Marker key={b.id} position={[currentWorkshop.lat + (i === 0 ? 0.003 : -0.003), currentWorkshop.lng + (i === 0 ? 0.004 : -0.003)]} icon={emergencyRoadsideIcon}>
                    <Popup>
                      <div className="text-black p-1">
                        <strong className="text-xs font-black text-red-600 uppercase">🚨 EMERGENCY ROADSIDE</strong>
                        <p className="font-bold text-sm text-gray-900 mt-1">{b.customerName}</p>
                        <p className="text-xs text-gray-700">Vehicle: {b.vehicle}</p>
                        <p className="text-xs text-red-600 font-semibold">{b.serviceName}</p>
                        <p className="text-xs text-gray-500 mt-1">{b.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Home Service Pins */}
                {bookingsState.filter(b => b.type === 'emergency_home').map((b, i) => (
                  <Marker key={b.id} position={[currentWorkshop.lat + (i === 0 ? -0.004 : 0.005), currentWorkshop.lng + (i === 0 ? 0.003 : -0.004)]} icon={emergencyHomeIcon}>
                    <Popup>
                      <div className="text-black p-1">
                        <strong className="text-xs font-black text-amber-600 uppercase">🏠 EMERGENCY HOME SERVICE</strong>
                        <p className="font-bold text-sm text-gray-900 mt-1">{b.customerName}</p>
                        <p className="text-xs text-gray-700">Vehicle: {b.vehicle}</p>
                        <p className="text-xs text-amber-600 font-semibold">{b.serviceName}</p>
                        <p className="text-xs text-gray-500 mt-1">{b.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        ) : null}

        {/* Filter Navigation Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Requests', icon: '📋', count: counts.total },
              { id: 'emergency_roadside', label: '🚨 Emergency Roadside', count: counts.roadside, color: 'text-red-400' },
              { id: 'emergency_home', label: '🏠 Emergency Home Service', count: counts.home, color: 'text-amber-400' },
              { id: 'workshop_bay', label: '🛠️ Workshop Bay Booking', count: counts.bay, color: 'text-cyan-400' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  activeTab === tab.id
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  activeTab === tab.id ? 'bg-black text-white' : 'bg-white/10 text-gray-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer, vehicle, or issue..."
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* ─── Bookings Grid / List ─── */}
        {filteredBookings.length === 0 ? (
          <div className="bg-[#12141c] border border-white/10 rounded-3xl p-12 text-center my-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-3xl mb-4">
              🔍
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Bookings in this Category</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              There are currently no customer bookings matching "{activeTab}". Select another tab or switch to another workshop account above to test other demo scenarios!
            </p>
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredBookings.map((b) => {
              const isRoadside = b.type === 'emergency_roadside';
              const isHome = b.type === 'emergency_home';
              const isBay = b.type === 'workshop_bay';

              return (
                <div
                  key={b.id}
                  className={`bg-[#12141c] border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover:border-white/30 shadow-xl ${
                    isRoadside
                      ? 'border-red-600/40 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]'
                      : isHome
                      ? 'border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                      : 'border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                  }`}
                >
                  {/* Category Banner Ribbon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                        isRoadside
                          ? 'bg-red-950/80 text-red-300 border-red-500/50'
                          : isHome
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                          : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
                      }`}
                    >
                      {isRoadside && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                      {isRoadside ? '🚨 EMERGENCY ROADSIDE SERVICE' : isHome ? '🏠 EMERGENCY HOME SERVICE' : '🛠️ WORKSHOP BAY APPOINTMENT'}
                    </span>

                    <span className="text-xs text-gray-400 font-medium">
                      ⏱️ {b.time}
                    </span>
                  </div>

                  {/* Customer & Vehicle Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="text-lg font-black text-white group-hover:text-red-400 transition-colors">
                        {b.serviceName}
                      </h4>
                      <p className="text-sm font-semibold text-gray-300 mt-0.5">
                        Vehicle: <span className="text-white">{b.vehicle}</span> ({b.regNumber})
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-emerald-400">
                        ৳{b.priceEstimate?.toLocaleString()}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        b.paymentStatus === 'Paid' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {b.paymentStatus} via {b.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Issue description box */}
                  <div className="bg-white/5 rounded-2xl p-3.5 mb-4 border border-white/5 text-xs text-gray-300 leading-relaxed">
                    <strong className="text-gray-200">Issue Reported: </strong>
                    {b.issueDescription}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-300 mb-5">
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5 border border-white/5">
                      <span className="text-base">👤</span>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Customer</span>
                        <strong className="text-white">{b.customerName}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5 border border-white/5">
                      <span className="text-base">📍</span>
                      <div className="truncate">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Location ({b.distance || 'On-site'})</span>
                        <span className="text-white truncate block">{b.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5 border border-white/5">
                      <span className="text-base">🔧</span>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Assigned Specialist</span>
                        <strong className={b.assignedMechanic === 'Unassigned' ? 'text-amber-400' : 'text-white'}>
                          {b.assignedMechanic}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5 border border-white/5">
                      <span className="text-base">📊</span>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Current Status</span>
                        <strong className={`uppercase ${
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
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                    
                    {/* Call Customer Button */}
                    <button
                      onClick={() => setShowCallModal(b)}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call: {b.customerPhone}
                    </button>

                    {/* Operational Action Buttons */}
                    <div className="flex items-center gap-2">
                      
                      {b.status === 'Pending Acceptance' && (
                        <button
                          onClick={() => {
                            const firstFreeMech = currentWorkshop.mechanics.find(m => m.status === 'Available')?.name || currentWorkshop.mechanics[0].name;
                            handleUpdateStatus(b.id, isRoadside ? 'Assigned' : isHome ? 'Mechanic En Route' : 'Confirmed', firstFreeMech);
                          }}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                        >
                          {isRoadside ? '🚨 Dispatch Emergency Unit' : isHome ? '🏠 Dispatch Home Mechanic' : 'Accept Bay Booking'}
                        </button>
                      )}

                      {b.status !== 'Completed' && b.status !== 'Pending Acceptance' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'Completed')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        >
                          ✓ Mark Resolved & Done
                        </button>
                      )}

                      {b.status === 'Completed' && (
                        <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                          ✓ Job Completed Successfully
                        </span>
                      )}

                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="View Full Booking Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── Workshop Mechanics Roster Section ─── */}
        <section className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>👨‍🔧 Workshop Mechanics on Duty</span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-300 font-bold">
                  {currentWorkshop.mechanics.length} Active
                </span>
              </h3>
              <p className="text-xs text-gray-400">Available technicians ready for emergency dispatch or workshop bays.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentWorkshop.mechanics.map(m => (
              <div key={m.id} className="bg-[#12141c] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-sm text-white">{m.name}</h5>
                  <p className="text-xs text-red-400 font-medium">{m.specialization}</p>
                  <p className="text-[11px] text-gray-500 mt-1">Experience: {m.experience}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    m.status === 'Available' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400 animate-pulse'
                  }`}>
                    {m.status}
                  </span>
                  <a href={`tel:${m.phone}`} className="block text-[11px] text-gray-400 hover:text-white mt-2">
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161924] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative animate-fadeIn">
            
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                selectedBooking.type === 'emergency_roadside'
                  ? 'bg-red-950 text-red-300 border-red-500'
                  : selectedBooking.type === 'emergency_home'
                  ? 'bg-amber-950 text-amber-300 border-amber-500'
                  : 'bg-cyan-950 text-cyan-300 border-cyan-500'
              }`}>
                {selectedBooking.type.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-xs text-gray-400 font-mono">ID: {selectedBooking.id}</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-1">{selectedBooking.serviceName}</h3>
            <p className="text-sm text-gray-300 mb-6">Customer: <strong className="text-white">{selectedBooking.customerName}</strong> ({selectedBooking.customerPhone})</p>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                <span className="text-gray-400 uppercase text-[10px] font-bold block mb-1">Issue Description</span>
                <p className="text-gray-200">{selectedBooking.issueDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                  <span className="text-gray-400 uppercase text-[10px] font-bold block">Vehicle</span>
                  <span className="text-white font-bold">{selectedBooking.vehicle}</span>
                  <span className="text-gray-400 block text-xs">{selectedBooking.regNumber}</span>
                </div>

                <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                  <span className="text-gray-400 uppercase text-[10px] font-bold block">Dispatch Location</span>
                  <span className="text-white font-bold">{selectedBooking.location}</span>
                  <span className="text-red-400 block text-xs">{selectedBooking.distance || 'Direct to bay'}</span>
                </div>
              </div>

              {/* Re-assign mechanic */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                <span className="text-gray-400 uppercase text-[10px] font-bold block mb-2">Assign or Re-assign Technician</span>
                <div className="flex gap-2">
                  <select
                    value={selectedMechanicForAssign || selectedBooking.assignedMechanic}
                    onChange={(e) => setSelectedMechanicForAssign(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                  >
                    {currentWorkshop.mechanics.map(m => (
                      <option key={m.id} value={m.name} className="bg-[#1a1d29] text-white">
                        {m.name} ({m.specialization}) - {m.status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (selectedMechanicForAssign) {
                        handleUpdateStatus(selectedBooking.id, selectedBooking.status, selectedMechanicForAssign);
                        alert(`Technician ${selectedMechanicForAssign} assigned!`);
                      }
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
              >
                Close
              </button>
              {selectedBooking.status !== 'Completed' && (
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedBooking.id, 'Completed');
                    setSelectedBooking(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161924] border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-2xl animate-bounce">
              📞
            </div>
            <h4 className="text-xl font-black text-white">Calling Customer</h4>
            <p className="text-emerald-400 font-bold text-base mt-1">{showCallModal.customerPhone}</p>
            <p className="text-gray-300 text-sm mt-1">{showCallModal.customerName}</p>
            <p className="text-xs text-gray-500 mt-4">Connecting dispatch hotline with customer device...</p>
            
            <button
              onClick={() => setShowCallModal(null)}
              className="mt-6 w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

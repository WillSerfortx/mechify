import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DRIVER_DEMO_ACCOUNTS } from '../data/driverAccounts';

// Custom Map Markers
const carMarkerIcon = new L.DivIcon({
  html: '<div style="font-size: 30px; text-align: center; margin-top: -15px; margin-left: -15px; filter: drop-shadow(0 0 12px rgba(239,68,68,0.9)); animation: pulse 1.5s infinite;">🏎️</div>',
  className: 'custom-icon',
  iconSize: [30, 30]
});

const pickupMarkerIcon = new L.DivIcon({
  html: '<div style="font-size: 28px; text-align: center; margin-top: -14px; margin-left: -14px; filter: drop-shadow(0 0 12px rgba(16,185,129,0.9));">📍</div>',
  className: 'custom-icon',
  iconSize: [28, 28]
});

const dropoffMarkerIcon = new L.DivIcon({
  html: '<div style="font-size: 28px; text-align: center; margin-top: -14px; margin-left: -14px; filter: drop-shadow(0 0 12px rgba(59,130,246,0.9));">🏁</div>',
  className: 'custom-icon',
  iconSize: [28, 28]
});

export default function DriverDashboard() {
  const navigate = useNavigate();

  // ─── 1. Authenticated Driver Profile State ───
  const [selectedDriverId, setSelectedDriverId] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const u = JSON.parse(stored);
        const match = DRIVER_DEMO_ACCOUNTS.find(
          a => a.email.toLowerCase() === (u.email || '').toLowerCase()
        );
        if (match) return match.id;
      }
    } catch (e) {
      console.error(e);
    }
    return 'drv-1'; // Defaults to Kamrul Hassan (Driver With Car)
  });

  const currentDriver = useMemo(() => {
    return DRIVER_DEMO_ACCOUNTS.find(a => a.id === selectedDriverId) || DRIVER_DEMO_ACCOUNTS[0];
  }, [selectedDriverId]);

  const isDriverWithCar = currentDriver.driverType === 'with_car';

  // ─── 2. Real-time Status & Operating Controls (Spec Section 4) ───
  const [isOnline, setIsOnline] = useState(currentDriver.isOnline ?? true);
  const [activeNav, setActiveNav] = useState('home'); // 'home' | 'active_trip' | 'incoming_jobs' | 'upcoming_bookings' | 'vehicle_management' | 'schedule_availability' | 'earnings_ledger' | 'performance_scorecard' | 'reviews_reputation' | 'public_profile' | 'documents_verification' | 'chat_messenger' | 'customer_hiring_flow' | 'support_center'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);

  // ─── 3. Active Trip Lifecycle & State Machine (Spec Section 5, 12, 13) ───
  // Trip status: 'heading_to_pickup' | 'arrived_at_pickup' | 'trip_started' | 'completed'
  const [activeJob, setActiveJob] = useState(currentDriver.activeJob);
  const [tripStep, setTripStep] = useState(() => {
    if (!currentDriver.activeJob) return 'heading_to_pickup';
    if (currentDriver.activeJob.status === 'in_progress') return 'trip_started';
    if (currentDriver.activeJob.status === 'arrived') return 'arrived_at_pickup';
    return 'heading_to_pickup';
  });

  const [tripElapsedSeconds, setTripElapsedSeconds] = useState(480);
  const [tripActiveTimerRunning, setTripActiveTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (tripActiveTimerRunning && activeJob) {
      timer = setInterval(() => {
        setTripElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [tripActiveTimerRunning, activeJob]);

  const formatTripTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // ─── 4. Incoming Job Requests & Countdown Timer (Spec Section 6) ───
  const [incomingRequest, setIncomingRequest] = useState(null);
  const [countdownSeconds, setCountdownSeconds] = useState(15);

  useEffect(() => {
    let timer;
    if (incomingRequest) {
      setCountdownSeconds(15);
      timer = setInterval(() => {
        setCountdownSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIncomingRequest(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [incomingRequest]);

  const triggerMockIncomingRequest = () => {
    if (!isOnline) {
      alert("Please go Online first to receive real-time job requests!");
      return;
    }
    const sampleRequest = isDriverWithCar ? {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: 'Ayesha Siddiqua',
      customerPhone: '+880 1819-556677',
      customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      pickupLocation: 'Banani Road 11, Plot 42',
      destination: 'Hazrat Shahjalal International Airport (Terminal 1)',
      pickupTime: 'Immediate Pickup (7 mins away)',
      distance: '14.2 km',
      estimatedDuration: '24 mins',
      vehicleRequired: 'Driver With Car (Premium Sedan / AC)',
      estimatedEarnings: 1250,
      platformFee: 125,
      netEarnings: 1125,
      notes: 'Flight departure at 11:30 PM. Needs polite driver with clean car.'
    } : {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: 'Fahim Morshed',
      customerPhone: '+880 1912-334455',
      customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      pickupLocation: 'Gulshan 2, Madani Avenue',
      destination: 'Radisson Blu Water Garden Hotel',
      pickupTime: 'Today, 9:00 PM',
      distance: '8.6 km',
      estimatedDuration: '18 mins',
      vehicleRequired: "Customer's Car (Toyota Land Cruiser LC300 Automatic)",
      customerVehicleInfo: {
        make: 'Toyota',
        model: 'Land Cruiser LC300',
        transmission: 'Automatic 10-Speed',
        fuelType: 'Diesel Turbo'
      },
      estimatedEarnings: 1800,
      platformFee: 180,
      netEarnings: 1620,
      notes: 'Customer attending corporate gala. Requires sharp-suited VIP chauffeur.'
    };

    setIncomingRequest(sampleRequest);
  };

  const handleAcceptRequest = () => {
    if (!incomingRequest) return;
    setActiveJob({
      ...incomingRequest,
      status: 'heading_to_pickup'
    });
    setTripStep('heading_to_pickup');
    setIncomingRequest(null);
    setActiveNav('active_trip');
    alert(`🎉 Ride Request ${incomingRequest.id} Accepted! Customer notified that you are heading to pickup.`);
  };

  const handleDeclineRequest = () => {
    setIncomingRequest(null);
  };

  // ─── 5. In-App Customer Communication & Quick Replies (Spec Section 21) ───
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'customer', text: 'Hello! Are you on your way to Gulshan 2?', time: '8:42 PM' },
    { id: 2, sender: 'driver', text: "Yes sir, I'm heading towards your pickup location now. ETA 6 minutes.", time: '8:43 PM' },
    { id: 3, sender: 'customer', text: 'Great! I will be waiting by the building security gate.', time: '8:44 PM' }
  ]);
  const [chatInputText, setChatInputText] = useState('');
  const chatBottomRef = useRef(null);

  const sendQuickReply = (text) => {
    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'driver', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  const handleSendCustomMessage = (e) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    sendQuickReply(chatInputText);
    setChatInputText('');
  };

  // ─── 6. Availability Schedule State (Spec Section 10) ───
  const [weeklySchedule, setWeeklySchedule] = useState([
    { day: 'Saturday', active: true, start: '08:00 AM', end: '08:00 PM' },
    { day: 'Sunday', active: true, start: '08:00 AM', end: '08:00 PM' },
    { day: 'Monday', active: true, start: '08:00 AM', end: '06:00 PM' },
    { day: 'Tuesday', active: true, start: '08:00 AM', end: '06:00 PM' },
    { day: 'Wednesday', active: true, start: '08:00 AM', end: '06:00 PM' },
    { day: 'Thursday', active: true, start: '08:00 AM', end: '09:00 PM' },
    { day: 'Friday', active: false, start: '02:00 PM', end: '10:00 PM' }
  ]);
  const [repeatWeeklySchedule, setRepeatWeeklySchedule] = useState(true);

  // ─── 7. Vehicle Management & Status (Spec Section 7 & 20 - With Car Only) ───
  const [vehicleStatus, setVehicleStatus] = useState(currentDriver.vehicle?.status || 'Available');
  const [currentFuelLevel, setCurrentFuelLevel] = useState(currentDriver.vehicle?.fuelLevel || '78%');

  // ─── 8. Financial Ledger & Payout Requests (Spec Section 14 & 15) ───
  const [availableBalance, setAvailableBalance] = useState(currentDriver.availableBalance || 18450);
  const [pendingBalance, setPendingBalance] = useState(currentDriver.pendingBalance || 3200);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('10000');
  const [payoutMethod, setPayoutMethod] = useState(currentDriver.payoutAccount?.preferredMethod || 'bKash');

  // ─── 9. Customer Hiring Experience Simulator (Spec Section 28 & 29) ───
  const [hiringMode, setHiringMode] = useState('with_car'); // 'with_car' | 'without_car'
  const [hirePickup, setHirePickup] = useState('Gulshan 2, Dhaka');
  const [hireDropoff, setHireDropoff] = useState('Hazrat Shahjalal Airport');
  const [hireVehicleType, setHireVehicleType] = useState('Premium Sedan');
  const [hireCustomerCar, setHireCustomerCar] = useState('Toyota Land Cruiser LC300');
  const [selectedDriverForHire, setSelectedDriverForHire] = useState(null);

  // ─── 10. Modals ───
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [regStep, setRegStep] = useState(1);
  const [showDocUploadModal, setShowDocUploadModal] = useState(false);

  // Switch demo account
  const handleSwitchAccount = (id) => {
    setSelectedDriverId(id);
    const target = DRIVER_DEMO_ACCOUNTS.find(a => a.id === id);
    if (target) {
      setIsOnline(target.isOnline);
      setActiveJob(target.activeJob);
      setVehicleStatus(target.vehicle?.status || 'Available');
      setCurrentFuelLevel(target.vehicle?.fuelLevel || '78%');
      setAvailableBalance(target.availableBalance);
      setPendingBalance(target.pendingBalance);
      localStorage.setItem('currentUser', JSON.stringify({
        email: target.email,
        name: target.name,
        role: 'driver',
        driverType: target.driverType
      }));
      localStorage.setItem('userRole', 'driver');
    }
    setShowAccountSwitcher(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-gray-100 font-['Outfit'] flex flex-col selection:bg-red-500 selection:text-white">

      {/* ─── TOP APP BAR ─── */}
      <header className="sticky top-0 z-40 bg-[#0c0e17]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
          >
            ☰
          </button>
          
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              M
            </div>
            <div>
              <span className="font-black tracking-wider text-base text-white">MECHIFY</span>
              <span className="text-[10px] block font-mono font-bold text-red-400 uppercase tracking-widest leading-none">
                Driver Operating Center
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Large 1-Tap Online / Offline Status Toggle (Spec Section 4 & 27) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newStatus = !isOnline;
              setIsOnline(newStatus);
              if (!newStatus && activeJob) {
                alert("You are now Offline. Finish your active job or complete trips before signing off.");
              }
            }}
            className={`px-4 sm:px-6 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-lg ${
              isOnline
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                : 'bg-zinc-800 hover:bg-zinc-700 text-gray-400 shadow-black'
            }`}
          >
            <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-gray-500'}`} />
            <span>{isOnline ? 'ONLINE — ACCEPTING JOBS' : 'OFFLINE'}</span>
          </button>

          {/* Test Incoming Ride Request Button */}
          <button
            onClick={triggerMockIncomingRequest}
            title="Simulate incoming passenger ride request"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold transition-all border border-red-500/30"
          >
            <span>🔔</span> Test Ride Request
          </button>
        </div>

        {/* Right: Emergency SOS Button + Driver Profile Switcher */}
        <div className="flex items-center gap-3">
          {/* Always-Accessible Emergency SOS Button (Spec Section 23) */}
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="px-3.5 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center gap-1.5 shadow-[0_0_18px_rgba(220,38,38,0.6)] animate-pulse"
          >
            <span>🚨</span>
            <span className="hidden sm:inline">EMERGENCY SOS</span>
          </button>

          {/* Driver Profile & Demo Account Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowAccountSwitcher(!showAccountSwitcher)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <img
                src={currentDriver.avatar}
                alt={currentDriver.name}
                className="w-8 h-8 rounded-xl object-cover border border-white/15"
              />
              <div className="text-left hidden lg:block">
                <span className="text-xs font-black text-white block leading-tight truncate max-w-[130px]">{currentDriver.name}</span>
                <span className={`text-[10px] font-bold block ${isDriverWithCar ? 'text-amber-400' : 'text-cyan-400'}`}>
                  {isDriverWithCar ? '🚗 Driver With Car' : '👔 Chauffeur (No Car)'}
                </span>
              </div>
              <span className="text-gray-400 text-xs">▼</span>
            </button>

            {/* Account Switcher Dropdown */}
            {showAccountSwitcher && (
              <div className="absolute right-0 mt-2 w-80 rounded-3xl bg-[#121522] border border-white/15 shadow-2xl p-3 z-50 animate-fadeIn text-xs">
                <div className="px-3 py-2 border-b border-white/10 font-bold text-gray-400 flex justify-between items-center">
                  <span>Switch Demo Driver</span>
                  <span className="text-[10px] bg-red-600/20 text-red-400 px-2 py-0.5 rounded font-mono">Password: 123</span>
                </div>
                <div className="py-2 space-y-1.5">
                  {DRIVER_DEMO_ACCOUNTS.map(drv => (
                    <button
                      key={drv.id}
                      onClick={() => handleSwitchAccount(drv.id)}
                      className={`w-full p-2.5 rounded-2xl flex items-center gap-3 text-left transition-colors ${
                        selectedDriverId === drv.id ? 'bg-red-600/20 border border-red-500/40 text-white' : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <img src={drv.avatar} alt={drv.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <strong className="text-white block font-bold truncate">{drv.name}</strong>
                        <span className="text-[10px] text-gray-400 block truncate">{drv.email}</span>
                        <span className={`text-[10px] font-bold ${drv.driverType === 'with_car' ? 'text-amber-400' : 'text-cyan-400'}`}>
                          {drv.driverType === 'with_car' ? `🚗 With Car (${drv.vehicle?.model})` : '👔 Chauffeur Without Car'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <button
                    onClick={() => { setShowRegistrationModal(true); setShowAccountSwitcher(false); }}
                    className="text-red-400 font-bold hover:underline"
                  >
                    + Register New Driver
                  </button>
                  <button onClick={handleSignOut} className="text-gray-400 hover:text-white font-bold">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </header>

      {/* ─── MAIN PLATFORM LAYOUT ─── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ─── DESKTOP SIDEBAR NAVIGATION (Spec Section 25 & 34) ─── */}
        <aside
          className={`hidden md:flex flex-col justify-between transition-all duration-300 bg-[#0c0e17] border-r border-white/10 p-4 ${
            sidebarCollapsed ? 'w-20' : 'w-72'
          }`}
        >
          <div className="space-y-1 overflow-y-auto pr-1">
            
            {/* Quick Status Pill */}
            {!sidebarCollapsed && (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-bold">Account Mode:</span>
                  <span className={`font-black uppercase text-[10px] px-2 py-0.5 rounded ${
                    isDriverWithCar ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {isDriverWithCar ? 'With Car' : 'Without Car'}
                  </span>
                </div>
                <div className="text-white text-xs font-bold truncate">
                  {isDriverWithCar ? `${currentDriver.vehicle?.make} ${currentDriver.vehicle?.model}` : 'Chauffeur Qualified (5 Classes)'}
                </div>
              </div>
            )}

            {/* Navigation Items */}
            {[
              { id: 'home', label: 'Driver Home', icon: '🏠' },
              { id: 'active_trip', label: 'Active Trip Screen', icon: '📍', badge: activeJob ? 'Active' : undefined, badgeColor: 'bg-red-600 animate-pulse' },
              { id: 'incoming_jobs', label: 'Job Requests', icon: '⚡', badge: incomingRequest ? '1 New' : undefined, badgeColor: 'bg-emerald-600 animate-bounce' },
              { id: 'upcoming_bookings', label: 'Upcoming Bookings', icon: '📅', badge: currentDriver.upcomingBookings?.length },
              ...(isDriverWithCar ? [
                { id: 'vehicle_management', label: 'My Vehicle & Maintenance', icon: '🚗', badge: 'Fuel 78%' }
              ] : []),
              { id: 'schedule_availability', label: 'Schedule & Availability', icon: '🕒' },
              { id: 'earnings_ledger', label: 'Earnings & Payouts', icon: '💰', badge: `৳${(currentDriver.todayEarnings || 0).toLocaleString()}` },
              { id: 'performance_scorecard', label: 'Performance Scorecard', icon: '📈', badge: '98.5%' },
              { id: 'reviews_reputation', label: 'Ratings & Passenger Reviews', icon: '⭐', badge: `★ ${currentDriver.rating}` },
              { id: 'public_profile', label: 'Public Chauffeur Profile', icon: '👤' },
              { id: 'documents_verification', label: 'Documents & Verification', icon: '🛡️', badge: 'Verified', badgeColor: 'bg-emerald-600/30 text-emerald-400' },
              { id: 'chat_messenger', label: 'Customer Chat & Messages', icon: '💬', badge: 1, badgeColor: 'bg-blue-600' },
              { id: 'customer_hiring_flow', label: 'Test Customer Hiring Flow', icon: '🤝', badge: 'Hire Simulator', badgeColor: 'bg-purple-600' },
              { id: 'support_center', label: 'Driver 24/7 Support', icon: '🎧' }
            ].map(item => {
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    active
                      ? 'bg-red-600 text-white shadow-[0_0_18px_rgba(220,38,38,0.4)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  } ${sidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white ${item.badgeColor || 'bg-white/15'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Collapse Toggle */}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>{sidebarCollapsed ? '→' : '←'}</span>
              {!sidebarCollapsed && <span>Collapse Sidebar</span>}
            </button>
          </div>
        </aside>

        {/* ─── MOBILE DRAWER MENU ─── */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex">
            <div className="w-72 bg-[#0c0e17] h-full p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-2">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="font-black text-white text-sm">Navigation Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 text-xl font-bold">✕</button>
                </div>
                {[
                  { id: 'home', label: 'Driver Home', icon: '🏠' },
                  { id: 'active_trip', label: 'Active Trip Screen', icon: '📍' },
                  { id: 'incoming_jobs', label: 'Job Requests', icon: '⚡' },
                  { id: 'upcoming_bookings', label: 'Upcoming Bookings', icon: '📅' },
                  ...(isDriverWithCar ? [{ id: 'vehicle_management', label: 'My Vehicle & Maintenance', icon: '🚗' }] : []),
                  { id: 'schedule_availability', label: 'Schedule & Availability', icon: '🕒' },
                  { id: 'earnings_ledger', label: 'Earnings & Payouts', icon: '💰' },
                  { id: 'performance_scorecard', label: 'Performance Scorecard', icon: '📈' },
                  { id: 'reviews_reputation', label: 'Ratings & Reviews', icon: '⭐' },
                  { id: 'public_profile', label: 'Public Profile', icon: '👤' },
                  { id: 'documents_verification', label: 'Documents & Verification', icon: '🛡️' },
                  { id: 'chat_messenger', label: 'Customer Messages', icon: '💬' },
                  { id: 'customer_hiring_flow', label: 'Test Customer Hiring Flow', icon: '🤝' },
                  { id: 'support_center', label: 'Driver Support', icon: '🎧' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveNav(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-left ${
                      activeNav === item.id ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* ─── MAIN CONTENT VIEWPORT ─── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-24 md:pb-8">

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 1: DRIVER HOME DASHBOARD (SPEC SECTION 4, 5, 26)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'home' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Top Greeting & Role Identifier */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-white">
                      Good evening, {currentDriver.name}
                    </h1>
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ✓ Verified Driver
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {isDriverWithCar
                      ? `Driver With Car • Vehicle: ${currentDriver.vehicle?.make} ${currentDriver.vehicle?.model} (${currentDriver.vehicle?.regNumber})`
                      : `Professional Chauffeur Without Car • Qualified for Supercars, Luxury SUVs & Executive Sedans`}
                  </p>
                </div>

                {/* Quick 1-Tap Action Pills */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={triggerMockIncomingRequest}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black shadow-lg shadow-red-900/30"
                  >
                    ⚡ Test Ride Request
                  </button>
                  <button
                    onClick={() => setActiveNav('customer_hiring_flow')}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10"
                  >
                    🤝 Hire Me (Customer View)
                  </button>
                </div>
              </div>

              {/* 4 Key Metric KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-1">
                  <span className="text-xs text-gray-400 font-bold">Today's Earnings</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                    ৳{(currentDriver.todayEarnings || 0).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-gray-400">From 6 completed trips</span>
                </div>

                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-1">
                  <span className="text-xs text-gray-400 font-bold">Driver Rating</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center gap-1.5">
                    ★ {currentDriver.rating}
                  </div>
                  <span className="text-[10px] text-gray-400">Based on {currentDriver.reviewsCount} reviews</span>
                </div>

                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-1">
                  <span className="text-xs text-gray-400 font-bold">Hours Online Today</span>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {currentDriver.onlineHours} hrs
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">🟢 Active Shift</span>
                </div>

                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-1">
                  <span className="text-xs text-gray-400 font-bold">Acceptance Rate</span>
                  <div className="text-2xl sm:text-3xl font-black text-red-400">
                    {currentDriver.acceptanceRate}
                  </div>
                  <span className="text-[10px] text-gray-400">0.8% Cancellation Rate</span>
                </div>
              </div>

              {/* ─── CURRENT ACTIVE JOB CARD (SPEC SECTION 5 & 26) ─── */}
              {activeJob ? (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#10131d] via-[#141726] to-[#1c1115] border border-red-500/40 shadow-2xl relative overflow-hidden space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                      <span className="font-mono text-xs font-black text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">
                        {activeJob.id}
                      </span>
                      <h3 className="text-lg font-black text-white">CURRENT ACTIVE JOB</h3>
                    </div>
                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {tripStep === 'heading_to_pickup' && 'Heading to Pickup'}
                      {tripStep === 'arrived_at_pickup' && 'Arrived at Pickup'}
                      {tripStep === 'trip_started' && 'Trip In Progress'}
                      {tripStep === 'completed' && 'Trip Finished'}
                    </span>
                  </div>

                  {/* Customer & Route Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    
                    {/* Passenger Column */}
                    <div className="flex items-center gap-3.5 bg-black/40 p-4 rounded-2xl border border-white/5">
                      <img src={activeJob.customerAvatar} alt={activeJob.customerName} className="w-12 h-12 rounded-2xl object-cover border border-white/15" />
                      <div>
                        <strong className="text-sm font-bold text-white block">{activeJob.customerName}</strong>
                        <span className="text-gray-400 block">{activeJob.customerPhone}</span>
                        <span className="text-emerald-400 font-bold block mt-0.5">Verified Passenger</span>
                      </div>
                    </div>

                    {/* Route Details */}
                    <div className="md:col-span-2 bg-black/40 p-4 rounded-2xl border border-white/5 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-base text-emerald-400">📍</span>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Pickup Location</span>
                          <span className="font-bold text-white text-xs sm:text-sm">{activeJob.pickupLocation}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                        <span className="text-base text-red-500">🏁</span>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Destination</span>
                          <span className="font-bold text-white text-xs sm:text-sm">{activeJob.destination}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Vehicle Context & Notes */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Vehicle Assigned: </span>
                      <strong className="text-amber-400">{activeJob.vehicle}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400">Est. Payout: </span>
                      <strong className="text-emerald-400 text-sm font-black">৳{activeJob.estimatedEarnings.toLocaleString()}</strong>
                      <span className="text-[10px] text-gray-500"> (Net: ৳{(activeJob.netEarnings || activeJob.estimatedEarnings * 0.9).toLocaleString()})</span>
                    </div>
                  </div>

                  {/* Large Touch Target Action Buttons (Spec Section 5 & 25) */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 pt-2">
                    <button
                      onClick={() => setActiveNav('active_trip')}
                      className="py-3 px-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <span>🗺️</span> Full Map
                    </button>
                    <a
                      href={`tel:${activeJob.customerPhone}`}
                      className="py-3 px-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <span>📞</span> Call
                    </a>
                    <button
                      onClick={() => setActiveNav('chat_messenger')}
                      className="py-3 px-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <span>💬</span> Chat
                    </button>

                    {/* Step State Transition Buttons */}
                    {tripStep === 'heading_to_pickup' && (
                      <button
                        onClick={() => {
                          setTripStep('arrived_at_pickup');
                          sendQuickReply("I have arrived at your pickup location outside.");
                          alert("Status updated: Passenger notified that you have Arrived at pickup!");
                        }}
                        className="col-span-2 sm:col-span-3 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2"
                      >
                        <span>📍</span> I'VE ARRIVED AT PICKUP
                      </button>
                    )}

                    {tripStep === 'arrived_at_pickup' && (
                      <button
                        onClick={() => {
                          setTripStep('trip_started');
                          setTripActiveTimerRunning(true);
                          alert("Trip Started! Drive safely to the destination.");
                        }}
                        className="col-span-2 sm:col-span-3 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2"
                      >
                        <span>🚀</span> CUSTOMER BOARDED — START TRIP
                      </button>
                    )}

                    {tripStep === 'trip_started' && (
                      <button
                        onClick={() => {
                          setTripStep('completed');
                          setTripActiveTimerRunning(false);
                          const earned = activeJob.netEarnings || activeJob.estimatedEarnings * 0.9;
                          setAvailableBalance(prev => prev + earned);
                          alert(`🎉 Trip Completed! Net earnings of ৳${earned.toLocaleString()} added to your account balance.`);
                          setActiveJob(null);
                        }}
                        className="col-span-2 sm:col-span-3 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-red-900/40 flex items-center justify-center gap-2"
                      >
                        <span>🏁</span> DESTINATION REACHED — COMPLETE TRIP
                      </button>
                    )}
                  </div>

                </div>
              ) : (
                /* No Active Job - Standby State */
                <div className="p-8 rounded-3xl bg-[#10131d] border border-white/10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl mx-auto">
                    {isDriverWithCar ? '🚗' : '👔'}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">No Active Job at this Moment</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                      {isOnline
                        ? 'You are Online and prioritized for high-fare customer bookings in Gulshan, Banani, and Airport routes.'
                        : 'You are currently Offline. Turn your toggle ON to start receiving ride requests.'}
                    </p>
                  </div>
                  {isOnline && (
                    <button
                      onClick={triggerMockIncomingRequest}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md"
                    >
                      ⚡ Request Nearby Ride Dispatch
                    </button>
                  )}
                </div>
              )}

              {/* ─── UPCOMING SCHEDULED BOOKINGS SNIPPET (SPEC SECTION 11) ─── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <span>📅</span> Upcoming Reserved Trips
                  </h3>
                  <button onClick={() => setActiveNav('upcoming_bookings')} className="text-xs text-red-400 font-bold hover:underline">
                    View All ({currentDriver.upcomingBookings?.length || 0}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentDriver.upcomingBookings?.map((bk, i) => (
                    <div key={i} className="p-5 rounded-3xl bg-[#10131d] border border-white/10 flex flex-col justify-between space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">{bk.id}</span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {bk.countdown}
                          </span>
                        </div>
                        <strong className="text-sm font-bold text-white block">{bk.customerName}</strong>
                        <span className="text-gray-400 block">{bk.date}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-[11px]">
                        <div><span className="text-gray-400">From:</span> <span className="text-white font-bold">{bk.pickup}</span></div>
                        <div><span className="text-gray-400">To:</span> <span className="text-white font-bold">{bk.destination}</span></div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <span className="text-emerald-400 font-black text-sm">৳{bk.estimatedEarnings.toLocaleString()}</span>
                        <a href={`tel:${bk.customerPhone}`} className="px-3 py-1 rounded-lg bg-white/10 text-white font-bold text-[11px]">
                          📞 Contact Passenger
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 2: ACTIVE DISTRACTION-FREE TRIP SCREEN (SPEC SECTION 12 & 13)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'active_trip' && (
            <div className="space-y-6 animate-fadeIn">
              
              {activeJob ? (
                <div className="space-y-6">
                  {/* Top Trip Status Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#10131d] p-4 sm:p-6 rounded-3xl border border-white/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                        <h2 className="text-2xl font-black text-white">ACTIVE LIVE TRIP</h2>
                        <span className="text-xs font-mono font-bold text-gray-400">#{activeJob.id}</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Destination: <strong className="text-white">{activeJob.destination}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">Trip Timer</span>
                        <span className="font-mono text-2xl font-black text-emerald-400">{formatTripTimer(tripElapsedSeconds)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">Distance</span>
                        <span className="font-mono text-2xl font-black text-white">{activeJob.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Leaflet Navigation Map Container */}
                  <div className="h-[420px] rounded-3xl overflow-hidden border border-white/15 relative shadow-2xl">
                    <MapContainer
                      center={[23.7925, 90.4150]}
                      zoom={14}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                      />
                      {/* Driver Marker */}
                      <Marker position={[23.7925, 90.4150]} icon={carMarkerIcon}>
                        <Popup>
                          <div className="text-black font-bold p-1">
                            {currentDriver.name} (Your Vehicle)
                          </div>
                        </Popup>
                      </Marker>
                      {/* Pickup Marker */}
                      <Marker position={[23.7985, 90.4190]} icon={pickupMarkerIcon}>
                        <Popup>
                          <div className="text-black font-bold p-1">
                            Pickup: {activeJob.pickupLocation}
                          </div>
                        </Popup>
                      </Marker>
                      {/* Dropoff Marker */}
                      <Marker position={[23.8435, 90.4040]} icon={dropoffMarkerIcon}>
                        <Popup>
                          <div className="text-black font-bold p-1">
                            Dropoff: {activeJob.destination}
                          </div>
                        </Popup>
                      </Marker>
                      {/* Navigation Polyline Route */}
                      <Polyline
                        positions={[
                          [23.7925, 90.4150],
                          [23.7985, 90.4190],
                          [23.8150, 90.4120],
                          [23.8350, 90.4080],
                          [23.8435, 90.4040]
                        ]}
                        color="#ef4444"
                        weight={5}
                        dashArray="6, 8"
                      />
                    </MapContainer>

                    {/* Floating GPS Directions Ribbon */}
                    <div className="absolute top-4 left-4 right-4 z-[400] bg-black/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">↗️</span>
                        <div>
                          <strong className="text-white text-sm block">In 400m turn left on Kemal Ataturk Ave</strong>
                          <span className="text-gray-400">Head toward Airport Road / Elevated Expressway</span>
                        </div>
                      </div>
                      <button
                        onClick={() => window.open(`https://maps.google.com/?q=${activeJob.destination}`, '_blank')}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md"
                      >
                        Google Maps
                      </button>
                    </div>
                  </div>

                  {/* Trip Controls State Workflow */}
                  <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={activeJob.customerAvatar} alt={activeJob.customerName} className="w-12 h-12 rounded-2xl object-cover" />
                      <div>
                        <strong className="text-sm font-bold text-white block">{activeJob.customerName}</strong>
                        <span className="text-gray-400 text-xs">{activeJob.customerPhone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <a
                        href={`tel:${activeJob.customerPhone}`}
                        className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center"
                      >
                        📞 Call Customer
                      </a>
                      <button
                        onClick={() => setActiveNav('chat_messenger')}
                        className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                      >
                        💬 Messages
                      </button>

                      {tripStep === 'heading_to_pickup' && (
                        <button
                          onClick={() => {
                            setTripStep('arrived_at_pickup');
                            sendQuickReply("I have arrived at your pickup location outside.");
                            alert("Status updated: I've Arrived at Pickup!");
                          }}
                          className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-amber-900/40"
                        >
                          I'VE ARRIVED AT PICKUP
                        </button>
                      )}

                      {tripStep === 'arrived_at_pickup' && (
                        <button
                          onClick={() => {
                            setTripStep('trip_started');
                            setTripActiveTimerRunning(true);
                            alert("Trip Started!");
                          }}
                          className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-900/40"
                        >
                          START TRIP
                        </button>
                      )}

                      {tripStep === 'trip_started' && (
                        <button
                          onClick={() => {
                            setTripStep('completed');
                            setTripActiveTimerRunning(false);
                            const earned = activeJob.netEarnings || activeJob.estimatedEarnings * 0.9;
                            setAvailableBalance(prev => prev + earned);
                            alert(`🎉 Trip Finished! ৳${earned.toLocaleString()} credited to your balance.`);
                            setActiveJob(null);
                            setActiveNav('home');
                          }}
                          className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-red-900/40"
                        >
                          COMPLETE TRIP
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-12 rounded-3xl bg-[#10131d] border border-white/10 text-center space-y-3">
                  <span className="text-4xl">🏁</span>
                  <h3 className="text-xl font-black text-white">No Trip Currently in Progress</h3>
                  <p className="text-xs text-gray-400">Accept a ride request or initiate an upcoming booking to enter the active navigation screen.</p>
                  <button onClick={() => setActiveNav('home')} className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-black text-xs">
                    Return to Dashboard
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 3: INCOMING REAL-TIME JOB REQUEST CARD (SPEC SECTION 6)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'incoming_jobs' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-white">Live Job Requests Dispatch Radar</h2>
                  <p className="text-xs text-gray-400">Real-time incoming rides matching your driver profile and service areas.</p>
                </div>
                <button
                  onClick={triggerMockIncomingRequest}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black"
                >
                  ⚡ Trigger Mock Ride Request
                </button>
              </div>

              {incomingRequest ? (
                <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121522] via-[#1a1e30] to-[#251318] border-2 border-red-500 shadow-2xl space-y-6 relative overflow-hidden">
                  
                  {/* Countdown Timer Header */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-black uppercase tracking-wider text-red-400 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        NEW RIDE REQUEST RECEIVED
                      </span>
                      <span className="font-mono font-black text-amber-400 text-sm">
                        ⏱️ {countdownSeconds}s remaining
                      </span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(countdownSeconds / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Route & Pricing Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Pickup Location:</span>
                        <p className="font-bold text-white text-sm mt-0.5">{incomingRequest.pickupLocation}</p>
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Destination:</span>
                        <p className="font-bold text-white text-sm mt-0.5">{incomingRequest.destination}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Estimated Earnings:</span>
                        <div className="text-3xl font-black text-emerald-400 mt-1">৳{incomingRequest.estimatedEarnings.toLocaleString()}</div>
                        <span className="text-[11px] text-gray-400">Net Take-Home: ৳{(incomingRequest.netEarnings || incomingRequest.estimatedEarnings * 0.9).toLocaleString()}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-2">
                        Distance: <strong className="text-white">{incomingRequest.distance}</strong> • Approx <strong className="text-white">{incomingRequest.estimatedDuration}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Passenger & Vehicle Specs */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={incomingRequest.customerAvatar} alt={incomingRequest.customerName} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <strong className="text-white block">{incomingRequest.customerName}</strong>
                        <span className="text-[11px] text-gray-400">{incomingRequest.vehicleRequired}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Top Rated VIP
                    </span>
                  </div>

                  {/* Decision Buttons (Spec Section 6) */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={handleDeclineRequest}
                      className="py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 font-bold text-xs sm:text-sm transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={handleAcceptRequest}
                      className="py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-900/50 transition-all flex items-center justify-center gap-2"
                    >
                      <span>✓</span> ACCEPT RIDE (৳{incomingRequest.estimatedEarnings})
                    </button>
                  </div>

                </div>
              ) : (
                <div className="p-12 rounded-3xl bg-[#10131d] border border-white/10 text-center space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl mx-auto">
                    📡
                  </div>
                  <h3 className="text-xl font-black text-white">Radar is Scanning for Passenger Requests</h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    You are connected to Mechify's high-speed dispatch server. New requests will pop up automatically with instant earnings preview.
                  </p>
                  <button
                    onClick={triggerMockIncomingRequest}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs"
                  >
                    Send Test Request Now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 4: VEHICLE MANAGEMENT (SPEC SECTION 7 & 20 - DRIVER WITH CAR ONLY)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'vehicle_management' && isDriverWithCar && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Vehicle Diagnostics & Fleet Management</h2>
                  <p className="text-xs text-gray-400">Track fuel levels, maintenance reminders, and availability of your registered vehicle.</p>
                </div>
                {/* Vehicle Status Selector */}
                <div className="flex items-center gap-2 bg-[#10131d] p-1 rounded-2xl border border-white/10">
                  {['Available', 'On Trip', 'Maintenance', 'Inactive'].map(st => (
                    <button
                      key={st}
                      onClick={() => setVehicleStatus(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        vehicleStatus === st ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Showcase Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#10131d] border border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="rounded-2xl overflow-hidden aspect-video relative border border-white/10 shadow-2xl">
                  <img src={currentDriver.vehicle?.image} alt="Vehicle" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-black text-emerald-400 border border-white/10">
                    🟢 {vehicleStatus}
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4 text-xs">
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {currentDriver.vehicle?.make} {currentDriver.vehicle?.model} ({currentDriver.vehicle?.year})
                    </h3>
                    <p className="font-mono text-gray-400 mt-0.5">
                      Plate: <strong className="text-white">{currentDriver.vehicle?.regNumber}</strong> • Color: {currentDriver.vehicle?.color}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Transmission</span>
                      <strong className="text-white">{currentDriver.vehicle?.transmission}</strong>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Fuel Type</span>
                      <strong className="text-white">{currentDriver.vehicle?.fuelType}</strong>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Fuel Level</span>
                      <strong className="text-emerald-400">{currentFuelLevel} Tank</strong>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Seating Capacity</span>
                      <strong className="text-white">{currentDriver.vehicle?.seats} Passengers</strong>
                    </div>
                  </div>

                  {/* Vehicle Features */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {currentDriver.vehicle?.features?.map((f, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/5">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Maintenance Reminders (Spec Section 20) */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>🛠️</span> Preventive Maintenance & Document Reminders
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#10131d] border border-white/10 space-y-1">
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Engine Oil Life</span>
                    <strong className="text-emerald-400 font-bold block">{currentDriver.vehicle?.maintenance?.oilChange}</strong>
                    <span className="text-gray-400 text-[11px]">Recommended: Motul Synthetic 0W-20</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#10131d] border border-white/10 space-y-1">
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Tire & Tread Health</span>
                    <strong className="text-white font-bold block">{currentDriver.vehicle?.maintenance?.tireInspection}</strong>
                    <span className="text-gray-400 text-[11px]">Pressure: 32 PSI Front / 32 PSI Rear</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#10131d] border border-white/10 space-y-1">
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Insurance Validity</span>
                    <strong className="text-emerald-400 font-bold block">{currentDriver.vehicle?.maintenance?.insuranceRenewal}</strong>
                    <span className="text-gray-400 text-[11px]">Comprehensive Green Delta Coverage</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 5: AVAILABILITY SCHEDULER (SPEC SECTION 10)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'schedule_availability' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Driver Availability & Shift Planner</h2>
                  <p className="text-xs text-gray-400">Configure your active working days, shift hours, and weekly recurring preferences.</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-gray-300 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={repeatWeeklySchedule}
                      onChange={(e) => setRepeatWeeklySchedule(e.target.checked)}
                      className="rounded accent-red-600"
                    />
                    Repeat this schedule weekly
                  </label>
                  <button
                    onClick={() => alert("Your updated working hours have been synchronized with the passenger matching system!")}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs"
                  >
                    Save Schedule
                  </button>
                </div>
              </div>

              {/* Weekly Shift Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {weeklySchedule.map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-3xl border transition-all text-xs space-y-3 ${
                      s.active ? 'bg-[#10131d] border-white/10' : 'bg-black/30 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <strong className="text-white text-sm">{s.day}</strong>
                      <button
                        onClick={() => {
                          setWeeklySchedule(prev => prev.map((item, i) => i === idx ? { ...item, active: !item.active } : item));
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          s.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {s.active ? 'Working' : 'Off Duty'}
                      </button>
                    </div>

                    {s.active ? (
                      <div className="space-y-2 pt-1 border-t border-white/5">
                        <div className="flex justify-between items-center text-gray-300">
                          <span>Shift Hours:</span>
                          <span className="font-mono text-white font-bold">{s.start} — {s.end}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold block">✓ Priority Dispatch Route</span>
                      </div>
                    ) : (
                      <div className="pt-2 text-gray-500 text-[11px]">
                        No bookings will be dispatched on this day.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 6: EARNINGS & PAYOUT MANAGEMENT (SPEC SECTION 14 & 15)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'earnings_ledger' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Earnings Ledger & Payout Gateway</h2>
                  <p className="text-xs text-gray-400">Review collected passenger fares, -10% Mechify platform fee, and withdraw earnings instantly.</p>
                </div>
                <button
                  onClick={() => setShowPayoutModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-900/30"
                >
                  💳 Withdraw to bKash / Bank
                </button>
              </div>

              {/* Financial Balance Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-[#10131d] border border-emerald-500/30 bg-emerald-950/20">
                  <span className="text-xs font-bold text-emerald-400">Available Balance</span>
                  <div className="text-3xl font-black text-emerald-400 mt-1">৳{availableBalance.toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400">Ready for instant withdrawal</span>
                </div>

                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10">
                  <span className="text-xs font-bold text-gray-400">Pending Clearances</span>
                  <div className="text-3xl font-black text-amber-400 mt-1">৳{pendingBalance.toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400">From recent card trips</span>
                </div>

                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10">
                  <span className="text-xs font-bold text-gray-400">This Month's Gross</span>
                  <div className="text-3xl font-black text-white mt-1">৳{(currentDriver.monthEarnings || 114000).toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400">Total fares collected</span>
                </div>

                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10">
                  <span className="text-xs font-bold text-gray-400">Lifetime Career Gross</span>
                  <div className="text-3xl font-black text-red-400 mt-1">৳{(currentDriver.totalEarnings || 845000).toLocaleString()}</div>
                  <span className="text-[10px] text-gray-400">{currentDriver.completedTrips} trips completed</span>
                </div>
              </div>

              {/* Visual Income SVG Chart */}
              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-black text-white">Daily Income Trend (Last 7 Days)</h4>
                  <span className="text-xs font-bold text-emerald-400">Avg ৳4,000 / day</span>
                </div>
                <div className="h-44 w-full flex items-end gap-3 pt-4">
                  {[
                    { day: 'Sat', val: 4500 },
                    { day: 'Sun', val: 3800 },
                    { day: 'Mon', val: 4100 },
                    { day: 'Tue', val: 3200 },
                    { day: 'Wed', val: 5200 },
                    { day: 'Thu', val: 4800 },
                    { day: 'Today', val: 4200 }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div
                        className="w-full max-w-[40px] rounded-t-xl bg-gradient-to-t from-red-600 to-amber-500 hover:brightness-110 transition-all"
                        style={{ height: `${(bar.val / 6000) * 100}%` }}
                        title={`৳${bar.val}`}
                      />
                      <span className="text-[10px] text-gray-400 font-bold">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itemized Recent Trips Ledger (Spec Section 14) */}
              <div className="rounded-3xl border border-white/10 bg-[#10131d] overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <h4 className="font-black text-sm text-white">Trip Earnings Ledger</h4>
                  <span className="text-xs text-gray-400">Platform Commission: 10% Flat</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-[10px] uppercase">
                        <th className="p-4">Trip ID</th>
                        <th className="p-4">Passenger & Route</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Gross Fare</th>
                        <th className="p-4">Mechify (10%)</th>
                        <th className="p-4 font-bold text-emerald-400">Net Take-Home</th>
                        <th className="p-4 text-right">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentDriver.recentTrips?.map((tr, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-mono font-bold text-red-400">{tr.id}</td>
                          <td className="p-4">
                            <strong className="text-white block">{tr.customer}</strong>
                            <span className="text-[11px] text-gray-400">{tr.pickup} ➔ {tr.dropoff}</span>
                          </td>
                          <td className="p-4 text-gray-400">{tr.date}</td>
                          <td className="p-4 font-bold text-white">৳{tr.gross.toLocaleString()}</td>
                          <td className="p-4 text-red-400">-৳{tr.fee.toLocaleString()}</td>
                          <td className="p-4 font-black text-emerald-400 text-sm">৳{tr.net.toLocaleString()}</td>
                          <td className="p-4 text-right">
                            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold">
                              {tr.method}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 7: DRIVER PERFORMANCE SCORECARD (SPEC SECTION 16)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'performance_scorecard' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Driver Performance & Excellence Scorecard</h2>
                <p className="text-xs text-gray-400">Objective metrics evaluating your on-time reliability, customer satisfaction, and dispatch acceptance.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-2">
                  <span className="text-xs text-gray-400 font-bold">Acceptance Rate</span>
                  <div className="text-4xl font-black text-emerald-400">{currentDriver.acceptanceRate}</div>
                  <p className="text-[11px] text-gray-400">Percentage of dispatches accepted within 15 seconds.</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-2">
                  <span className="text-xs text-gray-400 font-bold">On-Time Arrival Rate</span>
                  <div className="text-4xl font-black text-emerald-400">{currentDriver.onTimeRate}</div>
                  <p className="text-[11px] text-gray-400">Arrived at pickup location before or at estimated time.</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-2">
                  <span className="text-xs text-gray-400 font-bold">Repeat Customers</span>
                  <div className="text-4xl font-black text-amber-400">{currentDriver.repeatCustomers}</div>
                  <p className="text-[11px] text-gray-400">Passengers who specifically re-hired you by name.</p>
                </div>
              </div>

              {/* Badges of Distinction */}
              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                <h4 className="text-sm font-black text-white">Chauffeur Accreditations & Badges</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <span className="text-3xl">🛡️</span>
                    <div>
                      <strong className="text-white block font-bold">Zero Incident Guarantee</strong>
                      <span className="text-gray-400 text-[11px]">1,400+ trips with zero reported collisions.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <span className="text-3xl">🏎️</span>
                    <div>
                      <strong className="text-white block font-bold">VIP Defensive Chauffeur</strong>
                      <span className="text-gray-400 text-[11px]">Trained in evasive and executive passenger escort.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <span className="text-3xl">⭐</span>
                    <div>
                      <strong className="text-white block font-bold">Top 1% Driver in Dhaka</strong>
                      <span className="text-gray-400 text-[11px]">Consistently maintains 4.9+ passenger rating.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 8: RATINGS & REVIEWS (SPEC SECTION 17)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'reviews_reputation' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Passenger Ratings & Reputation</h2>
                <p className="text-xs text-gray-400">Verified reviews and comments from completed trips.</p>
              </div>

              {/* Rating Summary */}
              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 flex flex-col sm:flex-row items-center gap-8">
                <div className="text-center sm:border-r border-white/10 sm:pr-8 shrink-0">
                  <div className="text-5xl font-black text-amber-400">{currentDriver.rating}</div>
                  <div className="text-amber-400 text-lg mt-1">★★★★★</div>
                  <div className="text-xs text-gray-400 mt-1">{currentDriver.reviewsCount} verified reviews</div>
                </div>
                <div className="flex-1 w-full space-y-1.5 text-xs">
                  {isDriverWithCar ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-400 block text-[10px]">Driver Professionalism</span>
                        <strong className="text-amber-400 text-base font-black">5.0 / 5.0</strong>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-400 block text-[10px]">Vehicle Cleanliness & AC</span>
                        <strong className="text-amber-400 text-base font-black">4.9 / 5.0</strong>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-400 block text-[10px]">Driving Smoothness</span>
                        <strong className="text-amber-400 text-base font-black">5.0 / 5.0</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-400 block text-[10px]">Chauffeur Etiquette</span>
                        <strong className="text-amber-400 text-base font-black">5.0 / 5.0</strong>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-400 block text-[10px]">Vehicle Handling</span>
                        <strong className="text-amber-400 text-base font-black">5.0 / 5.0</strong>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-400 block text-[10px]">Punctuality</span>
                        <strong className="text-amber-400 text-base font-black">4.9 / 5.0</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {currentDriver.reviews?.map(rev => (
                  <div key={rev.id} className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-3 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-white text-sm block font-bold">{rev.author}</strong>
                        <span className="text-gray-400 text-[11px]">{rev.date} • Verified Trip</span>
                      </div>
                      <span className="text-amber-400">{'★'.repeat(rev.rating)}</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed text-sm">{rev.comment}</p>
                    {rev.reply && (
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-[11px]">
                        <span className="text-red-400 font-bold block mb-0.5">Your Response:</span>
                        <p className="text-gray-300">{rev.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 9: PUBLIC DRIVER PROFILE PREVIEW (SPEC SECTION 18)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'public_profile' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Public Chauffeur Profile Preview</h2>
                <p className="text-xs text-gray-400">This is how your verified profile appears to Mechify clients when booking a driver.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#10131d] border border-white/15 shadow-2xl space-y-6">
                
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-white/10 pb-6 text-center sm:text-left">
                  <img src={currentDriver.avatar} alt={currentDriver.name} className="w-24 h-24 rounded-3xl object-cover border-4 border-red-600 shadow-2xl" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <h3 className="text-2xl font-black text-white">{currentDriver.name}</h3>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="text-xs text-red-400 font-bold">
                      {isDriverWithCar ? 'Professional Driver With Car' : 'Private Executive Chauffeur (Without Car)'}
                    </p>
                    <p className="text-xs text-gray-300">
                      ★ <strong>{currentDriver.rating}</strong> ({currentDriver.reviewsCount} trips) • {currentDriver.experience} experience
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1 text-[11px] text-gray-400">
                      <span>🗣️ {currentDriver.languages?.join(', ')}</span>
                      <span>•</span>
                      <span>📍 {currentDriver.serviceAreas?.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-gray-400">Driving Specialties & Disciplines</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentDriver.drivingSpecialties?.map((s, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-gray-200">
                        ⭐ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vehicle Showcase (If With Car) */}
                {isDriverWithCar && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 text-xs">
                    <h4 className="text-xs font-black uppercase text-amber-400">Vehicle Included with Driver</h4>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <img src={currentDriver.vehicle?.image} alt="Car" className="w-full sm:w-48 h-28 object-cover rounded-xl border border-white/10" />
                      <div>
                        <strong className="text-white text-base block font-bold">{currentDriver.vehicle?.make} {currentDriver.vehicle?.model}</strong>
                        <span className="text-gray-400 block">{currentDriver.vehicle?.transmission} • {currentDriver.vehicle?.seats} Seats • AC</span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {currentDriver.vehicle?.features?.map((f, idx) => (
                            <span key={idx} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-300">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vehicle Categories (If Without Car) */}
                {!isDriverWithCar && (
                  <div className="space-y-2 text-xs">
                    <h4 className="text-xs font-black uppercase text-cyan-400">Qualified to Drive Customer Vehicles</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentDriver.vehicleCategoriesCanDrive?.map((cat, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-200">{cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 10: DOCUMENTS & VERIFICATION CENTER (SPEC SECTION 3 & 19)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'documents_verification' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-white">Driver Verification & Document Vault</h2>
                  <p className="text-xs text-gray-400">Official license credentials, police clearance, and vehicle documentation.</p>
                </div>
                <button
                  onClick={() => setShowDocUploadModal(true)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black"
                >
                  + Upload / Update Document
                </button>
              </div>

              {/* Expiration Alert Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-amber-400 font-bold">
                  <span className="text-xl">⚠️</span>
                  <span>Your BRTA Driving License validity is in good standing (Expires in 2028).</span>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  Compliant
                </span>
              </div>

              {/* Document Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-white text-sm block font-bold">BRTA Professional Driving License</strong>
                      <span className="text-gray-400 text-[11px]">License #: {currentDriver.verification?.license?.docNumber}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px]">
                      ✓ {currentDriver.verification?.license?.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px]">Valid Until: <strong className="text-white">{currentDriver.verification?.license?.expiry}</strong></p>
                </div>

                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-white text-sm block font-bold">National Identity (NID) Card</strong>
                      <span className="text-gray-400 text-[11px]">NID #: {currentDriver.verification?.identity?.docNumber}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px]">
                      ✓ {currentDriver.verification?.identity?.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px]">Government Election Commission Database Verified</p>
                </div>

                {isDriverWithCar && (
                  <>
                    <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-white text-sm block font-bold">Vehicle Registration & Tax Token</strong>
                          <span className="text-gray-400 text-[11px]">{currentDriver.verification?.vehicleDocs?.date}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px]">
                          ✓ {currentDriver.verification?.vehicleDocs?.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-[11px]">Fitness Valid Until: <strong className="text-white">{currentDriver.verification?.vehicleDocs?.expiry}</strong></p>
                    </div>

                    <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-white text-sm block font-bold">Commercial Vehicle Insurance</strong>
                          <span className="text-gray-400 text-[11px]">Policy: {currentDriver.verification?.vehicleInsurance?.policyNo}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px]">
                          ✓ {currentDriver.verification?.vehicleInsurance?.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-[11px]">Provider: <strong className="text-white">{currentDriver.verification?.vehicleInsurance?.provider}</strong></p>
                    </div>
                  </>
                )}

                <div className="p-5 rounded-3xl bg-[#10131d] border border-white/10 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-white text-sm block font-bold">Police Background Verification</strong>
                      <span className="text-gray-400 text-[11px]">{currentDriver.verification?.backgroundCheck?.agency}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px]">
                      ✓ Clean Record
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px]">Special Branch security audit completed with zero infractions.</p>
                </div>

              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 11: IN-APP CUSTOMER CHAT & QUICK REPLIES (SPEC SECTION 21)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'chat_messenger' && (
            <div className="max-w-2xl mx-auto space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-white">Passenger Messenger</h2>
                  <p className="text-xs text-gray-400">Direct instant communication with active booking passengers.</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Live Chat
                </span>
              </div>

              {/* Chat Card */}
              <div className="rounded-3xl border border-white/15 bg-[#10131d] overflow-hidden flex flex-col h-[520px]">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center font-bold text-white text-sm">
                      Z
                    </div>
                    <div>
                      <strong className="text-white block font-bold">{activeJob?.customerName || 'Zubair Al-Mamun'}</strong>
                      <span className="text-gray-400 text-[10px]">Passenger • Active Booking</span>
                    </div>
                  </div>
                  <a href={`tel:${activeJob?.customerPhone || '+880 1912-889900'}`} className="px-3 py-1.5 rounded-xl bg-white/10 text-white font-bold">
                    📞 Call
                  </a>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                  {chatMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'driver' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3.5 rounded-2xl ${
                          msg.sender === 'driver'
                            ? 'bg-red-600 text-white rounded-br-none'
                            : 'bg-white/10 text-gray-200 rounded-bl-none'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <span className="text-[9px] opacity-70 block text-right mt-1">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Quick Reply One-Tap Chips (Spec Section 21 & 27) */}
                <div className="p-2.5 bg-black/40 border-t border-white/5 overflow-x-auto flex gap-2 text-[11px] no-scrollbar">
                  {[
                    "I'm on my way to pickup location.",
                    "I've arrived at pickup location.",
                    "Please share your exact GPS pin.",
                    "Traffic causing a 5-min delay."
                  ].map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => sendQuickReply(chip)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white whitespace-nowrap font-medium transition-colors border border-white/5"
                    >
                      ⚡ {chip}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendCustomMessage} className="p-3 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type message to customer..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs"
                  >
                    Send
                  </button>
                </form>

              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 12: CUSTOMER HIRING EXPERIENCE SIMULATOR (SPEC SECTION 28 & 29)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'customer_hiring_flow' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-black text-white">Customer Driver Hiring Experience</h2>
                  <p className="text-xs text-gray-400">Test how customers hire a Driver With Car or Driver Without Car on Mechify.</p>
                </div>
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  Interactive Simulator
                </span>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#10131d] border border-white/15 space-y-6">
                
                {/* Step 1: Mode Toggle */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">Step 1 — What service do you need?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setHiringMode('with_car')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        hiringMode === 'with_car'
                          ? 'bg-red-600/20 border-red-500 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="text-2xl mb-1">🚗</div>
                      <strong className="text-white text-sm block">Driver With Car</strong>
                      <span className="text-xs text-gray-400">Professional chauffeur providing their own premium vehicle.</span>
                    </button>

                    <button
                      onClick={() => setHiringMode('without_car')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        hiringMode === 'without_car'
                          ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="text-2xl mb-1">👔</div>
                      <strong className="text-white text-sm block">Driver Without Car (Chauffeur Only)</strong>
                      <span className="text-xs text-gray-400">Expert driver to operate your private supercar, SUV or sedan.</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Route & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Pickup Location</label>
                    <input
                      type="text"
                      value={hirePickup}
                      onChange={(e) => setHirePickup(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Destination</label>
                    <input
                      type="text"
                      value={hireDropoff}
                      onChange={(e) => setHireDropoff(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Step 3: Vehicle Specifications */}
                {hiringMode === 'with_car' ? (
                  <div className="text-xs space-y-1">
                    <label className="block font-bold text-gray-300">Preferred Vehicle Category</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Premium Sedan (Camry / E-Class)', 'Luxury 4x4 SUV (Prado)', 'Executive Minivan (Vellfire)'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setHireVehicleType(cat)}
                          className={`p-3 rounded-xl border text-left ${
                            hireVehicleType === cat ? 'bg-white/10 border-red-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'
                          }`}
                        >
                          <strong className="block truncate">{cat}</strong>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs space-y-1">
                    <label className="block font-bold text-gray-300">Your Vehicle Make & Model</label>
                    <input
                      type="text"
                      value={hireCustomerCar}
                      onChange={(e) => setHireCustomerCar(e.target.value)}
                      placeholder="e.g. Toyota Land Cruiser LC300 / Ferrari 488"
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                )}

                {/* Step 4: Available Verified Drivers Selection */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase text-gray-400">
                    Step 4 — Select Available Verified Driver ({DRIVER_DEMO_ACCOUNTS.filter(d => d.driverType === hiringMode).length} Available)
                  </h4>

                  <div className="space-y-3">
                    {DRIVER_DEMO_ACCOUNTS
                      .filter(d => d.driverType === hiringMode)
                      .map(driver => (
                        <div
                          key={driver.id}
                          onClick={() => setSelectedDriverForHire(driver)}
                          className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-all ${
                            selectedDriverForHire?.id === driver.id
                              ? 'bg-red-600/10 border-red-500 shadow-md'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <img src={driver.avatar} alt={driver.name} className="w-12 h-12 rounded-2xl object-cover border border-white/10" />
                            <div>
                              <div className="flex items-center gap-2">
                                <strong className="text-white text-sm font-bold">{driver.name}</strong>
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  ✓ Verified
                                </span>
                              </div>
                              <p className="text-xs text-gray-400">
                                ★ <strong className="text-amber-400">{driver.rating}</strong> ({driver.reviewsCount} reviews) • {driver.experience} exp
                              </p>
                              {hiringMode === 'with_car' && (
                                <span className="text-xs text-amber-400 font-bold block mt-0.5">
                                  Includes: {driver.vehicle?.make} {driver.vehicle?.model}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                            <span className="text-emerald-400 font-black text-base">
                              {hiringMode === 'with_car' ? '৳1,450 / trip' : '৳1,800 / day'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDriverForHire(driver);
                                alert(`Booking confirmed for ${driver.name}! Dispatched to driver's dashboard.`);
                                triggerMockIncomingRequest();
                              }}
                              className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow"
                            >
                              Confirm Booking
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              MODULE 13: DRIVER SUPPORT & HELP TICKETS (SPEC SECTION 24)
             ══════════════════════════════════════════════════════════════════════ */}
          {activeNav === 'support_center' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Driver 24/7 Support Center</h2>
                <p className="text-xs text-gray-400">Direct access to Mechify merchant hotline, safety incident reporting, and ticket status.</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-4">
                <h4 className="text-sm font-black text-white">Emergency & Merchant Hotlines</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <strong className="text-white block font-bold">Driver Support Helpline</strong>
                      <span className="text-gray-400">+880 1304-098448</span>
                    </div>
                    <a href="tel:+8801304098448" className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold text-xs">
                      Call Now
                    </a>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <strong className="text-white block font-bold">24/7 Roadside Towing Hub</strong>
                      <span className="text-gray-400">Towing, Jumpstart, Flat Tire</span>
                    </div>
                    <button onClick={() => setShowEmergencyModal(true)} className="px-3 py-1.5 rounded-xl bg-white/10 text-white font-bold text-xs">
                      Request Tow
                    </button>
                  </div>
                </div>
              </div>

              {/* Support Tickets */}
              <div className="p-6 rounded-3xl bg-[#10131d] border border-white/10 space-y-3 text-xs">
                <h4 className="text-sm font-black text-white">Recent Support Inquiries</h4>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                  <div>
                    <strong className="text-white block font-bold">TKT-1082: Fare adjustment for waiting time</strong>
                    <span className="text-gray-400">Submitted 2 days ago • Trip #TRIP-8991</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    ✓ Resolved
                  </span>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ─── MOBILE BOTTOM BAR NAVIGATION (SPEC SECTION 25 & 32) ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e17]/95 backdrop-blur-md border-t border-white/10 px-2 py-2 flex justify-around items-center">
        {[
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'active_trip', label: 'Trip', icon: '📍', badge: activeJob ? '●' : undefined },
          { id: 'incoming_jobs', label: 'Jobs', icon: '⚡' },
          { id: 'earnings_ledger', label: 'Earnings', icon: '💰' },
          { id: 'public_profile', label: 'Profile', icon: '👤' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all relative ${
              activeNav === item.id ? 'text-red-500 font-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
            {item.badge && (
              <span className="absolute top-0 right-3 text-red-500 font-black text-xs animate-ping">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      {/* ─── MODAL: ALWAYS-ACCESSIBLE EMERGENCY ASSISTANCE (SPEC SECTION 23) ─── */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#141724] border-2 border-red-600 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center relative">
            <button
              onClick={() => setShowEmergencyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 border border-red-500 flex items-center justify-center text-3xl mx-auto animate-pulse">
              🚨
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">Emergency Assistance</h3>
              <p className="text-xs text-gray-300 mt-1">
                Select required immediate emergency support. Your live GPS coordinates will be sent to the dispatcher.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <a
                href="tel:999"
                className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-red-900/50"
              >
                <span>🚨</span> Call National Emergency (999)
              </a>

              <a
                href="tel:+8801304098448"
                className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center gap-2 border border-white/10"
              >
                <span>📞</span> Mechify 24/7 Security Hotline
              </a>

              <button
                onClick={() => {
                  alert("Rapid Roadside Towing & Mechanic unit dispatched to your location!");
                  setShowEmergencyModal(false);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center gap-2 border border-white/10"
              >
                <span>🛞</span> Request Roadside Breakdown Tow
              </button>
            </div>

            <button
              onClick={() => setShowEmergencyModal(false)}
              className="text-xs text-gray-400 hover:text-white font-bold block mx-auto pt-2"
            >
              Cancel Emergency Mode
            </button>
          </div>
        </div>
      )}

      {/* ─── MODAL: STEP-BY-STEP DRIVER REGISTRATION (SPEC SECTION 2) ─── */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#121522] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setShowRegistrationModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-red-400">Step {regStep} of 6</span>
              <h3 className="text-xl font-black text-white mt-0.5">Driver Onboarding & Registration</h3>
            </div>

            {/* Step 1: Basic Info */}
            {regStep === 1 && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Full Legal Name</label>
                  <input type="text" placeholder="e.g. Tariqul Islam" className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Phone Number</label>
                    <input type="text" placeholder="+880 1711-000000" className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Email Address</label>
                    <input type="email" placeholder="tariqul@gmail.com" className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Driver Type Selection */}
            {regStep === 2 && (
              <div className="space-y-3 text-xs">
                <label className="block font-bold mb-2">Select Your Driver Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-red-500 cursor-pointer">
                    <strong className="text-white block font-bold">🚗 Driver With Car</strong>
                    <span className="text-gray-400 text-[11px] block mt-1">I provide professional service using my own registered vehicle.</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
                    <strong className="text-white block font-bold">👔 Driver Without Car</strong>
                    <span className="text-gray-400 text-[11px] block mt-1">I am a professional chauffeur who drives the customer's vehicle.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 to 6: Navigation controls */}
            <div className="flex justify-between pt-4 border-t border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setRegStep(prev => Math.max(1, prev - 1))}
                disabled={regStep === 1}
                className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold disabled:opacity-30"
              >
                Back
              </button>
              {regStep < 6 ? (
                <button
                  type="button"
                  onClick={() => setRegStep(prev => Math.min(6, prev + 1))}
                  className="px-5 py-2 rounded-xl bg-red-600 text-white font-black"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    alert("Registration application submitted for Mechify verification!");
                    setShowRegistrationModal(false);
                    setRegStep(1);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-black"
                >
                  Submit for Verification
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: PAYOUT WITHDRAWAL (SPEC SECTION 15) ─── */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#121522] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4 text-xs">
            <button
              onClick={() => setShowPayoutModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-white">Disburse Driver Earnings</h3>
            <p className="text-gray-400">Withdraw your available balance directly to mobile wallet or bank account.</p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Available Balance</span>
              <span className="text-2xl font-black text-emerald-400">৳{availableBalance.toLocaleString()}</span>
            </div>

            <div>
              <label className="block font-bold mb-1 text-gray-300">Withdrawal Amount (BDT ৳)</label>
              <input
                type="number"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-gray-300">Payout Destination</label>
              <div className="grid grid-cols-3 gap-2">
                {['bKash', 'Nagad', 'Bank Wire'].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPayoutMethod(m)}
                    className={`py-2 px-3 rounded-xl font-bold border text-center ${
                      payoutMethod === m ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowPayoutModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const amt = parseInt(payoutAmount) || 0;
                  if (amt <= 0 || amt > availableBalance) {
                    alert("Invalid withdrawal amount.");
                    return;
                  }
                  setAvailableBalance(prev => prev - amt);
                  setShowPayoutModal(false);
                  alert(`Payout of ৳${amt.toLocaleString()} initiated to your ${payoutMethod} account! Funds arriving shortly.`);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black"
              >
                Confirm Payout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: DOCUMENT UPLOAD (SPEC SECTION 19) ─── */}
      {showDocUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#121522] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4 text-xs">
            <button
              onClick={() => setShowDocUploadModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-white">Upload / Update Document</h3>
            <p className="text-gray-400">Submit renewed driving license, fitness token, or vehicle insurance.</p>

            <div>
              <label className="block font-bold mb-1 text-gray-300">Document Type</label>
              <select className="w-full p-2.5 rounded-xl bg-[#1a1e30] border border-white/10 text-white">
                <option>BRTA Driving License Renewal</option>
                <option>Vehicle Tax Token & Fitness</option>
                <option>Commercial Insurance Policy</option>
                <option>Police Clearance Certificate</option>
              </select>
            </div>

            <div className="p-8 rounded-2xl border-2 border-dashed border-white/20 text-center space-y-2 cursor-pointer hover:border-red-500 transition-colors">
              <span className="text-3xl">📁</span>
              <p className="text-gray-300 font-bold">Click or drag document scan/photo here</p>
              <span className="text-[10px] text-gray-500">PDF, JPG, PNG up to 10MB</span>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowDocUploadModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Document uploaded successfully! Under automated verification.");
                  setShowDocUploadModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black"
              >
                Submit Document
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeService() {
  const navigate = useNavigate();

  // Active View Tab: 'wizard-view' | 'matrix-view' | 'dispatch-view' | 'inspection-view' | 'invoice-view'
  const [activeView, setActiveView] = useState('wizard-view');

  // Booking Wizard States
  const [selectedVehicle, setSelectedVehicle] = useState('bmw-m3');
  const [problemDescription, setProblemDescription] = useState('Strange clicking noise & vibration when braking at low speed near Gulshan-2 circle');
  const [selectedCategory, setSelectedCategory] = useState('brakes');
  const [selectedLocation, setSelectedLocation] = useState('home');
  const [selectedWorkshop, setSelectedWorkshop] = useState('premium-auto');
  const [selectedMechanic, setSelectedMechanic] = useState('rahim-ahmed');
  const [mechanicMode, setMechanicMode] = useState('specific'); // 'specific' | 'auto'
  const [dispatchTime, setDispatchTime] = useState('asap');
  const [workshopFilter, setWorkshopFilter] = useState('all');
  const [searchWorkshopQuery, setSearchWorkshopQuery] = useState('');

  // Diagnostic Approval State
  const [quoteApproved, setQuoteApproved] = useState(false);
  const [quoteDeclined, setQuoteDeclined] = useState(false);

  // SOS Emergency Modal State
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosType, setSosType] = useState('Dead 12V Battery Boost');
  const [sosLocation, setSosLocation] = useState('House 14, Road 11, Banani DOHS, Dhaka');
  const [sosDispatched, setSosDispatched] = useState(false);

  // Direct Comms Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const scrollToWizard = () => {
    setActiveView('wizard-view');
    const el = document.getElementById('wizard-container');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDispatchConfirm = () => {
    showToast('Concierge Booking Confirmed! Master Mechanic Rahim Ahmed dispatched. Telemetry live.');
    setActiveView('dispatch-view');
  };

  const handleSosDispatch = () => {
    setSosModalOpen(false);
    setSosDispatched(true);
    showToast('🚨 RAPID SOS DISPATCHED! Mobile Motorcycle Unit #07 is en route. ETA: 14 minutes.');
    setActiveView('dispatch-view');
  };

  return (
    <div className="min-h-screen bg-[#10131a] text-[#e0e2ec] font-['Manrope',sans-serif] selection:bg-[#ff2a42] selection:text-white pt-20 pb-16">
      
      {/* Toast Notification HUD */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg bg-[#0b0e15] text-white border border-[#ff2a42] shadow-[0_0_24px_rgba(255,42,66,0.4)] animate-fadeIn">
          <span className="material-symbols-outlined text-[#ff2a42] text-[22px] animate-pulse">crisis_alert</span>
          <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: HERO & LANDING CONCIERGE */}
      <section className="relative w-full px-4 md:px-12 pt-6 pb-12 overflow-hidden">
        {/* Ambient Telemetry Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ff2a42]/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#feb300]/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-start">
          {/* Micro Top Metadata HUD Rail */}
          <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#272a31]/60">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1d2027] text-[#ff2a42] font-['JetBrains_Mono',monospace] text-[10px] uppercase tracking-widest shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#ff2a42] animate-ping" />
              MECHIFY DOORSTEP CONCIERGE · ON-DEMAND LUXURY WORKSHOP DISPATCH
            </div>
            <div className="flex items-center gap-4 md:gap-6 font-['JetBrains_Mono',monospace] text-[11px] text-[#bac9cc]">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#a8ffd2]" />SYSTEM ONLINE</span>
              <span className="text-[#849396]">/</span>
              <span className="text-[#e0e2ec]">RADAR: DHAKA REGION 23.7937° N, 90.4043° E</span>
              <span className="text-[#849396] hidden sm:inline">/</span>
              <span className="text-[#ffd799] font-semibold hidden sm:inline">AVG ETA: 21 MIN</span>
            </div>
          </div>

          {/* Main Headline Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl md:text-6xl uppercase text-[#e0e2ec] font-bold tracking-tight leading-none">
                Professional Car Repair.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a42] via-[#ef4444] to-red-400">
                  At Your Doorstep.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#bac9cc] max-w-2xl leading-relaxed">
                Choose a trusted Mechify workshop, select a certified master mechanic, and get precision diagnostic and repair work completed at your home, office, or private garage.
              </p>
            </div>

            {/* Action Cockpit Triggers */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 w-full">
              <button 
                onClick={scrollToWizard}
                className="w-full h-14 px-6 rounded bg-[#ff2a42] text-white font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider font-bold flex items-center justify-between group hover:shadow-[0_0_24px_rgba(255,42,66,0.5)] transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
                  Book a Home Service
                </span>
                <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              
              <button 
                onClick={() => { setActiveView('matrix-view'); }}
                className="w-full h-12 px-6 rounded bg-[#272a31] text-[#e0e2ec] hover:text-[#ff2a42] font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-colors cursor-pointer border border-[#3b494c]/60"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">storefront</span>
                  Explore 24 Verified Workshops
                </span>
                <span className="text-[10px] text-[#ff2a42] font-mono">24/24 LIVE</span>
              </button>

              <button 
                onClick={() => setSosModalOpen(true)}
                className="w-full h-11 px-6 rounded bg-[#feb300]/20 text-[#ffd799] border border-[#ffd799]/30 hover:bg-[#feb300]/30 hover:text-white font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] animate-pulse">sos</span>
                  Emergency Dispatch (~15m)
                </span>
                <span className="text-[10px] font-mono">STANDBY ACTIVE</span>
              </button>
            </div>
          </div>

          {/* Trust Indicators Telemetry Bar */}
          <div className="w-full mt-10 pt-6 border-t border-[#272a31]/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: 'verified', title: 'Verified Workshops', sub: '100% Inspected', color: 'text-[#a8ffd2]' },
              { icon: 'workspace_premium', title: 'Master Techs', sub: 'ASE & Mechify Cert', color: 'text-[#ff2a42]' },
              { icon: 'payments', title: 'Transparent Fees', sub: 'Zero Hidden Addons', color: 'text-[#ffd799]' },
              { icon: 'lock_clock', title: 'Escrow Vault', sub: 'Pay on Completion', color: 'text-[#5be9ad]' },
              { icon: 'satellite_alt', title: 'Real-time GPS', sub: 'Sub-meter Tracking', color: 'text-[#ff2a42]' },
              { icon: 'shield', title: '6-Month Warranty', sub: '100% Guaranteed', color: 'text-[#ff2a42]' }
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded bg-[#0b0e15]/60 border border-[#272a31]">
                <span className={`material-symbols-outlined ${b.color} text-[20px]`}>{b.icon}</span>
                <div className="flex flex-col">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#e0e2ec] uppercase font-bold">{b.title}</span>
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] text-[#bac9cc]">{b.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: DYNAMIC LIVE ACTIVE BOOKING STATUS BANNER */}
      <section className="w-full px-4 md:px-12 -mt-2 mb-8 z-30">
        <div className="max-w-7xl mx-auto rounded-xl bg-[#191c23] border border-[#272a31] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Live Job Ticker HUD */}
          <div className="bg-[#0b0e15] px-4 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-[#272a31]">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#feb300] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffd799]" />
              </span>
              <span className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider text-[#ffd799] font-bold">LIVE TELEMETRY ALERT</span>
              <span className="text-[#849396]">|</span>
              <span className="font-['JetBrains_Mono',monospace] text-xs text-[#e0e2ec]">
                Active Job <span className="text-[#ff2a42] font-mono font-bold">#MC-8821</span>:
                <span className="text-white font-semibold ml-1">Rahim Ahmed</span> (<span className="text-[#bac9cc]">Dhaka Performance Garage</span>) is en route to <span className="text-[#ff2a42]">Banani DOHS, House 14</span>.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#feb300]/10 text-[#ffd799] font-['JetBrains_Mono',monospace] text-[10px] uppercase font-bold border border-[#ffd799]/20">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                ETA: 18 MINS (2.3 KM)
              </div>
              <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] hidden md:inline">VEHICLE: 2022 BMW M3 COMPETITION</span>
            </div>
          </div>

          {/* Interactive View Switcher Tabs */}
          <div className="bg-[#1d2027] px-4 py-2.5 flex items-center gap-2 overflow-x-auto border-t border-[#272a31]">
            <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] uppercase tracking-wider mr-2 shrink-0">MODULE PREVIEWS:</span>
            
            {[
              { id: 'wizard-view', label: '1. Progressive Booking Engine' },
              { id: 'matrix-view', label: '2. Workshop Comparison Matrix' },
              { id: 'dispatch-view', label: '3. Live GPS Dispatch & Tracker' },
              { id: 'inspection-view', label: '4. Digital Inspection & Extra Auth' },
              { id: 'invoice-view', label: '5. Service History & Warranty Vault' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`px-3.5 py-1.5 rounded font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer font-bold ${
                  activeView === tab.id
                    ? 'bg-[#272a31] text-[#ff2a42] shadow-[inset_0_-2px_0_#ff2a42] border border-[#ff2a42]/30'
                    : 'text-[#bac9cc] hover:text-[#e0e2ec] hover:bg-[#272a31]/50 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* VIEW 1: PROGRESSIVE BOOKING ENGINE */}
      {activeView === 'wizard-view' && (
        <section id="wizard-container" className="w-full px-4 md:px-12 mb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Wizard Main Flow (Left 8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Progress Step Indicator Bar */}
              <div className="p-4 rounded-xl bg-[#191c23] border border-[#272a31] shadow-sm">
                <div className="flex items-center justify-between mb-3 font-['JetBrains_Mono',monospace] text-xs">
                  <span className="text-[#ff2a42] font-bold uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff2a42]" />
                    STEP 4 OF 7: WORKSHOP &amp; MECHANIC DISPATCH
                  </span>
                  <span className="text-[#bac9cc]">ESTIMATED COMPLETION: 2 MIN</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  <div className="h-1.5 rounded-full bg-[#ff2a42]" />
                  <div className="h-1.5 rounded-full bg-[#ff2a42]" />
                  <div className="h-1.5 rounded-full bg-[#ff2a42]" />
                  <div className="h-1.5 rounded-full bg-[#ff2a42] animate-pulse" />
                  <div className="h-1.5 rounded-full bg-[#32353c]" />
                  <div className="h-1.5 rounded-full bg-[#32353c]" />
                  <div className="h-1.5 rounded-full bg-[#32353c]" />
                </div>
              </div>

              {/* STEP 1: VEHICLE SELECTION */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] relative shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-xs px-2 py-0.5 rounded bg-[#ff2a42] text-white font-bold">01</span>
                    <h2 className="font-['Space_Grotesk',sans-serif] text-lg uppercase text-[#e0e2ec] font-bold">SELECT CONCIERGE VEHICLE</h2>
                  </div>
                  <button 
                    onClick={() => showToast('Add Vehicle modal: connect your car via VIN or digital registration')}
                    className="font-['JetBrains_Mono',monospace] text-xs text-[#ff2a42] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span> Add New Vehicle
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Selected Vehicle: BMW M3 */}
                  <div 
                    onClick={() => setSelectedVehicle('bmw-m3')}
                    className={`p-4 rounded-lg relative cursor-pointer transition-all ${
                      selectedVehicle === 'bmw-m3'
                        ? 'bg-[#272a31] ring-1 ring-[#ff2a42] shadow-[0_0_16px_rgba(255,42,66,0.2)]'
                        : 'bg-[#1d2027] hover:bg-[#272a31] opacity-70 hover:opacity-100 border border-[#3b494c]'
                    }`}
                  >
                    {selectedVehicle === 'bmw-m3' && (
                      <span className="absolute top-3 right-3 text-[#ff2a42] material-symbols-outlined text-[20px]">check_circle</span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded bg-[#0b0e15] flex items-center justify-center shrink-0 border border-[#272a31]">
                        <span className="material-symbols-outlined text-[#ff2a42] text-[28px]">speed</span>
                      </div>
                      <div className="min-w-0">
                        <span className="font-['JetBrains_Mono',monospace] text-[9px] text-[#a8ffd2] uppercase font-bold tracking-wider">ACTIVE TELEMETRY SYNC</span>
                        <p className="font-['Space_Grotesk',sans-serif] text-base text-white truncate font-bold">2022 BMW M3 Competition</p>
                        <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] mt-1 font-mono">DHA-GA-45-8821 · 24,150 KM · S58 TWIN-TURBO</p>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Vehicle: Porsche Taycan */}
                  <div 
                    onClick={() => setSelectedVehicle('taycan')}
                    className={`p-4 rounded-lg relative cursor-pointer transition-all ${
                      selectedVehicle === 'taycan'
                        ? 'bg-[#272a31] ring-1 ring-[#ff2a42] shadow-[0_0_16px_rgba(255,42,66,0.2)]'
                        : 'bg-[#1d2027] hover:bg-[#272a31] opacity-70 hover:opacity-100 border border-[#3b494c]'
                    }`}
                  >
                    {selectedVehicle === 'taycan' && (
                      <span className="absolute top-3 right-3 text-[#ff2a42] material-symbols-outlined text-[20px]">check_circle</span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded bg-[#0b0e15] flex items-center justify-center shrink-0 border border-[#272a31]">
                        <span className="material-symbols-outlined text-[#bac9cc] text-[28px]">electric_car</span>
                      </div>
                      <div className="min-w-0">
                        <span className="font-['JetBrains_Mono',monospace] text-[9px] text-[#bac9cc] uppercase font-bold tracking-wider">STANDBY VEHICLE</span>
                        <p className="font-['Space_Grotesk',sans-serif] text-base text-white truncate font-bold">2023 Porsche Taycan 4S</p>
                        <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] mt-1 font-mono">DHA-LA-11-0941 · 8,240 KM · DUAL MOTOR EV</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: DESCRIBE PROBLEM & SERVICE CATEGORY */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-xs px-2 py-0.5 rounded bg-[#ff2a42] text-white font-bold">02</span>
                    <h2 className="font-['Space_Grotesk',sans-serif] text-lg uppercase text-[#e0e2ec] font-bold">DESCRIBE PROBLEM &amp; CATEGORY</h2>
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#ff2a42] uppercase font-mono font-bold">STEP-BY-STEP DIAGNOSTICS</span>
                </div>

                {/* Problem description input */}
                <div className="relative">
                  <label className="block font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] uppercase tracking-wider mb-1.5">Problem Symptoms / Sound / Sensor Warning</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 material-symbols-outlined text-[#bac9cc] text-[20px]">search</span>
                    <input 
                      type="text" 
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      className="w-full bg-[#0b0e15] text-[#e0e2ec] text-sm pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff2a42] border border-[#272a31] shadow-inner" 
                    />
                  </div>
                </div>

                {/* Grid of 10 Service Categories */}
                <div>
                  <span className="block font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] uppercase tracking-wider mb-2.5">Select Service Category</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {[
                      { id: 'engine', name: 'Engine Diagnostics', icon: 'memory', color: 'text-[#ff2a42]' },
                      { id: 'brakes', name: 'Brakes & Rotors', icon: 'adjust', color: 'text-[#ff2a42]' },
                      { id: 'fluids', name: 'Oil & Fluids', icon: 'water_drop', color: 'text-[#a8ffd2]' },
                      { id: 'battery', name: 'Battery Replacement', icon: 'battery_charging_full', color: 'text-[#ffd799]' },
                      { id: 'climate', name: 'AC Climate System', icon: 'mode_fan', color: 'text-red-400' },
                      { id: 'electrical', name: 'Electrical Telemetry', icon: 'bolt', color: 'text-[#bac9cc]' },
                      { id: 'suspension', name: 'Suspension & Steering', icon: 'hdr_auto', color: 'text-[#bac9cc]' },
                      { id: 'sos', name: "Won't Start (SOS)", icon: 'no_crash', color: 'text-[#ffd799]' },
                      { id: 'overheating', name: 'Overheating Issue', icon: 'device_thermostat', color: 'text-red-500' },
                      { id: 'pretrip', name: 'Pre-Trip Inspection', icon: 'checklist', color: 'text-[#a8ffd2]' },
                    ].map(cat => (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-3 rounded-lg cursor-pointer flex flex-col items-center text-center transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-[#272a31] ring-1 ring-[#ff2a42] shadow-[0_0_14px_rgba(255,42,66,0.3)]'
                            : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                        }`}
                      >
                        <span className={`material-symbols-outlined ${cat.color} text-[24px] mb-1`}>{cat.icon}</span>
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#e0e2ec] font-bold">{cat.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagnostic Media Upload Preview */}
                <div className="pt-2 border-t border-[#272a31]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] uppercase tracking-wider">Diagnostic Media Attached (2 files)</span>
                    <button 
                      onClick={() => showToast('Simulating camera snap / media upload...')}
                      className="font-['JetBrains_Mono',monospace] text-[10px] text-[#ff2a42] flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <span className="material-symbols-outlined text-[14px]">attach_file</span> Add Photo / Audio Note
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-2.5 rounded bg-[#0b0e15] border border-[#272a31]">
                      <div className="w-10 h-10 rounded bg-[#1d2027] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#ff2a42] text-[20px]">image</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-['JetBrains_Mono',monospace] text-[11px] text-white truncate">front_caliper_rotor_groove.jpg</p>
                        <p className="font-['JetBrains_Mono',monospace] text-[9px] text-[#bac9cc]">3.4 MB · Visual inspection</p>
                      </div>
                      <span className="material-symbols-outlined text-[#a8ffd2] text-[18px]">done</span>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded bg-[#0b0e15] border border-[#272a31]">
                      <div className="w-10 h-10 rounded bg-[#1d2027] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#ffd799] text-[20px]">warning</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-['JetBrains_Mono',monospace] text-[11px] text-white truncate">dash_warning_brake_pad_sensor.png</p>
                        <p className="font-['JetBrains_Mono',monospace] text-[9px] text-[#bac9cc]">1.8 MB · HUD snapshot</p>
                      </div>
                      <span className="material-symbols-outlined text-[#a8ffd2] text-[18px]">done</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: LOCATION SELECTION */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-xs px-2 py-0.5 rounded bg-[#ff2a42] text-white font-bold">03</span>
                    <h2 className="font-['Space_Grotesk',sans-serif] text-lg uppercase text-[#e0e2ec] font-bold">DOORSTEP DISPATCH LOCATION</h2>
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#a8ffd2] flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a8ffd2] animate-pulse" /> GPS PIN PRECISE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Home */}
                  <div 
                    onClick={() => setSelectedLocation('home')}
                    className={`p-3 rounded-lg cursor-pointer flex flex-col justify-between transition-all ${
                      selectedLocation === 'home'
                        ? 'bg-[#272a31] ring-1 ring-[#ff2a42]'
                        : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                    }`}
                  >
                    <div>
                      <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#ff2a42] uppercase font-bold">SAVED HOME (DEFAULT)</span>
                      <p className="text-sm text-white font-semibold mt-1">House 14, Road 11</p>
                      <p className="text-xs text-[#bac9cc]">Banani DOHS, Dhaka</p>
                    </div>
                    <p className="font-['JetBrains_Mono',monospace] text-[9px] text-[#849396] mt-2">Note: Basement B2, Slot 42</p>
                  </div>

                  {/* Office */}
                  <div 
                    onClick={() => setSelectedLocation('office')}
                    className={`p-3 rounded-lg cursor-pointer flex flex-col justify-between transition-all ${
                      selectedLocation === 'office'
                        ? 'bg-[#272a31] ring-1 ring-[#ff2a42]'
                        : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                    }`}
                  >
                    <div>
                      <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] uppercase font-bold">OFFICE HEADQUARTERS</span>
                      <p className="text-sm text-white font-semibold mt-1">Gulshan Avenue Tower</p>
                      <p className="text-xs text-[#bac9cc]">Gulshan-1, Dhaka</p>
                    </div>
                    <p className="font-['JetBrains_Mono',monospace] text-[9px] text-[#849396] mt-2">Ground Visitor Parking</p>
                  </div>

                  {/* Current GPS Pin */}
                  <div 
                    onClick={() => {
                      setSelectedLocation('gps');
                      showToast('Triangulating GPS coordinates: 23.7937° N, 90.4043° E (±2.8m)');
                    }}
                    className={`p-3 rounded-lg cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                      selectedLocation === 'gps'
                        ? 'bg-[#272a31] ring-1 ring-[#ff2a42]'
                        : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#ff2a42] text-[24px] mb-1">my_location</span>
                    <span className="font-['JetBrains_Mono',monospace] text-[11px] text-white font-bold uppercase">Use Current GPS Pin</span>
                    <span className="font-['JetBrains_Mono',monospace] text-[9px] text-[#bac9cc] mt-0.5">Accurate to 3.2 meters</span>
                  </div>
                </div>
              </div>

              {/* STEP 4: WORKSHOP COMPARISON & SELECTION */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-xs px-2 py-0.5 rounded bg-[#ff2a42] text-white font-bold">04</span>
                    <h2 className="font-['Space_Grotesk',sans-serif] text-lg uppercase text-[#e0e2ec] font-bold">SELECT VERIFIED WORKSHOP ATELIER</h2>
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc] font-mono">SHOWING 3 OF 24 WORKSHOPS</span>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'All Workshops' },
                    { id: 'supercar', label: 'Supercar & Performance' },
                    { id: 'ev', label: 'EV Certified' },
                    { id: 'fast', label: 'Fast Arrival (<30m)' },
                    { id: 'rated', label: 'Top Rated (4.9+★)' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setWorkshopFilter(p.id)}
                      className={`px-2.5 py-1 rounded font-['JetBrains_Mono',monospace] text-[10px] uppercase font-bold shrink-0 transition-all cursor-pointer ${
                        workshopFilter === p.id 
                          ? 'bg-[#ff2a42] text-white' 
                          : 'bg-[#1d2027] text-[#bac9cc] hover:text-white border border-[#3b494c]/60'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Workshop Card 1: Premium Auto Care */}
                <div 
                  onClick={() => setSelectedWorkshop('premium-auto')}
                  className={`p-4 rounded-lg relative cursor-pointer transition-all ${
                    selectedWorkshop === 'premium-auto'
                      ? 'bg-[#272a31] ring-1 ring-[#ff2a42] shadow-[0_0_20px_rgba(255,42,66,0.2)]'
                      : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-[#0b0e15] border border-[#ff2a42]/40 flex items-center justify-center font-['Space_Grotesk',sans-serif] text-xl text-[#ff2a42] font-bold">
                        P
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Space_Grotesk',sans-serif] text-base text-white font-bold">Premium Auto Care</h3>
                          <span className="px-2 py-0.5 rounded bg-[#a8ffd2]/10 text-[#a8ffd2] font-['JetBrains_Mono',monospace] text-[9px] uppercase font-bold border border-[#a8ffd2]/30">Mechify Certified Master</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#bac9cc] font-['JetBrains_Mono',monospace] text-[11px] mt-0.5">
                          <span className="text-[#ffd799] flex items-center gap-0.5 font-bold"><span className="material-symbols-outlined text-[14px]">star</span> 4.9 (384 reviews)</span>
                          <span>·</span>
                          <span className="text-[#ff2a42]">2.4 km away</span>
                          <span>·</span>
                          <span className="text-[#a8ffd2]">~25 min arrival</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] uppercase">BASE INSPECTION DEPOSIT</span>
                      <p className="font-['Space_Grotesk',sans-serif] text-2xl text-[#ff2a42] font-mono font-bold leading-tight">৳1,500</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#272a31] font-['JetBrains_Mono',monospace] text-[10px]">
                    <div className="flex items-center gap-2 text-[#bac9cc]">
                      <span className="px-2 py-0.5 rounded bg-[#0b0e15]">German Performance</span>
                      <span className="px-2 py-0.5 rounded bg-[#0b0e15]">Hybrid &amp; Brake Telemetry</span>
                      <span className="text-[#a8ffd2] font-mono">4 Mobile Techs Active</span>
                    </div>
                    {selectedWorkshop === 'premium-auto' && (
                      <div className="flex items-center gap-1.5 text-[#ff2a42] font-bold">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        SELECTED WORKSHOP
                      </div>
                    )}
                  </div>
                </div>

                {/* Workshop Card 2: Dhaka Performance Garage */}
                <div 
                  onClick={() => setSelectedWorkshop('dhaka-performance')}
                  className={`p-4 rounded-lg relative cursor-pointer transition-all ${
                    selectedWorkshop === 'dhaka-performance'
                      ? 'bg-[#272a31] ring-1 ring-[#ff2a42] shadow-[0_0_20px_rgba(255,42,66,0.2)]'
                      : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-[#0b0e15] border border-[#272a31] flex items-center justify-center font-['Space_Grotesk',sans-serif] text-xl text-white font-bold">
                        D
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Space_Grotesk',sans-serif] text-base text-white font-bold">Dhaka Performance Garage</h3>
                          <span className="px-2 py-0.5 rounded bg-[#ff2a42]/10 text-[#ff2a42] font-['JetBrains_Mono',monospace] text-[9px] uppercase border border-[#ff2a42]/30">Verified</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#bac9cc] font-['JetBrains_Mono',monospace] text-[11px] mt-0.5">
                          <span className="text-[#ffd799] flex items-center gap-0.5 font-bold"><span className="material-symbols-outlined text-[14px]">star</span> 4.8 (512 reviews)</span>
                          <span>·</span>
                          <span className="text-[#bac9cc]">4.1 km away</span>
                          <span>·</span>
                          <span className="text-[#bac9cc]">~45 min arrival</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] uppercase">BASE INSPECTION DEPOSIT</span>
                      <p className="font-['Space_Grotesk',sans-serif] text-2xl text-white font-mono font-bold leading-tight">৳1,800</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-2 text-[#bac9cc] font-['JetBrains_Mono',monospace] text-[10px]">
                    <span>Specialties: BMW M, Mercedes-AMG, Porsche Specialists</span>
                    <span className="text-[#ff2a42] font-mono">
                      {selectedWorkshop === 'dhaka-performance' ? '✓ SELECTED' : 'Switch to This Workshop →'}
                    </span>
                  </div>
                </div>

                {/* Workshop Card 3: Apex Electro-Tech */}
                <div 
                  onClick={() => setSelectedWorkshop('apex-ev')}
                  className={`p-4 rounded-lg relative cursor-pointer transition-all ${
                    selectedWorkshop === 'apex-ev'
                      ? 'bg-[#272a31] ring-1 ring-[#ff2a42] shadow-[0_0_20px_rgba(255,42,66,0.2)]'
                      : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-[#0b0e15] border border-[#272a31] flex items-center justify-center font-['Space_Grotesk',sans-serif] text-xl text-[#a8ffd2] font-bold">
                        A
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Space_Grotesk',sans-serif] text-base text-white font-bold">Apex Electro-Tech &amp; EV Lab</h3>
                          <span className="px-2 py-0.5 rounded bg-[#a8ffd2]/10 text-[#a8ffd2] font-['JetBrains_Mono',monospace] text-[9px] uppercase border border-[#a8ffd2]/30">High-Voltage EV Specialist</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#bac9cc] font-['JetBrains_Mono',monospace] text-[11px] mt-0.5">
                          <span className="text-[#ffd799] flex items-center gap-0.5 font-bold"><span className="material-symbols-outlined text-[14px]">star</span> 5.0 (120 reviews)</span>
                          <span>·</span>
                          <span className="text-[#bac9cc]">3.2 km away</span>
                          <span>·</span>
                          <span className="text-[#bac9cc]">~30 min arrival</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] uppercase">BASE INSPECTION DEPOSIT</span>
                      <p className="font-['Space_Grotesk',sans-serif] text-2xl text-white font-mono font-bold leading-tight">৳2,200</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-2 text-[#bac9cc] font-['JetBrains_Mono',monospace] text-[10px]">
                    <span>Specialties: Porsche E-Hybrid &amp; Taycan, Tesla, Mercedes EQ</span>
                    <span className="text-[#ff2a42] font-mono">
                      {selectedWorkshop === 'apex-ev' ? '✓ SELECTED' : 'Switch to This Workshop →'}
                    </span>
                  </div>
                </div>
              </div>

              {/* STEP 5: MECHANIC SELECTION */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-xs px-2 py-0.5 rounded bg-[#ff2a42] text-white font-bold">05</span>
                    <h2 className="font-['Space_Grotesk',sans-serif] text-lg uppercase text-[#e0e2ec] font-bold">ASSIGN CERTIFIED MECHANIC</h2>
                  </div>
                  
                  {/* Mode Toggle */}
                  <div className="flex items-center bg-[#0b0e15] p-1 rounded-lg border border-[#272a31]">
                    <button 
                      onClick={() => setMechanicMode('specific')}
                      className={`px-3 py-1 rounded font-['JetBrains_Mono',monospace] text-[10px] uppercase font-bold transition-all cursor-pointer ${
                        mechanicMode === 'specific' ? 'bg-[#272a31] text-[#ff2a42]' : 'text-[#bac9cc] hover:text-white'
                      }`}
                    >
                      Select Specific
                    </button>
                    <button 
                      onClick={() => {
                        setMechanicMode('auto');
                        showToast('Auto-matched: Fastest available ASE certified tech assigned automatically');
                      }}
                      className={`px-3 py-1 rounded font-['JetBrains_Mono',monospace] text-[10px] uppercase font-bold transition-all cursor-pointer ${
                        mechanicMode === 'auto' ? 'bg-[#272a31] text-[#ff2a42]' : 'text-[#bac9cc] hover:text-white'
                      }`}
                    >
                      Auto-Match (Fastest)
                    </button>
                  </div>
                </div>

                {/* Primary Selected Mechanic: Rahim Ahmed */}
                <div 
                  onClick={() => setSelectedMechanic('rahim-ahmed')}
                  className={`p-4 rounded-lg relative cursor-pointer transition-all ${
                    selectedMechanic === 'rahim-ahmed'
                      ? 'bg-[#272a31] ring-1 ring-[#ff2a42]'
                      : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img 
                          className="w-16 h-16 rounded-lg object-cover ring-2 ring-[#ff2a42]/60" 
                          alt="Master technician Rahim Ahmed" 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLwViuKGpMVovh0CYdqN5Pm2JxGYYtisSd9QnAi8Fqbm4kd5Nt4eyNBdA4gNUF7RbN6ow2Z3J-_MD5E8HqIkKIc-zRHsMt6kKjTW_Hx56F2BmxtVTgZRjvdNY8FoSGRcALiKg0rbayrYimBYGDdO8gXodS29gIxg5Y4eGOA05rDOiiw4o4lybSjA5i6JSkw_EQTRzXviJYiZ-e5qtYsgpADP4-Z7Gn9s6w08gPs6loxnwqMnEE0NLMHA" 
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#a8ffd2] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#0b0e15] text-[12px] font-bold">check</span>
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Space_Grotesk',sans-serif] text-base text-white font-bold">Rahim Ahmed</h3>
                          <span className="px-2 py-0.5 rounded bg-[#a8ffd2]/10 text-[#a8ffd2] font-['JetBrains_Mono',monospace] text-[9px] uppercase font-bold border border-[#a8ffd2]/30">ASE Master Certified</span>
                        </div>
                        <p className="text-xs text-[#bac9cc] mt-0.5">German Performance &amp; High-Torque Brake Specialist · 8 Years Exp.</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 font-['JetBrains_Mono',monospace] text-[11px] text-[#bac9cc]">
                          <span className="text-[#ffd799] font-bold flex items-center gap-0.5"><span className="material-symbols-outlined text-[14px]">star</span> 4.9 Rating</span>
                          <span>·</span>
                          <span className="font-mono text-[#ff2a42] font-bold">420 Completed Concierge Jobs</span>
                          <span>·</span>
                          <span className="text-[#a8ffd2]">99.4% First-Time Fix Rate</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-1 shrink-0">
                      <span className="px-2.5 py-1 rounded bg-[#0b0e15] text-white font-['JetBrains_Mono',monospace] text-[10px] border border-[#272a31]">
                        EQUIPPED: BOSCH OBD-III + HYDRAULIC KIT
                      </span>
                      {selectedMechanic === 'rahim-ahmed' && (
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#ff2a42] font-bold flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-[16px]">verified</span> ASSIGNED TO CURRENT DISPATCH
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Alternative Mechanic: Tanvir Hossain */}
                <div 
                  onClick={() => setSelectedMechanic('tanvir-hossain')}
                  className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                    selectedMechanic === 'tanvir-hossain'
                      ? 'bg-[#272a31] ring-1 ring-[#ff2a42]'
                      : 'bg-[#1d2027] hover:bg-[#272a31] border border-[#3b494c]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0b0e15] border border-[#272a31] flex items-center justify-center text-[#bac9cc] font-bold font-mono">
                      TH
                    </div>
                    <div>
                      <p className="font-['JetBrains_Mono',monospace] text-xs text-white font-bold">Tanvir Hossain</p>
                      <p className="text-xs text-[#bac9cc]">Electrical Diagnostics &amp; Telemetry Specialist · 6 Yrs Exp · 4.8★ (310 Jobs)</p>
                    </div>
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[#ff2a42] hover:underline font-mono">
                    {selectedMechanic === 'tanvir-hossain' ? '✓ SELECTED' : 'Select Tanvir →'}
                  </span>
                </div>
              </div>

              {/* STEP 6: DATE & TIME SELECTION */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-xs px-2 py-0.5 rounded bg-[#ff2a42] text-white font-bold">06</span>
                    <h2 className="font-['Space_Grotesk',sans-serif] text-lg uppercase text-[#e0e2ec] font-bold">DISPATCH TIME WINDOW</h2>
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#ffd799] font-mono">EXPRESS RAPID RESPONSE READY</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'asap', label: '⚡ ASAP Now', sub: '~25 mins', icon: 'bolt' },
                    { id: 'today-530', label: 'Today', sub: '5:30 PM', icon: 'schedule' },
                    { id: 'today-700', label: 'Today', sub: '7:00 PM', icon: 'schedule' },
                    { id: 'tomorrow-1000', label: 'Tomorrow', sub: '10:00 AM', icon: 'calendar_today' },
                    { id: 'custom', label: 'Custom', sub: 'Select Slot', icon: 'edit_calendar' }
                  ].map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => setDispatchTime(slot.id)}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        dispatchTime === slot.id
                          ? 'bg-[#ff2a42] text-white font-bold shadow-[0_0_16px_rgba(255,42,66,0.35)]'
                          : 'bg-[#1d2027] hover:bg-[#272a31] text-[#e0e2ec] border border-[#3b494c]/60'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px] mb-0.5">{slot.icon}</span>
                      <span className="font-['JetBrains_Mono',monospace] text-xs uppercase font-bold">{slot.label}</span>
                      <span className="font-['JetBrains_Mono',monospace] text-[10px] opacity-90 font-mono">{slot.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: STEP 7 & STICKY SUMMARY HUD (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Escrow Protection Badge */}
              <div className="p-4 rounded-xl bg-[#191c23] border border-[#272a31] shadow-sm border-l-4 border-l-[#a8ffd2] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#a8ffd2] text-[24px]">verified_user</span>
                <div>
                  <h4 className="font-['JetBrains_Mono',monospace] text-xs uppercase text-white font-bold">100% Mechify Escrow Protection</h4>
                  <p className="text-xs text-[#bac9cc] mt-0.5 leading-relaxed">
                    Your deposit is locked securely. Payment is only transferred to the workshop after you review and approve the post-service digital diagnostic checklist.
                  </p>
                </div>
              </div>

              {/* Sticky Cost & Order Breakdown Card */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2a42]/10 blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between pb-4 border-b border-[#272a31]">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono',monospace] text-xs px-2 py-0.5 rounded bg-[#ff2a42] text-white font-bold">07</span>
                    <h3 className="font-['Space_Grotesk',sans-serif] text-base uppercase text-white font-bold">COST ESTIMATE</h3>
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#a8ffd2] font-mono">TRANSPARENT</span>
                </div>

                {/* Vehicle Snapshot */}
                <div className="py-4 border-b border-[#272a31] space-y-2 font-['JetBrains_Mono',monospace] text-xs">
                  <div className="flex justify-between items-center text-[#e0e2ec]">
                    <span className="text-[#bac9cc]">Vehicle:</span>
                    <span className="font-bold text-white">2022 BMW M3 Competition</span>
                  </div>
                  <div className="flex justify-between items-center text-[#e0e2ec]">
                    <span className="text-[#bac9cc]">Workshop:</span>
                    <span className="text-[#ff2a42] font-bold">Premium Auto Care</span>
                  </div>
                  <div className="flex justify-between items-center text-[#e0e2ec]">
                    <span className="text-[#bac9cc]">Master Tech:</span>
                    <span>Rahim Ahmed (ASE Cert)</span>
                  </div>
                  <div className="flex justify-between items-center text-[#e0e2ec]">
                    <span className="text-[#bac9cc]">Arrival Time:</span>
                    <span className="text-[#ffd799] font-mono font-bold">⚡ ASAP (~25 mins)</span>
                  </div>
                </div>

                {/* Price Line Items */}
                <div className="py-4 border-b border-[#272a31] space-y-2.5 font-['JetBrains_Mono',monospace] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#bac9cc]">Doorstep Visit &amp; Inspection Fee</span>
                    <span className="font-mono text-white">৳500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#bac9cc]">Brake System Diagnostic Labor</span>
                    <span className="font-mono text-white">৳1,000</span>
                  </div>
                  <div className="flex justify-between items-center text-[#a8ffd2]">
                    <span>Platform Concierge Guarantee</span>
                    <span className="font-mono">FREE (৳0)</span>
                  </div>
                  <div className="flex justify-between items-center text-[#bac9cc]">
                    <span>VAT / Gov Tax (Included)</span>
                    <span className="font-mono">৳0</span>
                  </div>
                </div>

                {/* Total Deposit */}
                <div className="py-4 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-['Space_Grotesk',sans-serif] text-base uppercase text-white font-bold">Total Deposit:</span>
                    <span className="font-['Space_Grotesk',sans-serif] text-3xl text-[#ff2a42] font-mono font-bold">৳1,500</span>
                  </div>
                  <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#849396] leading-relaxed">
                    * Any necessary spare parts or additional mechanical repairs discovered during inspection will be submitted digitally for your authorization before work proceeds.
                  </p>
                </div>

                {/* Confirm CTA */}
                <button 
                  onClick={handleDispatchConfirm}
                  className="w-full py-4 rounded bg-[#ff2a42] text-white font-['Space_Grotesk',sans-serif] text-base uppercase font-bold tracking-wider hover:shadow-[0_0_24px_rgba(255,42,66,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  CONFIRM &amp; DISPATCH MECHANIC
                </button>

                {/* Security Footnote */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[#bac9cc] font-['JetBrains_Mono',monospace] text-[10px]">
                  <span className="material-symbols-outlined text-[16px] text-[#a8ffd2]">lock</span>
                  256-Bit SSL Encrypted Escrow Vault
                </div>
              </div>

              {/* Live Atelier Garage Feed Card */}
              <div className="p-4 rounded-xl bg-[#191c23] border border-[#272a31] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-white uppercase font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#a8ffd2]" /> Premium Auto Care Atelier
                  </span>
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] text-[#bac9cc] font-mono">GARAGE LIVE CAM</span>
                </div>
                <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#0b0e15]">
                  <img 
                    className="w-full h-full object-cover opacity-80" 
                    alt="High-end luxury auto workshop bay in Dhaka" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsMnys_wLmkfv9x3ti7il2XetLIAf1dQF5uARpEMPROQJu-dQvc6Ubx9TziRNsY_sbc2VF8t25VLG19OcpHreraWsMiPzqI7n4izlOfjuk1Q98V62wWT3QfoWNHtYe9KpD_fBQV5RXXZ7-rVRZ2anLfbypPNJvSf38NY8QYNeSxnUD5cMJRn3CoKZdTHclZViW0UrB0Iu0cCnZzIZJslde_WM5NkwUEXjloSiZKzcvYUJG7xP5XlTkZw" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15] via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white font-['JetBrains_Mono',monospace] text-[10px]">
                    <span className="bg-[#0b0e15]/80 px-2 py-0.5 rounded font-mono">WORKSHOP HUB: GULSHAN</span>
                    <span className="text-[#a8ffd2] font-bold">OPERATIONAL</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* VIEW 2: WORKSHOP COMPARISON MATRIX */}
      {activeView === 'matrix-view' && (
        <section className="w-full px-4 md:px-12 mb-20">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#272a31]">
              <div>
                <span className="font-['JetBrains_Mono',monospace] text-xs text-[#ff2a42] uppercase tracking-widest font-bold">COMPREHENSIVE DIRECTORY</span>
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl md:text-3xl uppercase text-white font-bold mt-1">Dhaka Verified Workshop Matrix</h2>
                <p className="text-sm text-[#bac9cc]">Compare verified garages by turnaround speed, master mechanics available, and specialized brand telemetry.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 material-symbols-outlined text-[#bac9cc] text-[18px]">filter_alt</span>
                  <input 
                    type="text"
                    value={searchWorkshopQuery}
                    onChange={(e) => setSearchWorkshopQuery(e.target.value)}
                    placeholder="Search by area or brand..."
                    className="bg-[#191c23] text-white font-['JetBrains_Mono',monospace] text-xs pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff2a42] border border-[#272a31] w-60"
                  />
                </div>
                <button 
                  onClick={() => showToast('Filters: All 24 workshop ateliers active')}
                  className="px-4 py-2 rounded bg-[#272a31] text-[#ff2a42] font-['JetBrains_Mono',monospace] text-xs uppercase font-bold flex items-center gap-1.5 cursor-pointer border border-[#ff2a42]/30"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span> Filters
                </button>
              </div>
            </div>

            {/* Workshop Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Matrix Card 1 */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] relative shadow-md flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#a8ffd2]/10 text-[#a8ffd2] font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase border border-[#a8ffd2]/30">MECHIFY APEX TIER</span>
                    <span className="text-[#ffd799] font-['JetBrains_Mono',monospace] text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">star</span> 4.9 (384)
                    </span>
                  </div>
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl text-white font-bold">Premium Auto Care</h3>
                  <p className="font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc] font-mono mt-1">Road 11, Banani · 2.4 KM</p>
                  
                  <div className="my-4 p-3 rounded bg-[#0b0e15] border border-[#272a31] space-y-2 font-['JetBrains_Mono',monospace] text-xs">
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Dispatch Speed:</span>
                      <span className="text-[#a8ffd2] font-bold">~25 mins (Fastest)</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Active Techs:</span>
                      <span className="font-mono">4 Master Specialists</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Diagnostics:</span>
                      <span className="font-mono">Bosch, Autel Ultra EV</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Starting Rate:</span>
                      <span className="text-[#ff2a42] font-bold font-mono">৳1,500</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc]">
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> OEM Factory Parts Direct</div>
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> 6-Month Mechify Warranty</div>
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> Mobile Hydraulic Lift Unit</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedWorkshop('premium-auto');
                    setActiveView('wizard-view');
                    showToast('Selected Premium Auto Care for doorstep dispatch');
                  }}
                  className="w-full py-2.5 rounded bg-[#ff2a42] text-white font-['JetBrains_Mono',monospace] text-xs uppercase font-bold tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Select This Workshop
                </button>
              </div>

              {/* Matrix Card 2 */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#ff2a42]/10 text-[#ff2a42] font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase border border-[#ff2a42]/30">SUPERCAR SPECIALIST</span>
                    <span className="text-[#ffd799] font-['JetBrains_Mono',monospace] text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">star</span> 4.8 (512)
                    </span>
                  </div>
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl text-white font-bold">Dhaka Performance Garage</h3>
                  <p className="font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc] font-mono mt-1">Tejgaon Industrial · 4.1 KM</p>
                  
                  <div className="my-4 p-3 rounded bg-[#0b0e15] border border-[#272a31] space-y-2 font-['JetBrains_Mono',monospace] text-xs">
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Dispatch Speed:</span>
                      <span className="text-white font-bold">~45 mins</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Active Techs:</span>
                      <span className="font-mono">7 Master Specialists</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Diagnostics:</span>
                      <span className="font-mono">BMW ISTA+, PIWIS 3</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Starting Rate:</span>
                      <span className="text-[#ff2a42] font-bold font-mono">৳1,800</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc]">
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> Specializes in M / AMG / RS</div>
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> ECU Dyno Tuning &amp; Remapping</div>
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> Track-Prep Doorstep Support</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedWorkshop('dhaka-performance');
                    setActiveView('wizard-view');
                    showToast('Selected Dhaka Performance Garage');
                  }}
                  className="w-full py-2.5 rounded bg-[#272a31] text-white hover:text-[#ff2a42] font-['JetBrains_Mono',monospace] text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer border border-[#3b494c]/60"
                >
                  Select This Workshop
                </button>
              </div>

              {/* Matrix Card 3 */}
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#ffd799]/10 text-[#ffd799] font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase border border-[#ffd799]/30">HIGH-VOLTAGE EV LAB</span>
                    <span className="text-[#ffd799] font-['JetBrains_Mono',monospace] text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">star</span> 5.0 (120)
                    </span>
                  </div>
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl text-white font-bold">Apex Electro-Tech &amp; EV Lab</h3>
                  <p className="font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc] font-mono mt-1">Gulshan-2 · 3.2 KM</p>
                  
                  <div className="my-4 p-3 rounded bg-[#0b0e15] border border-[#272a31] space-y-2 font-['JetBrains_Mono',monospace] text-xs">
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Dispatch Speed:</span>
                      <span className="text-white font-bold">~30 mins</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Active Techs:</span>
                      <span className="font-mono">3 High-Voltage Techs</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Diagnostics:</span>
                      <span className="font-mono">Tesla Toolbox 3, HV Insulation</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-[#bac9cc]">Starting Rate:</span>
                      <span className="text-[#ff2a42] font-bold font-mono">৳2,200</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc]">
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> Battery Health Cell Balancing</div>
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> Inverter &amp; Thermal Cooling Flush</div>
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#a8ffd2] text-[14px]">check</span> Certified 1000V Insulated Tools</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedWorkshop('apex-ev');
                    setActiveView('wizard-view');
                    showToast('Selected Apex Electro-Tech & EV Lab');
                  }}
                  className="w-full py-2.5 rounded bg-[#272a31] text-white hover:text-[#ff2a42] font-['JetBrains_Mono',monospace] text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer border border-[#3b494c]/60"
                >
                  Select This Workshop
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* VIEW 3: LIVE GPS DISPATCH & RADAR TRACKING */}
      {activeView === 'dispatch-view' && (
        <section className="w-full px-4 md:px-12 mb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Map & Telemetry Radar */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-['JetBrains_Mono',monospace] text-xs text-[#a8ffd2] uppercase font-mono font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#a8ffd2] animate-ping" /> GPS SATELLITE BEACON ACTIVE
                    </span>
                    <h2 className="font-['Space_Grotesk',sans-serif] text-xl text-white uppercase font-bold mt-0.5">Live Dispatch Radar</h2>
                  </div>
                  <div className="text-right">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] font-mono">JOB ID</span>
                    <p className="font-['Space_Grotesk',sans-serif] text-lg text-[#ff2a42] font-mono font-bold">#MC-8821</p>
                  </div>
                </div>

                {/* Radar / Map Area */}
                <div 
                  className="relative w-full h-80 rounded-lg overflow-hidden bg-cover bg-center shadow-inner flex items-center justify-center border border-[#272a31]"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCffoE7PS2QtmRtxMYuGdVj8jaZf4cMPWTxjzC5bZLqLd_CTrQ5iJsIPRl_FmpY-yj8VdIbW8v-9sxWSPgZojUIetHDeYyOTBBumnSymou7h5EPrxzUcXm0mjEaT_gXLE1hFs4kjK1wkNMosvdRYY1NGPS5-qIQUoQfYvZkjZILAr5OMTvzuRCfbT96EBovrBBWoEbIxSjVt61Xt9q7cVgtN4Ljfy0uAutHW3UvLoLEbLCOKFgitrlSJQ')` }}
                >
                  <div className="absolute inset-0 bg-[#0b0e15]/50 backdrop-blur-[2px]" />

                  {/* Mechanic Marker Pulsing */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="px-3 py-1 rounded bg-[#0b0e15]/90 text-[#ff2a42] font-['JetBrains_Mono',monospace] text-[10px] font-mono font-bold shadow-lg mb-1 flex items-center gap-1.5 border border-[#ff2a42]/40">
                      <span className="w-2 h-2 rounded-full bg-[#ff2a42] animate-ping" />
                      Rahim (Mechify Van #4) · 38 km/h
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#ff2a42] text-white flex items-center justify-center shadow-[0_0_20px_#ff2a42] border-2 border-white">
                      <span className="material-symbols-outlined text-[20px]">directions_car</span>
                    </div>
                  </div>

                  {/* Destination Pin */}
                  <div className="absolute bottom-8 right-12 flex flex-col items-center">
                    <div className="px-2.5 py-0.5 rounded bg-[#0b0e15]/90 text-[#ffd799] font-['JetBrains_Mono',monospace] text-[10px] font-mono font-bold shadow mb-1 border border-[#ffd799]/40">
                      House 14, Banani DOHS
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#feb300] text-[#432c00] flex items-center justify-center border-2 border-white">
                      <span className="material-symbols-outlined text-[18px]">home</span>
                    </div>
                  </div>

                  {/* Telemetry telemetry card floating on map */}
                  <div className="absolute bottom-3 left-3 bg-[#0b0e15]/90 backdrop-blur-md p-3 rounded-lg font-['JetBrains_Mono',monospace] text-xs font-mono space-y-1 text-white border border-[#272a31]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#bac9cc]">DISTANCE:</span>
                      <span className="text-[#ff2a42] font-bold">1.8 KM Remaining</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#bac9cc]">TRAFFIC INDEX:</span>
                      <span className="text-[#a8ffd2]">Moderate (DOHS Checkpoint Cleared)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Chat & Direct Comms Bar */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc]">
                    <span>DIRECT DRIVER COMMS</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => showToast('Calling Master Mechanic Rahim Ahmed via encrypted bridge...')}
                        className="text-[#ff2a42] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">phone</span> Call Rahim
                      </button>
                      <button 
                        onClick={() => showToast('SMS dispatch alert sent to tech vehicle')}
                        className="text-[#a8ffd2] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">chat</span> SMS
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      '“Where are you currently?”',
                      '“Gate security cleared for Mechify Van”',
                      '“Take your time, car parked at B2”',
                      '“Need official VAT invoice for corporate claim”'
                    ].map((msg, i) => (
                      <button 
                        key={i}
                        onClick={() => showToast(`Sent to Rahim: ${msg}`)}
                        className="px-3 py-1.5 rounded bg-[#1d2027] text-[#bac9cc] hover:text-white hover:bg-[#272a31] font-['JetBrains_Mono',monospace] text-xs transition-colors cursor-pointer border border-[#272a31]"
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: 8-Stage Real-Time Service Progression Pipeline */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#272a31]">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-base uppercase text-white font-bold">SERVICE PIPELINE</h3>
                  <span className="px-2 py-0.5 rounded bg-[#ff2a42]/10 text-[#ff2a42] font-['JetBrains_Mono',monospace] text-xs font-mono font-bold border border-[#ff2a42]/30">STAGE 3 OF 8</span>
                </div>

                {/* Stepper vertical list */}
                <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#32353c]">
                  
                  {/* Stage 1: Done */}
                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#a8ffd2] flex items-center justify-center ring-4 ring-[#191c23]">
                      <span className="material-symbols-outlined text-[#0b0e15] text-[10px] font-bold">check</span>
                    </span>
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-white font-bold">1. Booking Confirmed &amp; Escrow Funded</p>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] font-mono">14:15 · Deposit ৳1,500 locked in escrow</p>
                  </div>

                  {/* Stage 2: Done */}
                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#a8ffd2] flex items-center justify-center ring-4 ring-[#191c23]">
                      <span className="material-symbols-outlined text-[#0b0e15] text-[10px] font-bold">check</span>
                    </span>
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-white font-bold">2. Master Mechanic Rahim Dispatched</p>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] font-mono">14:22 · Tools: Bosch OBD, Torque Calibrator</p>
                  </div>

                  {/* Stage 3: ACTIVE CURRENT */}
                  <div className="relative p-2.5 rounded-lg bg-[#272a31] border border-[#ff2a42]/60">
                    <span className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-[#ff2a42] flex items-center justify-center ring-4 ring-[#191c23] animate-pulse" />
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-[#ff2a42] font-bold flex items-center justify-between">
                      <span>3. Arriving at Banani DOHS</span>
                      <span className="font-mono text-[#ffd799]">18 MINS ETA</span>
                    </p>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] mt-0.5 font-mono">Currently navigating Kemal Ataturk Ave</p>
                  </div>

                  {/* Stage 4 */}
                  <div className="relative opacity-60">
                    <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#32353c] ring-4 ring-[#191c23]" />
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-white font-bold">4. 42-Point Digital Vehicle Inspection</p>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] font-mono">Live video telemetry feed &amp; photos</p>
                  </div>

                  {/* Stage 5 */}
                  <div className="relative opacity-60">
                    <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#32353c] ring-4 ring-[#191c23]" />
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-white font-bold">5. Customer Digital Authorization</p>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] font-mono">Approve additional OEM parts before installation</p>
                  </div>

                  {/* Stage 6 */}
                  <div className="relative opacity-60">
                    <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#32353c] ring-4 ring-[#191c23]" />
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-white font-bold">6. Doorstep Mechanical Work in Progress</p>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] font-mono">Precision torque wrench calibrated assembly</p>
                  </div>

                  {/* Stage 7 */}
                  <div className="relative opacity-60">
                    <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#32353c] ring-4 ring-[#191c23]" />
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-white font-bold">7. Post-Service Road Test &amp; OBD Clear</p>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] font-mono">Sensor reset &amp; zero fault codes verification</p>
                  </div>

                  {/* Stage 8 */}
                  <div className="relative opacity-60">
                    <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#32353c] ring-4 ring-[#191c23]" />
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-white font-bold">8. Digital Invoice &amp; Warranty Stamp</p>
                    <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] font-mono">Escrow release &amp; 6-month certificate</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setActiveView('inspection-view')}
                    className="w-full py-3 rounded bg-[#272a31] hover:bg-[#32353c] text-[#ff2a42] font-['JetBrains_Mono',monospace] text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#ff2a42]/30"
                  >
                    <span>Preview Live Inspection Report</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* VIEW 4: DIGITAL VEHICLE INSPECTION & ADDITIONAL REPAIR APPROVAL */}
      {activeView === 'inspection-view' && (
        <section className="w-full px-4 md:px-12 mb-20">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header HUD with Critical Alert */}
            <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#feb300] animate-ping" />
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#ffd799] uppercase font-bold tracking-widest">DIGITAL INSPECTION FEEDBACK REQUIRED</span>
                </div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-xl md:text-2xl uppercase text-white font-bold mt-1">
                  2022 BMW M3 Competition — 42-Point Diagnostic Result
                </h2>
                <p className="text-xs text-[#bac9cc]">
                  Conducted on-site at Banani DOHS by Rahim Ahmed (Mechify Master Tech #214).
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded bg-[#0b0e15] border border-[#272a31] font-mono text-center">
                  <span className="block font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc]">BATTERY TELEMETRY</span>
                  <span className="text-[#a8ffd2] font-bold font-['JetBrains_Mono',monospace] text-xs">12.6V 🟢 OPTIMAL</span>
                </div>
                <div className="px-3 py-1.5 rounded bg-[#0b0e15] border border-[#272a31] font-mono text-center">
                  <span className="block font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc]">FRONT ROTORS</span>
                  <span className="text-[#ffd799] font-bold font-['JetBrains_Mono',monospace] text-xs">3.2mm 🟡 ATTENTION</span>
                </div>
                <div className="px-3 py-1.5 rounded bg-[#0b0e15] border border-[#272a31] font-mono text-center">
                  <span className="block font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc]">CALIPER FLUID</span>
                  <span className="text-red-400 font-bold font-['JetBrains_Mono',monospace] text-xs">MICRO-LEAK 🔴</span>
                </div>
              </div>
            </div>

            {/* Main Inspection Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left 7 Cols: Mechanic Evidence Photos & Voice Notes */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Evidence Card */}
                <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-4">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-base uppercase text-white font-bold flex items-center justify-between">
                    <span>Technician On-Site Inspection Evidence</span>
                    <span className="font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc] font-mono">TIMESTAMP: 14:48:12</span>
                  </h3>

                  {/* Photo gallery with annotations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative rounded-lg overflow-hidden bg-[#0b0e15] border border-[#272a31] group">
                      <img 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform" 
                        alt="Macro close-up shot of car brake rotor wear" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrzagwADs6Rr6Uqyx9HKpNz3kT1d_-W7P8mkIC7tbhI9Or9W3GxaRlPXz8vjtzFphDMbmaboAlhFQM_hhQqS8Pa7uPHgqCkAS_8L2UfyFvOYGDZqR-cKu8_NBMbvExgGWhPOiK8wTOLkB84voioWnx-JTC_-YR2OgjtrAe62Mj1dbIYw5aVFWRJL7ODFii-TCTRN4lvjDeEHv99X9npCoMqB5q0xx4TMsRe856oLXZg4WtPTLBP3_kaw" 
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white font-['JetBrains_Mono',monospace] text-[9px] uppercase font-bold">Rotor Wear Indicator (3.2mm)</span>
                      <div className="absolute bottom-0 inset-x-0 bg-[#0b0e15]/90 p-2 text-white font-['JetBrains_Mono',monospace] text-[10px]">
                        Photo 1: Left Front Cross-Drilled Rotor
                      </div>
                    </div>

                    <div className="relative rounded-lg overflow-hidden bg-[#0b0e15] border border-[#272a31] group">
                      <img 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform" 
                        alt="Automotive brake fluid caliper reservoir" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9OqfKLxnvFJNLl8Zg8HsACGVpanLMpmY8MfeuOtm4B-7Mw5g7ELlWe2VEOHdt5vhFI1jEOotayyJlKScaT_QnxNEGJygmKoBXTYbEdZmn9n5xpd-eXvmaIABpruMewwUnZqPqNn-KUWO-I4BtOY2gcrvTzapBlxDQQpvkc6386gpMdz95_aFwpdSl5llBWxgBLpjcL3oowog9d2mvOQk4cNrsKGJhxK7q_tTfpQO1FhS795QrmEMZ8w" 
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#feb300] text-black font-['JetBrains_Mono',monospace] text-[9px] uppercase font-bold">Fluid Seepage Found</span>
                      <div className="absolute bottom-0 inset-x-0 bg-[#0b0e15]/90 p-2 text-white font-['JetBrains_Mono',monospace] text-[10px]">
                        Photo 2: Rear Left Caliper Banjo Seal
                      </div>
                    </div>
                  </div>

                  {/* Voice Transcription Box */}
                  <div className="p-4 rounded-lg bg-[#272a31] space-y-2 border-l-4 border-l-[#ff2a42]">
                    <div className="flex items-center justify-between font-['JetBrains_Mono',monospace] text-xs">
                      <span className="text-[#ff2a42] font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">mic</span>
                        VOICE MEMO FROM TECH RAHIM AHMED
                      </span>
                      <span className="text-[#bac9cc] font-mono">AUDIO LOG • 00:38</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white italic leading-relaxed">
                      “Sir, upon lifting the front axle, we confirmed severe glazing on the inner ceramic brake pad. The outer rotor is still salvageable with light skim, but the brake pads are worn down to 15% life (roughly 3.2mm). In addition, the rear left caliper line has a micro seal leak causing spongy pedal pressure. I strongly recommend installing the Brembo OEM pad kit and flushing fresh DOT 4 racing fluid before doing highway speeds.”
                    </p>
                  </div>
                </div>

                {/* 42-Point Check Table */}
                <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-3">
                  <h4 className="font-['JetBrains_Mono',monospace] text-xs uppercase text-white font-bold tracking-wider">Diagnostic Telemetry Summary</h4>
                  <div className="space-y-2 font-['JetBrains_Mono',monospace] text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#0b0e15] border border-[#272a31]">
                      <span className="text-white font-semibold">1. OBD-III Computer Fault Scan</span>
                      <span className="text-[#a8ffd2] font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check</span> DTC: NO POWERTRAIN ERRORS</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#0b0e15] border border-[#272a31]">
                      <span className="text-white font-semibold">2. S58 Engine Oil Level &amp; Viscosity</span>
                      <span className="text-[#a8ffd2] font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check</span> 92% LIFE · 0W-30 M TWINPOWER</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#0b0e15] border border-[#272a31]">
                      <span className="text-white font-semibold">3. Front Brake Pad Thickness</span>
                      <span className="text-[#ffd799] font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">warning</span> 15% LIFE (CRITICAL WEAR)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#0b0e15] border border-[#272a31]">
                      <span className="text-white font-semibold">4. Hydraulic Brake System Pressure</span>
                      <span className="text-red-400 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> MICRO-LEAK DETECTED</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right 5 Cols: Additional Repair Quote & Digital Authorization Box */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-xl bg-[#191c23] border border-[#ffd799]/40 shadow-xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#272a31]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ffd799] text-[22px]">draw</span>
                      <h3 className="font-['Space_Grotesk',sans-serif] text-base uppercase text-white font-bold">DIGITAL WORK APPROVAL</h3>
                    </div>
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] px-2 py-0.5 rounded bg-[#feb300]/20 text-[#ffd799] font-mono font-bold">QUOTE #AQ-994</span>
                  </div>

                  <p className="text-xs text-[#bac9cc] leading-relaxed">
                    Rahim Ahmed has identified required replacement components to guarantee vehicle safety. Mechify policy prohibits unauthorized work. Review quote below:
                  </p>

                  {/* Line Items */}
                  <div className="space-y-3 font-['JetBrains_Mono',monospace] text-xs">
                    <div className="p-3 rounded bg-[#0b0e15] border border-[#272a31] space-y-1">
                      <div className="flex justify-between items-center text-white font-semibold">
                        <span>Pre-Approved Inspection &amp; Diagnostics</span>
                        <span className="font-mono text-[#a8ffd2]">৳1,500 (PAID)</span>
                      </div>
                      <span className="text-[10px] text-[#bac9cc]">Doorstep visit and computer telemetry scanning</span>
                    </div>

                    <div className="p-3 rounded bg-[#272a31] border border-[#ff2a42]/40 space-y-1">
                      <div className="flex justify-between items-center text-white font-semibold">
                        <span className="text-[#ff2a42] font-bold">Brembo Ceramic Brake Pad Set (OEM #BR-9921)</span>
                        <span className="font-mono text-[#ff2a42] font-bold">৳7,200</span>
                      </div>
                      <span className="text-[10px] text-[#bac9cc]">Direct factory replacement with sensor harness included</span>
                    </div>

                    <div className="p-3 rounded bg-[#272a31] border border-[#ff2a42]/40 space-y-1">
                      <div className="flex justify-between items-center text-white font-semibold">
                        <span className="text-[#ff2a42] font-bold">Castrol React SRF DOT 4 Fluid &amp; Line Seal</span>
                        <span className="font-mono text-[#ff2a42] font-bold">৳1,300</span>
                      </div>
                      <span className="text-[10px] text-[#bac9cc]">Complete pressure purge &amp; bleed across 4 calipers</span>
                    </div>
                  </div>

                  {/* Cost Comparison Box */}
                  <div className="p-4 rounded-lg bg-[#0b0e15] border border-[#272a31] space-y-2">
                    <div className="flex justify-between items-center font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc]">
                      <span>Original Approved Service:</span>
                      <span className="font-mono">৳1,500</span>
                    </div>
                    <div className="flex justify-between items-center font-['JetBrains_Mono',monospace] text-xs text-[#ffd799]">
                      <span>Discovered Additional Work:</span>
                      <span className="font-mono font-bold">+ ৳8,500</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-[#272a31] font-['Space_Grotesk',sans-serif]">
                      <span className="text-white text-base uppercase font-bold">New Authorized Total:</span>
                      <span className="text-[#ffd799] text-2xl font-mono font-bold">
                        {quoteApproved ? '৳10,000 (AUTHORIZED)' : '৳10,000'}
                      </span>
                    </div>
                  </div>

                  {/* Action Actuators */}
                  <div className="space-y-2.5">
                    <button 
                      onClick={() => {
                        setQuoteApproved(true);
                        setQuoteDeclined(false);
                        showToast('✓ Repair Authorized! Escrow updated to ৳10,000. Parts dispatch confirmed.');
                      }}
                      className="w-full py-3.5 rounded bg-[#ff2a42] text-white font-['Space_Grotesk',sans-serif] text-sm uppercase font-bold tracking-wider hover:shadow-[0_0_20px_rgba(255,42,66,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">verified</span>
                      APPROVE REPAIR &amp; AUTHORIZE (৳8,500)
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => {
                          setQuoteDeclined(true);
                          setQuoteApproved(false);
                          showToast('Additional repair declined. Mechanic informed.');
                        }}
                        className="py-2.5 rounded bg-[#1d2027] hover:bg-[#272a31] text-red-400 font-['JetBrains_Mono',monospace] text-xs uppercase font-bold transition-colors cursor-pointer border border-[#272a31]"
                      >
                        Decline Extra Work
                      </button>
                      <button 
                        onClick={() => showToast('Connecting to Master Tech Rahim Ahmed on-site...')}
                        className="py-2.5 rounded bg-[#1d2027] hover:bg-[#272a31] text-[#ff2a42] font-['JetBrains_Mono',monospace] text-xs uppercase font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer border border-[#ff2a42]/30"
                      >
                        <span className="material-symbols-outlined text-[16px]">call</span> Speak to Tech
                      </button>
                    </div>
                  </div>

                  <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#849396] text-center">
                    * By approving, you agree to add ৳8,500 to Mechify Escrow. Work includes 6-month warranty on Brembo pads.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* VIEW 5: COMPREHENSIVE SERVICE HISTORY & WARRANTY VAULT */}
      {activeView === 'invoice-view' && (
        <section className="w-full px-4 md:px-12 mb-20">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#272a31]">
              <div>
                <span className="font-['JetBrains_Mono',monospace] text-xs text-[#ff2a42] uppercase tracking-widest font-bold">DIGITAL SERVICE LOGBOOK</span>
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl md:text-3xl uppercase text-white font-bold mt-1">Vehicle Health History &amp; Warranty Vault</h2>
                <p className="text-sm text-[#bac9cc]">Tamper-proof digital records, verifiable PDF inspection certificates, and live countdown timers on active repair warranties.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => showToast('Exporting complete tamper-proof vehicle dossier (PDF with digital notary)...')}
                  className="px-4 py-2 rounded bg-[#272a31] text-[#ff2a42] font-['JetBrains_Mono',monospace] text-xs uppercase font-bold flex items-center gap-1.5 cursor-pointer border border-[#ff2a42]/30"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span> Export Full Carfax / Dossier
                </button>
              </div>
            </div>

            {/* Historical Record 1: Completed Brake Service */}
            <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#272a31]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#a8ffd2]/10 text-[#a8ffd2] flex items-center justify-center border border-[#a8ffd2]/30">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-['Space_Grotesk',sans-serif] text-base text-white font-bold">Job #MC-7712: High-Performance Front Brake Rotor Overhaul</h3>
                      <span className="px-2 py-0.5 rounded bg-[#a8ffd2]/20 text-[#a8ffd2] font-['JetBrains_Mono',monospace] text-[9px] uppercase font-bold border border-[#a8ffd2]/30">Completed &amp; Certified</span>
                    </div>
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc] mt-0.5">Serviced on 12 November 2024 · Workshop: Premium Auto Care · Tech: Rahim Ahmed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc]">TOTAL INVOICED</span>
                    <p className="font-['Space_Grotesk',sans-serif] text-lg text-[#ff2a42] font-mono font-bold">৳10,000</p>
                  </div>
                  <button 
                    onClick={() => showToast('Downloading Signed PDF for Job #MC-7712...')}
                    className="p-2 rounded bg-[#0b0e15] hover:bg-[#272a31] text-white border border-[#272a31] cursor-pointer" 
                    title="Download Signed PDF"
                  >
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-['JetBrains_Mono',monospace] text-xs">
                <div className="p-3 rounded bg-[#0b0e15] border border-[#272a31] space-y-1">
                  <span className="text-[#bac9cc] uppercase">WARRANTY STATUS</span>
                  <p className="text-[#a8ffd2] font-bold font-mono text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">shield</span> 142 Days Remaining
                  </p>
                  <p className="text-[#849396] text-[10px]">Covers Brembo pads &amp; caliper hydraulic seal leaks</p>
                </div>

                <div className="p-3 rounded bg-[#0b0e15] border border-[#272a31] space-y-1">
                  <span className="text-[#bac9cc] uppercase">PARTS INSTALLED</span>
                  <p className="text-white font-bold font-mono">Brembo OEM #BR-9921 + Castrol SRF</p>
                  <p className="text-[#849396] text-[10px]">QR Verified Authenticity: #QR-9921-DE-441</p>
                </div>

                <div className="p-3 rounded bg-[#0b0e15] border border-[#272a31] flex items-center justify-between">
                  <div>
                    <span className="text-[#bac9cc] uppercase">REPEAT THIS MAINTENANCE</span>
                    <p className="text-white font-bold">Need same parts again?</p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveView('wizard-view');
                      showToast('Re-booking brake maintenance preset');
                    }}
                    className="px-3 py-1.5 rounded bg-[#ff2a42] text-white font-bold uppercase cursor-pointer"
                  >
                    1-Click Rebook
                  </button>
                </div>
              </div>
            </div>

            {/* Historical Record 2: Scheduled Multi-Point */}
            <div className="p-6 rounded-xl bg-[#191c23] border border-[#272a31] shadow-md space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#272a31]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#32353c] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">terminal</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-['Space_Grotesk',sans-serif] text-base text-white font-bold">Job #MC-6240: Scheduled 20,000 KM Multi-Point Service &amp; Oil Concierge</h3>
                      <span className="px-2 py-0.5 rounded bg-[#32353c] text-[#bac9cc] font-['JetBrains_Mono',monospace] text-[9px] uppercase font-bold">Archived Log</span>
                    </div>
                    <p className="font-['JetBrains_Mono',monospace] text-xs text-[#bac9cc] mt-0.5">Serviced on 18 August 2024 · Workshop: Dhaka Performance Garage · Tech: Tanvir Hossain</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc]">TOTAL INVOICED</span>
                    <p className="font-['Space_Grotesk',sans-serif] text-lg text-white font-mono font-bold">৳14,200</p>
                  </div>
                  <button 
                    onClick={() => showToast('Downloading Signed PDF for Job #MC-6240...')}
                    className="p-2 rounded bg-[#0b0e15] hover:bg-[#272a31] text-white border border-[#272a31] cursor-pointer" 
                    title="Download Signed PDF"
                  >
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-['JetBrains_Mono',monospace] text-xs">
                <div className="p-3 rounded bg-[#0b0e15] border border-[#272a31] space-y-1">
                  <span className="text-[#bac9cc] uppercase">WARRANTY STATUS</span>
                  <p className="text-[#849396] font-bold font-mono text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">history</span> Expired (180 Days elapsed)
                  </p>
                  <p className="text-[#849396] text-[10px]">Engine oil concierge cycle completed</p>
                </div>

                <div className="p-3 rounded bg-[#0b0e15] border border-[#272a31] space-y-1">
                  <span className="text-[#bac9cc] uppercase">PARTS INSTALLED</span>
                  <p className="text-white font-bold font-mono">7.5L Motul 300V 5W-40 + Mahle Filter</p>
                  <p className="text-[#849396] text-[10px]">Oil telemetry reset to 100% capacity</p>
                </div>

                <div className="p-3 rounded bg-[#0b0e15] border border-[#272a31] flex items-center justify-between">
                  <div>
                    <span className="text-[#bac9cc] uppercase">RECOMMENDED INTERVAL</span>
                    <p className="text-[#ffd799] font-bold font-mono">Next Oil Due: In 2,800 KM</p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveView('wizard-view');
                      setSelectedCategory('fluids');
                      showToast('Scheduling next oil service concierge');
                    }}
                    className="px-3 py-1.5 rounded bg-[#272a31] hover:bg-[#32353c] text-[#ff2a42] font-bold uppercase cursor-pointer border border-[#ff2a42]/30"
                  >
                    Schedule Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* SECTION 6: EMERGENCY ROADSIDE & RAPID DOORSTEP SOS (HIGH-CONTRAST) */}
      <section className="w-full px-4 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto rounded-xl bg-gradient-to-br from-[#191c23] via-[#191c23] to-[#feb300]/10 border-l-4 border-l-[#ffd799] border border-[#272a31] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-[#ffd799]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#feb300]/20 text-[#ffd799] font-['JetBrains_Mono',monospace] text-[10px] uppercase font-bold border border-[#ffd799]/30">
                <span className="material-symbols-outlined text-[16px] animate-pulse">crisis_alert</span>
                MECHIFY RAPID RESPONSE UNIT · 15-MINUTE GUARANTEE
              </div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-2xl md:text-3xl uppercase text-white font-bold tracking-tight">
                Need a Mechanic Right Now?
              </h2>
              <p className="text-sm text-[#bac9cc] max-w-2xl leading-relaxed">
                Stuck in traffic with an overheating engine, dead 12V auxiliary battery, or punctured run-flat? Our mobile motorcycle quick-response units carry high-capacity jump-starters, mobile vulcanizers, and diagnostic tools across Gulshan, Banani, and Dhanmondi.
              </p>

              {/* 4 Quick-tap triggers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { name: 'Dead Battery', sub: '12V / EV Jump', icon: 'bolt', type: 'Dead 12V Battery Boost' },
                  { name: 'Flat Tire / Leak', sub: 'Mobile Vulcanize', icon: 'tire_repair', type: 'Flat Tire / Mobile Vulcanizing' },
                  { name: 'Overheating', sub: 'Coolant Relief', icon: 'water_damage', type: 'Engine Overheating / Coolant Flush' },
                  { name: 'Lockout Help', sub: 'Non-Destructive', icon: 'lock_open', type: 'Door Lockout Concierge' }
                ].map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setSosType(item.type);
                      setSosModalOpen(true);
                    }}
                    className="p-3 rounded bg-[#0b0e15] hover:bg-[#272a31] text-left transition-all cursor-pointer border border-[#272a31] group"
                  >
                    <span className="material-symbols-outlined text-[#ffd799] text-[22px] mb-1 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="block font-['JetBrains_Mono',monospace] text-[10px] text-white font-bold uppercase">{item.name}</span>
                    <span className="block font-['JetBrains_Mono',monospace] text-[9px] text-[#bac9cc] font-mono">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[#0b0e15]/80 text-center space-y-4 border border-[#272a31]">
              <div className="w-16 h-16 rounded-full bg-[#feb300]/20 text-[#ffd799] flex items-center justify-center animate-bounce border border-[#ffd799]/30">
                <span className="material-symbols-outlined text-[36px]">fmd_bad</span>
              </div>
              <div>
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#ffd799] uppercase font-bold font-mono">EMERGENCY HOTLINE (DIRECT DISPATCH)</span>
                <p className="font-['Space_Grotesk',sans-serif] text-xl text-white font-bold mt-0.5 font-mono">+880 9612-MECHIFY</p>
                <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[#bac9cc] mt-1">Average Rapid Response Dispatch: 14.2 mins</p>
              </div>
              <button 
                onClick={() => setSosModalOpen(true)}
                className="w-full py-3 rounded bg-[#feb300] text-[#432c00] font-['JetBrains_Mono',monospace] text-xs uppercase font-bold tracking-wider hover:bg-[#ffd799] transition-all cursor-pointer shadow-lg"
              >
                Request Immediate Dispatch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SOS MODAL */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0e15]/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-xl bg-[#191c23] p-6 shadow-2xl space-y-5 border border-[#ffd799]/50">
            <div className="flex items-center justify-between pb-3 border-b border-[#272a31]">
              <div className="flex items-center gap-2 text-[#ffd799]">
                <span className="material-symbols-outlined text-[24px] animate-pulse">fmd_bad</span>
                <h3 className="font-['Space_Grotesk',sans-serif] text-lg uppercase font-bold">EMERGENCY SOS DISPATCH</h3>
              </div>
              <button 
                onClick={() => setSosModalOpen(false)}
                className="text-[#bac9cc] hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#bac9cc] leading-relaxed">
              A Rapid Response Unit will be mobilized immediately to your GPS location with heavy-duty booster cables, hydraulic jacks, or coolant top-up.
            </p>

            <div className="space-y-3 font-['JetBrains_Mono',monospace] text-xs">
              <div>
                <label className="block text-[#bac9cc] text-[10px] uppercase mb-1">Select Emergency Nature</label>
                <select 
                  value={sosType}
                  onChange={(e) => setSosType(e.target.value)}
                  className="w-full bg-[#0b0e15] text-white p-2.5 rounded border border-[#272a31] focus:outline-none focus:ring-1 focus:ring-[#feb300]"
                >
                  <option>Dead 12V Battery Boost</option>
                  <option>Flat Tire / Mobile Vulcanizing</option>
                  <option>Engine Overheating / Coolant Flush</option>
                  <option>Vehicle Won't Start (Starter Motor / Fuel)</option>
                  <option>Door Lockout Concierge</option>
                </select>
              </div>

              <div>
                <label className="block text-[#bac9cc] text-[10px] uppercase mb-1">Your Exact Location / Street</label>
                <input 
                  type="text" 
                  value={sosLocation}
                  onChange={(e) => setSosLocation(e.target.value)}
                  className="w-full bg-[#0b0e15] text-white p-2.5 rounded border border-[#272a31] focus:outline-none focus:ring-1 focus:ring-[#feb300]" 
                />
              </div>

              <div className="p-3 rounded bg-[#feb300]/10 text-[#ffd799] text-[10px] flex items-center gap-2 border border-[#ffd799]/20">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Emergency Flat Callout Fee: <strong>৳800</strong> (Includes first 30m labor)</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleSosDispatch}
                className="flex-1 py-3 rounded bg-[#feb300] text-[#432c00] font-['Space_Grotesk',sans-serif] text-sm uppercase font-bold tracking-wider hover:bg-[#ffd799] transition-all cursor-pointer"
              >
                Confirm Emergency SOS
              </button>
              <button 
                onClick={() => setSosModalOpen(false)}
                className="px-4 py-3 rounded bg-[#1d2027] text-white hover:bg-[#272a31] font-['JetBrains_Mono',monospace] text-xs uppercase cursor-pointer border border-[#272a31]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <footer className="w-full bg-[#0b0e15] py-4 border-t border-[#272a31] shadow-[0_-1px_16px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 font-['JetBrains_Mono',monospace] text-xs">
          <div className="flex flex-wrap items-center gap-6 text-[#bac9cc]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a8ffd2] animate-pulse" />
              <span className="text-[10px] uppercase text-[#bac9cc]">Coverage:</span>
              <span className="text-white">Dhaka Metropolitan (Gulshan, Banani, Uttara, Dhanmondi)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a8ffd2] text-[16px]">verified_user</span>
              <span className="text-[10px] uppercase text-[#bac9cc]">Assurance:</span>
              <span className="text-white">100% Guaranteed OEM Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff2a42] text-[16px]">build_circle</span>
              <span className="text-[10px] uppercase text-[#bac9cc]">Atelier Mechanics:</span>
              <span className="text-[#ff2a42] font-bold">48 Master Specialists Active</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 bg-[#1d2027] px-3 py-1.5 rounded-lg border border-[#272a31]">
              <span className="material-symbols-outlined text-[#ff2a42] text-[16px]">support_agent</span>
              <span className="text-[10px] text-[#bac9cc] uppercase">24/7 Apex Hotline:</span>
              <span className="text-[#ff2a42] font-bold">+880 9612-MECHIFY</span>
            </div>
            <span className="text-[10px] text-[#849396]">© 2024 Mechify Concierge Technologies.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

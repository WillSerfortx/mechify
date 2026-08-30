import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WorkshopSearch() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: '📍 Detecting your live GPS coordinates in Dhaka...', sub: 'Locating nearby service networks in 5km radius' },
    { text: '🔍 Searching the nearest verified workshops for you...', sub: 'Scanning certified mechanic hubs across Dhaka' },
    { text: '⚡ Checking live bay capacity & emergency diagnostic slots...', sub: 'Verifying 24/7 technician availability' },
    { text: '✅ Found 50 nearest certified workshops around your location!', sub: 'Preparing optimal routes and distance list' },
  ];

  // Progress counter and step progression over 4.5s
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 25) setCurrentStep(0);
      else if (pct < 55) setCurrentStep(1);
      else if (pct < 85) setCurrentStep(2);
      else setCurrentStep(3);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/workshop-select');
        }, 400);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-outfit select-none">
      
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.25) 0%, transparent 70%), linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* Pulsing Red Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Main Radar Container */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full text-center">
        
        {/* Radar Scanner Animation */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-10 flex items-center justify-center">
          
          {/* Concentric Radar Circles */}
          <div className="absolute inset-0 rounded-full border border-red-500/20" />
          <div className="absolute inset-8 rounded-full border border-red-500/30" />
          <div className="absolute inset-16 rounded-full border border-red-500/40" />
          <div className="absolute inset-24 rounded-full border border-red-500/50" />
          <div className="absolute inset-0 rounded-full border-2 border-red-500/60 animate-ping opacity-25" />

          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-red-500/30" />
          <div className="absolute h-full w-[1px] bg-red-500/30" />

          {/* Radar Rotating Sweep Beam */}
          <div 
            className="absolute inset-0 rounded-full animate-radarSweep pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, rgba(220, 38, 38, 0.4) 0deg, transparent 60deg, transparent 360deg)',
            }}
          />

          {/* Dhaka Floating Signal Pings */}
          <div className="absolute top-12 left-16 flex items-center gap-1.5 animate-bounce">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
            <span className="text-[10px] font-mono text-red-400 bg-black/80 px-1.5 py-0.5 rounded border border-red-500/30">Gulshan</span>
          </div>

          <div className="absolute bottom-16 right-12 flex items-center gap-1.5 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]" />
            <span className="text-[10px] font-mono text-red-400 bg-black/80 px-1.5 py-0.5 rounded border border-red-500/30">Banani</span>
          </div>

          <div className="absolute top-20 right-20 flex items-center gap-1.5 animate-float">
            <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]" />
            <span className="text-[10px] font-mono text-red-400 bg-black/80 px-1.5 py-0.5 rounded border border-red-500/30">Mohakhali</span>
          </div>

          <div className="absolute bottom-20 left-12 flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span className="text-[10px] font-mono text-red-400 bg-black/80 px-1.5 py-0.5 rounded border border-red-500/30">Dhanmondi</span>
          </div>

          {/* Central Beacon with Car & Wrench Icon */}
          <div className="relative z-20 w-20 h-20 bg-black border-2 border-red-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.8)]">
            <span className="text-2xl animate-bounce">🔧</span>
            <span className="text-[10px] font-bold text-red-400 tracking-wider">LIVE GPS</span>
          </div>
        </div>

        {/* Dynamic Percentage Progress */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-48 h-2 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(220,38,38,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-red-400 font-bold text-sm">{progress}%</span>
        </div>

        {/* Pop-Out Animated Status Message */}
        <div className="min-h-[90px] flex flex-col items-center justify-center">
          <div 
            key={currentStep}
            className="animate-scaleIn bg-neutral-900/90 border border-red-500/40 rounded-2xl px-6 py-4 shadow-[0_0_30px_rgba(220,38,38,0.25)] max-w-md w-full"
          >
            <p className="text-lg sm:text-xl font-bold text-white tracking-wide mb-1 font-sora">
              {steps[currentStep].text}
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              {steps[currentStep].sub}
            </p>
          </div>
        </div>

        {/* GPS Coordinate Tag */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          <span>DHAKA REGION (23.8103° N, 90.4125° E) • 50 WORKSHOPS FOUND</span>
        </div>

        {/* Skip button */}
        <button
          onClick={() => navigate('/workshop-select')}
          className="mt-6 text-sm text-gray-400 hover:text-white underline transition-colors cursor-pointer"
        >
          Skip searching and view list immediately →
        </button>
      </div>
    </div>
  );
}

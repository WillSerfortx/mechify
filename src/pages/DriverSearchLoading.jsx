import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function DriverSearchLoading() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'car-and-driver'; // 'car-and-driver' or 'driver-only'

  const [progress, setProgress] = useState(10);
  const [statusText, setStatusText] = useState('Initiating GPS satellite scan...');
  const [foundCount, setFoundCount] = useState(0);

  const isCarAndDriver = type === 'car-and-driver';

  useEffect(() => {
    // Step 1: Scan area
    const t1 = setTimeout(() => {
      setProgress(35);
      setStatusText(isCarAndDriver ? 'Scanning nearby vehicles & available chauffeurs...' : 'Scanning certified personal chauffeurs in your area...');
      setFoundCount(12);
    }, 800);

    // Step 2: Verification check
    const t2 = setTimeout(() => {
      setProgress(68);
      setStatusText(isCarAndDriver ? 'Filtering top-rated vehicle fleets & premium rides...' : 'Verifying driver licenses, ratings & background records...');
      setFoundCount(34);
    }, 1800);

    // Step 3: Match completed
    const t3 = setTimeout(() => {
      setProgress(95);
      setStatusText('Matching complete! Preparing your curated list...');
      setFoundCount(isCarAndDriver ? 50 : 45);
    }, 2800);

    // Step 4: Redirect
    const t4 = setTimeout(() => {
      setProgress(100);
      if (isCarAndDriver) {
        navigate('/choose-driver-with-car');
      } else {
        navigate('/choose-driver-only');
      }
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [type, isCarAndDriver, navigate]);

  return (
    <div className="min-h-screen bg-[#07080c] text-white font-outfit relative flex flex-col items-center justify-center px-4 overflow-hidden selection:bg-red-600">
      
      {/* Background Ambient Glow & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-600/20 via-orange-600/10 to-transparent blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 text-center mb-8 animate-fadeInDown">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs uppercase tracking-widest mb-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          AI DISPATCH & RADAR SCANNER
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase font-sora tracking-tight">
          {isCarAndDriver ? (
            <>Finding <span className="text-[#E50914]">Car & Driver</span> Packages</>
          ) : (
            <>Searching <span className="text-[#E50914]">Personal Chauffeurs</span></>
          )}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mt-2">
          {isCarAndDriver 
            ? 'Matching you with premium vehicles and verified professional drivers in your city.' 
            : 'Locating top-rated personal drivers ready to pilot your personal vehicle.'}
        </p>
      </div>

      {/* ─── RADAR SCANNER ANIMATION ─── */}
      <div className="relative z-10 w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 flex items-center justify-center my-6">
        
        {/* Outer Pulsing Rings */}
        <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-4 rounded-full border border-red-500/30 animate-pulse" />
        <div className="absolute inset-14 rounded-full border border-white/10" />
        <div className="absolute inset-24 rounded-full border border-red-500/20" />
        <div className="absolute inset-36 rounded-full border border-white/15" />

        {/* Crosshair Lines */}
        <div className="absolute w-full h-[1px] bg-red-500/20" />
        <div className="absolute h-full w-[1px] bg-red-500/20" />

        {/* Radar Sweep Effect */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600/40 via-transparent to-transparent animate-spin"
          style={{ 
            animationDuration: '2.5s',
            clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%)' 
          }}
        />

        {/* Floating Pinging Driver Dots on Radar */}
        <div className="absolute top-16 left-24 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444] animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-20 right-20 w-3.5 h-3.5 rounded-full bg-green-400 shadow-[0_0_12px_#4ade80] animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-28 right-24 w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15] animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute bottom-24 left-20 w-3 h-3 rounded-full bg-red-400 shadow-[0_0_12px_#f87171] animate-pulse" />

        {/* Center Glowing Hub */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-black border-2 border-white/40 shadow-[0_0_30px_rgba(229,9,20,0.8)] flex items-center justify-center z-20">
          <span className="text-3xl">{isCarAndDriver ? '🚗' : '👤'}</span>
        </div>
      </div>

      {/* ─── LIVE SCANNING STATUS & PROGRESS BAR ─── */}
      <div className="relative z-10 w-full max-w-md bg-[#121420]/80 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl mt-4">
        
        {/* Status Text & Found Count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-gray-300 truncate max-w-[260px]">{statusText}</span>
          </div>
          <span className="text-xs font-black text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
            {foundCount} Available
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/10 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-green-400 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center mt-2 text-[11px] text-gray-500 font-bold">
          <span>RADIUS: 10 KM</span>
          <span>{progress}% SCAN COMPLETE</span>
        </div>
      </div>

      {/* Cancel Action */}
      <button
        onClick={() => navigate('/idriver')}
        className="relative z-10 mt-6 text-xs text-gray-400 hover:text-white font-semibold transition-colors flex items-center gap-1 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
      >
        <span>✕</span> Cancel Search & Return
      </button>

    </div>
  );
}

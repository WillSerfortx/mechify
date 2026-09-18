import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ─── 7 MECHIFY SERVICES SEQUENCE CONFIGURATION ────────────────── */
const TOTAL_FRAMES = 300;

const SERVICES = [
  {
    id: 'roadside',
    num: '01',
    title: '24/7 Roadside Assistance',
    desc: 'Emergency help, towing, battery, tire & roadside support.',
    route: '/roadside',
    ctaText: 'Request Roadside Support',
    accent: '#ef4444',
    // Frames 1 to 40 (Peak at 20)
    frameStart: 1,
    framePeak: 20,
    frameEnd: 42,
    cameraLabel: 'FRONT THREE-QUARTER · HEADLIGHT BEAM'
  },
  {
    id: 'workshop',
    num: '02',
    title: 'Certified Workshop Services',
    desc: 'Trusted repairs, diagnostics, maintenance & specialist care.',
    route: '/workshop',
    ctaText: 'Book Workshop Atelier',
    accent: '#f97316',
    // Frames 43 to 84 (Peak at 64)
    frameStart: 43,
    framePeak: 64,
    frameEnd: 86,
    cameraLabel: 'FRONT-LEFT · DIHEDRAL DOOR & COCKPIT REVEAL'
  },
  {
    id: 'home-service',
    num: '03',
    title: 'Home Car Service',
    desc: 'Professional mechanics come directly to your home or location.',
    route: '/home-service',
    ctaText: 'Book Doorstep Concierge',
    accent: '#a8ffd2',
    // Frames 87 to 128 (Peak at 108)
    frameStart: 87,
    framePeak: 108,
    frameEnd: 130,
    cameraLabel: 'SIDE PROFILE · AERODYNAMIC REAR-LEFT SWEEP'
  },
  {
    id: 'driver',
    num: '04',
    title: 'Driver Hiring',
    desc: 'Hire a professional driver with or without a car.',
    route: '/idriver',
    ctaText: 'Hire Executive Chauffeur',
    accent: '#38bdf8',
    // Frames 131 to 172 (Peak at 152)
    frameStart: 131,
    framePeak: 152,
    frameEnd: 174,
    cameraLabel: 'REAR PROFILE · DIFFUSER & TAILLIGHT GLOW'
  },
  {
    id: 'rental',
    num: '05',
    title: 'Luxury & Supercar Rental',
    desc: 'Experience premium, luxury and high-performance cars.',
    route: '/car-rental',
    ctaText: 'Explore Supercar Fleet',
    accent: '#eab308',
    // Frames 175 to 216 (Peak at 195)
    frameStart: 175,
    framePeak: 195,
    frameEnd: 218,
    cameraLabel: 'REAR-RIGHT · TOP-DOWN HORIZON ORBIT'
  },
  {
    id: 'parts',
    num: '06',
    title: 'Parts Marketplace',
    desc: 'Find trusted car parts, accessories and automotive products.',
    route: '/spare-parts',
    ctaText: 'Browse Genuine Spares',
    accent: '#a855f7',
    // Frames 219 to 258 (Peak at 238)
    frameStart: 219,
    framePeak: 238,
    frameEnd: 260,
    cameraLabel: 'RIGHT FLANK · FORGED WHEEL & CARBON DETAIL'
  },
  {
    id: 'fuel',
    num: '07',
    title: 'On-Demand Fuel Delivery',
    desc: 'Get fuel delivered wherever your vehicle needs it.',
    route: '/fuel-terms',
    ctaText: 'Order On-Demand Fuel',
    accent: '#ec4899',
    // Frames 261 to 284 (Peak at 272)
    frameStart: 261,
    framePeak: 272,
    frameEnd: 284,
    cameraLabel: 'FRONT CLAMSHELL · POWERPLANT RETURN'
  }
];

export default function Landing() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Animation & Frame States
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Cached HTML Image elements
  const imagesCacheRef = useRef({});
  const loadedCountRef = useRef(0);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const animationFrameIdRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startFrameRef = useRef(1);

  // Format frame filename
  const getFrameUrl = useCallback((index) => {
    const padded = String(Math.max(1, Math.min(TOTAL_FRAMES, index))).padStart(3, '0');
    return `/koenigsegg-frames/ezgif-frame-${padded}.jpg`;
  }, []);

  /* ── 1. HIGH SPEED PROGRESSIVE PRELOADER ───────────────────────── */
  useEffect(() => {
    let isCancelled = false;
    loadedCountRef.current = 0;

    // Step 1: Priority Keyframes (Every 5th frame) so car displays immediately
    const priorityFrames = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += 5) {
      priorityFrames.push(i);
    }
    if (!priorityFrames.includes(1)) priorityFrames.unshift(1);
    if (!priorityFrames.includes(TOTAL_FRAMES)) priorityFrames.push(TOTAL_FRAMES);

    // Step 2: Remaining frames
    const remainingFrames = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (!priorityFrames.includes(i)) {
        remainingFrames.push(i);
      }
    }

    const loadSingleFrame = (idx) => {
      return new Promise((resolve) => {
        if (imagesCacheRef.current[idx]) {
          resolve(imagesCacheRef.current[idx]);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (!isCancelled) {
            imagesCacheRef.current[idx] = img;
            loadedCountRef.current += 1;
            setLoadProgress(Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100));
            // As soon as frame 1 is ready, start rendering
            if (idx === 1 && !isLoaded) {
              setIsLoaded(true);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // Sequentially load priority first, then burst the rest
    (async () => {
      // Load first frame immediately
      await loadSingleFrame(1);
      if (!isCancelled) setIsLoaded(true);

      // Load rest of priority in parallel
      await Promise.all(priorityFrames.map(loadSingleFrame));

      // Load remaining in chunks of 15
      const chunkSize = 15;
      for (let i = 0; i < remainingFrames.length; i += chunkSize) {
        if (isCancelled) break;
        const slice = remainingFrames.slice(i, i + chunkSize);
        await Promise.all(slice.map(loadSingleFrame));
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl, isLoaded]);

  /* ── 2. CANVAS DRAW FUNCTION (PRESERVING 16:9 IN PURE BLACK STUDIO) ─ */
  const drawFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or fallback to nearest available loaded frame
    let img = imagesCacheRef.current[frameNumber];
    if (!img) {
      // Find nearest loaded frame
      for (let delta = 1; delta < 30; delta++) {
        if (imagesCacheRef.current[frameNumber - delta]) {
          img = imagesCacheRef.current[frameNumber - delta];
          break;
        }
        if (imagesCacheRef.current[frameNumber + delta]) {
          img = imagesCacheRef.current[frameNumber + delta];
          break;
        }
      }
    }
    if (!img) img = imagesCacheRef.current[1];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Clear with dark studio background
    ctx.fillStyle = '#060709';
    ctx.fillRect(0, 0, cw, ch);

    // Cover mode: scale image so it completely covers 100% of the canvas with ZERO side/top black gaps
    const imgRatio = (img.naturalWidth && img.naturalHeight) 
      ? img.naturalWidth / img.naturalHeight 
      : 16 / 9;
    const canvasRatio = cw / ch;

    let dw, dh, dx, dy;

    if (canvasRatio > imgRatio) {
      // Screen is wider than image (e.g. desktop widescreen): stretch width to full canvas width
      dw = cw;
      dh = cw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2; // Center vertically
    } else {
      // Screen is taller than image (e.g. mobile vertical): stretch height to full canvas height
      dh = ch;
      dw = ch * imgRatio;
      dx = (cw - dw) / 2; // Center horizontally
      dy = 0;
    }

    // High quality bicubic image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw the photorealistic Koenigsegg frame covering the entire canvas
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ── 3. RESIZE HANDLER (RETINA RESOLUTION DAMPING) ─────────────── */
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      drawFrame(Math.round(currentFrameRef.current));
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [drawFrame]);

  /* ── 4. SMOOTH LERP RENDER LOOP (60FPS DOLBY CAMERA FEEL) ───────── */
  useEffect(() => {
    let animId;
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.14; // Smooth interpolation
        const frameInt = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current)));
        setCurrentFrame(frameInt);
        drawFrame(frameInt);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  /* ── 5. SCROLL EVENT DRIVER ───────────────────────────────────── */
  const handleScroll = useCallback(() => {
    if (isPlaying) return; // Don't fight scroll when auto-tour is running
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = window.scrollY;
    const scrollHeight = container.offsetHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight));
    setScrollPercent(progress);

    const mappedFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progress * (TOTAL_FRAMES - 1))));
    targetFrameRef.current = mappedFrame;
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── 6. AUTOPLAY CINEMATIC TOUR ────────────────────────────────── */
  const toggleAutoPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearInterval(autoPlayIntervalRef.current);
    } else {
      setIsPlaying(true);
      autoPlayIntervalRef.current = setInterval(() => {
        targetFrameRef.current = targetFrameRef.current >= TOTAL_FRAMES ? 1 : targetFrameRef.current + 1;
        // Sync scroll position
        const container = containerRef.current;
        if (container) {
          const scrollHeight = container.offsetHeight - window.innerHeight;
          const targetY = ((targetFrameRef.current - 1) / (TOTAL_FRAMES - 1)) * scrollHeight;
          window.scrollTo({ top: targetY, behavior: 'auto' });
        }
      }, 45); // ~22fps cinematic tour speed
    }
  };

  useEffect(() => {
    return () => clearInterval(autoPlayIntervalRef.current);
  }, []);

  /* ── 7. TOUCH / MOUSE HORIZONTAL SCRUBBING ON CANVAS ───────────── */
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startFrameRef.current = targetFrameRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startXRef.current;
    // 3px drag = 1 frame
    const frameShift = Math.round(deltaX / 3);
    const newTarget = Math.max(1, Math.min(TOTAL_FRAMES, startFrameRef.current - frameShift));
    targetFrameRef.current = newTarget;

    // Sync window scroll
    const container = containerRef.current;
    if (container) {
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const targetY = ((newTarget - 1) / (TOTAL_FRAMES - 1)) * scrollHeight;
      window.scrollTo({ top: targetY, behavior: 'auto' });
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  /* ── 8. DIRECT JUMP TO SERVICE ─────────────────────────────────── */
  const jumpToService = (targetPeakFrame) => {
    setIsPlaying(false);
    clearInterval(autoPlayIntervalRef.current);
    targetFrameRef.current = targetPeakFrame;

    const container = containerRef.current;
    if (container) {
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const targetY = ((targetPeakFrame - 1) / (TOTAL_FRAMES - 1)) * scrollHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  /* ── 9. CURRENT ACTIVE SERVICE CALCULATION ──────────────────────── */
  const activeService = useMemo(() => {
    return SERVICES.find(
      (s) => currentFrame >= s.frameStart && currentFrame <= s.frameEnd
    );
  }, [currentFrame]);

  // Is Final Hero Conclusion Active (Frames 284 to 300)
  const isFinalHero = currentFrame >= 284;

  return (
    <div className="bg-[#060709] text-white font-['Manrope',sans-serif] selection:bg-[#ff2a42] selection:text-white">

      {/* ─── SCROLL TRACK CONTAINER (700vh for cinematic pacing) ─── */}
      <div ref={containerRef} className="relative w-full h-[700vh]">

        {/* ─── FIXED CINEMATIC VIEWPORT ───────────────────────────── */}
        <div 
          className="fixed inset-0 w-full h-[100dvh] overflow-hidden select-none"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {/* Canvas for 60FPS Koenigsegg Frames */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />

          {/* Subtle Ambient Radial Lighting Layer on Ground */}
          <div 
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1200px] h-[320px] rounded-full blur-[140px] pointer-events-none transition-all duration-700"
            style={{ 
              background: activeService ? `${activeService.accent}15` : 'rgba(239,68,68,0.12)' 
            }}
          />

          {/* Cinematic Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 45%, rgba(6,7,9,0.85) 100%)'
            }}
          />

          {/* ─── TOP CONCIERGE HUD NAVBAR ─────────────────────────── */}
          <header 
            className="absolute top-0 left-0 right-0 z-30 py-5 flex items-center justify-between pointer-events-auto"
            style={{
              paddingLeft: 'clamp(2rem, 6vw, 7rem)',
              paddingRight: 'clamp(2rem, 6vw, 7rem)'
            }}
          >
            {/* Logo */}
            <Link to="/landing" className="flex items-center gap-3 group">
              <div className="relative">
                <svg width="48" height="40" viewBox="0 0 56 48" fill="none">
                  <rect width="56" height="48" rx="4" fill="#CC0000" />
                  <text x="4" y="34" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="32" fill="white">M</text>
                  <g transform="translate(32,30) scale(0.55)">
                    <rect x="0" y="4" width="28" height="14" rx="2" fill="white" />
                    <rect x="22" y="0" width="10" height="18" rx="2" fill="white" />
                    <circle cx="6" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5" />
                    <circle cx="24" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-white font-black text-lg tracking-widest font-['Space_Grotesk',sans-serif]">MECHIFY</div>
                <div className="text-[#849396] text-[9px] tracking-[0.2em] uppercase font-mono">Hypercar Showcase</div>
              </div>
            </Link>

            {/* Micro HUD Center Status */}
            <div className="hidden lg:flex items-center gap-6 font-['JetBrains_Mono',monospace] text-[11px] text-[#bac9cc] bg-[#0b0e15]/80 backdrop-blur-md px-5 py-2 rounded-full border border-[#272a31]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a8ffd2] animate-pulse" />
                KOENIGSEGG ATELIER
              </span>
              <span className="text-[#3b494c]">|</span>
              <span className="text-white font-bold">FRAME {String(currentFrame).padStart(3, '0')} / 300</span>
              <span className="text-[#3b494c]">|</span>
              <span className="text-[#ffd799] uppercase">
                {activeService ? activeService.cameraLabel : isFinalHero ? 'FINAL HERO COMPO' : 'TRANSITIONING'}
              </span>
            </div>

            {/* Right Action Cluster with generous right gap */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAutoPlay}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#191c23]/90 hover:bg-[#272a31] border border-[#3b494c] text-white font-['JetBrains_Mono',monospace] text-xs font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
                title="Toggle Automatic 360 Camera Orbit"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ff2a42]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
                <span>{isPlaying ? 'PAUSE TOUR' : 'AUTO TOUR'}</span>
              </button>

              <Link
                to="/auth"
                className="px-5 py-2 rounded-full bg-[#ff2a42] hover:bg-[#ef4444] text-white font-['Space_Grotesk',sans-serif] text-xs uppercase font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(255,42,66,0.4)] active:scale-95"
              >
                Sign In
              </Link>
            </div>
          </header>

          {/* ─── INITIAL PRELOAD PROGRESS BAR ────────────────────── */}
          {!isLoaded && (
            <div className="absolute inset-0 z-50 bg-[#060709] flex flex-col items-center justify-center p-6 space-y-4">
              <div className="w-12 h-12 border-2 border-[#ff2a42] border-t-transparent rounded-full animate-spin" />
              <div className="font-['JetBrains_Mono',monospace] text-xs uppercase tracking-widest text-[#bac9cc] text-center">
                INITIALIZING KOENIGSEGG 7-SERVICE SHOWCASE · {loadProgress}%
              </div>
              <div className="w-64 h-1 bg-[#191c23] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#ff2a42] transition-all duration-200" 
                  style={{ width: `${loadProgress}%` }} 
                />
              </div>
            </div>
          )}

          {/* ─── UNCLUTTERED MINIMAL SERVICE OVERLAY (ONE AT A TIME) ─ */}
          {activeService && !isFinalHero && (
            <div 
              key={activeService.id}
              className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end md:justify-center transition-all duration-700"
              style={{
                paddingLeft: 'clamp(2rem, 6vw, 7rem)',
                paddingRight: 'clamp(2rem, 6vw, 7rem)',
                paddingBottom: 'clamp(6.5rem, 14vh, 9rem)',
                paddingTop: '5rem'
              }}
            >
              <div 
                className="max-w-md md:max-w-lg xl:max-w-xl pointer-events-auto animate-fadeIn"
                style={{
                  textShadow: '0 4px 24px rgba(0,0,0,0.9)'
                }}
              >
                {/* Micro Service Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b0e15]/80 backdrop-blur-md border border-[#272a31] mb-3 sm:mb-4">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: activeService.accent }} 
                  />
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#bac9cc] font-semibold">
                    MECHIFY SERVICE {activeService.num} / 07
                  </span>
                </div>

                {/* Large, Elegant, Thin / Semi-bold Service Title */}
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05] mb-2 sm:mb-3">
                  {activeService.title}
                </h2>

                {/* Much Smaller, Short, Single-sentence Description */}
                <p className="font-['Manrope',sans-serif] text-xs sm:text-sm md:text-base text-[#bac9cc] font-light max-w-lg leading-relaxed mb-5 sm:mb-6">
                  {activeService.desc}
                </p>

                {/* Direct Action Link */}
                <div className="flex items-center gap-4">
                  <Link
                    to={`/auth?redirect=${encodeURIComponent(activeService.route)}`}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#ff2a42] hover:bg-[#ef4444] text-white font-['Space_Grotesk',sans-serif] text-xs sm:text-sm uppercase font-bold tracking-wider transition-all shadow-[0_0_24px_rgba(255,42,66,0.4)] active:scale-95"
                  >
                    <span>{activeService.ctaText}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>

                  <button
                    onClick={() => jumpToService(activeService.framePeak + 38)}
                    className="px-4 py-2.5 rounded-lg bg-[#191c23]/80 hover:bg-[#272a31] text-[#bac9cc] hover:text-white font-['JetBrains_Mono',monospace] text-xs font-semibold border border-[#272a31] transition-all cursor-pointer"
                  >
                    Next Angle →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── FINAL HERO TRANSITION: MECHIFY ────────────────────── */}
          {isFinalHero && (
            <div 
              className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center animate-fadeIn"
              style={{
                paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
                paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
                paddingTop: '5rem',
                paddingBottom: '5rem'
              }}
            >
              <div className="max-w-3xl pointer-events-auto space-y-4">
                
                {/* Mechify Monolith Title */}
                <h1 className="font-['Space_Grotesk',sans-serif] text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none">
                  MECHIFY
                </h1>

                {/* Clean Subtitle */}
                <p className="font-['Manrope',sans-serif] text-base sm:text-xl md:text-2xl text-[#bac9cc] font-light tracking-wide">
                  Everything Your Car Needs.
                </p>

                {/* 4 Objective Metrics HUD */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 font-['JetBrains_Mono',monospace]">
                  <div className="p-3 rounded-lg bg-[#0b0e15]/80 backdrop-blur-md border border-[#272a31]">
                    <div className="text-xl sm:text-2xl font-bold text-[#ff2a42]">12,000+</div>
                    <div className="text-[10px] text-[#849396] uppercase mt-0.5">Verified Trips</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0b0e15]/80 backdrop-blur-md border border-[#272a31]">
                    <div className="text-xl sm:text-2xl font-bold text-[#ffd799]">24</div>
                    <div className="text-[10px] text-[#849396] uppercase mt-0.5">Workshop Hubs</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0b0e15]/80 backdrop-blur-md border border-[#272a31]">
                    <div className="text-xl sm:text-2xl font-bold text-[#a8ffd2]">12 MIN</div>
                    <div className="text-[10px] text-[#849396] uppercase mt-0.5">Avg Response</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0b0e15]/80 backdrop-blur-md border border-[#272a31]">
                    <div className="text-xl sm:text-2xl font-bold text-white">4.9 ★</div>
                    <div className="text-[10px] text-[#849396] uppercase mt-0.5">App Store Rating</div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    to={`/auth?redirect=${encodeURIComponent('/home')}`}
                    className="px-8 py-4 rounded-xl bg-[#ff2a42] hover:bg-[#ef4444] text-white font-['Space_Grotesk',sans-serif] text-sm uppercase font-bold tracking-wider transition-all shadow-[0_0_30px_rgba(255,42,66,0.6)] active:scale-95"
                  >
                    Enter Mechify Platform →
                  </Link>
                  <Link
                    to={`/auth?redirect=${encodeURIComponent('/home-service')}`}
                    className="px-6 py-4 rounded-xl bg-[#191c23]/90 hover:bg-[#272a31] border border-[#3b494c] text-white font-['Space_Grotesk',sans-serif] text-sm uppercase font-bold tracking-wider transition-all active:scale-95"
                  >
                    Doorstep Service Concierge
                  </Link>
                  <button
                    onClick={() => jumpToService(1)}
                    className="px-4 py-4 rounded-xl bg-[#0b0e15]/80 text-[#bac9cc] hover:text-white border border-[#272a31] font-['JetBrains_Mono',monospace] text-xs uppercase cursor-pointer"
                    title="Replay Koenigsegg Showcase"
                  >
                    Replay ↺
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── BOTTOM MINIMAL TIMELINE SCRUBBER HUD ──────────────── */}
          <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col items-center pointer-events-auto">
            
            {/* 7 Services Dot Markers */}
            <div className="flex items-center gap-1.5 sm:gap-3 bg-[#0b0e15]/85 backdrop-blur-md px-4 sm:px-6 py-2.5 rounded-full border border-[#272a31] shadow-2xl overflow-x-auto max-w-full">
              {SERVICES.map((s) => {
                const isSelected = activeService?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => jumpToService(s.framePeak)}
                    className="group flex items-center gap-1.5 py-1 px-2 rounded-full transition-all cursor-pointer border-0 bg-transparent shrink-0"
                    title={`${s.num} - ${s.title}`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full transition-all duration-300 block"
                      style={{
                        backgroundColor: isSelected ? s.accent : 'rgba(255,255,255,0.25)',
                        transform: isSelected ? 'scale(1.4)' : 'scale(1)',
                        boxShadow: isSelected ? `0 0 10px ${s.accent}` : 'none'
                      }}
                    />
                    <span 
                      className={`font-['JetBrains_Mono',monospace] text-[9px] sm:text-[10px] uppercase font-bold transition-colors hidden md:inline ${
                        isSelected ? 'text-white' : 'text-[#849396] group-hover:text-[#e0e2ec]'
                      }`}
                    >
                      {s.num} {s.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}

              {/* Finale dot */}
              <button
                onClick={() => jumpToService(TOTAL_FRAMES)}
                className="group flex items-center gap-1.5 py-1 px-2 rounded-full transition-all cursor-pointer border-0 bg-transparent shrink-0"
                title="Final Hero: MECHIFY"
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 block"
                  style={{
                    backgroundColor: isFinalHero ? '#ff2a42' : 'rgba(255,255,255,0.25)',
                    transform: isFinalHero ? 'scale(1.4)' : 'scale(1)',
                    boxShadow: isFinalHero ? '0 0 10px #ff2a42' : 'none'
                  }}
                />
                <span className={`font-['JetBrains_Mono',monospace] text-[9px] sm:text-[10px] uppercase font-bold hidden md:inline ${isFinalHero ? 'text-white' : 'text-[#849396]'}`}>
                  MECHIFY
                </span>
              </button>
            </div>

            {/* Micro Interaction Hint */}
            <div className="mt-2 text-[10px] font-['JetBrains_Mono',monospace] text-[#849396] uppercase tracking-widest hidden sm:block">
              Scroll or Drag To Orbit Koenigsegg · Click Any Marker For Direct Transition
            </div>
          </div>

          {/* ─── VERTICAL RIGHT PROGRESS RAIL WITH GENEROUS RIGHT GAP ─── */}
          <div className="hidden lg:flex absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3">
            <span className="font-['JetBrains_Mono',monospace] text-[9px] text-[#849396] uppercase tracking-widest -rotate-90 origin-center mb-4">
              CAMERA ORBIT
            </span>
            <div className="h-36 w-0.5 bg-[#272a31] rounded-full relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full bg-[#ff2a42] rounded-full transition-all duration-150"
                style={{ height: `${(currentFrame / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
            <span className="font-['JetBrains_Mono',monospace] text-[10px] text-white font-bold font-mono">
              {Math.round((currentFrame / TOTAL_FRAMES) * 100)}%
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}

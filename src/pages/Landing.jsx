import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Scene definitions ───────────────────────────────────────── */
const SCENES = [
  {
    id: 'rental',
    image: '/lambo_front.jpg',
    accentColor: '#dc2626',
    glowColor: 'rgba(220,38,38,0.55)',
    bgTint: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(220,38,38,0.25) 0%, transparent 65%)',
    label: 'SCENE 01',
    services: [
      { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m8-1v1m-1-4V8a2 2 0 00-2-2H9a2 2 0 00-2 2v3" /></svg>, title: 'Car Rental', desc: 'Rent exotic Lamborghinis, Ferraris, and luxury sedans for any occasion. Instant booking, flexible returns.' },
    ],
    cameraHint: 'Camera: Front Angle',
    annotation: { x: '48%', y: '62%', text: 'FRONT SPLITTER', line: 'down' },
    align: 'right', // User requested to change this to the other side
  },
  {
    id: 'driver',
    image: '/lambo_door.jpg',
    accentColor: '#f97316',
    glowColor: 'rgba(249,115,22,0.55)',
    bgTint: 'radial-gradient(ellipse 90% 70% at 40% 100%, rgba(249,115,22,0.25) 0%, transparent 65%)',
    label: 'SCENE 02',
    services: [
      { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, title: 'Hire a Driver', desc: 'Professional, certified chauffeurs available 24/7 for airport transfers, events, or hourly hire.' },
    ],
    cameraHint: 'Camera: Scissor Door Open',
    annotation: { x: '55%', y: '45%', text: 'LUXURY COCKPIT', line: 'up' },
    align: 'right', // User didn't ask to change this one
  },
  {
    id: 'engine',
    image: '/lambo_engine.jpg',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.55)',
    bgTint: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(245,158,11,0.2) 0%, transparent 65%)',
    label: 'SCENE 03',
    services: [
      { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, title: 'Workshop Service', desc: 'Certified mechanics & state-of-the-art workshops for full diagnostics and repairs.' },
      { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m8-1v1m-1-4V8a2 2 0 00-2-2H9a2 2 0 00-2 2v3" /></svg>, title: 'Emergency Mechanic', desc: 'Broken down? We dispatch a mechanic to your location — day or night.' },
      { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: 'Emergency Fuel', desc: 'Out of fuel anywhere in the city? We rush to your GPS pin in under 12 minutes.' },
    ],
    cameraHint: 'Camera: Engine Bay — V10 Exposed',
    annotation: { x: '50%', y: '48%', text: '5.2L V10 ENGINE', line: 'down' },
    align: 'right', // User requested to change this to the other side
  },
  {
    id: 'wheel',
    image: '/lambo_wheel.jpg',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.55)',
    bgTint: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(59,130,246,0.25) 0%, transparent 65%)',
    label: 'SCENE 04',
    services: [
      { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, title: 'Spare Parts Store', desc: '450+ genuine spare parts for all vehicle makes. Order online, check availability instantly.' },
    ],
    cameraHint: 'Camera: Wheel & Brake Caliper',
    annotation: { x: '55%', y: '55%', text: 'BREMBO CALIPER', line: 'right' },
    align: 'right', // User didn't ask to change this one
  },
  {
    id: 'conclusion',
    image: '/lambo_wheel.jpg',
    accentColor: '#ffffff',
    glowColor: 'rgba(255,255,255,0.1)',
    bgTint: 'rgba(0,0,0,0.85)',
    label: 'SCENE 05',
    services: [], // Custom layout used instead
    cameraHint: 'Camera: Journey Complete',
    align: 'center',
    isCustom: true
  }
];

/* ─── Utility ─────────────────────────────────────────────────── */
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

export default function Landing() {
  const wrapRef = useRef(null);
  const bottomRef = useRef(null);
  const [rawProgress, setRawProgress] = useState(0); // 0..1 across the scroll zone
  const [heroIn, setHeroIn] = useState(false);
  
  // State for animated numbers
  const statsRef = useRef({ customers: 12000, services: 6, cities: 24, eta: 12 });
  const [renderTrigger, setRenderTrigger] = useState(0);

  /* Derived */
  const totalScenes = SCENES.length;
  // Progress across scenes 0 to 4
  const sceneF = Math.min(rawProgress * totalScenes, totalScenes - 0.01);
  const sceneIdx = clamp(Math.floor(sceneF), 0, totalScenes - 1);
  const sceneT = clamp(sceneF - sceneIdx, 0, 1); // progress within current scene

  const scene = SCENES[sceneIdx];
  const nextScene = SCENES[Math.min(sceneIdx + 1, totalScenes - 1)];

  const crossfade = clamp((sceneT - 0.75) / 0.25, 0, 1);
  const zoom = 1 + sceneT * 0.06;
  const panX = [-2, 2, -1, 0, 0][sceneIdx] * sceneT;

  useEffect(() => {
    setTimeout(() => setHeroIn(true), 300);
  }, []);

  useEffect(() => {
    // Animate numbers when reaching Scene 5
    if (sceneIdx === 4) {
      statsRef.current = { customers: 0, services: 0, cities: 0, eta: 0 };
      setRenderTrigger(v => v + 1);
      gsap.to(statsRef.current, {
        customers: 12000,
        services: 6,
        cities: 24,
        eta: 12,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => setRenderTrigger(v => v + 1)
      });
      
      // Also trigger enter animations for the steps
      gsap.fromTo('.step-item', 
        { y: 30, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [sceneIdx]);

  const handleScroll = useCallback(() => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const scrollable = wrapRef.current.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const scrolled = clamp(-rect.top, 0, scrollable);
    setRawProgress(scrolled / scrollable);
  }, []);

  const scrollToScene = (index) => {
    if (!wrapRef.current) return;
    const scrollable = wrapRef.current.offsetHeight - window.innerHeight;
    const targetScroll = (index / (totalScenes - 0.5)) * scrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Touch gesture support for mobile Chrome & iOS Safari (where fixed inset-0 prevents standard body touch scroll)
  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    let isTouchActive = false;

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      isTouchActive = true;
    };

    const onTouchMove = (e) => {
      if (!isTouchActive || e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = touchStartY - currentY;
      const deltaX = touchStartX - currentX;

      // Handle vertical swipe gestures
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        window.scrollBy(0, deltaY * 1.5);
        touchStartY = currentY;
        touchStartX = currentX;
      }
    };

    const onTouchEnd = () => {
      isTouchActive = false;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  /* Service card entrance — stagger */
  // Scene 5 (conclusion) is always visible once reached; scenes 0-3 fade in and out with scene progress
  const cardVisible = sceneIdx === totalScenes - 1 ? true : (sceneT > 0.15 && sceneT < 0.85);

  return (
    <div className="bg-black text-white font-outfit">

      {/* ═══ SCROLL CONTAINER — 5 scenes ═══════════════════ */}
      <div ref={wrapRef} style={{ height: `${totalScenes * 120}vh` }}>

        {/* ─── FIXED CINEMATIC VIEWPORT (PERMANENTLY PINNED TO SCREEN) ─ */}
        <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden">

          {/* ── Background tint layer ── */}
          <div
            className="absolute inset-0 z-0 transition-all duration-700"
            style={{ background: scene.bgTint + ', #000' }}
          />

          {/* ── CURRENT scene image ── */}
          <div
            className="absolute inset-0 z-1 overflow-hidden"
          >
            <img
              key={scene.id}
              src={scene.image}
              alt={scene.id}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `scale(${zoom}) translateX(${panX}%)`,
                transition: 'transform 0.1s linear',
                filter: 'brightness(0.45)',
              }}
            />
          </div>

          {/* ── NEXT scene image (crossfade) ── */}
          {crossfade > 0 && (
            <div className="absolute inset-0 z-2 overflow-hidden">
              <img
                src={nextScene.image}
                alt={nextScene.id}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: 'scale(1)',
                  filter: 'brightness(0.45)',
                  opacity: crossfade,
                  transition: 'opacity 0.05s linear',
                }}
              />
            </div>
          )}

          {/* ── Vignette overlay ── */}
          <div
            className="absolute inset-0 z-3 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
            }}
          />

          {/* ── Custom Scene Black Overlay ── */}
          <div
            className="absolute inset-0 z-5 pointer-events-none transition-all duration-1000"
            style={{ backgroundColor: '#000', opacity: scene.isCustom ? 1 : 0 }}
          />

          {/* ── Bottom gradient ── */}
          <div className="absolute bottom-0 left-0 right-0 h-40 z-3 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }} />

          {/* ── Top gradient ── */}
          <div className="absolute top-0 left-0 right-0 h-32 z-3 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />

          {/* ─── NAVBAR ─────────────────────────────────── */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 md:px-14 py-4 sm:py-6">
            <Link to="/landing" className="flex items-center gap-2 sm:gap-3 group">
              <svg className="w-9 h-8 sm:w-11 sm:h-10" viewBox="0 0 56 48" fill="none">
                <rect width="56" height="48" rx="4" fill="#CC0000"/>
                <text x="4" y="34" fontFamily="Arial Black,Arial" fontWeight="900" fontSize="32" fill="white">M</text>
                <g transform="translate(32,30) scale(0.55)">
                  <rect x="0" y="4" width="28" height="14" rx="2" fill="white"/>
                  <rect x="22" y="0" width="10" height="18" rx="2" fill="white"/>
                  <circle cx="6" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                  <circle cx="24" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                </g>
              </svg>
              <div>
                <div className="font-black text-base sm:text-lg tracking-widest text-white">MECHIFY</div>
                <div className="text-gray-400 text-[7px] sm:text-[8px] tracking-[0.2em] uppercase">Vehicle Support</div>
              </div>
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/auth"
                className="font-black text-xs sm:text-sm tracking-widest uppercase transition-all hover:scale-105 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm"
                style={{ color: scene.accentColor, textShadow: `0 0 15px ${scene.glowColor}` }}
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* ─── HERO TEXT (only on scene 0 before scrolling) ─────── */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-all duration-700 px-4"
            style={{ opacity: rawProgress < 0.02 ? 1 : Math.max(0, 1 - rawProgress * 60) }}
          >
            <div
              className="text-center px-4 sm:px-6 transition-all duration-1000 max-w-4xl"
              style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(40px)' }}
            >
              <div className="inline-flex items-center gap-2 border border-red-500/30 text-red-400 text-[9px] sm:text-[10px] font-black px-4 sm:px-5 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 tracking-[0.25em] uppercase bg-red-600/10">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Bangladesh's #1 Vehicle Platform
              </div>
              <h1 className="text-[clamp(36px,8vw,110px)] font-black leading-[0.95] tracking-tight mb-3 sm:mb-4">
                <span className="block text-white">MECHIFY</span>
                <span
                  className="block text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg,#dc2626,#f97316,#dc2626)', backgroundSize: '200%', animation: 'gradShift 3s linear infinite' }}
                >
                  DRIVES YOU.
                </span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-base md:text-lg mt-3 sm:mt-4 animate-bounce" style={{ animationDuration: '2s' }}>
                Scroll to explore ↓
              </p>
            </div>
          </div>

          {/* ─── STANDARD SERVICE PANEL (Scenes 1-4) ─── */}
          {!scene.isCustom && (
            <div
              className="absolute inset-0 z-10 flex flex-col justify-center px-5 sm:px-8 md:px-14 lg:px-24 pr-12 sm:pr-16 md:pr-24 pointer-events-none"
              style={{ opacity: rawProgress > 0.02 ? 1 : 0, transition: 'opacity 0.5s ease' }}
            >
            <div
              className={`w-full max-w-3xl pointer-events-auto transition-all duration-700 ${
                scene.align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'
              }`}
            >
              {/* Service heading */}
              <div
                className="mb-4 sm:mb-8 transition-all duration-700"
                style={{
                  opacity: cardVisible ? 1 : 0,
                  transform: cardVisible ? 'translateY(0)' : 'translateY(30px)',
                }}
              >
                <h2
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-[90px] font-black leading-tight mb-2 sm:mb-4"
                  style={{ color: scene.accentColor, textShadow: `0 0 40px ${scene.glowColor}` }}
                >
                  {scene.services[0].title}
                </h2>
                {scene.services.length > 1 && (
                  <div className={`flex gap-2 sm:gap-4 mt-2 sm:mt-4 flex-wrap ${scene.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    {scene.services.slice(1).map(s => (
                      <span key={s.title} className="text-[11px] sm:text-sm md:text-base font-black tracking-widest uppercase px-3 sm:px-5 py-1 sm:py-2 rounded-full border backdrop-blur-sm"
                        style={{ borderColor: scene.accentColor + '50', color: scene.accentColor, background: 'rgba(0,0,0,0.4)' }}>
                        + {s.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Service cards column */}
              <div className={`flex gap-3 sm:gap-6 flex-col ${scene.align === 'right' ? 'items-end' : 'items-start'}`}>
                {scene.services.map((svc, i) => (
                  <div
                    key={svc.title}
                    className="flex-1 min-w-0 max-w-full md:max-w-lg p-1 sm:p-2"
                    style={{
                      opacity: cardVisible ? 1 : 0,
                      transform: cardVisible ? 'translateY(0)' : 'translateY(40px)',
                      transition: cardVisible ? `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1 + 0.1}s` : `all 0.2s ease-out`,
                      textShadow: '0px 4px 20px rgba(0,0,0,0.8)'
                    }}
                  >
                    <div className={`flex items-center gap-2 sm:gap-4 mb-1 sm:mb-3 ${scene.align === 'right' ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                      <span className="font-black text-white text-lg sm:text-2xl md:text-4xl">{svc.title}</span>
                    </div>
                    <p className="text-gray-200 text-xs sm:text-base md:text-lg leading-relaxed">{svc.desc}</p>
                  </div>
                ))}
              </div>
              </div>
            </div>
          )}

          {/* ─── CUSTOM CONCLUSION PANEL (Scene 5) ─── */}
          {scene.isCustom && (
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto transition-all duration-700 overflow-y-auto sm:overflow-hidden"
              style={{ opacity: cardVisible ? 1 : 0, transform: cardVisible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <div className="w-full max-w-5xl px-4 sm:px-8 md:px-12 mx-auto flex flex-col justify-center min-h-full sm:h-full gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-10">
                
                {/* ── STATS ── */}
                <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-8 text-center">
                  {[
                    { label: 'Happy Customers', valKey: 'customers', format: (v) => `${Math.round(v).toLocaleString()}+`, color: '#dc2626' },
                    { label: 'Services', valKey: 'services', format: (v) => Math.round(v), color: '#f97316' },
                    { label: 'Cities Covered', valKey: 'cities', format: (v) => `${Math.round(v)}+`, color: '#f59e0b' },
                    { label: 'Avg. ETA', valKey: 'eta', format: (v) => `${Math.round(v)} min`, color: '#3b82f6' },
                  ].map(({ label, valKey, format, color }) => (
                    <div key={label} className="stat-item group">
                      <div className="text-2xl sm:text-3xl md:text-5xl font-black mb-0.5 sm:mb-1 transition-colors" style={{ color }}>
                        {format(statsRef.current[valKey] || 0)}
                      </div>
                      <p className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] font-black">{label}</p>
                    </div>
                  ))}
                </div>

                {/* ── HOW IT WORKS ── */}
                <div className="how-it-works-container">
                  <div className="text-center mb-3 sm:mb-6 md:mb-8">
                    <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-0.5 sm:mb-1">Simple Process</p>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white">How It Works</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 relative">
                    <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.4), transparent)' }} />
                    {[
                      { num: '01', title: 'Create Account', desc: 'Sign up in seconds.' },
                      { num: '02', title: 'Pick a Service', desc: 'Choose from 6 premium services.' },
                      { num: '03', title: 'Book Instantly', desc: 'Confirm instantly, no wait.' },
                      { num: '04', title: 'Track Live', desc: 'Follow on a live map.' },
                    ].map((step) => (
                      <div key={step.num} className="step-item group text-center p-2 rounded-xl bg-white/[0.02]">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-1.5 sm:mb-3 bg-gradient-to-br from-red-900/50 to-black border border-red-800/40 rounded-xl sm:rounded-2xl flex items-center justify-center text-xs sm:text-base md:text-2xl font-black text-red-400 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-500">
                          {step.num}
                        </div>
                        <h3 className="text-xs sm:text-sm md:text-base font-black mb-0.5 text-white group-hover:text-red-400 transition-colors">{step.title}</h3>
                        <p className="text-gray-400 text-[10px] sm:text-xs leading-tight">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── CTA ── */}
                <div className="cta-container text-center relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[150px] sm:h-[200px] bg-red-900/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2 text-white">Ready to drive?</h2>
                    <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm mb-3 sm:mb-4">Join thousands of drivers who trust Mechify.</p>
                    <Link
                      to="/auth"
                      className="group relative inline-block bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:shadow-[0_0_60px_rgba(220,38,38,0.7)] overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      Sign Up or Sign In Today →
                    </Link>
                    <p className="text-gray-600 text-[8px] sm:text-[9px] mt-1.5 sm:mt-2">Free to join · No credit card required</p>
                  </div>
                </div>

              </div>
            </div>
          )}
          {/* ─── RIGHT SIDE: Scene progress & nav ─────────── */}
          <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 sm:gap-4">
            {/* Progress track */}
            <div className="h-32 sm:h-48 w-0.5 bg-white/10 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full rounded-full transition-all duration-300"
                style={{ height: `${rawProgress * 100}%`, background: scene.accentColor }}
              />
            </div>
            {/* Scene dots */}
            <div className="flex flex-col gap-1.5 sm:gap-3">
              {SCENES.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => scrollToScene(i)}
                  title={sc.label}
                  className="p-2 -m-2 flex items-center justify-center cursor-pointer border-0 bg-transparent focus:outline-none"
                >
                  <span
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-400 block"
                    style={{
                      background: i === sceneIdx ? sc.accentColor : 'rgba(255,255,255,0.25)',
                      transform: i === sceneIdx ? 'scale(1.4)' : 'scale(1)',
                      boxShadow: i === sceneIdx ? `0 0 8px ${sc.glowColor}` : 'none',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ─── MOBILE BOTTOM ACTION PILL ─────────────────── */}
          <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {sceneIdx < totalScenes - 1 ? (
              <button
                type="button"
                onClick={() => scrollToScene(sceneIdx + 1)}
                className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold text-white shadow-2xl active:scale-95 transition-all"
              >
                <span>Explore Scene 0{sceneIdx + 2}</span>
                <span className="text-red-500 font-black animate-bounce text-sm">↓</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 bg-red-600 px-5 py-2 rounded-full text-xs font-black text-white uppercase tracking-wider shadow-2xl active:scale-95 transition-all"
              >
                <span>Sign In / Join →</span>
              </Link>
            )}
          </div>

          {/* ─── BOTTOM RIGHT: Scene counter ──────────────── */}
          <div className="absolute right-3 sm:right-14 bottom-3 sm:bottom-12 z-20 text-right pointer-events-none">
            <div className="font-black text-2xl sm:text-4xl md:text-5xl leading-none" style={{ color: scene.accentColor }}>
              0{sceneIdx + 1}
            </div>
            <div className="text-gray-600 text-[10px] sm:text-xs font-semibold tracking-widest">/ 05</div>
          </div>

          {/* ─── Glow highlight circle ──────────────────── */}
          <div
            className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[80px] pointer-events-none z-0 transition-all duration-700"
            style={{ background: scene.glowColor, opacity: 0.25 }}
          />
        </div>
      </div>



      <style>{`
        @keyframes gradShift {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

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
      { icon: '🏎️', title: 'Car Rental', desc: 'Rent exotic Lamborghinis, Ferraris, and luxury sedans for any occasion. Instant booking, flexible returns.' },
    ],
    cameraHint: '📷 Front Angle',
    annotation: { x: '48%', y: '62%', text: 'FRONT SPLITTER', line: 'down' },
  },
  {
    id: 'driver',
    image: '/lambo_door.jpg',
    accentColor: '#f97316',
    glowColor: 'rgba(249,115,22,0.55)',
    bgTint: 'radial-gradient(ellipse 90% 70% at 40% 100%, rgba(249,115,22,0.25) 0%, transparent 65%)',
    label: 'SCENE 02',
    services: [
      { icon: '👨‍✈️', title: 'Hire a Driver', desc: 'Professional, certified chauffeurs available 24/7 for airport transfers, events, or hourly hire.' },
    ],
    cameraHint: '📷 Scissor Door Open',
    annotation: { x: '55%', y: '45%', text: 'LUXURY COCKPIT', line: 'up' },
  },
  {
    id: 'engine',
    image: '/lambo_engine.jpg',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.55)',
    bgTint: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(245,158,11,0.2) 0%, transparent 65%)',
    label: 'SCENE 03',
    services: [
      { icon: '🔧', title: 'Workshop Service', desc: 'Certified mechanics & state-of-the-art workshops for full diagnostics and repairs.' },
      { icon: '🚗', title: 'Emergency Mechanic', desc: 'Broken down? We dispatch a mechanic to your location — day or night.' },
      { icon: '⛽', title: 'Emergency Fuel', desc: 'Out of fuel anywhere in the city? We rush to your GPS pin in under 12 minutes.' },
    ],
    cameraHint: '📷 Engine Bay — V10 Exposed',
    annotation: { x: '50%', y: '48%', text: '5.2L V10 ENGINE', line: 'down' },
  },
  {
    id: 'wheel',
    image: '/lambo_wheel.jpg',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.55)',
    bgTint: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(59,130,246,0.25) 0%, transparent 65%)',
    label: 'SCENE 04',
    services: [
      { icon: '🔩', title: 'Spare Parts Store', desc: '450+ genuine spare parts for all vehicle makes. Order online, check availability instantly.' },
    ],
    cameraHint: '📷 Wheel & Brake Caliper',
    annotation: { x: '55%', y: '55%', text: 'BREMBO CALIPER', line: 'right' },
  },
];

/* ─── Utility ─────────────────────────────────────────────────── */
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
function lerp(a, b, t) { return a + (b - a) * t; }

export default function Landing() {
  const wrapRef = useRef(null);
  const [rawProgress, setRawProgress] = useState(0); // 0..1 across the scroll zone
  const [heroIn, setHeroIn] = useState(false);

  /* Derived */
  const totalScenes = SCENES.length;
  // Which scene index (0-based), and how far within that scene (0..1)
  const sceneF = rawProgress * totalScenes;
  const sceneIdx = clamp(Math.floor(sceneF), 0, totalScenes - 1);
  const sceneT = clamp(sceneF - sceneIdx, 0, 1); // progress within current scene

  const scene = SCENES[sceneIdx];
  const nextScene = SCENES[Math.min(sceneIdx + 1, totalScenes - 1)];

  // Cross-fade: images cross-dissolve in the last 20% of each scene
  const crossfade = clamp((sceneT - 0.8) / 0.2, 0, 1);

  // Zoom: slightly zoom into the current image as scene progresses
  const zoom = 1 + sceneT * 0.06;

  // Pan: subtle X drift per scene
  const panX = [-2, 2, -1, 0][sceneIdx] * sceneT;

  useEffect(() => {
    setTimeout(() => setHeroIn(true), 300);
  }, []);

  const handleScroll = useCallback(() => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const scrollable = wrapRef.current.offsetHeight - window.innerHeight;
    const scrolled = clamp(-rect.top, 0, scrollable);
    setRawProgress(scrolled / scrollable);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Service card entrance — stagger */
  const cardVisible = sceneT > 0.25;

  return (
    <div className="bg-black text-white font-outfit">

      {/* ═══ SCROLL CONTAINER — 500vh per scene ═══════════════════ */}
      <div ref={wrapRef} style={{ height: `${totalScenes * 200}vh` }}>

        {/* ─── STICKY CINEMATIC VIEWPORT ─────────────────────────── */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

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

          {/* ── Bottom gradient ── */}
          <div className="absolute bottom-0 left-0 right-0 h-40 z-3 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }} />

          {/* ── Top gradient ── */}
          <div className="absolute top-0 left-0 right-0 h-32 z-3 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />

          {/* ─── NAVBAR ─────────────────────────────────── */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-14 py-6">
            <Link to="/landing" className="flex items-center gap-3 group">
              <svg width="44" height="38" viewBox="0 0 56 48" fill="none">
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
                <div className="font-black text-lg tracking-widest text-white">MECHIFY</div>
                <div className="text-gray-500 text-[8px] tracking-[0.25em] uppercase">Vehicle Support</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-gray-300 hover:text-white font-semibold text-sm transition-colors">Sign In</Link>
              <Link to="/auth"
                className="font-black text-sm px-6 py-2.5 rounded-full transition-all hover:scale-105"
                style={{ background: scene.accentColor, boxShadow: `0 0 20px ${scene.glowColor}` }}
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* ─── SCENE LABEL (top-left) ─────────────────── */}
          <div
            className="absolute top-24 left-8 md:left-14 z-20 transition-all duration-500"
            style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(-20px)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-px" style={{ background: scene.accentColor }} />
              <span className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: scene.accentColor }}>
                {scene.label}
              </span>
            </div>
            <div className="text-xs text-gray-500 font-semibold tracking-widest">{scene.cameraHint}</div>
          </div>

          {/* ─── HERO TEXT (only on scene 0 before scrolling) ─────── */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-all duration-700"
            style={{ opacity: rawProgress < 0.02 ? 1 : Math.max(0, 1 - rawProgress * 60) }}
          >
            <div
              className="text-center px-6 transition-all duration-1000"
              style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(40px)' }}
            >
              <div className="inline-flex items-center gap-2 border border-red-500/30 text-red-400 text-[10px] font-black px-5 py-1.5 rounded-full mb-6 tracking-[0.25em] uppercase bg-red-600/10">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Bangladesh's #1 Vehicle Platform
              </div>
              <h1 className="text-[clamp(56px,10vw,130px)] font-black leading-[0.9] tracking-tight mb-4">
                <span className="block text-white">MECHIFY</span>
                <span
                  className="block text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg,#dc2626,#f97316,#dc2626)', backgroundSize: '200%', animation: 'gradShift 3s linear infinite' }}
                >
                  DRIVES YOU.
                </span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg mt-4 animate-bounce" style={{ animationDuration: '2s' }}>
                Scroll to explore ↓
              </p>
            </div>
          </div>

          {/* ─── SERVICE PANEL (appears after scene has loaded) ─── */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 pb-14 px-8 md:px-14 lg:px-20"
            style={{ opacity: rawProgress > 0.02 ? 1 : 0, transition: 'opacity 0.5s ease' }}
          >
            {/* Service heading */}
            <div
              className="mb-5 transition-all duration-700"
              style={{
                opacity: cardVisible ? 1 : 0,
                transform: cardVisible ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-black leading-none mb-1"
                style={{ color: scene.accentColor, textShadow: `0 0 40px ${scene.glowColor}` }}
              >
                {scene.services[0].title}
              </h2>
              {scene.services.length > 1 && (
                <div className="flex gap-3 mt-1">
                  {scene.services.slice(1).map(s => (
                    <span key={s.title} className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border"
                      style={{ borderColor: scene.accentColor + '50', color: scene.accentColor }}>
                      + {s.title}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Service cards row */}
            <div className="flex gap-4 flex-wrap">
              {scene.services.map((svc, i) => (
                <div
                  key={svc.title}
                  className="flex-1 min-w-[220px] max-w-sm rounded-2xl p-5 border backdrop-blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${scene.accentColor}15, rgba(0,0,0,0.7))`,
                    borderColor: scene.accentColor + '40',
                    boxShadow: `0 0 25px ${scene.glowColor}`,
                    opacity: cardVisible ? 1 : 0,
                    transform: cardVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.6s ease ${i * 0.1 + 0.1}s`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{svc.icon}</span>
                    <span className="font-black text-white text-base">{svc.title}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT SIDE: Scene progress & nav ─────────── */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
            {/* Progress track */}
            <div className="h-48 w-0.5 bg-white/10 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full rounded-full transition-all duration-300"
                style={{ height: `${rawProgress * 100}%`, background: scene.accentColor }}
              />
            </div>
            {/* Scene dots */}
            <div className="flex flex-col gap-3">
              {SCENES.map((sc, i) => (
                <div
                  key={sc.id}
                  className="w-2 h-2 rounded-full transition-all duration-400"
                  style={{
                    background: i === sceneIdx ? sc.accentColor : 'rgba(255,255,255,0.2)',
                    transform: i === sceneIdx ? 'scale(1.5)' : 'scale(1)',
                    boxShadow: i === sceneIdx ? `0 0 8px ${sc.glowColor}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ─── BOTTOM RIGHT: Scene counter ──────────────── */}
          <div className="absolute right-14 bottom-12 z-20 text-right pointer-events-none">
            <div className="font-black text-5xl leading-none" style={{ color: scene.accentColor }}>
              0{sceneIdx + 1}
            </div>
            <div className="text-gray-600 text-xs font-semibold tracking-widest">/ 04</div>
          </div>

          {/* ─── Glow highlight circle ──────────────────── */}
          <div
            className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[80px] pointer-events-none z-0 transition-all duration-700"
            style={{ background: scene.glowColor, opacity: 0.25 }}
          />
        </div>
      </div>

      {/* ═══ SECTION 2 — STATS ═════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#060606] border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Happy Customers', val: '12,000+', color: '#dc2626' },
            { label: 'Services', val: '6', color: '#f97316' },
            { label: 'Cities Covered', val: '24+', color: '#f59e0b' },
            { label: 'Avg. ETA', val: '12 min', color: '#3b82f6' },
          ].map(({ label, val, color }) => (
            <div key={label} className="group">
              <div className="text-4xl md:text-5xl font-black mb-2 transition-colors" style={{ color }}>{val}</div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 3 — HOW IT WORKS ══════════════════════════════ */}
      <section className="py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-3">Simple Process</p>
            <h2 className="text-5xl md:text-6xl font-black">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.4), transparent)' }} />
            {[
              { num: '01', title: 'Create Account', desc: 'Sign up in seconds with your email.' },
              { num: '02', title: 'Pick a Service', desc: 'Choose from 6 premium vehicle services.' },
              { num: '03', title: 'Book Instantly', desc: 'Confirm in seconds, no wait time.' },
              { num: '04', title: 'Track Live', desc: 'Follow your service on a live map.' },
            ].map((step) => (
              <div key={step.num} className="group text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-900/50 to-black border border-red-800/40 rounded-3xl flex items-center justify-center text-4xl font-black text-red-400 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-xl font-black mb-2 group-hover:text-red-400 transition-colors">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — CTA ══════════════════════════════════════ */}
      <section className="py-36 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-900/20 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-black mb-6">Ready to drive?</h2>
          <p className="text-gray-400 text-xl mb-12">Join thousands of drivers who trust Mechify.</p>
          <Link
            to="/auth"
            className="group relative inline-block bg-red-600 hover:bg-red-500 text-white font-black text-xl px-14 py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_50px_rgba(220,38,38,0.5)] hover:shadow-[0_0_80px_rgba(220,38,38,0.7)] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            Sign Up or Sign In Today →
          </Link>
          <p className="text-gray-600 text-sm mt-6">Free to join · No credit card required</p>
        </div>
      </section>

      <style>{`
        @keyframes gradShift {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

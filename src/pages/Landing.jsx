import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    id: 'rental',
    icon: '🏎️',
    title: 'Car Rental',
    subtitle: 'Drive the extraordinary',
    desc: 'Luxury & performance vehicles for every occasion. Instant booking, flexible returns.',
    color: '#dc2626',
    glow: 'rgba(220,38,38,0.6)',
    side: 'left',
  },
  {
    id: 'driver',
    icon: '👨‍✈️',
    title: 'Hire a Driver',
    subtitle: 'Professional chauffeurs',
    desc: 'Certified, background-checked drivers available 24/7 for any journey.',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.6)',
    side: 'right',
  },
  {
    id: 'workshop',
    icon: '🔧',
    title: 'Workshop Service',
    subtitle: 'Certified mechanics',
    desc: 'Full diagnostics, servicing & repairs at our state-of-the-art workshops.',
    color: '#eab308',
    glow: 'rgba(234,179,8,0.5)',
    side: 'left',
  },
  {
    id: 'fuel',
    icon: '⛽',
    title: 'Emergency Fuel',
    subtitle: 'Fuel delivered to you',
    desc: 'Ran out of fuel? We rush to your GPS location — average ETA 12 minutes.',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.6)',
    side: 'right',
  },
  {
    id: 'mechanic',
    icon: '🚗',
    title: 'Emergency Mechanic',
    subtitle: 'Roadside rescue',
    desc: 'Broken down anywhere? Our mechanics come to you, day or night.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.6)',
    side: 'left',
  },
  {
    id: 'parts',
    icon: '🔩',
    title: 'Spare Parts Store',
    subtitle: '450+ genuine parts',
    desc: 'Browse by category, check availability, and order original parts instantly.',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.5)',
    side: 'right',
  },
];

export default function Landing() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0..1 through the scroll section
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeService, setActiveService] = useState(-1);

  useEffect(() => {
    // Trigger hero text entrance
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const sectionHeight = scrollRef.current.offsetHeight - window.innerHeight;
      // How far we've scrolled past the top of the section
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      setScrollProgress(progress);

      // Each service covers 1/6 of the scroll range
      const idx = Math.floor(progress * 6) - 0;
      setActiveService(Math.min(idx, 5));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Car transform: pans left/right and slightly rotates based on scroll
  const carX = scrollProgress * -8; // % shift
  const carRotate = Math.sin(scrollProgress * Math.PI * 1.5) * 4; // subtle rock
  const carScale = 1 + scrollProgress * 0.08;

  // Glow color interpolates through service colors
  const currentSvc = SERVICES[activeService] || SERVICES[0];
  const glowColor = currentSvc?.glow || 'rgba(220,38,38,0.4)';

  // How many services are revealed
  const revealCount = Math.ceil(scrollProgress * 6);

  return (
    <div className="bg-black text-white font-outfit overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          SECTION 1 — STICKY SCROLL DRIVE
      ═══════════════════════════════════════════ */}
      {/* Tall scroll container — 700vh so user has room to scroll */}
      <div ref={scrollRef} className="relative" style={{ height: '700vh' }}>
        {/* Sticky viewport */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col">

          {/* Ambient BG that morphs color */}
          <div
            className="absolute inset-0 transition-colors duration-700"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${glowColor} 0%, transparent 70%), #000`,
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── NAV BAR ── */}
          <div className="relative z-30 flex items-center justify-between px-8 md:px-16 py-6">
            <Link to="/landing" className="flex items-center gap-3 group">
              <svg width="48" height="40" viewBox="0 0 56 48" fill="none">
                <rect width="56" height="48" rx="4" fill="#CC0000"/>
                <text x="4" y="34" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="32" fill="white">M</text>
                <g transform="translate(32,30) scale(0.55)">
                  <rect x="0" y="4" width="28" height="14" rx="2" fill="white"/>
                  <rect x="22" y="0" width="10" height="18" rx="2" fill="white"/>
                  <circle cx="6" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                  <circle cx="24" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                </g>
              </svg>
              <div>
                <div className="font-black text-lg tracking-widest">MECHIFY</div>
                <div className="text-gray-500 text-[8px] tracking-[0.25em] uppercase">Vehicle Support</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-gray-300 hover:text-white font-semibold text-sm transition-colors">Sign In</Link>
              <Link
                to="/auth"
                className="bg-red-600 hover:bg-red-500 text-white font-black text-sm px-6 py-2.5 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* ── MAIN CONTENT AREA ── */}
          <div className="relative flex-1 flex items-center justify-center">

            {/* LEFT SERVICE CARDS */}
            <div className="absolute left-6 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
              {SERVICES.filter(s => s.side === 'left').map((svc, i) => {
                const globalIdx = SERVICES.indexOf(svc);
                const isRevealed = revealCount > globalIdx;
                const isActive = activeService === globalIdx;
                return (
                  <div
                    key={svc.id}
                    className="transition-all duration-700"
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateX(0)' : 'translateX(-60px)',
                    }}
                  >
                    <div
                      className="relative group w-56 md:w-64 rounded-2xl p-4 border cursor-default overflow-hidden"
                      style={{
                        background: isActive ? `linear-gradient(135deg, ${svc.color}22, #000)` : 'rgba(255,255,255,0.03)',
                        borderColor: isActive ? svc.color : 'rgba(255,255,255,0.08)',
                        boxShadow: isActive ? `0 0 30px ${svc.glow}` : 'none',
                        transition: 'all 0.5s ease',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{svc.icon}</span>
                        <div>
                          <p className="font-black text-sm text-white">{svc.title}</p>
                          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: svc.color }}>{svc.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{svc.desc}</p>

                      {/* Active indicator bar */}
                      <div
                        className="absolute bottom-0 left-0 h-0.5 transition-all duration-700 rounded-full"
                        style={{ width: isActive ? '100%' : '0%', background: svc.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT SERVICE CARDS */}
            <div className="absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
              {SERVICES.filter(s => s.side === 'right').map((svc) => {
                const globalIdx = SERVICES.indexOf(svc);
                const isRevealed = revealCount > globalIdx;
                const isActive = activeService === globalIdx;
                return (
                  <div
                    key={svc.id}
                    className="transition-all duration-700"
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateX(0)' : 'translateX(60px)',
                    }}
                  >
                    <div
                      className="relative group w-56 md:w-64 rounded-2xl p-4 border cursor-default overflow-hidden text-right"
                      style={{
                        background: isActive ? `linear-gradient(225deg, ${svc.color}22, #000)` : 'rgba(255,255,255,0.03)',
                        borderColor: isActive ? svc.color : 'rgba(255,255,255,0.08)',
                        boxShadow: isActive ? `0 0 30px ${svc.glow}` : 'none',
                        transition: 'all 0.5s ease',
                      }}
                    >
                      <div className="flex items-center justify-end gap-3 mb-2">
                        <div>
                          <p className="font-black text-sm text-white">{svc.title}</p>
                          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: svc.color }}>{svc.subtitle}</p>
                        </div>
                        <span className="text-3xl">{svc.icon}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{svc.desc}</p>

                      <div
                        className="absolute bottom-0 right-0 h-0.5 transition-all duration-700 rounded-full"
                        style={{ width: isActive ? '100%' : '0%', background: svc.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── HERO TEXT (before scroll) ── */}
            <div
              className="absolute top-0 left-0 right-0 flex flex-col items-center pt-8 z-10 pointer-events-none transition-all duration-700"
              style={{ opacity: scrollProgress < 0.05 ? 1 : Math.max(0, 1 - scrollProgress * 20) }}
            >
              <div
                className="transition-all duration-1000"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                }}
              >
                <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold px-5 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  Bangladesh's #1 Vehicle Platform
                </div>
                <h1 className="text-center text-6xl md:text-8xl lg:text-[100px] font-black leading-none tracking-tight">
                  <span className="block text-white">MECHIFY</span>
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(90deg, #dc2626, #f97316, #dc2626)', backgroundSize: '200% auto', animation: 'gradientShift 3s linear infinite' }}
                  >
                    DRIVES YOU.
                  </span>
                </h1>
                <p className="text-center text-gray-400 text-lg mt-4">Scroll to explore our services ↓</p>
              </div>
            </div>

            {/* ── LAMBORGHINI CAR ── */}
            <div
              className="relative z-10 w-[60vw] md:w-[55vw] max-w-4xl select-none pointer-events-none"
              style={{
                transform: `translateX(${carX}%) rotate(${carRotate}deg) scale(${carScale})`,
                transition: 'transform 0.1s linear',
                filter: `drop-shadow(0 30px 60px ${glowColor})`,
              }}
            >
              <img
                src="/lamborghini.jpg"
                alt="Lamborghini Huracán"
                className="w-full object-contain"
                style={{ mixBlendMode: 'screen' }}
                draggable={false}
              />

              {/* Ground reflection */}
              <div
                className="absolute bottom-0 left-[10%] right-[10%] h-8 rounded-[50%] blur-xl"
                style={{ background: glowColor, opacity: 0.5 }}
              />
            </div>

            {/* ── ACTIVE SERVICE NAME (center bottom) ── */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-all duration-500"
              style={{ opacity: scrollProgress > 0.05 ? 1 : 0 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">Now Showing</p>
              <h2
                className="text-3xl md:text-4xl font-black transition-all duration-500"
                style={{ color: currentSvc?.color || '#fff' }}
              >
                {currentSvc?.title}
              </h2>
              {/* Progress dots */}
              <div className="flex gap-2 justify-center mt-3">
                {SERVICES.map((s, i) => (
                  <div
                    key={s.id}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: activeService === i ? '24px' : '8px',
                      background: activeService >= i ? s.color : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Scroll progress bar on the right edge */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-48 w-1 bg-white/5 rounded-full overflow-hidden z-30">
              <div
                className="w-full bg-gradient-to-b from-red-500 to-orange-400 rounded-full transition-all duration-300"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 2 — STATS
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Happy Customers', value: '12,000+' },
            { label: 'Services', value: '6' },
            { label: 'Cities Covered', value: '24+' },
            { label: 'Avg. ETA', value: '12 min' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-red-500 mb-2">{value}</div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-3">Simple Process</p>
            <h2 className="text-5xl md:text-6xl font-black">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Create Account', desc: 'Sign up in seconds with your email.' },
              { num: '02', title: 'Pick a Service', desc: 'Choose from 6 premium vehicle services.' },
              { num: '03', title: 'Book Instantly', desc: 'Confirm in seconds, no wait time.' },
              { num: '04', title: 'Track Live', desc: 'Follow your service on a live map.' },
            ].map((step, i) => (
              <div key={step.num} className="group text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-900/50 to-black border border-red-700/40 rounded-3xl flex items-center justify-center text-4xl font-black text-red-400 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-xl font-black mb-2 group-hover:text-red-400 transition-colors">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="py-36 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-900/20 rounded-full blur-[150px]" />
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
        @keyframes gradientShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

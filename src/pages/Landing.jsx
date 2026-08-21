import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🏎️',
    title: 'Car Rental',
    desc: 'Rent premium luxury & performance cars for any occasion. Instant booking, flexible returns.',
    color: 'from-red-900/60 to-red-950/80',
    border: 'border-red-700/40',
    glow: 'hover:shadow-[0_0_40px_rgba(220,38,38,0.35)]',
  },
  {
    icon: '👨‍✈️',
    title: 'Hire a Driver',
    desc: 'Professional, vetted chauffeurs available 24/7 for airport, events, or hourly bookings.',
    color: 'from-orange-900/60 to-orange-950/80',
    border: 'border-orange-700/40',
    glow: 'hover:shadow-[0_0_40px_rgba(251,146,60,0.35)]',
  },
  {
    icon: '🔧',
    title: 'Workshop Service',
    desc: 'Certified mechanics at our workshops for full diagnostics, servicing, and repairs.',
    color: 'from-yellow-900/60 to-yellow-950/80',
    border: 'border-yellow-700/40',
    glow: 'hover:shadow-[0_0_40px_rgba(250,204,21,0.25)]',
  },
  {
    icon: '⛽',
    title: 'Emergency Fuel',
    desc: 'Ran out of fuel? Our team rushes to your GPS location in minutes. Real-time tracking included.',
    color: 'from-blue-900/60 to-blue-950/80',
    border: 'border-blue-700/40',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]',
  },
  {
    icon: '🚗',
    title: 'Emergency Mechanic',
    desc: 'Broken down on the road? Our mechanics come to you — any location, day or night.',
    color: 'from-purple-900/60 to-purple-950/80',
    border: 'border-purple-700/40',
    glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]',
  },
  {
    icon: '🔩',
    title: 'Spare Parts Store',
    desc: '450+ premium spare parts for all vehicle makes. Browse by category, check availability instantly.',
    color: 'from-green-900/60 to-green-950/80',
    border: 'border-green-700/40',
    glow: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]',
  },
];

const steps = [
  { num: '01', title: 'Create Your Account', desc: 'Sign up in seconds with just your email and password.' },
  { num: '02', title: 'Choose a Service', desc: 'Pick from our wide range of vehicle support services on the home page.' },
  { num: '03', title: 'Book Instantly', desc: 'Fill in your details, select date/time or location, and confirm.' },
  { num: '04', title: 'Track in Real Time', desc: 'Watch your service provider arrive live on the map in your dashboard.' },
];

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 80);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Landing() {
  const [visible, setVisible] = useState({});
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }));
      });
    }, { threshold: 0.1 });
    Object.values(sectionsRef.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionRef = (id) => (el) => { sectionsRef.current[id] = el; };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden font-outfit">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Animated background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-900/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-800/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-orange-900/15 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 text-sm font-bold px-5 py-2 rounded-full mb-8 animate-fadeIn tracking-widest uppercase">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Bangladesh's #1 Vehicle Support Platform
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-9xl font-black leading-none mb-6 tracking-tight">
            <span className="block text-white">Everything</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-600 animate-gradient">Your Car</span>
            <span className="block text-white">Needs.</span>
          </h1>

          <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            From emergency fuel delivery to luxury car rentals — Mechify puts every vehicle service at your fingertips, 24/7.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/auth"
              className="group relative bg-red-600 hover:bg-red-500 text-white font-black text-lg px-12 py-5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.7)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Get Started — It's Free
            </Link>
            <Link
              to="/auth"
              className="group bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              Sign In →
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest animate-bounce" style={{ animationDuration: '2s' }}>
          <span>Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        ref={sectionRef('stats')}
        data-id="stats"
        className={`py-20 px-6 border-y border-white/5 bg-white/[0.02] transition-all duration-1000 ${visible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Happy Customers', value: 12000, suffix: '+' },
            { label: 'Services Available', value: 6, suffix: '' },
            { label: 'Cities Covered', value: 24, suffix: '+' },
            { label: 'Avg. ETA (mins)', value: 12, suffix: '' },
          ].map(({ label, value, suffix }) => (
            <div key={label} className="group">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-red-400 mb-2">
                {visible.stats && <AnimatedCounter target={value} suffix={suffix} />}
              </div>
              <p className="text-gray-400 font-semibold text-sm uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        ref={sectionRef('how')}
        data-id="how"
        className={`py-28 px-6 md:px-12 lg:px-20 transition-all duration-1000 delay-200 ${visible.how ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">Simple Process</p>
            <h2 className="text-5xl md:text-6xl font-black">How Mechify Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-14 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative group text-center"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-red-900/60 to-black border border-red-700/50 rounded-3xl flex items-center justify-center text-5xl font-black text-red-400 group-hover:scale-110 group-hover:border-red-500 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:text-red-400 transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        ref={sectionRef('services')}
        data-id="services"
        className={`py-28 px-6 md:px-12 lg:px-20 bg-white/[0.02] border-y border-white/5 transition-all duration-1000 delay-100 ${visible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">What We Offer</p>
            <h2 className="text-5xl md:text-6xl font-black mb-4">Our Services</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Everything your vehicle needs under one roof, available day and night.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className={`group relative bg-gradient-to-br ${svc.color} border ${svc.border} rounded-3xl p-8 cursor-default transition-all duration-500 hover:-translate-y-3 ${svc.glow} hover:border-opacity-80`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300 block">{svc.icon}</div>
                <h3 className="text-2xl font-black mb-3 group-hover:text-white">{svc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{svc.desc}</p>
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        ref={sectionRef('cta')}
        data-id="cta"
        className={`py-36 px-6 text-center relative overflow-hidden transition-all duration-1000 delay-200 ${visible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/20 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            Ready to get<br /><span className="text-red-500">started?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-12">Join thousands of drivers who trust Mechify for all their vehicle needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="group relative bg-red-600 hover:bg-red-500 text-white font-black text-xl px-14 py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:shadow-[0_0_70px_rgba(220,38,38,0.7)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Sign Up or Sign In Today →
            </Link>
          </div>
          <p className="text-gray-600 text-sm mt-6">No credit card required · Free to join</p>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imgHeroCar from '../assets/hero_car.jpg';

const stats = [
  { icon: '⚡', label: '24/7 Emergency Service', value: 'Always On' },
  { icon: '🕐', label: 'Response Time', value: '< 15 min' },
  { icon: '💰', label: 'Pricing', value: 'Affordable' },
  { icon: '🛡️', label: 'Verified Mechanics', value: '500+' },
];

// 7 uniform service cards — all with icon + image + description
const allServices = [
  {
    name: 'Home Service',
    icon: '🔧',
    desc: 'Certified mechanics come to your doorstep for routine maintenance and repairs.',
    img: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=400&fit=crop',
    link: '/workshop',
    badge: 'Most Popular',
  },
  {
    name: 'Emergency Assistance',
    icon: '🚨',
    desc: '24/7 roadside breakdown support, wherever you are on the road.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    link: '/services',
    badge: '24/7',
  },
  {
    name: 'Spare Parts Store',
    icon: '⚙️',
    desc: 'Browse and order genuine spare parts with fast doorstep delivery.',
    img: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop',
    link: '/services',
    badge: null,
  },
  {
    name: 'Workshop Repair',
    icon: '🏭',
    desc: 'Book appointments at verified partner workshops for full repairs and upgrades.',
    img: 'https://images.unsplash.com/photo-1504222490345-c075b7c75e31?w=600&h=400&fit=crop',
    link: '/workshop',
    badge: null,
  },
  {
    name: 'Fuel Delivery',
    icon: '⛽',
    desc: 'Ran out of fuel? Get it delivered to your exact location within minutes.',
    img: 'https://images.unsplash.com/photo-1545012820-8f24ce54d4f5?w=600&h=400&fit=crop',
    link: '/services',
    badge: 'Fast',
  },
  {
    name: 'Driver Hire',
    icon: '👨‍✈️',
    desc: 'Hire verified professional drivers for personal, business or long-distance trips.',
    img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop',
    link: '/idriver',
    badge: null,
  },
  {
    name: 'Car Rental',
    icon: '🚗',
    desc: 'Rent premium exotic vehicles for any duration with flexible, transparent plans.',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop',
    link: '/car-rental',
    badge: 'New',
  },
];

export default function Home() {
  const [visible, setVisible] = useState({});
  const [sosActive, setSosActive] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSOS = () => {
    setSosActive(true);
    alert(
      '🚨 SOS Emergency Activated!\nMechify Emergency Response Team notified.\nETA: 12 minutes. Stay calm, help is coming!'
    );
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit overflow-hidden">

      {/* ════════════════════════════════════════
          HERO SECTION — 2-column layout
          Left: text  |  Right: image
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(220,38,38,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Bottom fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)]">

            {/* LEFT — Text Block */}
            <div className="flex flex-col justify-center animate-slideInLeft">
              {/* Badge */}
              <div className="inline-flex self-start items-center gap-2 bg-red-600/20 border border-red-600/40 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm font-semibold tracking-wide">
                  Bangladesh's #1 Vehicle Support Platform
                </span>
              </div>

              {/* Main Tagline */}
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] mb-5">
                We are reliable
                <br />
                <span className="text-red-500 animate-glowPulse">Anytime,</span>
                <br />
                <span className="text-white">Anywhere.</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                From roadside emergencies to exotic car rentals — Mechify connects you to
                trusted mechanics, drivers, and vehicle services in minutes.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {stats.map((stat, i) => (
                  <div key={i} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <div className="text-white font-bold text-sm leading-tight">{stat.value}</div>
                      <div className="text-gray-400 text-xs">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services"
                  id="roadside-btn"
                  className="btn-red-glow px-7 py-4 text-base font-bold flex items-center gap-2 hover:-translate-y-1 transition-transform"
                >
                  🚨 Roadside Assistance
                </Link>
                <Link
                  to="/services"
                  id="fuel-btn"
                  className="border-2 border-white/30 text-white rounded-full px-7 py-4 text-base font-bold flex items-center gap-2 hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300"
                >
                  ⛽ Fuel Service
                </Link>
              </div>
            </div>

            {/* RIGHT — Image with animated glow + floating effect */}
            <div className="flex items-center justify-center animate-slideInRight">
              <div className="relative w-full max-w-[560px]">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-600/30 via-transparent to-red-900/20 blur-2xl scale-110 pointer-events-none" />

                {/* Image container — animate-float for gentle bob */}
                <div className="relative animate-float">
                  {/* Decorative ring */}
                  <div className="absolute -inset-3 rounded-3xl border border-red-600/20" />
                  <div className="absolute -inset-6 rounded-3xl border border-red-600/10" />

                  {/* Main image */}
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(220,38,38,0.35)]">
                    <img
                      src={imgHeroCar}
                      alt="Mechify hero car"
                      className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImgLoaded(true)}
                    />
                    {/* Overlay gradient — bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating status badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-5 py-2 flex items-center gap-2 border border-red-600/30 shadow-lg whitespace-nowrap">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-white">Live Support Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER STRIP ── */}
      <div className="bg-red-600 py-3 overflow-hidden border-y border-red-500">
        <div
          className="flex animate-marquee whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {Array(8)
            .fill([
              '⚡ 24/7 Emergency',
              '🚗 Car Rental',
              '⛽ Fuel Delivery',
              '🔧 Home Service',
              '🏭 Workshop',
              '👨‍✈️ Driver Hire',
              '🛡️ Verified Pros',
              '📍 Track in Real-time',
            ])
            .flat()
            .map((item, i) => (
              <span key={i} className="text-white font-bold text-sm mx-8">
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          SERVICES SECTION — Uniform 3-column grid
          All 7 cards identical size (aspect-[4/3])
      ════════════════════════════════════════ */}
      <section
        className="py-24 px-6 md:px-12 lg:px-20"
        id="services-section"
        data-animate
      >
        {/* Section Header */}
        <div
          className={`text-center mb-14 ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        >
          <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">
            What We Offer
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mt-2">Our Services</h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
            Every vehicle need covered — from emergencies to everyday maintenance.
          </p>
        </div>

        {/* Uniform 3-column grid — all cards identical dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {allServices.map((service, i) => (
            <Link
              to={service.link}
              key={i}
              id={`service-card-${i}`}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer flex flex-col aspect-[4/3] ${
                visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Background image */}
              <img
                src={service.img}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark gradient overlay — always visible at bottom, deepens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 group-hover:via-black/70 transition-all duration-500" />

              {/* Badge (top-left) */}
              {service.badge && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {service.badge}
                </div>
              )}

              {/* Card content — anchored to bottom */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                {/* Icon bubble */}
                <div className="mb-3 w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600/60">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-white mb-1 leading-tight">
                  {service.name}
                </h3>

                {/* Description — slides up on hover */}
                <p className="text-gray-300 text-xs leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-400 overflow-hidden">
                  {service.desc}
                </p>

                {/* CTA arrow */}
                <div className="flex items-center gap-1 text-red-400 text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Explore <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          WORKSHOP SECTION
      ════════════════════════════════════════ */}
      <section
        className="py-24 px-6 md:px-12 lg:px-20 bg-[#050505]"
        id="workshop-section"
        data-animate
      >
        <div
          className={`flex flex-col lg:flex-row items-center gap-16 max-w-[1400px] mx-auto ${
            visible['workshop-section'] ? 'animate-fadeInUp' : 'opacity-0'
          }`}
        >
          {/* Left Text */}
          <div className="w-full lg:w-1/2">
            <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">
              Expert Care
            </span>
            <h2 className="text-5xl md:text-6xl font-black mt-2 mb-6 leading-tight">
              Book a <span className="text-red-500">Workshop</span>
              <br />
              Appointment
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Schedule inspections, upgrades, or full repairs at one of our verified partner
              workshops across Dhaka. Fast booking, transparent pricing, expert technicians.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: '🔍', title: 'Full Inspection', desc: 'Complete vehicle diagnostics and health check' },
                { icon: '⚡', title: 'Performance Upgrades', desc: 'Boost horsepower, handling, and aesthetics' },
                { icon: '🛡️', title: 'Certified Mechanics', desc: '500+ verified and rated professionals' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 glass rounded-xl p-4">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-bold text-white">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/workshop" className="btn-red-glow inline-flex items-center gap-2 px-8 py-4 text-lg font-bold">
              Find Nearest Workshop →
            </Link>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            {[
              { area: 'Mirpur', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
              { area: 'Banani', img: 'https://images.unsplash.com/photo-1504222490345-c075b7c75e31?w=400&h=300&fit=crop' },
              { area: 'Badda', img: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop' },
              { area: 'Motijheel', img: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&h=300&fit=crop' },
            ].map((ws, i) => (
              <Link to="/workshop" key={i} className="relative rounded-xl overflow-hidden group aspect-[4/3] cursor-pointer">
                <img
                  src={ws.img}
                  alt={ws.area}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 font-bold text-white text-sm">{ws.area}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOATING SOS BUTTON ── */}
      <button
        id="floating-sos"
        onClick={handleSOS}
        className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 rounded-full font-black text-white text-sm tracking-widest transition-all duration-300 ${
          sosActive ? 'bg-red-900 scale-90' : 'bg-red-600 hover:scale-110'
        } animate-sosPulse sos-ring shadow-[0_0_30px_rgba(220,38,38,0.6)]`}
        title="SOS Emergency"
      >
        SOS
      </button>
    </div>
  );
}

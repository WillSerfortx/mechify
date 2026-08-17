import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import imgHero from '../assets/hero_speedometer.jpg';
import imgBugatti from '../assets/car_bugatti.jpg';
import imgMclaren from '../assets/car_mclaren.jpg';
import imgMercedes from '../assets/car_mercedes.jpg';
import imgRollsroyce from '../assets/car_rollsroyce.jpg';

const cars = [
  { name: 'Bugatti Chiron', model: '2023', speed: '304 mph', engine: '1500 hp', trans: 'DCT 7-speed', img: imgBugatti, color: '#1a3a6e' },
  { name: 'McLaren 720S', model: '2022', speed: '212 mph', engine: '710 hp', trans: 'SSG 7-speed', img: imgMclaren, color: '#c45a00' },
  { name: 'Mercedes AMG GT', model: '2023', speed: '196 mph', engine: '577 hp', trans: 'AMG Speedshift', img: imgMercedes, color: '#1a1a1a' },
  { name: 'Rolls Royce Ghost', model: '2024', speed: '155 mph', engine: '563 hp', trans: 'ZF 8-speed', img: imgRollsroyce, color: '#3a3a3a' },
  // Duplicated for seamless loop
  { name: 'Bugatti Chiron', model: '2023', speed: '304 mph', engine: '1500 hp', trans: 'DCT 7-speed', img: imgBugatti, color: '#1a3a6e' },
  { name: 'McLaren 720S', model: '2022', speed: '212 mph', engine: '710 hp', trans: 'SSG 7-speed', img: imgMclaren, color: '#c45a00' },
  { name: 'Mercedes AMG GT', model: '2023', speed: '196 mph', engine: '577 hp', trans: 'AMG Speedshift', img: imgMercedes, color: '#1a1a1a' },
  { name: 'Rolls Royce Ghost', model: '2024', speed: '155 mph', engine: '563 hp', trans: 'ZF 8-speed', img: imgRollsroyce, color: '#3a3a3a' },
];

const stats = [
  { icon: '⚡', label: '24/7 Emergency Service', value: 'Always On' },
  { icon: '🕐', label: 'Response Time', value: '< 15 min' },
  { icon: '💰', label: 'Pricing', value: 'Affordable' },
  { icon: '🛡️', label: 'Verified Mechanics', value: '500+' },
];

const services = [
  { name: 'Home Service', icon: '🔧', desc: 'Mechanics come to you', img: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=400&fit=crop', link: '/workshop' },
  { name: 'Emergency Assistance', icon: '🚨', desc: '24/7 roadside support', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', link: '/services' },
  { name: 'Spare Parts Store', icon: '⚙️', desc: 'Genuine parts delivery', img: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop', link: '/services' },
];

const smallServices = [
  { name: 'Car Rental', icon: '🚗', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop', link: '/car-rental' },
  { name: 'Workshop', icon: '🏭', img: 'https://images.unsplash.com/photo-1504222490345-c075b7c75e31?w=400&h=250&fit=crop', link: '/workshop' },
  { name: 'Fuel Delivery', icon: '⛽', img: 'https://images.unsplash.com/photo-1545012820-8f24ce54d4f5?w=400&h=250&fit=crop', link: '/services' },
  { name: 'Driver Hire', icon: '👨‍✈️', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=250&fit=crop', link: '/idriver' },
];

export default function Home() {
  const [visible, setVisible] = useState({});
  const [sosActive, setSosActive] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSOS = () => {
    setSosActive(true);
    alert('🚨 SOS Emergency Activated!\nMechify Emergency Response Team notified.\nETA: 12 minutes. Stay calm, help is coming!');
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit overflow-hidden">

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={imgHero} alt="Hero" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Animated grid lines */}
        <div className="absolute inset-0 z-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="w-full lg:w-3/5 animate-slideInLeft">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm font-semibold tracking-wide">Bangladesh's #1 Vehicle Support Platform</span>
              </div>

              {/* Main Tagline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
                We are reliable
                <br />
                <span className="text-red-500 animate-glowPulse">Anytime,</span>
                <br />
                <span className="text-white">Anywhere.</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                From roadside emergencies to exotic car rentals — Mechify connects you to trusted mechanics, drivers, and vehicle services in minutes.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 mb-10">
                {stats.map((stat, i) => (
                  <div key={i} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <div className="text-white font-bold text-sm">{stat.value}</div>
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
                  className="btn-red-glow px-8 py-4 text-lg font-bold flex items-center gap-2 hover:-translate-y-1 transition-transform"
                >
                  🚨 Roadside Assistance
                </Link>
                <Link
                  to="/services"
                  id="fuel-btn"
                  className="border-2 border-white/40 text-white rounded-full px-8 py-4 text-lg font-bold flex items-center gap-2 hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300"
                >
                  ⛽ Fuel Service
                </Link>
              </div>
            </div>

            {/* Right — floating image */}
            <div className="w-full lg:w-2/5 animate-scaleIn animate-float">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(220,38,38,0.3)] border border-white/10">
                <img src={imgHero} alt="Mechify" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-float">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* ── TICKER STRIP ── */}
      <div className="bg-red-600 py-3 overflow-hidden border-y border-red-500">
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {Array(8).fill(['⚡ 24/7 Emergency', '🚗 Car Rental', '⛽ Fuel Delivery', '🔧 Home Service', '🏭 Workshop', '👨‍✈️ Driver Hire', '🛡️ Verified Pros', '📍 Track in Real-time']).flat().map((item, i) => (
            <span key={i} className="text-white font-bold text-sm mx-8">{item}</span>
          ))}
        </div>
      </div>

      {/* ── SERVICES SECTION ── */}
      <section className="py-24 px-6 md:px-12 lg:px-20" id="services-section" data-animate>
        <div className={`text-center mb-16 ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">What We Offer</span>
          <h2 className="text-5xl md:text-7xl font-black mt-2">Our Services</h2>
        </div>

        {/* Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {services.map((service, i) => (
            <Link
              to={service.link}
              key={i}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3] ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <img src={service.img} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/60 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-4xl mb-3">{service.icon}</span>
                <h3 className="text-2xl font-bold text-white mb-1">{service.name}</h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">{service.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-red-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span>Learn More</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Small Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {smallServices.map((service, i) => (
            <Link
              to={service.link}
              key={i}
              className={`relative rounded-xl overflow-hidden group cursor-pointer aspect-video ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${(i + 3) * 0.1}s` }}
            >
              <img src={service.img} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="text-2xl">{service.icon}</span>
                <h3 className="text-white font-bold text-base">{service.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CAR RENTAL SHOWROOM ── */}
      <section className="py-24 bg-[#050505]" id="cars-section" data-animate>
        <div className={`px-6 md:px-12 lg:px-20 mb-12 ${visible['cars-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">Exotic Fleet</span>
          <div className="flex items-end justify-between mt-2">
            <h2 className="text-5xl md:text-7xl font-black">Rent a Car</h2>
            <Link to="/car-rental" className="hidden md:flex items-center gap-2 text-red-400 font-semibold hover:text-red-300 transition-colors">
              View All <span>→</span>
            </Link>
          </div>
          <p className="text-gray-400 mt-3 text-lg max-w-xl">Experience world-class exotic vehicles. Choose your dream car and hit the road.</p>
        </div>

        {/* Auto-Scrolling Carousel */}
        <div className="relative overflow-hidden" ref={carouselRef}>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-autoScroll" style={{ width: 'max-content', padding: '8px 24px' }}>
            {cars.map((car, i) => (
              <Link
                to="/car-rental"
                key={i}
                className="flex-shrink-0 w-[320px] md:w-[380px] bg-white rounded-2xl overflow-hidden group hover:-translate-y-3 transition-all duration-400 shadow-xl hover:shadow-[0_20px_60px_rgba(220,38,38,0.25)]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <h3 className="text-gray-900 font-black text-xl mb-3">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 font-semibold">
                    <span className="bg-gray-100 rounded-lg px-3 py-2">📅 {car.model}</span>
                    <span className="bg-gray-100 rounded-lg px-3 py-2">💨 {car.speed}</span>
                    <span className="bg-gray-100 rounded-lg px-3 py-2">🏎️ {car.engine}</span>
                    <span className="bg-gray-100 rounded-lg px-3 py-2">⚙️ {car.trans}</span>
                  </div>
                  <div className="mt-4 w-full bg-red-600 text-white text-center rounded-xl py-2.5 font-bold text-sm group-hover:bg-red-700 transition-colors">
                    Book Now →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKSHOP SECTION ── */}
      <section className="py-24 px-6 md:px-12 lg:px-20" id="workshop-section" data-animate>
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${visible['workshop-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
          {/* Left Text */}
          <div className="w-full lg:w-1/2">
            <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">Expert Care</span>
            <h2 className="text-5xl md:text-6xl font-black mt-2 mb-6 leading-tight">
              Book a <span className="text-red-500">Workshop</span><br />Appointment
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Schedule inspections, upgrades, or full repairs at one of our verified partner workshops across Dhaka. Fast booking, transparent pricing, expert technicians.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: '🔍', title: 'Full Inspection', desc: 'Complete vehicle diagnostics and health check' },
                { icon: '⚡', title: 'Performance Upgrades', desc: 'Boost horsepower, handling, and aesthetics' },
                { icon: '🛡️', title: 'Certified Mechanics', desc: '500+ verified and rated professionals' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 glass rounded-xl p-4">
                  <span className="text-3xl">{item.icon}</span>
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
                <img src={ws.img} alt={ws.area} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 font-bold text-white">{ws.area}</div>
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

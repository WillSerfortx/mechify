import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ── Hero background image (mechanic at car)
const heroBg = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&h=1080&fit=crop&q=80';

// ── Service card images
const serviceImages = {
  homeService:    'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=400&fit=crop',
  emergency:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  spareParts:     'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop',
  carRental:      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop',
  workshop:       'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=250&fit=crop',
  fuelDelivery:   'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=250&fit=crop',
  driverHire:     'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=250&fit=crop',
};

// ── Car For Rents data (matches Figma)
const rentCars = [
  { name: 'McLaren',    model: '2020', speed: '212mph', auto: '7-speed', engine: '710hp', img: 'https://images.unsplash.com/photo-1558981852-426c373d4a83?w=400&h=240&fit=crop' },
  { name: 'Lamborghini',model: '2021', speed: '218mph', auto: '7-speed', engine: '631hp', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=240&fit=crop' },
  { name: 'Bugatti',    model: '2022', speed: '304mph', auto: '7-speed', engine: '1500hp',img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=240&fit=crop' },
  { name: 'Mercedes',   model: '2023', speed: '190mph', auto: '9-speed', engine: '577hp', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=240&fit=crop' },
  { name: 'Rolls Royce',model: '2023', speed: '155mph', auto: '8-speed', engine: '563hp', img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=240&fit=crop' },
  { name: 'La Ferrari', model: '2017', speed: '211mph', auto: '7-speed', engine: '963hp', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=240&fit=crop' },
];

export default function Home() {
  const [visible, setVisible] = useState({});
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(p => ({ ...p, [e.target.id]: true }));
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSOS = () => {
    setSosActive(true);
    alert('🚨 SOS Emergency Activated!\nMechify Emergency Response Team notified.\nETA: 12 minutes. Stay calm!');
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO — Full-bleed video background, right-aligned text
          Matches Figma Desktop-16
      ══════════════════════════════════════════ */}
      <section className="relative h-[75vh] min-h-[600px] flex flex-col justify-center overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 bg-black overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 scale-[1.35]">
            <source src="/hero-car.mp4" type="video/mp4" />
          </video>
          {/* Dark gradient overlay — right heavy for text readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-8 md:px-16 lg:px-24 pt-28 pb-16 w-full max-w-[1600px] mx-auto flex flex-col items-end text-right lg:pr-[10%]">
          {/* Main tagline */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-tight mb-6 max-w-4xl animate-slideInRight">
            We are reliable<br />
            Anytime,<span className="text-red-500">Anywhere</span>
          </h1>

          {/* Sub-claims row */}
          <div className="flex flex-wrap justify-end gap-6 md:gap-12 mb-10 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, text: '24/7 Emergency Service' },
              { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'Quick response time' },
              { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'Affordable pricing' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white font-semibold text-base md:text-lg">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

            {/* CTA buttons — red pills matching Figma */}
            <div className="flex flex-wrap justify-end gap-6 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <Link
                to="/services"
                id="roadside-btn"
                className="bg-red-600 hover:bg-red-700 text-white font-black text-xl px-10 py-5 rounded-full whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
              >
                Roadside Assistance
              </Link>
              <Link
                to="/fuel-terms"
                id="fuel-btn"
                className="bg-red-600 hover:bg-red-700 text-white font-black text-xl px-10 py-5 rounded-full whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
              >
                Fuel Service
              </Link>
            </div>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE BAR
      ══════════════════════════════════════════ */}
      <div className="bg-red-600 text-white py-2 overflow-hidden flex whitespace-nowrap text-sm font-bold tracking-widest border-y border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] relative z-20">
        <div className="flex animate-marquee gap-12">
          {/* Duplicate contents to make the scroll seamless */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="flex items-center gap-2">24/7 EMERGENCY SERVICE</span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +8801516520602
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                SUPPORT@MECHIFY.COM
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SERVICES SECTION
          3 large + 4 small — matches Figma Desktop-16
      ══════════════════════════════════════════ */}
      <section className="pt-20 pb-32 px-6 md:px-12 lg:px-20 bg-black flex flex-col items-center mb-16" id="services-section" data-animate>
        {/* Heading */}
        <div className={`text-center mb-6 ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-7xl font-black text-white">Services</h2>
        </div>

        {/* Down arrow */}
        <div className={`flex justify-center mb-10 ${visible['services-section'] ? 'animate-float' : 'opacity-0'}`}>
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* 3 Large service cards */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-4 w-full max-w-[1400px]">
          {[
            { name: 'Home Service',         icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, img: serviceImages.homeService,  link: '/workshop',  badge: null },
            { name: 'Emergency Assistance', icon: <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>, img: serviceImages.emergency,    link: '/services',  badge: 'Emergency' },
            { name: 'Spare Parts Store',    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, img: serviceImages.spareParts,   link: '/spare-parts',  badge: null },
          ].map((s, i) => (
            <Link
              key={i}
              to={s.link}
              id={`large-service-${i}`}
              className={`flex-none w-full md:w-[calc(33.333%-1rem)] max-w-[450px] relative rounded-2xl overflow-hidden group aspect-[4/3] cursor-pointer block ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <img src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
              {/* Icon badge top-left */}
              <div className="absolute top-4 left-4 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/30">
                {s.icon}
              </div>
              {/* Emergency badge */}
              {s.badge && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                  {s.badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-black text-white mb-1">{s.name}</h3>
                <p className="text-red-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn more →</p>
              </div>
            </Link>
          ))}
        </div>

        {/* 4 Small service cards */}
        <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-[1400px]">
          {[
            { name: 'Car Rental',    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m8-1v1m-1-4V8a2 2 0 00-2-2H9a2 2 0 00-2 2v3" /></svg>, img: serviceImages.carRental,    link: '/car-rental' },
            { name: 'Workshop',      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, img: serviceImages.workshop,     link: '/workshop' },
            { name: 'Fuel Delivery', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, img: serviceImages.fuelDelivery, link: '/fuel-terms', badge: 'Emergency' },
            { name: 'Driver Hire',   icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, img: serviceImages.driverHire,  link: '/idriver' },
          ].map((s, i) => (
            <Link
              key={i}
              to={s.link}
              id={`small-service-${i}`}
              className={`flex-none w-[calc(50%-0.5rem)] lg:w-[calc(25%-1rem)] max-w-[320px] relative rounded-2xl overflow-hidden group aspect-video cursor-pointer block ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${(i + 3) * 0.1}s` }}
            >
              <img src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              {/* Emergency badge */}
              {s.badge && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  {s.badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-2">
                <span className="text-xl">{s.icon}</span>
                <h3 className="text-white font-bold text-sm">{s.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAR FOR RENTS — Matches Figma
          White cards with car image + specs
      ══════════════════════════════════════════ */}
      <section className="py-16 overflow-hidden" id="cars-section" data-animate>
        {/* Curved top edge (ellipse effect from Figma) */}
        <div className="relative bg-black pb-4">
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[110vw] h-40 bg-black rounded-b-[50%]"
            style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}
          />
          <div className={`relative z-10 text-center py-8 ${visible['cars-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {/* Down arrow */}
            <div className="flex justify-center mb-4 animate-float">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white">Car For Rents</h2>
          </div>
        </div>

        {/* Continuous Horizontal Scroll Carousel */}
        <div className={`relative flex overflow-hidden group ${visible['cars-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="flex gap-6 animate-marquee min-w-max hover:[animation-play-state:paused] pb-6 px-3">
            {/* Double the array for infinite loop effect */}
            {[...rentCars, ...rentCars].map((car, i) => (
              <Link
                to="/car-rental"
                key={i}
                className="flex-shrink-0 w-64 md:w-72 bg-white rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] group/card"
              >
                {/* Car image */}
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                </div>
                {/* Details */}
                <div className="p-4">
                  <h3 className="text-gray-900 font-black text-xl mb-3 text-center">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600 font-semibold">
                    <span className="bg-gray-100 rounded-lg px-2 py-1.5">Model: {car.model}</span>
                    <span className="bg-gray-100 rounded-lg px-2 py-1.5">Speed: {car.speed}</span>
                    <span className="bg-gray-100 rounded-lg px-2 py-1.5">Auto: {car.auto}</span>
                    <span className="bg-gray-100 rounded-lg px-2 py-1.5">Engine: {car.engine}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Floating SOS */}
      <button
        id="floating-sos"
        onClick={handleSOS}
        className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 rounded-full font-black text-white text-sm tracking-widest transition-all duration-300 animate-sosPulse sos-ring shadow-[0_0_30px_rgba(220,38,38,0.6)] ${
          sosActive ? 'bg-red-900 scale-90' : 'bg-red-600 hover:scale-110'
        }`}
        title="SOS Emergency"
      >
        SOS
      </button>
    </div>
  );
}

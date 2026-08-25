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
  { name: 'McLaren',    model: '2023', speed: '212mph', auto: '7-speed', engine: '710hp', img: '/custom-mclaren.png' },
  { name: 'Lamborghini',model: '2023', speed: '218mph', auto: '7-speed', engine: '631hp', img: '/custom-lamborghini.jpg' },
  { name: 'Bugatti',    model: '2023', speed: '304mph', auto: '7-speed', engine: '1500hp',img: '/custom-bugatti.png' },
  { name: 'Mercedes',   model: '2023', speed: '190mph', auto: '9-speed', engine: '577hp', img: '/custom-mercedes.png' },
  { name: 'Rolls Royce',model: '2023', speed: '155mph', auto: '8-speed', engine: '563hp', img: '/custom-rolls-royce.png' },
  { name: 'Ferrari',    model: '2023', speed: '211mph', auto: '7-speed', engine: '963hp', img: '/custom-ferrari.jpg' },
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
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 bg-black">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
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
              { icon: '⚡', text: '24/7 Emergency Service' },
              { icon: '🕐', text: 'Quick response time' },
              { icon: '💰', text: 'Affordable pricing' },
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
              <span className="flex items-center gap-2">⭐ 24/7 EMERGENCY SERVICE</span>
              <span className="flex items-center gap-2">📞 +8801516520602</span>
              <span className="flex items-center gap-2">✉️ SUPPORT@MECHIFY.COM</span>
            </div>
          ))}
        </div>
      </div>

      {/* GUARANTEED CLEAR GAP UNDER RED BANNER */}
      <div className="w-full h-[150px] md:h-[200px] bg-transparent flex items-center justify-center">
        <h2 className={`text-5xl md:text-7xl font-black text-white text-center ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>Emergency Services</h2>
      </div>

      {/* ══════════════════════════════════════════
          SERVICES SECTION
          3 large + 4 small — matches Figma Desktop-16
      ══════════════════════════════════════════ */}
      <section className="pt-10 pb-16 px-6 md:px-12 lg:px-20 bg-black flex flex-col items-center" id="services-section" data-animate>

        {/* Down arrow */}
        <div className={`flex justify-center mb-20 ${visible['services-section'] ? 'animate-float' : 'opacity-0'}`}>
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 w-full max-w-[1800px] mx-auto">
          {[
            { name: 'Roadside Assistance',  icon: 'tow', img: serviceImages.emergency, link: '/services',  badge: null, desc: 'Instant emergency support with live location tracking and towing if required.' },
            { name: 'Fuel Delivery',        icon: 'gas', img: serviceImages.fuelDelivery, link: '/fuel-terms', badge: null, desc: 'Doorstep fuel delivery for emergencies or added convenience.' },
            { name: 'Emergency Workshops near me', icon: '🏭', img: serviceImages.workshop,     link: '/workshop',  badge: null },
          ].map((s, i) => (
            <Link
              key={i}
              to={s.link}
              id={`large-service-${i}`}
              className={`flex-none w-full md:w-[calc(33.333%-1.5rem)] max-w-[600px] relative rounded-[2rem] overflow-hidden group aspect-[4/3] cursor-pointer block ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {s.name === 'Roadside Assistance' ? (
                <div className="absolute inset-0 w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  {/* Image container */}
                  <div className="absolute top-0 left-0 right-0 h-full group-hover:h-[65%] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                  </div>
                  
                  {/* Large center icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300 gap-4">
                    <svg className="w-24 h-24 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" viewBox="0 0 640 512" fill="currentColor">
                      <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                    </svg>
                    <span className="text-4xl font-black text-red-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{WebkitTextStroke: '1px black', WebkitTextFillColor: '#ef4444'}}>Emergency</span>
                  </div>
                  
                  {/* Small top-left icon */}
                  <div className="absolute top-6 left-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-10 h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" viewBox="0 0 640 512" fill="currentColor">
                      <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                    </svg>
                  </div>

                  {/* White bottom info area */}
                  <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <h3 className="text-black font-bold text-3xl md:text-4xl mb-3">{s.name}</h3>
                    <p className="text-gray-500 text-base md:text-lg leading-snug font-light">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ) : s.name === 'Fuel Delivery' ? (
                <div className="absolute inset-0 w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  {/* Image container */}
                  <div className="absolute top-0 left-0 right-0 h-full group-hover:h-[65%] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                  </div>
                  
                  {/* Large bottom center text */}
                  <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-4xl font-black text-red-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{WebkitTextStroke: '1px black', WebkitTextFillColor: '#ef4444'}}>Emergency</span>
                  </div>
                  
                  {/* Small top-left icon (persistent in both states) */}
                  <div className="absolute top-6 left-6 pointer-events-none">
                    <svg className="w-10 h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8.5c11.8 0 20.6 11.6 17.5 23.2l-11.3 43.1L383 318c-9.1-34.9-3-72.1 16.7-101.4C417.8 190.2 443.3 176 470 176H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H470c-9.9 0-19.4 5.3-25.1 14.1c-13.6 20.9-17.7 46.5-11.4 70.8L448.9 416H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-11.6 0-22.3-6.2-28-16.4l-45.7-81.5c-5.7-10.2-5.7-22.7 0-32.9L320 336v64c0 61.9-50.1 112-112 112H96c-35.3 0-64-28.7-64-64V64zM256 128V64H96v64H256zM96 192v96H256V192H96z"/>
                    </svg>
                  </div>

                  {/* White bottom info area */}
                  <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <h3 className="text-black font-bold text-3xl md:text-4xl mb-3">{s.name}</h3>
                    <p className="text-gray-500 text-base md:text-lg leading-snug font-light">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <img src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                  {/* Icon badge top-left */}
                  <div className="absolute top-6 left-6 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl border border-white/30">
                    {s.icon}
                  </div>
                  {/* Emergency badge */}
                  {s.badge && (
                    <div className="absolute top-6 right-6 bg-yellow-400 text-black text-sm font-black px-4 py-2 rounded-full uppercase tracking-wide">
                      {s.badge}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-black text-white mb-2">{s.name}</h3>
                    <p className="text-red-400 text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn more →</p>
                  </div>
                </>
              )}
            </Link>
          ))}
        </div>

        {/* GUARANTEED CLEAR GAP UNDER EMERGENCY CARDS */}
        <div className="w-full h-[150px] md:h-[200px] bg-transparent flex items-center justify-center">
          <h2 className={`text-4xl md:text-6xl font-black text-white text-center ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>Other Services</h2>
        </div>

        {/* 4 Small service cards */}
        <div className="flex flex-wrap justify-center items-center gap-6 w-full max-w-[1800px] mx-auto">
          {[
            { name: 'Home Service',         icon: '🔧', img: serviceImages.homeService,  link: '/workshop', badge: null },
            { name: 'Marketplace',          icon: 'cart', img: serviceImages.spareParts, link: '/spare-parts', badge: null, desc: 'An online platform to browse, compare, and order vehicle parts with doorstep delivery.' },
            { name: 'Car Rental',           icon: '🚗', img: serviceImages.carRental,    link: '/car-rental', badge: null },
            { name: 'Driver Hire',          icon: '👨‍✈️', img: serviceImages.driverHire,  link: '/idriver', badge: null },
          ].map((s, i) => (
            <Link
              key={i}
              to={s.link}
              id={`small-service-${i}`}
              className={`flex-none w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[450px] relative rounded-[2rem] overflow-hidden group aspect-video cursor-pointer block ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${(i + 3) * 0.1}s` }}
            >
              {s.name === 'Marketplace' ? (
                <div className="absolute inset-0 w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  {/* Image container */}
                  <div className="absolute top-0 left-0 right-0 h-full group-hover:h-[65%] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                  </div>
                  
                  {/* Large center shopping cart */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                    <svg className="w-20 h-20 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  
                  {/* Small top-left shopping cart */}
                  <div className="absolute top-6 left-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>

                  {/* White bottom info area */}
                  <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-6 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <h3 className="text-black font-bold text-xl md:text-2xl mb-1">{s.name}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-snug font-light">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <img src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  {/* Emergency badge */}
                  {s.badge && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-black px-4 py-1.5 rounded-full uppercase">
                      {s.badge}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-3">
                    <span className="text-3xl">{s.icon}</span>
                    <h3 className="text-white font-black text-xl">{s.name}</h3>
                  </div>
                </>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* GUARANTEED CLEAR GAP BETWEEN SERVICES AND CARS */}
      <div className="w-full h-[150px] md:h-[200px] lg:h-[250px] bg-transparent flex items-center justify-center px-4">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white text-center">Brands we are working with</h2>
      </div>

      {/* ══════════════════════════════════════════
          CAR FOR RENTS — Matches Figma
          White cards with car image + specs
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden relative z-10" id="cars-section" data-animate>
        {/* Curved top edge (ellipse effect from Figma) */}
        <div className="relative bg-black pb-4">
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[110vw] h-40 bg-black rounded-b-[50%]"
            style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}
          />
          <div className={`relative z-10 text-center pt-0 pb-12 -mt-12 ${visible['cars-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {/* Down arrow */}
            <div className="flex justify-center mb-4 animate-float">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
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
                className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-white/5 border border-black backdrop-blur-2xl rounded-3xl overflow-hidden hover:-translate-y-4 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(220,38,38,0.2)] group/card hover:bg-white/10"
              >
                {/* Car image */}
                <div className="aspect-[16/10] overflow-hidden bg-black/50 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 relative z-0" />
                </div>
                {/* Details */}
                <div className="p-6">
                  <h3 className="text-white font-black text-2xl mb-4 text-center group-hover/card:text-red-500 transition-colors duration-300">{car.name}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 font-bold uppercase tracking-wider text-[10px] xl:text-xs">
                    <div className="bg-black/50 border border-black rounded-xl px-3 py-2.5 flex flex-col items-center gap-1">
                      <span className="text-gray-500">Model</span>
                      <span className="text-white">{car.model}</span>
                    </div>
                    <div className="bg-black/50 border border-black rounded-xl px-3 py-2.5 flex flex-col items-center gap-1">
                      <span className="text-gray-500">Speed</span>
                      <span className="text-white">{car.speed}</span>
                    </div>
                    <div className="bg-black/50 border border-black rounded-xl px-3 py-2.5 flex flex-col items-center gap-1">
                      <span className="text-gray-500">Auto</span>
                      <span className="text-white">{car.auto}</span>
                    </div>
                    <div className="bg-black/50 border border-black rounded-xl px-3 py-2.5 flex flex-col items-center gap-1">
                      <span className="text-gray-500">Engine</span>
                      <span className="text-white">{car.engine}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEED CLEAR GAP BETWEEN CARS AND FOOTER */}
      <div className="w-full h-[150px] md:h-[200px] lg:h-[250px] bg-transparent flex items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="max-w-[1800px] w-full mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-white">Signup for Newsletter</h2>
            <p className="text-gray-400 text-base md:text-lg">
              We may send you information about new cars related events, webinars, news and services which we believe
            </p>
          </div>
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent border-b-2 border-gray-600 px-4 py-3 focus:outline-none focus:border-red-500 transition-colors w-full sm:w-96 text-base md:text-lg placeholder-gray-500 text-white"
            />
            <button className="border-2 border-white rounded-full px-10 py-3 text-base md:text-lg font-bold hover:bg-white hover:text-black transition-colors shrink-0 uppercase tracking-wider text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>

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

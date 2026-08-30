import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GalleryCard from '../components/GalleryCard';
import ServiceFeatureCard from '../components/ServiceFeatureCard';

/* ─── Image Assets ────────────────────────────────────────────── */
const IMAGES = {
  heroBg: '/images/workshop/hero-bg.png',
  iconPerformance: '/images/workshop/icon-performance.png',
  iconRepair: '/images/workshop/icon-repair.png',
  iconFleet: '/images/workshop/icon-fleet.png',
  gallerySchedule: '/images/workshop/gallery-schedule.png',
  galleryEngine: '/images/workshop/gallery-engine.png',
  galleryPainting: '/images/workshop/gallery-painting.png',
  galleryDetailing: '/images/workshop/gallery-detailing.png',
  specialistTony: '/images/workshop/specialist-tony.png',
  specialistBruce: '/images/workshop/specialist-bruce.png',
  specialistClark: '/images/workshop/specialist-clark.png',
  specialistWalter: '/images/workshop/specialist-walter.png',
};

/* ─── Data ────────────────────────────────────────────────────── */
const SERVICE_CARDS = [
  {
    icon: IMAGES.iconPerformance,
    titleLine1: 'Performance',
    titleLine2: 'Check',
    descLines: [
      'Comprehensive checks to ensure',
      'peak vehicle performance.',
      'Identify issues early and drive',
      'with confidence.',
    ],
    defaultIconTop: 129,
    defaultTitleTop: 296,
    hoverDescTop: 245,
  },
  {
    icon: IMAGES.iconRepair,
    titleLine1: 'Auto',
    titleLine2: 'Repair',
    descLines: [
      'Reliable auto services to keep your',
      'car road-ready.',
      'From routine maintenance to major',
      'repairs,we handle it all.',
    ],
    defaultIconTop: 119,
    defaultTitleTop: 282,
    hoverDescTop: 255,
  },
  {
    icon: IMAGES.iconFleet,
    titleLine1: 'Fleet',
    titleLine2: 'Service',
    descLines: [
      'Efficient maintenance solutions for',
      'commercial fleets.',
      'Keep your vehicles running smoothly ',
      'with minimal downtime.',
    ],
    defaultIconTop: 140,
    defaultTitleTop: 286,
    hoverDescTop: 273,
  },
];

const SERVICES = [
  {
    num: '1',
    title: 'Inspection',
    lines: [
      'We can provide',
      'professional',
      'servicing and',
      'maintenance work',
      'with no loss of',
      'manufacturer',
      'warranty coverage.',
    ],
    stairOffset: 70,
    descMargin: 24,
  },
  {
    num: '2',
    title: 'Diagnostic',
    lines: [
      'A computerized car',
      'diagnostic check',
      'from Mechanic 128',
      'will give you a true',
      'picture of how your',
      'vehicle is running.',
    ],
    stairOffset: 35,
    descMargin: 59,
  },
  {
    num: '3',
    title: 'Upgrades',
    lines: [
      'Rather than sending',
      'your car for a basic',
      'service, ask',
      'Mechanic 128 for a',
      'thorough multi-',
      'point check and',
      'upgrade your car.',
    ],
    stairOffset: 0,
    descMargin: 104,
  },
];

const GALLERY = [
  {
    img: IMAGES.gallerySchedule,
    label: 'SCHEDULE',
    line1: 'Easy online booking to get your',
    line2: 'car serviced at your convenience.',
    titleDefaultTop: '79.43%',
    titleHoverTop: '60.69%',
    descHoverTop: '79.63%',
    imageHoverShift: '-22%',
  },
  {
    img: IMAGES.galleryEngine,
    label: 'ENGINE',
    line1: 'Expert engine diagnostics and',
    line2: 'repairs for smooth performance.',
    titleDefaultTop: '79.43%',
    titleHoverTop: '61.91%',
    descHoverTop: '81.05%',
    imageHoverShift: '-22%',
  },
  {
    img: IMAGES.galleryPainting,
    label: 'PAINTING',
    line1: 'Premium paintwork to restore your',
    line2: 'car’s original shine.',
    titleDefaultTop: '79.43%',
    titleHoverTop: '64.76%',
    descHoverTop: '83.09%',
    imageHoverShift: '-22%',
  },
  {
    img: IMAGES.galleryDetailing,
    label: 'DETAILING',
    line1: 'Complete interior and exterior ',
    line2: 'detailing for a fresh look.',
    titleDefaultTop: '79.43%',
    titleHoverTop: '66.19%',
    descHoverTop: '84.92%',
    imageHoverShift: '-22%',
  },
];

const SPECIALISTS = [
  { img: IMAGES.specialistTony, name: 'Tony Stark', role: 'Founder of Mechify' },
  { img: IMAGES.specialistBruce, name: 'Bruce Wayne', role: 'Main Mechanic' },
  { img: IMAGES.specialistClark, name: 'Clark Kent', role: 'Senior Technician' },
  { img: IMAGES.specialistWalter, name: 'Walter White', role: 'Diagnostic Specialist' },
];

export default function Workshop() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState({});

  /* ─── Intersection Observer for scroll-reveal ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((p) => ({ ...p, [e.target.id]: true }));
      }),
      { threshold: 0.05 },
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden font-sora">

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Balanced, Centered & Larger Text
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden min-h-[580px] lg:min-h-[720px] flex items-center justify-center bg-black">
        {/* Background image */}
        <img
          src={IMAGES.heroBg}
          alt="Auto repair workshop"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-55"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        {/* Hero Content — Centered container */}
        <div className="relative z-10 max-w-[1720px] w-full mx-auto px-6 sm:px-12 lg:px-20 py-20 flex flex-col items-start justify-center animate-slideInLeft">
          <h1 className="font-extrabold text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight mb-5">
            Professional Car Repair <br />
            <span className="text-red-500">And Maintenance</span>
          </h1>

          <p className="font-normal text-gray-200 text-lg sm:text-2xl md:text-3xl max-w-3xl leading-snug mb-10">
            We are focused on providing our clients with the highest level of quality and excellent customer support across Dhaka.
          </p>

          {/* Glowing Red Emergency Appointment CTA Button */}
          <button
            onClick={() => navigate('/workshop-search')}
            className="inline-flex items-center justify-center text-white font-bold border-2 border-white px-8 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 animate-sosPulse cursor-pointer select-none text-lg sm:text-2xl shadow-[0_0_35px_rgba(220,38,38,0.8),0_0_70px_rgba(220,38,38,0.4)]"
            style={{ backgroundColor: '#dc2626' }}
          >
            🚨 Get an Emergency appointment now
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICE CARDS — 3 interactive cards, perfectly centered
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="service-cards"
        data-animate
        className={`w-full py-16 sm:py-24 max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 ${
          visible['service-cards'] ? 'animate-fadeInUp' : 'opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center justify-center">
          {SERVICE_CARDS.map((card, i) => (
            <ServiceFeatureCard
              key={i}
              icon={card.icon}
              titleLine1={card.titleLine1}
              titleLine2={card.titleLine2}
              descLines={card.descLines}
              defaultIconTop={card.defaultIconTop}
              defaultTitleTop={card.defaultTitleTop}
              hoverDescTop={card.hoverDescTop}
              onClick={() => navigate('/workshop-search')}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHY US? — Centered container with prominent typography
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="why-us"
        data-animate
        className={`w-full py-12 sm:py-16 max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 ${
          visible['why-us'] ? 'animate-fadeInUp' : 'opacity-0'
        }`}
      >
        <h2 className="font-bold text-4xl sm:text-6xl md:text-7xl mb-6 tracking-tight">
          Why us?
        </h2>
        <div className="font-semibold text-gray-200 text-xl sm:text-3xl md:text-4xl leading-relaxed max-w-5xl">
          <p className="mb-2">All Mechanic 128 workshops employ the latest</p>
          <p className="mb-2">test techniques and digital information</p>
          <p className="mb-2">systems. This ideal combination ensures</p>
          <p className="mb-2">systematic vehicle diagnosis and qualified</p>
          <p>repair work.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES SECTION — Stair-Step 3 Columns
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="services-section"
        data-animate
        className={`w-full py-16 sm:py-24 max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 ${
          visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'
        }`}
      >
        <h2 className="font-bold text-center text-white text-4xl sm:text-6xl md:text-7xl font-poppins mb-16 tracking-tight">
          SERVICES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 mx-auto items-start">
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center"
            >
              {/* Stair-step spacer */}
              <div style={{ height: `${svc.stairOffset}px` }} className="hidden md:block flex-shrink-0" />

              {/* Number & Title Group */}
              <div className="flex flex-col items-center text-center w-full">
                {/* Hollow Outlined White Number */}
                <p
                  className="select-none text-center leading-none text-7xl sm:text-8xl md:text-9xl font-black mb-4"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    color: 'transparent',
                    WebkitTextStroke: '2.5px #ffffff',
                  }}
                >
                  {svc.num}
                </p>

                {/* Title */}
                <h3 className="font-bold text-white text-center leading-tight text-3xl sm:text-4xl md:text-5xl font-poppins tracking-tight">
                  {svc.title}
                </h3>
              </div>

              {/* Description Text — baseline aligned */}
              <div
                className="text-center w-full"
                style={{
                  marginTop: `${svc.descMargin}px`,
                }}
              >
                <div className="mx-auto text-center text-gray-400 font-poppins font-normal text-base sm:text-lg md:text-xl leading-relaxed max-w-xs">
                  {svc.lines.map((line, lineIdx) => (
                    <p key={lineIdx} className="m-0 leading-snug">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IMAGE GALLERY — 4 Cards
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="gallery"
        data-animate
        className={`w-full py-16 sm:py-20 max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 ${
          visible['gallery'] ? 'animate-fadeInUp' : 'opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {GALLERY.map((item, i) => (
            <GalleryCard
              key={i}
              img={item.img}
              label={item.label}
              line1={item.line1}
              line2={item.line2}
              titleDefaultTop={item.titleDefaultTop}
              titleHoverTop={item.titleHoverTop}
              descHoverTop={item.descHoverTop}
              imageHoverShift={item.imageHoverShift}
              onClick={() => navigate('/workshop-search')}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MEET OUR SPECIALISTS — 4 Specialist Cards
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="specialists"
        data-animate
        className={`w-full py-16 sm:py-24 max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 ${
          visible['specialists'] ? 'animate-fadeInUp' : 'opacity-0'
        }`}
      >
        <h2 className="font-bold text-4xl sm:text-6xl md:text-7xl mb-12 tracking-tight">
          MEET OUR SPECIALISTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {SPECIALISTS.map((spec, i) => (
            <div key={i} className="group flex flex-col">
              {/* Portrait */}
              <div
                className="relative border-4 sm:border-[5px] border-white rounded-[20px] overflow-hidden shadow-[0px_4px_25px_10px_rgba(255,255,255,0.4)]"
                style={{ aspectRatio: '406 / 453' }}
              >
                <img
                  src={spec.img}
                  alt={spec.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Name */}
              <p className="font-semibold text-2xl sm:text-3xl text-white mt-5 leading-tight">
                {spec.name}
              </p>
              {/* Role */}
              <p className="font-normal text-base sm:text-lg text-gray-400 mt-2 leading-tight">
                {spec.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

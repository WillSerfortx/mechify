import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ─── Image Assets (downloaded from Figma) ────────────────────── */
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
  iconInstagram: '/images/workshop/icon-instagram.png',
  iconFacebook: '/images/workshop/icon-facebook.png',
  iconSocial: '/images/workshop/icon-social.png',
  iconLocation: '/images/workshop/icon-location.png',
  iconPhone: '/images/workshop/icon-phone.png',
  iconMail: '/images/workshop/icon-mail.png',
};

/* ─── Data ────────────────────────────────────────────────────── */
const SERVICE_CARDS = [
  { icon: IMAGES.iconPerformance, title: 'Performance', subtitle: 'Check' },
  { icon: IMAGES.iconRepair, title: 'Auto', subtitle: 'Repair' },
  { icon: IMAGES.iconFleet, title: 'Fleet', subtitle: 'Service' },
];

const SERVICES = [
  {
    num: '1',
    title: 'Inspection',
    desc: 'We can provide professional servicing and maintenance work with no loss of manufacturer warranty coverage.',
  },
  {
    num: '2',
    title: 'Diagnostic',
    desc: 'A computerized car diagnostic check from Mechanic 128 will give you a true picture of how your vehicle is running.',
  },
  {
    num: '3',
    title: 'Upgrades',
    desc: 'Rather than sending your car for a basic service, ask Mechanic 128 for a thorough multi-point check and upgrade your car.',
  },
];

const GALLERY = [
  { img: IMAGES.gallerySchedule, label: 'SCHEDULE' },
  { img: IMAGES.galleryEngine, label: 'ENGINE' },
  { img: IMAGES.galleryPainting, label: 'PAINTING' },
  { img: IMAGES.galleryDetailing, label: 'DETAILING' },
];

const SPECIALISTS = [
  { img: IMAGES.specialistTony, name: 'Tony Stark', role: 'Founder of Mechify' },
  { img: IMAGES.specialistBruce, name: 'Bruce Wayne', role: 'Main Mechanic' },
  { img: IMAGES.specialistClark, name: 'Clark Kent', role: 'Mechanic' },
  { img: IMAGES.specialistWalter, name: 'Walter White', role: 'Mechanic' },
];

export default function Workshop() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '', phone: '', carModel: '', email: '',
    carReg: '', nid: '', message: '',
  });

  /* ─── Intersection Observer for scroll-reveal ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((p) => ({ ...p, [e.target.id]: true }));
      }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate('/workshop-select');
  };

  return (
    <div className="bg-black min-h-screen text-white font-sora overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative w-full" style={{ height: 'clamp(500px, 55vw, 900px)' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.heroBg}
            alt="Auto repair workshop"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-14 lg:px-16 max-w-[1920px] mx-auto pt-20">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[96px] font-bold leading-none mb-6 max-w-[900px] animate-slideInLeft"
          >
            Professional Car Repair{' '}
            <br />
            And Maintenance
          </h1>

          <div className="max-w-[620px] text-base sm:text-lg md:text-2xl lg:text-[32px] font-normal leading-snug text-white/90 mb-10 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <p>We are focused on providing our clients with the highest</p>
            <p>level of quality and excellent customer support</p>
          </div>

          {/* CTA Button */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <a
              href="#contact-section"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg md:text-2xl lg:text-[32px] px-10 md:px-14 py-4 md:py-5 rounded-full border border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
            >
              Get an Appointment now
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BACK BUTTON
      ═══════════════════════════════════════════ */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-14 lg:px-16">
        <button
          onClick={() => navigate(-1)}
          className="w-[90px] h-[90px] border-[10px] border-white bg-black flex items-center justify-center text-white hover:bg-white/10 transition-colors -mt-11 relative z-20"
          aria-label="Go back"
        >
          <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          SERVICE CARDS — Performance Check, Auto Repair, Fleet Service
      ═══════════════════════════════════════════ */}
      <section
        id="service-cards"
        data-animate
        className={`max-w-[1920px] mx-auto px-6 md:px-14 lg:px-16 py-16 md:py-24 ${visible['service-cards'] ? 'animate-fadeInUp' : 'opacity-0'}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-[1800px] mx-auto">
          {SERVICE_CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-black border-[5px] border-white rounded-[40px] flex flex-col items-center justify-center py-16 md:py-20 px-8 hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 mb-8 flex items-center justify-center">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-full object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-3xl md:text-[40px] font-bold text-center leading-[0.96]">{card.title}</p>
              <p className="text-3xl md:text-[40px] font-bold text-center leading-[0.96] mt-1">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY US?
      ═══════════════════════════════════════════ */}
      <section
        id="why-us"
        data-animate
        className={`max-w-[1920px] mx-auto px-6 md:px-14 lg:px-16 pb-16 md:pb-24 ${visible['why-us'] ? 'animate-fadeInUp' : 'opacity-0'}`}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Why us?</h2>
        <div className="text-xl md:text-2xl lg:text-[32px] font-semibold leading-snug text-white max-w-[800px]">
          <p>All Mechanic 128 workshops employ the latest</p>
          <p>test techniques and digital information</p>
          <p>systems. This ideal combination ensures</p>
          <p>systematic vehicle diagnosis and qualified</p>
          <p>repair work.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — Inspection, Diagnostic, Upgrades
      ═══════════════════════════════════════════ */}
      <section
        id="services-section"
        data-animate
        className={`max-w-[1920px] mx-auto px-6 md:px-14 lg:px-16 py-16 md:py-24 ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16 md:mb-24 font-[Poppins]">
          SERVICES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-[1600px] mx-auto">
          {SERVICES.map((svc, i) => (
            <div key={i} className="text-center relative">
              {/* Large background number */}
              <p
                className="text-[100px] md:text-[128px] font-bold leading-[0.96] select-none"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.08)',
                  color: 'transparent',
                  marginBottom: '-30px',
                }}
              >
                {svc.num}
              </p>
              {/* Title */}
              <p className="text-3xl md:text-4xl lg:text-[64px] font-bold text-white mb-6 font-[Poppins] relative z-10 leading-[0.96]">
                {svc.title}
              </p>
              {/* Description */}
              <p className="text-base md:text-xl lg:text-[22px] font-semibold text-[#8b8888] leading-snug max-w-[336px] mx-auto font-[Poppins]">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          IMAGE GALLERY — Schedule, Engine, Painting, Detailing
      ═══════════════════════════════════════════ */}
      <section
        id="gallery"
        data-animate
        className={`max-w-[1920px] mx-auto px-6 md:px-14 lg:px-16 py-16 md:py-24 ${visible['gallery'] ? 'animate-fadeInUp' : 'opacity-0'}`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className="relative border-[5px] border-white rounded-[15px] overflow-hidden group cursor-pointer"
              style={{ aspectRatio: '403 / 491' }}
            >
              <img
                src={item.img}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Label */}
              <p className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-2xl md:text-3xl lg:text-[40px] font-extrabold text-white leading-[0.96] z-10">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MEET OUR SPECIALISTS
      ═══════════════════════════════════════════ */}
      <section
        id="specialists"
        data-animate
        className={`max-w-[1920px] mx-auto px-6 md:px-14 lg:px-16 py-16 md:py-24 ${visible['specialists'] ? 'animate-fadeInUp' : 'opacity-0'}`}
      >
        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold mb-12 md:mb-16 leading-[0.96]">
          MEET OUR SPECIALISTS
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {SPECIALISTS.map((spec, i) => (
            <div key={i} className="group">
              {/* Portrait card */}
              <div
                className="relative border-[5px] border-white rounded-[15px] overflow-hidden mb-4"
                style={{
                  aspectRatio: '406 / 453',
                  boxShadow: '0px 4px 20px 10px rgba(255, 255, 255, 0.5)',
                }}
              >
                <img
                  src={spec.img}
                  alt={spec.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Name & role */}
              <p className="text-xl md:text-2xl lg:text-[36px] font-semibold leading-[0.96] mt-4">{spec.name}</p>
              <p className="text-sm md:text-base lg:text-[20px] font-normal text-[#9e9e9e] leading-[0.96] mt-2">{spec.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT / APPOINTMENT SECTION
      ═══════════════════════════════════════════ */}
      <section
        id="contact-section"
        data-animate
        className={`max-w-[1920px] mx-auto px-6 md:px-14 lg:px-16 py-16 md:py-24 ${visible['contact-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left — Form */}
          <div className="w-full lg:w-[55%]">
            <div className="bg-[#161616] rounded-[20px] p-8 md:p-12">
              <form onSubmit={handleFormSubmit}>
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                  <div>
                    <label className="block text-lg md:text-2xl font-semibold mb-3">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#161616] border border-white rounded-[20px] px-6 py-4 md:py-5 text-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-lg md:text-2xl font-semibold mb-3">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#161616] border border-white rounded-[20px] px-6 py-4 md:py-5 text-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Car model + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                  <div>
                    <label className="block text-lg md:text-2xl font-semibold mb-3">Car model</label>
                    <input
                      type="text"
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleChange}
                      className="w-full bg-[#161616] border border-white rounded-[20px] px-6 py-4 md:py-5 text-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-lg md:text-2xl font-semibold mb-3">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#161616] border border-white rounded-[20px] px-6 py-4 md:py-5 text-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Car Reg Number + NID Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                  <div>
                    <label className="block text-lg md:text-2xl font-semibold mb-3">Car Reg Number</label>
                    <input
                      type="text"
                      name="carReg"
                      value={formData.carReg}
                      onChange={handleChange}
                      className="w-full bg-[#161616] border border-white rounded-[20px] px-6 py-4 md:py-5 text-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-lg md:text-2xl font-semibold mb-3">NID Number</label>
                    <input
                      type="text"
                      name="nid"
                      value={formData.nid}
                      onChange={handleChange}
                      className="w-full bg-[#161616] border border-white rounded-[20px] px-6 py-4 md:py-5 text-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div className="mb-8">
                  <label className="block text-lg md:text-2xl font-semibold mb-3">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[#161616] border border-white rounded-[20px] px-6 py-4 md:py-5 text-lg focus:outline-none focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl md:text-[32px] px-10 md:px-14 py-4 md:py-5 rounded-full border border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
                >
                  Get a Workshop now
                </button>
              </form>
            </div>
          </div>

          {/* Right — Contact Info */}
          <div className="w-full lg:w-[45%] flex flex-col justify-start pt-4">
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-[0.96] mb-2">GET A FREE</h2>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-[0.96] mb-10">APPOINTMENT</h2>

            {/* Social icons */}
            <div className="flex items-center gap-6 mb-10">
              <a href="#" className="w-10 h-10 hover:scale-110 transition-transform">
                <img src={IMAGES.iconInstagram} alt="Instagram" className="w-full h-full object-contain brightness-0 invert" />
              </a>
              <a href="#" className="w-10 h-10 hover:scale-110 transition-transform">
                <img src={IMAGES.iconFacebook} alt="Facebook" className="w-full h-full object-contain brightness-0 invert" />
              </a>
              <a href="#" className="w-10 h-10 hover:scale-110 transition-transform">
                <img src={IMAGES.iconSocial} alt="Twitter" className="w-full h-full object-contain brightness-0 invert" />
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 shrink-0">
                <img src={IMAGES.iconMail} alt="Email" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <p className="text-lg md:text-xl font-bold">mrahman2331077@bscse.uiu.ac.bd</p>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 shrink-0">
                <img src={IMAGES.iconLocation} alt="Location" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <p className="text-lg md:text-xl font-bold">Lane 1 Block A Baridhara Dohs</p>
            </div>

            {/* Phone numbers */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 mt-1">
                <img src={IMAGES.iconPhone} alt="Phone" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold">+8801304098448</p>
                <p className="text-lg md:text-xl font-bold mt-2">+8801516520602</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

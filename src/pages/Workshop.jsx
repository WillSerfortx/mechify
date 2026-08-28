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
      { threshold: 0.05 },
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

  /* Figma design is 1920px wide — we scale proportionally */
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* ═══════════════════════════════════════════
          HERO — Figma: image36 full bleed, text at left:56px top:158px
      ═══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: 'clamp(520px, 52vw, 850px)' }}>
        {/* Background image — full width like Figma */}
        <img
          src={IMAGES.heroBg}
          alt="Auto repair workshop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlays for readability (Figma has dark left side naturally) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        {/* Content — pinned to left, matching Figma left:56px */}
        <div
          className="relative z-10 flex flex-col justify-center h-full animate-slideInLeft"
          style={{ paddingLeft: 'clamp(24px, 3vw, 56px)', paddingRight: '24px' }}
        >
          {/* Title — Figma: Sora Bold 96px */}
          <h1
            className="font-bold text-white leading-none mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 96px)' }}
          >
            Professional Car Repair
            <br />
            And Maintenance
          </h1>

          {/* Subtitle — Figma: Sora Regular 32px */}
          <div
            className="font-normal text-white/90 leading-snug mb-10"
            style={{ fontSize: 'clamp(14px, 1.67vw, 32px)', maxWidth: '640px' }}
          >
            <p>We are focused on providing our clients with the highest</p>
            <p>level of quality and excellent customer support</p>
          </div>

          {/* CTA Button — Figma: red bg, white border, Sora Bold 32px, rounded-full, 496×74 */}
          <a
            href="#contact-section"
            className="inline-block text-white font-bold rounded-full border border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
            style={{
              backgroundColor: 'red',
              fontSize: 'clamp(16px, 1.67vw, 32px)',
              padding: 'clamp(12px, 1.1vw, 21px) clamp(24px, 2.4vw, 47px)',
              width: 'fit-content',
            }}
          >
            Get an Appointment now
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BACK BUTTON — Figma: 90×90, border-10 white, left:0 
      ═══════════════════════════════════════════ */}
      <div style={{ paddingLeft: 'clamp(0px, 0vw, 0px)' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center bg-black hover:bg-white/10 transition-colors relative z-20"
          style={{
            width: 'clamp(60px, 4.7vw, 90px)',
            height: 'clamp(60px, 4.7vw, 90px)',
            borderWidth: 'clamp(6px, 0.52vw, 10px)',
            borderStyle: 'solid',
            borderColor: 'white',
            marginTop: '-45px',
          }}
          aria-label="Go back"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          SERVICE CARDS — Figma: 3 cards, 553×468 each, rounded-40, border-5 white
      ═══════════════════════════════════════════ */}
      <section
        id="service-cards"
        data-animate
        className={`w-full py-12 md:py-20 ${visible['service-cards'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{ paddingLeft: 'clamp(24px, 4.5vw, 87px)', paddingRight: 'clamp(24px, 4.5vw, 80px)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {SERVICE_CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-black border-[5px] border-white rounded-[40px] flex flex-col items-center justify-center cursor-pointer group hover:bg-white/5 transition-all duration-300 overflow-hidden"
              style={{ aspectRatio: '553 / 468' }}
            >
              {/* Icon — Figma: 128×128 */}
              <div
                className="flex items-center justify-center"
                style={{ width: 'clamp(64px, 6.7vw, 128px)', height: 'clamp(64px, 6.7vw, 128px)', marginBottom: 'clamp(16px, 2vw, 40px)' }}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-full object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* Title — Figma: Sora Bold 40px */}
              <p className="font-bold text-white text-center leading-none" style={{ fontSize: 'clamp(20px, 2.08vw, 40px)' }}>{card.title}</p>
              <p className="font-bold text-white text-center leading-none mt-1" style={{ fontSize: 'clamp(20px, 2.08vw, 40px)' }}>{card.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY US? — Figma: left:87px, Sora Bold 64px title, Sora SemiBold 32px body
      ═══════════════════════════════════════════ */}
      <section
        id="why-us"
        data-animate
        className={`w-full pb-12 md:pb-20 ${visible['why-us'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{ paddingLeft: 'clamp(24px, 4.5vw, 87px)', paddingRight: '24px' }}
      >
        <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(32px, 3.33vw, 64px)' }}>Why us?</h2>
        <div className="font-semibold text-white leading-snug" style={{ fontSize: 'clamp(16px, 1.67vw, 32px)', maxWidth: '800px' }}>
          <p>All Mechanic 128 workshops employ the latest</p>
          <p>test techniques and digital information</p>
          <p>systems. This ideal combination ensures</p>
          <p>systematic vehicle diagnosis and qualified</p>
          <p>repair work.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — Figma: Poppins Bold 64px titles, 128px numbers, centered
      ═══════════════════════════════════════════ */}
      <section
        id="services-section"
        data-animate
        className={`w-full py-12 md:py-20 ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{ paddingLeft: 'clamp(24px, 4.5vw, 87px)', paddingRight: 'clamp(24px, 4.5vw, 87px)' }}
      >
        <h2
          className="font-bold text-center mb-12 md:mb-20"
          style={{ fontSize: 'clamp(36px, 3.33vw, 64px)', fontFamily: "'Poppins', sans-serif" }}
        >
          SERVICES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-[1700px] mx-auto">
          {SERVICES.map((svc, i) => (
            <div key={i} className="text-center relative">
              {/* Large background number — Figma: Sora Bold 128px, black fill */}
              <p
                className="font-bold leading-none select-none"
                style={{
                  fontSize: 'clamp(64px, 6.67vw, 128px)',
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                  marginBottom: '-20px',
                }}
              >
                {svc.num}
              </p>
              {/* Title — Figma: Poppins Bold 64px */}
              <p
                className="font-bold text-white relative z-10 leading-none mb-4"
                style={{ fontSize: 'clamp(24px, 3.33vw, 64px)', fontFamily: "'Poppins', sans-serif" }}
              >
                {svc.title}
              </p>
              {/* Description — Figma: Poppins SemiBold 32px, #8b8888 */}
              <p
                className="font-semibold leading-snug mx-auto"
                style={{
                  fontSize: 'clamp(13px, 1.67vw, 32px)',
                  color: '#8b8888',
                  maxWidth: '336px',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          IMAGE GALLERY — Figma: 4 cards 403×491, border-5, rounded-15
      ═══════════════════════════════════════════ */}
      <section
        id="gallery"
        data-animate
        className={`w-full py-12 md:py-20 ${visible['gallery'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{ paddingLeft: 'clamp(24px, 4.2vw, 80px)', paddingRight: 'clamp(24px, 4.2vw, 80px)' }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Label — Figma: Sora ExtraBold 40px, bottom-left */}
              <p
                className="absolute font-extrabold text-white leading-none z-10"
                style={{
                  fontSize: 'clamp(16px, 2.08vw, 40px)',
                  bottom: 'clamp(16px, 2vw, 40px)',
                  left: 'clamp(16px, 2vw, 85px)',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MEET OUR SPECIALISTS — Figma: Sora Bold 64px title, 4 portrait cards 406×453
      ═══════════════════════════════════════════ */}
      <section
        id="specialists"
        data-animate
        className={`w-full py-12 md:py-20 ${visible['specialists'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{ paddingLeft: 'clamp(24px, 3.6vw, 69px)', paddingRight: 'clamp(24px, 3.6vw, 69px)' }}
      >
        <h2
          className="font-bold leading-none mb-10 md:mb-16"
          style={{ fontSize: 'clamp(28px, 3.33vw, 64px)' }}
        >
          MEET OUR SPECIALISTS
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {SPECIALISTS.map((spec, i) => (
            <div key={i} className="group">
              {/* Portrait — Figma: 406×453, border-5 white, rounded-15, white glow shadow */}
              <div
                className="relative border-[5px] border-white rounded-[15px] overflow-hidden"
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
              {/* Name — Figma: Sora SemiBold 36px */}
              <p
                className="font-semibold leading-none mt-4"
                style={{ fontSize: 'clamp(18px, 1.88vw, 36px)' }}
              >
                {spec.name}
              </p>
              {/* Role — Figma: Sora Regular 20px, #9e9e9e */}
              <p
                className="font-normal leading-none mt-2"
                style={{ fontSize: 'clamp(12px, 1.04vw, 20px)', color: '#9e9e9e' }}
              >
                {spec.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT / APPOINTMENT — Figma: dark #161616 card on left, contact info on right
          Card: left:88 top:4916 w:949 h:968 rounded-20
          "GET A FREE APPOINTMENT": left:1314
      ═══════════════════════════════════════════ */}
      <section
        id="contact-section"
        data-animate
        className={`w-full py-12 md:py-20 ${visible['contact-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{ paddingLeft: 'clamp(24px, 4.6vw, 88px)', paddingRight: 'clamp(24px, 4.6vw, 88px)' }}
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ─── Left: Form Card ─── */}
          <div
            className="w-full lg:w-auto rounded-[20px] flex-shrink-0"
            style={{ backgroundColor: '#161616', padding: 'clamp(20px, 2.9vw, 56px)', maxWidth: '949px' }}
          >
            <form onSubmit={handleFormSubmit}>
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: 'clamp(16px, 1.25vw, 24px)' }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{ backgroundColor: '#161616', fontSize: 'clamp(14px, 0.83vw, 16px)' }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: 'clamp(16px, 1.25vw, 24px)' }}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{ backgroundColor: '#161616', fontSize: 'clamp(14px, 0.83vw, 16px)' }}
                  />
                </div>
              </div>

              {/* Row 2: Car model + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: 'clamp(16px, 1.25vw, 24px)' }}>Car model</label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{ backgroundColor: '#161616', fontSize: 'clamp(14px, 0.83vw, 16px)' }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: 'clamp(16px, 1.25vw, 24px)' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{ backgroundColor: '#161616', fontSize: 'clamp(14px, 0.83vw, 16px)' }}
                  />
                </div>
              </div>

              {/* Row 3: Car Reg + NID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: 'clamp(16px, 1.25vw, 24px)' }}>Car Reg Number</label>
                  <input
                    type="text"
                    name="carReg"
                    value={formData.carReg}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{ backgroundColor: '#161616', fontSize: 'clamp(14px, 0.83vw, 16px)' }}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: 'clamp(16px, 1.25vw, 24px)' }}>NID Number</label>
                  <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{ backgroundColor: '#161616', fontSize: 'clamp(14px, 0.83vw, 16px)' }}
                  />
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="mb-8">
                <label className="block font-semibold mb-2" style={{ fontSize: 'clamp(16px, 1.25vw, 24px)' }}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-white rounded-[20px] px-5 py-4 text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                  style={{ backgroundColor: '#161616', fontSize: 'clamp(14px, 0.83vw, 16px)' }}
                />
              </div>

              {/* Submit — Figma: red bg, white border, Sora Bold 32px, rounded-full */}
              <button
                type="submit"
                className="text-white font-bold rounded-full border border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
                style={{
                  backgroundColor: 'red',
                  fontSize: 'clamp(18px, 1.67vw, 32px)',
                  padding: 'clamp(12px, 1.1vw, 21px) clamp(32px, 4.4vw, 84px)',
                }}
              >
                Get a Workshop now
              </button>
            </form>
          </div>

          {/* ─── Right: Contact Info ─── */}
          <div className="w-full lg:w-auto flex flex-col justify-start pt-0 lg:pt-0">
            {/* Title — Figma: Sora Bold 64px */}
            <h2 className="font-bold leading-none mb-1" style={{ fontSize: 'clamp(28px, 3.33vw, 64px)' }}>GET A FREE</h2>
            <h2 className="font-bold leading-none mb-8" style={{ fontSize: 'clamp(28px, 3.33vw, 64px)' }}>APPOINTMENT</h2>

            {/* Social icons — Figma: 40×40 each */}
            <div className="flex items-center gap-5 mb-8">
              <a href="#" className="hover:scale-110 transition-transform" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconInstagram} alt="Instagram" className="w-full h-full object-contain brightness-0 invert" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconFacebook} alt="Facebook" className="w-full h-full object-contain brightness-0 invert" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconSocial} alt="Twitter" className="w-full h-full object-contain brightness-0 invert" />
              </a>
            </div>

            {/* Email — Figma: mail icon 40×40 + Sora Bold 20px */}
            <div className="flex items-center gap-4 mb-5">
              <div className="shrink-0" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconMail} alt="Email" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <p className="font-bold" style={{ fontSize: 'clamp(13px, 1.04vw, 20px)' }}>mrahman2331077@bscse.uiu.ac.bd</p>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 mb-5">
              <div className="shrink-0" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconLocation} alt="Location" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <p className="font-bold" style={{ fontSize: 'clamp(13px, 1.04vw, 20px)' }}>Lane 1 Block A Baridhara Dohs</p>
            </div>

            {/* Phone numbers */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconPhone} alt="Phone" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: 'clamp(13px, 1.04vw, 20px)' }}>+8801304098448</p>
                <p className="font-bold mt-1" style={{ fontSize: 'clamp(13px, 1.04vw, 20px)' }}>+8801516520602</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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

  /* ────────────────────────────────────────────────────────────────
     Figma canvas: 1920 × ~5900px
     All proportions below use vw-based clamp for exact Figma ratios.
     Base ratio: value / 1920 * 100 = vw%
  ──────────────────────────────────────────────────────────────── */
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* ═══════════════════════════════════════════
          HERO SECTION
          Figma: image at top:-156px, 1920×1280. Visible = 1124px / 1920 = 58.5vw
          Title: left:56px top:158px, Sora Bold 96px
          Subtitle: left:56px top:397px, Sora Regular 32px
          CTA: left:95px top:526px, red bg, 496×74, rounded-full
      ═══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: 'clamp(480px, 58.5vw, 1124px)' }}>
        {/* Background image */}
        <img
          src={IMAGES.heroBg}
          alt="Auto repair workshop"
          className="absolute w-full h-auto object-cover"
          style={{ top: '-8.1%' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        {/* Content — Figma left:56px = 2.9vw */}
        <div
          className="relative z-10 flex flex-col justify-center h-full animate-slideInLeft"
          style={{ paddingLeft: 'clamp(24px, 2.92vw, 56px)', paddingRight: '24px' }}
        >
          {/* Title — Figma: Sora Bold, 96px / 1920 = 5vw */}
          <h1
            className="font-bold text-white leading-none"
            style={{ fontSize: 'clamp(32px, 5vw, 96px)', marginBottom: 'clamp(16px, 1.56vw, 30px)' }}
          >
            Professional Car Repair
            <br />
            And Maintenance
          </h1>

          {/* Subtitle — Figma: Sora Regular, 32px / 1920 = 1.67vw */}
          <div
            className="font-normal text-white/90 leading-snug"
            style={{ fontSize: 'clamp(14px, 1.67vw, 32px)', maxWidth: '640px', marginBottom: 'clamp(24px, 3.33vw, 64px)' }}
          >
            <p>We are focused on providing our clients with the highest</p>
            <p>level of quality and excellent customer support</p>
          </div>

          {/* CTA Button — Figma: 496×74, left:95px, red bg, Sora Bold 32px */}
          <a
            href="#contact-section"
            className="inline-block text-white font-bold rounded-full border border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
            style={{
              backgroundColor: 'red',
              fontSize: 'clamp(16px, 1.67vw, 32px)',
              padding: 'clamp(10px, 1.09vw, 21px) clamp(24px, 2.45vw, 47px)',
              width: 'fit-content',
              marginLeft: 'clamp(0px, 2vw, 39px)',
            }}
          >
            Get an Appointment now
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BACK BUTTON — Figma: 90×90, border-10 white, left:0, top:778px (right after hero area)
          90/1920 = 4.69vw
      ═══════════════════════════════════════════ */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center bg-black hover:bg-white/10 transition-colors relative z-20"
          style={{
            width: 'clamp(56px, 4.69vw, 90px)',
            height: 'clamp(56px, 4.69vw, 90px)',
            borderWidth: 'clamp(5px, 0.52vw, 10px)',
            borderStyle: 'solid',
            borderColor: 'white',
            marginTop: 'clamp(-28px, -1.46vw, -28px)',
          }}
          aria-label="Go back"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          SERVICE CARDS — Figma: 3 cards in a row
          Each card: 553×468, bg black, border-5 white, rounded-40
          left offsets: 87, 681, 1280 → gaps are ~41px between cards
          553/1920 = 28.8vw per card
          Icon: 128×128 centered, label: Sora Bold 40px
      ═══════════════════════════════════════════ */}
      <section
        id="service-cards"
        data-animate
        className={`w-full ${visible['service-cards'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: 'clamp(32px, 3.13vw, 60px)',
          paddingBottom: 'clamp(32px, 2.6vw, 50px)',
          paddingLeft: 'clamp(24px, 4.53vw, 87px)',
          paddingRight: 'clamp(24px, 4.17vw, 80px)',
        }}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ gap: 'clamp(12px, 2.14vw, 41px)' }}
        >
          {SERVICE_CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-black border-white rounded-[40px] flex flex-col items-center justify-center cursor-pointer group hover:bg-white/5 transition-all duration-300 overflow-hidden"
              style={{
                aspectRatio: '553 / 468',
                borderWidth: 'clamp(3px, 0.26vw, 5px)',
                borderStyle: 'solid',
              }}
            >
              {/* Icon — Figma: 128×128, 128/1920 = 6.67vw */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 'clamp(56px, 6.67vw, 128px)',
                  height: 'clamp(56px, 6.67vw, 128px)',
                  marginBottom: 'clamp(20px, 2.6vw, 50px)',
                }}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-full object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* Title — Figma: Sora Bold 40px, 40/1920 = 2.08vw */}
              <p className="font-bold text-white text-center leading-none" style={{ fontSize: 'clamp(18px, 2.08vw, 40px)' }}>{card.title}</p>
              <p className="font-bold text-white text-center leading-none mt-1" style={{ fontSize: 'clamp(18px, 2.08vw, 40px)' }}>{card.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY US? — Figma: left:87px, top:1748px area
          Title: Sora Bold 64px (but "Why us?" text)
          Body: Sora SemiBold 32px, white
      ═══════════════════════════════════════════ */}
      <section
        id="why-us"
        data-animate
        className={`w-full ${visible['why-us'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingLeft: 'clamp(24px, 4.53vw, 87px)',
          paddingRight: '24px',
          paddingBottom: 'clamp(32px, 3.65vw, 70px)',
        }}
      >
        <h2
          className="font-bold"
          style={{
            fontSize: 'clamp(28px, 3.33vw, 64px)',
            marginBottom: 'clamp(12px, 1.04vw, 20px)',
          }}
        >
          Why us?
        </h2>
        <div
          className="font-semibold text-white leading-snug"
          style={{ fontSize: 'clamp(15px, 1.67vw, 32px)', maxWidth: '800px' }}
        >
          <p>All Mechanic 128 workshops employ the latest</p>
          <p>test techniques and digital information</p>
          <p>systems. This ideal combination ensures</p>
          <p>systematic vehicle diagnosis and qualified</p>
          <p>repair work.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — Figma: centered "SERVICES" title (Poppins Bold 64px)
          3 columns with stair-step numbers:
            num1: top:2406, num2: top:2363, num3: top:2320 → descending by ~43px
            Numbers: Sora Bold 128px
            Titles: Poppins Bold 64px
            Desc: Poppins SemiBold 32px, color #8b8888, w:336px centered
      ═══════════════════════════════════════════ */}
      <section
        id="services-section"
        data-animate
        className={`w-full ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: 'clamp(32px, 3.13vw, 60px)',
          paddingBottom: 'clamp(32px, 3.65vw, 70px)',
          paddingLeft: 'clamp(24px, 4.53vw, 87px)',
          paddingRight: 'clamp(24px, 4.53vw, 87px)',
        }}
      >
        <h2
          className="font-bold text-center"
          style={{
            fontSize: 'clamp(32px, 3.33vw, 64px)',
            fontFamily: "'Poppins', sans-serif",
            marginBottom: 'clamp(40px, 4.17vw, 80px)',
          }}
        >
          SERVICES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1700px] mx-auto" style={{ gap: 'clamp(24px, 2.6vw, 50px)' }}>
          {SERVICES.map((svc, i) => (
            <div key={i} className="text-center relative" style={{ marginTop: `clamp(0px, ${(2 - i) * 2.24}vw, ${(2 - i) * 43}px)` }}>
              {/* Large background number — stair-step: each higher by ~43px
                  Figma: Sora Bold 128px, black fill (barely visible on black bg)
                  We use a subtle outlined style to match the Figma look */}
              <p
                className="font-bold leading-none select-none"
                style={{
                  fontSize: 'clamp(56px, 6.67vw, 128px)',
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255,255,255,0.08)',
                  marginBottom: 'clamp(-16px, -1.04vw, -20px)',
                }}
              >
                {svc.num}
              </p>
              {/* Title — Figma: Poppins Bold 64px */}
              <p
                className="font-bold text-white relative z-10 leading-none"
                style={{
                  fontSize: 'clamp(22px, 3.33vw, 64px)',
                  fontFamily: "'Poppins', sans-serif",
                  marginBottom: 'clamp(12px, 1.04vw, 20px)',
                }}
              >
                {svc.title}
              </p>
              {/* Description — Figma: Poppins SemiBold 32px, #8b8888, w:336px, centered */}
              <p
                className="font-semibold leading-snug mx-auto"
                style={{
                  fontSize: 'clamp(13px, 1.67vw, 32px)',
                  color: '#8b8888',
                  maxWidth: 'clamp(200px, 17.5vw, 336px)',
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
          IMAGE GALLERY — Figma: 4 cards in a row
          Each card: 403×491, border-5 white, rounded-15
          Left offsets: 80, 527, 986, 1436
          403/1920 = 20.99vw per card
          Label: Sora ExtraBold 40px, bottom area (~top:390 within card)
      ═══════════════════════════════════════════ */}
      <section
        id="gallery"
        data-animate
        className={`w-full ${visible['gallery'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: 'clamp(20px, 2.08vw, 40px)',
          paddingBottom: 'clamp(32px, 3.65vw, 70px)',
          paddingLeft: 'clamp(24px, 4.17vw, 80px)',
          paddingRight: 'clamp(24px, 4.17vw, 80px)',
        }}
      >
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'clamp(12px, 1.2vw, 23px)' }}
        >
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className="relative border-white rounded-[15px] overflow-hidden group cursor-pointer"
              style={{
                aspectRatio: '403 / 491',
                borderWidth: 'clamp(3px, 0.26vw, 5px)',
                borderStyle: 'solid',
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Label — Figma: Sora ExtraBold 40px, left:85px bottom area */}
              <p
                className="absolute font-extrabold text-white leading-none z-10"
                style={{
                  fontSize: 'clamp(14px, 2.08vw, 40px)',
                  bottom: 'clamp(14px, 2.08vw, 40px)',
                  left: 'clamp(14px, 4.43vw, 85px)',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MEET OUR SPECIALISTS — Figma:
          Title: Sora Bold 64px, left:59px
          4 portrait cards: 406×453, border-5 white, rounded-15
          Shadow: 0px 4px 20px 10px rgba(255,255,255,0.5)
          Left offsets: 69, 527, 987, 1445
          Name: Sora SemiBold 36px, white
          Role: Sora Regular 20px, #9e9e9e
      ═══════════════════════════════════════════ */}
      <section
        id="specialists"
        data-animate
        className={`w-full ${visible['specialists'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: 'clamp(20px, 2.08vw, 40px)',
          paddingBottom: 'clamp(40px, 4.17vw, 80px)',
          paddingLeft: 'clamp(24px, 3.59vw, 69px)',
          paddingRight: 'clamp(24px, 3.59vw, 69px)',
        }}
      >
        <h2
          className="font-bold leading-none"
          style={{
            fontSize: 'clamp(24px, 3.33vw, 64px)',
            marginBottom: 'clamp(32px, 3.65vw, 70px)',
          }}
        >
          MEET OUR SPECIALISTS
        </h2>

        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'clamp(12px, 2.08vw, 40px)' }}
        >
          {SPECIALISTS.map((spec, i) => (
            <div key={i} className="group">
              {/* Portrait — Figma: 406×453, border-5 white, rounded-15, white glow shadow */}
              <div
                className="relative border-white rounded-[15px] overflow-hidden"
                style={{
                  aspectRatio: '406 / 453',
                  borderWidth: 'clamp(3px, 0.26vw, 5px)',
                  borderStyle: 'solid',
                  boxShadow: '0px 4px 20px 10px rgba(255, 255, 255, 0.5)',
                }}
              >
                <img
                  src={spec.img}
                  alt={spec.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Name — Figma: Sora SemiBold 36px, 36/1920 = 1.875vw */}
              <p
                className="font-semibold leading-none"
                style={{
                  fontSize: 'clamp(16px, 1.88vw, 36px)',
                  marginTop: 'clamp(10px, 1.04vw, 20px)',
                }}
              >
                {spec.name}
              </p>
              {/* Role — Figma: Sora Regular 20px, color #9e9e9e */}
              <p
                className="font-normal leading-none"
                style={{
                  fontSize: 'clamp(11px, 1.04vw, 20px)',
                  color: '#9e9e9e',
                  marginTop: 'clamp(4px, 0.52vw, 10px)',
                }}
              >
                {spec.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT / APPOINTMENT SECTION
          Figma: dark #161616 card at left:88, w:949, h:968, rounded-20
          Form fields: 2-col layout, inputs with border white, rounded-20, bg #161616
          Input height: 74px
          Message textarea: h:169px
          Right side: "GET A FREE APPOINTMENT" Sora Bold 64px at left:1314
          Social icons: 40×40
          "Get a Workshop now" button: red, 496×74, rounded-full
      ═══════════════════════════════════════════ */}
      <section
        id="contact-section"
        data-animate
        className={`w-full ${visible['contact-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: 'clamp(20px, 2.08vw, 40px)',
          paddingBottom: 'clamp(40px, 4.17vw, 80px)',
          paddingLeft: 'clamp(24px, 4.58vw, 88px)',
          paddingRight: 'clamp(24px, 4.58vw, 88px)',
        }}
      >
        <div className="flex flex-col lg:flex-row items-start" style={{ gap: 'clamp(32px, 4.17vw, 80px)' }}>

          {/* ─── Left: Form Card ───
              Figma: w:949, h:968, bg #161616, rounded-20
              949/1920 = 49.4vw */}
          <div
            className="w-full lg:flex-shrink-0 rounded-[20px]"
            style={{
              backgroundColor: '#161616',
              padding: 'clamp(20px, 2.92vw, 56px)',
              maxWidth: '949px',
              width: '100%',
            }}
          >
            <form onSubmit={handleFormSubmit}>
              {/* Row 1: Name + Phone */}
              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: 'clamp(16px, 1.56vw, 30px)', marginBottom: 'clamp(20px, 1.56vw, 30px)' }}
              >
                <div>
                  <label
                    className="block font-semibold"
                    style={{
                      fontSize: 'clamp(14px, 1.25vw, 24px)',
                      marginBottom: 'clamp(6px, 0.52vw, 10px)',
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: 'clamp(48px, 3.85vw, 74px)',
                      padding: '0 clamp(12px, 1.04vw, 20px)',
                      fontSize: 'clamp(14px, 0.83vw, 16px)',
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block font-semibold"
                    style={{
                      fontSize: 'clamp(14px, 1.25vw, 24px)',
                      marginBottom: 'clamp(6px, 0.52vw, 10px)',
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: 'clamp(48px, 3.85vw, 74px)',
                      padding: '0 clamp(12px, 1.04vw, 20px)',
                      fontSize: 'clamp(14px, 0.83vw, 16px)',
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Car model + Email */}
              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: 'clamp(16px, 1.56vw, 30px)', marginBottom: 'clamp(20px, 1.56vw, 30px)' }}
              >
                <div>
                  <label
                    className="block font-semibold"
                    style={{
                      fontSize: 'clamp(14px, 1.25vw, 24px)',
                      marginBottom: 'clamp(6px, 0.52vw, 10px)',
                    }}
                  >
                    Car model
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: 'clamp(48px, 3.85vw, 74px)',
                      padding: '0 clamp(12px, 1.04vw, 20px)',
                      fontSize: 'clamp(14px, 0.83vw, 16px)',
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block font-semibold"
                    style={{
                      fontSize: 'clamp(14px, 1.25vw, 24px)',
                      marginBottom: 'clamp(6px, 0.52vw, 10px)',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: 'clamp(48px, 3.85vw, 74px)',
                      padding: '0 clamp(12px, 1.04vw, 20px)',
                      fontSize: 'clamp(14px, 0.83vw, 16px)',
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Car Reg + NID */}
              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: 'clamp(16px, 1.56vw, 30px)', marginBottom: 'clamp(20px, 1.56vw, 30px)' }}
              >
                <div>
                  <label
                    className="block font-semibold"
                    style={{
                      fontSize: 'clamp(14px, 1.25vw, 24px)',
                      marginBottom: 'clamp(6px, 0.52vw, 10px)',
                    }}
                  >
                    Car Reg Number
                  </label>
                  <input
                    type="text"
                    name="carReg"
                    value={formData.carReg}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: 'clamp(48px, 3.85vw, 74px)',
                      padding: '0 clamp(12px, 1.04vw, 20px)',
                      fontSize: 'clamp(14px, 0.83vw, 16px)',
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block font-semibold"
                    style={{
                      fontSize: 'clamp(14px, 1.25vw, 24px)',
                      marginBottom: 'clamp(6px, 0.52vw, 10px)',
                    }}
                  >
                    NID Number
                  </label>
                  <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    className="w-full border border-white rounded-[20px] text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: 'clamp(48px, 3.85vw, 74px)',
                      padding: '0 clamp(12px, 1.04vw, 20px)',
                      fontSize: 'clamp(14px, 0.83vw, 16px)',
                    }}
                  />
                </div>
              </div>

              {/* Row 4: Message — Figma: h:169px, full width, rounded-20 */}
              <div style={{ marginBottom: 'clamp(24px, 2.08vw, 40px)' }}>
                <label
                  className="block font-semibold"
                  style={{
                    fontSize: 'clamp(14px, 1.25vw, 24px)',
                    marginBottom: 'clamp(6px, 0.52vw, 10px)',
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-white rounded-[20px] text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                  style={{
                    backgroundColor: '#161616',
                    height: 'clamp(100px, 8.8vw, 169px)',
                    padding: 'clamp(12px, 1.04vw, 20px)',
                    fontSize: 'clamp(14px, 0.83vw, 16px)',
                  }}
                />
              </div>

              {/* Submit — Figma: red bg, white border, 496×74, Sora Bold 32px, rounded-full */}
              <button
                type="submit"
                className="text-white font-bold rounded-full border border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
                style={{
                  backgroundColor: 'red',
                  fontSize: 'clamp(16px, 1.67vw, 32px)',
                  padding: 'clamp(10px, 1.09vw, 21px) clamp(32px, 4.38vw, 84px)',
                }}
              >
                Get a Workshop now
              </button>
            </form>
          </div>

          {/* ─── Right: Contact Info ───
              Figma: starts at left:1314, which is 1314/1920 = 68.4% from left
              "GET A FREE" + "APPOINTMENT": Sora Bold 64px
              Social icons: 40×40 at top:5071
              Email: icon + text at top:5152
              Location: icon + text at top:5240
              Phone: icon + text at top:5455
          */}
          <div className="w-full lg:w-auto flex flex-col justify-start pt-0 lg:pt-0">
            {/* Title — Figma: Sora Bold 64px */}
            <h2
              className="font-bold leading-none"
              style={{
                fontSize: 'clamp(24px, 3.33vw, 64px)',
                marginBottom: 'clamp(4px, 0.31vw, 6px)',
              }}
            >
              GET A FREE
            </h2>
            <h2
              className="font-bold leading-none"
              style={{
                fontSize: 'clamp(24px, 3.33vw, 64px)',
                marginBottom: 'clamp(24px, 2.6vw, 50px)',
              }}
            >
              APPOINTMENT
            </h2>

            {/* Social icons — Figma: 40×40 each, gap between them */}
            <div
              className="flex items-center mb-8"
              style={{ gap: 'clamp(16px, 1.56vw, 30px)', marginBottom: 'clamp(24px, 2.6vw, 50px)' }}
            >
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
            <div className="flex items-center" style={{ gap: 'clamp(10px, 1.04vw, 20px)', marginBottom: 'clamp(16px, 1.56vw, 30px)' }}>
              <div className="shrink-0" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconMail} alt="Email" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <p className="font-bold" style={{ fontSize: 'clamp(12px, 1.04vw, 20px)' }}>mrahman2331077@bscse.uiu.ac.bd</p>
            </div>

            {/* Address */}
            <div className="flex items-center" style={{ gap: 'clamp(10px, 1.04vw, 20px)', marginBottom: 'clamp(16px, 1.56vw, 30px)' }}>
              <div className="shrink-0" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconLocation} alt="Location" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <p className="font-bold" style={{ fontSize: 'clamp(12px, 1.04vw, 20px)' }}>Lane 1 Block A Baridhara Dohs</p>
            </div>

            {/* Phone numbers */}
            <div className="flex items-start" style={{ gap: 'clamp(10px, 1.04vw, 20px)' }}>
              <div className="shrink-0 mt-1" style={{ width: 'clamp(28px, 2.08vw, 40px)', height: 'clamp(28px, 2.08vw, 40px)' }}>
                <img src={IMAGES.iconPhone} alt="Phone" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: 'clamp(12px, 1.04vw, 20px)' }}>+8801304098448</p>
                <p className="font-bold" style={{ fontSize: 'clamp(12px, 1.04vw, 20px)', marginTop: 'clamp(4px, 0.42vw, 8px)' }}>+8801516520602</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

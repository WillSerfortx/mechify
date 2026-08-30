import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GalleryCard from '../components/GalleryCard';

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
  iconInstagram: '/images/workshop/icon-instagram.png',
  iconFacebook: '/images/workshop/icon-facebook.png',
  iconSocial: '/images/workshop/icon-social.png',
  iconLocation: '/images/workshop/icon-location.png',
  iconPhone: '/images/workshop/icon-phone.png',
  iconMail: '/images/workshop/icon-mail.png',
};

/* ─────────────────────────────────────────────────────────────────
   Figma canvas = 1920px wide.
   All px values from Figma are converted to vw via: val / 1920 * 100
   We use clamp(min, vw, max) so it looks right at any viewport.
   
   Figma key Y positions (absolute):
     Hero image:       top:-156  h:1280  → visible hero = ~778px
     Back button:      top:778   left:0   90×90  border-10
     Service cards:    top:~1056  left:87/681/1280  553×468
     "Why us?":        top:1618  left:87
     "Why us?" body:   top:1748  left:87
     "SERVICES" title: top:~2200 centered
     Numbers 1/2/3:    top:2406/2363/2320
     Titles:           top:2537/2506/2455
     Descs:            top:2620
     Gallery:          top:3166  left:80/527/986/1436  403×491
     Specialists title:top:3925  left:59
     Specialist cards: top:4069  left:69/527/987/1445  406×453
     Names:            top:4544
     Roles:            top:4594-4600
     Form card:        top:4916  left:88  w:949  h:968  rounded-20
     "GET A FREE":     top:4863  left:1314
     "APPOINTMENT":    top:4925  left:1314
     Social icons:     top:5071  left:1314/1392/1469
     Email:            top:5152-5162
     Address:          top:5240-5244
     Phone:            top:5455-5504
     Submit button:    top:5719  left:126  496×74
────────────────────────────────────────────────────────────────── */

/* Helpers for converting Figma px to responsive vw */
const vw = (px) => `${(px / 1920 * 100).toFixed(3)}vw`;
const responsive = (px, minRatio = 0.4) => `clamp(${Math.round(px * minRatio)}px, ${vw(px)}, ${px}px)`;

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
  {
    img: IMAGES.gallerySchedule,
    label: 'SCHEDULE',
    line1: 'Book your service easily at a time ',
    line2: 'that fits your schedule.',
    titleDefaultTop: '79.43%',
    titleHoverTop: '60.69%',
    descHoverTop: '79.63%',
    imageHoverShift: '-15%',
  },
  {
    img: IMAGES.galleryEngine,
    label: 'ENGINE',
    line1: 'Expert engine diagnostics and',
    line2: 'repairs for smooth performance.',
    titleDefaultTop: '79.43%',
    titleHoverTop: '61.91%',
    descHoverTop: '81.05%',
    imageHoverShift: '-15%',
  },
  {
    img: IMAGES.galleryPainting,
    label: 'PAINTING',
    line1: 'Premium paintwork to restore your',
    line2: 'car’s original shine.',
    titleDefaultTop: '79.43%',
    titleHoverTop: '64.76%',
    descHoverTop: '83.09%',
    imageHoverShift: '-15%',
  },
  {
    img: IMAGES.galleryDetailing,
    label: 'DETAILING',
    line1: 'Complete interior and exterior ',
    line2: 'detailing for a fresh look.',
    titleDefaultTop: '79.43%',
    titleHoverTop: '66.19%',
    descHoverTop: '84.92%',
    imageHoverShift: '-15%',
  },
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

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
          Figma: image36 w:1920 h:1280 top:-156px
          Visible hero area ≈ 778px (where back button sits at top:778)
          778 / 1920 = 40.52vw
          Title1: left:56 top:158 → 158/778 = 20.3% from top
          Title2: left:56 top:250
          Subtitle: left:56 top:397
          CTA: left:95 top:526 w:496 h:74
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: responsive(778) }}
      >
        {/* Background image — Figma: 1920×1280, positioned at top:-156 */}
        <img
          src={IMAGES.heroBg}
          alt="Auto repair workshop"
          className="absolute w-full object-cover pointer-events-none"
          style={{
            top: responsive(-156, 1),
            height: responsive(1280),
            left: 0,
          }}
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

        {/* Text content — positioned absolutely to match Figma coords */}
        <div className="absolute inset-0 z-10 animate-slideInLeft">
          {/* Title line 1 — Figma: Sora Bold 96px, left:56 top:158 */}
          <p
            className="absolute font-bold text-white leading-none whitespace-nowrap"
            style={{
              fontSize: responsive(96),
              left: responsive(56),
              top: responsive(158),
            }}
          >
            Professional Car Repair{' '}
          </p>

          {/* Title line 2 — Figma: left:56 top:250 */}
          <p
            className="absolute font-bold text-white leading-none whitespace-nowrap"
            style={{
              fontSize: responsive(96),
              left: responsive(56),
              top: responsive(250),
            }}
          >
            And Maintenance
          </p>

          {/* Subtitle — Figma: Sora Regular 32px, left:56 top:397 */}
          <div
            className="absolute font-normal text-white/90"
            style={{
              fontSize: responsive(32),
              left: responsive(56),
              top: responsive(397),
              lineHeight: '0.962',
            }}
          >
            <p style={{ marginBottom: '0.2em' }}>We are focused on providing our clients with the highest</p>
            <p> level of quality and excellent customer support</p>
          </div>

          {/* CTA Button — Figma: left:95 top:526, 496×74, red bg, border white, rounded-40 */}
          <a
            href="#contact-section"
            className="absolute inline-flex items-center justify-center text-white font-bold border border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
            style={{
              backgroundColor: 'red',
              fontSize: responsive(32),
              left: responsive(95),
              top: responsive(526),
              width: responsive(496),
              height: responsive(74),
              borderRadius: responsive(40),
            }}
          >
            Get an Appointment now
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BACK BUTTON — Figma: left:0 top:778, 90×90, border-10 white
          Sits flush against the left edge, directly below hero
      ═══════════════════════════════════════════════════════════ */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center bg-black hover:bg-white/10 transition-colors"
          style={{
            width: responsive(90),
            height: responsive(90),
            borderWidth: responsive(10),
            borderStyle: 'solid',
            borderColor: 'white',
          }}
          aria-label="Go back"
        >
          <svg style={{ width: responsive(36), height: responsive(36) }} fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SERVICE CARDS — Figma: 3 cards
          Card1: left:87  top:1062  553×468 rounded-40 border-5  (Performance Check)
          Card2: left:681 top:1056  553×468  (Auto Repair)
          Card3: left:1280 top:1053 553×468  (Fleet Service)
          
          Gap between cards:
            681 - (87+553) = 41px
            1280 - (681+553) = 46px  ≈ ~44px average
          Padding left: 87px, right: 1920-(1280+553) = 87px → symmetrical
          Icons: 128×128 centered in card
          Labels: Sora Bold 40px, centered
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="service-cards"
        data-animate
        className={`w-full ${visible['service-cards'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          /* Figma: gap between hero bottom (778+90=868 for back btn) and cards top (1053)
             = ~185px gap from back button bottom. We use padding. */
          paddingTop: responsive(130),
          paddingBottom: responsive(80),
          paddingLeft: responsive(87),
          paddingRight: responsive(87),
        }}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ gap: responsive(44) }}
        >
          {SERVICE_CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-black border-white flex flex-col items-center justify-center cursor-pointer group hover:bg-white/5 transition-all duration-300 overflow-hidden"
              style={{
                aspectRatio: '553 / 468',
                borderWidth: responsive(5),
                borderStyle: 'solid',
                borderRadius: responsive(40),
              }}
            >
              {/* Icon — Figma: 128×128, positioned roughly center-top of card */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: responsive(128),
                  height: responsive(128),
                  marginBottom: responsive(40),
                }}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-full object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* Title — Figma: Sora Bold 40px */}
              <p className="font-bold text-white text-center leading-none" style={{ fontSize: responsive(40) }}>{card.title}</p>
              <p className="font-bold text-white text-center leading-none" style={{ fontSize: responsive(40), marginTop: responsive(8) }}>{card.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHY US?
          Figma: "Why us?" at approx top:1618 left:87 (derived from screenshot)
          Body text: top:1748 left:87, Sora SemiBold 32px, white
          Gap between title and body: ~130px? No — title is smaller.
          From screenshot: title appears ~48px, body 32px
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="why-us"
        data-animate
        className={`w-full ${visible['why-us'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingLeft: responsive(87),
          paddingRight: responsive(87),
          paddingBottom: responsive(100),
        }}
      >
        <h2
          className="font-bold"
          style={{
            fontSize: responsive(64),
            marginBottom: responsive(30),
          }}
        >
          Why us?
        </h2>
        <div
          className="font-semibold text-white"
          style={{
            fontSize: responsive(32),
            lineHeight: '0.962',
          }}
        >
          <p style={{ marginBottom: responsive(6) }}>All Mechanic 128 workshops employ the latest</p>
          <p style={{ marginBottom: responsive(6) }}>test techniques and digital information</p>
          <p style={{ marginBottom: responsive(6) }}>systems. This ideal combination ensures</p>
          <p style={{ marginBottom: responsive(6) }}>systematic vehicle diagnosis and qualified</p>
          <p>repair work.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES SECTION — Figma exact layout
          
          "SERVICES" centered title: Poppins Bold 64px
          
          3-column STAIR-STEP layout (ascending left→right):
            Number 1: top:2406  Sora Bold 128px  (black on black = subtle)
            Number 2: top:2363  (43px higher)
            Number 3: top:2320  (86px higher than #1)
            
            Title "Inspection":  top:2537  Poppins Bold 64px
            Title "Diagnostic":  top:2506  (31px higher)
            Title "Upgrades":    top:2455  (82px higher than #1)
            
            KEY: Descriptions ALL at same baseline (~top:2620)
            Desc text: Poppins SemiBold 32px, #8b8888, w:336, centered
          
          The stair-step only affects numbers+titles.
          Descriptions stay level — they form a horizontal baseline.
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="services-section"
        data-animate
        className={`w-full ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: responsive(60),
          paddingBottom: responsive(80),
          paddingLeft: responsive(87),
          paddingRight: responsive(87),
        }}
      >
        <h2
          className="font-bold text-center text-white"
          style={{
            fontSize: responsive(64),
            fontFamily: "'Poppins', sans-serif",
            marginBottom: responsive(100),
          }}
        >
          SERVICES
        </h2>

        {/* 3-column stair-step grid.
            Each column is a flex-column. The number+title section gets a 
            padding-top for the stair-step offset, while descriptions stay
            aligned at the bottom via margin-top:auto on description wrapper. */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 mx-auto"
          style={{
            maxWidth: responsive(1640),
            gap: responsive(30),
          }}
        >
          {SERVICES.map((svc, i) => {
            /* Figma stair-step: num tops are 2406, 2363, 2320
               Col1 is lowest (most padding), Col3 is highest (no padding)
               Offsets relative to Col3: col1=+86, col2=+43, col3=0 */
            const stairPad = [86, 43, 0];
            return (
              <div
                key={i}
                className="flex flex-col items-center"
              >
                {/* Stair-step spacer — only pushes number+title down */}
                <div style={{ height: responsive(stairPad[i]), flexShrink: 0 }} />

                {/* Number + Title wrapper (positioned together) */}
                <div className="relative text-center w-full">
                  {/* Large background number — Figma: Sora Bold 128px
                      In Figma: color is black on black (text-black).
                      Visually appears as a subtle dark embossed number.
                      We render it as a faint outlined number behind the title. */}
                  <p
                    className="font-bold leading-none select-none text-center"
                    style={{
                      fontSize: responsive(128),
                      color: '#111111',
                      WebkitTextStroke: `${responsive(1)} rgba(255,255,255,0.04)`,
                      position: 'relative',
                      zIndex: 0,
                    }}
                  >
                    {svc.num}
                  </p>
                  {/* Title — Figma: Poppins Bold 64px, white
                      Positioned to overlap slightly with bottom of number.
                      In Figma, gap from number top to title top:
                        col1: 2537-2406=131px, col2: 2506-2363=143px, col3: 2455-2320=135px
                      With 128px font at 0.962 leading = ~123px number height,
                      titles start ~8-20px below number bottom.
                      We use a negative margin to pull title up slightly into number space. */}
                  <p
                    className="font-bold text-white leading-none text-center"
                    style={{
                      fontSize: responsive(64),
                      fontFamily: "'Poppins', sans-serif",
                      marginTop: responsive(-20),
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {svc.title}
                  </p>
                </div>

                {/* Description — Figma: Poppins SemiBold 32px, #8b8888, w:336
                    All 3 descriptions sit at the SAME Y baseline (~top:2620).
                    Gap from title to desc varies per column because of stair-step:
                      col1: 2620-2537-62(font)=21px
                      col2: 2620-2506-62=52px
                      col3: 2617-2455-62=100px
                    We achieve same baseline by giving each desc a fixed top margin 
                    that compensates for the stair offset. */}
                <div
                  className="text-center w-full"
                  style={{
                    marginTop: responsive([21, 52, 100][i]),
                  }}
                >
                  <p
                    className="font-semibold mx-auto"
                    style={{
                      fontSize: responsive(32),
                      color: '#8b8888',
                      width: responsive(336),
                      maxWidth: '100%',
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: '1.2',
                      textAlign: 'center',
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IMAGE GALLERY — Figma: 4 cards in a row
          Card1: left:80   top:3167  403×491  border-5 rounded-15
          Card2: left:527  top:3166
          Card3: left:986  top:3166
          Card4: left:1436 top:3165
          
          Gaps: 527-(80+403)=44, 986-(527+403)=56, 1436-(986+403)=47 → ~49px avg
          Padding left: 80, right: 1920-(1436+403)=81
          
          Labels: Sora ExtraBold 40px, at bottom-left (~left:85 top:390 within card)
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="gallery"
        data-animate
        className={`w-full ${visible['gallery'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: responsive(40),
          paddingBottom: responsive(80),
          paddingLeft: responsive(80),
          paddingRight: responsive(81),
        }}
      >
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: responsive(44) }}
        >
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
              responsiveHelper={responsive}
              onClick={() => navigate('/workshop-select')}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MEET OUR SPECIALISTS
          Figma: title at left:59 top:3925, Sora Bold 64px
          
          Cards: 406×453, border-5 white, rounded-15
          Shadow: 0px 4px 20px 10px rgba(255,255,255,0.5)
          Card1: left:69  top:4069
          Card2: left:527 top:4069
          Card3: left:987 top:4069
          Card4: left:1445 top:4069
          
          Gaps: 527-(69+406)=52, 987-(527+406)=54, 1445-(987+406)=52 → ~53px
          Padding left:69, right: 1920-(1445+406)=69 → symmetrical
          
          Names: Sora SemiBold 36px, white, top:4544 → 4544-4069-453=22px below card
          Roles: Sora Regular 20px, #9e9e9e, top:4594-4600 → ~50px below names? No.
                 4594-4544=50px? With 36px font → about 14px gap
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="specialists"
        data-animate
        className={`w-full ${visible['specialists'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: responsive(40),
          paddingBottom: responsive(80),
          paddingLeft: responsive(69),
          paddingRight: responsive(69),
        }}
      >
        <h2
          className="font-bold leading-none"
          style={{
            fontSize: responsive(64),
            marginBottom: responsive(75),
            paddingLeft: responsive(0), /* title is at left:59, section padding is 69 → -10px offset, close enough */
          }}
        >
          MEET OUR SPECIALISTS
        </h2>

        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: responsive(53) }}
        >
          {SPECIALISTS.map((spec, i) => (
            <div key={i} className="group">
              {/* Portrait — Figma: 406×453, border-5 white, rounded-15, white glow */}
              <div
                className="relative border-white overflow-hidden"
                style={{
                  aspectRatio: '406 / 453',
                  borderWidth: responsive(5),
                  borderStyle: 'solid',
                  borderRadius: responsive(15),
                  boxShadow: '0px 4px 20px 10px rgba(255, 255, 255, 0.5)',
                }}
              >
                <img
                  src={spec.img}
                  alt={spec.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Name — Figma: Sora SemiBold 36px, 22px below card bottom */}
              <p
                className="font-semibold leading-none"
                style={{
                  fontSize: responsive(36),
                  marginTop: responsive(22),
                }}
              >
                {spec.name}
              </p>
              {/* Role — Figma: Sora Regular 20px, #9e9e9e, ~14px below name */}
              <p
                className="font-normal leading-none"
                style={{
                  fontSize: responsive(20),
                  color: '#9e9e9e',
                  marginTop: responsive(14),
                }}
              >
                {spec.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT / APPOINTMENT SECTION
          Figma layout (2-column):
          
          LEFT — Form card:
            Card: left:88 top:4916 w:949 h:968 bg:#161616 rounded-20
            
            Labels are Sora SemiBold 24px
            Inputs: bg:#161616 border-white h:74 rounded-20
            
            Row 1 (Name/Phone):
              Name label:  left:124 top:4972 → offset from card: x:36, y:56
              Name input:  left:124 top:5018 w:409 h:74
              Phone label: left:581 top:4972
              Phone input: left:581 top:5011 w:409 h:74
            
            Row 2 (Car model/Email):
              Car model label: left:125 top:5140
              Car model input: left:124 top:5186 w:409
              Email label:     left:582 top:5143
              Email input:     left:581 top:5186 w:409
            
            Row 3 (Car Reg/NID):
              Car Reg label: left:126 top:5288
              Car Reg input: left:125 top:5326 w:409
              NID label:     left:587 top:5285
              NID input:     left:587 top:5326 w:409
            
            Message label: left:126 top:5446
            Message input: left:126 top:5504 w:865 h:169
            
            Button: left:126 top:5719 w:496 h:74 red rounded-40
          
          RIGHT — Contact info:
            "GET A FREE":    left:1314 top:4863 Sora Bold 64px
            "APPOINTMENT":   left:1314 top:4925
            
            Social icons at top:5071 (40×40 each):
              Instagram: left:1314
              Facebook:  left:1392 (gap: 78-40=38px between icons)
              Social/X:  left:1469 (gap: 1469-1392-40=37px)
            
            Email icon:    left:1314 top:5152
            Email text:    left:1382 top:5162 Sora Bold 20px
            
            Location icon: left:1314 top:5240
            Location text: left:1375 top:5244
            
            Phone icon:    left:1314 top:5455
            Phone text 1:  left:1382 top:5459
            Phone text 2:  left:1382 top:5504
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="contact-section"
        data-animate
        className={`w-full ${visible['contact-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}
        style={{
          paddingTop: responsive(60),
          paddingBottom: responsive(80),
          paddingLeft: responsive(88),
          paddingRight: responsive(88),
        }}
      >
        <div className="flex flex-col lg:flex-row items-start" style={{ gap: responsive(277) }}>
          {/* 277 = 1314 - (88 + 949) = gap between form card right edge and right-side text */}

          {/* ─── Left: Form Card ─── */}
          <div
            className="w-full lg:flex-shrink-0"
            style={{
              backgroundColor: '#161616',
              borderRadius: responsive(20),
              padding: `${responsive(56)} ${responsive(36)}`,
              maxWidth: responsive(949),
              width: '100%',
            }}
          >
            <form onSubmit={handleFormSubmit}>
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: responsive(48), marginBottom: responsive(46) }}>
                {/* gap = 581-124-409 = 48px (Figma horizontal gap between inputs) */}
                {/* marginBottom = 5140-5018-74-24 = label-to-label vertical spacing minus font */}
                <div>
                  <label className="block font-semibold" style={{ fontSize: responsive(24), marginBottom: responsive(22) }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-white text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: responsive(74),
                      borderRadius: responsive(20),
                      padding: `0 ${responsive(20)}`,
                      fontSize: responsive(18),
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold" style={{ fontSize: responsive(24), marginBottom: responsive(22) }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-white text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: responsive(74),
                      borderRadius: responsive(20),
                      padding: `0 ${responsive(20)}`,
                      fontSize: responsive(18),
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Car model + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: responsive(48), marginBottom: responsive(46) }}>
                <div>
                  <label className="block font-semibold" style={{ fontSize: responsive(24), marginBottom: responsive(22) }}>
                    Car model
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="w-full border border-white text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: responsive(74),
                      borderRadius: responsive(20),
                      padding: `0 ${responsive(20)}`,
                      fontSize: responsive(18),
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold" style={{ fontSize: responsive(24), marginBottom: responsive(22) }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-white text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: responsive(74),
                      borderRadius: responsive(20),
                      padding: `0 ${responsive(20)}`,
                      fontSize: responsive(18),
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Car Reg + NID */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: responsive(48), marginBottom: responsive(46) }}>
                <div>
                  <label className="block font-semibold" style={{ fontSize: responsive(24), marginBottom: responsive(22) }}>
                    Car Reg Number
                  </label>
                  <input
                    type="text"
                    name="carReg"
                    value={formData.carReg}
                    onChange={handleChange}
                    className="w-full border border-white text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: responsive(74),
                      borderRadius: responsive(20),
                      padding: `0 ${responsive(20)}`,
                      fontSize: responsive(18),
                    }}
                  />
                </div>
                <div>
                  <label className="block font-semibold" style={{ fontSize: responsive(24), marginBottom: responsive(22) }}>
                    NID Number
                  </label>
                  <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    className="w-full border border-white text-white focus:outline-none focus:border-red-500 transition-colors"
                    style={{
                      backgroundColor: '#161616',
                      height: responsive(74),
                      borderRadius: responsive(20),
                      padding: `0 ${responsive(20)}`,
                      fontSize: responsive(18),
                    }}
                  />
                </div>
              </div>

              {/* Message — Figma: w:865 h:169 full width within card */}
              <div style={{ marginBottom: responsive(46) }}>
                <label className="block font-semibold" style={{ fontSize: responsive(24), marginBottom: responsive(22) }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-white text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                  style={{
                    backgroundColor: '#161616',
                    height: responsive(169),
                    borderRadius: responsive(20),
                    padding: responsive(20),
                    fontSize: responsive(18),
                  }}
                />
              </div>

              {/* Submit button — Figma: red bg, border white, 496×74, rounded-40, Sora Bold 32px */}
              <button
                type="submit"
                className="inline-flex items-center justify-center text-white font-bold border border-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] active:scale-95"
                style={{
                  backgroundColor: 'red',
                  fontSize: responsive(32),
                  width: responsive(496),
                  maxWidth: '100%',
                  height: responsive(74),
                  borderRadius: responsive(40),
                }}
              >
                Get a Workshop now
              </button>
            </form>
          </div>

          {/* ─── Right: Contact Info ─── */}
          <div className="w-full lg:w-auto flex flex-col justify-start" style={{ flexShrink: 0 }}>
            {/* "GET A FREE" — Figma: Sora Bold 64px, top:4863 */}
            <h2
              className="font-bold leading-none"
              style={{
                fontSize: responsive(64),
                marginBottom: responsive(0),
              }}
            >
              GET A FREE
            </h2>
            {/* "APPOINTMENT" — Figma: top:4925, gap from above: 4925-4863=62px but with 64px font → ~-2px overlap */}
            <h2
              className="font-bold leading-none"
              style={{
                fontSize: responsive(64),
                marginTop: responsive(0),
                marginBottom: responsive(75),
              }}
            >
              APPOINTMENT
            </h2>

            {/* Social icons — Figma: 40×40 each at top:5071
                Instagram: left:1314, Facebook: left:1392 (gap:38), Social: left:1469 (gap:37) */}
            <div
              className="flex items-center"
              style={{
                gap: responsive(38),
                marginBottom: responsive(41),
                /* 5152 - 5071 - 40 = 41px gap to email */
              }}
            >
              <a href="#" className="hover:scale-110 transition-transform" style={{ width: responsive(40), height: responsive(40) }}>
                <img src={IMAGES.iconInstagram} alt="Instagram" className="w-full h-full object-contain brightness-0 invert" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform" style={{ width: responsive(40), height: responsive(40) }}>
                <img src={IMAGES.iconFacebook} alt="Facebook" className="w-full h-full object-contain brightness-0 invert" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform" style={{ width: responsive(40), height: responsive(40) }}>
                <img src={IMAGES.iconSocial} alt="Twitter" className="w-full h-full object-contain brightness-0 invert" />
              </a>
            </div>

            {/* Email — Figma: mail icon 40×40 at top:5152, text at left:1382 top:5162 */}
            <div
              className="flex items-center"
              style={{
                gap: responsive(28),
                /* icon-to-text: 1382-1314-40=28px */
                marginBottom: responsive(48),
                /* 5240-5152-40=48px to next icon */
              }}
            >
              <div className="shrink-0" style={{ width: responsive(40), height: responsive(40) }}>
                <img src={IMAGES.iconMail} alt="Email" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <p className="font-bold" style={{ fontSize: responsive(20) }}>mrahman2331077@bscse.uiu.ac.bd</p>
            </div>

            {/* Address — Figma: location icon at top:5240, text at top:5244 left:1375 */}
            <div
              className="flex items-center"
              style={{
                gap: responsive(21),
                /* 1375-1314-40=21px */
                marginBottom: responsive(175),
                /* 5455-5240-40=175px gap to phone section */
              }}
            >
              <div className="shrink-0" style={{ width: responsive(40), height: responsive(40) }}>
                <img src={IMAGES.iconLocation} alt="Location" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <p className="font-bold" style={{ fontSize: responsive(20) }}>Lane 1 Block A Baridhara Dohs</p>
            </div>

            {/* Phone — Figma: phone icon at top:5455, text at top:5459/5504 */}
            <div
              className="flex items-start"
              style={{
                gap: responsive(28),
                /* 1382-1314-40=28px */
              }}
            >
              <div className="shrink-0" style={{ width: responsive(40), height: responsive(40), marginTop: responsive(4) }}>
                <img src={IMAGES.iconPhone} alt="Phone" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: responsive(20) }}>+8801304098448</p>
                <p className="font-bold" style={{ fontSize: responsive(20), marginTop: responsive(25) }}>
                  {/* 5504-5459-20=25px gap */}
                  +8801516520602
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

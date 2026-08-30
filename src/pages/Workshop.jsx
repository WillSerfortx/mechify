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
    stairOffset: 86,
    descMargin: 21,
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
    stairOffset: 43,
    descMargin: 52,
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
    descMargin: 100,
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
          {/* CTA Button — Glowing Emergency Appointment Button */}
          <button
            onClick={() => navigate('/workshop-search')}
            className="absolute inline-flex items-center justify-center text-white font-bold border border-white transition-all duration-300 hover:scale-105 active:scale-95 animate-sosPulse cursor-pointer select-none"
            style={{
              backgroundColor: '#dc2626',
              fontSize: responsive(28),
              left: responsive(95),
              top: responsive(526),
              width: responsive(620),
              maxWidth: '90%',
              height: responsive(76),
              borderRadius: responsive(40),
              boxShadow: '0 0 35px rgba(220, 38, 38, 0.8), 0 0 70px rgba(220, 38, 38, 0.4)',
            }}
          >
            Get an Emergency appointment now
          </button>
        </div>
      </section>



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
            <ServiceFeatureCard
              key={i}
              icon={card.icon}
              titleLine1={card.titleLine1}
              titleLine2={card.titleLine2}
              descLines={card.descLines}
              defaultIconTop={card.defaultIconTop}
              defaultTitleTop={card.defaultTitleTop}
              hoverDescTop={card.hoverDescTop}
              responsiveHelper={responsive}
              onClick={() => navigate('/workshop-select')}
            />
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
            gap: responsive(40),
          }}
        >
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center"
            >
              {/* Stair-step spacer to position the number & title */}
              <div style={{ height: responsive(svc.stairOffset), flexShrink: 0 }} />

              {/* Number & Title Group */}
              <div className="flex flex-col items-center text-center w-full">
                {/* Hollow Outlined White Number */}
                <p
                  className="select-none text-center leading-none"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: responsive(110),
                    fontWeight: 800,
                    color: 'transparent',
                    WebkitTextStroke: `${responsive(2.5)} #ffffff`,
                    marginBottom: responsive(18),
                  }}
                >
                  {svc.num}
                </p>

                {/* Title (Inspection, Diagnostic, Upgrades) */}
                <h3
                  className="font-bold text-white text-center leading-none"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: responsive(54),
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {svc.title}
                </h3>
              </div>

              {/* Description Text — baseline aligned across all columns */}
              <div
                className="text-center w-full"
                style={{
                  marginTop: responsive(svc.descMargin),
                }}
              >
                <div
                  className="mx-auto text-center"
                  style={{
                    fontSize: responsive(22),
                    color: '#8b8888',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    lineHeight: '1.35',
                  }}
                >
                  {svc.lines.map((line, lineIdx) => (
                    <p key={lineIdx} className="m-0 leading-tight">
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
    </div>
  );
}

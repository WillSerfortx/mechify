import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScaleWrapper from '../components/ScaleWrapper';

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
  backIcon: 'http://localhost:3845/assets/5db0687702c36b358fbe28945225f47e373f5a09.png'
};

export default function Workshop() {
  const navigate = useNavigate();

  // For the service feature cards hover state
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <ScaleWrapper height={4800}>
      <div className="bg-black relative size-full font-sora">
        {/* ─── HERO SECTION ─── */}
        <div className="absolute left-0 top-[0px] w-[1920px] h-[1124px]">
          <img alt="" className="absolute inset-0 object-cover pointer-events-none size-full opacity-60" src={IMAGES.heroBg} />
          {/* Gradients to blend with black background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
        
        <p className="absolute font-bold leading-[0.962] left-[56px] text-[96px] text-white top-[158px] whitespace-nowrap">
          Professional Car Repair 
        </p>
        <p className="absolute font-bold leading-[0.962] left-[56px] text-[96px] text-white top-[250px] whitespace-nowrap">
          And Maintenance
        </p>
        
        <div className="absolute font-normal leading-[1.3] left-[56px] text-[32px] text-white top-[397px]">
          <p className="m-0">We are focused on providing our clients with the highest</p>
          <p className="m-0">level of quality and excellent customer support</p>
        </div>

        {/* Hero CTA Button */}
        <div 
          onClick={() => navigate('/workshop-search')}
          className="absolute cursor-pointer h-[74px] left-[95px] top-[526px] w-[496px] group"
        >
          <div className="absolute bg-[red] border border-solid border-white inset-0 rounded-[40px] transition-transform duration-300 group-hover:scale-105" />
          <p className="absolute font-bold inset-[28.38%_6.65%_29.73%_9.48%] leading-[0.962] text-[32px] text-white whitespace-nowrap text-center transition-transform duration-300 group-hover:scale-105 pointer-events-none">
            Get an Appointment now
          </p>
        </div>

        {/* Back Button */}
        <div 
          onClick={() => navigate(-1)}
          className="absolute border-10 border-solid border-white left-0 size-[90px] top-[778px] cursor-pointer hover:scale-105 transition-transform bg-black z-10 rounded-[10px]"
        >
          <img alt="back" className="absolute inset-0 object-contain size-full p-2" src={IMAGES.backIcon} />
        </div>

        {/* ─── FEATURE CARDS ─── */}
        {/* Performance Check */}
        <div 
          onMouseEnter={() => setHoveredCard('perf')}
          onMouseLeave={() => setHoveredCard(null)}
          className="absolute bg-black border-[5px] border-solid border-white h-[468px] left-[87px] overflow-hidden rounded-[40px] top-[1062px] w-[553px] transition-shadow hover:shadow-[0_0_35px_rgba(255,255,255,0.2)]"
        >
          <div 
            className="absolute left-[208px] top-[129px] transition-all duration-300 pointer-events-none"
            style={{
              top: hoveredCard === 'perf' ? '36%' : '129px',
              left: hoveredCard === 'perf' ? '50%' : '208px',
              transform: hoveredCard === 'perf' ? 'translateX(-50%)' : 'none',
              width: hoveredCard === 'perf' ? '50px' : '128px',
              height: hoveredCard === 'perf' ? '50px' : '128px'
            }}
          >
            <img alt="" className="absolute inset-0 object-cover size-full brightness-0 invert" src={IMAGES.iconPerformance} />
          </div>
          <div 
            className="absolute left-[274.5px] top-[296px] -translate-x-1/2 font-bold text-[40px] text-center text-white whitespace-nowrap transition-all duration-300 pointer-events-none"
            style={{ opacity: hoveredCard === 'perf' ? 0 : 1 }}
          >
            <p className="leading-[0.962] m-0">Performance</p>
            <p className="leading-[0.962] m-0">Check</p>
          </div>
          <div 
            className="absolute left-0 right-0 w-full px-4 text-center transition-all duration-300 pointer-events-none"
            style={{
              top: '245px',
              opacity: hoveredCard === 'perf' ? 1 : 0,
              transform: hoveredCard === 'perf' ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            <p className="font-bold text-[24px] text-white m-0 leading-tight">Comprehensive checks to ensure</p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">peak vehicle performance.</p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">Identify issues early and drive</p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">with confidence.</p>
          </div>
        </div>

        {/* Auto Repair */}
        <div 
          onMouseEnter={() => setHoveredCard('auto')}
          onMouseLeave={() => setHoveredCard(null)}
          className="absolute bg-black border-[5px] border-solid border-white h-[468px] left-[681px] overflow-hidden rounded-[40px] top-[1056px] w-[553px] transition-shadow hover:shadow-[0_0_35px_rgba(255,255,255,0.2)]"
        >
          <div 
            className="absolute left-[208px] top-[119px] transition-all duration-300 pointer-events-none"
            style={{
              top: hoveredCard === 'auto' ? '36%' : '119px',
              left: hoveredCard === 'auto' ? '50%' : '208px',
              transform: hoveredCard === 'auto' ? 'translateX(-50%)' : 'none',
              width: hoveredCard === 'auto' ? '50px' : '128px',
              height: hoveredCard === 'auto' ? '50px' : '128px'
            }}
          >
            <img alt="" className="absolute inset-0 object-cover size-full brightness-0 invert" src={IMAGES.iconRepair} />
          </div>
          <div 
            className="absolute left-[276.5px] top-[282px] -translate-x-1/2 font-bold text-[40px] text-center text-white whitespace-nowrap transition-all duration-300 pointer-events-none"
            style={{ opacity: hoveredCard === 'auto' ? 0 : 1 }}
          >
            <p className="leading-[0.962] m-0">Auto</p>
            <p className="leading-[0.962] m-0">Repair</p>
          </div>
          <div 
            className="absolute left-0 right-0 w-full px-4 text-center transition-all duration-300 pointer-events-none"
            style={{
              top: '255px',
              opacity: hoveredCard === 'auto' ? 1 : 0,
              transform: hoveredCard === 'auto' ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            <p className="font-bold text-[24px] text-white m-0 leading-tight">Reliable auto services to keep your</p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">car road-ready.</p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">From routine maintenance to major</p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">repairs,we handle it all.</p>
          </div>
        </div>

        {/* Fleet Service */}
        <div 
          onMouseEnter={() => setHoveredCard('fleet')}
          onMouseLeave={() => setHoveredCard(null)}
          className="absolute bg-black border-[5px] border-solid border-white h-[468px] left-[1280px] overflow-hidden rounded-[40px] top-[1053px] w-[553px] transition-shadow hover:shadow-[0_0_35px_rgba(255,255,255,0.2)]"
        >
          <div 
            className="absolute left-[208px] top-[140px] transition-all duration-300 pointer-events-none"
            style={{
              top: hoveredCard === 'fleet' ? '36%' : '140px',
              left: hoveredCard === 'fleet' ? '50%' : '208px',
              transform: hoveredCard === 'fleet' ? 'translateX(-50%)' : 'none',
              width: hoveredCard === 'fleet' ? '50px' : '128px',
              height: hoveredCard === 'fleet' ? '50px' : '128px'
            }}
          >
            <img alt="" className="absolute inset-0 object-cover size-full brightness-0 invert" src={IMAGES.iconFleet} />
          </div>
          <div 
            className="absolute left-[276.5px] top-[286px] -translate-x-1/2 font-bold text-[40px] text-center text-white whitespace-nowrap transition-all duration-300 pointer-events-none"
            style={{ opacity: hoveredCard === 'fleet' ? 0 : 1 }}
          >
            <p className="leading-[0.962] m-0">Fleet</p>
            <p className="leading-[0.962] m-0">Service</p>
          </div>
          <div 
            className="absolute left-0 right-0 w-full px-4 text-center transition-all duration-300 pointer-events-none"
            style={{
              top: '273px',
              opacity: hoveredCard === 'fleet' ? 1 : 0,
              transform: hoveredCard === 'fleet' ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            <p className="font-bold text-[24px] text-white m-0 leading-tight">Efficient maintenance solutions for</p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">commercial fleets.</p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">Keep your vehicles running smoothly </p>
            <p className="font-bold text-[24px] text-white m-0 leading-tight">with minimal downtime.</p>
          </div>
        </div>

        {/* ─── WHY US ─── */}
        <div className="absolute font-semibold leading-[1.3] left-[87px] top-[1748px] text-[32px] text-white">
          <p className="m-0">All Mechanic 128 workshops employ the latest</p>
          <p className="m-0">test techniques and digital information</p>
          <p className="m-0">systems. This ideal combination ensures</p>
          <p className="m-0">systematic vehicle diagnosis and qualified</p>
          <p className="m-0">repair work.</p>
        </div>

        {/* ─── STAIR-STEP SERVICES ─── */}
        {/* Inspection - 1 */}
        <p className="absolute font-bold leading-[0.962] left-[397px] text-[128px] text-transparent top-[2406px] whitespace-nowrap"
           style={{ WebkitTextStroke: '2px #000', filter: 'drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff)' }}
        >
          1
        </p>
        <p className="absolute font-bold font-poppins leading-[0.962] left-[262px] text-[64px] text-white top-[2537px] whitespace-nowrap">
          Inspection
        </p>
        <div className="absolute font-semibold font-poppins text-[#8b8888] text-[32px] text-center leading-[1.3] top-[2620px] left-[269px] w-[336px]">
          <p className="m-0">We can provide professional</p>
          <p className="m-0">servicing and maintenance work</p>
          <p className="m-0">with no loss of manufacturer</p>
          <p className="m-0">warranty coverage.</p>
        </div>

        {/* Diagnostic - 2 */}
        <p className="absolute font-bold leading-[0.962] left-[936px] text-[128px] text-transparent top-[2363px] whitespace-nowrap"
           style={{ WebkitTextStroke: '2px #000', filter: 'drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff)' }}
        >
          2
        </p>
        <p className="absolute font-bold font-poppins leading-[0.962] left-[810px] text-[64px] text-white top-[2506px] whitespace-nowrap">
          Diagnostic
        </p>
        <div className="absolute font-semibold font-poppins text-[#8b8888] text-[32px] text-center leading-[1.3] top-[2620px] left-[809px] w-[336px]">
          <p className="m-0">A computerized car diagnostic check from Mechanic 128 will give you a true picture of how your vehicle is running.</p>
        </div>

        {/* Upgrades - 3 */}
        <p className="absolute font-bold leading-[0.962] left-[1484px] text-[128px] text-transparent top-[2320px] whitespace-nowrap"
           style={{ WebkitTextStroke: '2px #000', filter: 'drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff)' }}
        >
          3
        </p>
        <p className="absolute font-bold font-poppins leading-[0.962] left-[1372px] text-[64px] text-white top-[2455px] whitespace-nowrap">
          Upgrades
        </p>
        <div className="absolute font-semibold font-poppins text-[#8b8888] text-[32px] text-center leading-[1.3] top-[2617px] left-[1372px] w-[336px]">
          <p className="m-0">Rather than sending your car for a basic service, ask Mechanic 128 for a thorough multi-point check and upgrade your car.</p>
        </div>


        {/* ─── GALLERY CARDS ─── */}
        {/* SCHEDULE */}
        <div className="absolute border-[5px] border-solid border-white h-[491px] left-[80px] overflow-hidden rounded-[15px] top-[3167px] w-[403px] group">
          <div className="absolute h-full w-full left-0 top-0 transition-transform duration-500 group-hover:scale-110">
            <img alt="" className="absolute inset-0 object-cover size-full" src={IMAGES.gallerySchedule} />
          </div>
          <p className="absolute font-extrabold leading-[0.962] left-[85px] text-[40px] text-white top-[390px] whitespace-nowrap transition-transform duration-500 group-hover:-translate-y-[80px]">
            SCHEDULE
          </p>
          <div className="absolute left-0 right-0 px-6 top-[400px] text-white font-bold text-[18px] text-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-[20px]">
            Easy online booking to get your car serviced at your convenience.
          </div>
        </div>

        {/* ENGINE */}
        <div className="absolute border-[5px] border-solid border-white h-[491px] left-[527px] overflow-hidden rounded-[15px] top-[3166px] w-[403px] group">
          <div className="absolute h-full w-full left-0 top-0 transition-transform duration-500 group-hover:scale-110">
            <img alt="" className="absolute inset-0 object-cover size-full" src={IMAGES.galleryEngine} />
          </div>
          <p className="absolute font-extrabold leading-[0.962] left-[114px] text-[40px] text-white top-[390px] whitespace-nowrap transition-transform duration-500 group-hover:-translate-y-[80px]">
            ENGINE
          </p>
          <div className="absolute left-0 right-0 px-6 top-[400px] text-white font-bold text-[18px] text-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-[20px]">
            Expert engine diagnostics and repairs for smooth performance.
          </div>
        </div>

        {/* PAINTING */}
        <div className="absolute border-[5px] border-solid border-white h-[491px] left-[986px] overflow-hidden rounded-[15px] top-[3166px] w-[403px] group">
          <div className="absolute h-full w-full left-0 top-0 transition-transform duration-500 group-hover:scale-110">
            <img alt="" className="absolute inset-0 object-cover size-full" src={IMAGES.galleryPainting} />
          </div>
          <p className="absolute font-extrabold leading-[0.962] left-[85px] text-[40px] text-white top-[390px] whitespace-nowrap transition-transform duration-500 group-hover:-translate-y-[80px]">
            PAINTING
          </p>
          <div className="absolute left-0 right-0 px-6 top-[400px] text-white font-bold text-[18px] text-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-[20px]">
            Premium paintwork to restore your car's original shine.
          </div>
        </div>

        {/* DETAILING */}
        <div className="absolute border-[5px] border-solid border-white h-[491px] left-[1436px] overflow-hidden rounded-[15px] top-[3165px] w-[403px] group">
          <div className="absolute h-full w-full left-0 top-0 transition-transform duration-500 group-hover:scale-110">
            <img alt="" className="absolute inset-0 object-cover size-full" src={IMAGES.galleryDetailing} />
          </div>
          <p className="absolute font-extrabold leading-[0.962] left-[85px] text-[40px] text-white top-[390px] whitespace-nowrap transition-transform duration-500 group-hover:-translate-y-[80px]">
            DETAILING
          </p>
          <div className="absolute left-0 right-0 px-6 top-[400px] text-white font-bold text-[18px] text-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-[20px]">
            Complete interior and exterior detailing for a fresh look.
          </div>
        </div>


        {/* ─── MEET OUR SPECIALISTS ─── */}
        <p className="absolute font-bold leading-[0.962] left-[59px] text-[64px] text-white top-[3925px] whitespace-nowrap">
          MEET OUR SPECIALISTS
        </p>
        
        {/* Tony Stark */}
        <div className="absolute border-[5px] border-solid border-white h-[453px] left-[69px] rounded-[15px] shadow-[0px_4px_20px_10px_rgba(255,255,255,0.5)] top-[4069px] w-[406px] overflow-hidden group">
          <img alt="Tony Stark" className="absolute inset-0 object-cover size-full transition-transform duration-500 group-hover:scale-105" src={IMAGES.specialistTony} />
        </div>
        <p className="absolute font-semibold leading-[0.962] left-[69px] text-[36px] text-white top-[4544px] whitespace-nowrap">
          Tony Stark
        </p>
        <p className="absolute font-normal leading-[0.962] left-[69px] text-[#9e9e9e] text-[20px] top-[4594px] whitespace-nowrap">
          Founder of Mechify
        </p>

        {/* Bruce Wayne */}
        <div className="absolute border-[5px] border-solid border-white h-[453px] left-[527px] rounded-[15px] shadow-[0px_4px_20px_10px_rgba(255,255,255,0.5)] top-[4069px] w-[406px] overflow-hidden group">
          <img alt="Bruce Wayne" className="absolute inset-0 object-cover size-full transition-transform duration-500 group-hover:scale-105" src={IMAGES.specialistBruce} />
        </div>
        <p className="absolute font-semibold leading-[0.962] left-[527px] text-[36px] text-white top-[4544px] whitespace-nowrap">
          Bruce Wayne
        </p>
        <p className="absolute font-normal leading-[0.962] left-[527px] text-[#9e9e9e] text-[20px] top-[4600px] whitespace-nowrap">
          Main Mechanic
        </p>

        {/* Clark Kent */}
        <div className="absolute border-[5px] border-solid border-white h-[453px] left-[987px] rounded-[15px] shadow-[0px_4px_20px_10px_rgba(255,255,255,0.5)] top-[4069px] w-[406px] overflow-hidden group">
          <img alt="Clark Kent" className="absolute inset-0 object-cover size-full transition-transform duration-500 group-hover:scale-105" src={IMAGES.specialistClark} />
        </div>
        <p className="absolute font-semibold leading-[0.962] left-[987px] text-[36px] text-white top-[4544px] whitespace-nowrap">
          Clark Kent
        </p>
        <p className="absolute font-normal leading-[0.962] left-[987px] text-[#9e9e9e] text-[20px] top-[4597px] whitespace-nowrap">
          Mechanic
        </p>

        {/* Walter White */}
        <div className="absolute border-[5px] border-solid border-white h-[453px] left-[1445px] rounded-[15px] shadow-[0px_4px_20px_10px_rgba(255,255,255,0.5)] top-[4069px] w-[406px] overflow-hidden group">
          <img alt="Walter White" className="absolute inset-0 object-cover size-full transition-transform duration-500 group-hover:scale-105" src={IMAGES.specialistWalter} />
        </div>
        <p className="absolute font-semibold leading-[0.962] left-[1445px] text-[36px] text-white top-[4549px] whitespace-nowrap">
          Walter White
        </p>
        <p className="absolute font-normal leading-[0.962] left-[1458px] text-[#9e9e9e] text-[20px] top-[4600px] whitespace-nowrap">
          Mechanic
        </p>

      </div>
    </ScaleWrapper>
  );
}

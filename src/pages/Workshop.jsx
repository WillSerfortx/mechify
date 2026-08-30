import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScaleWrapper from '../components/ScaleWrapper';

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

/**
 * Exact Figma Node 1:692 Implementation
 * Proportions, pixel-perfect coordinates, fonts, and interactive elements.
 * Bottom contact form and bottom button omitted per instruction.
 */
export default function Workshop() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredGallery, setHoveredGallery] = useState(null);

  return (
    <ScaleWrapper height={4760}>
      <div className="bg-black relative w-[1920px] h-[4760px] select-none font-sora" data-node-id="1:692">
        
        {/* ─── HERO BACKGROUND (Node 1:693) ─── */}
        <div className="absolute h-[1280px] left-0 top-[-156px] w-[1920px]" data-node-id="1:693" data-name="image 36">
          <img 
            alt="Hero background" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full opacity-90" 
            src={IMAGES.heroBg} 
          />
        </div>

        {/* ─── HERO HEADINGS (Node 1:694, 1:695) ─── */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-bold leading-[0.962] left-[56px] text-[96px] text-white top-[158px] whitespace-nowrap" data-node-id="1:694">
          Professional Car Repair
        </p>
        <p className="[word-break:break-word] absolute font-['Sora'] font-bold leading-[0.962] left-[56px] text-[96px] text-white top-[250px] whitespace-nowrap" data-node-id="1:695">
          And Maintenance
        </p>

        {/* ─── HERO SUBTITLE (Node 1:696) ─── */}
        <div className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[0] left-[56px] text-[32px] text-white top-[397px] whitespace-nowrap" data-node-id="1:696">
          <p className="leading-[0.962] mb-0 whitespace-pre">We are focused on providing our clients with the highest</p>
          <p className="leading-[0.962] whitespace-pre">level of quality and excellent customer support</p>
        </div>

        {/* ─── HERO BUTTON (Node 1:1843 / 1:1844) with Glowing SOS ─── */}
        <div 
          onClick={() => navigate('/workshop-search')}
          className="absolute block cursor-pointer h-[74px] left-[95px] top-[526px] w-[560px] active:scale-95 transition-transform" 
          data-node-id="1:1843"
        >
          <div className="absolute bg-[red] border border-solid border-white inset-0 rounded-[40px] shadow-[0_0_30px_rgba(255,0,0,0.8)] animate-pulse" />
          <p className="[word-break:break-word] absolute font-['Sora'] font-bold inset-0 flex items-center justify-center leading-[0.962] text-[30px] text-white whitespace-nowrap">
            🚨 Get an Emergency appointment now
          </p>
        </div>

        {/* ─── SERVICE FEATURE CARD 1: PERFORMANCE CHECK (Node 1:1882) ─── */}
        <div 
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => navigate('/workshop-search')}
          className="absolute bg-black border-5 border-solid border-white h-[468px] left-[87px] overflow-clip rounded-[40px] top-[1062px] w-[553px] cursor-pointer transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]" 
          data-node-id="1:1882"
        >
          <div 
            className="absolute transition-all duration-300 pointer-events-none"
            style={{
              left: hoveredCard === 1 ? '246px' : '208px',
              top: hoveredCard === 1 ? '40px' : '129px',
              width: hoveredCard === 1 ? '60px' : '128px',
              height: hoveredCard === 1 ? '60px' : '128px',
            }}
            data-name="Responsibility"
          >
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={IMAGES.iconPerformance} />
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_200px_200px_4px_0px_white]" />
          </div>
          <div 
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Sora'] font-bold leading-[0] left-[274.5px] text-[40px] text-center text-white transition-all duration-300 whitespace-nowrap"
            style={{ top: hoveredCard === 1 ? '120px' : '296px' }}
            data-node-id="1:1884"
          >
            <p className="leading-[0.962] mb-0">Performance</p>
            <p className="leading-[0.962]">Check</p>
          </div>
          {hoveredCard === 1 && (
            <div className="absolute left-[40px] right-[40px] top-[245px] text-center font-['Sora'] font-bold text-[24px] text-white leading-relaxed animate-fadeIn">
              <p className="mb-0">Comprehensive checks to ensure</p>
              <p className="mb-0">peak vehicle performance.</p>
              <p className="mb-0">Identify issues early and drive</p>
              <p className="mb-0">with confidence.</p>
            </div>
          )}
        </div>

        {/* ─── SERVICE FEATURE CARD 2: AUTO REPAIR (Node 1:1889) ─── */}
        <div 
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => navigate('/workshop-search')}
          className="absolute bg-black border-5 border-solid border-white h-[468px] left-[681px] overflow-clip rounded-[40px] top-[1056px] w-[553px] cursor-pointer transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]" 
          data-node-id="1:1889"
        >
          <div 
            className="absolute transition-all duration-300 pointer-events-none"
            style={{
              left: hoveredCard === 2 ? '246px' : '208px',
              top: hoveredCard === 2 ? '40px' : '119px',
              width: hoveredCard === 2 ? '60px' : '128px',
              height: hoveredCard === 2 ? '60px' : '128px',
            }}
            data-name="Car repair"
          >
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={IMAGES.iconRepair} />
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_200px_200px_4px_0px_white]" />
          </div>
          <div 
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Sora'] font-bold leading-[0] left-[268px] text-[40px] text-center text-white transition-all duration-300 whitespace-nowrap"
            style={{ top: hoveredCard === 2 ? '120px' : '282px' }}
            data-node-id="1:1891"
          >
            <p className="leading-[0.962] mb-0">Auto</p>
            <p className="leading-[0.962]">Repair</p>
          </div>
          {hoveredCard === 2 && (
            <div className="absolute left-[40px] right-[40px] top-[245px] text-center font-['Sora'] font-bold text-[24px] text-white leading-relaxed animate-fadeIn">
              <p className="mb-0">Reliable auto services to keep your</p>
              <p className="mb-0">car road-ready.</p>
              <p className="mb-0">From routine maintenance to major</p>
              <p className="mb-0">repairs, we handle it all.</p>
            </div>
          )}
        </div>

        {/* ─── SERVICE FEATURE CARD 3: FLEET SERVICE (Node 1:1896) ─── */}
        <div 
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => navigate('/workshop-search')}
          className="absolute bg-black border-5 border-solid border-white h-[468px] left-[1280px] overflow-clip rounded-[40px] top-[1053px] w-[553px] cursor-pointer transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]" 
          data-node-id="1:1896"
        >
          <div 
            className="absolute transition-all duration-300 pointer-events-none"
            style={{
              left: hoveredCard === 3 ? '246px' : '208px',
              top: hoveredCard === 3 ? '40px' : '140px',
              width: hoveredCard === 3 ? '60px' : '128px',
              height: hoveredCard === 3 ? '60px' : '128px',
            }}
            data-name="Car"
          >
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={IMAGES.iconFleet} />
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_200px_200px_4px_0px_white]" />
          </div>
          <div 
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Sora'] font-bold leading-[0] left-[272px] text-[40px] text-center text-white transition-all duration-300 whitespace-nowrap"
            style={{ top: hoveredCard === 3 ? '120px' : '286px' }}
            data-node-id="1:1898"
          >
            <p className="leading-[0.962] mb-0">Fleet</p>
            <p className="leading-[0.962]">Service</p>
          </div>
          {hoveredCard === 3 && (
            <div className="absolute left-[40px] right-[40px] top-[245px] text-center font-['Sora'] font-bold text-[24px] text-white leading-relaxed animate-fadeIn">
              <p className="mb-0">Efficient maintenance solutions for</p>
              <p className="mb-0">commercial fleets.</p>
              <p className="mb-0">Keep your vehicles running smoothly</p>
              <p className="mb-0">with minimal downtime.</p>
            </div>
          )}
        </div>

        {/* ─── WHY US? (Node 1:697) ─── */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-bold leading-[0.962] left-[87px] text-[64px] text-white top-[1650px] whitespace-nowrap">
          Why us?
        </p>
        <div className="[word-break:break-word] absolute font-['Sora'] font-light leading-[0] left-[87px] text-[0px] text-black top-[1748px] whitespace-nowrap" data-node-id="1:697">
          <p className="font-['Sora'] font-semibold leading-[1.3] mb-0 text-[32px] text-white">All Mechanic 128 workshops employ the latest</p>
          <p className="font-['Sora'] font-semibold leading-[1.3] mb-0 text-[32px] text-white">test techniques and digital information</p>
          <p className="font-['Sora'] font-semibold leading-[1.3] mb-0 text-[32px] text-white">systems. This ideal combination ensures</p>
          <p className="font-['Sora'] font-semibold leading-[1.3] mb-0 text-[32px] text-white">systematic vehicle diagnosis and qualified</p>
          <p className="font-['Sora'] font-semibold leading-[1.3] text-[32px] text-white">repair work.</p>
        </div>

        {/* ─── SERVICES TITLE ─── */}
        <p className="[word-break:break-word] absolute font-['Poppins'] font-bold leading-[0.962] left-[780px] text-[64px] text-white top-[2200px] whitespace-nowrap">
          SERVICES
        </p>

        {/* ─── SERVICES STAIR-STEP 1, 2, 3 (Node 1:699 - 1:707) ─── */}
        {/* Number 1 */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-bold leading-[0.962] left-[397px] text-[128px] top-[2406px] whitespace-nowrap select-none" 
          style={{ color: 'transparent', WebkitTextStroke: '2.5px #ffffff' }}
          data-node-id="1:705"
        >
          1
        </p>
        <p className="[word-break:break-word] absolute font-['Poppins'] font-bold leading-[0.962] left-[262px] text-[64px] text-white top-[2537px] whitespace-nowrap" data-node-id="1:699">
          Inspection
        </p>
        <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins'] font-semibold leading-[1.2] left-[437px] text-[#8b8888] text-[32px] text-center top-[2620px] w-[336px]" data-node-id="1:702">
          <p className="mb-0">We can provide professional</p>
          <p className="mb-0">servicing and maintenance work</p>
          <p className="mb-0">with no loss of manufacturer</p>
          <p>warranty coverage.</p>
        </div>

        {/* Number 2 */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-bold leading-[0.962] left-[936px] text-[128px] top-[2363px] whitespace-nowrap select-none" 
          style={{ color: 'transparent', WebkitTextStroke: '2.5px #ffffff' }}
          data-node-id="1:706"
        >
          2
        </p>
        <p className="[word-break:break-word] absolute font-['Poppins'] font-bold leading-[0.962] left-[810px] text-[64px] text-white top-[2506px] whitespace-nowrap" data-node-id="1:700">
          Diagnostic
        </p>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins'] font-semibold leading-[1.2] left-[977px] text-[#8b8888] text-[32px] text-center top-[2620px] w-[336px]" data-node-id="1:703">
          A computerized car diagnostic check from Mechanic 128 will give you a true picture of how your vehicle is running.
        </p>

        {/* Number 3 */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-bold leading-[0.962] left-[1484px] text-[128px] top-[2320px] whitespace-nowrap select-none" 
          style={{ color: 'transparent', WebkitTextStroke: '2.5px #ffffff' }}
          data-node-id="1:707"
        >
          3
        </p>
        <p className="[word-break:break-word] absolute font-['Poppins'] font-bold leading-[0.962] left-[1372px] text-[64px] text-white top-[2455px] whitespace-nowrap" data-node-id="1:701">
          Upgrades
        </p>
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins'] font-semibold leading-[1.2] left-[1540px] text-[#8b8888] text-[32px] text-center top-[2617px] w-[336px]" data-node-id="1:704">
          Rather than sending your car for a basic service, ask Mechanic 128 for a thorough multi-point check and upgrade your car.
        </p>

        {/* ─── GALLERY (4 CARDS) (Node 1:1850, 1:1858, 1:1866, 1:1874) ─── */}
        {/* Card 1: SCHEDULE */}
        <div 
          onMouseEnter={() => setHoveredGallery(1)}
          onMouseLeave={() => setHoveredGallery(null)}
          onClick={() => navigate('/workshop-search')}
          className="absolute border-5 border-solid border-white h-[491px] left-[80px] overflow-clip rounded-[15px] top-[3167px] w-[403px] cursor-pointer group" 
          data-node-id="1:1850"
        >
          <div className="absolute h-[491px] left-[-193px] top-[-5px] w-[736px] transition-transform duration-500 group-hover:scale-105" data-name="image 38">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={IMAGES.gallerySchedule} />
          </div>
          <p 
            className="[word-break:break-word] absolute font-['Sora'] font-extrabold leading-[0.962] left-[85px] text-[40px] text-white transition-all duration-300 whitespace-nowrap"
            style={{ top: hoveredGallery === 1 ? '300px' : '390px' }}
            data-node-id="1:1852"
          >
            SCHEDULE
          </p>
          {hoveredGallery === 1 && (
            <p className="absolute left-[30px] right-[30px] top-[380px] text-white font-['Sora'] text-[18px] font-semibold leading-snug animate-fadeIn text-center">
              Easy online booking to get your car serviced at your convenience.
            </p>
          )}
        </div>

        {/* Card 2: ENGINE */}
        <div 
          onMouseEnter={() => setHoveredGallery(2)}
          onMouseLeave={() => setHoveredGallery(null)}
          onClick={() => navigate('/workshop-search')}
          className="absolute border-5 border-solid border-white h-[491px] left-[527px] overflow-clip rounded-[15px] top-[3166px] w-[403px] cursor-pointer group" 
          data-node-id="1:1858"
        >
          <div className="absolute h-[491px] left-[-339px] top-[-5px] w-[737px] transition-transform duration-500 group-hover:scale-105" data-name="image 39">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={IMAGES.galleryEngine} />
          </div>
          <p 
            className="[word-break:break-word] absolute font-['Sora'] font-extrabold leading-[0.962] left-[114px] text-[40px] text-white transition-all duration-300 whitespace-nowrap"
            style={{ top: hoveredGallery === 2 ? '300px' : '390px' }}
            data-node-id="1:1860"
          >
            ENGINE
          </p>
          {hoveredGallery === 2 && (
            <p className="absolute left-[30px] right-[30px] top-[380px] text-white font-['Sora'] text-[18px] font-semibold leading-snug animate-fadeIn text-center">
              Expert engine diagnostics and repairs for smooth performance.
            </p>
          )}
        </div>

        {/* Card 3: PAINTING */}
        <div 
          onMouseEnter={() => setHoveredGallery(3)}
          onMouseLeave={() => setHoveredGallery(null)}
          onClick={() => navigate('/workshop-search')}
          className="absolute border-5 border-solid border-white h-[491px] left-[986px] overflow-clip rounded-[15px] top-[3166px] w-[403px] cursor-pointer group" 
          data-node-id="1:1866"
        >
          <div className="absolute h-[750px] left-[-53px] top-[-5px] w-[499px] transition-transform duration-500 group-hover:scale-105" data-name="image 40">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={IMAGES.galleryPainting} />
          </div>
          <p 
            className="[word-break:break-word] absolute font-['Sora'] font-extrabold leading-[0.962] left-[85px] text-[40px] text-white transition-all duration-300 whitespace-nowrap"
            style={{ top: hoveredGallery === 3 ? '300px' : '390px' }}
            data-node-id="1:1868"
          >
            PAINTING
          </p>
          {hoveredGallery === 3 && (
            <p className="absolute left-[30px] right-[30px] top-[380px] text-white font-['Sora'] text-[18px] font-semibold leading-snug animate-fadeIn text-center">
              Premium paintwork to restore your car’s original shine.
            </p>
          )}
        </div>

        {/* Card 4: DETAILING */}
        <div 
          onMouseEnter={() => setHoveredGallery(4)}
          onMouseLeave={() => setHoveredGallery(null)}
          onClick={() => navigate('/workshop-search')}
          className="absolute border-5 border-solid border-white h-[491px] left-[1436px] overflow-clip rounded-[15px] top-[3165px] w-[403px] cursor-pointer group" 
          data-node-id="1:1874"
        >
          <div className="absolute h-[750px] left-[-53px] top-[-134px] w-[500px] transition-transform duration-500 group-hover:scale-105" data-name="image 41">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={IMAGES.galleryDetailing} />
          </div>
          <p 
            className="[word-break:break-word] absolute font-['Sora'] font-extrabold leading-[0.962] left-[85px] text-[40px] text-white transition-all duration-300 whitespace-nowrap"
            style={{ top: hoveredGallery === 4 ? '300px' : '390px' }}
            data-node-id="1:1876"
          >
            DETAILING
          </p>
          {hoveredGallery === 4 && (
            <p className="absolute left-[30px] right-[30px] top-[380px] text-white font-['Sora'] text-[18px] font-semibold leading-snug animate-fadeIn text-center">
              Complete interior and exterior detailing for a fresh look.
            </p>
          )}
        </div>

        {/* ─── MEET OUR SPECIALISTS (Node 1:708 - 1:720) ─── */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-bold leading-[0.962] left-[59px] text-[64px] text-white top-[3925px] whitespace-nowrap" data-node-id="1:708">
          MEET OUR SPECIALISTS
        </p>

        {/* Specialist 1: Tony Stark */}
        <div className="absolute border-5 border-solid border-white h-[453px] left-[69px] rounded-[15px] shadow-[0px_4px_20px_10px_rgba(255,255,255,0.5)] top-[4069px] w-[406px] overflow-hidden" data-node-id="1:709">
          <img alt="Tony Stark" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[15px] size-full" src={IMAGES.specialistTony} />
        </div>
        <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[0.962] left-[69px] text-[36px] text-white top-[4544px] whitespace-nowrap" data-node-id="1:717">
          Tony Stark
        </p>
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[0.962] left-[69px] text-[#9e9e9e] text-[20px] top-[4594px] whitespace-nowrap" data-node-id="1:713">
          Founder of Mechify
        </p>

        {/* Specialist 2: Bruce Wayne */}
        <div className="absolute border-5 border-solid border-white h-[453px] left-[527px] rounded-[15px] shadow-[0px_4px_20px_10px_rgba(255,255,255,0.5)] top-[4069px] w-[406px] overflow-hidden" data-node-id="1:710">
          <img alt="Bruce Wayne" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[15px] size-full" src={IMAGES.specialistBruce} />
        </div>
        <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[0.962] left-[527px] text-[36px] text-white top-[4544px] whitespace-nowrap" data-node-id="1:718">
          Bruce Wayne
        </p>
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[0.962] left-[527px] text-[#9e9e9e] text-[20px] top-[4600px] whitespace-nowrap" data-node-id="1:714">
          Main Mechanic
        </p>

        {/* Specialist 3: Clark Kent */}
        <div className="absolute border-5 border-solid border-white h-[453px] left-[987px] rounded-[15px] shadow-[0px_4px_20px_10px_rgba(255,255,255,0.5)] top-[4069px] w-[406px] overflow-hidden" data-node-id="1:711">
          <img alt="Clark Kent" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[15px] size-full" src={IMAGES.specialistClark} />
        </div>
        <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[0.962] left-[987px] text-[36px] text-white top-[4544px] whitespace-nowrap" data-node-id="1:719">
          Clark Kent
        </p>
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[0.962] left-[987px] text-[#9e9e9e] text-[20px] top-[4597px] whitespace-nowrap" data-node-id="1:715">
          Senior Technician
        </p>

        {/* Specialist 4: Walter White */}
        <div className="absolute border-5 border-solid border-white h-[453px] left-[1445px] rounded-[15px] shadow-[0px_4px_20px_10px_rgba(255,255,255,0.5)] top-[4069px] w-[406px] overflow-hidden" data-node-id="1:712">
          <img alt="Walter White" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[15px] size-full" src={IMAGES.specialistWalter} />
        </div>
        <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[0.962] left-[1445px] text-[36px] text-white top-[4549px] whitespace-nowrap" data-node-id="1:720">
          Walter White
        </p>
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[0.962] left-[1445px] text-[#9e9e9e] text-[20px] top-[4600px] whitespace-nowrap" data-node-id="1:716">
          Diagnostic Specialist
        </p>

      </div>
    </ScaleWrapper>
  );
}

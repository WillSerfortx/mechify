import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScaleWrapper from '../components/ScaleWrapper';

/* ─── High Quality Curated Automotive Images Matching Figma ─── */
const IMAGES = {
  heroBg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1390&fit=crop',
  standardRide: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&h=800&fit=crop',
  greenRide: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&h=800&fit=crop',
  businessRide: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&h=800&fit=crop',
  airportOccasion: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=600&h=400&fit=crop',
  eventOccasion: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
  hourlyOccasion: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop'
};

export default function IDriver() {
  const navigate = useNavigate();
  const [showOptionModal, setShowOptionModal] = useState(false);
  const carouselRef = useRef(null);

  const handleSelectOption = (optionType) => {
    setShowOptionModal(false);
    navigate(`/driver-search?type=${optionType}`);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -1600 : 1600;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <ScaleWrapper height={3600}>
      <div className="bg-black relative size-full font-sora select-none text-white overflow-hidden" data-node-id="1:960">
        
        {/* ─── HERO BACKGROUND IMAGE ─── */}
        <div className="absolute h-[1390px] left-0 top-0 w-[1920px] pointer-events-none" data-node-id="1:961">
          <img 
            alt="Private Driver Mechify" 
            className="absolute inset-0 object-cover size-full opacity-70" 
            src={IMAGES.heroBg} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        {/* ─── BACK BUTTON ─── */}
        <button
          onClick={() => navigate(-1)}
          className="absolute border-[10px] border-solid border-white left-0 top-[323px] size-[90px] bg-black/60 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all z-20"
          data-node-id="1:989"
          title="Back"
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* ─── HERO HEADING ─── */}
        <h1 
          className="-translate-x-1/2 absolute font-semibold leading-normal left-[50%] text-[64px] text-center text-white top-[633px] whitespace-nowrap tracking-wide drop-shadow-2xl"
          data-node-id="1:962"
        >
          BOOK A PRIVATE DRIVER WITH MECHIFY
        </h1>

        {/* ─── HERO DESCRIPTION ─── */}
        <div 
          className="absolute font-semibold leading-relaxed left-[115px] text-[16px] text-white top-[740px] max-w-[1690px] space-y-1 drop-shadow-lg"
          data-node-id="1:963"
        >
          <p className="m-0">With MECHIFY you can book a private car service in the UK as well as many other countries worldwide.</p>
          <p className="m-0">In just a few steps, you can book a private hire car and professional driver both online and on the SIXT app.</p>
          <p className="m-0">For rides in the city, for special events, or to get to and from the airport, you can pre-book your journey a minimum</p>
          <p className="m-0">of an hour in advance. In many cities around the world we also offer the option for immediate pickup.</p>
          <p className="m-0">With a range of booking classes to choose between, from economy through to first class,</p>
          <p className="m-0">there's something for all budgets and needs.</p>
        </div>

        {/* ─── CHOOSE DRIVERS BUTTON MOVED ON TOP (AS REQUESTED) ─── */}
        <button
          onClick={() => setShowOptionModal(true)}
          className="absolute bg-[#E50914] hover:bg-red-700 active:scale-95 border-4 border-solid border-white h-[108px] left-[115px] top-[950px] w-[631px] rounded-[24px] cursor-pointer shadow-[0_0_40px_rgba(229,9,20,0.6)] hover:shadow-[0_0_60px_rgba(229,9,20,0.9)] transition-all duration-300 z-20 flex items-center justify-between px-10 group"
          title="Choose Drivers"
        >
          <span className="font-extrabold text-[40px] text-white tracking-wide">
            Choose Drivers
          </span>
          <div className="size-[64px] bg-white rounded-full flex items-center justify-center text-black font-black text-2xl group-hover:translate-x-2 transition-transform shadow-md">
            ➔
          </div>
        </button>

        {/* ─── VEHICLE OPTIONS TITLE ─── */}
        <h2 
          className="absolute font-extrabold leading-normal left-[81px] text-[96px] text-white top-[1269px] whitespace-nowrap tracking-tight font-sora"
          data-node-id="1:964"
        >
          Vehicle Options
        </h2>

        {/* ─── VEHICLE OPTIONS HORIZONTAL CAROUSEL (727px HEIGHT) ─── */}
        <div 
          ref={carouselRef}
          className="absolute h-[727px] left-0 top-[1449px] w-[1920px] overflow-x-auto overflow-y-hidden flex gap-10 no-scrollbar px-[61px] scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-y' }}
          data-node-id="1:965"
        >
          {/* Card 1: Standard RIDE */}
          <div 
            onClick={() => setShowOptionModal(true)}
            className="flex-shrink-0 relative bg-white h-[727px] w-[1554px] rounded-[35px] overflow-hidden cursor-pointer group shadow-2xl border-4 border-white/20 hover:border-red-500/80 transition-all duration-500"
            data-node-id="1:967"
          >
            <img 
              alt="Standard Ride" 
              className="absolute inset-0 object-cover size-full group-hover:scale-105 transition-transform duration-700" 
              src={IMAGES.standardRide} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
            
            <p className="absolute font-extrabold leading-normal left-[115px] text-[64px] text-white top-[115px] whitespace-nowrap drop-shadow-xl" data-node-id="1:969">
              Standard RIDE
            </p>
            <div className="absolute font-bold leading-normal left-[115px] text-[40px] text-white top-[220px] max-w-[1200px] drop-shadow-md" data-node-id="1:970">
              <p className="m-0">Get to your destination reliably and affordably</p>
              <p className="m-0">with our standard Ride BOOKING class</p>
            </div>
          </div>

          {/* Card 2: Green Ride */}
          <div 
            onClick={() => setShowOptionModal(true)}
            className="flex-shrink-0 relative bg-white h-[727px] w-[1554px] rounded-[35px] overflow-hidden cursor-pointer group shadow-2xl border-4 border-white/20 hover:border-green-500/80 transition-all duration-500"
            data-node-id="1:971"
          >
            <img 
              alt="Green Ride" 
              className="absolute inset-0 object-cover size-full group-hover:scale-105 transition-transform duration-700" 
              src={IMAGES.greenRide} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
            
            <p className="absolute font-extrabold leading-normal left-[115px] text-[64px] text-white top-[115px] whitespace-nowrap drop-shadow-xl" data-node-id="1:975">
              Green Ride
            </p>
            <div className="absolute font-semibold leading-normal left-[115px] text-[40px] text-white top-[220px] max-w-[1300px] drop-shadow-md" data-node-id="1:976">
              <p className="m-0">DO your part for the environment with the green booking class,</p>
              <p className="m-0">featuring environmentally friendly transportation options like</p>
              <p className="m-0">electric or hybrid vehicles</p>
            </div>
          </div>

          {/* Card 3: Business Ride */}
          <div 
            onClick={() => setShowOptionModal(true)}
            className="flex-shrink-0 relative bg-white h-[727px] w-[1554px] rounded-[35px] overflow-hidden cursor-pointer group shadow-2xl border-4 border-white/20 hover:border-red-500/80 transition-all duration-500"
            data-node-id="1:977"
          >
            <img 
              alt="Business Ride" 
              className="absolute inset-0 object-cover size-full group-hover:scale-105 transition-transform duration-700" 
              src={IMAGES.businessRide} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
            
            <p className="absolute font-extrabold leading-normal left-[115px] text-[64px] text-white top-[115px] whitespace-nowrap drop-shadow-xl" data-node-id="1:983">
              Business Ride
            </p>
            <div className="absolute font-semibold leading-normal left-[115px] text-[40px] text-white top-[220px] max-w-[1300px] drop-shadow-md" data-node-id="1:984">
              <p className="m-0">For business travelers, the Business booking class offers a</p>
              <p className="m-0">Higher level vehicle by trained chauffeur</p>
            </div>
          </div>
        </div>

        {/* ─── VEHICLE OPTION BUTTON (FIGMA NODE 1:2273) ─── */}
        <button 
          onClick={() => setShowOptionModal(true)}
          className="absolute bg-black hover:bg-white/10 active:scale-98 border-[5px] border-solid border-white h-[108px] left-[61px] rounded-[20px] top-[2259px] w-[631px] cursor-pointer flex items-center justify-between px-10 transition-all"
          data-node-id="1:2273"
        >
          <span className="font-extrabold text-[40px] text-white text-center whitespace-nowrap">
            Vehicle Option
          </span>
          <span className="text-[40px] text-white">▲</span>
        </button>

        {/* ─── DRIVER HIRE OCCASIONS SECTION ─── */}
        <h2 
          className="absolute font-extrabold leading-normal left-[81px] text-[64px] text-white top-[2582px] whitespace-nowrap font-sora tracking-tight"
          data-node-id="1:985"
        >
          Driver hire service for any occasion
        </h2>

        {/* Card 1: Airport journeys */}
        <div 
          onClick={() => setShowOptionModal(true)}
          className="absolute bg-white border-[10px] border-solid border-white h-[350px] left-[61px] rounded-[35px] top-[2718px] w-[567px] overflow-hidden cursor-pointer group shadow-2xl hover:scale-105 transition-all duration-300"
          data-node-id="1:1947"
        >
          <div className="absolute h-[282px] inset-x-4 top-2 overflow-hidden rounded-2xl">
            <img alt="Airport journeys" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={IMAGES.airportOccasion} />
          </div>
          <p className="absolute font-semibold text-[24px] text-black top-[290px] right-8">
            Airport journeys
          </p>
        </div>

        {/* Card 2: Event service */}
        <div 
          onClick={() => setShowOptionModal(true)}
          className="absolute bg-white border-[10px] border-solid border-white h-[350px] left-[675px] rounded-[35px] top-[2718px] w-[567px] overflow-hidden cursor-pointer group shadow-2xl hover:scale-105 transition-all duration-300"
          data-node-id="1:1953"
        >
          <div className="absolute h-[282px] inset-x-4 top-2 overflow-hidden rounded-2xl">
            <img alt="Event service" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={IMAGES.eventOccasion} />
          </div>
          <p className="absolute font-semibold text-[24px] text-black top-[290px] right-8">
            Event service
          </p>
        </div>

        {/* Card 3: Hourly bookings */}
        <div 
          onClick={() => setShowOptionModal(true)}
          className="absolute bg-white border-[10px] border-solid border-white h-[350px] left-[1289px] rounded-[35px] top-[2718px] w-[567px] overflow-hidden cursor-pointer group shadow-2xl hover:scale-105 transition-all duration-300"
          data-node-id="1:1959"
        >
          <div className="absolute h-[282px] inset-x-4 top-2 overflow-hidden rounded-2xl">
            <img alt="Hourly bookings" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={IMAGES.hourlyOccasion} />
          </div>
          <p className="absolute font-semibold text-[24px] text-black top-[290px] right-8">
            Hourly bookings
          </p>
        </div>

        {/* ─── CHOOSE OCCASION BUTTON (FIGMA NODE 1:2290) ─── */}
        <button 
          onClick={() => setShowOptionModal(true)}
          className="absolute bg-black hover:bg-white/10 active:scale-98 border-[5px] border-solid border-white h-[108px] left-[61px] rounded-[20px] top-[3151px] w-[631px] cursor-pointer flex items-center justify-between px-10 transition-all"
          data-node-id="1:2290"
        >
          <span className="font-extrabold text-[40px] text-white text-center whitespace-nowrap">
            Choose Occasion
          </span>
          <span className="text-[40px] text-white">▲</span>
        </button>

        {/* ─── SEARCH DRIVERS BUTTON (FIGMA NODE 1:992) ─── */}
        <button 
          onClick={() => setShowOptionModal(true)}
          className="absolute bg-white hover:bg-gray-200 active:scale-95 h-[96px] left-[1098px] rounded-[40px] top-[3400px] w-[720px] cursor-pointer flex items-center justify-center shadow-2xl transition-all duration-300 group"
          data-node-id="1:992"
        >
          <p className="font-extrabold text-[40px] text-black text-center whitespace-nowrap group-hover:scale-105 transition-transform" data-node-id="1:993">
            Search Drivers
          </p>
        </button>

        {/* ─── POP-UP SELECTION MODAL: 2 OPTIONS ─── */}
        {showOptionModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setShowOptionModal(false)}
          >
            <div 
              className="relative bg-gradient-to-b from-[#181a29] via-[#12131F] to-[#0A0B10] border-2 border-white/30 rounded-[35px] max-w-3xl w-full p-10 sm:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.95)] animate-scaleIn text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowOptionModal(false)}
                className="absolute top-6 right-6 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl font-bold transition-colors"
              >
                ✕
              </button>

              {/* Modal Title */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-xs uppercase tracking-wider mb-3">
                  <span>⚡</span> CHOOSE YOUR SERVICE TYPE
                </div>
                <h3 className="text-3xl sm:text-4xl font-black font-sora uppercase">
                  What do you <span className="text-[#E50914]">need today?</span>
                </h3>
                <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
                  Select your preferred driver booking mode to find the perfect match.
                </p>
              </div>

              {/* 2 Interactive Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* OPTION 1: A Car with a Driver */}
                <div
                  onClick={() => handleSelectOption('car-and-driver')}
                  className="bg-gradient-to-b from-white/10 to-white/5 hover:from-red-950/50 hover:to-black border-2 border-white/15 hover:border-red-500/80 rounded-[28px] p-7 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_35px_rgba(229,9,20,0.4)] hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="size-16 rounded-2xl bg-gradient-to-br from-red-600/40 to-black border border-red-500/50 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-md">
                      🚗
                    </div>
                    <h4 className="text-2xl font-black text-white font-sora group-hover:text-red-400 transition-colors mb-2">
                      A Car with a Driver
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-6">
                      Book an all-inclusive package with a vehicle (Sedan, SUV, Luxury, Van) and an executive chauffeur. Fuel & insurance included.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-black text-red-400 group-hover:text-red-300">
                    <span>Explore Fleet & Drivers</span>
                    <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>

                {/* OPTION 2: Only a Driver without a Car */}
                <div
                  onClick={() => handleSelectOption('driver-only')}
                  className="bg-gradient-to-b from-white/10 to-white/5 hover:from-red-950/50 hover:to-black border-2 border-white/15 hover:border-red-500/80 rounded-[28px] p-7 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_35px_rgba(229,9,20,0.4)] hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="size-16 rounded-2xl bg-gradient-to-br from-red-600/40 to-black border border-red-500/50 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-md">
                      👤
                    </div>
                    <h4 className="text-2xl font-black text-white font-sora group-hover:text-red-400 transition-colors mb-2">
                      Only a Driver
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-6">
                      Already have your own vehicle? Hire a vetted, licensed personal chauffeur to drive your car safely for hourly, daily, or intercity travel.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-black text-red-400 group-hover:text-red-300">
                    <span>Hire Personal Chauffeur</span>
                    <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>

              </div>

              {/* Support Note */}
              <div className="mt-8 text-center text-gray-500 text-xs font-semibold">
                🔒 24/7 Verified Chauffeurs • Real-time GPS Dispatch • Transparent Hourly Rates
              </div>
            </div>
          </div>
        )}

      </div>
    </ScaleWrapper>
  );
}

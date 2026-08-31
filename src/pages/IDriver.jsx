import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const occasions = [
  { label: 'Airport journeys', img: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&h=300&fit=crop' },
  { label: 'Event service', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop' },
  { label: 'Hourly bookings', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop' },
];

export default function IDriver() {
  const navigate = useNavigate();
  const [showOptionModal, setShowOptionModal] = useState(false);

  const handleSelectOption = (optionType) => {
    setShowOptionModal(false);
    navigate(`/driver-search?type=${optionType}`);
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24 relative selection:bg-red-600">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col justify-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop" 
            alt="Driving" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-6 md:left-12 lg:left-20 z-20">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl hover:bg-black/70 transition-colors border border-white/20"
          >
            &lt;
          </button>
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-xs uppercase tracking-wider mb-4">
            <span>🛡️</span> 100% VETTED & LICENSED CHAUFFEURS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 uppercase leading-tight font-sora">
            BOOK A PRIVATE DRIVER WITH <span className="text-[#E50914]">MECHIFY</span>
          </h1>
          <p className="text-gray-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            With MECHIFY you can book a private chauffeur service across Bangladesh. 
            Choose between hiring a complete vehicle with an executive driver, or book a verified professional driver to pilot your own car. 
            For city commutes, corporate events, airport transfers, or highway tours, enjoy 24/7 on-demand dispatch with premium safety standards.
          </p>
        </div>
      </section>

      {/* Vehicle Options */}
      <section className="px-6 md:px-12 lg:px-20 -mt-10 relative z-20 mb-20">
        <h2 className="text-4xl font-black mb-8 font-sora">Vehicle Options</h2>
        <div className="flex overflow-x-auto gap-6 no-scrollbar pb-4">
          {/* Standard Ride */}
          <div 
            onClick={() => setShowOptionModal(true)}
            className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 aspect-[16/10] relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-red-500/60 transition-all duration-500 shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=500&fit=crop" alt="Standard Ride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full uppercase mb-2 inline-block">Popular Choice</span>
              <h3 className="text-2xl md:text-3xl font-black mb-2 font-sora">Standard RIDE</h3>
              <p className="text-sm text-gray-300 max-w-sm">Get to your destination reliably and affordably with our standard Ride BOOKING class.</p>
            </div>
          </div>
          {/* Green Ride */}
          <div 
            onClick={() => setShowOptionModal(true)}
            className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 aspect-[16/10] relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-green-500/60 transition-all duration-500 shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop" alt="Green Ride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full uppercase mb-2 inline-block">Eco Friendly</span>
              <h3 className="text-2xl md:text-3xl font-black mb-2 font-sora">Green RIDE</h3>
              <p className="text-sm text-gray-300 max-w-sm">Do your part for the environment by featuring eco-friendly electric or hybrid vehicles.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-start">
          <button 
            onClick={() => setShowOptionModal(true)}
            className="flex items-center gap-4 border-2 border-white rounded-xl px-6 py-3 font-bold hover:bg-white hover:text-black transition-colors"
          >
            Vehicle Option <span className="text-xl rotate-180">▼</span>
          </button>
        </div>
      </section>

      {/* Driver Hire Occasions */}
      <section className="px-6 md:px-12 lg:px-20 mb-32">
        <h2 className="text-3xl font-black mb-8 font-sora">Driver hire service for any occasion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {occasions.map((occ, i) => (
            <div key={i} className="bg-white/10 rounded-2xl overflow-hidden relative aspect-video flex flex-col justify-end p-4 border border-white/10 group">
              <img src={occ.img} alt={occ.label} className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="relative z-10 text-white font-bold text-right w-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-sm inline-block max-w-max ml-auto border border-white/20">
                {occ.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <button 
            onClick={() => setShowOptionModal(true)}
            className="flex items-center gap-4 border-2 border-white rounded-xl px-6 py-3 font-bold hover:bg-white hover:text-black transition-colors"
          >
            Choose Occasion <span className="text-xl rotate-180">▼</span>
          </button>
          
          <button 
            onClick={() => setShowOptionModal(true)}
            className="bg-white text-black font-extrabold px-12 py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
          >
            Search Drivers
          </button>
        </div>
      </section>

      {/* Choose Driver CTA */}
      <section className="px-6 md:px-12 lg:px-20 flex justify-center">
        <button 
          onClick={() => setShowOptionModal(true)}
          className="group relative bg-[#E50914] text-white font-black text-3xl md:text-4xl px-16 py-6 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(229,9,20,0.8)] active:scale-95 animate-sosPulse"
        >
          <span className="relative z-10 flex items-center gap-4">
            Choose Driver
            <svg className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </section>

      {/* ─── POP-UP SELECTION MODAL: 2 OPTIONS ─── */}
      {showOptionModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowOptionModal(false)}
        >
          <div 
            className="relative bg-gradient-to-b from-[#161826] via-[#11121C] to-[#0A0B10] border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-scaleIn text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowOptionModal(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>

            {/* Modal Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs uppercase tracking-wider mb-2">
                <span>⚡</span> CHOOSE YOUR SERVICE TYPE
              </div>
              <h3 className="text-2xl sm:text-4xl font-black font-sora uppercase">
                What do you <span className="text-[#E50914]">need today?</span>
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-md mx-auto">
                Select your preferred driver booking mode to find the perfect match.
              </p>
            </div>

            {/* 2 Interactive Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* OPTION 1: A Car with a Driver */}
              <div
                onClick={() => handleSelectOption('car-and-driver')}
                className="bg-gradient-to-b from-white/10 to-white/5 hover:from-red-950/40 hover:to-black border border-white/15 hover:border-red-500/80 rounded-2xl p-6 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,9,20,0.35)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600/30 to-black border border-red-500/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🚗
                  </div>
                  <h4 className="text-xl font-black text-white font-sora group-hover:text-red-400 transition-colors mb-2">
                    A Car with a Driver
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    Book an all-inclusive package with a premium vehicle (Sedan, SUV, Luxury, Van) and an executive chauffeur. Fuel & insurance included.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
                  <span>Explore Fleet & Drivers</span>
                  <span className="text-base transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>

              {/* OPTION 2: Only a Driver without a Car */}
              <div
                onClick={() => handleSelectOption('driver-only')}
                className="bg-gradient-to-b from-white/10 to-white/5 hover:from-red-950/40 hover:to-black border border-white/15 hover:border-red-500/80 rounded-2xl p-6 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,9,20,0.35)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600/30 to-black border border-red-500/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    👤
                  </div>
                  <h4 className="text-xl font-black text-white font-sora group-hover:text-red-400 transition-colors mb-2">
                    Only a Driver
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    Already have your own vehicle? Hire a vetted, licensed personal chauffeur to drive your car safely for hourly, daily, or intercity travel.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
                  <span>Hire Personal Chauffeur</span>
                  <span className="text-base transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>

            </div>

            {/* Bottom Support Note */}
            <div className="mt-8 text-center text-gray-500 text-xs">
              🔒 24/7 Verified Chauffeurs • Real-time GPS Dispatch • Transparent Hourly Rates
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

const driverPhotos = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop'
];

const firstNames = ['Mohammad', 'Abdul', 'Rahim', 'Karim', 'Farhan', 'Tanvir', 'Shakib', 'Masud', 'Arif', 'Hasan', 'Imran', 'Kabir', 'Zahid', 'Rashid', 'Sohel'];
const lastNames = ['Ahmed', 'Chowdhury', 'Islam', 'Rahman', 'Khan', 'Siddique', 'Talukder', 'Bhuiyan', 'Uddin', 'Mia', 'Sarker', 'Ali'];

const transmissionSkills = ['Manual & Automatic', 'Automatic Only', 'All Transmissions + EV Dual Motor'];
const carProficiencies = ['Luxury Sedans, SUVs, Microbus', 'All Sedans & 4x4 SUVs', 'Supercars, Luxury & Standard', 'Heavy Commercial & Passenger'];
const languageList = ['Bangla, English', 'Bangla, English, Hindi', 'Bangla, English, Arabic', 'Bangla (Fluent)'];

function generatePersonalChauffeurs(count = 30) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[i % lastNames.length];
    const photo = driverPhotos[i % driverPhotos.length];
    const rating = (4.7 + (i % 4) * 0.08).toFixed(1);
    const trips = 520 + i * 140;
    const exp = 5 + (i % 15);
    const transmission = transmissionSkills[i % transmissionSkills.length];
    const proficiency = carProficiencies[i % carProficiencies.length];
    const languages = languageList[i % languageList.length];

    list.push({
      id: `do-${i + 1}`,
      name: `${fname} ${lname}`,
      photo,
      rating: parseFloat(rating),
      trips,
      experience: exp,
      transmission,
      proficiency,
      languages,
      hourlyRate: 15 + (i % 4) * 3,
      dailyRate: 85 + (i % 4) * 15,
      licenseType: 'BRTA Professional Class-A',
      badge: i % 3 === 0 ? 'TOP VIP CHAUFFEUR' : i % 2 === 0 ? 'HIGHLY RECOMMENDED' : 'VERIFIED PRO',
      verified: true,
      policeCleared: true,
      nonSmoker: true,
      nightShiftReady: i % 2 === 0
    });
  }
  return list;
}

const chauffeurs = generatePersonalChauffeurs(24);

export default function DriverOnlyList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', 'Manual & Auto', '10+ Yrs Exp', 'VIP Chauffeur', 'Night Shift Ready'];

  const filtered = useMemo(() => {
    return chauffeurs.filter(driver => {
      const matchSearch =
        driver.name.toLowerCase().includes(search.toLowerCase()) ||
        driver.proficiency.toLowerCase().includes(search.toLowerCase()) ||
        driver.transmission.toLowerCase().includes(search.toLowerCase()) ||
        driver.languages.toLowerCase().includes(search.toLowerCase());

      let matchFilter = true;
      if (selectedFilter === 'Manual & Auto') matchFilter = driver.transmission.includes('Manual');
      if (selectedFilter === '10+ Yrs Exp') matchFilter = driver.experience >= 10;
      if (selectedFilter === 'VIP Chauffeur') matchFilter = driver.badge === 'TOP VIP CHAUFFEUR';
      if (selectedFilter === 'Night Shift Ready') matchFilter = driver.nightShiftReady;

      return matchSearch && matchFilter;
    });
  }, [search, selectedFilter]);

  return (
    <div className="bg-[#08090C] min-h-screen text-white font-outfit pb-24 relative selection:bg-red-600">
      
      {/* Background Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-red-600/15 blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-[700px] h-[600px] bg-orange-600/10 blur-[160px]" />
      </div>

      {/* Header Banner */}
      <div className="relative z-10 pt-28 pb-10 px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto">
        
        {/* Back and Switch Option Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate('/idriver')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-colors"
          >
            <span>&lt;</span> Back to Driver Hire
          </button>

          {/* Mode Switcher Pill */}
          <div className="bg-[#121420] p-1.5 rounded-2xl border border-white/10 flex items-center gap-1 shadow-lg">
            <button
              onClick={() => navigate('/choose-driver-with-car')}
              className="text-gray-400 hover:text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <span>🚗</span> Car + Driver Package
            </button>
            <button
              className="bg-red-600 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
            >
              <span>👤</span> Driver Only (Your Own Car)
            </button>
          </div>
        </div>

        {/* Hero Title Card */}
        <div className="bg-gradient-to-r from-[#121422] via-[#171928] to-[#121422] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-extrabold text-xs uppercase tracking-wider mb-3">
              <span>👤</span> PERSONAL CHAUFFEUR SERVICE (NO CAR REQUIRED)
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase font-sora tracking-tight mb-3">
              Hire <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-red-500">Personal Chauffeurs</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
              Have your own car? Hire a trusted, background-cleared personal chauffeur to drive your personal sedan, SUV, or luxury car for city commutes, events, business tours, or highway travel.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by driver name, transmission, skills..."
                className="w-full bg-black/60 border border-white/15 focus:border-red-500 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {filterOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSelectedFilter(opt)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedFilter === opt
                      ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── CHAUFFEUR LIST GRID ─── */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#121422] border border-white/10 rounded-3xl p-12">
            <span className="text-5xl block mb-3">👤</span>
            <h3 className="text-2xl font-bold text-white mb-2">No Personal Chauffeurs Found</h3>
            <p className="text-gray-400 text-sm mb-6">Try clearing your search filters to view all available chauffeurs.</p>
            <button
              onClick={() => { setSearch(''); setSelectedFilter('All'); }}
              className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((driver) => (
              <div
                key={driver.id}
                className="bg-gradient-to-b from-[#141624] via-[#10111A] to-[#0A0B10] border border-white/10 hover:border-red-500/50 rounded-3xl p-6 shadow-2xl hover:shadow-[0_15px_40px_rgba(220,38,38,0.2)] hover:-translate-y-2 transition-all duration-400 group flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Rate Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {driver.badge}
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-black text-white font-sora">${driver.hourlyRate}</span>
                      <span className="text-xs font-semibold text-gray-400">/hr</span>
                      <span className="text-[10px] text-gray-500 block">(${driver.dailyRate}/day)</span>
                    </div>
                  </div>

                  {/* Driver Header Row: Avatar + Name + Rating */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-md flex-shrink-0">
                      <img
                        src={driver.photo}
                        alt={driver.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_#22c55e]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white font-sora truncate group-hover:text-red-400 transition-colors">
                          {driver.name}
                        </h3>
                        <span className="text-green-400 text-xs" title="BRTA Verified">✓</span>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-400 text-xs">⭐</span>
                        <span className="text-white text-xs font-black">{driver.rating}</span>
                        <span className="text-gray-500 text-xs">({driver.trips.toLocaleString()} trips)</span>
                      </div>

                      <p className="text-xs text-gray-400 mt-1 font-semibold">
                        {driver.experience} Years Professional Experience
                      </p>
                    </div>
                  </div>

                  {/* Driver Qualifications & Vehicle Skills */}
                  <div className="space-y-2.5 bg-black/40 border border-white/5 rounded-2xl p-4 mb-6 text-xs text-gray-300">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-semibold">Transmission:</span>
                      <span className="font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        ⚙️ {driver.transmission}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-gray-400 font-semibold flex-shrink-0">Proficiency:</span>
                      <span className="font-semibold text-right text-gray-200 truncate">
                        🚘 {driver.proficiency}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-semibold">Languages:</span>
                      <span className="font-semibold text-gray-200">
                        🗣️ {driver.languages}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-semibold">License Verification:</span>
                      <span className="font-bold text-green-400 flex items-center gap-1">
                        <span>🛡️</span> Verified Class-A
                      </span>
                    </div>
                  </div>

                  {/* Trust Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-bold">
                      ✓ Police Cleared
                    </span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">
                      ✓ Non-Smoker
                    </span>
                    {driver.nightShiftReady && (
                      <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold">
                        🌙 Night Shift Ready
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action CTA Buttons */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <button
                    onClick={() => navigate(`/driver-chat?id=${driver.id}&name=${encodeURIComponent(driver.name)}&rating=${driver.rating}`)}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-white/10"
                  >
                    <span>💬</span> Chat
                  </button>
                  <button
                    onClick={() => navigate('/car-booking')}
                    className="flex-[2] py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Hire Chauffeur</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

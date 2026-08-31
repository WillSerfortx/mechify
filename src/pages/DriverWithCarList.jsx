import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

// Curated high quality driver + vehicle dataset
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
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
];

const carFleet = [
  {
    model: 'Toyota Land Cruiser Prado',
    type: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&h=450&fit=crop',
    seats: 7,
    luggage: 4,
    hourlyRate: 55,
    dailyRate: 320,
    features: ['4x4 Offroad', 'Leather Interior', 'Dual AC', 'Sunroof']
  },
  {
    model: 'Mercedes-Benz E-Class',
    type: 'Executive Luxury',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=700&h=450&fit=crop',
    seats: 4,
    luggage: 3,
    hourlyRate: 75,
    dailyRate: 450,
    features: ['Chauffeur Mode', 'Wi-Fi Onboard', 'Bottled Water', 'Silent Cabin']
  },
  {
    model: 'Toyota Camry Hybrid',
    type: 'Premium Sedan',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&h=450&fit=crop',
    seats: 4,
    luggage: 3,
    hourlyRate: 35,
    dailyRate: 190,
    features: ['Smooth Hybrid', 'Spacious Legroom', 'Climate Control', 'USB Ports']
  },
  {
    model: 'Hyundai Tucson Turbo',
    type: 'Compact SUV',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=700&h=450&fit=crop',
    seats: 5,
    luggage: 3,
    hourlyRate: 40,
    dailyRate: 230,
    features: ['Panoramic View', 'Comfort Seats', 'High Clearance', 'Apple CarPlay']
  },
  {
    model: 'Toyota HiAce Super Custom',
    type: 'Passenger Van',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=700&h=450&fit=crop',
    seats: 11,
    luggage: 8,
    hourlyRate: 60,
    dailyRate: 340,
    features: ['Large Group', 'Massive Boot Space', 'Rear AC Vents', 'Reclining Seats']
  },
  {
    model: 'Tesla Model 3 Performance',
    type: 'Electric Luxury',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=700&h=450&fit=crop',
    seats: 4,
    luggage: 2,
    hourlyRate: 65,
    dailyRate: 380,
    features: ['Zero Emissions', 'Autopilot Assist', 'Glass Roof', 'Instant Acceleration']
  }
];

const firstNames = ['Rahim', 'Karim', 'Farhan', 'Tanvir', 'Shakib', 'Masud', 'Arif', 'Hasan', 'Imran', 'Kabir', 'Zahid', 'Rashid'];
const lastNames = ['Ahmed', 'Chowdhury', 'Islam', 'Rahman', 'Khan', 'Siddique', 'Talukder', 'Bhuiyan', 'Uddin', 'Mia'];

function generateCarAndDriverPackages(count = 30) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const car = carFleet[i % carFleet.length];
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[i % lastNames.length];
    const photo = driverPhotos[i % driverPhotos.length];
    const rating = (4.6 + (i % 5) * 0.08).toFixed(1);
    const trips = 450 + i * 125;
    const exp = 4 + (i % 12);

    list.push({
      id: `cd-${i + 1}`,
      driverName: `${fname} ${lname}`,
      driverPhoto: photo,
      driverRating: parseFloat(rating),
      driverTrips: trips,
      driverExperience: exp,
      carModel: car.model,
      carType: car.type,
      carImage: car.image,
      seats: car.seats,
      luggage: car.luggage,
      hourlyRate: car.hourlyRate + (i % 3) * 5,
      dailyRate: car.dailyRate + (i % 3) * 20,
      features: car.features,
      verifiedChauffeur: true,
      fuelIncluded: true,
      insuranceCovered: true
    });
  }
  return list;
}

const packages = generateCarAndDriverPackages(24);

export default function DriverWithCarList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const vehicleTypes = ['All', 'Luxury SUV', 'Executive Luxury', 'Premium Sedan', 'Compact SUV', 'Passenger Van', 'Electric Luxury'];

  const filtered = useMemo(() => {
    return packages.filter(item => {
      const matchSearch =
        item.driverName.toLowerCase().includes(search.toLowerCase()) ||
        item.carModel.toLowerCase().includes(search.toLowerCase()) ||
        item.carType.toLowerCase().includes(search.toLowerCase());
      
      const matchType = selectedType === 'All' || item.carType === selectedType;
      return matchSearch && matchType;
    });
  }, [search, selectedType]);

  return (
    <div className="bg-[#08090C] min-h-screen text-white font-outfit pb-24 relative selection:bg-red-600">
      
      {/* Background Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-red-600/15 blur-[150px]" />
        <div className="absolute bottom-10 left-10 w-[700px] h-[600px] bg-orange-600/10 blur-[160px]" />
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
              className="bg-red-600 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
            >
              <span>🚗</span> Car + Driver Package
            </button>
            <button
              onClick={() => navigate('/choose-driver-only')}
              className="text-gray-400 hover:text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2"
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
              <span>🚗</span> FULL FLEET & CHAUFFEUR SERVICE
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase font-sora tracking-tight mb-3">
              Hire <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-red-500">Car with Driver</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
              Book an all-inclusive vehicle and verified executive chauffeur. Fuel, vehicle maintenance, commercial insurance, and professional driver allowance included in all packages.
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
                placeholder="Search Toyota Prado, Mercedes E-Class, driver name..."
                className="w-full bg-black/60 border border-white/15 focus:border-red-500 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>

            {/* Vehicle Type Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {vehicleTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedType === t
                      ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── PACKAGE CARDS GRID ─── */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#121422] border border-white/10 rounded-3xl p-12">
            <span className="text-5xl block mb-3">🚗</span>
            <h3 className="text-2xl font-bold text-white mb-2">No Car & Driver Packages Found</h3>
            <p className="text-gray-400 text-sm mb-6">Try clearing your search query or choosing another vehicle class.</p>
            <button
              onClick={() => { setSearch(''); setSelectedType('All'); }}
              className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-b from-[#141624] via-[#10111A] to-[#0A0B10] border border-white/10 hover:border-red-500/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_15px_40px_rgba(220,38,38,0.2)] hover:-translate-y-2 transition-all duration-400 group flex flex-col"
              >
                {/* Vehicle Showcase Image Header */}
                <div className="relative h-56 w-full overflow-hidden bg-black/60">
                  <img
                    src={item.carImage}
                    alt={item.carModel}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10111A] via-black/30 to-transparent" />

                  {/* Vehicle Type Badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {item.carType}
                  </div>

                  {/* Pricing Pill */}
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Package Rate</p>
                    <p className="text-lg font-black text-white font-sora">
                      ${item.hourlyRate}<span className="text-xs font-semibold text-gray-300">/hr</span>
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Car Model Title */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white font-sora group-hover:text-red-400 transition-colors">
                          {item.carModel}
                        </h2>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">👤 {item.seats} Seats</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">🧳 {item.luggage} Bags</span>
                          <span>•</span>
                          <span className="text-green-400 font-bold">✓ Fuel Included</span>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Feature Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.features.map((f, i) => (
                        <span key={i} className="text-[11px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-gray-300">
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Driver Profile Strip */}
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-3.5 mb-6 flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-red-500/40 flex-shrink-0">
                        <img src={item.driverPhoto} alt={item.driverName} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-white truncate">{item.driverName}</h4>
                          <span className="text-xs font-black text-yellow-400 flex items-center gap-1">
                            ⭐ {item.driverRating}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {item.driverExperience} yrs exp • {item.driverTrips.toLocaleString()} trips completed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action CTA Buttons */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => navigate(`/driver-chat?id=${item.id}&name=${encodeURIComponent(item.driverName)}&car=${encodeURIComponent(item.carModel)}`)}
                      className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-white/10"
                    >
                      <span>💬</span> Chat
                    </button>
                    <button
                      onClick={() => navigate('/car-booking')}
                      className="flex-[2] py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>Book Package</span>
                      <span>→</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

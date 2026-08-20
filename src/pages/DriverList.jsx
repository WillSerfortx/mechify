import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Generate 100 drivers with varied data
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
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop',
];

const firstNames = ['Rahim', 'Karim', 'Jamal', 'Farhan', 'Shakib', 'Tanvir', 'Masud', 'Arif', 'Roni', 'Sohel', 'Imran', 'Nasir', 'Kabir', 'Zahid', 'Hasan', 'Rashid', 'Salam', 'Nayeem', 'Sajid', 'Fahim', 'Liton', 'Rubel', 'Sumon', 'Mamun', 'Rasel'];
const lastNames = ['Ahmed', 'Islam', 'Hossain', 'Rahman', 'Khan', 'Ali', 'Mia', 'Uddin', 'Chowdhury', 'Akter', 'Sarker', 'Bhuiyan', 'Siddique', 'Talukder', 'Mondol'];

const vehicleTypes = ['Sedan', 'SUV', 'Luxury', 'Micro Bus', 'Hatchback', 'Crossover'];
const languages = ['Bangla, English', 'Bangla', 'Bangla, English, Hindi', 'Bangla, English, Arabic'];

function generateDrivers(count) {
  const drivers = [];
  for (let i = 0; i < count; i++) {
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[i % lastNames.length];
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    const trips = Math.floor(500 + Math.random() * 9500);
    const years = Math.floor(2 + Math.random() * 18);
    const vehicle = vehicleTypes[i % vehicleTypes.length];
    const lang = languages[i % languages.length];
    const photo = driverPhotos[i % driverPhotos.length];

    drivers.push({
      id: i + 1,
      name: `${fname} ${lname}`,
      rating: parseFloat(rating),
      totalTrips: trips,
      experience: years,
      vehicle,
      languages: lang,
      photo,
      available: Math.random() > 0.2,
    });
  }
  return drivers;
}

const allDrivers = generateDrivers(100);

// Star renderer
const Stars = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, idx) => (
      <span key={idx} className={`text-lg ${idx < Math.floor(rating) ? 'text-yellow-400' : idx < rating ? 'text-yellow-400/50' : 'text-gray-600'}`}>
        ★
      </span>
    ))}
    <span className="text-sm text-gray-400 ml-1 font-semibold">({rating})</span>
  </div>
);

export default function DriverList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = allDrivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-[#1a0000] via-black to-black pt-28 pb-16 px-6 md:px-12 lg:px-20">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-6 md:left-12 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors border border-white/20"
        >
          &lt;
        </button>

        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black mb-4 tracking-tight">
            Our <span className="text-[#E50914]">Drivers</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Choose from 100+ professional, verified drivers across Bangladesh. Every driver is background-checked, experienced, and ready to serve you.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or vehicle type..."
              className="w-full bg-white/10 border border-white/20 backdrop-blur-md rounded-full py-4 px-6 pl-14 text-white placeholder-gray-500 text-lg outline-none focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/30 transition-all"
            />
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <p className="text-gray-500 mt-4 text-sm">{filtered.length} drivers found</p>
        </div>
      </div>

      {/* Driver Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((driver) => (
            <div
              key={driver.id}
              className="group bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-[#E50914]/50 hover:shadow-[0_0_30px_rgba(229,9,20,0.15)] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Driver Photo */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={driver.photo}
                  alt={driver.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Availability Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${driver.available ? 'bg-green-500/90 text-white' : 'bg-gray-600/90 text-gray-300'}`}>
                  {driver.available ? '● Available' : '● Busy'}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                  <Stars rating={driver.rating} />
                </div>
              </div>

              {/* Driver Info */}
              <div className="p-5">
                <h3 className="text-xl font-black mb-3 group-hover:text-[#E50914] transition-colors duration-300">{driver.name}</h3>

                <div className="space-y-2 text-sm text-gray-400 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">🚗</span>
                    <span>{driver.vehicle} specialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">📅</span>
                    <span>{driver.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">🛣️</span>
                    <span>{driver.totalTrips.toLocaleString()} trips completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">🌐</span>
                    <span>{driver.languages}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat
                  </button>
                  <button
                    onClick={() => navigate('/car-booking')}
                    className="flex-1 bg-[#E50914] hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                  >
                    Book Driver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-2xl font-bold">No drivers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

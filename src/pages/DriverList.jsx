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

      {/* Driver List Container */}
      <div className="w-[95%] max-w-[1200px] mx-auto mt-10 translate-x-12 md:translate-x-40">
        <div className="flex flex-col gap-4">
          {filtered.map((driver) => (
            <div
              key={driver.id}
              className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all duration-300 flex flex-col md:flex-row items-center p-4 gap-6"
            >
              {/* Driver Photo */}
              <div className="relative w-full md:w-32 h-48 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={driver.photo}
                  alt={driver.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border border-black/20 ${driver.available ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-700 text-gray-300'}`}>
                  {driver.available ? 'Available' : 'Busy'}
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex-1 text-left w-full">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-black group-hover:text-red-500 transition-colors duration-300">{driver.name}</h3>
                  <Stars rating={driver.rating} />
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 mt-2">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m8-1v1m-1-4V8a2 2 0 00-2-2H9a2 2 0 00-2 2v3" /></svg>
                    <span>{driver.vehicle} specialist</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>{driver.experience} years exp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    <span>{driver.totalTrips.toLocaleString()} trips</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{driver.languages}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => navigate(`/driver-chat?id=${driver.id}&name=${encodeURIComponent(driver.name)}&rating=${driver.rating}`)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                </button>
                <button
                  onClick={() => navigate('/car-booking')}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] whitespace-nowrap"
                >
                  Book Driver
                </button>
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

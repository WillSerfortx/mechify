import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const rideTypes = [
  {
    id: 'standard',
    label: 'Standard',
    icon: '🚗',
    desc: 'Comfortable everyday rides',
    price: 'From ৳150/km',
    features: ['AC Car', 'Experienced Driver', 'Real-time Tracking'],
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'green',
    label: 'Green',
    icon: '🌿',
    desc: 'Eco-friendly electric vehicles',
    price: 'From ৳120/km',
    features: ['Electric Vehicle', 'Zero Emissions', 'Quiet & Smooth'],
    color: 'from-green-900 to-gray-900',
  },
  {
    id: 'business',
    label: 'Business',
    icon: '💼',
    desc: 'Premium luxury experience',
    price: 'From ৳350/km',
    features: ['Luxury Sedan', 'Professional Driver', 'Priority Support'],
    color: 'from-amber-900 to-gray-900',
  },
];

const drivers = [
  {
    name: 'Rahim Uddin',
    rating: 4.9,
    trips: 2340,
    vehicle: 'Toyota Aqua (Green)',
    plate: 'DHA-GA-1234',
    type: 'green',
    eta: '4 min',
    avatar: 'https://i.pravatar.cc/150?img=11',
    status: 'online',
  },
  {
    name: 'Karim Hossain',
    rating: 4.8,
    trips: 1876,
    vehicle: 'Honda Civic',
    plate: 'DHA-TA-5678',
    type: 'standard',
    eta: '7 min',
    avatar: 'https://i.pravatar.cc/150?img=33',
    status: 'online',
  },
  {
    name: 'Sayed Ali',
    rating: 5.0,
    trips: 987,
    vehicle: 'BMW 7 Series',
    plate: 'DHA-MA-9999',
    type: 'business',
    eta: '12 min',
    avatar: 'https://i.pravatar.cc/150?img=52',
    status: 'online',
  },
  {
    name: 'Farhan Ahmed',
    rating: 4.7,
    trips: 3102,
    vehicle: 'Toyota Prius (Hybrid)',
    plate: 'DHA-BA-2345',
    type: 'green',
    eta: '6 min',
    avatar: 'https://i.pravatar.cc/150?img=60',
    status: 'online',
  },
];

const typeColors = {
  standard: 'bg-blue-600',
  green: 'bg-green-600',
  business: 'bg-amber-600',
};

export default function IDriver() {
  const [activeTab, setActiveTab] = useState('standard');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const navigate = useNavigate();

  const filteredDrivers = drivers.filter(d => d.type === activeTab);

  const handleBook = () => {
    if (!pickup || !dropoff) {
      alert('Please enter both pick-up and drop-off locations.');
      return;
    }
    if (!selectedDriver) {
      alert('Please select a driver first.');
      return;
    }
    navigate('/payment-select');
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit pt-24 pb-16">

      {/* ── Header ── */}
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">On-Demand Rides</span>
        <h1 className="text-5xl md:text-7xl font-black mt-2 mb-3">
          i<span className="text-red-500">Driver</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Book a professional driver in minutes. Choose your ride type, set your route, and go.
        </p>
      </div>

      <div className="px-6 md:px-12 lg:px-20 grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-[1600px] mx-auto">

        {/* ── LEFT: Booking Panel ── */}
        <div className="xl:col-span-1 space-y-6">

          {/* Ride Type Tabs */}
          <div className="glass rounded-2xl p-2 flex gap-2">
            {rideTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => { setActiveTab(type.id); setSelectedDriver(null); }}
                className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === type.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-2xl">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>

          {/* Active Ride Info */}
          {rideTypes.filter(t => t.id === activeTab).map(type => (
            <div key={type.id} className={`glass rounded-2xl p-5 bg-gradient-to-br ${type.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{type.icon}</span>
                <div>
                  <div className="font-black text-lg">{type.label}</div>
                  <div className="text-gray-300 text-sm">{type.desc}</div>
                </div>
              </div>
              <div className="text-red-400 font-bold text-lg mb-3">{type.price}</div>
              <div className="space-y-1">
                {type.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Location Inputs */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-lg">Your Route</h3>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 text-lg">📍</span>
              <input
                id="pickup-input"
                type="text"
                placeholder="Pick-up location"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm"
              />
            </div>

            <div className="flex justify-center">
              <div className="w-px h-6 bg-white/20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">↕</div>
              </div>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-lg">🏁</span>
              <input
                id="dropoff-input"
                type="text"
                placeholder="Drop-off location"
                value={dropoff}
                onChange={e => setDropoff(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Book Button */}
          <button
            id="book-driver-btn"
            onClick={handleBook}
            className="btn-red-glow w-full py-4 text-xl font-black"
          >
            {selectedDriver ? `Book ${selectedDriver.name} →` : 'Select a Driver Below'}
          </button>
        </div>

        {/* ── RIGHT: Map + Drivers ── */}
        <div className="xl:col-span-2 space-y-6">

          {/* Map Placeholder */}
          <div className="relative rounded-2xl overflow-hidden" style={{ height: '300px' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2040] to-[#05101e]" />
            {/* Simulated map grid */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            {/* Road lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 300">
              <path d="M0,150 Q200,80 400,150 T800,150" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="8,4"/>
              <path d="M0,200 Q300,100 600,200 T800,180" stroke="#1d4ed8" strokeWidth="2" fill="none"/>
              <path d="M200,0 Q250,150 230,300" stroke="#3b82f6" strokeWidth="2" fill="none"/>
              <path d="M550,0 Q580,150 560,300" stroke="#3b82f6" strokeWidth="2" fill="none"/>
            </svg>
            {/* Pulsing dots for drivers */}
            {[
              { cx: '30%', cy: '40%' },
              { cx: '55%', cy: '60%' },
              { cx: '70%', cy: '35%' },
            ].map((pos, i) => (
              <div key={i} className="absolute" style={{ left: pos.cx, top: pos.cy }}>
                <div className="relative w-4 h-4">
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
                  <div className="relative w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[6px]">🚗</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Your location */}
            <div className="absolute" style={{ left: '48%', top: '45%' }}>
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-60" />
                <div className="relative w-5 h-5 bg-blue-500 rounded-full border-2 border-white" />
              </div>
            </div>
            <div className="absolute top-4 left-4 glass rounded-xl px-4 py-2 text-sm font-semibold">
              📍 Live Map — Dhaka, Bangladesh
            </div>
            <div className="absolute bottom-4 right-4 glass rounded-xl px-3 py-1.5 text-xs text-gray-300">
              🔴 Drivers nearby • 🔵 Your location
            </div>
          </div>

          {/* Driver Cards */}
          <div>
            <h2 className="text-2xl font-black mb-4">
              Available Drivers
              <span className={`ml-3 text-sm font-bold px-3 py-1 rounded-full ${typeColors[activeTab]}`}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDrivers.length > 0 ? filteredDrivers.map((driver, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDriver(driver)}
                  className={`text-left glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 border-2 ${
                    selectedDriver?.name === driver.name
                      ? 'border-red-500 shadow-lg shadow-red-500/20'
                      : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={driver.avatar}
                        alt={driver.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-lg truncate">{driver.name}</h3>
                        <span className="text-yellow-400 text-sm font-bold ml-2 flex-shrink-0">⭐ {driver.rating}</span>
                      </div>
                      <p className="text-gray-400 text-sm truncate">{driver.vehicle}</p>
                      <p className="text-gray-500 text-xs">{driver.plate}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs bg-white/10 rounded-full px-3 py-1 text-gray-300">
                          🕐 ETA: {driver.eta}
                        </span>
                        <span className="text-xs text-gray-400">{driver.trips.toLocaleString()} trips</span>
                      </div>
                    </div>
                  </div>
                  {selectedDriver?.name === driver.name && (
                    <div className="mt-3 text-red-400 text-sm font-semibold flex items-center gap-1">
                      ✓ Selected — tap "Book" to confirm
                    </div>
                  )}
                </button>
              )) : (
                <div className="col-span-2 text-center py-12 text-gray-500">
                  <span className="text-5xl">🚗</span>
                  <p className="mt-3">No drivers available for this category right now.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

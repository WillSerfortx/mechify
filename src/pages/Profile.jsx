import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  // We'll default these to true for demonstration purposes so the user can see the whole dashboard in action.
  const hasActiveDelivery = location.state?.activeDelivery ?? true;
  const hasActiveWorkshop = location.state?.activeWorkshop ?? true;
  const hasHiredDriver = location.state?.hiredDriver ?? true;
  const hasRentedCar = location.state?.rentedCar ?? true;
  
  const workshopDate = location.state?.date || 'Today';
  const workshopTime = location.state?.time || '10:00 AM';
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasActiveDelivery) {
      const interval = setInterval(() => {
        setProgress(p => (p < 100 ? p + 1 : 100));
      }, 300); // Simulate progress over 30 seconds
      return () => clearInterval(interval);
    }
  }, [hasActiveDelivery]);

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24 pt-32 px-6 md:px-12 lg:px-20">
      
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar: User Info */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl sticky top-32">
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="w-28 h-28 bg-gray-800 rounded-full border-4 border-red-600 mb-4 overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <img src="https://ui-avatars.com/api/?name=Washiur+Rahman&background=random&color=fff&size=128" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-black mb-1">Washiur Rahman</h2>
              <p className="text-red-500 font-bold text-sm tracking-wide uppercase mb-4">Premium Member</p>
              
              <div className="w-full bg-black/50 rounded-xl p-4 text-left border border-white/5 mb-6">
                <p className="text-gray-400 text-xs uppercase font-bold mb-1">Email</p>
                <p className="text-sm font-semibold mb-3">washiurrahman@example.com</p>
                <p className="text-gray-400 text-xs uppercase font-bold mb-1">Phone</p>
                <p className="text-sm font-semibold mb-3">+880 1516 520602</p>
                <p className="text-gray-400 text-xs uppercase font-bold mb-1">Address</p>
                <p className="text-sm font-semibold">House 3, Lane 1 Baridhara DOHS, Dhaka 1206</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full text-left bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                Active Dashboard
              </button>
              <button className="w-full text-left bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 px-4 rounded-xl transition-colors">
                Order History
              </button>
              <button className="w-full text-left bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 px-4 rounded-xl transition-colors">
                Payment Methods
              </button>
              <button className="w-full text-left bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 px-4 rounded-xl transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Right Content: Dashboard */}
        <div className="w-full lg:w-3/4">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl animate-bounce" style={{ animationDuration: '3s' }}>🧑</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-black">My Dashboard</h1>
              <p className="text-gray-400 mt-1">Track all your ongoing services, drivers, and rentals in real-time.</p>
            </div>
          </div>
          
          {/* Ongoing Driver Hire Section */}
          {hasHiredDriver && (
            <div className="bg-white/5 border border-white/20 rounded-3xl p-6 shadow-xl animate-fadeIn mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest z-10">Ongoing</div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-red-500 text-3xl">👨‍✈️</span> Hired Driver
              </h2>
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-black/40 rounded-2xl p-6 border border-white/5">
                <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop" alt="Driver" className="w-24 h-24 rounded-full border-2 border-red-500 object-cover" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black mb-1">Ahmed Reza</h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold text-gray-300">4.9 / 5.0</span>
                    <span className="text-gray-500 text-sm">• 8 Years Exp.</span>
                  </div>
                  <p className="text-gray-400 text-sm">Assigned for today's trip. The driver is currently waiting at your pickup location.</p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    💬 Chat
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    📞 Call Driver
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Rented Car Section */}
          {hasRentedCar && (
            <div className="bg-white/5 border border-white/20 rounded-3xl p-6 shadow-xl animate-fadeIn mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest z-10">Active Rental</div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-red-500 text-3xl">🏎️</span> Rented Car
              </h2>
              <div className="flex flex-col md:flex-row gap-6 bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
                <div className="w-full md:w-1/3 aspect-video md:aspect-auto">
                  <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop" alt="Mercedes" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-red-500 text-xs uppercase font-bold tracking-widest mb-1">Mercedes-Benz</p>
                      <h3 className="text-3xl font-black">AMG GT 2023</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs uppercase font-bold mb-1">Return Date</p>
                      <p className="text-xl font-bold text-white">Oct 25, 2026</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto border-t border-white/10 pt-4">
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Speed</p>
                      <p className="font-semibold text-sm">190mph</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Transmission</p>
                      <p className="font-semibold text-sm">9-Speed Auto</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Engine</p>
                      <p className="font-semibold text-sm">577hp V8</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold">License Plate</p>
                      <p className="font-semibold text-sm font-mono text-red-400">DHK-9921</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Emergency Tracking (Map) */}
          {hasActiveDelivery && (
            <div className="bg-white/5 border border-red-600/50 rounded-3xl p-1 shadow-[0_0_30px_rgba(220,38,38,0.15)] animate-fadeIn mb-8 relative">
              <div className="absolute top-0 right-4 bg-red-600 text-white text-xs font-black px-4 py-1 rounded-b-xl uppercase tracking-widest z-10 animate-pulse">Emergency</div>
              <div className="bg-black rounded-[22px] p-6 md:p-8">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="animate-pulse w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                      <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest">Active Dispatch</h2>
                    </div>
                    <p className="text-gray-400 font-semibold text-sm md:text-base">Emergency Fuel & Mechanic Team is en route to your location.</p>
                  </div>
                  <div className="mt-4 md:mt-0 bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg font-mono font-bold text-xl shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    ETA: 12 MIN
                  </div>
                </div>

                {/* Simulated Map Container */}
                <div className="w-full h-[350px] md:h-[450px] bg-gray-900 rounded-2xl border border-white/20 relative overflow-hidden mb-6 group cursor-crosshair">
                  {/* Google Maps Embed iframe (Simulation of a map) */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700312014169!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c655075c3dbb%3A0xc39f9972cc945892!2sBaridhara%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1715000000000!5m2!1sen!2sbd&maptype=satellite" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }} // Dark mode filter
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Active Route Map"
                  ></iframe>
                  
                  {/* Overlay simulating a route line and moving truck */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                      {/* Fake Route Line */}
                      <path d="M 800 100 C 600 200, 400 300, 200 400" fill="none" stroke="#dc2626" strokeWidth="6" strokeDasharray="15 10" className="animate-[marquee_20s_linear_infinite]" opacity="0.6" />
                      
                      {/* User Pin */}
                      <circle cx="200" cy="400" r="10" fill="white" stroke="#dc2626" strokeWidth="4" />
                      <text x="220" y="405" fill="white" fontSize="16" fontWeight="bold">You</text>
                    </svg>

                    {/* Fake Truck marker moving along path */}
                    <div 
                      className="absolute w-12 h-12 bg-red-600 rounded-full border-4 border-white flex items-center justify-center text-xl shadow-[0_0_20px_rgba(220,38,38,0.8)] transition-all duration-300"
                      style={{ 
                        left: `${80 - (progress * 0.6)}%`, 
                        top: `${20 + (progress * 0.6)}%`,
                        transform: 'translate(-50%, -50%)' 
                      }}
                    >
                      🚚
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
                    <span>Dispatched</span>
                    <span>Arriving</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-white/10 relative">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-800 to-red-500 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-gray-400 mt-4 text-sm font-semibold">Payment Method: <span className="text-white">Cash On Delivery</span></p>
                </div>
                
              </div>
            </div>
          )}

          {hasActiveWorkshop && (
            <div className="bg-white/5 border border-white/20 rounded-3xl p-6 shadow-xl animate-fadeIn mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-red-500 text-3xl">🗓️</span> Workshop Appointment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-colors">
                  <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider font-bold">Location</p>
                  <p className="text-xl font-black">Mechify Main Workshop</p>
                  <p className="text-green-500 font-bold text-sm mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Confirmed
                  </p>
                </div>
                <div className="bg-black border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-colors">
                  <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider font-bold">Date & Time</p>
                  <p className="text-xl font-black text-red-500">{workshopDate}</p>
                  <p className="text-xl font-black">{workshopTime}</p>
                </div>
              </div>
            </div>
          )}

          {(!hasActiveDelivery && !hasActiveWorkshop && !hasHiredDriver && !hasRentedCar) && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center text-gray-400 mt-12">
              <span className="text-6xl block mb-6 opacity-50">📂</span>
              <p className="text-3xl font-black text-white mb-2">No Active Services</p>
              <p className="mt-2 text-lg">When you request a service, rent a car, or hire a driver, it will appear here.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

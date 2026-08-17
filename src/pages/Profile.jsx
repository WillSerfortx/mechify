import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const hasActiveDelivery = location.state?.activeDelivery || false;
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
      
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar: User Info */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl sticky top-32">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-800 rounded-full border-2 border-red-600 mb-4 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=User+Name&background=random&color=fff&size=128" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-black">John Doe</h2>
              <p className="text-gray-400 text-sm">Premium Member</p>
            </div>
            
            <div className="space-y-4">
              <button className="w-full text-left bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                Active Orders
              </button>
              <button className="w-full text-left bg-transparent hover:bg-white/10 text-gray-300 font-bold py-3 px-4 rounded-xl transition-colors">
                Order History
              </button>
              <button className="w-full text-left bg-transparent hover:bg-white/10 text-gray-300 font-bold py-3 px-4 rounded-xl transition-colors">
                Payment Methods
              </button>
              <button className="w-full text-left bg-transparent hover:bg-white/10 text-gray-300 font-bold py-3 px-4 rounded-xl transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Right Content: Map / Dashboard */}
        <div className="w-full lg:w-3/4">
          <h1 className="text-4xl font-black mb-8">Dashboard</h1>
          
          {hasActiveDelivery ? (
            <div className="bg-white/5 border border-red-600/50 rounded-3xl p-1 shadow-[0_0_30px_rgba(220,38,38,0.15)] animate-fadeIn">
              <div className="bg-black rounded-[22px] p-6 md:p-8">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="animate-pulse w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                      <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest">Active Delivery</h2>
                    </div>
                    <p className="text-gray-400 font-semibold">Emergency Fuel Truck is en route to your location.</p>
                  </div>
                  <div className="mt-4 md:mt-0 bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg font-mono font-bold text-xl">
                    ETA: 12 MIN
                  </div>
                </div>

                {/* Simulated Map Container */}
                <div className="w-full h-[400px] md:h-[500px] bg-gray-900 rounded-2xl border border-white/20 relative overflow-hidden mb-6 group cursor-crosshair">
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
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-red-800 to-red-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-gray-400 mt-3 text-sm">Payment Method: <span className="text-white font-bold">Cash On Delivery</span></p>
                </div>
                
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center text-gray-400">
              <span className="text-5xl block mb-4 opacity-50">📦</span>
              <p className="text-xl font-bold">No active orders right now.</p>
              <p className="mt-2 text-sm">When you request a service, it will appear here.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useState } from 'react';

const imgLogo = "https://placehold.co/120x96/111/fff?text=Logo";
const imgAvatar = "https://placehold.co/400x400/222/fff?text=Profile+Pic";

const previousServices = [
  { name: 'Fuel Delivery', price: '4,999TK' },
  { name: 'Emergency Service', price: '10,999TK' },
  { name: 'Fuel Delivery', price: '4,999TK' },
  { name: 'Fuel Delivery', price: '4,999TK' },
  { name: 'Fuel Delivery', price: '4,999TK' },
];

const sidebarItems = ['Home', 'Contacts', 'DRIVERS', 'SETTINGS', 'Contacts'];

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-black min-h-screen pt-8 pb-24 text-white font-sora">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 gap-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white text-2xl hover:text-red-500 transition-colors">◁</Link>
          <div className="w-24 h-20 overflow-hidden bg-white/10 rounded-lg p-2">
            <img src={imgLogo} alt="Mechify" className="w-full h-full object-contain" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fadeIn text-center">Mechify User Profile Dashboard</h1>
        <div className="text-3xl md:text-4xl cursor-pointer hover:scale-110 transition-transform">🛒</div>
      </div>

      <div className="flex flex-col lg:flex-row mt-12 px-6 md:px-12 lg:px-24 gap-8 max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 animate-slideInLeft flex flex-col justify-between">
          <div className="space-y-4">
            {sidebarItems.map((item, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`w-full text-left px-6 py-4 rounded-lg text-lg md:text-xl font-semibold transition-all duration-300 border ${activeTab === i ? 'bg-red-600 border-red-600 text-white' : 'bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white'}`}>
                {item}
              </button>
            ))}
          </div>

          <button className="mt-12 lg:mt-32 w-full lg:w-4/5 bg-red-700 text-white font-bold text-xl md:text-2xl py-4 px-6 rounded-lg hover:bg-red-800 transition-all duration-300 mx-auto lg:mx-0">
            Log out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col xl:flex-row gap-8">
          {/* Profile Card */}
          <div className="border border-white/30 rounded-2xl p-6 md:p-10 w-full xl:w-2/3 animate-fadeInUp bg-white/5 shadow-xl">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-xl overflow-hidden mb-8 mx-auto ring-4 ring-white/10">
              <img src={imgAvatar} alt="Profile" className="w-full h-full object-cover" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center sm:text-left">My Profile</h2>

            <div className="space-y-4 max-w-lg mx-auto sm:mx-0">
              <div className="bg-black/50 border border-white/50 rounded-full px-6 py-3 text-center text-sm sm:text-base md:text-lg">Washiur Rahman</div>
              <div className="bg-black/50 border border-white/50 rounded-full px-6 py-3 text-center text-sm sm:text-base md:text-lg truncate">mrahaman2331077@bsc.cse.uiu.ac.bd</div>
              <div className="bg-black/50 border border-white/50 rounded-full px-6 py-3 text-center text-sm sm:text-base md:text-lg">01516520602</div>
              <div className="bg-black/50 border border-white/50 rounded-full px-6 py-3 text-center text-sm sm:text-base md:text-lg">Lane 1 Baridhara Dohs</div>
            </div>

            <div className="flex justify-center sm:justify-start mt-8">
               <button className="bg-red-600 text-white font-bold text-lg px-12 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30">
                 Edit
               </button>
            </div>
          </div>

          {/* Right Panels */}
          <div className="w-full xl:w-1/3 space-y-8">
            {/* Previous Services */}
            <div className="border border-white/30 rounded-2xl p-6 md:p-8 animate-slideInRight bg-white/5 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Previous Services</h3>
              <div className="space-y-4">
                {previousServices.map((service, i) => (
                  <div key={i} className="flex justify-between text-base md:text-lg border-b border-white/10 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-300">{service.name}</span>
                    <span className="font-semibold">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Services */}
            <div className="border border-white/30 rounded-2xl p-6 md:p-8 animate-slideInRight delay-200 bg-white/5 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Ongoing Services</h3>
              <p className="text-red-500 text-2xl md:text-3xl font-bold leading-tight">Workshop<br/>Appointment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

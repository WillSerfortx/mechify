import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const imgLogo = null; // using text logo
const imgAvatar = 'https://i.pravatar.cc/400?img=68';

const previousServices = [
  { name: 'Fuel Delivery', price: '৳4,999', date: 'Aug 14, 2026', icon: '⛽' },
  { name: 'Emergency Service', price: '৳10,999', date: 'Aug 10, 2026', icon: '🚨' },
  { name: 'Workshop Repair', price: '৳7,500', date: 'Jul 28, 2026', icon: '🔧' },
  { name: 'Car Rental', price: '৳15,000', date: 'Jul 20, 2026', icon: '🚗' },
  { name: 'Driver Hire', price: '৳3,200', date: 'Jul 15, 2026', icon: '👨‍✈️' },
];

const paymentMethods = [
  { name: 'Visa', last4: '4242', color: '#1A1F71', icon: '💳', type: 'card' },
  { name: 'bKash', number: '01516-XXXXX', color: '#E2136E', icon: '📱', type: 'mobile' },
  { name: 'Nagad', number: '01516-XXXXX', color: '#F7941D', icon: '💰', type: 'mobile' },
  { name: 'Cash on Delivery', number: 'Pay when arrived', color: '#16a34a', icon: '💵', type: 'cash' },
];

const vehicle = {
  make: 'Toyota',
  model: 'Corolla',
  year: '2020',
  plate: 'Dhaka Metro-Gha 11-2345',
  color: 'Pearl White',
  type: 'Sedan',
};

const sidebarItems = [
  { label: 'My Profile', icon: '👤' },
  { label: 'My Vehicle', icon: '🚗' },
  { label: 'Payment Methods', icon: '💳' },
  { label: 'Drivers', icon: '👨‍✈️' },
  { label: 'Settings', icon: '⚙️' },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="bg-[#050505] min-h-screen pb-16 text-white font-outfit">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white text-xl hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-white/10">
            ←
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-base">M</span>
            </div>
            <span className="text-white font-black text-xl">Mech<span className="text-red-500">ify</span></span>
          </div>
        </div>
        <h1 className="text-xl md:text-2xl font-black hidden sm:block">User Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-semibold hidden sm:block">Online</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-6 px-6 md:px-12 gap-6 max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="glass rounded-2xl p-4 space-y-2">
            {/* User mini card */}
            <div className="flex items-center gap-3 p-3 mb-4 border-b border-white/10">
              <img src={imgAvatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-red-500" />
              <div>
                <div className="font-bold text-sm">Washiur Rahman</div>
                <div className="text-gray-400 text-xs">Premium Member</div>
              </div>
            </div>

            {sidebarItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}

            <button
              className="mt-4 w-full bg-transparent border border-red-600 text-red-400 font-bold py-3 px-4 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm"
              onClick={() => navigate('/')}
            >
              <span>🚪</span> Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Tab: My Profile */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fadeIn">
              {/* Profile Card */}
              <div className="xl:col-span-2 glass rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                  <div className="relative">
                    <img src={imgAvatar} alt="Profile" className="w-28 h-28 rounded-2xl object-cover border-2 border-white/20" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-red-700 transition-colors">✏️</div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black mb-1">Washiur Rahman</h2>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-600/40">Premium Member</span>
                      <span className="text-green-400 text-xs">● Active</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: 'Washiur Rahman', icon: '👤' },
                    { label: 'Email', value: 'wrmahi777@gmail.com', icon: '✉️' },
                    { label: 'Phone', value: '+880 1516-520602', icon: '📱' },
                    { label: 'Address', value: 'Lane 1, Baridhara DOHS, Dhaka', icon: '📍' },
                  ].map((field, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl px-5 py-4 border border-white/10">
                      <span className="text-xl flex-shrink-0">{field.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-400 text-xs mb-0.5">{field.label}</div>
                        <div className="text-white font-semibold text-sm truncate">{field.value}</div>
                      </div>
                      <button className="text-gray-500 hover:text-red-400 transition-colors text-sm">Edit</button>
                    </div>
                  ))}
                </div>

                <button className="btn-red-glow mt-6 px-8 py-3 font-bold">
                  Save Changes
                </button>
              </div>

              {/* Side Panels */}
              <div className="space-y-5">
                {/* Previous Services */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-black mb-5">Recent Services</h3>
                  <div className="space-y-3">
                    {previousServices.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                        <span className="text-2xl">{s.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">{s.name}</div>
                          <div className="text-gray-500 text-xs">{s.date}</div>
                        </div>
                        <span className="text-red-400 font-bold text-sm flex-shrink-0">{s.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ongoing */}
                <div className="glass rounded-2xl p-6 border border-red-600/30">
                  <h3 className="text-xl font-black mb-3">Ongoing Service</h3>
                  <div className="flex items-center gap-3 bg-red-600/10 rounded-xl p-4">
                    <span className="text-3xl">🔧</span>
                    <div>
                      <div className="font-bold text-red-400">Workshop Appointment</div>
                      <div className="text-gray-400 text-xs mt-1">Mirpur Workshop · Today 3PM</div>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-xs font-semibold">In Progress</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: My Vehicle */}
          {activeTab === 1 && (
            <div className="glass rounded-2xl p-8 animate-fadeIn">
              <h2 className="text-3xl font-black mb-8">My Vehicle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.entries(vehicle).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between bg-white/5 rounded-xl px-5 py-4 border border-white/10">
                      <span className="text-gray-400 text-sm capitalize">{key}</span>
                      <span className="text-white font-bold">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="glass rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-6xl mb-4">🚗</div>
                    <div className="text-2xl font-black">{vehicle.make} {vehicle.model}</div>
                    <div className="text-gray-400">{vehicle.year} · {vehicle.color}</div>
                    <div className="mt-4 bg-red-600/20 text-red-400 rounded-xl py-2 px-4 text-sm font-semibold border border-red-600/30">
                      {vehicle.plate}
                    </div>
                  </div>
                  <button className="btn-red-glow py-3 font-bold">+ Add Another Vehicle</button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Payment Methods */}
          {activeTab === 2 && (
            <div className="glass rounded-2xl p-8 animate-fadeIn">
              <h2 className="text-3xl font-black mb-8">Payment Methods</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {paymentMethods.map((method, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${method.color}22, ${method.color}08)` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{method.icon}</span>
                      <span className="text-xs bg-white/10 rounded-full px-3 py-1 text-gray-300 capitalize">{method.type}</span>
                    </div>
                    <div className="font-black text-xl mb-1">{method.name}</div>
                    <div className="text-gray-400 text-sm">
                      {method.last4 ? `•••• •••• •••• ${method.last4}` : method.number}
                    </div>
                    <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full" title="Active" />
                  </div>
                ))}
              </div>
              <button className="btn-red-glow px-8 py-3 font-bold">+ Add Payment Method</button>
            </div>
          )}

          {/* Other tabs */}
          {activeTab >= 3 && (
            <div className="glass rounded-2xl p-12 text-center animate-fadeIn">
              <div className="text-6xl mb-4">{sidebarItems[activeTab].icon}</div>
              <h2 className="text-2xl font-black mb-2">{sidebarItems[activeTab].label}</h2>
              <p className="text-gray-400">This section is coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

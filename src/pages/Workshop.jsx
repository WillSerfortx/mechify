import { Link } from 'react-router-dom';

const specialists = [
  { name: 'Tony Stark', role: 'Founder of Mechify', img: 'https://images.unsplash.com/photo-1549405615-559d28dbd69c?w=400&h=400&fit=crop' }, // Using Iron Man-esque placeholder
  { name: 'Bruce Wayne', role: 'Main Mechanic', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
  { name: 'Clark Kent', role: 'Mechanic', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { name: 'Walter White', role: 'Mechanic', img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop' },
];

export default function Workshop() {
  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden min-h-[70vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&h=1080&fit=crop" 
            alt="Garage" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Professional Car Repair<br />
            And Maintenance
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8">
            We are focused on providing our clients with the highest level of quality and excellent customer support
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-transform hover:scale-105">
            Get an Appointment now
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 -mt-16 relative z-20">
        
        {/* 3 Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { title: 'Performance\nCheck', icon: '⚙️' },
            { title: 'Auto\nRepair', icon: '🔧' },
            { title: 'Fleet\nService', icon: '🚗' },
          ].map((card, i) => (
            <div key={i} className="bg-black border-2 border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center aspect-[4/3] hover:border-white/40 transition-colors">
              <div className="text-5xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold whitespace-pre-line leading-tight">{card.title}</h3>
            </div>
          ))}
        </div>

        {/* Why Us */}
        <div className="mb-32">
          <h2 className="text-3xl font-black mb-6">Why us?</h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            All Mechanic 128 workshops employ the latest test techniques and digital information systems. 
            This ideal combination ensures systematic vehicle diagnosis and qualified repair work.
          </p>
        </div>

        {/* SERVICES (Numbered) */}
        <div className="mb-32">
          <h2 className="text-5xl font-black text-center mb-20 uppercase">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: '1', title: 'Inspection', desc: 'We can provide professional servicing and maintenance work with no loss of manufacturer warranty coverage.' },
              { num: '2', title: 'Diagnostic', desc: 'A computerized car diagnostic check from Mechanic 128 will give you a true picture of how your vehicle is running.' },
              { num: '3', title: 'Upgrades', desc: 'Rather than sending your car for a basic service, ask Mechanic 128 for a thorough multi-point check and upgrade your car.' },
            ].map((srv, i) => (
              <div key={i} className="text-center">
                <div className="text-8xl font-black text-transparent stroke-text mb-6" style={{ WebkitTextStroke: '1px white' }}>{srv.num}</div>
                <h3 className="text-2xl font-black mb-4">{srv.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
          {[
            { label: 'SCHEDULE', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=600&fit=crop' },
            { label: 'ENGINE', img: 'https://images.unsplash.com/photo-1486262715619-670810a0740f?w=400&h=600&fit=crop' },
            { label: 'PAINTING', img: 'https://images.unsplash.com/photo-1599304918731-cd8e7b1c4e97?w=400&h=600&fit=crop' },
            { label: 'DETAILING', img: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=600&fit=crop' },
          ].map((item, i) => (
            <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/20">
              <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-6">
                <span className="font-black text-lg tracking-widest">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Specialists */}
        <div className="mb-32">
          <h2 className="text-4xl font-black uppercase mb-12">Meet Our Specialists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialists.map((spec, i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-white/20 mb-4 bg-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <img src={spec.img} alt={spec.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-xl">{spec.name}</h3>
                <p className="text-gray-400 text-sm">{spec.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Form */}
        <div className="flex flex-col lg:flex-row gap-16 items-start bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-3xl">
          <div className="flex-1 w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold mb-2">Name</label>
                <input type="text" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Phone</label>
                <input type="text" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Car model</label>
                <input type="text" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Email Address</label>
                <input type="email" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Car Reg Number</label>
                <input type="text" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">NID Number</label>
                <input type="text" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">Message</label>
              <textarea rows="4" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 resize-none"></textarea>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full transition-transform hover:scale-105">
              Get a Workshop now
            </button>
          </div>

          <div className="w-full lg:w-1/3 text-white">
            <h2 className="text-4xl font-black mb-10 leading-tight uppercase">Get a Free<br/>Appointment</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-xl">✉️</span>
                <span className="text-sm">washiurrahman7771@kuet.ac.bd</span>
              </div>
              <div className="flex gap-4">
                <span className="text-xl">📍</span>
                <span className="text-sm">Lane 1 Block A Baridhara Dohs</span>
              </div>
              <div className="flex gap-4">
                <span className="text-xl">📞</span>
                <span className="text-sm">+8801516520602<br/>+8801516520602</span>
              </div>
              <div className="flex gap-4 mt-8">
                <span className="text-2xl cursor-pointer hover:text-red-500">📸</span>
                <span className="text-2xl cursor-pointer hover:text-red-500">📘</span>
                <span className="text-2xl cursor-pointer hover:text-red-500">🐦</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

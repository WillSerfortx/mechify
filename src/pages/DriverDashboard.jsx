import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'passenger', text: 'Hi! Are you nearby?', time: '10:42 AM' }
  ]);
  
  const chatScrollRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate an incoming request shortly after going online
  useEffect(() => {
    let timer;
    if (isOnline) {
      timer = setTimeout(() => setIncomingRequest(true), 4000);
    } else {
      setIncomingRequest(false);
    }
    return () => clearTimeout(timer);
  }, [isOnline]);

  const handleAccept = () => {
    alert("Request Accepted! Navigating to pickup...");
    setIncomingRequest(false);
  };

  const handleDecline = () => {
    setIncomingRequest(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const newMsg = { sender: 'driver', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
    
    // Simulate passenger reply after a few seconds
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'passenger', 
        text: 'Got it, waiting outside!', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-outfit pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 animate-fadeIn">
              Driver <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Dashboard</span>
            </h1>
          </div>
          
          {/* Online Toggle */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-slideDown">
            <span className={`text-lg font-black tracking-widest transition-colors duration-300 ${isOnline ? 'text-green-400' : 'text-gray-500'}`}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-16 h-8 rounded-full relative transition-colors duration-500 shadow-inner ${isOnline ? 'bg-green-500' : 'bg-gray-800'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-transform duration-500 shadow-md ${isOnline ? 'translate-x-9' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* ── Driver Details Profile Bar ── */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?img=11" alt="Driver" className="w-20 h-20 rounded-full border-2 border-red-500 object-cover shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
              <div className="absolute -bottom-2 -right-2 bg-black border border-white/10 rounded-full px-2 py-0.5 text-xs font-bold text-yellow-400 flex items-center gap-1">
                ⭐ 4.92
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">John Doe</h2>
              <p className="text-gray-400 font-medium">Joined Jan 2024 • Diamond Partner</p>
            </div>
          </div>

          <div className="h-px md:h-12 w-full md:w-px bg-white/10 hidden md:block"></div>

          <div className="flex gap-8 text-center md:text-left w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Vehicle</p>
              <p className="font-bold text-gray-200">Toyota Camry (Black)</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Plate Number</p>
              <p className="font-bold text-gray-200 tracking-widest">XYZ-1234</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">5★ Trips</p>
              <p className="font-bold text-green-400">1,204</p>
            </div>
          </div>
        </div>

        {/* ── Stats Grid (4 Columns) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Today's Earnings", value: "$142.50", trend: "+12% from yesterday", color: "from-green-500/20 to-emerald-500/5", border: "border-green-500/30", text: "text-green-400" },
            { label: "Total Tips", value: "$28.00", trend: "from 8 trips", color: "from-yellow-500/20 to-amber-500/5", border: "border-yellow-500/30", text: "text-yellow-400" },
            { label: "Total Trips", value: "14", trend: "4 ongoing requests in area", color: "from-blue-500/20 to-cyan-500/5", border: "border-blue-500/30", text: "text-blue-400" },
            { label: "Hours Online", value: "5h 20m", trend: "Target: 8 hours", color: "from-purple-500/20 to-pink-500/5", border: "border-purple-500/30", text: "text-purple-400" }
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-3xl p-6 backdrop-blur-xl hover:scale-105 transition-transform duration-300 shadow-lg relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-gray-400 font-semibold mb-2 uppercase tracking-wider text-xs">{stat.label}</h3>
              <div className="text-4xl font-black mb-2">{stat.value}</div>
              <p className={`text-sm font-medium ${stat.text}`}>{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* ── Main Content Area (4-Column Grid Layout) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* 1. Passenger Chatbar (1 col) */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl flex flex-col h-[550px] shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
              <div className="relative">
                <img src="https://i.pravatar.cc/150?img=5" alt="Passenger" className="w-10 h-10 rounded-full border border-white/20" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-black rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Sarah (Passenger)</h3>
                <p className="text-xs text-gray-400">Current Trip</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 mb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'driver' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-2.5 max-w-[85%] rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'driver' 
                      ? 'bg-red-600 text-white rounded-br-none' 
                      : 'bg-white/10 text-gray-200 border border-white/5 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 mx-1 font-bold">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="relative mt-auto">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message passenger..." 
                className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <svg className="w-4 h-4 text-white -ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>

          {/* 2. Map Area (2 cols) */}
          <div className="lg:col-span-2 relative h-[550px] rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            {/* Map Placeholder Gradient/Grid */}
            <div className="absolute inset-0 bg-[#0a0a0a]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            {/* Map Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Mock Navigation Path */}
            {isOnline && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.6))' }}>
                <path d="M100,400 Q300,350 400,200 T700,100" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
                <circle cx="100" cy="400" r="8" fill="#3b82f6" />
                <circle cx="700" cy="100" r="10" fill="#ef4444" className="animate-bounce" />
              </svg>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
              {!isOnline ? (
                <div className="bg-black/90 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="font-bold tracking-widest text-gray-300">YOU ARE OFFLINE</span>
                </div>
              ) : (
                <div className="bg-blue-900/30 backdrop-blur-xl px-8 py-4 rounded-full border border-blue-500/30 flex items-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping"></div>
                  <span className="font-bold tracking-widest text-blue-200">SCANNING AREA...</span>
                </div>
              )}
            </div>

            {/* Incoming Request Overlay */}
            {incomingRequest && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-black/95 backdrop-blur-xl border-2 border-red-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(220,38,38,0.4)] z-20">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      New Request
                    </h3>
                    <p className="text-red-400 font-bold mt-1">2.5 miles away • ~8 mins</p>
                  </div>
                  <div className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <span className="text-yellow-400">★</span> 4.8
                  </div>
                </div>
                
                <div className="space-y-4 mb-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pickup</p>
                      <p className="font-semibold text-gray-200">123 Main St, Downtown</p>
                    </div>
                  </div>
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-red-500 ml-1.5 opacity-50"></div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Dropoff</p>
                      <p className="font-semibold text-gray-200">456 Airport Rd, Terminal 2</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6 px-2">
                  <span className="text-gray-400 font-bold uppercase text-sm tracking-wider">Est. Earnings</span>
                  <span className="text-3xl font-black text-green-400">$24.50</span>
                </div>

                <div className="flex gap-4">
                  <button onClick={handleDecline} className="flex-1 py-4 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-colors font-bold uppercase tracking-wider text-sm">
                    Decline
                  </button>
                  <button onClick={handleAccept} className="flex-1 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all hover:scale-105 active:scale-95">
                    Accept Trip
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Right Sidebar - Recent Activity (1 col) */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col h-[550px] shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Recent Activity</h2>
              <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-gray-300">Today</span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {[
                { name: "Sarah M.", time: "10 mins ago", amount: "$18.20", status: "Completed", type: "Ride", tip: "+$3" },
                { name: "David L.", time: "1 hr ago", amount: "$32.50", status: "Completed", type: "Ride", tip: "+$5" },
                { name: "Emma W.", time: "2 hrs ago", amount: "$14.00", status: "Completed", type: "Ride" },
                { name: "Mike T.", time: "4 hrs ago", amount: "$45.00", status: "Completed", type: "Delivery", tip: "+$10" },
                { name: "Jessica R.", time: "5 hrs ago", amount: "$22.30", status: "Completed", type: "Ride", tip: "+$4" },
                { name: "Alex B.", time: "6 hrs ago", amount: "$15.00", status: "Completed", type: "Ride" }
              ].map((trip, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center font-black text-sm border border-white/10 group-hover:border-white/30 transition-colors">
                      {trip.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200 group-hover:text-white transition-colors text-sm">{trip.name}</h4>
                      <p className="text-[10px] text-gray-500 font-medium">{trip.time} • {trip.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-md text-white mb-0.5">{trip.amount}</div>
                    {trip.tip ? (
                      <div className="text-[10px] font-bold text-yellow-400">Tip {trip.tip}</div>
                    ) : (
                      <div className="text-[10px] font-bold uppercase tracking-widest text-green-500">{trip.status}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link to="/home" className="block text-center py-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                ← Exit Dashboard
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

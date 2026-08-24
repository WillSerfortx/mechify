import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Map Icons using HTML/Emojis to avoid asset loading issues
const driverIcon = new L.DivIcon({
  html: '<div style="font-size: 28px; text-align: center; margin-top: -14px; margin-left: -14px; filter: drop-shadow(0 0 10px rgba(59,130,246,0.8));">🏎️</div>',
  className: 'custom-icon',
  iconSize: [28, 28]
});

const passengerIcon = new L.DivIcon({
  html: '<div style="font-size: 28px; text-align: center; margin-top: -24px; margin-left: -14px; filter: drop-shadow(0 0 10px rgba(239,68,68,0.8)); animation: bounce 1s infinite;">🙋‍♂️</div>',
  className: 'custom-icon',
  iconSize: [28, 28]
});

// Dhaka Coordinates
const driverPos = [23.8103, 90.4125];
const passengerPos = [23.7925, 90.4078];

// Generate 100 Mock Passengers for the Chat List
const firstNames = ["Sarah", "David", "Emma", "Mike", "Jessica", "Alex", "John", "Rachel", "Tom", "Lisa", "Chris", "Anna", "Mark", "Emily", "Daniel"];
const mockPassengers = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  name: `${firstNames[i % firstNames.length]} ${String.fromCharCode(65 + (i % 26))}.`,
  avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  lastMessage: i % 3 === 0 ? "Are you nearby?" : i % 2 === 0 ? "Okay, waiting outside!" : "I am at the main entrance.",
  time: `${10 - (i % 10)}:${(i * 13) % 60 < 10 ? '0' : ''}${(i * 13) % 60} AM`,
  unread: Math.random() > 0.8
}));

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState(false);
  const [tripAccepted, setTripAccepted] = useState(false);
  
  // Messenger State
  const [activeChat, setActiveChat] = useState(null); // null = list view, object = chat view
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  
  const chatScrollRef = useRef(null);

  // Auto-scroll chat when in active chat view
  useEffect(() => {
    if (chatScrollRef.current && activeChat) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, activeChat]);

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
    setTripAccepted(true);
    setIncomingRequest(false);
  };

  const handleDecline = () => {
    setIncomingRequest(false);
    setTripAccepted(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userRole');
    navigate('/auth');
  };

  const openChat = (passenger) => {
    setActiveChat(passenger);
    setMessages([
      { sender: 'passenger', text: passenger.lastMessage, time: passenger.time }
    ]);
  };

  const closeChat = () => {
    setActiveChat(null);
    setMessages([]);
    setChatInput('');
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
        text: 'Got it, thanks!', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-outfit py-10 px-4 md:px-8 flex flex-col justify-center">
      <div className="w-full mx-auto relative z-10 my-auto">
        
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
            { label: "Today's Earnings", value: "৳14,250", trend: "+12% from yesterday", color: "from-green-500/20 to-emerald-500/5", border: "border-green-500/30", text: "text-green-400" },
            { label: "Total Tips", value: "৳2,800", trend: "from 8 trips", color: "from-yellow-500/20 to-amber-500/5", border: "border-yellow-500/30", text: "text-yellow-400" },
            { label: "Total Trips", value: "14", trend: "4 ongoing requests in area", color: "from-blue-500/20 to-cyan-500/5", border: "border-blue-500/30", text: "text-blue-400" },
            { label: "Hours Online", value: "5h 20m", trend: "Target: 8 hours", color: "from-purple-500/20 to-pink-500/5", border: "border-purple-500/30", text: "text-purple-400" }
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-3xl p-6 backdrop-blur-xl hover:scale-105 transition-transform duration-300 shadow-lg relative overflow-hidden group flex flex-col items-center justify-center text-center`}>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-gray-400 font-semibold mb-2 uppercase tracking-wider text-xs">{stat.label}</h3>
              <div className="text-4xl font-black mb-2">{stat.value}</div>
              <p className={`text-sm font-medium ${stat.text}`}>{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* ── Main Content Area (4-Column Grid Layout) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* 1. Messenger Chat Widget (1 col) */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col h-[750px] shadow-xl relative overflow-hidden">
            
            {/* --- LIST VIEW --- */}
            {!activeChat ? (
              <div className="flex flex-col h-full">
                <div className="p-5 border-b border-white/10 bg-black/20">
                  <h3 className="font-black text-xl text-white">Messages</h3>
                  <div className="relative mt-4">
                    <input type="text" placeholder="Search passengers..." className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors" />
                    <svg className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                  {mockPassengers.map((passenger) => (
                    <div 
                      key={passenger.id} 
                      onClick={() => openChat(passenger)}
                      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="relative flex-shrink-0">
                        <img src={passenger.avatar} alt={passenger.name} className="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-white/30 transition-colors" />
                        {passenger.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-[#151515] rounded-full"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className={`text-sm truncate ${passenger.unread ? 'font-bold text-white' : 'font-medium text-gray-200'}`}>{passenger.name}</h4>
                          <span className={`text-[10px] flex-shrink-0 ml-2 ${passenger.unread ? 'text-red-400 font-bold' : 'text-gray-500'}`}>{passenger.time}</span>
                        </div>
                        <p className={`text-xs truncate ${passenger.unread ? 'font-semibold text-gray-300' : 'text-gray-500'}`}>
                          {passenger.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              
            /* --- ACTIVE CHAT VIEW --- */
              <div className="flex flex-col h-full animate-slideInRight">
                <div className="p-4 border-b border-white/10 bg-black/40 flex items-center gap-3 shadow-md z-10">
                  <button onClick={closeChat} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  </button>
                  <div className="relative">
                    <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full border border-white/20" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{activeChat.name}</h3>
                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Active Now</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div ref={chatScrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === 'driver' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-2.5 max-w-[85%] rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'driver' 
                          ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-br-none' 
                          : 'bg-white/10 text-gray-200 border border-white/5 rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-gray-500 mt-1 mx-1 font-bold">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                  <form onSubmit={handleSendMessage} className="relative">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Message..." 
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
              </div>
            )}
          </div>

          {/* 2. Map Area (2 cols) */}
          <div className="lg:col-span-2 relative h-[750px] rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_40px_rgba(0,0,0,0.8)] z-0">
            
            {/* Real Dhaka City Map using Leaflet */}
            <MapContainer 
              center={driverPos} 
              zoom={13} 
              zoomControl={false}
              style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              
              {/* Always show Driver Location */}
              <Marker position={driverPos} icon={driverIcon}>
                <Popup>Your Location</Popup>
              </Marker>

              {/* Show Passenger and Route when online and (requested OR accepted) */}
              {isOnline && (incomingRequest || tripAccepted) && (
                <>
                  <Marker position={passengerPos} icon={passengerIcon}>
                    <Popup>Passenger Location</Popup>
                  </Marker>
                  <Polyline positions={[driverPos, passengerPos]} color="#22c55e" weight={5} dashArray="10, 10" className="animate-pulse" />
                </>
              )}
            </MapContainer>

            {/* Navigation Overlay (when trip is accepted) */}
            {isOnline && tripAccepted && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                <div className="bg-green-900/80 backdrop-blur-xl px-8 py-4 rounded-full border border-green-500 flex items-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-ping"></div>
                  <span className="font-bold tracking-widest text-green-100">NAVIGATING TO PICKUP...</span>
                </div>
              </div>
            )}

            {/* Scanning Overlay (when Online but no request yet) */}
            {isOnline && !incomingRequest && !tripAccepted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-black/40">
                <div className="bg-blue-900/50 backdrop-blur-xl px-8 py-4 rounded-full border border-blue-500/30 flex items-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping"></div>
                  <span className="font-bold tracking-widest text-blue-100">SCANNING AREA...</span>
                </div>
              </div>
            )}

            {/* Offline Overlay */}
            {!isOnline && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-black/60 backdrop-blur-[2px]">
                <div className="bg-black/90 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="font-bold tracking-widest text-gray-300">YOU ARE OFFLINE</span>
                </div>
              </div>
            )}

            {/* Incoming Request Details Card (Floats over the map) */}
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
                      <p className="font-semibold text-gray-200">Gulshan-2 Circle</p>
                    </div>
                  </div>
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-red-500 ml-1.5 opacity-50"></div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Dropoff</p>
                      <p className="font-semibold text-gray-200">Hazrat Shahjalal Int. Airport</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6 px-2">
                  <span className="text-gray-400 font-bold uppercase text-sm tracking-wider">Est. Earnings</span>
                  <span className="text-3xl font-black text-green-400">৳450.00</span>
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
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col h-[750px] shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Recent Activity</h2>
              <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-gray-300">Today</span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {[
                { name: "Sarah M.", time: "10 mins ago", amount: "৳320", status: "Completed", type: "Ride", tip: "+৳30" },
                { name: "David L.", time: "1 hr ago", amount: "৳550", status: "Completed", type: "Ride", tip: "+৳50" },
                { name: "Emma W.", time: "2 hrs ago", amount: "৳210", status: "Completed", type: "Ride" },
                { name: "Mike T.", time: "4 hrs ago", amount: "৳800", status: "Completed", type: "Delivery", tip: "+৳100" },
                { name: "Jessica R.", time: "5 hrs ago", amount: "৳420", status: "Completed", type: "Ride", tip: "+৳40" },
                { name: "Alex B.", time: "6 hrs ago", amount: "৳250", status: "Completed", type: "Ride" }
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
            
            <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
              <Link to="/home" className="flex-1 text-center py-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors bg-white/5 rounded-xl hover:bg-white/10">
                Home
              </Link>
              <button onClick={handleSignOut} className="flex-1 text-center py-3 text-sm font-bold uppercase tracking-widest text-red-400 hover:text-white hover:bg-red-500/20 transition-colors bg-white/5 rounded-xl">
                Sign Out
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

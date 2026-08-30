import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DHAKA_WORKSHOPS } from './WorkshopSelect';

// Custom icons using DivIcon for glitch-free rendering
const userCarIcon = new L.DivIcon({
  html: `
    <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(59, 130, 246, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="width: 36px; height: 36px; border-radius: 9999px; background: #1e40af; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 0 15px rgba(59,130,246,0.9);">
        🏎️
      </div>
    </div>
  `,
  className: 'user-car-marker',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const workshopDestIcon = new L.DivIcon({
  html: `
    <div style="position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(220, 38, 38, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="width: 40px; height: 40px; border-radius: 12px; background: #dc2626; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 0 20px rgba(220,38,38,0.9);">
        🔧
      </div>
    </div>
  `,
  className: 'workshop-dest-marker',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

// Map recentering helper component
function MapRecenter({ userPos, destPos }) {
  const map = useMap();
  useEffect(() => {
    if (userPos && destPos) {
      const bounds = L.latLngBounds([userPos, destPos]);
      map.fitBounds(bounds, { padding: [80, 80] });
    }
  }, [userPos, destPos, map]);
  return null;
}

export default function WorkshopNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback to first workshop if direct navigation was opened without state
  const selectedWorkshop = location.state?.workshop || DHAKA_WORKSHOPS[0];

  // User Current Location in Dhaka (e.g. Gulshan-2 Circle)
  const userPos = [23.7925, 90.4078];
  const workshopPos = [selectedWorkshop.lat, selectedWorkshop.lng];

  // Simulated road waypoints connecting user to destination
  const routeCoordinates = [
    userPos,
    [userPos[0] + (workshopPos[0] - userPos[0]) * 0.3 + 0.001, userPos[1] + (workshopPos[1] - userPos[1]) * 0.25],
    [userPos[0] + (workshopPos[0] - userPos[0]) * 0.65 - 0.0008, userPos[1] + (workshopPos[1] - userPos[1]) * 0.7],
    workshopPos
  ];

  // Step-by-step turn navigation instructions
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [distanceRemaining, setDistanceRemaining] = useState(selectedWorkshop.distance);
  const [showCallToast, setShowCallToast] = useState(null);
  const [arrivedModal, setArrivedModal] = useState(false);

  const navigationSteps = [
    { instruction: 'Head North on Gulshan Avenue towards Road 103', dist: '350 m', icon: '⬆️' },
    { instruction: 'Turn right at the roundabout onto Kemal Ataturk Ave', dist: '500 m', icon: '↗️' },
    { instruction: `Continue straight towards ${selectedWorkshop.name}`, dist: '250 m', icon: '⬆️' },
    { instruction: `Arrive at ${selectedWorkshop.name} on the left`, dist: '50 m', icon: '🏁' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < navigationSteps.length - 1 ? prev + 1 : prev));
    }, 6000);
    return () => clearInterval(interval);
  }, [navigationSteps.length]);

  const handleCall = (type, number, name) => {
    setShowCallToast({ type, number, name });
    setTimeout(() => setShowCallToast(null), 4000);
  };

  return (
    <div className="relative w-full h-screen bg-neutral-950 text-white font-outfit overflow-hidden select-none">
      
      {/* ─── FULLSCREEN MAP CONTAINER ─── */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={userPos}
          zoom={15}
          zoomControl={false}
          className="w-full h-full"
          style={{ background: '#111827' }}
        >
          {/* Dark themed OpenStreetMap tiles */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          <MapRecenter userPos={userPos} destPos={workshopPos} />

          {/* Route Polyline */}
          <Polyline
            positions={routeCoordinates}
            pathOptions={{
              color: '#dc2626',
              weight: 6,
              opacity: 0.9,
              dashArray: '1, 10',
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />

          {/* User Marker */}
          <Marker position={userPos} icon={userCarIcon}>
            <Popup className="dark-popup">
              <div className="p-1 text-xs font-bold text-gray-900">
                📍 You are here (Dhaka Live GPS)
              </div>
            </Popup>
          </Marker>

          {/* Workshop Destination Marker */}
          <Marker position={workshopPos} icon={workshopDestIcon}>
            <Popup className="dark-popup">
              <div className="p-1 text-xs text-gray-900">
                <p className="font-bold">{selectedWorkshop.name}</p>
                <p className="text-[11px] text-gray-600">{selectedWorkshop.address}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* ─── TOP NAVIGATION HUD / TURN-BY-TURN BAR ─── */}
      <div className="absolute top-4 left-4 right-4 md:left-8 md:right-auto md:w-[480px] z-30">
        <div className="bg-black/90 backdrop-blur-xl border border-neutral-700/80 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl bg-neutral-900 p-2.5 rounded-xl border border-neutral-700">
                {navigationSteps[currentStepIndex].icon}
              </span>
              <div>
                <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Next Step</p>
                <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
                  {navigationSteps[currentStepIndex].instruction}
                </h2>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xs font-mono bg-neutral-800 text-gray-300 px-2 py-1 rounded border border-neutral-700">
                {navigationSteps[currentStepIndex].dist}
              </span>
            </div>
          </div>

          {/* Mini Live Status */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
            <div className="flex items-center gap-1.5 text-green-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Smooth Traffic • {selectedWorkshop.driveTime} left</span>
            </div>
            <span className="font-mono text-gray-400">Total: {distanceRemaining}</span>
          </div>
        </div>
      </div>

      {/* ─── RIGHT CORNER: EMERGENCY HOTLINE NUMBERS PANEL ─── */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-3 max-w-[340px] w-full">
        
        {/* Card 1: Workshop Emergency Number */}
        <div className="bg-neutral-950/95 backdrop-blur-xl border-2 border-red-500/80 rounded-2xl p-4 shadow-[0_0_30px_rgba(220,38,38,0.35)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚨</span>
              <div>
                <h3 className="text-xs font-black uppercase text-red-400 tracking-wider">
                  Workshop Emergency
                </h3>
                <p className="text-xs font-bold text-white truncate max-w-[180px]">
                  {selectedWorkshop.name}
                </p>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          </div>

          <div className="bg-neutral-900 rounded-xl p-2.5 mb-3 border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-mono">Emergency Hotline</p>
              <p className="font-mono font-bold text-sm text-white">{selectedWorkshop.emergencyPhone}</p>
            </div>
            <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded font-bold">
              24/7 BAY
            </span>
          </div>

          {/* Quick Call Workshop Action */}
          <a
            href={`tel:${selectedWorkshop.emergencyPhone}`}
            onClick={() => handleCall('Workshop', selectedWorkshop.emergencyPhone, selectedWorkshop.name)}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all cursor-pointer"
          >
            <span>📞 Call Workshop Now</span>
          </a>
        </div>

        {/* Card 2: Tow Truck Emergency Hotline */}
        <div className="bg-neutral-950/95 backdrop-blur-xl border border-amber-500/60 rounded-2xl p-4 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚛</span>
              <div>
                <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">
                  Tow Truck Emergency
                </h3>
                <p className="text-xs text-gray-300">24/7 Breakdown Recovery Flatbed</p>
              </div>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-1.5 py-0.5 rounded border border-amber-500/30">
              ~10m ETA
            </span>
          </div>

          <div className="bg-neutral-900 rounded-xl p-2.5 mb-3 border border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-mono">Tow Truck Dispatch</p>
              <p className="font-mono font-bold text-sm text-amber-400">+880 1516-520602</p>
            </div>
            <span className="text-xs text-gray-400 font-mono">16999</span>
          </div>

          {/* Quick Call Tow Truck Action */}
          <a
            href="tel:+8801516520602"
            onClick={() => handleCall('Tow Truck', '+880 1516-520602', 'Mechify 24/7 Tow Recovery')}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-black font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
          >
            <span>🛞 Dispatch Tow Truck</span>
          </a>
        </div>
      </div>

      {/* ─── BOTTOM CONTROLS & WORKSHOP INFO CARD ─── */}
      <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-auto md:w-[480px] z-30">
        <div className="bg-black/95 backdrop-blur-xl border border-neutral-800 rounded-3xl p-5 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={selectedWorkshop.img}
              alt={selectedWorkshop.name}
              className="w-16 h-16 rounded-2xl object-cover border border-neutral-700 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-amber-400 text-xs font-bold">★ {selectedWorkshop.rating}</span>
                <span className="text-gray-400 text-xs">({selectedWorkshop.reviews} reviews)</span>
              </div>
              <h3 className="font-bold text-white text-base truncate font-sora">
                {selectedWorkshop.name}
              </h3>
              <p className="text-xs text-gray-400 truncate">
                {selectedWorkshop.address}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/workshop-select')}
              className="bg-neutral-900 hover:bg-neutral-800 text-gray-300 font-bold py-3 rounded-xl text-xs border border-neutral-700 transition-colors cursor-pointer"
            >
              🔄 Change Workshop
            </button>
            <button
              onClick={() => setArrivedModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] active:scale-95 cursor-pointer"
            >
              🏁 I Have Arrived
            </button>
          </div>
        </div>
      </div>

      {/* ─── CALL TOAST NOTIFICATION ─── */}
      {showCallToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white font-bold px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-scaleIn">
          <span className="text-2xl">📞</span>
          <div>
            <p className="text-xs uppercase font-mono tracking-wider">Connecting Call to {showCallToast.type}</p>
            <p className="text-sm font-mono">{showCallToast.number} ({showCallToast.name})</p>
          </div>
        </div>
      )}

      {/* ─── ARRIVAL MODAL ─── */}
      {arrivedModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-scaleIn">
            <div className="w-16 h-16 bg-green-600/20 text-green-400 border border-green-500/30 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4">
              ✅
            </div>
            <h2 className="text-2xl font-bold font-sora mb-2">Welcome to {selectedWorkshop.name}!</h2>
            <p className="text-sm text-gray-400 mb-6">
              Your emergency diagnostic spot has been reserved. Please show your reservation at the service reception desk.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/workshop')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Done & Return to Workshop Hub
              </button>
              <button
                onClick={() => setArrivedModal(false)}
                className="w-full bg-neutral-800 text-gray-300 font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Back to Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

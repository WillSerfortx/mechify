import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lamborghini from '../components/Lamborghini';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const scrollRef = useRef(null);
  const lamboRef = useRef(null);
  const cameraRef = useRef(null);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroIn(true), 300);

    if (!lamboRef.current || !cameraRef.current) return;

    const { car, door, bonnet, wheels } = lamboRef.current;
    const camera = cameraRef.current;

    // Create a master GSAP timeline tied to the scroll container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
      },
    });

    // SCENE 1 (Initial): Front Prominent (Car Rental)
    // Camera is already set at position={[-4, 2, 6]} looking at [0,0,0]

    // SCENE 2: Scroll -> Camera moves to side, Door opens (Hire a Driver)
    tl.to(camera.position, { x: 5, y: 1.5, z: 2, ease: 'power1.inOut' }, 0)
      .to(door.rotation, { z: Math.PI / 3, x: -Math.PI / 6, ease: 'power1.inOut' }, 0); // Scissor door opens up and out

    // SCENE 3: Scroll -> Camera moves to rear, Bonnet opens (Workshop, Mechanic, Fuel)
    tl.to(camera.position, { x: 3, y: 3, z: -5, ease: 'power1.inOut' }, 1)
      .to(door.rotation, { z: 0, x: 0, ease: 'power1.inOut' }, 1) // Close door
      .to(bonnet.rotation, { x: -Math.PI / 4, ease: 'power1.inOut' }, 1); // Open bonnet

    // SCENE 4: Scroll -> Camera zooms on wheel, Wheels spin (Spare Parts Store)
    tl.to(camera.position, { x: 2, y: 0.5, z: 1.6, ease: 'power1.inOut' }, 2) // Move close to front-left wheel
      .to(bonnet.rotation, { x: 0, ease: 'power1.inOut' }, 2) // Close bonnet
      .to(wheels.map(w => w.rotation), { x: Math.PI * 10, ease: 'none' }, 2); // Spin wheels rapidly

  }, []);

  return (
    <div className="bg-black text-white font-outfit">

      {/* ─── 3D CANVAS (Fixed Background) ───────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera ref={cameraRef} makeDefault position={[-4, 2, 6]} fov={45} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0000" />
          
          <Lamborghini ref={lamboRef} />
          
          <ContactShadows position={[0, 0, 0]} opacity={0.7} scale={10} blur={2} far={4} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* ─── NAVBAR ─────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
        <Link to="/landing" className="flex items-center gap-3 group">
          <svg width="44" height="38" viewBox="0 0 56 48" fill="none">
            <rect width="56" height="48" rx="4" fill="#CC0000"/>
            <text x="4" y="34" fontFamily="Arial Black,Arial" fontWeight="900" fontSize="32" fill="white">M</text>
          </svg>
          <div>
            <div className="font-black text-lg tracking-widest text-white">MECHIFY</div>
            <div className="text-gray-500 text-[8px] tracking-[0.25em] uppercase">Vehicle Support</div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-gray-300 hover:text-white font-semibold text-sm transition-colors">Sign In</Link>
          <Link to="/auth" className="font-black text-sm px-6 py-2.5 rounded-full transition-all hover:scale-105 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            Get Started
          </Link>
        </div>
      </div>

      {/* ─── SCROLLABLE CONTENT (Triggers GSAP) ─────────────────── */}
      <div ref={scrollRef} className="relative z-10 w-full" style={{ height: '400vh' }}>
        
        {/* SCENE 1 HTML */}
        <div className="h-screen flex items-end pb-20 px-10 pointer-events-none">
          <div className="max-w-xl pointer-events-auto">
            <h1 className="text-6xl font-black mb-4 text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">Car Rental</h1>
            <p className="text-xl text-gray-300 backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
              Rent exotic Lamborghinis, Ferraris, and luxury sedans for any occasion. Instant booking, flexible returns.
            </p>
          </div>
        </div>

        {/* SCENE 2 HTML */}
        <div className="h-screen flex items-end pb-20 px-10 pointer-events-none">
          <div className="max-w-xl pointer-events-auto ml-auto text-right">
            <h1 className="text-6xl font-black mb-4 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">Hire a Driver</h1>
            <p className="text-xl text-gray-300 backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
              Professional, certified chauffeurs available 24/7 for airport transfers, events, or hourly hire.
            </p>
          </div>
        </div>

        {/* SCENE 3 HTML */}
        <div className="h-screen flex items-end pb-20 px-10 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            <h1 className="text-6xl font-black mb-4 text-yellow-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]">Emergency Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="backdrop-blur-sm bg-black/40 p-4 rounded-xl border border-yellow-500/30">
                <h3 className="font-bold text-yellow-400 mb-2">Workshop Service</h3>
                <p className="text-sm text-gray-300">Certified mechanics for full diagnostics.</p>
              </div>
              <div className="backdrop-blur-sm bg-black/40 p-4 rounded-xl border border-yellow-500/30">
                <h3 className="font-bold text-yellow-400 mb-2">Emergency Mechanic</h3>
                <p className="text-sm text-gray-300">We dispatch a mechanic to your location.</p>
              </div>
              <div className="backdrop-blur-sm bg-black/40 p-4 rounded-xl border border-yellow-500/30">
                <h3 className="font-bold text-yellow-400 mb-2">Emergency Fuel</h3>
                <p className="text-sm text-gray-300">Rush delivery to your GPS pin in 12 mins.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SCENE 4 HTML */}
        <div className="h-screen flex items-end pb-20 px-10 pointer-events-none">
          <div className="max-w-xl pointer-events-auto ml-auto text-right">
            <h1 className="text-6xl font-black mb-4 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">Spare Parts Store</h1>
            <p className="text-xl text-gray-300 backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
              450+ genuine spare parts for all vehicle makes. Order online, check availability instantly.
            </p>
          </div>
        </div>

      </div>
      
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoadsideLanding() {
  const navigate = useNavigate();
  const [mapLoaded] = useState(true);

  return (
    <div className="bg-black min-h-screen text-white font-outfit">

      {/* ════════════════════════════════════════
          HERO — Rounded card with glow + overlay image
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-28 pt-32 pb-12">
        <div className="relative w-full rounded-[40px] md:rounded-[50px] overflow-hidden shadow-[0_4px_30px_10px_rgba(255,255,255,0.15)]" style={{ minHeight: '450px' }}>
          <img 
            src="/images/roadside/hero.png" 
            alt="Vehicle Recovery" 
            className="w-full h-full object-cover absolute inset-0 opacity-50"
          />
          <div className="relative z-10 flex flex-col items-center justify-end text-center px-8 py-16" style={{ minHeight: '450px' }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Vehicle Recovery Services Across Bangladesh
            </h1>
            <p className="text-sm md:text-lg font-extrabold max-w-4xl leading-relaxed mb-8 text-white/90">
              Get back on the road quickly and safely with MI Recovery Service – your reliable support in fast jump starts and
              emergency vehicle recovery services. Never let breakdowns break you with our on-the-go transportation
              solutions and emergency fuel delivery.
            </p>
            <button
              onClick={() => navigate('/roadside-request')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
            >
              Service
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3 FEATURE PILLS
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-28 py-8">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="border-2 border-red-600 bg-red-600/10 text-red-500 font-bold text-base md:text-lg px-8 py-4 rounded-full">
            Less than 30 min arrival
          </div>
          <div className="border-2 border-white text-white font-bold text-base md:text-lg px-8 py-4 rounded-full">
            Get Service
          </div>
          <div className="border-2 border-red-600 bg-red-600/10 text-red-500 font-bold text-base md:text-lg px-8 py-4 rounded-full">
            Live 24/7 trackable service
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          OUR MISSION
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-28 py-16 relative">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-16 left-4 md:left-6 z-30 w-12 h-12 md:w-16 md:h-16 bg-black border-4 border-white flex items-center justify-center text-white text-2xl md:text-3xl font-bold hover:bg-white/10 transition-colors"
        >
          &lt;
        </button>

        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Our Mission</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            At Swift Vehicle Recovery, we are dedicated to delivering reliable
            towing services and roadside assistance throughout the UK. Our mission is to ensure that our
            customers receive prompt vehicle
            recovery support whenever they need it, with a strong emphasis on
            customer satisfaction.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          OUR JOURNEY — 3 towing images
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-28 py-12">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-8 underline underline-offset-8 decoration-2">
          Our journey through the towing Bangladesh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden h-[250px] md:h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1562096659-92ebd91f4e47?w=600&h=400&fit=crop" 
              alt="Towing service 1" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-[250px] md:h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop" 
              alt="Towing service 2" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-[250px] md:h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop" 
              alt="Towing service 3" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MAP + SHARE LOCATION
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-28 py-12 pb-24">
        {/* Map embed */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 mb-8">
          {mapLoaded && (
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.82238462916!2d90.25487583581408!3d23.780887456676858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5bcc6c2a!2sDhaka!5e0!3m2!1sen!2sbd!4v1693000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>

        {/* Get Directions button */}
        <div className="flex justify-start mb-6">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=23.7808,90.4125" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-red-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <span className="text-yellow-300">⚠</span> Get Directions
          </a>
        </div>

        {/* Share Location button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Location',
                  text: 'Here is my live location for vehicle recovery',
                  url: window.location.href,
                });
              } else {
                alert('Location sharing is not supported in this browser. Please share your location manually.');
              }
            }}
            className="border-2 border-red-600 bg-red-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-red-700 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-2"
          >
            <span className="text-yellow-300">⚠</span> Share your Live location
          </button>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoadsideLanding() {
  const navigate = useNavigate();
  const [mapLoaded] = useState(true);

  return (
    <div className="bg-black min-h-screen text-white font-sora relative overflow-hidden pb-32">

      {/* ════════════════════════════════════════
          HERO — Rounded card with white glow 
      ════════════════════════════════════════ */}
      <section className="pt-[133px] px-[110px] flex justify-center w-full max-w-[1920px] mx-auto">
        <div className="relative w-full max-w-[1700px] h-[870px] rounded-[50px] shadow-[0px_4px_30px_10px_white] overflow-hidden flex flex-col items-center">
          {/* Background Image */}
          <img 
            src="/images/roadside/hero.png" 
            alt="Vehicle Recovery" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center w-full h-full pt-[394px]">
            <h1 className="text-[64px] font-extrabold text-white text-center leading-normal mb-6">
              Vehicle Recovery Services Across Bangladesh
            </h1>
            <div className="text-[24px] font-extrabold text-white text-center leading-[1.5] max-w-[1300px]">
              <p className="mb-0">Get back on the road quickly and safely with MI Recovery Service – your reliable support in fast jump starts and</p>
              <p className="mb-0">emergency vehicle recovery services. Never let breakdowns break you with our on-the-go transportation</p>
              <p>solutions and emergency fuel delivery.</p>
            </div>

            {/* Service Button */}
            <button
              onClick={() => navigate('/roadside-request')}
              className="mt-12 bg-[#ff0202] text-white font-bold text-[32px] px-[80px] py-[20px] rounded-[50px] hover:bg-red-700 transition-colors"
            >
              Service
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3 FEATURE PILLS
      ════════════════════════════════════════ */}
      <section className="mt-[80px] w-full max-w-[1920px] mx-auto px-[110px]">
        <div className="flex justify-center gap-[40px]">
          <div className="bg-[#ff0202] text-white font-bold text-[32px] px-[60px] py-[30px] rounded-[20px]">
            Less than 30 min arrival
          </div>
          <div className="border-[10px] border-white text-white font-bold text-[32px] px-[60px] py-[25px] rounded-[20px]">
            Get Service
          </div>
          <div className="bg-[#ff0202] text-white font-bold text-[32px] px-[60px] py-[30px] rounded-[20px]">
            Live 24/7 trackable service
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          OUR MISSION
      ════════════════════════════════════════ */}
      <section className="mt-[150px] w-full max-w-[1920px] mx-auto relative flex flex-col items-center">
        {/* Back button (Square with thick white border) */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute left-0 top-[40px] w-[90px] h-[90px] border-[10px] border-solid border-white flex items-center justify-center bg-black hover:bg-white/10 transition-colors shadow-[inset_20px_20px_0px_0px_white]"
        >
          <svg className="w-[50px] h-[50px] text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-[72px] font-extrabold text-white text-center mb-[50px]">
          Our Mission
        </h2>
        <div className="text-[28px] text-white text-center font-normal leading-[1.6] max-w-[1400px]">
          <p>At Swift Vehicle Recovery, we are dedicated to delivering reliable</p>
          <p>towing services and roadside assistance throughout the UK. Our mission is to ensure that our</p>
          <p>customers receive prompt vehicle</p>
          <p>recovery support whenever they need it, with a strong emphasis on</p>
          <p>customer satisfaction.</p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          OUR JOURNEY
      ════════════════════════════════════════ */}
      <section className="mt-[180px] w-full max-w-[1920px] mx-auto px-[110px]">
        <h3 className="text-[40px] font-extrabold text-white mb-[80px] border-b-4 border-white pb-4 inline-block">
          Our journey through the towing Bangladesh
        </h3>
        
        <div className="flex justify-between gap-[50px] items-center">
          <div className="w-[550px] h-[400px] rounded-[30px] shadow-[0px_0px_30px_10px_white] overflow-hidden">
             <img src="https://images.unsplash.com/photo-1562096659-92ebd91f4e47?w=800&h=600&fit=crop" alt="Mud towing" className="w-full h-full object-cover" />
          </div>
          <div className="w-[450px] h-[300px] rounded-[20px] border-[10px] border-white overflow-hidden">
             <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop" alt="Car on flatbed" className="w-full h-full object-cover" />
          </div>
          <div className="w-[600px] h-[500px] rounded-[30px] border-[10px] border-white overflow-hidden shadow-[0px_0px_20px_5px_white]">
             <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=800&fit=crop" alt="Loading car" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MAP + SHARE LOCATION
      ════════════════════════════════════════ */}
      <section className="mt-[150px] w-full max-w-[1920px] mx-auto px-[110px] flex flex-col items-center">
        <div className="w-full max-w-[1700px] h-[500px] rounded-[30px] shadow-[0px_0px_30px_10px_white] overflow-hidden mb-[80px]">
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

        <button
          onClick={() => {}}
          className="bg-[#ff0202] text-white font-bold text-[32px] px-[80px] py-[25px] rounded-[50px] hover:bg-red-700 transition-colors flex items-center justify-center gap-4"
        >
          <span className="text-[32px]">⚠</span> Share your Live location
        </button>
      </section>

    </div>
  );
}

import { Link } from 'react-router-dom';

// High-quality Unsplash Images
const heroImgMain = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200";
const heroImgSmall1 = "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800";
const heroImgSmall2 = "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800";

const step1Img = "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800";
const step2Img = "https://images.unsplash.com/photo-1503375894314-476414fd278e?auto=format&fit=crop&q=80&w=800";
const step3Img = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800";

export default function About() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-outfit overflow-x-hidden">
      
      {/* ── 1. Hero Section (The Mission) ── */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 animate-slideInLeft z-10">
            <div className="inline-block bg-red-600/10 border border-red-500/20 text-red-500 font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest text-sm">
              Our Mission
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Vehicle Care</span>
            </h1>
            <div className="text-lg md:text-xl text-gray-400 font-medium space-y-6 mb-10 leading-relaxed">
              <p>
                <strong className="text-white font-bold">Mechify</strong> is the ultimate digital ecosystem connecting drivers with elite, verified mechanics and auto services. We exist to eliminate the stress of vehicle breakdowns and maintenance scheduling.
              </p>
              <p>
                By engineering a platform built on extreme transparency, blistering speed, and uncompromising reliability, we ensure that whether you need an emergency midnight jumpstart or a routine tune-up, you are only one tap away from getting back on the road safely.
              </p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-3 bg-white text-black font-black uppercase tracking-widest px-10 py-5 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Explore Our Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>

          {/* Abstract Image Grid */}
          <div className="w-full lg:w-1/2 relative min-h-[600px] hidden sm:block animate-slideInRight">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/20 blur-[120px] rounded-full z-0"></div>
            
            <div className="absolute top-0 left-0 w-3/5 aspect-square rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10 group">
              <img src={heroImgMain} alt="Mechanic working on engine" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="absolute top-32 right-0 w-2/5 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl z-20 border border-white/10 animate-bounce-slow group">
              <img src={heroImgSmall1} alt="Car interior" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="absolute bottom-10 left-32 w-1/2 aspect-video rounded-3xl overflow-hidden shadow-2xl z-30 border border-white/10 group">
              <img src={heroImgSmall2} alt="Road trip" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. How It Works Section ── */}
      <section className="py-24 bg-black relative border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">How Mechify <span className="text-red-500">Works</span></h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">Three simple steps to completely resolve your automotive headaches.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-red-600 to-orange-500 opacity-20 -translate-y-1/2 z-0"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-black ring-2 ring-white/10 mb-8 relative shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:ring-red-500 transition-all duration-300">
                <img src={step1Img} alt="Request Assistance" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 text-white font-black text-2xl flex items-center justify-center rounded-full shadow-lg">1</div>
              </div>
              <h3 className="text-2xl font-black mb-4">Request Assistance</h3>
              <p className="text-gray-400">Open the app, select your required service (from fuel delivery to emergency towing), and provide your exact location.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-black ring-2 ring-white/10 mb-8 relative shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:ring-red-500 transition-all duration-300">
                <img src={step2Img} alt="Get Matched" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 text-white font-black text-2xl flex items-center justify-center rounded-full shadow-lg">2</div>
              </div>
              <h3 className="text-2xl font-black mb-4">Get Matched Instantly</h3>
              <p className="text-gray-400">Our routing algorithm pairs you with the closest, highest-rated verified mechanic or service provider available.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-black ring-2 ring-white/10 mb-8 relative shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:ring-red-500 transition-all duration-300">
                <img src={step3Img} alt="Back on the road" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 text-white font-black text-2xl flex items-center justify-center rounded-full shadow-lg">3</div>
              </div>
              <h3 className="text-2xl font-black mb-4">Back On The Road</h3>
              <p className="text-gray-400">The expert arrives, fixes your vehicle with total price transparency, and gets you back to your life safely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. How We Help Section (Benefits Grid) ── */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4">How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Help</span></h2>
              <p className="text-gray-400 text-lg">We don't just fix cars. We provide peace of mind through a robust network of trusted professionals and innovative digital tools.</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-6xl font-black text-white">50k+</div>
              <div className="text-red-500 font-bold uppercase tracking-widest text-sm">Breakdowns Resolved</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit Card 1 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-red-600/20 text-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-black mb-3 text-white">24/7 Emergency Support</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Breakdowns don't wait for business hours. Our network is active around the clock to provide instant roadside assistance.</p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-black mb-3 text-white">Verified Professionals</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Every mechanic and driver on our platform undergoes a rigorous background check and skill verification process.</p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-green-600/20 text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-black mb-3 text-white">Transparent Pricing</h3>
              <p className="text-gray-400 text-sm leading-relaxed">No hidden fees or surprise charges. See upfront estimates for parts and labor before you confirm the service request.</p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-purple-600/20 text-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-xl font-black mb-3 text-white">All-In-One Hub</h3>
              <p className="text-gray-400 text-sm leading-relaxed">From fuel delivery and heavy-duty towing to renting a car or hiring a personal driver, Mechify handles it all.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

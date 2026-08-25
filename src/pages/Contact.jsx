import { useState } from 'react';

const bgImg = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1920"; // Dark garage background
const photo1 = "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800"; // Support person
const photo2 = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"; // Location / Handshake

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-[#050505] min-h-screen flex items-center justify-center relative overflow-hidden font-outfit text-white pt-24 pb-12">
      
      {/* High Quality Background */}
      <div className="absolute inset-0 z-0">
        <img src={bgImg} alt="Garage Background" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-full xl:max-w-[1600px] 2xl:max-w-[85%] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center">
        
        {/* Left Side: Photos and Info */}
        <div className="w-full lg:w-5/12 flex flex-col gap-8 animate-slideInLeft">
          
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black mb-4">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg xl:text-xl">We are always ready to assist you with your vehicle needs.</p>
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/10 group">
              <img src={photo1} alt="Customer Support" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/10 mt-8 group">
              <img src={photo2} alt="Our Location" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="text-red-500 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-1">Call Us</h3>
              <p className="text-gray-400 font-medium">+8801516520602</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="text-red-500 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-1">Address</h3>
              <p className="text-gray-400 font-medium">Lane 1 House 4<br/>Baridhara DOHS</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl sm:col-span-2 hover:bg-white/10 transition-colors">
              <div className="text-red-500 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="font-bold text-lg mb-1">Email Us</h3>
              <p className="text-gray-400 font-medium">mechify@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-6/12 xl:w-5/12 animate-slideInRight">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Form Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full z-0"></div>

            <div className="relative z-10">
              <h2 className="text-3xl xl:text-4xl font-black mb-8">Send a <span className="text-red-500">Message</span></h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
                    <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" required />
                  </div>
                  <div>
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 block">Your Email</label>
                    <input type="email" placeholder="Email address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" required />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 block">Subject</label>
                  <input type="text" placeholder="How can we help?" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" required />
                </div>
                
                <div>
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 block">Your Message</label>
                  <textarea placeholder="Write your message here..." rows={6} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none" required />
                </div>
                
                <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-black uppercase tracking-widest text-lg rounded-2xl px-10 py-5 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transform hover:scale-[1.02] active:scale-95">
                  {submitted ? '✓ Message Sent Successfully!' : 'Send Message'}
                </button>
              </form>

              {/* Socials */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 text-center">Or connect with us</p>
                <div className="flex justify-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg hover:scale-110">
                    <span className="text-xl">📸</span>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg hover:scale-110">
                    <span className="text-xl">📘</span>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg hover:scale-110">
                    <span className="text-xl">🐦</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

import { useState } from 'react';

const imgContactBg = "https://placehold.co/1920x1080/111/fff?text=Contact+Background";

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
    <div className="bg-black min-h-screen pt-24 md:pt-32 relative overflow-hidden font-sora text-white">
      <div className="absolute inset-0 opacity-30 z-0">
        <img src={imgContactBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row px-6 md:px-12 lg:px-24 py-12 md:py-20 max-w-7xl mx-auto gap-16 lg:gap-24">
        {/* Contact Form */}
        <div className="w-full lg:w-1/2 animate-slideInLeft">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center lg:text-left mb-12">Contact Us</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-lg font-semibold mb-2 block">Your name</label>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/90 rounded-full px-6 py-4 text-black text-base outline-none focus:ring-2 focus:ring-red-500 transition-all" />
            </div>
            <div>
              <label className="text-lg font-semibold mb-2 block">Your Email</label>
              <input type="email" placeholder="Email address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/90 rounded-full px-6 py-4 text-black text-base outline-none focus:ring-2 focus:ring-red-500 transition-all" />
            </div>
            <div>
              <label className="text-lg font-semibold mb-2 block">Subject</label>
              <input type="text" placeholder="Subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-white/90 rounded-full px-6 py-4 text-black text-base outline-none focus:ring-2 focus:ring-red-500 transition-all" />
            </div>
            <div>
              <label className="text-lg font-semibold mb-2 block">Your Message</label>
              <textarea placeholder="Message" rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/90 rounded-2xl px-6 py-4 text-black text-base outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none" />
            </div>
            <button type="submit" className="w-full lg:w-auto bg-black border-2 border-white rounded-lg px-10 py-4 text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300">
              {submitted ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="w-full lg:w-1/2 pt-0 lg:pt-24 animate-slideInRight">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center lg:text-left">Get In Touch</h2>
          
          <div className="space-y-8 max-w-sm mx-auto lg:mx-0">
            <div>
              <h3 className="text-2xl font-bold mb-2">Call Us</h3>
              <p className="text-xl text-gray-300">+8801516520602</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-20">
              <div>
                <h3 className="text-2xl font-bold mb-2">Website</h3>
                <p className="text-xl text-gray-300 break-all">www.mechify.com</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Address</h3>
                <p className="text-xl text-gray-300">Lane 1 House 4<br/>Baridhara Dohs</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Email Us</h3>
              <p className="text-xl text-gray-300 break-all">mechify@gmail.com</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Follow us On</h3>
              <div className="flex gap-6">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-red-500 transition-all cursor-pointer">
                  <span className="text-xl">📸</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all cursor-pointer">
                  <span className="text-xl">📘</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-sky-400 transition-all cursor-pointer">
                  <span className="text-xl">🐦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

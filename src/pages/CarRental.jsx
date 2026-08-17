import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const imgCarRentalBg = "https://placehold.co/1920x1080/111/fff?text=Car+Rental+Background";

export default function CarRental() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ sendDate: '', sendTime: '', returnDate: '', returnTime: '', driverAge: false });

  const handleNext = () => navigate('/payment-select');

  return (
    <div className="bg-black min-h-screen pt-24 md:pt-32 relative overflow-hidden font-sora">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={imgCarRentalBg} alt="" className="w-full h-full object-cover opacity-40" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-normal text-white text-center animate-fadeInUp">Select time</h1>
        <div className="w-full h-1 bg-red-600 mt-4 animate-fadeIn delay-200"></div>
      </div>

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-24 px-6 md:px-12 lg:px-24 mt-12 lg:mt-24 max-w-7xl mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 lg:p-10 w-full lg:w-1/2 max-w-[500px] animate-slideInLeft shadow-2xl">
          <h2 className="text-2xl font-bold text-black mb-6">Send your car</h2>
          
          <div className="space-y-4 mb-8">
            <div className="border border-gray-300 rounded-xl px-6 py-4 flex items-center justify-between cursor-pointer hover:border-red-500 transition-colors">
              <span className="text-gray-500">Select Date</span>
              <span className="text-gray-400">∧</span>
            </div>
            <div className="border border-gray-300 rounded-xl px-6 py-4 flex items-center justify-between cursor-pointer hover:border-red-500 transition-colors">
              <span className="text-gray-500">Time</span>
              <span className="text-gray-400">∧</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black mb-6">Return</h2>
          
          <div className="space-y-4 mb-6">
            <div className="border border-gray-300 rounded-xl px-6 py-4 flex items-center justify-between cursor-pointer hover:border-red-500 transition-colors">
              <span className="text-gray-500">Select Date</span>
              <span className="text-gray-400">∧</span>
            </div>
            <div className="border border-gray-300 rounded-xl px-6 py-4 flex items-center justify-between cursor-pointer hover:border-red-500 transition-colors">
              <span className="text-gray-500">Time</span>
              <span className="text-gray-400">∧</span>
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-600 mb-6 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" checked={form.driverAge} onChange={e => setForm({...form, driverAge: e.target.checked})} />
            Driver's age 25+
          </label>

          <button onClick={handleNext} className="w-full bg-red-600 text-white font-bold text-2xl py-4 rounded-xl hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30">
            Next
          </button>
        </div>

        {/* Right side text */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-16 animate-slideInRight text-center lg:text-left">
          <p className="text-3xl md:text-5xl text-white leading-tight mb-2">YOUR CAR'S SAFTY</p>
          <p className="text-5xl md:text-7xl lg:text-[96px] font-bold text-red-600 leading-none">OUR</p>
          <p className="text-4xl md:text-6xl lg:text-[80px] font-bold text-white leading-tight mt-2">FIREST PRIORITY</p>
        </div>
      </div>
    </div>
  );
}

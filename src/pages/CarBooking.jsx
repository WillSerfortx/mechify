import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SelectField = ({ label, options }) => {
  return (
    <div className="relative group w-full mb-4">
      <select 
        className="w-full appearance-none bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 pr-10 rounded-lg outline-none cursor-pointer transition-all duration-300 hover:border-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
        defaultValue=""
      >
        <option value="" disabled hidden>{label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 group-hover:text-black transition-colors duration-300">
        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default function CarBooking() {
  const navigate = useNavigate();
  const [driverAge, setDriverAge] = useState(false);

  const locations = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal"];
  const dates = ["Today", "Tomorrow", "Next Week", "Next Month"];
  const times = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-outfit flex flex-col">
      {/* Background Map Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&h=1080&fit=crop" 
          alt="Vintage Map Background" 
          className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Header Bar */}
      <div className="relative z-20 w-full px-6 py-6 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl font-bold text-white hover:bg-white/20 transition-colors border border-white/20"
        >
          &lt;
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
        
        {/* Left Side: Form Card */}
        <div className="w-full max-w-[450px] bg-white rounded-2xl p-8 shadow-2xl animate-fadeInUp">
          
          <h2 className="text-2xl font-black text-black mb-6">Start your booking</h2>
          <SelectField label="Choose Location" options={locations} />
          <SelectField label="Select Date" options={dates} />
          <SelectField label="Time" options={times} />

          <h2 className="text-2xl font-black text-black mt-8 mb-6">Return</h2>
          <SelectField label="Choose Location" options={locations} />
          <SelectField label="Select Date" options={dates} />
          <SelectField label="Time" options={times} />

          {/* Driver's age checkbox */}
          <div className="flex items-center gap-2 mt-4 mb-8 cursor-pointer group" onClick={() => setDriverAge(!driverAge)}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${driverAge ? 'border-red-600 bg-red-600' : 'border-gray-400 group-hover:border-gray-600'}`}>
              {driverAge && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
            </div>
            <span className="text-sm font-semibold text-gray-700">Driver's age 25+</span>
          </div>

          {/* Next Button */}
          <button 
            onClick={() => navigate('/payment-select')}
            className="w-full bg-[#E50914] hover:bg-red-700 text-white font-black text-2xl py-4 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_5px_20px_rgba(229,9,20,0.4)]"
          >
            Next
          </button>
        </div>

        {/* Right Side: Typographic Overlays */}
        <div className="hidden lg:flex flex-col items-end text-right w-full flex-1 pt-12 relative animate-slideInRight">
          {/* Top Title */}
          <div className="absolute -top-32 right-0 w-full whitespace-nowrap">
            <h1 className="text-white text-7xl xl:text-[90px] font-black tracking-tighter drop-shadow-2xl">
              Choose Your Plans
            </h1>
            <div className="h-2 w-3/4 bg-[#E50914] mt-2 shadow-[0_0_15px_rgba(229,9,20,0.6)] ml-auto" />
          </div>

          {/* Main Body Text */}
          <div className="mt-32">
            <h2 className="text-white text-7xl xl:text-8xl font-black leading-tight drop-shadow-xl opacity-90 mix-blend-overlay">
              Car hire at<br />
              All Over<br />
              Bangladesh
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

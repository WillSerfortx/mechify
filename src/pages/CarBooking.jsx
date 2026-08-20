import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SelectField = ({ label, options }) => {
  return (
    <div className="relative group w-full mb-4">
      <select 
        className="w-full appearance-none bg-white border border-gray-400 text-black py-2.5 px-4 pr-10 text-sm rounded outline-none cursor-pointer focus:border-red-500 focus:ring-1 focus:ring-red-500"
        defaultValue=""
      >
        <option value="" disabled hidden>{label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
    <div className="relative min-h-screen bg-black overflow-hidden font-outfit flex flex-col pt-12 pb-20">
      {/* Background Map Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&h=1080&fit=crop" 
          alt="Vintage Map Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header Bar */}
      <div className="absolute top-0 left-0 w-full px-6 py-6 z-30">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold text-white hover:bg-white/30 transition-colors border border-white/30"
        >
          &lt;
        </button>
      </div>

      {/* Top Title */}
      <div className="relative z-20 w-full text-center px-12 md:px-24 mb-16 animate-fadeInDown">
        <h1 className="text-white text-5xl md:text-6xl xl:text-7xl font-bold tracking-wide drop-shadow-xl mb-4">
          Choose Your Plans
        </h1>
        {/* Massive red line */}
        <div className="h-2 md:h-3 w-full max-w-5xl bg-[#E50914] mx-auto shadow-lg" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-24">
        
        {/* Left Side: Form Card */}
        <div className="w-full max-w-[400px] bg-white rounded-2xl p-8 shadow-2xl animate-fadeInLeft relative z-20">
          
          <h2 className="text-2xl font-bold text-black mb-6">Start your booking</h2>
          <SelectField label="Choose Location" options={locations} />
          <SelectField label="Select Date" options={dates} />
          <SelectField label="Time" options={times} />

          <h2 className="text-2xl font-bold text-black mt-8 mb-6">Return</h2>
          <SelectField label="Choose Location" options={locations} />
          <SelectField label="Select Date" options={dates} />
          <SelectField label="Time" options={times} />

          {/* Driver's age checkbox */}
          <div className="flex items-center gap-2 mt-4 mb-8 cursor-pointer group" onClick={() => setDriverAge(!driverAge)}>
            <div className={`w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center transition-colors duration-300 ${driverAge ? 'border-black' : ''}`}>
              {driverAge && <div className="w-2 h-2 bg-black rounded-full" />}
            </div>
            <span className="text-xs font-semibold text-black">Driver's age 25+</span>
          </div>

          {/* Next Button */}
          <button 
            onClick={() => navigate('/payment-select')}
            className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold text-xl py-3 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md"
          >
            Next
          </button>
        </div>

        {/* Right Side: Typographic Overlays & Car Image */}
        <div className="flex-1 w-full relative h-[400px] lg:h-[500px] flex items-center justify-start lg:justify-center animate-fadeInRight z-10">
          {/* Main Body Text */}
          <div className="relative z-10 pl-4 lg:pl-0">
            <h2 className="text-white text-5xl md:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-2xl">
              Car hire at<br />
              <span className="font-black text-6xl md:text-7xl xl:text-[90px]">All Over</span><br />
              <span className="font-black text-6xl md:text-7xl xl:text-[90px]">Bangladesh</span>
            </h2>
          </div>
          
          {/* Black Car Overlay Image */}
          <img 
            src="/car-3.jpg" 
            alt="Black Car" 
            className="absolute top-1/2 left-[40%] md:left-[50%] lg:left-[60%] -translate-y-1/2 w-[350px] md:w-[450px] lg:w-[600px] xl:w-[700px] object-contain drop-shadow-2xl z-0 pointer-events-none mix-blend-lighten"
            style={{ transform: 'translate(-30%, -60%) scaleX(-1)' }}
          />
        </div>
      </div>
    </div>
  );
}

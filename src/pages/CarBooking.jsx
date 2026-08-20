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
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bangladesh_relief_location_map.jpg/1200px-Bangladesh_relief_location_map.jpg" 
          alt="Bangladesh Map Background" 
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-black/50" />
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-10 pl-10 lg:pl-32">
        
        {/* Left Side: Form Card */}
        <div className="w-full max-w-[500px] bg-white rounded-3xl p-10 shadow-2xl animate-fadeInLeft relative z-20">
          
          <h2 className="text-3xl font-bold text-black mb-6">Start your booking</h2>
          <SelectField label="Choose Location" options={locations} />
          <SelectField label="Select Date" options={dates} />
          <SelectField label="Time" options={times} />

          <h2 className="text-3xl font-bold text-black mt-8 mb-6">Return</h2>
          <SelectField label="Choose Location" options={locations} />
          <SelectField label="Select Date" options={dates} />
          <SelectField label="Time" options={times} />

          {/* Driver's age checkbox */}
          <div className="flex items-center gap-3 mt-4 mb-10 cursor-pointer group" onClick={() => setDriverAge(!driverAge)}>
            <div className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center transition-colors duration-300 ${driverAge ? 'border-black' : ''}`}>
              {driverAge && <div className="w-3 h-3 bg-black rounded-full" />}
            </div>
            <span className="text-sm font-semibold text-black">Driver's age 25+</span>
          </div>

          {/* Next Button */}
          <button 
            onClick={() => navigate('/payment-select')}
            className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold text-2xl py-4 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md"
          >
            Next
          </button>
        </div>

        {/* Right Side: Typographic Overlays */}
        <div className="flex-1 w-full relative flex items-center justify-center lg:justify-start animate-fadeInRight z-10 py-20">
          {/* Main Body Text */}
          <div className="relative z-10">
            <h2 className="text-white text-6xl md:text-7xl xl:text-8xl font-bold leading-tight drop-shadow-2xl">
              Car hire at<br />
              <span className="font-black text-7xl md:text-8xl xl:text-[100px]">All Over</span><br />
              <span className="font-black text-7xl md:text-8xl xl:text-[100px]">Bangladesh</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

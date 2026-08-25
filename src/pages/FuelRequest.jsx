import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FuelRequest() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [gpsAllowed, setGpsAllowed] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [fileAdded, setFileAdded] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: '',
    fuelType: '',
    carReg: '',
    name: '',
    nid: '',
    mobile: '',
    otp: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setGpsAllowed(true),
        () => {
          setGpsAllowed(true); // Simulate success for demo
        }
      );
    } else {
      setGpsAllowed(true);
    }
  };

  const handleSendOTP = () => {
    if (formData.mobile.length < 11) {
      alert('Please enter a valid mobile number');
      return;
    }
    setOtpSent(true);
    alert(`OTP sent to ${formData.mobile}`);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileAdded(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gpsAllowed) {
      alert('Please allow GPS location access first.');
      return;
    }
    if (!otpSent) {
      alert('Please send OTP first.');
      return;
    }
    if (!formData.otp) {
      alert('Please enter the OTP.');
      return;
    }
    navigate('/payment-select', { state: { fromFuelRequest: true } });
  };

  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan / Saloon' },
    { value: 'suv', label: 'SUV / CrossOver' },
    { value: 'truck', label: 'Truck / Commercial' },
    { value: 'bike', label: 'Motorcycle' },
  ];

  return (
    <div className="bg-black min-h-screen text-white font-outfit">
      
      {/* ════════════════════════════════════════
          HERO HEADER — Same as FuelTerms
      ════════════════════════════════════════ */}
      <div className="relative w-full">
        {/* Red background bar */}
        <div className="absolute top-0 right-0 w-full h-[200px] md:h-[280px] bg-red-600 z-0" />

        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-[220px] md:top-[300px] left-4 md:left-6 z-30 w-12 h-12 md:w-16 md:h-16 bg-black border-4 border-white flex items-center justify-center text-white text-2xl md:text-3xl font-bold hover:bg-white/10 transition-colors"
        >
          &lt;
        </button>

        {/* Image grid */}
        <div className="relative z-10 flex w-full" style={{ height: 'clamp(300px, 35vw, 520px)' }}>
          {/* Left image — fuel pump */}
          <div className="w-[36%] h-full overflow-hidden">
            <img 
              src="/images/fuel-delivery.png" 
              alt="Fuel pump" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Center image — silos */}
          <div className="w-[28%] h-[72%] self-end overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1628189689917-c8340d859e99?w=800&h=600&fit=crop" 
              alt="Fuel silos" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right image — tanker truck */}
          <div className="w-[36%] h-full overflow-hidden self-end">
            <img 
              src="https://images.unsplash.com/photo-1616788417724-4f248bb017b8?w=800&h=1200&fit=crop" 
              alt="Fuel tanker" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title text overlay */}
        <div className="absolute top-8 md:top-16 left-0 right-0 z-20 text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-lg">
            Emergency Fuel Delivery
          </h1>
          <p className="text-sm md:text-base font-semibold tracking-widest uppercase mt-2 text-white/90">
            Home / EMERGENCY FUEL DELIVERY
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          FORM — Matches Figma 1-2076 & 1-2231
      ════════════════════════════════════════ */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mt-12 flex flex-col lg:flex-row gap-12 pb-24">
        
        {/* Left Column: Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* GPS Location */}
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4">
                Allow Auto-detect GPS location
              </label>
              <div className="relative">
                <div 
                  onClick={handleLocate}
                  className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className={gpsAllowed ? 'text-white' : 'text-gray-500'}>
                    {gpsAllowed ? 'Allowed' : ''}
                  </span>
                  {/* Location pin icon */}
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4">
                Vehicle Type
              </label>
              <div className="relative w-full md:w-[45%]">
                <button
                  type="button"
                  onClick={() => setVehicleOpen(!vehicleOpen)}
                  className="w-full border-4 border-white bg-black px-6 py-5 text-xl font-semibold flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span>{formData.vehicleType ? vehicleTypes.find(v => v.value === formData.vehicleType)?.label : 'Vehicle Type'}</span>
                  <svg className={`w-8 h-8 text-white transition-transform ${vehicleOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                {vehicleOpen && (
                  <div className="absolute top-full left-0 w-full bg-black border-4 border-t-0 border-white z-20">
                    {vehicleTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, vehicleType: type.value });
                          setVehicleOpen(false);
                        }}
                        className="w-full text-left px-6 py-4 text-lg hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
                className="w-full md:w-[45%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled></option>
                <option value="octane">Octane (95+)</option>
                <option value="petrol">Petrol (Regular)</option>
                <option value="diesel">Diesel</option>
              </select>
            </div>

            {/* Car REG NUMBER */}
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4">
                Car <span className="text-red-500">REG NUMBER</span>
              </label>
              <input
                type="text"
                name="carReg"
                value={formData.carReg}
                onChange={handleChange}
                required
                className="w-full md:w-[45%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none"
              />
            </div>

            {/* Driving License photo */}
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4 text-red-500">
                Driving License photo
              </label>
              <div 
                onClick={handleFileUpload}
                className="w-full md:w-[65%] border-4 border-white bg-black px-2 py-3 flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="w-16 h-16 bg-gray-300 flex items-center justify-center shrink-0">
                  <span className="text-black text-4xl font-bold leading-none">+</span>
                </div>
                <span className="text-xl text-white">
                  {fileAdded ? '1 File Added' : ''}
                </span>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" 
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4 text-red-500">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl text-center focus:outline-none"
              />
            </div>

            {/* NID */}
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4 text-red-500">
                NID
              </label>
              <input
                type="text"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                required
                className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl text-center focus:outline-none"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4 text-red-500">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl text-center focus:outline-none"
              />
            </div>

            {/* Send OTP checkbox (before OTP sent) */}
            {!otpSent && (
              <div className="flex items-center gap-3">
                <div 
                  onClick={handleSendOTP}
                  className="w-6 h-6 border-2 border-gray-500 rounded bg-black cursor-pointer hover:border-white transition-colors"
                />
                <span 
                  onClick={handleSendOTP}
                  className="text-red-500 font-bold text-lg cursor-pointer hover:text-red-400 transition-colors"
                >
                  Sent Otp and confirmation
                </span>
              </div>
            )}

            {/* Enter OTP (after OTP sent) */}
            {otpSent && (
              <div>
                <label className="block text-xl md:text-2xl font-normal mb-4 text-red-500">
                  Enter Otp
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  maxLength="6"
                  className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl text-center focus:outline-none tracking-widest"
                />
              </div>
            )}

            {/* Confirm Request Button */}
            {otpSent && (
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-2xl md:text-3xl px-16 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95"
                >
                  Confirm Request
                </button>
              </div>
            )}

          </form>
        </div>

        {/* Right Column: Tall Tanker Image */}
        <div className="hidden lg:block w-1/3">
          <div className="sticky top-32 w-full h-[900px] overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1616788417724-4f248bb017b8?w=800&h=1200&fit=crop" 
               alt="Fuel Tanker on Road" 
               className="w-full h-full object-cover" 
             />
          </div>
        </div>

      </div>
    </div>
  );
}

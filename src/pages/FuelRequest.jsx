import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FuelRequest() {
  const navigate = useNavigate();
  const [gpsActive, setGpsActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: '',
    fuelType: '',
    carReg: '',
    license: '',
    name: '',
    nid: '',
    mobile: '',
    otp: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocate = () => {
    // Simulate GPS location finding
    setTimeout(() => {
      setGpsActive(true);
      alert('Location acquired successfully!');
    }, 1000);
  };

  const handleSendOTP = () => {
    if (formData.mobile.length < 11) {
      alert('Please enter a valid mobile number');
      return;
    }
    setOtpSent(true);
    alert(`OTP sent to ${formData.mobile}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gpsActive) {
      alert('Please allow GPS location access first.');
      return;
    }
    if (otpSent && formData.otp !== '1234') {
      alert('Invalid OTP. Please enter 1234 for simulation.');
      return;
    }
    
    // In simulation, proceed to payment
    navigate('/payment-select', { state: { fromFuelRequest: true } });
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit py-24 px-6 md:px-12 lg:px-20 relative">
      
      {/* Back Button */}
      <div className="absolute top-12 left-6 md:left-12 lg:left-20 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors border border-white/20"
        >
          &lt;
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <span className="text-3xl">⛽</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">Emergency Fuel Request</h1>
          <p className="text-gray-400">Fill in the details below to dispatch a fuel truck to your location.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          {/* GPS Section */}
          <div className="border-b border-white/10 pb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-red-500">📍</span> Location Details
            </h2>
            <div className="flex items-center justify-between bg-black rounded-xl p-4 border border-white/20">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{gpsActive ? 'Location Acquired' : 'GPS Access Required'}</span>
                <span className="text-xs text-gray-400">{gpsActive ? 'Lat: 23.8103° N, Lon: 90.4125° E' : 'Please allow access to locate your vehicle'}</span>
              </div>
              <button 
                type="button" 
                onClick={handleLocate}
                className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                  gpsActive ? 'bg-green-600 text-white cursor-default' : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {gpsActive ? 'Verified ✓' : 'Locate Me'}
              </button>
            </div>
          </div>

          {/* Vehicle & Fuel */}
          <div className="border-b border-white/10 pb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-red-500">🚗</span> Vehicle & Fuel Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Vehicle Type</label>
                <select name="vehicleType" required value={formData.vehicleType} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 appearance-none">
                  <option value="" disabled>Select Vehicle Type</option>
                  <option value="sedan">Sedan / Saloon</option>
                  <option value="suv">SUV / CrossOver</option>
                  <option value="truck">Truck / Commercial</option>
                  <option value="bike">Motorcycle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Fuel Type Required</label>
                <select name="fuelType" required value={formData.fuelType} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 appearance-none">
                  <option value="" disabled>Select Fuel Type</option>
                  <option value="octane">Octane (95+)</option>
                  <option value="petrol">Petrol (Regular)</option>
                  <option value="diesel">Diesel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Car Registration Number</label>
                <input type="text" name="carReg" required placeholder="e.g. Dhaka Metro Gha 12-3456" value={formData.carReg} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-red-500">👤</span> Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Driving License Number</label>
                <input type="text" name="license" required value={formData.license} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-300">NID Number (National ID)</label>
                <input type="text" name="nid" required value={formData.nid} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
              </div>
            </div>
            
            {/* OTP Section */}
            <div className="bg-black/50 p-6 rounded-xl border border-white/10">
              <label className="block text-sm font-semibold mb-2 text-gray-300">Mobile Number</label>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input type="tel" name="mobile" required placeholder="+880" value={formData.mobile} onChange={handleChange} className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500" />
                <button 
                  type="button" 
                  onClick={handleSendOTP}
                  className="whitespace-nowrap bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Send OTP
                </button>
              </div>
              {otpSent && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-semibold mb-2 text-red-500">Enter OTP (Use 1234)</label>
                  <input type="text" name="otp" required maxLength="4" placeholder="••••" value={formData.otp} onChange={handleChange} className="w-full sm:w-1/2 bg-black border border-red-500/50 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 tracking-widest text-xl text-center" />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:scale-[1.02] active:scale-95"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FuelTerms() {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (accepted) {
      navigate('/fuel-request');
    } else {
      alert('Please accept the Terms and Conditions to proceed.');
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24">
      {/* Back Button */}
      <div className="absolute top-24 left-6 md:left-12 lg:left-20 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl hover:bg-black/70 transition-colors border border-white/20"
        >
          &lt;
        </button>
      </div>

      {/* Hero Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 flex">
          <div className="w-1/2 h-full">
            <img src="https://images.unsplash.com/photo-1545012820-8f24ce54d4f5?w=1000&h=600&fit=crop" alt="Fueling" className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 h-full relative">
            <img src="https://images.unsplash.com/photo-1628189689917-c8340d859e99?w=1000&h=600&fit=crop" alt="Silos" className="w-full h-full object-cover" />
            {/* Red overlay block as seen in Figma */}
            <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-red-600 -translate-y-1/4 translate-x-1/4 -skew-x-[30deg] origin-bottom-right z-10 hidden md:block"></div>
          </div>
          {/* Mobile Red Overlay */}
          <div className="absolute inset-0 bg-red-600/80 md:hidden z-10" />
        </div>
        
        <div className="relative z-20 w-full text-center md:text-right px-8 md:px-24">
          <h1 className="text-4xl md:text-6xl font-black mb-2 drop-shadow-lg">Emergency Fuel Delivery</h1>
          <p className="text-sm font-semibold tracking-widest uppercase">Home / EMERGENCY FUEL DELIVERY</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mt-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Terms */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight">Emergency Fuel Delivery<br/>Terms and Conditons</h2>
          
          <div className="space-y-4 text-sm md:text-base text-gray-300 font-semibold max-w-2xl">
            <p><span className="text-red-500 font-black">1.</span> Service Availability<br/>Emergency Fuel Delivery is available only in selected service areas. Availability may vary based on location, fuel stock, weather conditions, and operational constraints. Mechify does not guarantee service in all locations at all times.</p>
            <p><span className="text-red-500 font-black">2.</span> Purpose of Service<br/>This service is strictly intended for emergency situations where a vehicle has run out of fuel. It is not meant for regular refueling, bulk fuel orders, or commercial use.</p>
            <p><span className="text-red-500 font-black">3.</span> Fuel Quantity Limitation<br/>The quantity of fuel delivered under emergency service is limited and determined by Mechify in accordance with safety guidelines and local regulations.</p>
            <p><span className="text-red-500 font-black">4.</span> Fuel Type Selection<br/>Users are solely responsible for selecting the correct fuel type (Petrol, Diesel, or Octane). Mechify shall not be held responsible for any damage caused due to incorrect fuel selection by the user.</p>
            <p><span className="text-red-500 font-black">5.</span> Pricing and Charges<br/>The total cost may include:<br/>Fuel cost<br/>Delivery charges<br/>Emergency or convenience fees<br/>All applicable charges will be displayed before order confirmation. Prices may vary depending on location and time.</p>
            <p><span className="text-red-500 font-black">6.</span> Payment Policy<br/>Payment must be completed through the available payment methods before service delivery unless cash payment is explicitly allowed. Failure to complete payment may result in service cancellation.</p>
            <p><span className="text-red-500 font-black">7.</span> Safety and Accessibility<br/>The user must ensure that the vehicle is parked in a safe and legally accessible location. If the delivery location is unsafe or inaccessible, Mechify reserves the right to cancel the service without refund.</p>
            <p><span className="text-red-500 font-black">8.</span> Delays and Cancellation<br/>Service delivery time may be affected by traffic, weather, road conditions, or unforeseen circumstances. If the service provider arrives at the location and the user is unavailable, the order may be marked as completed with no refund.</p>
            <p><span className="text-red-500 font-black">9.</span> Limitation of Liability<br/>Mechify's responsibility is limited to the delivery of fuel. Mechify is not responsible for:<br/>Vehicle condition or mechanical issues<br/>Engine damage<br/>Failure of the vehicle to start after fuel delivery</p>
            <p><span className="text-red-500 font-black">10.</span> Service Refusal or Cancellation by Mechify<br/>Mechify reserves the right to refuse or cancel service in cases of:<br/>Incorrect or misleading location details<br/>Unsafe environment<br/>False emergency requests<br/>Misconduct or abuse towards service personnel</p>
            <p><span className="text-red-500 font-black">11.</span> Legal and Safety Compliance<br/>Fuel delivery will be conducted in compliance with applicable safety standards and local laws. Any misuse, illegal storage, resale, or unsafe handling of fuel is strictly prohibited.</p>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={accepted}
                  onChange={() => setAccepted(!accepted)}
                />
                <div className="w-6 h-6 border-2 border-red-600 rounded bg-black peer-checked:bg-red-600 transition-colors flex items-center justify-center">
                  <svg className={`w-4 h-4 text-white transition-opacity ${accepted ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-red-600 font-bold text-lg select-none group-hover:text-red-500 transition-colors">Accept terms and Conditions</span>
            </label>
          </div>

          <button 
            onClick={handleProceed}
            className={`mt-8 px-10 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
              accepted 
                ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Request
          </button>

        </div>

        {/* Right Column: Tall Image */}
        <div className="hidden lg:block w-1/3">
          <div className="sticky top-24 w-full h-[800px] rounded-2xl overflow-hidden">
             <img src="https://images.unsplash.com/photo-1616788417724-4f248bb017b8?w=800&h=1200&fit=crop" alt="Fuel Truck on Road" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
}

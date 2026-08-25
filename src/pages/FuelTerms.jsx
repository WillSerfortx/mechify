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
    <div className="bg-black min-h-screen text-white font-outfit">
      
      {/* ════════════════════════════════════════
          HERO HEADER — Matches Figma 1-864
          Red banner + 3 images + title
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

        {/* Title text overlay on the red area */}
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
          MAIN CONTENT — T&C + Right Image
      ════════════════════════════════════════ */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mt-12 flex flex-col lg:flex-row gap-12 pb-24">
        
        {/* Left Column: Terms */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight">
            Emergency Fuel Delivery<br/>Terms and Conditons
          </h2>
          
          <div className="space-y-6 text-sm md:text-base text-gray-300 font-semibold max-w-3xl">
            <p>
              <span className="text-red-500 font-black text-lg">1.</span> Service Availability<br/>
              Emergency Fuel Delivery is available only in selected service areas. Availability may vary based on location, fuel stock, weather conditions, and operational constraints. Mechify does not guarantee service in all locations at all times.
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">2.</span> Purpose of Service<br/>
              This service is strictly intended for emergency situations where a vehicle has run out of fuel. It is not meant for regular refueling, bulk fuel orders, or commercial use.
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">3.</span> Fuel Quantity Limitation<br/>
              The quantity of fuel delivered under emergency service is limited and determined by Mechify in accordance with safety guidelines and local regulations.
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">4.</span> Fuel Type Selection<br/>
              Users are solely responsible for selecting the correct fuel type (Petrol, Diesel, or Octane). Mechify shall not be held responsible for any damage caused due to incorrect fuel selection by the user.
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">5.</span> Pricing and Charges<br/>
              The total cost may include:<br/>
              Fuel cost<br/>
              Delivery charges<br/>
              Emergency or convenience fees<br/>
              All applicable charges will be displayed before order confirmation. Prices may vary depending on location and time.
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">6.</span> Payment Policy<br/>
              Payment must be completed through the available payment methods before service delivery unless cash payment is explicitly allowed. Failure to complete payment may result in service cancellation.
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">7.</span> Safety and Accessibility<br/>
              The user must ensure that the vehicle is parked in a safe and legally accessible location. If the delivery location is unsafe or inaccessible, Mechify reserves the right to cancel the service without refund.
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">8.</span> Delays and Cancellation<br/>
              Service delivery time may be affected by traffic, weather, road conditions, or unforeseen circumstances. If the service provider arrives at the location and the user is unavailable, the order may be marked as completed with no refund.
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">9.</span> Limitation of Liability<br/>
              Mechify's responsibility is limited to the delivery of fuel. Mechify is not responsible for:<br/>
              Vehicle condition or mechanical issues<br/>
              Engine damage<br/>
              Failure of the vehicle to start after fuel delivery
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">10.</span> Service Refusal or Cancellation by Mechify<br/>
              Mechify reserves the right to refuse or cancel service in cases of:<br/>
              Incorrect or misleading location details<br/>
              Unsafe environment<br/>
              False emergency requests<br/>
              Misconduct or abuse towards service personnel
            </p>
            <p>
              <span className="text-red-500 font-black text-lg">11.</span> Legal and Safety Compliance<br/>
              Fuel delivery will be conducted in compliance with applicable safety standards and local laws. Any misuse, illegal storage, resale, or unsafe handling of fuel is strictly prohibited.
            </p>
          </div>

          {/* Accept checkbox */}
          <div className="mt-10 flex items-center gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={accepted}
                  onChange={() => setAccepted(!accepted)}
                />
                <div className="w-6 h-6 border-2 border-gray-500 rounded bg-black peer-checked:bg-gray-500 transition-colors flex items-center justify-center">
                  <svg className={`w-4 h-4 text-white transition-opacity ${accepted ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-red-500 font-bold text-lg select-none group-hover:text-red-400 transition-colors">
                Accept terms and Conditions
              </span>
            </label>
          </div>

          {/* Proceed button */}
          <button 
            onClick={handleProceed}
            className={`mt-8 px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 ${
              accepted 
                ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-105' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Request
          </button>
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

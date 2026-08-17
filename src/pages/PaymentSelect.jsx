import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const methods = [
  { name: 'Visa', id: 'visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png' },
  { name: 'Bkash', id: 'bkash', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BKash_Logo.svg/1024px-BKash_Logo.svg.png' },
  { name: 'Nagad', id: 'nagad', logo: 'https://upload.wikimedia.org/wikipedia/bn/thumb/8/87/Nagad_Logo.svg/1024px-Nagad_Logo.svg.png' },
  { name: 'Cash On DELIVERY', id: 'cash', logo: 'https://cdn-icons-png.flaticon.com/512/2489/2489756.png' }, // Generic cash icon
];

export default function PaymentSelect() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected === null) {
      alert('Please select a payment method.');
      return;
    }
    
    // If Cash On Delivery is selected (index 3 based on methods array)
    if (selected === 3) {
      if (location.state?.fromWorkshopBooking) {
        navigate('/profile', { state: { activeWorkshop: true, date: location.state?.date, time: location.state?.time } });
      } else {
        navigate('/profile', { state: { activeDelivery: true } });
      }
    } else {
      navigate('/payment-success');
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center py-12 px-6 font-outfit">
      <div className="w-full max-w-lg relative">
        
        {/* Back Arrow (Left of box) */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-12 h-12 border-2 border-white flex items-center justify-center text-white text-3xl font-black hover:bg-white hover:text-black transition-colors"
        >
          &lt;
        </button>

        {/* Payment Box */}
        <div className="border border-white rounded-3xl p-10 bg-black">
          <div className="mb-8">
            <h1 className="text-white text-2xl font-black mb-2">Select Payment METHOD</h1>
            <p className="text-gray-400 text-xs">Payment Method with secure transaction</p>
          </div>

          <div className="space-y-6 mb-12">
            {methods.map((method, i) => (
              <button
                key={method.id}
                onClick={() => setSelected(i)}
                className={`w-full bg-white rounded-full flex items-center px-8 py-3 transition-all duration-300 ${
                  selected === i ? 'ring-4 ring-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105' : 'hover:bg-gray-100'
                }`}
              >
                <div className="w-16 h-8 flex items-center justify-center mr-6">
                  <img src={method.logo} alt={method.name} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-black text-lg font-semibold">{method.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <button
              onClick={handleContinue}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 rounded-full transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
              Continue
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-black border border-white text-white font-black text-xl py-4 rounded-full transition-colors hover:bg-white/10"
            >
              Go Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

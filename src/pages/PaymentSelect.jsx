import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const methods = [
  { name: 'Visa', logo: '💳', color: '#1A1F71' },
  { name: 'Bkash', logo: '🅱️', color: '#E2136E' },
  { name: 'Nagad', logo: '🟠', color: '#ED1C24' },
  { name: 'Cash On DELIVERY', logo: '💵', color: '#2e7d32' },
];

export default function PaymentSelect() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <div className="bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 w-full max-w-3xl animate-scaleIn shadow-2xl backdrop-blur-sm">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left text-white">Select Payment METHOD</h1>
        <p className="text-gray-400 text-lg mb-12 text-center md:text-left">Payment Method with secure transaction</p>

        <div className="space-y-4">
          {methods.map((method, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`w-full flex items-center gap-6 bg-white rounded-2xl px-6 md:px-8 py-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 animate-fadeInUp ${selected === i ? 'ring-4 ring-red-500 shadow-xl shadow-red-500/20' : 'hover:shadow-lg'}`}
              style={{animationDelay: `${i * 0.1}s`}}>
              <div className="w-16 h-12 flex items-center justify-center rounded-lg text-4xl">
                {method.logo}
              </div>
              <span className="text-black text-xl md:text-2xl font-bold flex-1 text-left">{method.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          <button onClick={() => navigate('/card-payment')}
            className="w-full bg-red-600 text-white font-bold text-xl md:text-2xl py-4 rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-600/30">
            Continue
          </button>
          <button onClick={() => navigate(-1)}
            className="w-full bg-transparent border-2 border-white/50 text-white font-bold text-xl md:text-2xl py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-[1.02] active:scale-95">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

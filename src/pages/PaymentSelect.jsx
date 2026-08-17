import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const methods = [
  {
    name: 'Visa',
    subtitle: 'Credit / Debit Card',
    icon: '💳',
    color: '#1A1F71',
    gradient: 'from-[#1A1F71] to-[#2a3080]',
  },
  {
    name: 'bKash',
    subtitle: 'Mobile Banking',
    icon: '📱',
    color: '#E2136E',
    gradient: 'from-[#E2136E] to-[#b50d57]',
  },
  {
    name: 'Nagad',
    subtitle: 'Digital Payment',
    icon: '💰',
    color: '#F7941D',
    gradient: 'from-[#F7941D] to-[#c97a18]',
  },
  {
    name: 'Cash on Delivery',
    subtitle: 'Pay when service arrives',
    icon: '💵',
    color: '#16a34a',
    gradient: 'from-[#16a34a] to-[#15803d]',
  },
];

export default function PaymentSelect() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected === null) {
      alert('Please select a payment method.');
      return;
    }
    navigate('/card-payment');
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center py-12 px-6 font-outfit">
      <div className="w-full max-w-xl animate-scaleIn">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-semibold">Secure Transaction</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Select Payment</h1>
          <p className="text-gray-400">Choose your preferred payment method</p>
        </div>

        {/* Payment Options */}
        <div className="space-y-3 mb-8">
          {methods.map((method, i) => (
            <button
              key={i}
              id={`payment-${method.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelected(i)}
              className={`w-full flex items-center gap-5 rounded-2xl px-6 py-5 transition-all duration-300 border-2 hover:-translate-y-0.5 animate-fadeInUp group ${
                selected === i
                  ? 'border-transparent shadow-2xl scale-[1.02]'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              style={selected === i ? {
                background: `linear-gradient(135deg, ${method.color}dd, ${method.color}99)`,
                boxShadow: `0 8px 32px ${method.color}44`,
              } : {}}
              aria-label={`Select ${method.name}`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-all duration-300 ${
                  selected === i ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/15'
                }`}
              >
                {method.icon}
              </div>

              {/* Text */}
              <div className="flex-1 text-left">
                <div className="font-black text-xl text-white">{method.name}</div>
                <div className={`text-sm ${selected === i ? 'text-white/80' : 'text-gray-400'}`}>
                  {method.subtitle}
                </div>
              </div>

              {/* Checkmark */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                selected === i ? 'bg-white border-white' : 'border-gray-600'
              }`}>
                {selected === i && <span className="text-gray-900 text-sm font-black">✓</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            id="payment-continue-btn"
            onClick={handleContinue}
            className={`btn-red-glow w-full py-4 text-xl font-black ${selected === null ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            Continue →
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full border-2 border-white/20 text-white font-bold text-lg py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            ← Go Back
          </button>
        </div>

        {/* Security note */}
        <p className="text-center text-gray-600 text-xs mt-6">
          🔒 256-bit SSL encrypted · Your payment info is never stored
        </p>
      </div>
    </div>
  );
}

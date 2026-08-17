import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardPayment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ cardNumber: '', cvc: '', name: '', days: '', month: '', year: '', otp: '' });
  const [showOtp, setShowOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => { setShowOtp(true); setOtpSent(true); };
  const handleComplete = () => navigate('/payment-success');

  return (
    <div className="bg-black min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <div className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-2xl animate-scaleIn shadow-2xl">
        {/* Visa Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-[#1A1F71] text-4xl md:text-5xl font-bold italic font-serif">VISA</div>
        </div>

        {/* Card Number + CVC */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex-1">
            <label className="text-lg font-bold text-black block mb-2">Card Number</label>
            <input type="text" placeholder="Card Number" value={form.cardNumber} onChange={e => setForm({...form, cardNumber: e.target.value})}
              className="w-full bg-gray-100 rounded-full px-6 py-4 text-red-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500" />
          </div>
          <div className="w-full sm:w-32 flex-shrink-0">
            <label className="text-lg font-bold text-black block mb-2">CVC</label>
            <input type="text" placeholder="CVC" value={form.cvc} onChange={e => setForm({...form, cvc: e.target.value})}
              className="w-full bg-gray-100 rounded-full px-6 py-4 text-red-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500" />
          </div>
        </div>

        {/* Card Holder Name */}
        <div className="mb-8">
          <label className="text-lg font-bold text-black block mb-2">Card Holder Name</label>
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            className="w-full bg-gray-100 rounded-full px-6 py-4 text-red-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500" />
        </div>

        {/* Expiration Date */}
        <div className="mb-6">
          <label className="text-lg font-bold text-black block mb-2">Expiration Date</label>
          <div className="flex gap-4">
            <input type="text" placeholder="DD" value={form.days} onChange={e => setForm({...form, days: e.target.value})}
              className="w-1/3 bg-gray-100 rounded-full px-4 py-4 text-center outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500" />
            <input type="text" placeholder="MM" value={form.month} onChange={e => setForm({...form, month: e.target.value})}
              className="w-1/3 bg-gray-100 rounded-full px-4 py-4 text-center outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500" />
            <input type="text" placeholder="YYYY" value={form.year} onChange={e => setForm({...form, year: e.target.value})}
              className="w-1/3 bg-gray-100 rounded-full px-4 py-4 text-center outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500" />
          </div>
        </div>

        {/* Send OTP */}
        <div className="flex items-center gap-3 mb-6">
          <input type="checkbox" className="w-5 h-5 rounded border-gray-300" checked={otpSent} onChange={handleSendOtp} />
          <span className="text-base text-red-500 font-semibold cursor-pointer hover:text-red-600 transition-colors" onClick={handleSendOtp}>Send OTP</span>
        </div>

        {/* OTP Input */}
        {showOtp && (
          <div className="mb-8 animate-slideDown">
            <label className="text-lg font-bold text-black block mb-2">Enter OTP</label>
            <input type="text" placeholder="OTP" value={form.otp} onChange={e => setForm({...form, otp: e.target.value})}
              className="w-full sm:w-1/2 bg-gray-100 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500" />
          </div>
        )}

        {/* Complete Order */}
        <button onClick={handleComplete}
          className="w-full bg-blue-600 text-white font-bold text-xl md:text-2xl py-4 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30">
          Complete Order
        </button>
      </div>
    </div>
  );
}

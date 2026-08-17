import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PaymentSuccess() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-6">
      <div className={`bg-white rounded-3xl p-10 md:p-16 w-full max-w-2xl text-center transition-all duration-700 shadow-2xl ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        {/* Visa Logo */}
        <div className="mb-10">
          <div className="text-[#1A1F71] text-5xl font-bold italic font-serif">VISA</div>
        </div>

        {/* Success Message */}
        <h1 className={`text-3xl md:text-5xl font-bold text-[#1A1F71] mb-10 leading-tight transition-all duration-500 delay-300 ${show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          Congratulations Your payment has done successfully
        </h1>

        {/* Confetti Icon */}
        <div className={`text-7xl md:text-[80px] mb-12 transition-all duration-700 delay-500 ${show ? 'scale-100 opacity-100 animate-bounceIn' : 'scale-0 opacity-0'}`}>
          🎉
        </div>

        {/* Check Button */}
        <Link to="/profile"
          className={`inline-block bg-[#a8d8ea] text-[#1A1F71] font-bold text-xl md:text-2xl px-12 py-4 md:py-5 rounded-full hover:bg-[#82c4de] transition-all duration-300 hover:scale-105 shadow-lg delay-700 ${show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          Check
        </Link>
      </div>
    </div>
  );
}

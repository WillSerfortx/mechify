import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TimeSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and a time slot.');
      return;
    }
    // Navigate to payment and pass along workshop booking state
    navigate('/payment-select', { state: { fromWorkshopBooking: true, date: selectedDate, time: selectedTime } });
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit pt-32 pb-24 px-6 md:px-12 lg:px-20 relative">
      


      <div className="max-w-4xl mx-auto mt-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <span className="text-3xl">🗓️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">Select Date & Time</h1>
          <p className="text-gray-400">Choose when you'd like to drop off your vehicle.</p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12">
          
          {/* Date Picker Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-red-500">1.</span> Pick a Date
            </h2>
            <div className="bg-black border border-white/20 rounded-xl p-6">
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
                className="w-full bg-transparent text-white text-xl font-bold focus:outline-none cursor-pointer p-2" 
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Time Picker Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-red-500">2.</span> Pick a Time
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {timeSlots.map((time, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-xl font-bold text-sm transition-all duration-300 border ${
                    selectedTime === time 
                      ? 'bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-105' 
                      : 'bg-black border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95"
          >
            Confirm Appointment
          </button>
        </div>

      </div>
    </div>
  );
}

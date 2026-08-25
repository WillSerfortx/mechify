import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoadsideRequest() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [gpsAllowed, setGpsAllowed] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [fileAdded, setFileAdded] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [conditionOpen, setConditionOpen] = useState(false);
  const [urgencyOpen, setUrgencyOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleReg: '',
    vehicleModel: '',
    issue: '',
    vehicleCondition: '',
    urgency: '',
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
        () => setGpsAllowed(true)
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

  const handleFileUpload = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) setFileAdded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gpsAllowed) { alert('Please allow location access first.'); return; }
    if (!otpSent) { alert('Please send OTP first.'); return; }
    if (!formData.otp) { alert('Please enter the OTP.'); return; }
    navigate('/payment-select', { state: { fromRoadside: true } });
  };

  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan / Saloon' },
    { value: 'suv', label: 'SUV / CrossOver' },
    { value: 'truck', label: 'Truck / Commercial' },
    { value: 'bike', label: 'Motorcycle' },
  ];
  const vehicleConditions = [
    { value: 'running', label: 'Running but damaged' },
    { value: 'not-starting', label: 'Not Starting' },
    { value: 'flat-tire', label: 'Flat Tire' },
    { value: 'accident', label: 'Accident / Collision' },
    { value: 'other', label: 'Other' },
  ];
  const urgencyLevels = [
    { value: 'low', label: 'Low — Can wait' },
    { value: 'medium', label: 'Medium — Need help soon' },
    { value: 'high', label: 'High — Urgent' },
    { value: 'critical', label: 'Critical — Emergency' },
  ];

  const DropdownButton = ({ label, options, value, isOpen, setOpen, fieldName }) => (
    <div className="relative w-full md:w-[45%]">
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        className="w-full border-4 border-white bg-black px-6 py-5 text-xl font-semibold flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span>{value ? options.find(o => o.value === value)?.label : label}</span>
        <svg className={`w-8 h-8 text-white transition-transform ${isOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-4 border-t-0 border-white z-20">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, [fieldName]: opt.value }));
                setOpen(false);
              }}
              className="w-full text-left px-6 py-4 text-lg hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white font-outfit">
      
      {/* ════════════════════════════════════════
          HERO — Same as landing
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-28 pt-32 pb-8">
        <div className="relative w-full rounded-[40px] md:rounded-[50px] overflow-hidden shadow-[0_4px_30px_10px_rgba(255,255,255,0.1)]" style={{ minHeight: '350px' }}>
          <img 
            src="/images/roadside/hero.png" 
            alt="Vehicle Recovery" 
            className="w-full h-full object-cover absolute inset-0 opacity-50"
          />
          <div className="relative z-10 flex flex-col items-center justify-end text-center px-8 py-12" style={{ minHeight: '350px' }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
              Vehicle Recovery Services Across Bangladesh
            </h1>
            <p className="text-sm md:text-base font-extrabold max-w-4xl leading-relaxed text-white/90">
              Get back on the road quickly and safely with MI Recovery Service – your reliable support in fast jump starts and
              emergency vehicle recovery services. Never let breakdowns break you with our on-the-go transportation
              solutions and emergency fuel delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-[50%] left-0 z-50 w-12 h-12 md:w-16 md:h-16 bg-black border-4 border-white flex items-center justify-center text-white text-2xl md:text-3xl font-bold hover:bg-white/10 transition-colors"
      >
        &lt;
      </button>

      {/* ════════════════════════════════════════
          FORM — Matches Figma 1-2045 & 1-2192
      ════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-28 py-12 pb-24">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
          Vehicle Emergency Service Requirements
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Allow your location */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">
              Allow your location
            </label>
            <div 
              onClick={handleLocate}
              className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <span className={gpsAllowed ? 'text-white' : 'text-gray-500'}>
                {gpsAllowed ? 'Allowed' : ''}
              </span>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">Vehicle Type</label>
            <DropdownButton label="Vehicle Type" options={vehicleTypes} value={formData.vehicleType} isOpen={vehicleOpen} setOpen={setVehicleOpen} fieldName="vehicleType" />
          </div>

          {/* Vehicle REG NUMBER */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">
              Vehicle <span className="text-red-500">REG NUMBER</span>
            </label>
            <input type="text" name="vehicleReg" value={formData.vehicleReg} onChange={handleChange} required className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none" />
          </div>

          {/* Vehicle Model (Page 3 only shows this) */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">Vehicle Model</label>
            <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none" />
          </div>

          {/* What is the issue */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">What is the issue of your car</label>
            <input type="text" name="issue" value={formData.issue} onChange={handleChange} required className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none" />
          </div>

          {/* Vehicle Condition */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">Vehicle Conditon</label>
            <DropdownButton label="Vehicle Condition" options={vehicleConditions} value={formData.vehicleCondition} isOpen={conditionOpen} setOpen={setConditionOpen} fieldName="vehicleCondition" />
          </div>

          {/* Assess urgency */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">Assess urgency</label>
            <DropdownButton label="Assess Urgency" options={urgencyLevels} value={formData.urgency} isOpen={urgencyOpen} setOpen={setUrgencyOpen} fieldName="urgency" />
          </div>

          {/* Visual Proof (Optional) / Driving License Photo */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4 text-red-500">
              Driving License Photo
            </label>
            <div 
              onClick={handleFileUpload}
              className="w-full md:w-[65%] border-4 border-white bg-black px-2 py-3 flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center shrink-0">
                <span className="text-black text-4xl font-bold leading-none">+</span>
              </div>
              <span className="text-xl text-white">{fileAdded ? '1 File Added' : ''}</span>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Name */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4 text-red-500">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none" />
          </div>

          {/* NID */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">NID</label>
            <input type="text" name="nid" value={formData.nid} onChange={handleChange} required className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none" />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xl md:text-2xl font-normal mb-4">Mobile Number</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none" />
          </div>

          {/* Send OTP checkbox (before OTP sent) */}
          {!otpSent && (
            <div className="flex items-center gap-3">
              <div onClick={handleSendOTP} className="w-6 h-6 border-2 border-gray-500 rounded bg-black cursor-pointer hover:border-white transition-colors" />
              <span onClick={handleSendOTP} className="text-red-500 font-bold text-lg cursor-pointer hover:text-red-400 transition-colors">
                Sent Otp and confirmation
              </span>
            </div>
          )}

          {/* Enter OTP (after OTP sent) */}
          {otpSent && (
            <div>
              <label className="block text-xl md:text-2xl font-normal mb-4">Enter Otp</label>
              <input type="text" name="otp" value={formData.otp} onChange={handleChange} required maxLength="6" className="w-full md:w-[65%] border-4 border-white bg-black px-6 py-5 text-xl focus:outline-none tracking-widest" />
            </div>
          )}

          {/* Confirm Request Button */}
          {otpSent && (
            <div className="flex justify-end mt-8">
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold text-2xl md:text-3xl px-16 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95">
                Confirm Request
              </button>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

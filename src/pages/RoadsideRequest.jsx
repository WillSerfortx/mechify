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
    vehicleModel: '',
    issue: '',
    vehicleCondition: '',
    urgency: '',
    name: '',
    nid: '',
    mobile: '',
    otp: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => setGpsAllowed(true), () => setGpsAllowed(true));
    } else {
      setGpsAllowed(true);
    }
  };

  const handleSendOTP = () => {
    if (formData.mobile.length < 11) { alert('Enter mobile'); return; }
    setOtpSent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment-select', { state: { fromRoadside: true } });
  };

  const DropdownButton = ({ label, options, value, isOpen, setOpen, fieldName, width = "w-[646px]" }) => (
    <div className={`relative ${width} h-[115px]`}>
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        className="w-full h-full border-[4px] border-solid border-white bg-black flex items-center justify-between px-[60px]"
      >
        <span className="text-[40px] font-semibold text-white">{value ? options.find(o => o.value === value)?.label : label}</span>
        <svg className={`w-[50px] h-[50px] text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-[4px] border-t-0 border-white z-20">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setFormData(prev => ({ ...prev, [fieldName]: opt.value })); setOpen(false); }}
              className="w-full text-left px-[60px] py-[30px] text-[32px] text-white hover:bg-white/10 border-b border-white/20 last:border-0"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white font-sora relative overflow-hidden pb-32">
      
      {/* ════════════════════════════════════════
          HERO — Exact copy of landing page
      ════════════════════════════════════════ */}
      <section className="pt-[133px] px-[110px] flex justify-center w-full max-w-[1920px] mx-auto">
        <div className="relative w-full max-w-[1700px] h-[870px] rounded-[50px] shadow-[0px_4px_30px_10px_white] overflow-hidden flex flex-col items-center">
          <img src="/images/roadside/hero.png" alt="Recovery" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="relative z-10 flex flex-col items-center w-full h-full pt-[394px]">
            <h1 className="text-[64px] font-extrabold text-white text-center leading-normal mb-6">
              Vehicle Recovery Services Across Bangladesh
            </h1>
            <div className="text-[24px] font-extrabold text-white text-center leading-[1.5] max-w-[1300px]">
              <p className="mb-0">Get back on the road quickly and safely with MI Recovery Service – your reliable support in fast jump starts and</p>
              <p className="mb-0">emergency vehicle recovery services. Never let breakdowns break you with our on-the-go transportation</p>
              <p>solutions and emergency fuel delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Back button (Square with thick white border) */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute left-0 top-[1402px] w-[90px] h-[90px] border-[10px] border-solid border-white flex items-center justify-center bg-black shadow-[inset_20px_20px_0px_0px_white]"
      >
        <svg className="w-[50px] h-[50px] text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* ════════════════════════════════════════
          FORM CONTENT
      ════════════════════════════════════════ */}
      <section className="mt-[100px] w-full max-w-[1920px] mx-auto flex flex-col relative" style={{ paddingLeft: '180px' }}>
        
        <h2 className="text-[64px] font-extrabold text-white mb-[80px] w-full text-center pr-[180px]">
          Vehicle Emergency Service Requirements
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[70px] w-[1178px]">
          
          {/* Allow your location */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">Allow your location</label>
            <div 
              onClick={handleLocate}
              className="w-full h-[115px] border-[4px] border-solid border-white flex items-center justify-between px-[43px] cursor-pointer"
            >
              <span className="text-[32px] text-white">{gpsAllowed ? 'Allowed' : ''}</span>
              <svg className="w-[50px] h-[50px] text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">Vehicle Type</label>
            <DropdownButton 
              label="Vehicle Type" 
              options={[{value:'sedan', label:'Sedan'}, {value:'suv', label:'SUV'}]} 
              value={formData.vehicleType} 
              isOpen={vehicleOpen} setOpen={setVehicleOpen} fieldName="vehicleType" 
            />
          </div>

          {/* Vehicle Model */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">Vehicle Model</label>
            <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="Bmw M3" className="w-full h-[115px] border-[4px] border-solid border-white bg-transparent px-[60px] text-[32px] text-white placeholder-white focus:outline-none" />
          </div>

          {/* What is the issue */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">What is the issue of your car</label>
            <input type="text" name="issue" value={formData.issue} onChange={handleChange} placeholder="Overheating" className="w-full h-[115px] border-[4px] border-solid border-white bg-transparent px-[65px] text-[32px] text-white placeholder-white focus:outline-none" />
          </div>

          {/* Vehicle Condition */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">Vehicle Conditon</label>
            <DropdownButton 
              label="Vehicle Condition" 
              options={[{value:'running', label:'Running'}, {value:'stopped', label:'Stopped'}]} 
              value={formData.vehicleCondition} 
              isOpen={conditionOpen} setOpen={setConditionOpen} fieldName="vehicleCondition" 
            />
          </div>

          {/* Assess Urgency */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">Assess urgency</label>
            <DropdownButton 
              label="Assess Urgency" 
              options={[{value:'high', label:'High'}, {value:'low', label:'Low'}]} 
              value={formData.urgency} 
              isOpen={urgencyOpen} setOpen={setUrgencyOpen} fieldName="urgency" 
            />
          </div>

          {/* Visual Proof */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">Visual Proof (Optional)</label>
            <div onClick={() => {fileInputRef.current?.click(); setFileAdded(true);}} className="w-full h-[115px] border-[4px] border-solid border-white flex items-center px-[62px] cursor-pointer">
              <span className="text-[32px] text-white">{fileAdded ? '1 FIle Added' : ''}</span>
            </div>
            <input ref={fileInputRef} type="file" className="hidden" />
          </div>

          {/* Name */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Mahi" className="w-full h-[115px] border-[4px] border-solid border-white bg-transparent px-[54px] text-[32px] text-white placeholder-white focus:outline-none" />
          </div>

          {/* NID */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">NID</label>
            <input type="text" name="nid" value={formData.nid} onChange={handleChange} placeholder="019898739842759837582572857285" className="w-full h-[115px] border-[4px] border-solid border-white bg-transparent px-[58px] text-[32px] text-white placeholder-white focus:outline-none tracking-widest" />
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-[20px]">
            <label className="text-[40px] text-white font-normal">Mobile Number</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="01516520602" className="w-full h-[115px] border-[4px] border-solid border-white bg-transparent px-[38px] text-[32px] text-white placeholder-white focus:outline-none" />
          </div>

          {/* Send OTP Checkbox */}
          {!otpSent && (
            <div className="flex items-center gap-[20px] mt-[20px] cursor-pointer" onClick={handleSendOTP}>
               <div className="w-[30px] h-[30px] border-[4px] border-white bg-transparent"></div>
               <span className="text-[#ff0202] text-[24px] font-bold">Sent Otp and confirmation</span>
            </div>
          )}

          {/* Enter OTP */}
          {otpSent && (
            <div className="flex flex-col gap-[20px]">
              <label className="text-[40px] text-white font-normal pl-[7px]">Enter Otp</label>
              <input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="5647" maxLength="4" className="w-full h-[115px] border-[4px] border-solid border-white bg-transparent px-[38px] text-[32px] text-white placeholder-white focus:outline-none" />
            </div>
          )}

          {/* Confirm Button */}
          {otpSent && (
             <div className="flex justify-end mt-[100px]">
               <button 
                 type="submit" 
                 className="bg-[#ff0202] w-[667px] h-[119px] rounded-[50px] flex items-center justify-center text-[48px] font-bold text-white shadow-[0_0_20px_rgba(255,2,2,0.5)]"
               >
                 Confirm Request
               </button>
             </div>
          )}

        </form>
      </section>
    </div>
  );
}

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScaleWrapper from '../components/ScaleWrapper';

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

  // Helper for the dropdown boxes
  const DropdownButton = ({ label, options, value, isOpen, setOpen, fieldName, top, left = 180, width = 646 }) => (
    <div className={`absolute h-[115px] z-20`} style={{ top: `${top}px`, left: `${left}px`, width: `${width}px` }}>
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        className="w-full h-full bg-black border-[4px] border-solid border-white flex items-center justify-between px-[40px] cursor-pointer"
      >
        <span className="font-['Sora'] font-semibold text-[40px] text-white">
          {value ? options.find(o => o.value === value)?.label : label}
        </span>
        <svg className={`w-[50px] h-[50px] text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-[4px] border-t-0 border-white z-30">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { setFormData(prev => ({ ...prev, [fieldName]: opt.value })); setOpen(false); }}
              className="w-full text-left px-[40px] py-[30px] font-['Sora'] text-[32px] text-white hover:bg-white/10 border-b border-white/20 last:border-0"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <ScaleWrapper height={4200}>
      
      {/* 1:2193 - Hero Image Box */}
      <div className="absolute h-[870px] left-[110px] rounded-[50px] shadow-[0px_4px_30px_10px_white] top-[133px] w-[1700px]">
        <img alt="Hero" className="absolute inset-0 max-w-none object-cover opacity-50 pointer-events-none rounded-[50px] w-full h-full" src="/images/roadside/hero.png" />
      </div>

      {/* 1:2194 - Hero Title */}
      <p className="absolute font-['Sora'] font-extrabold left-[197px] text-[64px] text-white top-[527px] whitespace-nowrap z-10">
        Vehicle Recovery Services Across Bangladesh
      </p>

      {/* 1:2195 - Hero Subtitle */}
      <div className="-translate-x-1/2 absolute font-['Sora'] font-extrabold left-[959.5px] text-[24px] text-center text-white top-[629px] whitespace-nowrap z-10 leading-snug">
        <p className="mb-0">Get back on the road quickly and safely with MI Recovery Service – your reliable support in fast jump starts and</p>
        <p className="mb-0">emergency vehicle recovery services. Never let breakdowns break you with our on-the-go transportation</p>
        <p>solutions and emergency fuel delivery.</p>
      </div>

      {/* 1:2196 - Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute border-[10px] border-solid border-white left-0 size-[90px] top-[1402px] flex items-center justify-center hover:bg-white/10 transition-colors z-20 shadow-[inset_200px_200px_0px_0px_white]"
      >
        <svg className="w-[50px] h-[50px] text-black mix-blend-difference" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 1:2197 - Form Title */}
      <p className="-translate-x-1/2 absolute font-['Sora'] font-extrabold left-[849.5px] text-[64px] text-center text-white top-[1103px] whitespace-nowrap">
        Vehicle Emergency Service Requirements
      </p>

      <form onSubmit={handleSubmit}>
        {/* Allow your location */}
        <p className="absolute font-['Sora'] font-normal left-[180px] text-[40px] text-white top-[1258px] whitespace-nowrap">
          Allow your location
        </p>
        <div 
          onClick={handleLocate}
          className="absolute border-[4px] border-solid border-white h-[115px] left-[180px] top-[1324px] w-[1178px] flex items-center justify-between px-[43px] cursor-pointer bg-black"
        >
          <span className="font-['Sora'] text-[32px] text-white">{gpsAllowed ? 'Allowed' : ''}</span>
          <svg className="w-[60px] h-[60px] text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Vehicle Type */}
        <p className="absolute font-['Sora'] font-normal left-[180px] text-[40px] text-white top-[1495px] whitespace-nowrap">
          Vehicle Type
        </p>
        <DropdownButton 
          label="Vehicle Type" options={[{value:'sedan', label:'Sedan / Saloon'}, {value:'suv', label:'SUV / CrossOver'}]} 
          value={formData.vehicleType} isOpen={vehicleOpen} setOpen={setVehicleOpen} fieldName="vehicleType" top={1563} 
        />

        {/* Vehicle Model */}
        <p className="absolute font-['Sora'] font-normal left-[180px] text-[40px] text-white top-[1715px] whitespace-nowrap">
          Vehicle Model
        </p>
        <input 
          type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} 
          className="absolute border-[4px] border-solid border-white h-[115px] left-[180px] top-[1802px] w-[1178px] bg-transparent px-[60px] font-['Sora'] text-[32px] text-white focus:outline-none"
        />

        {/* What is the issue */}
        <p className="absolute font-['Sora'] font-normal left-[180px] text-[40px] text-white top-[1963px] whitespace-nowrap">
          What is the issue of your car
        </p>
        <input 
          type="text" name="issue" value={formData.issue} onChange={handleChange} 
          className="absolute border-[4px] border-solid border-white h-[115px] left-[180px] top-[2050px] w-[1178px] bg-transparent px-[65px] font-['Sora'] text-[32px] text-white focus:outline-none"
        />

        {/* Vehicle Condition */}
        <p className="absolute font-['Sora'] font-normal left-[180px] text-[40px] text-white top-[2208px] whitespace-nowrap">
          Vehicle Conditon
        </p>
        <DropdownButton 
          label="Vehicle Condition" options={[{value:'running', label:'Running'}, {value:'stopped', label:'Stopped'}]} 
          value={formData.vehicleCondition} isOpen={conditionOpen} setOpen={setConditionOpen} fieldName="vehicleCondition" top={2284} 
        />

        {/* Assess Urgency */}
        <p className="absolute font-['Sora'] font-normal left-[181px] text-[40px] text-white top-[2446px] whitespace-nowrap">
          Assess urgency
        </p>
        <DropdownButton 
          label="Assess Urgency" options={[{value:'high', label:'High'}, {value:'low', label:'Low'}]} 
          value={formData.urgency} isOpen={urgencyOpen} setOpen={setUrgencyOpen} fieldName="urgency" top={2518} 
        />

        {/* Visual Proof */}
        <p className="absolute font-['Sora'] font-normal left-[180px] text-[40px] text-[red] top-[2707px] whitespace-nowrap">
          Visual Proof (Optional)
        </p>
        <div 
          onClick={() => {fileInputRef.current?.click(); setFileAdded(true);}}
          className="absolute border-[4px] border-solid border-white h-[115px] left-[181px] top-[2772px] w-[1177px] flex items-center px-[62px] cursor-pointer bg-black"
        >
          <span className="font-['Sora'] text-[32px] text-white">{fileAdded ? '1 FIle Added' : ''}</span>
        </div>
        <input ref={fileInputRef} type="file" className="hidden" />

        {/* Name */}
        <p className="absolute font-['Sora'] font-normal left-[180px] text-[40px] text-white top-[2927px] whitespace-nowrap">
          Name
        </p>
        <input 
          type="text" name="name" value={formData.name} onChange={handleChange} 
          className="absolute border-[4px] border-solid border-white h-[115px] left-[181px] top-[2990px] w-[1177px] bg-transparent px-[54px] font-['Sora'] text-[32px] text-white focus:outline-none"
        />

        {/* NID */}
        <p className="absolute font-['Sora'] font-normal left-[181px] text-[40px] text-white top-[3158px] whitespace-nowrap">
          NID
        </p>
        <input 
          type="text" name="nid" value={formData.nid} onChange={handleChange} 
          className="absolute border-[4px] border-solid border-white h-[115px] left-[181px] top-[3221px] w-[1177px] bg-transparent px-[58px] font-['Sora'] text-[32px] text-white focus:outline-none tracking-widest"
        />

        {/* Mobile Number */}
        <p className="absolute font-['Sora'] font-normal left-[180px] text-[40px] text-white top-[3396px] whitespace-nowrap">
          Mobile Number
        </p>
        <input 
          type="tel" name="mobile" value={formData.mobile} onChange={handleChange} 
          className="absolute border-[4px] border-solid border-white h-[115px] left-[181px] top-[3459px] w-[1177px] bg-transparent px-[38px] font-['Sora'] text-[32px] text-white focus:outline-none"
        />

        {/* Sent Otp and confirmation */}
        {!otpSent && (
          <div className="absolute left-[180px] top-[3620px] flex items-center gap-[20px] cursor-pointer" onClick={handleSendOTP}>
             <div className="w-[30px] h-[30px] border-[4px] border-white bg-transparent"></div>
             <span className="text-[red] text-[24px] font-bold">Sent Otp and confirmation</span>
          </div>
        )}

        {/* Enter OTP */}
        {otpSent && (
          <>
            <p className="absolute font-['Sora'] font-normal left-[187px] text-[40px] text-white top-[3601px] whitespace-nowrap">
              Enter Otp
            </p>
            <input 
              type="text" name="otp" value={formData.otp} onChange={handleChange} maxLength="4"
              className="absolute border-[4px] border-solid border-white h-[115px] left-[180px] top-[3677px] w-[1177px] bg-transparent px-[38px] font-['Sora'] text-[32px] text-white focus:outline-none tracking-widest"
            />
          </>
        )}

        {/* Confirm Request Button */}
        {otpSent && (
           <button 
             type="submit" 
             className="absolute bg-[#ff0202] h-[119px] left-[1170px] rounded-[50px] top-[3931px] w-[667px] flex items-center justify-center hover:bg-red-700 transition-colors"
           >
             <span className="font-['Sora'] font-bold text-[48px] text-white">Confirm Request</span>
           </button>
        )}
      </form>
    </ScaleWrapper>
  );
}

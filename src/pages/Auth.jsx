import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FigmaScreenWrapper from '../components/FigmaScreenWrapper';

const imgVision = "/images/auth/vision.png";
const imgGoogle = "/images/auth/google.png";
const imgLine3 = "/images/auth/line3.svg";
const imgLine4 = "/images/auth/line4.svg";

/**
 * Exact Figma Implementation for Login (Node 1:1104)
 */
export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');

  const demoProfiles = [
    { role: 'user', label: 'Regular User (mahi@gmail.com)', email: 'mahi@gmail.com' },
    { role: 'driver', label: 'Verified Driver (driver@gmail.com)', email: 'driver@gmail.com' },
  ];

  const handleSelectProfile = (p) => {
    setSelectedProfile(p.label);
    setEmail(p.email);
    setShowProfileDropdown(false);
  };

  const handleLogin = (e) => {
    e?.preventDefault?.();
    const finalEmail = email.trim() || (selectedProfile.includes('driver') ? 'driver@gmail.com' : 'mahi@gmail.com');
    if (finalEmail === 'driver@gmail.com') {
      localStorage.setItem('userRole', 'driver');
    } else {
      localStorage.setItem('userRole', 'user');
    }
    navigate('/home');
  };

  return (
    <FigmaScreenWrapper bgImage="/images/auth/bg.png">
      <div className="relative w-[1920px] h-[1080px] select-none font-sora" data-node-id="1:1104">
        
        {/* ─── Left Typography: Start Your Journey with Mechify (Node 1:1107) ─── */}
        <div 
          className="[word-break:break-word] absolute font-['Poppins'] font-bold h-[683px] leading-[0] left-[156px] not-italic text-[128px] text-white top-[266px] w-[820px] whitespace-pre-wrap select-none" 
          data-node-id="1:1107"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2.5px #ffffff',
            textStroke: '2.5px #ffffff'
          }}
        >
          <p className="leading-[22px] mb-0">{`Start  Your`}</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">{` `}</p>
          <p className="leading-[22px] mb-0">Journey</p>
          <p className="leading-[22px] mb-0">{` `}</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">with</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px] mb-0">​</p>
          <p className="leading-[22px]">Mechify</p>
        </div>

        {/* ─── White Card (Node 1:1108) ─── */}
        <div 
          className="absolute bg-white h-[908px] left-[1081px] rounded-[20px] top-[86px] w-[745px] shadow-[0px_25px_70px_rgba(0,0,0,0.85)]" 
          data-node-id="1:1108" 
        />

        {/* ─── Title: Welcome Back! (Node 1:1118) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] right-[679px] text-[48px] text-black top-[143px] translate-x-full whitespace-nowrap z-10" 
          data-node-id="1:1118"
        >
          Welcome Back!
        </p>

        {/* ─── Email Label (Node 1:1119) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1155px] text-[20px] text-black top-[228px] whitespace-nowrap z-10" 
          data-node-id="1:1119"
        >
          Email
        </p>

        {/* ─── Choose your Profile Button / Dropdown (Node 1:3024) ─── */}
        <div className="absolute left-[1156px] top-[264px] w-[563px] h-[71px] z-20">
          <button 
            type="button"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="w-full h-full bg-white border border-black border-solid cursor-pointer rounded-[10px] overflow-clip relative flex items-center px-6 justify-between hover:bg-gray-50 transition-colors"
            data-node-id="1:3024"
          >
            <p className="[word-break:break-word] font-['Sora'] font-normal leading-[normal] text-black text-left whitespace-nowrap truncate text-[32px]">
              {selectedProfile || email || 'Choose your Profile'}
            </p>
            <span className="text-black text-lg ml-2">▼</span>
          </button>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black rounded-xl shadow-2xl z-50 overflow-hidden">
              {demoProfiles.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectProfile(p)}
                  className="px-6 py-4 hover:bg-gray-100 cursor-pointer text-xl text-black border-b border-gray-100 last:border-0 font-['Sora'] font-medium"
                >
                  {p.label}
                </div>
              ))}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <input
                  type="email"
                  placeholder="Or type custom email..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSelectedProfile('');
                  }}
                  className="w-full bg-white border border-gray-400 rounded-lg px-4 py-2.5 text-lg text-black focus:outline-none focus:border-black font-['Sora']"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </div>

        {/* ─── Password Label (Node 1:1120) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1155px] text-[20px] text-black top-[355px] whitespace-nowrap z-10" 
          data-node-id="1:1120"
        >
          Password
        </p>

        {/* ─── Password Input Box (Node 1:1109) ─── */}
        <div 
          className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[390px] w-[563px] flex items-center z-10" 
          data-node-id="1:1109"
        >
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input your Password.."
            className="w-full h-full bg-transparent px-6 pr-16 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbbbbb] focus:outline-none"
          />
        </div>

        {/* ─── Vision Eye Icon (Node 1:1121) ─── */}
        <div 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-[1659px] size-[30px] top-[409px] cursor-pointer z-20 flex items-center justify-center" 
          data-node-id="1:1121" 
          data-name="Vision"
        >
          <img 
            alt="Vision" 
            className={`w-[30px] h-[30px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`} 
            src={imgVision} 
          />
        </div>

        {/* ─── Checkbox Box (Node 1:1122) ─── */}
        <div 
          onClick={() => setRememberMe(!rememberMe)}
          className="absolute bg-white border border-[#0d0c0c] border-solid left-[1165px] rounded-[10px] size-[25px] top-[500px] cursor-pointer z-10 flex items-center justify-center" 
          data-node-id="1:1122" 
        >
          {rememberMe && <span className="text-black font-bold text-base leading-none">✓</span>}
        </div>

        {/* ─── Remember Me Text (Node 1:1111) ─── */}
        <p 
          onClick={() => setRememberMe(!rememberMe)}
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1194px] text-[#bbbbbb] text-[24px] top-[502px] whitespace-nowrap cursor-pointer z-10 select-none" 
          data-node-id="1:1111"
        >
          Remember Me
        </p>

        {/* ─── Forget password? (Node 1:1115) ─── */}
        <p 
          onClick={() => alert('Password reset instructions sent to your email.')}
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1500px] text-[#bbbbbb] text-[24px] top-[501px] whitespace-nowrap cursor-pointer hover:text-black transition-colors z-10 select-none" 
          data-node-id="1:1115"
        >
          Forget password?
        </p>

        {/* ─── Login Button (Node 1:1116, 1:1123) ─── */}
        <button 
          onClick={handleLogin}
          className="absolute bg-black border border-[#030303] border-solid h-[65px] left-[1162px] rounded-[30px] top-[553px] w-[557px] cursor-pointer hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center z-10" 
          data-node-id="1:1116"
        >
          <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#fffafa] text-[24px] whitespace-nowrap" data-node-id="1:1123">
            Login
          </p>
        </button>

        {/* ─── Divider Left Line (Node 1:1126) ─── */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1134px] top-[694px] w-[197px]" data-node-id="1:1126">
          <div className="flex-none rotate-[-0.3deg]">
            <div className="h-0 relative w-[197.003px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Divider Text: Or continue with: (Node 1:1112) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1336px] text-[#bbbbbb] text-[24px] top-[681px] whitespace-nowrap z-10" 
          data-node-id="1:1112"
        >
          Or continue with:
        </p>

        {/* ─── Divider Right Line (Node 1:1125) ─── */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1555.5px] top-[692.54px] w-[197px]" data-node-id="1:1125">
          <div className="flex-none rotate-[-0.3deg]">
            <div className="h-0 relative w-[197.003px]">
              <div className="absolute inset-[-0.5px_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine3} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Continue with Google Button (Node 1:1117, 1:1127, 1:1124) ─── */}
        <button 
          onClick={handleLogin}
          className="absolute bg-white border border-black border-solid h-[65px] left-[1175px] rounded-[30px] top-[756px] w-[557px] cursor-pointer hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center z-10 gap-4" 
          data-node-id="1:1117"
        >
          <img alt="Google" className="size-[35px] object-contain" src={imgGoogle} data-node-id="1:1127" />
          <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#080808] text-[24px] whitespace-nowrap" data-node-id="1:1124">
            Continue with Google
          </p>
        </button>

        {/* ─── Footer Text (Node 1:1113, 1:1114) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1222px] text-[#807e7e] text-[24px] top-[852px] whitespace-nowrap z-10" 
          data-node-id="1:1113"
        >
          Don’t Have An Account?
        </p>
        <Link 
          to="/register"
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1528px] text-[#0e0d0d] text-[24px] top-[852px] whitespace-nowrap hover:underline font-bold z-10" 
          data-node-id="1:1114"
        >
          Sign Up Here
        </Link>
      </div>
    </FigmaScreenWrapper>
  );
}

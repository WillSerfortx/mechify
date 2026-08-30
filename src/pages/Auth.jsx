import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScaleWrapper from '../components/ScaleWrapper';

/**
 * Exact 1:1 Figma implementation for Login Page (Node 1:1104):
 * - Canvas: 1920x1080 via ScaleWrapper
 * - Left side: Nighttime car background (bg.png) + exact hollow stroke Poppins/Sora typography
 * - Right side: White card (width: 745px, height: 908px, rounded: 20px)
 * - Exact fields: Email (Choose your Profile button / custom input), Password (with eye toggle),
 *   Remember Me checkbox, Forget password?, Login button, Or continue with divider, Continue with Google button,
 *   and "Don’t Have An Account? Sign Up Here".
 */
export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (finalEmail === 'driver@gmail.com') {
        localStorage.setItem('userRole', 'driver');
      } else {
        localStorage.setItem('userRole', 'user');
      }
      navigate('/home');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('userRole', 'user');
      navigate('/home');
    }, 600);
  };

  return (
    <ScaleWrapper height={1080}>
      <div className="bg-white relative w-[1920px] h-[1080px] overflow-hidden select-none font-sora" data-node-id="1:1104">
        
        {/* ─── Background Image (Node 1:1106) ─── */}
        <div className="absolute h-[1080px] left-0 top-0 w-[1920px]" data-node-id="1:1106">
          <img 
            alt="Skyline Background" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            src="/images/auth/bg.png" 
          />
        </div>

        {/* ─── Top Left Back Arrow (Node 1:1129) ─── */}
        <div 
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 size-[60px] cursor-pointer z-30 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 transition-colors border border-white/20" 
          data-node-id="1:1129" 
          data-name="Back"
          title="Go Back"
        >
          <span className="text-white text-3xl font-bold font-mono">‹</span>
        </div>

        {/* ─── Left Typography: Start Your Journey with Mechify (Node 1:1107) ─── */}
        <div 
          className="[word-break:break-word] absolute font-['Poppins'] font-bold h-[683px] left-[156px] not-italic text-[128px] text-white top-[266px] w-[820px] select-none leading-[1.05]" 
          data-node-id="1:1107"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2.5px #ffffff',
          }}
        >
          <p className="mb-0">Start  Your</p>
          <p className="mb-0">Journey</p>
          <p className="mb-0">with</p>
          <p className="mb-0">Mechify</p>
        </div>

        {/* ─── White Card (Node 1:1108) ─── */}
        <div 
          className="absolute bg-white h-[908px] left-[1081px] rounded-[20px] top-[86px] w-[745px] shadow-[0px_25px_70px_rgba(0,0,0,0.8)]" 
          data-node-id="1:1108" 
        />

        {/* ─── Title: Welcome Back! (Node 1:1118) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] text-[48px] text-black top-[143px] left-[1081px] w-[745px] text-center whitespace-nowrap" 
          data-node-id="1:1118"
        >
          Welcome Back!
        </p>

        {/* ─── Email Label (Node 1:1119) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1155px] text-[20px] text-black top-[228px] whitespace-nowrap" 
          data-node-id="1:1119"
        >
          Email
        </p>

        {/* ─── Choose your Profile Button / Dropdown (Node 1:3024) ─── */}
        <div className="absolute left-[1156px] top-[264px] w-[563px] h-[71px] z-20">
          <button 
            type="button"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="w-full h-full bg-white border border-black border-solid cursor-pointer rounded-[10px] flex items-center justify-between px-6 hover:bg-gray-50 transition-colors"
            data-node-id="1:3024"
          >
            <span 
              className={`font-['Sora'] font-normal text-left whitespace-nowrap ${selectedProfile || email ? 'text-[24px] text-black font-semibold truncate' : 'text-[36px] text-black'}`}
            >
              {selectedProfile || email || 'Choose your Profile'}
            </span>
            <span className="text-black text-xl">▼</span>
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
                  className="w-full bg-white border border-gray-400 rounded-lg px-4 py-3 text-lg text-black focus:outline-none focus:border-black font-['Sora']"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </div>

        {/* ─── Password Label (Node 1:1120) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1155px] text-[20px] text-black top-[355px] whitespace-nowrap" 
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
          {/* Exact Vision / Eye Icon from Figma (Node 1:1121) */}
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent border-0"
            data-node-id="1:1121"
            aria-label="Toggle password visibility"
          >
            <img 
              alt="Vision" 
              className={`w-[30px] h-[30px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`} 
              src="/images/auth/vision.png" 
            />
          </button>
        </div>

        {/* ─── Checkbox Box (Node 1:1122) ─── */}
        <div 
          onClick={() => setRememberMe(!rememberMe)}
          className="absolute bg-white border border-[#0d0c0c] border-solid left-[1165px] rounded-[10px] size-[25px] top-[500px] cursor-pointer flex items-center justify-center z-10" 
          data-node-id="1:1122"
        >
          {rememberMe && <span className="text-black font-bold text-base leading-none">✓</span>}
        </div>

        {/* ─── Remember Me Text (Node 1:1111) ─── */}
        <p 
          onClick={() => setRememberMe(!rememberMe)}
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1199px] text-[#bbbbbb] text-[24px] top-[502px] whitespace-nowrap cursor-pointer select-none z-10" 
          data-node-id="1:1111"
        >
          Remember Me
        </p>

        {/* ─── Forget password? Text (Node 1:1115) ─── */}
        <p 
          onClick={() => alert('Password reset instructions sent to your email.')}
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1500px] text-[#bbbbbb] text-[24px] top-[501px] whitespace-nowrap cursor-pointer hover:text-black transition-colors z-10" 
          data-node-id="1:1115"
        >
          Forget password?
        </p>

        {/* ─── Login Button (Node 1:1116, 1:1123) ─── */}
        <button 
          onClick={handleLogin}
          className="absolute bg-black border border-[#030303] border-solid h-[65px] left-[1162px] rounded-[30px] top-[553px] w-[557px] cursor-pointer hover:bg-neutral-800 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center z-10" 
          data-node-id="1:1116"
        >
          <p className="font-['Sora'] font-normal leading-[22px] text-[#fffafa] text-[24px] whitespace-nowrap" data-node-id="1:1123">
            {loading ? 'Logging in...' : 'Login'}
          </p>
        </button>

        {/* ─── Divider Left Line (Node 1:1126) ─── */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1134px] top-[694px] w-[197px]" data-node-id="1:1126">
          <div className="w-[197px] h-[1px] bg-black/40" />
        </div>

        {/* ─── Divider Text: Or continue with: (Node 1:1112) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1336px] text-[#bbbbbb] text-[24px] top-[681px] whitespace-nowrap" 
          data-node-id="1:1112"
        >
          Or continue with:
        </p>

        {/* ─── Divider Right Line (Node 1:1125) ─── */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1555.5px] top-[692.54px] w-[197px]" data-node-id="1:1125">
          <div className="w-[197px] h-[1px] bg-black/40" />
        </div>

        {/* ─── Continue with Google Button (Node 1:1117, 1:1127, 1:1124) ─── */}
        <button 
          onClick={handleGoogleLogin}
          className="absolute bg-white border border-black border-solid h-[65px] left-[1175px] rounded-[30px] top-[756px] w-[557px] cursor-pointer hover:bg-gray-50 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-4 z-10" 
          data-node-id="1:1117"
        >
          <img alt="Google" className="size-[35px] object-contain" src="/images/auth/google.png" data-node-id="1:1127" />
          <p className="font-['Sora'] font-normal leading-[22px] text-[#080808] text-[24px] whitespace-nowrap" data-node-id="1:1124">
            Continue with Google
          </p>
        </button>

        {/* ─── Footer Text: Don’t Have An Account? Sign Up Here (Node 1:1113, 1:1114) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1222px] text-[#807e7e] text-[24px] top-[852px] whitespace-nowrap" 
          data-node-id="1:1113"
        >
          Don’t Have An Account?
        </p>
        <Link 
          to="/register"
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1528px] text-[#0e0d0d] text-[24px] top-[852px] whitespace-nowrap hover:underline font-bold" 
          data-node-id="1:1114"
        >
          Sign Up Here
        </Link>
      </div>
    </ScaleWrapper>
  );
}

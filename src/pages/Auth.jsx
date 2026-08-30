import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const imgVision = "/images/auth/vision.png";
const imgGoogle = "/images/auth/google.png";

/**
 * Login Page (Figma Node 1:1104):
 * - Full-bleed background covering 100% of the screen (fills up all gaps on right and bottom)
 * - Left side: Poppins bold hollow outline typography "Start Your Journey with Mechify"
 * - Right side: White card (Node 1:1108) with exact Figma layout, inputs, buttons, and divider
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
    <div className="relative min-h-screen w-full bg-[#050505] text-white font-sora flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-x-hidden select-none">
      
      {/* ─── FULL-BLEED BACKGROUND IMAGE (Fills 100% of screen, zero black gaps) ─── */}
      <img
        src="/images/auth/bg.png"
        alt="Mechify Background"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />

      {/* Subtle dark overlay for readability */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      {/* ─── MAIN CONTENT CONTAINER (Balanced width, middle of page, no right/bottom gaps) ─── */}
      <div className="relative z-10 w-full max-w-[1780px] min-h-[90vh] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 px-4 sm:px-8 lg:px-16 py-6">
        
        {/* ─── Left Side: Hollow Stroke Poppins Typography (Node 1:1107) ─── */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center pl-2 sm:pl-6 lg:pl-10 select-none animate-slideInLeft">
          <div
            className="font-bold tracking-tight whitespace-pre-wrap leading-[1.06]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(48px, 6.2vw, 115px)',
              color: 'transparent',
              WebkitTextStroke: '2.5px #ffffff',
              textStroke: '2.5px #ffffff',
            }}
          >
            <p className="mb-0">Start  Your</p>
            <p className="mb-0">Journey</p>
            <p className="mb-0">with</p>
            <p className="mb-0 text-white" style={{ WebkitTextStroke: '0px' }}>Mechify</p>
          </div>
        </div>

        {/* ─── Right Side: Exact Figma White Card (Node 1:1108) ─── */}
        <div className="w-full lg:w-auto flex-shrink-0 flex justify-center animate-fadeIn">
          <div className="bg-white text-black rounded-[20px] p-8 sm:p-12 lg:p-14 w-full max-w-[680px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative border border-neutral-100">
            
            {/* Header: Welcome Back! (Node 1:1118) */}
            <h1 className="font-semibold text-3xl sm:text-4xl lg:text-[46px] text-black text-center mb-8 tracking-tight font-sora">
              Welcome Back!
            </h1>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Field 1: Email (Node 1:1119 & 1:3024) */}
              <div>
                <label className="block text-black font-normal text-lg sm:text-xl mb-2 font-sora">
                  Email
                </label>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="w-full bg-white border border-black rounded-[10px] h-[68px] sm:h-[71px] px-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                    data-node-id="1:3024"
                  >
                    <span className={`truncate text-left font-sora ${selectedProfile || email ? 'text-black font-semibold text-xl sm:text-2xl' : 'text-black text-2xl sm:text-[32px]'}`}>
                      {selectedProfile || email || 'Choose your Profile'}
                    </span>
                    <span className="text-black text-base ml-2">▼</span>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black rounded-xl shadow-2xl z-50 overflow-hidden">
                      {demoProfiles.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectProfile(p)}
                          className="px-6 py-4 hover:bg-gray-100 cursor-pointer text-lg sm:text-xl text-black border-b border-gray-100 last:border-0 font-medium font-sora"
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
                          className="w-full bg-white border border-gray-400 rounded-lg px-4 py-2.5 text-base text-black focus:outline-none focus:border-black font-sora"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Field 2: Password (Node 1:1120 & 1:1109) */}
              <div>
                <label className="block text-black font-normal text-lg sm:text-xl mb-2 font-sora">
                  Password
                </label>

                <div className="relative flex items-center bg-white border border-black rounded-[13px] h-[68px] sm:h-[71px] px-6">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Input your Password.."
                    className="w-full h-full bg-transparent pr-12 text-xl sm:text-2xl text-black placeholder-[#bbb] focus:outline-none font-sora"
                  />
                  {/* Eye Vision Icon (Node 1:1121) */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 size-[30px] flex items-center justify-center cursor-pointer bg-transparent border-0"
                    aria-label="Toggle password visibility"
                  >
                    <img 
                      src={imgVision} 
                      alt="Vision" 
                      className={`size-[30px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`}
                    />
                  </button>
                </div>
              </div>

              {/* Row: Remember Me & Forget password? (Node 1:1122, 1:1111, 1:1115) */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div 
                    onClick={() => setRememberMe(!rememberMe)}
                    className="w-[25px] h-[25px] rounded-[10px] border border-[#0d0c0c] flex items-center justify-center transition-colors bg-white cursor-pointer"
                  >
                    {rememberMe && <span className="text-black font-bold text-base leading-none">✓</span>}
                  </div>
                  <span className="text-[#bbb] font-normal text-lg sm:text-2xl font-sora">
                    Remember Me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Password reset instructions sent to your email.')}
                  className="text-[#bbb] hover:text-black font-normal text-lg sm:text-2xl font-sora transition-colors cursor-pointer"
                >
                  Forget password?
                </button>
              </div>

              {/* Login Button (Node 1:1116, 1:1123) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-neutral-800 text-[#fffafa] font-normal text-2xl h-[65px] rounded-[30px] border border-[#030303] transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg flex items-center justify-center cursor-pointer font-sora mt-2"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {/* Divider (Node 1:1112) */}
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="flex-1 h-[1px] bg-black/30" />
                <span className="text-[#bbb] text-base sm:text-2xl font-normal px-2 font-sora whitespace-nowrap">
                  Or continue with:
                </span>
                <div className="flex-1 h-[1px] bg-black/30" />
              </div>

              {/* Continue with Google Button (Node 1:1117, 1:1124) */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-50 text-[#080808] border border-black font-normal text-xl sm:text-2xl h-[65px] rounded-[30px] transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer shadow-sm active:scale-95 font-sora"
              >
                <img 
                  src={imgGoogle} 
                  alt="Google" 
                  className="size-[35px] object-contain"
                />
                <span>Continue with Google</span>
              </button>

              {/* Footer Switch Link (Node 1:1113, 1:1114) */}
              <div className="text-center pt-3 text-lg sm:text-2xl font-sora">
                <span className="text-[#807e7e]">Don’t Have An Account? </span>
                <Link to="/register" className="font-semibold text-[#0e0d0d] hover:underline ml-1">
                  Sign Up Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

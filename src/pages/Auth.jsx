import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Exact 1:1 Figma implementation for Login Page (Node 1:1104):
 * - Canvas: 1920x1080
 * - Left side: Nighttime car background (bg.png) + exact hollow stroke Poppins/Sora typography
 * - Right side: White card (width: 745px, height: 908px, rounded: 20px, shadow-2xl)
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
    e.preventDefault();
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
    <div className="relative w-full min-h-screen bg-black text-white font-sora flex items-center justify-center overflow-x-hidden select-none">
      
      {/* ─── Exact Background Image from Figma (Node 1:1106) ─── */}
      <img
        src="/images/auth/bg.png"
        alt="Mechify Skyline Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* ─── 1920x1080 Full Frame Container ─── */}
      <div className="relative z-10 w-full max-w-[1920px] min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-24 py-12">
        
        {/* ─── Left Side Typography (Node 1:1107) ─── */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center pl-2 sm:pl-8 lg:pl-16 mb-10 lg:mb-0 animate-slideInLeft">
          <div
            className="font-bold leading-[1.02] tracking-tight whitespace-pre-wrap select-none"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(54px, 6.8vw, 128px)',
              color: 'transparent',
              WebkitTextStroke: '2.5px #ffffff',
            }}
          >
            <p className="mb-0">Start  Your</p>
            <p className="mb-0">Journey</p>
            <p className="mb-0">with</p>
            <p className="mb-0 text-white" style={{ WebkitTextStroke: '0px' }}>Mechify</p>
          </div>
        </div>

        {/* ─── Right Side White Card (Node 1:1108) ─── */}
        <div className="w-full lg:w-[745px] flex-shrink-0 flex justify-center animate-fadeIn">
          <div 
            className="bg-white text-black rounded-[20px] p-8 sm:p-14 w-full max-w-[745px] shadow-[0px_25px_70px_rgba(0,0,0,0.9)] relative"
            style={{ minHeight: '860px' }}
          >
            
            {/* Header: Welcome Back! (Node 1:1118) */}
            <h1 
              className="font-semibold text-center text-black tracking-tight mb-10"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 'clamp(36px, 3.2vw, 48px)',
                lineHeight: 1.1,
              }}
            >
              Welcome Back!
            </h1>

            <form onSubmit={handleLogin} className="max-w-[563px] mx-auto flex flex-col gap-6">
              
              {/* Field 1: Email Label & Profile Selector (Node 1:1119 & 1:3024) */}
              <div>
                <label 
                  className="block text-black font-normal mb-2"
                  style={{ fontSize: '20px', fontFamily: "'Sora', sans-serif" }}
                >
                  Email
                </label>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="w-full bg-white border border-black rounded-[10px] h-[71px] px-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span 
                      className={`truncate ${selectedProfile || email ? 'text-black font-medium text-xl' : 'text-black text-2xl sm:text-[32px]'}`}
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {selectedProfile || email || 'Choose your Profile'}
                    </span>
                    <span className="text-black text-sm">▼</span>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-black rounded-xl shadow-2xl z-30 overflow-hidden">
                      {demoProfiles.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectProfile(p)}
                          className="px-6 py-4 hover:bg-gray-100 cursor-pointer text-base sm:text-lg text-black border-b border-gray-100 last:border-0 font-medium"
                        >
                          {p.label}
                        </div>
                      ))}
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <input
                          type="email"
                          placeholder="Or type your email..."
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setSelectedProfile('');
                          }}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-base text-black focus:outline-none focus:border-black"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Field 2: Password Label & Input (Node 1:1120 & 1:1109) */}
              <div>
                <label 
                  className="block text-black font-normal mb-2"
                  style={{ fontSize: '20px', fontFamily: "'Sora', sans-serif" }}
                >
                  Password
                </label>

                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Input your Password.."
                    className="w-full bg-white border border-black rounded-[13px] h-[71px] px-6 pr-16 text-xl sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  />
                  {/* Exact Vision / Eye Icon from Figma (Node 1:1121) */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 w-[30px] h-[30px] flex items-center justify-center cursor-pointer p-0 border-0 bg-transparent"
                    aria-label="Toggle password visibility"
                  >
                    <img 
                      src="/images/auth/vision.png" 
                      alt="Vision" 
                      className={`w-[30px] h-[30px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`}
                    />
                  </button>
                </div>
              </div>

              {/* Row: Remember Me & Forget password? (Node 1:1122, 1:1111, 1:1115) */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-[25px] h-[25px] rounded-[10px] border border-[#0d0c0c] accent-black cursor-pointer"
                  />
                  <span 
                    className="text-[#bbbbbb] font-normal"
                    style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
                  >
                    Remember Me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your email.')}
                  className="text-[#bbbbbb] hover:text-black font-normal transition-colors cursor-pointer"
                  style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
                >
                  Forget password?
                </button>
              </div>

              {/* Login Button (Node 1:1116, 1:1123) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-neutral-800 text-[#fffafa] font-normal h-[65px] rounded-[30px] border border-[#030303] transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-center cursor-pointer mt-2"
                style={{ fontSize: '24px', fontFamily: "'Sora', sans-serif" }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {/* Divider (Node 1:1112, 1:1125, 1:1126) */}
              <div className="flex items-center justify-center gap-4 my-2">
                <div className="flex-1 h-[1px] bg-black/40" />
                <span 
                  className="text-[#bbbbbb] font-normal whitespace-nowrap px-1"
                  style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
                >
                  Or continue with:
                </span>
                <div className="flex-1 h-[1px] bg-black/40" />
              </div>

              {/* Continue with Google (Node 1:1117, 1:1124, 1:1127) */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-50 text-[#080808] border border-black font-normal h-[65px] rounded-[30px] transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer shadow-sm active:scale-95"
                style={{ fontSize: '24px', fontFamily: "'Sora', sans-serif" }}
              >
                <img 
                  src="/images/auth/google.png" 
                  alt="Google" 
                  className="w-[35px] h-[35px] object-contain"
                />
                <span>Continue with Google</span>
              </button>

              {/* Footer Links (Node 1:1113, 1:1114) */}
              <div 
                className="text-center pt-3"
                style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
              >
                <span className="text-[#807e7e]">Don’t Have An Account? </span>
                <Link to="/register" className="font-normal text-[#0e0d0d] hover:underline ml-1">
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

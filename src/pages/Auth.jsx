import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Exact 1:1 Figma implementation for Login Page (Node 1:1104):
 * - Left side: Nighttime Skyline R34 car background + Poppins bold hollow outline typography "Start Your Journey with Mechify"
 * - Right side: White card (rounded-[24px], shadow-2xl, border-black inputs)
 * - Exact fields: Email ("Choose your Profile" selector / custom email), Password (with eye toggle),
 *   Remember Me checkbox, Forget password?, Black Login button, "Or continue with:" divider,
 *   "Continue with Google" button, and "Don’t Have An Account? Sign Up Here".
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
    <div className="relative min-h-screen w-full bg-black text-white font-sora flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-x-hidden select-none">
      
      {/* ─── Hero Skyline R34 Background Image (Node 1:1106) ─── */}
      <img
        src="/images/auth/bg.png"
        alt="Mechify Skyline Background"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none opacity-80"
      />

      {/* Subtle vignette gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/75 pointer-events-none" />

      {/* ─── Main Viewport Container ─── */}
      <div className="relative z-10 max-w-[1720px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-6">
        
        {/* ─── Left Side: Exact Hollow-Stroke Poppins Typography (Node 1:1107) ─── */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center pl-2 sm:pl-8 lg:pl-14 animate-slideInLeft select-none">
          <div
            className="font-bold tracking-tight whitespace-pre-wrap leading-[1.08]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(52px, 6.5vw, 120px)',
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

        {/* ─── Right Side: White Card (Node 1:1108) ─── */}
        <div className="w-full lg:w-auto flex-shrink-0 flex justify-center animate-fadeIn">
          <div className="bg-white text-black rounded-[24px] sm:rounded-[30px] p-7 sm:p-12 w-full max-w-[620px] shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-gray-100 relative">
            
            {/* Header: Welcome Back! (Node 1:1118) */}
            <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-black text-center mb-8 tracking-tight font-sora">
              Welcome Back!
            </h1>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Field 1: Email / Profile Selector (Node 1:1119 & 1:3024) */}
              <div>
                <label className="block text-black font-normal text-lg sm:text-xl mb-2 font-sora">
                  Email
                </label>
                
                <div className="relative">
                  <div 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="w-full bg-white border-2 border-black rounded-[12px] h-[64px] sm:h-[70px] px-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className={`text-lg sm:text-2xl truncate font-sora ${selectedProfile || email ? 'text-black font-semibold' : 'text-[#888888] font-normal'}`}>
                      {selectedProfile || email || 'Choose your Profile'}
                    </span>
                    <span className="text-black text-sm ml-2">▼</span>
                  </div>

                  {/* Dropdown Options */}
                  {showProfileDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black rounded-xl shadow-2xl z-30 overflow-hidden">
                      {demoProfiles.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectProfile(p)}
                          className="px-5 py-3.5 hover:bg-gray-100 cursor-pointer text-base sm:text-lg text-black border-b border-gray-100 last:border-0 font-medium font-sora"
                        >
                          {p.label}
                        </div>
                      ))}
                      <div className="p-3 bg-gray-50 border-t border-gray-200">
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

              {/* Field 2: Password Label & Input (Node 1:1120 & 1:1109) */}
              <div>
                <label className="block text-black font-normal text-lg sm:text-xl mb-2 font-sora">
                  Password
                </label>

                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Input your Password.."
                    className="w-full bg-white border-2 border-black rounded-[13px] h-[64px] sm:h-[70px] px-5 pr-14 text-lg sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black font-sora"
                  />
                  {/* Exact Vision / Eye Icon from Figma (Node 1:1121) */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 w-[30px] h-[30px] flex items-center justify-center cursor-pointer p-0 bg-transparent border-0"
                    aria-label="Toggle password visibility"
                  >
                    <img 
                      src="/images/auth/vision.png" 
                      alt="Vision" 
                      className={`w-[28px] h-[28px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`}
                    />
                  </button>
                </div>
              </div>

              {/* Row: Remember Me & Forget password? (Node 1:1122, 1:1111, 1:1115) */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div 
                    onClick={() => setRememberMe(!rememberMe)}
                    className="w-[24px] h-[24px] rounded-[8px] border-2 border-black flex items-center justify-center transition-colors"
                  >
                    {rememberMe && <span className="text-black font-bold text-sm leading-none">✓</span>}
                  </div>
                  <span className="text-[#888888] font-normal text-base sm:text-xl font-sora">
                    Remember Me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Password reset instructions sent to your email.')}
                  className="text-[#888888] hover:text-black font-normal text-base sm:text-xl font-sora transition-colors cursor-pointer"
                >
                  Forget password?
                </button>
              </div>

              {/* Login Button (Node 1:1116, 1:1123) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-neutral-800 text-[#fffafa] font-normal text-xl sm:text-2xl h-[64px] sm:h-[68px] rounded-[30px] transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg flex items-center justify-center cursor-pointer font-sora mt-2"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {/* Divider (Node 1:1112, 1:1125, 1:1126) */}
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="flex-1 h-[1px] bg-gray-300" />
                <span className="text-[#888888] text-sm sm:text-lg font-normal px-2 font-sora whitespace-nowrap">
                  Or continue with:
                </span>
                <div className="flex-1 h-[1px] bg-gray-300" />
              </div>

              {/* Continue with Google (Node 1:1117, 1:1124, 1:1127) */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-50 text-[#080808] border-2 border-black font-normal text-lg sm:text-2xl h-[64px] sm:h-[68px] rounded-[30px] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-95 font-sora"
              >
                <img 
                  src="/images/auth/google.png" 
                  alt="Google" 
                  className="w-[32px] h-[32px] object-contain"
                />
                <span>Continue with Google</span>
              </button>

              {/* Footer Switch Link (Node 1:1113, 1:1114) */}
              <div className="text-center pt-3 text-base sm:text-xl font-sora">
                <span className="text-[#807e7e]">Don’t Have An Account? </span>
                <Link to="/register" className="font-bold text-[#0e0d0d] hover:underline ml-1">
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

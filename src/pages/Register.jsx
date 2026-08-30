import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Exact 1:1 Figma implementation for Sign Up Pages:
 * - Node 1:2018: Standard Customer Sign Up ("Sign Up")
 * - Node 1:3814: Driver Sign Up ("Sign Up as a driver")
 *
 * Left side: Nighttime Skyline R34 car background + Poppins bold hollow outline typography "Start Your Journey with Mechify"
 * Right side: White card (rounded-[24px], shadow-2xl, border-black inputs)
 */
export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDriverMode, setIsDriverMode] = useState(searchParams.get('role') === 'driver');

  // Customer Form State (Node 1:2018)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Driver Form State (Node 1:3814)
  const [drivingLicense, setDrivingLicense] = useState('');
  const [nidNumber, setNidNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [carOwnership, setCarOwnership] = useState('have_car'); // 'have_car' | 'need_car'

  // Shared Password State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!password) {
      alert('Please input your password.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isDriverMode) {
        localStorage.setItem('userRole', 'driver');
      } else {
        localStorage.setItem('userRole', 'user');
      }
      navigate('/home');
    }, 600);
  };

  const handleGoogleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('userRole', isDriverMode ? 'driver' : 'user');
      navigate('/home');
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sora flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-x-hidden select-none">
      
      {/* ─── Hero Skyline R34 Background Image (Node 1:2020 / 1:3816) ─── */}
      <img
        src="/images/auth/bg.png"
        alt="Mechify Skyline Background"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none opacity-80"
      />

      {/* Subtle vignette gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/75 pointer-events-none" />

      {/* ─── Main Viewport Container ─── */}
      <div className="relative z-10 max-w-[1720px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-6">
        
        {/* ─── Left Side: Exact Hollow-Stroke Poppins Typography (Node 1:2021 / 1:3842) ─── */}
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

        {/* ─── Right Side: White Card (Node 1:2022 / 1:3817) ─── */}
        <div className="w-full lg:w-auto flex-shrink-0 flex justify-center animate-fadeIn">
          <div className="bg-white text-black rounded-[24px] sm:rounded-[30px] p-7 sm:p-12 w-full max-w-[620px] shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-gray-100 relative">
            
            {/* Header: Sign Up OR Sign Up as a driver (Node 1:2037 / 1:3833) */}
            <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-black text-center mb-8 tracking-tight font-sora">
              {isDriverMode ? 'Sign Up as a driver' : 'Sign Up'}
            </h1>

            <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5">
              
              {/* ─── CUSTOMER MODE FIELDS (Node 1:2018) ─── */}
              {!isDriverMode ? (
                <>
                  {/* First name (Node 1:2023, 1:2025) */}
                  <div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full bg-white border-2 border-black rounded-[13px] h-[60px] sm:h-[68px] px-5 text-lg sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none focus:border-black font-sora"
                    />
                  </div>

                  {/* Last name (Node 1:2024, 1:2026) */}
                  <div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full bg-white border-2 border-black rounded-[13px] h-[60px] sm:h-[68px] px-5 text-lg sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none focus:border-black font-sora"
                    />
                  </div>

                  {/* Email address (Node 1:2027, 1:2030) */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full bg-white border-2 border-black rounded-[13px] h-[60px] sm:h-[68px] px-5 text-lg sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black font-sora"
                    />
                  </div>
                </>
              ) : (
                /* ─── DRIVER MODE FIELDS (Node 1:3814) ─── */
                <>
                  {/* Driving License (Node 1:3818, 1:3820) */}
                  <div>
                    <input
                      type="text"
                      value={drivingLicense}
                      onChange={(e) => setDrivingLicense(e.target.value)}
                      placeholder="Driving License"
                      className="w-full bg-white border-2 border-black rounded-[13px] h-[60px] sm:h-[68px] px-5 text-lg sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none focus:border-black font-sora"
                    />
                  </div>

                  {/* NID Number (Node 1:3819, 1:3821) */}
                  <div>
                    <input
                      type="text"
                      value={nidNumber}
                      onChange={(e) => setNidNumber(e.target.value)}
                      placeholder="NID Number"
                      className="w-full bg-white border-2 border-black rounded-[13px] h-[60px] sm:h-[68px] px-5 text-lg sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none focus:border-black font-sora"
                    />
                  </div>

                  {/* Driving experience (Node 1:3822, 1:3825) */}
                  <div>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Driving experience"
                      className="w-full bg-white border-2 border-black rounded-[13px] h-[60px] sm:h-[68px] px-5 text-lg sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black font-sora"
                    />
                  </div>
                </>
              )}

              {/* Shared: Input your Password.. (Node 1:2028 / 1:3823) */}
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input your Password.."
                  className="w-full bg-white border-2 border-black rounded-[13px] h-[60px] sm:h-[68px] px-5 pr-14 text-lg sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black font-sora"
                />
                {/* Vision / Eye Icon (Node 1:2038 / 1:3834) */}
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

              {/* Shared: Confirm your Password.. (Node 1:2029 / 1:3824) */}
              <div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your Password.."
                  className="w-full bg-white border-2 border-black rounded-[13px] h-[60px] sm:h-[68px] px-5 text-lg sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black font-sora"
                />
              </div>

              {/* ─── Role Checkbox / Radios ─── */}
              {!isDriverMode ? (
                /* Customer: Want to join as a driver ? (Node 1:2039, 1:2033) */
                <div className="pt-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <div 
                      onClick={() => setIsDriverMode(true)}
                      className="w-[24px] h-[24px] rounded-[8px] border-2 border-black flex items-center justify-center transition-colors"
                    >
                      {isDriverMode && <span className="text-black font-bold text-sm leading-none">✓</span>}
                    </div>
                    <span 
                      onClick={() => setIsDriverMode(true)}
                      className="text-[#888888] hover:text-black font-normal text-base sm:text-xl font-sora transition-colors"
                    >
                      Want to join as a driver  ?
                    </span>
                  </label>
                </div>
              ) : (
                /* Driver: I have a car & I need a car (Node 1:3835, 1:3836, 1:3828, 1:3829) */
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <div 
                        onClick={() => setCarOwnership('have_car')}
                        className="w-[24px] h-[24px] rounded-[8px] border-2 border-black flex items-center justify-center transition-colors"
                      >
                        {carOwnership === 'have_car' && <span className="text-black font-bold text-sm leading-none">✓</span>}
                      </div>
                      <span 
                        onClick={() => setCarOwnership('have_car')}
                        className="text-[#888888] font-normal text-base sm:text-xl font-sora"
                      >
                        I have a car
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <div 
                        onClick={() => setCarOwnership('need_car')}
                        className="w-[24px] h-[24px] rounded-[8px] border-2 border-black flex items-center justify-center transition-colors"
                      >
                        {carOwnership === 'need_car' && <span className="text-black font-bold text-sm leading-none">✓</span>}
                      </div>
                      <span 
                        onClick={() => setCarOwnership('need_car')}
                        className="text-[#888888] font-normal text-base sm:text-xl font-sora"
                      >
                        I need a car
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDriverMode(false)}
                    className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
                  >
                    (User mode)
                  </button>
                </div>
              )}

              {/* Sign up Button (Node 1:2035 / 1:3831, 1:2040 / 1:3837) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-neutral-800 text-[#fffafa] font-normal text-xl sm:text-2xl h-[64px] sm:h-[68px] rounded-[30px] transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg flex items-center justify-center cursor-pointer font-sora mt-2"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>

              {/* Divider: Or sign up with: (Node 1:2034 / 1:3830) */}
              <div className="flex items-center justify-center gap-3 my-2">
                <div className="flex-1 h-[1px] bg-gray-300" />
                <span className="text-[#888888] text-sm sm:text-lg font-normal px-2 font-sora whitespace-nowrap">
                  Or sign up with:
                </span>
                <div className="flex-1 h-[1px] bg-gray-300" />
              </div>

              {/* Sign up with Google (Node 1:2036 / 1:3832, 1:2041 / 1:3838) */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full bg-white hover:bg-gray-50 text-[#080808] border-2 border-black font-normal text-lg sm:text-2xl h-[64px] sm:h-[68px] rounded-[30px] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-95 font-sora"
              >
                <img 
                  src="/images/auth/google.png" 
                  alt="Google" 
                  className="w-[32px] h-[32px] object-contain"
                />
                <span>Sign up with Google</span>
              </button>

              {/* Footer Switch Link */}
              <div className="text-center pt-2 text-base sm:text-xl font-sora">
                <span className="text-[#807e7e]">Already Have An Account? </span>
                <Link to="/auth" className="font-bold text-[#0e0d0d] hover:underline ml-1">
                  Login Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

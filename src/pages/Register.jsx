import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Exact 1:1 Figma implementation for Sign Up Pages:
 * - Node 1:2018: Standard Customer Sign Up ("Sign Up")
 * - Node 1:3814: Driver Sign Up ("Sign Up as a driver")
 *
 * Canvas: 1920x1080
 * Left: Skyline background (bg.png) + Poppins/Sora hollow stroke outline typography
 * Right: White card (width: 745px, minHeight: 880px, rounded: 20px, shadow-2xl)
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
    <div className="relative w-full min-h-screen bg-black text-white font-sora flex items-center justify-center overflow-x-hidden select-none">
      
      {/* ─── Exact Background Image from Figma (Node 1:2020 / 1:3816) ─── */}
      <img
        src="/images/auth/bg.png"
        alt="Mechify Skyline Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* ─── 1920x1080 Full Frame Container ─── */}
      <div className="relative z-10 w-full max-w-[1920px] min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-24 py-12">
        
        {/* ─── Left Side Typography (Node 1:2021 / 1:3842) ─── */}
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

        {/* ─── Right Side White Card (Node 1:2022 / 1:3817) ─── */}
        <div className="w-full lg:w-[745px] flex-shrink-0 flex justify-center animate-fadeIn">
          <div 
            className="bg-white text-black rounded-[20px] p-8 sm:p-14 w-full max-w-[745px] shadow-[0px_25px_70px_rgba(0,0,0,0.9)] relative"
            style={{ minHeight: '908px' }}
          >
            
            {/* Header: Sign Up OR Sign Up as a driver (Node 1:2037 / 1:3833) */}
            <h1 
              className="font-semibold text-center text-black tracking-tight mb-8"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 'clamp(32px, 3.2vw, 48px)',
                lineHeight: 1.1,
              }}
            >
              {isDriverMode ? 'Sign Up as a driver' : 'Sign Up'}
            </h1>

            <form onSubmit={handleSignUp} className="max-w-[563px] mx-auto flex flex-col gap-4 sm:gap-5">
              
              {/* ─── CUSTOMER MODE FIELDS (Node 1:2018) ─── */}
              {!isDriverMode ? (
                <>
                  {/* First name (Node 1:2023, 1:2025) */}
                  <div className="relative">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full bg-white border border-black rounded-[13px] h-[65px] sm:h-[71px] px-6 text-xl sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none focus:border-black"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    />
                  </div>

                  {/* Last name (Node 1:2024, 1:2026) */}
                  <div className="relative">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full bg-white border border-black rounded-[13px] h-[65px] sm:h-[71px] px-6 text-xl sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none focus:border-black"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    />
                  </div>

                  {/* Email address (Node 1:2027, 1:2030) */}
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full bg-white border border-black rounded-[13px] h-[65px] sm:h-[71px] px-6 text-xl sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    />
                  </div>
                </>
              ) : (
                /* ─── DRIVER MODE FIELDS (Node 1:3814) ─── */
                <>
                  {/* Driving License (Node 1:3818, 1:3820) */}
                  <div className="relative">
                    <input
                      type="text"
                      value={drivingLicense}
                      onChange={(e) => setDrivingLicense(e.target.value)}
                      placeholder="Driving License"
                      className="w-full bg-white border border-black rounded-[13px] h-[65px] sm:h-[71px] px-6 text-xl sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none focus:border-black"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    />
                  </div>

                  {/* NID Number (Node 1:3819, 1:3821) */}
                  <div className="relative">
                    <input
                      type="text"
                      value={nidNumber}
                      onChange={(e) => setNidNumber(e.target.value)}
                      placeholder="NID Number"
                      className="w-full bg-white border border-black rounded-[13px] h-[65px] sm:h-[71px] px-6 text-xl sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none focus:border-black"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    />
                  </div>

                  {/* Driving experience (Node 1:3822, 1:3825) */}
                  <div className="relative">
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Driving experience"
                      className="w-full bg-white border border-black rounded-[13px] h-[65px] sm:h-[71px] px-6 text-xl sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    />
                  </div>
                </>
              )}

              {/* Shared: Input your Password.. (Node 1:2028/1:3823 & 1:2038/1:3834 Vision icon) */}
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input your Password.."
                  className="w-full bg-white border border-black rounded-[13px] h-[65px] sm:h-[71px] px-6 pr-16 text-xl sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                />
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

              {/* Shared: Confirm your Password.. (Node 1:2029 / 1:3824) */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your Password.."
                  className="w-full bg-white border border-black rounded-[13px] h-[65px] sm:h-[71px] px-6 text-xl sm:text-2xl text-black placeholder-[#bbbbbb] focus:outline-none focus:border-black"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                />
              </div>

              {/* ─── Role Checkboxes / Radio Options ─── */}
              {!isDriverMode ? (
                /* Customer: Want to join as a driver ? (Node 1:2039, 1:2033) */
                <div className="pt-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isDriverMode}
                      onChange={(e) => setIsDriverMode(e.target.checked)}
                      className="w-[25px] h-[25px] rounded-[10px] border border-[#0d0c0c] accent-black cursor-pointer"
                    />
                    <span 
                      className="text-[#bbbbbb] hover:text-black transition-colors"
                      style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
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
                      <input
                        type="radio"
                        name="carOwnership"
                        value="have_car"
                        checked={carOwnership === 'have_car'}
                        onChange={() => setCarOwnership('have_car')}
                        className="w-[25px] h-[25px] rounded-[10px] accent-black cursor-pointer"
                      />
                      <span 
                        className="text-[#bbbbbb]"
                        style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
                      >
                        I have a car
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="carOwnership"
                        value="need_car"
                        checked={carOwnership === 'need_car'}
                        onChange={() => setCarOwnership('need_car')}
                        className="w-[25px] h-[25px] rounded-[10px] accent-black cursor-pointer"
                      />
                      <span 
                        className="text-[#bbbbbb]"
                        style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
                      >
                        I need a car
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDriverMode(false)}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Switch to User Sign-up
                  </button>
                </div>
              )}

              {/* Sign up Button (Node 1:2035 / 1:3831, 1:2040 / 1:3837) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-neutral-800 text-[#fffafa] font-normal h-[65px] rounded-[30px] border border-[#030303] transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-center cursor-pointer mt-1"
                style={{ fontSize: '24px', fontFamily: "'Sora', sans-serif" }}
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>

              {/* Divider: Or sign up with: (Node 1:2034 / 1:3830, 1:2042 / 1:3839) */}
              <div className="flex items-center justify-center gap-4 my-1">
                <div className="flex-1 h-[1px] bg-black/40" />
                <span 
                  className="text-[#bbbbbb] font-normal whitespace-nowrap px-1"
                  style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
                >
                  Or sign up with:
                </span>
                <div className="flex-1 h-[1px] bg-black/40" />
              </div>

              {/* Sign up with Google (Node 1:2036 / 1:3832, 1:2041 / 1:3838, 1:2044 / 1:3841) */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full bg-white hover:bg-gray-50 text-[#080808] border border-black font-normal h-[65px] rounded-[30px] transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer shadow-sm active:scale-95"
                style={{ fontSize: '24px', fontFamily: "'Sora', sans-serif" }}
              >
                <img 
                  src="/images/auth/google.png" 
                  alt="Google" 
                  className="w-[35px] h-[35px] object-contain"
                />
                <span>Sign up with Google</span>
              </button>

              {/* Footer Link */}
              <div 
                className="text-center pt-2"
                style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', fontFamily: "'Sora', sans-serif" }}
              >
                <span className="text-[#807e7e]">Already Have An Account? </span>
                <Link to="/auth" className="font-normal text-[#0e0d0d] hover:underline ml-1">
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

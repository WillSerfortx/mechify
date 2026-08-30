import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Exact 1:1 Figma implementation for Sign Up Pages:
 * - Node 1:2018: Standard Customer Sign Up
 * - Node 1:3814: Sign Up as a Driver
 *
 * Smooth interactive toggle between regular customer and driver sign-up modes.
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
    <div className="relative w-full min-h-screen bg-black text-white font-sora flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-x-hidden">
      
      {/* ─── Hero Background Image ─── */}
      <img
        src="/images/workshop/hero-bg.png"
        alt="Mechify Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-65"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80 pointer-events-none" />

      {/* ─── Main Content Container (Figma 1920x1080 proportion) ─── */}
      <div className="relative z-10 max-w-[1720px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-8">
        
        {/* ─── Left Side: Hollow Stroke Typography (Node 1:2021 / 1:3842) ─── */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center select-none pl-2 sm:pl-8 lg:pl-16 animate-slideInLeft">
          <div
            className="font-bold leading-[1.05] tracking-tight"
            style={{
              fontFamily: "'Poppins', 'Sora', sans-serif",
              fontSize: 'clamp(46px, 6vw, 115px)',
              color: 'transparent',
              WebkitTextStroke: '2.5px #ffffff',
            }}
          >
            <p className="mb-1">Start  Your</p>
            <p className="mb-1">Journey</p>
            <p className="mb-1">with</p>
            <p className="text-white" style={{ WebkitTextStroke: '0px' }}>Mechify</p>
          </div>
        </div>

        {/* ─── Right Side: White Card (Node 1:2022 / 1:3817) ─── */}
        <div className="w-full lg:w-auto flex-shrink-0 flex justify-center animate-fadeIn">
          <div className="bg-white text-black rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 w-full max-w-[640px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-gray-100 relative">
            
            {/* Header: Sign Up OR Sign Up as a driver */}
            <div className="text-center mb-8">
              <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight font-sora mb-2">
                {isDriverMode ? 'Sign Up as a driver' : 'Sign Up'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {isDriverMode ? 'Join Mechify professional driver network' : 'Create your personal Mechify account'}
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5">
              
              {/* ─── CUSTOMER MODE FIELDS (Node 1:2018) ─── */}
              {!isDriverMode ? (
                <>
                  {/* First name */}
                  <div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full bg-white border border-black rounded-[13px] h-[58px] sm:h-[64px] px-5 text-base sm:text-lg text-black placeholder-[#b6b6b6] focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  {/* Last name */}
                  <div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full bg-white border border-black rounded-[13px] h-[58px] sm:h-[64px] px-5 text-base sm:text-lg text-black placeholder-[#b6b6b6] focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  {/* Email address */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full bg-white border border-black rounded-[13px] h-[58px] sm:h-[64px] px-5 text-base sm:text-lg text-black placeholder-[#bbb] focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </>
              ) : (
                /* ─── DRIVER MODE FIELDS (Node 1:3814) ─── */
                <>
                  {/* Driving License */}
                  <div>
                    <input
                      type="text"
                      value={drivingLicense}
                      onChange={(e) => setDrivingLicense(e.target.value)}
                      placeholder="Driving License"
                      className="w-full bg-white border border-black rounded-[13px] h-[58px] sm:h-[64px] px-5 text-base sm:text-lg text-black placeholder-[#b6b6b6] focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  {/* NID Number */}
                  <div>
                    <input
                      type="text"
                      value={nidNumber}
                      onChange={(e) => setNidNumber(e.target.value)}
                      placeholder="NID Number"
                      className="w-full bg-white border border-black rounded-[13px] h-[58px] sm:h-[64px] px-5 text-base sm:text-lg text-black placeholder-[#b6b6b6] focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  {/* Driving experience */}
                  <div>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Driving experience"
                      className="w-full bg-white border border-black rounded-[13px] h-[58px] sm:h-[64px] px-5 text-base sm:text-lg text-black placeholder-[#bbb] focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </>
              )}

              {/* Shared: Input your Password.. (with eye toggle) */}
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input your Password.."
                  className="w-full bg-white border border-black rounded-[13px] h-[58px] sm:h-[64px] px-5 pr-14 text-base sm:text-lg text-black placeholder-[#bbb] focus:outline-none focus:border-red-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-500 hover:text-black p-1 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Shared: Confirm your Password.. */}
              <div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your Password.."
                  className="w-full bg-white border border-black rounded-[13px] h-[58px] sm:h-[64px] px-5 text-base sm:text-lg text-black placeholder-[#bbb] focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {/* ─── Role Checkboxes / Radio Buttons ─── */}
              {!isDriverMode ? (
                /* Customer Mode: Want to join as a driver ? (Node 1:2033) */
                <div className="pt-1 pb-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isDriverMode}
                      onChange={(e) => setIsDriverMode(e.target.checked)}
                      className="w-5 h-5 rounded-full border border-black accent-black cursor-pointer"
                    />
                    <span className="text-[#888] hover:text-black text-sm sm:text-base font-normal transition-colors">
                      Want to join as a driver ?
                    </span>
                  </label>
                </div>
              ) : (
                /* Driver Mode: I have a car / I need a car (Node 1:3828, 1:3829) */
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1 pb-1">
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="carOwnership"
                        value="have_car"
                        checked={carOwnership === 'have_car'}
                        onChange={() => setCarOwnership('have_car')}
                        className="w-5 h-5 accent-black cursor-pointer"
                      />
                      <span className="text-[#888] text-sm sm:text-base">I have a car</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="carOwnership"
                        value="need_car"
                        checked={carOwnership === 'need_car'}
                        onChange={() => setCarOwnership('need_car')}
                        className="w-5 h-5 accent-black cursor-pointer"
                      />
                      <span className="text-[#888] text-sm sm:text-base">I need a car</span>
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

              {/* Submit Button (Node 1:2035 / 1:3831) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-neutral-800 text-white font-normal text-xl sm:text-2xl h-[60px] sm:h-[65px] rounded-[30px] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center cursor-pointer mt-3"
              >
                {loading ? 'Creating Account...' : 'Sign up'}
              </button>

              {/* Divider (Node 1:2034 / 1:3830) */}
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="flex-1 h-[1px] bg-gray-300" />
                <span className="text-[#888] text-sm sm:text-base font-normal px-2">
                  Or sign up with:
                </span>
                <div className="flex-1 h-[1px] bg-gray-300" />
              </div>

              {/* Sign up with Google (Node 1:2036 / 1:3832) */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full bg-white hover:bg-gray-50 text-black border border-black font-normal text-lg sm:text-xl h-[60px] sm:h-[65px] rounded-[30px] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-95"
              >
                {/* Google Multicolor Logo */}
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign up with Google</span>
              </button>

              {/* Footer Switch Link */}
              <div className="text-center pt-2 text-sm sm:text-base">
                <span className="text-[#807e7e]">Already Have An Account? </span>
                <Link to="/auth" className="font-bold text-black hover:underline ml-1">
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

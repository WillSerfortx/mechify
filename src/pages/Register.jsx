import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const imgVision = "/images/auth/vision.png";
const imgGoogle = "/images/auth/google.png";

/**
 * Sign Up Page (Figma Nodes 1:2018 & 1:3814):
 * - Full-bleed background covering 100% of the screen (fills up all gaps on right and bottom)
 * - Left side: Poppins bold hollow outline typography "Start Your Journey with Mechify"
 * - Right side: White card (Node 1:2022 / 1:3817) with Customer and Driver sign-up modes
 */
export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDriverMode, setIsDriverMode] = useState(searchParams.get('role') === 'driver');

  // Customer State (Node 1:2018)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Driver State (Node 1:3814)
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
      alert('Please enter your password.');
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
        
        {/* ─── Left Side: Hollow Stroke Poppins Typography (Node 1:2021 / 1:3842) ─── */}
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

        {/* ─── Right Side: Exact Figma White Card (Node 1:2022 / 1:3817) ─── */}
        <div className="w-full lg:w-auto flex-shrink-0 flex justify-center animate-fadeIn">
          <div className="bg-white text-black rounded-[20px] p-8 sm:p-12 lg:p-14 w-full max-w-[680px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative border border-neutral-100">
            
            {/* Header: Sign Up OR Sign Up as a driver (Node 1:2037 / 1:3833) */}
            <h1 className="font-semibold text-3xl sm:text-4xl lg:text-[46px] text-black text-center mb-8 tracking-tight font-sora">
              {isDriverMode ? 'Sign Up as a driver' : 'Sign Up'}
            </h1>

            <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5">
              
              {/* ─── CUSTOMER MODE FIELDS (Node 1:2018) ─── */}
              {!isDriverMode ? (
                <>
                  {/* First name (Node 1:2023, 1:2025) */}
                  <div className="bg-white border border-black rounded-[13px] h-[64px] sm:h-[71px] px-6 flex items-center">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full h-full bg-transparent text-xl sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none font-sora"
                    />
                  </div>

                  {/* Last name (Node 1:2024, 1:2026) */}
                  <div className="bg-white border border-black rounded-[13px] h-[64px] sm:h-[71px] px-6 flex items-center">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full h-full bg-transparent text-xl sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none font-sora"
                    />
                  </div>

                  {/* Email address (Node 1:2027, 1:2030) */}
                  <div className="bg-white border border-black rounded-[13px] h-[64px] sm:h-[71px] px-6 flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full h-full bg-transparent text-xl sm:text-2xl text-black placeholder-[#bbb] focus:outline-none font-sora"
                    />
                  </div>
                </>
              ) : (
                /* ─── DRIVER MODE FIELDS (Node 1:3814) ─── */
                <>
                  {/* Driving License (Node 1:3818, 1:3820) */}
                  <div className="bg-white border border-black rounded-[13px] h-[64px] sm:h-[71px] px-6 flex items-center">
                    <input
                      type="text"
                      value={drivingLicense}
                      onChange={(e) => setDrivingLicense(e.target.value)}
                      placeholder="Driving License"
                      className="w-full h-full bg-transparent text-xl sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none font-sora"
                    />
                  </div>

                  {/* NID Number (Node 1:3819, 1:3821) */}
                  <div className="bg-white border border-black rounded-[13px] h-[64px] sm:h-[71px] px-6 flex items-center">
                    <input
                      type="text"
                      value={nidNumber}
                      onChange={(e) => setNidNumber(e.target.value)}
                      placeholder="NID Number"
                      className="w-full h-full bg-transparent text-xl sm:text-2xl text-black placeholder-[#b6b6b6] focus:outline-none font-sora"
                    />
                  </div>

                  {/* Driving experience (Node 1:3822, 1:3825) */}
                  <div className="bg-white border border-black rounded-[13px] h-[64px] sm:h-[71px] px-6 flex items-center">
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Driving experience"
                      className="w-full h-full bg-transparent text-xl sm:text-2xl text-black placeholder-[#bbb] focus:outline-none font-sora"
                    />
                  </div>
                </>
              )}

              {/* Password Input (Node 1:2028 / 1:3823) */}
              <div className="relative flex items-center bg-white border border-black rounded-[13px] h-[64px] sm:h-[71px] px-6">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input your Password.."
                  className="w-full h-full bg-transparent pr-12 text-xl sm:text-2xl text-black placeholder-[#bbb] focus:outline-none font-sora"
                />
                {/* Vision Icon (Node 1:2038 / 1:3834) */}
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

              {/* Confirm Password Input (Node 1:2029 / 1:3824) */}
              <div className="bg-white border border-black rounded-[13px] h-[64px] sm:h-[71px] px-6 flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your Password.."
                  className="w-full h-full bg-transparent text-xl sm:text-2xl text-black placeholder-[#bbb] focus:outline-none font-sora"
                />
              </div>

              {/* ─── Role Checkboxes / Radios ─── */}
              {!isDriverMode ? (
                /* Customer: Want to join as a driver ? (Node 1:2039, 1:2033) */
                <div className="pt-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <div 
                      onClick={() => setIsDriverMode(true)}
                      className="w-[25px] h-[25px] rounded-[10px] border border-[#0d0c0c] flex items-center justify-center transition-colors bg-white cursor-pointer"
                    >
                      {isDriverMode && <span className="text-black font-bold text-base leading-none">✓</span>}
                    </div>
                    <span 
                      onClick={() => setIsDriverMode(true)}
                      className="text-[#bbb] hover:text-black font-normal text-lg sm:text-2xl font-sora transition-colors cursor-pointer"
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
                        className="w-[25px] h-[25px] rounded-[10px] border border-[#0d0c0c] flex items-center justify-center transition-colors bg-white cursor-pointer"
                      >
                        {carOwnership === 'have_car' && <span className="text-black font-bold text-base leading-none">✓</span>}
                      </div>
                      <span 
                        onClick={() => setCarOwnership('have_car')}
                        className="text-[#bbb] font-normal text-lg sm:text-2xl font-sora cursor-pointer"
                      >
                        I have a car
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <div 
                        onClick={() => setCarOwnership('need_car')}
                        className="w-[25px] h-[25px] rounded-[10px] border border-[#0d0c0c] flex items-center justify-center transition-colors bg-white cursor-pointer"
                      >
                        {carOwnership === 'need_car' && <span className="text-black font-bold text-base leading-none">✓</span>}
                      </div>
                      <span 
                        onClick={() => setCarOwnership('need_car')}
                        className="text-[#bbb] font-normal text-lg sm:text-2xl font-sora cursor-pointer"
                      >
                        I need a car
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDriverMode(false)}
                    className="text-xs sm:text-sm text-red-600 hover:underline font-semibold cursor-pointer"
                  >
                    Switch to User mode
                  </button>
                </div>
              )}

              {/* Sign up Button (Node 1:2035 / 1:3831, 1:2040 / 1:3837) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-neutral-800 text-[#fffafa] font-normal text-2xl h-[65px] rounded-[30px] border border-[#030303] transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg flex items-center justify-center cursor-pointer font-sora mt-2"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>

              {/* Divider (Node 1:2034 / 1:3830) */}
              <div className="flex items-center justify-center gap-3 my-2">
                <div className="flex-1 h-[1px] bg-black/30" />
                <span className="text-[#bbb] text-base sm:text-2xl font-normal px-2 font-sora whitespace-nowrap">
                  Or sign up with:
                </span>
                <div className="flex-1 h-[1px] bg-black/30" />
              </div>

              {/* Sign up with Google Button (Node 1:2036 / 1:3832) */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full bg-white hover:bg-gray-50 text-[#080808] border border-black font-normal text-xl sm:text-2xl h-[65px] rounded-[30px] transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer shadow-sm active:scale-95 font-sora"
              >
                <img 
                  src={imgGoogle} 
                  alt="Google" 
                  className="size-[35px] object-contain"
                />
                <span>Sign up with Google</span>
              </button>

              {/* Footer Switch Link */}
              <div className="text-center pt-2 text-lg sm:text-2xl font-sora">
                <span className="text-[#807e7e]">Already Have An Account? </span>
                <Link to="/auth" className="font-semibold text-[#0e0d0d] hover:underline ml-1">
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

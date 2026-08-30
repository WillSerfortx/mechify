import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ScaleWrapper from '../components/ScaleWrapper';

/**
 * Exact 1:1 Figma implementation for Sign Up Pages:
 * - Node 1:2018: Standard Customer Sign Up ("Sign Up")
 * - Node 1:3814: Driver Sign Up ("Sign Up as a driver")
 *
 * Canvas: 1920x1080 via ScaleWrapper
 * Left: Skyline background (bg.png) + Poppins/Sora hollow stroke outline typography
 * Right: White card (width: 745px, height: 908px, rounded: 20px)
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
    e?.preventDefault?.();
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
    <ScaleWrapper height={1080}>
      <div className="bg-white relative w-[1920px] h-[1080px] overflow-hidden select-none font-sora" data-node-id={isDriverMode ? "1:3814" : "1:2018"}>
        
        {/* ─── Background Image (Node 1:2020 / 1:3816) ─── */}
        <div className="absolute h-[1080px] left-0 top-0 w-[1920px]" data-node-id="1:2020">
          <img 
            alt="Skyline Background" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            src="/images/auth/bg.png" 
          />
        </div>

        {/* ─── Top Left Back Arrow ─── */}
        <div 
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 size-[60px] cursor-pointer z-30 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 transition-colors border border-white/20" 
          data-name="Back"
          title="Go Back"
        >
          <span className="text-white text-3xl font-bold font-mono">‹</span>
        </div>

        {/* ─── Left Typography: Start Your Journey with Mechify (Node 1:2021 / 1:3842) ─── */}
        <div 
          className="[word-break:break-word] absolute font-['Poppins'] font-bold h-[683px] left-[156px] not-italic text-[128px] text-white top-[266px] w-[820px] select-none leading-[1.05]" 
          data-node-id="1:2021"
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

        {/* ─── White Card (Node 1:2022 / 1:3817) ─── */}
        <div 
          className="absolute bg-white h-[908px] left-[1081px] rounded-[20px] top-[86px] w-[745px] shadow-[0px_25px_70px_rgba(0,0,0,0.8)]" 
          data-node-id="1:2022" 
        />

        {/* ─── Heading: Sign Up OR Sign Up as a driver (Node 1:2037 / 1:3833) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] text-[48px] text-black top-[153px] left-[1081px] w-[745px] text-center whitespace-nowrap" 
          data-node-id={isDriverMode ? "1:3833" : "1:2037"}
        >
          {isDriverMode ? 'Sign Up as a driver' : 'Sign Up'}
        </p>

        {/* ─── FORM FIELDS: CUSTOMER MODE (Node 1:2018) ─── */}
        {!isDriverMode ? (
          <>
            {/* First name (Node 1:2023, 1:2025) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[227px] w-[563px] flex items-center z-10" data-node-id="1:2023">
              <input 
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Last name (Node 1:2024, 1:2026) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1156px] rounded-[13px] top-[309px] w-[563px] flex items-center z-10" data-node-id="1:2024">
              <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Email address (Node 1:2027, 1:2030) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[390px] w-[563px] flex items-center z-10" data-node-id="1:2027">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbbbbb] focus:outline-none"
              />
            </div>
          </>
        ) : (
          /* ─── FORM FIELDS: DRIVER MODE (Node 1:3814) ─── */
          <>
            {/* Driving License (Node 1:3818, 1:3820) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[227px] w-[563px] flex items-center z-10" data-node-id="1:3818">
              <input 
                type="text"
                value={drivingLicense}
                onChange={(e) => setDrivingLicense(e.target.value)}
                placeholder="Driving License"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* NID Number (Node 1:3819, 1:3821) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1156px] rounded-[13px] top-[309px] w-[563px] flex items-center z-10" data-node-id="1:3819">
              <input 
                type="text"
                value={nidNumber}
                onChange={(e) => setNidNumber(e.target.value)}
                placeholder="NID Number"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Driving experience (Node 1:3822, 1:3825) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[390px] w-[563px] flex items-center z-10" data-node-id="1:3822">
              <input 
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Driving experience"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbbbbb] focus:outline-none"
              />
            </div>
          </>
        )}

        {/* ─── Shared: Input your Password.. (Node 1:2028/1:3823) ─── */}
        <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[474px] w-[563px] flex items-center z-10" data-node-id="1:2028">
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input your Password.."
            className="w-full h-full bg-transparent px-6 pr-16 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbbbbb] focus:outline-none"
          />
          {/* Eye Vision Icon (Node 1:2038 / 1:3834) */}
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent border-0"
            data-node-id="1:2038"
            aria-label="Toggle password visibility"
          >
            <img 
              alt="Vision" 
              className={`w-[30px] h-[30px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`} 
              src="/images/auth/vision.png" 
            />
          </button>
        </div>

        {/* ─── Shared: Confirm your Password.. (Node 1:2029 / 1:3824) ─── */}
        <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[564px] w-[563px] flex items-center z-10" data-node-id="1:2029">
          <input 
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your Password.."
            className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbbbbb] focus:outline-none"
          />
        </div>

        {/* ─── Role Checkbox / Radios ─── */}
        {!isDriverMode ? (
          /* Customer: Want to join as a driver ? (Node 1:2039, 1:2033) */
          <>
            <div 
              onClick={() => setIsDriverMode(true)}
              className="absolute bg-white border border-[#0d0c0c] border-solid left-[1192px] rounded-[10px] size-[25px] top-[680px] cursor-pointer flex items-center justify-center z-10" 
              data-node-id="1:2039"
            >
              {isDriverMode && <span className="text-black font-bold text-base leading-none">✓</span>}
            </div>

            <p 
              onClick={() => setIsDriverMode(true)}
              className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1230px] text-[#bbbbbb] text-[24px] top-[680px] whitespace-pre cursor-pointer hover:text-black transition-colors select-none z-10" 
              data-node-id="1:2033"
            >
              Want to join as a driver  ?
            </p>
          </>
        ) : (
          /* Driver: I have a car & I need a car (Node 1:3835, 1:3836, 1:3828, 1:3829) */
          <>
            {/* Box 1: I have a car */}
            <div 
              onClick={() => setCarOwnership('have_car')}
              className="absolute bg-white border border-[#0d0c0c] border-solid left-[1192px] rounded-[10px] size-[25px] top-[680px] cursor-pointer flex items-center justify-center z-10" 
              data-node-id="1:3835"
            >
              {carOwnership === 'have_car' && <span className="text-black font-bold text-base leading-none">✓</span>}
            </div>
            <p 
              onClick={() => setCarOwnership('have_car')}
              className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1230px] text-[#bbbbbb] text-[24px] top-[680px] whitespace-nowrap cursor-pointer select-none z-10" 
              data-node-id="1:3828"
            >
              I have a car
            </p>

            {/* Box 2: I need a car */}
            <div 
              onClick={() => setCarOwnership('need_car')}
              className="absolute bg-white border border-[#0d0c0c] border-solid left-[1424px] rounded-[10px] size-[25px] top-[680px] cursor-pointer flex items-center justify-center z-10" 
              data-node-id="1:3836"
            >
              {carOwnership === 'need_car' && <span className="text-black font-bold text-base leading-none">✓</span>}
            </div>
            <p 
              onClick={() => setCarOwnership('need_car')}
              className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1472px] text-[#bbbbbb] text-[24px] top-[682px] whitespace-nowrap cursor-pointer select-none z-10" 
              data-node-id="1:3829"
            >
              I need a car
            </p>

            {/* Switch back to Customer sign up */}
            <button
              type="button"
              onClick={() => setIsDriverMode(false)}
              className="absolute left-[1650px] top-[682px] text-xs text-red-600 hover:underline font-semibold cursor-pointer z-20"
            >
              (User mode)
            </button>
          </>
        )}

        {/* ─── Sign up Button (Node 1:2035 / 1:3831, 1:2040 / 1:3837) ─── */}
        <button 
          onClick={handleSignUp}
          className="absolute bg-black border border-[#030303] border-solid h-[65px] left-[1175px] rounded-[30px] top-[729px] w-[557px] cursor-pointer hover:bg-neutral-800 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center z-10" 
          data-node-id="1:2035"
        >
          <p className="font-['Sora'] font-normal leading-[22px] text-[#fffafa] text-[24px] whitespace-nowrap" data-node-id="1:2040">
            {loading ? 'Signing up...' : 'Sign up'}
          </p>
        </button>

        {/* ─── Divider Left Line (Node 1:2043 / 1:3840) ─── */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1134px] top-[831.5px] w-[197px]" data-node-id="1:2043">
          <div className="w-[197px] h-[1px] bg-black/40" />
        </div>

        {/* ─── Divider Text: Or sign up with: (Node 1:2034 / 1:3830) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1346px] text-[#bbbbbb] text-[24px] top-[821px] whitespace-nowrap" 
          data-node-id="1:2034"
        >
          Or sign up with:
        </p>

        {/* ─── Divider Right Line (Node 1:2042 / 1:3839) ─── */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1571px] top-[832px] w-[197px]" data-node-id="1:2042">
          <div className="w-[197px] h-[1px] bg-black/40" />
        </div>

        {/* ─── Sign up with Google Button (Node 1:2036 / 1:3832, 1:2041 / 1:3838, 1:2044 / 1:3841) ─── */}
        <button 
          onClick={handleGoogleSignUp}
          className="absolute bg-white border border-black border-solid h-[65px] left-[1175px] rounded-[30px] top-[883px] w-[557px] cursor-pointer hover:bg-gray-50 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-4 z-10" 
          data-node-id="1:2036"
        >
          <img alt="Google" className="size-[35px] object-contain" src="/images/auth/google.png" data-node-id="1:2044" />
          <p className="font-['Sora'] font-normal leading-[22px] text-[#080808] text-[24px] whitespace-nowrap" data-node-id="1:2041">
            Sign up with Google
          </p>
        </button>

        {/* ─── Footer Link: Already Have An Account? Login Here ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1222px] text-[#807e7e] text-[24px] top-[960px] whitespace-nowrap"
        >
          Already Have An Account?
        </p>
        <Link 
          to="/auth"
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1538px] text-[#0e0d0d] text-[24px] top-[960px] whitespace-nowrap hover:underline font-bold"
        >
          Login Here
        </Link>
      </div>
    </ScaleWrapper>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const imgRectangle8 = "/images/auth/bg.png";
const imgVision = "/images/auth/vision.png";
const imgGoogle = "/images/auth/google.png";
const imgLine3 = "/images/auth/line3.svg";
const imgLine4 = "/images/auth/line4.svg";

/**
 * EXACT Figma Component generated directly from Figma Nodes 1:2018 & 1:3814
 */
export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDriverMode, setIsDriverMode] = useState(searchParams.get('role') === 'driver');
  const [scale, setScale] = useState(1);

  // Customer State (1:2018)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Driver State (1:3814)
  const [drivingLicense, setDrivingLicense] = useState('');
  const [nidNumber, setNidNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [carOwnership, setCarOwnership] = useState('have_car');

  // Shared
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth / 1920);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignUp = (e) => {
    e?.preventDefault?.();
    if (!password) {
      alert('Please enter your password.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (isDriverMode) {
      localStorage.setItem('userRole', 'driver');
    } else {
      localStorage.setItem('userRole', 'user');
    }
    navigate('/home');
  };

  return (
    <div className="w-full bg-black overflow-x-hidden flex justify-center" style={{ height: `${1080 * scale}px` }}>
      <div 
        className="w-[1920px] h-[1080px] relative bg-white flex-shrink-0 select-none font-sora"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left'
        }}
        data-node-id={isDriverMode ? "1:3814" : "1:2018"}
      >
        {/* Background Image (1:2020 / 1:3816) */}
        <div className="absolute h-[1080px] left-0 top-0 w-[1920px]" data-node-id="1:2020">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle8} />
        </div>

        {/* Left Typography (1:2021 / 1:3842) */}
        <div 
          className="[word-break:break-word] absolute font-['Poppins'] font-bold h-[683px] leading-[0] left-[156px] not-italic text-[128px] text-white top-[266px] w-[820px] whitespace-pre-wrap select-none" 
          data-node-id="1:2021"
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

        {/* White Card (1:2022 / 1:3817) */}
        <div className="absolute bg-white h-[908px] left-[1081px] rounded-[20px] top-[86px] w-[745px]" data-node-id="1:2022" />

        {/* ─── CUSTOMER MODE (Node 1:2018) ─── */}
        {!isDriverMode ? (
          <>
            {/* First Name Input (1:2023) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[227px] w-[563px] flex items-center z-10" data-node-id="1:2023">
              <input 
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full h-full bg-transparent px-5 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Last Name Input (1:2024) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1156px] rounded-[13px] top-[309px] w-[563px] flex items-center z-10" data-node-id="1:2024">
              <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full h-full bg-transparent px-5 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Email Input (1:2027) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[390px] w-[563px] flex items-center z-10" data-node-id="1:2027">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full h-full bg-transparent px-5 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbb] focus:outline-none"
              />
            </div>

            {/* Password Input (1:2028) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[474px] w-[563px] flex items-center z-10" data-node-id="1:2028">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input your Password.."
                className="w-full h-full bg-transparent px-5 pr-14 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbb] focus:outline-none"
              />
              <div 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 size-[30px] cursor-pointer" 
                data-name="Vision"
              >
                <img alt="" className={`w-full h-full object-cover pointer-events-none ${showPassword ? 'opacity-40' : 'opacity-100'}`} src={imgVision} />
              </div>
            </div>

            {/* Confirm Password Input (1:2029) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[564px] w-[563px] flex items-center z-10" data-node-id="1:2029">
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your Password.."
                className="w-full h-full bg-transparent px-5 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbb] focus:outline-none"
              />
            </div>

            {/* Checkbox Box (1:2039) */}
            <div 
              onClick={() => setIsDriverMode(true)}
              className="absolute bg-white border border-[#0d0c0c] border-solid left-[1192px] rounded-[10px] size-[25px] top-[680px] cursor-pointer z-10 flex items-center justify-center" 
              data-node-id="1:2039"
            >
              {isDriverMode && <span className="text-black font-bold text-base leading-none">✓</span>}
            </div>

            {/* Want to join as a driver ? (1:2033) */}
            <p 
              onClick={() => setIsDriverMode(true)}
              className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1230px] text-[#bbb] text-[24px] top-[680px] whitespace-pre cursor-pointer hover:text-black transition-colors z-10" 
              data-node-id="1:2033"
            >
              {`Want to join as a driver  ?`}
            </p>

            {/* Heading: Sign Up (1:2037) */}
            <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] right-[557px] text-[48px] text-black top-[153px] translate-x-full whitespace-nowrap z-10" data-node-id="1:2037">
              Sign Up
            </p>
          </>
        ) : (
          /* ─── DRIVER MODE (Node 1:3814) ─── */
          <>
            {/* Driving License (1:3818) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[227px] w-[563px] flex items-center z-10" data-node-id="1:3818">
              <input 
                type="text"
                value={drivingLicense}
                onChange={(e) => setDrivingLicense(e.target.value)}
                placeholder="Driving License"
                className="w-full h-full bg-transparent px-5 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* NID Number (1:3819) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1156px] rounded-[13px] top-[309px] w-[563px] flex items-center z-10" data-node-id="1:3819">
              <input 
                type="text"
                value={nidNumber}
                onChange={(e) => setNidNumber(e.target.value)}
                placeholder="NID Number"
                className="w-full h-full bg-transparent px-5 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Driving experience (1:3822) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[390px] w-[563px] flex items-center z-10" data-node-id="1:3822">
              <input 
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Driving experience"
                className="w-full h-full bg-transparent px-5 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbb] focus:outline-none"
              />
            </div>

            {/* Password Input (1:3823) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[474px] w-[563px] flex items-center z-10" data-node-id="1:3823">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input your Password.."
                className="w-full h-full bg-transparent px-5 pr-14 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbb] focus:outline-none"
              />
              <div 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 size-[30px] cursor-pointer" 
                data-name="Vision"
              >
                <img alt="" className={`w-full h-full object-cover pointer-events-none ${showPassword ? 'opacity-40' : 'opacity-100'}`} src={imgVision} />
              </div>
            </div>

            {/* Confirm Password Input (1:3824) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[564px] w-[563px] flex items-center z-10" data-node-id="1:3824">
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your Password.."
                className="w-full h-full bg-transparent px-5 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbb] focus:outline-none"
              />
            </div>

            {/* Checkbox 1: I have a car (1:3835, 1:3828) */}
            <div 
              onClick={() => setCarOwnership('have_car')}
              className="absolute bg-white border border-[#0d0c0c] border-solid left-[1192px] rounded-[10px] size-[25px] top-[680px] cursor-pointer z-10 flex items-center justify-center" 
              data-node-id="1:3835"
            >
              {carOwnership === 'have_car' && <span className="text-black font-bold text-base leading-none">✓</span>}
            </div>
            <p 
              onClick={() => setCarOwnership('have_car')}
              className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1230px] text-[#bbb] text-[24px] top-[680px] whitespace-nowrap cursor-pointer z-10" 
              data-node-id="1:3828"
            >
              I have a car
            </p>

            {/* Checkbox 2: I need a car (1:3836, 1:3829) */}
            <div 
              onClick={() => setCarOwnership('need_car')}
              className="absolute bg-white border border-[#0d0c0c] border-solid left-[1424px] rounded-[10px] size-[25px] top-[680px] cursor-pointer z-10 flex items-center justify-center" 
              data-node-id="1:3836"
            >
              {carOwnership === 'need_car' && <span className="text-black font-bold text-base leading-none">✓</span>}
            </div>
            <p 
              onClick={() => setCarOwnership('need_car')}
              className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1472px] text-[#bbb] text-[24px] top-[682px] whitespace-nowrap cursor-pointer z-10" 
              data-node-id="1:3829"
            >
              I need a car
            </p>

            {/* User mode switch link */}
            <button
              type="button"
              onClick={() => setIsDriverMode(false)}
              className="absolute left-[1620px] top-[682px] text-xs text-red-600 hover:underline font-semibold cursor-pointer z-20"
            >
              (User mode)
            </button>

            {/* Heading: Sign Up as a driver (1:3833) */}
            <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] right-[709px] text-[48px] text-black top-[151px] translate-x-full whitespace-nowrap z-10" data-node-id="1:3833">
              Sign Up as a driver
            </p>
          </>
        )}

        {/* Sign up Button (1:2035 / 1:3831) */}
        <button 
          onClick={handleSignUp}
          className="absolute bg-black border border-[#030303] border-solid h-[65px] left-[1175px] rounded-[30px] top-[729px] w-[557px] cursor-pointer hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center z-10" 
          data-node-id="1:2035"
        >
          <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#fffafa] text-[24px] whitespace-nowrap" data-node-id="1:2040">
            Sign up
          </p>
        </button>

        {/* Divider Text (1:2034 / 1:3830) */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1346px] text-[#bbb] text-[24px] top-[821px] whitespace-nowrap z-10" data-node-id="1:2034">
          Or sign up with:
        </p>

        {/* Divider Left Line (1:2043 / 1:3840) */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1134px] top-[831.5px] w-[197px]" data-node-id="1:2043">
          <div className="flex-none rotate-[-0.3deg]">
            <div className="h-0 relative w-[197.003px]">
              <div className="absolute inset-[-0.5px_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider Right Line (1:2042 / 1:3839) */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1571px] top-[832px] w-[197px]" data-node-id="1:2042">
          <div className="flex-none rotate-[-0.3deg]">
            <div className="h-0 relative w-[197.003px]">
              <div className="absolute inset-[-0.5px_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine3} />
              </div>
            </div>
          </div>
        </div>

        {/* Sign up with Google Button (1:2036 / 1:3832) */}
        <button 
          onClick={handleSignUp}
          className="absolute bg-white border border-black border-solid h-[65px] left-[1175px] rounded-[30px] top-[883px] w-[557px] cursor-pointer hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center z-10" 
          data-node-id="1:2036"
        >
          <div className="flex items-center gap-4">
            <img alt="" className="size-[35px] object-contain" src={imgGoogle} data-node-id="1:2044" />
            <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#080808] text-[24px] whitespace-nowrap" data-node-id="1:2041">
              Sign up with Google
            </p>
          </div>
        </button>

        {/* Footer Login Link */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1222px] text-[#807e7e] text-[24px] top-[960px] whitespace-nowrap z-10">
          Already Have An Account?
        </p>
        <Link 
          to="/auth"
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1538px] text-[#0e0d0d] text-[24px] top-[960px] whitespace-nowrap hover:underline font-semibold z-10"
        >
          Login Here
        </Link>
      </div>
    </div>
  );
}

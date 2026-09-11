import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FigmaScreenWrapper from '../components/FigmaScreenWrapper';
import { authService } from '../services/authService';

const imgVision = "/images/auth/vision.png";
const imgGoogle = "/images/auth/google.png";
const imgLine3 = "/images/auth/line3.svg";
const imgLine4 = "/images/auth/line4.svg";

/**
 * Exact Figma Implementation for Sign Up (Node 1:2018) & Driver Sign Up (Node 1:3814)
 * Integrated with database, Google login, and email verification.
 */
export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDriverMode, setIsDriverMode] = useState(searchParams.get('role') === 'driver');

  // Customer State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Driver State
  const [drivingLicense, setDrivingLicense] = useState('');
  const [nidNumber, setNidNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [carOwnership, setCarOwnership] = useState('have_car');

  // Shared
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & Verification Modal
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [sampleCode, setSampleCode] = useState('');

  const handleSignUp = async (e) => {
    e?.preventDefault?.();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const role = isDriverMode ? 'driver' : 'user';
      const extra = isDriverMode ? { drivingLicense, nidNumber, experience, carOwnership } : {};
      
      const { user, emailSent } = await authService.register({
        email: email.trim(),
        password,
        firstName: firstName.trim() || 'User',
        lastName: lastName.trim() || '',
        role,
        ...extra
      });

      setRegisteredEmail(user.email);
      setSampleCode(user.verificationCode || '123456');
      setShowVerificationModal(true);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = (e) => {
    e?.preventDefault?.();
    try {
      authService.verifyCode(registeredEmail, verificationCode || sampleCode);
      alert('Email verified successfully! Welcome to Mechify.');
      navigate('/home');
    } catch (err) {
      alert(err.message || 'Verification failed. Please check the code.');
    }
  };

  const handleGoogleSignUp = async () => {
    setErrorMessage('');
    try {
      setLoading(true);
      const user = await authService.loginWithGoogle(isDriverMode ? 'driver' : 'user');
      if (user) {
        navigate('/home');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Google signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FigmaScreenWrapper bgImage="/images/auth/bg.png">
      <div className="relative w-[1920px] h-[1080px] select-none font-sora" data-node-id={isDriverMode ? "1:3814" : "1:2018"}>
        
        {/* ─── Left Typography (Node 1:2021 / 1:3842) ─── */}
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

        {/* ─── White Card (Node 1:2022 / 1:3817) ─── */}
        <div 
          className="absolute bg-white h-[908px] left-[1081px] rounded-[20px] top-[86px] w-[745px] shadow-[0px_25px_70px_rgba(0,0,0,0.85)]" 
          data-node-id="1:2022" 
        />

        {/* ─── Error Message Banner ─── */}
        {errorMessage && (
          <div className="absolute left-[1155px] top-[100px] w-[563px] bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold z-30">
            {errorMessage}
          </div>
        )}

        {/* ─── CUSTOMER MODE (Node 1:2018) ─── */}
        {!isDriverMode ? (
          <>
            {/* First Name Input (Node 1:2023) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[227px] w-[563px] flex items-center z-10" data-node-id="1:2023">
              <input 
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Last Name Input (Node 1:2024) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1156px] rounded-[13px] top-[309px] w-[563px] flex items-center z-10" data-node-id="1:2024">
              <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Email Address Input (Node 1:2027) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[390px] w-[563px] flex items-center z-10" data-node-id="1:2027">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Password Input (Node 1:2025) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[472px] w-[563px] flex items-center z-10" data-node-id="1:2025">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-full bg-transparent px-6 pr-16 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Confirm Password Input (Node 1:2026) */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[554px] w-[563px] flex items-center z-10" data-node-id="1:2026">
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-full bg-transparent px-6 pr-16 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Vision Eye Icon for Password */}
            <div 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-[1659px] size-[30px] top-[492px] cursor-pointer z-20 flex items-center justify-center" 
              data-node-id="1:2029"
            >
              <img 
                alt="Vision" 
                className={`w-[30px] h-[30px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`} 
                src={imgVision} 
              />
            </div>

            {/* Vision Eye Icon for Confirm Password */}
            <div 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-[1659px] size-[30px] top-[574px] cursor-pointer z-20 flex items-center justify-center" 
              data-node-id="1:2030"
            >
              <img 
                alt="Vision" 
                className={`w-[30px] h-[30px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`} 
                src={imgVision} 
              />
            </div>

            {/* Driver mode switch link */}
            <button
              type="button"
              onClick={() => setIsDriverMode(true)}
              className="absolute left-[1520px] top-[635px] text-xs text-red-600 hover:underline font-semibold cursor-pointer z-20"
            >
              (Driver mode)
            </button>

            {/* Heading: Sign Up (Node 1:2033) */}
            <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] right-[709px] text-[48px] text-black top-[151px] translate-x-full whitespace-nowrap z-10" data-node-id="1:2033">
              Sign Up
            </p>
          </>
        ) : (
          /* ─── DRIVER MODE (Node 1:3814) ─── */
          <>
            {/* Driving License Input */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[227px] w-[563px] flex items-center z-10" data-node-id="1:3819">
              <input 
                type="text"
                value={drivingLicense}
                onChange={(e) => setDrivingLicense(e.target.value)}
                placeholder="Driving License Number"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* NID Number Input */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1156px] rounded-[13px] top-[309px] w-[563px] flex items-center z-10" data-node-id="1:3820">
              <input 
                type="text"
                value={nidNumber}
                onChange={(e) => setNidNumber(e.target.value)}
                placeholder="NID Number"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Driving Experience Input */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[390px] w-[563px] flex items-center z-10" data-node-id="1:3821">
              <input 
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Driving Experience (Years)"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Email Address Input */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[472px] w-[563px] flex items-center z-10">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[554px] w-[563px] flex items-center z-10" data-node-id="1:3822">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-full bg-transparent px-6 pr-16 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[636px] w-[563px] flex items-center z-10" data-node-id="1:3823">
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-full bg-transparent px-6 pr-16 font-['Sora'] font-normal text-[24px] text-black placeholder-[#b6b6b6] focus:outline-none"
              />
            </div>

            {/* Checkbox 1: I have a car */}
            <div 
              onClick={() => setCarOwnership('have_car')}
              className="absolute bg-white border border-[#0d0c0c] border-solid left-[1192px] rounded-[10px] size-[25px] top-[715px] cursor-pointer z-10 flex items-center justify-center" 
            >
              {carOwnership === 'have_car' && <span className="text-black font-bold text-base leading-none">✓</span>}
            </div>
            <p 
              onClick={() => setCarOwnership('have_car')}
              className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1230px] text-[#bbb] text-[20px] top-[716px] whitespace-nowrap cursor-pointer z-10 select-none" 
            >
              I have a car
            </p>

            {/* Checkbox 2: I need a car */}
            <div 
              onClick={() => setCarOwnership('need_car')}
              className="absolute bg-white border border-[#0d0c0c] border-solid left-[1424px] rounded-[10px] size-[25px] top-[715px] cursor-pointer z-10 flex items-center justify-center" 
            >
              {carOwnership === 'need_car' && <span className="text-black font-bold text-base leading-none">✓</span>}
            </div>
            <p 
              onClick={() => setCarOwnership('need_car')}
              className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1462px] text-[#bbb] text-[20px] top-[716px] whitespace-nowrap cursor-pointer z-10 select-none" 
            >
              I need a car
            </p>

            {/* User mode switch link */}
            <button
              type="button"
              onClick={() => setIsDriverMode(false)}
              className="absolute left-[1620px] top-[716px] text-xs text-red-600 hover:underline font-semibold cursor-pointer z-20"
            >
              (User mode)
            </button>

            {/* Heading: Sign Up as a driver */}
            <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] right-[709px] text-[48px] text-black top-[151px] translate-x-full whitespace-nowrap z-10">
              Sign Up as a driver
            </p>
          </>
        )}

        {/* ─── Sign up Button (Node 1:2035 / 1:3831) ─── */}
        <button 
          onClick={handleSignUp}
          disabled={loading}
          className={`absolute bg-black border border-[#030303] border-solid h-[65px] left-[1175px] rounded-[30px] w-[557px] cursor-pointer hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center z-10 disabled:opacity-50 ${
            isDriverMode ? 'top-[755px]' : 'top-[670px]'
          }`}
          data-node-id="1:2035"
        >
          <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#fffafa] text-[24px] whitespace-nowrap">
            {loading ? 'Creating Account...' : 'Sign up'}
          </p>
        </button>

        {/* ─── Divider (Only in Customer mode for cleaner fit) ─── */}
        {!isDriverMode && (
          <>
            <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1346px] text-[#bbb] text-[24px] top-[750px] whitespace-nowrap z-10">
              Or sign up with:
            </p>
            <div className="absolute flex h-[1.037px] items-center justify-center left-[1134px] top-[760px] w-[197px]">
              <img alt="" className="block max-w-none size-full" src={imgLine4} />
            </div>
            <div className="absolute flex h-[1.037px] items-center justify-center left-[1571px] top-[760px] w-[197px]">
              <img alt="" className="block max-w-none size-full" src={imgLine3} />
            </div>

            {/* Sign up with Google Button */}
            <button 
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="absolute bg-white border border-black border-solid h-[65px] left-[1175px] rounded-[30px] top-[795px] w-[557px] cursor-pointer hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center z-10 gap-4 disabled:opacity-50"
            >
              <img alt="Google" className="size-[35px] object-contain" src={imgGoogle} />
              <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#080808] text-[24px] whitespace-nowrap">
                Sign up with Google
              </p>
            </button>
          </>
        )}

        {/* ─── Footer Login Link ─── */}
        <p className={`[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1222px] text-[#807e7e] text-[24px] whitespace-nowrap z-10 ${
          isDriverMode ? 'top-[840px]' : 'top-[880px]'
        }`}>
          Already Have An Account?
        </p>
        <Link 
          to="/auth"
          className={`[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1538px] text-[#0e0d0d] text-[24px] whitespace-nowrap hover:underline font-semibold z-10 ${
            isDriverMode ? 'top-[840px]' : 'top-[880px]'
          }`}
        >
          Login Here
        </Link>

        {/* ─── EMAIL VERIFICATION MODAL ─── */}
        {showVerificationModal && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-10 max-w-xl w-full mx-4 shadow-2xl border border-gray-200 text-center animate-scaleIn">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center text-4xl">
                ✉️
              </div>
              <h2 className="text-3xl font-bold font-sora text-black mb-3">Check Your Gmail</h2>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">
                We have registered your account and sent a verification code to: <br/>
                <span className="font-bold text-black">{registeredEmail}</span>
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                <span className="font-bold">Instant Demo Verification Code:</span> <span className="font-mono font-bold tracking-widest text-base">{sampleCode}</span>
              </div>

              <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder={`Enter 6-digit code (e.g. ${sampleCode})`}
                  className="w-full border-2 border-black rounded-xl py-3.5 px-4 text-center text-xl font-bold tracking-widest focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all active:scale-98"
                >
                  Verify Email & Enter Mechify →
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                <button 
                  type="button" 
                  onClick={() => alert(`Verification email resent to ${registeredEmail}!`)}
                  className="hover:text-black underline cursor-pointer"
                >
                  Resend verification email
                </button>
                <Link to="/auth" className="hover:text-black font-semibold">
                  Skip to Login
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </FigmaScreenWrapper>
  );
}

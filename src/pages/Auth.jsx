import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FigmaScreenWrapper from '../components/FigmaScreenWrapper';
import { authService } from '../services/authService';

const imgVision = "/images/auth/vision.png";
const imgGoogle = "/images/auth/google.png";
const imgLine3 = "/images/auth/line3.svg";
const imgLine4 = "/images/auth/line4.svg";

/**
 * Exact Figma Implementation for Login (Node 1:1104) with direct Email input and 2 quick Gmail buttons
 */
export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectQuickAccount = (accountEmail, defaultRole) => {
    setEmail(accountEmail);
    setPassword('123');
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    setErrorMessage('');
    const finalEmail = (email || '').trim();
    if (!finalEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    try {
      setLoading(true);
      const user = await authService.login(finalEmail, password);
      const role = localStorage.getItem('userRole');
      if (role === 'workshop_owner' || finalEmail.toLowerCase().includes('workshop')) {
        navigate('/workshop-dashboard');
      } else if (role === 'supplier' || finalEmail.toLowerCase().includes('supplier')) {
        navigate('/supplier-dashboard');
      } else if (role === 'driver' || finalEmail.toLowerCase().includes('driver')) {
        navigate('/driver-dashboard');
      } else if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate('/home');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    try {
      setLoading(true);
      const user = await authService.loginWithGoogle('user');
      if (user) {
        const role = localStorage.getItem('userRole');
        const userEmail = (user.email || '').toLowerCase();
        if (role === 'workshop_owner' || userEmail.includes('workshop')) {
          navigate('/workshop-dashboard');
        } else if (role === 'driver' || userEmail.includes('driver')) {
          navigate('/driver-dashboard');
        } else if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate('/home');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Google sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FigmaScreenWrapper bgImage="/images/auth/bg.png">
      <div className="relative w-[1920px] h-[1080px] select-none font-sora" data-node-id="1:1104">
        
        {/* ─── Left Typography: Start Your Journey with Mechify (Node 1:1107) ─── */}
        <div 
          className="[word-break:break-word] absolute font-['Poppins'] font-bold h-[683px] leading-[0] left-[156px] not-italic text-[128px] text-white top-[266px] w-[820px] whitespace-pre-wrap select-none" 
          data-node-id="1:1107"
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

        {/* ─── White Card (Node 1:1108) ─── */}
        <div 
          className="absolute bg-white h-[908px] left-[1081px] rounded-[20px] top-[86px] w-[745px] shadow-[0px_25px_70px_rgba(0,0,0,0.85)]" 
          data-node-id="1:1108" 
        />

        {/* ─── Title: Welcome Back! (Node 1:1118) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] right-[679px] text-[48px] text-black top-[143px] translate-x-full whitespace-nowrap z-10" 
          data-node-id="1:1118"
        >
          Welcome Back!
        </p>

        {/* ─── Error Message Banner ─── */}
        {errorMessage && (
          <div className="absolute left-[1155px] top-[195px] w-[563px] bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold z-20">
            {errorMessage}
          </div>
        )}

        {/* ─── Service Redirect Banner ─── */}
        {redirectUrl && !errorMessage && (
          <div className="absolute left-[1155px] top-[192px] w-[563px] bg-red-50 border border-red-200 text-[#cc0000] px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 z-20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#cc0000] animate-pulse shrink-0" />
            Please sign in first to access Mechify services.
          </div>
        )}

        {/* ─── Email Label (Node 1:1119) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1155px] text-[20px] text-black top-[230px] whitespace-nowrap z-10" 
          data-node-id="1:1119"
        >
          Email
        </p>

        {/* ─── Standard Email Input Box (No Dropdown) ─── */}
        <div 
          className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[260px] w-[563px] flex items-center z-10" 
          data-node-id="1:1109-email"
        >
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Input your Email.."
            className="w-full h-full bg-transparent px-6 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbbbbb] focus:outline-none"
          />
        </div>

        {/* ─── Direct Quick Account Buttons ─── */}
        <div className="absolute left-[1155px] top-[338px] w-[563px] flex flex-wrap items-center gap-2 z-10">
          <button
            type="button"
            onClick={() => handleSelectQuickAccount('mahi@gmail.com', 'user')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              email.toLowerCase() === 'mahi@gmail.com'
                ? 'bg-black text-white border-black shadow-lg scale-102'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-600" />
            User
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickAccount('driver@gmail.com', 'driver')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              email.toLowerCase() === 'driver@gmail.com'
                ? 'bg-black text-white border-black shadow-lg scale-102'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Driver
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickAccount('supplier@gmail.com', 'supplier')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              email.toLowerCase() === 'supplier@gmail.com'
                ? 'bg-black text-white border-black shadow-lg scale-102'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Supplier
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickAccount('workshop1@gmail.com', 'workshop_owner')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              email.toLowerCase() === 'workshop1@gmail.com'
                ? 'bg-black text-white border-black shadow-lg scale-102'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Workshop (#1)
          </button>
          
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleSelectQuickAccount(e.target.value, 'workshop_owner');
              }
            }}
            value={email.toLowerCase().includes('workshop') ? email.toLowerCase() : ''}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 cursor-pointer focus:outline-none max-w-[170px]"
          >
            <option value="">30 Workshop Demos...</option>
            {Array.from({ length: 30 }).map((_, i) => (
              <option key={i} value={`workshop${i + 1}@gmail.com`}>
                Workshop #{i + 1} ({`workshop${i + 1}@gmail.com`})
              </option>
            ))}
          </select>
        </div>

        {/* ─── Password Label (Node 1:1120) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1155px] text-[20px] text-black top-[395px] whitespace-nowrap z-10" 
          data-node-id="1:1120"
        >
          Password
        </p>

        {/* ─── Password Input Box (Node 1:1109) ─── */}
        <div 
          className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[425px] w-[563px] flex items-center z-10" 
          data-node-id="1:1109"
        >
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input your Password.."
            className="w-full h-full bg-transparent px-6 pr-16 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbbbbb] focus:outline-none"
          />
        </div>

        {/* ─── Vision Eye Icon (Node 1:1121) ─── */}
        <div 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-[1659px] size-[30px] top-[445px] cursor-pointer z-20 flex items-center justify-center" 
          data-node-id="1:1121" 
          data-name="Vision"
        >
          <img 
            alt="Vision" 
            className={`w-[30px] h-[30px] object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-100'}`} 
            src={imgVision} 
          />
        </div>

        {/* ─── Checkbox Box (Node 1:1122) ─── */}
        <div 
          onClick={() => setRememberMe(!rememberMe)}
          className="absolute bg-white border border-[#0d0c0c] border-solid left-[1165px] rounded-[10px] size-[25px] top-[515px] cursor-pointer z-10 flex items-center justify-center" 
          data-node-id="1:1122" 
        >
          {rememberMe && <span className="text-black font-bold text-base leading-none">✓</span>}
        </div>

        {/* ─── Remember Me Text (Node 1:1111) ─── */}
        <p 
          onClick={() => setRememberMe(!rememberMe)}
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1194px] text-[#bbbbbb] text-[22px] top-[517px] whitespace-nowrap cursor-pointer z-10 select-none" 
          data-node-id="1:1111"
        >
          Remember Me
        </p>

        {/* ─── Forget password? (Node 1:1115) ─── */}
        <p 
          onClick={() => alert('Password reset instructions sent to your email.')}
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1500px] text-[#bbbbbb] text-[22px] top-[516px] whitespace-nowrap cursor-pointer hover:text-black transition-colors z-10 select-none" 
          data-node-id="1:1115"
        >
          Forget password?
        </p>

        {/* ─── Login Button (Node 1:1116, 1:1123) ─── */}
        <button 
          onClick={handleLogin}
          disabled={loading}
          className="absolute bg-black border border-[#030303] border-solid h-[65px] left-[1162px] rounded-[30px] top-[565px] w-[557px] cursor-pointer hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center z-10 disabled:opacity-50" 
          data-node-id="1:1116"
        >
          <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#fffafa] text-[24px] whitespace-nowrap" data-node-id="1:1123">
            {loading ? 'Logging in...' : 'Login'}
          </p>
        </button>

        {/* ─── Divider Left Line (Node 1:1126) ─── */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1134px] top-[675px] w-[197px]" data-node-id="1:1126">
          <div className="flex-none rotate-[-0.3deg]">
            <div className="h-0 relative w-[197.003px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Divider Text: Or continue with: (Node 1:1112) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1336px] text-[#bbbbbb] text-[24px] top-[662px] whitespace-nowrap z-10" 
          data-node-id="1:1112"
        >
          Or continue with:
        </p>

        {/* ─── Divider Right Line (Node 1:1125) ─── */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1555.5px] top-[673.54px] w-[197px]" data-node-id="1:1125">
          <div className="flex-none rotate-[-0.3deg]">
            <div className="h-0 relative w-[197.003px]">
              <div className="absolute inset-[-0.5px_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine3} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Continue with Google Button (Node 1:1117, 1:1127, 1:1124) ─── */}
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="absolute bg-white border border-black border-solid h-[65px] left-[1175px] rounded-[30px] top-[730px] w-[557px] cursor-pointer hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center z-10 gap-4 disabled:opacity-50" 
          data-node-id="1:1117"
        >
          <img alt="Google" className="size-[35px] object-contain" src={imgGoogle} data-node-id="1:1127" />
          <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#080808] text-[24px] whitespace-nowrap" data-node-id="1:1124">
            Continue with Google
          </p>
        </button>

        {/* ─── Footer Text (Node 1:1113, 1:1114) ─── */}
        <p 
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1222px] text-[#807e7e] text-[24px] top-[835px] whitespace-nowrap z-10" 
          data-node-id="1:1113"
        >
          Don’t Have An Account?
        </p>
        <Link 
          to="/register"
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1528px] text-[#0e0d0d] text-[24px] top-[835px] whitespace-nowrap hover:underline font-bold z-10" 
          data-node-id="1:1114"
        >
          Sign Up Here
        </Link>
      </div>
    </FigmaScreenWrapper>
  );
}

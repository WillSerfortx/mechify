import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const imgRectangle8 = "/images/auth/bg.png";
const imgVision = "/images/auth/vision.png";
const imgGoogle = "/images/auth/google.png";
const imgLine3 = "/images/auth/line3.svg";
const imgLine4 = "/images/auth/line4.svg";

/**
 * EXACT Figma Component generated directly from Figma Node 1:1104
 */
export default function Auth() {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth / 1920);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e) => {
    e?.preventDefault?.();
    const finalEmail = email || (selectedProfile.includes('driver') ? 'driver@gmail.com' : 'mahi@gmail.com');
    if (finalEmail === 'driver@gmail.com') {
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
        data-node-id="1:1104"
      >
        {/* Background (1:1106) */}
        <div className="absolute h-[1080px] left-0 top-0 w-[1920px]" data-node-id="1:1106">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle8} />
        </div>

        {/* Left Typography: Start Your Journey with Mechify (1:1107) */}
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

        {/* White Card (1:1108) */}
        <div className="absolute bg-white h-[908px] left-[1081px] rounded-[20px] top-[86px] w-[745px]" data-node-id="1:1108" />

        {/* Password Input Box (1:1109) */}
        <div className="absolute bg-white border border-black border-solid h-[71px] left-[1155px] rounded-[13px] top-[390px] w-[563px] flex items-center z-10" data-node-id="1:1109">
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input your Password.."
            className="w-full h-full bg-transparent px-5 pr-14 font-['Sora'] font-normal text-[24px] text-black placeholder-[#bbb] focus:outline-none"
          />
        </div>

        {/* Remember Me Text (1:1111) */}
        <p 
          onClick={() => setRememberMe(!rememberMe)}
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1194px] text-[#bbb] text-[24px] top-[502px] whitespace-nowrap cursor-pointer z-10" 
          data-node-id="1:1111"
        >
          Remember Me
        </p>

        {/* Divider Text (1:1112) */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1336px] text-[#bbb] text-[24px] top-[681px] whitespace-nowrap z-10" data-node-id="1:1112">
          Or continue with:
        </p>

        {/* Don't Have An Account? (1:1113) */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1222px] text-[#807e7e] text-[24px] top-[852px] whitespace-nowrap z-10" data-node-id="1:1113">
          Don’t Have An Account?
        </p>

        {/* Sign Up Here (1:1114) */}
        <Link 
          to="/register"
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1528px] text-[#0e0d0d] text-[24px] top-[852px] whitespace-nowrap hover:underline font-semibold z-10" 
          data-node-id="1:1114"
        >
          Sign Up Here
        </Link>

        {/* Forget password? (1:1115) */}
        <p 
          onClick={() => alert('Password reset link sent to your email.')}
          className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1500px] text-[#bbb] text-[24px] top-[501px] whitespace-nowrap cursor-pointer hover:text-black transition-colors z-10" 
          data-node-id="1:1115"
        >
          Forget password?
        </p>

        {/* Login Button (1:1116) */}
        <button 
          onClick={handleLogin}
          className="absolute bg-black border border-[#030303] border-solid h-[65px] left-[1162px] rounded-[30px] top-[553px] w-[557px] cursor-pointer hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center z-10" 
          data-node-id="1:1116"
        >
          <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#fffafa] text-[24px] whitespace-nowrap" data-node-id="1:1123">
            Login
          </p>
        </button>

        {/* Continue with Google Button (1:1117) */}
        <button 
          onClick={handleLogin}
          className="absolute bg-white border border-black border-solid h-[65px] left-[1175px] rounded-[30px] top-[756px] w-[557px] cursor-pointer hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center z-10" 
          data-node-id="1:1117"
        >
          <div className="flex items-center gap-4">
            <img alt="" className="size-[35px] object-contain" src={imgGoogle} data-node-id="1:1127" />
            <p className="[word-break:break-word] font-['Sora'] font-normal leading-[22px] text-[#080808] text-[24px] whitespace-nowrap" data-node-id="1:1124">
              Continue with Google
            </p>
          </div>
        </button>

        {/* Welcome Back! Title (1:1118) */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-semibold leading-[22px] right-[679px] text-[48px] text-black top-[143px] translate-x-full whitespace-nowrap z-10" data-node-id="1:1118">
          Welcome Back!
        </p>

        {/* Email Label (1:1119) */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1155px] text-[20px] text-black top-[228px] whitespace-nowrap z-10" data-node-id="1:1119">
          Email
        </p>

        {/* Password Label (1:1120) */}
        <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[22px] left-[1155px] text-[20px] text-black top-[355px] whitespace-nowrap z-10" data-node-id="1:1120">
          Password
        </p>

        {/* Vision Eye Icon (1:1121) */}
        <div 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-[1659px] size-[30px] top-[409px] cursor-pointer z-20" 
          data-node-id="1:1121" 
          data-name="Vision"
        >
          <img alt="" className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full ${showPassword ? 'opacity-40' : 'opacity-100'}`} src={imgVision} />
        </div>

        {/* Checkbox Box (1:1122) */}
        <div 
          onClick={() => setRememberMe(!rememberMe)}
          className="absolute bg-white border border-[#0d0c0c] border-solid left-[1165px] rounded-[10px] size-[25px] top-[500px] cursor-pointer z-10 flex items-center justify-center" 
          data-node-id="1:1122" 
        >
          {rememberMe && <span className="text-black font-bold text-base leading-none">✓</span>}
        </div>

        {/* Divider Left Line (1:1126) */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1134px] top-[694px] w-[197px]" data-node-id="1:1126">
          <div className="flex-none rotate-[-0.3deg]">
            <div className="h-0 relative w-[197.003px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine4} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider Right Line (1:1125) */}
        <div className="absolute flex h-[1.037px] items-center justify-center left-[1555.5px] top-[692.54px] w-[197px]" data-node-id="1:1125">
          <div className="flex-none rotate-[-0.3deg]">
            <div className="h-0 relative w-[197.003px]">
              <div className="absolute inset-[-0.5px_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine3} />
              </div>
            </div>
          </div>
        </div>

        {/* Choose your Profile (1:3024) */}
        <div className="absolute left-[1156px] top-[264px] w-[563px] h-[71px] z-20">
          <button 
            type="button"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="w-full h-full bg-white border border-black border-solid cursor-pointer rounded-[10px] overflow-clip relative flex items-center"
            data-node-id="1:3024"
          >
            <p className="[word-break:break-word] absolute font-['Sora'] font-normal leading-[normal] left-[40px] text-[36px] text-black text-left top-[12px] whitespace-nowrap">
              {selectedProfile || email || 'Choose your Profile'}
            </p>
          </button>

          {showProfileDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black rounded-xl shadow-2xl z-50 overflow-hidden">
              <div
                onClick={() => { setSelectedProfile('mahi@gmail.com'); setEmail('mahi@gmail.com'); setShowProfileDropdown(false); }}
                className="px-6 py-4 hover:bg-gray-100 cursor-pointer text-2xl text-black border-b border-gray-200 font-['Sora']"
              >
                👤 Regular User (mahi@gmail.com)
              </div>
              <div
                onClick={() => { setSelectedProfile('driver@gmail.com'); setEmail('driver@gmail.com'); setShowProfileDropdown(false); }}
                className="px-6 py-4 hover:bg-gray-100 cursor-pointer text-2xl text-black border-b border-gray-200 font-['Sora']"
              >
                🚗 Verified Driver (driver@gmail.com)
              </div>
              <div className="p-4 bg-gray-50">
                <input
                  type="email"
                  placeholder="Or enter custom email..."
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSelectedProfile(''); }}
                  className="w-full bg-white border border-gray-400 rounded-lg px-4 py-2.5 text-xl text-black focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </div>

        {/* Back Button (1:1129) */}
        <div 
          onClick={() => navigate(-1)}
          className="absolute border-10 border-solid border-white left-0 size-[90px] top-0 cursor-pointer z-30 flex items-center justify-center bg-black/40 hover:bg-black/70 transition-colors" 
          data-node-id="1:1129" 
          data-name="Back"
        >
          <span className="text-white text-5xl font-bold">‹</span>
        </div>
      </div>
    </div>
  );
}

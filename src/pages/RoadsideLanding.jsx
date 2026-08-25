import { useNavigate } from 'react-router-dom';
import ScaleWrapper from '../components/ScaleWrapper';

export default function RoadsideLanding() {
  const navigate = useNavigate();

  return (
    <ScaleWrapper height={3500}>
      {/* 1:995 - Hero Image Box */}
      <div className="absolute h-[870px] left-[110px] rounded-[50px] shadow-[0px_4px_30px_10px_white] top-[133px] w-[1700px]">
        <img alt="Hero" className="absolute inset-0 max-w-none object-cover opacity-50 pointer-events-none rounded-[50px] w-full h-full" src="/images/roadside/hero.png" />
      </div>

      {/* 1:996 - Hero Title */}
      <p className="absolute font-['Sora'] font-extrabold left-[197px] text-[64px] text-white top-[527px] whitespace-nowrap z-10">
        Vehicle Recovery Services Across Bangladesh
      </p>

      {/* 1:1015 - Hero Subtitle */}
      <div className="-translate-x-1/2 absolute font-['Sora'] font-extrabold left-[959.5px] text-[24px] text-center text-white top-[629px] whitespace-nowrap z-10 leading-snug">
        <p className="mb-0">Get back on the road quickly and safely with MI Recovery Service – your reliable support in fast jump starts and</p>
        <p className="mb-0">emergency vehicle recovery services. Never let breakdowns break you with our on-the-go transportation</p>
        <p>solutions and emergency fuel delivery.</p>
      </div>

      {/* 1:1004 - Service Button */}
      <button 
        onClick={() => navigate('/roadside-request')}
        className="absolute bg-[#fd0000] h-[56px] left-[839px] rounded-[40px] top-[810px] w-[242px] z-20 hover:bg-red-700 transition-colors flex items-center justify-center cursor-pointer"
      >
        <span className="font-['Sora'] font-semibold text-[36px] text-white">
          Service
        </span>
      </button>

      {/* 1:997 - 3 Pills Container */}
      <div className="absolute bg-black h-[141px] left-[90px] overflow-hidden top-[1123px] w-[1720px] flex items-center justify-between px-[34px]">
        {/* Pill 1 */}
        <div className="bg-[#fd0000] h-[111px] rounded-[20px] w-[536px] flex items-center justify-center">
          <span className="font-['Sora'] font-semibold text-[36px] text-white">Less than 30 min arrival</span>
        </div>
        {/* Pill 2 */}
        <div className="bg-[#020202] border-[10px] border-solid border-white h-[111px] rounded-[20px] w-[536px] flex items-center justify-center box-border">
          <span className="font-['Sora'] font-semibold text-[36px] text-white">Get Service</span>
        </div>
        {/* Pill 3 */}
        <div className="bg-[#fd0000] h-[111px] rounded-[20px] w-[536px] flex items-center justify-center">
          <span className="font-['Sora'] font-semibold text-[36px] text-white">Live 24/7 trackable service</span>
        </div>
      </div>

      {/* 1:1023 - Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute border-[10px] border-solid border-white left-0 size-[90px] top-[1489px] flex items-center justify-center hover:bg-white/10 transition-colors z-20 shadow-[inset_200px_200px_0px_0px_white]"
      >
        <svg className="w-[50px] h-[50px] text-black mix-blend-difference" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 1:1007 - Our Mission Title */}
      <p className="-translate-x-1/2 absolute font-['Sora'] font-bold left-[959px] text-[96px] text-center text-white top-[1413px] whitespace-nowrap">
        Our Mission
      </p>

      {/* 1:1008 - Our Mission Text */}
      <div className="-translate-x-1/2 absolute font-['Sora'] font-normal left-[967.5px] text-[32px] text-center text-white top-[1574px] whitespace-nowrap leading-snug">
        <p className="mb-0">At Swift Vehicle Recovery, we are dedicated to delivering reliable</p>
        <p className="mb-0">towing services and roadside assistance throughout the UK. Our mission is to ensure that our</p>
        <p className="mb-0">customers receive prompt vehicle</p>
        <p className="mb-0">recovery support whenever they need it, with a strong emphasis on</p>
        <p>customer satisfaction.</p>
      </div>

      {/* 1:1010 - Our journey Title */}
      <p className="-translate-x-1/2 absolute font-['Sora'] font-semibold left-[669px] text-[48px] text-center text-white top-[1999px] whitespace-nowrap">
        Our journey through the towing Bangladesh
      </p>

      {/* 1:1011 - Underline SVGs */}
      <div className="absolute flex h-px items-center justify-center left-[131px] top-[2075.5px] w-[930px] border-b-[2px] border-white"></div>

      {/* Journey Image 1 - Left */}
      <div className="absolute h-[331px] left-[99px] shadow-[0px_4px_50px_20px_rgba(255,255,255,0.7)] top-[2171px] w-[497px] rounded-[15px] overflow-hidden">
        <img alt="Journey 1" className="absolute inset-0 max-w-none object-cover size-full hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1562096659-92ebd91f4e47?w=600&h=400&fit=crop" />
      </div>

      {/* Journey Image 2 - Center (With white box behind it) */}
      <div className="absolute bg-black border-[5px] border-solid border-white h-[294px] left-[695px] rounded-[40px] top-[2191px] w-[415px]" />
      <div className="absolute h-[249px] left-[715px] rounded-[15px] top-[2212px] w-[374px] overflow-hidden">
        <img alt="Journey 2" className="absolute inset-0 max-w-none object-cover size-full hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop" />
      </div>

      {/* Journey Image 3 - Right (With thick white box behind it) */}
      <div className="absolute bg-black border-[10px] border-solid border-white h-[469px] left-[1186px] rounded-[40px] top-[2106px] w-[658px]" />
      <div className="absolute h-[398px] left-[1219px] rounded-[15px] top-[2139px] w-[597px] overflow-hidden">
        <img alt="Journey 3" className="absolute inset-0 max-w-none object-cover size-full hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop" />
      </div>

      {/* 1:1006 - Map Background box */}
      <div className="absolute h-[479px] left-[131px] rounded-[20px] shadow-[0px_4px_40px_15px_rgba(255,255,255,0.7)] top-[2688px] w-[1673px] overflow-hidden bg-white/5">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.82238462916!2d90.25487583581408!3d23.780887456676858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5bcc6c2a!2sDhaka!5e0!3m2!1sen!2sbd!4v1693000000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* 1:1017 - Get Directions button */}
      <a 
        href="https://www.google.com/maps/dir/?api=1&destination=23.7808,90.4125"
        target="_blank" rel="noopener noreferrer"
        className="absolute bg-[#fd0000] h-[49px] left-[165px] rounded-[40px] top-[2719px] w-[252px] z-20 flex items-center justify-center hover:bg-red-700 transition-colors"
      >
        <span className="absolute left-[25px] top-[12px] text-white">⚠</span>
        <span className="font-['Sora'] font-extrabold text-[24px] text-white pl-4">Get Directions</span>
      </a>

      {/* 1:1020 - Share Location button */}
      <button 
        onClick={() => {}}
        className="absolute bg-[#fd0000] h-[49px] left-[637px] rounded-[40px] top-[3282px] w-[645px] z-20 flex items-center justify-center hover:bg-red-700 transition-colors"
      >
        <span className="font-['Sora'] font-extrabold text-[24px] text-white">Share your Live location</span>
      </button>

    </ScaleWrapper>
  );
}

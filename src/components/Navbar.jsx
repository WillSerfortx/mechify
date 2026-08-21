import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  const handleSOS = () => {
    setSosActive(true);
    alert('🚨 SOS Emergency Activated!\nMechify Emergency Response Team notified.\nETA: 12 minutes. Stay calm, help is coming!');
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-black/70 backdrop-blur-sm'
    }`}>
      <div className="max-w-[1920px] mx-auto flex items-center justify-between px-6 md:px-12 py-3">

        {/* ── Logo — matches Figma red M + truck ── */}
        <Link to="/landing" className="flex items-center gap-3 group">
          {/* Red M with truck SVG */}
          <div className="relative">
            <svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background red shape */}
              <rect width="56" height="48" rx="4" fill="#CC0000"/>
              {/* M letter */}
              <text x="4" y="34" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="32" fill="white">M</text>
              {/* Tiny truck icon at bottom right */}
              <g transform="translate(32,30) scale(0.55)">
                <rect x="0" y="4" width="28" height="14" rx="2" fill="white"/>
                <rect x="22" y="0" width="10" height="18" rx="2" fill="white"/>
                <circle cx="6" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                <circle cx="24" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
              </g>
            </svg>
          </div>
          <div className="leading-tight">
            <div className="text-white font-black text-xl tracking-widest">MECHIFY</div>
            <div className="text-gray-400 text-[9px] tracking-[0.2em] uppercase">Vehicle Support</div>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {[
            { path: '/home', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-semibold text-base lg:text-lg transition-all duration-300 relative group pb-1 ${
                isActive(path) ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </nav>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-3">
          {/* Profile / Dashboard button */}
          <Link
            to="/profile"
            className="flex items-center justify-center w-12 h-12 bg-white/10 border-2 border-white/20 rounded-full text-2xl transition-all duration-300 hover:bg-white/30 hover:border-white hover:scale-110 active:scale-95 animate-bounce"
            style={{ animationDuration: '3s' }}
            title="Dashboard"
          >
            🧑
          </Link>



          {/* Mobile toggle */}
          <button
            className="md:hidden text-white text-2xl p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-xl absolute top-full left-0 w-full border-t border-white/10 flex flex-col p-6 gap-5 shadow-2xl animate-slideDown">
          {[
            { path: '/home', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-bold text-xl py-2 border-b border-white/10 ${isActive(path) ? 'text-white' : 'text-gray-300'}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/profile" className="bg-white/10 text-white text-center rounded-full py-4 text-3xl mt-4 flex items-center justify-center transition-colors hover:bg-white/20">
            <span className="animate-bounce" style={{ animationDuration: '3s' }}>🧑</span>
          </Link>
        </div>
      )}
    </header>
  );
}

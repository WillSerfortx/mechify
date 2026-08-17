import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import imgLogo from '../assets/react.svg';

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
    alert('🚨 SOS Emergency Activated!\nMechify Emergency Team has been notified.\nHelp is on the way!');
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 shadow-lg shadow-black/50 backdrop-blur-md border-b border-white/5' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-[1920px] mx-auto flex items-center justify-between px-4 md:px-10 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:shadow-red-600/60 transition-shadow duration-300">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <span className="text-white font-black text-2xl tracking-tight hidden sm:block">
            Mech<span className="text-red-500">ify</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/services', label: 'Services' },
            { path: '/idriver', label: 'iDriver' },
            { path: '/contact', label: 'Contact' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-semibold text-base lg:text-lg transition-all duration-300 relative group ${
                isActive(path) ? 'text-red-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              {label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Sign Out Button */}
          <Link
            to="/profile"
            className="hidden md:flex items-center gap-2 border-2 border-white/30 rounded-full px-5 py-2 text-white font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Sign Out
          </Link>

          {/* SOS Button */}
          <button
            id="sos-button"
            onClick={handleSOS}
            className={`relative flex items-center justify-center w-12 h-12 rounded-full font-black text-white text-xs tracking-widest transition-all duration-300 ${
              sosActive ? 'bg-red-800 scale-90' : 'bg-red-600 hover:bg-red-700 hover:scale-110'
            } animate-sosPulse sos-ring`}
            title="SOS Emergency"
          >
            SOS
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white text-2xl p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-xl absolute top-full left-0 w-full border-t border-white/10 flex flex-col p-6 gap-5 shadow-2xl animate-slideDown">
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/services', label: 'Services' },
            { path: '/idriver', label: 'iDriver' },
            { path: '/contact', label: 'Contact' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-bold text-xl py-2 border-b border-white/10 ${isActive(path) ? 'text-red-400' : 'text-gray-200'}`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/profile"
            className="bg-white text-black text-center rounded-full px-6 py-3 font-bold text-lg mt-2 hover:bg-gray-100 transition-colors"
          >
            Sign Out
          </Link>
        </div>
      )}
    </header>
  );
}

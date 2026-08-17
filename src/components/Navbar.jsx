import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const imgLogo = "https://placehold.co/120x96/111/fff?text=Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-lg shadow-black/50 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-[1920px] mx-auto flex items-center justify-between px-6 md:px-12 py-3">
        <Link to="/" className="flex items-center">
          <div className="w-24 h-16 md:w-32 md:h-20 overflow-hidden bg-white/5 rounded-lg p-2">
            <img src={imgLogo} alt="Mechify Logo" className="w-full h-full object-contain" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <Link to="/" className={`font-semibold text-lg lg:text-xl transition-all duration-300 hover:text-red-500 hover:-translate-y-1 ${isActive('/') ? 'text-white border-b-2 border-red-500' : 'text-gray-300 border-b-2 border-transparent'}`}>Home</Link>
          <Link to="/about" className={`font-semibold text-lg lg:text-xl transition-all duration-300 hover:text-red-500 hover:-translate-y-1 ${isActive('/about') ? 'text-white border-b-2 border-red-500' : 'text-gray-300 border-b-2 border-transparent'}`}>About</Link>
          <Link to="/services" className={`font-semibold text-lg lg:text-xl transition-all duration-300 hover:text-red-500 hover:-translate-y-1 ${isActive('/services') ? 'text-white border-b-2 border-red-500' : 'text-gray-300 border-b-2 border-transparent'}`}>Services</Link>
          <Link to="/contact" className={`font-semibold text-lg lg:text-xl transition-all duration-300 hover:text-red-500 hover:-translate-y-1 ${isActive('/contact') ? 'text-white border-b-2 border-red-500' : 'text-gray-300 border-b-2 border-transparent'}`}>Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/profile" className="border-2 border-white rounded-full px-8 py-2 text-white font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 active:scale-95">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white text-3xl p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg absolute top-full left-0 w-full border-t border-white/10 flex flex-col p-6 gap-6 shadow-xl animate-slideDown">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`font-semibold text-xl ${isActive('/') ? 'text-white' : 'text-gray-300'}`}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`font-semibold text-xl ${isActive('/about') ? 'text-white' : 'text-gray-300'}`}>About</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)} className={`font-semibold text-xl ${isActive('/services') ? 'text-white' : 'text-gray-300'}`}>Services</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`font-semibold text-xl ${isActive('/contact') ? 'text-white' : 'text-gray-300'}`}>Contact</Link>
          <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="bg-white text-black text-center rounded-full px-6 py-3 font-bold text-xl mt-4">
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}

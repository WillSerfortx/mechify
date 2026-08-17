import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12 lg:px-20 border-t border-white/10 font-outfit">
      <div className="max-w-[1400px] mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8 border-b border-white/10 pb-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-black mb-3">Signup for Newsletter</h2>
            <p className="text-gray-400 text-sm">
              We may send you information about new cars related events, webinars, news and services which we believe
            </p>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent border-b border-gray-600 px-2 py-2 focus:outline-none focus:border-red-500 transition-colors w-full sm:w-64 text-sm"
            />
            <button className="border border-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-white hover:text-black transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <svg width="42" height="36" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="48" rx="4" fill="#CC0000"/>
                <text x="4" y="34" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="32" fill="white">M</text>
                <g transform="translate(32,30) scale(0.55)">
                  <rect x="0" y="4" width="28" height="14" rx="2" fill="white"/>
                  <rect x="22" y="0" width="10" height="18" rx="2" fill="white"/>
                  <circle cx="6" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                  <circle cx="24" cy="20" r="3.5" fill="#CC0000" stroke="white" strokeWidth="1.5"/>
                </g>
              </svg>
              <div className="leading-tight">
                <div className="text-white font-black text-lg tracking-widest">MECHIFY</div>
                <div className="text-gray-400 text-[8px] tracking-[0.2em] uppercase">Vehicle Support</div>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span> Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Home', 'About Us', 'Cars', 'Sell', 'Rentals', 'Careers', 'Contact'].map((link) => (
                <li key={link}><Link to="#" className="hover:text-white transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span> Brands
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Ferrari In Dubai', 'Mercedes In Dubai', 'Rolls-Royce In Dubai', 'Porsche In Dubai', 'Lamborghini In Dubai'].map((link) => (
                <li key={link}><Link to="#" className="hover:text-white transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span> Information
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Meet', 'Showroom Virtual Tour', 'Sold Cars', 'Privacy Policy', 'Terms & Conditions', 'Sitemap'].map((link) => (
                <li key={link}><Link to="#" className="hover:text-white transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span> Contact Information
            </h3>
            <div className="space-y-4 text-gray-400 text-sm">
              <p>Address: House 3, Lane 1 Baridhara DOHS, Dhaka 1206</p>
              <p>Mail: <a href="mailto:washiurrahman7771@kuet.ac.bd" className="hover:text-white transition-colors underline underline-offset-2">washiurrahman7771@kuet.ac.bd</a></p>
              <p>Call US: <a href="tel:+8801516520602" className="hover:text-white transition-colors">+880 1516 520602</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

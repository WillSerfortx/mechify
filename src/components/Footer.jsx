import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-24 px-6 md:px-12 lg:px-20 xl:px-32 border-t border-white/10 font-outfit">
      <div className="max-w-[1800px] w-full mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-10 border-b border-white/10 pb-16">
          <div className="max-w-2xl -mt-6">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Signup for Newsletter</h2>
            <p className="text-gray-400 text-base md:text-lg">
              We may send you information about new cars related events, webinars, news and services which we believe
            </p>
          </div>
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent border-b-2 border-gray-600 px-4 py-3 focus:outline-none focus:border-red-500 transition-colors w-full sm:w-96 text-base md:text-lg placeholder-gray-500"
            />
            <button className="border-2 border-white rounded-full px-10 py-3 text-base md:text-lg font-bold hover:bg-white hover:text-black transition-colors shrink-0 uppercase tracking-wider">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Logo Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 group mb-6 hover:scale-105 transition-transform duration-300">
              <svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <div className="text-white font-black text-2xl tracking-widest">MECHIFY</div>
                <div className="text-gray-400 text-[10px] tracking-[0.2em] uppercase">Vehicle Support</div>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl lg:text-2xl mb-6 flex items-center gap-3">
              <span className="w-1.5 h-5 bg-red-600 rounded-full"></span> Quick Links
            </h3>
            <ul className="space-y-4 text-gray-400 text-base lg:text-lg font-medium">
              {['Home', 'About Us', 'Cars', 'Sell', 'Rentals', 'Careers', 'Contact'].map((link) => (
                <li key={link}><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-bold text-xl lg:text-2xl mb-6 flex items-center gap-3">
              <span className="w-1.5 h-5 bg-red-600 rounded-full"></span> Brands
            </h3>
            <ul className="space-y-4 text-gray-400 text-base lg:text-lg font-medium">
              {['Ferrari In Dubai', 'Mercedes In Dubai', 'Rolls-Royce In Dubai', 'Porsche In Dubai', 'Lamborghini In Dubai'].map((link) => (
                <li key={link}><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-bold text-xl lg:text-2xl mb-6 flex items-center gap-3">
              <span className="w-1.5 h-5 bg-red-600 rounded-full"></span> Information
            </h3>
            <ul className="space-y-4 text-gray-400 text-base lg:text-lg font-medium">
              {['Meet', 'Showroom Virtual Tour', 'Sold Cars', 'Privacy Policy', 'Terms & Conditions', 'Sitemap'].map((link) => (
                <li key={link}><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-xl lg:text-2xl mb-6 flex items-center gap-3">
              <span className="w-1.5 h-5 bg-red-600 rounded-full"></span> Contact Info
            </h3>
            <div className="space-y-6 text-gray-400 text-base lg:text-lg font-medium">
              <p className="leading-relaxed">Address: House 3, Lane 1 Baridhara DOHS, Dhaka 1206</p>
              <p>Mail: <a href="mailto:washiurrahman7771@kuet.ac.bd" className="hover:text-white transition-colors underline underline-offset-4">washiurrahman7771@kuet.ac.bd</a></p>
              <p>Call US: <a href="tel:+8801516520602" className="hover:text-white transition-colors hover:translate-x-1 inline-block">+880 1516 520602</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

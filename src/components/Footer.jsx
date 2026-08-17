import { Link } from 'react-router-dom';

const imgLogo = "https://placehold.co/163x131/111/fff?text=Logo";

export default function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-gray-800 text-white font-sora">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Newsletter */}
        <div className="mb-16 animate-fadeInUp text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Signup for Newsletter</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto lg:mx-0">We may send you information about new cars related events, webinars, news and services which we believe</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto lg:mx-0">
            <input type="email" placeholder="Enter your email address" className="w-full sm:flex-1 bg-transparent border-b-2 border-gray-500 text-white text-lg py-3 px-2 outline-none focus:border-white transition-colors" />
            <button className="w-full sm:w-auto bg-black border-2 border-white rounded-full px-10 py-3 text-white text-xl font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-white/20">Subscribe</button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mt-16 pt-12 border-t border-gray-800">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex justify-center lg:justify-start">
            <div className="w-32 h-24 lg:w-40 lg:h-32 overflow-hidden bg-white/5 p-4 rounded-xl">
              <img src={imgLogo} alt="Mechify" className="w-full h-full object-contain" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-l-4 border-red-600 pl-3 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-red-600">›</span> Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-red-600">›</span> About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-red-600">›</span> Cars</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-red-600">›</span> Sell</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-red-600">›</span> Media</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-red-600">›</span> Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-red-600">›</span> Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-l-4 border-red-600 pl-3 uppercase tracking-wider">Brands</h3>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Ferrari in Dubai</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Rolls-Royce in Dubai</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Porsche in Dubai</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Lamborghini in Dubai</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-l-4 border-red-600 pl-3 uppercase tracking-wider">Information</h3>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> News</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Showroom Virtual Tour</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Sold Cars</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Terms & Conditions</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><span className="text-red-600">›</span> Sitemap</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-l-4 border-red-600 pl-3 uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-4 text-gray-400">
              <p className="flex items-start gap-3"><span className="text-red-600 mt-1">📍</span> <span>House 5, Lane 1 Baridhara<br/>Dohs. Dhaka 1216</span></p>
              <div className="border-b border-gray-800 my-2"></div>
              <p className="flex items-center gap-3"><span className="text-red-600">✉</span> <a href="mailto:mrahman2331077@bscse.uiu.ac.bd" className="hover:text-white transition-colors break-all">mrahman2331077@bscse.uiu.ac.bd</a></p>
              <div className="border-b border-gray-800 my-2"></div>
              <p className="flex items-center gap-3"><span className="text-red-600">📞</span> <a href="tel:+8801516520602" className="hover:text-white transition-colors">+8801516520602</a></p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Mechify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

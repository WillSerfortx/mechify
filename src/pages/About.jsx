import { Link } from 'react-router-dom';

const imgAbout1 = "https://placehold.co/600x400/222/fff?text=Mechanic";
const imgAbout2 = "https://placehold.co/400x500/222/fff?text=Workshop";
const imgAbout3 = "https://placehold.co/800x600/222/fff?text=Fuel+Delivery";

export default function About() {
  return (
    <div className="bg-black min-h-screen pt-40 px-6 md:px-12 lg:px-24 pb-20 text-white font-sora overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start max-w-7xl mx-auto">
        {/* Images Grid */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] sm:min-h-[600px] flex-shrink-0 animate-slideInLeft hidden sm:block">
          <div className="absolute top-0 left-0 w-3/5 aspect-video rounded-2xl overflow-hidden shadow-2xl z-10">
            <img src={imgAbout1} alt="Mechanic" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-24 right-0 w-2/5 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-20 animate-fadeInUp delay-200">
            <img src={imgAbout2} alt="Workshop" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-12 w-3/4 aspect-video rounded-2xl overflow-hidden shadow-2xl z-30 animate-slideInLeft delay-400">
            <img src={imgAbout3} alt="Fuel Delivery" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 pt-12 lg:pt-24 animate-slideInRight">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8">About Us</h1>
          <div className="text-lg md:text-xl leading-relaxed text-gray-300 font-dm space-y-6 mb-10">
            <p>
              <span className="font-semibold text-white">Mechify</span> is a comprehensive digital platform designed to simplify vehicle care for users. It connects car owners with verified mechanics and service providers, offering a wide range of services including home servicing, emergency roadside assistance, workshop appointments, spare parts delivery, car rentals, fuel delivery, and driver hiring.
            </p>
            <p>
              By combining convenience, transparency, and reliability, Mechify ensures that vehicle maintenance and repair are seamless, fast, and accessible — all from a single, user-friendly platform. Whether it's routine maintenance or urgent support, Mechify provides trusted solutions for every stage of vehicle care.
            </p>
          </div>
          <Link to="/services" className="inline-block border border-white rounded-lg px-8 py-4 text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
            Explore more
          </Link>
        </div>
      </div>
    </div>
  );
}

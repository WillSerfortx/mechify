import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Placeholders for user to replace later
const imgHero = "https://placehold.co/800x600/222/fff?text=Hero+Speedometer";
const car1 = "https://placehold.co/400x250/222/fff?text=La+Ferrari";
const car2 = "https://placehold.co/400x250/222/fff?text=McLaren";
const car3 = "https://placehold.co/400x250/222/fff?text=Lamborghini";
const car4 = "https://placehold.co/400x250/222/fff?text=Bugatti";

const service1 = "https://placehold.co/600x400/222/fff?text=Home+Service";
const service2 = "https://placehold.co/600x400/222/fff?text=Emergency+Assistance";
const service3 = "https://placehold.co/600x400/222/fff?text=Spare+Parts";

const smallService1 = "https://placehold.co/400x250/222/fff?text=Car+Rental";
const smallService2 = "https://placehold.co/400x250/222/fff?text=Workshop+Repair";
const smallService3 = "https://placehold.co/400x250/222/fff?text=Fuel+Delivery";
const smallService4 = "https://placehold.co/400x250/222/fff?text=Driver+Hire";

const icon1 = "https://placehold.co/100x100/111/fff?text=Icon";

const cars = [
  { name: 'La Ferrari', img: car1 },
  { name: 'McLaren', img: car2 },
  { name: 'Lamborghini', img: car3 },
  { name: 'Bugatti', img: car4 }
];

const services = [
  { name: 'Home Service', img: service1, icon: icon1, link: '/workshop' },
  { name: 'Emergency Road Assistance', img: service2, icon: icon1, link: '/services' },
  { name: 'Spare Parts Store', img: service3, icon: icon1, link: '/services' },
];

const smallServices = [
  { name: 'Car Rental', img: smallService1, link: '/car-rental' },
  { name: 'Workshop Repair', img: smallService2, link: '/workshop' },
  { name: 'Fuel Delivery', img: smallService3, link: '/services' },
  { name: 'Driver Hire', img: smallService4, link: '/services' },
];

export default function Home() {
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCars = () => {
    document.getElementById('cars-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black min-h-screen text-white font-sora">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-24 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 z-10">
          <div className="w-full lg:w-1/2 animate-slideInLeft">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">Welcome to Mechify</h1>
            <div className="text-lg md:text-xl leading-relaxed text-gray-300 font-dm">
              <p><span className="font-semibold text-white">Mechify</span> is a comprehensive digital platform designed to simplify vehicle care for users. It connects car owners with verified mechanics and service providers, offering a wide range of services including home servicing, emergency roadside assistance, workshop appointments, spare parts delivery, car rentals, fuel delivery, and driver hiring.</p>
              <p className="mt-4">By combining convenience, transparency, and reliability, Mechify ensures that vehicle maintenance and repair are seamless, fast, and accessible — all from a single, user-friendly platform. Whether it's routine maintenance or urgent support, Mechify provides trusted solutions for every stage of vehicle care.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 aspect-video rounded-2xl shadow-[0px_4px_50px_30px_rgba(255,255,255,0.1)] overflow-hidden animate-scaleIn">
            <img src={imgHero} alt="Speedometer" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24" id="services-section" data-animate>
        <h2 className={`text-5xl md:text-6xl lg:text-8xl font-bold text-center mb-12 ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>Services</h2>
        
        <div className="flex justify-center mb-16">
          <button onClick={scrollToServices} className="animate-float cursor-pointer text-gray-400 hover:text-white transition-colors">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </button>
        </div>

        {/* Large Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {services.map((service, i) => (
            <Link to={service.link} key={i} className={`relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3] shadow-lg ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: `${i * 0.2}s`}}>
              <img src={service.img} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
                <img src={service.icon} alt="" className="w-16 h-16 object-contain mb-4 filter invert opacity-80 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-bold text-white">{service.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Small Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallServices.map((service, i) => (
            <Link to={service.link} key={i} className={`relative rounded-2xl overflow-hidden group cursor-pointer aspect-video shadow-md ${visible['services-section'] ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: `${(i + 3) * 0.15}s`}}>
              <img src={service.img} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                 <h3 className="text-xl font-bold text-white">{service.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Car Rentals Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]" id="cars-section" data-animate>
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 ${visible['cars-section'] ? 'animate-fadeInUp' : 'opacity-0'}`}>Car For Rents</h2>
          
          <div className="flex justify-center mb-12">
            <button onClick={scrollToCars} className="animate-float cursor-pointer text-gray-400 hover:text-white transition-colors">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </button>
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {cars.map((car, i) => (
            <Link to="/car-rental" key={i} className={`bg-white rounded-2xl p-6 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)] hover:-translate-y-2 ${visible['cars-section'] ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: `${i * 0.2}s`}}>
              <div className="w-full aspect-[16/10] flex items-center justify-center mb-6 overflow-hidden rounded-lg">
                <img src={car.img} alt={car.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 w-full text-center mb-4">{car.name}</h3>
              
              <div className="w-full flex justify-between text-sm text-gray-600 font-semibold mb-2 px-4">
                <span>Model: 2017</span>
                <span>Speed: 182mph</span>
              </div>
              <div className="w-full flex justify-between text-sm text-gray-600 font-semibold px-4">
                <span>Auto: 2017</span>
                <span>Engine: 563hp</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

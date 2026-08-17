import { Link } from 'react-router-dom';

const imgImage14 = "https://placehold.co/600x400/222/fff?text=Home+Service";
const imgImage15 = "https://placehold.co/600x400/222/fff?text=Emergency+Assistance";
const imgImage18 = "https://placehold.co/600x400/222/fff?text=Spare+Parts";
const imgImage20 = "https://placehold.co/600x400/222/fff?text=Car+Rental";
const imgImage21 = "https://placehold.co/600x400/222/fff?text=Workshop+Repair";
const imgImage22 = "https://placehold.co/600x400/222/fff?text=Fuel+Delivery";
const imgImage23 = "https://placehold.co/600x400/222/fff?text=Driver+Hire";

const allServices = [
  { name: 'Home Service', desc: 'Professional mechanics come to your doorstep for routine maintenance and repairs.', img: imgImage14, link: '/workshop' },
  { name: 'Emergency Road Assistance', desc: '24/7 emergency breakdown support wherever you are on the road.', img: imgImage15, link: '/workshop' },
  { name: 'Spare Parts Store', desc: 'Browse and order genuine spare parts with fast delivery.', img: imgImage18, link: '/payment-select' },
  { name: 'Car Rental', desc: 'Rent premium vehicles for any duration with flexible plans.', img: imgImage20, link: '/car-rental' },
  { name: 'Workshop Repair', desc: 'Book appointments at verified workshops near your location.', img: imgImage21, link: '/workshop' },
  { name: 'Fuel Delivery', desc: 'Get fuel delivered to your location when you run out.', img: imgImage22, link: '/payment-select' },
  { name: 'Driver Hire', desc: 'Hire professional drivers for your personal or business needs.', img: imgImage23, link: '/car-rental' },
];

export default function Services() {
  return (
    <div className="bg-black min-h-screen pt-32 px-6 md:px-12 lg:px-24 pb-24 text-white font-sora">
      <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-center mb-16 animate-fadeInUp">All Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allServices.map((service, i) => (
          <Link to={service.link} key={i}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer animate-fadeInUp shadow-lg"
            style={{animationDelay: `${i * 0.1}s`}}>
            <img src={service.img} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{service.name}</h3>
              <p className="text-base md:text-lg text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">{service.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

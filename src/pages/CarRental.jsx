import { useNavigate } from 'react-router-dom';

const superCars = [
  { name: 'Bugatti', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Bugatti_logo.svg/1200px-Bugatti_logo.svg.png', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop' },
  { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop' },
  { name: 'McLaren', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/McLaren_logo.svg/1200px-McLaren_logo.svg.png', img: 'https://images.unsplash.com/photo-1558981852-426c373d4a83?w=600&h=400&fit=crop' },
  { name: 'La Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/1200px-Ferrari-Logo.svg.png', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop' },
];

const suvs = [
  { name: 'Gmc', img: 'https://images.unsplash.com/photo-1629897048514-3dd74142bd01?w=600&h=400&fit=crop' },
  { name: 'Toyota', img: 'https://images.unsplash.com/photo-1598282305845-8fbfb3917de9?w=600&h=400&fit=crop' },
  { name: 'Honda', img: 'https://images.unsplash.com/photo-1605892558359-54157e841285?w=600&h=400&fit=crop' },
];

export default function CarRental() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24 pt-24">
      {/* Back Button */}
      <div className="px-6 md:px-12 lg:px-20 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors border border-white/10"
        >
          &lt;
        </button>
      </div>

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-16 relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2">Choose your car for rent</h1>
        <p className="text-gray-400 text-lg">Cars available for rent</p>
        {/* Decorative background curve */}
        <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none opacity-20 hidden md:block">
           <svg viewBox="0 0 800 400" className="w-full h-full text-blue-500" stroke="currentColor" fill="none" strokeWidth="2">
             <path d="M 800 0 Q 400 100 200 400 M 700 0 Q 300 200 100 400" />
           </svg>
        </div>
      </div>

      {/* Super Cars */}
      <div className="mb-20">
        <h2 className="text-3xl font-black px-6 md:px-12 lg:px-20 mb-8">Super Cars</h2>
        <div className="flex overflow-x-auto no-scrollbar gap-6 px-6 md:px-12 lg:px-20 pb-4">
          {superCars.map((car, i) => (
            <div key={i} className="bg-white w-[300px] flex-shrink-0 rounded-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-40 p-4 flex items-center justify-center">
                <img src={car.img} alt={car.name} className="max-h-full object-contain" />
              </div>
              <div className="p-6 bg-white flex flex-col items-center justify-center h-40 border-t border-gray-100">
                <h3 className="text-black font-black text-xl mb-4">{car.name}</h3>
                <img src={car.logo} alt={`${car.name} logo`} className="h-10 object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUV */}
      <div>
        <h2 className="text-3xl font-black px-6 md:px-12 lg:px-20 mb-8">Suv</h2>
        <div className="flex overflow-x-auto no-scrollbar gap-6 px-6 md:px-12 lg:px-20 pb-4">
          {suvs.map((car, i) => (
            <div key={i} className="bg-white w-[300px] flex-shrink-0 rounded-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 p-4 flex items-center justify-center">
                <img src={car.img} alt={car.name} className="max-h-full object-contain" />
              </div>
              <div className="p-6 bg-white flex flex-col items-center justify-center border-t border-gray-100">
                <h3 className="text-black font-black text-2xl">{car.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

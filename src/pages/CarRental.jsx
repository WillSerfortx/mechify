import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

// ─── Constants & Mock Data Generation ───
const BRANDS = [
  { name: 'Bugatti', logo: 'https://cdn.worldvectorlogo.com/logos/bugatti-1.svg' },
  { name: 'Mercedes', logo: 'https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg' },
  { name: 'McLaren', logo: 'https://cdn.worldvectorlogo.com/logos/mclaren-1.svg' },
  { name: 'Ferrari', logo: 'https://cdn.worldvectorlogo.com/logos/ferrari-ges-1.svg' },
  { name: 'Lamborghini', logo: 'https://cdn.worldvectorlogo.com/logos/lamborghini-1.svg' },
  { name: 'Porsche', logo: 'https://cdn.worldvectorlogo.com/logos/porsche-6.svg' },
  { name: 'BMW', logo: 'https://cdn.worldvectorlogo.com/logos/bmw-logo-2020.svg' },
  { name: 'Audi', logo: 'https://cdn.worldvectorlogo.com/logos/audi-13.svg' },
  { name: 'Aston Martin', logo: 'https://cdn.worldvectorlogo.com/logos/aston-martin-1.svg' },
  { name: 'Rolls Royce', logo: 'https://cdn.worldvectorlogo.com/logos/rolls-royce-motor-cars.svg' },
];

const CAR_IMAGES = [
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop', // Bugatti-ish
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop', // Mercedes
  'https://images.unsplash.com/photo-1558981852-426c373d4a83?w=600&h=400&fit=crop', // McLaren
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop', // Ferrari
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop', // Lambo
  'https://images.unsplash.com/photo-1503376713431-150d65942289?w=600&h=400&fit=crop', // Porsche
  'https://images.unsplash.com/photo-1555353540-64fd8b0ebd28?w=600&h=400&fit=crop', // BMW
  'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop', // Audi
  'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=600&h=400&fit=crop', // Aston
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop', // Rolls Royce
];

const generateMockCars = () => {
  return BRANDS.map((brand, brandIndex) => {
    // Generate 10 cars for each brand
    const cars = Array.from({ length: 10 }).map((_, carIndex) => {
      // Pick an image dynamically (mix it up a bit)
      const imageIndex = (brandIndex + carIndex) % CAR_IMAGES.length;
      // Randomly assign availability
      const isAvailable = Math.random() > 0.3; // 70% available
      
      return {
        id: `${brand.name}-${carIndex}`,
        name: `${brand.name} Model ${carIndex + 1}`,
        img: CAR_IMAGES[imageIndex],
        isAvailable,
      };
    });
    
    return {
      ...brand,
      cars
    };
  });
};

// ─── Reusable Marquee Row Component ───
const CarMarqueeRow = ({ brandData, isReversed }) => {
  const { name, logo, cars } = brandData;
  const animationClass = isReversed ? 'animate-marqueeReverse' : 'animate-marquee';

  return (
    <div className="mb-24 relative">
      {/* Brand Header */}
      <div className="flex items-center gap-4 px-6 md:px-12 lg:px-20 mb-8">
        {logo && <img src={logo} alt={`${name} logo`} className="h-12 w-auto max-w-[80px] object-contain bg-white rounded-lg p-2 shadow-sm" onError={(e) => e.target.style.display = 'none'} />}
        <h2 className="text-4xl font-black">{name}</h2>
      </div>

      {/* Endless Marquee Container */}
      <div className="relative flex overflow-hidden group">
        {/* We duplicate the inner content twice to achieve the seamless endless loop */}
        <div className={`flex shrink-0 ${animationClass} group-hover:[animation-play-state:paused]`}>
          {[...cars, ...cars].map((car, i) => (
            <div 
              key={`${car.id}-${i}`} 
              className="relative bg-white w-[300px] flex-shrink-0 rounded-xl overflow-hidden flex flex-col mx-3 transition-transform duration-300 hover:scale-[1.03] hover:z-10 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] cursor-pointer group/card"
            >
              {/* Image Container */}
              <div className="h-44 p-4 flex items-center justify-center bg-gray-100 relative overflow-hidden">
                <img src={car.img} alt={car.name} className="max-h-full w-full object-cover rounded" />
                
                {/* Hover Overlay Animation */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  {car.isAvailable ? (
                    <>
                      <span className="bg-green-500 text-white font-bold px-4 py-1 rounded-full text-sm">Available</span>
                      <button className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2 rounded-full transition-all hover:scale-105">
                        Rent Now
                      </button>
                    </>
                  ) : (
                    <span className="bg-gray-600 text-white font-bold px-4 py-1 rounded-full text-sm">Currently Rented</span>
                  )}
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="p-4 bg-white flex flex-col items-center justify-center border-t border-gray-100">
                <h3 className="text-black font-black text-3xl">{car.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page Component ───
export default function CarRental() {
  const navigate = useNavigate();

  // Generate data once per render cycle
  const brandRows = useMemo(() => generateMockCars(), []);

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24 pt-24 overflow-x-hidden">
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2">Premium Car Fleet</h1>
        <p className="text-gray-400 text-lg">Browse our endless collection of 100 supercars. Hover to check availability.</p>
        
        {/* Decorative background curve */}
        <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none opacity-20 hidden md:block">
           <svg viewBox="0 0 800 400" className="w-full h-full text-red-500" stroke="currentColor" fill="none" strokeWidth="2">
             <path d="M 800 0 Q 400 100 200 400 M 700 0 Q 300 200 100 400" />
           </svg>
        </div>
      </div>

      {/* Render the 10 Marquee Rows */}
      <div className="flex flex-col gap-4">
        {brandRows.map((brandData, index) => (
          <CarMarqueeRow 
            key={brandData.name} 
            brandData={brandData} 
            isReversed={index % 2 !== 0} 
          />
        ))}
      </div>

    </div>
  );
}

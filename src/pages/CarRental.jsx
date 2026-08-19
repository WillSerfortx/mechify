import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

// ─── Constants & Mock Data Generation ───
const BRANDS = [
  { name: 'Bugatti', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Bugatti_logo.svg/1200px-Bugatti_logo.svg.png' },
  { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png' },
  { name: 'McLaren', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/McLaren_logo.svg/1200px-McLaren_logo.svg.png' },
  { name: 'Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/1200px-Ferrari-Logo.svg.png' },
  { name: 'Lamborghini', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png' },
  { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Porsche_logo.svg/1200px-Porsche_logo.svg.png' },
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png' },
  { name: 'Aston Martin', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Aston_Martin_logo.svg/1200px-Aston_Martin_logo.svg.png' },
  { name: 'Rolls Royce', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Rolls-Royce_Motor_Cars_logo.svg/1200px-Rolls-Royce_Motor_Cars_logo.svg.png' },
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
    <div className="mb-16 relative">
      {/* Brand Header */}
      <div className="flex items-center gap-4 px-6 md:px-12 lg:px-20 mb-6">
        {logo && <img src={logo} alt={`${name} logo`} className="h-10 object-contain bg-white/10 rounded-lg p-1" />}
        <h2 className="text-3xl font-black">{name}</h2>
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
                <h3 className="text-black font-black text-xl">{car.name}</h3>
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

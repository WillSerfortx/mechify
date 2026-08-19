import { useNavigate } from 'react-router-dom';
import { useMemo, useRef, useState } from 'react';

// ─── Constants & Mock Data Generation ───
const CATEGORIES = [
  { name: 'Sedan' },
  { name: 'SUV' },
  { name: 'Hatchback' },
  { name: 'Crossover' },
  { name: 'MPV' },
  { name: 'Luxury' },
  { name: 'Luxury SUV' },
  { name: 'Micro Bus' },
  { name: 'Coupe' },
  { name: 'Mini Van' },
];

const CAR_IMAGES = [
  '/car-1.jpg', // Bugatti
  '/car-2.jpg', // McLaren
  '/car-3.jpg', // Mercedes
  '/car-4.jpg', // Rolls Royce
];

const generateMockCars = () => {
  return CATEGORIES.map((category, categoryIndex) => {
    // Generate 10 cars for each category
    const cars = Array.from({ length: 10 }).map((_, carIndex) => {
      // Pick an image dynamically (mix it up a bit)
      const imageIndex = (categoryIndex + carIndex) % CAR_IMAGES.length;
      // Randomly assign availability
      const isAvailable = Math.random() > 0.3; // 70% available
      
      return {
        id: `${category.name}-${carIndex}`,
        name: `${category.name} ${carIndex + 1}`,
        category: category.name,
        speed: Math.floor(Math.random() * 50 + 150) + 'mph',
        img: CAR_IMAGES[imageIndex],
        isAvailable,
      };
    });
    
    return {
      ...category,
      cars
    };
  });
};

// ─── Reusable Marquee Row Component ───
const CarMarqueeRow = ({ categoryData, isReversed }) => {
  const navigate = useNavigate();
  const rowRef = useRef(null);
  const [panOffset, setPanOffset] = useState(0);

  const { name, cars } = categoryData;
  const animationClass = isReversed ? 'animate-marqueeReverse' : 'animate-marquee';

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // Calculate mouse position relative to center (-1 to 1)
    const percentage = ((x / rect.width) - 0.5) * 2;
    // Move up to 300px in either direction
    setPanOffset(percentage * -300);
  };

  const handleMouseLeave = () => {
    setPanOffset(0);
  };

  return (
    <div className="py-12 relative">
      {/* Category Header */}
      <div className="flex flex-col items-center justify-center mb-10">
        <h2 className="text-5xl font-black tracking-wide text-white capitalize">{name}</h2>
        <div className="w-24 h-1.5 bg-red-600 mt-4 rounded-full" />
      </div>

      {/* Endless Marquee Container */}
      <div 
        className="relative flex overflow-hidden group cursor-ew-resize w-full"
        ref={rowRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="flex transition-transform duration-75 ease-out w-full"
          style={{ transform: `translateX(${panOffset}px)` }}
        >
          {/* We duplicate the inner content twice to achieve the seamless endless loop */}
          <div className={`flex shrink-0 gap-8 ${animationClass} group-hover:[animation-play-state:paused]`}>
            {[...cars, ...cars].map((car, i) => (
            <div 
              key={`${car.id}-${i}`} 
              className="relative bg-white w-[300px] flex-shrink-0 rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.03] hover:z-10 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] cursor-pointer group/card"
            >
              {/* Image Container */}
              <div className="h-44 p-4 flex items-center justify-center bg-gray-100 relative overflow-hidden">
                <img src={car.img} alt={car.name} className="max-h-full w-full object-cover rounded" />
                
                {/* Hover Overlay Animation */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  {car.isAvailable ? (
                    <>
                      <span className="bg-green-500 text-white font-bold px-4 py-1 rounded-full text-sm">Available</span>
                      <button onClick={() => navigate('/car-booking')} className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2 rounded-full transition-all hover:scale-105">
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
                <h3 className="text-black font-black text-xl tracking-tight">{car.name}</h3>
              </div>
            </div>
          ))}
          </div>
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
      <div className="flex flex-col gap-16 mt-8">
        {brandRows.map((categoryData, index) => (
          <CarMarqueeRow 
            key={categoryData.name} 
            categoryData={categoryData} 
            isReversed={index % 2 !== 0} 
          />
        ))}
      </div>

    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const categories = [
  "Engine Components", 
  "Brake Systems", 
  "Suspension & Steering", 
  "Transmission & Drivetrain", 
  "Exhaust Systems", 
  "Electrical & Batteries", 
  "Lighting & Bulbs", 
  "Cooling & Climate Control", 
  "Filters & PCV", 
  "Belts & Hoses", 
  "Body Parts & Mirrors", 
  "Interior Accessories", 
  "Fuel Delivery", 
  "Ignition Systems", 
  "Wheels & Tires"
];

// Fallback auto parts images from Unsplash
const partImages = [
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop', // Engine
  'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=400&h=300&fit=crop', // Tools
  'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=400&h=300&fit=crop', // Engine bay
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop', // Car closeup
  'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&h=300&fit=crop', // Workshop
];

const generateParts = (categoryName) => {
  return Array.from({ length: 30 }).map((_, i) => ({
    id: `${categoryName.replace(/\s+/g, '-').toLowerCase()}-${i}`,
    name: `Premium ${categoryName} - Type ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    price: (Math.random() * 400 + 20).toFixed(2),
    available: Math.random() > 0.25, // 75% chance of being available
    image: partImages[i % partImages.length],
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
  }));
};

export default function SparePartsStore() {
  const navigate = useNavigate();

  // Memoize generated data so it doesn't regenerate on every render
  const storeData = useMemo(() => {
    return categories.map(cat => ({
      categoryName: cat,
      parts: generateParts(cat)
    }));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-[#1a0000] via-black to-black pt-40 md:pt-48 pb-12 px-6 md:px-12 lg:px-20">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-28 left-6 md:left-12 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors border border-white/20 z-20"
        >
          &lt;
        </button>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black mb-4 tracking-tight uppercase">
            Spare Parts <span className="text-[#E50914]">Store</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4">
            Find the exact parts you need. Over 450+ high-quality components for all vehicle makes and models.
          </p>
          <div className="h-2 w-32 bg-[#E50914] mx-auto rounded-full" />
        </div>
      </div>

      {/* Store Categories */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        {storeData.map((category, index) => (
          <div key={index} className="mb-16">
            
            {/* Centered Category Title */}
            <div className="flex flex-col items-center justify-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-center tracking-wide uppercase mb-2">
                {category.categoryName}
              </h2>
              <div className="h-1 w-24 bg-[#E50914]/80 rounded-full" />
            </div>

            {/* Horizontal Scrolling Row */}
            <div className="flex overflow-x-auto gap-6 pb-6 pt-2 no-scrollbar snap-x snap-mandatory scroll-smooth px-2">
              {category.parts.map((part) => (
                <div 
                  key={part.id} 
                  className="snap-start flex-shrink-0 w-[280px] md:w-[320px] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-2xl overflow-hidden hover:border-[#E50914]/50 hover:shadow-[0_0_20px_rgba(229,9,20,0.15)] transition-all duration-300 group flex flex-col"
                >
                  {/* Part Image */}
                  <div className="relative h-48 overflow-hidden bg-white/5">
                    <img 
                      src={part.image} 
                      alt={part.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Availability Badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${
                      part.available 
                        ? 'bg-green-500/80 text-white border border-green-400/50' 
                        : 'bg-red-500/80 text-white border border-red-400/50'
                    }`}>
                      {part.available ? '✓ In Stock' : '✕ Out of Stock'}
                    </div>
                  </div>

                  {/* Part Details */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#E50914] transition-colors">
                      {part.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-gray-400 text-sm font-semibold">{part.rating} / 5.0</span>
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Price</p>
                        <p className="text-2xl font-black text-white">${part.price}</p>
                      </div>
                      
                      <button 
                        disabled={!part.available}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                          part.available 
                            ? 'bg-white/10 hover:bg-[#E50914] text-white hover:shadow-[0_0_15px_rgba(229,9,20,0.4)]' 
                            : 'bg-white/5 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {part.available ? 'Add to Cart' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

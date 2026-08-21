export default function Services() {
  const storeCategories = [
    {
      title: 'Tyres',
      items: [
        { name: 'Basic Tyre', img: 'https://images.unsplash.com/photo-1590483562300-85b1916cb03d?w=400&h=400&fit=crop' },
        { name: 'Business Tyre', img: 'https://images.unsplash.com/photo-1590483562300-85b1916cb03d?w=400&h=400&fit=crop' },
        { name: 'Premium Tyre', img: 'https://images.unsplash.com/photo-1590483562300-85b1916cb03d?w=400&h=400&fit=crop' },
      ]
    },
    {
      title: 'Brake Components',
      items: [
        { name: 'Red Rotor', img: 'https://images.unsplash.com/photo-1577785566373-cf6776dbd8f5?w=400&h=400&fit=crop' },
        { name: 'Calipers', img: 'https://images.unsplash.com/photo-1577785566373-cf6776dbd8f5?w=400&h=400&fit=crop' },
        { name: 'Rotor', img: 'https://images.unsplash.com/photo-1577785566373-cf6776dbd8f5?w=400&h=400&fit=crop' },
      ]
    },
    {
      title: 'Filters',
      items: [
        { name: 'Diesel', img: 'https://images.unsplash.com/photo-1628189689917-c8340d859e99?w=400&h=400&fit=crop' },
        { name: 'Air Filter', img: 'https://images.unsplash.com/photo-1628189689917-c8340d859e99?w=400&h=400&fit=crop' },
      ]
    },
    {
      title: 'Engine & Fuel System Parts',
      items: [
        { name: 'Injectors', img: 'https://images.unsplash.com/photo-1486262715619-670810a0740f?w=400&h=400&fit=crop' },
        { name: 'Alternators', img: 'https://images.unsplash.com/photo-1486262715619-670810a0740f?w=400&h=400&fit=crop' },
      ]
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552599727-46dc0fb2c5ff?w=1920&h=1080&fit=crop" 
            alt="Store" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
             <span className="text-3xl text-white">🛍️</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">Welcome To Mechify Store</h1>
          <p className="text-2xl font-semibold mb-2">Flash sell on Tyres</p>
          <p className="text-red-500 font-bold text-xl">Up to 40% discount</p>
        </div>
      </section>

      {/* Store Categories */}
      <div className="px-6 md:px-12 lg:px-20 mt-12 space-y-16">
        {storeCategories.map((cat, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-2xl md:text-3xl font-black">{cat.title}</h2>
              <span className="text-3xl text-white cursor-pointer hover:text-red-500 transition-colors">➔</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cat.items.map((item, j) => (
                <div key={j} className="bg-white rounded-xl overflow-hidden aspect-square flex flex-col items-center justify-center p-6 hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex-1 w-full flex items-center justify-center p-4">
                     <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain drop-shadow-xl filter grayscale contrast-125" />
                  </div>
                  <h3 className="text-black font-black text-center text-lg mt-4 w-full border-t border-gray-100 pt-4">{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

const occasions = [
  { label: 'Airport journeys', img: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&h=300&fit=crop' },
  { label: 'Event service', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop' },
  { label: 'Hourly bookings', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop' },
];

const drivers = [
  { name: 'Baby Driver', stars: 3.5, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
  { name: 'TOM CRUISE', stars: 4.5, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
  { name: 'JOHN WICK', stars: 4.5, img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop' },
];

export default function IDriver() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white font-outfit pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col justify-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop" 
            alt="Driving" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-6 md:left-12 lg:left-20 z-20">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl hover:bg-black/70 transition-colors border border-white/20"
          >
            &lt;
          </button>
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 uppercase leading-tight">
            BOOK A PRIVATE DRIVER WITH MECHIFY
          </h1>
          <p className="text-gray-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            With MECHIFY you can book a private car service in the UK as well as many other countries worldwide. 
            In just a few steps, you can book a private hire car and professional driver both online and on the app. 
            For rides in the city, for special events, or to get to and from the airport, you can pre-book your journey a minimum 
            of an hour in advance. In many cities around the world we also offer the option for immediate pickup. 
            With a range of booking classes to choose between, from Economy through to First Class, 
            there's something for all budgets and needs.
          </p>
        </div>
      </section>

      {/* Vehicle Options */}
      <section className="px-6 md:px-12 lg:px-20 -mt-10 relative z-20 mb-20">
        <h2 className="text-4xl font-black mb-8">Vehicle Options</h2>
        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4">
          {/* Standard Ride */}
          <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 aspect-[16/10] relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=500&fit=crop" alt="Standard Ride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl md:text-3xl font-black mb-2">Standard RIDE</h3>
              <p className="text-sm font-semibold max-w-sm">Get to your destination reliably and affordably with our standard Ride BOOKING class</p>
            </div>
          </div>
          {/* Green Ride */}
          <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 aspect-[16/10] relative rounded-2xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop" alt="Green Ride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl md:text-3xl font-black mb-2">Green RIDE</h3>
              <p className="text-sm font-semibold max-w-sm">DO your part for the environment by featuring environmentally friendly electric or hybrid vehicles.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-start">
          <button className="flex items-center gap-4 border-2 border-white rounded-lg px-6 py-3 font-bold">
            Vehicle Option <span className="text-xl rotate-180">▼</span>
          </button>
        </div>
      </section>

      {/* Driver Hire Occasions */}
      <section className="px-6 md:px-12 lg:px-20 mb-32">
        <h2 className="text-3xl font-black mb-8">Driver hire service for any occasion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {occasions.map((occ, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden relative aspect-video flex flex-col justify-end p-4">
              <img src={occ.img} alt={occ.label} className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <span className="relative z-10 text-black font-semibold text-right w-full bg-white/80 backdrop-blur px-3 py-1 rounded self-end text-sm inline-block max-w-max ml-auto">
                {occ.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <button className="flex items-center gap-4 border-2 border-white rounded-lg px-6 py-3 font-bold">
            Choose Occasion <span className="text-xl rotate-180">▼</span>
          </button>
          
          <button className="bg-white text-black font-bold px-12 py-3 rounded-full hover:bg-gray-200 transition-colors">
            Search Drivers
          </button>
        </div>
      </section>

      {/* Select Drivers */}
      <section className="px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-black mb-12">Select Drivers</h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {drivers.map((driver, i) => (
            <div key={i} className="flex bg-black border border-white/20 rounded-lg overflow-hidden h-40 md:h-48 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow">
              <div className="w-1/3 h-full">
                <img src={driver.img} alt={driver.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-3">{driver.name}</h3>
                <div className="flex gap-1 text-white text-2xl">
                  {/* Simple star rating renderer */}
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx}>
                      {idx < Math.floor(driver.stars) ? '★' : idx < driver.stars ? '⯨' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

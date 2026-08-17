import { Link } from 'react-router-dom';

const imgWorkshop1 = "https://placehold.co/600x400/222/fff?text=Mirpur+Workshop";
const imgWorkshop2 = "https://placehold.co/600x400/222/fff?text=Banani+Workshop";
const imgWorkshop3 = "https://placehold.co/600x400/222/fff?text=Badda+Workshop";
const imgWorkshop4 = "https://placehold.co/600x400/222/fff?text=Motijhil+Workshop";

const workshops = [
  { area: 'Mirpur', name: 'Workshop 1', img: imgWorkshop1 },
  { area: 'Banani', name: 'Workshop 2', img: imgWorkshop2 },
  { area: 'Badda', name: 'Workshop 3', img: imgWorkshop3 },
  { area: 'Motijhil', name: 'Workshop 4', img: imgWorkshop4 },
];

export default function Workshop() {
  return (
    <div className="bg-black min-h-screen pt-32 px-6 md:px-12 lg:px-24 pb-24 text-white font-sora">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-16 text-center lg:text-left animate-fadeInUp">Get your nearest Workshop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {workshops.map((ws, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-gray-900/50 p-6 rounded-2xl animate-fadeInUp shadow-lg border border-gray-800/50" style={{animationDelay: `${i * 0.15}s`}}>
            <div className="w-full sm:w-2/5 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 group">
              <img src={ws.img} alt={ws.area} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="flex-1 text-center sm:text-left w-full">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">{ws.area}</h2>
              <p className="text-xl text-gray-400 mb-6">{ws.name}</p>
              <Link to="/car-rental" className="inline-block border border-white rounded-lg px-8 py-3 text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
                Select
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

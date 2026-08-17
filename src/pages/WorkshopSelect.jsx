import { useNavigate } from 'react-router-dom';

export default function WorkshopSelect() {
  const navigate = useNavigate();

  const workshops = [
    { id: 'mirpur', name: 'Mechify Workshop - Mirpur', address: 'Block C, Avenue 5, Mirpur, Dhaka', distance: '3.2 km', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop' },
    { id: 'banani', name: 'Mechify Workshop - Banani', address: 'Road 11, Block F, Banani, Dhaka', distance: '5.8 km', img: 'https://images.unsplash.com/photo-1486262715619-670810a0740f?w=600&h=400&fit=crop' },
    { id: 'badda', name: 'Mechify Workshop - Badda', address: 'Progoti Shoroni, Middle Badda, Dhaka', distance: '7.1 km', img: 'https://images.unsplash.com/photo-1599304918731-cd8e7b1c4e97?w=600&h=400&fit=crop' },
  ];

  const handleSelect = (workshopId) => {
    navigate('/workshop-time', { state: { workshopId } });
  };

  return (
    <div className="bg-black min-h-screen text-white font-outfit py-24 px-6 md:px-12 lg:px-20 relative">
      
      {/* Back Button */}
      <div className="absolute top-12 left-6 md:left-12 lg:left-20 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors border border-white/20"
        >
          &lt;
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <span className="text-3xl">📍</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">Select Nearest Workshop</h1>
          <p className="text-gray-400">Choose a location to continue with your appointment booking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workshops.map((ws, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col group hover:border-red-500/50 transition-colors duration-300">
              <div className="h-48 overflow-hidden relative">
                <img src={ws.img} alt={ws.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-full border border-white/20">
                  {ws.distance}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-black mb-2 leading-tight">{ws.name}</h3>
                <p className="text-gray-400 text-sm flex-1">{ws.address}</p>
                <button 
                  onClick={() => handleSelect(ws.id)}
                  className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] active:scale-95"
                >
                  Select this Workshop
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

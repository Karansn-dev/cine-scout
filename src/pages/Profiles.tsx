import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const profiles = [
  { id: 1, name: "Alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { id: 2, name: "Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: 3, name: "Mike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { id: 4, name: "Emma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
];

const Profiles = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-6xl font-semibold text-white mb-12">
        Who's watching?
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-5xl">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => navigate('/home')}
            className="flex flex-col items-center gap-3 group transition-transform hover:scale-110"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-4 border-transparent group-hover:border-white transition-all">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-full h-full object-cover bg-gray-800"
              />
            </div>
            <span className="text-gray-400 group-hover:text-white text-lg md:text-xl transition-colors">
              {profile.name}
            </span>
          </button>
        ))}
        
        <button
          onClick={() => navigate('/home')}
          className="flex flex-col items-center gap-3 group transition-transform hover:scale-110"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-gray-800/50 border-4 border-transparent group-hover:border-white transition-all flex items-center justify-center">
            <Plus className="w-12 h-12 text-gray-500 group-hover:text-white transition-colors" />
          </div>
          <span className="text-gray-400 group-hover:text-white text-lg md:text-xl transition-colors">
            Add Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default Profiles;

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8 sm:mb-12 text-center">
        Who's watching?
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 max-w-5xl w-full">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => navigate('/home')}
            className="flex flex-col items-center gap-2 sm:gap-3 group transition-transform hover:scale-110 active:scale-105"
            aria-label={`Select profile ${profile.name}`}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-4 border-transparent group-hover:border-foreground transition-all">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-full h-full object-cover bg-muted"
              />
            </div>
            <span className="text-muted-foreground group-hover:text-foreground text-base sm:text-lg md:text-xl transition-colors text-center">
              {profile.name}
            </span>
          </button>
        ))}
        
        <button
          onClick={() => navigate('/home')}
          className="flex flex-col items-center gap-2 sm:gap-3 group transition-transform hover:scale-110 active:scale-105"
          aria-label="Add new profile"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg bg-muted/50 border-4 border-transparent group-hover:border-foreground transition-all flex items-center justify-center">
            <Plus className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <span className="text-muted-foreground group-hover:text-foreground text-base sm:text-lg md:text-xl transition-colors text-center">
            Add Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default Profiles;

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[90vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80')",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-12 lg:px-16">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            The Cinematic Journey
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
            An epic adventure through time and space. Experience breathtaking visuals 
            and a story that will keep you on the edge of your seat.
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span className="px-2 py-1 bg-gray-800/80 rounded font-semibold">PG-13</span>
            <span>2024</span>
            <span>•</span>
            <span>2h 28m</span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              onClick={() => navigate('/recommend')}
              className="bg-[#E50914] hover:bg-[#F40612] text-white px-8 py-6 text-lg font-semibold rounded-md transition-all hover:scale-105 shadow-lg"
            >
              Get Recommendations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

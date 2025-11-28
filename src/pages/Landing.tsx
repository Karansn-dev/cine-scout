import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E50914]">MovieMatch</h1>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/login')}
          className="text-white hover:text-white/80"
        >
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80')",
          }}
        />
        
        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Your Next Favorite Movie
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Personalized movie recommendations powered by AI
          </p>
          <Button 
            onClick={() => navigate('/profiles')}
            className="bg-[#E50914] hover:bg-[#F40612] text-white text-lg px-8 py-6 rounded-md shadow-lg transition-transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#E50914]/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Smart Recommendations</h3>
            <p className="text-gray-400">AI-powered suggestions based on movies you love</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#E50914]/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Personalized Experience</h3>
            <p className="text-gray-400">Tailored results that match your unique taste</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#E50914]/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Discover Hidden Gems</h3>
            <p className="text-gray-400">Find amazing movies you never knew existed</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E50914]">StreamFlix</h1>
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
            Unlimited movies, TV shows, and more
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Watch anywhere. Cancel anytime.
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Endless Entertainment</h3>
            <p className="text-gray-400">Stream thousands of movies and TV shows on demand.</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#E50914]/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Watch Anywhere</h3>
            <p className="text-gray-400">Stream on your phone, tablet, laptop, and TV.</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#E50914]/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Smart Recommendations</h3>
            <p className="text-gray-400">Get personalized movie suggestions powered by AI.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

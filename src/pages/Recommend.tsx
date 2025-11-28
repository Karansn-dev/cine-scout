import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { useToast } from "@/hooks/use-toast";

interface Movie {
  title: string;
  poster?: string;
  rating?: number;
  year?: number;
}

interface RecommendationResponse {
  recommendations: Movie[];
}

const Recommend = () => {
  const [inputMovie, setInputMovie] = useState("");
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedMovie, setSearchedMovie] = useState("");
  const { toast } = useToast();

  const fetchRecommendations = async (movieName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `http://localhost:8000/recommend?movie=${encodeURIComponent(movieName)}`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Movie not found. Please try a different title.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        throw new Error('Failed to fetch recommendations');
      }
      
      const data: RecommendationResponse = await response.json();
      setRecommendations(data.recommendations || []);
      setSearchedMovie(movieName);
      
      if (!data.recommendations || data.recommendations.length === 0) {
        toast({
          title: "No recommendations found",
          description: "Try searching for a different movie.",
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMovie.trim()) {
      fetchRecommendations(inputMovie.trim());
    }
  };

  const handleRetry = () => {
    if (searchedMovie) {
      fetchRecommendations(searchedMovie);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar scrolled={true} />
      
      <div className="pt-24 px-4 md:px-8 pb-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-xl text-gray-400">
            Enter a movie you love and get personalized recommendations
          </p>
        </div>

        {/* Search Section */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                value={inputMovie}
                onChange={(e) => setInputMovie(e.target.value)}
                placeholder="Enter movie title (e.g., Inception, Avatar, The Dark Knight)"
                className="pl-12 pr-12 py-6 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#E50914] focus:ring-[#E50914] text-lg"
              />
              {inputMovie && (
                <button
                  type="button"
                  onClick={() => setInputMovie("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading || !inputMovie.trim()}
              className="bg-[#E50914] hover:bg-[#F40612] text-white px-8 py-6 text-lg font-semibold rounded-md transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-2" />
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-8">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <Button
                onClick={handleRetry}
                variant="outline"
                className="border-red-800 text-red-400 hover:bg-red-900/20"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && recommendations.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">
              Because you liked <span className="text-[#E50914]">{searchedMovie}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recommendations.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && recommendations.length === 0 && searchedMovie && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
              <p className="text-gray-400 text-lg mb-4">
                No recommendations found for "{searchedMovie}"
              </p>
              <p className="text-gray-500">
                Try searching for a different movie title
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommend;

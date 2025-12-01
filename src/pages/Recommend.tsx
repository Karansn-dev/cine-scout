import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { useToast } from "@/hooks/use-toast";
import { enrichMoviesWithTMDB, MovieSearchResult } from "@/lib/tmdb";

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
  const [recommendations, setRecommendations] = useState<MovieSearchResult[]>([]);
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
      const rawRecommendations = data.recommendations || [];
      setSearchedMovie(movieName);
      
      if (!rawRecommendations || rawRecommendations.length === 0) {
        toast({
          title: "No recommendations found",
          description: "Try searching for a different movie.",
          variant: "destructive",
        });
        setRecommendations([]);
        return;
      }

      // Enrich recommendations with TMDB data (posters, ratings, etc.)
      const movieTitles = rawRecommendations.map((m) => m.title);
      const enrichedMovies = await enrichMoviesWithTMDB(movieTitles);
      setRecommendations(enrichedMovies);
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar scrolled={true} />
      
      <div className="pt-20 sm:pt-24 px-4 md:px-8 pb-12 sm:pb-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Enter a movie you love and get personalized recommendations
          </p>
        </div>

        {/* Search Section */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                type="text"
                value={inputMovie}
                onChange={(e) => setInputMovie(e.target.value)}
                placeholder="Enter movie title (e.g., Inception, Avatar, The Dark Knight)"
                className="pl-10 sm:pl-12 pr-10 sm:pr-12 py-5 sm:py-6 bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-[#E50914] focus:ring-[#E50914] text-base sm:text-lg min-h-[44px]"
              />
              {inputMovie && (
                <button
                  type="button"
                  onClick={() => setInputMovie("")}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading || !inputMovie.trim()}
              className="bg-[#E50914] hover:bg-[#F40612] text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-md transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[44px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[2/3] bg-muted rounded-lg mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-6 sm:p-8">
              <p className="text-destructive text-base sm:text-lg mb-4">{error}</p>
              <Button
                onClick={handleRetry}
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/20 min-h-[44px]"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && recommendations.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8">
              Because you liked <span className="text-[#E50914]">{searchedMovie}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {recommendations.map((movie, index) => (
                <MovieCard key={movie.id || index} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && recommendations.length === 0 && searchedMovie && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-muted/50 border border-border rounded-lg p-6 sm:p-8">
              <p className="text-muted-foreground text-base sm:text-lg mb-4">
                No recommendations found for "{searchedMovie}"
              </p>
              <p className="text-muted-foreground/80">
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

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTrendingMovies, getTopRatedMovies, getPopularMovies, MovieSearchResult } from "@/lib/tmdb";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieRowProps {
  title: string;
  categoryIndex: number;
}

const MovieRow = ({ title, categoryIndex }: MovieRowProps) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let fetchedMovies: MovieSearchResult[] = [];
        
        // Map categories to TMDB endpoints
        if (title === "Trending This Week") {
          fetchedMovies = await getTrendingMovies();
        } else if (title === "Highly Rated Classics") {
          fetchedMovies = await getTopRatedMovies();
        } else if (title === "Recommended For You") {
          fetchedMovies = await getPopularMovies();
        }
        
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        // Fallback to empty array if API fails
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [title]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="px-4 md:px-8 mb-8 group">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && !loading && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full w-8 sm:w-12 rounded-none bg-background/50 hover:bg-background/75 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
        )}

        {/* Right Arrow */}
        {showRightArrow && !loading && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full w-8 sm:w-12 rounded-none bg-background/50 hover:bg-background/75 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
        )}

        {/* Movies Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
            // Loading skeletons
            [...Array(10)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[230px]">
                <Skeleton className="aspect-[2/3] rounded-md mb-2" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            ))
          ) : movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={movie.id || index} className="flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full py-8 text-muted-foreground">
              No movies available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;

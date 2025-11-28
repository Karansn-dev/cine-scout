import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieRowProps {
  title: string;
}

// Sample movie data
const generateMovies = (category: string) => {
  const movieTitles = [
    "The Cosmic Odyssey",
    "Midnight Chronicles",
    "Desert Storm",
    "Urban Legends",
    "Crystal Dreams",
    "Phoenix Rising",
    "Neon Nights",
    "Silent Echo",
    "Steel Hearts",
    "Paradise Lost",
  ];

  return movieTitles.map((title, index) => ({
    title: `${title}`,
    poster: `https://images.unsplash.com/photo-${1440000000000 + index * 1000000}?w=400&h=600&fit=crop&q=80`,
    rating: 7.5 + Math.random() * 2,
    year: 2020 + Math.floor(Math.random() * 5),
  }));
};

const MovieRow = ({ title }: MovieRowProps) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const movies = generateMovies(title);

  return (
    <div className="px-4 md:px-8 mb-8 group">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-black/50 hover:bg-black/75 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            )}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-black/50 hover:bg-black/75 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            )}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Movies Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie, index) => (
            <div key={index} className="flex-shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;

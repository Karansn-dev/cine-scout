import { useState } from "react";
import { Star } from "lucide-react";

interface Movie {
  title: string;
  poster?: string;
  rating?: number;
  year?: number;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-[120px] sm:w-[150px] md:w-[230px] cursor-pointer group transition-all duration-300 hover:scale-110 hover:z-10">
      <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-lg group-hover:shadow-2xl">
        {!imageError && movie.poster ? (
          <img
            src={movie.poster}
            alt={`${movie.title} movie poster`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <div className="text-center px-2 sm:px-4">
              <p className="text-muted-foreground text-xs sm:text-sm font-medium line-clamp-3">
                {movie.title}
              </p>
            </div>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 space-y-1">
            {movie.rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-3 w-3 fill-yellow-500" />
                <span className="text-xs font-semibold">{movie.rating.toFixed(1)}</span>
              </div>
            )}
            {movie.year && (
              <p className="text-xs text-muted-foreground">{movie.year}</p>
            )}
          </div>
        </div>
      </div>
      
      <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
        {movie.title}
      </p>
    </div>
  );
};

export default MovieCard;

/**
 * TMDB API Service
 * Handles all interactions with The Movie Database API
 * 
 * To use this service:
 * 1. Register for a free API key at https://www.themoviedb.org/settings/api
 * 2. Create a .env file in the project root
 * 3. Add: VITE_TMDB_API_KEY=your_api_key_here
 */

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Get API key from environment variables
const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) {
    console.warn(
      "TMDB API key not found. Please set VITE_TMDB_API_KEY in your .env file. " +
      "Get your free API key at https://www.themoviedb.org/settings/api"
    );
    return "";
  }
  return apiKey;
};

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface MovieSearchResult {
  title: string;
  poster?: string;
  rating?: number;
  year?: number;
  id?: number;
  overview?: string;
}

/**
 * Constructs the full image URL for TMDB poster images
 * @param posterPath - The poster path from TMDB API
 * @param size - Image size (w342 for cards, w500 for larger displays)
 */
export const getPosterUrl = (posterPath: string | null, size: string = "w342"): string | null => {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
};

/**
 * Searches for movies by title
 */
export const searchMovies = async (query: string): Promise<MovieSearchResult[]> => {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    return (data.results || []).slice(0, 10).map((movie: TMDBMovie) => ({
      title: movie.title,
      poster: getPosterUrl(movie.poster_path),
      rating: movie.vote_average,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
      id: movie.id,
      overview: movie.overview,
    }));
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

/**
 * Gets movie details by TMDB ID
 */
export const getMovieById = async (movieId: number): Promise<MovieSearchResult | null> => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const movie: TMDBMovie = await response.json();
    return {
      title: movie.title,
      poster: getPosterUrl(movie.poster_path, "w500"),
      rating: movie.vote_average,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
      id: movie.id,
      overview: movie.overview,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

/**
 * Gets trending movies
 */
export const getTrendingMovies = async (): Promise<MovieSearchResult[]> => {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${apiKey}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    return (data.results || []).slice(0, 20).map((movie: TMDBMovie) => ({
      title: movie.title,
      poster: getPosterUrl(movie.poster_path),
      rating: movie.vote_average,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
      id: movie.id,
      overview: movie.overview,
    }));
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

/**
 * Gets top rated movies
 */
export const getTopRatedMovies = async (): Promise<MovieSearchResult[]> => {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    return (data.results || []).slice(0, 20).map((movie: TMDBMovie) => ({
      title: movie.title,
      poster: getPosterUrl(movie.poster_path),
      rating: movie.vote_average,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
      id: movie.id,
      overview: movie.overview,
    }));
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};

/**
 * Gets popular movies
 */
export const getPopularMovies = async (): Promise<MovieSearchResult[]> => {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    return (data.results || []).slice(0, 20).map((movie: TMDBMovie) => ({
      title: movie.title,
      poster: getPosterUrl(movie.poster_path),
      rating: movie.vote_average,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
      id: movie.id,
      overview: movie.overview,
    }));
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

/**
 * Enriches movie recommendations with TMDB data
 * Takes an array of movie titles and fetches their poster images and metadata
 */
export const enrichMoviesWithTMDB = async (
  movieTitles: string[]
): Promise<MovieSearchResult[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    // Return movies without posters if API key is not available
    return movieTitles.map((title) => ({ title }));
  }

  try {
    // Fetch movie data for all titles concurrently
    const moviePromises = movieTitles.map((title) => searchMovies(title));
    const results = await Promise.all(moviePromises);

    // Map each title to the first search result (best match)
    return movieTitles.map((title, index) => {
      const searchResults = results[index];
      if (searchResults && searchResults.length > 0) {
        // Find exact match or use first result
        const match = searchResults.find((m) => 
          m.title.toLowerCase() === title.toLowerCase()
        ) || searchResults[0];
        return match;
      }
      return { title };
    });
  } catch (error) {
    console.error("Error enriching movies with TMDB data:", error);
    return movieTitles.map((title) => ({ title }));
  }
};


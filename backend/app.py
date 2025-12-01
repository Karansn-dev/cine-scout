"""
FastAPI Backend for Movie Recommendation System
Uses pre-computed similarity matrix or computes it from movies.pkl
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pickle
import pandas as pd
import requests
import os
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(
    title="Movie Recommendation API",
    description="API for movie recommendations using content-based filtering",
    version="1.0.0"
)

# CORS middleware - allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:5173",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
movies: Optional[pd.DataFrame] = None
similarity: Optional[np.ndarray] = None
TMDB_API_KEY: Optional[str] = None


class MovieRecommendation(BaseModel):
    """Movie recommendation response model"""
    title: str
    poster: Optional[str] = None
    rating: Optional[float] = None
    year: Optional[int] = None
    movie_id: Optional[int] = None


class RecommendationResponse(BaseModel):
    """API response model matching frontend expectations"""
    recommendations: List[MovieRecommendation]


def load_tmdb_api_key():
    """Load TMDB API key from environment variable or .env file"""
    global TMDB_API_KEY
    
    # First try environment variable
    TMDB_API_KEY = os.getenv("TMDB_API_KEY")
    
    # If not found, try to get from .env file in backend directory
    if not TMDB_API_KEY:
        env_path = os.path.join(os.path.dirname(__file__), ".env")
        if os.path.exists(env_path):
            try:
                with open(env_path, "r") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and line.startswith("TMDB_API_KEY="):
                            TMDB_API_KEY = line.split("=", 1)[1].strip().strip('"').strip("'")
                            break
            except Exception as e:
                print(f"Error reading .env file: {e}")
    
    if TMDB_API_KEY:
        print(f"✓ TMDB API key loaded successfully")
    else:
        print("WARNING: TMDB_API_KEY not found. Poster fetching will be disabled.")
        print("Set TMDB_API_KEY environment variable or create backend/.env file")


def load_data():
    """Load movies data and compute similarity matrix"""
    global movies, similarity
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Try to load pre-computed similarity matrix first
    similarity_path = os.path.join(current_dir, "similarity.pkl")
    movie_list_path = os.path.join(current_dir, "movie_list.pkl")
    movies_path = os.path.join(current_dir, "movies.pkl")
    
    # Check if pre-computed files exist
    if os.path.exists(similarity_path) and os.path.exists(movie_list_path):
        print("Loading pre-computed similarity matrix...")
        try:
            movies = pickle.load(open(movie_list_path, "rb"))
            similarity = pickle.load(open(similarity_path, "rb"))
            print(f"Loaded {len(movies)} movies with pre-computed similarity matrix")
            return
        except Exception as e:
            print(f"Error loading pre-computed files: {e}")
            print("Falling back to computing similarity from movies.pkl...")
    
    # Fall back to computing similarity from movies.pkl
    if os.path.exists(movies_path):
        print("Loading movies.pkl and computing similarity matrix...")
        try:
            movies = pickle.load(open(movies_path, "rb"))
            
            # Ensure required columns exist
            if not all(col in movies.columns for col in ['title', 'tags']):
                raise ValueError("movies.pkl must contain 'title' and 'tags' columns")
            
            # Clean data
            movies['title'] = movies['title'].str.strip()
            movies['tags'] = movies['tags'].fillna('').astype(str)
            
            # Compute TF-IDF and similarity
            print("Computing TF-IDF vectors...")
            tfidf = TfidfVectorizer(
                max_features=5000,
                stop_words='english',
                ngram_range=(1, 2),
                min_df=2,
                max_df=0.95
            )
            tfidf_matrix = tfidf.fit_transform(movies['tags'])
            
            print("Computing cosine similarity matrix...")
            similarity = cosine_similarity(tfidf_matrix)
            
            print(f"Successfully loaded {len(movies)} movies and computed similarity matrix")
            print(f"Similarity matrix shape: {similarity.shape}")
            
        except Exception as e:
            raise Exception(f"Error loading movies data: {str(e)}")
    else:
        raise FileNotFoundError(
            f"Neither similarity.pkl/movie_list.pkl nor movies.pkl found in {current_dir}"
        )


def fetch_poster(movie_id: int) -> Optional[str]:
    """Fetch movie poster from TMDB API"""
    if not TMDB_API_KEY:
        return None
    
    try:
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
        response = requests.get(url, timeout=5)
        
        if response.status_code != 200:
            return None
        
        data = response.json()
        poster_path = data.get("poster_path")
        
        if poster_path:
            return f"https://image.tmdb.org/t/p/w500/{poster_path}"
        return None
    except Exception as e:
        print(f"Error fetching poster for movie_id {movie_id}: {e}")
        return None


def find_movie_index(movie_title: str) -> Optional[int]:
    """
    Find movie index with fuzzy matching (case-insensitive, partial match)
    """
    if movies is None:
        return None
    
    movie_title_lower = movie_title.lower().strip()
    
    # Try exact match first
    exact_match = movies[movies['title'].str.lower() == movie_title_lower]
    if len(exact_match) > 0:
        return exact_match.index[0]
    
    # Try partial match (contains)
    partial_match = movies[movies['title'].str.lower().str.contains(movie_title_lower, na=False)]
    if len(partial_match) > 0:
        return partial_match.index[0]
    
    # Try word-based matching
    title_words = movie_title_lower.split()
    for word in title_words:
        if len(word) > 2:  # Ignore very short words
            word_match = movies[movies['title'].str.lower().str.contains(word, na=False)]
            if len(word_match) > 0:
                return word_match.index[0]
    
    return None


def recommend(movie_title: str, num_recommendations: int = 10) -> List[dict]:
    """
    Get movie recommendations based on similarity
    
    Args:
        movie_title: Title of the movie
        num_recommendations: Number of recommendations to return
    
    Returns:
        List of recommended movies with title, poster, movie_id
    """
    if movies is None or similarity is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please restart the server.")
    
    # Find movie index with fuzzy matching
    index = find_movie_index(movie_title)
    
    if index is None:
        raise HTTPException(
            status_code=404,
            detail=f"Movie '{movie_title}' not found in the database. Please try a different title."
        )
    
    # Get similarity scores
    distances = list(enumerate(similarity[index]))
    # Sort by similarity (highest first), skip the movie itself (index 0)
    distances = sorted(distances, reverse=True, key=lambda x: x[1])[1:num_recommendations+1]
    
    recommended_movies = []
    
    for idx, similarity_score in distances:
        movie_row = movies.iloc[idx]
        movie_id = int(movie_row['movie_id']) if 'movie_id' in movie_row else None
        
        # Fetch poster if movie_id is available
        poster = None
        if movie_id:
            poster = fetch_poster(movie_id)
        
        recommended_movies.append({
            "title": movie_row['title'],
            "poster": poster,
            "movie_id": movie_id
        })
    
    return recommended_movies


@app.on_event("startup")
async def startup_event():
    """Load data when server starts"""
    print("Starting Movie Recommendation API...")
    load_tmdb_api_key()
    load_data()
    print("API is ready!")


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Movie Recommendation API Running!",
        "total_movies": len(movies) if movies is not None else 0,
        "model_loaded": movies is not None and similarity is not None
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": movies is not None and similarity is not None,
        "total_movies": len(movies) if movies is not None else 0,
        "tmdb_configured": TMDB_API_KEY is not None
    }


@app.get("/recommend", response_model=RecommendationResponse)
def recommend_api(
    movie: str = Query(..., description="Movie title to get recommendations for"),
    limit: int = Query(10, ge=1, le=50, description="Number of recommendations")
):
    """
    Get movie recommendations
    
    Response format matches frontend expectations:
    {
        "recommendations": [
            {
                "title": "Movie Title",
                "poster": "url or null",
                "movie_id": 123
            }
        ]
    }
    """
    try:
        recommendations = recommend(movie, limit)
        
        # Convert to response format matching frontend
        return RecommendationResponse(
            recommendations=[
                MovieRecommendation(**rec) for rec in recommendations
            ]
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")


@app.get("/movies/search")
def search_movies(
    query: str = Query(..., description="Search query for movie titles"),
    limit: int = Query(10, ge=1, le=50, description="Maximum number of results")
):
    """Search for movies by title"""
    if movies is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    query_lower = query.lower().strip()
    
    # Filter movies that contain the query
    matching_movies = movies[
        movies['title'].str.lower().str.contains(query_lower, na=False)
    ].head(limit)
    
    results = []
    for _, row in matching_movies.iterrows():
        movie_id = int(row['movie_id']) if 'movie_id' in row else None
        poster = None
        if movie_id:
            poster = fetch_poster(movie_id)
        
        results.append({
            "title": row['title'],
            "poster": poster,
            "movie_id": movie_id
        })
    
    return {
        "query": query,
        "results": results,
        "total": len(results)
    }


@app.get("/movies/list")
def list_movies(
    limit: int = Query(20, ge=1, le=100, description="Number of movies to return"),
    offset: int = Query(0, ge=0, description="Offset for pagination")
):
    """Get a list of movies with pagination"""
    if movies is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    movies_slice = movies.iloc[offset:offset+limit]
    
    results = []
    for _, row in movies_slice.iterrows():
        movie_id = int(row['movie_id']) if 'movie_id' in row else None
        poster = None
        if movie_id:
            poster = fetch_poster(movie_id)
        
        results.append({
            "title": row['title'],
            "poster": poster,
            "movie_id": movie_id
        })
    
    return {
        "movies": results,
        "total": len(movies),
        "limit": limit,
        "offset": offset
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

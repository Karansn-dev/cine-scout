# Movie Recommendation API Backend

FastAPI backend for the MovieMatch recommendation system. Uses content-based filtering with cosine similarity to recommend movies based on their tags.

## Features

- **Flexible Data Loading**: Works with pre-computed similarity matrix OR computes it from movies.pkl
- **Content-Based Filtering**: Uses TF-IDF vectorization and cosine similarity on movie tags
- **Fuzzy Movie Matching**: Handles partial matches, case-insensitive searches, and word-based matching
- **TMDB Integration**: Fetches movie posters from TMDB API (optional)
- **RESTful API**: Clean API endpoints for recommendations, search, and movie listing
- **CORS Enabled**: Configured to work with the React frontend
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Response Format**: Matches frontend expectations exactly

## Setup

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

### Development Mode

```bash
python app.py
```

Or using uvicorn directly:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Production Mode

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Endpoints

### Root
- **GET** `/` - API information and status

### Health Check
- **GET** `/health` - Health check endpoint

### Recommendations
- **GET** `/recommend?movie={title}&limit={number}` - Get movie recommendations
  - Parameters:
    - `movie` (required): Movie title to get recommendations for
    - `limit` (optional): Number of recommendations (1-50, default: 10)
  - Example: `GET /recommend?movie=Avatar&limit=10`

### Search Movies
- **GET** `/movies/search?query={search_term}&limit={number}` - Search for movies
  - Parameters:
    - `query` (required): Search query
    - `limit` (optional): Maximum results (1-50, default: 10)
  - Example: `GET /movies/search?query=Avenger&limit=5`

### List Movies
- **GET** `/movies/list?limit={number}&offset={number}` - List movies with pagination
  - Parameters:
    - `limit` (optional): Number of movies (1-100, default: 20)
    - `offset` (optional): Pagination offset (default: 0)
  - Example: `GET /movies/list?limit=20&offset=0`

## API Response Format

### Recommendation Response
```json
{
  "recommendations": [
    {
      "title": "Movie Title",
      "movie_id": 12345
    }
  ],
  "searched_movie": "Avatar",
  "total_results": 10
}
```

### Error Response
```json
{
  "detail": "Error message here"
}
```

## How It Works

### Data Loading (Two Modes)

**Mode 1: Pre-computed Similarity Matrix (Preferred)**
- If `similarity.pkl` and `movie_list.pkl` exist, they are loaded directly
- Faster startup, no computation needed
- Use this if you have pre-computed similarity matrices

**Mode 2: Compute from movies.pkl (Fallback)**
- If pre-computed files don't exist, loads `movies.pkl`
- Computes TF-IDF vectors from movie tags
- Calculates cosine similarity matrix on startup
- Takes a few seconds but works with just movies.pkl

### Recommendation Process

1. **Movie Matching**: Finds the input movie using fuzzy matching:
   - Exact match (case-insensitive)
   - Partial match (title contains query)
   - Word-based match (any word in title matches)

2. **Similarity Lookup**: Retrieves similarity scores from the pre-computed matrix or calculates them

3. **Poster Fetching**: Optionally fetches movie posters from TMDB API using movie_id

4. **Response**: Returns recommendations in format matching frontend expectations

## Model Files

### Option 1: Pre-computed Files (Optional)
- `similarity.pkl`: Pre-computed cosine similarity matrix (numpy array)
- `movie_list.pkl`: Pandas DataFrame with movie data

### Option 2: movies.pkl (Required)
The `movies.pkl` file should contain a pandas DataFrame with:
- `movie_id`: Unique identifier for the movie (used for TMDB poster fetching)
- `title`: Movie title
- `tags`: Combined tags/description text used for similarity matching

## Environment Variables

Create a `backend/.env` file or set environment variable:
```
TMDB_API_KEY=your_tmdb_api_key_here
```

This is optional - if not set, the API will work but won't fetch movie posters. The frontend will still enrich recommendations with TMDB data.

## Troubleshooting

### Movie Not Found
If you get a 404 error, try:
- Using the exact movie title as it appears in the database
- Using partial titles (e.g., "Avenger" instead of "The Avengers")
- Checking the `/movies/search` endpoint to find available movies

### Model Not Loaded
If you get a 500 error about the model not being loaded:
- Ensure `movies.pkl` exists in the backend directory
- Check that the pickle file contains the correct DataFrame structure
- Restart the server

## Development

### Adding New Features

The code is structured to be easily extensible:
- Add new endpoints in `app.py`
- Modify the recommendation algorithm in `get_recommendations()`
- Adjust TF-IDF parameters in `load_movies_data()`

### Testing

Test the API using:
- Browser: Visit `http://localhost:8000/docs` for interactive API documentation
- curl: `curl http://localhost:8000/recommend?movie=Avatar`
- Postman or any HTTP client

## License

This project is part of the MovieMatch application.


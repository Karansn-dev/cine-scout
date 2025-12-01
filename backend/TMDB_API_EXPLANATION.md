# TMDB API Explanation

## What is TMDB?

**The Movie Database (TMDB)** is a free, community-driven movie and TV database API. It provides:
- Movie information (titles, descriptions, ratings, release dates)
- Movie posters and images
- Cast and crew information
- Reviews and ratings

**Website**: https://www.themoviedb.org/
**API Docs**: https://developers.themoviedb.org/3

---

## The Two URLs Explained

### 1. Movie Details Endpoint
```
https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US
```

**Purpose**: Fetches detailed information about a specific movie

**Parameters**:
- `{movie_id}`: The TMDB movie ID (e.g., 19995 for Avatar)
- `{TMDB_API_KEY}`: Your API key (get it free from https://www.themoviedb.org/settings/api)
- `language=en-US`: Language for the response (optional, defaults to English)

**What it returns** (JSON):
```json
{
  "id": 19995,
  "title": "Avatar",
  "overview": "In the 22nd century...",
  "release_date": "2009-12-18",
  "vote_average": 7.6,
  "poster_path": "/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg",
  "backdrop_path": "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
  "genres": [...],
  "runtime": 162,
  ...
}
```

**Key field we use**: `poster_path` - This is a relative path like `/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg`

**Example Request**:
```python
# In our code (backend/app.py)
url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
response = requests.get(url)
data = response.json()
poster_path = data.get("poster_path")  # Gets: "/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg"
```

---

### 2. Poster Image URL
```
https://image.tmdb.org/t/p/w500/{poster_path}
```

**Purpose**: Constructs the full URL to display a movie poster image

**Parameters**:
- `w500`: Image size/width
  - `w92` - Small thumbnail (92px wide)
  - `w154` - Small poster (154px wide)
  - `w185` - Medium poster (185px wide)
  - `w342` - Large poster (342px wide) - **Good for movie cards**
  - `w500` - Extra large poster (500px wide) - **Good for details page**
  - `w780` - Original size (780px wide)
  - `original` - Full resolution

- `{poster_path}`: The relative path from the first API call (e.g., `/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg`)

**What it returns**: A direct image URL you can use in `<img>` tags

**Example**:
```
Input poster_path: "/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg"
Full URL: https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg
```

**In our code**:
```python
# backend/app.py - fetch_poster() function
if poster_path:
    return f"https://image.tmdb.org/t/p/w500/{poster_path}"
```

---

## How They Work Together

### Step-by-Step Process:

1. **We have a movie_id** (from our movies.pkl file)
   - Example: `19995` (Avatar)

2. **Call Movie Details API** to get poster_path:
   ```
   GET https://api.themoviedb.org/3/movie/19995?api_key=YOUR_KEY&language=en-US
   ```
   Response includes: `"poster_path": "/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg"`

3. **Construct full image URL**:
   ```
   https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg
   ```

4. **Use in frontend**:
   ```jsx
   <img src="https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg" alt="Avatar" />
   ```

---

## Why We Use These

### In Our Project:

1. **Backend (`backend/app.py`)**:
   - Fetches movie details using movie_id from our database
   - Gets the poster_path
   - Constructs full image URL
   - Returns it to frontend in API response

2. **Frontend (`src/lib/tmdb.ts`)**:
   - Also uses TMDB API to search for movies
   - Enriches recommendations with posters
   - Uses `w342` size for movie cards (smaller, faster loading)

### Benefits:
- ✅ **Free API** - No cost for reasonable usage
- ✅ **High-quality images** - Professional movie posters
- ✅ **Comprehensive data** - Ratings, descriptions, release dates
- ✅ **Multiple image sizes** - Choose based on use case
- ✅ **Reliable** - Used by thousands of applications

---

## Image Size Recommendations

| Size | Width | Best For |
|------|-------|----------|
| `w92` | 92px | Thumbnails, lists |
| `w154` | 154px | Small cards |
| `w185` | 185px | Medium cards |
| `w342` | 342px | **Movie cards (our frontend)** |
| `w500` | 500px | **Details pages (our backend)** |
| `w780` | 780px | Large displays |
| `original` | Full | Maximum quality |

**Our Usage**:
- Backend uses `w500` (good quality for recommendations)
- Frontend uses `w342` (optimized for card display)

---

## API Key Setup

### Get Your Free API Key:

1. Go to https://www.themoviedb.org/
2. Sign up for a free account
3. Go to Settings → API
4. Request an API key (automatic approval for basic usage)
5. Copy your API key

### Set It Up:

**Option 1: Environment Variable**
```bash
# Windows
set TMDB_API_KEY=your_api_key_here

# macOS/Linux
export TMDB_API_KEY=your_api_key_here
```

**Option 2: Backend .env file**
Create `backend/.env`:
```
TMDB_API_KEY=your_api_key_here
```

**Option 3: Frontend .env file**
Create `.env` in project root:
```
VITE_TMDB_API_KEY=your_api_key_here
```

---

## Rate Limits

TMDB API has rate limits:
- **Free tier**: 40 requests per 10 seconds
- **Registered apps**: Higher limits

**Our usage**: Very low (only when fetching recommendations), so no issues

---

## Example: Complete Flow

```python
# 1. We have movie_id from our database
movie_id = 19995  # Avatar

# 2. Fetch movie details
url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}"
response = requests.get(url)
data = response.json()

# 3. Extract poster_path
poster_path = data["poster_path"]  
# Result: "/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg"

# 4. Construct full image URL
poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}"
# Result: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24LpRcu.jpg"

# 5. Use in frontend
# <img src={poster_url} alt="Avatar" />
```

---

## Troubleshooting

### Common Issues:

1. **"Invalid API Key"**
   - Check that your API key is correct
   - Make sure it's set in environment variable or .env file

2. **"Movie not found"**
   - The movie_id might not exist in TMDB
   - Some movies in our database might not have TMDB IDs

3. **"Rate limit exceeded"**
   - Too many requests too quickly
   - Add delays between requests if needed

4. **"Poster not available"**
   - Some movies don't have posters in TMDB
   - Our code handles this gracefully (returns None/null)

---

## Summary

- **First URL**: Gets movie information including poster path
- **Second URL**: Constructs the full image URL for displaying posters
- **Together**: They let us show beautiful movie posters in our app
- **Free**: No cost for reasonable usage
- **Easy**: Simple API, well-documented

These URLs are the bridge between our movie database (with movie_ids) and the visual movie posters users see in the app!


# 🚀 Quick Start Guide - MovieMatch Project

This guide will help you run the entire MovieMatch project (both frontend and backend).

## 📋 Prerequisites

Before starting, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (3.8 or higher) - [Download](https://www.python.org/downloads/)
- **npm** (comes with Node.js)
- **pip** (comes with Python)

## 🎯 Quick Start (Step by Step)

### Step 1: Clone and Navigate to Project

```bash
cd cine-scout
```

### Step 2: Set Up Frontend

1. Install frontend dependencies:
```bash
npm install
```

2. Create `.env` file in the project root:
```bash
# Create .env file
echo VITE_TMDB_API_KEY=your_tmdb_api_key_here > .env
```

   **Get your free TMDB API key**: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

   Replace `your_tmdb_api_key_here` with your actual API key.

### Step 3: Set Up Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
# Windows
python -m venv venv

# macOS/Linux
python3 -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

5. Go back to project root:
```bash
cd ..
```

### Step 4: Run Both Servers

You need **TWO terminal windows** open:

#### Terminal 1 - Backend Server

```bash
cd backend
venv\Scripts\activate  # Windows (or: source venv/bin/activate on macOS/Linux)
python app.py
```

You should see:
```
Starting Movie Recommendation API...
Initializing TF-IDF vectorizer...
Fitting TF-IDF on movie tags...
Successfully loaded 1494 movies
API is ready!
INFO:     Uvicorn running on http://0.0.0.0:8000
```

#### Terminal 2 - Frontend Server

```bash
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

### Step 5: Open the Application

Open your browser and go to: **http://localhost:8080**

## ✅ Verify Everything is Working

1. **Backend Health Check**: Visit http://localhost:8000/health
   - Should return: `{"status":"healthy","model_loaded":true,"total_movies":1494}`

2. **Backend API Docs**: Visit http://localhost:8000/docs
   - Should show Swagger UI with all API endpoints

3. **Frontend**: Visit http://localhost:8080
   - Should show the landing page

4. **Test Recommendation**:
   - Click "Get Started" → Sign In → Select Profile
   - Go to "Get Recommendations" page
   - Search for a movie like "Avatar" or "Inception"
   - Should see recommendations with movie posters

## 🛠️ Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'fastapi'`
- **Solution**: Make sure virtual environment is activated and run `pip install -r requirements.txt`

**Problem**: `FileNotFoundError: movies.pkl not found`
- **Solution**: Ensure `movies.pkl` exists in the `backend/` directory

**Problem**: Port 8000 already in use
- **Solution**: 
  - Windows: `netstat -ano | findstr :8000` then `taskkill /PID <pid> /F`
  - macOS/Linux: `lsof -ti:8000 | xargs kill`

### Frontend Issues

**Problem**: `Cannot connect to backend`
- **Solution**: 
  - Ensure backend is running on port 8000
  - Check CORS settings in `backend/app.py`
  - Verify the API URL in `src/pages/Recommend.tsx` is `http://localhost:8000`

**Problem**: `TMDB API key not found`
- **Solution**: Create `.env` file in project root with `VITE_TMDB_API_KEY=your_key`

**Problem**: Port 8080 already in use
- **Solution**: 
  - Change port in `vite.config.ts` or
  - Kill the process using port 8080

## 📝 Using Helper Scripts (Optional)

### Windows

**Run Backend Only:**
```bash
cd backend
run.bat
```

**Run Frontend Only:**
```bash
npm run dev
```

### macOS/Linux

**Run Backend Only:**
```bash
cd backend
chmod +x run.sh
./run.sh
```

## 🎬 What to Expect

Once everything is running:

1. **Landing Page** (`/`) - Welcome screen with "Get Started" button
2. **Login Page** (`/login`) - Sign in (currently simulated)
3. **Profile Selection** (`/profiles`) - Choose a profile
4. **Home Page** (`/home`) - Browse trending, top-rated, and popular movies
5. **Recommendations** (`/recommend`) - Get personalized movie recommendations

## 📚 Additional Resources

- **Backend API Documentation**: See `backend/README.md`
- **Frontend Documentation**: See main `README.md`
- **TMDB API**: [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)

## 🆘 Need Help?

If you encounter issues:
1. Check that both servers are running
2. Verify all dependencies are installed
3. Check the console/terminal for error messages
4. Ensure ports 8000 (backend) and 8080 (frontend) are available

---

**Happy Coding! 🎉**


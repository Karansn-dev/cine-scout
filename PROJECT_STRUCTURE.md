# 📁 Project Structure

```
cine-scout/
│
├── 📄 START_HERE.md          # ⭐ START HERE - Complete setup guide
├── 📄 README.md               # Main project documentation
├── 📄 PROJECT_STRUCTURE.md    # This file
│
├── 🎨 Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Navbar.tsx    # Navigation with theme toggle
│   │   │   ├── MovieCard.tsx # Movie card component
│   │   │   ├── MovieRow.tsx  # Movie carousel row
│   │   │   └── ui/           # shadcn-ui components
│   │   ├── contexts/         # React contexts
│   │   │   ├── AuthContext.tsx      # Authentication state
│   │   │   └── ThemeProvider.tsx   # Theme management
│   │   ├── lib/
│   │   │   ├── tmdb.ts       # TMDB API integration
│   │   │   └── utils.ts      # Utility functions
│   │   ├── pages/            # Page components
│   │   │   ├── Landing.tsx   # Landing page
│   │   │   ├── Login.tsx     # Login page
│   │   │   ├── Profiles.tsx  # Profile selection
│   │   │   ├── Home.tsx      # Home page
│   │   │   └── Recommend.tsx # Recommendations page
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   └── .env                   # Environment variables (create this)
│
├── 🐍 Backend (FastAPI + Python)
│   ├── backend/
│   │   ├── app.py            # FastAPI application
│   │   ├── movies.pkl        # Trained model/data
│   │   ├── requirements.txt  # Python dependencies
│   │   ├── README.md         # Backend documentation
│   │   ├── run.bat           # Windows startup script
│   │   └── run.sh            # Linux/Mac startup script
│   └── venv/                  # Python virtual environment (created)
│
├── 🚀 Startup Scripts
│   ├── start-all.bat         # Windows: Start both servers
│   ├── start-all.sh          # Linux/Mac: Start both servers
│   ├── start-backend.bat     # Windows: Backend only
│   ├── start-backend.sh      # Linux/Mac: Backend only
│   ├── start-frontend.bat    # Windows: Frontend only
│   └── start-frontend.sh     # Linux/Mac: Frontend only
│
└── 📝 Configuration
    ├── .gitignore            # Git ignore rules
    └── tailwind.config.ts    # Tailwind CSS config
```

## 🔄 How It Works

```
┌─────────────────┐
│   User Browser  │
│  (localhost:8080)│
└────────┬─────────┘
         │
         │ HTTP Requests
         ▼
┌─────────────────┐
│  React Frontend │
│   (Vite Dev)    │
│  Port: 8080     │
└────────┬─────────┘
         │
         │ API Calls
         ▼
┌─────────────────┐
│  FastAPI Backend│
│  Port: 8000     │
│                 │
│  ┌───────────┐ │
│  │ movies.pkl│ │  ← Trained model/data
│  └───────────┘ │
│                 │
│  ┌───────────┐ │
│  │ TF-IDF    │ │  ← Content-based filtering
│  │ Vectorizer│ │
│  └───────────┘ │
└────────┬─────────┘
         │
         │ External API
         ▼
┌─────────────────┐
│   TMDB API      │
│  (Movie Posters)│
└─────────────────┘
```

## 📦 Key Files Explained

### Frontend
- **`src/App.tsx`**: Main application with routing and providers
- **`src/pages/Recommend.tsx`**: Calls backend API for recommendations
- **`src/lib/tmdb.ts`**: Fetches movie posters from TMDB
- **`.env`**: Contains `VITE_TMDB_API_KEY` (you need to create this)

### Backend
- **`backend/app.py`**: FastAPI server with recommendation endpoints
- **`backend/movies.pkl`**: Contains 1494 movies with tags for similarity matching
- **`backend/requirements.txt`**: Python package dependencies

## 🎯 Quick Commands Reference

### Windows
```bash
# Start everything
start-all.bat

# Or separately
start-backend.bat    # Terminal 1
start-frontend.bat   # Terminal 2
```

### macOS/Linux
```bash
# Make scripts executable (first time)
chmod +x *.sh

# Start everything
./start-all.sh

# Or separately
./start-backend.sh   # Terminal 1
./start-frontend.sh  # Terminal 2
```

### Manual
```bash
# Backend
cd backend
python app.py

# Frontend (new terminal)
npm run dev
```

## 🔌 Ports Used

- **8080**: Frontend (Vite dev server)
- **8000**: Backend (FastAPI)

## 📚 Documentation Files

- **START_HERE.md**: Complete setup guide ⭐
- **README.md**: Project overview and features
- **backend/README.md**: Backend API documentation
- **PROJECT_STRUCTURE.md**: This file


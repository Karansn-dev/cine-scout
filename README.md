# MovieMatch - Netflix-Inspired Movie Recommender System

A modern, responsive movie recommendation web application built with React, TypeScript, and Tailwind CSS. Features AI-powered movie recommendations, dynamic movie posters from TMDB, theme toggle (light/dark mode), and authentication flow.

> **🚀 Quick Start**: See [START_HERE.md](START_HERE.md) for step-by-step instructions to run the entire project!

## Features

### 🎨 Theme Toggle
- **Light and Dark Modes**: Seamlessly switch between light and dark themes
- **Persistent Preferences**: Theme selection is saved in browser localStorage
- **Smooth Transitions**: 300ms transitions for all color changes
- **WCAG Compliant**: Maintains proper contrast ratios for accessibility

### 🔐 Authentication Flow
- **Protected Routes**: Authentication required for accessing home, profiles, and recommendation pages
- **Session Persistence**: Authentication state persists across page refreshes
- **Automatic Redirects**: Unauthenticated users are redirected to login page
- **Sign Out Functionality**: Complete sign-out with state clearing

### 🎬 Dynamic Movie Posters (TMDB Integration)
- **Real Movie Data**: Fetches actual movie posters, ratings, and metadata from The Movie Database (TMDB)
- **Trending Movies**: Displays weekly trending movies
- **Top Rated Classics**: Shows highly rated classic films
- **Popular Movies**: Features popular movie recommendations
- **Enhanced Recommendations**: Enriches FastAPI backend recommendations with TMDB poster images
- **Error Handling**: Graceful fallbacks when images are unavailable
- **Loading States**: Skeleton loaders during data fetching

### 📱 Responsive Design
- **Mobile First**: Optimized for mobile devices (320px+)
- **Tablet Support**: Enhanced layouts for tablets (768px+)
- **Desktop Experience**: Full-featured desktop interface (1024px+)
- **Touch-Friendly**: All interactive elements meet 44px minimum touch target
- **Adaptive Layouts**: Movie carousels display 2-3 cards on mobile, more on larger screens

## Project info

**URL**: https://lovable.dev/projects/a88bb0ad-89ff-462f-acf3-8c2d0c63da52

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Python 3.8 or higher (for backend)
- pip package manager

### Frontend Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd cine-scout
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the project root
   - Add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   - Get your free API key from [TMDB Settings](https://www.themoviedb.org/settings/api)

4. Start the frontend development server:
```sh
npm run dev
```

The frontend will be available at `http://localhost:8080`

### Backend Installation

1. Navigate to the backend directory:
```sh
cd backend
```

2. Create a virtual environment (recommended):
```sh
python -m venv venv
```

3. Activate the virtual environment:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

4. Install Python dependencies:
```sh
pip install -r requirements.txt
```

5. Start the backend server:
```sh
python app.py
```

Or use the provided scripts:
- Windows: `run.bat`
- macOS/Linux: `chmod +x run.sh && ./run.sh`

The backend API will be available at `http://localhost:8000`

### Running Both Servers

For the full application to work, you need both servers running. You have two options:

#### Option 1: Use Helper Scripts (Easiest)

**Windows:**
- Run everything at once: Double-click `start-all.bat`
- Or run separately:
  - `start-backend.bat` (in one terminal)
  - `start-frontend.bat` (in another terminal)

**macOS/Linux:**
```bash
# Make scripts executable (first time only)
chmod +x start-all.sh start-backend.sh start-frontend.sh

# Run everything at once
./start-all.sh

# Or run separately
./start-backend.sh  # Terminal 1
./start-frontend.sh  # Terminal 2
```

#### Option 2: Manual Setup

1. **Terminal 1** - Backend:
   ```sh
   cd backend
   python app.py
   ```

2. **Terminal 2** - Frontend:
   ```sh
   npm run dev
   ```

The frontend will automatically connect to the backend API at `http://localhost:8000`

> **📖 For detailed step-by-step instructions, see [START_HERE.md](START_HERE.md)**

### Building for Production

```sh
npm run build
```

The production build will be in the `dist` directory.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a88bb0ad-89ff-462f-acf3-8c2d0c63da52) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Technologies Used

### Frontend
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library
- **React Router** - Client-side routing
- **shadcn-ui** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **next-themes** - Theme management
- **TanStack Query** - Data fetching and caching
- **TMDB API** - Movie database and poster images
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Python 3.8+** - Programming language
- **Pandas** - Data manipulation and analysis
- **Scikit-learn** - Machine learning library (TF-IDF, cosine similarity)
- **NumPy** - Numerical computing
- **Uvicorn** - ASGI server for FastAPI

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-ui components
│   ├── Navbar.tsx      # Navigation with theme toggle
│   ├── MovieCard.tsx   # Movie card component
│   ├── MovieRow.tsx    # Movie carousel row
│   └── HeroBanner.tsx  # Hero section
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeProvider.tsx # Theme management
├── lib/                # Utility functions
│   ├── tmdb.ts        # TMDB API integration
│   └── utils.ts       # Helper functions
├── pages/              # Page components
│   ├── Landing.tsx     # Landing page
│   ├── Login.tsx       # Login page
│   ├── Profiles.tsx    # Profile selection
│   ├── Home.tsx        # Home page with movie rows
│   └── Recommend.tsx   # Movie recommendation page
└── App.tsx             # Main app component with routing
```

## Key Features Implementation

### Theme Toggle
The theme toggle is implemented using `next-themes` and is accessible from the navigation bar. The theme preference is stored in localStorage and persists across sessions.

### Authentication
Authentication is currently simulated using React Context API and sessionStorage. The system is designed to be easily integrated with Firebase Authentication in the future.

### TMDB Integration
The application uses The Movie Database (TMDB) API to fetch:
- Movie posters (w342 for cards, w500 for larger displays)
- Movie ratings and release years
- Trending, top-rated, and popular movies

All API calls include proper error handling and fallback mechanisms.

### Responsive Design
The application uses Tailwind CSS breakpoints:
- `sm:` - 640px and up (small tablets)
- `md:` - 768px and up (tablets)
- `lg:` - 1024px and up (desktops)
- `xl:` - 1280px and up (large desktops)

## API Documentation

Once the backend is running, you can access:
- **Interactive API Docs**: `http://localhost:8000/docs` (Swagger UI)
- **Alternative Docs**: `http://localhost:8000/redoc` (ReDoc)

### Main Endpoints

- `GET /recommend?movie={title}&limit={number}` - Get movie recommendations
- `GET /movies/search?query={term}` - Search for movies
- `GET /movies/list?limit={number}&offset={number}` - List movies with pagination
- `GET /health` - Health check

See `backend/README.md` for detailed API documentation.

## How the Recommendation System Works

1. **Content-Based Filtering**: Uses TF-IDF (Term Frequency-Inverse Document Frequency) vectorization on movie tags
2. **Similarity Calculation**: Computes cosine similarity between movies based on their tag vectors
3. **Recommendation**: Returns movies with the highest similarity scores to the input movie
4. **Fuzzy Matching**: Handles partial matches and case-insensitive movie title searches

## Future Enhancements

- [ ] Firebase Authentication integration
- [ ] User profile management
- [ ] Watchlist functionality
- [ ] Movie details page
- [ ] Advanced search functionality
- [ ] Movie reviews and ratings
- [ ] Social features (sharing, recommendations)
- [ ] Collaborative filtering recommendations
- [ ] User-based recommendations
- [ ] Recommendation history

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a88bb0ad-89ff-462f-acf3-8c2d0c63da52) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

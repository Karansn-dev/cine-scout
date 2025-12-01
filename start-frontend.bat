@echo off
echo ========================================
echo   Starting MovieMatch Frontend Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please create .env file with: VITE_TMDB_API_KEY=your_api_key
    echo.
    pause
)

REM Start the frontend server
echo Starting Vite development server...
echo Frontend will be available at: http://localhost:8080
echo.
call npm run dev

pause


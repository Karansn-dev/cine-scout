@echo off
echo ========================================
echo   Starting MovieMatch - Full Stack
echo ========================================
echo.
echo This will start both backend and frontend servers.
echo You will need to keep both windows open.
echo.
pause

REM Start backend in new window
start "MovieMatch Backend" cmd /k "cd /d %~dp0backend && if not exist venv\ python -m venv venv && call venv\Scripts\activate.bat && pip install -r requirements.txt >nul 2>&1 && python app.py"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "MovieMatch Frontend" cmd /k "cd /d %~dp0 && if not exist node_modules\ npm install && npm run dev"

echo.
echo ========================================
echo   Both servers are starting...
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:8080
echo.
echo Close this window when done.
pause


#!/bin/bash

echo "========================================"
echo "  Starting MovieMatch - Full Stack"
echo "========================================"
echo ""
echo "This will start both backend and frontend servers."
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo "Port $1 is already in use!"
        return 1
    fi
    return 0
}

# Check ports
if ! check_port 8000; then
    echo "Please free port 8000 or stop the existing backend server."
    exit 1
fi

if ! check_port 8080; then
    echo "Please free port 8080 or stop the existing frontend server."
    exit 1
fi

# Start backend in background
echo "Starting backend server..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
if ! pip show fastapi > /dev/null 2>&1; then
    pip install -r requirements.txt > /dev/null 2>&1
fi
python app.py > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 3

# Start frontend
echo "Starting frontend server..."
if [ ! -d "node_modules" ]; then
    npm install
fi

echo ""
echo "========================================"
echo "  Both servers are starting..."
echo "========================================"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:8080"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Press Ctrl+C to stop both servers"
echo ""

# Trap Ctrl+C to kill both processes
trap "kill $BACKEND_PID 2>/dev/null; exit" INT TERM

# Start frontend (this will block)
npm run dev

# Cleanup on exit
kill $BACKEND_PID 2>/dev/null


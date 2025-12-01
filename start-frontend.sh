#!/bin/bash

echo "========================================"
echo "  Starting MovieMatch Frontend Server"
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "WARNING: .env file not found!"
    echo "Please create .env file with: VITE_TMDB_API_KEY=your_api_key"
    echo ""
    read -p "Press enter to continue..."
fi

# Start the frontend server
echo "Starting Vite development server..."
echo "Frontend will be available at: http://localhost:8080"
echo ""
npm run dev


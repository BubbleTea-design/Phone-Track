#!/bin/bash

echo ""
echo "========================================"
echo "  Phone Tracker - Starting Application"
echo "========================================"
echo ""

# Start backend
cd backend
echo "Starting Backend Server on http://localhost:5000..."
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
cd ../frontend
echo ""
echo "Starting Frontend React App on http://localhost:3000..."
npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  Backend: http://localhost:5000"
echo "  Frontend: http://localhost:3000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

@echo off
echo.
echo ========================================
echo   Phone Tracker - Starting Application
echo ========================================
echo.

REM Start backend in a new terminal window
start cmd /k "cd backend && echo Starting Backend Server... && timeout /t 2 && npm start"

REM Wait a bit for backend to start
timeout /t 3

REM Start frontend in a new terminal window
start cmd /k "cd frontend && echo Starting Frontend React App... && timeout /t 2 && npm start"

echo.
echo ========================================
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo ========================================
echo.
echo Two terminal windows should open automatically.
echo Close both terminals when done.
pause

@echo off
echo =====================================================================
echo           AgriChain Global - Startup Script
echo   Blockchain-Based Agricultural Import-Export Marketplace
echo =====================================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking dependencies...
if not exist "node_modules\" (
    echo Installing root dependencies...
    call npm install
)

if not exist "server\node_modules\" (
    echo Installing backend dependencies...
    cd server
    call npm install
    cd ..
)

if not exist "client\node_modules\" (
    echo Installing frontend dependencies...
    cd client
    call npm install
    cd ..
)

echo.
echo [2/3] Launching AgriChain Global Services...
echo - Backend API:  http://localhost:5000
echo - Frontend App: http://localhost:5173
echo.
echo [3/3] Starting concurrent dev environment...
echo Press Ctrl+C in this terminal window to stop the servers.
echo =====================================================================
echo.

npm run dev
pause

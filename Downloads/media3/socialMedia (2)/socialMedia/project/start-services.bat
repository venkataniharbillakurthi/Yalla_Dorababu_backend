@echo off
echo Starting Social Media Automation Services...

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed or not in PATH!
    echo Please install Python 3.8+ and try again.
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed or not in PATH!
    echo Please install Node.js and try again.
    pause
    exit /b 1
)

:: Install Python dependencies if requirements.txt exists
if exist requirements.txt (
    echo Installing Python dependencies...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo Failed to install Python dependencies!
        pause
        exit /b 1
    )
)

:: Install Node.js dependencies if package.json exists
if exist package.json (
    echo Installing Node.js dependencies...
    npm install
    if errorlevel 1 (
        echo Failed to install Node.js dependencies!
        pause
        exit /b 1
    )
)

:: Create new command prompt windows for each service
echo Starting backend server...
start "FastAPI Backend" cmd /k "cd /d %~dp0 && python -m uvicorn src.insta_main:app --reload --host 0.0.0.0 --port 8000"

timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "React Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================
echo Services are starting up!
echo ========================================
echo Backend API: http://localhost:8000
echo Frontend App: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo ========================================
echo.
echo Both services should open in separate command prompt windows.
echo Press any key to exit this launcher...
pause >nul

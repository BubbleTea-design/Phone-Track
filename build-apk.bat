@echo off
REM APK Build Script for Phone Tracker - Windows

echo.
echo 📱 Phone Tracker Android APK Builder
echo ======================================
echo.

REM Check if in frontend directory
if not exist "package.json" (
    echo Error: This script must be run from the frontend directory
    pause
    exit /b 1
)

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 goto error

echo.
echo Step 2: Building React app...
call npm run build
if %errorlevel% neq 0 goto error

echo.
echo Step 3: Checking Capacitor installation...
if not exist "node_modules\@capacitor\core" (
    echo Installing Capacitor...
    call npm install @capacitor/core @capacitor/cli --save
    if %errorlevel% neq 0 goto error
)

echo.
echo Step 4: Checking Capacitor initialization...
if not exist "capacitor.config.ts" (
    echo Initializing Capacitor...
    call npx cap init "Phone Tracker" "com.phonetracker.app"
    if %errorlevel% neq 0 goto error
)

echo.
echo Step 5: Checking Android platform...
if not exist "android" (
    echo Adding Android platform...
    call npx cap add android
    if %errorlevel% neq 0 goto error
)

echo.
echo Step 6: Syncing build with Capacitor...
call npx cap copy
if %errorlevel% neq 0 goto error

echo.
echo ✓ Setup complete!
echo.
echo Next steps:
echo 1. Open Android Studio: npx cap open android
echo 2. Build APK: Build menu ^> Build Bundle/APK ^> APK ^> Release
echo 3. APK location: android\app\release\app-release.apk
echo.
pause
exit /b 0

:error
echo.
echo Error occurred during build process
pause
exit /b 1

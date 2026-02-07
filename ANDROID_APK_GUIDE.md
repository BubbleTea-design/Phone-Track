# Phone Tracker - Android APK Build Instructions

This guide walks you through building Android APK files for your Phone Tracker app using **Capacitor**.

## What You'll Build
- **Tracker APK** - Runs on the phone being tracked (sends location)
- **Dashboard APK** - Shows real-time location on map (monitors the phone)

## Prerequisites (One-time Setup)

### 1. Install Java Development Kit (JDK)
- **Download**: https://www.oracle.com/java/technologies/downloads/
- Choose **JDK 11 or newer**
- Install and note the installation path

### 2. Install Android Studio
- **Download**: https://developer.android.com/studio
- Install and run Android Studio
- Complete the setup wizard (installs Android SDK)

### 3. Set Environment Variables (Windows)
Right-click **This PC** → **Properties** → **Advanced system settings**:

Add these variables:
```
JAVA_HOME = C:\Program Files\Java\jdk-11.0.x (your JDK path)
ANDROID_SDK_ROOT = C:\Users\YourUsername\AppData\Local\Android\Sdk
```

## Build Steps

### Step 1: Open Terminal in Project Folder
```powershell
cd "d:\Project Website\Phone Track\frontend"
```

### Step 2: Install Capacitor Tools
```bash
npm install @capacitor/core @capacitor/cli @capacitor/geolocation @capacitor-community/background-geolocation
```

### Step 3: Initialize Capacitor
```bash
npx cap init
```
When prompted:
- **App name**: Phone Tracker
- **Package ID**: com.phonetracker.app (for tracker)
  - *For dashboard: com.phonetracker.dashboard*

### Step 4: Build React App
```bash
npm run build
```
This creates the `build/` folder with optimized production code.

### Step 5: Add Android Platform
```bash
npx cap add android
```
This creates the `android/` folder with the native Android project.

### Step 6: Sync Files
```bash
npx cap copy
npx cap sync
```

### Step 7: Open in Android Studio
```bash
npx cap open android
```

This opens Android Studio with your project.

### Step 8: Build APK in Android Studio
1. Click **Build** menu → **Build Bundle/APK**
2. Select **Build APK**
3. Choose **Release** (for production)
4. Wait for build to complete (5-10 minutes)
5. APK location will be shown in output

### Step 9: Find Your APK
APK will be at:
```
frontend/android/app/release/app-release.apk
```

## Building Two Separate APKs

To have one for Tracker and one for Dashboard:

### For Tracker APK:
```bash
npx cap init
# App name: Phone Tracker - Tracker
# Package ID: com.phonetracker.tracker
npx cap add android
npm run build
npx cap copy
```

### For Dashboard APK:
```bash
npx cap init  
# App name: Phone Tracker - Dashboard
# Package ID: com.phonetracker.dashboard
npx cap add android
npm run build
npx cap copy
```

## Testing APK

### On Android Phone:
1. Enable **Developer Mode**: Settings → About → Tap Build Number 7 times
2. Enable **USB Debugging**: Developer Options → USB Debugging
3. Connect phone via USB
4. In Android Studio: **Run** → **Select Device** → Click **Run**

Or manually:
```bash
adb install app-release.apk
```

## Sharing APK

### Option 1: Direct File Share
- Zip the `app-release.apk` file
- Share via email, Google Drive, or WhatsApp

### Option 2: Upload to Google Play Store
- Create Google Play Developer Account ($25)
- Sign APK with release key
- Upload and publish

### Option 3: Web Hosting
- Host APK on your server
- Users download and install

## Quick Command Reference

```bash
# Navigate to frontend
cd "d:\Project Website\Phone Track\frontend"

# Install dependencies
npm install

# Build for production
npm run build

# Initialize Capacitor
npx cap init

# Add Android support
npx cap add android

# Sync with Android
npx cap sync
npx cap copy

# Open in Android Studio
npx cap open android

# Build APK
# (In Android Studio: Build → Build Bundle/APK → Build APK)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Java not found" | Check JAVA_HOME environment variable |
| "Android SDK not found" | Check ANDROID_SDK_ROOT or reinstall Android Studio |
| Build fails | Clean: `npx cap clean`, then `npx cap add android` |
| App crashes | Check browser console for errors locally first |
| Location not working | Ensure app is installed from APK (not debug build) |

## Security Notes

- APKs are production-ready but unsigned
- For store publishing, sign with a keystore
- Keep your keystore file safe (needed for updates)

---

Ready to build? Start with **Step 1** above! 🚀

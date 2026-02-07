# Android APK Build Instructions - Phone Tracker

## Overview
This guide provides step-by-step instructions to build native Android APKs for the Phone Tracker app. You'll create two versions:
- **Phone Tracker Dashboard** - Monitor device locations
- **Phone Tracker** (or keep single app with mode selection)

## Prerequisites

### 1. Install Required Software

#### Windows:
1. **Download Java Development Kit (JDK) 11+**
   - URL: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
   - Install to: `C:\Program Files\Java\jdk-11.x.x` (or your preferred location)

2. **Download Android Studio**
   - URL: https://developer.android.com/studio
   - Run installer and select "Android SDK"
   - During installation, check "Android Virtual Device"

3. **Set Environment Variables** (Windows):
   - Right-click "This PC" → Properties → Advanced system settings
   - Click "Environment Variables"
   - Add new System variables:
     ```
     JAVA_HOME = C:\Program Files\Java\jdk-11.x.x
     ANDROID_SDK_ROOT = C:\Users\[YourUsername]\AppData\Local\Android\Sdk
     ```
   - Add to PATH:
     ```
     C:\Program Files\Java\jdk-11.x.x\bin
     C:\Users\[YourUsername]\AppData\Local\Android\Sdk\tools
     C:\Users\[YourUsername]\AppData\Local\Android\Sdk\platform-tools
     ```

#### Mac:
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java and Android tools
brew install java
brew install android-sdk
brew install android-ndk
```

#### Linux:
```bash
sudo apt-get update
sudo apt-get install default-jdk
# Download Android Studio from https://developer.android.com/studio
```

## Building the APK

### Step 1: Navigate to Frontend Directory
```bash
cd "d:\Project Website\Phone Track\frontend"
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs all Node.js dependencies including Capacitor.

### Step 3: Build React Production App
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Step 4: Initialize Capacitor (First Time Only)
```bash
npx cap init "Phone Tracker" "com.phonetracker.app"
```

When prompted, confirm the app name and package ID.

### Step 5: Add Android Platform (First Time Only)
```bash
npx cap add android
```

This downloads the Android SDK and creates the `android/` folder with the Android project.

### Step 6: Sync Build with Capacitor
```bash
npx cap copy
```

This copies your React build into the Android project.

### Step 7: Open in Android Studio
```bash
npx cap open android
```

This launches Android Studio with the Android project ready to build.

## Building with Android Studio

1. **Wait for Gradle to Sync**
   - Android Studio will automatically sync Gradle files (bottom of screen)
   - Wait until you see "Gradle build finished"

2. **Select Build Type**
   - Menu: `Build` → `Build Bundle/APK`
   - Choose `APK` (not Bundle, unless you're uploading to Play Store)

3. **Select Build Variant**
   - Choose `release` (production build with optimizations)
   - This creates the final APK file

4. **Start Build**
   - Click "Build"
   - Wait for compilation to complete (~5-10 minutes)

5. **Locate APK**
   - After successful build, you'll see a notification
   - APK location: `frontend/android/app/release/app-release.apk`

## Quick Build Scripts

### Windows - Run Build Script:
```bash
cd "d:\Project Website\Phone Track"
.\build-apk.bat
```

### Mac/Linux - Run Build Script:
```bash
cd "d:\Project Website\Phone Track"
chmod +x build-apk.sh
./build-apk.sh
```

## Creating Two Separate APKs

If you want separate Tracker and Dashboard apps:

### For Dashboard APK:
```bash
# Keep current setup:
npx cap init "Phone Tracker Dashboard" "com.phonetracker.dashboard"
npx cap add android
npx cap copy
npx cap open android
```

### For Tracker APK:
```bash
# Create separate folder or use different package ID:
npx cap init "Phone Tracker" "com.phonetracker.tracker"
npx cap add android
npx cap copy
npx cap open android
```

## APK File Details

**File Name:** `app-release.apk`

**Size:** ~50-80 MB (depending on optimization)

**Features Included:**
- ✅ Real-time GPS tracking
- ✅ Background location sync (via Service Worker)
- ✅ Offline support (PWA)
- ✅ Beautiful Google Maps-style interface
- ✅ Location history visualization
- ✅ Live tracking indicator

**Requirements:**
- Android 8.0+ (API level 26+)
- Location permission (GPS)
- Internet connection (for server sync)

## Testing APK

### On Physical Device:
1. Enable "Developer Options" (tap Build Number 7 times in Settings)
2. Enable "USB Debugging"
3. Connect phone via USB cable
4. In Android Studio: Run → Select Device
5. Build and run APK directly

### On Emulator:
1. Android Studio → Tools → AVD Manager
2. Create virtual device (Pixel 4, Android 12+)
3. Run emulator
4. Android Studio: Run → Select emulator
5. Build and run APK

## Troubleshooting

### "Java not found"
- Verify JAVA_HOME environment variable is set correctly
- Restart computer after setting environment variables

### "Android SDK not found"
- Check ANDROID_SDK_ROOT environment variable
- Android Studio → File → Settings → Appearance & Behavior → System Settings → Android SDK

### "Gradle sync failed"
- File → Sync Now
- If persists: File → Invalidate Caches → Restart

### "Build fails with permission errors"
- Ensure `app/build.gradle` has correct minimum SDK (>=26)
- Check `AndroidManifest.xml` has location permissions

### "APK won't install on device"
- Verify app isn't already installed: `adb uninstall com.phonetracker.app`
- Check device has enough storage space
- Ensure package ID matches in `capacitor.config.ts`

## Uploading to Google Play Store

1. Create Google Play Developer account: $25 one-time fee
2. Create new app in Play Console
3. Upload APK signed with release key
4. Fill in app details, screenshots, description
5. Submit for review (typically 24-48 hours)

## Commands Summary

```bash
# Setup (first time)
npm install
npm run build
npx cap init "Phone Tracker" "com.phonetracker.app"
npx cap add android

# Rebuild after code changes
npm run build
npx cap copy

# Open in Android Studio
npx cap open android

# All in one command
npm run apk:build
```

## Resources

- Capacitor Docs: https://capacitorjs.com
- Android Studio: https://developer.android.com/studio
- React Android Guide: https://react-native.dev/docs/android-setup
- Google Play Console: https://play.google.com/console

---

**Need Help?**
- Refer to APK_BUILD_GUIDE.md for quick reference
- Check Capacitor documentation: https://capacitorjs.com/docs
- Android Studio Help: Help → Help Topics

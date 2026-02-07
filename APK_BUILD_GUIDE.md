# Android APK Build Guide

This guide will help you build Android APK files for Phone Tracker using Capacitor.

## Requirements

1. **Node.js & npm** (already installed)
2. **Java Development Kit (JDK)** - [Download JDK 11+](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
3. **Android SDK** - [Download Android Studio](https://developer.android.com/studio)
4. **Environment Variables** - Set JAVA_HOME and ANDROID_SDK_ROOT

## Step 1: Install Capacitor

```bash
cd frontend
npm install @capacitor/core @capacitor/cli --save
npx cap init
```

When prompted:
- App name: `Phone Tracker`
- App Package ID: `com.phonetracker.app`

## Step 2: Add Android Support

```bash
npx cap add android
```

This creates an `android/` folder with the Android project.

## Step 3: Build React App

```bash
npm run build
```

## Step 4: Copy Build to Capacitor

```bash
npx cap copy
```

## Step 5: Open in Android Studio

```bash
npx cap open android
```

This opens Android Studio. Then:
1. Click **Build** → **Build Bundle/APK**
2. Select **APK** → **Release** (for production)
3. Android Studio will build the APK

## Step 6: Locate APK

After build completes, APK will be at:
```
frontend/android/app/release/app-release.apk
```

## Creating Two Separate APKs

For a Tracker APK and Dashboard APK, you can:

**Option A: One app with two modes** (recommended)
- Build one APK that has a choice screen
- User selects "Start Tracking" or "View Tracker"

**Option B: Two separate APKs**
- Create two separate Capacitor projects
- Different package IDs: `com.phonetracker.app` and `com.phonetracker.tracker`

## Quick Build Commands

```bash
# Install dependencies
cd frontend
npm install

# Build React app
npm run build

# Initialize Capacitor
npx cap init "Phone Tracker" "com.phonetracker.app"

# Add Android
npx cap add android

# Prepare for build
npx cap copy

# Open in Android Studio
npx cap open android
```

Then use Android Studio to Build APK.

## Store APK File

Once built:
- Upload to **Google Play Store**
- Share via file transfer
- Email to users
- Host on your website

## Notes

- First-time setup takes ~30 minutes (Android SDK download)
- APK size: ~50-80MB
- Supports Android 8.0+ (API level 26+)
- Includes Service Worker for background location tracking

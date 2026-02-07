# Quick Start: Build APK in 5 Minutes

## Prerequisites
✅ Have Java JDK 11+ installed  
✅ Have Android Studio installed with Android SDK  
✅ Environment variables configured (JAVA_HOME, ANDROID_SDK_ROOT)

## 5-Step APK Build

### Step 1: Build React App (2 min)
```bash
cd d:\Project Website\Phone Track\frontend
npm install
npm run build
```

### Step 2: Setup Capacitor (1 min - first time only)
```bash
npx cap init "Phone Tracker" "com.phonetracker.app"
npx cap add android
```

### Step 3: Copy Build to Android (30 sec)
```bash
npx cap copy
```

### Step 4: Open Android Studio (1 min)
```bash
npx cap open android
```

### Step 5: Build APK (3-5 min)
In Android Studio:
- `Build` menu → `Build Bundle/APK` → `APK`
- Select `release`
- Click `Build`
- Wait for completion

## Result
✅ APK file: `frontend/android/app/release/app-release.apk`

## One-Command Setup
```bash
cd frontend
npm install && npm run build && npx cap init "Phone Tracker" "com.phonetracker.app" && npx cap add android && npx cap copy && npx cap open android
```

## One-Command Rebuild (after code changes)
```bash
cd frontend
npm run build && npx cap copy
```

Then in Android Studio: Build → Build APK

---

**Still getting errors?** See [ANDROID_APK_BUILD.md](ANDROID_APK_BUILD.md) for detailed troubleshooting.

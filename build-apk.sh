#!/bin/bash
# APK Build Script for Phone Tracker

echo "📱 Phone Tracker Android APK Builder"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if in frontend directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: This script must be run from the frontend directory${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}Step 2: Building React app...${NC}"
npm run build

if [ ! -d "node_modules/@capacitor/core" ]; then
    echo -e "${YELLOW}Step 3: Installing Capacitor...${NC}"
    npm install @capacitor/core @capacitor/cli --save
fi

if [ ! -f "capacitor.config.ts" ]; then
    echo -e "${YELLOW}Step 4: Initializing Capacitor...${NC}"
    npx cap init "Phone Tracker" "com.phonetracker.app" --web-dir build
fi

if [ ! -d "android" ]; then
    echo -e "${YELLOW}Step 5: Adding Android platform...${NC}"
    npx cap add android
fi

echo -e "${YELLOW}Step 6: Syncing build with Capacitor...${NC}"
npx cap copy

echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Open Android Studio: npx cap open android"
echo "2. Build APK: Build → Build Bundle/APK → APK → Release"
echo "3. APK location: android/app/release/app-release.apk"

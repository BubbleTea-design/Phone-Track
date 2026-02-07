# Phone Tracker - Quick Start Guide

## ⚡ 30-Second Quick Start

### Windows Users
1. Double-click `start.bat` in the project folder
2. Two terminal windows will open automatically
3. Wait for both servers to start (you'll see messages)
4. Open `http://localhost:3000` in your browser

### Mac/Linux Users
1. Open terminal and navigate to the project folder
2. Run: `chmod +x start.sh && ./start.sh`
3. Open `http://localhost:3000` in your browser

---

## 🚀 Manual Startup (if scripts don't work)

### Terminal 1: Start Backend
```bash
cd backend
npm start
```
Expected output: `🚀 Phone Tracker Backend running on http://localhost:5000`

### Terminal 2: Start Frontend  
```bash
cd frontend
npm start
```
Expected output: React app opens on `http://localhost:3000`

---

## 📱 How to Use

### Step 1: Register Devices
1. Open `http://localhost:3000`
2. Enter device name (e.g., "My iPhone")
3. Click "Register Device"

### Step 2: Start Tracking Location
**Option A - Desktop Test:**
1. Click a device in the list
2. See empty map (no location yet - that's normal)

**Option B - Real Phone:**
1. Open browser on your phone
2. Go to: `http://[your-computer-ip]:3000/tracker.html`
   - Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Example: `http://192.168.1.100:3000/tracker.html`
3. Enter device name
4. Tap "Start Tracking"
5. Grant location permission when prompted
6. Watch location appear on desktop map!

---

## 🔍 Finding Your Computer's IP Address

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address: 192.168.x.x"

**Mac/Linux:**
```bash
ifconfig
```
Look for "inet 192.168.x.x"

---

## ✅ Verification Checklist

- [ ] Backend running (http://localhost:5000/api/health should show `{"status":"Server is running"}`)
- [ ] Frontend running (http://localhost:3000 should show the app)
- [ ] Device registered (appears in left panel)
- [ ] Phone tracker page loads (http://computer-ip:3000/tracker.html)
- [ ] Location updates appear (blue circle on map)

---

## 🛠️ Common Issues & Fixes

### Issue: "Can't reach localhost:5000"
**Fix:** Restart backend server
```bash
cd backend && npm start
```

### Issue: "Location not updating on map"
**Fixes:**
1. Check phone has location enabled
2. Check browser permission (Settings → Location)
3. Check phone and computer on same WiFi
4. Wait 10 seconds for first update

### Issue: "Can't connect from phone to computer"
**Fix:** Use your computer's IP address instead of localhost
- Windows: `ipconfig` → use IPv4 Address
- Mac: `ifconfig` → use inet address

### Issue: Port 5000 or 3000 already in use
**Fix:** Change ports in backend/.env and frontend/.env

---

## 📞 Need Help?

Check the main `README.md` for detailed documentation.

---

**Now go track! 📍**

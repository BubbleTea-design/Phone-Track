# 📍 Phone Tracker - Real-Time Multi-Device Tracking App

A full-stack web application for tracking the real-time location of multiple devices using GPS coordinates displayed on an interactive map.

## Features ✨

- 📱 **Multiple Device Tracking** - Register and track multiple devices simultaneously
- 🗺️ **Interactive Map** - View device locations on an interactive Leaflet map
- 📍 **GPS Coordinates** - Real-time latitude, longitude, and accuracy display
- 📊 **Location History** - Visual trail showing device movement history
- 🔄 **Real-Time Updates** - Automatic device location refresh every 5 seconds
- 🎨 **Modern UI** - Clean, responsive interface that works on all devices
- 🗑️ **Device Management** - Register, view, and delete devices easily

## Project Structure

```
Phone Track/
├── frontend/                 # React web application
│   ├── public/
│   │   ├── index.html       # HTML entry point
│   │   └── tracker.js       # Geolocation tracking script for mobile
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeviceList.js  # Device list component
│   │   │   └── Map.js         # Map display component
│   │   ├── App.js           # Main application component
│   │   ├── App.css          # Application styles
│   │   └── index.js         # React entry point
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Frontend environment variables
│
├── backend/                 # Node.js/Express API server
│   ├── server.js           # Express server and API endpoints
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
│
└── README.md               # This file
```

## Tech Stack

### Frontend
- **React** - UI library
- **React Leaflet** - Interactive maps
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment configuration

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with geolocation support

### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 2: Install Backend Dependencies

```bash
cd ../backend
npm install
```

## Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

Output should show:
```
🚀 Phone Tracker Backend running on http://localhost:5000
```

### Terminal 2: Start Frontend Application

```bash
cd frontend
npm start
```

The React app will open on `http://localhost:3000`

## How to Use

### Register a Device

1. Enter a device name (e.g., "My iPhone", "Samsung Phone") in the input field
2. Click "Register Device"
3. You'll see the device appear in the device list

### Track Device Location

1. **On Desktop/Manager Computer:**
   - Select a device from the list
   - The map will display the device's current location
   - Device coordinates and location info appear in the top-right corner

2. **On Mobile Device (Actual Phone to Track):**
   - Option A: Open browser on the phone and go to `http://localhost:3000/tracker.html`
   - Option B: Get the device ID from the manager app and visit:
     ```
     http://[your-computer-ip]:3000/tracker.html?deviceId=device_1234567890
     ```
   - The phone will begin sending its GPS location to the server
   - Grant location permission when prompted
   - Location updates are sent every 10 seconds

### View Location Details
- Current location (latitude/longitude) in the info panel
- Accuracy radius (blue circle on map)
- Location history as grey markers
- Last update timestamp

### Delete a Device
1. Click the "Delete" button next to a device in the list
2. Confirm deletion
3. Device and its location history will be removed

## API Endpoints

### Device Management
- `POST /api/devices/register` - Register a new device
- `GET /api/devices` - Get all registered devices
- `DELETE /api/devices/:deviceId` - Delete a device

### Location Tracking
- `POST /api/locations/update` - Update device location (called by tracking script)
- `GET /api/locations/:deviceId` - Get latest location of a device
- `GET /api/locations/:deviceId/history` - Get location history for a device

### System
- `GET /api/health` - Health check endpoint

## Example API Requests

### Register Device
```bash
curl -X POST http://localhost:5000/api/devices/register \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"device_123","deviceName":"My Phone"}'
```

### Update Location
```bash
curl -X POST http://localhost:5000/api/locations/update \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId":"device_123",
    "latitude":40.7128,
    "longitude":-74.0060,
    "accuracy":10
  }'
```

### Get All Devices
```bash
curl http://localhost:5000/api/devices
```

## Important Notes ⚠️

### Regarding "Phone Off" Tracking
Currently, the app tracks devices **when they're powered on and location is enabled**. True offline tracking (when phone is off) requires:
- Cellular carrier integration (AT&T, Verizon, etc.)
- SIM card tracking technology
- Government/law enforcement access

For home/personal use with devices you own, this app provides effective real-time tracking.

### Network Requirements
- Backend server must be accessible from the phone's network
- Use your computer's IP address (not localhost) if tracking from another device
- For external access, deploy backend to cloud service (AWS, Heroku, DigitalOcean, etc.)

### Security Considerations
- This is designed for personal/family use
- Add authentication in production
- Use HTTPS for encrypted location transmission
- Backend currently uses in-memory storage (data resets on restart)
- For persistence, integrate MongoDB or similar database

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Geofencing alerts
- [ ] Location sharing privacy controls
- [ ] Mobile apps (React Native, iOS, Android)
- [ ] Database persistence (MongoDB/PostgreSQL)
- [ ] Cloud deployment
- [ ] Battery life optimization
- [ ] Dark mode UI
- [ ] Push notifications for events
- [ ] Integration with phone services APIs

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support  
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support with geolocation

## Troubleshooting

### Location not appearing on map
1. Check that browser has geolocation permission
2. Ensure mobile device has location services enabled
3. Check network connectivity between devices
4. Verify backend is running on port 5000

### "Device not found" error
- Make sure device is registered first
- Check that deviceId matches between frontend and tracking script

### CORS errors
- Backend has CORS enabled by default
- If issues persist, check that both frontend and backend are running

### Slow location updates
- Check network latency
- Increase refresh interval in code if needed
- Ensure GPS has a clear sky view

## License

This project is open source and available for personal and educational use.

## Support

For issues or questions, check:
1. Browser console for error messages
2. Backend logs in terminal
3. Network connectivity between devices
4. Geolocation permissions in browser settings

---

**Happy Tracking! 📍**

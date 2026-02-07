const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (for now - can be replaced with MongoDB)
const devices = {};
const locations = {};

// Routes

// Register a new device
app.post('/api/devices/register', (req, res) => {
  const { deviceId, deviceName } = req.body;

  if (!deviceId || !deviceName) {
    return res.status(400).json({ error: 'Device ID and name are required' });
  }

  devices[deviceId] = {
    deviceId,
    deviceName,
    registeredAt: new Date(),
    lastLocation: null
  };

  locations[deviceId] = [];

  res.json({ success: true, device: devices[deviceId] });
});

// Get all registered devices
app.get('/api/devices', (req, res) => {
  const deviceList = Object.values(devices);
  res.json(deviceList);
});

// Update device location
app.post('/api/locations/update', (req, res) => {
  const { deviceId, latitude, longitude, accuracy } = req.body;

  if (!deviceId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'Device ID and location coordinates are required' });
  }

  if (!devices[deviceId]) {
    return res.status(404).json({ error: 'Device not found' });
  }

  const locationData = {
    latitude,
    longitude,
    accuracy: accuracy || null,
    timestamp: new Date()
  };

  // Add to location history
  if (!locations[deviceId]) {
    locations[deviceId] = [];
  }
  locations[deviceId].push(locationData);

  // Keep only last 100 locations
  if (locations[deviceId].length > 100) {
    locations[deviceId].shift();
  }

  // Update device's last location
  devices[deviceId].lastLocation = locationData;

  res.json({ success: true, location: locationData });
});

// Get device location
app.get('/api/locations/:deviceId', (req, res) => {
  const { deviceId } = req.params;

  if (!devices[deviceId]) {
    return res.status(404).json({ error: 'Device not found' });
  }

  const deviceLocation = devices[deviceId].lastLocation;
  res.json(deviceLocation || { latitude: 0, longitude: 0 });
});

// Get location history for a device
app.get('/api/locations/:deviceId/history', (req, res) => {
  const { deviceId } = req.params;

  if (!devices[deviceId]) {
    return res.status(404).json({ error: 'Device not found' });
  }

  res.json(locations[deviceId] || []);
});

// Delete a device
app.delete('/api/devices/:deviceId', (req, res) => {
  const { deviceId } = req.params;

  if (!devices[deviceId]) {
    return res.status(404).json({ error: 'Device not found' });
  }

  delete devices[deviceId];
  delete locations[deviceId];

  res.json({ success: true, message: 'Device deleted' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Phone Tracker Backend running on http://localhost:${PORT}`);
});

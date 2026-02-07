// Simple geolocation tracker for mobile devices
// Add this script tag to a mobile device's browser to start tracking

const SERVER_URL = 'http://localhost:5000'; // Change to your server URL
let DEVICE_ID = localStorage.getItem('deviceId');
let DEVICE_NAME = localStorage.getItem('deviceName');

if (!DEVICE_ID) {
  DEVICE_ID = `device_${Date.now()}`;
  DEVICE_NAME = prompt('Enter a name for this device:') || 'My Device';
  localStorage.setItem('deviceId', DEVICE_ID);
  localStorage.setItem('deviceName', DEVICE_NAME);
}

// Request geolocation permission and start tracking
if ('geolocation' in navigator) {
  console.log('Starting GPS tracking for device:', DEVICE_ID);

  // Get location every 10 seconds
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      
      // Send to server
      fetch(`${SERVER_URL}/api/locations/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId: DEVICE_ID,
          latitude,
          longitude,
          accuracy
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log('Location sent:', { latitude, longitude });
      })
      .catch(err => console.error('Error sending location:', err));
    },
    (error) => {
      console.error('Geolocation error:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );

  console.log('Geolocation tracking started. Device will report location every 10 seconds.');
} else {
  console.error('Geolocation is not supported by this browser');
}

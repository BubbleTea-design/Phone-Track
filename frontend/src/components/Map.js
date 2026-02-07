import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
const currentIcon = L.icon({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [32, 41],
  iconAnchor: [16, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const historyIcon = L.icon({
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -3, apiUrl4],
  shadowSize: [41, 41]
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: currentIcon.options.iconRetinaUrl,
  iconUrl: currentIcon.options.iconUrl,
  shadowUrl: currentIcon.options.shadowUrl
});

const Map = ({ device, apiUrl }) => {
  const [locationHistory, setLocationHistory] = useState([]);

  const fetchLocationHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/locations/${device.deviceId}/history`);
      setLocationHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch location history:', err);
    }
  }, [device.deviceId]);

  useEffect(() => {
    fetchLocationHistory();
    const interval = setInterval(fetchLocationHistory, 5000);
    return () => clearInterval(interval);
  }, [fetchLocationHistory]);



  const currentLocation = device.lastLocation;

  if (!currentLocation || (currentLocation.latitude === 0 && currentLocation.longitude === 0)) {
    return (
      <div className="map-container">
        <div className="placeholder">
          <p>⏳ Waiting for location data...</p>
        </div>
      </div>
    );
  }

  const lat = currentLocation.latitude;
  const lng = currentLocation.longitude;
  
  // Create polyline of location history
  const pathCoordinates = locationHistory.map(loc => [loc.latitude, loc.longitude]);

  return (
    <div className="map-container">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        className="beautiful-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Accuracy circle */}
        {currentLocation.accuracy && (
          <Circle
            center={[lat, lng]}
            radius={currentLocation.accuracy}
            fillColor="#667eea"
            fillOpacity={0.15}
            color="#667eea"
            weight={2}
            dashArray="5, 5"
          />
        )}

        {/* Location history polyline */}
        {pathCoordinates.length > 1 && (
          <Polyline
            positions={pathCoordinates}
            color="#764ba2"
            weight={3}
            opacity={0.6}
            dashArray="5, 5"
          />
        )}

        {/* Location history markers */}
        {locationHistory.slice(0, -1).map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={historyIcon}
          >
            <Popup>
              <div className="popup-content">
                <strong>Past Location</strong>
                <br />
                <small>{new Date(location.timestamp).toLocaleTimeString()}</small>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Current location marker */}
        <Marker position={[lat, lng]} icon={currentIcon}>
          <Popup>
            <div className="popup-content">
              <strong>📍 {device.deviceName} (Current)</strong>
              <br />
              Lat: {lat.toFixed(5)}, Lng: {lng.toFixed(5)}
              <br />
              <small>{currentLocation.timestamp && new Date(currentLocation.timestamp).toLocaleTimeString()}</small>
            </div>
          </Popup>
        </Beautiful info panel */}
      <div className="map-info-panel">
        <div className="map-info-header">
          <div className="device-indicator">📱</div>
          <div>
            <h3>{device.deviceName}</h3>
            <p className="device-status">🟢 Live Tracking</p>
          </div>
        </div>

        <div className="map-info-content">
          <div className="info-row">
            <span className="info-label">📍 Latitude</span>
            <span className="info-value">{lat.toFixed(6)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">📍 Longitude</span>
            <span className="info-value">{lng.toFixed(6)}</span>
          </div>

          {currentLocation.timestamp && (
            <div className="info-row">
              <span className="info-label">🕐 Updated</span>
              <span className="info-value">{new Date(currentLocation.timestamp).toLocaleTimeString()}</span>
            </div>
          )}

          {currentLocation.accuracy && (
            <div className="info-row">
              <span className="info-label">📡 Accuracy</span>
              <span className="info-value">±{Math.round(currentLocation.accuracy)}m</span>
            </div>
          )}

          {locationHistory.length > 0 && (
            <div className="info-row">
              <span className="info-label">📍 Tracked Points</span>
              <span className="info-value">{locationHistory.length}</span>
            </div>
          )}
        </div>  <strong>Updated:</strong> {new Date(currentLocation.timestamp).toLocaleString()}
          </p>
        )}
        {currentLocation.accuracy && (
          <p className="accuracy">
            <strong>Accuracy:</strong> ±{Math.round(currentLocation.accuracy)}m
          </p>
        )}
      </div>
    </div>
  );
};

export default Map;

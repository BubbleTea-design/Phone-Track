import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

const Map = ({ device, apiUrl }) => {
  const [locationHistory, setLocationHistory] = useState([]);
  const mapRef = useRef(null);

  const fetchLocationHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/locations/${device.deviceId}/history`);
      setLocationHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch location history:', err);
    }
  }, [device.deviceId, apiUrl]);

  // Custom current location icon - large blue circle
  const currentLocationIcon = L.divIcon({
    html: `<div style="
      background-color: #4285F4;
      border: 4px solid white;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      box-shadow: 0 0 0 12px rgba(66, 133, 244, 0.3), 0 2px 8px rgba(0, 0, 0, 0.3);
      animation: pulse 2s infinite;
      position: relative;
    "><div style="
      position: absolute;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "></div></div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
    className: 'current-location-icon'
  });

  useEffect(() => {
    fetchLocationHistory();
    const interval = setInterval(fetchLocationHistory, 5000);
    return () => clearInterval(interval);
  }, [fetchLocationHistory]);

  const currentLocation = device.lastLocation;

  // Center map on current location
  const centerOnLocation = () => {
    if (mapRef.current && currentLocation && currentLocation.latitude && currentLocation.longitude) {
      mapRef.current.setView([currentLocation.latitude, currentLocation.longitude], 17, { animate: true, duration: 1 });
    }
  };

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
        ref={mapRef}
        center={[lat, lng]}
        zoom={17}
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
            fillColor="#4285F4"
            fillOpacity={0.2}
            color="#4285F4"
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
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
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

        {/* Current location marker - large pulsing blue dot */}
        <Marker position={[lat, lng]} icon={currentLocationIcon}>
          <Popup>
            <div className="popup-content">
              <strong>📍 You are here</strong>
              <br />
              <strong>{device.deviceName}</strong>
              <br />
              Lat: {lat.toFixed(6)}, Lng: {lng.toFixed(6)}
              <br />
              <small>Accuracy: ±{Math.round(currentLocation.accuracy)}m</small>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Beautiful info panel */}
      <div className="map-info-panel">
        <div className="map-info-header">
          <div className="device-indicator">📱</div>
          <div>
            <h3>{device.deviceName}</h3>
            <p className="device-status">🟢 Live Tracking</p>
          </div>
        </div>

        <div classL.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })nfo-content">
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
        </div>

        <button className="center-map-btn" onClick={centerOnLocation} title="Center map on your location">
          📍 Find Me
        </button>
      </div>
    </div>
  );
};

export default Map;
      </div>
    </div>
  );
};

export default Map;

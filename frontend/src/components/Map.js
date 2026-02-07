import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
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
          <p>No location data available. Enable location on the device.</p>
        </div>
      </div>
    );
  }

  const lat = currentLocation.latitude;
  const lng = currentLocation.longitude;

  return (
    <div className="map-container">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
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
            fillOpacity={0.1}
            color="#667eea"
            weight={2}
          />
        )}

        {/* Current location marker */}
        <Marker position={[lat, lng]}>
          <Popup>
            <div>
              <strong>{device.deviceName}</strong>
              <br />
              Lat: {lat.toFixed(6)}, Lng: {lng.toFixed(6)}
              <br />
              {currentLocation.timestamp && (
                <>
                  Time: {new Date(currentLocation.timestamp).toLocaleTimeString()}
                </>
              )}
            </div>
          </Popup>
        </Marker>

        {/* Location history trail */}
        {locationHistory.length > 1 && (
          locationHistory.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              icon={L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })}
            >
              <Popup>
                {new Date(location.timestamp).toLocaleTimeString()}
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>

      {/* Info panel */}
      <div className="map-info">
        <h3>{device.deviceName}</h3>
        <p>
          <strong>Latitude:</strong> {lat.toFixed(6)}
        </p>
        <p>
          <strong>Longitude:</strong> {lng.toFixed(6)}
        </p>
        {currentLocation.timestamp && (
          <p>
            <strong>Updated:</strong> {new Date(currentLocation.timestamp).toLocaleString()}
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

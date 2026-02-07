import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DeviceList from './components/DeviceList';
import Map from './components/Map';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [error, setError] = useState(null);

  const fetchDevices = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/devices`);
      setDevices(response.data);
      if (selectedDevice && response.data.length > 0) {
        const updated = response.data.find(d => d.deviceId === selectedDevice.deviceId);
        setSelectedDevice(updated);
      }
    } catch (err) {
      setError('Failed to fetch devices');
      console.error(err);
    }
  }, [selectedDevice, API_URL]);

  // Fetch devices on mount
  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [fetchDevices]);



  const registerDevice = async () => {
    if (!newDeviceName.trim()) {
      setError('Please enter a device name');
      return;
    }

    setLoading(true);
    try {
      const deviceId = `device_${Date.now()}`;
      const response = await axios.post(`${API_URL}/api/devices/register`, {
        deviceId,
        deviceName: newDeviceName
      });
      setNewDeviceName('');
      setError(null);
      await fetchDevices();
      // Auto-select the new device
      setSelectedDevice(response.data.device);
    } catch (err) {
      setError('Failed to register device');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDevice = async (deviceId) => {
    try {
      await axios.delete(`${API_URL}/api/devices/${deviceId}`);
      if (selectedDevice?.deviceId === deviceId) {
        setSelectedDevice(null);
      }
      await fetchDevices();
    } catch (err) {
      setError('Failed to delete device');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📍 Phone Tracker</h1>
        <p>Real-time Multi-Device Tracking</p>
      </header>

      <div className="container">
        <div className="left-panel">
          <div className="registration-section">
            <h2>Register New Device</h2>
            <input
              type="text"
              placeholder="Device name (e.g., My iPhone)"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && registerDevice()}
            />
            <button onClick={registerDevice} disabled={loading}>
              {loading ? 'Registering...' : 'Register Device'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <DeviceList
            devices={devices}
            selectedDevice={selectedDevice}
            onSelectDevice={setSelectedDevice}
            onDeleteDevice={deleteDevice}
            apiUrl={API_URL}
          />
        </div>

        <div className="right-panel">
          {selectedDevice ? (
            <Map device={selectedDevice} apiUrl={API_URL} />
          ) : devices.length > 0 ? (
            <div className="placeholder">
              <p>Select a device to view its location</p>
            </div>
          ) : (
            <div className="placeholder">
              <p>Register a device to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

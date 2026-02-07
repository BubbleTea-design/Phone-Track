import React from 'react';

const DeviceList = ({ devices, selectedDevice, onSelectDevice, onDeleteDevice, apiUrl }) => {
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString();
  };

  return (
    <div className="device-list">
      {devices.length === 0 ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
          <p>No devices registered yet</p>
        </div>
      ) : (
        devices.map((device) => (
          <div
            key={device.deviceId}
            className={`device-item ${selectedDevice?.deviceId === device.deviceId ? 'active' : ''}`}
            onClick={() => onSelectDevice(device)}
          >
            <div className="device-item-header">
              <div className="device-item-name">📱 {device.deviceName}</div>
              <button
                className="device-item-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete ${device.deviceName}?`)) {
                    onDeleteDevice(device.deviceId);
                  }
                }}
              >
                Delete
              </button>
            </div>
            <div className="device-item-info">
              <div>ID: {device.deviceId}</div>
              <div>Registered: {formatDate(device.registeredAt)}</div>
              {device.lastLocation ? (
                <div className="device-item-location">
                  📍 {device.lastLocation.latitude.toFixed(4)}, {device.lastLocation.longitude.toFixed(4)}
                  <br />
                  Updated: {formatDate(device.lastLocation.timestamp)}
                </div>
              ) : (
                <div style={{ color: '#999', marginTop: '5px' }}>No location yet</div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DeviceList;

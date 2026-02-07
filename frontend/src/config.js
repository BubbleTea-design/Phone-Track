// Frontend configuration
// This file is loaded at runtime, not build time

export const API_URL = (() => {
  // Get from environment variable, or build it from current domain
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // If running on Railway/production, construct backend URL from current domain
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  // If on localhost, use localhost backend
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  
  // If on Railway (*.railway.app), convert to backend domain
  if (hostname.includes('railway.app') || hostname.includes('up.railway.app')) {
    // Replace 'phone-track-production-46eb' with 'phone-track-production-16be' (backend)
    const backendDomain = 'https://phone-track-production-16be.up.railway.app';
    return backendDomain;
  }
  
  // Fallback
  return `http://${hostname}:5000`;
})();

console.log('🔧 API URL configured as:', API_URL);

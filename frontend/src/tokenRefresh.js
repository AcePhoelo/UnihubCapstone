import { jwtDecode } from 'jwt-decode';

// Track last activity timestamp
let lastActivityTime = Date.now();

// Update activity time on user interactions
export const updateUserActivity = () => {
  lastActivityTime = Date.now();
};

// Check if user has been inactive for too long
const isInactive = () => {
  const inactivityThreshold = 60 * 60 * 1000; // 1 hour in milliseconds
  return Date.now() - lastActivityTime > inactivityThreshold;
};

// Check if token needs refresh
export const checkAndRefreshToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (!accessToken || !refreshToken) return false;
  
  try {
    // Check if user has been inactive
    if (isInactive()) {
      // Don't refresh if inactive more than an hour
      return false;
    }
    
    // Check if token is expired or about to expire (5 mins buffer)
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    
    // Only refresh if token is expired or about to expire
    if (decoded.exp - currentTime < 300) { // 5 minutes buffer
      const response = await fetch('https://54.169.81.75:8000/api/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        // If your backend is configured to return a new refresh token
        if (data.refresh) {
          localStorage.setItem('refresh_token', data.refresh);
        }
        return true;
      } else {
        // Failed to refresh - likely refresh token is expired
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
};

// Setup activity listeners
export const setupActivityTracking = () => {
  const events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, updateUserActivity, true);
  });
  updateUserActivity(); // Initialize
};
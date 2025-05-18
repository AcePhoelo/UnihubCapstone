import axios from 'axios';
import { checkAndRefreshToken } from './tokenRefresh';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://curtinunihubplus.com'
});

api.interceptors.request.use(
  async (config) => {
    // Check token validity - will refresh if needed
    const isValid = await checkAndRefreshToken();
    
    if (!isValid) {
      // Redirect to login if refresh failed
      window.location.href = '/login';
      return Promise.reject('Authentication failed');
    }
    
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
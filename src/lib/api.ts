import axios from 'axios';
import { clientAuth } from '../features/authentication/lib/auth';

// Create base axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token from cookies
api.interceptors.request.use(
  (config) => {
    // Add auth token from cookie if available
    const token = clientAuth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Only redirect if we're in the browser
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        
        // List of auth-related paths where we should NOT redirect on 401
        const authPaths = [
          '/login',
          '/forgot-password',
          '/reset-password',
          '/invite',
        ];
        
        // Check if current path is an auth page
        const isAuthPage = authPaths.some(path => currentPath.startsWith(path));
        
        // Only clear token and redirect if NOT on an auth page
        if (!isAuthPage) {
          clientAuth.removeToken();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from auth-storage in localStorage
    const authStorage = localStorage.getItem('auth-storage');
    let token = null;
    
    if (authStorage) {
      try {
        const authData = JSON.parse(authStorage);
        token = authData.state?.accessToken;
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token from storage
        const authStorage = localStorage.getItem('auth-storage');
        let refreshToken = null;
        
        if (authStorage) {
          const authData = JSON.parse(authStorage);
          refreshToken = authData.state?.refreshToken;
        }

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Try to refresh the token using the full URL
        const response = await axios.post(`${api.defaults.baseURL}/api/users/token/refresh/`, {
          refresh: refreshToken
        });

        const { access } = response.data;
        
        // Update the auth store
        const authData = JSON.parse(localStorage.getItem('auth-storage') || '{}');
        const newAuthData = {
          ...authData.state,
          accessToken: access,
        };
        
        // Update localStorage
        authData.state = newAuthData;
        localStorage.setItem('auth-storage', JSON.stringify(authData));
        
        // Update Zustand store
        useAuthStore.setState((state) => ({
          ...state,
          accessToken: access,
        }));

        // Update cookie for SSR
        document.cookie = `auth-storage=${encodeURIComponent(JSON.stringify({
          state: newAuthData
        }))}; path=/`;

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Clear auth state and redirect to login
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
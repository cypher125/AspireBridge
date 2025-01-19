import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: 'user' | 'admin';
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for handling cookies
});

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/api/users/token/', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await api.post('/auth/register/', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout/');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  },
};

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    const { state } = JSON.parse(authStorage);
    if (state.accessToken) {
      config.headers.Authorization = `Bearer ${state.accessToken}`;
    }
  }
  return config;
});

export default api; 
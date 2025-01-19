import api from './api';

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    // Get tokens - Note the path starts without /api since it's in the baseURL
    const tokenResponse = await api.post<{access: string, refresh: string}>('auth/login/', {
      email,
      password,
    });
    
    const { access, refresh } = tokenResponse.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    
    // Set the authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    
    // Get user data
    const userResponse = await api.get('users/me/');
    const userData = userResponse.data;
    
    // Store user data
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    return {
      access,
      refresh,
      user: userData
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // Call logout endpoint if you have one
    await api.post('auth/logout/');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage and headers regardless of logout API success
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const refreshToken = async (): Promise<string> => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) throw new Error('No refresh token available');

  const response = await api.post<{access: string}>('auth/refresh/', {
    refresh,
  });

  const { access } = response.data;
  localStorage.setItem('accessToken', access);
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

  return access;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}; 
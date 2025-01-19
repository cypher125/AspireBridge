import { axiosInstance } from './axios';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  last_login: string;
  profile: {
    bio?: string;
    avatar_url?: string;
    phone?: string;
    location?: string;
    skills?: string[];
    education?: {
      institution: string;
      degree: string;
      field: string;
      year: string;
    }[];
    experience?: {
      company: string;
      position: string;
      duration: string;
      description: string;
    }[];
  };
}

export const usersApi = {
  getUsers: async () => {
    const response = await axiosInstance.get<User[]>('/users/');
    return response.data;
  },

  getUser: async (id: number) => {
    const response = await axiosInstance.get<User>(`/users/${id}/`);
    return response.data;
  },

  updateUser: async (id: number, data: Partial<User>) => {
    const response = await axiosInstance.patch<User>(`/users/${id}/`, data);
    return response.data;
  },

  updateProfile: async (data: Partial<User['profile']>) => {
    const response = await axiosInstance.patch<User>('/users/profile/', data);
    return response.data;
  },

  updateSettings: async (data: {
    email_notifications?: boolean;
    two_factor_auth?: boolean;
    theme?: 'light' | 'dark' | 'system';
  }) => {
    const response = await axiosInstance.patch('/users/settings/', data);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard/stats/');
    return response.data;
  },

  getUserStats: async () => {
    const response = await axiosInstance.get('/admin/users/stats/');
    return response.data;
  },

  bulkUpdateUsers: async (ids: number[], data: { status?: User['status'], role?: User['role'] }) => {
    const response = await axiosInstance.post('/admin/users/bulk_update/', { ids, ...data });
    return response.data;
  }
}; 
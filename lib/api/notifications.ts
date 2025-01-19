import { axiosInstance } from './axios';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'application_update' | 'interview' | 'opportunity' | 'system';
  read: boolean;
  created_at: string;
}

export const notificationsApi = {
  getNotifications: async () => {
    const response = await axiosInstance.get<Notification[]>('/notifications/');
    return response.data;
  },

  markAsRead: async (id: number) => {
    const response = await axiosInstance.post(`/notifications/${id}/mark_read/`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axiosInstance.post('/notifications/mark_all_read/');
    return response.data;
  }
}; 
import { axiosInstance } from './axios';

export interface Opportunity {
  id: number;
  title: string;
  organization: string;
  description: string;
  type: string;
  location: string;
  requirements: string;
  start_date: string;
  application_deadline: string;
  status: 'active' | 'closed';
  created_by: number;
  created_at: string;
  updated_at: string;
  saved_by?: number[];
}

export const opportunitiesApi = {
  getOpportunities: async () => {
    const response = await axiosInstance.get<Opportunity[]>('/opportunities/');
    return response.data;
  },

  getOpportunity: async (id: number) => {
    const response = await axiosInstance.get<Opportunity>(`/opportunities/${id}/`);
    return response.data;
  },

  createOpportunity: async (data: Partial<Opportunity>) => {
    const response = await axiosInstance.post<Opportunity>('/opportunities/', data);
    return response.data;
  },

  toggleSave: async (id: number) => {
    const response = await axiosInstance.post<{saved: boolean}>(`/opportunities/${id}/toggle_save/`);
    return response.data;
  },

  getSaved: async () => {
    const response = await axiosInstance.get<Opportunity[]>('/opportunities/saved/');
    return response.data;
  },

  getStats: async () => {
    const response = await axiosInstance.get('/opportunities/stats/');
    return response.data;
  },

  bulkStatusUpdate: async (id: number, data: { application_ids: number[], status: string }) => {
    const response = await axiosInstance.post(`/opportunities/${id}/bulk_status_update/`, data);
    return response.data;
  },

  duplicate: async (id: number) => {
    const response = await axiosInstance.post<Opportunity>(`/opportunities/${id}/duplicate/`);
    return response.data;
  },

  getAnalytics: async () => {
    const response = await axiosInstance.get('/opportunities/analytics/');
    return response.data;
  }
}; 
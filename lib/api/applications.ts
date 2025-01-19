import { axiosInstance } from './axios';

export interface Application {
  id: number;
  user: number;
  opportunity: number;
  status: 'pending' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
  cover_letter: string;
  documents: Array<{
    name: string;
    url: string;
  }>;
  interview_date?: string;
  applied_at: string;
  updated_at: string;
}

export const applicationsApi = {
  getApplications: async () => {
    const response = await axiosInstance.get<Application[]>('/applications/');
    return response.data;
  },

  getApplication: async (id: number) => {
    const response = await axiosInstance.get<Application>(`/applications/${id}/`);
    return response.data;
  },

  createApplication: async (data: {
    opportunity: number;
    cover_letter: string;
    documents: Array<{ name: string; url: string; }>;
  }) => {
    const response = await axiosInstance.post<Application>('/applications/', data);
    return response.data;
  },

  updateStatus: async (id: number, status: Application['status']) => {
    const response = await axiosInstance.patch<Application>(`/applications/${id}/`, { status });
    return response.data;
  },

  bulkUpdateStatus: async (ids: number[], status: Application['status']) => {
    const response = await axiosInstance.post('/applications/bulk_update/', { ids, status });
    return response.data;
  },

  getStats: async () => {
    const response = await axiosInstance.get('/applications/stats/');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await axiosInstance.get('/applications/analytics/');
    return response.data;
  },

  uploadDocument: async (id: number, file: File) => {
    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB');
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF and Word documents are allowed');
    }

    const formData = new FormData();
    formData.append('document', file);
    
    const response = await axiosInstance.post(`/applications/${id}/upload_document/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        // You can use this to show upload progress if needed
      },
    });
    return response.data;
  },

  create: async (data: { 
    opportunity: string;
    cover_letter: string;
    resume?: File;
    name: string;
    email: string;
    phone_number: string;
  }) => {
    const formData = new FormData();
    
    // Add all text fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && !(value instanceof File)) {
        formData.append(key, value);
      }
    });

    // Add resume if provided
    if (data.resume) {
      // Validate file size
      if (data.resume.size > 10 * 1024 * 1024) {
        throw new Error('Resume file size must be less than 10MB');
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(data.resume.type)) {
        throw new Error('Only PDF and Word documents are allowed');
      }

      formData.append('resume', data.resume);
    }

    const response = await axiosInstance.post('/applications/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}; 
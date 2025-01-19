import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationsApi, Application } from '@/lib/api/applications';

export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: applicationsApi.getApplications
  });
}

export function useApplication(id: number) {
  return useQuery({
    queryKey: ['applications', id],
    queryFn: () => applicationsApi.getApplication(id),
    enabled: !!id
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: applicationsApi.createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: Application['status'] }) => 
      applicationsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
}

export function useBulkUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ ids, status }: { ids: number[]; status: Application['status'] }) => 
      applicationsApi.bulkUpdateStatus(ids, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
}

export function useApplicationStats() {
  return useQuery({
    queryKey: ['applications', 'stats'],
    queryFn: applicationsApi.getStats
  });
}

export function useApplicationAnalytics() {
  return useQuery({
    queryKey: ['applications', 'analytics'],
    queryFn: applicationsApi.getAnalytics
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => 
      applicationsApi.uploadDocument(id, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['applications', variables.id] });
    }
  });
} 
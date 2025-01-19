import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { opportunitiesApi } from '@/lib/api/opportunities';

export function useOpportunities() {
  return useQuery({
    queryKey: ['opportunities'],
    queryFn: opportunitiesApi.getOpportunities
  });
}

export function useOpportunity(id: number) {
  return useQuery({
    queryKey: ['opportunities', id],
    queryFn: () => opportunitiesApi.getOpportunity(id)
  });
}

export function useCreateOpportunity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: opportunitiesApi.createOpportunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    }
  });
}

export function useSavedOpportunities() {
  return useQuery({
    queryKey: ['opportunities', 'saved'],
    queryFn: opportunitiesApi.getSaved
  });
}

export function useToggleSaveOpportunity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: opportunitiesApi.toggleSave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['opportunities', 'saved'] });
    }
  });
}

export function useOpportunityStats() {
  return useQuery({
    queryKey: ['opportunities', 'stats'],
    queryFn: opportunitiesApi.getStats
  });
}

export function useOpportunityAnalytics() {
  return useQuery({
    queryKey: ['opportunities', 'analytics'],
    queryFn: opportunitiesApi.getAnalytics
  });
} 
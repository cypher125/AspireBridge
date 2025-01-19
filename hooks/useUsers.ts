import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, User } from '@/lib/api/users';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.getUser(id),
    enabled: !!id
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) => 
      usersApi.updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
    }
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'profile'] });
    }
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: usersApi.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'settings'] });
    }
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: usersApi.getDashboardStats
  });
}

export function useUserStats() {
  return useQuery({
    queryKey: ['admin', 'users', 'stats'],
    queryFn: usersApi.getUserStats
  });
}

export function useBulkUpdateUsers() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ ids, data }: { ids: number[]; data: { status?: User['status'], role?: User['role'] } }) => 
      usersApi.bulkUpdateUsers(ids, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
} 
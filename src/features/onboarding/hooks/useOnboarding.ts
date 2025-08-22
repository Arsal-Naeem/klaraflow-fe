import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/utils/toast';
import { onboardingService } from '../services';
import {
  OnboardingApproval,
} from '../types';

// Query keys for better cache management
export const onboardingKeys = {
  all: ['onboarding'] as const,
  data: () => [...onboardingKeys.all, 'data'] as const,
  status: () => [...onboardingKeys.all, 'status'] as const,
  documents: () => [...onboardingKeys.all, 'documents'] as const,
  todos: () => [...onboardingKeys.all, 'todos'] as const,
  template: () => [...onboardingKeys.all, 'template'] as const,
};

// Hook to fetch onboarding data
export function useOnboardingData(employeeId?: string) {
  return useQuery({
    queryKey: [...onboardingKeys.data(), employeeId],
    queryFn: () => onboardingService.getOnboardingData(employeeId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

// Hook to fetch onboarding status
export function useOnboardingStatus(employeeId?: string) {
  return useQuery({
    queryKey: [...onboardingKeys.status(), employeeId],
    queryFn: () => onboardingService.getOnboardingStatus(employeeId),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // refetch every 30 seconds
  });
}

// Hook to submit approval/rejection
export function useSubmitApproval() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (approval: OnboardingApproval) =>
      onboardingService.submitApproval(approval),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      toast.success('Your response has been submitted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to submit response';
      toast.error(message);
    },
  });
}

// Hook to upload document
export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ type, documentData, label }: { type: string; documentData: Record<string, any>; label: string }) =>
      onboardingService.uploadDocument(type, documentData, label),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.documents() });
      toast.success('Document uploaded successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to upload document';
      toast.error(message);
    },
  });
}

// Hook to update todo item
export function useUpdateTodoItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      onboardingService.updateTodoItem(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.todos() });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update todo item';
      toast.error(message);
    },
  });
}

// Hook to update onboarding step
export function useUpdateOnboardingStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (step: number) => onboardingService.updateOnboardingStep(step),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update step';
      toast.error(message);
    },
  });
}

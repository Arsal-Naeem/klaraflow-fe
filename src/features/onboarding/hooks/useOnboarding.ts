/*NEW*/
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OnboardingService } from '../services/onboarding.service';
import { toast } from '@/utils/toast';
import { OnboardingData } from '../types';

const ONBOARDING_DATA_KEY = 'onboardingData';

export const useOnboarding = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<OnboardingData>({
    queryKey: [ONBOARDING_DATA_KEY],
    queryFn: OnboardingService.getMyOnboardingData,
  });

  const invalidateOnboardingData = () => {
    queryClient.invalidateQueries({ queryKey: [ONBOARDING_DATA_KEY] });
  };

  const updateDataMutation = useMutation({
    mutationFn: OnboardingService.updateMyOnboardingData,
    onSuccess: (updatedData) => {
      queryClient.setQueryData([ONBOARDING_DATA_KEY], updatedData);
      toast.success('Information updated successfully!');
    },
    onError: () => toast.error('Failed to update information.'),
  });

  const updateStepMutation = useMutation({
    mutationFn: OnboardingService.updateOnboardingStep,
    onSuccess: (updatedData) => {
      queryClient.setQueryData([ONBOARDING_DATA_KEY], updatedData);
    },
    onError: () => toast.error('Failed to move to the next step.'),
  });
  
  const updateTodoMutation = useMutation({
    mutationFn: OnboardingService.updateTodo,
    onSuccess: () => {
        invalidateOnboardingData(); // Refetch all data to get updated todo status
        toast.success('Task status updated!');
    },
    onError: () => toast.error('Failed to update task.'),
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: OnboardingService.uploadDocument,
    onSuccess: () => {
        invalidateOnboardingData(); // Refetch to show the doc as uploaded
        toast.success('Document uploaded successfully!');
    },
    onError: () => toast.error('Failed to upload document.'),
  });

  const submitOnboardingMutation = useMutation({
    mutationFn: OnboardingService.submitOnboarding,
    onSuccess: () => {
      invalidateOnboardingData();
      toast.success('Onboarding completed! Welcome aboard!');
      // Handle redirect here, e.g., router.push('/dashboard')
    },
    onError: () => toast.error('Failed to submit onboarding.'),
  });

  return {
    onboardingData: data,
    isLoading,
    isError,
    updateEmployeeData: updateDataMutation.mutateAsync,
    goToStep: updateStepMutation.mutateAsync,
    updateTodo: updateTodoMutation.mutateAsync,
    uploadDocument: uploadDocumentMutation.mutateAsync,
    submitOnboarding: submitOnboardingMutation.mutateAsync,
  };
};
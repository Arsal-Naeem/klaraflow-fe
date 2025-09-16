import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/utils/toast';
import onboardingTemplateService from '../services/onboarding-template.service';
import { OnboardingTemplate } from '../types';

// Query keys for better cache management
export const onboardingTemplateKeys = {
  all: ['onboarding-templates'] as const,
  templates: () => [...onboardingTemplateKeys.all, 'templates'] as const,
  template: (id: string) => [...onboardingTemplateKeys.templates(), id] as const,
};

// Hook to get all onboarding templates
export function useOnboardingTemplates() {
  return useQuery({
    queryKey: onboardingTemplateKeys.templates(),
    queryFn: () => onboardingTemplateService.getOnboardingTemplates(),
  });
}

// Hook to get single onboarding template
export function useOnboardingTemplate(templateId: string) {
  return useQuery({
    queryKey: onboardingTemplateKeys.template(templateId),
    queryFn: () => onboardingTemplateService.getOnboardingTemplateById(templateId),
    enabled: !!templateId,
  });
}

// Hook to create onboarding template
export function useCreateOnboardingTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateData: {
      name: string;
      todos: {
        title: string;
        description?: string;
      }[];
      requiredDocuments: string[];
      optionalDocuments: string[];
    }) => onboardingTemplateService.createOnboardingTemplate(templateData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingTemplateKeys.templates() });
      toast.success('Onboarding template created successfully!');
    },

    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create onboarding template';
      toast.error(message);
    },
  });
}

// Hook to update onboarding template
export function useUpdateOnboardingTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      templateId,
      templateData,
    }: {
      templateId: string;
      templateData: {
        name?: string;
        todos?: {
          title: string;
          description?: string;
        }[];
        requiredDocuments?: string[];
        optionalDocuments?: string[];
      };
    }) => onboardingTemplateService.updateOnboardingTemplate(templateId, templateData),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: onboardingTemplateKeys.templates() });
      queryClient.invalidateQueries({ queryKey: onboardingTemplateKeys.template(variables.templateId) });
      toast.success('Onboarding template updated successfully!');
    },

    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update onboarding template';
      toast.error(message);
    },
  });
}

// Hook to delete onboarding template
export function useDeleteOnboardingTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) => onboardingTemplateService.deleteOnboardingTemplate(templateId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingTemplateKeys.templates() });
      toast.success('Onboarding template deleted successfully!');
    },

    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete onboarding template';
      toast.error(message);
    },
  });
}
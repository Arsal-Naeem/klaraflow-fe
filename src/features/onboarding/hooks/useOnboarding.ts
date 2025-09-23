import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/utils/toast";
import { onboardingService } from "../services";
import { DocumentUploadField } from "@/features/documents/types";
import { documentKeys } from "@/features/documents/hooks/useDocuments";

// Query keys for better cache management
export const onboardingKeys = {
  all: ["onboarding"] as const,
  data: () => [...onboardingKeys.all, "data"] as const,
  documents: () => [...onboardingKeys.all, "documents"] as const,
  todos: () => [...onboardingKeys.all, "todos"] as const,
  template: () => [...onboardingKeys.all, "template"] as const,
};

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      onboardingService.createEmployee(formData),
    onSuccess: (newEmployee) => {
      toast.success("Employee created successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create employee";
      toast.error(message);
    },
  });
}

// Hook to fetch onboarding data
export function useOnboardingData(employeeId?: string) {
  return useQuery({
    queryKey: [...onboardingKeys.data(), employeeId],
    queryFn: () => onboardingService.getOnboardingData(employeeId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
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
      const message =
        error.response?.data?.message || "Failed to update todo item";
      toast.error(message);
    },
  });
}


// NOTE: The step advancing API previously caused race conditions when called from
// multiple client components. Per recent decision, step progression will be
// controlled by the backend within each individual API (e.g. document upload,
// todo completion). To avoid accidental usage we intentionally do NOT export a
// hook that calls `onboardingService.updateOnboardingStep` here.

// If consumers still import `useUpdateOnboardingStep` it will throw a helpful
// error to make the migration obvious during development.
export function useUpdateOnboardingStep(): never {
  throw new Error(
    "useUpdateOnboardingStep was removed. Step progression is now handled server-side by each API. Remove calls to this hook."
  );
}

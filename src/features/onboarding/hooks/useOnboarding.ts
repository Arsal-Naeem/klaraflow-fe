import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/utils/toast";
import { onboardingService } from "../services";
import { useState, useRef } from "react";
import { DocumentUploadField } from "@/features/documents/types";
import { documentKeys } from "@/features/documents/hooks/useDocuments";

// Query keys for better cache management
export const onboardingKeys = {
  all: ["onboarding"] as const,
  data: () => [...onboardingKeys.all, "data"] as const,
  documents: () => [...onboardingKeys.all, "documents"] as const,
  todos: () => [...onboardingKeys.all, "todos"] as const,
  template: () => [...onboardingKeys.all, "template"] as const,
  users: () => [...onboardingKeys.all, "users"] as const,
};

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      onboardingService.createEmployee(formData),
    onSuccess: (newEmployee) => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.users() });
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

// Hook to fetch onboarding Users
export function useOnboardingUsers() {
  return useQuery({
    queryKey: onboardingKeys.users(),
    queryFn: () => onboardingService.getAllOnboardingUsers(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Hook to Approve onboarding data
export function useApproveOnboardingSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) =>
      onboardingService.approveOnboardingSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.users() });
      toast.success("Employee Onboarded Successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to approve onboarding session";
      toast.error(message);
    },
  });
}

// Hook to advance onboarding step by calling the session increment API.
// This uses a mutation and an in-memory lock to avoid duplicate calls from the
// same UI step. The server is the source-of-truth for progression; this
// helper simply requests the server to advance the session once.
export function useAdvanceOnboardingStep() {
  const queryClient = useQueryClient();
  const inFlightRef = useRef(false);

  return {
    mutateAsync: async () => {
      if (inFlightRef.current) {
        // prevent duplicate simultaneous calls
        return;
      }
      inFlightRef.current = true;
      try {
        const updated = await onboardingService.incrementOnboardingStep();
        // Refresh onboarding data cache
        queryClient.invalidateQueries({ queryKey: onboardingKeys.data() });
        return updated;
      } catch (err) {
        throw err;
      } finally {
        inFlightRef.current = false;
      }
    },
  } as const;
}

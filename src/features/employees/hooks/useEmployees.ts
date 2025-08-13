import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/utils/toast';
import { employeesService } from '../services';
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeeFilters,
  EmployeesResponse,
} from '../types';

// Query keys for better cache management
export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (filters?: EmployeeFilters) => [...employeeKeys.lists(), filters] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeeKeys.details(), id] as const,
};

// Hook to fetch all employees
export function useEmployees(filters?: EmployeeFilters) {
  return useQuery({
    queryKey: employeeKeys.list(filters),
    queryFn: () => employeesService.getEmployees(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

// Hook to fetch single employee
export function useEmployee(id: string, enabled = true) {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => employeesService.getEmployeeById(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to create employee
export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employeeData: CreateEmployeeRequest) =>
      employeesService.createEmployee(employeeData),
    onSuccess: (newEmployee) => {
      // Invalidate and refetch employees list
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      
      // Add the new employee to the cache
      queryClient.setQueryData(employeeKeys.detail(newEmployee.id), newEmployee);
      
      toast.success('Employee created successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create employee';
      toast.error(message);
    },
  });
}

// Hook to update employee
export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeRequest }) =>
      employeesService.updateEmployee(id, data),
    onSuccess: (updatedEmployee) => {
      // Update the employee in the cache
      queryClient.setQueryData(employeeKeys.detail(updatedEmployee.id), updatedEmployee);
      
      // Invalidate employees list to reflect changes
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      
      toast.success('Employee updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update employee';
      toast.error(message);
    },
  });
}

// Hook to delete employee
export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => employeesService.deleteEmployee(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: employeeKeys.detail(deletedId) });
      
      // Invalidate employees list
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      
      toast.success('Employee deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete employee';
      toast.error(message);
    },
  });
}

// Hook to update employee status
export function useUpdateEmployeeStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'active' | 'inactive' | 'terminated' }) =>
      employeesService.updateEmployeeStatus(id, status),
    onSuccess: (updatedEmployee) => {
      // Update the employee in the cache
      queryClient.setQueryData(employeeKeys.detail(updatedEmployee.id), updatedEmployee);
      
      // Invalidate employees list to reflect changes
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      
      toast.success('Employee status updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update employee status';
      toast.error(message);
    },
  });
}

// Hook to upload employee document
export function useUploadEmployeeDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file, documentType }: { id: string; file: File; documentType: string }) =>
      employeesService.uploadDocument(id, file, documentType),
    onSuccess: (updatedEmployee) => {
      // Update the employee in the cache
      queryClient.setQueryData(employeeKeys.detail(updatedEmployee.id), updatedEmployee);
      
      toast.success('Document uploaded successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to upload document';
      toast.error(message);
    },
  });
}

// Prefetch employees for better UX
export function usePrefetchEmployees() {
  const queryClient = useQueryClient();

  return (filters?: EmployeeFilters) => {
    queryClient.prefetchQuery({
      queryKey: employeeKeys.list(filters),
      queryFn: () => employeesService.getEmployees(filters),
      staleTime: 5 * 60 * 1000,
    });
  };
}

// Hook for optimistic updates
export function useOptimisticEmployeeUpdate() {
  const queryClient = useQueryClient();

  return {
    updateEmployee: (id: string, updates: Partial<Employee>) => {
      queryClient.setQueryData(employeeKeys.detail(id), (old: Employee | undefined) => {
        if (!old) return old;
        return { ...old, ...updates };
      });
    },
    revertEmployee: (id: string) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.detail(id) });
    },
  };
}
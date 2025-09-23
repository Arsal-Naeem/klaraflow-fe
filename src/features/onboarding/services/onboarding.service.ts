import api from "@/lib/api";
import { TodoItem, OnboardingData } from "../types";
import { ApiResponse } from "@/types/api.types";
import { Employee } from "@/features/employees";
import { DocumentUpload, DocumentUploadField } from "@/features/documents/types";

// Onboarding API endpoints
const ONBOARDING_BASE_URL = "/onboarding";

export const onboardingService = {
  // POST - Create new employee with FormData (for file uploads)
  async createEmployee(formData: FormData): Promise<Employee> {
    const response = await api.post<ApiResponse<Employee>>(
      "/onboarding/invite",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  // GET - Fetch Onboarding Data
  async getOnboardingData(employeeId?: string): Promise<OnboardingData> {
    const endpoint = employeeId
      ? `${ONBOARDING_BASE_URL}/${employeeId}/data`
      : `${ONBOARDING_BASE_URL}/my-data`;

    const response = await api.get<ApiResponse<any>>(endpoint);
    const raw = response?.data?.data ?? {};

    // Helper to normalize backend response to OnboardingData
    const toOnboardingData = (r: any): OnboardingData => {
      // backend may return top-level fields for "my-data" (as example provided)
      // or nested shapes. Use optional chaining and fallbacks.
      return {
        id: r?.id ?? r?.employee_id ?? "",
        // preserve any employee data object or derive from top-level fields
        employeeData:
          r?.employee_data ??
          r?.employeeData ??
          (r?.firstName || r?.lastName || r?.new_employee_email
            ? {
                firstName: r?.firstName ?? r?.first_name ?? "",
                lastName: r?.lastName ?? r?.last_name ?? "",
                email:
                  r?.email ?? r?.new_employee_email ?? r?.new_employee_email ?? "",
                empId: r?.empId ?? r?.emp_id ?? r?.empId ?? "",
                phone: r?.phone ?? r?.phone_number ?? "",
                gender: r?.gender ?? "",
                dateOfBirth: r?.dateOfBirth ?? r?.date_of_birth ?? r?.dateOfBirth ?? undefined,
                nationality: r?.nationality ?? r?.nationality ?? undefined,
              }
            : undefined),
        todos: r?.todos ?? [],
        requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
        optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
        currentStep: r?.current_step ?? r?.currentStep ?? 1,
      };
    };

    const transformed = toOnboardingData(raw);

    return transformed;
  },

  // PUT - Update todo item completion
  async updateTodoItem(id: string, completed: boolean): Promise<TodoItem> {
    const response = await api.put<ApiResponse<TodoItem>>(
      `${ONBOARDING_BASE_URL}/todos/${id}`,
      { completed }
    );
    return response.data.data;
  },

  // PUT - Update onboarding step
  async updateOnboardingStep(step: number): Promise<OnboardingData> {
    const response = await api.put<ApiResponse<any>>(
      `${ONBOARDING_BASE_URL}/step`,
      { currentStep: step }
    );

    const raw = response?.data?.data ?? {};

    const toOnboardingData = (r: any): OnboardingData => {
      return {
        id: r?.id ?? r?.employee_id ?? "",
        employeeData: r?.employee_data ?? r?.employeeData ?? undefined,
        todos: r?.todos ?? [],
        requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
        optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
        currentStep: r?.current_step ?? r?.currentStep ?? step,
      };
    };

    return toOnboardingData(raw);
  },

  // PUT - Review onboarding data (multipart/form-data) including profilePic
  async reviewOnboarding(formData: FormData): Promise<OnboardingData> {
    const response = await api.put<ApiResponse<any>>(
      `${ONBOARDING_BASE_URL}/review`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const raw = response?.data?.data ?? {};

    const toOnboardingData = (r: any): OnboardingData => ({
      id: r?.id ?? r?.employee_id ?? "",
      employeeData: r?.employee_data ?? r?.employeeData ?? undefined,
      todos: r?.todos ?? [],
      requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
      optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
      currentStep: r?.current_step ?? r?.currentStep ?? 1,
    });

    return toOnboardingData(raw);
  },

};

export default onboardingService;

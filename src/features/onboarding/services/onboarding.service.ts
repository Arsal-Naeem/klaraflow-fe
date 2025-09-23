import api from "@/lib/api";
import { TodoItem, OnboardingData } from "../types";
import { ApiResponse } from "@/types/api.types";
import { Employee } from "@/features/employees";

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
    const raw = response.data.data;

    // Transform backend snake_case response to frontend camelCase shape
    const transformed: OnboardingData = {
      id: raw.id,
      employeeData: raw.employee_data || raw.employeeData,
      todos: raw.todos || [],
      requiredDocuments: raw.required_documents || raw.requiredDocuments || [],
      optionalDocuments: raw.optional_documents || raw.optionalDocuments || [],
      currentStep: raw.current_step ?? raw.currentStep ?? 1,
    };

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

    const raw = response.data.data;

    const transformed: OnboardingData = {
      id: raw.id,
      employeeData: raw.employee_data || raw.employeeData,
      todos: raw.todos || [],
      requiredDocuments: raw.required_documents || raw.requiredDocuments || [],
      optionalDocuments: raw.optional_documents || raw.optionalDocuments || [],
      currentStep: raw.current_step ?? raw.currentStep ?? step,
    };

    return transformed;
  },
};

export default onboardingService;

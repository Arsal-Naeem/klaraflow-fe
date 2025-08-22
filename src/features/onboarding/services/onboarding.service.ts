import api from "@/lib/api";
import {
  OnboardingStatus,
  OnboardingApproval,
  TodoItem,
  OnboardingDocument,
  ApiResponse,
  OnboardingData,
} from "../types";
import { Employee } from "@/features/employees";

// Onboarding API endpoints
const ONBOARDING_BASE_URL = "/onboarding";

export const onboardingService = {
  // GET - Fetch Onboarding Data
  async getOnboardingData(
    employeeId?: string
  ): Promise<OnboardingData> {
    const endpoint = employeeId
      ? `${ONBOARDING_BASE_URL}/${employeeId}/data`
      : `${ONBOARDING_BASE_URL}/my-data`;

    const response = await api.get<ApiResponse<OnboardingData>>(endpoint);
    return response.data.data;
  },

  // GET - Fetch onboarding status
  async getOnboardingStatus(employeeId?: string): Promise<OnboardingStatus> {
    const endpoint = employeeId
      ? `${ONBOARDING_BASE_URL}/${employeeId}/status`
      : `${ONBOARDING_BASE_URL}/my-status`;

    const response = await api.get<ApiResponse<OnboardingStatus>>(endpoint);
    return response.data.data;
  },

  // POST - Submit approval/rejection of onboarding data
  async submitApproval(approval: OnboardingApproval): Promise<void> {
    const response = await api.post<ApiResponse<void>>(
      `${ONBOARDING_BASE_URL}/approve`,
      approval
    );
    return response.data.data;
  },

  // POST - Upload document with form data
  async uploadDocument(
    documentType: string,
    documentData: Record<string, any>,
    label: string
  ): Promise<OnboardingDocument> {
    const formData = new FormData();

    // Add basic document info
    formData.append("type", documentType);
    formData.append("label", label);

    // Add all form fields to formData
    Object.entries(documentData).forEach(([key, value]) => {
      if (value instanceof File) {
        // Handle file fields
        formData.append(key, value);
      } else if (value !== null && value !== undefined && value !== "") {
        // Handle other field types (text, date, etc.)
        formData.append(key, String(value));
      }
    });

    const response = await api.post<ApiResponse<OnboardingDocument>>(
      `${ONBOARDING_BASE_URL}/documents/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
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
  async updateOnboardingStep(step: number): Promise<OnboardingStatus> {
    const response = await api.put<ApiResponse<OnboardingStatus>>(
      `${ONBOARDING_BASE_URL}/step`,
      { currentStep: step }
    );
    return response.data.data;
  },
};

export default onboardingService;

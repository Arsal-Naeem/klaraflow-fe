import api from "@/lib/api";
import {
  OnboardingData,
  OnboardingStatus,
  OnboardingApproval,
  OnboardingSubmission,
  TodoItem,
  OnboardingDocument,
  ApiResponse,
} from "../types";

// Onboarding API endpoints
const ONBOARDING_BASE_URL = "/onboarding";

export const onboardingService = {
  // GET - Fetch employee onboarding data
  async getOnboardingData(employeeId?: string): Promise<OnboardingData> {
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

  // GET - Fetch required documents
  async getRequiredDocuments(): Promise<OnboardingDocument[]> {
    const response = await api.get<ApiResponse<OnboardingDocument[]>>(
      `${ONBOARDING_BASE_URL}/documents/required`
    );
    return response.data.data;
  },

  // POST - Upload document
  async uploadDocument(
    documentType: string,
    file: File,
    label: string
  ): Promise<OnboardingDocument> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", documentType);
    formData.append("label", label);

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

  // GET - Fetch todo items
  async getTodoItems(): Promise<TodoItem[]> {
    const response = await api.get<ApiResponse<TodoItem[]>>(
      `${ONBOARDING_BASE_URL}/todos`
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

  // POST - Submit final onboarding
  async submitOnboarding(submission: OnboardingSubmission): Promise<void> {
    const response = await api.post<ApiResponse<void>>(
      `${ONBOARDING_BASE_URL}/submit`,
      submission
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

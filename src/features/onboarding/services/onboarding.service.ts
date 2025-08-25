import api from "@/lib/api";
import {
  TodoItem,
  OnboardingData,
} from "../types";
import { ApiResponse } from "@/types/api.types";

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
    const response = await api.put<ApiResponse<OnboardingData>>(
      `${ONBOARDING_BASE_URL}/step`,
      { currentStep: step }
    );
    return response.data.data;
  },
};

export default onboardingService;

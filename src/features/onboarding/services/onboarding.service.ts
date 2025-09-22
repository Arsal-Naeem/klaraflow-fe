import api from "@/lib/api";
import { TodoItem, OnboardingData, UpdateEmployeeDataPayload } from "../types";
import { ApiResponse } from "@/types/api.types";
import { Employee } from "@/features/employees";

// Onboarding API endpoints
const ONBOARDING_BASE_URL = "/onboarding";

export const OnboardingService = {
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
  getMyOnboardingData: async (): Promise<OnboardingData> => {
    const { data } = await api.get(`${URL}/my-data`);
    return data.data;
  },

  updateMyOnboardingData: async (payload: UpdateEmployeeDataPayload): Promise<OnboardingData> => {
    const { data } = await api.put(`${URL}/my-data`, payload);
    return data.data;
  },

  updateOnboardingStep: async (step: number): Promise<OnboardingData> => {
    const { data } = await api.put(`${URL}/step`, { current_step: step });
    return data.data;
  },

  updateTodo: async ({ todoId, completed }: { todoId: number; completed: boolean }): Promise<void> => {
    await api.put(`${URL}/todos/${todoId}`, null, { params: { completed } });
  },

  uploadDocument: async ({ documentTemplateId, file }: { documentTemplateId: number; file: File }): Promise<{ file_url: string }> => {
    const formData = new FormData();
    formData.append('document_template_id', String(documentTemplateId));
    formData.append('file', file);

    const { data } = await api.post(`${URL}/documents/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  submitOnboarding: async (): Promise<void> => {
    await api.post(`${URL}/submit`);
  },
};

export default OnboardingService;

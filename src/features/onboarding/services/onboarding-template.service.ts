import api from "@/lib/api";
import { ApiResponse } from "@/types/api.types";
import { OnboardingTemplate, TodoItem } from "../types";

// Onboarding Template API endpoints
const ONBOARDING_TEMPLATE_BASE_URL = "/onboarding-template";

export const onboardingTemplateService = {
  // GET - Fetch all onboarding templates
  async getOnboardingTemplates(): Promise<OnboardingTemplate[]> {
    const response = await api.get<ApiResponse<OnboardingTemplate[]>>(
      `${ONBOARDING_TEMPLATE_BASE_URL}/templates`
    );
    return response.data.data;
  },

  // GET - Fetch single onboarding template by ID
  async getOnboardingTemplateById(templateId: string): Promise<OnboardingTemplate> {
    const response = await api.get<ApiResponse<OnboardingTemplate>>(
      `${ONBOARDING_TEMPLATE_BASE_URL}/templates/${templateId}`
    );
    return response.data.data;
  },

  // POST - Create new onboarding template
  async createOnboardingTemplate(templateData: {
    name: string;
    todos: {
      title: string;
      description?: string;
    }[];
    requiredDocuments: string[];
    optionalDocuments: string[];
  }): Promise<OnboardingTemplate> {
    // Transform the data to match backend expectations
    const backendData = {
      name: templateData.name,
      todos: templateData.todos,
      required_document_ids: templateData.requiredDocuments.map((id) => parseInt(id)),
      optional_document_ids: templateData.optionalDocuments.map((id) => parseInt(id)),
    };

    const response = await api.post<ApiResponse<OnboardingTemplate>>(
      `${ONBOARDING_TEMPLATE_BASE_URL}/templates`,
      backendData
    );
    return response.data.data;
  },

  // PUT - Update existing onboarding template
  async updateOnboardingTemplate(
    templateId: string,
    templateData: {
      name?: string;
      todos?: {
        title: string;
        description?: string;
      }[];
      requiredDocuments?: string[];
      optionalDocuments?: string[];
    }
  ): Promise<OnboardingTemplate> {
    // Transform the data to match backend expectations
    const backendData: any = {};
    
    if (templateData.name !== undefined) {
      backendData.name = templateData.name;
    }
    
    if (templateData.todos !== undefined) {
      backendData.todos = templateData.todos;
    }
    
    if (templateData.requiredDocuments !== undefined) {
      backendData.required_document_ids = templateData.requiredDocuments.map((id) => parseInt(id));
    }
    
    if (templateData.optionalDocuments !== undefined) {
      backendData.optional_document_ids = templateData.optionalDocuments.map((id) => parseInt(id));
    }

    const response = await api.put<ApiResponse<OnboardingTemplate>>(
      `${ONBOARDING_TEMPLATE_BASE_URL}/templates/${templateId}`,
      backendData
    );
    return response.data.data;
  },

  // DELETE - Delete onboarding template
  async deleteOnboardingTemplate(templateId: string): Promise<void> {
    await api.delete(`${ONBOARDING_TEMPLATE_BASE_URL}/templates/${templateId}`);
  },
};

export default onboardingTemplateService;
// import api from "@/lib/api";
// import { ApiResponse } from "@/types/api.types";
// import { OnboardingTemplate, TodoItem } from "../types";

// // Onboarding Template API endpoints
// const ONBOARDING_TEMPLATE_BASE_URL = "/onboarding-template";

// export const onboardingTemplateService = {
//   // GET - Fetch all onboarding templates
//   async getOnboardingTemplates(): Promise<OnboardingTemplate[]> {
//     const response = await api.get<ApiResponse<OnboardingTemplate[]>>(
//       `${ONBOARDING_TEMPLATE_BASE_URL}/templates`
//     );
//     return response.data.data;
//   },

//   // GET - Fetch single onboarding template by ID
//   async getOnboardingTemplateById(templateId: string): Promise<OnboardingTemplate> {
//     const response = await api.get<ApiResponse<OnboardingTemplate>>(
//       `${ONBOARDING_TEMPLATE_BASE_URL}/templates/${templateId}`
//     );
//     return response.data.data;
//   },

//   // POST - Create new onboarding template
//   async createOnboardingTemplate(templateData: {
//     name: string;
//     todos: {
//       title: string;
//       description?: string;
//     }[];
//     requiredDocuments: string[];
//     optionalDocuments: string[];
//   }): Promise<OnboardingTemplate> {
//     // Transform the data to match backend expectations
//     const backendData = {
//       name: templateData.name,
//       todos: templateData.todos,
//       required_document_ids: templateData.requiredDocuments.map((id) => parseInt(id)),
//       optional_document_ids: templateData.optionalDocuments.map((id) => parseInt(id)),
//     };

//     const response = await api.post<ApiResponse<OnboardingTemplate>>(
//       `${ONBOARDING_TEMPLATE_BASE_URL}/templates`,
//       backendData
//     );
//     return response.data.data;
//   },

//   // PUT - Update existing onboarding template
//   async updateOnboardingTemplate(
//     templateId: string,
//     templateData: {
//       name?: string;
//       todos?: {
//         title: string;
//         description?: string;
//       }[];
//       requiredDocuments?: string[];
//       optionalDocuments?: string[];
//     }
//   ): Promise<OnboardingTemplate> {
//     // Transform the data to match backend expectations
//     const backendData: any = {};

//     if (templateData.name !== undefined) {
//       backendData.name = templateData.name;
//     }

//     if (templateData.todos !== undefined) {
//       backendData.todos = templateData.todos;
//     }

//     if (templateData.requiredDocuments !== undefined) {
//       backendData.required_document_ids = templateData.requiredDocuments.map((id) => parseInt(id));
//     }

//     if (templateData.optionalDocuments !== undefined) {
//       backendData.optional_document_ids = templateData.optionalDocuments.map((id) => parseInt(id));
//     }

//     const response = await api.put<ApiResponse<OnboardingTemplate>>(
//       `${ONBOARDING_TEMPLATE_BASE_URL}/templates/${templateId}`,
//       backendData
//     );
//     return response.data.data;
//   },

//   // DELETE - Delete onboarding template
//   async deleteOnboardingTemplate(templateId: string): Promise<void> {
//     await api.delete(`${ONBOARDING_TEMPLATE_BASE_URL}/templates/${templateId}`);
//   },
// };

// export default onboardingTemplateService;

// for prototpye

import { OnboardingTemplate } from "../types";

/**
 * ============================================================================
 *  FRONTEND-ONLY MOCK MODE
 * ============================================================================
 *  Drop-in replacement for the original `onboarding-template.service.ts`.
 *  Same exported function names / signatures as before — only the internals
 *  changed to read/write an in-memory list instead of calling the real API.
 *
 *  TO GO BACK TO THE REAL BACKEND LATER:
 *  Just restore the original file (the one that calls `api.get/post/put/delete`).
 * ============================================================================
 */

const MOCK_DELAY_MS = 500;

function delay<T>(value: T, ms: number = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(clone(value)), ms));
}

function clone<T>(value: T): T {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return value;
  }
}

let idCounter = 1;
const nextId = () => String(idCounter++);

// ---------------------------------------------------------------------------
// Fake database
// ---------------------------------------------------------------------------

let templates: any[] = [
  {
    id: nextId(),
    name: "Technical",
    todos: [
      {
        title: "Complete Security Training",
        description: "Mandatory security awareness training",
      },
      {
        title: "Setup IT Equipment",
        description: "Collect laptop, phone and other IT equipment",
      },
      {
        title: "Environment Setup",
        description: "Get dev environment and repo access configured",
      },
    ],
    requiredDocuments: ["doc1", "doc2"],
    optionalDocuments: ["doc3"],
  },
  {
    id: nextId(),
    name: "Sales",
    todos: [
      {
        title: "CRM Training",
        description: "Complete onboarding training for the CRM tool",
      },
      {
        title: "Meet Your Territory Lead",
        description: "Introductory call with your regional lead",
      },
    ],
    requiredDocuments: ["doc2"],
    optionalDocuments: [],
  },
  {
    id: nextId(),
    name: "General / Non-Technical",
    todos: [
      {
        title: "HR Orientation Meeting",
        description: "Attend the HR orientation session",
      },
      {
        title: "Complete Health & Safety Training",
        description: "Workplace health and safety training",
      },
    ],
    requiredDocuments: ["doc1"],
    optionalDocuments: ["doc3"],
  },
];

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export const onboardingTemplateService = {
  // GET - Fetch all onboarding templates
  async getOnboardingTemplates(): Promise<OnboardingTemplate[]> {
    return delay(templates) as Promise<OnboardingTemplate[]>;
  },

  // GET - Fetch single onboarding template by ID
  async getOnboardingTemplateById(
    templateId: string,
  ): Promise<OnboardingTemplate> {
    const template = templates.find((t) => t.id === templateId);
    return delay(template as OnboardingTemplate);
  },

  // POST - Create new onboarding template
  async createOnboardingTemplate(templateData: {
    name: string;
    todos: { title: string; description?: string }[];
    requiredDocuments: string[];
    optionalDocuments: string[];
  }): Promise<OnboardingTemplate> {
    const newTemplate = { id: nextId(), ...templateData };
    templates.push(newTemplate);
    return delay(newTemplate as OnboardingTemplate);
  },

  // PUT - Update existing onboarding template
  async updateOnboardingTemplate(
    templateId: string,
    templateData: {
      name?: string;
      todos?: { title: string; description?: string }[];
      requiredDocuments?: string[];
      optionalDocuments?: string[];
    },
  ): Promise<OnboardingTemplate> {
    const index = templates.findIndex((t) => t.id === templateId);
    if (index !== -1) {
      templates[index] = { ...templates[index], ...templateData };
    }
    return delay(templates[index] as OnboardingTemplate);
  },

  // DELETE - Delete onboarding template
  async deleteOnboardingTemplate(templateId: string): Promise<void> {
    templates = templates.filter((t) => t.id !== templateId);
    return delay(undefined);
  },
};

export default onboardingTemplateService;

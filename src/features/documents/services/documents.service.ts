//service.ts

import api from "@/lib/api";
import { ApiResponse } from "@/types/api.types";
import { DocumentUpload, DocumentUploadField, DocumentTemplate } from "../types";
import { ENABLE_MOCK_MODE, mockDocumentsService } from "@/data/mock-api";

// Document API endpoints
const DOCUMENT_BASE_URL = "/document";

export const documentService = {
  // Document Template Management
  
  // GET - Fetch all document templates
  async getDocumentTemplates(): Promise<DocumentTemplate[]> {
    // Use mock service in prototype mode
    if (ENABLE_MOCK_MODE) {
      return mockDocumentsService.getDocumentTemplates();
    }

    const response = await api.get<ApiResponse<DocumentTemplate[]>>(
      `${DOCUMENT_BASE_URL}/templates`
    );
    return response.data.data;
  },

  // GET - Fetch single document template by ID
  async getDocumentTemplateById(templateId: string): Promise<DocumentTemplate> {
    // Use mock service in prototype mode
    if (ENABLE_MOCK_MODE) {
      return mockDocumentsService.getDocumentTemplateById(templateId);
    }

    const response = await api.get<ApiResponse<DocumentTemplate>>(
      `${DOCUMENT_BASE_URL}/templates/${templateId}`
    );
    return response.data.data;
  },

  // POST - Create new document template
  async createDocumentTemplate(templateData: {
    name: string;
    fields: {
      label: string;
      type: "text" | "file" | "textarea" | "date";
      placeholder?: string;
      description?: string;
      required: boolean;
      width: "half" | "full";
    }[];
  }): Promise<DocumentTemplate> {
    // Use mock service in prototype mode
    if (ENABLE_MOCK_MODE) {
      return mockDocumentsService.createDocumentTemplate(templateData);
    }

    const response = await api.post<ApiResponse<DocumentTemplate>>(
      `${DOCUMENT_BASE_URL}/templates`,
      templateData
    );
    return response.data.data;
  },

  // PUT - Update existing document template
  async updateDocumentTemplate(
    templateId: string,
    templateData: {
      name?: string;
      fields?: {
        label: string;
        type: "text" | "file" | "textarea" | "date";
        placeholder?: string;
        description?: string;
        required: boolean;
        width: "half" | "full";
      }[];
    }
  ): Promise<DocumentTemplate> {
    // Use mock service in prototype mode
    if (ENABLE_MOCK_MODE) {
      return mockDocumentsService.updateDocumentTemplate(templateId, templateData);
    }

    const response = await api.put<ApiResponse<DocumentTemplate>>(
      `${DOCUMENT_BASE_URL}/templates/${templateId}`,
      templateData
    );
    return response.data.data;
  },

  // DELETE - Delete document template
  async deleteDocumentTemplate(templateId: string): Promise<void> {
    // Use mock service in prototype mode
    if (ENABLE_MOCK_MODE) {
      await mockDocumentsService.deleteDocumentTemplate(templateId);
      return;
    }

    await api.delete(`${DOCUMENT_BASE_URL}/templates/${templateId}`);
  },

  // Document Upload (enhanced for template-based uploads)
  
  // POST - Upload document with form data
  async uploadDocument(
    templateId: string,
    employeeId: string,
    payload: DocumentUploadField[]
  ): Promise<DocumentUpload> {
    // In mock mode, just return mock response
    if (ENABLE_MOCK_MODE) {
      return {
        id: 'doc_' + Date.now(),
        templateId,
        employeeId,
        status: 'completed',
        uploadedAt: new Date().toISOString(),
      } as DocumentUpload;
    }

    const formData = new FormData();

    // Add employeeId
    formData.append("employee_id", employeeId);

    // Collect non-file fields in an object
    const normalFields: Record<string, any> = {};

    payload.forEach((field) => {
      if (field.value instanceof File) {
        // Files stay as binary
        formData.append(field.id, field.value);
        // Also append to a generic files array so backend can receive all files under 'files'
        formData.append('files', field.value);
      } else if (field.value instanceof Date) {
        normalFields[field.id] = field.value.toISOString();
      } else if (
        field.value !== null &&
        field.value !== undefined &&
        field.value !== ""
      ) {
        normalFields[field.id] = field.value;
      }
    });

    // Add JSON string of normal fields
    formData.append("fields", JSON.stringify(normalFields));

    // Use the onboarding documents submission endpoint (templateId in path)
    // Backend expects: POST /api/v1/onboarding/documents/submit/{template_id}
    const response = await api.post<ApiResponse<DocumentUpload>>(
      `onboarding/documents/submit/${templateId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  },
};

export default documentService;

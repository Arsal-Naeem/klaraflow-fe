//service.ts

import api from "@/lib/api";
import { ApiResponse } from "@/types/api.types";
import { DocumentUpload, DocumentUploadField, DocumentTemplate } from "../types";

// Document API endpoints
const DOCUMENT_BASE_URL = "/document";

export const documentService = {
  // Document Template Management
  
  // GET - Fetch all document templates
  async getDocumentTemplates(): Promise<DocumentTemplate[]> {
    const response = await api.get<ApiResponse<DocumentTemplate[]>>(
      `${DOCUMENT_BASE_URL}/templates`
    );
    return response.data.data;
  },

  // GET - Fetch single document template by ID
  async getDocumentTemplateById(templateId: string): Promise<DocumentTemplate> {
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
    const response = await api.put<ApiResponse<DocumentTemplate>>(
      `${DOCUMENT_BASE_URL}/templates/${templateId}`,
      templateData
    );
    return response.data.data;
  },

  // DELETE - Delete document template
  async deleteDocumentTemplate(templateId: string): Promise<void> {
    await api.delete(`${DOCUMENT_BASE_URL}/templates/${templateId}`);
  },

  // Document Upload (enhanced for template-based uploads)
  
  // POST - Upload document with form data
  async uploadDocument(
    templateId: string,
    employeeId: string,
    payload: DocumentUploadField[]
  ): Promise<DocumentUpload> {
    const formData = new FormData();

    // Add employeeId
    formData.append("employee_id", employeeId);

    // Collect non-file fields in an object
    const normalFields: Record<string, any> = {};

    payload.forEach((field) => {
      if (field.value instanceof File) {
        // Files stay as binary
        formData.append(field.id, field.value);
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

    const response = await api.post<ApiResponse<DocumentUpload>>(
      `onboarding/documents/upload`,
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

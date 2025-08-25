//service.ts

import api from "@/lib/api";
import { ApiResponse } from "@/types/api.types";
import { DocumentUpload, DocumentUploadField } from "../types";

// Document API endpoints
const DOCUMENT_BASE_URL = "/document";

export const documentService = {
  // POST - Upload document with form data
  async uploadDocument(
    docId: string,
    employeeId: string,
    payload: DocumentUploadField[]
  ): Promise<DocumentUpload> {
    const formData = new FormData();

    // Add employeeId
    formData.append("employeeId", employeeId);

    // Add all fields
    payload.forEach((field) => {
      if (field.value instanceof File) {
        formData.append(field.id, field.value);
      } else if (field.value instanceof Date) {
        formData.append(field.id, field.value.toISOString());
      } else if (
        field.value !== null &&
        field.value !== undefined &&
        field.value !== ""
      ) {
        formData.append(field.id, String(field.value));
      }
    });

    const response = await api.post<ApiResponse<DocumentUpload>>(
      `${DOCUMENT_BASE_URL}/upload/${docId}`,
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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/utils/toast';
import documentService from '../services/documents.service';
import { DocumentUploadField, DocumentTemplate } from '../types';

// Query keys for better cache management
export const documentKeys = {
  all: ['documents'] as const,
  templates: () => [...documentKeys.all, 'templates'] as const,
  template: (id: string) => [...documentKeys.templates(), id] as const,
  documents: () => [...documentKeys.all, 'documents'] as const,
};

// Document Template Hooks

// Hook to get all document templates
export function useDocumentTemplates() {
  return useQuery({
    queryKey: documentKeys.templates(),
    queryFn: () => documentService.getDocumentTemplates(),
  });
}

// Hook to get single document template
export function useDocumentTemplate(templateId: string) {
  return useQuery({
    queryKey: documentKeys.template(templateId),
    queryFn: () => documentService.getDocumentTemplateById(templateId),
    enabled: !!templateId,
  });
}

// Hook to create document template
export function useCreateDocumentTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateData: {
      name: string;
      fields: {
        label: string;
        type: "text" | "file" | "textarea" | "date";
        placeholder?: string;
        description?: string;
        required: boolean;
        width: "half" | "full";
      }[];
    }) => documentService.createDocumentTemplate(templateData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.templates() });
      toast.success('Document template created successfully!');
    },

    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create document template';
      toast.error(message);
    },
  });
}

// Hook to update document template
export function useUpdateDocumentTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      templateId,
      templateData,
    }: {
      templateId: string;
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
      };
    }) => documentService.updateDocumentTemplate(templateId, templateData),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.templates() });
      queryClient.invalidateQueries({ queryKey: documentKeys.template(variables.templateId) });
      toast.success('Document template updated successfully!');
    },

    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update document template';
      toast.error(message);
    },
  });
}

// Hook to delete document template
export function useDeleteDocumentTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) => documentService.deleteDocumentTemplate(templateId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.templates() });
      toast.success('Document template deleted successfully!');
    },

    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete document template';
      toast.error(message);
    },
  });
}

// Hook to upload document
export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      templateId,
      employeeId,
      payload,
    }: {
      templateId: string;
      employeeId: string;
      payload: DocumentUploadField[];
    }) => documentService.uploadDocument(templateId, employeeId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.documents() });
      toast.success('Document uploaded successfully!');
    },

    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to upload document';
      toast.error(message);
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/utils/toast';
import documentService from '../services/documents.service';
import { DocumentUploadField } from '../types';

// Query keys for better cache management
export const documentKeys = {
  all: ['documents'] as const,
  documents: () => [...documentKeys.all, 'documents'] as const,
};

// Hook to upload document
export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      docId,
      employeeId,
      payload,
    }: {
      docId: string;
      employeeId: string;
      payload: DocumentUploadField[];
    }) => documentService.uploadDocument(docId, employeeId, payload),

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

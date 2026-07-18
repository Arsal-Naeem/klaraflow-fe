// Mock document template data for prototype
import { DocumentTemplate } from '@/features/documents/types';

export const MOCK_DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Employment Contract',
    description: 'Standard employment contract template',
    fields: [
      {
        label: 'Employee Name',
        type: 'text',
        placeholder: 'Enter employee name',
        required: true,
        width: 'full',
      },
      {
        label: 'Position',
        type: 'text',
        placeholder: 'Enter position',
        required: true,
        width: 'half',
      },
      {
        label: 'Department',
        type: 'text',
        placeholder: 'Enter department',
        required: true,
        width: 'half',
      },
      {
        label: 'Salary',
        type: 'text',
        placeholder: 'Enter salary amount',
        required: true,
        width: 'half',
      },
      {
        label: 'Start Date',
        type: 'date',
        required: true,
        width: 'half',
      },
      {
        label: 'Terms and Conditions',
        type: 'textarea',
        placeholder: 'Enter terms and conditions',
        required: true,
        width: 'full',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'NDA Agreement',
    description: 'Non-disclosure agreement template',
    fields: [
      {
        label: 'Employee Name',
        type: 'text',
        placeholder: 'Enter employee name',
        required: true,
        width: 'half',
      },
      {
        label: 'Date',
        type: 'date',
        required: true,
        width: 'half',
      },
      {
        label: 'NDA Agreement',
        type: 'textarea',
        placeholder: 'NDA content',
        required: true,
        width: 'full',
      },
      {
        label: 'Signature',
        type: 'file',
        description: 'Upload signed NDA',
        required: true,
        width: 'full',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Confidentiality Agreement',
    description: 'Confidentiality agreement template',
    fields: [
      {
        label: 'Company Name',
        type: 'text',
        placeholder: 'Enter company name',
        required: true,
        width: 'half',
      },
      {
        label: 'Employee Name',
        type: 'text',
        placeholder: 'Enter employee name',
        required: true,
        width: 'half',
      },
      {
        label: 'Effective Date',
        type: 'date',
        required: true,
        width: 'half',
      },
      {
        label: 'Expiration Date',
        type: 'date',
        required: true,
        width: 'half',
      },
      {
        label: 'Agreement Details',
        type: 'textarea',
        placeholder: 'Enter agreement details',
        required: true,
        width: 'full',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

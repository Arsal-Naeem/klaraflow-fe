import api from "@/lib/api";
import { TodoItem, OnboardingData } from "../types";
import { ApiResponse } from "@/types/api.types";
import { Employee } from "@/features/employees";
import { DocumentUpload, DocumentUploadField } from "@/features/documents/types";

// Onboarding API endpoints
const ONBOARDING_BASE_URL = "/onboarding";

export const onboardingService = {
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
  async getOnboardingData(employeeId?: string): Promise<OnboardingData> {
    const endpoint = employeeId
      ? `${ONBOARDING_BASE_URL}/${employeeId}/data`
      : `${ONBOARDING_BASE_URL}/my-data`;

    const response = await api.get<ApiResponse<any>>(endpoint);
    const raw = response?.data?.data ?? {};

    // Helper to normalize backend response to OnboardingData
    const toOnboardingData = (r: any): OnboardingData => {
      // helper to map backend field to app's DocumentField
      const mapField = (f: any) => {
        // backend might use `field_type` or `type` as the key
        const backendType = (f?.field_type ?? f?.type ?? 'text').toString().toLowerCase();

        // Heuristics: try to infer a more specific type from label/description when backendType is generic
        const label = (f?.label ?? f?.name ?? '').toString().toLowerCase();
        const description = (f?.description ?? '').toString().toLowerCase();

        let mappedType: 'text' | 'textarea' | 'date' | 'file' = 'text';

        if (backendType === 'textarea' || label.includes('textarea') || description.includes('textarea')) {
          mappedType = 'textarea';
        } else if (backendType === 'date' || label.includes('date') || description.includes('date') || label.includes('dob')) {
          mappedType = 'date';
        } else if (
          backendType === 'file' || backendType === 'image' || backendType === 'upload' ||
          label.includes('image') || label.includes('photo') || label.includes('picture') || label.includes('file') || description.includes('image')
        ) {
          mappedType = 'file';
        } else {
          // default to text
          mappedType = 'text';
        }

        return {
          id: f?.id !== undefined && f?.id !== null ? String(f.id) : undefined,
          label: f?.label ?? f?.name ?? '',
          type: mappedType,
          placeholder: f?.placeholder ?? undefined,
          description: f?.description ?? undefined,
          required: !!f?.required,
          width: (f?.width === 'full' || f?.width === 'half') ? f.width : (f?.full ? 'full' : 'half'),
        };
      };

      const mapDocument = (d: any) => ({
        id: d?.id !== undefined && d?.id !== null ? String(d.id) : '',
        name: d?.name ?? d?.title ?? '',
        fields: Array.isArray(d?.fields) ? d.fields.map(mapField) : [],
        required: !!d?.required,
        uploaded: !!d?.uploaded,
      });

      return {
        id: r?.id ?? r?.employee_id ?? '',
        employeeData:
          r?.employee_data ??
          r?.employeeData ??
          (r?.firstName || r?.lastName || r?.new_employee_email
            ? {
                firstName: r?.firstName ?? r?.first_name ?? '',
                lastName: r?.lastName ?? r?.last_name ?? '',
                email:
                  r?.email ?? r?.new_employee_email ?? r?.new_employee_email ?? '',
                empId: r?.empId ?? r?.emp_id ?? r?.empId ?? '',
                phone: r?.phone ?? r?.phone_number ?? '',
                gender: r?.gender ?? '',
                dateOfBirth: r?.dateOfBirth ?? r?.date_of_birth ?? r?.dateOfBirth ?? undefined,
                nationality: r?.nationality ?? r?.nationality ?? undefined,
              }
            : undefined),
        todos: r?.todos ?? [],
        requiredDocuments: Array.isArray(r?.required_documents)
          ? r.required_documents.map(mapDocument)
          : Array.isArray(r?.requiredDocuments)
          ? r.requiredDocuments.map(mapDocument)
          : [],
        optionalDocuments: Array.isArray(r?.optional_documents)
          ? r.optional_documents.map(mapDocument)
          : Array.isArray(r?.optionalDocuments)
          ? r.optionalDocuments.map(mapDocument)
          : [],
        currentStep: r?.current_step ?? r?.currentStep ?? 1,
      };
    };

    const transformed = toOnboardingData(raw);

    return transformed;
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
    const response = await api.put<ApiResponse<any>>(
      `${ONBOARDING_BASE_URL}/step`,
      { currentStep: step }
    );

    const raw = response?.data?.data ?? {};

    const toOnboardingData = (r: any): OnboardingData => {
      return {
        id: r?.id ?? r?.employee_id ?? "",
        employeeData: r?.employee_data ?? r?.employeeData ?? undefined,
        todos: r?.todos ?? [],
        requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
        optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
        currentStep: r?.current_step ?? r?.currentStep ?? step,
      };
    };

    return toOnboardingData(raw);
  },

  // PUT - Review onboarding data (multipart/form-data) including profilePic
  async reviewOnboarding(formData: FormData): Promise<OnboardingData> {
    const response = await api.put<ApiResponse<any>>(
      `${ONBOARDING_BASE_URL}/review`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const raw = response?.data?.data ?? {};

    const toOnboardingData = (r: any): OnboardingData => ({
      id: r?.id ?? r?.employee_id ?? "",
      employeeData: r?.employee_data ?? r?.employeeData ?? undefined,
      todos: r?.todos ?? [],
      requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
      optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
      currentStep: r?.current_step ?? r?.currentStep ?? 1,
    });

    return toOnboardingData(raw);
  },

  async incrementOnboardingStep(): Promise<OnboardingData> {
    const response = await api.put<ApiResponse<any>>(`${ONBOARDING_BASE_URL}/step`);
    const raw = response?.data?.data ?? {};

    const toOnboardingData = (r: any): OnboardingData => ({
      id: r?.id ?? r?.employee_id ?? '',
      employeeData: r?.employee_data ?? r?.employeeData ?? undefined,
      todos: r?.todos ?? [],
      requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
      optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
      currentStep: r?.current_step ?? r?.currentStep ?? 1,
    });

    return toOnboardingData(raw);
  },

  // POST - Submit the onboarding application for HR review
  async submitOnboarding(): Promise<{ message?: string }> {
    const response = await api.post<ApiResponse<any>>(
      `${ONBOARDING_BASE_URL}/submit`
    );
    return response?.data ?? { success: false };
  },

};

export default onboardingService;

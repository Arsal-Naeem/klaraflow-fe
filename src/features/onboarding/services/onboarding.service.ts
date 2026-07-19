// import api from "@/lib/api";
// import { TodoItem, OnboardingData } from "../types";
// import { ApiResponse } from "@/types/api.types";
// import { Employee } from "@/features/employees";

// // Onboarding API endpoints
// const ONBOARDING_BASE_URL = "/onboarding";

// export const onboardingService = {
//   // POST - Create new employee with FormData (for file uploads)
//   async createEmployee(formData: FormData): Promise<Employee> {
//     const response = await api.post<ApiResponse<Employee>>(
//       "/onboarding/invite",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return response.data.data;
//   },

//   // GET - Fetch Onboarding Data
//   async getOnboardingData(employeeId?: string): Promise<OnboardingData> {
//     const endpoint = employeeId
//       ? `${ONBOARDING_BASE_URL}/${employeeId}/data`
//       : `${ONBOARDING_BASE_URL}/my-data`;

//     const response = await api.get<ApiResponse<any>>(endpoint);
//     const raw = response?.data?.data ?? {};

//     // Helper to normalize backend response to OnboardingData
//     const toOnboardingData = (r: any): OnboardingData => {
//       // helper to map backend field to app's DocumentField
//       const mapField = (f: any) => {
//         // backend might use `field_type` or `type` as the key
//         const backendType = (f?.field_type ?? f?.type ?? "text")
//           .toString()
//           .toLowerCase();

//         // Heuristics: try to infer a more specific type from label/description when backendType is generic
//         const label = (f?.label ?? f?.name ?? "").toString().toLowerCase();
//         const description = (f?.description ?? "").toString().toLowerCase();

//         let mappedType: "text" | "textarea" | "date" | "file" = "text";

//         if (
//           backendType === "textarea" ||
//           label.includes("textarea") ||
//           description.includes("textarea")
//         ) {
//           mappedType = "textarea";
//         } else if (
//           backendType === "date" ||
//           label.includes("date") ||
//           description.includes("date") ||
//           label.includes("dob")
//         ) {
//           mappedType = "date";
//         } else if (
//           backendType === "file" ||
//           backendType === "image" ||
//           backendType === "upload" ||
//           label.includes("image") ||
//           label.includes("photo") ||
//           label.includes("picture") ||
//           label.includes("file") ||
//           description.includes("image")
//         ) {
//           mappedType = "file";
//         } else {
//           // default to text
//           mappedType = "text";
//         }

//         return {
//           id: f?.id !== undefined && f?.id !== null ? String(f.id) : undefined,
//           label: f?.label ?? f?.name ?? "",
//           type: mappedType,
//           placeholder: f?.placeholder ?? undefined,
//           description: f?.description ?? undefined,
//           required: !!f?.required,
//           width:
//             f?.width === "full" || f?.width === "half"
//               ? f.width
//               : f?.full
//               ? "full"
//               : "half",
//         };
//       };

//       const mapDocument = (d: any) => ({
//         id: d?.id !== undefined && d?.id !== null ? String(d.id) : "",
//         name: d?.name ?? d?.title ?? "",
//         fields: Array.isArray(d?.fields) ? d.fields.map(mapField) : [],
//         required: !!d?.required,
//         uploaded: !!d?.uploaded,
//       });

//       return {
//         id: r?.id ?? r?.employee_id ?? "",
//         employeeData:
//           r?.employee_data ??
//           r?.employeeData ??
//           (r?.firstName || r?.lastName || r?.new_employee_email
//             ? {
//                 firstName: r?.firstName ?? r?.first_name ?? "",
//                 lastName: r?.lastName ?? r?.last_name ?? "",
//                 email:
//                   r?.email ??
//                   r?.new_employee_email ??
//                   r?.new_employee_email ??
//                   "",
//                 empId: r?.empId ?? r?.emp_id ?? r?.empId ?? "",
//                 phone: r?.phone ?? r?.phone_number ?? "",
//                 gender: r?.gender ?? "",
//                 dateOfBirth:
//                   r?.dateOfBirth ??
//                   r?.date_of_birth ??
//                   r?.dateOfBirth ??
//                   undefined,
//                 nationality: r?.nationality ?? r?.nationality ?? undefined,
//               }
//             : undefined),
//         todos: r?.todos ?? [],
//         requiredDocuments: Array.isArray(r?.required_documents)
//           ? r.required_documents.map(mapDocument)
//           : Array.isArray(r?.requiredDocuments)
//           ? r.requiredDocuments.map(mapDocument)
//           : [],
//         optionalDocuments: Array.isArray(r?.optional_documents)
//           ? r.optional_documents.map(mapDocument)
//           : Array.isArray(r?.optionalDocuments)
//           ? r.optionalDocuments.map(mapDocument)
//           : [],
//         currentStep: r?.current_step ?? r?.currentStep ?? 1,
//       };
//     };

//     const transformed = toOnboardingData(raw);

//     return transformed;
//   },

//   // PUT - Update todo item completion
//   async updateTodoItem(id: string, completed: boolean): Promise<TodoItem> {
//     const response = await api.put<ApiResponse<TodoItem>>(
//       `${ONBOARDING_BASE_URL}/todos/${id}`,
//       { completed }
//     );
//     return response.data.data;
//   },

//   // PUT - Update onboarding step
//   async updateOnboardingStep(step: number): Promise<OnboardingData> {
//     const response = await api.put<ApiResponse<any>>(
//       `${ONBOARDING_BASE_URL}/step`,
//       { currentStep: step }
//     );

//     const raw = response?.data?.data ?? {};

//     const toOnboardingData = (r: any): OnboardingData => {
//       return {
//         id: r?.id ?? r?.employee_id ?? "",
//         employeeData: r?.employee_data ?? r?.employeeData ?? undefined,
//         todos: r?.todos ?? [],
//         requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
//         optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
//         currentStep: r?.current_step ?? r?.currentStep ?? step,
//       };
//     };

//     return toOnboardingData(raw);
//   },

//   // PUT - Review onboarding data (multipart/form-data) including profilePic
//   async reviewOnboarding(formData: FormData): Promise<OnboardingData> {
//     const response = await api.put<ApiResponse<any>>(
//       `${ONBOARDING_BASE_URL}/review`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     const raw = response?.data?.data ?? {};

//     const toOnboardingData = (r: any): OnboardingData => ({
//       id: r?.id ?? r?.employee_id ?? "",
//       employeeData: r?.employee_data ?? r?.employeeData ?? undefined,
//       todos: r?.todos ?? [],
//       requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
//       optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
//       currentStep: r?.current_step ?? r?.currentStep ?? 1,
//     });

//     return toOnboardingData(raw);
//   },

//   async incrementOnboardingStep(): Promise<OnboardingData> {
//     const response = await api.put<ApiResponse<any>>(
//       `${ONBOARDING_BASE_URL}/step`
//     );
//     const raw = response?.data?.data ?? {};

//     const toOnboardingData = (r: any): OnboardingData => ({
//       id: r?.id ?? r?.employee_id ?? "",
//       employeeData: r?.employee_data ?? r?.employeeData ?? undefined,
//       todos: r?.todos ?? [],
//       requiredDocuments: r?.required_documents ?? r?.requiredDocuments ?? [],
//       optionalDocuments: r?.optional_documents ?? r?.optionalDocuments ?? [],
//       currentStep: r?.current_step ?? r?.currentStep ?? 1,
//     });

//     return toOnboardingData(raw);
//   },

//   // POST - Submit the onboarding application for HR review
//   async submitOnboarding(): Promise<{ message?: string }> {
//     const response = await api.post<ApiResponse<any>>(
//       `${ONBOARDING_BASE_URL}/submit`
//     );
//     return response?.data ?? { success: false };
//   },

//   // GET - Fetch all onboarding Users
//   async getAllOnboardingUsers(params?: { q?: string; status?: string }): Promise<Employee[]> {
//     // Build query string only for provided params
//     const qs: string[] = [];
//     if (params?.q) qs.push(`q=${encodeURIComponent(params.q)}`);
//     if (params?.status) qs.push(`status=${encodeURIComponent(params.status)}`);
//     const queryString = qs.length ? `?${qs.join("&")}` : "";

//     const response = await api.get<ApiResponse<Employee[]>>(
//       `${ONBOARDING_BASE_URL}/sessions${queryString}`
//     );
//     return response.data.data;
//   },

//   // PUT - Approve an onboarding session (HR action)
//   async approveOnboardingSession(
//     sessionId: string
//   ): Promise<{ message?: string }> {
//     const response = await api.put<ApiResponse<any>>(
//       `${ONBOARDING_BASE_URL}/onboard?sessionId=${sessionId}`
//     );
//     return response?.data ?? { success: false };
//   },
// };

// export default onboardingService;

// for prototype
import { TodoItem, OnboardingData } from "../types";
import { Employee } from "@/features/employees";

/**
 * ============================================================================
 *  FRONTEND-ONLY MOCK MODE
 * ============================================================================
 *  The real backend for the onboarding module isn't ready yet, so this file
 *  is a drop-in replacement for the original `onboarding.service.ts`.
 *
 *  It exposes the EXACT same function names / signatures / return shapes as
 *  before, so nothing in the components or hooks needs to change. Internally
 *  it just reads/writes an in-memory "fake database" and resolves promises
 *  after a short artificial delay so loading states, spinners, etc. still
 *  look and feel realistic in front of the client.
 *
 *  TO GO BACK TO THE REAL BACKEND LATER:
 *  Just restore the original file (the one that calls `api.get/post/put`).
 *  Nothing else in the app needs to change.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MOCK_DELAY_MS = 500;

function delay<T>(value: T, ms: number = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(clone(value)), ms));
}

// Cheap deep clone so callers can't accidentally mutate our "database"
// by mutating the object they got back (File objects are stripped out by
// JSON serialization, which is fine — we never need to clone a File).
function clone<T>(value: T): T {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return value;
  }
}

let idCounter = 1000;
const nextId = () => String(idCounter++);

// ---------------------------------------------------------------------------
// Fake database
// ---------------------------------------------------------------------------

const mockCompany = {
  id: "COMP001",
  name: "KlaraFlow",
  profilePic: "",
  address: "123 Tech Lane, Silicon Valley, CA",
  phone: "+923422417528",
  email: "hr@klaraflow.com",
};

const mockEmployeeData: any = {
  id: "EMP001",
  empId: "EMP001",
  firstName: "Sarah",
  lastName: "Ahmed",
  email: "sarah.ahmed@klaraflow.com",
  phone: "+923001234567",
  gender: "female",
  userRole: "03",
  designation: "Frontend Developer",
  department: "Engineering",
  jobType: "Full-time",
  hiringDate: "2026-08-01",
  onboardingTemplate: "Technical",
  reportTo: "Ali Raza",
  grade: "Mid-level",
  probationPeriod: "3 months",
  dateOfBirth: "1997-03-12",
  maritalStatus: "single",
  nationality: "pakistan",
  profilePic: "",
  status: "pending",
};

const mockTodos: TodoItem[] = [
  {
    id: "todo1",
    title: "Complete Security Training",
    description: "Complete the mandatory security awareness training module",
    is_completed: false,
  } as TodoItem,
  {
    id: "todo2",
    title: "Setup IT Equipment",
    description:
      "Collect laptop, phone and other IT equipment from the IT department",
    is_completed: false,
  } as TodoItem,
  {
    id: "todo3",
    title: "HR Orientation Meeting",
    description: "Attend the HR orientation session about company policies",
    is_completed: false,
  } as TodoItem,
  {
    id: "todo4",
    title: "Complete Health & Safety Training",
    description: "Complete the workplace health and safety training",
    is_completed: false,
  } as TodoItem,
];

const mockRequiredDocuments: any[] = [
  {
    id: "doc1",
    name: "Education Certificate",
    required: true,
    uploaded: false,
    fields: [
      { id: "f1", label: "Title", type: "text", required: true, width: "full" },
      {
        id: "f2",
        label: "Attach your document",
        type: "file",
        required: true,
        width: "full",
      },
      {
        id: "f3",
        label: "Description",
        type: "textarea",
        required: false,
        width: "full",
      },
    ],
  },
  {
    id: "doc2",
    name: "Emirates ID Card",
    required: true,
    uploaded: false,
    fields: [
      {
        id: "f4",
        label: "First Name",
        type: "text",
        required: true,
        width: "half",
      },
      {
        id: "f5",
        label: "Last Name",
        type: "text",
        required: true,
        width: "half",
      },
      {
        id: "f6",
        label: "Issue Date",
        type: "date",
        required: false,
        width: "half",
      },
      {
        id: "f7",
        label: "Expiry Date",
        type: "date",
        required: false,
        width: "half",
      },
      {
        id: "f8",
        label: "Front Side",
        type: "file",
        required: true,
        width: "half",
      },
      {
        id: "f9",
        label: "Back Side",
        type: "file",
        required: true,
        width: "half",
      },
    ],
  },
];

const mockOptionalDocuments: any[] = [
  {
    id: "doc3",
    name: "Previous Employment Letter",
    required: false,
    uploaded: false,
    fields: [
      {
        id: "f10",
        label: "Company Name",
        type: "text",
        required: false,
        width: "half",
      },
      {
        id: "f11",
        label: "Designation",
        type: "text",
        required: false,
        width: "half",
      },
      {
        id: "f12",
        label: "Attach Letter",
        type: "file",
        required: false,
        width: "full",
      },
    ],
  },
];

// This is the single mutable "database" the mock service reads/writes.
const store: any = {
  id: "ONB001",
  company: mockCompany,
  employeeData: mockEmployeeData,
  todos: mockTodos,
  requiredDocuments: mockRequiredDocuments,
  optionalDocuments: mockOptionalDocuments,
  currentStep: 1,
  submitted: false,
};

// A few extra dummy sessions purely so the "all onboarding users" admin list
// (used outside this wizard) has something to show.
const mockSessions: any[] = [
  { ...mockEmployeeData, id: "EMP001", status: "pending" },
  {
    id: "EMP002",
    empId: "EMP002",
    firstName: "Hassan",
    lastName: "Khan",
    email: "hassan.khan@klaraflow.com",
    designation: "Backend Developer",
    department: "Engineering",
    status: "pending",
    current_step: "1"
  },
  {
    id: "EMP003",
    empId: "EMP003",
    firstName: "Ayesha",
    lastName: "Malik",
    email: "ayesha.malik@klaraflow.com",
    designation: "HR Executive",
    department: "Human Resources",
    status: "active",
    current_step: "2"
  },
];

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export const onboardingService = {
  // POST - Create new employee (invite)
  async createEmployee(formData: FormData): Promise<Employee> {
    const newEmployee: any = {
      id: nextId(),
      empId: `EMP${nextId()}`,
      status: "pending",
    };
    formData.forEach((value, key) => {
      if (typeof value === "string") newEmployee[key] = value;
    });
    mockSessions.push(newEmployee);
    return delay(newEmployee);
  },

  // GET - Fetch Onboarding Data (for the current logged-in employee, or by id)
  async getOnboardingData(employeeId?: string): Promise<OnboardingData> {
    // In mock mode we always return the same in-progress session regardless
    // of which employeeId is requested, so the prototype "just works".
    return delay(store) as Promise<OnboardingData>;
  },

  // PUT - Update todo item completion
  async updateTodoItem(id: string, completed: boolean): Promise<TodoItem> {
    const todo = store.todos.find((t: any) => t.id === id);
    if (todo) {
      todo.is_completed = completed;
    }
    return delay(todo || { id, is_completed: completed });
  },

  // PUT - Update onboarding step directly
  async updateOnboardingStep(step: number): Promise<OnboardingData> {
    store.currentStep = step;
    return delay(store) as Promise<OnboardingData>;
  },

  // PUT - Review onboarding data (multipart/form-data) including profilePic
  async reviewOnboarding(formData: FormData): Promise<OnboardingData> {
    const updated: any = { ...store.employeeData };

    formData.forEach((value, key) => {
      if (key === "profilePic" && value instanceof File) {
        // Create a local preview URL so the avatar updates immediately
        // in the demo, without needing a real upload endpoint.
        updated.profilePic = URL.createObjectURL(value);
      } else if (typeof value === "string") {
        updated[key] = value;
      }
    });

    store.employeeData = updated;
    return delay(store) as Promise<OnboardingData>;
  },

  // PUT - Advance to the next onboarding step
  async incrementOnboardingStep(): Promise<OnboardingData> {
    store.currentStep = Math.min((store.currentStep || 1) + 1, 4);
    return delay(store) as Promise<OnboardingData>;
  },

  // POST - Submit the onboarding application for HR review
  async submitOnboarding(): Promise<{ message?: string }> {
    store.submitted = true;
    store.employeeData.status = "submitted";
    return delay({ message: "Application submitted successfully" });
  },

  // GET - Fetch all onboarding Users (admin list)
  async getAllOnboardingUsers(params?: {
    q?: string;
    status?: string;
  }): Promise<Employee[]> {
    let results = [...mockSessions];

    if (params?.status) {
      results = results.filter((u) => u.status === params.status);
    }
    if (params?.q) {
      const q = params.q.toLowerCase();
      results = results.filter(
        (u) =>
          `${u.firstName ?? ""} ${u.lastName ?? ""}`
            .toLowerCase()
            .includes(q) || (u.email ?? "").toLowerCase().includes(q),
      );
    }

    return delay(results) as Promise<Employee[]>;
  },

  // PUT - Approve an onboarding session (HR action)
  async approveOnboardingSession(
    sessionId: string,
  ): Promise<{ message?: string }> {
    const session = mockSessions.find(
      (s) => s.id === sessionId || s.empId === sessionId,
    );
    if (session) session.status = "active";
    return delay({ message: "Employee onboarded successfully" });
  },
};

export default onboardingService;

import { DocumentTemplate } from "../documents/types";
import { Employee } from "../employees";

// should stay similar
export interface TodoItem {
  id: number;
  template_id: number;
  title: string;
  description?: string;
  order_index: number;
  created_at: string;
  is_completed: boolean;
}

export interface OnboardingDocument {
  id: number;
  name: string;
  fields: any[];
  required: boolean;
  uploaded: boolean;
  created_at: string;
  updated_at: string;
}

export interface OnboardingTemplate {
  id?: string;
  name: string;
  todos: TodoItem[];
  requiredDocuments: string[];
  optionalDocuments: string[];
}

export interface OnboardingData {
  id: number;
  employee_data: EmployeeData;
  todos: TodoItem[];
  required_documents: OnboardingDocument[];
  optional_documents: OnboardingDocument[];
  current_step: number;
}

export interface CreateEmployeeRequest {
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender: string;
  userRole: string;
  designation?: string;
  department?: string;
  jobType?: string;
  hiringDate?: string;
  onboardingTemplate?: string;
  reportTo?: string;
  grade?: string;
  probationPeriod?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  nationality?: string;
  profilePic?: File;
}

export interface EmployeeData {
  id: number;
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: string;
  userRole?: string;
  designation?: string;
  department?: string;
  jobType?: string;
  hiringDate?: string;
  reportTo?: string;
  grade?: string;
  probationPeriod?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  nationality?: string;
  profilePic?: string;
  status: string;
}

export type UpdateEmployeeDataPayload = Partial<Omit<EmployeeData, 'id' | 'email' | 'status'>>;
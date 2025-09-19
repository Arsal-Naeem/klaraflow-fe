import { DocumentTemplate } from "../documents/types";
import { Employee } from "../employees";

// should stay similar
export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

export interface OnboardingDocument extends DocumentTemplate {
  required: boolean;
  uploaded: boolean;
}

export interface OnboardingTemplate {
  id?: string;
  name: string;
  todos: TodoItem[];
  requiredDocuments: string[];
  optionalDocuments: string[];
}

export interface OnboardingData {
  id?: string;
  employeeData: Employee;
  todos: TodoItem[];
  requiredDocuments: OnboardingDocument[];
  optionalDocuments: OnboardingDocument[];
  currentStep: number;
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
import { DocumentTemplate } from "../documents/types";

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

// You can change these as per you need
export interface DocumentUpload {
  type: "passport" | "visa" | "identity_card" | "contract" | "other";
  file: File;
  label: string;
}
export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface OnboardingStatus {
  currentStep: number;
  totalSteps: number;
  status: "pending" | "in_progress" | "completed" | "rejected";
  steps: OnboardingStep[];
}

export interface OnboardingApproval {
  action: "approve" | "request_change";
  comments?: string;
}

export interface OnboardingSubmission {
  documents: DocumentUpload[];
  todoItems: string[]; // IDs of completed todo items
  status: "submitted";
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  message: string;
  errors?: string[];
  status?: number;
}

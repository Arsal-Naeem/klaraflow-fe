// Onboarding related types and interfaces

export interface OnboardingData {
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
  profilePic?: string;
  status: string;
}

export interface DocumentUpload {
  type: 'passport' | 'visa' | 'identity_card' | 'contract' | 'other';
  file: File;
  label: string;
}

export interface OnboardingDocument {
  id: string;
  type: string;
  label: string;
  url?: string;
  required: boolean;
  uploaded: boolean;
  uploadedAt?: string;
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
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
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  steps: OnboardingStep[];
}

export interface OnboardingApproval {
  action: 'approve' | 'request_change';
  comments?: string;
}

export interface OnboardingSubmission {
  documents: DocumentUpload[];
  todoItems: string[]; // IDs of completed todo items
  status: 'submitted';
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

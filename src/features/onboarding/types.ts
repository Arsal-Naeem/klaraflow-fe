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

// Authentication related types and interfaces

export interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  profile_picture_url: string | null;
  department_id: number | null;
  designation_id: number | null;
  company_id: number;
  is_active: boolean;
  phone: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  empId: string | null;
  jobType: string | null;
  grade: string | null;
  hiringDate: string | null;
  probationPeriod: string | null;
  reportTo: number | null;
  created_at: string;
  hashed_password?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
  otp?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  message: string;
  success: boolean;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ActivateAccountRequest {
  token: string;
  password: string;
}

// Auth state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

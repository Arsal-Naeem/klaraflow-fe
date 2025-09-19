// Authentication related types and interfaces

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  department?: string;
  designation?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
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

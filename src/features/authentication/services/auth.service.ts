import api from "@/lib/api";
import {
  LoginRequest,
  LoginResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ActivateAccountRequest,
  User,
} from "../types";
import { ApiResponse } from "@/types/api.types";

// Authentication API endpoints
const AUTH_BASE_URL = "/auth";

export const authService = {
  // POST - Login with email and password
  async loginWithPassword(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      `${AUTH_BASE_URL}/login`,
      credentials
    );
    return response.data.data;
  },

  // POST - Send OTP to email
  async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
    const response = await api.post<ApiResponse<SendOtpResponse>>(
      `${AUTH_BASE_URL}/send-otp`,
      data
    );
    return response.data.data;
  },

  // POST - Verify OTP and login
  async verifyOtp(data: VerifyOtpRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      `${AUTH_BASE_URL}/verify-otp`,
      data
    );
    return response.data.data;
  },

  // POST - Forgot password
  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<{ message: string }> {
    const response = await api.post<ApiResponse<{ message: string }>>(
      `${AUTH_BASE_URL}/forgot-password`,
      data
    );
    return response.data.data;
  },

  // POST - Verify reset pin/code
  async verifyResetPin(data: {
    email: string;
    pin: string;
  }): Promise<{ token: string; message: string }> {
    const response = await api.post<
      ApiResponse<{ token: string; message: string }>
    >(`${AUTH_BASE_URL}/verify-reset-pin`, data);
    return response.data.data;
  },

  // POST - Reset password
  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<{ message: string }> {
    const response = await api.post<ApiResponse<{ message: string }>>(
      `${AUTH_BASE_URL}/reset-password`,
      data
    );
    return response.data.data;
  },

  // POST - Activate account with invitation token
  async activateAccount(data: ActivateAccountRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      `${AUTH_BASE_URL}/activate`,
      data
    );
    return response.data.data;
  },

  // GET - Get current user profile
  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>(
      `${AUTH_BASE_URL}/my-data`
    );
    return response.data.data;
  },

  // POST - Refresh token
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      `${AUTH_BASE_URL}/refresh`,
      { refreshToken }
    );
    return response.data.data;
  },
};

export default authService;

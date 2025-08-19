import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LoginRequest,
  LoginResponse,
  SendOtpRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ActivateAccountRequest,
  User,
} from "../types";
import { authService } from "../services/auth.service";

// Query keys for better cache management
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

// Token management utilities
export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_token", token);
  },

  removeToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  },

  setUser: (user: User): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user_data", JSON.stringify(user));
  },
};

// Hook for login with password
export function useLoginWithPassword() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) =>
      authService.loginWithPassword(credentials),
    onSuccess: (data: LoginResponse) => {
      // Store token and user data
      tokenManager.setToken(data.token);
      tokenManager.setUser(data.user);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), data.user);

      toast.success("Login successful!");

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
}

// Hook for sending OTP
export function useSendOtp() {
  return useMutation({
    mutationFn: (data: SendOtpRequest) => authService.sendOtp(data),
    onSuccess: () => {
      toast.success("OTP sent successfully! Check your email.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to send OTP";
      toast.error(message);
    },
  });
}

// Hook for verifying OTP
export function useVerifyOtp() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authService.verifyOtp(data),
    onSuccess: (data: LoginResponse) => {
      // Store token and user data
      tokenManager.setToken(data.token);
      tokenManager.setUser(data.user);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), data.user);

      toast.success("Login successful!");

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Invalid OTP";
      toast.error(message);
    },
  });
}

// Hook for forgot password
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onSuccess: () => {
      toast.success("Password reset code sent to your email!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to send reset code";
      toast.error(message);
    },
  });
}

// Hook for verifying reset pin
export function useVerifyResetPin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { email: string; pin: string }) =>
      authService.verifyResetPin(data),
    onSuccess: (data) => {
      toast.success("Code verified successfully!");
      router.push(`/reset-password?token=${data.token}`);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Invalid code";
      toast.error(message);
    },
  });
}

// Hook for reset password
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success("Password reset successfully!");
      router.push("/login");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to reset password";
      toast.error(message);
    },
  });
}

// Hook for activate account
export function useActivateAccount() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ActivateAccountRequest) =>
      authService.activateAccount(data),
    onSuccess: (data: LoginResponse) => {
      // Store token and user data
      tokenManager.setToken(data.token);
      tokenManager.setUser(data.user);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), data.user);

      toast.success("Account activated successfully! Welcome to KlaraFlow!");

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to activate account";
      toast.error(message);
    },
  });
}

// Hook for logout
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear local storage
      tokenManager.removeToken();

      // Clear query cache
      queryClient.clear();

      toast.success("Logged out successfully!");

      // Redirect to login
      router.push("/login");
    },
    onError: (error: any) => {
      // Even if API call fails, clear local data
      tokenManager.removeToken();
      queryClient.clear();
      router.push("/login");

      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
    },
  });
}

// Hook for getting user profile
export function useProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authService.getProfile,
    enabled: !!tokenManager.getToken(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

// Hook for checking authentication status
export function useAuth() {
  const token = tokenManager.getToken();
  const user = tokenManager.getUser();

  return {
    isAuthenticated: !!token && !!user,
    user,
    token,
  };
}

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
import { clientAuth } from "@/features/authentication/lib/auth";
import { useUserStore } from "@/stores/user-store";

// Query keys for better cache management
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

// Hook for login with password
export function useLoginWithPassword() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (credentials: LoginRequest) =>
      authService.loginWithPassword(credentials),
    onSuccess: (data: LoginResponse) => {
      // Store token and user data in cookies
      clientAuth.setToken(data.token);
      clientAuth.setUser(data.user);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Update Zustand store
      setUser(data.user);

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
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authService.verifyOtp(data),
    onSuccess: (data: LoginResponse) => {
      // Store token and user data in cookies
      clientAuth.setToken(data.token);
      clientAuth.setUser(data.user);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Update Zustand store
      setUser(data.user);

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
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (data: ActivateAccountRequest) =>
      authService.activateAccount(data),
    onSuccess: (data: any) => {
      // Store token and user data in cookies
      console.log("Activation successful, storing token and user data.");

      clientAuth.setToken(data?.access_token);
      clientAuth.setUser(data?.user);

      // Update query cache
      queryClient.setQueryData(authKeys.profile(), data?.user);

      // Update Zustand store
      setUser(data?.user);

      toast.success("Account activated successfully! Welcome to KlaraFlow!");

      // Redirect to onboarding
      router.push("/onboarding");
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
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      clientAuth.removeToken();
      clearUser();
      queryClient.clear();
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Logout failed");
      router.push("/login");
    },
  });
}

// Hook for getting user profile
export function useProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authService.getProfile,
    enabled: !!clientAuth.getToken(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

// Hook for checking authentication status
export function useAuth() {
  const token = clientAuth.getToken();
  const { user } = useUserStore();

  return {
    isAuthenticated: !!token && !!user,
    user,
    token,
  };
}

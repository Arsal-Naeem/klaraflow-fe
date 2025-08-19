// Authentication feature exports
export * from "./types";
export * from "./hooks/useAuth";
export * from "./services/auth.service";

// Default exports for convenience
export { default as authService } from "./services/auth.service";

// Export specific hooks for convenience
export {
  useLoginWithPassword,
  useSendOtp,
  useVerifyOtp,
  useForgotPassword,
  useVerifyResetPin,
  useResetPassword,
  useActivateAccount,
  useLogout,
  useProfile,
  useAuth,
} from "./hooks/useAuth";

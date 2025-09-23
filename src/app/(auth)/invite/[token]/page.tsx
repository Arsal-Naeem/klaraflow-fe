"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { useTranslations } from "next-intl";
import { authService } from "@/features/authentication/services/auth.service";
import { tokenManager } from "@/features/authentication/hooks/useAuth";
import { onboardingService } from "@/features/onboarding/services/onboarding.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout/AuthenticationLayout";

// Form schema
const activateAccountSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ActivateAccountData = z.infer<typeof activateAccountSchema>;

export default function ActivatePage() {
  const { token } = useParams();
  const router = useRouter();
  const t = useTranslations("activateAccount");

  // Redirect if no token
  React.useEffect(() => {
    if (!token || typeof token !== "string") {
      router.push("/login");
    }
  }, [token, router]);

  // Mutations

  // Form
  const form = useForm<ActivateAccountData>({
    resolver: zodResolver(activateAccountSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [submitting, setSubmitting] = React.useState(false);

  // Handler
  const handleSubmit = async (data: ActivateAccountData) => {
    if (!token || typeof token !== "string") return;

    setSubmitting(true);
    try {
      const response = await authService.activateAccount({
        token,
        password: data.password,
      });

      // store token and user similar to useActivateAccount
      tokenManager.setToken(response.token);
      tokenManager.setUser(response.user);

      // Attempt to fetch onboarding data for this user
      try {
        const onboardingData = await onboardingService.getOnboardingData();
        // If onboarding session exists and is in progress (currentStep < 4 or status), redirect to onboarding
        if (onboardingData && onboardingData.currentStep && onboardingData.currentStep > 0) {
          router.push("/onboarding");
          return;
        }
      } catch (err) {
        // ignore and fallthrough
      }

      // Fallback to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to activate account";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Don't render if no token
  if (!token || typeof token !== "string") {
    return null;
  }

  return (
    <AuthenticationLayout
      title={"KlaraFlow"}
      headerExtras={
        <div className="text-md text-muted-foreground mb-4">
          {t("headerExtras", { default: "Please enter your new password." })}
        </div>
      }
    >
      <div className="px-6 pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <TextField
              control={form.control}
              name="password"
              type="password"
              label={t("password")}
              placeholder={t("password")}
              required
              disabled={submitting}
            />
            <TextField
              control={form.control}
              name="confirmPassword"
              type="password"
              label={t("confirmPassword")}
              placeholder={t("confirmPassword")}
              required
              disabled={submitting}
            />
            <Button
              type="submit"
              variant={"accent"}
              className="mt-2 w-full"
              isLoading={submitting}
              loadingText={t("activating")}
            >
              {t("activateButton")}
            </Button>
          </form>
        </Form>
      </div>
    </AuthenticationLayout>
  );
}

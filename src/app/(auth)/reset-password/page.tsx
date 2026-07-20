export const dynamic = "force-dynamic";
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { useTranslations } from "next-intl";
import { useResetPassword } from "@/features/authentication";
import { Loader2 } from "lucide-react";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout/AuthenticationLayout";

// Form schema
const resetPasswordSchema = z
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

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const t = useTranslations("authentication.resetPassword");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Redirect if no token
  React.useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }
  }, [token, router]);

  // Mutations
  const resetPassword = useResetPassword();

  // Form
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handler
  const handleSubmit = async (data: ResetPasswordData) => {
    if (!token) return;

    resetPassword.mutate({
      token,
      password: data.password,
    });
  };

  return (
    <AuthenticationLayout
      title={t("title", { default: "Reset Password" })}
      headerExtras={
        <div className="text-md text-muted-foreground mb-4">
          {t("subtitle", { default: "Enter your new password below." })}
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
              label="New Password"
              placeholder={t("newPassword", { default: "New Password" })}
              required
              disabled={resetPassword.isPending}
            />
            <TextField
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder={t("confirmPassword", {
                default: "Confirm Password",
              })}
              required
              disabled={resetPassword.isPending}
            />
            <Button
              type="submit"
              variant={"accent"}
              className="mt-2 w-full"
              isLoading={resetPassword.isPending}
              loadingText={t("resetting", { default: "Resetting..." })}
            >
              {t("resetButton", { default: "Reset Password" })}
            </Button>
          </form>
        </Form>
      </div>
    </AuthenticationLayout>
  );
}

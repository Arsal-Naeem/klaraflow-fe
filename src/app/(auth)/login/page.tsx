"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { useTranslations } from "next-intl";
import {
  useLoginWithPassword,
} from "@/features/authentication";
import { Loader2 } from "lucide-react";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout/AuthenticationLayout";
import { MOCK_LOGIN_CREDENTIALS } from "@/data/mock-users";

// Form schema - simplified for prototype
const loginWithPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginWithPasswordData = z.infer<typeof loginWithPasswordSchema>;

export default function LoginPage() {
  const t = useTranslations("authentication.login");

  // Mutations
  const loginWithPassword = useLoginWithPassword();

  // Forms
  const passwordForm = useForm<LoginWithPasswordData>({
    resolver: zodResolver(loginWithPasswordSchema),
    defaultValues: {
      email: MOCK_LOGIN_CREDENTIALS.email,
      password: MOCK_LOGIN_CREDENTIALS.password,
    },
  });

  // Handlers
  const handlePasswordLogin = async (data: LoginWithPasswordData) => {
    loginWithPassword.mutate(data);
  };

  // Auto-fill demo credentials
  const fillDemoCredentials = () => {
    passwordForm.setValue("email", MOCK_LOGIN_CREDENTIALS.email);
    passwordForm.setValue("password", MOCK_LOGIN_CREDENTIALS.password);
  };

  return (
    <AuthenticationLayout
      title="KlaraFlow"
      subtitle={t("title")}
      footer={null}
    >
      <div className="px-6 pb-4">
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordLogin)}
            className="flex flex-col gap-4"
          >
            <TextField
              control={passwordForm.control}
              name="email"
              type="email"
              label="Email"
              placeholder={t("email")}
              required
              disabled={loginWithPassword.isPending}
            />
            <TextField
              control={passwordForm.control}
              name="password"
              type="password"
              label="Password"
              placeholder={t("password")}
              required
              disabled={loginWithPassword.isPending}
            />
            <Button
              type="submit"
              variant={"accent"}
              className="mt-2 w-full"
              disabled={loginWithPassword.isPending}
            >
              {loginWithPassword.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("loggingIn")}
                </>
              ) : (
                t("loginButton")
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-3 text-sm text-muted-foreground">
          <p>
            💡 Demo: Email and password are pre-filled
            {" "}
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-primary underline hover:no-underline"
              disabled={loginWithPassword.isPending}
            >
              (click to fill)
            </button>
          </p>
        </div>
      </div>
    </AuthenticationLayout>
  );
}

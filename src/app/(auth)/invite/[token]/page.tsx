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
import { useActivateAccount } from "@/features/authentication";
import { Loader2 } from "lucide-react";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout/AuthenticationLayout";

// Form schema
const activateAccountSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
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
    if (!token || typeof token !== 'string') {
      router.push("/login");
    }
  }, [token, router]);

  // Mutations
  const activateAccount = useActivateAccount();

  // Form
  const form = useForm<ActivateAccountData>({
    resolver: zodResolver(activateAccountSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handler
  const handleSubmit = async (data: ActivateAccountData) => {
    if (!token || typeof token !== 'string') return;
    
    activateAccount.mutate({
      token,
      password: data.password,
    });
  };

  // Don't render if no token
  if (!token || typeof token !== 'string') {
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
              disabled={activateAccount.isPending}
            />
            <TextField
              control={form.control}
              name="confirmPassword"
              type="password"
              label={t("confirmPassword")}
              placeholder={t("confirmPassword")}
              required
              disabled={activateAccount.isPending}
            />
            <Button
              type="submit"
              variant={"accent"}
              className="mt-2 w-full"
              disabled={activateAccount.isPending}
            >
              {activateAccount.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("activating")}
                </>
              ) : (
                t("activateButton")
              )}
            </Button>
          </form>
        </Form>
      </div>
    </AuthenticationLayout>
  );
}

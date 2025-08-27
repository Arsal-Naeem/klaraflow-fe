"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { useTranslations } from "next-intl";
import {
  useForgotPassword,
  useVerifyResetPin,
} from "@/features/authentication";
import { Loader2 } from "lucide-react";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout/AuthenticationLayout";

// Form schemas
const forgotPasswordEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const verifyPinSchema = z.object({
  pin: z.string().min(6, "Pin must be 6 digits").max(6, "Pin must be 6 digits"),
});

type ForgotPasswordEmailData = z.infer<typeof forgotPasswordEmailSchema>;
type VerifyPinData = z.infer<typeof verifyPinSchema>;

export default function ForgetPasswordPage() {
  const t = useTranslations("forgotPassword");
  const tCommon = useTranslations("common");
  const [step, setStep] = React.useState<"email" | "pin">("email");
  const [userEmail, setUserEmail] = React.useState("");
  const router = useRouter();

  // Mutations
  const forgotPassword = useForgotPassword();
  const verifyResetPin = useVerifyResetPin();

  // Forms
  const emailForm = useForm<ForgotPasswordEmailData>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const pinForm = useForm<VerifyPinData>({
    resolver: zodResolver(verifyPinSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Handlers
  const handleEmailSubmit = async (data: ForgotPasswordEmailData) => {
    forgotPassword.mutate(data, {
      onSuccess: () => {
        setUserEmail(data.email);
        setStep("pin");
      },
    });
  };

  const handlePinSubmit = async (data: VerifyPinData) => {
    verifyResetPin.mutate({
      email: userEmail,
      pin: data.pin,
    });
  };

  return (
    <AuthenticationLayout
      title={t("title", { default: "Forgot Password" })}
      headerExtras={
        <div className="text-md text-muted-foreground mb-4">
          {step === "email"
            ? t("subtitleEmail", {
                default: "Enter your email to receive a reset code.",
              })
            : t("subtitlePin", {
                default: "Enter the 6-digit code sent to your email.",
              })}
        </div>
      }
    >
      <div className="px-6 pb-4">
        {step === "email" ? (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="flex flex-col gap-4"
            >
              <TextField
                control={emailForm.control}
                name="email"
                type="email"
                label="Email"
                placeholder={tCommon("email")}
                required
                disabled={forgotPassword.isPending}
              />
              <Button
                type="submit"
                variant={"accent"}
                className="mt-2 w-full"
                disabled={forgotPassword.isPending}
              >
                {forgotPassword.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {tCommon("loading")}
                  </>
                ) : (
                  t("sendCodeButton", { default: "Send Code" })
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...pinForm}>
            <form
              onSubmit={pinForm.handleSubmit(handlePinSubmit)}
              className="flex flex-col gap-4"
            >
              <TextField
                control={pinForm.control}
                name="pin"
                type="text"
                label=""
                placeholder={t("pinPlaceholder", { default: "6-digit code" })}
                required
                disabled={verifyResetPin.isPending}
                className="text-center tracking-widest"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("email")}
                  disabled={verifyResetPin.isPending}
                >
                  {tCommon("back")}
                </Button>
                <Button
                  type="submit"
                  variant={"accent"}
                  className="flex-1"
                  disabled={verifyResetPin.isPending}
                >
                  {verifyResetPin.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("verifying", { default: "Verifying..." })}
                    </>
                  ) : (
                    t("verifyButton", { default: "Verify Code" })
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </AuthenticationLayout>
  );
}

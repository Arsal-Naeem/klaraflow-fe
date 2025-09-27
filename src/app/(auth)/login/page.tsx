"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { useTranslations } from "next-intl";
import {
  useLoginWithPassword,
  useSendOtp,
  useVerifyOtp,
} from "@/features/authentication";
import { Loader2 } from "lucide-react";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout/AuthenticationLayout";

const TABS = [
  { key: "email", label: "loginViaPassword" },
  { key: "otp", label: "loginViaOTP" },
];

// Form schemas
const loginWithPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const sendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(4, "OTP must be at least 4 characters"),
});

type LoginWithPasswordData = z.infer<typeof loginWithPasswordSchema>;
type SendOtpData = z.infer<typeof sendOtpSchema>;
type VerifyOtpData = z.infer<typeof verifyOtpSchema>;

export default function LoginPage() {
  const t = useTranslations("authentication.login");
  const [tab, setTab] = React.useState("email");
  const [otpSent, setOtpSent] = React.useState(false);

  // Mutations
  const loginWithPassword = useLoginWithPassword();
  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();

  // Forms
  const passwordForm = useForm<LoginWithPasswordData>({
    resolver: zodResolver(loginWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpSendForm = useForm<SendOtpData>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpVerifyForm = useForm<VerifyOtpData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  // Handlers
  const handlePasswordLogin = async (data: LoginWithPasswordData) => {
    loginWithPassword.mutate(data);
  };

  const handleSendOtp = async (data: SendOtpData) => {
    sendOtp.mutate(data, {
      onSuccess: () => {
        setOtpSent(true);
        otpVerifyForm.setValue("email", data.email);
      },
    });
  };

  const handleVerifyOtp = async (data: VerifyOtpData) => {
    verifyOtp.mutate(data);
  };

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    setOtpSent(false);
    // Reset forms when switching tabs
    passwordForm.reset();
    otpSendForm.reset();
    otpVerifyForm.reset();
  };

  return (
    <AuthenticationLayout
      title="KlaraFlow"
      subtitle={t("title")}
      headerExtras={
        <div className="flex justify-center gap-2 mb-2 flex-col md:flex-row xs:gap-2 sm:gap-2 w-full">
          {TABS.map((currentTab) => (
            <Button
              key={currentTab.key}
              variant={tab === currentTab.key ? "default" : "outline"}
              size="sm"
              className="rounded-full px-4 w-full xs:w-full sm:w-auto"
              onClick={() => handleTabChange(currentTab.key)}
              disabled={
                loginWithPassword.isPending ||
                sendOtp.isPending ||
                verifyOtp.isPending
              }
            >
              {t(currentTab.label)}
            </Button>
          ))}
        </div>
      }
      footer={null}
    >
      <div className="px-6 pb-4">
        {tab === "email" ? (
          <>
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
            <div className="text-right mt-3">
              <Link
                href="/forgot-password"
                className="text-sm text-primary/50 underline hover:text-primary transition-colors"
              >
                {t("forgotPassword")}
              </Link>
            </div>
          </>
        ) : !otpSent ? (
          <Form {...otpSendForm}>
            <form
              onSubmit={otpSendForm.handleSubmit(handleSendOtp)}
              className="flex flex-col gap-4"
            >
              <TextField
                control={otpSendForm.control}
                name="email"
                type="email"
                label="Email"
                placeholder={t("email")}
                required
                disabled={sendOtp.isPending}
              />
              <Button
                type="submit"
                variant={"accent"}
                className="mt-2 w-full"
                disabled={sendOtp.isPending}
              >
                {sendOtp.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("sendingOtp")}
                  </>
                ) : (
                  t("sendOtp")
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...otpVerifyForm}>
            <form
              onSubmit={otpVerifyForm.handleSubmit(handleVerifyOtp)}
              className="flex flex-col gap-4"
            >
              <TextField
                control={otpVerifyForm.control}
                name="email"
                type="email"
                label="Email"
                placeholder={t("email")}
                required
                disabled
              />
              <TextField
                control={otpVerifyForm.control}
                name="otp"
                type="text"
                label="OTP"
                placeholder={t("enterOtp")}
                required
                disabled={verifyOtp.isPending}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOtpSent(false)}
                  disabled={verifyOtp.isPending}
                >
                  {t("back")}
                </Button>
                <Button
                  type="submit"
                  variant={"accent"}
                  className="flex-1"
                  disabled={verifyOtp.isPending}
                >
                  {verifyOtp.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("verifying")}
                    </>
                  ) : (
                    t("verifyOtp")
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

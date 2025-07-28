
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/blocks/Sidebar/components/language-toggle";

function sendResetEmail(email: string) {
  // Dummy async function to simulate sending email
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

function verifyPin(pin: string) {
  // Dummy async function to simulate verifying pin
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export default function ForgetPasswordPage() {
  const t = useTranslations("forgotPassword");
  const tCommon = useTranslations("common");
  const [step, setStep] = React.useState<"email" | "pin">("email");
  const [email, setEmail] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendResetEmail(email);
      setStep("pin");
    } catch {
      setError(t("sendEmailFailed", { default: "Failed to send reset email. Try again." }));
    } finally {
      setLoading(false);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!/^\d{6}$/.test(pin)) {
      setError(t("invalidPin", { default: "Please enter a valid 6-digit pin." }));
      setLoading(false);
      return;
    }
    try {
      await verifyPin(pin);
      router.push("/reset-password");
    } catch {
      setError(t("pinFailed", { default: "Invalid pin. Try again." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1636955735635-b4c0fd54f360?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}>
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 w-md max-w-[90vw]">
        <Card className="shadow-2xl backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold mb-2">{t("title", { default: "Forgot Password" })}</CardTitle>
            <div className="text-md text-muted-foreground mb-4">
              {step === "email"
                ? t("subtitleEmail", { default: "Enter your email to receive a reset code." })
                : t("subtitlePin", { default: "Enter the 6-digit code sent to your email." })}
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
                <Input
                  type="email"
                  placeholder={tCommon("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  disabled={loading}
                />
                <Button type="submit" className="mt-2 w-full bg-accent hover:bg-accent text-primary" disabled={loading}>
                  {loading ? tCommon("loading") : t("sendCodeButton", { default: "Send Code" })}
                </Button>
              </form>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handlePinSubmit}>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  placeholder={t("pinPlaceholder", { default: "6-digit code" })}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  required
                  autoFocus
                  disabled={loading}
                />
                <Button type="submit" className="mt-2 w-full bg-accent hover:bg-accent text-primary" disabled={loading}>
                  {loading ? t("verifying", { default: "Verifying..." }) : t("verifyButton", { default: "Verify Code" })}
                </Button>
              </form>
            )}
            {error && <div className="text-destructive text-sm mt-2 text-center">{error}</div>}
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </div>
  );
}


"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/blocks/Sidebar/components/language-toggle";

export default function ResetPasswordPage() {
  const t = useTranslations("resetPassword");
  const tCommon = useTranslations("common");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError(tCommon("forms.validation.minLength", { min: 6 }));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("passwordsDoNotMatch", { default: "Passwords do not match." }));
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => router.push("/"), 1500);
    } catch {
      setError(t("resetFailed", { default: "Failed to reset password. Try again." }));
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
            <CardTitle className="text-2xl font-bold mb-2">{t("title", { default: "Reset Password" })}</CardTitle>
            <div className="text-md text-muted-foreground mb-4">
              {t("subtitle", { default: "Enter your new password below." })}
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                type="password"
                placeholder={t("newPassword", { default: "New Password" })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoFocus
                disabled={loading || success}
              />
              <Input
                type="password"
                placeholder={t("confirmPassword", { default: "Confirm Password" })}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading || success}
              />
              <Button type="submit" className="mt-2 w-full bg-accent hover:bg-accent text-primary" disabled={loading || success}>
                {loading
                  ? tCommon("loading")
                  : success
                  ? t("resetSuccessButton", { default: "Password Reset!" })
                  : t("resetButton", { default: "Reset Password" })}
              </Button>
            </form>
            {error && <div className="text-destructive text-sm mt-2 text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm mt-2 text-center">{t("resetSuccessMessage", { default: "Password reset successful! Redirecting..." })}</div>}
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </div>
  );
}

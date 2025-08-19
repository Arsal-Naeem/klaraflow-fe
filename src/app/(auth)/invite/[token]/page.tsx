"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/blocks/Form/Fields/TextField";
import { useTranslations } from "next-intl";
import { useActivateAccount } from "@/features/authentication";
import { Loader2 } from "lucide-react";

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
  const tCommon = useTranslations("common");

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
      confirmPassword: data.confirmPassword,
    });
  };

  // Don't render if no token
  if (!token || typeof token !== 'string') {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1636955735635-b4c0fd54f360?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}>
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 w-md max-w-[90vw]">
        <Card className="shadow-2xl backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">KlaraFlow</CardTitle>
            <div className="text-xl font-semibold mb-2">{t("title")}</div>
            <div className="text-md text-muted-foreground mb-4">
              {t("subtitle")}
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
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
                  className="mt-2 w-full bg-accent hover:bg-accent text-primary" 
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
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </div>
  );
}

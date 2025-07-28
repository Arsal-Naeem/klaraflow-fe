"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const TABS = [
  { key: "email", label: "loginViaPassword" },
  { key: "otp", label: "loginViaOTP" },
];

export default function LoginPage() {
  const t = useTranslations("login");
  const [tab, setTab] = React.useState("email");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1636955735635-b4c0fd54f360?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 w-md max-w-[90vw]">
        <Card className="shadow-2xl backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">KlaraFlow</CardTitle>
            <div className="text-xl text-muted-foreground mb-4">
              {t("title")}
            </div>
            <div className="flex justify-center gap-2 mb-2 flex-col md:flex-row xs:gap-2 sm:gap-2 w-full">
              {TABS.map((currentTab) => (
                <Button
                  key={currentTab.key}
                  variant={tab === currentTab.key ? "accent" : "outline"}
                  size="sm"
                  className="rounded-full px-4 w-full xs:w-full sm:w-auto"
                  onClick={() => setTab(currentTab.key)}
                >
                  {t(currentTab.label)}
                </Button>
              ))}
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            {tab === "email" ? (
              <form className="flex flex-col gap-4">
                <Input
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <Input
                  type="password"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="mt-2 w-full bg-accent hover:bg-accent text-primary"
                >
                  {t("loginButton")}
                </Button>
              </form>
            ) : (
              <form className="flex flex-col gap-4">
                <Input
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <Button
                  type="submit"
                  className="mt-2 w-full bg-accent hover:bg-accent text-primar"
                >
                  {t("loginButton")}
                </Button>
              </form>
            )}
            <div className="text-right mt-3">
              <Link
                href="/forgot-password"
                className="text-sm text-primary/50 underline hover:text-primary transition-colors"
              >
                {t("forgotPassword")}
              </Link>
            </div>
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </div>
  );
}

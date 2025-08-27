"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type AuthenticationLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerExtras?: React.ReactNode;
};

export function AuthenticationLayout({
  title,
  subtitle,
  children,
  footer,
  headerExtras,
}: AuthenticationLayoutProps) {
  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://assets.accounts.toggl.com/assets/background-dark-Bh5vyRPM.svg)",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 w-[350px] max-w-[90vw]">
        <Card className="shadow-2xl backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">{title}</CardTitle>
            {subtitle && (
              <div className="text-xl text-muted-foreground mb-4">
                {subtitle}
              </div>
            )}
            {headerExtras}
            <Separator />
          </CardHeader>

          {/* Page-specific content goes here */}
          {children}

          {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/stores/theme-store";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const { isHydrated } = useTheme();

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300); // Short delay for smooth transition

      return () => clearTimeout(timer);
    }
  }, [isHydrated]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300">
      <div>
        <h1 className="text-5xl tracking-wide text-foreground">
          KlaraFlow
        </h1>
      </div>
    </div>
  );
}

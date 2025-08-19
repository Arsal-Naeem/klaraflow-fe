"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { useState } from "react";
import { StoreHydration } from "@/lib/store-hydration";
import { InitialLoader } from "@/components/ui/fullpage-loader";
import { AppSidebar } from "@/components/blocks/Sidebar/app-sidebar";
import { usePathname } from "next/navigation";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
          },
        },
      })
  );
  const pathname = usePathname();
  const hideSidebar =
    [
      "/login",
      "/forgot-password",
      "/reset-password",
      "/signup",
      "/register",
      "/onboarding"
    ].includes(pathname) || pathname.startsWith("/invite/");

  return (
    <QueryClientProvider client={queryClient}>
      <StoreHydration />
      <InitialLoader />
      {!hideSidebar && <AppSidebar />}
      {children}
      <Toaster
        position="bottom-center"
        // theme={theme}
        richColors
        // closeButton
        // duration={4000}
      />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

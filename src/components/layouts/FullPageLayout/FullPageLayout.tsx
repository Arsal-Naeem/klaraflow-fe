"use client";

import { ReactNode } from "react";
import { AppSidebar } from "@/components/blocks/Sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useI18n } from "@/hooks/use-i18n";

interface BreadcrumbItem {
  name: string;
  route?: string;
  translationKey?: string;
}

interface FullPageLayoutProps {
  children: ReactNode;
  breadcrumbItems: BreadcrumbItem[];
}

export default function FullPageLayout({
  children,
  breadcrumbItems,
}: FullPageLayoutProps) {
  const { t, tBreadcrumbs } = useI18n();

  // Helper function to get translated breadcrumb text
  const getBreadcrumbText = (item: BreadcrumbItem): string => {
    // If translationKey is provided, use it
    if (item.translationKey) {
      return t(item.translationKey);
    }

    // Try to get translation from breadcrumbs section
    const normalizedName = item.name
      .replace(/[^a-zA-Z0-9]+/g, " ") // Replace non-alphanumerics with space
      .split(" ")
      .filter(Boolean)
      .map((word, index) => {
        if (index === 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
    try {
      return tBreadcrumbs(normalizedName);
    } catch {
      return item.name;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => {
                  const isLast = index === breadcrumbItems.length - 1;
                  return (
                    <>
                      {index > 0 && (
                        <BreadcrumbSeparator
                          key={`separator-${index}`}
                          className="hidden md:block"
                        />
                      )}
                      <BreadcrumbItem
                        key={index}
                        className={isLast ? "" : "hidden md:block"}
                      >
                        {item.route ? (
                          <BreadcrumbLink href={item.route}>
                            {getBreadcrumbText(item)}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>
                            {getBreadcrumbText(item)}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 pt-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

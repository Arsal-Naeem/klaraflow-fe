"use client";

import { ReactNode, Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useI18n } from "@/hooks/use-i18n";
import { normalizeTranslationKey } from "@/utils/helpers";

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
    if (item.translationKey) {
      return t(item.translationKey);
    }

    const normalizedName = normalizeTranslationKey(item.name);
    try {
      return tBreadcrumbs(normalizedName);
    } catch {
      return item.name;
    }
  };

  return (
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
                  <Fragment key={`breadcrumb-${index}`}>
                    {index > 0 && (
                      <BreadcrumbSeparator
                        className="hidden md:block"
                      />
                    )}
                    <BreadcrumbItem
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
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-8">
          {children}
        </div>
      </div>
    </SidebarInset>
  );
}

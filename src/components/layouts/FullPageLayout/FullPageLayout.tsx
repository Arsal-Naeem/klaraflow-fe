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

interface BreadcrumbItem {
  name: string;
  route?: string;
}

interface FullPageLayoutProps {
  children: ReactNode;
  breadcrumbItems: BreadcrumbItem[];
}

export default function FullPageLayout({
  children,
  breadcrumbItems,
}: FullPageLayoutProps) {
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
                            {item.name}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.name}</BreadcrumbPage>
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

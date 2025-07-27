"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { normalizeTranslationKey } from "@/utils/helpers";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const t = useTranslations("navigation");
  const { locale } = useLanguageNavigation();
  const { state, setOpen } = useSidebar();
  const isArabic = locale === "ar";
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    // Initialize with items that should be open by default
    const initialState: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.isActive) {
        initialState[item.title] = true;
      }
    });
    return initialState;
  });

  const toggleItem = (title: string) => {
    if (state === "collapsed") {
      setOpen(true);
      setOpenItems((prev) => ({
        ...prev,
        [title]: true,
      }));
      return;
    }

    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Helper function to get translated title
  const getTranslatedTitle = (title: string) => {
    const key = normalizeTranslationKey(title);
    return t(key, { fallback: title });
  };

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items && item.items.length > 0 ? (
              <Collapsible
                open={openItems[item.title] || false}
                onOpenChange={() => toggleItem(item.title)}
                className="group/collapsible"
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={getTranslatedTitle(item.title)}
                    className="cursor-pointer"
                  >
                    {item.icon && <item.icon />}
                    <span>{getTranslatedTitle(item.title)}</span>
                    {openItems[item.title] ? (
                      <ChevronDown
                        className={`transition-transform duration-200 ${
                          isArabic ? "mr-auto" : "ml-auto"
                        }`}
                      />
                    ) : isArabic ? (
                      <ChevronLeft className="mr-auto transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="ml-auto transition-transform duration-200" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub
                    className={isArabic ? "border-r" : "border-l"}
                  >
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{getTranslatedTitle(subItem.title)}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                tooltip={getTranslatedTitle(item.title)}
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{getTranslatedTitle(item.title)}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

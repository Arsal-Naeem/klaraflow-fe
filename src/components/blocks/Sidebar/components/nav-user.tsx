"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { isRTL } = useLanguageNavigation();
  const t = useTranslations();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground `}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">AN</AvatarFallback>
              </Avatar>
              <div className={`grid flex-1 text-sm leading-tight`}>
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className={`size-4 ${isRTL ? 'mr-auto' : 'ml-auto'}`} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : (isRTL ? "left" : "right")}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className={`flex items-center gap-2 px-1 py-1.5 text-sm ${isRTL ? 'flex-row-reverse text-left' : 'text-left'}`}>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">AN</AvatarFallback>
                </Avatar>
                <div className={`grid flex-1 text-sm leading-tight `}>
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className={`cursor-pointer ${isRTL ? 'flex-row-reverse' : 'text-left'}`}>
                <BadgeCheck className={isRTL ? 'ml-2' : 'mr-2'} />
                {t('user.profile')}
              </DropdownMenuItem>
              <LanguageToggle />
              <ThemeToggle />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={`cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
              <LogOut className={isRTL ? 'ml-2' : 'mr-2'} />
              {t('user.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

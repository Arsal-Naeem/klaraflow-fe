"use client";

import {
  AudioWaveform,
  BookOpen,
  Calculator,
  Clock,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Search,
  Settings2,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/blocks/Sidebar/components/nav-main";
import { NavUser } from "@/components/blocks/Sidebar/components/nav-user";
import { TeamSwitcher } from "@/components/blocks/Sidebar/components/team-switcher";
import { NavFooter } from "@/components/blocks/Sidebar/components/nav-footer";
import { useLanguage } from "@/contexts/language-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Arsal Naeem",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "KlaraFlow",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Time",
      url: "#",
      icon: Clock,
      items: [
        {
          title: "Timesheet",
          url: "#",
        },
        {
          title: "Leave Request",
          url: "#",
        },
      ],
    },
    {
      title: "Payroll",
      url: "#",
      icon: Calculator,
    },
    {
      title: "Company",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Employees",
          url: "#",
        },
        {
          title: "Departments/Teams",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: BookOpen,
    },
  ],
  footer: [
    {
      name: "Organization Settings",
      url: "#",
      icon: Settings2,
    },
    {
      name: "Ask Klara",
      url: "#",
      icon: Search,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { language } = useLanguage();
  const sidebarSide = language === 'ar' ? 'right' : 'left';

  return (
    <Sidebar collapsible="icon" side={sidebarSide} {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

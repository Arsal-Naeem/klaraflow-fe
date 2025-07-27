"use client";

import {
  AudioWaveform,
  BookOpen,
  Calculator,
  Clock,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/blocks/Sidebar/components/nav-main";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/blocks/Sidebar/components/nav-user";
import { TeamSwitcher } from "@/components/blocks/Sidebar/components/team-switcher";
import { NavFooter } from "@/components/blocks/Sidebar/components/nav-footer";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
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
      url: "/dashboard",
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
          url: "/time/timesheets",
        },
        {
          title: "Leave Request",
          url: "/time/leave-requests",
        },
      ],
    },
    {
      title: "Payroll",
      url: "/payroll",
      icon: Calculator,
    },
    {
      title: "Company",
      url: "/company",
      icon: Users,
      items: [
        {
          title: "Employees",
          url: "/company/employees",
        },
        {
          title: "Departments/Teams",
          url: "/company/departments",
        },
      ],
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { isRTL } = useLanguageNavigation();
  const sidebarSide = isRTL ? "right" : "left";

  return (
    <Sidebar collapsible="icon" side={sidebarSide} {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} activeUrl={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

"use client"

import {
  Settings,
  Search,
} from "lucide-react"
import Link from "next/link"
import { useTranslations } from 'next-intl';

import { useState } from "react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AskKlaraModal } from "@/components/blocks/Sidebar/components/ask-klara-modal"

export function NavFooter() {
  const t = useTranslations('sidebar');
  const [isAskKlaraOpen, setIsAskKlaraOpen] = useState(false)

  const handleAskKlara = () => {
    setIsAskKlaraOpen(true)
  }

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>{t('settings')}</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/organization-settings">
                <Settings />
                <span>{t('organizationSettings')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div 
              className="relative rounded-md p-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, #FF2394, #280595, #FF2394, #280595)",
                backgroundSize: "200% 200%",
                animation: "gradient-flow 3s ease-in-out infinite",
              }}
            >
              <SidebarMenuButton onClick={handleAskKlara} className="cursor-pointer bg-background rounded-md">
                <Search />
                <span>{t('askKlara')}</span>
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <AskKlaraModal 
        open={isAskKlaraOpen} 
        onOpenChange={setIsAskKlaraOpen} 
      />
      <style jsx global>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  )
}
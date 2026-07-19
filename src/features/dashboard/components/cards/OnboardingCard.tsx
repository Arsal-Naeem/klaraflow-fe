"use client";

import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const hires = [
  {
    name: "Ali Raza",
    role: "Frontend Developer",
    progress: 75,
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    name: "Nimra Sheikh",
    role: "Product Designer",
    progress: 40,
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "Danish Khan",
    role: "QA Engineer",
    progress: 90,
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

export function OnboardingCard({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="md:col-span-2">
      <BentoCardHeader
        icon={UserPlus}
        title="Onboarding Progress"
        subtitle={`${hires.length} new hires in progress`}
      />

      <div className="space-y-4">
        {hires.map((hire, i) => (
          <div key={hire.name} className="flex items-center gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={hire.avatar} alt={hire.name} />
              <AvatarFallback className="text-[10px]">
                {hire.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="truncate text-xs font-medium">{hire.name}</p>
                <span className="shrink-0 text-[11px] font-medium tabular-nums text-muted-foreground">
                  {hire.progress}%
                </span>
              </div>
              <p className="mb-1.5 truncate text-[11px] text-muted-foreground">
                {hire.role}
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${hire.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

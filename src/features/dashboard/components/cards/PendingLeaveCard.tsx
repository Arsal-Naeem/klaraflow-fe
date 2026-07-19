"use client";

import { CalendarCheck, Check, X } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const requests = [
  {
    name: "Ayesha Malik",
    type: "Annual Leave",
    dates: "Aug 3 – Aug 7",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Bilal Ahmed",
    type: "Sick Leave",
    dates: "Jul 21",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Zainab Hussain",
    type: "Casual Leave",
    dates: "Jul 25 – Jul 26",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export function PendingLeaveCard({ index }: { index: number }) {
  return (
    <BentoCard index={index}>
      <BentoCardHeader
        icon={CalendarCheck}
        title="Leave Requests"
        subtitle={`${requests.length} awaiting approval`}
        action={
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
            {requests.length}
          </span>
        }
      />

      <div className="space-y-1">
        {requests.map((req, i) => (
          <motion.div
            key={req.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="flex items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-muted/60"
          >
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={req.avatar} alt={req.name} />
              <AvatarFallback className="text-[10px]">
                {req.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium leading-tight">{req.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {req.type} · {req.dates}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400"
              >
                <Check className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-red-500 hover:bg-red-500/10 hover:text-red-500"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}

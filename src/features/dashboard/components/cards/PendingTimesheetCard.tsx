"use client";

import { ClipboardCheck } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const timesheets = [
  { name: "Hamza Sheikh", hours: "40.0", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Mahnoor Iqbal", hours: "37.5", avatar: "https://randomuser.me/api/portraits/women/29.jpg" },
];

export function PendingTimesheetCard({ index }: { index: number }) {
  return (
    <BentoCard index={index}>
      <BentoCardHeader
        icon={ClipboardCheck}
        title="Timesheet Approvals"
        subtitle={`${timesheets.length} submitted this week`}
      />

      <div className="space-y-2.5">
        {timesheets.map((t) => (
          <div key={t.name} className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={t.avatar} alt={t.name} />
              <AvatarFallback className="text-[10px]">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium leading-tight">{t.name}</p>
              <p className="text-[11px] text-muted-foreground">{t.hours} hrs logged</p>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="mt-4 w-full text-xs">
        Review all timesheets
      </Button>
    </BentoCard>
  );
}

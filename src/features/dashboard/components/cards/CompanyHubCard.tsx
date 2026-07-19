"use client";

import { Megaphone, PartyPopper } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { Badge } from "@/components/ui/badge";

const announcements = [
  {
    title: "Q3 all-hands scheduled",
    detail: "Aug 1, 4:00 PM · Main Auditorium",
    tag: "Event",
  },
  {
    title: "New health insurance provider",
    detail: "Effective from next pay cycle",
    tag: "Benefits",
  },
];

const holidays = [
  { name: "Independence Day", date: "Aug 14" },
  { name: "Ashura", date: "Aug 26–27" },
];

export function CompanyHubCard({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="md:col-span-2">
      <BentoCardHeader icon={Megaphone} title="Company Hub" subtitle="Announcements & holidays" />

      <div className="space-y-2.5">
        {announcements.map((a) => (
          <div
            key={a.title}
            className="flex items-start justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium leading-tight">{a.title}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{a.detail}</p>
            </div>
            <Badge variant="outline" className="shrink-0 text-[10px] font-normal">
              {a.tag}
            </Badge>
          </div>
        ))}
      </div>

      <div className="my-3.5 h-px w-full bg-border" />

      <div className="flex items-center gap-2 mb-2">
        <PartyPopper className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-xs font-medium text-muted-foreground">Upcoming holidays</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {holidays.map((h) => (
          <div
            key={h.name}
            className="rounded-full border border-border/60 px-2.5 py-1 text-[11px]"
          >
            <span className="font-medium">{h.name}</span>
            <span className="text-muted-foreground"> · {h.date}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

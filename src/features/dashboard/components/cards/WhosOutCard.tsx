"use client";

import { Palmtree } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const outToday = [
  {
    name: "Fatima Ahmed",
    reason: "Annual Leave",
    until: "Back Jul 24",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Usman Tariq",
    reason: "Sick Leave",
    until: "Back tomorrow",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    name: "Sana Malik",
    reason: "Work From Home",
    until: "Today only",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
];

export function WhosOutCard({ index }: { index: number }) {
  return (
    <BentoCard index={index}>
      <BentoCardHeader
        icon={Palmtree}
        title="Who's Out"
        subtitle="Today"
      />

      <div className="space-y-3">
        {outToday.map((person) => (
          <div key={person.name} className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 shrink-0 ring-2 ring-background">
              <AvatarImage src={person.avatar} alt={person.name} />
              <AvatarFallback className="text-[10px]">
                {person.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium leading-tight">{person.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{person.until}</p>
            </div>
            <Badge variant="secondary" className="shrink-0 text-[10px] font-normal">
              {person.reason}
            </Badge>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

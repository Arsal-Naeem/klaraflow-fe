"use client";

import { AlertTriangle } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";

const alerts = [
  { name: "Junaid Farooq", issue: "Missing Fri, Jul 18" },
  { name: "Rida Aslam", issue: "2 days incomplete" },
  { name: "Owais Bhatti", issue: "Missing Mon, Jul 14" },
];

export function TimesheetAlertsCard({ index }: { index: number }) {
  return (
    <BentoCard index={index}>
      <BentoCardHeader
        icon={AlertTriangle}
        title="Timesheet Alerts"
        subtitle="Needs attention"
      />

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.name}
            className="flex items-center justify-between gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-2.5 py-2 text-xs"
          >
            <span className="truncate font-medium">{alert.name}</span>
            <span className="shrink-0 text-[11px] text-amber-600 dark:text-amber-400">
              {alert.issue}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

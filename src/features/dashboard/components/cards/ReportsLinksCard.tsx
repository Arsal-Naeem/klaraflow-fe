"use client";

import { FileBarChart, ArrowRight } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";

const reports = [
  "Headcount Summary",
  "Payroll Register",
  "Leave Balance Report",
  "Attendance Compliance",
];

export function ReportsLinksCard({ index }: { index: number }) {
  return (
    <BentoCard index={index}>
      <BentoCardHeader icon={FileBarChart} title="Reports" subtitle="Frequently used" />

      <div className="space-y-1">
        {reports.map((report) => (
          <a
            key={report}
            href="#"
            className="group/link flex items-center justify-between gap-2 rounded-md px-2 py-2 text-xs transition-colors hover:bg-muted/60"
          >
            <span className="truncate">{report}</span>
            <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-all group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
          </a>
        ))}
      </div>
    </BentoCard>
  );
}

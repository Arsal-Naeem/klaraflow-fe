"use client";

import { Users, ArrowUpRight, TrendingUp } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { CountUp } from "../CountUp";
import { BreakdownBars } from "../BreakdownBars";
import { Sparkline } from "../Sparkline";

const departmentBreakdown = [
  { label: "Engineering", value: 48, color: "#6366f1" },
  { label: "Design", value: 14, color: "#ec4899" },
  { label: "Marketing", value: 11, color: "#f59e0b" },
  { label: "HR", value: 6, color: "#10b981" },
  { label: "Sales", value: 9, color: "#06b6d4" },
];

const headcountTrend = [126, 129, 131, 130, 135, 138, 142, 145, 148];

export function HeadcountCard({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="md:col-span-2 md:row-span-2">
      <BentoCardHeader
        icon={Users}
        title="Total Headcount"
        subtitle="Across all departments"
      />

      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <CountUp value={148} className="text-4xl font-bold tabular-nums tracking-tight" />
            <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              +4.2%
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            vs. 142 last quarter
          </p>
        </div>
        <div className="w-28">
          <Sparkline
            data={headcountTrend}
            strokeColor="#6366f1"
            fillColor="#6366f1"
            height={40}
          />
        </div>
      </div>

      <div className="my-4 h-px w-full bg-border" />

      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          By department
        </p>
        <BreakdownBars items={departmentBreakdown} />
      </div>

      <a
        href="/company/employees"
        className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        View all employees
        <ArrowUpRight className="h-3 w-3" />
      </a>
    </BentoCard>
  );
}

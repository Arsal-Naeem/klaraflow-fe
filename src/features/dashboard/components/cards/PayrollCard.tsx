"use client";

import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { CountUp } from "../CountUp";

const items = [
  { label: "Gross payroll", value: 284500, change: 2.1, up: true },
  { label: "Benefits & insurance", value: 41200, change: 0.8, up: true },
  { label: "Bonuses & incentives", value: 12800, change: 6.4, up: false },
];

export function PayrollCard({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="md:col-span-2">
      <BentoCardHeader
        icon={Wallet}
        title="Payroll & Benefits"
        subtitle="This pay cycle"
      />

      <div className="mb-4 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tabular-nums tracking-tight">
          $
          <CountUp value={338500} />
        </span>
        <span className="text-xs text-muted-foreground">total cost</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium tabular-nums">
                ${item.value.toLocaleString()}
              </span>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  item.up
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {item.up ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {item.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

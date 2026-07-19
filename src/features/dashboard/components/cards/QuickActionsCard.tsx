"use client";

import { Timer, CalendarPlus, Receipt, Zap } from "lucide-react";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { motion } from "framer-motion";

const actions = [
  { label: "Log Time", icon: Timer, href: "/time/log" },
  { label: "Request Leave", icon: CalendarPlus, href: "/leave/request" },
  { label: "View Payslip", icon: Receipt, href: "/payroll/payslip" },
];

export function QuickActionsCard({ index }: { index: number }) {
  return (
    <BentoCard index={index}>
      <BentoCardHeader icon={Zap} title="Quick Actions" />

      <div className="grid grid-cols-1 gap-2">
        {actions.map((action, i) => (
          <motion.a
            key={action.label}
            href={action.href}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <action.icon className="h-4 w-4" />
            </span>
            {action.label}
          </motion.a>
        ))}
      </div>
    </BentoCard>
  );
}

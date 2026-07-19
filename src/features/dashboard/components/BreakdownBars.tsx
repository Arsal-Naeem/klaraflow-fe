"use client";

import { motion } from "framer-motion";

interface BreakdownItem {
  label: string;
  value: number;
  color: string;
}

interface BreakdownBarsProps {
  items: BreakdownItem[];
}

export function BreakdownBars({ items }: BreakdownBarsProps) {
  const total = items.reduce((sum, i) => sum + i.value, 0) || 1;

  return (
    <div className="space-y-3">
      {/* Stacked bar */}
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="h-full"
            style={{ backgroundColor: item.color }}
            initial={{ width: 0 }}
            animate={{ width: `${(item.value / total) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate text-muted-foreground">{item.label}</span>
            </div>
            <span className="font-medium tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

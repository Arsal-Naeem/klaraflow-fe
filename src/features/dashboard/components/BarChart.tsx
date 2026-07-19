"use client";

import { motion } from "framer-motion";

interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  valueFormatter?: (v: number) => string;
}

export function BarChart({
  data,
  height = 220,
  color = "var(--primary)",
  valueFormatter = (v) => v.toString(),
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  
  // We no longer need to subtract 20px from the trackHeight 
  // because the label lives inside the bar now.
  const trackHeight = height;

  return (
    <div className="w-full">
      <div
        className="flex items-end gap-2 md:gap-3 mt-12"
        style={{ height }}
      >
        {data.map((d, i) => {
          // Set a minimum height of 24px (if value > 0) so the text always fits inside
          const minHeight = d.value > 0 ? 24 : 0;
          const barPx = Math.max((d.value / max) * trackHeight, minHeight);

          return (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="relative flex w-full items-end justify-center"
                style={{ height: trackHeight }}
              >
                <motion.div
                  className="relative flex w-full max-w-10 flex-col items-center justify-start overflow-hidden rounded-t-md pt-2"
                  style={{ backgroundColor: color }}
                  initial={{ height: 0 }}
                  animate={{ height: barPx }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="whitespace-nowrap text-[10px] font-semibold text-white/90 drop-shadow-sm"
                  >
                    {valueFormatter(d.value)}
                  </motion.span>
                </motion.div>
              </div>
              <span className="max-w-full truncate text-[10px] text-muted-foreground">
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
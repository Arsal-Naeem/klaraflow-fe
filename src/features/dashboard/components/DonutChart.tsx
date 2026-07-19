"use client";

import { motion } from "framer-motion";

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  size = 180,
  strokeWidth = 22,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--muted)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {data.map((d, i) => {
            const fraction = d.value / total;
            const dash = fraction * circumference;
            const gap = circumference - dash;
            const offset = -((cumulative / total) * circumference);
            cumulative += d.value;
            return (
              <motion.circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={d.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${dash} ${gap}`}
                strokeLinecap="butt"
                initial={{ strokeDashoffset: circumference, opacity: 0 }}
                animate={{ strokeDashoffset: offset, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: "easeOut" }}
              />
            );
          })}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && (
              <span className="text-xl font-bold tabular-nums leading-none">{centerValue}</span>
            )}
            {centerLabel && (
              <span className="mt-1 text-[10px] text-muted-foreground">{centerLabel}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="truncate text-muted-foreground">{d.label}</span>
            </div>
            <span className="font-medium tabular-nums shrink-0">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

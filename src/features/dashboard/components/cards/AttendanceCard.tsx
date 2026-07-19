"use client";

import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BentoCard, BentoCardHeader } from "../BentoCard";
import { RadialProgress } from "../RadialProgress";
import { CountUp } from "../CountUp";

const stats = [
  { label: "Present", value: 128, color: "#10b981" },
  { label: "Remote", value: 12, color: "#6366f1" },
  { label: "Late", value: 5, color: "#f59e0b" },
  { label: "Absent", value: 3, color: "#ef4444" },
];

const total = 148;
const presentPct = Math.round(((128 + 12) / total) * 100);

export function AttendanceCard({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="md:col-span-2">
      <BentoCardHeader
        icon={Clock}
        title="Today's Attendance"
        subtitle="Live headcount check-in"
      />

      <div className="flex items-center gap-6">
        <div className="relative shrink-0">
          <RadialProgress value={presentPct} size={104} strokeWidth={9} color="#10b981">
            <div className="flex flex-col items-center">
              <CountUp value={presentPct} suffix="%" className="text-xl font-bold tabular-nums" />
              <span className="text-[10px] text-muted-foreground">checked in</span>
            </div>
          </RadialProgress>
          {/* ambient pulse ring — signature touch */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 0 0 rgba(16,185,129,0.35)" }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(16,185,129,0.35)",
                "0 0 0 10px rgba(16,185,129,0)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        </div>

        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-center gap-2"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <div>
                <p className="text-sm font-semibold tabular-nums leading-none">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

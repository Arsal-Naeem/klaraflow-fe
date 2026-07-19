"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkline } from "./Sparkline";
import type { ReportMeta } from "@/lib/reportsCatalog";

interface ReportCardProps {
  report: ReportMeta;
  index?: number;
  className?: string;
}

export function ReportCard({ report, index = 0, className }: ReportCardProps) {
  const Icon = report.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <Link href={`/reports/${report.slug}`} className="block h-full">
        <Card className="group relative h-full overflow-hidden border-border/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
          {/* ambient accent glow on hover */}
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
            style={{ backgroundColor: report.accentColor }}
          />

          <div className="mb-4 flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${report.accentColor}1A`, color: report.accentColor }}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold leading-tight">{report.title}</h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {report.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold tabular-nums tracking-tight">
                {report.metricValue}
              </p>
              <p
                className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${
                  report.trendUp
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {report.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {report.trendLabel}
              </p>
            </div>
            <div className="w-20 shrink-0">
              <Sparkline
                data={report.sparkline}
                strokeColor={report.accentColor}
                fillColor={report.accentColor}
                height={36}
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full text-xs group-hover:border-primary/40"
          >
            View Details
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Card>
      </Link>
    </motion.div>
  );
}

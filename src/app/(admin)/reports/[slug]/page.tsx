"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, TrendingUp, TrendingDown } from "lucide-react";
import { getReportBySlug } from "@/features/reports/services/reportsCatalog";
import { ReportContent } from "@/features/reports/components/ReportContent";

export default function ReportDetailPage() {
  const params = useParams<{ slug: string }>();
  const report = getReportBySlug(params.slug);
  const [exporting, setExporting] = useState(false);

  if (!report) {
    notFound();
  }

  const Icon = report.icon;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 1200);
  };

  const breadcrumbItems = [
    { name: "Company" },
    { name: "Reports" },
    { name: report.title },
  ];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6 w-[100%]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/reports"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Reports
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${report.accentColor}1A`, color: report.accentColor }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">{report.title}</h1>
                <p className="text-muted-foreground text-sm">{report.description}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={exporting}
              className="gap-2"
            >
              <Download className="h-3.5 w-3.5" />
              {exporting ? "Exporting..." : "Export"}
            </Button>
          </div>
        </motion.div>

        {/* Summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-x-8 gap-y-2 rounded-xl border border-border/60 bg-muted/30 px-5 py-4"
        >
          <div>
            <p className="text-xs text-muted-foreground">{report.metricLabel}</p>
            <p className="text-xl font-bold tabular-nums">{report.metricValue}</p>
          </div>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              report.trendUp
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {report.trendUp ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {report.trendLabel}
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            Reporting period: Jan – Jul 2026
          </div>
        </motion.div>

        <ReportContent slug={report.slug} />
      </div>
    </FullPageLayout>
  );
}

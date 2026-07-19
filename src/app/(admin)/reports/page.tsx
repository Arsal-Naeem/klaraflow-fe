"use client";

import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { reportsCatalog } from "@/features/reports/services/reportsCatalog";
import { ReportCard } from "@/features/reports/components/ReportCard";

export default function ReportsPage() {
  const breadcrumbItems = [{ name: "Company" }, { name: "Reports" }];
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = reportsCatalog.filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6 w-[100%]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground">
              Insights and analytics across your organization
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((report: any, i: any) => (
            <ReportCard key={report.slug} report={report} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>No reports match &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </div>
    </FullPageLayout>
  );
}

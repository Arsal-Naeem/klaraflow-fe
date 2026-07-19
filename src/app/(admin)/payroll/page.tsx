"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GradientCard } from "@/components/ui/gradient-card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Search, Wallet } from "lucide-react";
import { EmployeePayrollCards } from "@/features/payroll/components/EmployeePayrollCards";
import { EmployeePayrollList } from "@/features/payroll/components/EmployeePayrollList";
import { PayrollStages } from "@/features/payroll/components/PayrollStages";
import { EmployeePayroll } from "@/features/payroll/types";
import {
  buildStages,
  formatPKR,
  getTotals,
  mockPayroll,
  statusFromCompleted,
} from "@/features/payroll/data/mockPayroll";

type View = "cards" | "table";
type StatusFilter = "all" | "processing" | "review" | "approved" | "paid";

export default function PayrollPage() {
  const [view, setView] = useState<View>("cards");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Static mock — in a real build this comes from the current pay run.
  const data = mockPayroll;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((p) => {
      const status = statusFromCompleted(p.completedStages);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch =
        !q ||
        p.employeeName.toLowerCase().includes(q) ||
        p.designation.toLowerCase().includes(q) ||
        p.employeeId.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [data, search, statusFilter]);

  const totals = useMemo(() => {
    const net = data.reduce((s, p) => s + getTotals(p).net, 0);
    const pending = data.filter(
      (p) => statusFromCompleted(p.completedStages) !== "paid",
    ).length;
    return { net, pending, count: data.length };
  }, [data]);

  // Run progress = the least-progressed employee in the run.
  const runCompleted = useMemo(
    () => Math.min(...data.map((p) => p.completedStages)),
    [data],
  );

  const handleDownload = (p: EmployeePayroll) =>
    alert(`Prototype: payslip for ${p.employeeName} would download here.`);

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <PageHeader
        breadcrumbs={[
          { label: "Company", href: "/company" },
          { label: "Payroll" },
        ]}
        title="Payroll"
        subtitle="Run, review and approve employee salaries for the current pay period."
        actions={
          <Button
            variant="default"
            onClick={() => alert("Prototype: this would start a new pay run.")}
          >
            <Wallet className="mr-2 h-4 w-4" /> Run Payroll
          </Button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <GradientCard>
          <p className="text-muted-foreground text-xs">Total Net Payout</p>
          <p className="mt-1 text-2xl font-bold">{formatPKR(totals.net)}</p>
        </GradientCard>
        <GradientCard>
          <p className="text-muted-foreground text-xs">Employees</p>
          <p className="mt-1 text-2xl font-bold">{totals.count}</p>
        </GradientCard>
        <GradientCard>
          <p className="text-muted-foreground text-xs">Pending Approvals</p>
          <p className="mt-1 text-2xl font-bold">{totals.pending}</p>
        </GradientCard>
        <GradientCard>
          <p className="text-muted-foreground text-xs">Pay Date</p>
          <p className="mt-1 text-2xl font-bold">31 Jul 2026</p>
        </GradientCard>
      </div>

      {/* Pay run workflow */}
      <div className="rounded-xl border p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">July 2026 Pay Run</p>
            <p className="text-muted-foreground text-xs">
              Overall progress across the payroll workflow
            </p>
          </div>
        </div>
        <PayrollStages
          stages={buildStages(runCompleted)}
          orientation="horizontal"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="text-muted-foreground absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payroll..."
            className="border-input bg-background focus-visible:ring-ring h-9 w-full rounded-md border py-1 pl-8 pr-3 text-sm outline-none focus-visible:ring-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="border-input bg-background h-9 rounded-md border px-3 text-sm outline-none"
          >
            <option value="all">All statuses</option>
            <option value="processing">Processing</option>
            <option value="review">In Review</option>
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
          </select>
          <div className="flex items-center rounded-md border p-0.5">
            <Button
              variant={view === "table" ? "secondary" : "ghost"}
              className="h-7 gap-1.5 px-2.5"
              onClick={() => setView("table")}
            >
              <List className="h-4 w-4" /> Table
            </Button>
            <Button
              variant={view === "cards" ? "secondary" : "ghost"}
              className="h-7 gap-1.5 px-2.5"
              onClick={() => setView("cards")}
            >
              <LayoutGrid className="h-4 w-4" /> Cards
            </Button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-muted-foreground rounded-lg border border-dashed py-16 text-center text-sm">
          No payroll records match your filters.
        </div>
      ) : view === "cards" ? (
        <EmployeePayrollCards items={filtered} onDownload={handleDownload} />
      ) : (
        <EmployeePayrollList items={filtered} onDownload={handleDownload} />
      )}
    </div>
  );
}

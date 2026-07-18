"use client";

import * as React from "react";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Clock,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import { cn } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { GradientCard } from "@/components/ui/gradient-card";
import { TimesheetList } from "@/features/timesheet/components/TimesheetList";
import { TimesheetCards } from "@/features/timesheet/components/TimesheetCards";
import { AddTimesheetDialog } from "@/features/timesheet/components/AddTimesheetDialog";
import {
  mockTimesheets,
  getStatusVariant,
} from "@/features/timesheet/data/mockTimesheets";
import { Timesheet, TimesheetStatus } from "@/features/timesheet/types";

type ViewMode = "table" | "cards";

export default function TimesheetPage() {
  const [timesheets, setTimesheets] =
    React.useState<Timesheet[]>(mockTimesheets);
  const [view, setView] = React.useState<ViewMode>("table");
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | TimesheetStatus
  >("all");
  const [addOpen, setAddOpen] = React.useState(false);

  const filtered = timesheets.filter((t) => {
    const q = search.toLowerCase();
    const matchesSearch = [t.employeeName, t.project, t.id].some((f) =>
      f.toLowerCase().includes(q),
    );
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = (entry: Omit<Timesheet, "id">) => {
    const nextNum = 1001 + timesheets.length;
    setTimesheets((prev) => [{ id: `TS-${nextNum}`, ...entry }, ...prev]);
  };
  const handleDelete = (id: string) =>
    setTimesheets((prev) => prev.filter((t) => t.id !== id));
  const handleStatusChange = (id: string, status: TimesheetStatus) =>
    setTimesheets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    );

  const totalHours = timesheets.reduce((s, t) => s + t.hoursWorked, 0);
  const stats = [
    { label: "Total Hours", value: totalHours.toFixed(1), icon: Clock },
    {
      label: "Approved",
      value: timesheets.filter((t) => t.status === "approved").length,
      icon: CheckCircle2,
    },
    {
      label: "Pending",
      value: timesheets.filter((t) => t.status === "pending").length,
      icon: Clock3,
    },
    {
      label: "Rejected",
      value: timesheets.filter((t) => t.status === "rejected").length,
      icon: XCircle,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <PageHeader
        breadcrumbs={[
          { label: "Company", href: "/company" },
          { label: "Timesheets" },
        ]}
        title="Timesheets"
        subtitle="Review and manage employee time entries."
        actions={
          <Button variant="default" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> Add Entry
          </Button>
        }
      />

      {/* Summary stat cards (with accent hover glow) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <GradientCard key={s.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
              </div>
              <s.icon className="text-muted-foreground h-5 w-5" />
            </div>
          </GradientCard>
        ))}
      </div>

      {/* Toolbar: search + status filter + view toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search timesheets..."
            className="border-input bg-background focus-visible:ring-ring/50 h-9 w-full rounded-md border pl-9 pr-3 text-sm outline-none focus-visible:ring-[3px]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border-input bg-background h-9 rounded-md border px-3 text-sm outline-none"
        >
          <option value="all">All statuses</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        <div className="bg-muted flex items-center rounded-md p-0.5">
          <button
            onClick={() => setView("table")}
            className={cn(
              "flex h-8 cursor-pointer items-center gap-1.5 rounded px-2.5 text-sm transition-colors",
              view === "table"
                ? "bg-background shadow-sm"
                : "text-muted-foreground",
            )}
          >
            <List className="h-4 w-4" /> Table
          </button>
          <button
            onClick={() => setView("cards")}
            className={cn(
              "flex h-8 cursor-pointer items-center gap-1.5 rounded px-2.5 text-sm transition-colors",
              view === "cards"
                ? "bg-background shadow-sm"
                : "text-muted-foreground",
            )}
          >
            <LayoutGrid className="h-4 w-4" /> Cards
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-muted-foreground rounded-lg border border-dashed p-12 text-center text-sm">
          No timesheets found.
        </div>
      ) : view === "table" ? (
        <TimesheetList
          timesheets={filtered}
          getStatusVariant={getStatusVariant}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <TimesheetCards
          timesheets={filtered}
          getStatusVariant={getStatusVariant}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      <p className="text-muted-foreground text-center text-xs">
        Showing {filtered.length} of {timesheets.length} entries
      </p>

      <AddTimesheetDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/shared/Modal";
import { Timesheet, TimesheetStatus } from "../types";
import { PROJECTS } from "../data/mockTimesheets";

const fieldClass =
  "border-input bg-background focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]";
const labelClass = "text-sm font-medium";

interface AddTimesheetDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (entry: Omit<Timesheet, "id">) => void;
}

const emptyForm = () => ({
  employeeName: "",
  date: new Date().toISOString().slice(0, 10),
  project: PROJECTS[0],
  hoursWorked: "8",
  status: "pending" as TimesheetStatus,
});

export function AddTimesheetDialog({
  open,
  onClose,
  onAdd,
}: AddTimesheetDialogProps) {
  const [form, setForm] = React.useState(emptyForm());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employeeName.trim()) return;
    onAdd({
      employeeName: form.employeeName.trim(),
      date: form.date,
      project: form.project,
      hoursWorked: Number(form.hoursWorked) || 0,
      status: form.status,
    });
    setForm(emptyForm());
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Timesheet Entry"
      description="Create a new time entry. Saved for this session only."
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Employee Name</label>
          <input
            className={fieldClass}
            value={form.employeeName}
            onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
            placeholder="e.g. Ayesha Siddiqui"
            autoFocus
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Date</label>
            <input
              type="date"
              className={fieldClass}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Hours Worked</label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="24"
              className={fieldClass}
              value={form.hoursWorked}
              onChange={(e) =>
                setForm({ ...form, hoursWorked: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Project</label>
          <select
            className={fieldClass}
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
          >
            {PROJECTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Status</label>
          <select
            className={fieldClass}
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as TimesheetStatus })
            }
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent">
            Add Entry
          </Button>
        </div>
      </form>
    </Modal>
  );
}

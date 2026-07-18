"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/shared/Modal";
import { LeaveRequest, LeaveStatus, LeaveType } from "../types";
import { LEAVE_TYPES, daysBetween } from "../data/mockLeaveRequests";

const fieldClass =
  "border-input bg-background focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]";
const labelClass = "text-sm font-medium";

interface AddLeaveRequestDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (entry: Omit<LeaveRequest, "id">) => void;
}

const emptyForm = () => {
  const today = new Date().toISOString().slice(0, 10);
  return {
    employeeName: "",
    leaveType: LEAVE_TYPES[0],
    startDate: today,
    endDate: today,
    reason: "",
    status: "pending" as LeaveStatus,
  };
};

export function AddLeaveRequestDialog({
  open,
  onClose,
  onAdd,
}: AddLeaveRequestDialogProps) {
  const [form, setForm] = React.useState(emptyForm());
  const days = daysBetween(form.startDate, form.endDate);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employeeName.trim()) return;
    onAdd({
      employeeName: form.employeeName.trim(),
      leaveType: form.leaveType as LeaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      days,
      reason: form.reason.trim() || "—",
      status: form.status,
    });
    setForm(emptyForm());
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New Leave Request"
      description="Submit a leave request. Saved for this session only."
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Employee Name</label>
          <input
            className={fieldClass}
            value={form.employeeName}
            onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
            placeholder="e.g. Bilal Ahmed"
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Leave Type</label>
          <select
            className={fieldClass}
            value={form.leaveType}
            onChange={(e) =>
              setForm({ ...form, leaveType: e.target.value as LeaveType })
            }
          >
            {LEAVE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>From</label>
            <input
              type="date"
              className={fieldClass}
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>To</label>
            <input
              type="date"
              className={fieldClass}
              value={form.endDate}
              min={form.startDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>
        <p className="text-muted-foreground text-xs">
          Duration: <span className="text-foreground font-medium">{days}</span>{" "}
          day{days > 1 ? "s" : ""}
        </p>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Reason</label>
          <textarea
            className={`${fieldClass} h-20 resize-none py-2`}
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            placeholder="Short reason for the leave..."
          />
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent">
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  );
}

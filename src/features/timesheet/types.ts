export type TimesheetStatus = "approved" | "pending" | "rejected";

export interface Timesheet {
  id: string;
  employeeName: string;
  date: string; // ISO date string, e.g. "2026-07-14"
  project: string;
  hoursWorked: number;
  status: TimesheetStatus;
}

export type PayrollStatus =
  "draft" | "processing" | "review" | "approved" | "paid";

export type ApproverStatus = "approved" | "pending" | "rejected";

export interface PayLine {
  label: string;
  amount: number;
}

export type PayrollStageKey =
  "timesheet" | "calculation" | "review" | "approval" | "payment";

export interface PayrollStage {
  key: PayrollStageKey;
  label: string;
  description: string;
  status: "complete" | "current" | "upcoming";
  completedOn?: string;
}

export interface PayrollApprover {
  name: string;
  role: string;
  status: ApproverStatus;
  actedOn?: string;
}

export interface EmployeePayroll {
  id: string; // PR-3001
  employeeName: string;
  employeeId: string; // EMP-101
  designation: string;
  department: string;
  avatarColor: string; // tailwind gradient stops, e.g. "from-pink-500 to-purple-600"
  payPeriod: string; // "July 2026"
  payDate: string; // ISO
  paymentMethod: string;
  bankAccount: string;
  earnings: PayLine[];
  deductions: PayLine[];
  completedStages: number; // 0..5 -> drives status, stages and approver chain
}

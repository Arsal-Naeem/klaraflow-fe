export type LeaveStatus = "approved" | "pending" | "rejected";

export type LeaveType = "Annual" | "Sick" | "Casual" | "Unpaid" | "Maternity";

export interface LeaveRequest {
  id: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  days: number;
  reason: string;
  status: LeaveStatus;
}

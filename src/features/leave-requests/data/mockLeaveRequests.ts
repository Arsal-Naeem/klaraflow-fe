import { LeaveRequest, LeaveType } from "../types";

export const LEAVE_TYPES: LeaveType[] = [
  "Annual",
  "Sick",
  "Casual",
  "Unpaid",
  "Maternity",
];

/** Maps a leave status to a Badge variant (same pattern as EmployeesList). */
export const getStatusVariant = (status: LeaveRequest["status"]): string => {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

/** Inclusive day count between two ISO dates. */
export const daysBetween = (start: string, end: string): number => {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 1;
  return Math.floor((e - s) / (1000 * 60 * 60 * 24)) + 1;
};

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "LR-2001",
    employeeName: "Ayesha Siddiqui",
    leaveType: "Annual",
    startDate: "2026-07-20",
    endDate: "2026-07-24",
    days: 5,
    reason: "Family vacation",
    status: "approved",
  },
  {
    id: "LR-2002",
    employeeName: "Bilal Ahmed",
    leaveType: "Sick",
    startDate: "2026-07-15",
    endDate: "2026-07-16",
    days: 2,
    reason: "Fever and flu",
    status: "pending",
  },
  {
    id: "LR-2003",
    employeeName: "Fatima Noor",
    leaveType: "Casual",
    startDate: "2026-07-18",
    endDate: "2026-07-18",
    days: 1,
    reason: "Personal errand",
    status: "rejected",
  },
  {
    id: "LR-2004",
    employeeName: "Hamza Tariq",
    leaveType: "Annual",
    startDate: "2026-08-01",
    endDate: "2026-08-07",
    days: 7,
    reason: "Eid holidays",
    status: "pending",
  },
  {
    id: "LR-2005",
    employeeName: "Sana Malik",
    leaveType: "Maternity",
    startDate: "2026-09-01",
    endDate: "2026-11-30",
    days: 91,
    reason: "Maternity leave",
    status: "approved",
  },
  {
    id: "LR-2006",
    employeeName: "Usman Raza",
    leaveType: "Unpaid",
    startDate: "2026-07-22",
    endDate: "2026-07-26",
    days: 5,
    reason: "Personal project",
    status: "pending",
  },
  {
    id: "LR-2007",
    employeeName: "Zainab Iqbal",
    leaveType: "Sick",
    startDate: "2026-07-14",
    endDate: "2026-07-15",
    days: 2,
    reason: "Migraine",
    status: "approved",
  },
  {
    id: "LR-2008",
    employeeName: "Omar Farooq",
    leaveType: "Casual",
    startDate: "2026-07-25",
    endDate: "2026-07-25",
    days: 1,
    reason: "Bank work",
    status: "rejected",
  },
];

import {
  EmployeePayroll,
  PayLine,
  PayrollApprover,
  PayrollStage,
  PayrollStatus,
} from "../types";

/* ------------------------------------------------------------------ */
/* Formatting + small helpers                                          */
/* ------------------------------------------------------------------ */

export const formatPKR = (n: number): string =>
  `Rs ${Math.round(n).toLocaleString("en-US")}`;

export const initials = (name: string): string =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Real profile photos via a free, no-key API. Falls back to initials if offline.
export const avatarUrl = (seed: string): string =>
  `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;

const AVATAR_COLORS = [
  "from-pink-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-600",
  "from-violet-500 to-fuchsia-600",
  "from-cyan-500 to-blue-600",
];
const pickColor = (name: string): string => {
  const sum = name.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
};

export const sumLines = (lines: PayLine[]): number =>
  lines.reduce((s, l) => s + l.amount, 0);

export const getTotals = (p: EmployeePayroll) => {
  const gross = sumLines(p.earnings);
  const totalDeductions = sumLines(p.deductions);
  return { gross, totalDeductions, net: gross - totalDeductions };
};

/* ------------------------------------------------------------------ */
/* Status                                                             */
/* ------------------------------------------------------------------ */

export const STATUS_LABEL: Record<PayrollStatus, string> = {
  draft: "Draft",
  processing: "Processing",
  review: "In Review",
  approved: "Approved",
  paid: "Paid",
};

export const statusFromCompleted = (c: number): PayrollStatus => {
  if (c >= 5) return "paid";
  if (c >= 4) return "approved";
  if (c >= 3) return "review";
  if (c >= 1) return "processing";
  return "draft";
};

export const getStatusVariant = (status: PayrollStatus): string => {
  switch (status) {
    case "paid":
      return "default";
    case "approved":
    case "review":
      return "secondary";
    default:
      return "outline";
  }
};

/* ------------------------------------------------------------------ */
/* Processing stages (the payroll workflow)                           */
/* ------------------------------------------------------------------ */

const STAGE_DEFS: Array<Pick<PayrollStage, "key" | "label" | "description">> = [
  {
    key: "timesheet",
    label: "Timesheet",
    description: "Hours & leave imported from attendance",
  },
  {
    key: "calculation",
    label: "Calculation",
    description: "Gross-to-net salary computed",
  },
  {
    key: "review",
    label: "Review",
    description: "Variance checked against last cycle",
  },
  {
    key: "approval",
    label: "Approval",
    description: "Manager & finance sign-off",
  },
  {
    key: "payment",
    label: "Payment",
    description: "Salary disbursed & payslip issued",
  },
];

export const TOTAL_STAGES = STAGE_DEFS.length;

const stageDate = (i: number) => `2026-07-2${i + 2}`;

export const buildStages = (completed: number): PayrollStage[] =>
  STAGE_DEFS.map((s, i) => ({
    ...s,
    status:
      i < completed ? "complete" : i === completed ? "current" : "upcoming",
    completedOn: i < completed ? stageDate(i) : undefined,
  }));

/* ------------------------------------------------------------------ */
/* Approver chain (maker-checker)                                     */
/* ------------------------------------------------------------------ */

const APPROVER_DEFS: Array<{ name: string; role: string; unlocksAt: number }> =
  [
    { name: "Sana Malik", role: "Payroll Officer (Maker)", unlocksAt: 3 },
    { name: "Usman Raza", role: "Payroll Manager", unlocksAt: 4 },
    { name: "Imran Sheikh", role: "Finance Controller", unlocksAt: 5 },
  ];

export const buildApprovers = (completed: number): PayrollApprover[] =>
  APPROVER_DEFS.map((a) => ({
    name: a.name,
    role: a.role,
    status: completed >= a.unlocksAt ? "approved" : "pending",
    actedOn: completed >= a.unlocksAt ? stageDate(a.unlocksAt - 1) : undefined,
  }));

/* ------------------------------------------------------------------ */
/* Mock employees                                                     */
/* ------------------------------------------------------------------ */

let seq = 0;
const makePayroll = (
  employeeName: string,
  designation: string,
  department: string,
  basic: number,
  completedStages: number,
  extras?: { bonus?: number; overtime?: number; loan?: number },
): EmployeePayroll => {
  seq += 1;
  const hra = Math.round(basic * 0.45);
  const medical = Math.round(basic * 0.1);
  const conveyance = 8000;
  const earnings: PayLine[] = [
    { label: "Basic Salary", amount: basic },
    { label: "House Rent Allowance", amount: hra },
    { label: "Medical Allowance", amount: medical },
    { label: "Conveyance Allowance", amount: conveyance },
  ];
  if (extras?.bonus)
    earnings.push({ label: "Performance Bonus", amount: extras.bonus });
  if (extras?.overtime)
    earnings.push({ label: "Overtime", amount: extras.overtime });

  const gross = sumLines(earnings);
  const deductions: PayLine[] = [
    { label: "Income Tax", amount: Math.round(gross * 0.08) },
    { label: "Provident Fund", amount: Math.round(basic * 0.0834) },
    { label: "EOBI", amount: 370 },
  ];
  if (extras?.loan)
    deductions.push({ label: "Loan Repayment", amount: extras.loan });

  return {
    id: `PR-${3000 + seq}`,
    employeeName,
    employeeId: `EMP-${100 + seq}`,
    designation,
    department,
    avatarColor: pickColor(employeeName),
    payPeriod: "July 2026",
    payDate: "2026-07-31",
    paymentMethod: "Bank Transfer",
    bankAccount: "**** 4821",
    earnings,
    deductions,
    completedStages,
  };
};

export const mockPayroll: EmployeePayroll[] = [
  makePayroll(
    "Ayesha Siddiqui",
    "Senior Software Engineer",
    "Engineering",
    180000,
    5,
    { bonus: 40000 },
  ),
  makePayroll("Bilal Ahmed", "Software Engineer", "Engineering", 120000, 5, {
    overtime: 12000,
  }),
  makePayroll("Fatima Noor", "UI/UX Designer", "Design", 110000, 4),
  makePayroll("Hamza Tariq", "Backend Engineer", "Engineering", 140000, 4, {
    overtime: 8000,
  }),
  makePayroll("Sana Malik", "HR Executive", "Human Resources", 95000, 3),
  makePayroll("Usman Raza", "Frontend Developer", "Engineering", 115000, 3, {
    bonus: 15000,
  }),
  makePayroll("Zainab Iqbal", "QA Engineer", "Quality Assurance", 90000, 2),
  makePayroll("Omar Farooq", "DevOps Engineer", "Engineering", 150000, 2, {
    loan: 20000,
  }),
];

export const getPayrollById = (id: string): EmployeePayroll | undefined =>
  mockPayroll.find((p) => p.id === id);

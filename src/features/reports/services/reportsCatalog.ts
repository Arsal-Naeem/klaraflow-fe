import {
  Users,
  Wallet,
  CalendarClock,
  Clock,
  UserPlus,
  TrendingDown,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

export type ReportSlug =
  | "headcount-summary"
  | "payroll-register"
  | "leave-balance"
  | "attendance-compliance"
  | "turnover-retention"
  | "onboarding-status"
  | "compliance-audit"
  | "training-completion";

export interface ReportMeta {
  slug: ReportSlug;
  title: string;
  description: string;
  icon: typeof Users;
  accentColor: string;
  metricLabel: string;
  metricValue: string;
  trendLabel: string;
  trendUp: boolean;
  sparkline: number[];
}

export const reportsCatalog: ReportMeta[] = [
  {
    slug: "headcount-summary",
    title: "Headcount Summary",
    description: "Org size, department mix, and hiring trend",
    icon: Users,
    accentColor: "#6366f1",
    metricLabel: "Total employees",
    metricValue: "148",
    trendLabel: "+4.2% vs last quarter",
    trendUp: true,
    sparkline: [126, 129, 131, 130, 135, 138, 142, 145, 148],
  },
  {
    slug: "payroll-register",
    title: "Payroll Register",
    description: "Gross pay, benefits, and cost breakdown",
    icon: Wallet,
    accentColor: "#10b981",
    metricLabel: "This cycle",
    metricValue: "$338.5K",
    trendLabel: "+2.1% vs last cycle",
    trendUp: true,
    sparkline: [298, 305, 301, 312, 318, 322, 330, 334, 338],
  },
  {
    slug: "leave-balance",
    title: "Leave Balance Report",
    description: "Accrued, used, and remaining leave by type",
    icon: CalendarClock,
    accentColor: "#f59e0b",
    metricLabel: "Avg. balance",
    metricValue: "12.4 days",
    trendLabel: "-1.1 days vs last month",
    trendUp: false,
    sparkline: [15, 14.5, 14, 13.8, 13.2, 12.9, 12.6, 12.5, 12.4],
  },
  {
    slug: "attendance-compliance",
    title: "Attendance Compliance",
    description: "On-time rate, absences, and policy exceptions",
    icon: Clock,
    accentColor: "#06b6d4",
    metricLabel: "Compliance rate",
    metricValue: "94.6%",
    trendLabel: "+0.8% vs last month",
    trendUp: true,
    sparkline: [91, 92, 91.5, 93, 92.8, 93.5, 94, 94.3, 94.6],
  },
  {
    slug: "turnover-retention",
    title: "Turnover & Retention",
    description: "Attrition rate, tenure, and exit reasons",
    icon: TrendingDown,
    accentColor: "#ef4444",
    metricLabel: "Annual attrition",
    metricValue: "8.3%",
    trendLabel: "-1.4% vs last year",
    trendUp: true,
    sparkline: [11, 10.5, 10.2, 9.8, 9.5, 9.1, 8.8, 8.5, 8.3],
  },
  {
    slug: "onboarding-status",
    title: "Onboarding Status",
    description: "New hire progress across active cohorts",
    icon: UserPlus,
    accentColor: "#8b5cf6",
    metricLabel: "In progress",
    metricValue: "3 hires",
    trendLabel: "68% avg. completion",
    trendUp: true,
    sparkline: [20, 35, 40, 48, 55, 60, 63, 66, 68],
  },
  {
    slug: "compliance-audit",
    title: "Compliance Audit",
    description: "Document status and policy acknowledgements",
    icon: ShieldCheck,
    accentColor: "#0ea5e9",
    metricLabel: "Fully compliant",
    metricValue: "91%",
    trendLabel: "+3% vs last audit",
    trendUp: true,
    sparkline: [82, 84, 85, 87, 88, 89, 90, 90.5, 91],
  },
  {
    slug: "training-completion",
    title: "Training Completion",
    description: "Course progress across mandatory programs",
    icon: GraduationCap,
    accentColor: "#ec4899",
    metricLabel: "Completion rate",
    metricValue: "76%",
    trendLabel: "+9% vs last quarter",
    trendUp: true,
    sparkline: [55, 58, 62, 65, 68, 70, 72, 74, 76],
  },
];

export function getReportBySlug(slug: string): ReportMeta | undefined {
  return reportsCatalog.find((r) => r.slug === slug);
}

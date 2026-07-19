"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Calendar,
  ShieldCheck,
  GraduationCap,
  TrendingDown,
  UserPlus,
} from "lucide-react";
import { ReportSlug } from "../services/reportsCatalog";
import { BentoCard, BentoCardHeader } from "@/features/dashboard/components/BentoCard";
import { LineChart } from "@/features/dashboard/components/LineChart";
import { DonutChart } from "@/features/dashboard/components/DonutChart";
import { BarChart } from "@/features/dashboard/components/BarChart";
import { BreakdownBars } from "@/features/dashboard/components/BreakdownBars";
import { RadialProgress } from "@/features/dashboard/components/RadialProgress";
import { CountUp } from "@/features/dashboard/components/CountUp";


const headcountTrend = [
  { label: "Jan", value: 126 },
  { label: "Feb", value: 129 },
  { label: "Mar", value: 131 },
  { label: "Apr", value: 130 },
  { label: "May", value: 135 },
  { label: "Jun", value: 138 },
  { label: "Jul", value: 148 },
];

const departmentData = [
  { label: "Engineering", value: 48, color: "#6366f1" },
  { label: "Design", value: 14, color: "#ec4899" },
  { label: "Marketing", value: 11, color: "#f59e0b" },
  { label: "HR", value: 6, color: "#10b981" },
  { label: "Sales", value: 9, color: "#06b6d4" },
];

const genderData = [
  { label: "Male", value: 86, color: "#6366f1" },
  { label: "Female", value: 58, color: "#ec4899" },
  { label: "Other / N/A", value: 4, color: "#94a3b8" },
];

function HeadcountReport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BentoCard index={0} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader icon={Building2} title="Headcount over time" subtitle="Last 7 months" />
          <LineChart data={headcountTrend} color="#6366f1" />
        </div>
      </BentoCard>

      <BentoCard index={1} noPadding>
        <div className="p-5">
          <BentoCardHeader title="Gender distribution" />
          <DonutChart data={genderData} centerValue="148" centerLabel="total" />
        </div>
      </BentoCard>

      <BentoCard index={2} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Headcount by department" />
          <BarChart data={departmentData.map((d) => ({ label: d.label, value: d.value }))} color="#6366f1" />
        </div>
      </BentoCard>

      <BentoCard index={3} noPadding>
        <div className="p-5">
          <BentoCardHeader title="Department mix" />
          <BreakdownBars items={departmentData} />
        </div>
      </BentoCard>
    </div>
  );
}

const payrollTrend = [
  { label: "Feb", value: 298000 },
  { label: "Mar", value: 305000 },
  { label: "Apr", value: 301000 },
  { label: "May", value: 318000 },
  { label: "Jun", value: 330000 },
  { label: "Jul", value: 338500 },
];

const costBreakdown = [
  { label: "Gross salaries", value: 284500, color: "#10b981" },
  { label: "Benefits & insurance", value: 41200, color: "#6366f1" },
  { label: "Bonuses & incentives", value: 12800, color: "#f59e0b" },
];

const payrollByDept = [
  { label: "Engineering", value: 142000 },
  { label: "Design", value: 48000 },
  { label: "Marketing", value: 36000 },
  { label: "HR", value: 22000 },
  { label: "Sales", value: 34000 },
];

function PayrollReport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BentoCard index={0} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Total payroll cost trend" subtitle="Last 6 pay cycles" />
          <LineChart data={payrollTrend} color="#10b981" valueFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
        </div>
      </BentoCard>

      <BentoCard index={1} noPadding>
        <div className="p-5">
          <BentoCardHeader title="Cost composition" />
          <DonutChart
            data={costBreakdown}
            centerValue="$338.5K"
            centerLabel="total cost"
          />
        </div>
      </BentoCard>

      <BentoCard index={2} className="lg:col-span-3" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Payroll cost by department" />
          <BarChart
            data={payrollByDept}
            color="#10b981"
            valueFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
        </div>
      </BentoCard>
    </div>
  );
}

const leaveTypeData = [
  { label: "Annual", value: 18, color: "#6366f1" },
  { label: "Sick", value: 6, color: "#ef4444" },
  { label: "Casual", value: 4, color: "#f59e0b" },
  { label: "Unpaid", value: 1.5, color: "#94a3b8" },
];

const leaveBalanceTrend = [
  { label: "Feb", value: 15 },
  { label: "Mar", value: 14.5 },
  { label: "Apr", value: 14 },
  { label: "May", value: 13.2 },
  { label: "Jun", value: 12.6 },
  { label: "Jul", value: 12.4 },
];

const employeesLowBalance = [
  { name: "Ayesha Malik", remaining: 2, avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Bilal Ahmed", remaining: 3.5, avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Zainab Hussain", remaining: 1, avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
];

function LeaveBalanceReport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BentoCard index={0} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader icon={Calendar} title="Average leave balance trend" subtitle="Company-wide, days remaining" />
          <LineChart data={leaveBalanceTrend} color="#f59e0b" valueFormatter={(v) => `${v}d`} />
        </div>
      </BentoCard>

      <BentoCard index={1} noPadding>
        <div className="p-5">
          <BentoCardHeader title="Leave taken by type" subtitle="Avg. days per employee" />
          <DonutChart data={leaveTypeData} centerValue="29.5" centerLabel="days avg." />
        </div>
      </BentoCard>

      <BentoCard index={2} className="lg:col-span-3" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Low balance alerts" subtitle="Employees with under 5 days remaining" />
          <div className="space-y-2">
            {employeesLowBalance.map((e) => (
              <div key={e.name} className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={e.avatar} alt={e.name} />
                  <AvatarFallback className="text-[10px]">
                    {e.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 text-sm font-medium">{e.name}</span>
                <Badge variant="warning" className="text-[10px]">
                  {e.remaining}d remaining
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

const attendanceTrend = [
  { label: "Feb", value: 91 },
  { label: "Mar", value: 92 },
  { label: "Apr", value: 91.5 },
  { label: "May", value: 93 },
  { label: "Jun", value: 94 },
  { label: "Jul", value: 94.6 },
];

const attendanceByDept = [
  { label: "Engineering", value: 96 },
  { label: "Design", value: 94 },
  { label: "Marketing", value: 91 },
  { label: "HR", value: 97 },
  { label: "Sales", value: 89 },
];

function AttendanceReport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BentoCard index={0} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Compliance rate trend" subtitle="On-time check-ins, last 6 months" />
          <LineChart data={attendanceTrend} color="#06b6d4" valueFormatter={(v) => `${v}%`} />
        </div>
      </BentoCard>

      <BentoCard index={1} noPadding>
        <div className="p-5 flex flex-col items-center justify-center h-full">
          <BentoCardHeader title="Overall compliance" />
          <RadialProgress value={94.6} size={140} strokeWidth={12} color="#06b6d4">
            <div className="flex flex-col items-center">
              <CountUp value={94.6} decimals={1} suffix="%" className="text-2xl font-bold" />
              <span className="text-[10px] text-muted-foreground">this month</span>
            </div>
          </RadialProgress>
        </div>
      </BentoCard>

      <BentoCard index={2} className="lg:col-span-3" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Compliance rate by department" />
          <BarChart data={attendanceByDept} color="#06b6d4" valueFormatter={(v) => `${v}%`} />
        </div>
      </BentoCard>
    </div>
  );
}

const turnoverTrend = [
  { label: "Feb", value: 11 },
  { label: "Mar", value: 10.5 },
  { label: "Apr", value: 10.2 },
  { label: "May", value: 9.5 },
  { label: "Jun", value: 8.8 },
  { label: "Jul", value: 8.3 },
];

const exitReasons = [
  { label: "Better opportunity", value: 9, color: "#ef4444" },
  { label: "Relocation", value: 4, color: "#f59e0b" },
  { label: "Career change", value: 3, color: "#6366f1" },
  { label: "Other", value: 2, color: "#94a3b8" },
];

function TurnoverReport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BentoCard index={0} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader icon={TrendingDown} title="Annual attrition rate" subtitle="Trailing 12-month, by month" />
          <LineChart data={turnoverTrend} color="#ef4444" valueFormatter={(v) => `${v}%`} />
        </div>
      </BentoCard>

      <BentoCard index={1} noPadding>
        <div className="p-5">
          <BentoCardHeader title="Exit reasons" subtitle="Last 12 months" />
          <DonutChart data={exitReasons} centerValue="18" centerLabel="departures" />
        </div>
      </BentoCard>

      <BentoCard index={2} className="lg:col-span-3" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Average tenure by department (years)" />
          <BarChart
            data={[
              { label: "Engineering", value: 2.8 },
              { label: "Design", value: 2.1 },
              { label: "Marketing", value: 1.9 },
              { label: "HR", value: 3.4 },
              { label: "Sales", value: 1.6 },
            ]}
            color="#ef4444"
            valueFormatter={(v) => `${v}y`}
          />
        </div>
      </BentoCard>
    </div>
  );
}

const onboardingCohorts = [
  { name: "Ali Raza", role: "Frontend Developer", progress: 75, avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
  { name: "Nimra Sheikh", role: "Product Designer", progress: 40, avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
  { name: "Danish Khan", role: "QA Engineer", progress: 90, avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
];

const onboardingStages = [
  { label: "Paperwork", value: 100 },
  { label: "IT Setup", value: 92 },
  { label: "Orientation", value: 84 },
  { label: "Role Training", value: 61 },
  { label: "30-day check-in", value: 38 },
];

function OnboardingReport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BentoCard index={0} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader icon={UserPlus} title="Completion rate by stage" subtitle="Across all active cohorts" />
          <BarChart data={onboardingStages} color="#8b5cf6" valueFormatter={(v) => `${v}%`} />
        </div>
      </BentoCard>

      <BentoCard index={1} noPadding>
        <div className="p-5 flex flex-col items-center justify-center h-full">
          <BentoCardHeader title="Avg. completion" />
          <RadialProgress value={68} size={130} strokeWidth={11} color="#8b5cf6">
            <div className="flex flex-col items-center">
              <CountUp value={68} suffix="%" className="text-2xl font-bold" />
              <span className="text-[10px] text-muted-foreground">3 active hires</span>
            </div>
          </RadialProgress>
        </div>
      </BentoCard>

      <BentoCard index={2} className="lg:col-span-3" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Active cohorts" />
          <div className="space-y-4">
            {onboardingCohorts.map((hire) => (
              <div key={hire.name} className="flex items-center gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarImage src={hire.avatar} alt={hire.name} />
                  <AvatarFallback className="text-xs">
                    {hire.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{hire.name}</p>
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {hire.progress}%
                    </span>
                  </div>
                  <p className="mb-1.5 truncate text-xs text-muted-foreground">{hire.role}</p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[#8b5cf6] transition-all duration-700"
                      style={{ width: `${hire.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

const complianceItems = [
  { label: "Signed contracts", value: 98, color: "#0ea5e9" },
  { label: "Tax documents", value: 94, color: "#6366f1" },
  { label: "Policy acknowledgement", value: 88, color: "#f59e0b" },
  { label: "Background checks", value: 91, color: "#10b981" },
];

const complianceTrend = [
  { label: "Feb", value: 82 },
  { label: "Mar", value: 84 },
  { label: "Apr", value: 85 },
  { label: "May", value: 88 },
  { label: "Jun", value: 90 },
  { label: "Jul", value: 91 },
];

function ComplianceReport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BentoCard index={0} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader icon={ShieldCheck} title="Compliance rate over time" />
          <LineChart data={complianceTrend} color="#0ea5e9" valueFormatter={(v) => `${v}%`} />
        </div>
      </BentoCard>

      <BentoCard index={1} noPadding>
        <div className="p-5 flex flex-col items-center justify-center h-full">
          <BentoCardHeader title="Fully compliant" />
          <RadialProgress value={91} size={130} strokeWidth={11} color="#0ea5e9">
            <div className="flex flex-col items-center">
              <CountUp value={91} suffix="%" className="text-2xl font-bold" />
              <span className="text-[10px] text-muted-foreground">of workforce</span>
            </div>
          </RadialProgress>
        </div>
      </BentoCard>

      <BentoCard index={2} className="lg:col-span-3" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Compliance by document type" />
          <BarChart
            data={complianceItems.map((c) => ({ label: c.label, value: c.value }))}
            color="#0ea5e9"
            valueFormatter={(v) => `${v}%`}
          />
        </div>
      </BentoCard>
    </div>
  );
}

const trainingPrograms = [
  { label: "Workplace Safety", value: 100, color: "#ec4899" },
  { label: "Data Privacy", value: 88, color: "#6366f1" },
  { label: "Code of Conduct", value: 72, color: "#f59e0b" },
  { label: "Anti-Harassment", value: 64, color: "#10b981" },
];

const trainingTrend = [
  { label: "Feb", value: 55 },
  { label: "Mar", value: 58 },
  { label: "Apr", value: 65 },
  { label: "May", value: 68 },
  { label: "Jun", value: 72 },
  { label: "Jul", value: 76 },
];

function TrainingReport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BentoCard index={0} className="lg:col-span-2" noPadding>
        <div className="p-5">
          <BentoCardHeader icon={GraduationCap} title="Overall completion trend" />
          <LineChart data={trainingTrend} color="#ec4899" valueFormatter={(v) => `${v}%`} />
        </div>
      </BentoCard>

      <BentoCard index={1} noPadding>
        <div className="p-5">
          <BentoCardHeader title="Completion by program" />
          <DonutChart
            data={trainingPrograms}
            centerValue="76%"
            centerLabel="avg. rate"
          />
        </div>
      </BentoCard>

      <BentoCard index={2} className="lg:col-span-3" noPadding>
        <div className="p-5">
          <BentoCardHeader title="Program completion rates" />
          <BarChart
            data={trainingPrograms.map((t) => ({ label: t.label, value: t.value }))}
            color="#ec4899"
            valueFormatter={(v) => `${v}%`}
          />
        </div>
      </BentoCard>
    </div>
  );
}

const reportContentMap: Record<ReportSlug, React.ComponentType> = {
  "headcount-summary": HeadcountReport,
  "payroll-register": PayrollReport,
  "leave-balance": LeaveBalanceReport,
  "attendance-compliance": AttendanceReport,
  "turnover-retention": TurnoverReport,
  "onboarding-status": OnboardingReport,
  "compliance-audit": ComplianceReport,
  "training-completion": TrainingReport,
};

export function ReportContent({ slug }: { slug: ReportSlug }) {
  const Content = reportContentMap[slug];
  if (!Content) return null;
  return <Content />;
}

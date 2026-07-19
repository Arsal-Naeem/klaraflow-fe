"use client";

import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { motion } from "framer-motion";

// import { HeadcountCard } from "@/components/dashboard/cards/HeadcountCard";
import { PayrollCard } from "@/features/dashboard/components/cards/PayrollCard";
import { AttendanceCard } from "@/features/dashboard/components/cards/AttendanceCard";
import { PendingLeaveCard } from "@/features/dashboard/components/cards/PendingLeaveCard";
import { PendingTimesheetCard } from "@/features/dashboard/components/cards/PendingTimesheetCard";
import { WhosOutCard } from "@/features/dashboard/components/cards/WhosOutCard";
import { TimesheetAlertsCard } from "@/features/dashboard/components/cards/TimesheetAlertsCard";
import { OnboardingCard } from "@/features/dashboard/components/cards/OnboardingCard";
import { QuickActionsCard } from "@/features/dashboard/components/cards/QuickActionsCard";
import { CompanyHubCard } from "@/features/dashboard/components/cards/CompanyHubCard";
import { ReportsLinksCard } from "@/features/dashboard/components/cards/ReportsLinksCard";
import { HeadcountCard } from "@/features/dashboard/components/cards/HeadcountCard";

export default function DashboardPage() {
  const breadcrumbItems = [{ name: "Company" }, { name: "Dashboard" }];

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6 w-[100%]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening across your company today
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
          {/* Row 1-2: Headcount hero (2x2) + Attendance (2x1) + Payroll (2x1) */}
          <HeadcountCard index={0} />
          <AttendanceCard index={1} />
          <PayrollCard index={2} />

          {/* Row 3: Leave / Timesheets / Who's out / Alerts */}
          <PendingLeaveCard index={3} />
          <PendingTimesheetCard index={4} />
          <WhosOutCard index={5} />
          <TimesheetAlertsCard index={6} />

          {/* Row 4: Onboarding (2x1) + Quick actions (1x1) + Reports (1x1) */}
          <OnboardingCard index={7} />
          <QuickActionsCard index={8} />
          <ReportsLinksCard index={9} />

          {/* Row 5: Company hub (2x1) */}
          <CompanyHubCard index={10} />
        </div>
      </div>
    </FullPageLayout>
  );
}

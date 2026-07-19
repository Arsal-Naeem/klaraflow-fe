"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Payslip } from "@/features/payroll/components/Payslip";
import { PayrollStages } from "@/features/payroll/components/PayrollStages";
import { PayrollApprovers } from "@/features/payroll/components/PayrollApprovers";
import { ArrowLeft, CheckCircle2, Download, Undo2 } from "lucide-react";
import {
  TOTAL_STAGES,
  buildApprovers,
  buildStages,
  formatPKR,
  getPayrollById,
  getStatusVariant,
  getTotals,
  initials,
  STATUS_LABEL,
  statusFromCompleted,
} from "@/features/payroll/data/mockPayroll";

export default function EmployeePayrollDetailPage() {
  const params = useParams();
  const employeeId = Array.isArray(params.employeeId)
    ? params.employeeId[0]
    : params.employeeId;
  const payroll = getPayrollById(employeeId ?? "");

  // Local, session-only workflow state seeded from the mock.
  const [completed, setCompleted] = useState(payroll?.completedStages ?? 0);

  if (!payroll) {
    return (
      <div className="flex w-full flex-col gap-4 p-6">
        <Link
          href="/company/payroll"
          className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Payroll
        </Link>
        <div className="text-muted-foreground rounded-lg border border-dashed py-16 text-center text-sm">
          Payroll record not found.
        </div>
      </div>
    );
  }

  const { gross, totalDeductions, net } = getTotals(payroll);
  const status = statusFromCompleted(completed);
  const stages = buildStages(completed);
  const approvers = buildApprovers(completed);

  const approve = () => setCompleted((c) => Math.min(TOTAL_STAGES, c + 1));
  const sendBack = () => setCompleted((c) => Math.max(0, c - 1));

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <Link
        href="/company/payroll"
        className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Payroll
      </Link>

      <PageHeader
        breadcrumbs={[
          { label: "Company", href: "/company" },
          { label: "Payroll", href: "/company/payroll" },
          { label: payroll.employeeName },
        ]}
        title={payroll.employeeName}
        subtitle={`${payroll.designation} · ${payroll.department} · ${payroll.payPeriod}`}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={sendBack}
              disabled={completed === 0}
            >
              <Undo2 className="mr-2 h-4 w-4" /> Send back
            </Button>
            <Button
              variant="default"
              onClick={approve}
              disabled={completed >= TOTAL_STAGES}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {completed >= TOTAL_STAGES ? "Completed" : "Approve stage"}
            </Button>
          </div>
        }
      />

      {/* Employee summary */}
      <div className="relative overflow-hidden rounded-xl border p-5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,35,148,0.22),rgba(40,5,149,0.32)_45%,transparent_70%)] blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback
                className={`bg-gradient-to-br ${payroll.avatarColor} text-lg font-semibold text-white`}
              >
                {initials(payroll.employeeName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{payroll.employeeName}</p>
                <Badge variant={getStatusVariant(status)}>
                  {STATUS_LABEL[status]}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                {payroll.employeeId} · {payroll.designation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div>
              <p className="text-muted-foreground text-xs">Gross</p>
              <p className="text-sm font-semibold">{formatPKR(gross)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Deductions</p>
              <p className="text-sm font-semibold">
                - {formatPKR(totalDeductions)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Net Pay</p>
              <p className="text-xl font-bold">{formatPKR(net)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payslip */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Payslip</p>
                <p className="text-muted-foreground text-xs">
                  {payroll.payPeriod} · Pay date{" "}
                  {new Date(payroll.payDate).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="outline"
                className="h-8"
                onClick={() =>
                  alert(
                    `Prototype: payslip for ${payroll.employeeName} would download here.`,
                  )
                }
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
            <Payslip payroll={payroll} />
          </div>
        </div>

        {/* Workflow + approvers */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border p-5">
            <div className="mb-4">
              <p className="text-sm font-semibold">Processing Stages</p>
              <p className="text-muted-foreground text-xs">
                {completed}/{TOTAL_STAGES} completed
              </p>
            </div>
            <PayrollStages stages={stages} orientation="vertical" />
          </div>

          <div className="rounded-xl border p-5">
            <div className="mb-4">
              <p className="text-sm font-semibold">Approvers</p>
              <p className="text-muted-foreground text-xs">
                Maker-checker sign-off chain
              </p>
            </div>
            <PayrollApprovers approvers={approvers} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { EmployeePayroll } from "../types";
import { formatPKR, getTotals } from "../data/mockPayroll";

function LineGroup({
  title,
  lines,
  total,
  totalLabel,
  sign = "",
}: {
  title: string;
  lines: { label: string; amount: number }[];
  total: number;
  totalLabel: string;
  sign?: string;
}) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <div className="flex flex-col divide-y rounded-lg border">
        {lines.map((l) => (
          <div
            key={l.label}
            className="flex items-center justify-between px-3 py-2 text-sm"
          >
            <span className="text-muted-foreground">{l.label}</span>
            <span className="font-medium">
              {sign}
              {formatPKR(l.amount)}
            </span>
          </div>
        ))}
        <div className="bg-muted/40 flex items-center justify-between px-3 py-2 text-sm font-semibold">
          <span>{totalLabel}</span>
          <span>
            {sign}
            {formatPKR(total)}
          </span>
        </div>
      </div>
    </section>
  );
}

export function Payslip({ payroll }: { payroll: EmployeePayroll }) {
  const { gross, totalDeductions, net } = getTotals(payroll);
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <LineGroup
          title="Earnings"
          lines={payroll.earnings}
          total={gross}
          totalLabel="Gross Earnings"
        />
        <LineGroup
          title="Deductions"
          lines={payroll.deductions}
          total={totalDeductions}
          totalLabel="Total Deductions"
          sign="- "
        />
      </div>

      <div className="relative overflow-hidden rounded-xl border p-5">
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,35,148,0.25),rgba(40,5,149,0.35)_45%,transparent_70%)] blur-2xl" />
        <div className="relative flex items-end justify-between">
          <div>
            <p className="text-muted-foreground text-xs">Net Pay (Take-home)</p>
            <p className="mt-1 text-3xl font-bold">{formatPKR(net)}</p>
          </div>
          <div className="text-muted-foreground text-right text-xs">
            <p>{payroll.paymentMethod}</p>
            <p>A/C {payroll.bankAccount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

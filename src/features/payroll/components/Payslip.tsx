"use client";

import { X } from "lucide-react";
import { formatPKR } from "../data/mockPayroll";

export interface PayslipLine {
  id?: string;
  label: string;
  amount: number;
  isAdjustment?: boolean;
}

function LineGroup({
  title,
  lines,
  total,
  totalLabel,
  sign = "",
  editable = false,
  onRemove,
}: {
  title: string;
  lines: PayslipLine[];
  total: number;
  totalLabel: string;
  sign?: string;
  editable?: boolean;
  onRemove?: (id: string) => void;
}) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <div className="flex flex-col divide-y rounded-lg border">
        {lines.map((l, i) => (
          <div
            key={l.id ?? i}
            className="flex items-center justify-between px-3 py-2 text-sm"
          >
            <span className="text-muted-foreground flex items-center gap-2">
              {l.label}
              {l.isAdjustment && (
                <span className="bg-muted text-foreground/70 rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                  Adj
                </span>
              )}
            </span>
            <span className="flex items-center gap-2 font-medium">
              {sign}
              {formatPKR(l.amount)}
              {editable && l.isAdjustment && onRemove && l.id && (
                <button
                  type="button"
                  onClick={() => onRemove(l.id!)}
                  aria-label={`Remove ${l.label}`}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
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

export function Payslip({
  earnings,
  deductions,
  paymentMethod,
  bankAccount,
  editable = false,
  onRemove,
}: {
  earnings: PayslipLine[];
  deductions: PayslipLine[];
  paymentMethod: string;
  bankAccount: string;
  editable?: boolean;
  onRemove?: (id: string) => void;
}) {
  const gross = earnings.reduce((s, l) => s + l.amount, 0);
  const totalDeductions = deductions.reduce((s, l) => s + l.amount, 0);
  const net = gross - totalDeductions;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <LineGroup
          title="Earnings"
          lines={earnings}
          total={gross}
          totalLabel="Gross Earnings"
          editable={editable}
          onRemove={onRemove}
        />
        <LineGroup
          title="Deductions"
          lines={deductions}
          total={totalDeductions}
          totalLabel="Total Deductions"
          sign="- "
          editable={editable}
          onRemove={onRemove}
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
            <p>{paymentMethod}</p>
            <p>A/C {bankAccount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface PayrollAdjustment {
  id: string;
  kind: "earning" | "deduction";
  label: string;
  amount: number;
  reason: string;
}

const fieldClass =
  "border-input bg-background focus-visible:ring-ring h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-2";
const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground";

export function AddAdjustmentDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (a: PayrollAdjustment) => void;
}) {
  const [kind, setKind] = useState<"earning" | "deduction">("earning");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  if (!open) return null;

  const reset = () => {
    setKind("earning");
    setLabel("");
    setAmount("");
    setReason("");
  };
  const close = () => {
    reset();
    onClose();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!label.trim() || !amt || amt <= 0) return;
    onAdd({
      id: `ADJ-${Date.now()}`,
      kind,
      label: label.trim(),
      amount: Math.round(amt),
      reason: reason.trim(),
    });
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="bg-card relative z-10 w-full max-w-md overflow-hidden rounded-xl border shadow-xl">
        <div className="h-1 w-full bg-[linear-gradient(90deg,#ff2394_0%,#280595_100%)]" />
        <form onSubmit={submit} className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Add adjustment</h2>
              <p className="text-muted-foreground text-xs">
                One-time earning or deduction for this pay run
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Type</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={kind === "earning" ? "secondary" : "outline"}
                  className="h-9 flex-1"
                  onClick={() => setKind("earning")}
                >
                  Earning
                </Button>
                <Button
                  type="button"
                  variant={kind === "deduction" ? "secondary" : "outline"}
                  className="h-9 flex-1"
                  onClick={() => setKind("deduction")}
                >
                  Deduction
                </Button>
              </div>
            </div>
            <div>
              <label className={labelClass}>Label</label>
              <input
                className={fieldClass}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={
                  kind === "earning"
                    ? "e.g. Performance Bonus"
                    : "e.g. Advance Recovery"
                }
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Rs)</label>
              <input
                className={fieldClass}
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 15000"
              />
            </div>
            <div>
              <label className={labelClass}>Reason</label>
              <input
                className={fieldClass}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Why is this adjustment being made?"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Add adjustment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
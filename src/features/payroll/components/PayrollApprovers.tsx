"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { PayrollApprover } from "../types";
import { initials } from "../data/mockPayroll";

const STATUS_MAP = {
  approved: { variant: "default", label: "Approved", Icon: CheckCircle2 },
  pending: { variant: "secondary", label: "Pending", Icon: Clock },
  rejected: { variant: "destructive", label: "Rejected", Icon: XCircle },
} as const;

export function PayrollApprovers({
  approvers,
}: {
  approvers: PayrollApprover[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {approvers.map((a, i) => {
        const meta = STATUS_MAP[a.status];
        const Icon = meta.Icon;
        return (
          <div key={i} className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-muted text-xs">
                {initials(a.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{a.name}</p>
              <p className="text-muted-foreground text-xs">{a.role}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={meta.variant} className="gap-1">
                <Icon className="h-3 w-3" />
                {meta.label}
              </Badge>
              {a.actedOn && (
                <span className="text-muted-foreground text-[11px]">
                  {new Date(a.actedOn).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

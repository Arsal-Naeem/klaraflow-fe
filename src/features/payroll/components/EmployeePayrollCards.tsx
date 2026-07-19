"use client";

import { useRouter } from "next/navigation";
import { GradientCard } from "@/components/ui/gradient-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Download, Eye, MoreHorizontal } from "lucide-react";
import { EmployeePayroll } from "../types";
import {
  TOTAL_STAGES,
  formatPKR,
  getStatusVariant,
  getTotals,
  initials,
  STATUS_LABEL,
  statusFromCompleted,
} from "../data/mockPayroll";

export function EmployeePayrollCards({
  items,
  onDownload,
}: {
  items: EmployeePayroll[];
  onDownload?: (p: EmployeePayroll) => void;
}) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((p) => {
        const { net } = getTotals(p);
        const status = statusFromCompleted(p.completedStages);
        const open = () => router.push(`/company/payroll/${p.id}`);
        return (
          <GradientCard key={p.id} className="cursor-pointer" onClick={open}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarFallback
                    className={`bg-gradient-to-br ${p.avatarColor} text-sm font-medium text-white`}
                  >
                    {initials(p.employeeName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium leading-tight">{p.employeeName}</p>
                  <p className="text-muted-foreground text-xs">
                    {p.designation}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" /> View payslip
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload?.(p);
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download payslip
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-muted-foreground text-xs">
                  Net pay · {p.payPeriod}
                </p>
                <p className="text-xl font-semibold">{formatPKR(net)}</p>
              </div>
              <Badge variant={getStatusVariant(status)}>
                {STATUS_LABEL[status]}
              </Badge>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-muted-foreground text-xs">
                {p.completedStages}/{TOTAL_STAGES} stages
              </span>
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                View details <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </GradientCard>
        );
      })}
    </div>
  );
}

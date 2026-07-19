"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Eye, MoreHorizontal } from "lucide-react";
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

export function EmployeePayrollList({
  items,
  onDownload,
}: {
  items: EmployeePayroll[];
  onDownload?: (p: EmployeePayroll) => void;
}) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead className="text-center">Gross</TableHead>
            <TableHead className="text-center">Deductions</TableHead>
            <TableHead className="text-center">Net Pay</TableHead>
            <TableHead className="text-center">Stage</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="w-[70px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {items.map((p) => {
            const { gross, totalDeductions, net } = getTotals(p);
            const status = statusFromCompleted(p.completedStages);
            return (
              <TableRow
                key={p.id}
                className="cursor-pointer odd:bg-muted/20 hover:bg-muted/50"
                onClick={() => router.push(`/company/payroll/${p.id}`)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className={`bg-gradient-to-br ${p.avatarColor} text-xs font-medium text-white`}
                      >
                        {initials(p.employeeName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        {p.employeeName}
                      </span>
                      <span className="text-muted-foreground text-[11px]">
                        {p.employeeId}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs">{p.designation}</TableCell>
                <TableCell className="text-center text-xs">
                  {formatPKR(gross)}
                </TableCell>
                <TableCell className="text-center text-xs">
                  - {formatPKR(totalDeductions)}
                </TableCell>
                <TableCell className="text-center text-xs font-medium">
                  {formatPKR(net)}
                </TableCell>
                <TableCell className="text-center text-xs">
                  {p.completedStages}/{TOTAL_STAGES}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={getStatusVariant(status)}>
                    {STATUS_LABEL[status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
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
                          router.push(`/company/payroll/${p.id}`);
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

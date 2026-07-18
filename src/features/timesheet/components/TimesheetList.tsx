"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { Timesheet, TimesheetStatus } from "../types";

interface TimesheetTableProps {
  timesheets: Timesheet[];
  getStatusVariant: (status: Timesheet["status"]) => string;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TimesheetStatus) => void;
}

export function TimesheetList({
  timesheets,
  getStatusVariant,
  onDelete,
  onStatusChange,
}: TimesheetTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-[110px] text-center">TS Id</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Project</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Hours</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="w-[80px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {timesheets?.map((timesheet) => (
            <TableRow
              key={timesheet.id}
              className="odd:bg-muted/20 hover:bg-muted/50"
            >
              <TableCell className="text-xs text-center font-medium">
                {timesheet.id}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {timesheet.employeeName}
              </TableCell>
              <TableCell className="text-xs">{timesheet.project}</TableCell>
              <TableCell className="text-xs text-center">
                {new Date(timesheet.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-xs text-center">
                {timesheet.hoursWorked.toFixed(1)}
              </TableCell>
              <TableCell className="text-xs text-center">
                <Badge variant={getStatusVariant(timesheet.status) as any}>
                  {timesheet.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onStatusChange(timesheet.id, "approved")}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onStatusChange(timesheet.id, "rejected")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(timesheet.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Entry
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

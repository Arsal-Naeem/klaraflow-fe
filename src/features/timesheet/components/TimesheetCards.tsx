"use client";

import { GradientCard } from "@/components/ui/gradient-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Trash2,
  Calendar,
  Clock,
  Briefcase,
} from "lucide-react";
import { Timesheet, TimesheetStatus } from "../types";

interface TimesheetCardsProps {
  timesheets: Timesheet[];
  getStatusVariant: (status: Timesheet["status"]) => string;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TimesheetStatus) => void;
}

export function TimesheetCards({
  timesheets,
  getStatusVariant,
  onDelete,
  onStatusChange,
}: TimesheetCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {timesheets.map((timesheet) => (
        <GradientCard key={timesheet.id}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{timesheet.employeeName}</p>
              <p className="text-muted-foreground text-xs">{timesheet.id}</p>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant={getStatusVariant(timesheet.status) as any}>
                {timesheet.status.toUpperCase()}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-7 w-7 p-0">
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
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {timesheet.project}
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(timesheet.date).toLocaleDateString()}
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {timesheet.hoursWorked.toFixed(1)} hours
            </div>
          </div>
        </GradientCard>
      ))}
    </div>
  );
}

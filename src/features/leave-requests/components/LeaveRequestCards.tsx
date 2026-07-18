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
  CalendarRange,
  CalendarDays,
} from "lucide-react";
import { LeaveRequest, LeaveStatus } from "../types";

interface LeaveRequestCardsProps {
  requests: LeaveRequest[];
  getStatusVariant: (status: LeaveRequest["status"]) => string;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: LeaveStatus) => void;
}

export function LeaveRequestCards({
  requests,
  getStatusVariant,
  onDelete,
  onStatusChange,
}: LeaveRequestCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {requests.map((req) => (
        <GradientCard key={req.id}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{req.employeeName}</p>
              <p className="text-muted-foreground text-xs">{req.id}</p>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant={getStatusVariant(req.status) as any}>
                {req.status.toUpperCase()}
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
                    onClick={() => onStatusChange(req.id, "approved")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onStatusChange(req.id, "rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDelete(req.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Request
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-3">
            <Badge variant="outline">{req.leaveType} Leave</Badge>
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <CalendarRange className="h-4 w-4" />
              {new Date(req.startDate).toLocaleDateString()} →{" "}
              {new Date(req.endDate).toLocaleDateString()}
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {req.days} day{req.days > 1 ? "s" : ""}
            </div>
          </div>
          <p className="text-muted-foreground mt-3 line-clamp-2 text-xs">
            “{req.reason}”
          </p>
        </GradientCard>
      ))}
    </div>
  );
}

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
import { LeaveRequest, LeaveStatus } from "../types";

interface LeaveRequestTableProps {
  requests: LeaveRequest[];
  getStatusVariant: (status: LeaveRequest["status"]) => string;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: LeaveStatus) => void;
}

export function LeaveRequestList({
  requests,
  getStatusVariant,
  onDelete,
  onStatusChange,
}: LeaveRequestTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-[110px] text-center">Req Id</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-center">From</TableHead>
            <TableHead className="text-center">To</TableHead>
            <TableHead className="text-center">Days</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="w-[80px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {requests?.map((req) => (
            <TableRow
              key={req.id}
              className="odd:bg-muted/20 hover:bg-muted/50"
            >
              <TableCell className="text-xs text-center font-medium">
                {req.id}
              </TableCell>
              <TableCell className="text-xs font-medium">
                {req.employeeName}
              </TableCell>
              <TableCell className="text-xs">
                <Badge variant="outline">{req.leaveType}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[220px] truncate text-xs">
                {req.reason}
              </TableCell>
              <TableCell className="text-xs text-center">
                {new Date(req.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-xs text-center">
                {new Date(req.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-xs text-center font-medium">
                {req.days}
              </TableCell>
              <TableCell className="text-xs text-center">
                <Badge variant={getStatusVariant(req.status) as any}>
                  {req.status.toUpperCase()}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

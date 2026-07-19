"use client";
import EmptyState from "@/components/blocks/EmptyStates/EmptyState";
import DataLoader from "@/components/blocks/Loaders/DataLoader";
import FullPageLayout from "@/components/layouts/FullPageLayout/FullPageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useApproveOnboardingSession,
  useOnboardingUsers,
} from "@/features/onboarding";
import { useDebounce } from "@/utils/helpers";
import { Search } from "lucide-react";
import { useState } from "react";

const StatusList = [
  { label: "Invited", value: "invited" },
  { label: "In Progress", value: "in_progress" },
  { label: "Submitted", value: "submitted" },
];

export default function Page() {
  const breadcrumbItems = [{ name: "Company" }, { name: "Onboarding" }];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useOnboardingUsers({ q: debouncedSearch, status: selectedStatus });

  const ApproveOnboardingData = useApproveOnboardingSession();

  const ApproveOnboardingDataHandler = (sessionId: string) => {
    ApproveOnboardingData.mutate(sessionId);
  };

  // const getStatusVariant = (status: string) => {
  //   switch (status) {
  //     case "invited":
  //       return "default";
  //     case "in progress":
  //       return "secondary";
  //     case "submitted":
  //       return "destructive";
  //     default:
  //       return "outline";
  //   }
  // };

  const getStepVariant = (step: number, status: string) => {
    switch (step) {
      case 0:
        return status === "invited" ? "Invited" : "Verifying Information";
      case 1:
        return "Verifying Information";
      case 2:
        return "Submitting Documents";
      case 3:
        return status === "submitted"
          ? "Waiting for Approval"
          : "Completing Tasks";
      case 4:
        return "Waiting for Approval";
    }
  };

  return (
    <FullPageLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <Select
            value={selectedStatus}
            onValueChange={(value: string) => setSelectedStatus(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              {StatusList.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border">
        {isLoadingUsers ? (
          <DataLoader />
        ) : users && users.length === 0 ? (
          <EmptyState message="No user is currently being onboarded" />
        ) : (
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-[100px] text-center">Emp Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Step</TableHead>
                {/* <TableHead className="text-center">Status</TableHead> */}
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {users &&
                users.length > 0 &&
                users
                  .filter((user) => user.status !== "onboarded")
                  ?.map((employee: any) => (
                    <TableRow
                      key={employee.id}
                      className="cursor-pointer odd:bg-muted/20 hover:bg-muted/50"
                    >
                      <TableCell className="text-xs text-center font-medium">
                        {employee.empId ?? "-"}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                          }}
                        >
                          <span className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={employee?.profilePic}
                                alt={
                                  employee?.firstName + " " + employee?.lastName
                                }
                              />
                              <AvatarFallback className="text-sm">
                                {(
                                  employee?.firstName +
                                  " " +
                                  employee?.lastName
                                )
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </span>
                          <div>
                            <div className="text-xs">
                              {employee?.firstName} {employee?.lastName}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {employee?.designation}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs">
                        {employee?.new_employee_email || employee?.email}
                      </TableCell>
                      <TableCell className="text-xs">
                        {getStepVariant(
                          employee?.current_step,
                          employee?.status
                        )}
                      </TableCell>
                      {/* <TableCell className="text-xs text-center">
                      <Badge
                        variant={getStatusVariant(employee?.status) as any}
                      >
                        {employee?.status.replace(/_/g, " ").toUpperCase()}
                      </Badge>
                    </TableCell> */}
                      <TableCell className="text-xs text-center">
                        {employee?.status === "submitted" ? (
                          <Button
                            size={"sm"}
                            onClick={() =>
                              ApproveOnboardingDataHandler(employee?.id)
                            }
                            isLoading={ApproveOnboardingData.isPending}
                            loadingText="Approving..."
                          >
                            Approve
                          </Button>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        )}
      </div>
    </FullPageLayout>
  );
}

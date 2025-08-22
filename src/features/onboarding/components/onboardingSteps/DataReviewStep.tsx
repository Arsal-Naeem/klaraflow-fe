import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  UserCheck,
  Clock,
  MapPin,
  CheckCircle,
  Edit3,
} from "lucide-react";
import { Employee } from "@/features/employees";
import { OnboardingApproval } from "../../types";
import {
  useSubmitApproval,
  useUpdateOnboardingStep,
} from "../../hooks/useOnboarding";

interface DataReviewStepProps {
  data: Employee;
}

export const DataReviewStep: React.FC<DataReviewStepProps> = ({ data }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  // Mutations
  const submitApproval = useSubmitApproval();
  const updateStep = useUpdateOnboardingStep();

  const handleApproveData = async () => {
    const approval: OnboardingApproval = {
      action: "approve",
    };

    try {
      await submitApproval.mutateAsync(approval);
      await updateStep.mutateAsync(2);
    } catch (error) {
      console.error("Failed to approve data:", error);
    }
  };

  const handleRequestChange = async () => {
    const approval: OnboardingApproval = {
      action: "request_change",
      comments: "Employee requested changes to the provided information",
    };

    try {
      await submitApproval.mutateAsync(approval);
      // Show message about contacting HR
      alert(
        "Your request for changes has been submitted. HR will contact you shortly."
      );
    } catch (error) {
      console.error("Failed to request changes:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Review Your Information</h2>
        <p className="text-sm text-muted-foreground">
          Please review the information filled by HR. You can approve it or
          request changes if needed.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 lg:gap-12">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={data.profilePic}
                  alt={`${data.firstName} ${data.lastName}`}
                />
                <AvatarFallback className="text-lg">
                  {getInitials(data.firstName, data.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Employee ID
                </label>
                <p className="font-semibold">{data.empId}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <p className="font-semibold">
                  {data.firstName} {data.lastName}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="h-4 w-4 text-gray-400 hidden lg:inline" />
                  {data.email}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Phone
                </label>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="h-4 w-4 text-gray-400 hidden lg:inline" />
                  {data.phone || "Not provided"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Gender
                </label>
                <p className="font-semibold">{data.gender}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Work Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Designation
              </label>
              <p className="font-semibold">
                {data.designation || "Not specified"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Department
              </label>
              <p className="font-semibold">
                {data.department || "Not specified"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Job Type
              </label>
              <p className="font-semibold">{data.jobType || "Not specified"}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Hiring Date
              </label>
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                {formatDate(data.hiringDate)}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Reports To
              </label>
              <p className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-gray-400" />
                {data.reportTo || "Not specified"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Grade
              </label>
              <p className="font-semibold">{data.grade || "Not specified"}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Probation Period
              </label>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                {data.probationPeriod || "Not specified"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Date of Birth
              </label>
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                {formatDate(data.dateOfBirth)}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Marital Status
              </label>
              <p className="font-semibold">
                {data.maritalStatus || "Not specified"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Nationality
              </label>
              <p className="font-semibold">
                {data.nationality || "Not specified"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          onClick={handleApproveData}
          disabled={submitApproval.isPending || updateStep.isPending}
          variant="outline"
          size="lg"
          className="order-2 sm:order-1"
        >
          <Edit3 /> <p>Request Changes</p>
        </Button>

        <Button
          onClick={handleRequestChange}
          disabled={submitApproval.isPending || updateStep.isPending}
          variant="accent"
          size="lg"
          className="order-1 sm:order-2"
        >
          <CheckCircle />
          <p> Approve Information</p>
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        By approving, you confirm that all the information above is correct and
        can proceed to the next step.
      </div>
    </div>
  );
};

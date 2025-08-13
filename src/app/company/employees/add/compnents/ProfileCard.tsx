import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useWatch } from "react-hook-form";

const designationOptions = [
  { value: "01", label: "Developer" },
  { value: "02", label: "Designer" },
  { value: "03", label: "Manager" },
];

export default function ProfileCard({ form }: { form?: any }) {
  // Watch form values for real-time updates
  const watchedValues = useWatch({
    control: form?.control,
    name: ["empId", "firstName", "lastName", "designation", "email", "phone"],
  });

  const [empId, firstName, lastName, designationValue, email, phone] =
    watchedValues || [];

  const designationLabel = designationOptions.find(
    (option) => option.value === designationValue
  )?.label;

  // Use form data if available, otherwise use placeholder data
  const employee = {
    empId: empId || "KF-XXXX",
    firstName: firstName || "New",
    lastName: lastName || "Employee",
    designation: designationLabel,
    email: email,
    phone: phone,
    avatarUrl: "",
  };

  return (
    <Card className="lg:mt-11">
      <CardContent className="flex flex-col items-center py-8">
        <Avatar className="w-30 h-30 mb-2">
          <AvatarImage
            src={employee.avatarUrl}
            alt={employee.firstName + " " + employee.lastName}
          />
          <AvatarFallback className="text-4xl">
            {(employee.firstName + " " + employee.lastName)
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-muted-foreground text-sm font-bold mt-2">
          {employee.empId}
        </div>
        <div className="text-xl font-bold">
          {employee.firstName + " " + employee.lastName}
        </div>

        {/* Designation */}
        {employee.designation && (
          <div className="text-muted-foreground text-sm mb-2">
            {employee.designation}
          </div>
        )}
        {(employee.email || employee.phone) && (
          <Separator className="my-4 w-full" />
        )}

        <div className="w-full flex items-center flex-col gap-1">
          {employee.email && <div className="text-sm">{employee.email}</div>}
          {employee.phone && <div className="text-sm">{employee.phone}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

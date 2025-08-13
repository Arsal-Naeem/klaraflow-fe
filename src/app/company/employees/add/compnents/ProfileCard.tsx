import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfileCard() {
  // Placeholder data, replace with real data as needed
  const employee = {
    empId: "EMP12345",
    firstName: "Arsal",
    lastName: "Naeem",
    designation: "Software Engineer",
    email: "arsalnaeem1@example.com",
    phone: "+92 3422417528",
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
          <AvatarFallback>
            {(employee.firstName + " " + employee.lastName)
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-muted-foreground text-sm mt-2">{employee.empId}</div>
        <div className="text-lg font-semibold">
          {employee.firstName + " " + employee.lastName}
        </div>
        <div className="text-muted-foreground text-sm mb-2">
          {employee.designation}
        </div>
        <Separator className="my-4 w-full" />
        <div className="w-full flex items-center flex-col gap-1">
          <div className="text-sm">{employee.email}</div>
          <div className="text-sm">{employee.phone}</div>
        </div>
      </CardContent>
    </Card>
  );
}

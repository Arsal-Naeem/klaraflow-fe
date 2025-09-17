import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";

const EmployeeProfileCard = ({ employee }: { employee: any }) => {
  return (
    <div className="w-full rounded-xl shadow-md overflow-hidden bg-card">
      {/* Banner with Avatar */}
      <div className="relative">
        <img
          src={employee.banner}
          alt="Banner"
          className="w-full h-20 object-cover"
        />

        {/* Avatar overlapping bottom-left (centered on mobile) */}
        <div className="absolute -bottom-12 left-1/2 sm:left-6 transform -translate-x-1/2 sm:translate-x-0">
          <Avatar className="w-24 h-24 border-2 border-white shadow-lg">
            <AvatarImage
              src={employee.profilePic}
              alt={employee.firstName + " " + employee.lastName}
              className="w-full h-full object-cover block"
            />
            <AvatarFallback>
              {employee.firstName[0]}
              {employee.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Basic Details */}
      <div className="pt-14 pb-6 px-6 text-center sm:text-left">
        <h2 className="text-xl font-bold mb-2">
          {employee.firstName} {employee.lastName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 text-sm">
          {/* Col 1: Designation + Nationality */}
          <div className="space-y-1 sm:space-y-1 mb-4 sm:mb-0">
            <p className="font-medium">{employee.designation}</p>
            <p className="text-muted-foreground">{employee.nationality}</p>
          </div>

          {/* Col 2: Email + Phone */}
          <div className="space-y-2">
            <div className="flex justify-center sm:justify-start items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{employee.email}</span>
            </div>
            {employee.phone && (
              <div className="flex justify-center sm:justify-start items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{employee.phone}</span>
              </div>
            )}
          </div>

          {/* Col 3: Empty for now */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileCard;

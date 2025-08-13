import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useWatch } from "react-hook-form";
import { useRef, useState } from "react";
import { Camera } from "lucide-react";

const designationOptions = [
  { value: "01", label: "Developer" },
  { value: "02", label: "Designer" },
  { value: "03", label: "Manager" },
];

export default function ProfileCard({ form }: { form?: any }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");

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
    avatarUrl: profilePicUrl || "",
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePicUrl(result);

        // Set the file in form for API submission
        if (form?.setValue) {
          form.setValue("profilePic", file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="lg:mt-11">
      <CardContent className="flex flex-col items-center py-8">
        <div
          className="relative group cursor-pointer"
          onClick={handleAvatarClick}
        >
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
          {/* Overlay with camera icon on hover */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#ff2394_0%,#280595_100%)] w-30 h-30 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

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

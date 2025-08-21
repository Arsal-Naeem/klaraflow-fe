import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useWatch } from "react-hook-form";
import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import ImageCropModal from "@/components/shared/ImageCropModal";
import { toast } from "@/utils/toast";

const designationOptions = [
  { value: "01", label: "Developer" },
  { value: "02", label: "Designer" },
  { value: "03", label: "Manager" },
];

export default function ProfileCard({ form }: { form?: any }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImageForCrop, setSelectedImageForCrop] = useState<string>("");

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
        toast.error("Please select a valid image file.");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB.");
        return;
      }

      // Create preview URL for cropping
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImageForCrop(result);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }

    // Reset file input
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleCropComplete = (
    croppedImageUrl: string,
    croppedImageFile: File
  ) => {
    setProfilePicUrl(croppedImageUrl);
    setIsCropModalOpen(false);

    // Set the cropped file in form for API submission
    if (form?.setValue) {
      form.setValue("profilePic", croppedImageFile);
    }
  };

  const handleCropModalClose = () => {
    setIsCropModalOpen(false);
    setSelectedImageForCrop("");
  };

  return (
    <>
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

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={isCropModalOpen}
        onClose={handleCropModalClose}
        imageSrc={selectedImageForCrop}
        onCropComplete={handleCropComplete}
        aspectRatio={1} // Square crop for profile pictures
      />
    </>
  );
}

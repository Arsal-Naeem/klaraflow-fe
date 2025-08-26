import React, { useState, useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  Calendar,
  Building,
  UserCheck,
  Clock,
  MapPin,
  User2,
} from "lucide-react";
import { Employee } from "@/features/employees";
import { useUpdateOnboardingStep } from "../../hooks/useOnboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/blocks/Form/Fields/SelectField";
import { DateField } from "@/components/blocks/Form/Fields/DateField";

const addEmployeeSchema = z.object({
  profilePic: z.instanceof(File).optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  gender: z.string().min(1, "Please select a gender"),
  dateOfBirth: z.string().optional(),
  maritialStatus: z.string().optional(),
  nationality: z.string().optional(),
});

type addEmployeeData = z.infer<typeof addEmployeeSchema>;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "widowed", label: "Widowed" },
  { value: "divorced", label: "Divorced" },
];

const nationalityOptions = [
  { value: "pakistan", label: "Pakistan" },
  { value: "indian", label: "Indian" },
  { value: "emirati", label: "Emirati" },
];

interface DataReviewStepProps {
  data: Employee;
  onNext: () => void;
}

export const DataReviewStep: React.FC<DataReviewStepProps> = ({
  data,
  onNext,
}) => {
  const [isEditingBasic, setIsEditingBasic] = useState<boolean>(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState<boolean>(false);

  const form = useForm<addEmployeeData>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      profilePic: undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      maritialStatus: "",
      nationality: "",
    },
  });

  // Watch form values for real-time updates
  const watchedValues = useWatch({
    control: form.control,
    name: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "gender",
      "dateOfBirth",
      "maritialStatus",
      "nationality",
    ],
  });

  const [
    firstName,
    lastName,
    email,
    phone,
    gender,
    dateOfBirth,
    maritialStatus,
    nationality,
  ] = watchedValues || [];

  // Set form values when data changes
  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender || "",
        dateOfBirth: data.dateOfBirth || "",
        maritialStatus: data.maritalStatus || "",
        nationality: data.nationality || "",
      });
    }
  }, [data, form]);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  // Mutations
  const updateStep = useUpdateOnboardingStep();

  const handleSaveBasic = () => {
    setIsEditingBasic(false);
    // No API call as requested
  };

  const handleSavePersonal = () => {
    setIsEditingPersonal(false);
    // No API call as requested
  };

  const handleNext = () => {
    // Log the current form data
    const formData = form.getValues();
    console.log("Form data on next:", formData);
    onNext();
  };

  return (
    <Form {...form}>
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User2 className="h-5 w-5" />
              Basic Info
            </CardTitle>
            <CardAction>
              {isEditingBasic ? (
                <Button variant="outline" size="sm" onClick={handleSaveBasic}>
                  Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingBasic(true)}
                >
                  Edit
                </Button>
              )}
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 lg:gap-12">
              <div className="flex-shrink-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={data.profilePic}
                    alt={`${firstName || data.firstName} ${
                      lastName || data.lastName
                    }`}
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(
                      firstName || data.firstName,
                      lastName || data.lastName
                    )}
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

                {isEditingBasic ? (
                  <>
                    <div>
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <SelectField
                        control={form.control}
                        name="gender"
                        label="Gender"
                        placeholder="Select gender"
                        options={genderOptions}
                        className="w-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Full Name
                      </label>
                      <p className="font-semibold">
                        {firstName || data.firstName}{" "}
                        {lastName || data.lastName}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Email
                      </label>
                      <p className="flex items-center gap-2 justify-center md:justify-start">
                        <Mail className="h-4 w-4 text-gray-400 hidden lg:inline" />
                        {email || data.email}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Phone
                      </label>
                      <p className="flex items-center gap-2 justify-center md:justify-start">
                        <Phone className="h-4 w-4 text-gray-400 hidden lg:inline" />
                        {phone || data.phone || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Gender
                      </label>
                      <p className="font-semibold">{gender || data.gender}</p>
                    </div>
                  </>
                )}
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
            <CardAction>
              {isEditingPersonal ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSavePersonal}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingPersonal(true)}
                >
                  Edit
                </Button>
              )}
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isEditingPersonal ? (
                <>
                  <div>
                    <DateField
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="Select date of birth"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <SelectField
                      control={form.control}
                      name="maritialStatus"
                      label="Marital Status"
                      placeholder="Select marital status"
                      options={maritalStatusOptions}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <SelectField
                      control={form.control}
                      name="nationality"
                      label="Nationality"
                      placeholder="Select nationality"
                      options={nationalityOptions}
                      className="w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Date of Birth
                    </label>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatDate(dateOfBirth || data.dateOfBirth)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Marital Status
                    </label>
                    <p className="font-semibold">
                      {maritialStatus || data.maritalStatus || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Nationality
                    </label>
                    <p className="font-semibold">
                      {nationality || data.nationality || "Not specified"}
                    </p>
                  </div>
                </>
              )}
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
                <p className="font-semibold">
                  {data.jobType || "Not specified"}
                </p>
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-6">
          <Button
            onClick={handleNext}
            variant="accent"
            disabled={updateStep.isPending}
          >
            Next
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          By pressing Next, you confirm that all the information above is
          correct and can proceed to the next step.
        </div>
      </div>
    </Form>
  );
};

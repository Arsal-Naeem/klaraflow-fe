"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  User,
  FileText,
  ListTodo,
  Send,
  Settings,
  Globe,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

// Import onboarding components and hooks
import {
  DataReviewStep,
  DocumentUploadStep,
  TodoListStep,
  SubmissionStep,
} from "@/features/onboarding/components/onboardingSteps";

import {
  useOnboardingData,
  useUpdateOnboardingStep,
} from "@/features/onboarding/hooks/useOnboarding";

import { OnboardingDocument } from "@/features/onboarding/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Employee } from "@/features/employees";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useTheme } from "@/stores/theme-store";
import { useLanguageNavigation } from "@/hooks/use-language-navigation";
import { getAvailableLocales } from "@/lib/i18n";

const OnboardingPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const { locale, changeLanguage, isPending } = useLanguageNavigation();

  const tMain = useTranslations("onboarding");
  const tSteps = useTranslations("onboarding.steps.names");

  // Fetch onboarding data
  const { data: onboardingData, isLoading: isLoadingData } =
    useOnboardingData();

  // Mock data fallback for demonstration
  const mockCompanyData = {
    id: "COMP001",
    name: "KlaraFlow",
    profilePic: "",
    address: "123 Tech Lane, Silicon Valley, CA",
    phone: "+923422417528",
    email: "hr@klaraflow.com",
  };

  const mockOnboardingData = {
    id: "ONB001",
    empId: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1234567890",
    gender: "male",
    userRole: "03",
    designation: "Software Developer",
    department: "Engineering",
    jobType: "Full-time",
    hiringDate: "2024-01-15",
    onboardingTemplate: "Technical",
    reportTo: "Jane Smith",
    grade: "Mid-level",
    probationPeriod: "3 months",
    dateOfBirth: "1990-05-15",
    maritalStatus: "single",
    nationality: "emirati",
    profilePic: "",
    status: "pending",
  };

  const mockDocuments: OnboardingDocument[] = [
    {
      id: "1",
      name: "Education Certidicate",
      fields: [
        {
          id: "abc",
          label: "Title",
          type: "text",
          required: true,
          width: "full",
        },
        {
          id: "def",
          label: "Attach your document",
          type: "file",
          required: false,
          width: "full",
        },
        {
          id: "ghi",
          label: "Description",
          type: "textarea",
          required: false,
          width: "full",
        },
      ],
      uploaded: false,
      required: true,
    },
    {
      id: "2",
      name: "Emirates ID Card",
      fields: [
        {
          label: "First Name",
          type: "text",
          placeholder: "Enter your first name",
          required: true,
          width: "half",
        },
        {
          label: "Last Name",
          type: "text",
          placeholder: "Enter your last name",
          required: true,
          width: "half",
        },
        {
          label: "Issue Date",
          type: "date",
          placeholder: "Select issue date",
          description: "The date when the ID was issued",
          required: false,
          width: "half",
        },
        {
          label: "Expiry Date",
          type: "date",
          required: false,
          width: "half",
        },
        {
          label: "Front Side",
          type: "file",
          required: true,
          width: "half",
        },
        {
          label: "Back Side",
          type: "file",
          required: true,
          width: "half",
        },
      ],
      uploaded: false,
      required: false,
    },
  ];

  const mockTodos = [
    {
      id: "todo1",
      title: "Complete Security Training",
      description: "Complete the mandatory security awareness training module",
      completed: true,
    },
    {
      id: "todo2",
      title: "Setup IT Equipment",
      description:
        "Collect laptop, phone and other IT equipment from IT department",
      completed: false,
    },
    {
      id: "todo3",
      title: "HR Orientation Meeting",
      description: "Attend HR orientation session about company policies",
      completed: true,
    },
    {
      id: "todo4",
      title: "Complete Health & Safety Training",
      description: "Complete workplace health and safety training",
      completed: true,
    },
  ];

  // Mutations
  const updateStep = useUpdateOnboardingStep();

  // Update current step based on onboarding status
  useEffect(() => {
    if (onboardingData && onboardingData?.employeeData?.status === "active") {
      router.push("/dashboard");
    }
    if (onboardingData && onboardingData?.currentStep) {
      setCurrentStep(onboardingData.currentStep);
    }
  }, [onboardingData]);

  const steps = useMemo(
    () => [
      {
        id: 1,
        title: "reviewInformation",
        icon: <User className="h-5 w-5" />,
        completed: currentStep > 1,
        current: currentStep === 1,
      },
      {
        id: 2,
        title: "uploadDocuments",
        icon: <FileText className="h-5 w-5" />,
        completed: currentStep > 2,
        current: currentStep === 2,
      },
      {
        id: 3,
        title: "completeTasks",
        icon: <ListTodo className="h-5 w-5" />,
        completed: currentStep > 3,
        current: currentStep === 3,
      },
      {
        id: 4,
        title: "submitApplication",
        icon: <Send className="h-5 w-5" />,
        completed: currentStep > 4,
        current: currentStep === 4,
      },
    ],
    [currentStep]
  );

  const handleNextStep = async (nextStep: number) => {
    try {
      await updateStep.mutateAsync(nextStep);
      setCurrentStep(nextStep);
    } catch (error) {
      console.error("Failed to update step:", error);
    }
  };

  // Theme and language options
  const themeOptions = [
    { value: "light", label: t("theme.light"), icon: Sun },
    { value: "dark", label: t("theme.dark"), icon: Moon },
    { value: "system", label: t("theme.system"), icon: Monitor },
  ];

  const availableLocales = getAvailableLocales();
  const languageOptions = availableLocales.map((localeConfig) => ({
    value: localeConfig.locale,
    label: t(`language.${localeConfig.locale === "en" ? "english" : "arabic"}`),
    flag: localeConfig.flag,
    nativeName: localeConfig.nativeName,
  }));

  const isRTL = locale === "ar";

  return (
    <div className="max-w-6xl w-[900px] mx-auto px-4 my-8 space-y-6">
      {/* Header */}
      <div className="text-center flex flex-col items-center mb-8">
        <div className="flex-shrink-0 mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={mockCompanyData.profilePic}
              alt={`${mockCompanyData.name}`}
            />
            <AvatarFallback className="text-2xl">{"KF"}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-3xl font-bold mb-2">{tMain("title")}</h1>
        <p className="text-muted-foreground">{tMain("subtitle")}</p>
      </div>

      {/* Progress Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>{tMain("onboardingProgress")}</CardTitle>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"icon"}>
                  <Settings />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Theme Toggle */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger
                    className={`cursor-pointer ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Sun className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("sidebar.theme")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() =>
                            setTheme(
                              option.value as "light" | "dark" | "system"
                            )
                          }
                          className={`cursor-pointer ${
                            theme === option.value ? "bg-accent" : ""
                          } ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                          <Icon className="h-4 w-4" />
                          {option.label}
                          {theme === option.value && (
                            <div
                              className={`h-2 w-2 rounded-full bg-primary ${
                                isRTL ? "mr-auto" : "ml-auto"
                              }`}
                            />
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Language Toggle */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger
                    className={`cursor-pointer ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Globe className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("sidebar.language")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {languageOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => changeLanguage(option.value)}
                        disabled={isPending}
                        className={`cursor-pointer ${
                          locale === option.value ? "bg-accent" : ""
                        } ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <span className={isRTL ? "ml-2" : "mr-2"}>
                          {option.flag}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm">{option.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {option.nativeName}
                          </span>
                        </div>
                        {locale === option.value && (
                          <div
                            className={`h-2 w-2 rounded-full bg-primary ${
                              isRTL ? "mr-auto" : "ml-auto"
                            }`}
                          />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>

        {/* Progress */}
        <CardContent>
          <div className="mb-8">
            <Progress
              value={Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}
              className="h-2"
              indicatorClassName="bg-[linear-gradient(90deg,#280595_0%,#ff2394_100%)]"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>
                {tMain("step")} {currentStep} {tMain("of")} {steps.length}
              </span>
              <span>
                {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%{" "}
                {tMain("completed")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    step.completed
                      ? "bg-green-200 dark:bg-green-600/40 text-green-600 dark:text-green-300"
                      : step.current
                      ? "bg-accent/40 text-accent-font"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    step.icon
                  )}
                </div>

                <h3
                  className={`font-semibold text-sm ${
                    step.current
                      ? "text-accent-font"
                      : step.completed
                      ? "text-green-600 dark:text-green-300"
                      : "text-muted-foreground"
                  }`}
                >
                  {tSteps(step.title)}
                </h3>

                {step.completed && (
                  <Badge className="bg-green-100 hover:bg-green-100 text-green-800 mt-2 mb-4 md:mb-0">
                    {tMain("completed")}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-3 md:p-6">
          {currentStep === 1 && (
            <DataReviewStep
              data={
                (onboardingData?.employeeData as Employee) || mockOnboardingData
              }
              onNext={() => handleNextStep(2)}
            />
          )}

          {currentStep === 2 && (
            <DocumentUploadStep
              requiredDocuments={
                onboardingData?.requiredDocuments || mockDocuments
              }
              optionalDocuments={
                onboardingData?.optionalDocuments || mockDocuments
              }
              onNext={() => handleNextStep(3)}
            />
          )}

          {currentStep === 3 && (
            <TodoListStep
              todos={onboardingData?.todos || mockTodos}
              onNext={() => handleNextStep(4)}
            />
          )}

          {currentStep === 4 && (
            <SubmissionStep
              phone={mockCompanyData.phone}
              email={mockCompanyData.email}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;

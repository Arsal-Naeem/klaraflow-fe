"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, User, FileText, ListTodo, Send } from "lucide-react";

// Import onboarding components and hooks
import {
  DataReviewStep,
  DocumentUploadStep,
  TodoListStep,
  SubmissionStep,
} from "@/features/onboarding/components";

import {
  useOnboardingData,
  useOnboardingStatus,
  useSubmitApproval,
  useRequiredDocuments,
  useUploadDocument,
  useTodoItems,
  useUpdateTodoItem,
  useSubmitOnboarding,
  useUpdateOnboardingStep,
} from "@/features/onboarding/hooks/useOnboarding";

import {
  OnboardingApproval,
  DocumentUpload,
  OnboardingSubmission,
} from "@/features/onboarding/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OnboardingPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(4);

  // Fetch onboarding data
  const { data: onboardingData, isLoading: isLoadingData } =
    useOnboardingData();
  const { data: onboardingStatus, isLoading: isLoadingStatus } =
    useOnboardingStatus();
  const { data: requiredDocuments = [], isLoading: isLoadingDocs } =
    useRequiredDocuments();
  const { data: todoItems = [], isLoading: isLoadingTodos } = useTodoItems();

  // Mutations
  const submitApproval = useSubmitApproval();
  const uploadDocument = useUploadDocument();
  const updateTodoItem = useUpdateTodoItem();
  const submitOnboarding = useSubmitOnboarding();
  const updateStep = useUpdateOnboardingStep();

  // Update current step based on onboarding status
  useEffect(() => {
    if (onboardingStatus) {
      setCurrentStep(onboardingStatus.currentStep);
    }
  }, [onboardingStatus]);

  const steps = [
    {
      id: 1,
      title: "Review Information",
      icon: <User className="h-5 w-5" />,
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      id: 2,
      title: "Upload Documents",
      icon: <FileText className="h-5 w-5" />,
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      id: 3,
      title: "Complete Tasks",
      icon: <ListTodo className="h-5 w-5" />,
      completed: currentStep > 3,
      current: currentStep === 3,
    },
    {
      id: 4,
      title: "Submit Application",
      icon: <Send className="h-5 w-5" />,
      completed: currentStep > 4,
      current: currentStep === 4,
    },
  ];

  const handleApproveData = async () => {
    const approval: OnboardingApproval = {
      action: "approve",
    };

    try {
      await submitApproval.mutateAsync(approval);
      await updateStep.mutateAsync(2);
      setCurrentStep(2);
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

  const handleDocumentUpload = async (document: DocumentUpload) => {
    try {
      await uploadDocument.mutateAsync({
        type: document.type,
        file: document.file,
        label: document.label,
      });
    } catch (error) {
      console.error("Failed to upload document:", error);
    }
  };

  const handleTodoToggle = async (id: string, completed: boolean) => {
    try {
      await updateTodoItem.mutateAsync({ id, completed });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleNextStep = async (nextStep: number) => {
    try {
      await updateStep.mutateAsync(nextStep);
      setCurrentStep(nextStep);
    } catch (error) {
      console.error("Failed to update step:", error);
    }
  };

  const handleFinalSubmission = async () => {
    const submission: OnboardingSubmission = {
      documents: [], // Documents are already uploaded
      todoItems: todoItems
        .filter((todo) => todo.completed)
        .map((todo) => todo.id),
      status: "submitted",
    };

    try {
      await submitOnboarding.mutateAsync(submission);
      await updateStep.mutateAsync(4);
      setCurrentStep(4);
    } catch (error) {
      console.error("Failed to submit onboarding:", error);
    }
  };

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
    empId: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1234567890",
    gender: "Male",
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
    maritalStatus: "Single",
    nationality: "American",
    profilePic: "",
    status: "pending",
  };

  const mockDocuments = [
    {
      id: "doc1",
      type: "passport",
      label: "Passport",
      required: true,
      uploaded: true,
    },
    {
      id: "doc2",
      type: "visa",
      label: "Work Visa",
      required: true,
      uploaded: false,
    },
    {
      id: "doc4",
      type: "contract",
      label: "Employment Contract",
      required: false,
      uploaded: false,
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

  const displayData = onboardingData || mockOnboardingData;
  const displayDocuments =
    requiredDocuments.length > 0 ? requiredDocuments : mockDocuments;
  const displayTodos = todoItems.length > 0 ? todoItems : mockTodos;

  const isLoading =
    submitApproval.isPending ||
    uploadDocument.isPending ||
    updateTodoItem.isPending ||
    submitOnboarding.isPending ||
    updateStep.isPending;

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 space-y-6">
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
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Your Onboarding Journey
        </h1>
        <p className="text-muted-foreground">
          Complete these steps to get started with your new role
        </p>
      </div>

      {/* Progress Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Progress</CardTitle>
        </CardHeader>

        {/* Progress */}
        <CardContent>
          <div className="mb-8">
            <Progress
              value={Math.round(((currentStep-1) / (steps.length-1)) * 100)}
              className="h-2"
              indicatorClassName="bg-[linear-gradient(90deg,#280595_0%,#ff2394_100%)]"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>
                Step {currentStep} of {steps.length}
              </span>
              <span>
                {Math.round(((currentStep-1) / (steps.length-1)) * 100)}% Complete
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
                  {step.title}
                </h3>

                {step.completed && (
                  <Badge className="bg-green-100 hover:bg-green-100 text-green-800 mt-2 mb-4 md:mb-0">
                    Completed
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
              data={displayData}
              onApprove={handleApproveData}
              onRequestChange={handleRequestChange}
              isLoading={isLoading}
            />
          )}

          {currentStep === 2 && (
            <DocumentUploadStep
              documents={displayDocuments}
              onUpload={handleDocumentUpload}
              onNext={() => handleNextStep(3)}
              isLoading={isLoading}
            />
          )}

          {currentStep === 3 && (
            <TodoListStep
              todos={displayTodos}
              onToggleTodo={handleTodoToggle}
              onNext={handleFinalSubmission}
              isLoading={isLoading}
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

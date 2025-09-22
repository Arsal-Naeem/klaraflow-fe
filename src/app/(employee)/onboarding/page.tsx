"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { DataReviewStep, DocumentUploadStep, TodoListStep, SubmissionStep } from '@/features/onboarding/components/onboardingSteps';
import { FullPageLoader } from '@/components/ui/fullpage-loader';


const OnboardingPage = () => {
  const { onboardingData, isLoading, isError } = useOnboarding();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError || !onboardingData) {
    // You can make this a prettier error component
    return <div>Error loading onboarding data. Please try again later.</div>;
  }

  const renderStep = () => {
    switch (onboardingData.current_step) {
      case 0: // Assuming step 0 is data review
        return <DataReviewStep />;
      case 1: // Document Upload
        return <DocumentUploadStep />;
      case 2: // Todo List
        return <TodoListStep />;
      case 3: // Submission
        return <SubmissionStep />;
      default:
        // Or redirect to dashboard if status is 'completed'
        return <div>You have completed your onboarding!</div>;
    }
  };

  return (
    <div>
      {/* You can add a stepper/progress bar component here using onboardingData.current_step */}
      <h1>Welcome to Klara!</h1>
      <p>Let's get you set up.</p>
      
      {renderStep()}
    </div>
  );
};

export default OnboardingPage;

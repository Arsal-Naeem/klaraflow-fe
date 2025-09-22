"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { DataReviewStep, DocumentUploadStep, TodoListStep, SubmissionStep } from '@/features/onboarding/components/onboardingSteps';
import { InitialLoader } from '@/components/ui/fullpage-loader';
import { useRouter } from 'next/navigation';

const OnboardingPage = () => {
  const router = useRouter();
  const { onboardingData, isLoading, isError, goToStep, submitOnboarding } = useOnboarding();

  if (isLoading) {
    return <InitialLoader />;
  }

  if (isError || !onboardingData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive">Error</h2>
          <p>Could not load your onboarding information. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (onboardingData.employee_data.status === 'completed') {
    router.replace('/dashboard');
    return <InitialLoader />;
  }

  const handleNext = async (nextStep: number) => {
    await goToStep(nextStep);
  };

  const handleSubmit = async () => {
    await submitOnboarding();
    router.push('/dashboard');
  };

  const renderStep = () => {
    switch (onboardingData.current_step) {
      case 0:
        return <DataReviewStep data={onboardingData} onNext={() => handleNext(1)} />;
      case 1:
        return <DocumentUploadStep data={onboardingData} onNext={() => handleNext(2)} />;
      case 2:
        return <TodoListStep data={onboardingData} onNext={() => handleNext(3)} />;
      case 3:
        return <SubmissionStep data={onboardingData} onSubmit={handleSubmit} />;
      default:
        return <div>Invalid onboarding step. Please contact support.</div>;
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

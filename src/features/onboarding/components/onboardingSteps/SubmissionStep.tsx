/*NEW*/
import { FC } from 'react';
import { OnboardingData } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '../../hooks/useOnboarding';

interface Props {
  data: OnboardingData;
  onSubmit: () => void;
}

export const SubmissionStep: FC<Props> = ({ data, onSubmit }) => {
  const { submitOnboarding } = useOnboarding();
  const { isLoading } = submitOnboarding;

  return (
    <Card>
      <CardHeader>
        <CardTitle>You're All Set!</CardTitle>
        <CardDescription>
          Please review the information you've provided. Once you submit, your profile will be finalized.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-lg">Thank you for completing your onboarding tasks, {data.employee_data.firstName}.</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Onboarding'}
        </Button>
      </CardFooter>
    </Card>
  );
};
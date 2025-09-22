import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { OnboardingData, UpdateEmployeeDataPayload } from '../../types';
import { useOnboarding } from '../../hooks/useOnboarding';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Row, Col } from '@/components/ui/grid';  // Updated import: Use Row and Col instead of Grid

interface Props {
  data: OnboardingData;
  onNext: () => void;
}

// Updated schema: Make fields optional to match UpdateEmployeeDataPayload (Partial type)
// This allows partial updates without enforcing required fields
const reviewSchema = z.object({
  firstName: z.string().optional(),  // Removed .min(1) to allow optional
  lastName: z.string().optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
});

export const DataReviewStep: FC<Props> = ({ data, onNext }) => {
  const { updateEmployeeData, isLoading } = useOnboarding();
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateEmployeeDataPayload>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      firstName: data.employee_data.firstName,
      lastName: data.employee_data.lastName,
      phone: data.employee_data.phone || '',
      dateOfBirth: data.employee_data.dateOfBirth || '',
      maritalStatus: data.employee_data.maritalStatus || '',  // Fixed typo: "dat a" -> "data"
      nationality: data.employee_data.nationality || '',
    },
  });

  const onSubmit = async (formData: UpdateEmployeeDataPayload) => {
    await updateEmployeeData(formData);
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Review Your Information</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <Row>  {/* Updated: Use Row instead of Grid */}
            <Col span={6}>  {/* Updated: Use span instead of numColSpan */}
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input {...field} id="firstName" />}
              />
              {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
            </Col>
            <Col span={6}>  {/* Updated: Use span instead of numColSpan */}
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => <Input {...field} id="lastName" />}
              />
              {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
            </Col>
            {/* Add other fields like phone, dateOfBirth etc. in the same way */}
          </Row>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save & Continue'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentTemplate } from "@/features/documents/types";
import { OnboardingTemplate } from "../types";

const OnboardingTemplateSettings = () => {
  const MockDocumentsTemplate: DocumentTemplate[] = [
    {
      id: "1",
      name: "Education Certidicate",
      fields: [
        {
          label: "Title",
          type: "text",
          required: true,
          width: "full",
        },
        {
          label: "Attach your document",
          type: "file",
          required: false,
          width: "full",
        },
        {
          label: "Description",
          type: "textarea",
          required: false,
          width: "full",
        },
      ],
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
    },
  ];

  const MockOnboardingTemplate: OnboardingTemplate[] = [
    {
      name: "HR onboarding",
      todos: [
        {
          id: "1",
          title: "Complete employee information",
          description: "Fill in all required fields",
        },
        {
          id: "2",
          title: "Upload required documents",
          description: "Upload all necessary documents",
        },
        {
          id: "3",
          title: "Assign mentor",
          description: "Assign a mentor for the new employee",
        },
      ],
      requiredDocuments: ["1"],
      optionalDocuments: ["2"],
    },
    {
      id: "2",
      name: "HR onboarding",
      todos: [
        {
          id: "1",
          title: "Complete employee information",
          description: "Fill in all required fields",
        },
        {
          id: "2",
          title: "Upload required documents",
          description: "Upload all necessary documents",
        },
        {
          id: "3",
          title: "Assign mentor",
          description: "Assign a mentor for the new employee",
        },
      ],
      requiredDocuments: ["2"],
      optionalDocuments: ["1"],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Templates</CardTitle>
      </CardHeader>
      <CardContent>Onboarding template settings form goes here</CardContent>
    </Card>
  );
};

export default OnboardingTemplateSettings;

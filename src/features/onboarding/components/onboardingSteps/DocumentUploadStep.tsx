import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, AlertCircle } from "lucide-react";
import { OnboardingDocument } from "../../types";
import DocumentDrawer from "../../../documents/components/DocumentDrawer";
import {
  useUpdateOnboardingStep,
} from "../../hooks/useOnboarding";
import { useUploadDocument } from "@/features/documents/hooks/useDocuments";
import { useTranslations } from "next-intl";

interface DocumentUploadStepProps {
  requiredDocuments: OnboardingDocument[];
  optionalDocuments?: OnboardingDocument[];
  onNext: () => void;
  employeeId?: string;
}

export const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  requiredDocuments,
  optionalDocuments = [],
  onNext,
  employeeId,
}) => {
  const uploadDocument = useUploadDocument();
  const updateStep = useUpdateOnboardingStep();

    const t = useTranslations("onboarding.steps.step2");
    const tMain = useTranslations("onboarding");
    const tCommon = useTranslations("common");

  const [documentsData, setDocumentsData] = React.useState<
    Record<string, Record<string, any>>
  >({});

  const uploadedCount = requiredDocuments.filter((doc) => doc.uploaded).length;
  const requiredUploadedCount = requiredDocuments.filter(
    (doc) => doc.uploaded
  ).length;
  const canProceed = requiredDocuments.every((doc) => doc.uploaded);

  const handleDocumentUpdate = async (
    documentId: string,
    data: Record<string, any>
  ) => {
    // Store the document data
    setDocumentsData((prev) => ({
      ...prev,
      [documentId]: data,
    }));

    try {
      console.log("Document data saved for document:", documentId);
    } catch (error) {
      console.error("Failed to update document:", error);
    }
  };

  const DocumentCard = ({ document }: { document: OnboardingDocument }) => {
    // Get saved data for this document
    const documentFormData = documentsData[document.id] || {};

    const handleDocumentSubmit = async (data: Record<string, any>) => {
      console.log("Document form submitted:", data);

      // Update document status to uploaded and store the form data
      if (handleDocumentUpdate) {
        await handleDocumentUpdate(document.id, data);
      }
      
      // Mark document as uploaded in the UI (you might want to manage this state properly)
      document.uploaded = true;
    };

    const handleDocumentDelete = async (documentId: string) => {
      console.log("Document deleted:", documentId);

      // Remove the document data
      setDocumentsData((prev) => {
        const newData = { ...prev };
        delete newData[documentId];
        return newData;
      });

      try {
        // In a real implementation, you'd make an API call to delete the document
        // await onboardingService.deleteDocument(documentId);
        console.log("Document deleted:", documentId);
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    };

    return (
      <DocumentDrawer
        employeeId={employeeId || ""}
        template={document}
        initialData={documentFormData}
        mode={document.uploaded ? "edit" : "add"}
        onSubmit={handleDocumentSubmit}
        isLoading={updateStep.isPending || uploadDocument.isPending}
        trigger={
          <Card
            className={`cursor-pointer transition-all ${
              document.uploaded &&
              "border-green-600 bg-green-100 dark:bg-green-900/40"
            } duration-200`}
          >
            <CardContent className=" ">
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm font-semibold ${
                    document.uploaded && "text-green-800 dark:text-green-300"
                  }`}
                >
                  {document.name}
                </p>
              </div>
            </CardContent>
          </Card>
        }
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
        <p className="text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* Progress Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-end mb-2">
            <span className="text-sm text-gray-500">
              {uploadedCount} {tMain("of")} {requiredDocuments.length} {t("documentsUpload")}
            </span>
          </div>
          <Progress
            value={(uploadedCount / requiredDocuments.length) * 100}
            className="h-2"
          />

          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-green-600">
              {tCommon("required")}: {requiredUploadedCount}/{requiredDocuments.length}
            </span>
            <span className="text-blue-600">
              {tCommon("optional")}: {uploadedCount - requiredUploadedCount}/
              {optionalDocuments.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      {requiredDocuments.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            {t("requiredDocuments")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </div>
      )}

      {/* Optional Documents */}
      {optionalDocuments.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            {t("optionalDocuments")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optionalDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </div>
      )}

      {!canProceed ? (
        <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {t("disclaimer")}
        </div>
      ) : (
        <div className="flex justify-end gap-2 pt-3">
          <Button
            onClick={onNext}
            variant="accent"
            size={"lg"}
            isLoading={updateStep.isPending}
          >
            {tCommon("next")}
          </Button>
        </div>
      )}
    </div>
  );
};

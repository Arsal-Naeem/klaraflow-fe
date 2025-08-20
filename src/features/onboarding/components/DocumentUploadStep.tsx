import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, AlertCircle, MoreVertical } from "lucide-react";
import { OnboardingDocument, DocumentUpload } from "../types";

interface DocumentUploadStepProps {
  documents: OnboardingDocument[];
  onUpload: (document: DocumentUpload) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
}

export const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  documents,
  onUpload,
  onNext,
  onPrevious,
  isLoading = false,
}) => {
  const requiredDocuments = documents.filter((doc) => doc.required);
  const optionalDocuments = documents.filter((doc) => !doc.required);
  const uploadedCount = documents.filter((doc) => doc.uploaded).length;
  const requiredUploadedCount = requiredDocuments.filter(
    (doc) => doc.uploaded
  ).length;
  const canProceed = requiredDocuments.every((doc) => doc.uploaded);

  const DocumentCard = ({ document }: { document: OnboardingDocument }) => {
    return (
      <Card
        className={`transition-all ${
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
              {document.label}
            </p>

            <MoreVertical size={14} className="cursor-pointer" />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Upload Required Documents</h2>
        <p className="text-muted-foreground">
          Please upload the required documents to complete your onboarding
          process.
        </p>
      </div>

      {/* Progress Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-end mb-2">
            <span className="text-sm text-gray-500">
              {uploadedCount} of {documents.length} documents uploaded
            </span>
          </div>
          <Progress
            value={(uploadedCount / documents.length) * 100}
            className="h-2"
          />

          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-green-600">
              Required: {requiredUploadedCount}/{requiredDocuments.length}
            </span>
            <span className="text-blue-600">
              Optional: {uploadedCount - requiredUploadedCount}/
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
            Required Documents
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
            Optional Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optionalDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end gap-2 pt-6">
        <Button onClick={onPrevious} variant="outline" disabled={isLoading}>
          Previous
        </Button>

        <Button
          onClick={onNext}
          variant="accent"
          disabled={!canProceed || isLoading}
          className={canProceed ? "bg-green-600 hover:bg-green-700" : ""}
        >
          Next
        </Button>
      </div>

      {!canProceed && (
        <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          Please upload all required documents to proceed to the next step.
        </div>
      )}
    </div>
  );
};

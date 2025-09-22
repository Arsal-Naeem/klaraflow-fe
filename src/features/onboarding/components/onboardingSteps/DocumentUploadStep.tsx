/*NEW*/
import { FC, useState } from 'react';
import { OnboardingData, OnboardingDocument } from '../../types';
import { useOnboarding } from '../../hooks/useOnboarding';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, UploadCloud } from 'lucide-react';

interface Props {
  data: OnboardingData;
  onNext: () => void;
}

const DocumentRow: FC<{ doc: OnboardingDocument }> = ({ doc }) => {
  const { uploadDocument } = useOnboarding();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadDocument({ documentTemplateId: doc.id, file });
    } catch (error) {
      // Error is already handled by toast in the hook
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <p className="font-medium">{doc.name}</p>
        <p className="text-sm text-muted-foreground">{doc.required ? 'Required' : 'Optional'}</p>
      </div>
      {doc.uploaded ? (
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Uploaded</span>
        </div>
      ) : (
        <Label htmlFor={`file-${doc.id}`} className="cursor-pointer">
          <div className="flex items-center text-primary">
            <UploadCloud className="h-5 w-5 mr-2" />
            <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
          </div>
          <Input id={`file-${doc.id}`} type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
        </Label>
      )}
    </div>
  );
};

export const DocumentUploadStep: FC<Props> = ({ data, onNext }) => {
  const allRequiredUploaded = data.required_documents.every(doc => doc.uploaded);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 2: Upload Your Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.required_documents.map(doc => <DocumentRow key={doc.id} doc={doc} />)}
        {data.optional_documents.map(doc => <DocumentRow key={doc.id} doc={doc} />)}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNext} disabled={!allRequiredUploaded}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};
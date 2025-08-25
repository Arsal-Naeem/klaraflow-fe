export interface DocumentField {
  id?: string;
  label: string;
  type: "text" | "file" | "textarea" | "date";
  placeholder?: string;
  description?: string;
  required: boolean;
  width: "half" | "full";
}

export interface DocumentTemplate {
  id: string;
  name: string;
  fields: DocumentField[];
}

export interface DocumentUploadField {
  id: string;
  value: string | Date | File; 
}
export interface DocumentUpload {
  docId: string;
  employeeId: string;
  fields: DocumentUploadField[];
}

export interface DocumentField {
  label: string;
  type: "text" | "file" | "textarea" | "date";
  placeholder?: string;
  description?: string;
  required: boolean;
}

export interface DocumentTemplate {
  name: string;
  fields: DocumentField[];
}

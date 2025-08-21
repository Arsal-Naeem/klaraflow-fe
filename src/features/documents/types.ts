export interface DocumentField {
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

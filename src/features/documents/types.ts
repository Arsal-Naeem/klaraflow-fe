export interface DocumentField {
  label: string;
  type: "text" | "file" | "textarea" | "date";
  required: boolean;
}

export interface DocumentTemplate {
  name: string;
  fields: DocumentField[];
}

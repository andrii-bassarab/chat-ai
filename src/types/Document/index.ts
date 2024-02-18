export interface IDocument {
  createdAt: string;
  document_id: string;
  extractedText: string;
  filename: string;
  mimeType: "application/pdf";
  size: number;
  updatedAt: string;
}

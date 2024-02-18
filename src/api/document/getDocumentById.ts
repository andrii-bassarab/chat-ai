import { IDocument } from "@/types/Document";
import { appInstance } from "../instance";

export const getDocumentById = (userId: string, documentId: string) => appInstance.get<IDocument>(`documents/${userId}/${documentId}`);
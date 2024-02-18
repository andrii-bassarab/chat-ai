import { appInstance } from "../instance";
import { IDocument } from "@/types/Document";

export const getAllDocuments = (userId: string) => appInstance.get<IDocument[]>(`documents/${userId}`);

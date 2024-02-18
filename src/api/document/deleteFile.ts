import { appInstance } from "../instance";

export const deleteDocument = (userId: string, document_id: string) => appInstance.delete(`documents/${userId}/${document_id}`);

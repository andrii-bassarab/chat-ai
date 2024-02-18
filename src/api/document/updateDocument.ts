import { appInstance } from "../instance";

export const uploadDocument = (documentId: string, uploadData: FormData) => appInstance.put(`documents/5c784d38-b6f1-4167-afbd-6339e92a3af2/${documentId}`, uploadData)
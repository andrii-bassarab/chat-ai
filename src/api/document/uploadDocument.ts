import { appInstance } from "../instance";

export const uploadDocument = (userId: string, uploadData: FormData) => appInstance.post(`documents/${userId}`, uploadData)
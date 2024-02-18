import { IDocument } from '@/types/Document';

export const sortFilesByDate = (files: IDocument[]) =>
  [...files].sort(
    (curr, next) => new Date(next.updatedAt).getTime() - new Date(curr.updatedAt).getTime(),
  );
